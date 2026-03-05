'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
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
} from 'lucide-react';
import toast from 'react-hot-toast';
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

const DB_OPTIONS: { value: DbFlavor; label: string }[] = [
  { value: 'mysql', label: 'MySQL' },
  { value: 'postgresql', label: 'PostgreSQL' },
  { value: 'sqlserver', label: 'SQL Server' },
  { value: 'oracle', label: 'Oracle' },
  { value: 'sqlite', label: 'SQLite' },
];

const FORMAT_OPTIONS: { value: OutputFormatType; label: string }[] = [
  { value: 'sql_in', label: 'SQL IN' },
  { value: 'json', label: 'JSON' },
  { value: 'csv', label: 'CSV' },
  { value: 'graphql', label: 'GraphQL' },
  { value: 'mongodb', label: 'MongoDB' },
];

// 50 sample IDs: alphanumeric + hyphen, 15 characters each (e.g. Ab12-cD34-ef567)
const SAMPLE_50_IDS = [
  'Ab12-cD34-ef567', 'Gh89-Ij01-kl234', 'Mn56-Op78-qr901', 'St23-Uv45-wx678', 'Yz90-Ab12-cd345',
  'Ef67-Gh89-ij012', 'Kl34-Mn56-op789', 'Qr01-St23-uv456', 'Wx78-Yz90-ab123', 'Cd45-Ef67-gh890',
  'Ij12-Kl34-mn567', 'Op89-Qr01-st234', 'Uv56-Wx78-yz901', 'Ab23-Cd45-ef678', 'Gh90-Ij12-kl345',
  'Mn67-Op89-qr012', 'St34-Uv56-wx789', 'Yz01-Ab23-cd456', 'Ef78-Gh90-ij123', 'Kl45-Mn67-op890',
  'Qr12-St34-uv567', 'Wx89-Yz01-ab234', 'Cd56-Ef78-gh901', 'Ij23-Kl45-mn678', 'Op90-Qr12-st345',
  'Uv67-Wx89-yz012', 'Ab34-Cd56-ef789', 'Gh01-Ij23-kl456', 'Mn78-Op90-qr123', 'St45-Uv67-wx890',
  'Yz12-Ab34-cd567', 'Ef89-Gh01-ij234', 'Kl56-Mn78-op901', 'Qr23-St45-uv678', 'Wx90-Yz12-ab345',
  'Cd67-Ef89-gh012', 'Ij34-Kl56-mn789', 'Op01-Qr23-st456', 'Uv78-Wx90-yz123', 'Ab45-Cd67-ef890',
  'Gh12-Ij34-kl567', 'Mn89-Op01-qr234', 'St56-Uv78-wx901', 'Yz23-Ab45-cd678', 'Ef90-Gh12-ij345',
  'Kl67-Mn89-op012', 'Qr34-St56-uv789', 'Wx01-Yz23-ab456', 'Cd78-Ef90-gh123', 'Ij45-Kl67-mn890',
];

export default function SqlFormatter() {
  const [input, setInput] = useState('');
  const [formattedOutput, setFormattedOutput] = useState('');
  const [copied, setCopied] = useState(false);
  const [formatType, setFormatType] = useState<'sql' | 'sqlWithIn'>('sql');
  const [valueMode, setValueMode] = useState<'numeric' | 'string'>('numeric');
  const [quoteType, setQuoteType] = useState<"'" | '"'>("'");
  const [outputLayout, setOutputLayout] = useState<'horizontal' | 'vertical'>('vertical');
  const [db, setDb] = useState<DbFlavor>('mysql');
  const [outputFormat, setOutputFormat] = useState<OutputFormatType>('sql_in');
  const [chunkSize, setChunkSize] = useState(0);
  const [parameterized, setParameterized] = useState(false);
  const [rangeCompression, setRangeCompression] = useState(false);
  const [showInsert, setShowInsert] = useState(false);
  const [columnName, setColumnName] = useState('id');
  const [tableName, setTableName] = useState('temp_ids');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [ids, setIds] = useState<string[]>([]);
  const resultsSectionRef = useRef<HTMLDivElement>(null);

  const quote = quoteType;

  const generateOutput = useCallback(() => {
    const parsed = parseInput(input);
    const cleaned = cleanIds(parsed);
    setIds(cleaned);
    if (cleaned.length === 0) {
      setFormattedOutput('');
      return cleaned.length;
    }
    const opts = {
      valueMode,
      quote,
      parameterized,
      columnName,
      tableName,
      chunkSize: outputFormat === 'sql_in' ? chunkSize : 0,
      useRangeCompression: outputFormat === 'sql_in' && rangeCompression,
    };
    if (outputFormat !== 'sql_in') {
      setFormattedOutput(formatOutput(cleaned, outputFormat, { valueMode, quote }));
      return cleaned.length;
    }
    if (showInsert) {
      setFormattedOutput(sqlInsertValues(cleaned, { ...opts, tableName, columnName }));
      return cleaned.length;
    }
    if (rangeCompression) {
      const where = hybridWhere(cleaned, db, { ...opts, columnName });
      setFormattedOutput(`SELECT * FROM table_name ${where};`);
      return cleaned.length;
    }
    const fullSql = previewSelect(cleaned, db, {
      ...opts,
      useRangeCompression: false,
    });
    if (formatType === 'sql') {
      const withParens = formatOutput(cleaned, 'sql_in', { valueMode, quote });
      const valuesOnly = withParens.replace(/^\(|\)$/g, '').trim();
      setFormattedOutput(outputLayout === 'vertical' ? valuesOnly.split(',').map((v) => v.trim()).join(',\n') : valuesOnly);
    } else {
      setFormattedOutput(fullSql);
    }
    return cleaned.length;
  }, [
    input,
    valueMode,
    quote,
    parameterized,
    columnName,
    tableName,
    outputFormat,
    showInsert,
    rangeCompression,
    db,
    chunkSize,
    formatType,
    outputLayout,
  ]);

  const formatInput = () => {
    if (!input.trim()) {
      toast.error('Please enter some values');
      return;
    }
    const count = generateOutput();
    if (count > 0) {
      const parsed = parseInput(input);
      const cleaned = cleanIds(parsed);
      const dupes = parsed.length - cleaned.length;
      toast.success(
        dupes > 0
          ? `${cleaned.length} value(s) · ${dupes} duplicate(s) removed`
          : `${cleaned.length} value(s)`
      );
      setTimeout(() => resultsSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    } else {
      toast.error('No valid values found');
    }
  };

  const handleCopy = () => {
    if (!formattedOutput) {
      toast.error('Nothing to copy');
      return;
    }
    navigator.clipboard.writeText(formattedOutput);
    setCopied(true);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (ids.length === 0) {
      toast.error('Generate output first to share');
      return;
    }
    if (typeof window === 'undefined') return;
    const url = new URL(window.location.href);
    url.searchParams.set('ids', ids.join(','));
    window.history.replaceState({}, '', url.toString());
    navigator.clipboard.writeText(url.toString());
    toast.success('Share link copied!');
  };

  const handleDownload = (ext: 'sql' | 'csv' | 'json' | 'txt') => {
    if (!formattedOutput) {
      toast.error('Nothing to download');
      return;
    }
    const mime = ext === 'json' ? 'application/json' : ext === 'csv' ? 'text/csv' : 'text/plain';
    const blob = new Blob([formattedOutput], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sql-in-clause.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success(`Downloaded .${ext}`);
  };

  const handleClear = () => {
    setInput('');
    setFormattedOutput('');
    setIds([]);
    setCopied(false);
  };

  const cleanedCount = cleanIds(parseInput(input)).length;

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const idsParam = params.get('ids');
    if (idsParam) {
      setInput(idsParam);
      const parsed = parseInput(idsParam);
      const cleaned = cleanIds(parsed);
      setIds(cleaned);
      if (cleaned.length > 0) {
        setFormattedOutput(
          previewSelect(cleaned, db, {
            valueMode,
            quote,
            parameterized,
            chunkSize,
            columnName,
            useRangeCompression: rangeCompression,
          })
        );
      }
    }
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="p-5 sm:p-6 bg-gradient-to-br from-slate-50 to-blue-50/50 border-b border-gray-100">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-primary-100">
              <Database className="w-6 h-6 text-primary-600" aria-hidden />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                Comma-separated ID list for SQL IN clause
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-800">
                  <Sparkles className="w-3.5 h-3.5" aria-hidden />
                  Advanced
                </span>
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Auto-detect: CSV, JSON array, newline, tab, or mixed. Output for MySQL, PostgreSQL, SQL Server, Oracle, SQLite. Duplicates removed automatically.
              </p>
            </div>
          </div>
        </div>

        <div className="p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
            <label htmlFor="sql-formatter-input" className="text-sm font-medium text-gray-700">
              Input — paste any list
            </label>
            <button
              type="button"
              onClick={() => {
                setInput(SAMPLE_50_IDS.join('\n'));
                toast.success('Loaded 50 sample IDs (15-char alphanumeric with hyphen)');
              }}
              className="inline-flex items-center px-4 py-2 rounded-lg border border-primary-300 bg-primary-50 text-primary-700 text-sm font-semibold hover:bg-primary-100 transition-colors"
            >
              Load Sample
            </button>
          </div>
          <textarea
            id="sql-formatter-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="1, 2, 3, 4\nor [1,2,3,4]\nor ID-123  ID-456\none per line..."
            className="w-full h-36 p-4 border-2 border-gray-200 rounded-xl font-mono text-sm resize-y min-h-[120px] focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-shadow"
            aria-label="Paste IDs or list"
          />
          {cleanedCount > 0 && (
            <p className="mt-1.5 text-xs text-gray-600 flex items-center gap-1">
              <Hash className="w-3.5 h-3.5" aria-hidden />
              {cleanedCount} value(s) after clean
            </p>
          )}

          {/* Primary options — same row as before, enhanced */}
          <div className="mt-5 p-4 bg-gray-50 rounded-xl border border-gray-100 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <span className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Format</span>
                <div className="flex gap-1.5 flex-wrap">
                  <button
                    type="button"
                    onClick={() => setFormatType('sql')}
                    className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                      formatType === 'sql' ? 'bg-primary-600 text-white shadow-sm' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    Values only
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormatType('sqlWithIn')}
                    className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                      formatType === 'sqlWithIn' ? 'bg-primary-600 text-white shadow-sm' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    With IN
                  </button>
                </div>
              </div>
              <div>
                <span className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Value type</span>
                <div className="flex gap-1.5 flex-wrap">
                  <button
                    type="button"
                    onClick={() => setValueMode('numeric')}
                    className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                      valueMode === 'numeric' ? 'bg-primary-600 text-white shadow-sm' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    Numeric
                  </button>
                  <button
                    type="button"
                    onClick={() => setValueMode('string')}
                    className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                      valueMode === 'string' ? 'bg-primary-600 text-white shadow-sm' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    String
                  </button>
                  {valueMode === 'string' && (
                    <>
                      <button
                        type="button"
                        onClick={() => setQuoteType("'")}
                        className={`px-2 py-2 rounded-lg text-xs font-medium ${quoteType === "'" ? 'bg-primary-600 text-white' : 'bg-white border border-gray-300'}`}
                      >
                        &apos;
                      </button>
                      <button
                        type="button"
                        onClick={() => setQuoteType('"')}
                        className={`px-2 py-2 rounded-lg text-xs font-medium ${quoteType === '"' ? 'bg-primary-600 text-white' : 'bg-white border border-gray-300'}`}
                      >
                        &quot;
                      </button>
                    </>
                  )}
                </div>
              </div>
              <div>
                <label htmlFor="sql-formatter-db" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Database
                </label>
                <select
                  id="sql-formatter-db"
                  value={db}
                  onChange={(e) => setDb(e.target.value as DbFlavor)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  aria-label="Database"
                >
                  {DB_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="sql-formatter-output-format" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Output as
                </label>
                <select
                  id="sql-formatter-output-format"
                  value={outputFormat}
                  onChange={(e) => setOutputFormat(e.target.value as OutputFormatType)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  aria-label="Output format"
                >
                  {FORMAT_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Advanced options — collapsible */}
            <div className="border-t border-gray-200 pt-4">
              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors"
                aria-expanded={showAdvanced}
              >
                {showAdvanced ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                More options
              </button>
              {showAdvanced && (
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <span className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Layout</span>
                    <div className="flex gap-1.5">
                      <button
                        type="button"
                        onClick={() => setOutputLayout('horizontal')}
                        className={`px-3 py-2 rounded-lg text-xs font-medium ${outputLayout === 'horizontal' ? 'bg-primary-600 text-white' : 'bg-white border border-gray-300'}`}
                      >
                        Horizontal
                      </button>
                      <button
                        type="button"
                        onClick={() => setOutputLayout('vertical')}
                        className={`px-3 py-2 rounded-lg text-xs font-medium ${outputLayout === 'vertical' ? 'bg-primary-600 text-white' : 'bg-white border border-gray-300'}`}
                      >
                        Vertical
                      </button>
                    </div>
                  </div>
                  {outputFormat === 'sql_in' && (
                    <>
                      <div>
                        <label htmlFor="sql-formatter-chunk" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                          Chunk size (0 = off)
                        </label>
                        <input
                          id="sql-formatter-chunk"
                          type="number"
                          min={0}
                          max={10000}
                          value={chunkSize}
                          onChange={(e) => setChunkSize(Number(e.target.value) || 0)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        />
                      </div>
                      <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={parameterized}
                          onChange={(e) => setParameterized(e.target.checked)}
                          className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        />
                        Parameterized (?, $1, @p1)
                      </label>
                      <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={rangeCompression}
                          onChange={(e) => setRangeCompression(e.target.checked)}
                          className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        />
                        Range (BETWEEN)
                      </label>
                      <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={showInsert}
                          onChange={(e) => setShowInsert(e.target.checked)}
                          className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        />
                        SQL INSERT
                      </label>
                      {showInsert && (
                        <>
                          <div>
                            <label htmlFor="sql-formatter-table" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Table</label>
                            <input
                              id="sql-formatter-table"
                              type="text"
                              value={tableName}
                              onChange={(e) => setTableName(e.target.value || 'temp_ids')}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                            />
                          </div>
                          <div>
                            <label htmlFor="sql-formatter-column" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Column</label>
                            <input
                              id="sql-formatter-column"
                              type="text"
                              value={columnName}
                              onChange={(e) => setColumnName(e.target.value || 'id')}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                            />
                          </div>
                        </>
                      )}
                      {!showInsert && (
                        <div>
                          <label htmlFor="sql-formatter-column-where" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">WHERE column</label>
                          <input
                            id="sql-formatter-column-where"
                            type="text"
                            value={columnName}
                            onChange={(e) => setColumnName(e.target.value || 'id')}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                          />
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mt-5">
            <button
              onClick={formatInput}
              disabled={!input.trim()}
              className="flex-1 min-w-[140px] py-3 px-5 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
            >
              <Database className="w-5 h-5" aria-hidden />
              Format
            </button>
            <button
              onClick={handleClear}
              className="px-5 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors flex items-center gap-2"
            >
              <RefreshCw className="w-5 h-5" aria-hidden />
              Clear
            </button>
          </div>
        </div>
      </div>

      {formattedOutput && (
        <div ref={resultsSectionRef} className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden scroll-mt-4">
          <div className="p-4 border-b border-gray-100 flex flex-wrap items-center justify-between gap-3 bg-gray-50/80">
            <h3 className="text-base font-bold text-gray-800 flex items-center gap-2">
              <FileCode className="w-5 h-5 text-primary-600" aria-hidden />
              Output
              {ids.length > 0 && (
                <span className="text-xs font-normal text-gray-500 font-mono">
                  {ids.length} ID(s) · {formattedOutput.split('\n').length} line(s)
                </span>
              )}
            </h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
              >
                <Share2 className="w-4 h-4" aria-hidden />
                Share URL
              </button>
              <div className="flex gap-1">
                {(['sql', 'csv', 'json', 'txt'] as const).map((ext) => (
                  <button
                    key={ext}
                    onClick={() => handleDownload(ext)}
                    className="px-3 py-2 text-xs font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    .{ext}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <pre className="p-5 bg-gray-900 text-gray-100 text-sm overflow-x-auto overflow-y-auto max-h-[420px] font-mono">
            <code>{formattedOutput}</code>
          </pre>
          <p className="px-5 pb-4 text-xs text-gray-500">
            Ready for MySQL, PostgreSQL, Oracle, Trino, SQL Server, SQLite. Use with prepared statements when Parameterized is enabled.
          </p>
        </div>
      )}

      <div className="mt-12 bg-white rounded-xl shadow-lg p-8 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Learn More About MySQL</h2>
        <div className="space-y-3">
          <Link
            href="/blog/mysql-json-complete-guide"
            className="block p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200 hover:border-purple-400 hover:shadow-md transition-all"
          >
            <h3 className="font-semibold text-gray-900 mb-1">Working with JSON in MySQL: Complete Guide</h3>
            <p className="text-sm text-gray-600 mb-2">Complete guide to working with JSON in MySQL: JSON data types, structure, extracting data from JSON columns, nested JSON queries, 10 practical examples, and tips & tricks.</p>
            <span className="text-purple-600 text-sm font-medium hover:underline">Read Guide →</span>
          </Link>
          <Link
            href="/blog/mysql-10-most-used-functions"
            className="block p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 hover:border-blue-400 hover:shadow-md transition-all"
          >
            <h3 className="font-semibold text-gray-900 mb-1">MySQL 10 Most Used Functions: Complete Guide</h3>
            <p className="text-sm text-gray-600 mb-2">Complete guide to MySQL 10 most used functions: COUNT, SUM, AVG, MAX, MIN, CONCAT, SUBSTRING, DATE_FORMAT, IF, and CASE with examples and best practices.</p>
            <span className="text-blue-600 text-sm font-medium hover:underline">Read Guide →</span>
          </Link>
          <Link
            href="/blog/mysql-25-most-used-queries"
            className="block p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200 hover:border-green-400 hover:shadow-md transition-all"
          >
            <h3 className="font-semibold text-gray-900 mb-1">MySQL 25 Most Used Queries: Complete Guide</h3>
            <p className="text-sm text-gray-600 mb-2">Complete guide to MySQL 25 most used queries: SELECT, INSERT, UPDATE, DELETE, JOIN, WHERE, GROUP BY, ORDER BY, and more with examples and best practices.</p>
            <span className="text-green-600 text-sm font-medium hover:underline">Read Guide →</span>
          </Link>
        </div>
      </div>
    </div>
  );
}