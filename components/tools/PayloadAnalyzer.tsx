'use client';

import { useState, useMemo } from 'react';
import { BarChart3, AlertCircle, TrendingDown } from 'lucide-react';
import toast from 'react-hot-toast';
import { validateJson } from '@/lib/jsonParser';

interface FieldSize {
  path: string;
  size: number;
  percentage: number;
  type: string;
}

export default function PayloadAnalyzer() {
  const [jsonText, setJsonText] = useState('');
  const [fieldSizes, setFieldSizes] = useState<FieldSize[]>([]);
  const [totalSize, setTotalSize] = useState(0);

  const calculateFieldSizes = (obj: any, path: string = 'root', result: FieldSize[] = []): FieldSize[] => {
    const jsonStr = JSON.stringify(obj);
    const size = new Blob([jsonStr]).size;

    if (typeof obj === 'object' && obj !== null && !Array.isArray(obj)) {
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          const newPath = path === 'root' ? key : `${path}.${key}`;
          calculateFieldSizes(obj[key], newPath, result);
        }
      }
    } else if (Array.isArray(obj)) {
      if (obj.length > 0) {
        calculateFieldSizes(obj[0], `${path}[0]`, result);
      }
    } else {
      const fieldJson = JSON.stringify({ [path]: obj });
      const fieldSize = new Blob([fieldJson]).size;
      result.push({
        path,
        size: fieldSize,
        percentage: 0,
        type: typeof obj,
      });
    }

    return result;
  };

  const analyzePayload = () => {
    const validation = validateJson(jsonText);
    if (!validation.valid) {
      toast.error('Invalid JSON format');
      return;
    }

    try {
      const jsonStr = JSON.stringify(validation.data);
      const total = new Blob([jsonStr]).size;
      setTotalSize(total);

      const sizes = calculateFieldSizes(validation.data);
      const totalFieldSize = sizes.reduce((sum, f) => sum + f.size, 0);
      
      const sizesWithPercentage = sizes.map((field) => ({
        ...field,
        percentage: totalFieldSize > 0 ? (field.size / totalFieldSize) * 100 : 0,
      })).sort((a, b) => b.size - a.size);

      setFieldSizes(sizesWithPercentage);
      toast.success('Payload analyzed successfully');
    } catch (err: any) {
      toast.error('Failed to analyze payload');
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const heavyFields = useMemo(() => {
    return fieldSizes.filter((f) => f.percentage > 10).slice(0, 5);
  }, [fieldSizes]);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-primary-600" />
          Payload Size & Performance Analyzer
        </h2>
        <p className="text-gray-600 mb-4">Analyze JSON payload size by field to identify performance bottlenecks.</p>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">JSON Payload</label>
          <textarea
            value={jsonText}
            onChange={(e) => setJsonText(e.target.value)}
            placeholder='{"key": "value"}'
            className="w-full h-64 p-4 border-2 border-gray-300 rounded-lg font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <button
          onClick={analyzePayload}
          disabled={!jsonText.trim()}
          className="w-full py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          Analyze Payload
        </button>
      </div>

      {totalSize > 0 && (
        <>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Payload Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">Total Size</div>
                <div className="text-2xl font-bold text-blue-600">{formatSize(totalSize)}</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">Fields Analyzed</div>
                <div className="text-2xl font-bold text-green-600">{fieldSizes.length}</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">Heavy Fields (>10%)</div>
                <div className="text-2xl font-bold text-purple-600">{heavyFields.length}</div>
              </div>
            </div>
          </div>

          {heavyFields.length > 0 && (
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-yellow-800 mb-3 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                Performance Recommendations
              </h3>
              <p className="text-yellow-700 mb-3">Consider optimizing these heavy fields:</p>
              <ul className="space-y-2">
                {heavyFields.map((field, idx) => (
                  <li key={idx} className="text-yellow-800">
                    • <code className="bg-white px-2 py-1 rounded">{field.path}</code> - {formatSize(field.size)} ({field.percentage.toFixed(1)}%)
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Field Size Breakdown</h3>
            <div className="space-y-3 max-h-[500px] overflow-y-auto scrollbar-thin">
              {fieldSizes.map((field, idx) => (
                <div key={idx} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-semibold text-gray-800">{field.path}</div>
                    <div className="text-sm text-gray-600">{formatSize(field.size)} ({field.percentage.toFixed(2)}%)</div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary-600 h-2 rounded-full transition-all"
                      style={{ width: `${Math.min(field.percentage, 100)}%` }}
                    />
                  </div>
                  <div className="text-xs text-gray-500 mt-1">Type: {field.type}</div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

