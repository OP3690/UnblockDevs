'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Database,
  Copy,
  Check,
  Download,
  Share2,
  FileCode,
  Trash2,
  Hash,
  ListOrdered,
} from 'lucide-react';
import toast from 'react-hot-toast';
import {
  parseInput,
  cleanIds,
  whereInChunked,
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

export default function SqlInGeneratorClient() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [valueMode, setValueMode] = useState<'numeric' | 'string'>('numeric');
  const [quote, setQuote] = useState<"'" | '"'>("'");
  const [chunkSize, setChunkSize] = useState(1000);
  const [db, setDb] = useState<DbFlavor>('mysql');
  const [outputFormat, setOutputFormat] = useState<OutputFormatType>('sql_in');
  const [parameterized, setParameterized] = useState(false);
  const [rangeCompression, setRangeCompression] = useState(false);
  const [columnName, setColumnName] = useState('id');
  const [tableName, setTableName] = useState('temp_ids');
  const [showInsert, setShowInsert] = useState(false);
  const [ids, setIds] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  // Read ?ids= from URL on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const idsParam = params.get('ids');
    if (idsParam) {
      setInput(idsParam);
      const parsed = parseInput(idsParam);
      const cleaned = cleanIds(parsed);
      setIds(cleaned);
      if (cleaned.length > 0) generateOutput(cleaned);
    }
  }, []);

  const generateOutput = useCallback(
    (cleaned: string[]) => {
      if (cleaned.length === 0) {
        setOutput('');
        setIds([]);
        return;
      }
      setIds(cleaned);
      const opts = { valueMode, quote, parameterized, columnName, tableName };
      if (outputFormat !== 'sql_in') {
        setOutput(formatOutput(cleaned, outputFormat, { valueMode, quote }));
        return;
      }
      if (showInsert) {
        setOutput(sqlInsertValues(cleaned, { ...opts, tableName, columnName }));
        return;
      }
      if (rangeCompression && cleaned.length > 0) {
        const where = hybridWhere(cleaned, db, { ...opts, columnName });
        setOutput(`SELECT * FROM table_name ${where};`);
        return;
      }
      setOutput(
        previewSelect(cleaned, db, {
          ...opts,
          chunkSize: chunkSize > 0 ? chunkSize : 0,
          useRangeCompression: false,
        })
      );
    },
    [
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
    ]
  );

  const handleGenerate = useCallback(() => {
    const parsed = parseInput(input);
    const cleaned = cleanIds(parsed);
    generateOutput(cleaned);
    if (cleaned.length > 0) toast.success(`${cleaned.length} ID(s) — duplicates removed, cleaned`);
    else toast.error('No valid values found');
  }, [input, generateOutput]);

  // Re-run output when options change (use current ids)
  useEffect(() => {
    if (ids.length > 0) generateOutput(ids);
  }, [ids.length, valueMode, quote, chunkSize, db, outputFormat, parameterized, rangeCompression, columnName, tableName, showInsert, generateOutput]);

  const handleCopy = () => {
    if (!output) {
      toast.error('Nothing to copy');
      return;
    }
    navigator.clipboard.writeText(output);
    setCopied(true);
    toast.success('Copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = (ext: 'sql' | 'csv' | 'json' | 'txt') => {
    if (!output) {
      toast.error('Nothing to download');
      return;
    }
    const mime =
      ext === 'json' ? 'application/json' : ext === 'csv' ? 'text/csv' : 'text/plain';
    const blob = new Blob([output], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sql-in-generator.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success(`Downloaded .${ext}`);
  };

  const handleShare = () => {
    if (ids.length === 0) {
      toast.error('Generate first to share');
      return;
    }
    const url = new URL(window.location.href);
    url.searchParams.set('ids', ids.join(','));
    window.history.replaceState({}, '', url.toString());
    navigator.clipboard.writeText(url.toString());
    toast.success('Share link copied to clipboard');
  };

  const cleanedCount = cleanIds(parseInput(input)).length;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Database className="w-5 h-5 text-primary-600" />
            Input — auto-detect: CSV, JSON array, newline, tab, mixed
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Paste any list; we parse and clean (trim, remove duplicates, optional character strip).
          </p>
        </div>
        <div className="p-4">
          <label htmlFor="sql-in-input" className="block text-sm font-medium text-gray-700 mb-1.5">
            Paste your values
          </label>
          <textarea
            id="sql-in-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="1, 2, 3, 4\nor [1,2,3,4]\nor one per line"
            className="w-full h-32 p-3 border border-gray-300 rounded-lg font-mono text-sm resize-y focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            aria-label="Paste IDs or list"
          />
          <div className="flex flex-wrap items-center gap-3 mt-3">
            <button
              type="button"
              onClick={handleGenerate}
              className="px-4 py-2 bg-primary-600 text-white text-sm font-semibold rounded-lg hover:bg-primary-700"
            >
              Generate
            </button>
            <button
              type="button"
              onClick={() => { setInput(''); setOutput(''); setIds([]); }}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Trash2 className="w-4 h-4" />
              Clear
            </button>
            {cleanedCount > 0 && (
              <span className="text-sm text-gray-600">
                <Hash className="w-4 h-4 inline mr-1" aria-hidden />
                {cleanedCount} value(s) after clean
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-50 rounded-xl border border-gray-200 p-4">
          <h3 className="text-sm font-semibold text-gray-800 mb-3">Options</h3>
          <div className="space-y-3">
            <div>
              <label id="sql-in-value-mode-label" className="block text-xs font-medium text-gray-600 mb-1">
                Value type
              </label>
              <div className="flex gap-2 flex-wrap" role="group" aria-labelledby="sql-in-value-mode-label">
                <button
                  type="button"
                  onClick={() => setValueMode('numeric')}
                  className={`px-3 py-1.5 rounded text-xs font-medium ${valueMode === 'numeric' ? 'bg-primary-600 text-white' : 'bg-white border border-gray-300'}`}
                >
                  Numeric
                </button>
                <button
                  type="button"
                  onClick={() => setValueMode('string')}
                  className={`px-3 py-1.5 rounded text-xs font-medium ${valueMode === 'string' ? 'bg-primary-600 text-white' : 'bg-white border border-gray-300'}`}
                >
                  String quoted
                </button>
                {valueMode === 'string' && (
                  <>
                    <button
                      type="button"
                      onClick={() => setQuote("'")}
                      className={`px-2 py-1.5 rounded text-xs font-medium ${quote === "'" ? 'bg-primary-600 text-white' : 'bg-white border border-gray-300'}`}
                    >
                      Single &apos;
                    </button>
                    <button
                      type="button"
                      onClick={() => setQuote('"')}
                      className={`px-2 py-1.5 rounded text-xs font-medium ${quote === '"' ? 'bg-primary-600 text-white' : 'bg-white border border-gray-300'}`}
                    >
                      Double &quot;
                    </button>
                  </>
                )}
              </div>
            </div>
            <div>
              <label htmlFor="sql-in-db" className="block text-xs font-medium text-gray-600 mb-1">
                Database
              </label>
              <select
                id="sql-in-db"
                value={db}
                onChange={(e) => setDb(e.target.value as DbFlavor)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                aria-label="Database flavor"
              >
                {DB_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="sql-in-format" className="block text-xs font-medium text-gray-600 mb-1">
                Output format
              </label>
              <select
                id="sql-in-format"
                value={outputFormat}
                onChange={(e) => setOutputFormat(e.target.value as OutputFormatType)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                aria-label="Output format"
              >
                {FORMAT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
            {outputFormat === 'sql_in' && (
              <>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={parameterized}
                    onChange={(e) => setParameterized(e.target.checked)}
                    className="rounded border-gray-300 text-primary-600"
                  />
                  Parameterized (?, $1, @p1)
                </label>
                <div>
                  <label htmlFor="sql-in-chunk" className="block text-xs font-medium text-gray-600 mb-1">
                    Chunk size (0 = no chunking)
                  </label>
                  <input
                    id="sql-in-chunk"
                    type="number"
                    min={0}
                    max={10000}
                    value={chunkSize}
                    onChange={(e) => setChunkSize(Number(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                </div>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={rangeCompression}
                    onChange={(e) => setRangeCompression(e.target.checked)}
                    className="rounded border-gray-300 text-primary-600"
                  />
                  Range compression (BETWEEN)
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={showInsert}
                    onChange={(e) => setShowInsert(e.target.checked)}
                    className="rounded border-gray-300 text-primary-600"
                  />
                  SQL INSERT generator
                </label>
                {showInsert && (
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label htmlFor="sql-in-table" className="block text-xs font-medium text-gray-600 mb-1">Table</label>
                      <input
                        id="sql-in-table"
                        type="text"
                        value={tableName}
                        onChange={(e) => setTableName(e.target.value || 'temp_ids')}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="sql-in-column" className="block text-xs font-medium text-gray-600 mb-1">Column</label>
                      <input
                        id="sql-in-column"
                        type="text"
                        value={columnName}
                        onChange={(e) => setColumnName(e.target.value || 'id')}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      />
                    </div>
                  </div>
                )}
                {!showInsert && (
                  <div>
                    <label htmlFor="sql-in-column-where" className="block text-xs font-medium text-gray-600 mb-1">Column name (WHERE)</label>
                    <input
                      id="sql-in-column-where"
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
        </div>

        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
              <FileCode className="w-4 h-4" />
              Output
              {ids.length > 0 && (
                <span className="text-xs font-normal text-gray-500">
                  <ListOrdered className="w-3.5 h-3.5 inline" aria-hidden /> {ids.length} ID(s)
                </span>
              )}
            </h3>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={handleCopy}
                disabled={!output}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                Copy
              </button>
              <button
                type="button"
                onClick={handleShare}
                disabled={ids.length === 0}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50"
                title="Copy shareable URL with ids in query"
              >
                <Share2 className="w-4 h-4" />
                Share URL
              </button>
              <div className="flex gap-1">
                {(['sql', 'csv', 'json', 'txt'] as const).map((ext) => (
                  <button
                    key={ext}
                    type="button"
                    onClick={() => handleDownload(ext)}
                    disabled={!output}
                    className="px-2 py-1.5 text-xs font-medium text-gray-600 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
                  >
                    .{ext}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <pre className="p-4 bg-gray-900 text-gray-100 text-sm overflow-x-auto min-h-[120px] max-h-[400px] overflow-y-auto">
            <code>{output || 'Generate to see output…'}</code>
          </pre>
          {output && (
            <p className="px-4 pb-3 text-xs text-gray-500">
              {output.split('\n').length} line(s) · {output.length} character(s)
            </p>
          )}
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <h3 className="text-sm font-semibold text-blue-900 mb-2">Developer API</h3>
        <p className="text-sm text-blue-800 mb-2">
          POST <code className="bg-blue-100 px-1 rounded">/api/sql-in</code> with body:
        </p>
        <pre className="text-xs bg-white border border-blue-200 rounded p-3 overflow-x-auto">
          {`{ "ids": [1, 2, 3] }
// or
{ "input": "1,2,3\\n4,5,6", "db": "postgresql", "parameterized": true }`}
        </pre>
        <p className="text-sm text-blue-800 mt-2">
          Response: <code className="bg-blue-100 px-1 rounded">{`{ "sql": "IN (?, ?, ?)", "count": 3 }`}</code>
        </p>
      </div>
    </div>
  );
}
