'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ShieldCheck, Cpu, RefreshCw, Clipboard, Download, Upload, Shield, Plus, Trash2, FileCode, Lock, Award, ArrowRight, CheckCircle2 } from 'lucide-react';
import { trackCopy, trackCtaClick } from '@/lib/analytics';

type TableSchema = { id: string; name: string; columns: string[] };

/** SQL join type for use case 2. */
export type JoinType = 'LEFT' | 'RIGHT' | 'INNER' | 'FULL OUTER';

/** Join condition for use case 2 when there is more than one table. */
type JoinCondition = {
  id: string;
  joinType: JoinType;
  leftTable: string;
  leftColumn: string;
  rightTable: string;
  rightColumn: string;
};

const JOIN_TYPE_OPTIONS: { value: JoinType; label: string }[] = [
  { value: 'LEFT', label: 'Left join' },
  { value: 'RIGHT', label: 'Right join' },
  { value: 'INNER', label: 'Inner join' },
  { value: 'FULL OUTER', label: 'Full outer join' },
];

type MaskRequest = {
  type: 'MASK';
  payload: { input: string; mode: 'fast' | 'enterprise'; maskStringValues?: boolean; maskNumericValues?: boolean };
};

type GeneratePromptRequest = {
  type: 'GENERATE_PROMPT';
  payload: {
    tables: { name: string; columns: string[] }[];
    instruction: string;
    joins?: { joinType: JoinType; leftTable: string; leftColumn: string; rightTable: string; rightColumn: string }[];
  };
};

type RestoreRequest = {
  type: 'RESTORE';
  payload: { masked: string; reverseMap: Record<string, string> };
};

type WorkerRequest = MaskRequest | GeneratePromptRequest | RestoreRequest;

type MaskCounts = { tables: number; columns: number; schemas: number; aliases: number; values: number; numerics: number; total: number };

type MaskResponse =
  | { type: 'MASK_RESULT'; payload: { masked: string; identifierCount: number; mapping: SchemaMaskMapping; counts?: MaskCounts } }
  | { type: 'PROMPT_RESULT'; payload: { masked: string; identifierCount: number; mapping: SchemaMaskMapping } }
  | { type: 'RESTORE_RESULT'; payload: { restored: string } }
  | { type: 'ERROR'; error: string };

type SchemaMaskMapping = {
  version: '1.0';
  createdAt: string;
  tableMap: Record<string, string>;
  columnMap: Record<string, string>;
  schemaMap: Record<string, string>;
  aliasMap: Record<string, string>;
  valueMap: Record<string, string>;
  numericMap: Record<string, string>;
  globalMap: Record<string, string>;
  reverseMap: Record<string, string>;
};

const DEFAULT_EXAMPLE = `-- Example: tables, columns, and aliases below will be replaced with T_000001, C_000001, A_000001, etc.
-- Click "Mask identifiers" to see the AI-safe version in section 2.

SELECT u.user_id,
       u.email,
       o.order_id,
       o.total_amount
FROM analytics.users u
JOIN analytics.orders o ON o.user_id = u.user_id
WHERE o.created_at >= '2026-01-01'
  AND o.status = 'COMPLETED';
`;

const SAMPLE_CTE = `WITH monthly_revenue AS (
  SELECT
    DATE_TRUNC('month', t.transaction_date) AS month,
    p.product_category,
    SUM(t.sale_amount) AS total_revenue,
    COUNT(DISTINCT t.customer_id) AS unique_customers
  FROM transactions t
  JOIN products p ON p.product_id = t.product_id
  WHERE t.transaction_date >= '2025-01-01'
  GROUP BY 1, 2
)
SELECT month, product_category, total_revenue, unique_customers,
       ROUND(total_revenue / unique_customers, 2) AS revenue_per_customer
FROM monthly_revenue
ORDER BY month DESC, total_revenue DESC;
`;

const SAMPLE_UPDATE = `UPDATE customer_accounts ca
SET ca.account_status = 'SUSPENDED',
    ca.suspension_reason = 'PAYMENT_OVERDUE',
    ca.updated_at = NOW()
FROM billing_records br
WHERE br.account_id = ca.account_id
  AND br.days_overdue > 90
  AND ca.account_type != 'ENTERPRISE';
`;

const SAMPLE_JSON_SCHEMA = `{
  "tableName": "employee_records",
  "schema": "hr",
  "columns": [
    { "name": "employee_id", "type": "UUID", "primaryKey": true },
    { "name": "full_name", "type": "VARCHAR(255)", "nullable": false },
    { "name": "department_code", "type": "VARCHAR(10)", "foreignKey": "departments.dept_code" },
    { "name": "annual_salary", "type": "DECIMAL(12,2)", "sensitive": true },
    { "name": "performance_score", "type": "FLOAT" },
    { "name": "hire_date", "type": "DATE" }
  ]
}`;

export default function AiSchemaMaskerClient() {
  const [input, setInput] = useState<string>(DEFAULT_EXAMPLE);
  const [maskedOutput, setMaskedOutput] = useState<string>('');
  const [maskRestoreInput, setMaskRestoreInput] = useState<string>('');  // AI response pasted by user
  const [restoredFromMask, setRestoredFromMask] = useState<string>('');  // restored output (pure result)
  const [identifierCountMask, setIdentifierCountMask] = useState<number>(0);
  const [mappingFromMask, setMappingFromMask] = useState<SchemaMaskMapping | null>(null);

  const [generatedPrompt, setGeneratedPrompt] = useState<string>('');
  const [restoredFromPrompt, setRestoredFromPrompt] = useState<string>('');
  const [identifierCountPrompt, setIdentifierCountPrompt] = useState<number>(0);
  const [mappingFromPrompt, setMappingFromPrompt] = useState<SchemaMaskMapping | null>(null);

  const [processing, setProcessing] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [saveToSession, setSaveToSession] = useState<boolean>(false);
  const [maskStringValues, setMaskStringValues] = useState<boolean>(true);
  const [maskNumericValues, setMaskNumericValues] = useState<boolean>(false);
  const [maskCounts, setMaskCounts] = useState<MaskCounts | null>(null);

  const [structuredTables, setStructuredTables] = useState<TableSchema[]>([
    { id: '1', name: 'my_response_master', columns: ['id', 'user_name', 'email', 'mobile', 'address'] },
    { id: '2', name: 'get_output', columns: ['uid', 'created_date', 'active_flag'] },
  ]);
  const [instruction, setInstruction] = useState<string>(
    'Create a month wise view considering created_date and count user_name where active_flag is true'
  );
  const [joins, setJoins] = useState<JoinCondition[]>([
    {
      id: 'default-join',
      joinType: 'LEFT',
      leftTable: 'my_response_master',
      leftColumn: 'id',
      rightTable: 'get_output',
      rightColumn: 'uid',
    },
  ]);

  const workerRef = useRef<Worker | null>(null);
  const progressIntervalRef = useRef<number | null>(null);
  const pendingRestoreRef = useRef<'mask' | 'prompt' | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (workerRef.current) return;

    try {
      workerRef.current = new Worker('/workers/ai-schema-masker-worker.js');
      workerRef.current.onmessage = (event: MessageEvent<MaskResponse>) => {
        const message = event.data;
        if (!message) return;

        if (message.type === 'ERROR') {
          setError(message.error);
          setProcessing(false);
          setProgress(0);
          return;
        }

        if (message.type === 'MASK_RESULT') {
          setMaskedOutput(message.payload.masked);
          setIdentifierCountMask(message.payload.identifierCount);
          setMappingFromMask(message.payload.mapping);
          if (message.payload.counts) setMaskCounts(message.payload.counts);
          if (saveToSession) {
            try {
              sessionStorage.setItem('aiSchemaMaskerMappingMask', JSON.stringify(message.payload.mapping));
            } catch {
              // ignore
            }
          }
          setProcessing(false);
          setProgress(100);
          stopProgressInterval();
        } else if (message.type === 'PROMPT_RESULT') {
          setGeneratedPrompt(message.payload.masked);
          setIdentifierCountPrompt(message.payload.identifierCount);
          setMappingFromPrompt(message.payload.mapping);
          if (saveToSession) {
            try {
              sessionStorage.setItem('aiSchemaMaskerMappingPrompt', JSON.stringify(message.payload.mapping));
            } catch {
              // ignore
            }
          }
          setProcessing(false);
          setProgress(100);
          stopProgressInterval();
        } else if (message.type === 'RESTORE_RESULT') {
          const which = pendingRestoreRef.current;
          if (which === 'mask') setRestoredFromMask(message.payload.restored);
          if (which === 'prompt') setRestoredFromPrompt(message.payload.restored);
          pendingRestoreRef.current = null;
          setProcessing(false);
          setProgress(100);
          stopProgressInterval();
        }
      };
    } catch (e) {
      console.error('Failed to initialize AI Schema Masker worker', e);
      setError('Failed to initialize worker. This tool requires modern browser support for Web Workers.');
    }

    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
        workerRef.current = null;
      }
      stopProgressInterval();
    };
  }, [saveToSession]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const storedMask = sessionStorage.getItem('aiSchemaMaskerMappingMask');
      if (storedMask) {
        setMappingFromMask(JSON.parse(storedMask) as SchemaMaskMapping);
        setSaveToSession(true);
      }
      const storedPrompt = sessionStorage.getItem('aiSchemaMaskerMappingPrompt');
      if (storedPrompt) {
        setMappingFromPrompt(JSON.parse(storedPrompt) as SchemaMaskMapping);
      }
    } catch {
      // ignore
    }
  }, []);

  const startProgressInterval = () => {
    if (progressIntervalRef.current !== null) return;
    const id = window.setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return prev;
        return prev + 3;
      });
    }, 200);
    progressIntervalRef.current = id;
  };

  const stopProgressInterval = () => {
    if (progressIntervalRef.current !== null) {
      window.clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
  };

  // ⌘+Enter / Ctrl+Enter to mask
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        e.preventDefault();
        handleMask();
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMask = () => {
    trackCtaClick('ai_schema_masker', 'mask');
    if (!input.trim() || !workerRef.current) return;
    setProcessing(true);
    setProgress(5);
    setError(null);
    startProgressInterval();

    const request: WorkerRequest = {
      type: 'MASK',
      payload: {
        input,
        mode: 'fast',
        maskStringValues,
        maskNumericValues,
      },
    };

    workerRef.current.postMessage(request);
  };

  const handleRestoreMask = () => {
    trackCtaClick('ai_schema_masker', 'restore', { tab: 'sql' });
    if (!maskRestoreInput.trim() || !mappingFromMask || !workerRef.current) return;
    setError(null);
    setProcessing(true);
    setProgress(5);
    startProgressInterval();
    pendingRestoreRef.current = 'mask';
    workerRef.current.postMessage({
      type: 'RESTORE',
      payload: { masked: maskRestoreInput, reverseMap: mappingFromMask.reverseMap },
    });
  };

  const handleCopyRestored = async () => {
    if (!restoredFromMask) return;
    try {
      await navigator.clipboard.writeText(restoredFromMask);
      trackCopy('ai_schema_masker_restored');
    } catch { /* ignore */ }
  };

  const handleRestorePrompt = () => {
    trackCtaClick('ai_schema_masker', 'restore', { tab: 'prompt' });
    if (!restoredFromPrompt.trim() || !mappingFromPrompt || !workerRef.current) return;
    setError(null);
    setProcessing(true);
    setProgress(5);
    startProgressInterval();
    pendingRestoreRef.current = 'prompt';
    workerRef.current.postMessage({
      type: 'RESTORE',
      payload: { masked: restoredFromPrompt, reverseMap: mappingFromPrompt.reverseMap },
    });
  };

  const handleCopyMasked = async () => {
    if (!maskedOutput) return;
    try {
      await navigator.clipboard.writeText(maskedOutput);
      trackCopy('ai_schema_masker');
    } catch {
      // ignore
    }
  };

  const handleCopyGeneratedPrompt = async () => {
    if (!generatedPrompt) return;
    try {
      await navigator.clipboard.writeText(generatedPrompt);
      trackCopy('ai_schema_masker');
    } catch {
      // ignore
    }
  };

  const handleGeneratePrompt = () => {
    trackCtaClick('ai_schema_masker', 'generate_prompt');
    if (!workerRef.current) return;
    const tables = structuredTables
      .filter((t) => t.name.trim())
      .map((t) => ({
        name: t.name.trim(),
        columns: t.columns.map((c) => c.trim()).filter(Boolean),
      }));
    if (tables.length === 0) {
      setError('Add at least one table with a name.');
      return;
    }
    const joinPayload =
      tables.length > 1 && joins.length > 0
        ? joins
            .filter(
              (j) =>
                j.leftTable &&
                j.leftColumn &&
                j.rightTable &&
                j.rightColumn &&
                tableNames.includes(j.leftTable) &&
                tableNames.includes(j.rightTable)
            )
            .map((j) => ({
              joinType: j.joinType,
              leftTable: j.leftTable,
              leftColumn: j.leftColumn,
              rightTable: j.rightTable,
              rightColumn: j.rightColumn,
            }))
        : undefined;
    setError(null);
    setProcessing(true);
    setProgress(10);
    startProgressInterval();
    workerRef.current.postMessage({
      type: 'GENERATE_PROMPT',
      payload: { tables, instruction: instruction.trim(), joins: joinPayload },
    } as GeneratePromptRequest);
  };

  const addTable = () => {
    setStructuredTables((prev) => [
      ...prev,
      { id: String(Date.now()), name: '', columns: [''] },
    ]);
  };
  const removeTable = (id: string) => {
    setStructuredTables((prev) => prev.filter((t) => t.id !== id));
  };
  const updateTable = (id: string, name: string, columns: string[]) => {
    setStructuredTables((prev) => prev.map((t) => (t.id === id ? { ...t, name, columns } : t)));
  };
  const addColumn = (tableId: string) => {
    setStructuredTables((prev) =>
      prev.map((t) => (t.id === tableId ? { ...t, columns: [...t.columns, ''] } : t))
    );
  };
  const removeColumn = (tableId: string, colIdx: number) => {
    setStructuredTables((prev) =>
      prev.map((t) =>
        t.id === tableId ? { ...t, columns: t.columns.filter((_, i) => i !== colIdx) } : t
      )
    );
  };
  const setColumn = (tableId: string, colIdx: number, value: string) => {
    setStructuredTables((prev) =>
      prev.map((t) => {
        if (t.id !== tableId) return t;
        const next = [...t.columns];
        next[colIdx] = value;
        return { ...t, columns: next };
      })
    );
  };

  const tableNames = structuredTables.map((t) => t.name.trim()).filter(Boolean);
  const getColumnsForTable = (tableName: string) =>
    structuredTables.find((t) => t.name.trim() === tableName)?.columns.map((c) => c.trim()).filter(Boolean) ?? [];

  const addJoin = () => {
    const first = tableNames[0];
    const second = tableNames[1] ?? first;
    setJoins((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        joinType: 'LEFT',
        leftTable: first,
        leftColumn: getColumnsForTable(first)[0] ?? '',
        rightTable: second,
        rightColumn: getColumnsForTable(second)[0] ?? '',
      },
    ]);
  };
  const removeJoin = (id: string) => setJoins((prev) => prev.filter((j) => j.id !== id));
  const updateJoin = (
    id: string,
    patch: Partial<Pick<JoinCondition, 'joinType' | 'leftTable' | 'leftColumn' | 'rightTable' | 'rightColumn'>>
  ) => {
    setJoins((prev) =>
      prev.map((j) => (j.id === id ? { ...j, ...patch } : j))
    );
  };

  const downloadMapping = (m: SchemaMaskMapping | null, suffix: string) => {
    if (!m) return;
    try {
      const json = JSON.stringify(m, null, 2);
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ai-schema-masker-mapping-${suffix}-${new Date().toISOString().replace(/[:.]/g, '-')}.json`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error(e);
      setError('Failed to download mapping.');
    }
  };

  const loadMappingFile = async (event: React.ChangeEvent<HTMLInputElement>, setMapping: (m: SchemaMaskMapping) => void, setCount: (n: number) => void) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const loaded = JSON.parse(text) as SchemaMaskMapping;
      setMapping(loaded);
      setCount(Object.keys(loaded.globalMap).length);
      setError(null);
    } catch (e) {
      console.error(e);
      setError('Invalid mapping file. Please choose a JSON file exported from this tool.');
    } finally {
      event.target.value = '';
    }
  };

  return (
    <div className="w-full">

      {/* ── Page header ───────────────────────────────────────────── */}
      <div className="border-b border-zinc-200 bg-gradient-to-b from-zinc-50 to-white">
        <div className="h-[3px] w-full bg-gradient-to-r from-emerald-500 via-teal-400 to-sky-400" aria-hidden />
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-5 sm:py-7">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-zinc-500 mb-4" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-emerald-600 transition-colors">Home</Link>
            <span aria-hidden className="text-zinc-300">/</span>
            <span className="text-zinc-700 font-medium">AI Schema Masker</span>
          </nav>
          {/* Title row */}
          <div className="flex items-start gap-4">
            <div className="flex shrink-0 h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white text-2xl sm:text-3xl shadow-md">
              🛡️
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-3">
                <h1 className="text-[1.5rem] sm:text-[1.85rem] font-bold leading-tight tracking-[-0.02em] text-zinc-900">
                  AI SQL Schema Masker
                </h1>
                <label className="hidden sm:inline-flex items-center gap-2 mt-1 text-xs text-zinc-600 cursor-pointer whitespace-nowrap shrink-0">
                  <input type="checkbox" className="rounded border-zinc-300 text-emerald-600 focus:ring-emerald-500"
                    checked={saveToSession} onChange={(e) => setSaveToSession(e.target.checked)} />
                  Keep mapping in tab
                </label>
              </div>
              <p className="mt-1.5 text-[13.5px] sm:text-[14px] text-zinc-500 max-w-2xl leading-relaxed">
                Hide table &amp; column names before sending to ChatGPT. Tables → T_001, columns → C_001. Fully reversible, 100% in your browser — nothing leaves your device.
              </p>
              {/* Trust badges */}
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-800">
                  <Award className="w-3 h-3 shrink-0" />World&apos;s first DITE masker
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-800">
                  <Lock className="w-3 h-3 shrink-0" />100% in-browser
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-2.5 py-1 text-[11px] font-medium text-zinc-600 shadow-sm">
                  <Cpu className="w-3 h-3 shrink-0" />No data ever leaves your device
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-2.5 py-1 text-[11px] font-medium text-zinc-600 shadow-sm">
                  Free forever
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main content ──────────────────────────────────────────── */}
      <main className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">

        {/* Progress bar */}
        {processing && (
          <div className="flex items-center gap-3 rounded-xl bg-white border border-zinc-200 px-4 py-2.5 shadow-sm">
            <div className="flex-1 h-1.5 rounded-full bg-zinc-100 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }} />
            </div>
            <span className="text-xs font-semibold text-zinc-600 tabular-nums">{progress}%</span>
          </div>
        )}

        {/* ── Section 1: Mask raw SQL ──────────────────────────────── */}
        <section className="rounded-2xl border border-zinc-200 bg-white shadow-sm overflow-hidden">
          <div className="h-[3px] w-full bg-gradient-to-r from-emerald-500 via-teal-400 to-sky-400" aria-hidden />

          {/* Section header */}
          <div className="flex items-center justify-between gap-4 px-5 py-4 border-b border-zinc-100 bg-zinc-50/60">
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-emerald-600 text-white shrink-0 shadow-sm">
                <Shield className="w-4 h-4" />
              </span>
              <div>
                <h2 className="text-[15px] font-bold text-zinc-900">Mask raw SQL</h2>
                <p className="text-[11px] text-zinc-500 mt-0.5 hidden sm:block">
                  Paste SQL → mask identifiers → send to AI → paste AI reply → restore original names
                </p>
              </div>
            </div>
            {/* Workflow pills */}
            <div className="hidden md:flex items-center gap-1.5 text-[10px] font-semibold shrink-0">
              {(['Paste SQL', 'Mask', 'Send to AI', 'Restore'] as const).map((step, i) => (
                <React.Fragment key={step}>
                  <span className={`px-2.5 py-1 rounded-full ${
                    i === 0 ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                    i === 1 ? 'bg-teal-50 text-teal-700 border border-teal-200' :
                    i === 2 ? 'bg-sky-50 text-sky-700 border border-sky-200' :
                    'bg-violet-50 text-violet-700 border border-violet-200'
                  }`}>{step}</span>
                  {i < 3 && <span className="text-zinc-300">→</span>}
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="p-4 sm:p-5 space-y-5">

            {/* ── Masking options ──────────────────────────────────── */}
            <div className="flex flex-wrap items-center gap-3 px-4 py-3 rounded-xl bg-zinc-50 border border-zinc-200">
              <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">Mask options:</span>
              <label className="inline-flex items-center gap-2 cursor-not-allowed select-none">
                <input type="checkbox" checked readOnly className="rounded border-zinc-300 text-emerald-600 cursor-not-allowed" />
                <span className="text-sm text-zinc-700 font-medium">Identifiers</span>
                <span className="text-[10px] text-zinc-400">(tables, columns — always on)</span>
              </label>
              <div className="w-px h-4 bg-zinc-200 hidden sm:block" />
              <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                <input type="checkbox" checked={maskStringValues} onChange={(e) => setMaskStringValues(e.target.checked)}
                  className="rounded border-zinc-300 text-emerald-600 focus:ring-emerald-500" />
                <span className="text-sm text-zinc-700 font-medium">String values</span>
                <span className="text-[10px] text-zinc-400">(<code className="font-mono">IN</code>, <code className="font-mono">WHERE</code>)</span>
              </label>
              <div className="w-px h-4 bg-zinc-200 hidden sm:block" />
              <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                <input type="checkbox" checked={maskNumericValues} onChange={(e) => setMaskNumericValues(e.target.checked)}
                  className="rounded border-zinc-300 text-violet-600 focus:ring-violet-500" />
                <span className="text-sm text-zinc-700 font-medium">Numeric values</span>
                <span className="text-[10px] text-zinc-400">(dates, counts, thresholds)</span>
              </label>
            </div>

            {/* ── Mobile stacked layout ────────────────────────────── */}
            <div className="flex flex-col gap-3 lg:hidden">
              <div className="rounded-xl border border-zinc-200 bg-white shadow-sm overflow-hidden">
                <div className="flex flex-wrap items-center gap-2 px-4 py-3 border-b border-zinc-100 bg-zinc-50/60">
                  <span className="text-sm font-semibold text-zinc-800 mr-auto">Original SQL</span>
                  {[
                    { label: '🔗 JOIN', data: DEFAULT_EXAMPLE },
                    { label: '📊 CTE', data: SAMPLE_CTE },
                    { label: '✏️ UPDATE', data: SAMPLE_UPDATE },
                    { label: '📋 JSON', data: SAMPLE_JSON_SCHEMA },
                  ].map((s) => (
                    <button key={s.label} type="button"
                      onClick={() => { trackCtaClick('ai_schema_masker', 'load_example'); setInput(s.data); }}
                      className="px-2 py-1 rounded-md border border-emerald-200 bg-emerald-50 text-[11px] font-medium text-emerald-700 hover:bg-emerald-100 transition-colors">
                      {s.label}
                    </button>
                  ))}
                  <button type="button" onClick={() => { if (input.trim()) setInput(''); else setInput(DEFAULT_EXAMPLE); }}
                    className="inline-flex items-center gap-1 px-2 py-1 rounded-md border border-zinc-200 text-[11px] font-medium text-zinc-600 bg-white hover:bg-zinc-50">
                    <RefreshCw className="w-3 h-3" />{input.trim() ? 'Clear' : 'Example'}
                  </button>
                </div>
                <TextAreaEditor value={input} onChange={setInput} placeholder="Paste your SQL or JSON here…" />
              </div>
              <button type="button" onClick={handleMask} disabled={!input.trim() || processing}
                className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 disabled:opacity-50 shadow-md shadow-emerald-100 transition-all">
                <Shield className="w-4 h-4" />
                {processing ? 'Masking…' : 'Mask identifiers'}
                <kbd className="rounded border border-white/30 bg-white/20 px-1 py-0.5 font-mono text-[10px]">⌘↵</kbd>
              </button>
              {identifierCountMask > 0 && (
                <div className="flex flex-col items-center gap-1">
                  <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" />{identifierCountMask} items masked
                  </div>
                  {maskCounts && (
                    <div className="flex flex-wrap justify-center gap-2 text-[11px] font-medium">
                      {maskCounts.tables > 0 && <span className="text-sky-600">Tables: {maskCounts.tables}</span>}
                      {maskCounts.columns > 0 && <span className="text-indigo-600">Columns: {maskCounts.columns}</span>}
                      {maskCounts.aliases > 0 && <span className="text-violet-600">Aliases: {maskCounts.aliases}</span>}
                      {maskCounts.values > 0 && <span className="text-emerald-600">Values: {maskCounts.values}</span>}
                      {maskCounts.numerics > 0 && <span className="text-amber-600">Numbers: {maskCounts.numerics}</span>}
                    </div>
                  )}
                </div>
              )}
              <div className="rounded-xl border border-zinc-200 bg-white shadow-sm overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-100 bg-zinc-50/60">
                  <span className="text-sm font-semibold text-zinc-800">Masked output</span>
                  <button type="button" onClick={handleCopyMasked} disabled={!maskedOutput}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-200 text-xs font-medium text-zinc-700 bg-white hover:bg-zinc-50 disabled:opacity-40 transition-colors">
                    <Clipboard className="w-3.5 h-3.5" />Copy
                  </button>
                </div>
                <TextAreaEditor value={maskedOutput} onChange={setMaskedOutput} placeholder="Masked query appears here" />
              </div>
            </div>

            {/* ── Desktop 3-column layout ──────────────────────────── */}
            <div className="hidden lg:grid lg:grid-cols-[1fr_96px_1fr] lg:items-stretch rounded-2xl border border-zinc-200 overflow-hidden shadow-sm">

              {/* Left: Input */}
              <div id="schema-masker-input" className="bg-white flex flex-col min-h-[340px]">
                <div className="flex items-center gap-2 px-4 py-2.5 border-b border-zinc-100 bg-zinc-50/60">
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold shrink-0">1</span>
                  <div className="min-w-0 flex-1">
                    <span className="text-sm font-semibold text-zinc-900">Original SQL</span>
                    <span className="ml-2 text-[11px] text-zinc-400">SQL · CTE · JSON · up to 5 MB</span>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-1.5 px-4 py-2 border-b border-zinc-100 bg-white">
                  {[
                    { label: '🔗 JOIN', data: DEFAULT_EXAMPLE },
                    { label: '📊 CTE', data: SAMPLE_CTE },
                    { label: '✏️ UPDATE', data: SAMPLE_UPDATE },
                    { label: '📋 JSON schema', data: SAMPLE_JSON_SCHEMA },
                  ].map((s) => (
                    <button key={s.label} type="button"
                      onClick={() => { trackCtaClick('ai_schema_masker', 'load_example'); setInput(s.data); }}
                      className="px-2.5 py-1 rounded-lg border border-emerald-200 bg-emerald-50 text-[11px] font-medium text-emerald-700 hover:bg-emerald-100 transition-colors">
                      {s.label}
                    </button>
                  ))}
                  <button type="button" onClick={() => { if (input.trim()) setInput(''); else setInput(DEFAULT_EXAMPLE); }}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-zinc-200 text-[11px] font-medium text-zinc-600 bg-white hover:bg-zinc-50 transition-colors ml-auto">
                    <RefreshCw className="w-3 h-3" />{input.trim() ? 'Clear' : 'Example'}
                  </button>
                </div>
                <div className="flex-1 flex flex-col">
                  <TextAreaEditor value={input} onChange={setInput} placeholder="Paste your SQL or JSON here…" />
                </div>
              </div>

              {/* Center: Mask action */}
              <div className="flex flex-col items-center justify-center border-x border-zinc-200 bg-gradient-to-b from-zinc-50/80 via-white to-zinc-50/80">
                <div className="flex-1 flex flex-col items-center justify-end pb-4">
                  <div className="w-px flex-1 bg-gradient-to-b from-transparent via-zinc-200 to-emerald-300/70" />
                </div>
                <button type="button" onClick={handleMask} disabled={!input.trim() || processing}
                  className="flex flex-col items-center gap-2 px-3.5 py-4 rounded-2xl bg-emerald-600 text-white shadow-[0_4px_20px_rgba(5,150,105,0.35)] hover:bg-emerald-700 hover:shadow-[0_6px_24px_rgba(5,150,105,0.45)] hover:scale-[1.06] active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-150">
                  <Shield className="w-5 h-5" />
                  <span className="text-[11px] font-bold tracking-wider uppercase leading-none">
                    {processing ? '…' : 'Mask'}
                  </span>
                  <ArrowRight className="w-4 h-4 opacity-80" />
                  <kbd className="rounded border border-white/30 bg-white/20 px-1 py-0.5 font-mono text-[9px]">⌘↵</kbd>
                </button>
                <div className="flex-1 flex flex-col items-center justify-start pt-4 gap-2">
                  {identifierCountMask > 0 ? (
                    <div className="flex flex-col items-center gap-1 text-center px-1">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span className="text-xs font-bold text-zinc-700 tabular-nums">{identifierCountMask}</span>
                      <span className="text-[9px] text-zinc-400 leading-tight">masked</span>
                      {maskCounts && (
                        <div className="mt-1 flex flex-col gap-0.5 text-[9px] leading-tight text-left font-medium">
                          {maskCounts.tables > 0 && <span className="text-sky-600">T:{maskCounts.tables}</span>}
                          {maskCounts.columns > 0 && <span className="text-indigo-600">C:{maskCounts.columns}</span>}
                          {maskCounts.aliases > 0 && <span className="text-violet-600">A:{maskCounts.aliases}</span>}
                          {maskCounts.values > 0 && <span className="text-emerald-600">V:{maskCounts.values}</span>}
                          {maskCounts.numerics > 0 && <span className="text-amber-600">N:{maskCounts.numerics}</span>}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="w-px flex-1 bg-gradient-to-b from-emerald-300/70 via-zinc-200 to-transparent" />
                )}
              </div>
            </div>

              {/* Right: Masked output */}
              <div id="schema-masker-output" className="bg-white flex flex-col min-h-[260px]">
                <div className="flex items-center gap-2 px-4 py-2.5 border-b border-zinc-100 bg-zinc-50/60">
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-teal-100 text-teal-700 text-[10px] font-bold shrink-0">2</span>
                  <div className="min-w-0 flex-1">
                    <span className="text-sm font-semibold text-zinc-900">Masked output</span>
                    <span className="ml-2 text-[11px] text-zinc-400">Copy and send to AI</span>
                  </div>
                  <button type="button" onClick={handleCopyMasked} disabled={!maskedOutput}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-200 text-xs font-medium text-zinc-700 bg-white hover:bg-zinc-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shrink-0">
                    <Clipboard className="w-3.5 h-3.5" />Copy
                  </button>
                </div>
                <div className="h-[41px] border-b border-zinc-100 bg-white flex items-center px-4 gap-2">
                  {maskedOutput ? (
                    <>
                      <span className="text-[11px] text-emerald-600 font-semibold">✓ Ready to paste into ChatGPT / Claude</span>
                      {maskCounts && maskCounts.values > 0 && <span className="text-[10px] text-emerald-500">· {maskCounts.values} string value(s) masked</span>}
                      {maskCounts && maskCounts.numerics > 0 && <span className="text-[10px] text-amber-500">· {maskCounts.numerics} number(s) masked</span>}
                    </>
                  ) : (
                    <span className="text-[11px] text-zinc-400">Masked query will appear here</span>
                  )}
                </div>
                <div className="flex-1 flex flex-col">
                  <TextAreaEditor value={maskedOutput} onChange={setMaskedOutput} placeholder="Masked query appears here" />
                </div>
              </div>

            </div>{/* end desktop 3-col */}

            {/* ── Restore section ──────────────────────────────────── */}
            <div className="rounded-xl border border-zinc-200 overflow-hidden bg-white shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-b border-zinc-100 bg-gradient-to-r from-emerald-50/60 to-white">
                <div className="flex items-center gap-2.5">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 text-[11px] font-bold shrink-0">3</span>
                  <div>
                    <h3 className="text-sm font-bold text-zinc-900">Restore AI response</h3>
                    <p className="text-[11px] text-zinc-500">Paste the AI&apos;s reply → Restore → copy original SQL back</p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <button type="button" onClick={() => downloadMapping(mappingFromMask, 'mask')} disabled={!mappingFromMask}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-zinc-200 text-xs font-medium text-zinc-600 bg-white hover:bg-zinc-50 disabled:opacity-40 transition-colors">
                    <Download className="w-3.5 h-3.5" />Download mapping
                  </button>
                  <label className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-zinc-200 text-xs font-medium text-zinc-600 bg-white hover:bg-zinc-50 cursor-pointer transition-colors">
                    <Upload className="w-3.5 h-3.5" />Load mapping
                    <input type="file" accept="application/json" className="hidden" onChange={(e) => loadMappingFile(e, setMappingFromMask, setIdentifierCountMask)} />
                  </label>
                </div>
              </div>

              {/* Mobile */}
              <div className="flex flex-col gap-3 p-4 lg:hidden">
                <div className="rounded-xl border border-zinc-200 overflow-hidden">
                  <div className="px-4 py-2.5 border-b border-zinc-100 bg-zinc-50/60 text-[11px] font-medium text-zinc-600">
                    Paste AI reply <span className="text-zinc-400">(with T_000001, C_000001, etc.)</span>
                  </div>
                  <TextAreaEditor value={maskRestoreInput} onChange={setMaskRestoreInput} placeholder="Paste AI response here…" />
                </div>
                <button type="button" onClick={handleRestoreMask} disabled={!mappingFromMask || !maskRestoreInput.trim() || processing}
                  className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 disabled:opacity-50 shadow-md transition-all">
                  <RefreshCw className="w-4 h-4" />Restore original names
                </button>
                {restoredFromMask && (
                  <div className="rounded-xl border border-emerald-200 overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-2.5 border-b border-emerald-100 bg-emerald-50/60">
                      <span className="text-[11px] font-semibold text-emerald-800">✓ Restored SQL</span>
                      <button type="button" onClick={handleCopyRestored}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors">
                        <Clipboard className="w-3.5 h-3.5" />Copy restored
                      </button>
                    </div>
                    <TextAreaEditor value={restoredFromMask} onChange={setRestoredFromMask} placeholder="" />
                  </div>
                )}
              </div>

              {/* Desktop 3-column */}
              <div className="hidden lg:grid lg:grid-cols-[1fr_96px_1fr] lg:items-stretch">
                <div className="border-r border-zinc-200 bg-white flex flex-col min-h-[200px]">
                  <div className="flex items-center gap-2 px-4 py-2.5 border-b border-zinc-100 bg-zinc-50/60">
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-zinc-200 text-zinc-600 text-[10px] font-bold shrink-0">A</span>
                    <span className="text-sm font-semibold text-zinc-800">Paste AI reply</span>
                    <span className="text-[11px] text-zinc-400 ml-1">with T_000001, C_000001…</span>
                  </div>
                  <div className="flex-1 flex flex-col">
                    <TextAreaEditor value={maskRestoreInput} onChange={setMaskRestoreInput} placeholder="Paste the AI's response here…" />
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center border-x border-zinc-200 bg-gradient-to-b from-zinc-50/80 via-white to-zinc-50/80">
                  <div className="flex-1 flex flex-col items-center justify-end pb-4">
                    <div className="w-px flex-1 bg-gradient-to-b from-transparent via-zinc-200 to-emerald-300/70" />
                  </div>
                  <button type="button" onClick={handleRestoreMask} disabled={!mappingFromMask || !maskRestoreInput.trim() || processing}
                    className="flex flex-col items-center gap-2 px-3.5 py-4 rounded-2xl bg-emerald-600 text-white shadow-[0_4px_20px_rgba(5,150,105,0.3)] hover:bg-emerald-700 hover:shadow-[0_6px_24px_rgba(5,150,105,0.4)] hover:scale-[1.06] active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-150">
                    <RefreshCw className="w-5 h-5" />
                    <span className="text-[11px] font-bold tracking-wider uppercase leading-none">{processing ? '…' : 'Restore'}</span>
                    <ArrowRight className="w-4 h-4 opacity-80" />
                  </button>
                  <div className="flex-1 flex flex-col items-center justify-start pt-4">
                    {restoredFromMask ? (
                      <div className="flex flex-col items-center gap-0.5 text-center">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        <span className="text-[9px] text-zinc-400 leading-tight">done</span>
                      </div>
                    ) : (
                      <div className="w-px flex-1 bg-gradient-to-b from-emerald-300/70 via-zinc-200 to-transparent" />
                    )}
                  </div>
                </div>
                <div className="bg-white flex flex-col min-h-[200px]">
                  <div className="flex items-center gap-2 px-4 py-2.5 border-b border-zinc-100 bg-zinc-50/60">
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold shrink-0">B</span>
                    <div className="flex-1 min-w-0">
                      <span className="text-sm font-semibold text-zinc-800">Restored SQL</span>
                      <span className="ml-2 text-[11px] text-zinc-400">original names recovered</span>
                    </div>
                    <button type="button" onClick={handleCopyRestored} disabled={!restoredFromMask}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shrink-0 shadow-sm">
                      <Clipboard className="w-3.5 h-3.5" />Copy restored
                    </button>
                  </div>
                  <div className="flex-1 flex flex-col">
                    <TextAreaEditor value={restoredFromMask} onChange={setRestoredFromMask} placeholder="Restored SQL with original names will appear here…" />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ── Section 2: Secure AI Prompt Compiler ─────────────────── */}
        <section className="rounded-2xl border border-indigo-200 bg-white shadow-sm overflow-hidden">
          <div className="h-[3px] w-full bg-gradient-to-r from-indigo-500 via-violet-400 to-purple-500" aria-hidden />
          <div className="px-5 py-4 border-b border-indigo-100 bg-indigo-50/40">
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-indigo-600 text-white shrink-0 shadow-sm">
                <FileCode className="w-4 h-4" />
              </span>
              <div>
                <h2 className="text-[15px] font-bold text-zinc-900">Secure AI Prompt Compiler</h2>
                <p className="text-[11px] text-zinc-500 mt-0.5">Build tables &amp; columns visually → generate an AI-safe masked prompt → restore the AI&apos;s SQL reply</p>
              </div>
            </div>
          </div>
          <div className="p-4 sm:p-5 space-y-4">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-zinc-700 uppercase tracking-wide">Tables &amp; columns</span>
                <button type="button" onClick={addTable}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-indigo-200 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-colors">
                  <Plus className="w-3.5 h-3.5" />Add table
                </button>
              </div>
              <div className="space-y-3">
                {structuredTables.map((t) => (
                  <div key={t.id} className="rounded-xl border border-zinc-200 bg-zinc-50/50 p-3 space-y-2.5">
                    <div className="flex items-center gap-2">
                      <input type="text" value={t.name} onChange={(e) => updateTable(t.id, e.target.value, t.columns)}
                        placeholder="Table name"
                        className="flex-1 min-w-[120px] px-2.5 py-1.5 text-sm font-mono rounded-lg border border-zinc-200 bg-white focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 outline-none transition-all" />
                      <button type="button" onClick={() => removeTable(t.id)}
                        className="p-1.5 rounded-lg text-zinc-400 hover:bg-red-50 hover:text-red-500 transition-colors" aria-label="Remove table">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="pl-2 flex flex-wrap gap-1.5 items-center">
                      {t.columns.map((col, idx) => (
                        <span key={idx} className="inline-flex items-center gap-1">
                          <input type="text" value={col} onChange={(e) => setColumn(t.id, idx, e.target.value)}
                            placeholder="column"
                            className="w-28 px-2 py-1 text-xs font-mono rounded-lg border border-zinc-200 bg-white focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 outline-none transition-all" />
                          <button type="button" onClick={() => removeColumn(t.id, idx)}
                            className="p-1 text-zinc-300 hover:text-red-500 rounded transition-colors" aria-label="Remove column">
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                      <button type="button" onClick={() => addColumn(t.id)}
                        className="inline-flex items-center gap-1 px-2 py-1 text-xs text-indigo-600 rounded-lg border border-dashed border-indigo-300 hover:bg-indigo-50 transition-colors font-medium">
                        <Plus className="w-3 h-3" /> Column
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {structuredTables.filter((t) => t.name.trim()).length > 1 && (
              <div className="rounded-lg border border-indigo-100 bg-indigo-50/30 p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-700">Table JOINs (how tables connect)</span>
                  <button
                    type="button"
                    onClick={addJoin}
                    className="cta-add inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-indigo-200 text-xs font-medium text-indigo-700 bg-white hover:bg-indigo-50"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add JOIN
                  </button>
                </div>
                {joins.length === 0 ? (
                  <p className="text-xs text-zinc-500">Add at least one JOIN so the AI knows how to connect tables (e.g. table_a.id = table_b.foreign_id).</p>
                ) : (
                  <div className="space-y-2">
                    {joins.map((j) => (
                      <div key={j.id} className="flex flex-wrap items-center gap-2">
                        <select
                          value={j.joinType}
                          onChange={(e) => updateJoin(j.id, { joinType: e.target.value as JoinType })}
                          className="px-2 py-1.5 text-sm rounded-lg border border-zinc-200 bg-white min-w-[120px] focus:ring-2 focus:ring-indigo-200 outline-none"
                          aria-label="Join type"
                        >
                          {JOIN_TYPE_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                          ))}
                        </select>
                        <select
                          value={j.leftTable}
                          onChange={(e) => {
                            const name = e.target.value;
                            const cols = getColumnsForTable(name);
                            updateJoin(j.id, { leftTable: name, leftColumn: cols[0] ?? '' });
                          }}
                          className="px-2 py-1.5 text-sm font-mono rounded-lg border border-zinc-200 bg-white min-w-[100px] focus:ring-2 focus:ring-indigo-200 outline-none"
                          aria-label="Left table"
                        >
                          {tableNames.map((n) => (
                            <option key={n} value={n}>{n}</option>
                          ))}
                        </select>
                        <select
                          value={j.leftColumn}
                          onChange={(e) => updateJoin(j.id, { leftColumn: e.target.value })}
                          className="px-2 py-1.5 text-sm font-mono rounded-lg border border-zinc-200 bg-white min-w-[90px] focus:ring-2 focus:ring-indigo-200 outline-none"
                          aria-label="Left column"
                        >
                          {getColumnsForTable(j.leftTable).map((c) => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                        <span className="text-zinc-400 font-bold text-sm">=</span>
                        <select
                          value={j.rightTable}
                          onChange={(e) => {
                            const name = e.target.value;
                            const cols = getColumnsForTable(name);
                            updateJoin(j.id, { rightTable: name, rightColumn: cols[0] ?? '' });
                          }}
                          className="px-2 py-1.5 text-sm font-mono rounded-lg border border-zinc-200 bg-white min-w-[100px] focus:ring-2 focus:ring-indigo-200 outline-none"
                          aria-label="Right table"
                        >
                          {tableNames.map((n) => (
                            <option key={n} value={n}>{n}</option>
                          ))}
                        </select>
                        <select
                          value={j.rightColumn}
                          onChange={(e) => updateJoin(j.id, { rightColumn: e.target.value })}
                          className="px-2 py-1.5 text-sm font-mono rounded-lg border border-zinc-200 bg-white min-w-[90px] focus:ring-2 focus:ring-indigo-200 outline-none"
                          aria-label="Right column"
                        >
                          {getColumnsForTable(j.rightTable).map((c) => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                        <button type="button" onClick={() => removeJoin(j.id)} className="p-1.5 rounded-lg text-zinc-400 hover:bg-red-50 hover:text-red-500 transition-colors" aria-label="Remove JOIN">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            <div>
              <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wide mb-2">Instruction (business logic)</label>
              <textarea
                value={instruction}
                onChange={(e) => setInstruction(e.target.value)}
                placeholder="e.g. Create a month wise view considering created_date and count user_name where active_flag is true"
                className="w-full min-h-[80px] px-3 py-2 text-sm rounded-xl border border-zinc-200 bg-white placeholder:text-zinc-400 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 outline-none transition-all"
                spellCheck={false}
              />
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleGeneratePrompt}
                disabled={processing}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-bold hover:bg-indigo-700 disabled:opacity-50 shadow-sm shadow-indigo-200 transition-all">
              <Shield className="w-4 h-4" />
              Generate AI-safe prompt
            </button>
            {identifierCountPrompt > 0 && (
              <span className="text-xs text-zinc-500 font-medium">
                <span className="font-bold text-indigo-700">{identifierCountPrompt}</span> identifiers masked
              </span>
            )}
          </div>

          {/* Generated prompt output */}
          <div className="rounded-xl border border-indigo-100 bg-white overflow-hidden shadow-sm">
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-indigo-50 bg-indigo-50/40">
              <span className="text-xs font-bold text-zinc-700 uppercase tracking-wide">Generated prompt</span>
              <button type="button" onClick={handleCopyGeneratedPrompt} disabled={!generatedPrompt}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-indigo-600 hover:bg-indigo-50 disabled:opacity-40 transition-colors" aria-label="Copy generated prompt">
                <Clipboard className="w-3.5 h-3.5" />Copy
              </button>
            </div>
            <textarea readOnly value={generatedPrompt}
              className="w-full min-h-[140px] px-4 py-3 text-sm font-mono bg-zinc-50/50 border-0 resize-none placeholder:text-zinc-400"
              placeholder="Generated prompt appears here…" />
          </div>

          {/* Restore AI response (use case 2) */}
          <div className="rounded-xl border border-indigo-200 bg-white overflow-hidden shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-b border-indigo-100 bg-indigo-50/40">
              <div>
                <h3 className="text-sm font-bold text-zinc-900">Restore AI response</h3>
                <p className="text-[11px] text-zinc-500 mt-0.5">Paste the AI&apos;s SQL from the prompt you sent above</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button type="button" onClick={handleRestorePrompt} disabled={!mappingFromPrompt || !restoredFromPrompt.trim()}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
                  <RefreshCw className="w-3.5 h-3.5" />Restore
                </button>
                <button type="button" onClick={() => downloadMapping(mappingFromPrompt, 'prompt')} disabled={!mappingFromPrompt}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-indigo-200 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 disabled:opacity-40 transition-colors">
                  <Download className="w-3.5 h-3.5" />Download mapping
                </button>
                <label className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-indigo-200 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 cursor-pointer transition-colors">
                  <Upload className="w-3.5 h-3.5" />Load mapping
                  <input type="file" accept="application/json" className="hidden" onChange={(e) => loadMappingFile(e, setMappingFromPrompt, setIdentifierCountPrompt)} />
                </label>
              </div>
            </div>
            <div className="min-h-[160px] flex flex-col">
              <TextAreaEditor value={restoredFromPrompt} onChange={setRestoredFromPrompt} placeholder="Paste AI SQL response (with T_000001, C_000001, etc.) here…" />
            </div>
          </div>
        </div>
      </section>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-xl px-4 py-3 text-sm">
          <p className="font-semibold">{error}</p>
        </div>
      )}

      {/* How it works footer note */}
      <div className="rounded-2xl border border-zinc-100 bg-white/80 px-6 py-5 text-center shadow-sm">
        <p className="text-zinc-500 text-sm max-w-2xl mx-auto leading-relaxed">
          <strong className="text-zinc-800">100% data security, client-side only.</strong>{' '}
          The DITE engine (lexer → contextual extraction → deterministic mapping → token-based transform) runs entirely in your browser — no data leaves your device. Web Worker keeps the UI responsive for large inputs.
        </p>
      </div>

      </main>
    </div>
  );
}

type TextAreaEditorProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

function TextAreaEditor({ value, onChange, placeholder }: TextAreaEditorProps) {
  return (
    <textarea
      className="w-full flex-1 min-h-[200px] resize-none border-0 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none text-sm font-mono bg-zinc-50/60 px-4 py-3 placeholder:text-zinc-400"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      spellCheck={false}
    />
  );
}


