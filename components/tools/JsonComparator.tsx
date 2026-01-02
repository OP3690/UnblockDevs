'use client';

import { useState, useMemo } from 'react';
import { GitCompare, Copy, Check, AlertCircle, Plus, Minus, Edit } from 'lucide-react';
import toast from 'react-hot-toast';
import { validateJson } from '@/lib/jsonParser';

interface DiffResult {
  type: 'added' | 'removed' | 'modified' | 'unchanged';
  path: string;
  oldValue?: any;
  newValue?: any;
  key: string;
}

export default function JsonComparator() {
  const [json1, setJson1] = useState('');
  const [json2, setJson2] = useState('');
  const [viewMode, setViewMode] = useState<'side-by-side' | 'unified' | 'tree'>('side-by-side');
  const [copied, setCopied] = useState(false);
  const [error1, setError1] = useState<string | null>(null);
  const [error2, setError2] = useState<string | null>(null);

  const parseJson = (text: string): { data: any; error: string | null } => {
    if (!text.trim()) {
      return { data: null, error: null };
    }
    try {
      const parsed = JSON.parse(text);
      return { data: parsed, error: null };
    } catch (e: any) {
      return { data: null, error: e.message };
    }
  };

  const normalizeValue = (value: any): any => {
    if (value === null || value === undefined) return null;
    if (typeof value === 'string') return value.trim();
    if (typeof value === 'number') return value;
    if (typeof value === 'boolean') return value;
    if (Array.isArray(value)) {
      return value.map(normalizeValue).sort((a, b) => {
        const aStr = JSON.stringify(a);
        const bStr = JSON.stringify(b);
        return aStr.localeCompare(bStr);
      });
    }
    if (typeof value === 'object') {
      const sorted: any = {};
      Object.keys(value)
        .sort()
        .forEach((key) => {
          sorted[key] = normalizeValue(value[key]);
        });
      return sorted;
    }
    return value;
  };

  const compareObjects = (
    obj1: any,
    obj2: any,
    path: string = '',
    ignoreOrder: boolean = true
  ): DiffResult[] => {
    const diffs: DiffResult[] = [];
    const keys1 = new Set(Object.keys(obj1 || {}));
    const keys2 = new Set(Object.keys(obj2 || {}));
    const allKeys = new Set([...keys1, ...keys2]);

    allKeys.forEach((key) => {
      const currentPath = path ? `${path}.${key}` : key;
      const val1 = obj1?.[key];
      const val2 = obj2?.[key];

      if (!keys1.has(key)) {
        // Added in obj2
        diffs.push({
          type: 'added',
          path: currentPath,
          newValue: val2,
          key,
        });
      } else if (!keys2.has(key)) {
        // Removed from obj1
        diffs.push({
          type: 'removed',
          path: currentPath,
          oldValue: val1,
          key,
        });
      } else {
        const normalized1 = ignoreOrder ? normalizeValue(val1) : val1;
        const normalized2 = ignoreOrder ? normalizeValue(val2) : val2;

        if (JSON.stringify(normalized1) !== JSON.stringify(normalized2)) {
          if (
            typeof val1 === 'object' &&
            val1 !== null &&
            !Array.isArray(val1) &&
            typeof val2 === 'object' &&
            val2 !== null &&
            !Array.isArray(val2)
          ) {
            // Recursively compare nested objects
            diffs.push(...compareObjects(val1, val2, currentPath, ignoreOrder));
          } else {
            // Modified value
            diffs.push({
              type: 'modified',
              path: currentPath,
              oldValue: val1,
              newValue: val2,
              key,
            });
          }
        } else {
          // Unchanged (optional - can be filtered out)
          diffs.push({
            type: 'unchanged',
            path: currentPath,
            oldValue: val1,
            newValue: val2,
            key,
          });
        }
      }
    });

    return diffs;
  };

  const compareArrays = (
    arr1: any[],
    arr2: any[],
    path: string = '',
    ignoreOrder: boolean = true
  ): DiffResult[] => {
    const diffs: DiffResult[] = [];

    if (ignoreOrder) {
      // Compare as sets (order-independent)
      const set1 = new Set(arr1.map((v) => JSON.stringify(normalizeValue(v))));
      const set2 = new Set(arr2.map((v) => JSON.stringify(normalizeValue(v))));

      arr1.forEach((val, idx) => {
        const valStr = JSON.stringify(normalizeValue(val));
        if (!set2.has(valStr)) {
          diffs.push({
            type: 'removed',
            path: `${path}[${idx}]`,
            oldValue: val,
            key: `[${idx}]`,
          });
        }
      });

      arr2.forEach((val, idx) => {
        const valStr = JSON.stringify(normalizeValue(val));
        if (!set1.has(valStr)) {
          diffs.push({
            type: 'added',
            path: `${path}[${idx}]`,
            newValue: val,
            key: `[${idx}]`,
          });
        }
      });
    } else {
      // Compare with order
      const maxLen = Math.max(arr1.length, arr2.length);
      for (let i = 0; i < maxLen; i++) {
        if (i >= arr1.length) {
          diffs.push({
            type: 'added',
            path: `${path}[${i}]`,
            newValue: arr2[i],
            key: `[${i}]`,
          });
        } else if (i >= arr2.length) {
          diffs.push({
            type: 'removed',
            path: `${path}[${i}]`,
            oldValue: arr1[i],
            key: `[${i}]`,
          });
        } else {
          const normalized1 = normalizeValue(arr1[i]);
          const normalized2 = normalizeValue(arr2[i]);
          if (JSON.stringify(normalized1) !== JSON.stringify(normalized2)) {
            diffs.push({
              type: 'modified',
              path: `${path}[${i}]`,
              oldValue: arr1[i],
              newValue: arr2[i],
              key: `[${i}]`,
            });
          }
        }
      }
    }

    return diffs;
  };

  const calculateDiff = (): DiffResult[] => {
    const parsed1 = parseJson(json1);
    const parsed2 = parseJson(json2);

    if (parsed1.error || parsed2.error) {
      return [];
    }

    if (parsed1.data === null || parsed2.data === null) {
      return [];
    }

    const data1 = parsed1.data;
    const data2 = parsed2.data;

    if (Array.isArray(data1) && Array.isArray(data2)) {
      return compareArrays(data1, data2, '', true);
    } else if (typeof data1 === 'object' && typeof data2 === 'object') {
      return compareObjects(data1, data2, '', true);
    } else {
      // Primitive comparison
      if (data1 !== data2) {
        return [
          {
            type: 'modified',
            path: '',
            oldValue: data1,
            newValue: data2,
            key: 'root',
          },
        ];
      }
      return [];
    }
  };

  const diffs = useMemo(() => calculateDiff(), [json1, json2]);
  const parsed1 = parseJson(json1);
  const parsed2 = parseJson(json2);

  const stats = useMemo(() => {
    const added = diffs.filter((d) => d.type === 'added').length;
    const removed = diffs.filter((d) => d.type === 'removed').length;
    const modified = diffs.filter((d) => d.type === 'modified').length;
    const unchanged = diffs.filter((d) => d.type === 'unchanged').length;

    return { added, removed, modified, unchanged, total: diffs.length };
  }, [diffs]);

  const copyDiff = () => {
    const diffText = JSON.stringify(
      {
        added: diffs.filter((d) => d.type === 'added'),
        removed: diffs.filter((d) => d.type === 'removed'),
        modified: diffs.filter((d) => d.type === 'modified'),
      },
      null,
      2
    );
    navigator.clipboard.writeText(diffText);
    setCopied(true);
    toast.success('Diff copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const getDiffColor = (type: string) => {
    switch (type) {
      case 'added':
        return 'bg-green-50 border-green-300 text-green-800';
      case 'removed':
        return 'bg-red-50 border-red-300 text-red-800';
      case 'modified':
        return 'bg-yellow-50 border-yellow-300 text-yellow-800';
      default:
        return 'bg-gray-50 border-gray-300 text-gray-800';
    }
  };

  const getDiffIcon = (type: string) => {
    switch (type) {
      case 'added':
        return <Plus className="w-4 h-4 text-green-600" />;
      case 'removed':
        return <Minus className="w-4 h-4 text-red-600" />;
      case 'modified':
        return <Edit className="w-4 h-4 text-yellow-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <GitCompare className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">JSON Comparator</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          {/* JSON 1 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              JSON 1 (Original)
            </label>
            <textarea
              value={json1}
              onChange={(e) => {
                setJson1(e.target.value);
                const parsed = parseJson(e.target.value);
                setError1(parsed.error);
              }}
              placeholder="Paste first JSON here..."
              className={`w-full h-64 p-4 font-mono text-sm border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none ${
                error1 ? 'border-red-300' : 'border-gray-300'
              }`}
            />
            {error1 && (
              <div className="mt-2 flex items-center gap-2 text-sm text-red-600">
                <AlertCircle className="w-4 h-4" />
                <span>{error1}</span>
              </div>
            )}
          </div>

          {/* JSON 2 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              JSON 2 (Compare)
            </label>
            <textarea
              value={json2}
              onChange={(e) => {
                setJson2(e.target.value);
                const parsed = parseJson(e.target.value);
                setError2(parsed.error);
              }}
              placeholder="Paste second JSON here..."
              className={`w-full h-64 p-4 font-mono text-sm border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none ${
                error2 ? 'border-red-300' : 'border-gray-300'
              }`}
            />
            {error2 && (
              <div className="mt-2 flex items-center gap-2 text-sm text-red-600">
                <AlertCircle className="w-4 h-4" />
                <span>{error2}</span>
              </div>
            )}
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-4 mb-4">
          <span className="text-sm font-medium text-gray-700">View Mode:</span>
          <div className="flex gap-2">
            {(['side-by-side', 'unified', 'tree'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  viewMode === mode
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {mode.charAt(0).toUpperCase() + mode.slice(1).replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Stats */}
        {parsed1.data && parsed2.data && (
          <div className="mb-4 p-4 bg-gray-50 rounded-lg">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-600">{stats.added}</div>
                <div className="text-xs text-gray-600">Added</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-600">{stats.removed}</div>
                <div className="text-xs text-gray-600">Removed</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-600">{stats.modified}</div>
                <div className="text-xs text-gray-600">Modified</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-600">{stats.unchanged}</div>
                <div className="text-xs text-gray-600">Unchanged</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
                <div className="text-xs text-gray-600">Total</div>
              </div>
            </div>
          </div>
        )}

        {/* Diff Results */}
        {parsed1.data && parsed2.data && diffs.length > 0 && (
          <div className="mt-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-900">Differences</h3>
              <button
                onClick={copyDiff}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                Copy Diff
              </button>
            </div>

            <div className="max-h-96 overflow-y-auto space-y-2">
              {diffs
                .filter((d) => d.type !== 'unchanged')
                .map((diff, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-lg border-2 ${getDiffColor(diff.type)}`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {getDiffIcon(diff.type)}
                      <span className="font-semibold">{diff.path || 'root'}</span>
                      <span className="text-xs opacity-75">({diff.type})</span>
                    </div>
                    {diff.type === 'removed' && (
                      <div className="mt-2">
                        <div className="text-xs font-medium mb-1">Removed:</div>
                        <pre className="text-xs bg-white p-2 rounded overflow-x-auto">
                          {JSON.stringify(diff.oldValue, null, 2)}
                        </pre>
                      </div>
                    )}
                    {diff.type === 'added' && (
                      <div className="mt-2">
                        <div className="text-xs font-medium mb-1">Added:</div>
                        <pre className="text-xs bg-white p-2 rounded overflow-x-auto">
                          {JSON.stringify(diff.newValue, null, 2)}
                        </pre>
                      </div>
                    )}
                    {diff.type === 'modified' && (
                      <div className="mt-2 grid grid-cols-2 gap-2">
                        <div>
                          <div className="text-xs font-medium mb-1">Old:</div>
                          <pre className="text-xs bg-white p-2 rounded overflow-x-auto">
                            {JSON.stringify(diff.oldValue, null, 2)}
                          </pre>
                        </div>
                        <div>
                          <div className="text-xs font-medium mb-1">New:</div>
                          <pre className="text-xs bg-white p-2 rounded overflow-x-auto">
                            {JSON.stringify(diff.newValue, null, 2)}
                          </pre>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        )}

        {parsed1.data && parsed2.data && diffs.length === 0 && (
          <div className="mt-4 p-4 bg-green-50 border-2 border-green-300 rounded-lg text-center">
            <Check className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="text-green-800 font-semibold">No differences found! JSONs are identical.</p>
          </div>
        )}
      </div>
    </div>
  );
}

