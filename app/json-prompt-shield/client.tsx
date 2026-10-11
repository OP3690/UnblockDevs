'use client';

import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { Shield, RefreshCw, Clipboard, Download, Upload, Lock, Cpu, ShieldCheck, Plus, Trash2, FileJson, AlertCircle } from 'lucide-react';
import { trackCopy } from '@/lib/analytics';

// --- Types for new features ---
type IgnoreRuleMode = 'exact' | 'contains' | 'regex';
interface IgnoreRule { pattern: string; mode: IgnoreRuleMode; }

interface PreviewTopKey { key: string; valueType: string; willMask: boolean; }
interface PreviewData { keyCount: number; stringCount: number; boolCount: number; topKeys: PreviewTopKey[]; }

interface BatchFile { name: string; original: string; masked: string | null; error: string | null; }
interface SharedMaskState { keyMap: Map<string, string>; stringMap: Map<string, string>; keyCounter: number; strCounter: number; }

function matchesIgnoreRule(rule: IgnoreRule, key: string): boolean {
  try {
    if (rule.mode === 'exact') return key === rule.pattern;
    if (rule.mode === 'contains') return key.includes(rule.pattern);
    if (rule.mode === 'regex') return new RegExp(rule.pattern, 'i').test(key);
  } catch { /* invalid regex */ }
  return false;
}

function computePreviewData(jsonStr: string, opts: { maskKeys: boolean; maskStrings: boolean; maskBooleans: boolean; ignoreRules: IgnoreRule[] }): PreviewData | null {
  try {
    const parsed = JSON.parse(jsonStr);
    let keyCount = 0, stringCount = 0, boolCount = 0;
    const topKeys: PreviewTopKey[] = [];
    function traverse(obj: unknown, depth: number) {
      if (typeof obj !== 'object' || obj === null) return;
      for (const [k, v] of Object.entries(obj as Record<string, unknown>)) {
        const ignored = opts.ignoreRules.some(r => matchesIgnoreRule(r, k));
        if (depth === 0) topKeys.push({ key: k, valueType: Array.isArray(v) ? 'array' : typeof v, willMask: !ignored && (opts.maskKeys || (opts.maskStrings && typeof v === 'string') || (opts.maskBooleans && typeof v === 'boolean')) });
        if (!ignored) {
          if (opts.maskKeys) keyCount++;
          if (opts.maskStrings && typeof v === 'string') stringCount++;
          if (opts.maskBooleans && typeof v === 'boolean') boolCount++;
        }
        if (typeof v === 'object' && v !== null) traverse(v, depth + 1);
      }
    }
    traverse(parsed, 0);
    return { keyCount, stringCount, boolCount, topKeys };
  } catch { return null; }
}

function maskJsonWithSharedMapping(obj: unknown, state: SharedMaskState, opts: { maskKeys: boolean; maskStrings: boolean; maskBooleans: boolean; ignoreRules: IgnoreRule[] }): unknown {
  if (Array.isArray(obj)) return obj.map(item => maskJsonWithSharedMapping(item, state, opts));
  if (typeof obj === 'object' && obj !== null) {
    const result: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(obj as Record<string, unknown>)) {
      const ignored = opts.ignoreRules.some(r => matchesIgnoreRule(r, k));
      let maskedKey = k;
      if (opts.maskKeys && !ignored) {
        if (!state.keyMap.has(k)) { state.keyCounter++; state.keyMap.set(k, `K_${String(state.keyCounter).padStart(5, '0')}`); }
        maskedKey = state.keyMap.get(k)!;
      }
      let maskedValue: unknown = maskJsonWithSharedMapping(v, state, opts);
      if (!ignored && opts.maskStrings && typeof v === 'string') {
        if (!state.stringMap.has(v)) { state.strCounter++; state.stringMap.set(v, `S_${String(state.strCounter).padStart(5, '0')}`); }
        maskedValue = state.stringMap.get(v)!;
      }
      if (!ignored && opts.maskBooleans && typeof v === 'boolean') maskedValue = v ? 'B_TRUE' : 'B_FALSE';
      result[maskedKey] = maskedValue;
    }
    return result;
  }
  return obj;
}

type JsonShieldMapping = {
  version: string;
  createdAt: string;
  maskKeys: boolean;
  maskStrings: boolean;
  maskBooleans: boolean;
  keyMap: Record<string, string>;
  reverseKeyMap: Record<string, string>;
  stringMap: Record<string, string>;
  reverseStringMap: Record<string, string>;
  booleanMap: Record<string, string>;
  reverseBooleanMap: Record<string, string>;
};

const DEFAULT_EXAMPLE = `{
  "data": [
    {
      "indexName": "NIFTY 50",
      "open": 25571.15,
      "high": 25630.35
    }
  ]
}`;

const JSON_SAMPLES: { label: string; value: string }[] = [
  {
    label: '👤 User profile',
    value: JSON.stringify({
      userId: "usr_8f3a9c12",
      email: "alice.johnson@company.com",
      fullName: "Alice Johnson",
      phoneNumber: "+1-415-555-0192",
      role: "admin",
      department: "engineering",
      apiKey: "sk-prod-x9kLmN3pQrSt",
      lastLogin: "2024-03-15T09:23:00Z",
    }, null, 2),
  },
  {
    label: '🛒 Order payload',
    value: JSON.stringify({
      orderId: "ord_20240315_8821",
      customerId: "cust_88f23a",
      customerEmail: "bob.smith@example.org",
      shippingAddress: { street: "123 Main St", city: "San Francisco", zip: "94105" },
      items: [
        { sku: "PRD-001", productName: "Wireless Headphones", quantity: 2, unitPrice: 79.99 },
      ],
      paymentToken: "tok_visa_4242",
      totalAmount: 159.98,
    }, null, 2),
  },
  {
    label: '⚙️ App config',
    value: JSON.stringify({
      appName: "payment-service",
      environment: "production",
      database: { host: "prod-db.internal.company.com", name: "payments_prod", user: "svc_payments" },
      jwt: { secret: "super-secret-jwt-key-abc123", expiresIn: "24h" },
      stripe: { publishableKey: "pk_live_abc123", webhookSecret: "whsec_xyz789" },
    }, null, 2),
  },
];

export default function JsonPromptShieldClient() {
  const [input, setInput] = useState<string>(DEFAULT_EXAMPLE);
  const [maskedOutput, setMaskedOutput] = useState<string>('');
  const [restored, setRestored] = useState<string>('');
  const [mapping, setMapping] = useState<JsonShieldMapping | null>(null);
  const [identifierCount, setIdentifierCount] = useState<number>(0);
  const [processing, setProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [maskKeys, setMaskKeys] = useState<boolean>(true);
  const [maskStrings, setMaskStrings] = useState<boolean>(true);
  const [maskBooleans, setMaskBooleans] = useState<boolean>(false);
  const [ignoreKeysText, setIgnoreKeysText] = useState<string>('');
  const [ignoreRules, setIgnoreRules] = useState<IgnoreRule[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  const [previewData, setPreviewData] = useState<PreviewData | null>(null);
  const [activeTab, setActiveTab] = useState<'single' | 'batch'>('single');
  const [batchFiles, setBatchFiles] = useState<BatchFile[]>([]);
  const [activeBatchFile, setActiveBatchFile] = useState<number>(0);
  const [batchProcessing, setBatchProcessing] = useState(false);
  const [excludedCount, setExcludedCount] = useState<number>(0);

  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (workerRef.current) return;
    try {
      workerRef.current = new Worker('/workers/json-prompt-shield-worker.js');
      workerRef.current.onmessage = (event: MessageEvent) => {
        const msg = event.data;
        if (!msg) return;
        if (msg.type === 'ERROR') {
          setError(msg.error);
          setProcessing(false);
          return;
        }
        if (msg.type === 'MASK_RESULT') {
          setMaskedOutput(msg.payload.masked);
          setMapping(msg.payload.mapping);
          setIdentifierCount(msg.payload.identifierCount);
          setProcessing(false);
        } else if (msg.type === 'UNMASK_RESULT') {
          setRestored(msg.payload.restored);
          setProcessing(false);
        }
      };
    } catch (e) {
      console.error(e);
      setError('Web Worker not supported.');
    }
    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
        workerRef.current = null;
      }
    };
  }, []);

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

  // Compute ignoreKeys (string array) from both legacy text input and new ignore rules
  const computeIgnoreKeys = useCallback((): string[] => {
    const fromText = ignoreKeysText.split(/[\n,]/).map(k => k.trim()).filter(Boolean);
    const fromRulesExact = ignoreRules.filter(r => r.mode === 'exact' && r.pattern.trim()).map(r => r.pattern.trim());
    return [...new Set([...fromText, ...fromRulesExact])];
  }, [ignoreKeysText, ignoreRules]);

  const requestPreview = () => {
    if (!input.trim()) return;
    const preview = computePreviewData(input.trim(), { maskKeys, maskStrings, maskBooleans, ignoreRules });
    setPreviewData(preview);
    setShowPreview(true);
  };

  const handleMask = useCallback(() => {
    if (!input.trim() || !workerRef.current) return;
    setError(null);
    setProcessing(true);
    setShowPreview(false);
    const ignoreKeys = computeIgnoreKeys();
    workerRef.current.postMessage({
      type: 'MASK',
      payload: {
        input: input.trim(),
        options: { maskKeys, maskStrings, maskBooleans, ignoreKeys },
      },
    });
  }, [input, maskKeys, maskStrings, maskBooleans, computeIgnoreKeys]);

  const handleBatchFiles = useCallback((files: FileList | null) => {
    if (!files) return;
    const arr = Array.from(files).slice(0, 10);
    Promise.all(arr.map(f => f.text())).then(texts => {
      const state: SharedMaskState = { keyMap: new Map(), stringMap: new Map(), keyCounter: 0, strCounter: 0 };
      const results: BatchFile[] = texts.map((text, i) => {
        try {
          const parsed = JSON.parse(text);
          const masked = maskJsonWithSharedMapping(parsed, state, { maskKeys, maskStrings, maskBooleans, ignoreRules });
          return { name: arr[i].name, original: text, masked: JSON.stringify(masked, null, 2), error: null };
        } catch (e) {
          return { name: arr[i].name, original: text, masked: null, error: e instanceof Error ? e.message : 'Invalid JSON' };
        }
      });
      setBatchFiles(results);
      setActiveBatchFile(0);
      const excluded = state.keyMap.size + state.stringMap.size;
      setExcludedCount(excluded);
    });
  }, [maskKeys, maskStrings, maskBooleans, ignoreRules]);

  const handleUnmask = () => {
    if (!restored.trim() || !mapping || !workerRef.current) return;
    setError(null);
    setProcessing(true);
    workerRef.current.postMessage({
      type: 'UNMASK',
      payload: { masked: restored.trim(), mapping },
    });
  };

  const copyMasked = async () => {
    if (!maskedOutput) return;
    try {
      await navigator.clipboard.writeText(maskedOutput);
      trackCopy('json_prompt_shield');
    } catch {}
  };

  const copyRestored = async () => {
    if (!restored) return;
    try {
      await navigator.clipboard.writeText(restored);
      trackCopy('json_prompt_shield');
    } catch {}
  };

  const downloadMapping = () => {
    if (!mapping) return;
    try {
      const blob = new Blob([JSON.stringify(mapping, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `json-prompt-shield-mapping-${new Date().toISOString().replace(/[:.]/g, '-')}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      setError('Failed to download mapping.');
    }
  };

  const loadMappingFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const loaded = JSON.parse(reader.result as string) as JsonShieldMapping;
        setMapping(loaded);
        setIdentifierCount(
          Object.keys(loaded.keyMap || {}).length +
            Object.keys(loaded.stringMap || {}).length +
            Object.keys(loaded.booleanMap || {}).length
        );
        setError(null);
      } catch {
        setError('Invalid mapping file.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-violet-50/30 to-indigo-50">
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
          <nav className="flex items-center gap-2 text-sm text-slate-500 mb-3" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-primary-600">Home</Link>
            <span aria-hidden>/</span>
            <span className="text-slate-700 font-medium">JSON Prompt Shield</span>
          </nav>
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-violet-600 flex-shrink-0" aria-hidden />
                JSON Prompt Shield — Mask JSON Keys &amp; Values Before Sending to ChatGPT
              </h1>
              <p className="mt-1 text-slate-600 text-sm max-w-2xl">
                High-performance JSON payload masking: keys → K_00001, string values → S_00001. Numbers unchanged. Structure preserved. 100% client-side, fully reversible.
              </p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-3 sm:gap-6" role="region" aria-label="Key benefits">
            <div className="flex items-center gap-2 text-violet-700">
              <Lock className="w-4 h-4 flex-shrink-0" aria-hidden />
              <span className="text-sm font-semibold">100% Data Security</span>
              <span className="text-xs text-slate-600 font-normal">—nothing sent to servers</span>
            </div>
            <div className="flex items-center gap-2 text-violet-700">
              <Cpu className="w-4 h-4 flex-shrink-0" aria-hidden />
              <span className="text-sm font-semibold">Client-side only</span>
              <span className="text-xs text-slate-600 font-normal">—runs in your browser</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        <section className="rounded-2xl border-2 border-violet-200 bg-gradient-to-br from-violet-50/40 to-white shadow-md overflow-hidden">
          <div className="px-4 py-3 border-b border-violet-100 bg-violet-50/70">
            <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
              <Shield className="w-5 h-5 text-violet-600" />
              Mask JSON payload
            </h2>
            <p className="text-xs text-slate-600 mt-0.5">
              Paste JSON → mask keys and string values → copy and send to AI → paste AI response below and restore.
            </p>
          </div>
          <div className="p-4 space-y-4">
            <div className="flex flex-wrap gap-4 items-start">
              <label className="inline-flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                <input type="checkbox" checked={maskKeys} onChange={(e) => setMaskKeys(e.target.checked)} className="rounded border-slate-300 text-violet-600" />
                Mask keys
              </label>
              <label className="inline-flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                <input type="checkbox" checked={maskStrings} onChange={(e) => setMaskStrings(e.target.checked)} className="rounded border-slate-300 text-violet-600" />
                Mask string values
              </label>
              <label className="inline-flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                <input type="checkbox" checked={maskBooleans} onChange={(e) => setMaskBooleans(e.target.checked)} className="rounded border-slate-300 text-violet-600" />
                Mask booleans
              </label>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-medium text-slate-700">Ignore keys — exact, contains, or regex</label>
                {identifierCount > 0 && (
                  <span className="text-xs font-semibold text-violet-700 bg-violet-50 border border-violet-200 rounded-full px-2 py-0.5">{identifierCount} masked</span>
                )}
              </div>
              {/* Legacy plain text shortcut */}
              <input
                type="text"
                value={ignoreKeysText}
                onChange={(e) => setIgnoreKeysText(e.target.value)}
                placeholder="Quick ignore: comma-separated key names (e.g. data, meta, status)"
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 bg-white mb-2"
              />
              {/* Advanced multi-rule list */}
              <div className="space-y-1.5">
                {ignoreRules.map((rule, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <select
                      value={rule.mode}
                      onChange={(e) => setIgnoreRules(prev => prev.map((r, i) => i === idx ? { ...r, mode: e.target.value as IgnoreRuleMode } : r))}
                      className="shrink-0 px-2 py-1.5 text-xs rounded-lg border border-slate-200 bg-white text-slate-700"
                    >
                      <option value="exact">Exact</option>
                      <option value="contains">Contains</option>
                      <option value="regex">Regex</option>
                    </select>
                    <input
                      type="text"
                      value={rule.pattern}
                      onChange={(e) => setIgnoreRules(prev => prev.map((r, i) => i === idx ? { ...r, pattern: e.target.value } : r))}
                      placeholder={rule.mode === 'regex' ? 'e.g. ^(id|uuid)' : 'pattern'}
                      className="flex-1 px-2 py-1.5 text-xs rounded-lg border border-slate-200 bg-white"
                    />
                    <button type="button" onClick={() => setIgnoreRules(prev => prev.filter((_, i) => i !== idx))}
                      className="shrink-0 p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
                <button type="button" onClick={() => setIgnoreRules(prev => [...prev, { pattern: '', mode: 'exact' }])}
                  className="inline-flex items-center gap-1 text-xs text-violet-600 hover:text-violet-800 transition-colors">
                  <Plus className="w-3.5 h-3.5" />Add rule
                </button>
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <div id="json-shield-input" className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden flex flex-col min-h-[220px]">
                <div className="flex flex-wrap items-center justify-between gap-1.5 px-4 py-2 border-b border-slate-100 bg-slate-50/50">
                  <span className="text-sm font-semibold text-slate-900">Original JSON</span>
                  <div className="flex flex-wrap items-center gap-1.5">
                    {JSON_SAMPLES.map((s) => (
                      <button
                        key={s.label}
                        type="button"
                        onClick={() => setInput(s.value)}
                        className="inline-flex items-center gap-1 px-2 py-1 rounded-lg border border-violet-200 bg-violet-50 text-xs font-medium text-violet-700 hover:bg-violet-100 transition-colors"
                      >
                        {s.label}
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() => {
                        if (input.trim()) setInput('');
                        else setInput(DEFAULT_EXAMPLE);
                        document.getElementById('json-shield-input')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      }}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      {input.trim() ? 'Clear' : 'Example'}
                    </button>
                  </div>
                </div>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 min-h-[180px] w-full resize-none border-0 p-3 text-sm font-mono bg-white focus:ring-2 focus:ring-violet-500/20"
                  placeholder='Paste JSON (e.g. { "data": [...] })'
                  spellCheck={false}
                />
              </div>
              <div id="json-shield-output" className="rounded-xl border border-violet-100 bg-white shadow-sm overflow-hidden flex flex-col min-h-[220px]">
                <div className="flex items-center justify-between px-4 py-2 border-b border-violet-50 bg-violet-50/50">
                  <span className="text-sm font-semibold text-slate-900">Masked output</span>
                  <div className="flex items-center gap-2">
                    {identifierCount > 0 && (
                      <span className="text-xs text-slate-500">{identifierCount} masked</span>
                    )}
                    <button type="button" onClick={copyMasked} disabled={!maskedOutput} className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium text-violet-600 hover:bg-violet-50 disabled:opacity-40">
                      <Clipboard className="w-3.5 h-3.5" /> Copy
                    </button>
                  </div>
                </div>
                <textarea
                  readOnly
                  value={maskedOutput}
                  className="flex-1 min-h-[180px] w-full resize-none border-0 p-3 text-sm font-mono bg-slate-50/50"
                  placeholder="Masked JSON appears here (K_00001, S_00001, numbers unchanged)"
                  spellCheck={false}
                />
              </div>
            </div>

            {/* Preview panel */}
            {showPreview && previewData && (
              <div className="rounded-xl border-2 border-amber-200 bg-amber-50/60 p-4 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-amber-900">Preview — what will be masked</p>
                    <p className="text-xs text-amber-700 mt-0.5">
                      Will mask: <strong>{previewData.keyCount}</strong> keys · <strong>{previewData.stringCount}</strong> string values · <strong>{previewData.boolCount}</strong> booleans
                    </p>
                  </div>
                  <button type="button" onClick={() => setShowPreview(false)} className="text-amber-500 hover:text-amber-700 transition-colors text-xs underline">dismiss</button>
                </div>
                {previewData.topKeys.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {previewData.topKeys.map(k => (
                      <span key={k.key} className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md border text-xs font-mono ${
                        k.willMask ? 'bg-amber-100 border-amber-300 text-amber-800' : 'bg-slate-100 border-slate-200 text-slate-500'
                      }`}>
                        {k.key}
                        <span className="text-[10px] opacity-70">{k.valueType}</span>
                      </span>
                    ))}
                  </div>
                )}
                <div className="flex gap-2 pt-1">
                  <button
                    type="button"
                    onClick={handleMask}
                    disabled={processing}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-violet-600 text-white text-sm font-semibold hover:bg-violet-700 disabled:opacity-50 shadow-sm transition-colors"
                  >
                    <Shield className="w-4 h-4" />
                    {processing ? 'Masking…' : 'Proceed'}
                  </button>
                  <button type="button" onClick={() => setShowPreview(false)} className="px-4 py-2 rounded-lg border border-slate-200 text-sm text-slate-600 hover:bg-slate-50 transition-colors">Cancel</button>
                </div>
              </div>
            )}

            {/* Primary CTA — always visible, never clipped */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-1">
              <button
                type="button"
                onClick={showPreview ? handleMask : requestPreview}
                disabled={!input.trim() || processing}
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-violet-600 text-white text-base font-semibold hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-md transition-colors w-full sm:w-auto justify-center"
              >
                <Shield className="w-5 h-5" />
                {processing ? 'Masking…' : showPreview ? 'Proceed' : 'Mask JSON'}
                <kbd className="hidden sm:inline-flex items-center rounded border border-white/30 bg-white/20 px-1.5 py-0.5 font-mono text-[11px]">⌘↵</kbd>
              </button>
              {identifierCount > 0 && (
                <span className="text-sm text-slate-500">
                  <span className="font-semibold text-slate-700">{identifierCount}</span> identifiers masked ✓
                </span>
              )}
            </div>
          </div>
        </section>

        <section className="rounded-xl border-2 border-violet-200 bg-white overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-b border-violet-100 bg-violet-50/50">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">Restore AI response</h3>
              <p className="text-xs text-slate-500 mt-0.5">Paste the AI&apos;s JSON reply (with K_00001, S_00001, etc.) and restore to original keys/values</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleUnmask}
                disabled={!mapping || !restored.trim() || processing}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-violet-600 text-white text-sm font-medium hover:bg-violet-700 disabled:opacity-40"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Restore
              </button>
              <button type="button" onClick={copyRestored} disabled={!restored.trim()} className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-violet-200 text-sm font-medium text-violet-700 bg-violet-50 hover:bg-violet-100 disabled:opacity-40">
                <Clipboard className="w-3.5 h-3.5" />
                Copy
              </button>
              <button type="button" onClick={downloadMapping} disabled={!mapping} className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-violet-200 text-sm font-medium text-violet-700 bg-violet-50 hover:bg-violet-100 disabled:opacity-40">
                <Download className="w-3.5 h-3.5" />
                Download mapping
              </button>
              <label className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-violet-200 text-sm font-medium text-violet-700 bg-violet-50 hover:bg-violet-100 cursor-pointer">
                <Upload className="w-3.5 h-3.5" />
                Load mapping
                <input type="file" accept="application/json" className="hidden" onChange={loadMappingFile} />
              </label>
            </div>
          </div>
          <div className="min-h-[200px] flex flex-col">
            <textarea
              value={restored}
              onChange={(e) => setRestored(e.target.value)}
              className="flex-1 min-h-[200px] w-full resize-none border-0 p-4 text-sm font-mono bg-slate-50/80 focus:ring-2 focus:ring-violet-500/20"
              placeholder="Paste AI JSON response (K_00001, S_00001, etc.) here"
              spellCheck={false}
            />
          </div>
          {restored.trim() && mapping && (
            <div className="px-4 py-2 border-t border-slate-100 bg-slate-50/50 text-xs text-slate-500">
              Click Restore to unmask keys and string values using the current mapping.
            </div>
          )}
        </section>

        {/* Batch file masking */}
        <section className="rounded-2xl border-2 border-violet-200 bg-white overflow-hidden">
          <div className="px-4 py-3 border-b border-violet-100 bg-violet-50/70 flex items-center gap-2">
            <FileJson className="w-5 h-5 text-violet-600" />
            <h2 className="text-lg font-semibold text-slate-900">Batch masking</h2>
            <span className="text-xs text-slate-500 ml-1">— mask up to 10 .json files with a shared mapping</span>
          </div>
          <div className="p-4 space-y-4">
            <label className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-violet-200 bg-violet-50/30 px-4 py-8 cursor-pointer hover:bg-violet-50/60 transition-colors">
              <Upload className="w-6 h-6 text-violet-500" />
              <span className="text-sm font-medium text-slate-700">Drop .json files here or click to select</span>
              <span className="text-xs text-slate-400">Up to 10 files · shared mapping keeps tokens consistent</span>
              <input
                type="file"
                accept="application/json,.json"
                multiple
                className="hidden"
                onChange={(e) => handleBatchFiles(e.target.files)}
              />
            </label>

            {batchFiles.length > 0 && (
              <div className="space-y-3">
                {/* File tabs */}
                <div className="flex flex-wrap gap-1.5">
                  {batchFiles.map((f, idx) => (
                    <button key={idx} type="button"
                      onClick={() => setActiveBatchFile(idx)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border ${
                        activeBatchFile === idx ? 'bg-violet-600 text-white border-violet-600' : 'border-violet-200 bg-violet-50 text-violet-700 hover:bg-violet-100'
                      }`}>
                      {f.name}
                      {f.error && <AlertCircle className="w-3 h-3 ml-1 inline text-red-400" />}
                    </button>
                  ))}
                </div>

                {/* Active file output */}
                {batchFiles[activeBatchFile] && (
                  <div className="rounded-xl border border-violet-100 bg-white overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-2 border-b border-violet-50 bg-violet-50/50">
                      <span className="text-xs font-semibold text-slate-700">{batchFiles[activeBatchFile].name}</span>
                      {batchFiles[activeBatchFile].masked && (
                        <button type="button"
                          onClick={() => { navigator.clipboard.writeText(batchFiles[activeBatchFile].masked!); trackCopy('json_prompt_shield'); }}
                          className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium text-violet-600 hover:bg-violet-50">
                          <Clipboard className="w-3.5 h-3.5" /> Copy
                        </button>
                      )}
                    </div>
                    {batchFiles[activeBatchFile].error ? (
                      <p className="p-3 text-sm text-red-700">{batchFiles[activeBatchFile].error}</p>
                    ) : (
                      <textarea readOnly value={batchFiles[activeBatchFile].masked ?? ''}
                        className="w-full min-h-[200px] resize-none border-0 p-3 text-sm font-mono bg-slate-50/50" />
                    )}
                  </div>
                )}

                {/* Copy all */}
                <button type="button"
                  onClick={() => {
                    const all = batchFiles.filter(f => f.masked).map(f => `// === FILE: ${f.name} ===\n${f.masked}`).join('\n\n');
                    navigator.clipboard.writeText(all);
                    trackCopy('json_prompt_shield');
                  }}
                  disabled={batchFiles.every(f => !f.masked)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-violet-600 text-white text-sm font-semibold hover:bg-violet-700 disabled:opacity-40 transition-colors">
                  <Clipboard className="w-4 h-4" /> Copy all (separated)
                </button>
              </div>
            )}
          </div>
        </section>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 rounded-xl px-4 py-3 text-sm">
            <p className="font-medium">{error}</p>
          </div>
        )}

        <p className="text-center text-slate-500 text-sm">
          Keys → K_00001, string values → S_00001. Numbers and null unchanged. Iterative traversal supports large payloads (MBs). All processing in your browser.
        </p>
      </main>
    </div>
  );
}
