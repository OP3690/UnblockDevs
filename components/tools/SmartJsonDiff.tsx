'use client';

import { useState, useCallback } from 'react';
import {
  GitCompare,
  Copy,
  Plus,
  Minus,
  Edit,
  AlertCircle,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  FileCode2,
  Columns,
  BarChart3,
  Shield,
  BookOpen,
  X,
} from 'lucide-react';
import toast from 'react-hot-toast';
import {
  smartDiff,
  defaultNormalizationConfig,
  type NormalizationConfig,
  type DiffEntry,
  type EntropyEntry,
} from '@/lib/smartJsonDiff';

function formatValue(v: unknown): string {
  if (v === undefined) return '—';
  if (v === null) return 'null';
  if (typeof v === 'string') return v.length > 80 ? v.slice(0, 80) + '…' : v;
  if (typeof v === 'object') return JSON.stringify(v).slice(0, 100) + (JSON.stringify(v).length > 100 ? '…' : '');
  return String(v);
}

function formatReason(reason: string): string {
  const map: Record<string, string> = {
    UUID: 'UUID',
    ISO_DATE: 'ISO date',
    JWT: 'JWT',
    'JWT (key)': 'JWT',
    'JWT (Bearer)': 'JWT',
    HASH: 'Hash',
    EPOCH: 'Epoch',
    PREFIXED_ID: 'Prefixed ID',
    IGNORED_KEY: 'Pattern match',
  };
  return map[reason] ?? reason;
}

function pathToJsonPointer(path: string): string {
  if (!path) return '';
  const segments = path.split('.').map((s) => s.replace(/^\[(\d+)\]$/, '$1'));
  return '/' + segments.join('/');
}

function changesToJsonPatch(changes: DiffEntry[]): string {
  const ops: { op: string; path: string; value?: unknown }[] = [];
  for (const d of changes) {
    const path = pathToJsonPointer(d.path);
    if (d.type === 'added' && d.after !== undefined) ops.push({ op: 'add', path, value: d.after });
    else if (d.type === 'removed') ops.push({ op: 'remove', path });
    else if ((d.type === 'value_changed' || d.type === 'changed') && d.after !== undefined)
      ops.push({ op: 'replace', path, value: d.after });
  }
  return JSON.stringify(ops, null, 2);
}

function changeTypeLabel(type: string): string {
  const map: Record<string, string> = {
    value_changed: 'value_changed',
    type_changed: 'type_changed',
    added: 'added',
    removed: 'removed',
    changed: 'value_changed',
  };
  return map[type] ?? type;
}

const PRESETS = [
  { name: 'API', config: { ...defaultNormalizationConfig, arrayMode: 'unordered' as const } },
  { name: 'Webhook', config: { ...defaultNormalizationConfig, arrayMode: 'ordered' as const } },
  {
    name: 'Strict',
    config: {
      ...defaultNormalizationConfig,
      maskUUID: false,
      maskISODate: false,
      maskEpoch: false,
      maskJWT: false,
      maskHash: false,
      maskPrefixedId: false,
      arrayMode: 'ordered' as const,
    },
  },
];

const EXAMPLE_JSON_A = `{
  "user": {
    "id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    "last_login": "2026-03-01T14:22:10Z",
    "session_token": "eyJhbGciOiJIUzI1NiIsInR5cCI...[prod_sig]",
    "profile": {
      "status": "active",
      "is_premium": true,
      "tags": ["beta_tester", "dark_mode", "api_user"]
    },
    "recent_payments": [
      {"receipt": "rec_998877", "amount": 49.99, "date": 1740838930},
      {"receipt": "rec_998878", "amount": 12.00, "date": 1740925330}
    ]
  },
  "meta": {
    "request_id": "req_prod_8829104",
    "latency_ms": 142
  }
}`;

const EXAMPLE_JSON_B = `{
  "user": {
    "id": "a12bc34d-89ef-4567-b890-1f23c4d5e678",
    "last_login": "2026-03-02T10:15:00Z",
    "session_token": "eyJhbGciOiJIUzI1NiIsInR5cCI...[local_sig]",
    "profile": {
      "status": "active",
      "is_premium": false,
      "tags": ["api_user", "beta_tester", "dark_mode"]
    },
    "recent_payments": [
      {"receipt": "rec_112233", "amount": 49.99, "date": 1740960000},
      {"receipt": "rec_112234", "amount": 12.00, "date": 1740963600}
    ]
  },
  "meta": {
    "request_id": "req_local_1192837",
    "latency_ms": 38
  }
}`;

export default function SmartJsonDiff() {
  const [jsonA, setJsonA] = useState('');
  const [jsonB, setJsonB] = useState('');
  const [config, setConfig] = useState<NormalizationConfig>(PRESETS[0].config);
  const [activePreset, setActivePreset] = useState('API');
  const [result, setResult] = useState<Awaited<ReturnType<typeof smartDiff>> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'structured' | 'sidebyside'>('structured');
  const [entropyOpen, setEntropyOpen] = useState(false);
  const [metricsOpen, setMetricsOpen] = useState(false);

  const runDiff = useCallback(() => {
    setError(null);
    setResult(null);
    if (!jsonA.trim() || !jsonB.trim()) {
      setError('Paste JSON in both panels.');
      return;
    }
    try {
      const r = smartDiff(jsonA, jsonB, config);
      setResult(r);
      setEntropyOpen(false);
      setMetricsOpen(false);
      toast.success(
        r.changes.length === 0 ? 'No semantic differences.' : `${r.changes.length} meaningful change(s).`
      );
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Invalid JSON or diff failed';
      setError(msg);
      setResult(null);
      toast.error(msg);
    }
  }, [jsonA, jsonB, config]);

  const applyPreset = useCallback((name: string, presetConfig: NormalizationConfig) => {
    setActivePreset(name);
    setConfig(presetConfig);
  }, []);

  const loadExample = useCallback(() => {
    setJsonA(EXAMPLE_JSON_A);
    setJsonB(EXAMPLE_JSON_B);
    setError(null);
    setResult(null);
    applyPreset('API', PRESETS[0].config);
    toast.success('Example loaded. Click Compare to see semantic diff.');
  }, [applyPreset]);

  const entropyReduction =
    result && result.entropyReport.length + result.changes.length > 0
      ? Math.round(
          (100 * result.entropyReport.length) / (result.entropyReport.length + result.changes.length)
        )
      : 0;
  const confidence =
    result && result.entropyReport.length + result.changes.length > 0
      ? entropyReduction >= 80 && result.changes.length <= 5
        ? 'High'
        : result.changes.length <= 10
          ? 'Medium'
          : 'Low'
      : null;

  const copySummary = useCallback(() => {
    if (!result) return;
    const lines = [
      'Semantic Diff Report',
      '────────────────────',
      `Meaningful changes: ${result.changes.length}`,
      `Noise removed: ${result.entropyReport.length} fields`,
      `Entropy reduction: ${entropyReduction}%`,
      `Mode: ${activePreset}`,
      `Array mode: ${(config.arrayMode ?? 'unordered') === 'unordered' ? 'Unordered' : 'Ordered'}`,
      ...(config.arrayIdentityKeys?.length
        ? [`Identity keys: ${config.arrayIdentityKeys.join(', ')}`]
        : []),
      '',
      ...result.changes.map((d) => {
        const label = changeTypeLabel(d.type);
        return [
          `● ${d.path || 'root'}`,
          `  Change: ${label}`,
          d.before !== undefined ? `  Before: ${formatValue(d.before)}` : '',
          d.after !== undefined ? `  After:  ${formatValue(d.after)}` : '',
        ]
          .filter(Boolean)
          .join('\n');
      }),
    ];
    navigator.clipboard.writeText(lines.join('\n')).then(
      () => toast.success('Summary copied.'),
      () => toast.error('Copy failed.')
    );
  }, [result, activePreset, config, entropyReduction]);

  const copyMarkdown = useCallback(() => {
    if (!result) return;
    const lines = [
      '## Semantic Changes',
      '',
      ...result.changes.map((d) => {
        const label = changeTypeLabel(d.type);
        return [
          `### ${d.path || 'root'}`,
          `- **Change:** ${label}`,
          d.before !== undefined ? `- **Before:** \`${formatValue(d.before)}\`` : '',
          d.after !== undefined ? `- **After:** \`${formatValue(d.after)}\`` : '',
          '',
        ]
          .filter(Boolean)
          .join('\n');
      }),
    ];
    navigator.clipboard.writeText(lines.join('\n')).then(
      () => toast.success('Markdown copied.'),
      () => toast.error('Copy failed.')
    );
  }, [result]);

  const copyJsonPatch = useCallback(() => {
    if (!result || result.changes.length === 0) return;
    navigator.clipboard.writeText(changesToJsonPatch(result.changes)).then(
      () => toast.success('JSON Patch copied.'),
      () => toast.error('Copy failed.')
    );
  }, [result]);

  const formatBytes = (n: number) => (n < 1024 ? `${n} B` : `${(n / 1024).toFixed(1)} KB`);

  /** Side-by-side code block with line numbers; line numbers scroll with content. Flat background, no inner shadow, to avoid horizontal band at line 19 when scrolling. */
  const CodeWithLineNumbers = useCallback(
    ({ text, label }: { text: string; label: string }) => {
      const lines = text.split('\n');
      const lineNumbersText = lines.map((_, i) => i + 1).join('\n');
      return (
        <div className="flex flex-col">
          <div className="mb-2 text-xs font-medium text-gray-500">{label}</div>
          <div className="json-comparator-sidebyside flex max-h-[420px] overflow-auto rounded-lg border border-gray-700 bg-gray-900">
            <pre
              className="json-comparator-sidebyside-linenums flex-shrink-0 select-none border-r border-gray-700 bg-gray-800 py-4 pl-3 pr-2 text-right font-mono text-[13px] leading-relaxed text-gray-500"
              aria-hidden
            >
              {lineNumbersText}
            </pre>
            <pre className="json-comparator-sidebyside-code min-w-0 flex-1 py-4 pl-3 pr-4 font-mono text-[13px] leading-relaxed text-gray-100">
              {text}
            </pre>
          </div>
        </div>
      );
    },
    []
  );

  return (
    <div className="space-y-6">
      {/* Header + Input card */}
      <div className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-md shadow-gray-200/50">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-gray-900">Semantic Payload Comparison</h2>
            <p className="mt-1 text-sm text-gray-500">
              Debug API changes without the noise. Only meaningful logic changes surface.
            </p>
          </div>
          <button
            type="button"
            onClick={loadExample}
            className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-primary-200 bg-primary-50 px-4 py-2 text-sm font-medium text-primary-700 hover:bg-primary-100 hover:border-primary-300"
          >
            <BookOpen className="h-4 w-4" />
            Load example
          </button>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div className="flex flex-col">
            <div className="mb-1.5 flex items-center justify-between gap-2">
              <label className="text-sm font-medium text-gray-700">JSON A</label>
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-gray-400">Source / Before</span>
                <button
                  type="button"
                  onClick={() => { setJsonA(''); setError(null); setResult(null); }}
                  disabled={!jsonA}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-amber-200 bg-amber-50 px-2.5 py-1.5 text-xs font-medium text-amber-800 shadow-sm hover:bg-amber-100 hover:border-amber-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:border-gray-200 disabled:text-gray-400 disabled:hover:bg-gray-50 disabled:hover:border-gray-200"
                  title="Clear JSON A"
                >
                  <X className="h-3.5 w-3.5" />
                  Clear
                </button>
              </div>
            </div>
            <textarea
              value={jsonA}
              onChange={(e) => setJsonA(e.target.value)}
              placeholder='Paste first payload or load example'
              className="min-h-[200px] w-full resize-y rounded-xl border border-gray-200 bg-gray-50/60 p-3.5 font-mono text-[13px] leading-relaxed text-gray-800 placeholder:text-gray-400 focus:border-primary-500 focus:bg-white focus:ring-2 focus:ring-primary-500/20 transition-shadow"
              spellCheck={false}
            />
          </div>
          <div className="flex flex-col">
            <div className="mb-1.5 flex items-center justify-between gap-2">
              <label className="text-sm font-medium text-gray-700">JSON B</label>
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-gray-400">Target / After</span>
                <button
                  type="button"
                  onClick={() => { setJsonB(''); setError(null); setResult(null); }}
                  disabled={!jsonB}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-amber-200 bg-amber-50 px-2.5 py-1.5 text-xs font-medium text-amber-800 shadow-sm hover:bg-amber-100 hover:border-amber-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:border-gray-200 disabled:text-gray-400 disabled:hover:bg-gray-50 disabled:hover:border-gray-200"
                  title="Clear JSON B"
                >
                  <X className="h-3.5 w-3.5" />
                  Clear
                </button>
              </div>
            </div>
            <textarea
              value={jsonB}
              onChange={(e) => setJsonB(e.target.value)}
              placeholder='Paste second payload or load example'
              className="min-h-[200px] w-full resize-y rounded-xl border border-gray-200 bg-gray-50/60 p-3.5 font-mono text-[13px] leading-relaxed text-gray-800 placeholder:text-gray-400 focus:border-primary-500 focus:bg-white focus:ring-2 focus:ring-primary-500/20 transition-shadow"
              spellCheck={false}
            />
          </div>
        </div>

        {/* Presets + Strict */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium text-gray-500">Preset</span>
          {PRESETS.map((p) => (
            <button
              key={p.name}
              type="button"
              onClick={() => applyPreset(p.name, p.config)}
              className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
                activePreset === p.name
                  ? 'border-primary-500 bg-primary-50 text-primary-700'
                  : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              {p.name}
            </button>
          ))}
          <span className="ml-2 text-xs text-gray-400">
            {activePreset === 'Strict' ? 'No normalization' : 'Dynamic fields masked by default'}
          </span>
        </div>

        {/* Options: compact */}
        <details className="mt-3 group">
          <summary className="cursor-pointer text-xs font-medium text-gray-500 hover:text-gray-700">
            Normalization options
          </summary>
          <div className="mt-2 rounded-lg border border-gray-100 bg-gray-50/50 p-3">
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
              {[
                { k: 'maskUUID', l: 'UUID' },
                { k: 'maskISODate', l: 'ISO date' },
                { k: 'maskEpoch', l: 'Epoch' },
                { k: 'maskJWT', l: 'JWT' },
                { k: 'maskHash', l: 'Hash' },
                { k: 'maskPrefixedId', l: 'Prefixed ID' },
              ].map(({ k, l }) => (
                <label key={k} className="flex items-center gap-1.5">
                  <input
                    type="checkbox"
                    checked={Boolean((config as any)[k])}
                    onChange={(e) => setConfig((c) => ({ ...c, [k]: e.target.checked }))}
                    className="h-3.5 w-3.5 rounded border-gray-300 text-primary-600"
                  />
                  {l}
                </label>
              ))}
            </div>
            <div className="mt-2 flex items-center gap-3 text-sm">
              <span className="text-gray-500">Array mode</span>
              <label className="flex items-center gap-1.5">
                <input
                  type="radio"
                  name="arrayMode"
                  checked={(config.arrayMode ?? 'unordered') === 'unordered'}
                  onChange={() => setConfig((c) => ({ ...c, arrayMode: 'unordered' }))}
                  className="h-3.5 w-3.5 text-primary-600"
                />
                Unordered
              </label>
              <label className="flex items-center gap-1.5">
                <input
                  type="radio"
                  name="arrayMode"
                  checked={(config.arrayMode ?? 'unordered') === 'ordered'}
                  onChange={() => setConfig((c) => ({ ...c, arrayMode: 'ordered' }))}
                  className="h-3.5 w-3.5 text-primary-600"
                />
                Ordered
              </label>
            </div>
          </div>
        </details>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={runDiff}
            className="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-5 py-2.5 text-sm font-medium text-white shadow-md shadow-primary-500/25 hover:bg-primary-700"
          >
            <GitCompare className="h-4 w-4" />
            Compare
          </button>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 p-3 text-amber-800">
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      {result && (
        <>
          {/* Summary bar */}
          <div className="rounded-2xl border border-gray-200/80 bg-gradient-to-r from-gray-50 to-white px-5 py-4 shadow-sm">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
              <span className="font-semibold text-gray-900">Semantic Diff Report</span>
              <span className="text-gray-600">
                <span className="font-medium text-gray-800">{result.changes.length}</span>
                <span className="ml-1 text-gray-500">meaningful change{result.changes.length !== 1 ? 's' : ''}</span>
              </span>
              <span className="text-gray-500">
                <span className="font-medium text-gray-700">{result.entropyReport.length}</span>
                <span className="ml-1">noise removed</span>
              </span>
              <span className="rounded-md bg-gray-100 px-2 py-0.5 font-medium text-gray-700">
                {entropyReduction}% entropy reduction
              </span>
              <span className="text-gray-500">Mode: {activePreset}</span>
              <span className="text-gray-500">
                Arrays: {(config.arrayMode ?? 'unordered') === 'unordered' ? 'Unordered' : 'Ordered'}
                {config.arrayIdentityKeys?.length ? ` · Identity: ${config.arrayIdentityKeys.join(', ')}` : ''}
              </span>
              {confidence && (
                <span
                  className={`rounded-md px-2 py-0.5 text-xs font-medium ${
                    confidence === 'High'
                      ? 'bg-emerald-100 text-emerald-800'
                      : confidence === 'Medium'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  Confidence: {confidence}
                </span>
              )}
            </div>
          </div>

          {/* View toggle */}
          <div className="flex gap-1 rounded-xl border-2 border-gray-200 bg-gray-100/80 p-1.5">
            <button
              type="button"
              onClick={() => setViewMode('structured')}
              className={`cta-view-structured flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-all ${
                viewMode === 'structured'
                  ? 'bg-indigo-500 text-white shadow-md ring-2 ring-indigo-400/50'
                  : 'text-gray-600 hover:bg-gray-200/80 hover:text-gray-900'
              }`}
              aria-pressed={viewMode === 'structured'}
              aria-label="Structured view"
            >
              <FileCode2 className="h-4 w-4 flex-shrink-0" />
              Structured view
            </button>
            <button
              type="button"
              onClick={() => setViewMode('sidebyside')}
              className={`cta-view-sidebyside flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-all ${
                viewMode === 'sidebyside'
                  ? 'bg-emerald-500 text-white shadow-md ring-2 ring-emerald-400/50'
                  : 'text-gray-600 hover:bg-gray-200/80 hover:text-gray-900'
              }`}
              aria-pressed={viewMode === 'sidebyside'}
              aria-label="Side-by-side view"
            >
              <Columns className="h-4 w-4 flex-shrink-0" />
              Side-by-side
            </button>
          </div>

          {viewMode === 'structured' ? (
            <>
              {/* Meaningful changes */}
              <div className="rounded-2xl border border-gray-200/80 bg-white overflow-hidden shadow-md shadow-gray-200/30">
                <div className="border-b border-indigo-100 bg-gradient-to-r from-indigo-50 to-violet-50 px-5 py-3.5">
                  <span className="text-sm font-bold text-indigo-900">
                    {result.changes.length} Meaningful Change{result.changes.length !== 1 ? 's' : ''}
                  </span>
                </div>
                <div className="divide-y divide-gray-100">
                  {result.changes.length === 0 ? (
                    <div className="flex items-center gap-3 px-5 py-8 text-emerald-700">
                      <div className="rounded-full bg-emerald-100 p-2">
                        <CheckCircle className="h-5 w-5" />
                      </div>
                      <span className="text-sm font-medium">Both payloads are semantically equal after normalization.</span>
                    </div>
                  ) : (
                    result.changes.map((d, i) => {
                      const isAdded = d.type === 'added';
                      const isRemoved = d.type === 'removed';
                      const isTypeChanged = d.type === 'type_changed';
                      const isValueChanged = d.type === 'value_changed' || d.type === 'changed';
                      const rowBg = isAdded
                        ? 'bg-emerald-50/90 border-l-4 border-emerald-500'
                        : isRemoved
                          ? 'bg-red-50/90 border-l-4 border-red-500'
                          : isTypeChanged
                            ? 'bg-amber-50/90 border-l-4 border-amber-500'
                            : 'bg-indigo-50/90 border-l-4 border-indigo-500';
                      const iconBg = isAdded
                        ? 'bg-emerald-500 text-white'
                        : isRemoved
                          ? 'bg-red-500 text-white'
                          : isTypeChanged
                            ? 'bg-amber-500 text-white'
                            : 'bg-indigo-500 text-white';
                      const pathColor = isAdded
                        ? 'text-emerald-800'
                        : isRemoved
                          ? 'text-red-800'
                          : isTypeChanged
                            ? 'text-amber-800'
                            : 'text-indigo-800';
                      const typePill = isAdded
                        ? 'bg-emerald-200/80 text-emerald-800'
                        : isRemoved
                          ? 'bg-red-200/80 text-red-800'
                          : isTypeChanged
                            ? 'bg-amber-200/80 text-amber-800'
                            : 'bg-indigo-200/80 text-indigo-800';
                      return (
                        <div key={`${d.path}-${i}`} className={`px-5 py-4 ${rowBg}`}>
                          <div className="flex items-start gap-3">
                            <span
                              className={`mt-1 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg ${iconBg}`}
                            >
                              {isAdded && <Plus className="h-4 w-4" />}
                              {isRemoved && <Minus className="h-4 w-4" />}
                              {(isValueChanged || isTypeChanged) && <Edit className="h-4 w-4" />}
                            </span>
                            <div className="min-w-0 flex-1">
                              <div className={`font-mono text-sm font-bold ${pathColor}`}>{d.path || 'root'}</div>
                              <div className="mt-1.5">
                                <span className={`inline-flex rounded-md px-2 py-0.5 text-xs font-semibold ${typePill}`}>
                                  {changeTypeLabel(d.type)}
                                </span>
                              </div>
                              <div className="mt-3 flex flex-wrap gap-3">
                                {d.before !== undefined && (
                                  <div className="rounded-lg border-2 border-rose-200 bg-rose-50/90 px-3 py-2 font-mono text-xs shadow-sm">
                                    <span className="font-semibold text-rose-600">Before</span>
                                    <span className="ml-2 font-medium text-rose-900">{formatValue(d.before)}</span>
                                  </div>
                                )}
                                {d.after !== undefined && (
                                  <div className="rounded-lg border-2 border-emerald-200 bg-emerald-50/90 px-3 py-2 font-mono text-xs shadow-sm">
                                    <span className="font-semibold text-emerald-600">After</span>
                                    <span className="ml-2 font-medium text-emerald-900">{formatValue(d.after)}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Export buttons */}
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={copySummary}
                  className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300"
                >
                  <Copy className="h-4 w-4" />
                  Copy summary
                </button>
                <button
                  type="button"
                  onClick={copyMarkdown}
                  className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300"
                >
                  <Copy className="h-4 w-4" />
                  Export Markdown
                </button>
                {result.changes.length > 0 && (
                  <button
                    type="button"
                    onClick={copyJsonPatch}
                    className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300"
                  >
                    <Copy className="h-4 w-4" />
                    Copy JSON Patch
                  </button>
                )}
              </div>

              {/* Collapsible: Ignored dynamic fields */}
              {result.entropyReport.length > 0 && (
                <div className="rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm">
                  <button
                    type="button"
                    onClick={() => setEntropyOpen((o) => !o)}
                    className="flex w-full items-center justify-between px-5 py-3.5 text-left hover:bg-gray-50/80"
                  >
                    <span className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      {entropyOpen ? (
                        <ChevronDown className="h-4 w-4 text-gray-500" />
                      ) : (
                        <ChevronRight className="h-4 w-4 text-gray-500" />
                      )}
                      Ignored dynamic fields ({result.entropyReport.length})
                    </span>
                  </button>
                  {entropyOpen && (
                    <div className="border-t border-gray-100 bg-gray-50/50 px-5 py-4">
                      <p className="mb-3 text-xs text-gray-500">
                        These paths were normalized so they don’t appear as semantic changes.
                      </p>
                      <ul className="space-y-2 font-mono text-xs">
                        {result.entropyReport.map((e, i) => (
                          <li key={`${e.path}-${i}`} className="flex items-center gap-2">
                            <span className="text-gray-600">{e.path || e.key}</span>
                            <span className="text-gray-300">→</span>
                            <span className="rounded-md bg-gray-200/80 px-2 py-0.5 text-gray-700">{formatReason(e.reason)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Array intelligence */}
              <div className="rounded-xl border border-gray-200 bg-white px-5 py-4 shadow-sm">
                <div className="text-sm font-semibold text-gray-800">Array strategy</div>
                <div className="mt-1.5 text-xs text-gray-600">
                  {(config.arrayMode ?? 'unordered') === 'unordered'
                    ? 'Arrays compared as unordered sets (element order ignored).'
                    : 'Arrays compared by index (order matters).'}
                  {config.arrayIdentityKeys?.length
                    ? ` Items with keys ${config.arrayIdentityKeys.join(', ')} are matched by identity.`
                    : ''}
                </div>
              </div>

              {/* Advanced metrics (collapsible) */}
              <div className="rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm">
                <button
                  type="button"
                  onClick={() => setMetricsOpen((o) => !o)}
                  className="flex w-full items-center justify-between px-5 py-3.5 text-left hover:bg-gray-50/80"
                >
                  <span className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    {metricsOpen ? (
                      <ChevronDown className="h-4 w-4 text-gray-500" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-gray-500" />
                    )}
                    <BarChart3 className="h-4 w-4" />
                    Advanced metrics
                  </span>
                </button>
                {metricsOpen && (
                  <div className="border-t border-gray-100 bg-gray-50/50 px-5 py-4">
                    <dl className="grid grid-cols-2 gap-x-6 gap-y-3 text-xs sm:grid-cols-4">
                      <div>
                        <dt className="text-gray-500">Payload A size</dt>
                        <dd className="mt-0.5 font-mono font-medium text-gray-800">{formatBytes(result.payloadSizeA)}</dd>
                      </div>
                      <div>
                        <dt className="text-gray-500">Payload B size</dt>
                        <dd className="mt-0.5 font-mono font-medium text-gray-800">{formatBytes(result.payloadSizeB)}</dd>
                      </div>
                      <div>
                        <dt className="text-gray-500">Fields (A / B)</dt>
                        <dd className="mt-0.5 font-mono font-medium text-gray-800">
                          {result.fieldCountA} / {result.fieldCountB}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-gray-500">Depth (A / B)</dt>
                        <dd className="mt-0.5 font-mono font-medium text-gray-800">
                          {result.depthA} / {result.depthB}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-gray-500">Dynamic fields masked</dt>
                        <dd className="mt-0.5 font-mono font-medium text-gray-800">{result.entropyReport.length}</dd>
                      </div>
                    </dl>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <CodeWithLineNumbers text={result.normalizedA} label="Normalized A" />
              <CodeWithLineNumbers text={result.normalizedB} label="Normalized B" />
            </div>
          )}
        </>
      )}

      <p className="flex items-center gap-2 rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3 text-xs text-gray-500">
        <Shield className="h-4 w-4 flex-shrink-0 text-gray-400" />
        100% client-side. No data sent to servers.
      </p>
    </div>
  );
}
