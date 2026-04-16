'use client';

import { useState, useRef, useCallback, useEffect, DragEvent } from 'react';
import {
  Database,
  Copy,
  Check,
  RefreshCw,
  Download,
  Share2,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Hash,
  FileCode,
  BarChart2,
  ArrowUpDown,
  Upload,
  Zap,
  AlertTriangle,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { trackCopy, trackCtaClick } from '@/lib/analytics';
import Link from 'next/link';
import {
  parseInput,
  cleanIds,
  previewSelect,
  sqlInsertValues,
  formatOutput,
  hybridWhere,
  type DbFlavor,
  type OutputFormatType,
} from '@/lib/sqlInGenerator';

/* ─── Types & Constants ─────────────────────────────────────────── */

const DB_OPTIONS: { value: DbFlavor; label: string; paramStyle: string }[] = [
  { value: 'mysql',      label: 'MySQL',      paramStyle: '?' },
  { value: 'postgresql', label: 'PostgreSQL', paramStyle: '$1, $2' },
  { value: 'sqlserver',  label: 'SQL Server', paramStyle: '@p1, @p2' },
  { value: 'oracle',     label: 'Oracle',     paramStyle: ':1, :2' },
  { value: 'sqlite',     label: 'SQLite',     paramStyle: '?' },
];

const FORMAT_OPTIONS: { value: OutputFormatType; label: string; desc: string }[] = [
  { value: 'sql_in',   label: 'SQL IN',   desc: 'WHERE id IN (...)' },
  { value: 'json',     label: 'JSON',     desc: '{"ids":[...]}' },
  { value: 'csv',      label: 'CSV',      desc: '1,2,3,...' },
  { value: 'graphql',  label: 'GraphQL',  desc: 'ids:[...]' },
  { value: 'mongodb',  label: 'MongoDB',  desc: '{$in:[...]}' },
];

type Preset = {
  label: string;
  icon: string;
  db: DbFlavor;
  valueMode: 'numeric' | 'string';
  parameterized: boolean;
  rangeCompression: boolean;
  chunkSize: number;
  formatType: 'sql' | 'sqlWithIn';
  desc: string;
};

const PRESETS: Preset[] = [
  { label: 'MySQL Safe',    icon: '🐬', db: 'mysql',      valueMode: 'numeric', parameterized: false, rangeCompression: false, chunkSize: 0,    formatType: 'sqlWithIn', desc: 'Full SELECT with WHERE IN clause' },
  { label: 'PG ANY()',      icon: '🐘', db: 'postgresql', valueMode: 'numeric', parameterized: true,  rangeCompression: false, chunkSize: 0,    formatType: 'sqlWithIn', desc: 'Parameterized for PostgreSQL' },
  { label: 'Oracle Chunk',  icon: '🏛️', db: 'oracle',     valueMode: 'numeric', parameterized: false, rangeCompression: false, chunkSize: 1000, formatType: 'sqlWithIn', desc: 'Split into 1000-item chunks' },
  { label: 'BETWEEN Range', icon: '📏', db: 'mysql',      valueMode: 'numeric', parameterized: false, rangeCompression: true,  chunkSize: 0,    formatType: 'sqlWithIn', desc: 'Compress consecutive IDs to BETWEEN' },
  { label: 'Values Only',   icon: '📋', db: 'mysql',      valueMode: 'string',  parameterized: false, rangeCompression: false, chunkSize: 0,    formatType: 'sql',       desc: "Just the quoted values, one per line" },
];

const SAMPLES = [
  { label: '🔢 Numeric IDs', data: Array.from({ length: 20 }, (_, i) => String(1001 + i * 7)).join('\n'), msg: '20 sequential numeric IDs' },
  { label: '🔑 UUIDs', data: ['a1b2c3d4-e5f6-7890-abcd-ef1234567890','b2c3d4e5-f6a7-8901-bcde-f12345678901','c3d4e5f6-a7b8-9012-cdef-123456789012','d4e5f6a7-b8c9-0123-defa-234567890123','e5f6a7b8-c9d0-1234-efab-345678901234'].join('\n'), msg: '5 sample UUIDs' },
  { label: '📧 Emails', data: ['alice@example.com','bob@example.com','carol@example.com','dave@example.com','eve@example.com'].join('\n'), msg: '5 sample emails' },
  { label: '🔡 Mixed (with dupes)', data: '5, 3, 1, 2, 3, 5, 7, 8, 7, 10\n12, 15, 12, 20\n101', msg: 'Mixed list with duplicates' },
];

/* ─── Stats ─────────────────────────────────────────────────────── */

function computeStats(rawIds: string[], cleanedIds: string[]) {
  const dupeCount = rawIds.length - cleanedIds.length;
  const nums = cleanedIds.map(Number).filter((n) => !isNaN(n) && cleanedIds.every(v => !isNaN(Number(v))));
  const isNumeric = nums.length === cleanedIds.length && cleanedIds.length > 0;
  const min = isNumeric ? Math.min(...nums) : null;
  const max = isNumeric ? Math.max(...nums) : null;
  return {
    raw: rawIds.length,
    unique: cleanedIds.length,
    dupes: dupeCount,
    isNumeric,
    min,
    max,
    avg: isNumeric && nums.length ? (nums.reduce((a, b) => a + b, 0) / nums.length).toFixed(1) : null,
    range: isNumeric && min !== null && max !== null ? max - min : null,
  };
}

function autoDetectValueMode(ids: string[]): 'numeric' | 'string' {
  if (ids.length === 0) return 'numeric';
  const numericCount = ids.filter(id => !isNaN(Number(id)) && id.trim() !== '').length;
  return numericCount / ids.length >= 0.9 ? 'numeric' : 'string';
}

/* ─── Component ─────────────────────────────────────────────────── */

export default function SqlInClauseGenerator() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);
  const [copiedChunk, setCopiedChunk] = useState<number | null>(null);
  const [formatType, setFormatType] = useState<'sql' | 'sqlWithIn'>('sql');
  const [valueMode, setValueMode] = useState<'numeric' | 'string'>('numeric');
  const [autoDetected, setAutoDetected] = useState(false);
  const [quoteType, setQuoteType] = useState<"'" | '"'>("'");
  const [db, setDb] = useState<DbFlavor>('mysql');
  const [outputFormat, setOutputFormat] = useState<OutputFormatType>('sql_in');
  const [chunkSize, setChunkSize] = useState(0);
  const [parameterized, setParameterized] = useState(false);
  const [rangeCompression, setRangeCompression] = useState(false);
  const [showInsert, setShowInsert] = useState(false);
  const [columnName, setColumnName] = useState('id');
  const [tableName, setTableName] = useState('temp_ids');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [sortOrder, setSortOrder] = useState<'none' | 'asc' | 'desc'>('none');
  const [ids, setIds] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [chunks, setChunks] = useState<string[]>([]);
  const resultRef = useRef<HTMLDivElement>(null);

  // ⌘+Enter shortcut
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        e.preventDefault();
        if (input.trim()) handleGenerate();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input]);

  // URL param pre-load
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const p = new URLSearchParams(window.location.search);
    const idsParam = p.get('ids');
    if (idsParam) {
      setInput(idsParam);
      const parsed = parseInput(idsParam);
      const cleaned = cleanIds(parsed);
      if (cleaned.length > 0) runGenerate(cleaned);
    }
  }, []);

  // Re-run when options change (if we already have ids)
  useEffect(() => {
    if (ids.length > 0) runGenerate(ids);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueMode, quoteType, parameterized, columnName, tableName, outputFormat, showInsert, rangeCompression, db, chunkSize, formatType, sortOrder]);

  const getSorted = (arr: string[]) => {
    if (sortOrder === 'asc') return [...arr].sort((a, b) => {
      const na = Number(a), nb = Number(b);
      return !isNaN(na) && !isNaN(nb) ? na - nb : a.localeCompare(b);
    });
    if (sortOrder === 'desc') return [...arr].sort((a, b) => {
      const na = Number(a), nb = Number(b);
      return !isNaN(na) && !isNaN(nb) ? nb - na : b.localeCompare(a);
    });
    return arr;
  };

  const runGenerate = useCallback((cleaned: string[]) => {
    if (cleaned.length === 0) { setOutput(''); setChunks([]); return; }
    setIds(cleaned);
    const sorted = getSorted(cleaned);
    const opts = { valueMode, quote: quoteType, parameterized, columnName, tableName };

    if (outputFormat !== 'sql_in') {
      const out = formatOutput(sorted, outputFormat, { valueMode, quote: quoteType });
      setOutput(out);
      setChunks([]);
      return;
    }

    if (showInsert) {
      setOutput(sqlInsertValues(sorted, { ...opts, tableName, columnName }));
      setChunks([]);
      return;
    }

    if (rangeCompression) {
      const where = hybridWhere(sorted, db, { ...opts, columnName });
      setOutput(`SELECT * FROM ${tableName} ${where};`);
      setChunks([]);
      return;
    }

    const full = previewSelect(sorted, db, { ...opts, chunkSize: chunkSize > 0 ? chunkSize : 0, useRangeCompression: false });

    if (formatType === 'sql') {
      const withParens = formatOutput(sorted, 'sql_in', { valueMode, quote: quoteType });
      const valuesOnly = withParens.replace(/^\(|\)$/g, '').trim();
      const vertical = valuesOnly.split(',').map(v => v.trim()).join(',\n');
      setOutput(vertical);
      setChunks([]);
    } else {
      setOutput(full);
      // Build individual chunks if chunkSize > 0
      if (chunkSize > 0 && sorted.length > chunkSize) {
        const chunkArr: string[] = [];
        for (let i = 0; i < sorted.length; i += chunkSize) {
          const slice = sorted.slice(i, i + chunkSize);
          chunkArr.push(previewSelect(slice, db, { ...opts, chunkSize: 0, useRangeCompression: false }));
        }
        setChunks(chunkArr);
      } else {
        setChunks([]);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueMode, quoteType, parameterized, columnName, tableName, outputFormat, showInsert, rangeCompression, db, chunkSize, formatType, sortOrder]);

  const handleGenerate = () => {
    trackCtaClick('sql_in_clause_generator', 'generate');
    if (!input.trim()) { toast.error('Paste some values first'); return; }
    const parsed = parseInput(input);
    const cleaned = cleanIds(parsed);
    if (cleaned.length === 0) { toast.error('No valid values found'); return; }

    // Auto-detect value mode
    const detected = autoDetectValueMode(cleaned);
    if (detected !== valueMode) {
      setValueMode(detected);
      setAutoDetected(true);
    } else {
      setAutoDetected(false);
    }

    const dupes = parsed.length - cleaned.length;
    runGenerate(cleaned);
    toast.success(`${cleaned.length} value(s)${dupes > 0 ? ` · ${dupes} duplicate(s) removed` : ''}`);
    setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
  };

  const applyPreset = (preset: Preset) => {
    setDb(preset.db);
    setValueMode(preset.valueMode);
    setParameterized(preset.parameterized);
    setRangeCompression(preset.rangeCompression);
    setChunkSize(preset.chunkSize);
    setFormatType(preset.formatType);
    setOutputFormat('sql_in');
    toast.success(`Preset: ${preset.label}`);
  };

  const handleCopy = (text?: string) => {
    const content = text ?? output;
    if (!content) { toast.error('Nothing to copy'); return; }
    navigator.clipboard.writeText(content);
    trackCopy('sql_in_clause_generator');
    if (text) {
      const idx = chunks.indexOf(text);
      setCopiedChunk(idx);
      setTimeout(() => setCopiedChunk(null), 2000);
    } else {
      setCopied(true);
      toast.success('Copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShare = () => {
    if (ids.length === 0) { toast.error('Generate first'); return; }
    const url = new URL(window.location.href);
    url.searchParams.set('ids', ids.join(','));
    window.history.replaceState({}, '', url.toString());
    navigator.clipboard.writeText(url.toString());
    toast.success('Share link copied!');
  };

  const handleDownload = (ext: 'sql' | 'csv' | 'json' | 'txt') => {
    if (!output) { toast.error('Generate first'); return; }
    trackCtaClick('sql_in_clause_generator', 'download', { format: ext });
    const mime = ext === 'json' ? 'application/json' : ext === 'csv' ? 'text/csv' : 'text/plain';
    const blob = new Blob([output], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `sql-in-clause.${ext}`; a.click();
    URL.revokeObjectURL(url);
    toast.success(`Downloaded .${ext}`);
  };

  const handleClear = () => { setInput(''); setOutput(''); setIds([]); setChunks([]); setAutoDetected(false); };

  // Drag & drop
  const handleDrop = async (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (!file) return;
    if (!['text/plain', 'text/csv', 'application/json', ''].includes(file.type) && !file.name.match(/\.(txt|csv|json)$/i)) {
      toast.error('Drop a .txt, .csv, or .json file');
      return;
    }
    const text = await file.text();
    setInput(text);
    toast.success(`Loaded ${file.name}`);
  };

  // Live stats
  const rawParsed = parseInput(input);
  const cleanedForStats = cleanIds(rawParsed);
  const stats = input.trim() ? computeStats(rawParsed, cleanedForStats) : null;
  const selectedDb = DB_OPTIONS.find(d => d.value === db);

  return (
    <div className="space-y-5">

      {/* ── Input Panel ─────────────────────────────────────────── */}
      <div
        className={`bg-white rounded-xl shadow-sm border-2 transition-colors overflow-hidden ${isDragging ? 'border-blue-400 bg-blue-50/40' : 'border-gray-200'}`}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        <div className="p-5 bg-gradient-to-br from-slate-50 to-blue-50/40 border-b border-gray-100">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-blue-100">
              <Database className="w-5 h-5 text-blue-600" aria-hidden />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-base font-bold text-gray-900">
                SQL IN Clause Generator
                <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-800">
                  <Sparkles className="w-3 h-3" aria-hidden />
                  Auto-detect
                </span>
              </h2>
              <p className="text-sm text-gray-600 mt-0.5">
                Paste any list or drag &amp; drop a .txt, .csv, .json file — auto-detect handles comma, newline, tab, space, pipe <code className="text-xs bg-gray-100 px-1 rounded">|</code>, semicolon, and JSON array.
              </p>
            </div>
          </div>
        </div>

        <div className="p-5">
          {/* Sample buttons */}
          <div className="flex flex-wrap gap-1.5 mb-2">
            {SAMPLES.map((s) => (
              <button key={s.label} type="button"
                onClick={() => { setInput(s.data); toast.success(s.msg); }}
                className="inline-flex items-center px-2.5 py-1 rounded-lg border border-gray-300 bg-gray-50 text-gray-700 text-xs font-medium hover:bg-gray-100 transition-colors"
              >{s.label}</button>
            ))}
            <button type="button" onClick={handleClear}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-gray-300 bg-gray-50 text-gray-500 text-xs font-medium hover:bg-gray-100 transition-colors ml-auto"
            >
              <RefreshCw className="w-3 h-3" aria-hidden /> Clear
            </button>
          </div>

          {/* Textarea */}
          <div className="relative">
            {isDragging && (
              <div className="absolute inset-0 flex items-center justify-center bg-blue-50/80 rounded-xl border-2 border-dashed border-blue-400 z-10">
                <div className="text-center">
                  <Upload className="w-8 h-8 text-blue-500 mx-auto mb-1" aria-hidden />
                  <p className="text-sm font-semibold text-blue-700">Drop file to import</p>
                </div>
              </div>
            )}
            <textarea
              id="sql-in-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={"Paste IDs, emails, UUIDs...\n1, 2, 3  or  1 2 3  or  1|2|3  or  [1,2,3]  or  one per line\n\nOr drag & drop a .txt, .csv, .json file"}
              className="w-full h-36 p-4 border border-gray-200 rounded-xl font-mono text-sm resize-y min-h-[110px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400 bg-gray-50 transition-shadow"
              aria-label="Paste IDs or list"
            />
          </div>

          {/* Live stats bar */}
          {stats && stats.raw > 0 && (
            <div className="mt-3 p-3 rounded-lg bg-blue-50 border border-blue-100">
              <div className="flex items-center gap-1.5 mb-2">
                <BarChart2 className="w-3.5 h-3.5 text-blue-600" aria-hidden />
                <span className="text-xs font-semibold text-blue-800">Input Stats</span>
                {stats.dupes > 0 && (
                  <span className="ml-auto inline-flex items-center gap-1 text-[11px] text-amber-700 font-medium">
                    <AlertTriangle className="w-3 h-3" aria-hidden />
                    {stats.dupes} duplicate{stats.dupes !== 1 ? 's' : ''} will be removed
                  </span>
                )}
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 text-center">
                <div>
                  <div className="text-lg font-bold text-blue-700">{stats.raw}</div>
                  <div className="text-[10px] text-blue-600">Raw</div>
                </div>
                <div>
                  <div className={`text-lg font-bold ${stats.dupes > 0 ? 'text-amber-600' : 'text-gray-400'}`}>{stats.dupes}</div>
                  <div className="text-[10px] text-blue-600">Dupes</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-emerald-700">{stats.unique}</div>
                  <div className="text-[10px] text-blue-600">Unique</div>
                </div>
                {stats.isNumeric && stats.range !== null && (
                  <div>
                    <div className="text-lg font-bold text-violet-700">{stats.range}</div>
                    <div className="text-[10px] text-blue-600">Range</div>
                  </div>
                )}
              </div>
              {stats.isNumeric && stats.avg && (
                <div className="mt-2 text-[11px] text-blue-700 text-center">
                  Min <strong>{stats.min}</strong> · Max <strong>{stats.max}</strong> · Avg <strong>{stats.avg}</strong>
                </div>
              )}
            </div>
          )}

          {/* Auto-detected notice */}
          {autoDetected && (
            <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-700">
              <Sparkles className="w-3.5 h-3.5" aria-hidden />
              Auto-detected value type: <strong>{valueMode}</strong>
            </div>
          )}
        </div>
      </div>

      {/* ── Quick Presets ────────────────────────────────────────── */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex items-center gap-2 mb-3">
          <Zap className="w-4 h-4 text-amber-500" aria-hidden />
          <span className="text-sm font-semibold text-gray-800">Quick Presets</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((p) => (
            <button key={p.label} type="button" onClick={() => applyPreset(p)}
              title={p.desc}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 bg-gray-50 text-gray-700 text-xs font-medium hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-colors"
            >
              <span>{p.icon}</span> {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Options ──────────────────────────────────────────────── */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-gray-50/60">
          <h3 className="text-sm font-semibold text-gray-800">Options</h3>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Format */}
            <div>
              <span className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Output Format</span>
              <div className="flex gap-1.5 flex-wrap">
                {(['sql', 'sqlWithIn'] as const).map((f) => (
                  <button key={f} type="button" onClick={() => setFormatType(f)}
                    className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${formatType === f ? 'bg-blue-600 text-white shadow-sm' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'}`}
                  >
                    {f === 'sql' ? 'Values only' : 'Full IN clause'}
                  </button>
                ))}
              </div>
            </div>

            {/* Value type */}
            <div>
              <span className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Value Type</span>
              <div className="flex gap-1.5 flex-wrap">
                {(['numeric', 'string'] as const).map((m) => (
                  <button key={m} type="button" onClick={() => { setValueMode(m); setAutoDetected(false); }}
                    className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${valueMode === m ? 'bg-blue-600 text-white shadow-sm' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'}`}
                  >
                    {m.charAt(0).toUpperCase() + m.slice(1)}
                  </button>
                ))}
                {valueMode === 'string' && (
                  <>
                    <button type="button" onClick={() => setQuoteType("'")}
                      className={`px-2 py-2 rounded-lg text-xs font-medium ${quoteType === "'" ? 'bg-blue-600 text-white' : 'bg-white border border-gray-300'}`}
                    >&apos;</button>
                    <button type="button" onClick={() => setQuoteType('"')}
                      className={`px-2 py-2 rounded-lg text-xs font-medium ${quoteType === '"' ? 'bg-blue-600 text-white' : 'bg-white border border-gray-300'}`}
                    >&quot;</button>
                  </>
                )}
              </div>
            </div>

            {/* Database */}
            <div>
              <label htmlFor="sic-db" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Database</label>
              <select id="sic-db" value={db} onChange={(e) => setDb(e.target.value as DbFlavor)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-400"
              >
                {DB_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
              {parameterized && selectedDb && (
                <p className="mt-1 text-[11px] text-gray-500">Params: <code className="font-mono">{selectedDb.paramStyle}</code></p>
              )}
            </div>

            {/* Column name */}
            <div>
              <label htmlFor="sic-column" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">WHERE Column</label>
              <input id="sic-column" type="text" value={columnName}
                onChange={(e) => setColumnName(e.target.value || 'id')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                placeholder="id"
              />
            </div>
          </div>

          {/* Format selector row */}
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label htmlFor="sic-output-fmt" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Export As</label>
              <select id="sic-output-fmt" value={outputFormat} onChange={(e) => setOutputFormat(e.target.value as OutputFormatType)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500"
              >
                {FORMAT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label} — {o.desc}</option>)}
              </select>
            </div>

            {/* Sort */}
            <div>
              <span className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Sort Output</span>
              <div className="flex gap-1.5">
                {(['none', 'asc', 'desc'] as const).map((s) => (
                  <button key={s} type="button" onClick={() => setSortOrder(s)}
                    className={`px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-1 transition-all ${sortOrder === s ? 'bg-blue-600 text-white shadow-sm' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'}`}
                  >
                    {s === 'none' ? 'None' : <><ArrowUpDown className="w-3 h-3" />{s === 'asc' ? 'A→Z' : 'Z→A'}</>}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Advanced toggle */}
          <div className="mt-4 border-t border-gray-100 pt-4">
            <button type="button" onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
              aria-expanded={showAdvanced}
            >
              {showAdvanced ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              Advanced options
            </button>

            {showAdvanced && (
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Chunk size */}
                {outputFormat === 'sql_in' && (
                  <div>
                    <label htmlFor="sic-chunk" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      Chunk Size <span className="text-gray-400 normal-case font-normal">(0 = off, 1000 for Oracle)</span>
                    </label>
                    <input id="sic-chunk" type="number" min={0} max={10000} value={chunkSize}
                      onChange={(e) => setChunkSize(Number(e.target.value) || 0)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                )}

                {/* Checkboxes */}
                <div className="space-y-2">
                  {outputFormat === 'sql_in' && (
                    <>
                      <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                        <input type="checkbox" checked={parameterized} onChange={(e) => setParameterized(e.target.checked)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                        Parameterized (?, $1, @p1)
                      </label>
                      <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                        <input type="checkbox" checked={rangeCompression} onChange={(e) => setRangeCompression(e.target.checked)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                        Range compression (BETWEEN)
                      </label>
                      <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                        <input type="checkbox" checked={showInsert} onChange={(e) => setShowInsert(e.target.checked)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                        SQL INSERT mode
                      </label>
                    </>
                  )}
                </div>

                {/* Table name (INSERT mode) */}
                {showInsert && outputFormat === 'sql_in' && (
                  <div>
                    <label htmlFor="sic-table" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Table Name</label>
                    <input id="sic-table" type="text" value={tableName}
                      onChange={(e) => setTableName(e.target.value || 'temp_ids')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Generate Button ──────────────────────────────────────── */}
      <div className="flex flex-wrap gap-3">
        <button onClick={handleGenerate} disabled={!input.trim()}
          className="flex-1 min-w-[160px] py-3 px-6 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
        >
          <Database className="w-5 h-5" aria-hidden />
          Generate SQL IN Clause
          <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded border border-blue-400/60 bg-blue-500/30 px-1.5 py-0.5 font-mono text-[10px] font-normal text-blue-100 ml-1">
            ⌘↵
          </kbd>
        </button>
      </div>

      {/* ── Output Panel ─────────────────────────────────────────── */}
      {output && (
        <div ref={resultRef} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden scroll-mt-4">
          <div className="p-4 border-b border-gray-100 bg-gray-50/70 flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-base font-bold text-gray-800 flex items-center gap-2">
              <FileCode className="w-5 h-5 text-blue-600" aria-hidden />
              Output
              {ids.length > 0 && (
                <span className="text-xs font-normal text-gray-500 font-mono">
                  {ids.length} value(s) · {output.split('\n').length} line(s) · {output.length} chars
                </span>
              )}
            </h3>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => handleCopy()}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied!' : 'Copy All'}
              </button>
              <button onClick={handleShare}
                className="inline-flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors text-sm"
              >
                <Share2 className="w-4 h-4" aria-hidden />
                Share
              </button>
              <div className="flex gap-1">
                {(['sql', 'csv', 'json', 'txt'] as const).map((ext) => (
                  <button key={ext} onClick={() => handleDownload(ext)}
                    className="px-2.5 py-2 text-xs font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >.{ext}</button>
                ))}
              </div>
            </div>
          </div>

          {/* Full output */}
          {(chunks.length === 0) && (
            <pre className="p-5 bg-gray-900 text-gray-100 text-sm overflow-x-auto overflow-y-auto max-h-[400px] font-mono">
              <code>{output}</code>
            </pre>
          )}

          {/* Per-chunk output */}
          {chunks.length > 0 && (
            <div className="divide-y divide-gray-800">
              {chunks.map((chunk, i) => (
                <div key={i} className="relative">
                  <div className="absolute top-2 right-2 z-10">
                    <button onClick={() => handleCopy(chunk)}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-gray-700 hover:bg-gray-600 text-white text-xs rounded-md transition-colors"
                    >
                      {copiedChunk === i ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      Chunk {i + 1}
                    </button>
                  </div>
                  <pre className="p-5 pt-9 bg-gray-900 text-gray-100 text-sm overflow-x-auto font-mono">
                    <code>{chunk}</code>
                  </pre>
                </div>
              ))}
            </div>
          )}

          <p className="px-5 pb-3 text-xs text-gray-500">
            {chunkSize > 0 && chunks.length > 0
              ? `Split into ${chunks.length} chunk(s) of up to ${chunkSize} values each`
              : `Ready for ${DB_OPTIONS.find(d => d.value === db)?.label}. ${parameterized ? 'Parameterized — use with prepared statements.' : ''}`}
          </p>
        </div>
      )}

      {/* ── Related Blogs ────────────────────────────────────────── */}
      <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">SQL IN Clause Guides</h2>
        <div className="space-y-3">
          {[
            { href: '/blog/sql-in-clause-guide', title: 'SQL IN Clause — Complete Guide with Examples', desc: 'Syntax, NOT IN, NULL pitfalls, subqueries, EXISTS vs JOIN, Oracle 1000 limit, parameterized queries.', color: 'from-blue-50 to-indigo-50', border: 'border-blue-200 hover:border-blue-400', link: 'text-blue-600' },
            { href: '/blog/sql-list-to-in-clause', title: 'Convert Any List to SQL IN Clause — CSV, Excel, JSON', desc: '5 methods: online tool, Excel TEXTJOIN, Python, JavaScript, shell one-liners. Handles all formats.', color: 'from-emerald-50 to-teal-50', border: 'border-emerald-200 hover:border-emerald-400', link: 'text-emerald-600' },
            { href: '/blog/how-to-format-sql-online', title: 'How to Format SQL Online — Beautify & Indent SQL Queries', desc: 'SQL style guide, keyword casing, IN list formatting, ORM output beautifying, editor plugins.', color: 'from-violet-50 to-purple-50', border: 'border-violet-200 hover:border-violet-400', link: 'text-violet-600' },
          ].map((b) => (
            <Link key={b.href} href={b.href}
              className={`block p-4 bg-gradient-to-r ${b.color} rounded-lg border ${b.border} hover:shadow-md transition-all`}
            >
              <h3 className="font-semibold text-gray-900 mb-1">{b.title}</h3>
              <p className="text-sm text-gray-600 mb-1">{b.desc}</p>
              <span className={`${b.link} text-sm font-medium`}>Read Guide →</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
