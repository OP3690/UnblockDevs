'use client';

import { useState, useCallback, useMemo } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  FileSpreadsheet,
  Lock,
  Upload,
  Link2,
  FileText,
  Inbox,
  ChevronDown,
  ChevronRight,
  ShieldCheck,
  BarChart3,
  Filter,
  Download,
  Loader2,
} from 'lucide-react';
import toast from 'react-hot-toast';
import JsonInput from '@/components/JsonInput';
import DataTable from '@/components/DataTable';
import SectionManager from '@/components/SectionManager';
import {
  jsonToRows,
  extractColumns,
  type FlattenedRow,
  type Column,
} from '@/lib/jsonParser';
import { HistoryManager } from '@/lib/history';
import { exportToExcel, exportMultiSheetFromRoot, getMultiSheetCandidates } from '@/lib/excelExporter';
import { exportToCSV } from '@/lib/csvExporter';
import { exportToTSV } from '@/lib/csvExporter';

interface Section {
  id: string;
  name: string;
  columnIds: string[];
}

type InputTab = 'paste' | 'upload' | 'url' | 'drop';
type ExportFormat = 'xlsx' | 'csv' | 'tsv';

const SAMPLE_JSON = `[
  { "name": "Alice", "role": "Engineer", "score": 95 },
  { "name": "Bob", "role": "Designer", "score": 88 },
  { "name": "Carol", "role": "PM", "score": 92 }
]`;

const SAMPLE_MULTI = `{
  "users": [
    { "id": 1, "name": "Alice", "role": "Engineer" },
    { "id": 2, "name": "Bob", "role": "Designer" }
  ],
  "orders": [
    { "id": 101, "amount": 50, "userId": 1 },
    { "id": 102, "amount": 75, "userId": 2 }
  ]
}`;

function columnStats(rows: FlattenedRow[], columnId: string) {
  const values = rows.map((r) => r[columnId]).filter((v) => v != null && v !== '');
  const nums = values.map(Number).filter((n) => !isNaN(n));
  const uniq = new Set(values.map(String));
  return {
    count: values.length,
    distinct: uniq.size,
    min: nums.length ? Math.min(...nums) : null,
    max: nums.length ? Math.max(...nums) : null,
    avg: nums.length ? nums.reduce((a, b) => a + b, 0) / nums.length : null,
  };
}

export default function JsonToExcelClient() {
  const [rows, setRows] = useState<FlattenedRow[]>([]);
  const [columns, setColumns] = useState<Column[]>([]);
  const [sections, setSections] = useState<Section[]>([]);
  const [removedColumns, setRemovedColumns] = useState<Set<string>>(new Set());
  const [historyManager] = useState(() => new HistoryManager(10));
  const [inputTab, setInputTab] = useState<InputTab>('paste');
  const [fetchUrl, setFetchUrl] = useState('');
  const [fetching, setFetching] = useState(false);
  const [delimiter, setDelimiter] = useState<string>('_');
  const [exportFormat, setExportFormat] = useState<ExportFormat>('xlsx');
  const [rawData, setRawData] = useState<any>(null);
  const [filters, setFilters] = useState<{ columnId: string; op: string; value: string }[]>([]);
  const [schemaOpen, setSchemaOpen] = useState(true);
  const [statsOpen, setStatsOpen] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(true);
  const [isDragging, setIsDragging] = useState(false);

  const saveToHistory = useCallback(() => {
    historyManager.push({
      rows: JSON.parse(JSON.stringify(rows)),
      columns: JSON.parse(JSON.stringify(columns)),
      sections: JSON.parse(JSON.stringify(sections)),
    });
  }, [rows, columns, sections, historyManager]);

  const visibleColumns = useMemo(
    () => columns.filter((col) => !removedColumns.has(col.id)),
    [columns, removedColumns]
  );

  const filteredSections = useMemo(
    () =>
      sections.map((section) => ({
        ...section,
        columnIds: section.columnIds.filter((id) => !removedColumns.has(id)),
      })),
    [sections, removedColumns]
  );

  const filteredRows = useMemo(() => {
    if (filters.length === 0) return rows;
    return rows.filter((row) => {
      return filters.every((f) => {
        const v = row[f.columnId];
        const s = v == null ? '' : String(v);
        const val = f.value.toLowerCase();
        switch (f.op) {
          case 'contains':
            return s.toLowerCase().includes(val);
          case 'equals':
            return s.toLowerCase() === val;
          case 'starts':
            return s.toLowerCase().startsWith(val);
          case '>':
            return Number(v) > Number(f.value);
          case '<':
            return Number(v) < Number(f.value);
          case '>=':
            return Number(v) >= Number(f.value);
          case '<=':
            return Number(v) <= Number(f.value);
          default:
            return true;
        }
      });
    });
  }, [rows, filters]);

  const multiSheetCandidates = useMemo(
    () => (rawData && typeof rawData === 'object' && !Array.isArray(rawData) ? getMultiSheetCandidates(rawData, delimiter) : []),
    [rawData, delimiter]
  );

  const handleJsonSubmit = useCallback(
    (data: any) => {
      try {
        setRawData(data);
        const flattenedRows = jsonToRows(data, delimiter);
        const extractedColumns = extractColumns(flattenedRows);
        setRows(flattenedRows);
        setColumns(extractedColumns);
        setSections([]);
        setRemovedColumns(new Set());
        setFilters([]);
        historyManager.clear();
        historyManager.push({
          rows: flattenedRows,
          columns: extractedColumns,
          sections: [],
        });
        toast.success(
          flattenedRows.length >= 1000
            ? `Parsed ${flattenedRows.length.toLocaleString()} rows. Large dataset mode.`
            : 'JSON parsed. Organize columns and export to Excel or CSV.'
        );
      } catch (error: any) {
        toast.error(`Invalid JSON: ${error.message}`);
      }
    },
    [delimiter, historyManager]
  );

  const handleFetchUrl = async () => {
    const url = fetchUrl.trim();
    if (!url) {
      toast.error('Enter a URL');
      return;
    }
    setFetching(true);
    try {
      const res = await fetch(url, { mode: 'cors' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      handleJsonSubmit(data);
    } catch (e: any) {
      toast.error(e?.message || 'Failed to fetch URL');
    } finally {
      setFetching(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = () => setIsDragging(false);
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (!file) return;
    if (!file.name.endsWith('.json') && !file.type.includes('json')) {
      toast.error('Please drop a JSON file');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result as string);
        handleJsonSubmit(data);
      } catch {
        toast.error('Invalid JSON in file');
      }
    };
    reader.readAsText(file);
  };

  const handleColumnTypeChange = (columnId: string, type: Column['type']) => {
    setColumns((cols) => cols.map((c) => (c.id === columnId ? { ...c, type } : c)));
    saveToHistory();
  };

  const handleSectionsChange = (newSections: Section[]) => {
    setSections(newSections);
    saveToHistory();
  };

  const handleColumnMove = (columnId: string, fromSectionId: string | null, toSectionId: string | null) => {
    const newSections = [...sections];
    if (fromSectionId) {
      const fromSection = newSections.find((s) => s.id === fromSectionId);
      if (fromSection) fromSection.columnIds = fromSection.columnIds.filter((id) => id !== columnId);
    }
    if (toSectionId) {
      const toSection = newSections.find((s) => s.id === toSectionId);
      if (toSection) toSection.columnIds.push(columnId);
    }
    setSections(newSections);
    saveToHistory();
  };

  const getOriginalRowIndex = useCallback(
    (filteredIndex: number) => {
      if (filters.length === 0) return filteredIndex;
      const row = filteredRows[filteredIndex];
      return rows.findIndex((r) => r === row);
    },
    [rows, filteredRows, filters.length]
  );

  const handleCellEdit = (rowIndex: number, columnId: string, newValue: any) => {
    const orig = getOriginalRowIndex(rowIndex);
    if (orig < 0) return;
    const newRows = [...rows];
    newRows[orig] = { ...newRows[orig], [columnId]: newValue };
    setRows(newRows);
    saveToHistory();
  };

  const handleColumnRename = (columnId: string, newName: string) => {
    setColumns((cols) => cols.map((col) => (col.id === columnId ? { ...col, name: newName } : col)));
    saveToHistory();
    toast.success('Column renamed');
  };

  const handleRowDelete = (rowIndex: number) => {
    const orig = getOriginalRowIndex(rowIndex);
    if (orig < 0) return;
    setRows((r) => r.filter((_, i) => i !== orig));
    saveToHistory();
    toast.success('Row deleted');
  };

  const handleRemoveColumn = (columnId: string) => {
    setRemovedColumns((prev) => new Set(prev).add(columnId));
    saveToHistory();
    toast.success('Column removed from table and export');
  };

  const handleRemoveAllUnassigned = (unassignedColumnIds: string[]) => {
    const safeToRemove = unassignedColumnIds.filter((id) => !removedColumns.has(id));
    if (safeToRemove.length === 0) {
      toast.error('No unassigned columns to remove');
      return;
    }
    if (typeof window !== 'undefined' && window.confirm(`Remove ${safeToRemove.length} unassigned column(s)?`)) {
      setRemovedColumns((prev) => {
        const next = new Set(prev);
        safeToRemove.forEach((id) => next.add(id));
        return next;
      });
      saveToHistory();
      toast.success(`${safeToRemove.length} column(s) removed`);
    }
  };

  const handleRestoreColumn = (columnId: string) => {
    setRemovedColumns((prev) => {
      const next = new Set(prev);
      next.delete(columnId);
      return next;
    });
    saveToHistory();
    toast.success('Column restored');
  };

  const addFilter = () => {
    const col = visibleColumns[0]?.id;
    if (col) setFilters((f) => [...f, { columnId: col, op: 'contains', value: '' }]);
  };

  const removeFilter = (index: number) => {
    setFilters((f) => f.filter((_, i) => i !== index));
  };

  const updateFilter = (index: number, patch: Partial<{ columnId: string; op: string; value: string }>) => {
    setFilters((f) => f.map((x, i) => (i === index ? { ...x, ...patch } : x)));
  };

  const loadNewJson = () => {
    setRows([]);
    setColumns([]);
    setSections([]);
    setRemovedColumns(new Set());
    setRawData(null);
    setFilters([]);
    historyManager.clear();
  };

  const doExport = () => {
    const columnIds =
      filteredSections.length > 0
        ? filteredSections.flatMap((s) => s.columnIds).filter((id) => !removedColumns.has(id))
        : visibleColumns.map((c) => c.id);
    if (columnIds.length === 0) {
      toast.error('No columns to export');
      return;
    }
    const baseName = `json-export-${new Date().toISOString().split('T')[0]}`;
    if (exportFormat === 'xlsx') {
      exportToExcel(filteredRows, columnIds, {
        sections: filteredSections,
        singleSheet: true,
        fileName: `${baseName}.xlsx`,
      });
      toast.success('Excel file downloaded');
    } else if (exportFormat === 'csv') {
      exportToCSV(filteredRows, columnIds, `${baseName}.csv`);
      toast.success('CSV file downloaded');
    } else {
      exportToTSV(filteredRows, columnIds, `${baseName}.tsv`);
      toast.success('TSV file downloaded');
    }
  };

  const doMultiSheetExport = () => {
    if (!rawData || multiSheetCandidates.length === 0) return;
    exportMultiSheetFromRoot(rawData, { fileName: `json-multi-sheet-${new Date().toISOString().split('T')[0]}.xlsx`, delimiter });
    toast.success('Multi-sheet Excel downloaded');
  };

  const inputTabs: { id: InputTab; label: string; icon: typeof FileText }[] = [
    { id: 'paste', label: 'Paste JSON', icon: FileText },
    { id: 'upload', label: 'Upload file', icon: Upload },
    { id: 'url', label: 'Fetch from URL', icon: Link2 },
    { id: 'drop', label: 'Drag & drop', icon: Inbox },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <header className="bg-white border-b border-gray-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Tools
          </Link>
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/25">
              <FileSpreadsheet className="w-7 h-7" aria-hidden />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                Advanced JSON to Excel
              </h1>
              <p className="text-gray-500 text-sm sm:text-base mt-1 max-w-xl">
                Convert JSON to spreadsheets with schema detection, filters, and multi-sheet export. Paste, upload, or fetch from API — runs in your browser.
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {rows.length === 0 ? (
          <div className="space-y-6 sm:space-y-8">
            {/* Input source */}
            <section className="bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden">
              <div className="px-4 sm:px-5 py-3 border-b border-gray-100 bg-gray-50/50">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Input source</p>
                <div className="flex flex-wrap gap-2">
                  {inputTabs.map(({ id, label, icon: Icon }) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setInputTab(id)}
                      className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                        inputTab === id
                          ? 'bg-white text-emerald-700 shadow-sm border border-gray-200 ring-1 ring-gray-900/5'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-white/80 border border-transparent'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="p-4 sm:p-6">
                {inputTab === 'paste' && (
                  <div id="json-input-section">
                    <JsonInput onJsonSubmit={handleJsonSubmit} />
                  </div>
                )}
                {inputTab === 'upload' && (
                  <div className="space-y-4">
                    <p className="text-sm text-gray-500">Upload a .json file to parse and convert to Excel.</p>
                    <JsonInput onJsonSubmit={handleJsonSubmit} />
                  </div>
                )}
                {inputTab === 'url' && (
                  <div className="space-y-4">
                    <label className="block text-sm font-medium text-gray-700">API or JSON URL</label>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="url"
                        value={fetchUrl}
                        onChange={(e) => setFetchUrl(e.target.value)}
                        placeholder="https://api.example.com/data.json"
                        className="flex-1 px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 outline-none transition-shadow"
                      />
                      <button
                        type="button"
                        onClick={handleFetchUrl}
                        disabled={fetching}
                        className="px-5 py-3 bg-emerald-600 text-white rounded-xl text-sm font-medium hover:bg-emerald-700 disabled:opacity-50 flex items-center justify-center gap-2 shrink-0"
                      >
                        {fetching ? <Loader2 className="w-4 h-4 animate-spin" /> : <Link2 className="w-4 h-4" />}
                        Fetch
                      </button>
                    </div>
                    <p className="text-xs text-gray-400">Response must be JSON. CORS must allow your origin.</p>
                  </div>
                )}
                {inputTab === 'drop' && (
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`rounded-2xl border-2 border-dashed p-12 sm:p-16 text-center transition-all duration-200 ${
                      isDragging
                        ? 'border-emerald-400 bg-emerald-50/50 scale-[1.01]'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50/50'
                    }`}
                  >
                    <Inbox className={`w-14 h-14 mx-auto mb-4 ${isDragging ? 'text-emerald-500' : 'text-gray-300'}`} />
                    <p className="text-gray-700 font-medium">
                      {isDragging ? 'Drop your JSON file' : 'Drop a JSON file here'}
                    </p>
                    <p className="text-sm text-gray-400 mt-1">or switch to Paste / Upload</p>
                  </div>
                )}
              </div>
            </section>

            {/* Flatten + Privacy inline */}
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              <section className="bg-white rounded-2xl border border-gray-200/80 p-4 sm:p-5 shadow-sm">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Flatten options</p>
                <label className="flex items-center justify-between gap-4">
                  <span className="text-sm text-gray-600">Nested key separator</span>
                  <select
                    value={delimiter}
                    onChange={(e) => setDelimiter(e.target.value)}
                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
                  >
                    <option value="_">_ (underscore)</option>
                    <option value=".">. (dot)</option>
                  </select>
                </label>
              </section>
              <section className="bg-white rounded-2xl border border-gray-200/80 p-4 sm:p-5 shadow-sm">
                <button
                  type="button"
                  onClick={() => setPrivacyOpen((o) => !o)}
                  className="w-full flex items-center justify-between text-left"
                >
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    Privacy
                  </span>
                  {privacyOpen ? <ChevronDown className="w-4 h-4 text-gray-400" /> : <ChevronRight className="w-4 h-4 text-gray-400" />}
                </button>
                {privacyOpen && (
                  <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600">
                    <span className="flex items-center gap-1.5"><Lock className="w-3.5 h-3.5 text-emerald-600" /> Client-side</span>
                    <span>No upload</span>
                    <span>No logs</span>
                  </div>
                )}
              </section>
            </div>

            {/* Examples */}
            <section className="bg-white rounded-2xl border border-gray-200/80 p-5 sm:p-6 shadow-sm">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Try an example</p>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => handleJsonSubmit(JSON.parse(SAMPLE_JSON))}
                  className="px-4 py-2.5 bg-emerald-600 text-white text-sm font-medium rounded-xl hover:bg-emerald-700 transition-colors shadow-sm"
                >
                  Simple array
                </button>
                <button
                  type="button"
                  onClick={() => handleJsonSubmit(JSON.parse(SAMPLE_MULTI))}
                  className="px-4 py-2.5 border border-gray-200 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Multi-sheet (users + orders)
                </button>
              </div>
            </section>

            <p className="text-center text-sm text-gray-400">
              <Link href="/tools/json" className="text-gray-500 hover:text-gray-700 hover:underline">All JSON tools</Link>
              {' · '}
              <Link href="/json-beautifier" className="text-gray-500 hover:text-gray-700 hover:underline">Formatter</Link>
              {' · '}
              <Link href="/json-fixer-online" className="text-gray-500 hover:text-gray-700 hover:underline">Validator</Link>
            </p>
          </div>
        ) : (
          <div className="space-y-5 sm:space-y-6">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <button
                type="button"
                onClick={loadNewJson}
                className="px-4 py-2.5 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-colors"
              >
                ← Load new JSON
              </button>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span className="font-medium text-gray-700">{rows.length.toLocaleString()} rows</span>
                <span>·</span>
                <span>{visibleColumns.length} columns</span>
                {filters.length > 0 && (
                  <>
                    <span>·</span>
                    <span className="text-emerald-600">{filteredRows.length} after filters</span>
                  </>
                )}
              </div>
            </div>

            {/* Schema */}
            <section className="bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden">
              <button
                type="button"
                onClick={() => setSchemaOpen((o) => !o)}
                className="w-full flex items-center justify-between px-4 sm:px-5 py-3.5 text-left hover:bg-gray-50/50 transition-colors"
              >
                <span className="text-sm font-semibold text-gray-900">Detected schema</span>
                {schemaOpen ? <ChevronDown className="w-5 h-5 text-gray-400" /> : <ChevronRight className="w-5 h-5 text-gray-400" />}
              </button>
              {schemaOpen && (
                <div className="px-4 sm:px-5 pb-4 pt-0">
                  <ul className="flex flex-wrap gap-x-4 gap-y-2">
                    {visibleColumns.map((col) => (
                      <li key={col.id} className="flex items-center gap-2">
                        <span className="font-mono text-sm text-gray-800">{col.name || col.id}</span>
                        <select
                          value={col.type}
                          onChange={(e) => handleColumnTypeChange(col.id, e.target.value as Column['type'])}
                          className="border border-gray-200 rounded-lg px-2 py-1 text-xs focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
                        >
                          <option value="string">string</option>
                          <option value="number">number</option>
                          <option value="date">date</option>
                          <option value="boolean">boolean</option>
                        </select>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>

            {/* Stats */}
            <section className="bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden">
              <button
                type="button"
                onClick={() => setStatsOpen((o) => !o)}
                className="w-full flex items-center justify-between px-4 sm:px-5 py-3.5 text-left hover:bg-gray-50/50 transition-colors"
              >
                <span className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-emerald-600" />
                  Column statistics
                </span>
                {statsOpen ? <ChevronDown className="w-5 h-5 text-gray-400" /> : <ChevronRight className="w-5 h-5 text-gray-400" />}
              </button>
              {statsOpen && (
                <div className="px-4 sm:px-5 pb-4 pt-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {visibleColumns.slice(0, 12).map((col) => {
                    const stats = columnStats(rows, col.id);
                    return (
                      <div key={col.id} className="rounded-xl border border-gray-100 p-3 bg-gray-50/50">
                        <div className="font-medium text-gray-900 truncate text-sm" title={col.id}>{col.name || col.id}</div>
                        <div className="text-gray-500 text-xs mt-1">
                          {stats.min != null && <span>min {stats.min} · </span>}
                          {stats.max != null && <span>max {stats.max} · </span>}
                          {stats.avg != null && <span>avg {stats.avg.toFixed(2)}</span>}
                          {stats.min == null && stats.max == null && stats.avg == null && (
                            <span>distinct: {stats.distinct}</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>

            {/* Filters */}
            <section className="bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden">
              <div className="px-4 sm:px-5 py-3.5 flex items-center justify-between flex-wrap gap-2">
                <span className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                  <Filter className="w-4 h-4 text-emerald-600" />
                  Filters
                </span>
                <button
                  type="button"
                  onClick={addFilter}
                  className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
                >
                  + Add filter
                </button>
              </div>
              {filters.length > 0 && (
                <div className="px-4 sm:px-5 pb-4 space-y-2">
                  {filters.map((f, i) => (
                    <div key={i} className="flex flex-wrap items-center gap-2">
                      <select
                        value={f.columnId}
                        onChange={(e) => updateFilter(i, { columnId: e.target.value })}
                        className="border border-gray-200 rounded-lg px-2.5 py-2 text-sm focus:ring-2 focus:ring-emerald-500/30"
                      >
                        {visibleColumns.map((c) => (
                          <option key={c.id} value={c.id}>{c.name || c.id}</option>
                        ))}
                      </select>
                      <select
                        value={f.op}
                        onChange={(e) => updateFilter(i, { op: e.target.value })}
                        className="border border-gray-200 rounded-lg px-2.5 py-2 text-sm"
                      >
                        <option value="contains">contains</option>
                        <option value="equals">equals</option>
                        <option value="starts">starts with</option>
                        <option value=">">&gt;</option>
                        <option value="<">&lt;</option>
                        <option value=">=">&gt;=</option>
                        <option value="<=">&lt;=</option>
                      </select>
                      <input
                        type="text"
                        value={f.value}
                        onChange={(e) => updateFilter(i, { value: e.target.value })}
                        placeholder="Value"
                        className="border border-gray-200 rounded-lg px-2.5 py-2 text-sm w-28 sm:w-36 focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
                      />
                      <button type="button" onClick={() => removeFilter(i)} className="text-red-600 hover:text-red-700 text-sm font-medium px-2">
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </section>

            <SectionManager
              sections={sections}
              columns={columns}
              removedColumns={removedColumns}
              onSectionsChange={handleSectionsChange}
              onColumnMove={handleColumnMove}
              onRemoveColumn={handleRemoveColumn}
              onRemoveAllUnassigned={handleRemoveAllUnassigned}
              onRestoreColumn={handleRestoreColumn}
            />

            {/* Export bar - sticky feel with clear CTA */}
            <section className="bg-white rounded-2xl border border-gray-200/80 p-4 sm:p-5 shadow-sm flex flex-wrap items-center gap-4 sm:gap-6">
              <span className="text-sm font-semibold text-gray-700">Export</span>
              <select
                value={exportFormat}
                onChange={(e) => setExportFormat(e.target.value as ExportFormat)}
                className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
              >
                <option value="xlsx">XLSX</option>
                <option value="csv">CSV</option>
                <option value="tsv">TSV</option>
              </select>
              <button
                type="button"
                onClick={doExport}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-medium hover:bg-emerald-700 shadow-sm transition-colors"
              >
                <Download className="w-4 h-4" />
                Download {exportFormat.toUpperCase()}
              </button>
              {multiSheetCandidates.length > 1 && (
                <button
                  type="button"
                  onClick={doMultiSheetExport}
                  className="inline-flex items-center gap-2 px-5 py-2.5 border-2 border-emerald-600 text-emerald-700 rounded-xl text-sm font-medium hover:bg-emerald-50 transition-colors"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  {multiSheetCandidates.length} sheets
                </button>
              )}
            </section>

            <DataTable
              rows={filteredRows}
              columns={visibleColumns}
              sections={filteredSections}
              removedColumns={removedColumns}
              onCellEdit={handleCellEdit}
              onColumnRename={handleColumnRename}
              onRowDelete={handleRowDelete}
            />
          </div>
        )}
      </main>
    </div>
  );
}
