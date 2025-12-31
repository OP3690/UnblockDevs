'use client';

import { useState, useCallback, useMemo } from 'react';
import { Upload, FileText, Database, Calculator, BarChart3, Download, X, CheckCircle, AlertTriangle, Plus, Trash2, Filter, Calendar, GripVertical, Hash, Calendar as CalendarIcon, Code, Eye, ChevronRight } from 'lucide-react';
import toast from 'react-hot-toast';
import * as XLSX from 'xlsx';
import Papa from 'papaparse';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

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
  groupBy: string[]; // Rows
  pivotColumns?: string[]; // Columns (optional secondary grouping)
  metrics: Array<{
    column: string;
    function: 'sum' | 'avg' | 'median' | 'mode' | 'min' | 'max' | 'count' | 'count_distinct' | 'unique_values' | 'duplicate_count' | 'distribution';
  }>;
  filters?: {
    dateRange?: [string, string];
    dateFilter?: 'same_date' | 'any_date' | 'range';
    valueFilters?: Array<{ column: string; operator: string; value: any }>;
    frequencyFilter?: { column: string; minCount: number };
  };
}

interface CalculatedColumn {
  id: string;
  name: string;
  formula: string;
}

interface ColumnOperation {
  id: string;
  column: string;
  operation: 'unique_values' | 'count_unique' | 'distribution' | 'duplicate_count' | 'null_count' | 'not_null_count';
  resultColumnName: string;
}

// Droppable Formula Input
function DroppableFormulaInput({ 
  value, 
  onChange, 
  placeholder,
  onDrop,
  className = ''
}: { 
  value: string; 
  onChange: (value: string) => void;
  placeholder?: string;
  onDrop: (colName: string) => void;
  className?: string;
}) {
  const [isOver, setIsOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsOver(true);
  };

  const handleDragLeave = () => {
    setIsOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsOver(false);
    const colName = e.dataTransfer.getData('text/plain');
    if (colName) {
      onDrop(colName);
    }
  };

  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      placeholder={placeholder}
      className={`${className} border-2 rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 ${
        isOver ? 'border-primary-500 bg-primary-50' : 'border-gray-300'
      }`}
    />
  );
}

// Draggable Column Component
function DraggableColumn({ col, onDragEnd, idPrefix = 'column' }: { col: Column; onDragEnd: (colName: string) => void; idPrefix?: string }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useSortable({
    id: `${idPrefix}-${col.name}`,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <button
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={() => onDragEnd(col.name)}
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData('text/plain', col.name);
      }}
      className="px-3 py-1 rounded-lg text-sm transition-colors bg-gray-200 text-gray-700 hover:bg-gray-300 flex items-center gap-1 cursor-grab active:cursor-grabbing"
    >
      <GripVertical className="w-3 h-3" />
      {col.type === 'number' && <Hash className="w-3 h-3" />}
      {col.type === 'date' && <CalendarIcon className="w-3 h-3" />}
      {col.name}
    </button>
  );
}

// Sortable Group Item
function SortableGroupItem({ id, colName, onRemove }: { id: string; colName: string; onRemove: () => void }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="flex items-center gap-2 px-3 py-2 bg-primary-600 text-white rounded-lg text-sm cursor-move"
    >
      <GripVertical className="w-4 h-4" />
      <span>{colName}</span>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
        className="hover:text-red-200"
      >
        <X className="w-3 h-3" />
      </button>
    </div>
  );
}

// Sortable Metric Item
function SortableMetricItem({ 
  id, 
  metric, 
  columns, 
  onUpdate, 
  onRemove 
}: { 
  id: string; 
  metric: Insight['metrics'][0]; 
  columns: Column[];
  onUpdate: (updates: Partial<Insight['metrics'][0]>) => void;
  onRemove: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="flex items-center gap-2 bg-white p-2 rounded-lg border border-gray-200 cursor-move"
    >
      <GripVertical className="w-4 h-4 text-gray-400" />
      <select
        value={metric.function}
        onChange={(e) => onUpdate({ function: e.target.value as any })}
        onClick={(e) => e.stopPropagation()}
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
        <option value="unique_values">UNIQUE VALUES</option>
        <option value="duplicate_count">DUPLICATE COUNT</option>
      </select>
      <select
        value={metric.column}
        onChange={(e) => onUpdate({ column: e.target.value })}
        onClick={(e) => e.stopPropagation()}
        className="px-3 py-1 border border-gray-300 rounded-lg text-sm flex-1"
      >
        {columns.map(col => (
          <option key={col.name} value={col.name}>{col.name} ({col.type})</option>
        ))}
      </select>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
        className="text-red-600 hover:text-red-700"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

export default function DataInsights() {
  const [data, setData] = useState<DataRow[]>([]);
  const [columns, setColumns] = useState<Column[]>([]);
  const [rawData, setRawData] = useState<string>('');
  const [inputType, setInputType] = useState<'file' | 'paste'>('file');
  const [insights, setInsights] = useState<Insight[]>([]);
  const [calculatedColumns, setCalculatedColumns] = useState<CalculatedColumn[]>([]);
  const [columnOperations, setColumnOperations] = useState<ColumnOperation[]>([]);
  const [activeStep, setActiveStep] = useState<'landing' | 'upload' | 'preview' | 'calculate' | 'insights' | 'dashboard' | 'export'>('landing');
  const [activeDragId, setActiveDragId] = useState<string | null>(null);
  const [draggedColumn, setDraggedColumn] = useState<Column | null>(null);
  const [datasetName, setDatasetName] = useState<string>('My Dataset');
  const [excludedColumns, setExcludedColumns] = useState<Set<string>>(new Set());
  const [savedInsights, setSavedInsights] = useState<Insight[]>([]);
  const [selectedInsight, setSelectedInsight] = useState<Insight | null>(null);
  const [chartTypes, setChartTypes] = useState<{ [insightId: string]: 'bar' | 'line' | 'pie' }>({});

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

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

  // Evaluate formula
  function evaluateFormula(formula: string, row: DataRow, cols: Column[]): number {
    try {
      // Replace column names with their values
      let expression = formula;
      cols.forEach(col => {
        const value = row[col.name];
        const numValue = typeof value === 'number' ? value : Number(value) || 0;
        // Replace column name (word boundary to avoid partial matches)
        const regex = new RegExp(`\\b${col.name}\\b`, 'g');
        expression = expression.replace(regex, String(numValue));
      });

      // Remove any remaining non-numeric, non-operator characters for safety
      // Only allow numbers, operators, parentheses, spaces, and decimal points
      expression = expression.replace(/[^0-9+\-*/().%\s]/g, '');

      // Evaluate the expression safely
      // Using Function constructor is safer than eval for basic math
      const result = Function(`"use strict"; return (${expression})`)();
      return typeof result === 'number' && !isNaN(result) ? result : 0;
    } catch (error) {
      console.error('Formula evaluation error:', error);
      return 0;
    }
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

  // Get unique values
  const getUniqueValues = useCallback((rows: DataRow[], column: string): any[] => {
    const values = rows.map(r => r[column]).filter(v => v !== null && v !== undefined && v !== '');
    return Array.from(new Set(values));
  }, []);

  // Get duplicate count
  const getDuplicateCount = useCallback((rows: DataRow[], column: string): number => {
    const values = rows.map(r => r[column]).filter(v => v !== null && v !== undefined && v !== '');
    const valueCounts: { [key: string]: number } = {};
    values.forEach(v => {
      const key = String(v);
      valueCounts[key] = (valueCounts[key] || 0) + 1;
    });
    return Object.values(valueCounts).filter(count => count > 1).reduce((sum, count) => sum + count - 1, 0);
  }, []);

  // Calculate aggregations
  const calculateAggregation = useCallback((
    rows: DataRow[],
    column: string,
    func: Insight['metrics'][0]['function']
  ): number | any[] | { [key: string]: number } => {
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
      case 'unique_values':
        return getUniqueValues(rows, column);
      case 'duplicate_count':
        return getDuplicateCount(rows, column);
      case 'distribution':
        // Return distribution as object with value: count
        const dist: { [key: string]: number } = {};
        values.forEach(v => {
          const key = String(v || 'null');
          dist[key] = (dist[key] || 0) + 1;
        });
        return dist;
      default:
        return 0;
    }
  }, [getUniqueValues, getDuplicateCount]);

  // Generate insight results
  const generateInsightResults = useCallback((insight: Insight): DataRow[] => {
    let filteredData = [...data];

    // Apply filters
    if (insight.filters) {
      // Date range filter
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

      // Date filter (same date, any date)
      if (insight.filters.dateFilter) {
        const dateColumns = columns.filter(c => c.type === 'date').map(c => c.name);
        if (dateColumns.length > 0) {
          if (insight.filters.dateFilter === 'same_date') {
            // Filter to rows with the same date (most common date)
            const dateCounts: { [key: string]: number } = {};
            filteredData.forEach(row => {
              dateColumns.forEach(col => {
                const date = row[col];
                if (date) {
                  dateCounts[date] = (dateCounts[date] || 0) + 1;
                }
              });
            });
            const mostCommonDate = Object.keys(dateCounts).reduce((a, b) => 
              dateCounts[a] > dateCounts[b] ? a : b, Object.keys(dateCounts)[0] || '');
            filteredData = filteredData.filter(row => 
              dateColumns.some(col => row[col] === mostCommonDate)
            );
          }
          // 'any_date' means no additional filtering
        }
      }

      // Value filters
      if (insight.filters.valueFilters) {
        insight.filters.valueFilters.forEach(filter => {
          filteredData = filteredData.filter(row => {
            const value = row[filter.column];
            switch (filter.operator) {
              case 'equals': return String(value) === String(filter.value);
              case 'not_equals': return String(value) !== String(filter.value);
              case 'greater_than': return Number(value) > Number(filter.value);
              case 'less_than': return Number(value) < Number(filter.value);
              case 'contains': return String(value).toLowerCase().includes(String(filter.value).toLowerCase());
              case 'starts_with': return String(value).toLowerCase().startsWith(String(filter.value).toLowerCase());
              case 'ends_with': return String(value).toLowerCase().endsWith(String(filter.value).toLowerCase());
              default: return true;
            }
          });
        });
      }

      // Frequency filter (rows appearing more than X times)
      if (insight.filters.frequencyFilter) {
        const { column, minCount } = insight.filters.frequencyFilter;
        const valueCounts: { [key: string]: number } = {};
        filteredData.forEach(row => {
          const key = String(row[column] || '');
          valueCounts[key] = (valueCounts[key] || 0) + 1;
        });
        filteredData = filteredData.filter(row => {
          const key = String(row[column] || '');
          return valueCounts[key] >= minCount;
        });
      }
    }

    // Pivot table logic: Group by rows, optionally by columns
    if (insight.groupBy.length > 0) {
      // If pivot columns exist, create cross-tabulation structure
      if (insight.pivotColumns && insight.pivotColumns.length > 0) {
        // Get all unique values for pivot columns
        const pivotValues = new Map<string, Set<string>>();
        insight.pivotColumns.forEach(pivotCol => {
          const uniqueVals = new Set<string>();
          filteredData.forEach(row => {
            const val = String(row[pivotCol] || '');
            if (val) uniqueVals.add(val);
          });
          pivotValues.set(pivotCol, uniqueVals);
        });

        // Group by row grouping only
        const rowGroups = new Map<string, DataRow[]>();
        filteredData.forEach(row => {
          const rowKey = insight.groupBy.map(g => String(row[g] || '')).join('|');
          if (!rowGroups.has(rowKey)) {
            rowGroups.set(rowKey, []);
          }
          rowGroups.get(rowKey)!.push(row);
        });

        // Create pivot table structure
        const results: DataRow[] = [];
        rowGroups.forEach((groupRows, rowKey) => {
          const result: DataRow = {};
          
          // Add row grouping values
          const rowValues = rowKey.split('|');
          insight.groupBy.forEach((g, idx) => {
            result[g] = rowValues[idx] || '';
          });

          // For each pivot column, create columns for each unique value
          insight.pivotColumns!.forEach(pivotCol => {
            const uniqueVals = Array.from(pivotValues.get(pivotCol) || []);
            uniqueVals.forEach(pivotVal => {
              // Filter rows that match this pivot value
              const matchingRows = groupRows.filter(r => String(r[pivotCol] || '') === pivotVal);
              
              // Calculate metric for this (row group, pivot value) combination
              insight.metrics.forEach(metric => {
                const value = calculateAggregation(matchingRows, metric.column, metric.function);
                const colName = `${pivotCol}_${pivotVal}_${metric.function}_${metric.column}`;
                
                if (metric.function === 'unique_values') {
                  result[colName] = Array.isArray(value) ? value.join(', ') : value;
                } else if (metric.function === 'distribution') {
                  const dist = value as { [key: string]: number };
                  result[colName] = Object.entries(dist)
                    .map(([k, v]) => `${k}: ${v}`)
                    .join(', ');
                } else {
                  result[colName] = value;
                }
              });
            });
          });

          results.push(result);
        });

        return results;
      } else {
        // No pivot columns - simple grouping
        const grouped = new Map<string, DataRow[]>();
        
        filteredData.forEach(row => {
          const rowKey = insight.groupBy.map(g => String(row[g] || '')).join('|');
          if (!grouped.has(rowKey)) {
            grouped.set(rowKey, []);
          }
          grouped.get(rowKey)!.push(row);
        });

        // Calculate metrics for each group
        const results: DataRow[] = [];
        grouped.forEach((groupRows, rowKey) => {
          const result: DataRow = {};
          
          // Add row grouping values
          const rowValues = rowKey.split('|');
          insight.groupBy.forEach((g, idx) => {
            result[g] = rowValues[idx] || '';
          });
          
          // Calculate metrics
          insight.metrics.forEach(metric => {
            const value = calculateAggregation(groupRows, metric.column, metric.function);
            if (metric.function === 'unique_values') {
              result[`${metric.function}_${metric.column}`] = Array.isArray(value) ? value.join(', ') : value;
            } else if (metric.function === 'distribution') {
              // Format distribution as readable string
              const dist = value as { [key: string]: number };
              result[`${metric.function}_${metric.column}`] = Object.entries(dist)
                .map(([k, v]) => `${k}: ${v}`)
                .join(', ');
            } else {
              result[`${metric.function}_${metric.column}`] = value;
            }
          });
          results.push(result);
        });

        return results;
      }
    } else {
      // No grouping, just calculate overall metrics
      const result: DataRow = {};
      insight.metrics.forEach(metric => {
        const value = calculateAggregation(filteredData, metric.column, metric.function);
        if (metric.function === 'unique_values') {
          result[`${metric.function}_${metric.column}`] = Array.isArray(value) ? value.join(', ') : value;
        } else {
          result[`${metric.function}_${metric.column}`] = value;
        }
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

      {/* 2. Upload / Paste Data Screen */}
      {activeStep === 'upload' && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Upload / Paste Data</h2>
          
          {/* Tabs */}
          <div className="flex gap-2 mb-6 border-b border-gray-200">
            <button
              onClick={() => setInputType('file')}
              className={`px-6 py-3 font-medium transition-colors border-b-2 ${
                inputType === 'file'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              File Upload
            </button>
            <button
              onClick={() => setInputType('paste')}
              className={`px-6 py-3 font-medium transition-colors border-b-2 ${
                inputType === 'paste'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Paste SQL / Data
            </button>
          </div>

          {/* File Upload Tab */}
          {inputType === 'file' && (
            <div>
              <div 
                className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-primary-500 transition-colors cursor-pointer"
                onDragOver={(e) => {
                  e.preventDefault();
                  e.currentTarget.classList.add('border-primary-500', 'bg-primary-50');
                }}
                onDragLeave={(e) => {
                  e.currentTarget.classList.remove('border-primary-500', 'bg-primary-50');
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  e.currentTarget.classList.remove('border-primary-500', 'bg-primary-50');
                  const file = e.dataTransfer.files[0];
                  if (file) handleFileUpload(file);
                }}
              >
                <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-lg text-gray-700 mb-2">Drag & Drop Zone</p>
                <p className="text-sm text-gray-500 mb-4">or</p>
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
                  Browse Files
                </label>
                <p className="text-sm text-gray-500 mt-4">
                  Accepted: CSV, XLS, XLSX, JSON
                </p>
              </div>
            </div>
          )}

          {/* Paste Tab */}
          {inputType === 'paste' && (
            <div>
              <textarea
                value={rawData}
                onChange={(e) => setRawData(e.target.value)}
                placeholder="Paste SQL result or tabular data..."
                className="w-full h-96 p-4 border-2 border-gray-300 rounded-lg font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <div className="mt-4 flex justify-end">
                <button
                  onClick={handlePaste}
                  disabled={!rawData.trim()}
                  className="px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  Continue
                </button>
              </div>
            </div>
          )}
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

      {/* 4. Calculations Builder - Table-based Column Selection */}
      {activeStep === 'calculate' && (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 p-6 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                  <Calculator className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold mb-1">Column Operations</h2>
                  <p className="text-blue-100 text-sm">Select columns and choose operations to perform</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6">
            {/* Column Selection Table */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                Select Columns
              </h3>
              <div className="bg-gray-50 rounded-lg p-4 border-2 border-gray-200">
                <div className="flex items-center gap-4 mb-4">
                  <button
                    onClick={() => {
                      const allSelected = columns.filter(c => !excludedColumns.has(c.name)).every(c => 
                        columnOperations.some(op => op.column === c.name)
                      );
                      if (allSelected) {
                        setColumnOperations([]);
                      } else {
                        const newOps: ColumnOperation[] = [];
                        columns.filter(c => !excludedColumns.has(c.name)).forEach(col => {
                          if (!columnOperations.some(op => op.column === col.name)) {
                            newOps.push({
                              id: `${col.name}_${Date.now()}`,
                              column: col.name,
                              operation: 'count_unique',
                              resultColumnName: `${col.name}_count_unique`
                            });
                          }
                        });
                        setColumnOperations([...columnOperations, ...newOps]);
                      }
                    }}
                    className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    {columns.filter(c => !excludedColumns.has(c.name)).every(c => 
                      columnOperations.some(op => op.column === c.name)
                    ) ? 'Deselect All' : 'Select All'}
                  </button>
                  <span className="text-sm text-gray-600">
                    {columnOperations.length} column(s) selected
                  </span>
                </div>
                <div className="overflow-x-auto max-h-96 border border-gray-300 rounded-lg bg-white">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100 sticky top-0">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase w-12">
                          <input
                            type="checkbox"
                            checked={columns.filter(c => !excludedColumns.has(c.name)).length > 0 && 
                                     columns.filter(c => !excludedColumns.has(c.name)).every(c => 
                                       columnOperations.some(op => op.column === c.name)
                                     )}
                            onChange={(e) => {
                              if (e.target.checked) {
                                const newOps: ColumnOperation[] = [];
                                columns.filter(c => !excludedColumns.has(c.name)).forEach(col => {
                                  if (!columnOperations.some(op => op.column === col.name)) {
                                    newOps.push({
                                      id: `${col.name}_${Date.now()}`,
                                      column: col.name,
                                      operation: 'count_unique',
                                      resultColumnName: `${col.name}_count_unique`
                                    });
                                  }
                                });
                                setColumnOperations([...columnOperations, ...newOps]);
                              } else {
                                setColumnOperations([]);
                              }
                            }}
                            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                          />
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Column Name</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Type</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Sample Data</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Operation</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {columns.filter(c => !excludedColumns.has(c.name)).map(col => {
                        const existingOp = columnOperations.find(op => op.column === col.name);
                        const sampleValue = data.length > 0 ? String(data[0][col.name] ?? '') : '';
                        return (
                          <tr key={col.name} className={`hover:bg-blue-50 transition-colors ${existingOp ? 'bg-blue-50' : ''}`}>
                            <td className="px-4 py-3">
                              <input
                                type="checkbox"
                                checked={!!existingOp}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    const newOp: ColumnOperation = {
                                      id: `${col.name}_${Date.now()}`,
                                      column: col.name,
                                      operation: 'count_unique',
                                      resultColumnName: `${col.name}_count_unique`
                                    };
                                    setColumnOperations([...columnOperations, newOp]);
                                  } else {
                                    setColumnOperations(columnOperations.filter(op => op.column !== col.name));
                                  }
                                }}
                                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                              />
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <div className={`p-1.5 rounded ${
                                  col.type === 'number' ? 'bg-green-100 text-green-700' :
                                  col.type === 'date' ? 'bg-purple-100 text-purple-700' :
                                  'bg-blue-100 text-blue-700'
                                }`}>
                                  {col.type === 'number' ? <Hash className="w-4 h-4" /> :
                                   col.type === 'date' ? <CalendarIcon className="w-4 h-4" /> :
                                   <FileText className="w-4 h-4" />}
                                </div>
                                <span className="font-medium text-gray-800">{col.name}</span>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <span className="px-2 py-1 text-xs font-medium bg-gray-200 text-gray-700 rounded capitalize">
                                {col.type}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <span className="text-sm text-gray-600 font-mono truncate max-w-xs block">
                                {sampleValue || '(empty)'}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              {existingOp ? (
                                <select
                                  value={existingOp.operation}
                                  onChange={(e) => {
                                    const updated = [...columnOperations];
                                    const idx = updated.findIndex(op => op.id === existingOp.id);
                                    if (idx >= 0) {
                                      updated[idx].operation = e.target.value as any;
                                      updated[idx].resultColumnName = `${col.name}_${e.target.value}`;
                                      setColumnOperations(updated);
                                    }
                                  }}
                                  className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm font-medium bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                  <option value="unique_values">Get Unique Values</option>
                                  <option value="count_unique">Count Unique Values</option>
                                  <option value="distribution">% Distribution</option>
                                  <option value="duplicate_count">Duplicate Count</option>
                                  <option value="null_count">Null Count</option>
                                  <option value="not_null_count">Not Null Count</option>
                                </select>
                              ) : (
                                <span className="text-sm text-gray-400">Select to choose operation</span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Selected Operations Summary */}
            {columnOperations.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-green-600" />
                  Selected Operations ({columnOperations.length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {columnOperations.map(op => {
                    const col = columns.find(c => c.name === op.column);
                    return (
                      <div key={op.id} className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border-2 border-blue-200">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <div className={`p-1.5 rounded ${
                                col?.type === 'number' ? 'bg-green-100 text-green-700' :
                                col?.type === 'date' ? 'bg-purple-100 text-purple-700' :
                                'bg-blue-100 text-blue-700'
                              }`}>
                                {col?.type === 'number' ? <Hash className="w-3 h-3" /> :
                                 col?.type === 'date' ? <CalendarIcon className="w-3 h-3" /> :
                                 <FileText className="w-3 h-3" />}
                              </div>
                              <span className="font-bold text-gray-800">{op.column}</span>
                            </div>
                            <div className="text-sm text-gray-600">
                              {op.operation === 'unique_values' && 'Get Unique Values'}
                              {op.operation === 'count_unique' && 'Count Unique Values'}
                              {op.operation === 'distribution' && '% Distribution'}
                              {op.operation === 'duplicate_count' && 'Duplicate Count'}
                              {op.operation === 'null_count' && 'Null Count'}
                              {op.operation === 'not_null_count' && 'Not Null Count'}
                            </div>
                          </div>
                          <button
                            onClick={() => {
                              setColumnOperations(columnOperations.filter(o => o.id !== op.id));
                            }}
                            className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                            title="Remove"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        {/* Preview */}
                        <div className="mt-2 bg-white rounded p-3 border border-blue-200">
                          <div className="text-xs font-semibold text-gray-700 mb-2">Preview:</div>
                          <div className="text-xs text-gray-700">
                            {(() => {
                              try {
                                if (op.operation === 'unique_values') {
                                  const unique = getUniqueValues(data, op.column);
                                  if (unique.length === 0) {
                                    return <span className="text-gray-400">No unique values found</span>;
                                  }
                                  return (
                                    <div>
                                      <div className="font-semibold text-blue-600 mb-2">
                                        {unique.length} unique value{unique.length !== 1 ? 's' : ''}:
                                      </div>
                                      <div className="overflow-x-auto max-h-48 border border-gray-300 rounded">
                                        <table className="min-w-full divide-y divide-gray-200 text-xs">
                                          <thead className="bg-gray-100">
                                            <tr>
                                              <th className="px-3 py-2 text-left font-semibold text-gray-700">#</th>
                                              <th className="px-3 py-2 text-left font-semibold text-gray-700">Value</th>
                                            </tr>
                                          </thead>
                                          <tbody className="bg-white divide-y divide-gray-200">
                                            {unique.map((val, idx) => (
                                              <tr key={idx} className="hover:bg-blue-50">
                                                <td className="px-3 py-2 text-gray-600 font-mono">{idx + 1}</td>
                                                <td className="px-3 py-2 text-gray-800 font-mono">{String(val)}</td>
                                              </tr>
                                            ))}
                                          </tbody>
                                        </table>
                                      </div>
                                    </div>
                                  );
                                } else if (op.operation === 'count_unique') {
                                  return (
                                    <div>
                                      <span className="font-semibold text-green-600">Count: </span>
                                      <span className="font-mono">{getUniqueValues(data, op.column).length}</span>
                                    </div>
                                  );
                                } else if (op.operation === 'distribution') {
                                  const dist = calculateAggregation(data, op.column, 'distribution') as { [key: string]: number };
                                  const total = data.length;
                                  const entries = Object.entries(dist).slice(0, 5);
                                  return (
                                    <div>
                                      <div className="font-semibold text-purple-600 mb-1">
                                        {Object.keys(dist).length} distinct value{Object.keys(dist).length !== 1 ? 's' : ''}:
                                      </div>
                                      <div className="space-y-0.5">
                                        {entries.map(([key, count]) => (
                                          <div key={key} className="flex items-center justify-between text-xs">
                                            <span className="font-mono text-gray-700">{key}:</span>
                                            <span className="font-semibold text-purple-600 ml-2">
                                              {((count / total) * 100).toFixed(1)}%
                                            </span>
                                          </div>
                                        ))}
                                        {Object.keys(dist).length > 5 && (
                                          <div className="text-gray-500 text-xs mt-1">
                                            +{Object.keys(dist).length - 5} more
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  );
                                } else if (op.operation === 'duplicate_count') {
                                  return (
                                    <div>
                                      <span className="font-semibold text-orange-600">Duplicates: </span>
                                      <span className="font-mono">{getDuplicateCount(data, op.column)}</span>
                                    </div>
                                  );
                                } else if (op.operation === 'null_count') {
                                  const nullCount = data.filter(r => r[op.column] === null || r[op.column] === undefined || r[op.column] === '').length;
                                  return (
                                    <div>
                                      <span className="font-semibold text-red-600">Null values: </span>
                                      <span className="font-mono">{nullCount}</span>
                                    </div>
                                  );
                                } else if (op.operation === 'not_null_count') {
                                  const notNullCount = data.filter(r => r[op.column] !== null && r[op.column] !== undefined && r[op.column] !== '').length;
                                  return (
                                    <div>
                                      <span className="font-semibold text-emerald-600">Non-null values: </span>
                                      <span className="font-mono">{notNullCount}</span>
                                    </div>
                                  );
                                }
                                return <span className="text-gray-400">N/A</span>;
                              } catch (error) {
                                return <span className="text-red-500">Error calculating preview</span>;
                              }
                            })()}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-6 border-t border-gray-200">
              <button
                onClick={() => setActiveStep('preview')}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all shadow-md hover:shadow-lg flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                Back
              </button>
              <button
                onClick={() => {
                  if (columnOperations.length > 0) {
                    // Apply operations
                    const updatedData = data.map(row => {
                      const newRow = { ...row };
                      columnOperations.forEach(op => {
                        try {
                          if (op.operation === 'unique_values') {
                            const unique = getUniqueValues(data, op.column);
                            newRow[op.resultColumnName] = unique.join(', ');
                          } else if (op.operation === 'count_unique') {
                            newRow[op.resultColumnName] = getUniqueValues(data, op.column).length;
                          } else if (op.operation === 'distribution') {
                            const dist = calculateAggregation(data, op.column, 'distribution') as { [key: string]: number };
                            const total = data.length;
                            const distStr = Object.entries(dist).map(([k, v]) => `${k}: ${((v/total)*100).toFixed(1)}%`).join(', ');
                            newRow[op.resultColumnName] = distStr;
                          } else if (op.operation === 'duplicate_count') {
                            newRow[op.resultColumnName] = getDuplicateCount(data, op.column);
                          } else if (op.operation === 'null_count') {
                            newRow[op.resultColumnName] = data.filter(r => r[op.column] === null || r[op.column] === undefined || r[op.column] === '').length;
                          } else if (op.operation === 'not_null_count') {
                            newRow[op.resultColumnName] = data.filter(r => r[op.column] !== null && r[op.column] !== undefined && r[op.column] !== '').length;
                          }
                        } catch (error) {
                          newRow[op.resultColumnName] = null;
                        }
                      });
                      return newRow;
                    });

                    const newColumns = [...columns];
                    columnOperations.forEach(op => {
                      if (!newColumns.find(c => c.name === op.resultColumnName)) {
                        newColumns.push({ name: op.resultColumnName, type: op.operation === 'unique_values' || op.operation === 'distribution' ? 'string' : 'number' });
                      }
                    });

                    setData(updatedData);
                    setColumns(newColumns);
                    toast.success(`Applied ${columnOperations.length} column operation(s)`);
                  }
                  setActiveStep('insights');
                }}
                disabled={columnOperations.length === 0}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl flex items-center gap-2 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                Continue to Insights
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. Insight / Group By Builder - Tableau-like Interface */}
      {activeStep === 'insights' && (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              Pivot Table Builder
            </h3>
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
              className="px-5 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-all shadow-md hover:shadow-lg flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              New Insight
            </button>
          </div>

          {insights.length === 0 ? (
            <div className="text-center py-16 text-gray-500">
              <div className="p-4 bg-blue-100 rounded-full w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                <BarChart3 className="w-12 h-12 text-blue-600" />
              </div>
              <p className="text-lg font-medium mb-2">No insights yet</p>
              <p className="text-sm">Click "New Insight" to create a pivot table</p>
            </div>
          ) : (
            <div className="flex h-[calc(100vh-300px)] min-h-[600px]">
              {/* Left Sidebar - Fields Panel (Tableau-style) */}
              <div className="w-64 bg-gray-50 border-r border-gray-200 overflow-y-auto">
                <div className="p-4 bg-white border-b border-gray-200 sticky top-0 z-10">
                  <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-3">Data Fields</h4>
                  <div className="text-xs text-gray-500 mb-2">Drag fields to build your pivot table</div>
                </div>
                
                {/* Dimensions (Non-numeric) */}
                <div className="p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 rounded bg-blue-500"></div>
                    <span className="text-xs font-semibold text-gray-700 uppercase">Dimensions</span>
                  </div>
                  <div className="space-y-1">
                    {columns.filter(c => c.type !== 'number').map(col => (
                      <div
                        key={col.name}
                        draggable
                        onDragStart={(e) => {
                          e.dataTransfer.setData('text/plain', col.name);
                          e.dataTransfer.setData('source-section', 'sidebar');
                          e.dataTransfer.effectAllowed = 'move';
                          setDraggedColumn(col);
                          setActiveDragId(`field-${col.name}`);
                        }}
                        onDragEnd={() => {
                          setDraggedColumn(null);
                          setActiveDragId(null);
                        }}
                        className="flex items-center gap-2 p-2 bg-white rounded border border-gray-200 hover:border-blue-400 hover:shadow-sm cursor-move transition-all group"
                      >
                        <GripVertical className="w-3 h-3 text-gray-400 group-hover:text-blue-600" />
                        <div className="w-3 h-3 rounded bg-blue-500 flex-shrink-0"></div>
                        <span className="text-sm text-gray-700 font-medium flex-1">{col.name}</span>
                        {col.type === 'date' && <CalendarIcon className="w-3 h-3 text-gray-400" />}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Measures (Numeric) */}
                <div className="p-3 border-t border-gray-200">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 rounded bg-green-500"></div>
                    <span className="text-xs font-semibold text-gray-700 uppercase">Measures</span>
                  </div>
                  <div className="space-y-1">
                    {columns.filter(c => c.type === 'number').map(col => (
                      <div
                        key={col.name}
                        draggable
                        onDragStart={(e) => {
                          e.dataTransfer.setData('text/plain', col.name);
                          e.dataTransfer.setData('source-section', 'sidebar');
                          e.dataTransfer.effectAllowed = 'move';
                          setDraggedColumn(col);
                          setActiveDragId(`field-${col.name}`);
                        }}
                        onDragEnd={() => {
                          setDraggedColumn(null);
                          setActiveDragId(null);
                        }}
                        className="flex items-center gap-2 p-2 bg-white rounded border border-gray-200 hover:border-green-400 hover:shadow-sm cursor-move transition-all group"
                      >
                        <GripVertical className="w-3 h-3 text-gray-400 group-hover:text-green-600" />
                        <div className="w-3 h-3 rounded bg-green-500 flex-shrink-0"></div>
                        <span className="text-sm text-gray-700 font-medium flex-1">{col.name}</span>
                        <Hash className="w-3 h-3 text-gray-400" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Main Content Area - Insights Builder */}
              <div className="flex-1 overflow-y-auto">
                <div className="space-y-4 p-6">
                  {insights.map((insight, idx) => (
                    <div key={insight.id} className="bg-white border-2 border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                      {/* Insight Header */}
                      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white border-b border-gray-200">
                        <input
                          type="text"
                          value={insight.name}
                          onChange={(e) => {
                            const updated = [...insights];
                            updated[idx].name = e.target.value;
                            setInsights(updated);
                          }}
                          className="text-lg font-bold text-gray-800 border-none bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 flex-1"
                          placeholder="Enter insight name..."
                        />
                        <button
                          onClick={() => {
                            setInsights(insights.filter((_, i) => i !== idx));
                          }}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete insight"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Insight Builder */}
                      <div className="p-6">
                        {/* ROWS Section */}
                        <div className="mb-6">
                          <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">ROWS</label>
                          <div
                            onDragOver={(e) => {
                              e.preventDefault();
                              e.currentTarget.classList.add('border-blue-500', 'bg-blue-50');
                            }}
                            onDragLeave={(e) => {
                              e.currentTarget.classList.remove('border-blue-500', 'bg-blue-50');
                            }}
                            onDrop={(e) => {
                              e.preventDefault();
                              e.currentTarget.classList.remove('border-blue-500', 'bg-blue-50');
                              const colName = e.dataTransfer.getData('text/plain');
                              const sourceSection = e.dataTransfer.getData('source-section');
                              
                              if (colName) {
                                const updated = [...insights];
                                
                                // Remove from other sections if moving (not from sidebar)
                                if (sourceSection === 'columns') {
                                  updated[idx].pivotColumns = updated[idx].pivotColumns?.filter(c => c !== colName) || [];
                                } else if (sourceSection === 'values') {
                                  updated[idx].metrics = updated[idx].metrics.filter(m => m.column !== colName);
                                } else if (sourceSection === 'rows') {
                                  updated[idx].groupBy = updated[idx].groupBy.filter(c => c !== colName);
                                } else if (sourceSection === 'sidebar') {
                                  // Remove from all sections if coming from sidebar
                                  updated[idx].groupBy = updated[idx].groupBy.filter(c => c !== colName);
                                  updated[idx].pivotColumns = updated[idx].pivotColumns?.filter(c => c !== colName) || [];
                                  updated[idx].metrics = updated[idx].metrics.filter(m => m.column !== colName);
                                }
                                
                                // Add to ROWS if not already there
                                if (!updated[idx].groupBy.includes(colName)) {
                                  updated[idx].groupBy = [...updated[idx].groupBy, colName];
                                }
                                
                                setInsights(updated);
                              }
                            }}
                            className="min-h-[80px] border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50 flex flex-wrap gap-2"
                          >
                            {insight.groupBy.length === 0 ? (
                              <div className="flex items-center justify-center w-full text-gray-400">
                                <BarChart3 className="w-6 h-6 mr-2" />
                                <span className="text-sm">Drag dimensions here</span>
                              </div>
                            ) : (
                              insight.groupBy.map(colName => (
                                <div 
                                  key={colName} 
                                  draggable
                                  onDragStart={(e) => {
                                    e.dataTransfer.setData('text/plain', colName);
                                    e.dataTransfer.setData('source-section', 'rows');
                                    e.dataTransfer.effectAllowed = 'move';
                                  }}
                                  className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium cursor-move hover:bg-blue-700 transition-colors"
                                >
                                  <GripVertical className="w-3 h-3 opacity-75" />
                                  <span>{colName}</span>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      const updated = [...insights];
                                      updated[idx].groupBy = updated[idx].groupBy.filter(c => c !== colName);
                                      setInsights(updated);
                                    }}
                                    className="hover:text-red-200 ml-1"
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                </div>
                              ))
                            )}
                          </div>
                        </div>

                        {/* COLUMNS Section */}
                        <div className="mb-6">
                          <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">COLUMNS (Optional)</label>
                          <div
                            onDragOver={(e) => {
                              e.preventDefault();
                              e.currentTarget.classList.add('border-purple-500', 'bg-purple-50');
                            }}
                            onDragLeave={(e) => {
                              e.currentTarget.classList.remove('border-purple-500', 'bg-purple-50');
                            }}
                            onDrop={(e) => {
                              e.preventDefault();
                              e.currentTarget.classList.remove('border-purple-500', 'bg-purple-50');
                              const colName = e.dataTransfer.getData('text/plain');
                              const sourceSection = e.dataTransfer.getData('source-section');
                              
                              if (colName) {
                                const updated = [...insights];
                                if (!updated[idx].pivotColumns) updated[idx].pivotColumns = [];
                                
                                // Remove from other sections if moving (not from sidebar)
                                if (sourceSection === 'rows') {
                                  updated[idx].groupBy = updated[idx].groupBy.filter(c => c !== colName);
                                } else if (sourceSection === 'values') {
                                  updated[idx].metrics = updated[idx].metrics.filter(m => m.column !== colName);
                                } else if (sourceSection === 'columns') {
                                  updated[idx].pivotColumns = updated[idx].pivotColumns.filter(c => c !== colName);
                                } else if (sourceSection === 'sidebar') {
                                  // Remove from all sections if coming from sidebar
                                  updated[idx].groupBy = updated[idx].groupBy.filter(c => c !== colName);
                                  updated[idx].pivotColumns = updated[idx].pivotColumns.filter(c => c !== colName);
                                  updated[idx].metrics = updated[idx].metrics.filter(m => m.column !== colName);
                                }
                                
                                // Add to COLUMNS if not already there
                                if (!updated[idx].pivotColumns.includes(colName)) {
                                  updated[idx].pivotColumns = [...updated[idx].pivotColumns, colName];
                                }
                                
                                setInsights(updated);
                              }
                            }}
                            className="min-h-[80px] border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50 flex flex-wrap gap-2"
                          >
                            {(!insight.pivotColumns || insight.pivotColumns.length === 0) ? (
                              <div className="flex items-center justify-center w-full text-gray-400">
                                <BarChart3 className="w-6 h-6 mr-2" />
                                <span className="text-sm">Drag dimensions here (optional)</span>
                              </div>
                            ) : (
                              insight.pivotColumns.map(colName => (
                                <div 
                                  key={colName} 
                                  draggable
                                  onDragStart={(e) => {
                                    e.dataTransfer.setData('text/plain', colName);
                                    e.dataTransfer.setData('source-section', 'columns');
                                    e.dataTransfer.effectAllowed = 'move';
                                  }}
                                  className="flex items-center gap-2 px-3 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium cursor-move hover:bg-purple-700 transition-colors"
                                >
                                  <GripVertical className="w-3 h-3 opacity-75" />
                                  <span>{colName}</span>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      const updated = [...insights];
                                      updated[idx].pivotColumns = updated[idx].pivotColumns?.filter(c => c !== colName);
                                      setInsights(updated);
                                    }}
                                    className="hover:text-red-200 ml-1"
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                </div>
                              ))
                            )}
                          </div>
                        </div>

                        {/* VALUES Section */}
                        <div className="mb-6">
                          <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">VALUES</label>
                          <div
                            onDragOver={(e) => {
                              e.preventDefault();
                              e.currentTarget.classList.add('border-green-500', 'bg-green-50');
                            }}
                            onDragLeave={(e) => {
                              e.currentTarget.classList.remove('border-green-500', 'bg-green-50');
                            }}
                            onDrop={(e) => {
                              e.preventDefault();
                              e.currentTarget.classList.remove('border-green-500', 'bg-green-50');
                              const colName = e.dataTransfer.getData('text/plain');
                              const sourceSection = e.dataTransfer.getData('source-section');
                              
                              if (colName) {
                                const updated = [...insights];
                                
                                // Remove from other sections if moving (not from sidebar)
                                if (sourceSection === 'rows') {
                                  updated[idx].groupBy = updated[idx].groupBy.filter(c => c !== colName);
                                } else if (sourceSection === 'columns') {
                                  updated[idx].pivotColumns = updated[idx].pivotColumns?.filter(c => c !== colName) || [];
                                } else if (sourceSection === 'values') {
                                  updated[idx].metrics = updated[idx].metrics.filter(m => m.column !== colName);
                                } else if (sourceSection === 'sidebar') {
                                  // Remove from all sections if coming from sidebar
                                  updated[idx].groupBy = updated[idx].groupBy.filter(c => c !== colName);
                                  updated[idx].pivotColumns = updated[idx].pivotColumns?.filter(c => c !== colName) || [];
                                  updated[idx].metrics = updated[idx].metrics.filter(m => m.column !== colName);
                                }
                                
                                // Add to VALUES if not already there
                                const existingMetric = updated[idx].metrics.find(m => m.column === colName);
                                if (!existingMetric) {
                                  const col = columns.find(c => c.name === colName);
                                  const func: 'sum' | 'count' = col?.type === 'number' ? 'sum' : 'count';
                                  updated[idx].metrics = [...updated[idx].metrics, { 
                                    column: colName, 
                                    function: func
                                  }];
                                }
                                
                                setInsights(updated);
                              }
                            }}
                            className="min-h-[80px] border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50 space-y-2"
                          >
                            {insight.metrics.length === 0 ? (
                              <div className="flex items-center justify-center h-full text-gray-400">
                                <Calculator className="w-6 h-6 mr-2" />
                                <span className="text-sm">Drag measures here</span>
                              </div>
                            ) : (
                              insight.metrics.map((metric, metricIdx) => (
                                <div 
                                  key={metricIdx} 
                                  draggable
                                  onDragStart={(e) => {
                                    e.dataTransfer.setData('text/plain', metric.column);
                                    e.dataTransfer.setData('source-section', 'values');
                                    e.dataTransfer.effectAllowed = 'move';
                                  }}
                                  className="flex items-center gap-2 p-2 bg-green-100 rounded-lg cursor-move hover:bg-green-200 transition-colors"
                                >
                                  <GripVertical className="w-3 h-3 text-gray-500" />
                                  <select
                                    value={metric.function}
                                    onChange={(e) => {
                                      const updated = [...insights];
                                      updated[idx].metrics[metricIdx].function = e.target.value as any;
                                      setInsights(updated);
                                    }}
                                    onClick={(e) => e.stopPropagation()}
                                    className="px-2 py-1 border border-gray-300 rounded text-sm"
                                  >
                                    <option value="sum">SUM</option>
                                    <option value="avg">AVG</option>
                                    <option value="count">COUNT</option>
                                    <option value="min">MIN</option>
                                    <option value="max">MAX</option>
                                  </select>
                                  <span className="text-sm font-medium text-gray-700">({metric.column})</span>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      const updated = [...insights];
                                      updated[idx].metrics = updated[idx].metrics.filter((_, i) => i !== metricIdx);
                                      setInsights(updated);
                                    }}
                                    className="ml-auto p-1 text-red-600 hover:bg-red-100 rounded"
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                </div>
                              ))
                            )}
                          </div>
                        </div>

                        {/* Preview Results Button */}
                        <div className="flex justify-end">
                          <button
                            onClick={() => {
                              const results = generateInsightResults(insight);
                              if (results.length === 0) {
                                toast.error('No results to preview. Please add rows and values.');
                              } else {
                                toast.success(`Generated ${results.length} rows`);
                              }
                            }}
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all shadow-md hover:shadow-lg flex items-center gap-2"
                          >
                            <Eye className="w-5 h-5" />
                            Preview Results
                          </button>
                        </div>

                        {/* Results Preview */}
                        {generateInsightResults(insight).length > 0 && (
                          <div className="mt-6 border-t border-gray-200 pt-6">
                            <h4 className="text-lg font-bold text-gray-800 mb-4">Preview Results</h4>
                            <div className="overflow-x-auto max-h-96 border border-gray-200 rounded-lg bg-white">
                              <table className="min-w-full divide-y divide-gray-200 text-sm">
                                <thead className="bg-gray-100 sticky top-0">
                                  <tr>
                                    {insight.groupBy.map(g => (
                                      <th key={g} className="px-4 py-3 text-left font-bold text-gray-700 border-r border-gray-200">
                                        {g}
                                      </th>
                                    ))}
                                    {insight.pivotColumns && insight.pivotColumns.length > 0 && insight.metrics.length > 0 && (() => {
                                      // Get all results to extract unique pivot combinations
                                      const results = generateInsightResults(insight);
                                      if (results.length === 0) return null;
                                      
                                      // Extract all unique pivot column headers
                                      const pivotHeaders: Array<{ pivotCol: string; pivotVal: string; metric: string }> = [];
                                      const seen = new Set<string>();
                                      
                                      results.forEach(result => {
                                        insight.pivotColumns!.forEach(pivotCol => {
                                          insight.metrics.forEach(metric => {
                                            Object.keys(result).forEach(key => {
                                              // Key format: "pivotCol_pivotVal_metricFunction_metricColumn"
                                              const prefix = `${pivotCol}_`;
                                              const suffix = `_${metric.function}_${metric.column}`;
                                              if (key.startsWith(prefix) && key.endsWith(suffix)) {
                                                // Extract pivot value (everything between prefix and suffix)
                                                const pivotVal = key.slice(prefix.length, -suffix.length);
                                                const headerKey = `${pivotCol}::${pivotVal}::${metric.function}_${metric.column}`;
                                                if (!seen.has(headerKey)) {
                                                  seen.add(headerKey);
                                                  pivotHeaders.push({ pivotCol, pivotVal, metric: `${metric.function}_${metric.column}` });
                                                }
                                              }
                                            });
                                          });
                                        });
                                      });
                                      
                                      // Sort headers for consistent display
                                      pivotHeaders.sort((a, b) => {
                                        if (a.pivotCol !== b.pivotCol) return a.pivotCol.localeCompare(b.pivotCol);
                                        return a.pivotVal.localeCompare(b.pivotVal);
                                      });
                                      
                                      return pivotHeaders.map(({ pivotCol, pivotVal, metric }, idx) => (
                                        <th key={`${pivotCol}_${pivotVal}_${metric}_${idx}`} className="px-4 py-3 text-left font-bold text-gray-700 border-r border-gray-200">
                                          {pivotCol}: {pivotVal}
                                        </th>
                                      ));
                                    })()}
                                    {(!insight.pivotColumns || insight.pivotColumns.length === 0) && insight.metrics.map(metric => (
                                      <th key={`${metric.function}_${metric.column}`} className="px-4 py-3 text-left font-bold text-gray-700">
                                        {metric.function.toUpperCase()}({metric.column})
                                      </th>
                                    ))}
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                  {generateInsightResults(insight).slice(0, 50).map((row, rowIdx) => (
                                    <tr key={rowIdx} className="hover:bg-blue-50 transition-colors">
                                      {insight.groupBy.map(g => (
                                        <td key={g} className="px-4 py-2.5 text-gray-700 border-r border-gray-200 font-medium">
                                          {String(row[g] ?? '')}
                                        </td>
                                      ))}
                                      {insight.pivotColumns && insight.pivotColumns.length > 0 && insight.metrics.length > 0 && (() => {
                                        // Get all pivot headers (same logic as header)
                                        const results = generateInsightResults(insight);
                                        const pivotHeaders: Array<{ pivotCol: string; pivotVal: string; metric: string; key: string }> = [];
                                        const seen = new Set<string>();
                                        
                                        results.forEach(result => {
                                          insight.pivotColumns!.forEach(pivotCol => {
                                            insight.metrics.forEach(metric => {
                                              Object.keys(result).forEach(key => {
                                                const prefix = `${pivotCol}_`;
                                                const suffix = `_${metric.function}_${metric.column}`;
                                                if (key.startsWith(prefix) && key.endsWith(suffix)) {
                                                  const pivotVal = key.slice(prefix.length, -suffix.length);
                                                  const headerKey = `${pivotCol}::${pivotVal}::${metric.function}_${metric.column}`;
                                                  if (!seen.has(headerKey)) {
                                                    seen.add(headerKey);
                                                    pivotHeaders.push({ pivotCol, pivotVal, metric: `${metric.function}_${metric.column}`, key });
                                                  }
                                                }
                                              });
                                            });
                                          });
                                        });
                                        
                                        pivotHeaders.sort((a, b) => {
                                          if (a.pivotCol !== b.pivotCol) return a.pivotCol.localeCompare(b.pivotCol);
                                          return a.pivotVal.localeCompare(b.pivotVal);
                                        });
                                        
                                        return pivotHeaders.map(({ pivotCol, pivotVal, metric, key: headerKey }, idx) => {
                                          // Find the actual key in the row
                                          const actualKey = Object.keys(row).find(k => 
                                            k.startsWith(`${pivotCol}_`) && 
                                            k.endsWith(`_${metric}`) &&
                                            k.slice(`${pivotCol}_`.length, -`_${metric}`.length) === pivotVal
                                          );
                                          return (
                                            <td key={`${pivotCol}_${pivotVal}_${metric}_${idx}`} className="px-4 py-2.5 text-gray-800 font-mono font-semibold text-right border-r border-gray-200">
                                              {actualKey ? String(row[actualKey] ?? '') : ''}
                                            </td>
                                          );
                                        });
                                      })()}
                                      {(!insight.pivotColumns || insight.pivotColumns.length === 0) && insight.metrics.map(metric => (
                                        <td key={`${metric.function}_${metric.column}`} className="px-4 py-2.5 text-gray-800 font-mono font-semibold text-right">
                                          {String(row[`${metric.function}_${metric.column}`] ?? '')}
                                        </td>
                                      ))}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                              {generateInsightResults(insight).length > 50 && (
                                <div className="p-3 text-center text-xs text-gray-500 bg-gray-50 border-t border-gray-200">
                                  Showing first 50 of {generateInsightResults(insight).length} rows
                                </div>
                              )}
                            </div>
                            
                            {/* Charts Visualization */}
                            <div className="mt-6 border-t border-gray-200 pt-6">
                              <div className="flex items-center justify-between mb-4">
                                <h4 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                                  <BarChart3 className="w-5 h-5 text-blue-600" />
                                  Charts Visualization
                                </h4>
                                <select
                                  value={chartTypes[insight.id] || 'bar'}
                                  onChange={(e) => {
                                    setChartTypes({ ...chartTypes, [insight.id]: e.target.value as 'bar' | 'line' | 'pie' });
                                  }}
                                  className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                  <option value="bar">Bar Chart</option>
                                  <option value="line">Line Chart</option>
                                  <option value="pie">Pie Chart</option>
                                </select>
                              </div>
                              <div className="bg-white rounded-lg border border-gray-200 p-4">
                                {(() => {
                                  const results = generateInsightResults(insight);
                                  if (results.length === 0) return null;
                                  
                                  // Prepare chart data
                                  let chartData: any[] = [];
                                  const chartType = chartTypes[insight.id] || 'bar';
                                  
                                  if (insight.groupBy.length > 0 && insight.metrics.length > 0) {
                                    // Simple case: groupBy + metrics (no pivot columns)
                                    if (!insight.pivotColumns || insight.pivotColumns.length === 0) {
                                      chartData = results.map(row => {
                                        const dataPoint: any = {};
                                        insight.groupBy.forEach(g => {
                                          dataPoint[g] = String(row[g] ?? '');
                                        });
                                        insight.metrics.forEach(metric => {
                                          const value = row[`${metric.function}_${metric.column}`];
                                          dataPoint[`${metric.function}_${metric.column}`] = typeof value === 'number' ? value : parseFloat(String(value)) || 0;
                                        });
                                        return dataPoint;
                                      });
                                    } else {
                                      // Pivot table case: create series for each pivot value
                                      const pivotHeaders: Array<{ pivotCol: string; pivotVal: string; metric: string; key: string }> = [];
                                      const seen = new Set<string>();
                                      
                                      results.forEach(result => {
                                        insight.pivotColumns!.forEach(pivotCol => {
                                          insight.metrics.forEach(metric => {
                                            Object.keys(result).forEach(key => {
                                              const prefix = `${pivotCol}_`;
                                              const suffix = `_${metric.function}_${metric.column}`;
                                              if (key.startsWith(prefix) && key.endsWith(suffix)) {
                                                const pivotVal = key.slice(prefix.length, -suffix.length);
                                                const headerKey = `${pivotCol}::${pivotVal}::${metric.function}_${metric.column}`;
                                                if (!seen.has(headerKey)) {
                                                  seen.add(headerKey);
                                                  pivotHeaders.push({ pivotCol, pivotVal, metric: `${metric.function}_${metric.column}`, key });
                                                }
                                              }
                                            });
                                          });
                                        });
                                      });
                                      
                                      chartData = results.map(row => {
                                        const dataPoint: any = {};
                                        insight.groupBy.forEach(g => {
                                          dataPoint[g] = String(row[g] ?? '');
                                        });
                                        pivotHeaders.forEach(({ pivotVal, key }) => {
                                          const value = row[key];
                                          dataPoint[pivotVal] = typeof value === 'number' ? value : parseFloat(String(value)) || 0;
                                        });
                                        return dataPoint;
                                      });
                                    }
                                    
                                    if (chartData.length === 0) return <div className="text-gray-500 text-center py-8">No data available for chart</div>;
                                    
                                    const firstGroupBy = insight.groupBy[0];
                                    const metricKeys = chartData.length > 0 ? Object.keys(chartData[0]).filter(k => k !== firstGroupBy) : [];
                                    const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4'];
                                    
                                    if (chartType === 'pie' && metricKeys.length > 0) {
                                      // Pie chart - use first metric
                                      const pieData = chartData.map((d, idx) => ({
                                        name: String(d[firstGroupBy] || `Item ${idx + 1}`),
                                        value: d[metricKeys[0]] || 0
                                      }));
                                      
                                      return (
                                        <ResponsiveContainer width="100%" height={400}>
                                          <PieChart>
                                            <Pie
                                              data={pieData}
                                              cx="50%"
                                              cy="50%"
                                              labelLine={false}
                                              label={({ name, percent }) => `${name}: ${percent ? (percent * 100).toFixed(0) : 0}%`}
                                              outerRadius={120}
                                              fill="#8884d8"
                                              dataKey="value"
                                            >
                                              {pieData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                                              ))}
                                            </Pie>
                                            <Tooltip />
                                            <Legend />
                                          </PieChart>
                                        </ResponsiveContainer>
                                      );
                                    } else if (chartType === 'line') {
                                      return (
                                        <ResponsiveContainer width="100%" height={400}>
                                          <LineChart data={chartData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey={firstGroupBy} />
                                            <YAxis />
                                            <Tooltip />
                                            <Legend />
                                            {metricKeys.map((key, idx) => (
                                              <Line key={key} type="monotone" dataKey={key} stroke={colors[idx % colors.length]} name={key} />
                                            ))}
                                          </LineChart>
                                        </ResponsiveContainer>
                                      );
                                    } else {
                                      // Bar chart (default)
                                      return (
                                        <ResponsiveContainer width="100%" height={400}>
                                          <BarChart data={chartData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey={firstGroupBy} />
                                            <YAxis />
                                            <Tooltip />
                                            <Legend />
                                            {metricKeys.map((key, idx) => (
                                              <Bar key={key} dataKey={key} fill={colors[idx % colors.length]} name={key} />
                                            ))}
                                          </BarChart>
                                        </ResponsiveContainer>
                                      );
                                    }
                                  }
                                  
                                  return <div className="text-gray-500 text-center py-8">Add rows and values to generate charts</div>;
                                })()}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {insights.length > 0 && (
            <div className="p-6 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
              <button
                onClick={() => setActiveStep('preview')}
                className="px-5 py-2.5 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors flex items-center gap-2"
              >
                ← Back
              </button>
              <div className="flex gap-3">
                <button
                  onClick={() => setActiveStep('dashboard')}
                  className="px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center gap-2 shadow-sm"
                >
                  <BarChart3 className="w-5 h-5" />
                  Dashboard
                </button>
                <button
                  onClick={() => setActiveStep('export')}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-all shadow-md hover:shadow-lg flex items-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Export Excel
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 6. Insights Dashboard */}
      {activeStep === 'dashboard' && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Insights Dashboard</h2>
            <button
              onClick={() => setActiveStep('insights')}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-semibold hover:bg-primary-700 transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              New Insight
            </button>
          </div>

          {savedInsights.length === 0 && insights.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-lg mb-2">No insights yet</p>
              <p className="text-sm">Create insights to see them here</p>
            </div>
          ) : (
            <div className="space-y-4">
              {(savedInsights.length > 0 ? savedInsights : insights).map((insight) => (
                <div key={insight.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-800">{insight.name}</h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setSelectedInsight(insight);
                          setActiveStep('insights');
                        }}
                        className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          if (savedInsights.find(i => i.id === insight.id)) {
                            setSavedInsights(savedInsights.filter(i => i.id !== insight.id));
                            toast.success('Insight deleted');
                          } else {
                            setInsights(insights.filter(i => i.id !== insight.id));
                            toast.success('Insight deleted');
                          }
                        }}
                        className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  
                  <div className="mb-3 text-sm text-gray-600">
                    <p><span className="font-medium">Rows:</span> {insight.groupBy.join(', ') || 'None'}</p>
                    {insight.pivotColumns && insight.pivotColumns.length > 0 && (
                      <p><span className="font-medium">Columns:</span> {insight.pivotColumns.join(', ')}</p>
                    )}
                    <p><span className="font-medium">Metrics:</span> {insight.metrics.map(m => `${m.function}(${m.column})`).join(', ')}</p>
                  </div>

                  {/* Insight Preview Table */}
                  <div className="overflow-x-auto max-h-64 border border-gray-200 rounded-lg bg-white">
                    <table className="min-w-full divide-y divide-gray-200 text-xs">
                      <thead className="bg-gray-100">
                        <tr>
                          {insight.groupBy.map(g => (
                            <th key={g} className="px-2 py-1 text-left font-semibold text-gray-700">
                              {g}
                            </th>
                          ))}
                          {insight.pivotColumns && insight.pivotColumns.map(c => (
                            <th key={c} className="px-2 py-1 text-left font-semibold text-gray-700">
                              {c}
                            </th>
                          ))}
                          {insight.metrics.map(metric => (
                            <th key={`${metric.function}_${metric.column}`} className="px-2 py-1 text-left font-semibold text-gray-700">
                              {metric.function}({metric.column})
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {generateInsightResults(insight).slice(0, 10).map((row, rowIdx) => (
                          <tr key={rowIdx} className="hover:bg-gray-50">
                            {insight.groupBy.map(g => (
                              <td key={g} className="px-2 py-1 text-gray-700">
                                {String(row[g] ?? '')}
                              </td>
                            ))}
                            {insight.pivotColumns && insight.pivotColumns.map(c => (
                              <td key={c} className="px-2 py-1 text-gray-700">
                                {String(row[`pivot_${c}`] ?? '')}
                              </td>
                            ))}
                            {insight.metrics.map(metric => (
                              <td key={`${metric.function}_${metric.column}`} className="px-2 py-1 text-gray-800 font-mono">
                                {String(row[`${metric.function}_${metric.column}`] ?? '')}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {generateInsightResults(insight).length > 10 && (
                      <div className="p-2 text-center text-xs text-gray-500 bg-gray-50">
                        Showing first 10 of {generateInsightResults(insight).length} rows
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 7. Export & Download */}
      {activeStep === 'export' && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Export & Download</h2>
          
          <div className="space-y-4 mb-6">
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <input
                type="checkbox"
                id="export-raw"
                defaultChecked
                className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
              />
              <label htmlFor="export-raw" className="text-sm font-medium text-gray-700 cursor-pointer">
                Raw Data
              </label>
            </div>
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <input
                type="checkbox"
                id="export-cleaned"
                defaultChecked
                className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
              />
              <label htmlFor="export-cleaned" className="text-sm font-medium text-gray-700 cursor-pointer">
                Cleaned Data
              </label>
            </div>
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <input
                type="checkbox"
                id="export-insights"
                defaultChecked
                className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
              />
              <label htmlFor="export-insights" className="text-sm font-medium text-gray-700 cursor-pointer">
                All Insights
              </label>
            </div>
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <input
                type="checkbox"
                id="export-charts"
                defaultChecked={false}
                className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
              />
              <label htmlFor="export-charts" className="text-sm font-medium text-gray-700 cursor-pointer">
                Include Charts in Export
              </label>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">File Format</label>
            <select
              defaultValue="xlsx"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="xlsx">Excel (.xlsx)</option>
              <option value="csv" disabled>CSV (Coming Soon)</option>
            </select>
          </div>

          <button
            onClick={handleExport}
            className="w-full px-6 py-4 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
          >
            <Download className="w-5 h-5" />
            Generate & Download
          </button>
        </div>
      )}
    </div>
  );
}

