'use client';

import { useState, useRef, useMemo, useEffect } from 'react';
import { Upload, FileText, X, Copy, Check, Download, ChevronRight, ChevronDown, Minus, Search, BarChart3, Code2, Eye, ExternalLink, AlertTriangle, Wrench, Shield, GitCompare, Sparkles, Database, FileCode } from 'lucide-react';
import toast from 'react-hot-toast';
import { validateJson } from '@/lib/jsonParser';
import { trackCopy, trackCtaClick } from '@/lib/analytics';
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
    trackCtaClick('json_beautifier', 'fix_json');
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
    trackCtaClick('json_beautifier', 'load_sample');
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
    trackCopy('json_beautifier');
    setCopied(true);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = (content: string, type: 'beautified' | 'minified') => {
    trackCtaClick('json_beautifier', 'download');
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
          <span className="font-semibold text-emerald-800 flex-shrink-0">{node.key}</span>
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
      <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 flex items-center gap-3">
              <Code2 className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-700" />
              Developer JSON Workbench
            </h2>
            <p className="text-sm sm:text-base text-zinc-500 mt-1.5">Format, validate, fix, explore paths, generate TypeScript &amp; SQL — all in one</p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              type="button"
              onClick={handleGenerateSample}
              className="generate-sample-json-btn inline-flex items-center gap-2 rounded-lg bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-800 focus-visible:outline focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
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
              type="button"
              onClick={handleClear}
              className="cta-icon-close px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors"
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
            <label className="flex w-fit cursor-pointer items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-2 text-zinc-800 transition-colors hover:bg-zinc-100">
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
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600"
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
                className="h-4 w-4 rounded text-emerald-700 focus:ring-emerald-600"
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
              className={`scrollbar-thin h-48 w-full resize-none rounded-lg border-2 p-4 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 ${
                error
                  ? 'border-red-300 focus:ring-red-500'
                  : 'border-zinc-300 focus:border-emerald-600'
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
            type="button"
            onClick={() => { trackCtaClick('json_beautifier', 'format'); beautifyJson(jsonText, indentSize); }}
            disabled={!jsonText.trim()}
            className="flex-1 rounded-lg bg-zinc-900 py-3 font-semibold text-white shadow-sm transition-colors hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-300"
          >
            Beautify JSON
          </button>
          <button
            type="button"
            onClick={handleClear}
            disabled={!jsonText.trim() && !beautifiedJson}
            className={`rounded-lg border-2 px-6 py-3 font-semibold transition-colors ${
              beautifiedJson
                ? 'border-zinc-600 bg-zinc-50 text-zinc-900 ring-2 ring-zinc-200 ring-offset-2 hover:border-zinc-700 hover:bg-zinc-100'
                : 'border-zinc-300 text-zinc-700 hover:border-zinc-400 hover:bg-zinc-50'
            } disabled:cursor-not-allowed disabled:border-zinc-200 disabled:bg-zinc-100 disabled:text-zinc-400 disabled:ring-0 disabled:ring-offset-0`}
          >
            Clear
          </button>
        </div>
      </div>

      {/* Duplicate key warning */}
      {duplicateKeys.length > 0 && (
        <div className="overflow-hidden rounded-xl border border-amber-200 bg-amber-50/80 shadow-sm">
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
        <div ref={resultsSectionRef} className="scroll-mt-4 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-zinc-900">
            <BarChart3 className="h-5 w-5 text-emerald-700" />
            JSON key statistics
          </h3>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <div className="text-sm text-zinc-600">Keys</div>
              <div className="text-2xl font-bold text-emerald-800">{jsonStats.totalKeys}</div>
            </div>
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <div className="text-sm text-zinc-600">Values</div>
              <div className="text-2xl font-bold text-emerald-800">{jsonStats.totalValues}</div>
            </div>
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <div className="text-sm text-zinc-600">Objects</div>
              <div className="text-2xl font-bold text-emerald-800">{jsonStats.types['object'] ?? 0}</div>
            </div>
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <div className="text-sm text-zinc-600">Arrays</div>
              <div className="text-2xl font-bold text-emerald-800">{jsonStats.types['array'] ?? 0}</div>
            </div>
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <div className="text-sm text-zinc-600">Depth / Size</div>
              <div className="text-xl font-bold text-zinc-900">{jsonStats.depth} / {(jsonStats.size / 1024).toFixed(2)} KB</div>
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
        <div className="rounded-xl border border-zinc-200 bg-white shadow-sm">
          <div className="border-b border-zinc-200">
            <div className="flex items-center justify-between px-6 pt-4">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('beautified')}
                  className={`rounded-t-lg px-4 py-2 font-medium transition-colors ${
                    activeTab === 'beautified'
                      ? 'bg-zinc-900 text-white'
                      : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
                  }`}
                >
                  Beautified
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('minified')}
                  className={`rounded-t-lg px-4 py-2 font-medium transition-colors ${
                    activeTab === 'minified'
                      ? 'bg-zinc-900 text-white'
                      : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
                  }`}
                >
                  <Minus className="w-4 h-4 inline mr-1" />
                  Minified
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('structure')}
                  className={`rounded-t-lg px-4 py-2 font-medium transition-colors ${
                    activeTab === 'structure'
                      ? 'bg-zinc-900 text-white'
                      : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
                  }`}
                >
                  Structure
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('generate')}
                  className={`rounded-t-lg px-4 py-2 font-medium transition-colors ${
                    activeTab === 'generate'
                      ? 'bg-zinc-900 text-white'
                      : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
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
                      type="button"
                      onClick={() => handleCopy(beautifiedJson)}
                      className="flex items-center gap-2 rounded-lg bg-zinc-100 px-4 py-2 text-zinc-700 transition-colors hover:bg-zinc-200"
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
                      type="button"
                      onClick={() => handleDownload(beautifiedJson, 'beautified')}
                      className="flex items-center gap-2 rounded-lg bg-zinc-900 px-4 py-2 text-white transition-colors hover:bg-zinc-800"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                  </>
                )}
                {activeTab === 'minified' && minifiedJson && (
                  <>
                    <button
                      type="button"
                      onClick={() => handleCopy(minifiedJson)}
                      className="flex items-center gap-2 rounded-lg bg-zinc-100 px-4 py-2 text-zinc-700 transition-colors hover:bg-zinc-200"
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
                      type="button"
                      onClick={() => handleDownload(minifiedJson, 'minified')}
                      className="flex items-center gap-2 rounded-lg bg-zinc-900 px-4 py-2 text-white transition-colors hover:bg-zinc-800"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                  </>
                )}
                {activeTab === 'generate' && generatedCode && (
                  <button
                    type="button"
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
                      className="h-32 w-full resize-none rounded-lg border-2 border-zinc-300 p-4 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
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
                      className="w-full rounded-lg border border-zinc-300 py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    />
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 max-h-[500px] overflow-y-auto scrollbar-thin">
                  <div className="space-y-1">
                    {filteredStructure.map((node) => renderNode(node))}
                  </div>
                </div>
                <div className="mt-4 rounded-lg border border-zinc-200 bg-zinc-50 p-4">
                  <h4 className="mb-2 font-semibold text-zinc-900">Click a field → copy JSONPath (e.g. $.user.profile.name)</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm md:grid-cols-3">
                    <div><span className="font-medium text-emerald-800">string</span> - Text</div>
                    <div><span className="font-medium text-emerald-800">number</span> - Number</div>
                    <div><span className="font-medium text-emerald-800">boolean</span> - true/false</div>
                    <div><span className="font-medium text-emerald-800">null</span> - Null</div>
                    <div><span className="font-medium text-emerald-800">object</span> - Object</div>
                    <div><span className="font-medium text-emerald-800">array&lt;type&gt;</span> - Array</div>
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
                      type="button"
                      onClick={() => setGenerateTab(tab)}
                      className={`px-3 py-1.5 text-sm font-medium rounded-lg ${
                        generateTab === tab ? 'bg-zinc-900 text-white' : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
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
        <Link href="/json-comparator" className="inline-flex items-center gap-1.5 font-medium text-emerald-800 hover:text-emerald-950">
          <GitCompare className="h-4 w-4" />
          Compare two JSONs
        </Link>
        <Link href="/ai-schema-masker" className="inline-flex items-center gap-1.5 font-medium text-emerald-800 hover:text-emerald-950">
          <Shield className="w-4 h-4" />
          Mask JSON before sending to AI
        </Link>
      </div>

      {/* Blog Links Section - Latest */}
      <div className="mt-8 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="mb-4 text-2xl font-bold text-zinc-900">Latest: AI Safety &amp; Data Masking</h2>
        <div className="space-y-3">
          <Link
            href="/blog/how-to-safely-mask-table-column-names-before-sending-queries-to-ai"
            className="block rounded-lg border border-zinc-200 bg-zinc-50/80 p-4 transition-all hover:border-emerald-300 hover:bg-white"
          >
            <h3 className="mb-1 font-semibold text-zinc-900">How to Safely Mask Table &amp; Column Names Before Sending Queries to AI</h3>
            <p className="mb-2 text-sm text-zinc-600">Hide database schema from AI, anonymize identifiers, and restore AI output. Client-side, reversible masking—no data leaves your device.</p>
            <span className="text-sm font-medium text-emerald-800 hover:underline">Read Guide →</span>
          </Link>
          <Link
            href="/blog/how-to-mask-json-payloads-before-sending-to-ai-without-breaking-structure"
            className="block rounded-lg border border-zinc-200 bg-zinc-50/80 p-4 transition-all hover:border-emerald-300 hover:bg-white"
          >
            <h3 className="mb-1 font-semibold text-zinc-900">How to Mask JSON Payloads Before Sending Data to AI (Without Breaking Structure)</h3>
            <p className="mb-2 text-sm text-zinc-600">Anonymize API payloads and JSON for AI. Keys and string values masked; numbers unchanged. Preserve structure, restore exactly—client-side only.</p>
            <span className="text-sm font-medium text-emerald-800 hover:underline">Read Guide →</span>
          </Link>
          <Link
            href="/blog/how-to-use-ai-for-mysql-without-exposing-database-schema"
            className="block rounded-lg border border-zinc-200 bg-zinc-50/80 p-4 transition-all hover:border-emerald-300 hover:bg-white"
          >
            <h3 className="mb-1 font-semibold text-zinc-900">How to Use AI for MySQL Without Exposing Your Database Schema</h3>
            <p className="mb-2 text-sm text-zinc-600">Anonymize MySQL table and column names before ChatGPT or any AI. Reversible, client-side schema abstraction—compliance and security first.</p>
            <span className="text-sm font-medium text-emerald-800 hover:underline">Read Guide →</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

