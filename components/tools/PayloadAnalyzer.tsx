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
  // Rough estimate: JSON typically compresses to ~30-40% of original
  const ratio = jsonStr.length > 1000 ? 0.30 : jsonStr.length > 200 ? 0.45 : 0.65;
  return Math.round(jsonStr.length * ratio);
}

function getValuePreview(value: any): string {
  if (value === null) return 'null';
  if (typeof value === 'string') return value.length > 40 ? `"${value.slice(0, 37)}…"` : `"${value}"`;
  if (typeof value === 'boolean') return String(value);
  if (typeof value === 'number') return String(value);
  if (Array.isArray(value)) return `[…${value.length} items]`;
  if (typeof value === 'object') return `{…${Object.keys(value).length} keys}`;
  return String(value);
}

function collectFields(obj: any, path: string = 'root', depth: number = 0, result: FieldInfo[] = []): FieldInfo[] {
  if (typeof obj === 'object' && obj !== null && !Array.isArray(obj)) {
    for (const key of Object.keys(obj)) {
      const childPath = path === 'root' ? key : `${path}.${key}`;
      collectFields(obj[key], childPath, depth + 1, result);
    }
  } else if (Array.isArray(obj)) {
    // Add array entry itself
    const jsonStr = JSON.stringify(obj);
    const size = new Blob([jsonStr]).size;
    result.push({ path, size, percentage: 0, type: 'array', depth, valuePreview: getValuePreview(obj), isNull: false, arrayLength: obj.length });
    // Recurse into first item to show structure
    if (obj.length > 0 && typeof obj[0] === 'object' && obj[0] !== null) {
      collectFields(obj[0], `${path}[0]`, depth + 1, result);
    }
  } else {
    const fieldJson = JSON.stringify({ [path]: obj });
    const size = new Blob([fieldJson]).size;
    result.push({
      path,
      size,
      percentage: 0,
      type: obj === null ? 'null' : typeof obj,
      depth,
      valuePreview: getValuePreview(obj),
      isNull: obj === null,
    });
  }
  return result;
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
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

  const analyze = useCallback((text: string) => {
    if (!text.trim()) { setFields([]); setStats(null); return; }
    const validation = validateJson(text);
    if (!validation.valid) { setStats(null); return; }

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

    function countTypes(obj: any, d = 0) {
      maxDepth = Math.max(maxDepth, d);
      if (obj === null) { typeBreakdown['null'] = (typeBreakdown['null'] || 0) + 1; nullCount++; return; }
      if (Array.isArray(obj)) { arrayCount++; typeBreakdown['array'] = (typeBreakdown['array'] || 0) + 1; obj.forEach((v) => countTypes(v, d + 1)); return; }
      if (typeof obj === 'object') { objectCount++; typeBreakdown['object'] = (typeBreakdown['object'] || 0) + 1; Object.values(obj).forEach((v) => countTypes(v, d + 1)); return; }
      typeBreakdown[typeof obj] = (typeBreakdown[typeof obj] || 0) + 1;
    }
    countTypes(validation.data);

    function countKeys(obj: any): number {
      if (typeof obj !== 'object' || obj === null) return 0;
      if (Array.isArray(obj)) return obj.reduce((sum, v) => sum + countKeys(v), 0);
      return Object.keys(obj).length + Object.values(obj).reduce((s: number, v) => s + countKeys(v), 0);
    }

    setFields(withPct);
    setStats({ totalSize, gzipEstimate, fieldCount: withPct.length, maxDepth, keyCount: countKeys(validation.data), typeBreakdown, nullCount, arrayCount, objectCount });
  }, []);

  useEffect(() => {
    if (!liveMode) return;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => analyze(jsonText), 400);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [jsonText, liveMode, analyze]);

  // ⌘+Enter / Ctrl+Enter to analyze
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        e.preventDefault();
        analyze(jsonText);
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

  const exportReport = () => {
    if (!stats) return;
    const report = {
      generatedAt: new Date().toISOString(),
      summary: {
        totalSize: formatSize(stats.totalSize),
        gzipEstimate: formatSize(stats.gzipEstimate),
        fieldCount: stats.fieldCount,
        maxDepth: stats.maxDepth,
        keyCount: stats.keyCount,
        typeBreakdown: stats.typeBreakdown,
      },
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

        <textarea
          value={jsonText}
          onChange={(e) => setJsonText(e.target.value)}
          placeholder={'{\n  "key": "value"\n}'}
          className="w-full h-48 p-3 border border-gray-200 rounded-lg font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary-500 bg-gray-50/50"
          spellCheck={false}
        />

        {!liveMode && (
          <button
            type="button"
            onClick={() => { trackCtaClick('payload_analyzer', 'analyze'); analyze(jsonText); }}
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
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-4">
              {[
                { label: 'Total Size', value: formatSize(stats.totalSize), color: 'text-blue-600 bg-blue-50', border: 'border-blue-100' },
                { label: 'Gzip Est.', value: formatSize(stats.gzipEstimate), color: 'text-emerald-600 bg-emerald-50', border: 'border-emerald-100' },
                { label: 'Fields', value: stats.fieldCount, color: 'text-violet-600 bg-violet-50', border: 'border-violet-100' },
                { label: 'Keys', value: stats.keyCount, color: 'text-indigo-600 bg-indigo-50', border: 'border-indigo-100' },
                { label: 'Max Depth', value: stats.maxDepth, color: 'text-amber-600 bg-amber-50', border: 'border-amber-100' },
                { label: 'Null Fields', value: stats.nullCount, color: 'text-red-600 bg-red-50', border: 'border-red-100' },
              ].map((m) => (
                <div key={m.label} className={`rounded-lg border ${m.border} p-3 text-center`}>
                  <div className={`text-xl font-bold ${m.color.split(' ')[0]}`}>{m.value}</div>
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

          {/* Field breakdown */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
              <h3 className="text-sm font-bold text-gray-800 flex items-center gap-1.5">
                <Layers className="w-4 h-4" /> Field Breakdown
                <span className="ml-1 text-xs font-normal text-gray-500">({sortedFiltered.length} fields)</span>
              </h3>
              <div className="flex flex-wrap items-center gap-2">
                {/* Type filter */}
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
                {/* Path search */}
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
            <div className="grid grid-cols-12 gap-2 px-3 py-2 bg-gray-50 rounded-lg text-xs text-gray-500 font-semibold mb-2">
              <div className="col-span-5"><SortBtn col="path" label="Path" /></div>
              <div className="col-span-2"><SortBtn col="type" label="Type" /></div>
              <div className="col-span-1 text-center"><SortBtn col="depth" label="D" /></div>
              <div className="col-span-2 text-right"><SortBtn col="size" label="Size" /></div>
              <div className="col-span-2">Weight</div>
            </div>

            <div className="space-y-1.5 max-h-[480px] overflow-y-auto pr-1">
              {sortedFiltered.map((f, i) => (
                <div key={i} className="grid grid-cols-12 gap-2 items-center px-3 py-2 rounded-lg hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-colors">
                  <div className="col-span-5 font-mono text-xs text-gray-800 truncate" title={f.path}>
                    {'  '.repeat(Math.max(0, f.depth - 1))}
                    {f.path}
                  </div>
                  <div className="col-span-2">
                    <span className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-medium ${TYPE_COLORS[f.type] || 'bg-gray-100 text-gray-700'}`}>
                      {TYPE_ICONS[f.type]}
                      {f.type}
                      {f.arrayLength !== undefined && <span className="ml-0.5">[{f.arrayLength}]</span>}
                    </span>
                  </div>
                  <div className="col-span-1 text-center text-xs text-gray-500">{f.depth}</div>
                  <div className="col-span-2 text-right text-xs font-medium text-gray-700">{formatSize(f.size)}</div>
                  <div className="col-span-2">
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className={`h-1.5 rounded-full ${f.percentage > 20 ? 'bg-red-500' : f.percentage > 10 ? 'bg-amber-500' : 'bg-primary-500'}`}
                        style={{ width: `${Math.min(f.percentage, 100)}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-gray-400">{f.percentage.toFixed(1)}%</span>
                  </div>
                </div>
              ))}
              {sortedFiltered.length === 0 && (
                <p className="text-center text-sm text-gray-400 py-8">No fields match the current filter.</p>
              )}
            </div>
          </div>
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
