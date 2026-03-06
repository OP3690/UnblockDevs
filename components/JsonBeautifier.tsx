'use client';

import { useState, useRef, useMemo, useEffect } from 'react';
import { Upload, FileText, X, Copy, Check, Download, ChevronRight, ChevronDown, Minus, Search, BarChart3, Code2, Eye, ExternalLink, AlertTriangle, Wrench, Shield, GitCompare, Sparkles, Database, FileCode } from 'lucide-react';
import toast from 'react-hot-toast';
import { validateJson } from '@/lib/jsonParser';
import Link from 'next/link';
import {
  detectJsonErrorsAndFix,
  getDuplicateKeys,
  detectSensitiveInJson,
  pathToJsonPath,
  jsonToTypeScript,
  jsonToSqlTable,
  jsonToModel,
  jsonToJsonSchema,
  analyzeArray,
  removeNoiseFields,
  generateRandomJson,
  type ArrayAnalysis,
  type SensitiveMatch,
} from '@/lib/jsonWorkbench';

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
  const [activeTab, setActiveTab] = useState<'beautified' | 'minified' | 'structure' | 'generate'>('beautified');
  const [highlightNulls, setHighlightNulls] = useState(true);
  const [json2, setJson2] = useState('');
  const [diffMode, setDiffMode] = useState(false);
  const [fixResult, setFixResult] = useState<{ errors: { line: number; message: string }[]; suggestedFix: string } | null>(null);
  const [duplicateKeys, setDuplicateKeys] = useState<string[]>([]);
  const [duplicateKeysExpanded, setDuplicateKeysExpanded] = useState(false);
  const [duplicateKeysCopied, setDuplicateKeysCopied] = useState(false);
  const [sensitiveMatches, setSensitiveMatches] = useState<SensitiveMatch[]>([]);
  const [arrayAnalysis, setArrayAnalysis] = useState<ArrayAnalysis | null>(null);
  const [generatedCode, setGeneratedCode] = useState('');
  const [generateTab, setGenerateTab] = useState<'ts' | 'sql' | 'model' | 'schema'>('ts');
  const [modelLang, setModelLang] = useState<'typescript' | 'python' | 'go' | 'java' | 'csharp'>('typescript');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const resultsSectionRef = useRef<HTMLDivElement>(null);

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
      setFixResult(() => {
        const res = detectJsonErrorsAndFix(jsonString);
        return { errors: res.errors, suggestedFix: res.suggestedFix };
      });
      setDuplicateKeys([]);
      setSensitiveMatches([]);
      setArrayAnalysis(null);
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
      setFixResult(null);

      setDuplicateKeys(getDuplicateKeys(jsonString));
      setSensitiveMatches(detectSensitiveInJson(parsed));
      setArrayAnalysis(Array.isArray(parsed) ? analyzeArray(parsed) : null);

      const structure = buildStructure(parsed);
      setJsonStructure([structure]);

      const stats = calculateStats(parsed);
      setJsonStats(stats);

      toast.success('JSON beautified successfully');
      setTimeout(() => {
        resultsSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } catch (err: any) {
      setError(err.message);
      setBeautifiedJson('');
      setMinifiedJson('');
      setJsonStructure([]);
      setJsonStats(null);
      setFixResult(null);
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
    setFixResult(null);
    setDuplicateKeys([]);
    setSensitiveMatches([]);
    setArrayAnalysis(null);
    setFileName(null);
    setSearchTerm('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const applySuggestedFix = () => {
    if (!fixResult?.suggestedFix) return;
    setJsonText(fixResult.suggestedFix);
    setFixResult(null);
    setError(null);
    beautifyJson(fixResult.suggestedFix, indentSize);
    toast.success('Applied suggested fix');
  };

  const handleRemoveNoiseFields = () => {
    const validation = validateJson(jsonText);
    if (!validation.valid) {
      toast.error('Valid JSON required');
      return;
    }
    const cleaned = removeNoiseFields(validation.data);
    const str = JSON.stringify(cleaned, null, indentSize === 0 ? '\t' : ' '.repeat(indentSize));
    setJsonText(str);
    beautifyJson(str, indentSize);
    toast.success('Noise fields removed');
  };

  const handleGenerateSample = () => {
    const count = 10;
    const sample = generateRandomJson(count);
    const str = JSON.stringify(sample, null, 2);
    setJsonText(str);
    beautifyJson(str, indentSize);
    toast.success(`Generated ${count} sample objects`);
  };

  const copyJsonPath = (path: string) => {
    const jpath = pathToJsonPath(path);
    navigator.clipboard.writeText(jpath);
    toast.success(`Copied ${jpath}`);
  };

  // Update generated code when tab or parsed data changes
  const parsedForGenerate = useMemo(() => {
    if (!beautifiedJson) return null;
    try {
      return JSON.parse(beautifiedJson);
    } catch {
      return null;
    }
  }, [beautifiedJson]);

  useEffect(() => {
    if (!parsedForGenerate || !beautifiedJson) {
      setGeneratedCode('');
      return;
    }
    try {
      if (generateTab === 'ts') setGeneratedCode(jsonToTypeScript(parsedForGenerate, 'Root'));
      else if (generateTab === 'sql') setGeneratedCode(jsonToSqlTable(parsedForGenerate, 'items'));
      else if (generateTab === 'model') setGeneratedCode(jsonToModel(parsedForGenerate, modelLang, 'Model'));
      else if (generateTab === 'schema') setGeneratedCode(JSON.stringify({ $schema: 'http://json-schema.org/draft-07/schema#', ...jsonToJsonSchema(parsedForGenerate) }, null, 2));
    } catch {
      setGeneratedCode('Unable to generate');
    }
  }, [parsedForGenerate, generateTab, modelLang, beautifiedJson]);

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
            {pathToJsonPath(node.path)}
          </span>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); copyJsonPath(node.path); }}
            className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-gray-200 text-gray-500 hover:text-gray-700"
            title={`Copy ${pathToJsonPath(node.path)}`}
            aria-label={`Copy JSONPath ${pathToJsonPath(node.path)}`}
          >
            <Copy className="w-3.5 h-3.5" />
          </button>
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
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Code2 className="w-7 h-7 sm:w-8 sm:h-8 text-primary-600" />
              Developer JSON Workbench
            </h2>
            <p className="text-sm sm:text-base text-gray-500 mt-1.5">Format, validate, fix, explore paths, generate TypeScript &amp; SQL — all in one</p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              type="button"
              onClick={handleGenerateSample}
              className="animate-btn-glow inline-flex items-center gap-2 px-5 py-3 text-sm font-bold text-white bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-600 hover:via-teal-600 hover:to-cyan-600 rounded-xl shadow-lg shadow-emerald-500/40 hover:shadow-xl hover:shadow-emerald-500/50 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 border border-white/20 ring-2 ring-emerald-400/50 hover:ring-emerald-300/60"
            >
              <Sparkles className="w-5 h-5 drop-shadow-sm" />
              Generate sample JSON
            </button>
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
            <label htmlFor="json-beautifier-indent" className="block text-sm font-medium text-gray-700 mb-2">
              Indent Size
            </label>
            <select
              id="json-beautifier-indent"
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
            Paste Your JSON Here:
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

        {fixResult && fixResult.errors.length > 0 && (
          <div className="mb-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <span className="font-semibold text-amber-800">Invalid JSON detected</span>
            </div>
            <ul className="list-disc list-inside text-sm text-amber-800 mb-3">
              {fixResult.errors.map((e, i) => (
                <li key={i}>{e.message}{e.line ? ` (line ${e.line})` : ''}</li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={applySuggestedFix}
                className="inline-flex items-center gap-2 px-3 py-2 bg-amber-600 text-white text-sm font-medium rounded-lg hover:bg-amber-700"
              >
                <Wrench className="w-4 h-4" />
                Apply suggested fix
              </button>
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-2 mb-4">
          {beautifiedJson && (
            <button
              type="button"
              onClick={handleRemoveNoiseFields}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg"
              title="Remove timestamp, request_id, trace_id, session_id, etc."
            >
              Remove noise fields
            </button>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => beautifyJson(jsonText, indentSize)}
            disabled={!jsonText.trim()}
            className="flex-1 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors shadow-md hover:shadow-lg"
          >
            Beautify JSON
          </button>
          <button
            type="button"
            onClick={handleClear}
            disabled={!jsonText.trim() && !beautifiedJson}
            className={`py-3 px-6 rounded-lg font-semibold border-2 transition-colors ${
              beautifiedJson
                ? 'border-primary-500 bg-primary-50 text-primary-700 hover:bg-primary-100 hover:border-primary-600 ring-2 ring-primary-200 ring-offset-2'
                : 'border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400'
            } disabled:bg-gray-100 disabled:border-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed disabled:ring-0 disabled:ring-offset-0`}
          >
            Clear
          </button>
        </div>
      </div>

      {/* Duplicate key warning */}
      {duplicateKeys.length > 0 && (
        <div className="rounded-xl border border-amber-200/80 bg-gradient-to-br from-amber-50 to-orange-50/50 shadow-sm overflow-hidden">
          <div className="flex items-start justify-between gap-4 p-4 sm:p-5">
            <div className="flex items-start gap-3 min-w-0">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-amber-600" aria-hidden />
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold text-amber-900 flex items-center gap-2 flex-wrap">
                  {duplicateKeys.length} duplicate key{duplicateKeys.length !== 1 ? 's' : ''} found
                  <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-amber-200/80 text-amber-800">
                    JSON keeps last value only
                  </span>
                </h3>
                <p className="text-sm text-amber-700/90 mt-1">
                  These keys appear more than once in the same object. <code className="text-amber-800 bg-amber-100/80 px-1 rounded">JSON.parse</code> keeps only the last occurrence — earlier values are lost.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                const list = duplicateKeys.join('\n');
                navigator.clipboard.writeText(list);
                setDuplicateKeysCopied(true);
                toast.success('Key names copied');
                setTimeout(() => setDuplicateKeysCopied(false), 2000);
              }}
              className="flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg bg-amber-100 text-amber-800 hover:bg-amber-200 transition-colors"
            >
              {duplicateKeysCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {duplicateKeysCopied ? 'Copied' : 'Copy keys'}
            </button>
          </div>
          <div className="px-4 sm:px-5 pb-4 pt-0">
            <div className="flex flex-wrap gap-2">
              {(duplicateKeysExpanded ? duplicateKeys : duplicateKeys.slice(0, 12)).map((key) => (
                <span
                  key={key}
                  className="inline-flex items-center px-2.5 py-1 rounded-md text-sm font-mono bg-white/90 border border-amber-200/80 text-amber-900 shadow-sm"
                >
                  {key}
                </span>
              ))}
              {duplicateKeys.length > 12 && (
                <button
                  type="button"
                  onClick={() => setDuplicateKeysExpanded((e) => !e)}
                  className="inline-flex items-center px-2.5 py-1 rounded-md text-sm font-medium text-amber-700 hover:text-amber-800 hover:bg-amber-100/80 transition-colors"
                >
                  {duplicateKeysExpanded ? 'Show less' : `+${duplicateKeys.length - 12} more`}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Sensitive data warning */}
      {sensitiveMatches.length > 0 && (
        <div className="bg-rose-50 border border-rose-200 rounded-lg p-4">
          <div className="flex items-center gap-2 text-rose-800 font-medium mb-2">
            <Shield className="w-5 h-5 flex-shrink-0" />
            Sensitive data found
          </div>
          <ul className="text-sm text-rose-700 space-y-1 mb-3">
            {sensitiveMatches.slice(0, 8).map((m, i) => (
              <li key={i}><span className="font-mono">{m.path}</span>: {m.kind} — {m.value}</li>
            ))}
            {sensitiveMatches.length > 8 && <li>… and {sensitiveMatches.length - 8} more</li>}
          </ul>
          <Link
            href="/ai-schema-masker"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-rose-700 hover:text-rose-800"
          >
            Mask before sending to AI →
          </Link>
        </div>
      )}

      {/* Array analyzer */}
      {arrayAnalysis && (
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
          <h3 className="font-semibold text-slate-800 mb-2">Array analysis</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm">
            <div><span className="text-slate-500">Length</span> <span className="font-medium">{arrayAnalysis.length}</span></div>
            <div><span className="text-slate-500">Common keys</span> <span className="font-medium">{arrayAnalysis.commonKeys.join(', ') || '—'}</span></div>
            <div><span className="text-slate-500">Unique keys</span> <span className="font-medium">{arrayAnalysis.uniqueKeys.length ? arrayAnalysis.uniqueKeys.join(', ') : 'none'}</span></div>
          </div>
        </div>
      )}

      {/* Statistics */}
      {jsonStats && (
        <div ref={resultsSectionRef} className="bg-white rounded-lg shadow-lg p-6 scroll-mt-4">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary-600" />
            JSON key statistics
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600">Keys</div>
              <div className="text-2xl font-bold text-blue-600">{jsonStats.totalKeys}</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600">Values</div>
              <div className="text-2xl font-bold text-green-600">{jsonStats.totalValues}</div>
            </div>
            <div className="bg-indigo-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600">Objects</div>
              <div className="text-2xl font-bold text-indigo-600">{jsonStats.types['object'] ?? 0}</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600">Arrays</div>
              <div className="text-2xl font-bold text-purple-600">{jsonStats.types['array'] ?? 0}</div>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600">Depth / Size</div>
              <div className="text-xl font-bold text-orange-600">{jsonStats.depth} / {(jsonStats.size / 1024).toFixed(2)} KB</div>
            </div>
          </div>
          <div className="mt-4">
            <div className="text-sm font-semibold text-gray-700 mb-2">Data types</div>
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
                <button
                  onClick={() => setActiveTab('generate')}
                  className={`px-4 py-2 font-medium rounded-t-lg transition-colors ${
                    activeTab === 'generate'
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <FileCode className="w-4 h-4 inline mr-1" />
                  Generate
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
                {activeTab === 'generate' && generatedCode && (
                  <button
                    onClick={() => { handleCopy(generatedCode); }}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                    Copy
                  </button>
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
                  <h4 className="font-semibold text-blue-900 mb-2">Click a field → copy JSONPath (e.g. $.user.profile.name)</h4>
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

            {activeTab === 'generate' && (
              <div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {(['ts', 'sql', 'model', 'schema'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setGenerateTab(tab)}
                      className={`px-3 py-1.5 text-sm font-medium rounded-lg ${
                        generateTab === tab ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {tab === 'ts' && 'TypeScript'}
                      {tab === 'sql' && 'SQL table'}
                      {tab === 'model' && 'API model'}
                      {tab === 'schema' && 'JSON Schema'}
                    </button>
                  ))}
                  {generateTab === 'model' && (
                    <select
                      value={modelLang}
                      onChange={(e) => setModelLang(e.target.value as typeof modelLang)}
                      className="ml-2 px-2 py-1.5 border border-gray-300 rounded-lg text-sm"
                    >
                      <option value="typescript">TypeScript</option>
                      <option value="python">Python</option>
                      <option value="go">Go</option>
                      <option value="java">Java</option>
                      <option value="csharp">C#</option>
                    </select>
                  )}
                </div>
                <pre className="bg-gray-50 p-4 rounded-lg border border-gray-200 overflow-x-auto text-sm font-mono whitespace-pre-wrap">
                  <code>{generatedCode || 'Generate by beautifying JSON first.'}</code>
                </pre>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Related tools */}
      <div className="mt-6 flex flex-wrap gap-4 text-sm">
        <Link href="/json-comparator" className="inline-flex items-center gap-1.5 text-primary-600 hover:text-primary-700 font-medium">
          <GitCompare className="w-4 h-4" />
          Compare two JSONs
        </Link>
        <Link href="/ai-schema-masker" className="inline-flex items-center gap-1.5 text-primary-600 hover:text-primary-700 font-medium">
          <Shield className="w-4 h-4" />
          Mask JSON before sending to AI
        </Link>
      </div>

      {/* Blog Links Section - Latest */}
      <div className="mt-12 bg-white rounded-xl shadow-lg p-8 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Latest: AI Safety &amp; Data Masking</h2>
        <div className="space-y-3">
          <Link
            href="/blog/how-to-safely-mask-table-column-names-before-sending-queries-to-ai"
            className="block p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg border border-emerald-200 hover:border-emerald-400 hover:shadow-md transition-all"
          >
            <h3 className="font-semibold text-gray-900 mb-1">How to Safely Mask Table &amp; Column Names Before Sending Queries to AI</h3>
            <p className="text-sm text-gray-600 mb-2">Hide database schema from AI, anonymize identifiers, and restore AI output. Client-side, reversible masking—no data leaves your device.</p>
            <span className="text-emerald-600 text-sm font-medium hover:underline">Read Guide →</span>
          </Link>
          <Link
            href="/blog/how-to-mask-json-payloads-before-sending-to-ai-without-breaking-structure"
            className="block p-4 bg-gradient-to-r from-violet-50 to-indigo-50 rounded-lg border border-violet-200 hover:border-violet-400 hover:shadow-md transition-all"
          >
            <h3 className="font-semibold text-gray-900 mb-1">How to Mask JSON Payloads Before Sending Data to AI (Without Breaking Structure)</h3>
            <p className="text-sm text-gray-600 mb-2">Anonymize API payloads and JSON for AI. Keys and string values masked; numbers unchanged. Preserve structure, restore exactly—client-side only.</p>
            <span className="text-violet-600 text-sm font-medium hover:underline">Read Guide →</span>
          </Link>
          <Link
            href="/blog/how-to-use-ai-for-mysql-without-exposing-database-schema"
            className="block p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border border-amber-200 hover:border-amber-400 hover:shadow-md transition-all"
          >
            <h3 className="font-semibold text-gray-900 mb-1">How to Use AI for MySQL Without Exposing Your Database Schema</h3>
            <p className="text-sm text-gray-600 mb-2">Anonymize MySQL table and column names before ChatGPT or any AI. Reversible, client-side schema abstraction—compliance and security first.</p>
            <span className="text-amber-600 text-sm font-medium hover:underline">Read Guide →</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

