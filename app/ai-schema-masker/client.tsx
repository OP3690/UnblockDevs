'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ShieldCheck, Cpu, RefreshCw, Clipboard, Download, Upload, Shield, Plus, Trash2, FileCode, Lock, Award } from 'lucide-react';

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
  payload: { input: string; mode: 'fast' | 'enterprise' };
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

type MaskResponse =
  | { type: 'MASK_RESULT'; payload: { masked: string; identifierCount: number; mapping: SchemaMaskMapping } }
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

export default function AiSchemaMaskerClient() {
  const [input, setInput] = useState<string>(DEFAULT_EXAMPLE);
  const [maskedOutput, setMaskedOutput] = useState<string>('');
  const [restoredFromMask, setRestoredFromMask] = useState<string>('');
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

  const handleMask = () => {
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
      },
    };

    workerRef.current.postMessage(request);
  };

  const handleRestoreMask = () => {
    if (!restoredFromMask.trim() || !mappingFromMask || !workerRef.current) return;
    setError(null);
    setProcessing(true);
    setProgress(5);
    startProgressInterval();
    pendingRestoreRef.current = 'mask';
    workerRef.current.postMessage({
      type: 'RESTORE',
      payload: { masked: restoredFromMask, reverseMap: mappingFromMask.reverseMap },
    });
  };

  const handleRestorePrompt = () => {
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
    } catch {
      // ignore
    }
  };

  const handleCopyGeneratedPrompt = async () => {
    if (!generatedPrompt) return;
    try {
      await navigator.clipboard.writeText(generatedPrompt);
    } catch {
      // ignore
    }
  };

  const handleGeneratePrompt = () => {
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
          <nav className="flex items-center gap-2 text-sm text-slate-500 mb-3" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-primary-600">Home</Link>
            <span aria-hidden>/</span>
            <span className="text-slate-700 font-medium">AI Schema Masker</span>
          </nav>
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-emerald-600 flex-shrink-0" aria-hidden />
                AI Schema Masker
              </h1>
              <p className="mt-1 text-slate-600 text-sm max-w-2xl">
                World&apos;s first fully client-side SQL identifier masker. Mask tables and columns for AI prompts, then restore the response—all in your browser. No data ever leaves your device.
              </p>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <label className="inline-flex items-center gap-2 text-xs text-slate-600 cursor-pointer whitespace-nowrap">
                <input
                  type="checkbox"
                  className="rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                  checked={saveToSession}
                  onChange={(e) => setSaveToSession(e.target.checked)}
                />
                <span>Keep mapping in tab</span>
              </label>
            </div>
          </div>
          {/* Trust strip: World's first, 100% Data Security, Client-side only */}
          <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-3 sm:gap-6" role="region" aria-label="Key benefits">
            <div className="flex items-center gap-2 text-emerald-700">
              <Award className="w-4 h-4 flex-shrink-0" aria-hidden />
              <span className="text-sm font-semibold">World&apos;s first</span>
              <span className="text-xs text-slate-600 font-normal">client-side DITE-based SQL masker</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-700">
              <Lock className="w-4 h-4 flex-shrink-0" aria-hidden />
              <span className="text-sm font-semibold">100% Data Security</span>
              <span className="text-xs text-slate-600 font-normal">—nothing sent to servers</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-700">
              <Cpu className="w-4 h-4 flex-shrink-0" aria-hidden />
              <span className="text-sm font-semibold">Client-side only</span>
              <span className="text-xs text-slate-600 font-normal">—runs entirely in your browser</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        {processing && (
          <div className="flex items-center gap-3 rounded-xl bg-white border border-slate-200 px-4 py-2.5 shadow-sm">
            <div className="flex-1 h-1.5 rounded-full bg-slate-100 overflow-hidden">
              <div
                className="h-full bg-primary-500 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-xs font-medium text-slate-600 tabular-nums">{progress}%</span>
          </div>
        )}

        {/* Use case 1: Mask raw SQL */}
        <section className="rounded-2xl border-2 border-primary-200 bg-gradient-to-br from-primary-50/30 to-white shadow-md overflow-hidden space-y-4 p-4">
          <div className="flex items-center gap-2">
            <div>
              <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary-600" />
                Mask raw SQL
              </h2>
              <p className="text-xs text-slate-600 mt-0.5">
                Paste existing SQL → mask identifiers → send to AI → paste AI response and restore below.
              </p>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden flex flex-col min-h-[300px]">
            <div className="flex flex-wrap items-start justify-between gap-3 px-4 py-3 border-b border-slate-100 bg-slate-50/50">
              <div className="min-w-0">
                <h3 className="text-sm font-semibold text-slate-900">Original input</h3>
                <p className="text-xs text-slate-500 mt-0.5">SQL, procedures,<br />CTEs, or JSON (up to ~5MB)</p>
              </div>
              <div className="flex items-center justify-end gap-2 ml-auto flex-shrink-0">
                <button
                  type="button"
                  onClick={() => (input.trim() ? setInput('') : setInput(DEFAULT_EXAMPLE))}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 hover:border-slate-300 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  {input.trim() ? 'Clear example' : 'See clear example'}
                </button>
                <button
                  type="button"
                  onClick={handleMask}
                  disabled={!input.trim() || processing}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-600 text-white text-sm font-semibold hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm transition-colors"
                >
                  <Shield className="w-4 h-4" />
                  Mask identifiers
                </button>
              </div>
            </div>
            <div className="flex-1 min-h-[240px] flex flex-col">
              <TextAreaEditor value={input} onChange={setInput} placeholder="Paste your SQL or JSON here…" />
            </div>
            {identifierCountMask > 0 && (
              <div className="px-4 py-2 border-t border-slate-100 bg-slate-50/30 text-xs text-slate-500">
                <span className="font-medium text-slate-700">{identifierCountMask}</span> identifiers masked
              </div>
            )}
          </div>

          <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden flex flex-col min-h-[260px]">
            <div className="flex flex-wrap items-start justify-between gap-3 px-4 py-3 border-b border-slate-100 bg-slate-50/50">
              <div className="min-w-0">
                <h3 className="text-sm font-semibold text-slate-900">Masked output</h3>
                <p className="text-xs text-slate-500 mt-0.5">Copy and send to AI</p>
              </div>
              <button
                type="button"
                onClick={handleCopyMasked}
                disabled={!maskedOutput}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex-shrink-0"
              >
                <Clipboard className="w-3.5 h-3.5" />
                Copy
              </button>
            </div>
            <div className="flex-1 min-h-[200px] flex flex-col">
              <TextAreaEditor value={maskedOutput} onChange={setMaskedOutput} placeholder="Masked query appears here" />
            </div>
          </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-b border-slate-100 bg-slate-50/50">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">Restore AI response (use case 1)</h3>
                <p className="text-xs text-slate-500 mt-0.5">Paste the AI&apos;s reply from the masked query above</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handleRestoreMask}
                  disabled={!mappingFromMask || !restoredFromMask.trim()}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-primary-600 text-white text-sm font-medium hover:bg-primary-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Restore
                </button>
                <button
                  type="button"
                  onClick={() => downloadMapping(mappingFromMask, 'mask')}
                  disabled={!mappingFromMask}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 disabled:opacity-40 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download mapping
                </button>
                <label className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 cursor-pointer transition-colors">
                  <Upload className="w-3.5 h-3.5" />
                  Load mapping
                  <input
                    type="file"
                    accept="application/json"
                    className="hidden"
                    onChange={(e) => loadMappingFile(e, setMappingFromMask, setIdentifierCountMask)}
                  />
                </label>
              </div>
            </div>
            <div className="min-h-[160px] flex flex-col">
              <TextAreaEditor value={restoredFromMask} onChange={setRestoredFromMask} placeholder="Paste AI response (with T_000001, C_000001, etc.) here" />
            </div>
          </div>
        </section>

        {/* Use case 2: Secure AI Prompt Compiler */}
        <section className="rounded-2xl border-2 border-indigo-200 bg-gradient-to-br from-indigo-50/40 to-white shadow-md overflow-hidden">
          <div className="px-4 py-4 border-b border-indigo-100 bg-indigo-50/70">
            <div className="flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600 text-white text-sm font-bold">2</span>
              <div>
                <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                  <FileCode className="w-5 h-5 text-indigo-600" />
                  Secure AI Prompt Compiler
                </h2>
                <p className="text-xs text-slate-600 mt-0.5">
                  Schema + instruction → AI-safe prompt. No raw SQL; you define tables and columns, then restore the AI&apos;s SQL here.
                </p>
              </div>
            </div>
          </div>
          <div className="p-4 space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-slate-700">Tables & columns</span>
                <button
                  type="button"
                  onClick={addTable}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-indigo-200 text-xs font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add table
                </button>
              </div>
              <div className="space-y-3">
                {structuredTables.map((t) => (
                  <div key={t.id} className="rounded-lg border border-indigo-100 bg-white p-3 space-y-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <input
                        type="text"
                        value={t.name}
                        onChange={(e) => updateTable(t.id, e.target.value, t.columns)}
                        placeholder="Table name"
                        className="flex-1 min-w-[120px] px-2.5 py-1.5 text-sm font-mono rounded border border-slate-200 bg-white"
                      />
                      <button type="button" onClick={() => removeTable(t.id)} className="p-1.5 rounded text-slate-500 hover:bg-red-50 hover:text-red-600" aria-label="Remove table">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="pl-2 flex flex-wrap gap-1.5 items-center">
                      {t.columns.map((col, idx) => (
                        <span key={idx} className="inline-flex items-center gap-1">
                          <input
                            type="text"
                            value={col}
                            onChange={(e) => setColumn(t.id, idx, e.target.value)}
                            placeholder="Column"
                            className="w-28 px-2 py-1 text-xs font-mono rounded border border-slate-200 bg-white"
                          />
                          <button type="button" onClick={() => removeColumn(t.id, idx)} className="p-1 text-slate-400 hover:text-red-600 rounded" aria-label="Remove column">
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                      <button type="button" onClick={() => addColumn(t.id)} className="inline-flex items-center gap-1 px-2 py-1 text-xs text-indigo-600 rounded border border-dashed border-indigo-200 hover:bg-indigo-50">
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
                    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-indigo-200 text-xs font-medium text-indigo-700 bg-white hover:bg-indigo-50"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add JOIN
                  </button>
                </div>
                {joins.length === 0 ? (
                  <p className="text-xs text-slate-500">Add at least one JOIN so the AI knows how to connect tables (e.g. table_a.id = table_b.foreign_id).</p>
                ) : (
                  <div className="space-y-2">
                    {joins.map((j) => (
                      <div key={j.id} className="flex flex-wrap items-center gap-2">
                        <select
                          value={j.joinType}
                          onChange={(e) => updateJoin(j.id, { joinType: e.target.value as JoinType })}
                          className="px-2 py-1.5 text-sm rounded border border-slate-200 bg-white min-w-[120px]"
                          title="Join type"
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
                          className="px-2 py-1.5 text-sm font-mono rounded border border-slate-200 bg-white min-w-[100px]"
                        >
                          {tableNames.map((n) => (
                            <option key={n} value={n}>{n}</option>
                          ))}
                        </select>
                        <select
                          value={j.leftColumn}
                          onChange={(e) => updateJoin(j.id, { leftColumn: e.target.value })}
                          className="px-2 py-1.5 text-sm font-mono rounded border border-slate-200 bg-white min-w-[90px]"
                        >
                          {getColumnsForTable(j.leftTable).map((c) => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                        <span className="text-slate-400 font-medium">=</span>
                        <select
                          value={j.rightTable}
                          onChange={(e) => {
                            const name = e.target.value;
                            const cols = getColumnsForTable(name);
                            updateJoin(j.id, { rightTable: name, rightColumn: cols[0] ?? '' });
                          }}
                          className="px-2 py-1.5 text-sm font-mono rounded border border-slate-200 bg-white min-w-[100px]"
                        >
                          {tableNames.map((n) => (
                            <option key={n} value={n}>{n}</option>
                          ))}
                        </select>
                        <select
                          value={j.rightColumn}
                          onChange={(e) => updateJoin(j.id, { rightColumn: e.target.value })}
                          className="px-2 py-1.5 text-sm font-mono rounded border border-slate-200 bg-white min-w-[90px]"
                        >
                          {getColumnsForTable(j.rightTable).map((c) => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                        <button type="button" onClick={() => removeJoin(j.id)} className="p-1.5 rounded text-slate-500 hover:bg-red-50 hover:text-red-600" aria-label="Remove JOIN">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1.5">Instruction (business logic)</label>
              <textarea
                value={instruction}
                onChange={(e) => setInstruction(e.target.value)}
                placeholder="e.g. Create a month wise view considering created_date and count user_name where active_flag is true"
                className="w-full min-h-[80px] px-3 py-2 text-sm rounded-lg border border-slate-200 bg-white placeholder:text-slate-400"
                spellCheck={false}
              />
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleGeneratePrompt}
                disabled={processing}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 disabled:opacity-50"
              >
                <Shield className="w-4 h-4" />
                Generate AI-safe prompt
              </button>
              {identifierCountPrompt > 0 && (
                <span className="text-xs text-slate-500">
                  <span className="font-medium text-indigo-700">{identifierCountPrompt}</span> identifiers
                </span>
              )}
            </div>

            <div className="rounded-xl border border-indigo-100 bg-white overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 border-b border-indigo-50">
                <span className="text-xs font-medium text-slate-700">Generated prompt (copy and send to AI)</span>
                <button type="button" onClick={handleCopyGeneratedPrompt} disabled={!generatedPrompt} className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium text-indigo-600 hover:bg-indigo-50 disabled:opacity-40">
                  <Clipboard className="w-3.5 h-3.5" /> Copy
                </button>
              </div>
              <textarea
                readOnly
                value={generatedPrompt}
                className="w-full min-h-[140px] px-3 py-2 text-sm font-mono bg-slate-50/50 border-0 resize-none placeholder:text-slate-400"
                placeholder="Generated prompt appears here"
              />
            </div>

            <div className="rounded-xl border border-indigo-200 bg-white overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-b border-indigo-100 bg-indigo-50/50">
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">Restore AI response (use case 2)</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Paste the AI&apos;s SQL reply from the prompt you sent above</p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={handleRestorePrompt}
                    disabled={!mappingFromPrompt || !restoredFromPrompt.trim()}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Restore
                  </button>
                  <button
                    type="button"
                    onClick={() => downloadMapping(mappingFromPrompt, 'prompt')}
                    disabled={!mappingFromPrompt}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-indigo-200 text-sm font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 disabled:opacity-40 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download mapping
                  </button>
                  <label className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-indigo-200 text-sm font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 cursor-pointer transition-colors">
                    <Upload className="w-3.5 h-3.5" />
                    Load mapping
                    <input type="file" accept="application/json" className="hidden" onChange={(e) => loadMappingFile(e, setMappingFromPrompt, setIdentifierCountPrompt)} />
                  </label>
                </div>
              </div>
              <div className="min-h-[160px] flex flex-col">
                <TextAreaEditor value={restoredFromPrompt} onChange={setRestoredFromPrompt} placeholder="Paste AI SQL response (with T_000001, C_000001, etc.) here" />
              </div>
            </div>
          </div>
        </section>

        {error && (
          <section>
            <div className="bg-red-50 border border-red-200 text-red-800 rounded-xl px-4 py-3 text-sm">
              <p className="font-medium">{error}</p>
            </div>
          </section>
        )}

        <section className="rounded-xl border border-slate-200 bg-white/80 px-4 py-4 text-center" aria-label="How it works">
          <h2 className="sr-only">How AI Schema Masker works</h2>
          <p className="text-slate-600 text-sm max-w-2xl mx-auto">
            <strong className="text-slate-800">100% data security, client-side only.</strong> The DITE engine (lexer → contextual extraction → deterministic mapping → token-based transform) runs entirely in your browser; no data leaves your device. Web Worker keeps the UI responsive for large inputs. Your SQL and schemas stay private.
          </p>
        </section>
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
      className="w-full flex-1 min-h-[200px] resize-none border-0 focus:ring-2 focus:ring-primary-500/20 focus:outline-none focus:border-primary-400 text-sm font-mono bg-slate-50/80 px-4 py-3 placeholder:text-slate-400"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      spellCheck={false}
    />
  );
}


