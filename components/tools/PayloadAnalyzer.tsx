'use client';

import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import {
  BarChart3,
  AlertCircle,
  Copy,
  Download,
  ChevronDown,
  ChevronUp,
  Filter,
  Layers,
  FileJson,
  Zap,
  Hash,
  Type,
  ToggleLeft,
  List,
  ArrowLeftRight,
  EyeOff,
  Lightbulb,
} from 'lucide-react';
import { trackCtaClick, trackCopy } from '@/lib/analytics';
import toast from 'react-hot-toast';
import { validateJson } from '@/lib/jsonParser';
import Link from 'next/link';

interface FieldInfo {
  path: string;
  size: number;
  percentage: number;
  type: string;
  depth: number;
  valuePreview: string;
  isNull: boolean;
  arrayLength?: number;
}

interface PayloadStats {
  totalSize: number;
  gzipEstimate: number;
  fieldCount: number;
  maxDepth: number;
  keyCount: number;
  typeBreakdown: Record<string, number>;
  nullCount: number;
  arrayCount: number;
  objectCount: number;
}

type SortKey = 'size' | 'path' | 'type' | 'depth';
type FilterType = 'all' | 'string' | 'number' | 'boolean' | 'null' | 'array';
type ActiveTab = 'analyze' | 'optimize';

const SAMPLE_PAYLOADS = [
  {
    label: 'API Response',
    json: JSON.stringify({
      status: 'success',
      data: {
        user: { id: 1, name: 'Alice Johnson', email: 'alice@example.com', avatar: 'https://example.com/avatars/alice.jpg' },
        posts: [{ id: 101, title: 'Hello World', body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', tags: ['tech', 'dev'] }],
        meta: { page: 1, total: 42, perPage: 10 },
      },
      timestamp: '2026-04-08T10:00:00Z',
    }, null, 2),
  },
  {
    label: 'E-commerce Order',
    json: JSON.stringify({
      orderId: 'ORD-2026-8472',
      customer: { id: 'cust_123', name: 'Bob Smith', email: 'bob@shop.com' },
      items: [
        { sku: 'ITEM-001', name: 'Laptop Stand', qty: 1, price: 49.99, imageUrl: 'https://cdn.example.com/images/laptop-stand.png' },
        { sku: 'ITEM-002', name: 'USB-C Hub', qty: 2, price: 34.99, imageUrl: 'https://cdn.example.com/images/usb-hub.png' },
      ],
      shipping: { address: '123 Main St', city: 'San Francisco', state: 'CA', zip: '94102', country: 'US' },
      total: 119.97,
      currency: 'USD',
      paid: true,
    }, null, 2),
  },
];

function estimateGzip(jsonStr: string): number {
  const ratio = jsonStr.length > 1000 ? 0.30 : jsonStr.length > 200 ? 0.45 : 0.65;
  return Math.round(jsonStr.length * ratio);
}

function getValuePreview(value: unknown): string {
  if (value === null) return 'null';
  if (typeof value === 'string') return value.length > 40 ? `"${value.slice(0, 37)}…"` : `"${value}"`;
  if (typeof value === 'boolean') return String(value);
  if (typeof value === 'number') return String(value);
  if (Array.isArray(value)) return `[…${value.length} items]`;
  if (typeof value === 'object' && value !== null) return `{…${Object.keys(value as object).length} keys}`;
  return String(value);
}

function collectFields(obj: unknown, path = 'root', depth = 0, result: FieldInfo[] = []): FieldInfo[] {
  if (typeof obj === 'object' && obj !== null && !Array.isArray(obj)) {
    for (const key of Object.keys(obj as object)) {
      const childPath = path === 'root' ? key : `${path}.${key}`;
      collectFields((obj as Record<string, unknown>)[key], childPath, depth + 1, result);
    }
  } else if (Array.isArray(obj)) {
    const jsonStr = JSON.stringify(obj);
    const size = new Blob([jsonStr]).size;
    result.push({ path, size, percentage: 0, type: 'array', depth, valuePreview: getValuePreview(obj), isNull: false, arrayLength: obj.length });
    if (obj.length > 0 && typeof obj[0] === 'object' && obj[0] !== null) {
      collectFields(obj[0], `${path}[0]`, depth + 1, result);
    }
  } else {
    const fieldJson = JSON.stringify({ [path]: obj });
    const size = new Blob([fieldJson]).size;
    result.push({
      path, size, percentage: 0,
      type: obj === null ? 'null' : typeof obj,
      depth, valuePreview: getValuePreview(obj), isNull: obj === null,
    });
  }
  return result;
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function formatSizeDiff(bytes: number): string {
  const abs = Math.abs(bytes);
  const sign = bytes > 0 ? '+' : '-';
  if (abs < 1024) return `${sign}${abs} B`;
  return `${sign}${(abs / 1024).toFixed(1)} KB`;
}

const TYPE_COLORS: Record<string, string> = {
  string: 'bg-blue-100 text-blue-800',
  number: 'bg-emerald-100 text-emerald-800',
  boolean: 'bg-amber-100 text-amber-800',
  null: 'bg-red-100 text-red-700',
  array: 'bg-violet-100 text-violet-800',
  object: 'bg-gray-100 text-gray-700',
};

const TYPE_ICONS: Record<string, React.ReactNode> = {
  string: <Type className="w-3 h-3" />,
  number: <Hash className="w-3 h-3" />,
  boolean: <ToggleLeft className="w-3 h-3" />,
  null: <span className="text-[10px] font-bold">∅</span>,
  array: <List className="w-3 h-3" />,
};

// Recursively apply redactions to a parsed JSON object
function applyRedactions(obj: unknown, pathPrefix: string, redactedPaths: Set<string>): unknown {
  if (Array.isArray(obj)) {
    return obj.map((v) => applyRedactions(v, `${pathPrefix}[0]`, redactedPaths));
  }
  if (typeof obj === 'object' && obj !== null) {
    const result: Record<string, unknown> = {};
    for (const key of Object.keys(obj as object)) {
      const childPath = pathPrefix ? `${pathPrefix}.${key}` : key;
      if (redactedPaths.has(childPath)) {
        result[key] = '[REDACTED]';
      } else {
        result[key] = applyRedactions((obj as Record<string, unknown>)[key], childPath, redactedPaths);
      }
    }
    return result;
  }
  return obj;
}

export default function PayloadAnalyzer() {
  const [jsonText, setJsonText] = useState('');
  const [fields, setFields] = useState<FieldInfo[]>([]);
  const [stats, setStats] = useState<PayloadStats | null>(null);
  const [sortKey, setSortKey] = useState<SortKey>('size');
  const [sortAsc, setSortAsc] = useState(false);
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [searchPath, setSearchPath] = useState('');
  const [liveMode, setLiveMode] = useState(true);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Compare mode
  const [compareMode, setCompareMode] = useState(false);
  const [jsonText2, setJsonText2] = useState('');
  const [fields2, setFields2] = useState<FieldInfo[]>([]);
  const [stats2, setStats2] = useState<PayloadStats | null>(null);
  const debounceRef2 = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Redact mode
  const [redactMode, setRedactMode] = useState(false);
  const [redactedPaths, setRedactedPaths] = useState<Set<string>>(new Set());
  const [redactOutputTab, setRedactOutputTab] = useState(false);

  // Active tab
  const [activeTab, setActiveTab] = useState<ActiveTab>('analyze');

  const analyze = useCallback((text: string): { fields: FieldInfo[]; stats: PayloadStats } | null => {
    if (!text.trim()) return null;
    const validation = validateJson(text);
    if (!validation.valid) return null;

    const jsonStr = JSON.stringify(validation.data);
    const totalSize = new Blob([jsonStr]).size;
    const gzipEstimate = estimateGzip(jsonStr);

    const rawFields = collectFields(validation.data);
    const totalFieldSize = rawFields.reduce((s, f) => s + f.size, 0);
    const withPct = rawFields.map((f) => ({ ...f, percentage: totalFieldSize > 0 ? (f.size / totalFieldSize) * 100 : 0 }));

    const typeBreakdown: Record<string, number> = {};
    let maxDepth = 0;
    let nullCount = 0;
    let arrayCount = 0;
    let objectCount = 0;

    function countTypes(obj: unknown, d = 0) {
      maxDepth = Math.max(maxDepth, d);
      if (obj === null) { typeBreakdown['null'] = (typeBreakdown['null'] || 0) + 1; nullCount++; return; }
      if (Array.isArray(obj)) { arrayCount++; typeBreakdown['array'] = (typeBreakdown['array'] || 0) + 1; (obj as unknown[]).forEach((v) => countTypes(v, d + 1)); return; }
      if (typeof obj === 'object') { objectCount++; typeBreakdown['object'] = (typeBreakdown['object'] || 0) + 1; Object.values(obj as object).forEach((v) => countTypes(v, d + 1)); return; }
      typeBreakdown[typeof obj] = (typeBreakdown[typeof obj] || 0) + 1;
    }
    countTypes(validation.data);

    function countKeys(obj: unknown): number {
      if (typeof obj !== 'object' || obj === null) return 0;
      if (Array.isArray(obj)) return (obj as unknown[]).reduce<number>((sum, v) => sum + countKeys(v), 0);
      return Object.keys(obj as object).length + Object.values(obj as object).reduce<number>((s, v) => s + countKeys(v), 0);
    }

    const statsResult: PayloadStats = {
      totalSize, gzipEstimate, fieldCount: withPct.length, maxDepth,
      keyCount: countKeys(validation.data), typeBreakdown, nullCount, arrayCount, objectCount,
    };
    return { fields: withPct, stats: statsResult };
  }, []);

  useEffect(() => {
    if (!liveMode) return;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const result = analyze(jsonText);
      setFields(result?.fields ?? []);
      setStats(result?.stats ?? null);
    }, 400);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [jsonText, liveMode, analyze]);

  useEffect(() => {
    if (!liveMode || !compareMode) return;
    if (debounceRef2.current) clearTimeout(debounceRef2.current);
    debounceRef2.current = setTimeout(() => {
      const result = analyze(jsonText2);
      setFields2(result?.fields ?? []);
      setStats2(result?.stats ?? null);
    }, 400);
    return () => { if (debounceRef2.current) clearTimeout(debounceRef2.current); };
  }, [jsonText2, liveMode, compareMode, analyze]);

  // ⌘+Enter / Ctrl+Enter to analyze
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        e.preventDefault();
        const result = analyze(jsonText);
        setFields(result?.fields ?? []);
        setStats(result?.stats ?? null);
        trackCtaClick('payload_analyzer', 'analyze');
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jsonText]);

  const sortedFiltered = useMemo(() => {
    let list = [...fields];
    if (filterType !== 'all') list = list.filter((f) => f.type === filterType);
    if (searchPath) list = list.filter((f) => f.path.toLowerCase().includes(searchPath.toLowerCase()));
    list.sort((a, b) => {
      let cmp = 0;
      if (sortKey === 'size') cmp = a.size - b.size;
      else if (sortKey === 'path') cmp = a.path.localeCompare(b.path);
      else if (sortKey === 'type') cmp = a.type.localeCompare(b.type);
      else if (sortKey === 'depth') cmp = a.depth - b.depth;
      return sortAsc ? cmp : -cmp;
    });
    return list;
  }, [fields, sortKey, sortAsc, filterType, searchPath]);

  const heavyFields = useMemo(() => fields.filter((f) => f.percentage > 10).slice(0, 5), [fields]);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortAsc((a) => !a);
    else { setSortKey(key); setSortAsc(false); }
  };

  // ---- Compare delta ----
  const deltaMap = useMemo(() => {
    if (!compareMode || !fields2.length) return new Map<string, { delta: number; status: 'added' | 'removed' | 'changed' }>();
    const map = new Map<string, { delta: number; status: 'added' | 'removed' | 'changed' }>();
    const f2Map = new Map(fields2.map((f) => [f.path, f.size]));
    const f1Map = new Map(fields.map((f) => [f.path, f.size]));
    fields.forEach((f) => {
      const f2Size = f2Map.get(f.path);
      if (f2Size !== undefined) {
        if (f2Size !== f.size) map.set(f.path, { delta: f2Size - f.size, status: 'changed' });
      } else {
        map.set(f.path, { delta: -f.size, status: 'removed' });
      }
    });
    fields2.forEach((f) => {
      if (!f1Map.has(f.path)) map.set(f.path, { delta: f.size, status: 'added' });
    });
    return map;
  }, [compareMode, fields, fields2]);

  // ---- Redacted JSON ----
  const redactedJson = useMemo(() => {
    if (!redactMode || redactedPaths.size === 0) return null;
    try {
      const data = JSON.parse(jsonText);
      const redacted = applyRedactions(data, '', redactedPaths);
      return JSON.stringify(redacted, null, 2);
    } catch {
      return null;
    }
  }, [redactMode, redactedPaths, jsonText]);

  const toggleRedact = (path: string) => {
    setRedactedPaths((prev) => {
      const next = new Set(prev);
      if (next.has(path)) next.delete(path);
      else next.add(path);
      return next;
    });
  };

  const downloadRedacted = () => {
    if (!redactedJson) return;
    const blob = new Blob([redactedJson], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'payload-redacted.json';
    a.click();
    URL.revokeObjectURL(a.href);
    toast.success('Redacted JSON downloaded');
  };

  // ---- Optimization suggestions ----
  const optimizeSuggestions = useMemo(() => {
    if (!fields.length || !stats) return null;
    const nullFields = fields.filter((f) => f.isNull);
    const longStrings = fields.filter((f) => f.type === 'string' && f.valuePreview.length > 102); // "..." adds 3 so >100 raw = >103 preview
    const longKeys = fields.filter((f) => f.path.split('.').some((part) => part.replace(/\[\d+\]$/, '').length > 20));

    // Estimate dedup savings: find repeated string previews
    const strPreviews = fields.filter((f) => f.type === 'string').map((f) => f.valuePreview);
    const seen = new Set<string>();
    let dedupSavingBytes = 0;
    strPreviews.forEach((v) => {
      if (seen.has(v)) dedupSavingBytes += v.length;
      else seen.add(v);
    });

    const nullSaving = nullFields.reduce((s, f) => s + f.size, 0);
    const potentialSaving = nullSaving + Math.round(dedupSavingBytes * 0.6); // rough estimate

    return { nullFields, longStrings, longKeys, dedupSavingBytes, potentialSaving };
  }, [fields, stats]);

  const exportReport = () => {
    if (!stats) return;
    const report = {
      generatedAt: new Date().toISOString(),
      summary: { totalSize: formatSize(stats.totalSize), gzipEstimate: formatSize(stats.gzipEstimate), fieldCount: stats.fieldCount, maxDepth: stats.maxDepth, keyCount: stats.keyCount, typeBreakdown: stats.typeBreakdown },
      heavyFields: heavyFields.map((f) => ({ path: f.path, size: formatSize(f.size), percentage: `${f.percentage.toFixed(1)}%` })),
      allFields: sortedFiltered.map((f) => ({ path: f.path, size: formatSize(f.size), type: f.type, depth: f.depth, percentage: `${f.percentage.toFixed(1)}%` })),
    };
    const text = JSON.stringify(report, null, 2);
    navigator.clipboard.writeText(text);
    trackCopy('payload_analyzer');
    toast.success('Report copied to clipboard');
  };

  const downloadReport = () => {
    if (!stats) return;
    const report = {
      generatedAt: new Date().toISOString(),
      summary: { totalSize: formatSize(stats.totalSize), gzipEstimate: formatSize(stats.gzipEstimate), fieldCount: stats.fieldCount, maxDepth: stats.maxDepth, keyCount: stats.keyCount, typeBreakdown: stats.typeBreakdown },
      heavyFields: heavyFields.map((f) => ({ path: f.path, size: formatSize(f.size), percentage: `${f.percentage.toFixed(1)}%` })),
      allFields: fields.map((f) => ({ path: f.path, size: formatSize(f.size), type: f.type, depth: f.depth, percentage: `${f.percentage.toFixed(1)}%` })),
    };
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'payload-analysis.json';
    a.click();
    URL.revokeObjectURL(a.href);
    toast.success('Report downloaded');
  };

  const SortBtn = ({ col, label }: { col: SortKey; label: string }) => (
    <button
      type="button"
      onClick={() => handleSort(col)}
      className="flex items-center gap-0.5 text-xs font-semibold text-gray-600 hover:text-gray-900"
    >
      {label}
      {sortKey === col ? (sortAsc ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />) : <span className="w-3" />}
    </button>
  );

  return (
    <div className="space-y-5 tool-panel-contain">
      {/* Input */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary-600" />
            Payload Size &amp; Performance Analyzer
          </h2>
          <div className="flex flex-wrap items-center gap-2">
            {SAMPLE_PAYLOADS.map((s) => (
              <button
                key={s.label}
                type="button"
                onClick={() => setJsonText(s.json)}
                className="px-2.5 py-1 text-xs font-medium rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200"
              >
                {s.label}
              </button>
            ))}
            <label className="flex items-center gap-1.5 text-xs font-medium text-gray-600 cursor-pointer select-none">
              <input type="checkbox" checked={liveMode} onChange={(e) => setLiveMode(e.target.checked)} className="rounded border-gray-300 text-primary-600 w-3.5 h-3.5" />
              Live
            </label>
          </div>
        </div>

        {/* Mode toggles */}
        <div className="flex flex-wrap gap-3 mb-3">
          <label className="flex items-center gap-1.5 text-xs font-medium text-gray-700 cursor-pointer select-none bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5">
            <input type="checkbox" checked={compareMode} onChange={(e) => { setCompareMode(e.target.checked); if (!e.target.checked) { setFields2([]); setStats2(null); } }} className="rounded border-gray-300 text-primary-600 w-3.5 h-3.5" />
            <ArrowLeftRight className="w-3.5 h-3.5 text-gray-500" />
            Compare two payloads
          </label>
          <label className="flex items-center gap-1.5 text-xs font-medium text-gray-700 cursor-pointer select-none bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5">
            <input type="checkbox" checked={redactMode} onChange={(e) => { setRedactMode(e.target.checked); if (!e.target.checked) { setRedactedPaths(new Set()); setRedactOutputTab(false); } }} className="rounded border-gray-300 text-primary-600 w-3.5 h-3.5" />
            <EyeOff className="w-3.5 h-3.5 text-gray-500" />
            Redact fields
          </label>
        </div>

        {compareMode ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Payload 1</label>
              <textarea
                value={jsonText}
                onChange={(e) => setJsonText(e.target.value)}
                placeholder={'{\n  "key": "value"\n}'}
                className="w-full h-40 p-3 border border-gray-200 rounded-lg font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary-500 bg-gray-50/50"
                spellCheck={false}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Payload 2</label>
              <textarea
                value={jsonText2}
                onChange={(e) => setJsonText2(e.target.value)}
                placeholder={'{\n  "key": "updated"\n}'}
                className="w-full h-40 p-3 border border-gray-200 rounded-lg font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary-500 bg-gray-50/50"
                spellCheck={false}
              />
            </div>
          </div>
        ) : (
          <textarea
            value={jsonText}
            onChange={(e) => setJsonText(e.target.value)}
            placeholder={'{\n  "key": "value"\n}'}
            className="w-full h-48 p-3 border border-gray-200 rounded-lg font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary-500 bg-gray-50/50"
            spellCheck={false}
          />
        )}

        {!liveMode && (
          <button
            type="button"
            onClick={() => {
              trackCtaClick('payload_analyzer', 'analyze');
              const result = analyze(jsonText);
              setFields(result?.fields ?? []);
              setStats(result?.stats ?? null);
              if (compareMode) {
                const result2 = analyze(jsonText2);
                setFields2(result2?.fields ?? []);
                setStats2(result2?.stats ?? null);
              }
            }}
            disabled={!jsonText.trim()}
            className="mt-3 w-full py-2.5 bg-primary-600 text-white rounded-lg font-semibold text-sm hover:bg-primary-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Analyze Payload
            <kbd className="ml-2 hidden sm:inline-flex items-center rounded border border-white/30 bg-white/20 px-1 py-0.5 font-mono text-[10px]">⌘↵</kbd>
          </button>
        )}
      </div>

      {stats && (
        <>
          {/* Tab nav */}
          <div className="flex gap-1 bg-gray-100 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => setActiveTab('analyze')}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === 'analyze' ? 'bg-white text-primary-700 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
            >
              <BarChart3 className="w-4 h-4" /> Analyze
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('optimize')}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === 'optimize' ? 'bg-white text-primary-700 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
            >
              <Lightbulb className="w-4 h-4" /> Optimize
              {optimizeSuggestions && (optimizeSuggestions.nullFields.length + optimizeSuggestions.longStrings.length + optimizeSuggestions.longKeys.length) > 0 && (
                <span className="px-1.5 py-0.5 bg-amber-100 text-amber-700 text-[10px] font-bold rounded-full">
                  {optimizeSuggestions.nullFields.length + optimizeSuggestions.longStrings.length + optimizeSuggestions.longKeys.length}
                </span>
              )}
            </button>
          </div>

          {/* ===== ANALYZE TAB ===== */}
          {activeTab === 'analyze' && (
            <>
              {/* Stats summary */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <h3 className="text-sm font-bold text-gray-800 flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-amber-500" /> Payload Summary
                  </h3>
                  <div className="flex gap-2">
                    <button type="button" onClick={exportReport} className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50">
                      <Copy className="w-3.5 h-3.5" /> Copy Report
                    </button>
                    <button type="button" onClick={downloadReport} className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50">
                      <Download className="w-3.5 h-3.5" /> Download
                    </button>
                  </div>
                </div>

                {/* Compare summary banner */}
                {compareMode && stats2 && (
                  <div className="mb-4 p-3 rounded-lg bg-blue-50 border border-blue-200 text-sm">
                    <div className="font-semibold text-blue-900 mb-1 flex items-center gap-2">
                      <ArrowLeftRight className="w-4 h-4" /> Comparison Delta
                    </div>
                    <div className="flex flex-wrap gap-4 text-xs">
                      <span className="text-gray-700">
                        Size: <strong className={stats2.totalSize - stats.totalSize > 0 ? 'text-red-600' : 'text-green-600'}>
                          {formatSizeDiff(stats2.totalSize - stats.totalSize)}
                        </strong>
                      </span>
                      <span className="text-gray-700">
                        Fields: <strong className={stats2.fieldCount - stats.fieldCount > 0 ? 'text-amber-600' : stats2.fieldCount - stats.fieldCount < 0 ? 'text-blue-600' : 'text-gray-600'}>
                          {stats2.fieldCount - stats.fieldCount > 0 ? `+${stats2.fieldCount - stats.fieldCount}` : stats2.fieldCount - stats.fieldCount}
                        </strong>
                      </span>
                      <span className="text-gray-700">Added: <strong className="text-green-600">{[...deltaMap.values()].filter((v) => v.status === 'added').length}</strong></span>
                      <span className="text-gray-700">Removed: <strong className="text-red-600">{[...deltaMap.values()].filter((v) => v.status === 'removed').length}</strong></span>
                      <span className="text-gray-700">Changed: <strong className="text-amber-600">{[...deltaMap.values()].filter((v) => v.status === 'changed').length}</strong></span>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-4">
                  {[
                    { label: 'Total Size', value: formatSize(stats.totalSize), color: 'text-blue-600', border: 'border-blue-100' },
                    { label: 'Gzip Est.', value: formatSize(stats.gzipEstimate), color: 'text-emerald-600', border: 'border-emerald-100' },
                    { label: 'Fields', value: stats.fieldCount, color: 'text-violet-600', border: 'border-violet-100' },
                    { label: 'Keys', value: stats.keyCount, color: 'text-indigo-600', border: 'border-indigo-100' },
                    { label: 'Max Depth', value: stats.maxDepth, color: 'text-amber-600', border: 'border-amber-100' },
                    { label: 'Null Fields', value: stats.nullCount, color: 'text-red-600', border: 'border-red-100' },
                  ].map((m) => (
                    <div key={m.label} className={`rounded-lg border ${m.border} p-3 text-center`}>
                      <div className={`text-xl font-bold ${m.color}`}>{m.value}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{m.label}</div>
                    </div>
                  ))}
                </div>

                {/* Compression savings */}
                <div className="flex items-center gap-2 mb-4 p-3 rounded-lg bg-emerald-50 border border-emerald-100 text-sm">
                  <Zap className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="text-emerald-800 font-medium">Gzip could reduce this payload by ~{Math.round((1 - stats.gzipEstimate / stats.totalSize) * 100)}%</span>
                  <span className="text-emerald-700">({formatSize(stats.totalSize - stats.gzipEstimate)} savings)</span>
                </div>

                {/* Type distribution */}
                <div>
                  <p className="text-xs font-semibold text-gray-600 mb-2">Type Distribution</p>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(stats.typeBreakdown).sort((a, b) => b[1] - a[1]).map(([type, count]) => (
                      <span key={type} className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${TYPE_COLORS[type] || 'bg-gray-100 text-gray-700'}`}>
                        {TYPE_ICONS[type]}
                        {type}: {count}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Performance warnings */}
              {heavyFields.length > 0 && (
                <div className="rounded-xl border-2 border-amber-200 bg-amber-50 p-5">
                  <h3 className="text-sm font-bold text-amber-900 mb-2 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" /> Heavy Fields (&gt;10% of payload)
                  </h3>
                  <ul className="space-y-1.5">
                    {heavyFields.map((f, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <code className="bg-white border border-amber-200 px-2 py-0.5 rounded text-amber-900 font-mono">{f.path}</code>
                        <span className="text-amber-700 font-medium">{formatSize(f.size)}</span>
                        <span className="text-amber-600">({f.percentage.toFixed(1)}%)</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Redact output tab */}
              {redactMode && redactedPaths.size > 0 && redactedJson && (
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-bold text-gray-800 flex items-center gap-1.5">
                      <EyeOff className="w-4 h-4 text-gray-500" /> Redacted JSON
                      <span className="px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded text-[10px] font-medium">{redactedPaths.size} field{redactedPaths.size !== 1 ? 's' : ''} redacted</span>
                    </h3>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => { navigator.clipboard.writeText(redactedJson); toast.success('Redacted JSON copied'); }}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50"
                      >
                        <Copy className="w-3.5 h-3.5" /> Copy
                      </button>
                      <button type="button" onClick={downloadRedacted} className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50">
                        <Download className="w-3.5 h-3.5" /> Download
                      </button>
                    </div>
                  </div>
                  <pre className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-xs font-mono overflow-auto max-h-64 whitespace-pre-wrap">
                    {redactedJson}
                  </pre>
                </div>
              )}

              {/* Field breakdown */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                  <h3 className="text-sm font-bold text-gray-800 flex items-center gap-1.5">
                    <Layers className="w-4 h-4" /> Field Breakdown
                    <span className="ml-1 text-xs font-normal text-gray-500">({sortedFiltered.length} fields)</span>
                  </h3>
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Filter className="w-3.5 h-3.5 text-gray-400" />
                      <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value as FilterType)}
                        className="text-xs border border-gray-200 rounded-lg px-2 py-1 bg-white"
                      >
                        <option value="all">All types</option>
                        <option value="string">String</option>
                        <option value="number">Number</option>
                        <option value="boolean">Boolean</option>
                        <option value="null">Null</option>
                        <option value="array">Array</option>
                      </select>
                    </div>
                    <input
                      type="text"
                      value={searchPath}
                      onChange={(e) => setSearchPath(e.target.value)}
                      placeholder="Search path…"
                      className="text-xs border border-gray-200 rounded-lg px-2.5 py-1 w-32 bg-white"
                    />
                  </div>
                </div>

                {/* Sort header */}
                <div className={`grid gap-2 px-3 py-2 bg-gray-50 rounded-lg text-xs text-gray-500 font-semibold mb-2 ${compareMode && deltaMap.size > 0 ? 'grid-cols-13' : redactMode ? 'grid-cols-13' : 'grid-cols-12'}`}
                  style={{ gridTemplateColumns: compareMode && deltaMap.size > 0 ? '5fr 2fr 1fr 2fr 2fr 2fr' : redactMode ? '5fr 2fr 1fr 2fr 2fr 1fr' : '5fr 2fr 1fr 2fr 2fr' }}
                >
                  <div><SortBtn col="path" label="Path" /></div>
                  <div><SortBtn col="type" label="Type" /></div>
                  <div className="text-center"><SortBtn col="depth" label="D" /></div>
                  <div className="text-right"><SortBtn col="size" label="Size" /></div>
                  <div>Weight</div>
                  {compareMode && deltaMap.size > 0 && <div className="text-right">Delta</div>}
                  {redactMode && <div className="text-center">Redact</div>}
                </div>

                <div className="space-y-1.5 max-h-[480px] overflow-y-auto pr-1">
                  {sortedFiltered.map((f, i) => {
                    const deltaEntry = compareMode ? deltaMap.get(f.path) : undefined;
                    return (
                      <div
                        key={i}
                        className={`grid gap-2 items-center px-3 py-2 rounded-lg border transition-colors ${
                          redactMode && redactedPaths.has(f.path) ? 'bg-red-50 border-red-200' : 'hover:bg-gray-50 border-transparent hover:border-gray-100'
                        } ${deltaEntry?.status === 'added' ? 'bg-green-50' : deltaEntry?.status === 'removed' ? 'bg-red-50' : ''}`}
                        style={{ gridTemplateColumns: compareMode && deltaMap.size > 0 ? '5fr 2fr 1fr 2fr 2fr 2fr' : redactMode ? '5fr 2fr 1fr 2fr 2fr 1fr' : '5fr 2fr 1fr 2fr 2fr' }}
                      >
                        <div className="font-mono text-xs text-gray-800 truncate" title={f.path}>
                          {'  '.repeat(Math.max(0, f.depth - 1))}
                          {f.path}
                        </div>
                        <div>
                          <span className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-medium ${TYPE_COLORS[f.type] || 'bg-gray-100 text-gray-700'}`}>
                            {TYPE_ICONS[f.type]}
                            {f.type}
                            {f.arrayLength !== undefined && <span className="ml-0.5">[{f.arrayLength}]</span>}
                          </span>
                        </div>
                        <div className="text-center text-xs text-gray-500">{f.depth}</div>
                        <div className="text-right text-xs font-medium text-gray-700">{formatSize(f.size)}</div>
                        <div>
                          <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div
                              className={`h-1.5 rounded-full ${f.percentage > 20 ? 'bg-red-500' : f.percentage > 10 ? 'bg-amber-500' : 'bg-primary-500'}`}
                              style={{ width: `${Math.min(f.percentage, 100)}%` }}
                            />
                          </div>
                          <span className="text-[10px] text-gray-400">{f.percentage.toFixed(1)}%</span>
                        </div>
                        {compareMode && deltaMap.size > 0 && (
                          <div className="text-right text-xs font-medium">
                            {deltaEntry ? (
                              <span className={`${
                                deltaEntry.status === 'added' ? 'text-green-600' :
                                deltaEntry.status === 'removed' ? 'text-red-600' :
                                deltaEntry.delta > 0 ? 'text-orange-600' : 'text-blue-600'
                              }`}>
                                {deltaEntry.status === 'added' ? '+' + formatSize(deltaEntry.delta) :
                                 deltaEntry.status === 'removed' ? formatSize(deltaEntry.delta) :
                                 formatSizeDiff(deltaEntry.delta)}
                                <span className="block text-[9px]">{deltaEntry.status}</span>
                              </span>
                            ) : <span className="text-gray-300">—</span>}
                          </div>
                        )}
                        {redactMode && (
                          <div className="flex justify-center">
                            <input
                              type="checkbox"
                              checked={redactedPaths.has(f.path)}
                              onChange={() => toggleRedact(f.path)}
                              className="w-4 h-4 rounded border-gray-300 text-red-600 focus:ring-red-400 cursor-pointer"
                              title={`Redact ${f.path}`}
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}
                  {sortedFiltered.length === 0 && (
                    <p className="text-center text-sm text-gray-400 py-8">No fields match the current filter.</p>
                  )}
                </div>
              </div>
            </>
          )}

          {/* ===== OPTIMIZE TAB ===== */}
          {activeTab === 'optimize' && optimizeSuggestions && (
            <div className="space-y-4">
              {/* Savings badge */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                <div className="flex items-center gap-3 mb-4">
                  <Lightbulb className="w-5 h-5 text-amber-500" />
                  <h3 className="text-sm font-bold text-gray-800">Optimization Opportunities</h3>
                  {optimizeSuggestions.potentialSaving > 0 && (
                    <span className="ml-auto px-2.5 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                      ~{formatSize(optimizeSuggestions.potentialSaving)} potential savings
                    </span>
                  )}
                </div>

                {/* Null fields */}
                <div className="mb-5">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Null fields that could be omitted</h4>
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${optimizeSuggestions.nullFields.length > 0 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                      {optimizeSuggestions.nullFields.length}
                    </span>
                  </div>
                  {optimizeSuggestions.nullFields.length > 0 ? (
                    <ul className="space-y-1">
                      {optimizeSuggestions.nullFields.map((f, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                          <code className="bg-red-50 border border-red-100 px-2 py-0.5 rounded font-mono text-xs">{f.path}</code>
                          <span className="text-xs text-gray-500">{formatSize(f.size)}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-green-700">No null fields found.</p>
                  )}
                </div>

                {/* Long strings */}
                <div className="mb-5">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wider">String fields &gt;100 chars (compression or truncation candidates)</h4>
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${optimizeSuggestions.longStrings.length > 0 ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>
                      {optimizeSuggestions.longStrings.length}
                    </span>
                  </div>
                  {optimizeSuggestions.longStrings.length > 0 ? (
                    <ul className="space-y-1">
                      {optimizeSuggestions.longStrings.map((f, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm">
                          <code className="bg-amber-50 border border-amber-100 px-2 py-0.5 rounded font-mono text-xs">{f.path}</code>
                          <span className="text-xs text-gray-500">{formatSize(f.size)}</span>
                          <span className="text-xs text-gray-400 truncate max-w-xs">{f.valuePreview}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-green-700">No long string fields found.</p>
                  )}
                </div>

                {/* Long keys */}
                <div className="mb-5">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Fields with long keys (&gt;20 chars, shortenable)</h4>
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${optimizeSuggestions.longKeys.length > 0 ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
                      {optimizeSuggestions.longKeys.length}
                    </span>
                  </div>
                  {optimizeSuggestions.longKeys.length > 0 ? (
                    <ul className="space-y-1">
                      {optimizeSuggestions.longKeys.map((f, i) => {
                        const longParts = f.path.split('.').filter((p) => p.replace(/\[\d+\]$/, '').length > 20);
                        return (
                          <li key={i} className="flex items-center gap-2 text-sm">
                            <code className="bg-blue-50 border border-blue-100 px-2 py-0.5 rounded font-mono text-xs">{f.path}</code>
                            <span className="text-xs text-blue-600">long part: "{longParts.join('", "')}"</span>
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <p className="text-sm text-green-700">No long key names found.</p>
                  )}
                </div>

                {/* Dedup savings */}
                <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-sm">
                  <div className="font-semibold text-emerald-800 mb-1">Gzip / Deduplication estimate</div>
                  <p className="text-xs text-emerald-700">
                    {optimizeSuggestions.dedupSavingBytes > 0
                      ? `Repeated string values found. Deduplicating repeated content with a compression layer (gzip, brotli) could save approximately ${formatSize(Math.round(optimizeSuggestions.dedupSavingBytes * 0.6))} beyond the standard gzip estimate.`
                      : 'No repeated string values detected. Your payload is already well-deduplicated.'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'optimize' && !optimizeSuggestions && stats && (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 text-center text-sm text-gray-500">
              Analyze a payload first to see optimization suggestions.
            </div>
          )}
        </>
      )}

      {/* Blog Links Section */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <h2 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
          <FileJson className="w-4 h-4 text-primary-600" /> Learn More About Payload Optimization
        </h2>
        <Link
          href="/blog/api-payload-size-optimization"
          className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 hover:border-blue-400 hover:shadow-md transition-all"
        >
          <div>
            <h3 className="font-semibold text-gray-900 text-sm mb-0.5">API Payload Size Optimization: Performance Best Practices</h3>
            <p className="text-xs text-gray-600">Reduce payload size, improve API performance, and enhance mobile efficiency.</p>
          </div>
          <span className="text-blue-600 text-xs font-medium shrink-0">Read →</span>
        </Link>
      </div>
    </div>
  );
}
