'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import {
  Copy,
  Check,
  RefreshCw,
  Shield,
  Lock,
  ChevronRight,
  ChevronDown,
  Download,
  Key,
  FileCode,
  Database,
  AlertCircle,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { trackCopy } from '@/lib/analytics';
import {
  NAMESPACES,
  validateUUID,
  analyzeUUID,
  formatUUIDWithOptions,
  getSegmentDisplay,
  collisionProbabilityFormatted,
  compareUUIDs,
  toSqlInsert,
  DB_TIPS,
  CODE_SNIPPETS,
  type UUIDVersion,
} from '@/lib/uuidGeneratorEngine';

// Lazy import generation to avoid sync v5 async in initial render
async function generateOne(version: UUIDVersion, namespace?: string, name?: string): Promise<string> {
  const { generateV1, generateV3, generateV4, generateV5, generateV6, generateV7, generateV8 } = await import('@/lib/uuidGeneratorEngine');
  switch (version) {
    case 1: return generateV1();
    case 3: return namespace && name ? generateV3(namespace, name) : generateV4();
    case 4: return generateV4();
    case 5: return namespace && name ? generateV5(namespace, name) : generateV4();
    case 6: return generateV6();
    case 7: return generateV7();
    case 8: return generateV8();
    default: return generateV4();
  }
}

const VERSIONS: { v: UUIDVersion; label: string }[] = [
  { v: 1, label: 'v1' },
  { v: 3, label: 'v3' },
  { v: 4, label: 'v4' },
  { v: 5, label: 'v5' },
  { v: 6, label: 'v6' },
  { v: 7, label: 'v7' },
  { v: 8, label: 'v8' },
];

const QUANTITIES = [1, 10, 100, 1000];

const SEGMENT_COLORS = ['bg-blue-100 text-blue-800', 'bg-emerald-100 text-emerald-800', 'bg-amber-100 text-amber-800', 'bg-rose-100 text-rose-800', 'bg-violet-100 text-violet-800'];

export default function UuidGeneratorClient() {
  const [version, setVersion] = useState<UUIDVersion>(4);
  const [quantity, setQuantity] = useState(1);
  const [uppercase, setUppercase] = useState(false);
  const [hyphens, setHyphens] = useState(true);
  const [urn, setUrn] = useState(false);
  const [uuids, setUuids] = useState<string[]>([]);
  const [copied, setCopied] = useState<string | null>(null);
  const [analyzeInput, setAnalyzeInput] = useState('');
  const [validateInput, setValidateInput] = useState('');
  const [compareA, setCompareA] = useState('');
  const [compareB, setCompareB] = useState('');
  const [collisionCount, setCollisionCount] = useState(1000000);
  const [namespace, setNamespace] = useState<string>(NAMESPACES.DNS);
  const [namespaceName, setNamespaceName] = useState('example.com');
  const [dbTipsOpen, setDbTipsOpen] = useState(false);
  const [benchmarkResult, setBenchmarkResult] = useState<number | null>(null);
  const [namespaceAlgo, setNamespaceAlgo] = useState<'v3' | 'v5'>('v5');

  const formatOne = (uuid: string) =>
    formatUUIDWithOptions(uuid, { uppercase, hyphens, urn });

  const generate = useCallback(async () => {
    const needNamespace = (version === 3 || version === 5) && namespaceName.trim();
    const list: string[] = [];
    const start = performance.now();
    for (let i = 0; i < quantity; i++) {
      const u = await generateOne(version, needNamespace ? namespace : undefined, needNamespace ? namespaceName.trim() : undefined);
      list.push(u);
    }
    setUuids(list);
    if (quantity >= 1000) setBenchmarkResult(performance.now() - start);
    toast.success(`Generated ${quantity} UUID${quantity > 1 ? 's' : ''}`);
  }, [version, quantity, namespace, namespaceName]);

  const copyOne = (uuid: string) => {
    const formatted = formatOne(uuid);
    navigator.clipboard.writeText(formatted).then(() => {
      trackCopy('uuid_generator');
      setCopied(formatted);
      toast.success('Copied');
      setTimeout(() => setCopied(null), 2000);
    });
  };

  const copyAll = () => {
    const text = uuids.map(formatOne).join('\n');
    navigator.clipboard.writeText(text).then(() => { trackCopy('uuid_generator'); toast.success('All copied'); });
  };

  const download = () => {
    const text = uuids.map(formatOne).join('\n');
    const blob = new Blob([text], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'uuids.txt';
    a.click();
    URL.revokeObjectURL(a.href);
    toast.success('Downloaded');
  };

  const validation = validateInput.trim() ? validateUUID(validateInput.trim()) : null;
  const analysis = analyzeInput.trim() ? analyzeUUID(analyzeInput.trim()) : null;
  const comparison = compareA.trim() && compareB.trim() ? compareUUIDs(compareA.trim(), compareB.trim()) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-3" aria-label="Breadcrumb">
          <Link href="/" className="text-primary-600 hover:text-primary-700 hover:underline">Home</Link>
          <span aria-hidden>/</span>
          <span className="text-gray-700 font-medium" aria-current="page">UUID Generator</span>
        </nav>

        <div className="mb-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">UUID / GUID Generator — Generate v1, v4, v7 UUIDs, Validate, Analyze &amp; Bulk Export</h2>
          <p className="text-sm text-gray-600 mt-1 max-w-3xl">
            v1–v8 support, validator + analyzer, compare two UUIDs, collision probability, and exports (JSON/CSV/SQL). 100% client-side — no UUID data sent to servers.
          </p>
        </div>

        <div className="rounded-2xl bg-white shadow-xl shadow-gray-200/50 border border-gray-200/80 overflow-hidden">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 px-6 md:px-8 py-4 bg-gradient-to-r from-indigo-50/80 to-transparent border-b border-gray-100">
            <span className="text-sm text-gray-700 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-100">
                <Check className="w-3.5 h-3.5 text-indigo-600" />
              </span>
              Runs in browser
            </span>
            <span className="text-sm text-gray-700 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-100">
                <Lock className="w-3.5 h-3.5 text-indigo-600" />
              </span>
              No UUID data sent to server
            </span>
            <span className="text-sm text-gray-700 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-100">
                <Shield className="w-3.5 h-3.5 text-indigo-600" />
              </span>
              Cryptographically secure
            </span>
          </div>

          <div className="px-6 md:px-8 py-6 space-y-6">
            {/* Version */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-3">Version</label>
              <div className="flex flex-wrap gap-2">
                {VERSIONS.map(({ v, label }) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => {
                      setVersion(v);
                      if (v === 3 || v === 5) setNamespaceAlgo(v === 3 ? 'v3' : 'v5');
                    }}
                    className={`rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${
                      version === v ? 'bg-primary-600 text-white shadow-md shadow-primary-200/50' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity & Format */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">Quantity</label>
                <div className="flex flex-wrap gap-2">
                  {QUANTITIES.map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setQuantity(n)}
                      className={`rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
                        quantity === n ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">Format</label>
                <div className="flex flex-wrap gap-3">
                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <input type="checkbox" checked={hyphens} onChange={(e) => setHyphens(e.target.checked)} className="rounded border-gray-300 text-primary-600" />
                    Hyphenated
                  </label>
                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <input type="checkbox" checked={uppercase} onChange={(e) => setUppercase(e.target.checked)} className="rounded border-gray-300 text-primary-600" />
                    Uppercase
                  </label>
                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <input type="checkbox" checked={urn} onChange={(e) => setUrn(e.target.checked)} className="rounded border-gray-300 text-primary-600" />
                    URN
                  </label>
                </div>
              </div>
            </div>

            {/* Namespace (v3/v5) */}
            {(version === 3 || version === 5) && (
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                <label className="block text-sm font-semibold text-gray-800 mb-2">Namespace (deterministic)</label>
                <div className="flex flex-wrap gap-3 items-end">
                  <div>
                    <span className="text-xs text-gray-500 block mb-1">Namespace</span>
                    <select
                      value={namespace}
                      onChange={(e) => setNamespace(e.target.value)}
                      className="rounded-lg border border-gray-200 px-3 py-2 text-sm bg-white"
                    >
                      {Object.entries(NAMESPACES).map(([k, v]) => (
                        <option key={k} value={v}>{k}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex-1 min-w-[160px]">
                    <span className="text-xs text-gray-500 block mb-1">Name</span>
                    <input
                      type="text"
                      value={namespaceName}
                      onChange={(e) => setNamespaceName(e.target.value)}
                      placeholder="example.com"
                      className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 block mb-1">Algorithm</span>
                    <select
                      value={namespaceAlgo}
                      onChange={(e) => {
                      const val = e.target.value as 'v3' | 'v5';
                      setNamespaceAlgo(val);
                      setVersion(val === 'v3' ? 3 : 5);
                    }}
                      className="rounded-lg border border-gray-200 px-3 py-2 text-sm bg-white"
                    >
                      <option value="v3">v3 (MD5)</option>
                      <option value="v5">v5 (SHA-1)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Generate */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={generate}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-600 text-white rounded-xl font-semibold text-sm shadow-lg shadow-primary-200/50 hover:bg-primary-700 transition-all"
              >
                <RefreshCw className="w-4 h-4" />
                Generate
              </button>
              {benchmarkResult != null && quantity >= 1000 && (
                <span className="text-sm text-gray-500">Generated {quantity} in {benchmarkResult.toFixed(0)}ms</span>
              )}
            </div>

            {/* Output */}
            {uuids.length > 0 && (
              <div className="p-4 rounded-2xl border border-gray-200 bg-gray-50/50">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-sm font-semibold text-gray-800">Generated UUID{uuids.length > 1 ? 's' : ''}</span>
                  <div className="flex flex-wrap gap-2">
                    <button type="button" onClick={copyAll} className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50">
                      <Copy className="w-3.5 h-3.5" /> Copy all
                    </button>
                    <button type="button" onClick={download} className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50">
                      <Download className="w-3.5 h-3.5" /> Download
                    </button>
                  </div>
                </div>
                <ul className="space-y-2 max-h-64 overflow-y-auto">
                  {uuids.map((uuid, i) => {
                    const segments = getSegmentDisplay(uuid);
                    const formatted = formatOne(uuid);
                    return (
                      <li key={i} className="flex items-center gap-2 flex-wrap">
                        <div className="flex flex-wrap items-center gap-0 font-mono text-sm">
                          {segments.map((s, j) => (
                            <span key={j}>
                              <span className={`px-1.5 py-0.5 rounded ${SEGMENT_COLORS[j % SEGMENT_COLORS.length]}`} title={s.label}>
                                {uppercase ? s.part.toUpperCase() : s.part}
                              </span>
                              {j < segments.length - 1 && <span className="text-gray-300 mx-0.5">-</span>}
                            </span>
                          ))}
                        </div>
                        <button
                          type="button"
                          onClick={() => copyOne(uuid)}
                          className="shrink-0 rounded-lg border border-gray-200 bg-white px-2 py-1 text-xs font-medium text-gray-600 hover:bg-gray-50"
                        >
                          {copied === formatOne(uuid) ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            {/* Analyzer */}
            <div className="p-4 rounded-2xl border border-gray-100 bg-gray-50/50">
              <h3 className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                <Key className="w-4 h-4 text-primary-600" /> UUID Analyzer
              </h3>
              <input
                type="text"
                value={analyzeInput}
                onChange={(e) => setAnalyzeInput(e.target.value)}
                placeholder="Paste UUID to analyze…"
                className="w-full rounded-xl border border-gray-200 px-4 py-2 font-mono text-sm mb-3"
              />
              {analysis && (
                <div className="p-3 rounded-xl bg-white border border-gray-100 text-sm space-y-2">
                  <p><span className="font-semibold text-gray-600">Version:</span> {analysis.version}</p>
                  <p><span className="font-semibold text-gray-600">Variant:</span> {analysis.variant}</p>
                  {analysis.timestamp && <p><span className="font-semibold text-gray-600">Timestamp:</span> {analysis.timestamp}</p>}
                  {analysis.randomBits != null && <p><span className="font-semibold text-gray-600">Random bits:</span> {analysis.randomBits}</p>}
                  <p className="text-gray-600">{analysis.description}</p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {analysis.timeLow && <span className="rounded-lg bg-blue-100 px-2 py-0.5 text-xs font-mono text-blue-800">time_low: {analysis.timeLow}</span>}
                    {analysis.timeMid && <span className="rounded-lg bg-emerald-100 px-2 py-0.5 text-xs font-mono text-emerald-800">time_mid: {analysis.timeMid}</span>}
                    {analysis.clockSeq && <span className="rounded-lg bg-amber-100 px-2 py-0.5 text-xs font-mono text-amber-800">clock_seq: {analysis.clockSeq}</span>}
                    {analysis.node && <span className="rounded-lg bg-violet-100 px-2 py-0.5 text-xs font-mono text-violet-800">node: {analysis.node}</span>}
                  </div>
                </div>
              )}
            </div>

            {/* Validator */}
            <div className="p-4 rounded-2xl border border-gray-100 bg-gray-50/50">
              <h3 className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600" /> Validator
              </h3>
              <input
                type="text"
                value={validateInput}
                onChange={(e) => setValidateInput(e.target.value)}
                placeholder="Paste UUID to validate…"
                className="w-full rounded-xl border border-gray-200 px-4 py-2 font-mono text-sm mb-2"
              />
              {validation && (
                <p className={`text-sm font-medium rounded-lg px-3 py-2 ${validation.valid ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
                  {validation.valid ? `Valid UUID v${validation.version} · ${validation.variant}` : validation.error}
                </p>
              )}
            </div>

            {/* Compare */}
            <div className="p-4 rounded-2xl border border-gray-100 bg-gray-50/50">
              <h3 className="text-sm font-bold text-gray-900 mb-2">Compare two UUIDs</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-2">
                <input type="text" value={compareA} onChange={(e) => setCompareA(e.target.value)} placeholder="UUID A" className="rounded-xl border border-gray-200 px-3 py-2 font-mono text-sm" />
                <input type="text" value={compareB} onChange={(e) => setCompareB(e.target.value)} placeholder="UUID B" className="rounded-xl border border-gray-200 px-3 py-2 font-mono text-sm" />
              </div>
              {comparison && (
                <div className="p-3 rounded-xl bg-white border border-gray-100 text-sm space-y-1">
                  <p>Same version: {comparison.sameVersion ? 'Yes' : 'No'} (v{comparison.aVersion} vs v{comparison.bVersion})</p>
                  <p>Bit similarity: {comparison.bitSimilarity}%</p>
                  {comparison.timestampDiffMs != null && <p>Timestamp diff: {comparison.timestampDiffMs} ms</p>}
                </div>
              )}
            </div>

            {/* Collision probability */}
            <div className="p-4 rounded-2xl border border-gray-100 bg-gray-50/50">
              <h3 className="text-sm font-bold text-gray-900 mb-2">Collision probability</h3>
              <div className="flex flex-wrap items-center gap-2">
                <input
                  type="number"
                  min={1}
                  max={1e15}
                  value={collisionCount}
                  onChange={(e) => setCollisionCount(Math.max(1, parseInt(e.target.value, 10) || 0))}
                  className="w-32 rounded-lg border border-gray-200 px-3 py-2 text-sm"
                />
                <span className="text-sm text-gray-600">UUIDs →</span>
                <span className="text-sm font-semibold text-gray-800">{collisionProbabilityFormatted(collisionCount)}</span>
              </div>
            </div>

            {/* Export */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-semibold text-gray-800">Export:</span>
              <button
                type="button"
                onClick={() => {
                  const text = JSON.stringify({ uuids: uuids.map(formatOne), generated: new Date().toISOString() }, null, 2);
                  navigator.clipboard.writeText(text);
                  trackCopy('uuid_generator');
                  toast.success('JSON copied');
                }}
                className="rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50"
              >
                JSON
              </button>
              <button
                type="button"
                onClick={() => {
                  const text = uuids.map(formatOne).map((u) => `"${u}"`).join('\n');
                  navigator.clipboard.writeText(text);
                  trackCopy('uuid_generator');
                  toast.success('CSV-style copied');
                }}
                className="rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50"
              >
                CSV
              </button>
              <button
                type="button"
                onClick={() => {
                  const text = toSqlInsert(uuids.map(formatOne), 'items', 'id');
                  navigator.clipboard.writeText(text);
                  trackCopy('uuid_generator');
                  toast.success('SQL copied');
                }}
                className="rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50"
              >
                SQL INSERT
              </button>
            </div>

            {/* Code snippets */}
            <div className="p-4 rounded-2xl border border-gray-100 bg-gray-50/50">
              <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                <FileCode className="w-4 h-4" /> Code examples
              </h3>
              <div className="space-y-2">
                {CODE_SNIPPETS.map((s) => (
                  <div key={s.lang} className="flex items-center justify-between gap-2 p-3 rounded-xl bg-white border border-gray-100">
                    <span className="text-xs font-medium text-gray-700">{s.label}</span>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(s.code);
                        trackCopy('uuid_generator');
                        toast.success('Copied');
                      }}
                      className="rounded-lg border border-gray-200 px-2 py-1 text-xs font-medium text-primary-600 hover:bg-primary-50"
                    >
                      Copy
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* DB tips */}
            <div>
              <button
                type="button"
                onClick={() => setDbTipsOpen((o) => !o)}
                className="flex items-center gap-2 rounded-lg py-1.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 w-full text-left"
              >
                {dbTipsOpen ? <ChevronDown className="w-4 h-4 text-gray-500" /> : <ChevronRight className="w-4 h-4 text-gray-500" />}
                <Database className="w-4 h-4 text-primary-600" /> Database optimization tips
              </button>
              {dbTipsOpen && (
                <div className="mt-2 space-y-2">
                  {DB_TIPS.map((tip, i) => (
                    <div key={i} className="p-3 rounded-xl bg-primary-50/50 border border-primary-100">
                      <p className="font-semibold text-gray-800 text-sm">{tip.title}</p>
                      <p className="text-sm text-gray-600 mt-0.5">{tip.body}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-gray-500">
          <p className="text-center flex items-center gap-2">
            <Lock className="w-3.5 h-3.5" /> All generation and analysis run in your browser. No UUID data is sent to any server.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/jwt-decoder" className="inline-flex items-center gap-1.5 font-medium text-primary-600 hover:text-primary-700">JWT Decoder <ChevronRight className="w-4 h-4" /></Link>
            <Link href="/base64-encoder" className="inline-flex items-center gap-1.5 font-medium text-primary-600 hover:text-primary-700">Base64 Encoder <ChevronRight className="w-4 h-4" /></Link>
            <Link href="/password-generator" className="inline-flex items-center gap-1.5 font-medium text-primary-600 hover:text-primary-700">Password Generator <ChevronRight className="w-4 h-4" /></Link>
          </div>
        </div>
      </div>
    </div>
  );
}
