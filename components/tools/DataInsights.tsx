'use client';

import { useState, useCallback, useMemo } from 'react';
import { Upload, FileText, Database, Calculator, BarChart3, Download, X, CheckCircle, AlertTriangle, Plus, Trash2, Filter, Calendar } from 'lucide-react';
import toast from 'react-hot-toast';
import * as XLSX from 'xlsx';
import Papa from 'papaparse';

interface Column {
  name: string;
  type: 'string' | 'number' | 'date' | 'boolean';
}

interface DataRow {
  [key: string]: any;
}

interface Insight {
  id: string;
  name: string;
  groupBy: string[];
  metrics: Array<{
    column: string;
    function: 'sum' | 'avg' | 'median' | 'mode' | 'min' | 'max' | 'count' | 'count_distinct';
  }>;
  filters?: {
    dateRange?: [string, string];
    valueFilters?: Array<{ column: string; operator: string; value: any }>;
  };
}

export default function DataInsights() {
  const [data, setData] = useState<DataRow[]>([]);
  const [columns, setColumns] = useState<Column[]>([]);
  const [rawData, setRawData] = useState<string>('');
  const [inputType, setInputType] = useState<'file' | 'paste'>('file');
  const [insights, setInsights] = useState<Insight[]>([]);
  const [activeStep, setActiveStep] = useState<'upload' | 'preview' | 'calculate' | 'insights'>('upload');

  // Parse CSV
  const parseCSV = useCallback((text: string): { columns: Column[]; rows: DataRow[] } => {
    const result = Papa.parse(text, { header: true, skipEmptyLines: true });
    const cols: Column[] = [];
    const rows: DataRow[] = [];

    if (result.data.length > 0) {
      const firstRow = result.data[0] as any;
      Object.keys(firstRow).forEach(key => {
        cols.push({ name: key, type: inferType(firstRow[key]) });
      });

      result.data.forEach((row: any) => {
        const normalizedRow: DataRow = {};
        cols.forEach(col => {
          normalizedRow[col.name] = normalizeValue(row[col.name], col.type);
        });
        rows.push(normalizedRow);
      });
    }

    return { columns: cols, rows };
  }, []);

  // Parse Excel
  const parseExcel = useCallback((file: File): Promise<{ columns: Column[]; rows: DataRow[] }> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const workbook = XLSX.read(e.target?.result, { type: 'binary' });
          const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
          const jsonData = XLSX.utils.sheet_to_json(firstSheet);

          if (jsonData.length === 0) {
            reject(new Error('Excel file is empty'));
            return;
          }

          const firstRow = jsonData[0] as any;
          const cols: Column[] = Object.keys(firstRow).map(key => ({
            name: key,
            type: inferType(firstRow[key])
          }));

          const rows: DataRow[] = jsonData.map((row: any) => {
            const normalizedRow: DataRow = {};
            cols.forEach(col => {
              normalizedRow[col.name] = normalizeValue(row[col.name], col.type);
            });
            return normalizedRow;
          });

          resolve({ columns: cols, rows });
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = reject;
      reader.readAsBinaryString(file);
    });
  }, []);

  // Parse JSON
  const parseJSON = useCallback((text: string): { columns: Column[]; rows: DataRow[] } => {
    const parsed = JSON.parse(text);
    let dataArray: any[] = [];

    if (Array.isArray(parsed)) {
      dataArray = parsed;
    } else if (typeof parsed === 'object') {
      dataArray = [parsed];
    }

    if (dataArray.length === 0) {
      throw new Error('JSON data is empty');
    }

    const firstRow = dataArray[0];
    const cols: Column[] = Object.keys(firstRow).map(key => ({
      name: key,
      type: inferType(firstRow[key])
    }));

    const rows: DataRow[] = dataArray.map((row: any) => {
      const normalizedRow: DataRow = {};
      cols.forEach(col => {
        normalizedRow[col.name] = normalizeValue(row[col.name], col.type);
      });
      return normalizedRow;
    });

    return { columns: cols, rows };
  }, []);

  // Parse SQL/MySQL paste
  const parseSQLPaste = useCallback((text: string): { columns: Column[]; rows: DataRow[] } => {
    const lines = text.split('\n').filter(line => line.trim());
    if (lines.length < 2) {
      throw new Error('SQL paste must have at least header and one data row');
    }

    // Detect separator (|, tab, or multiple spaces)
    const firstLine = lines[0];
    let separator: string | RegExp = '|';
    if (firstLine.includes('\t')) {
      separator = '\t';
    } else if (firstLine.match(/\s{2,}/)) {
      separator = /\s{2,}/;
    }

    // Parse header
    const headerLine = lines[0];
    const headers = headerLine.split(separator as string | RegExp).map(h => h.trim()).filter(h => h);

    // Skip separator line if present (e.g., "---|----|----")
    let dataStartIndex = 1;
    if (lines[1] && lines[1].match(/^[-|:\s]+$/)) {
      dataStartIndex = 2;
    }

    // Parse data rows
    const rows: DataRow[] = [];
    for (let i = dataStartIndex; i < lines.length; i++) {
      const values = lines[i].split(separator as string | RegExp).map(v => v.trim());
      if (values.length === headers.length) {
        const row: DataRow = {};
        headers.forEach((header, idx) => {
          row[header] = normalizeValue(values[idx], inferType(values[idx]));
        });
        rows.push(row);
      }
    }

    const cols: Column[] = headers.map(header => ({
      name: header,
      type: rows.length > 0 ? inferType(rows[0][header]) : 'string'
    }));

    return { columns: cols, rows };
  }, []);

  // Type inference
  function inferType(value: any): 'string' | 'number' | 'date' | 'boolean' {
    if (value === null || value === undefined || value === '') return 'string';
    
    if (typeof value === 'boolean') return 'boolean';
    
    if (typeof value === 'number') return 'number';
    
    if (typeof value === 'string') {
      const trimmed = value.trim();
      
      // Boolean
      if (trimmed.toLowerCase() === 'true' || trimmed.toLowerCase() === 'false') {
        return 'boolean';
      }
      
      // Date (ISO format or common formats)
      const datePattern = /^\d{4}-\d{2}-\d{2}/;
      if (datePattern.test(trimmed)) {
        const date = new Date(trimmed);
        if (!isNaN(date.getTime())) return 'date';
      }
      
      // Number
      if (!isNaN(Number(trimmed)) && trimmed !== '') {
        return 'number';
      }
    }
    
    return 'string';
  }

  // Normalize value
  function normalizeValue(value: any, type: Column['type']): any {
    if (value === null || value === undefined || value === '') {
      return type === 'number' ? 0 : type === 'boolean' ? false : '';
    }

    switch (type) {
      case 'number':
        return Number(value) || 0;
      case 'boolean':
        if (typeof value === 'boolean') return value;
        return value.toString().toLowerCase() === 'true';
      case 'date':
        return new Date(value).toISOString().split('T')[0];
      default:
        return String(value);
    }
  }

  // Handle file upload
  const handleFileUpload = useCallback(async (file: File) => {
    try {
      const ext = file.name.split('.').pop()?.toLowerCase();
      let result: { columns: Column[]; rows: DataRow[] };

      if (ext === 'csv') {
        const text = await file.text();
        result = parseCSV(text);
      } else if (ext === 'xlsx' || ext === 'xls') {
        result = await parseExcel(file);
      } else if (ext === 'json') {
        const text = await file.text();
        result = parseJSON(text);
      } else {
        throw new Error('Unsupported file type. Please upload CSV, Excel, or JSON.');
      }

      setColumns(result.columns);
      setData(result.rows);
      setActiveStep('preview');
      toast.success(`Loaded ${result.rows.length} rows with ${result.columns.length} columns`);
    } catch (error: any) {
      toast.error(error.message || 'Failed to parse file');
    }
  }, [parseCSV, parseExcel, parseJSON]);

  // Handle paste
  const handlePaste = useCallback(() => {
    try {
      let result: { columns: Column[]; rows: DataRow[] };

      // Try JSON first
      try {
        result = parseJSON(rawData);
      } catch {
        // Try SQL/MySQL format
        try {
          result = parseSQLPaste(rawData);
        } catch {
          // Try CSV
          result = parseCSV(rawData);
        }
      }

      setColumns(result.columns);
      setData(result.rows);
      setActiveStep('preview');
      toast.success(`Loaded ${result.rows.length} rows with ${result.columns.length} columns`);
    } catch (error: any) {
      toast.error(error.message || 'Failed to parse pasted data');
    }
  }, [rawData, parseCSV, parseJSON, parseSQLPaste]);

  // Calculate aggregations
  const calculateAggregation = useCallback((
    rows: DataRow[],
    column: string,
    func: Insight['metrics'][0]['function']
  ): number => {
    const values = rows.map(r => r[column]).filter(v => v !== null && v !== undefined && v !== '');
    const numericValues = values.map(v => Number(v)).filter(v => !isNaN(v));

    switch (func) {
      case 'sum':
        return numericValues.reduce((a, b) => a + b, 0);
      case 'avg':
        return numericValues.length > 0 ? numericValues.reduce((a, b) => a + b, 0) / numericValues.length : 0;
      case 'median':
        if (numericValues.length === 0) return 0;
        const sorted = [...numericValues].sort((a, b) => a - b);
        const mid = Math.floor(sorted.length / 2);
        return sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];
      case 'mode':
        const freq: { [key: number]: number } = {};
        numericValues.forEach(v => { freq[v] = (freq[v] || 0) + 1; });
        return Number(Object.keys(freq).reduce((a, b) => freq[Number(a)] > freq[Number(b)] ? a : b));
      case 'min':
        return numericValues.length > 0 ? Math.min(...numericValues) : 0;
      case 'max':
        return numericValues.length > 0 ? Math.max(...numericValues) : 0;
      case 'count':
        return values.length;
      case 'count_distinct':
        return new Set(values).size;
      default:
        return 0;
    }
  }, []);

  // Generate insight results
  const generateInsightResults = useCallback((insight: Insight): DataRow[] => {
    let filteredData = [...data];

    // Apply filters
    if (insight.filters) {
      if (insight.filters.dateRange) {
        const [start, end] = insight.filters.dateRange;
        filteredData = filteredData.filter(row => {
          const dateColumns = columns.filter(c => c.type === 'date').map(c => c.name);
          return dateColumns.some(col => {
            const rowDate = row[col];
            return rowDate && rowDate >= start && rowDate <= end;
          });
        });
      }

      if (insight.filters.valueFilters) {
        insight.filters.valueFilters.forEach(filter => {
          filteredData = filteredData.filter(row => {
            const value = row[filter.column];
            switch (filter.operator) {
              case 'equals': return value === filter.value;
              case 'not_equals': return value !== filter.value;
              case 'greater_than': return Number(value) > Number(filter.value);
              case 'less_than': return Number(value) < Number(filter.value);
              default: return true;
            }
          });
        });
      }
    }

    // Group by
    if (insight.groupBy.length > 0) {
      const grouped = new Map<string, DataRow[]>();
      
      filteredData.forEach(row => {
        const key = insight.groupBy.map(g => String(row[g] || '')).join('|');
        if (!grouped.has(key)) {
          grouped.set(key, []);
        }
        grouped.get(key)!.push(row);
      });

      // Calculate metrics for each group
      const results: DataRow[] = [];
      grouped.forEach((groupRows, key) => {
        const result: DataRow = {};
        insight.groupBy.forEach(g => {
          result[g] = groupRows[0][g];
        });
        insight.metrics.forEach(metric => {
          const value = calculateAggregation(groupRows, metric.column, metric.function);
          result[`${metric.function}_${metric.column}`] = value;
        });
        results.push(result);
      });

      return results;
    } else {
      // No grouping, just calculate overall metrics
      const result: DataRow = {};
      insight.metrics.forEach(metric => {
        const value = calculateAggregation(filteredData, metric.column, metric.function);
        result[`${metric.function}_${metric.column}`] = value;
      });
      return [result];
    }
  }, [data, columns, calculateAggregation]);

  // Export to Excel
  const handleExport = useCallback(() => {
    const workbook = XLSX.utils.book_new();

    // Sheet 1: Raw Data
    const rawSheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, rawSheet, 'Raw Data');

    // Sheet 2+: Each Insight
    insights.forEach((insight, idx) => {
      const results = generateInsightResults(insight);
      const insightSheet = XLSX.utils.json_to_sheet(results);
      XLSX.utils.book_append_sheet(workbook, insightSheet, insight.name || `Insight ${idx + 1}`);
    });

    // Download
    XLSX.writeFile(workbook, 'data-insights.xlsx');
    toast.success('Excel file downloaded!');
  }, [data, insights, generateInsightResults]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-primary-600" />
          Data Analysis & Insights Builder
        </h2>
        <p className="text-gray-600 mb-4">
          Upload CSV, Excel, or JSON files, or paste SQL/MySQL data. Perform calculations, generate insights, and export to Excel.
        </p>

        {/* Step Indicator */}
        <div className="flex items-center gap-2 mb-6">
          {['upload', 'preview', 'calculate', 'insights'].map((step, idx) => (
            <div key={step} className="flex items-center">
              <button
                onClick={() => setActiveStep(step as any)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeStep === step
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {step.charAt(0).toUpperCase() + step.slice(1)}
              </button>
              {idx < 3 && <span className="mx-2 text-gray-400">→</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Upload Step */}
      {activeStep === 'upload' && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="mb-4">
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setInputType('file')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  inputType === 'file'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Upload File
              </button>
              <button
                onClick={() => setInputType('paste')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  inputType === 'paste'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Paste Data
              </button>
            </div>

            {inputType === 'file' ? (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">Upload CSV, Excel (.xlsx, .xls), or JSON file</p>
                <input
                  type="file"
                  accept=".csv,.xlsx,.xls,.json"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload(file);
                  }}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="inline-block px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 cursor-pointer transition-colors"
                >
                  Choose File
                </label>
              </div>
            ) : (
              <div>
                <textarea
                  value={rawData}
                  onChange={(e) => setRawData(e.target.value)}
                  placeholder="Paste your data here (SQL/MySQL format, JSON, or CSV)..."
                  className="w-full h-64 p-4 border-2 border-gray-300 rounded-lg font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <button
                  onClick={handlePaste}
                  disabled={!rawData.trim()}
                  className="mt-4 px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  Parse Data
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Preview Step */}
      {activeStep === 'preview' && data.length > 0 && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Data Preview</h3>
          <div className="mb-4 text-sm text-gray-600">
            <p>Rows: {data.length} | Columns: {columns.length}</p>
          </div>
          <div className="overflow-x-auto max-h-96 border border-gray-200 rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  {columns.map(col => (
                    <th key={col.name} className="px-4 py-2 text-left text-xs font-semibold text-gray-700 uppercase">
                      {col.name} <span className="text-gray-400">({col.type})</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.slice(0, 100).map((row, idx) => (
                  <tr key={idx}>
                    {columns.map(col => (
                      <td key={col.name} className="px-4 py-2 text-sm text-gray-700">
                        {String(row[col.name] ?? '')}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            {data.length > 100 && (
              <div className="p-4 text-center text-sm text-gray-500">
                Showing first 100 rows of {data.length} total
              </div>
            )}
          </div>
          <button
            onClick={() => setActiveStep('calculate')}
            className="mt-4 px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
          >
            Continue to Calculations
          </button>
        </div>
      )}

      {/* Calculate Step - Placeholder for now */}
      {activeStep === 'calculate' && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Calculations</h3>
          <p className="text-gray-600 mb-4">Calculation features coming soon...</p>
          <button
            onClick={() => setActiveStep('insights')}
            className="px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
          >
            Continue to Insights
          </button>
        </div>
      )}

      {/* Insights Step */}
      {activeStep === 'insights' && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-800">Insights</h3>
            <button
              onClick={() => {
                const newInsight: Insight = {
                  id: Date.now().toString(),
                  name: `Insight ${insights.length + 1}`,
                  groupBy: [],
                  metrics: []
                };
                setInsights([...insights, newInsight]);
              }}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-semibold hover:bg-primary-700 transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Insight
            </button>
          </div>

          {insights.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p>No insights yet. Click "Add Insight" to create one.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {insights.map((insight, idx) => (
                <div key={insight.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <input
                      type="text"
                      value={insight.name}
                      onChange={(e) => {
                        const updated = [...insights];
                        updated[idx].name = e.target.value;
                        setInsights(updated);
                      }}
                      className="text-lg font-semibold text-gray-800 border-none bg-transparent focus:outline-none focus:ring-2 focus:ring-primary-500 rounded px-2"
                    />
                    <button
                      onClick={() => {
                        setInsights(insights.filter((_, i) => i !== idx));
                      }}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  
                  {/* Group By */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Group By</label>
                    <div className="flex flex-wrap gap-2">
                      {columns.map(col => (
                        <button
                          key={col.name}
                          onClick={() => {
                            const updated = [...insights];
                            const groupIndex = updated[idx].groupBy.indexOf(col.name);
                            if (groupIndex >= 0) {
                              updated[idx].groupBy.splice(groupIndex, 1);
                            } else {
                              updated[idx].groupBy.push(col.name);
                            }
                            setInsights(updated);
                          }}
                          className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                            insight.groupBy.includes(col.name)
                              ? 'bg-primary-600 text-white'
                              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          }`}
                        >
                          {col.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Metrics</label>
                    <div className="space-y-2">
                      {insight.metrics.map((metric, metricIdx) => (
                        <div key={metricIdx} className="flex items-center gap-2">
                          <select
                            value={metric.function}
                            onChange={(e) => {
                              const updated = [...insights];
                              updated[idx].metrics[metricIdx].function = e.target.value as any;
                              setInsights(updated);
                            }}
                            className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
                          >
                            <option value="sum">SUM</option>
                            <option value="avg">AVG</option>
                            <option value="median">MEDIAN</option>
                            <option value="mode">MODE</option>
                            <option value="min">MIN</option>
                            <option value="max">MAX</option>
                            <option value="count">COUNT</option>
                            <option value="count_distinct">COUNT DISTINCT</option>
                          </select>
                          <select
                            value={metric.column}
                            onChange={(e) => {
                              const updated = [...insights];
                              updated[idx].metrics[metricIdx].column = e.target.value;
                              setInsights(updated);
                            }}
                            className="px-3 py-1 border border-gray-300 rounded-lg text-sm flex-1"
                          >
                            {columns.filter(c => c.type === 'number').map(col => (
                              <option key={col.name} value={col.name}>{col.name}</option>
                            ))}
                          </select>
                          <button
                            onClick={() => {
                              const updated = [...insights];
                              updated[idx].metrics.splice(metricIdx, 1);
                              setInsights(updated);
                            }}
                            className="text-red-600 hover:text-red-700"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() => {
                          const updated = [...insights];
                          const numericColumns = columns.filter(c => c.type === 'number');
                          if (numericColumns.length > 0) {
                            updated[idx].metrics.push({
                              column: numericColumns[0].name,
                              function: 'sum'
                            });
                            setInsights(updated);
                          }
                        }}
                        className="px-3 py-1 text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1"
                      >
                        <Plus className="w-4 h-4" />
                        Add Metric
                      </button>
                    </div>
                  </div>

                  {/* Filters */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date Range Filter</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="date"
                        value={insight.filters?.dateRange?.[0] || ''}
                        onChange={(e) => {
                          const updated = [...insights];
                          if (!updated[idx].filters) updated[idx].filters = {};
                          if (!updated[idx].filters.dateRange) updated[idx].filters.dateRange = ['', ''];
                          updated[idx].filters.dateRange![0] = e.target.value;
                          setInsights(updated);
                        }}
                        className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
                      />
                      <span className="text-gray-500">to</span>
                      <input
                        type="date"
                        value={insight.filters?.dateRange?.[1] || ''}
                        onChange={(e) => {
                          const updated = [...insights];
                          if (!updated[idx].filters) updated[idx].filters = {};
                          if (!updated[idx].filters.dateRange) updated[idx].filters.dateRange = ['', ''];
                          updated[idx].filters.dateRange![1] = e.target.value;
                          setInsights(updated);
                        }}
                        className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
                      />
                    </div>
                  </div>

                  {/* Preview Results */}
                  <div className="mt-4">
                    <button
                      onClick={() => {
                        const results = generateInsightResults(insight);
                        // Show preview in a modal or expandable section
                        console.log('Insight Results:', results);
                        toast.success(`Generated ${results.length} result rows`);
                      }}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
                    >
                      Preview Results
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {insights.length > 0 && (
            <button
              onClick={handleExport}
              className="mt-6 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center gap-2"
            >
              <Download className="w-5 h-5" />
              Export to Excel
            </button>
          )}
        </div>
      )}
    </div>
  );
}

