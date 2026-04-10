'use client';

import { useState, useRef, useMemo, useEffect } from 'react';
import { GitCompare, Plus, X, AlertCircle, CheckCircle, Minus, Search, ExternalLink, Copy, Download, Zap } from 'lucide-react';
import toast from 'react-hot-toast';
import { validateJson } from '@/lib/jsonParser';
import { trackCtaClick, trackCopy } from '@/lib/analytics';
import Link from 'next/link';

const SAMPLES = [
  {
    label: 'User API v1→v2',
    json1: JSON.stringify({ id: 1, name: 'John Doe', email: 'john@example.com', age: 30, status: 'active' }, null, 2),
    json2: JSON.stringify({ id: 1, name: 'John Doe', email: 'john@doe.com', age: 30, status: 'active', role: 'admin', updatedAt: '2024-01-15' }, null, 2),
  },
  {
    label: 'Product API',
    json1: JSON.stringify({ id: 'prod_123', name: 'Widget Pro', price: 99.99, stock: 50, category: 'electronics' }, null, 2),
    json2: JSON.stringify({ id: 'prod_123', name: 'Widget Pro 2.0', price: 129.99, stock: 45, category: 'electronics', tags: ['new', 'popular'] }, null, 2),
  },
  {
    label: 'Auth Token Change',
    json1: JSON.stringify({ token: 'eyJhbGciOiJIUzI1NiJ9.old', expires_in: 3600, token_type: 'Bearer' }, null, 2),
    json2: JSON.stringify({ access_token: 'eyJhbGciOiJSUzI1NiJ9.new', expires_in: 7200, token_type: 'Bearer', refresh_token: 'rft_abc123' }, null, 2),
  },
  {
    label: 'Order API v1→v2',
    json1: JSON.stringify({ orderId: 'ord_001', status: 'pending', total: 99.99, customer: 'John' }, null, 2),
    json2: JSON.stringify({ orderId: 'ord_001', status: 'processing', total: 99.99, customer: 'John', estimatedDelivery: '2024-03-20', trackingNumber: 'TRK123456', paymentStatus: 'captured' }, null, 2),
  },
  {
    label: 'Config drift',
    json1: JSON.stringify({ maxConnections: 10, timeout: 30, retries: 3, logLevel: 'INFO', features: { darkMode: false, betaUI: false } }, null, 2),
    json2: JSON.stringify({ maxConnections: 50, timeout: 60, retries: 5, logLevel: 'DEBUG', features: { darkMode: true, betaUI: true, aiAssist: false }, region: 'us-east-1' }, null, 2),
  },
];

interface DiffResult {
  key: string;
  status: 'added' | 'removed' | 'changed' | 'unchanged';
  oldValue?: any;
  newValue?: any;
  path: string;
}

type StatusFilter = 'all' | 'changed' | 'added' | 'removed';

export default function ApiComparator() {
  const [json1, setJson1] = useState('');
  const [json2, setJson2] = useState('');
  const [diffResults, setDiffResults] = useState<DiffResult[]>([]);
  const [breakingChanges, setBreakingChanges] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [highlightedField, setHighlightedField] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const resultsSectionRef = useRef<HTMLDivElement>(null);

  const summary = useMemo(() => {
    if (!diffResults.length) return null;
    const counts = { added: 0, removed: 0, changed: 0, unchanged: 0 };
    diffResults.forEach((r) => counts[r.status]++);
    return counts;
  }, [diffResults]);

  const exportDiff = (format: 'json' | 'md') => {
    const changed = diffResults.filter((r) => r.status !== 'unchanged');
    if (!changed.length) { toast.error('No changes to export'); return; }
    let content: string;
    let filename: string;
    if (format === 'json') {
      content = JSON.stringify({ summary, breakingChanges, changes: changed }, null, 2);
      filename = `api-diff-${Date.now()}.json`;
    } else {
      const lines = ['# API Diff Report', '', `**Breaking:** ${breakingChanges.length}`, ''];
      if (breakingChanges.length) { lines.push('## Breaking Changes', ...breakingChanges.map((c) => `- ${c}`), ''); }
      lines.push('## Changes');
      changed.forEach((r) => {
        lines.push(`\n### \`${r.path}\` — ${r.status.toUpperCase()}`);
        if (r.oldValue !== undefined) lines.push(`- Old: \`${JSON.stringify(r.oldValue)}\``);
        if (r.newValue !== undefined) lines.push(`- New: \`${JSON.stringify(r.newValue)}\``);
      });
      content = lines.join('\n');
      filename = `api-diff-${Date.now()}.md`;
    }
    const blob = new Blob([content], { type: format === 'json' ? 'application/json' : 'text/markdown' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.click();
    toast.success(`Exported ${filename}`);
  };

  const copyDiff = () => {
    const changed = diffResults.filter((r) => r.status !== 'unchanged');
    const text = changed.map((r) => `[${r.status.toUpperCase()}] ${r.path}${r.oldValue !== undefined ? ` | old: ${JSON.stringify(r.oldValue)}` : ''}${r.newValue !== undefined ? ` | new: ${JSON.stringify(r.newValue)}` : ''}`).join('\n');
    navigator.clipboard.writeText(text);
    trackCopy('api_comparator');
    toast.success('Diff copied to clipboard');
  };

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

  // ⌘+Enter / Ctrl+Enter to compare
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        e.preventDefault();
        compareJsons();
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const compareJsons = () => {
    trackCtaClick('api_comparator', 'compare');
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
      for (const key of flat1.keys()) allKeys.add(key);
      for (const key of flat2.keys()) allKeys.add(key);
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
      setTimeout(() => {
        document.querySelector<HTMLElement>('[data-results-start]')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
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
    <div className="space-y-6 tool-panel-contain">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
          <GitCompare className="w-6 h-6 text-primary-600" />
          API Response Comparator
        </h2>
        <p className="text-gray-600 mb-3">Compare two API responses to detect changes, additions, and breaking changes.</p>
        {/* Sample data buttons */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="text-xs font-semibold text-gray-500">Samples:</span>
          {SAMPLES.map((s) => (
            <button
              key={s.label}
              type="button"
              onClick={() => { setJson1(s.json1); setJson2(s.json2); trackCtaClick('api_comparator', 'load_sample'); }}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium bg-primary-50 text-primary-700 border border-primary-100 rounded-lg hover:bg-primary-100"
            >
              <Zap className="w-3 h-3" />
              {s.label}
            </button>
          ))}
        </div>

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
          <kbd className="ml-2 hidden sm:inline-flex items-center rounded border border-white/30 bg-white/20 px-1 py-0.5 font-mono text-[10px]">⌘↵</kbd>
        </button>
      </div>

      {breakingChanges.length > 0 && (
        <div ref={resultsSectionRef} data-results-start className="bg-red-50 border-2 border-red-200 rounded-lg p-6 scroll-mt-4">
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
        <div ref={resultsSectionRef} data-results-start className="bg-white rounded-lg shadow-lg p-6 scroll-mt-4">
          {/* Summary stats */}
          {summary && (
            <div className="flex flex-wrap gap-3 mb-4">
              {[
                { label: 'Added', count: summary.added, color: 'bg-green-50 border-green-200 text-green-800' },
                { label: 'Removed', count: summary.removed, color: 'bg-red-50 border-red-200 text-red-800' },
                { label: 'Changed', count: summary.changed, color: 'bg-amber-50 border-amber-200 text-amber-800' },
                { label: 'Unchanged', count: summary.unchanged, color: 'bg-gray-50 border-gray-200 text-gray-600' },
              ].map((s) => (
                <div key={s.label} className={`px-3 py-1.5 rounded-lg border text-xs font-semibold ${s.color}`}>
                  {s.label}: {s.count}
                </div>
              ))}
              <div className="ml-auto flex flex-wrap gap-2">
                <button onClick={copyDiff} className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                  <Copy className="w-3.5 h-3.5" /> Copy
                </button>
                <button onClick={() => exportDiff('json')} className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                  <Download className="w-3.5 h-3.5" /> JSON
                </button>
                <button onClick={() => exportDiff('md')} className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                  <Download className="w-3.5 h-3.5" /> .md
                </button>
              </div>
            </div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex flex-wrap gap-1.5">
              {(['all', 'changed', 'added', 'removed'] as StatusFilter[]).map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setStatusFilter(f)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors ${statusFilter === f ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                >
                  {f}
                </button>
              ))}
            </div>
            <div className="relative w-56">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search fields..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
              />
            </div>
          </div>
          <div className="space-y-2 max-h-[600px] overflow-y-auto scrollbar-thin">
            {diffResults
              .filter((result) => {
                if (result.status === 'unchanged' && statusFilter !== 'all') return false;
                if (statusFilter !== 'all' && result.status !== statusFilter) return false;
                if (statusFilter === 'all' && result.status === 'unchanged') return false;
                return (!searchTerm ||
                  result.path.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  JSON.stringify(result.oldValue || result.newValue).toLowerCase().includes(searchTerm.toLowerCase()));
              })
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

