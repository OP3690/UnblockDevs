'use client';

import { useState, useRef, useMemo } from 'react';
import { Upload, FileText, X, Copy, Check, Download, ChevronRight, ChevronDown, Minus, Search, BarChart3, Code2, Eye, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';
import { validateJson } from '@/lib/jsonParser';
import Link from 'next/link';

interface JsonNode {
  key: string;
  value: any;
  type: string;
  path: string;
  children?: JsonNode[];
  expanded?: boolean;
}

interface JsonStats {
  totalKeys: number;
  totalValues: number;
  depth: number;
  types: { [key: string]: number };
  size: number;
}

export default function JsonBeautifier() {
  const [jsonText, setJsonText] = useState('');
  const [beautifiedJson, setBeautifiedJson] = useState('');
  const [minifiedJson, setMinifiedJson] = useState('');
  const [jsonStructure, setJsonStructure] = useState<JsonNode[]>([]);
  const [jsonStats, setJsonStats] = useState<JsonStats | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [indentSize, setIndentSize] = useState(2);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'beautified' | 'minified' | 'structure'>('beautified');
  const [highlightNulls, setHighlightNulls] = useState(true);
  const [json2, setJson2] = useState('');
  const [diffMode, setDiffMode] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getDataType = (value: any): string => {
    if (value === null) return 'null';
    if (Array.isArray(value)) {
      if (value.length === 0) return 'array (empty)';
      const firstType = getDataType(value[0]);
      return `array<${firstType}>`;
    }
    if (typeof value === 'object') {
      return 'object';
    }
    return typeof value;
  };

  const calculateStats = (obj: any, depth: number = 0): JsonStats => {
    const stats: JsonStats = {
      totalKeys: 0,
      totalValues: 0,
      depth: depth,
      types: {},
      size: JSON.stringify(obj).length,
    };

    const traverse = (val: any, currentDepth: number = 0): void => {
      if (Array.isArray(val)) {
        stats.types['array'] = (stats.types['array'] || 0) + 1;
        stats.totalValues += val.length;
        val.forEach((item) => traverse(item, currentDepth + 1));
        stats.depth = Math.max(stats.depth, currentDepth + 1);
      } else if (typeof val === 'object' && val !== null) {
        stats.types['object'] = (stats.types['object'] || 0) + 1;
        stats.totalKeys += Object.keys(val).length;
        Object.values(val).forEach((v) => traverse(v, currentDepth + 1));
        stats.depth = Math.max(stats.depth, currentDepth + 1);
      } else {
        const type = typeof val;
        stats.types[type] = (stats.types[type] || 0) + 1;
        stats.totalValues += 1;
      }
    };

    traverse(obj);
    return stats;
  };

  const buildStructure = (obj: any, path: string = '', key: string = 'root'): JsonNode => {
    const type = getDataType(obj);
    const node: JsonNode = {
      key,
      value: obj,
      type,
      path: path || 'root',
      expanded: path === 'root' || path.split('.').length <= 2,
    };

    if (Array.isArray(obj)) {
      node.children = obj.map((item, index) =>
        buildStructure(item, `${path}[${index}]`, `[${index}]`)
      );
    } else if (typeof obj === 'object' && obj !== null) {
      node.children = Object.keys(obj).map((k) =>
        buildStructure(obj[k], path ? `${path}.${k}` : k, k)
      );
    }

    return node;
  };

  const beautifyJson = (jsonString: string, indent: number = 2) => {
    const validation = validateJson(jsonString);
    if (!validation.valid) {
      setError(validation.error || 'Invalid JSON format');
      setBeautifiedJson('');
      setMinifiedJson('');
      setJsonStructure([]);
      setJsonStats(null);
      toast.error('Invalid JSON format');
      return;
    }

    try {
      const parsed = validation.data;
      const indentStr = indent === 0 ? '\t' : ' '.repeat(indent);
      const beautified = JSON.stringify(parsed, null, indentStr);
      const minified = JSON.stringify(parsed);
      
      setBeautifiedJson(beautified);
      setMinifiedJson(minified);
      setError(null);

      // Build structure tree
      const structure = buildStructure(parsed);
      setJsonStructure([structure]);

      // Calculate statistics
      const stats = calculateStats(parsed);
      setJsonStats(stats);

      toast.success('JSON beautified successfully');
    } catch (err: any) {
      setError(err.message);
      setBeautifiedJson('');
      setMinifiedJson('');
      setJsonStructure([]);
      setJsonStats(null);
      toast.error('Failed to beautify JSON');
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setJsonText(value);
    setError(null);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.json')) {
      toast.error('Please upload a .json file');
      return;
    }

    setFileName(file.name);
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        setJsonText(text);
        setError(null);
        beautifyJson(text, indentSize);
      } catch (err) {
        toast.error('Failed to read file');
      }
    };

    reader.onerror = () => {
      toast.error('Error reading file');
    };

    reader.readAsText(file);
  };

  const handleClear = () => {
    setJsonText('');
    setBeautifiedJson('');
    setMinifiedJson('');
    setJsonStructure([]);
    setJsonStats(null);
    setError(null);
    setFileName(null);
    setSearchTerm('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = (content: string, type: 'beautified' | 'minified') => {
    const blob = new Blob([content], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName 
      ? `${fileName.replace('.json', '')}-${type}.json`
      : `json-${type}-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('File downloaded!');
  };

  const toggleNode = (path: string) => {
    const updateNode = (nodes: JsonNode[]): JsonNode[] => {
      return nodes.map((node) => {
        if (node.path === path) {
          return { ...node, expanded: !node.expanded };
        }
        if (node.children) {
          return { ...node, children: updateNode(node.children) };
        }
        return node;
      });
    };
    setJsonStructure(updateNode(jsonStructure));
  };

  const filterNodes = (nodes: JsonNode[], term: string): JsonNode[] => {
    if (!term) return nodes;
    
    return nodes.filter((node) => {
      const matches = 
        node.key.toLowerCase().includes(term.toLowerCase()) ||
        node.type.toLowerCase().includes(term.toLowerCase()) ||
        node.path.toLowerCase().includes(term.toLowerCase()) ||
        (typeof node.value === 'string' && node.value.toLowerCase().includes(term.toLowerCase()));
      
      if (node.children) {
        const filteredChildren = filterNodes(node.children, term);
        if (filteredChildren.length > 0) return true;
      }
      
      return matches;
    }).map((node) => {
      if (node.children) {
        return {
          ...node,
          children: filterNodes(node.children, term),
          expanded: term ? true : node.expanded,
        };
      }
      return node;
    });
  };

  const filteredStructure = useMemo(() => {
    if (!searchTerm) return jsonStructure;
    return filterNodes(jsonStructure, searchTerm);
  }, [jsonStructure, searchTerm]);

  const renderNode = (node: JsonNode, level: number = 0): JSX.Element | null => {
    const hasChildren = node.children && node.children.length > 0;
    const indent = level * 20;

    return (
      <div key={node.path} className="mb-1">
        <div
          className="flex items-start gap-2 py-1.5 px-2 hover:bg-gray-50 rounded cursor-pointer transition-colors group"
          style={{ paddingLeft: `${indent + 8}px` }}
          onClick={() => hasChildren && toggleNode(node.path)}
        >
          {hasChildren && (
            <span className="mt-0.5 flex-shrink-0">
              {node.expanded ? (
                <ChevronDown className="w-4 h-4 text-gray-500" />
              ) : (
                <ChevronRight className="w-4 h-4 text-gray-500" />
              )}
            </span>
          )}
          {!hasChildren && <span className="w-4 flex-shrink-0" />}
          <span className="font-semibold text-blue-600 flex-shrink-0">{node.key}</span>
          <span className="text-gray-400 flex-shrink-0">:</span>
          <span className="text-purple-600 font-medium text-sm flex-shrink-0">{node.type}</span>
          {!hasChildren && (
            <span className="text-gray-600 ml-2 truncate">
              {typeof node.value === 'string' 
                ? `"${String(node.value).substring(0, 80)}${String(node.value).length > 80 ? '...' : ''}"` 
                : String(node.value).substring(0, 80)}
            </span>
          )}
          <span className="text-xs text-gray-400 ml-2 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
            ({node.path})
          </span>
        </div>
        {hasChildren && node.expanded && (
          <div className="ml-4">
            {node.children!.map((child) => renderNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Code2 className="w-6 h-6 text-primary-600" />
            JSON Beautifier
          </h2>
          <div className="flex items-center gap-2">
            {fileName && (
              <span className="text-sm text-gray-600 flex items-center gap-1">
                <FileText className="w-4 h-4" />
                {fileName}
              </span>
            )}
            <button
              onClick={handleClear}
              className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors"
              title="Clear all"
              aria-label="Clear all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload JSON File
            </label>
            <label className="flex items-center gap-2 px-4 py-2 bg-primary-50 text-primary-700 rounded-lg cursor-pointer hover:bg-primary-100 transition-colors w-fit">
              <Upload className="w-5 h-5" />
              <span className="text-sm font-medium">Choose File</span>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Indent Size
            </label>
            <select
              value={indentSize}
              onChange={(e) => {
                const size = parseInt(e.target.value);
                setIndentSize(size);
                if (jsonText) beautifyJson(jsonText, size);
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="2">2 spaces</option>
              <option value="4">4 spaces</option>
              <option value="0">Tab</option>
            </select>
          </div>
          <div className="flex items-end">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={highlightNulls}
                onChange={(e) => setHighlightNulls(e.target.checked)}
                className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
              />
              <span className="text-sm text-gray-700">Highlight nulls</span>
            </label>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            JSON Text
          </label>
          <div className="relative">
            <textarea
              value={jsonText}
              onChange={handleTextChange}
              placeholder='Paste your JSON here, e.g., {"name": "John", "age": 30}'
              className={`w-full h-48 p-4 border-2 rounded-lg font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary-500 scrollbar-thin ${
                error
                  ? 'border-red-300 focus:ring-red-500'
                  : 'border-gray-300 focus:border-primary-500'
              }`}
            />
            {error && (
              <div className="absolute bottom-2 left-2 right-2 bg-red-50 border border-red-200 rounded p-2">
                <span className="text-sm text-red-700">{error}</span>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={() => beautifyJson(jsonText, indentSize)}
          disabled={!jsonText.trim()}
          className="w-full py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors shadow-md hover:shadow-lg"
        >
          Beautify JSON
        </button>
      </div>

      {/* Statistics */}
      {jsonStats && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary-600" />
            JSON Statistics
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600">Total Keys</div>
              <div className="text-2xl font-bold text-blue-600">{jsonStats.totalKeys}</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600">Total Values</div>
              <div className="text-2xl font-bold text-green-600">{jsonStats.totalValues}</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600">Max Depth</div>
              <div className="text-2xl font-bold text-purple-600">{jsonStats.depth}</div>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600">Size</div>
              <div className="text-2xl font-bold text-orange-600">
                {(jsonStats.size / 1024).toFixed(2)} KB
              </div>
            </div>
          </div>
          <div className="mt-4">
            <div className="text-sm font-semibold text-gray-700 mb-2">Data Types:</div>
            <div className="flex flex-wrap gap-2">
              {Object.entries(jsonStats.types).map(([type, count]) => (
                <span
                  key={type}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                >
                  {type}: {count}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Output Tabs */}
      {(beautifiedJson || minifiedJson || jsonStructure.length > 0) && (
        <div className="bg-white rounded-lg shadow-lg">
          <div className="border-b border-gray-200">
            <div className="flex items-center justify-between px-6 pt-4">
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab('beautified')}
                  className={`px-4 py-2 font-medium rounded-t-lg transition-colors ${
                    activeTab === 'beautified'
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Beautified
                </button>
                <button
                  onClick={() => setActiveTab('minified')}
                  className={`px-4 py-2 font-medium rounded-t-lg transition-colors ${
                    activeTab === 'minified'
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Minus className="w-4 h-4 inline mr-1" />
                  Minified
                </button>
                <button
                  onClick={() => setActiveTab('structure')}
                  className={`px-4 py-2 font-medium rounded-t-lg transition-colors ${
                    activeTab === 'structure'
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Structure
                </button>
              </div>
              <div className="flex gap-2">
                {activeTab === 'beautified' && beautifiedJson && (
                  <>
                    <button
                      onClick={() => handleCopy(beautifiedJson)}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          Copy
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => handleDownload(beautifiedJson, 'beautified')}
                      className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                  </>
                )}
                {activeTab === 'minified' && minifiedJson && (
                  <>
                    <button
                      onClick={() => handleCopy(minifiedJson)}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          Copy
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => handleDownload(minifiedJson, 'minified')}
                      className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="p-6">
            {activeTab === 'beautified' && beautifiedJson && (
              <div>
                {diffMode && (
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Compare with JSON 2</label>
                    <textarea
                      value={json2}
                      onChange={(e) => setJson2(e.target.value)}
                      placeholder="Paste second JSON for comparison..."
                      className="w-full h-32 p-4 border-2 border-gray-300 rounded-lg font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                )}
                <pre className={`bg-gray-50 p-4 rounded-lg border border-gray-200 overflow-x-auto scrollbar-thin text-sm ${highlightNulls ? 'highlight-nulls' : ''}`}>
                  <code className={highlightNulls ? 'json-highlight' : ''}>{beautifiedJson}</code>
                </pre>
              </div>
            )}

            {activeTab === 'minified' && minifiedJson && (
              <pre className="bg-gray-50 p-4 rounded-lg border border-gray-200 overflow-x-auto scrollbar-thin text-sm">
                <code>{minifiedJson}</code>
              </pre>
            )}

            {activeTab === 'structure' && jsonStructure.length > 0 && (
              <div>
                <div className="mb-4">
                  <div className="relative">
                    <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search in structure..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 max-h-[500px] overflow-y-auto scrollbar-thin">
                  <div className="space-y-1">
                    {filteredStructure.map((node) => renderNode(node))}
                  </div>
                </div>
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Legend:</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                    <div><span className="text-purple-600 font-medium">string</span> - Text</div>
                    <div><span className="text-purple-600 font-medium">number</span> - Number</div>
                    <div><span className="text-purple-600 font-medium">boolean</span> - true/false</div>
                    <div><span className="text-purple-600 font-medium">null</span> - Null</div>
                    <div><span className="text-purple-600 font-medium">object</span> - Object</div>
                    <div><span className="text-purple-600 font-medium">array&lt;type&gt;</span> - Array</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Blog Links Section */}
      <div className="mt-12 bg-white rounded-xl shadow-lg p-8 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Learn More About JSON Formatting</h2>
        <div className="space-y-3">
          <Link
            href="/blog/complete-guide-json-viewer-parser-beautifier"
            className="block p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 hover:border-blue-400 hover:shadow-md transition-all"
          >
            <h3 className="font-semibold text-gray-900 mb-1">Complete Guide to JSON Viewer, Parser, and Beautifier Tools</h3>
            <p className="text-sm text-gray-600 mb-2">Comprehensive guide to JSON viewing, parsing, and beautification tools with examples and best practices.</p>
            <span className="text-blue-600 text-sm font-medium hover:underline">Read Guide →</span>
          </Link>
          <Link
            href="/blog/json-format-standards-complete-guide"
            className="block p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200 hover:border-green-400 hover:shadow-md transition-all"
          >
            <h3 className="font-semibold text-gray-900 mb-1">JSON Format & Standards: Complete Guide to RFC 8259</h3>
            <p className="text-sm text-gray-600 mb-2">Learn about JSON format standards, syntax rules, and best practices according to RFC 8259 specification.</p>
            <span className="text-green-600 text-sm font-medium hover:underline">Read Guide →</span>
          </Link>
          <Link
            href="/blog/json-best-practices-production-guide"
            className="block p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200 hover:border-purple-400 hover:shadow-md transition-all"
          >
            <h3 className="font-semibold text-gray-900 mb-1">JSON Best Practices: Production-Ready Guide for Developers</h3>
            <p className="text-sm text-gray-600 mb-2">Production-ready guide covering JSON best practices, formatting standards, and optimization techniques.</p>
            <span className="text-purple-600 text-sm font-medium hover:underline">Read Guide →</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

