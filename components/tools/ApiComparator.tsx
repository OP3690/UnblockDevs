'use client';

import { useState } from 'react';
import { GitCompare, Plus, X, AlertCircle, CheckCircle, Minus, Search, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';
import { validateJson } from '@/lib/jsonParser';
import Link from 'next/link';

interface DiffResult {
  key: string;
  status: 'added' | 'removed' | 'changed' | 'unchanged';
  oldValue?: any;
  newValue?: any;
  path: string;
}

export default function ApiComparator() {
  const [json1, setJson1] = useState('');
  const [json2, setJson2] = useState('');
  const [diffResults, setDiffResults] = useState<DiffResult[]>([]);
  const [breakingChanges, setBreakingChanges] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [highlightedField, setHighlightedField] = useState<string | null>(null);

  const flattenObject = (obj: any, prefix: string = '', result: Map<string, any> = new Map()): Map<string, any> => {
    if (Array.isArray(obj)) {
      obj.forEach((item, index) => {
        const newKey = prefix ? `${prefix}[${index}]` : `[${index}]`;
        if (typeof item === 'object' && item !== null) {
          flattenObject(item, newKey, result);
        } else {
          result.set(newKey, item);
        }
      });
    } else {
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          const newKey = prefix ? `${prefix}.${key}` : key;
          if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
            flattenObject(obj[key], newKey, result);
          } else if (Array.isArray(obj[key])) {
            obj[key].forEach((item: any, index: number) => {
              const arrayKey = `${newKey}[${index}]`;
              if (typeof item === 'object' && item !== null) {
                flattenObject(item, arrayKey, result);
              } else {
                result.set(arrayKey, item);
              }
            });
          } else {
            result.set(newKey, obj[key]);
          }
        }
      }
    }
    return result;
  };

  const compareJsons = () => {
    try {
      const validation1 = validateJson(json1);
      const validation2 = validateJson(json2);

      if (!validation1.valid || !validation2.valid) {
        setError('Both JSON inputs must be valid');
        toast.error('Invalid JSON in one or both inputs');
        return;
      }

      const obj1 = validation1.data;
      const obj2 = validation2.data;

      const flat1 = flattenObject(obj1);
      const flat2 = flattenObject(obj2);

      const allKeys = new Set<string>();
      flat1.keys().forEach(key => allKeys.add(key));
      flat2.keys().forEach(key => allKeys.add(key));
      const results: DiffResult[] = [];
      const breaking: string[] = [];

      allKeys.forEach((key) => {
        const val1 = flat1.get(key);
        const val2 = flat2.get(key);

        if (val1 === undefined) {
          results.push({
            key,
            status: 'added',
            newValue: val2,
            path: key,
          });
        } else if (val2 === undefined) {
          results.push({
            key,
            status: 'removed',
            oldValue: val1,
            path: key,
          });
          breaking.push(`Field removed: ${key}`);
        } else if (JSON.stringify(val1) !== JSON.stringify(val2)) {
          results.push({
            key,
            status: 'changed',
            oldValue: val1,
            newValue: val2,
            path: key,
          });
          if (typeof val1 !== typeof val2) {
            breaking.push(`Type changed: ${key} (${typeof val1} → ${typeof val2})`);
          }
        } else {
          results.push({
            key,
            status: 'unchanged',
            oldValue: val1,
            newValue: val2,
            path: key,
          });
        }
      });

      const changedResults = results.filter(r => r.status !== 'unchanged');
      setDiffResults(results);
      setBreakingChanges(breaking);
      setError(null);
      toast.success(`Comparison complete: ${changedResults.length} changes found out of ${results.length} fields`);
    } catch (err: any) {
      setError(err.message);
      toast.error('Comparison failed');
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'added':
        return <Plus className="w-4 h-4 text-green-600" />;
      case 'removed':
        return <X className="w-4 h-4 text-red-600" />;
      case 'changed':
        return <AlertCircle className="w-4 h-4 text-yellow-600" />;
      default:
        return <CheckCircle className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'added':
        return 'bg-green-50 border-green-200';
      case 'removed':
        return 'bg-red-50 border-red-200';
      case 'changed':
        return 'bg-yellow-50 border-yellow-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <GitCompare className="w-6 h-6 text-primary-600" />
          API Response Comparator
        </h2>
        <p className="text-gray-600 mb-4">Compare two API responses to detect changes, additions, and breaking changes.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Response 1 (Old/Previous)</label>
            <textarea
              value={json1}
              onChange={(e) => setJson1(e.target.value)}
              placeholder='{"key": "value"}'
              className="w-full h-64 p-4 border-2 border-gray-300 rounded-lg font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Response 2 (New/Current)</label>
            <textarea
              value={json2}
              onChange={(e) => setJson2(e.target.value)}
              placeholder='{"key": "value"}'
              className="w-full h-64 p-4 border-2 border-gray-300 rounded-lg font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>

        <button
          onClick={compareJsons}
          disabled={!json1.trim() || !json2.trim()}
          className="w-full py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          Compare Responses
        </button>
      </div>

      {breakingChanges.length > 0 && (
        <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
          <h3 className="text-lg font-bold text-red-800 mb-3 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            Breaking Changes Detected ({breakingChanges.length})
          </h3>
          <ul className="space-y-2">
            {breakingChanges.map((change, idx) => (
              <li key={idx} className="text-red-700 flex items-start gap-2">
                <Minus className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{change}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {diffResults.length > 0 && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-800">
              Comparison Results ({diffResults.filter(r => r.status !== 'unchanged').length} changes)
            </h3>
            <div className="relative w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search fields..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
          <div className="space-y-2 max-h-[600px] overflow-y-auto scrollbar-thin">
            {diffResults
              .filter((result) => 
                result.status !== 'unchanged' && // Only show changed, added, or removed fields
                (!searchTerm || 
                result.path.toLowerCase().includes(searchTerm.toLowerCase()) ||
                JSON.stringify(result.oldValue || result.newValue).toLowerCase().includes(searchTerm.toLowerCase()))
              )
              .map((result, idx) => {
                const isHighlighted = highlightedField === result.path || 
                  (searchTerm && result.path.toLowerCase().includes(searchTerm.toLowerCase()));
                
                // Check if this is the special key-value pair to highlight
                // Normalize values for comparison (handle string "N", character 'N', etc.)
                const normalizeValue = (val: any): string => {
                  if (val === null || val === undefined) return '';
                  if (typeof val === 'string') {
                    const trimmed = val.trim();
                    // Remove quotes if present
                    const unquoted = trimmed.replace(/^["']|["']$/g, '');
                    return unquoted === 'N' ? 'N' : unquoted;
                  }
                  return String(val).trim();
                };
                
                const oldValNormalized = normalizeValue(result.oldValue);
                const newValNormalized = normalizeValue(result.newValue);
                
                // Check path (handle both dot notation and bracket notation, case-insensitive)
                const pathLower = result.path.toLowerCase();
                const pathIncludesIsConstituents = pathLower.includes('isconstituents') || 
                  pathLower.endsWith('.isconstituents') ||
                  pathLower.includes('[isconstituents]');
                
                // Check if value is "N" (normalized) - also check stringified versions
                const hasNValue = oldValNormalized === 'N' || newValNormalized === 'N' ||
                  String(result.oldValue) === 'N' || String(result.newValue) === 'N' ||
                  JSON.stringify(result.oldValue) === '"N"' || JSON.stringify(result.newValue) === '"N"';
                
                const isSpecialField = pathIncludesIsConstituents && hasNValue;
                
                // Debug logging to help identify issues
                if (pathIncludesIsConstituents) {
                  console.log('🔍 isConstituents field detected:', {
                    path: result.path,
                    oldValue: result.oldValue,
                    newValue: result.newValue,
                    oldValNormalized,
                    newValNormalized,
                    hasNValue,
                    isSpecialField,
                    status: result.status
                  });
                }
                
                return (
              <div
                key={idx}
                onClick={() => setHighlightedField(result.path === highlightedField ? null : result.path)}
                className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                  isSpecialField
                    ? 'ring-4 ring-orange-500 shadow-xl border-orange-500 bg-orange-100 scale-[1.01]'
                    : isHighlighted 
                    ? 'ring-4 ring-primary-400 shadow-lg scale-[1.02]' 
                    : 'hover:shadow-md'
                } ${isSpecialField ? 'border-orange-500' : getStatusColor(result.status)}`}
              >
                <div className="flex items-start gap-3">
                  {getStatusIcon(result.status)}
                  <div className="flex-1">
                    <div className="font-semibold text-gray-800 mb-1 flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-white rounded text-sm">{result.path}</span>
                      <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                        result.status === 'added' ? 'bg-green-200 text-green-800' :
                        result.status === 'removed' ? 'bg-red-200 text-red-800' :
                        result.status === 'changed' ? 'bg-yellow-200 text-yellow-800' :
                        'bg-gray-200 text-gray-800'
                      }`}>
                        {result.status.toUpperCase()}
                      </span>
                      {isSpecialField && (
                        <span className="px-3 py-1 bg-orange-500 text-white rounded-md text-xs font-bold animate-pulse shadow-lg">
                          ⚠️ SPECIAL: isConstituents="N"
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-gray-600 mt-2">
                      {result.status === 'added' && (
                        <div className={`p-3 rounded border ${isSpecialField ? 'bg-orange-100 border-orange-400' : 'bg-green-100 border-green-300'}`}>
                          <span className={`font-medium ${isSpecialField ? 'text-orange-800' : 'text-green-800'}`}>Added:</span>{' '}
                          <code className={`bg-white px-2 py-1 rounded font-mono ${isSpecialField ? 'text-orange-900 font-bold' : 'text-green-900'}`}>
                            {JSON.stringify(result.newValue)}
                          </code>
                        </div>
                      )}
                      {result.status === 'removed' && (
                        <div className={`p-3 rounded border ${isSpecialField ? 'bg-orange-100 border-orange-400' : 'bg-red-100 border-red-300'}`}>
                          <span className={`font-medium ${isSpecialField ? 'text-orange-800' : 'text-red-800'}`}>Removed:</span>{' '}
                          <code className={`bg-white px-2 py-1 rounded font-mono ${isSpecialField ? 'text-orange-900 font-bold' : 'text-red-900'}`}>
                            {JSON.stringify(result.oldValue)}
                          </code>
                        </div>
                      )}
                      {result.status === 'changed' && (
                        <div className="space-y-2">
                          <div className={`p-3 rounded border ${isSpecialField && (result.oldValue === 'N' || JSON.stringify(result.oldValue) === '"N"') ? 'bg-orange-100 border-orange-400' : 'bg-red-50 border-red-200'}`}>
                            <span className={`font-medium ${isSpecialField && (result.oldValue === 'N' || JSON.stringify(result.oldValue) === '"N"') ? 'text-orange-700' : 'text-red-700'}`}>Old Value:</span>
                            <div className="mt-1">
                              <code className={`bg-white px-2 py-1 rounded font-mono block ${isSpecialField && (result.oldValue === 'N' || JSON.stringify(result.oldValue) === '"N"') ? 'text-orange-900 font-bold' : 'text-red-900'}`}>
                                {JSON.stringify(result.oldValue)}
                              </code>
                            </div>
                          </div>
                          <div className={`p-3 rounded border ${isSpecialField && (result.newValue === 'N' || JSON.stringify(result.newValue) === '"N"') ? 'bg-orange-100 border-orange-400' : 'bg-green-50 border-green-200'}`}>
                            <span className={`font-medium ${isSpecialField && (result.newValue === 'N' || JSON.stringify(result.newValue) === '"N"') ? 'text-orange-700' : 'text-green-700'}`}>New Value:</span>
                            <div className="mt-1">
                              <code className={`bg-white px-2 py-1 rounded font-mono block ${isSpecialField && (result.newValue === 'N' || JSON.stringify(result.newValue) === '"N"') ? 'text-orange-900 font-bold' : 'text-green-900'}`}>
                                {JSON.stringify(result.newValue)}
                              </code>
                            </div>
                          </div>
                        </div>
                      )}
                      {result.status === 'unchanged' && (
                        <div className={`p-3 rounded border ${isSpecialField ? 'bg-orange-50 border-orange-300' : 'bg-gray-50 border-gray-200'} ${isSpecialField ? 'text-orange-800' : 'text-gray-600'}`}>
                          {isSpecialField ? (
                            <div>
                              <span className="font-bold text-orange-900">⚠️ Special Value Detected:</span>{' '}
                              <code className="bg-white px-2 py-1 rounded font-mono font-bold text-orange-900">
                                {JSON.stringify(result.oldValue || result.newValue)}
                              </code>
                            </div>
                          ) : (
                            'No changes'
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
            })}
          </div>
        </div>
      )}

      {/* Blog Links Section */}
      <div className="mt-12 bg-white rounded-xl shadow-lg p-8 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Learn More About API Comparison</h2>
        <div className="space-y-3">
          <Link
            href="/blog/debug-api-changes-compare-responses"
            className="block p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 hover:border-blue-400 hover:shadow-md transition-all"
          >
            <h3 className="font-semibold text-gray-900 mb-1">Debug API Changes Faster: How to Compare Two API Responses Visually</h3>
            <p className="text-sm text-gray-600 mb-2">Learn why response drift happens and how to compare API responses effectively with visual diff tools.</p>
            <span className="text-blue-600 text-sm font-medium hover:underline">Read Guide →</span>
          </Link>
          <Link
            href="/blog/api-response-comparator-testing-guide"
            className="block p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200 hover:border-green-400 hover:shadow-md transition-all"
          >
            <h3 className="font-semibold text-gray-900 mb-1">API Response Comparator: A Complete Testing Guide</h3>
            <p className="text-sm text-gray-600 mb-2">Complete guide to using API response comparators for testing and debugging API changes.</p>
            <span className="text-green-600 text-sm font-medium hover:underline">Read Guide →</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

