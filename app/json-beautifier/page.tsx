'use client';

import { useState, useRef } from 'react';
import { Upload, FileText, X, Copy, Check, Download, ChevronRight, ChevronDown } from 'lucide-react';
import toast from 'react-hot-toast';
import { validateJson } from '@/lib/jsonParser';

interface JsonNode {
  key: string;
  value: any;
  type: string;
  path: string;
  children?: JsonNode[];
  expanded?: boolean;
}

export default function JsonBeautifierPage() {
  const [jsonText, setJsonText] = useState('');
  const [beautifiedJson, setBeautifiedJson] = useState('');
  const [jsonStructure, setJsonStructure] = useState<JsonNode[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
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

  const buildStructure = (obj: any, path: string = '', key: string = 'root'): JsonNode => {
    const type = getDataType(obj);
    const node: JsonNode = {
      key,
      value: obj,
      type,
      path: path || 'root',
      expanded: path === 'root',
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

  const beautifyJson = (jsonString: string) => {
    const validation = validateJson(jsonString);
    if (!validation.valid) {
      setError(validation.error || 'Invalid JSON format');
      setBeautifiedJson('');
      setJsonStructure([]);
      toast.error('Invalid JSON format');
      return;
    }

    try {
      const parsed = validation.data;
      const beautified = JSON.stringify(parsed, null, 2);
      setBeautifiedJson(beautified);
      setError(null);

      // Build structure tree
      const structure = buildStructure(parsed);
      setJsonStructure([structure]);

      toast.success('JSON beautified successfully');
    } catch (err: any) {
      setError(err.message);
      setBeautifiedJson('');
      setJsonStructure([]);
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
        beautifyJson(text);
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
    setJsonStructure([]);
    setError(null);
    setFileName(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleCopy = () => {
    if (beautifiedJson) {
      navigator.clipboard.writeText(beautifiedJson);
      setCopied(true);
      toast.success('Copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    if (beautifiedJson) {
      const blob = new Blob([beautifiedJson], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName || `beautified-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success('File downloaded!');
    }
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

  const renderNode = (node: JsonNode, level: number = 0): JSX.Element => {
    const hasChildren = node.children && node.children.length > 0;
    const indent = level * 20;

    return (
      <div key={node.path} className="mb-1">
        <div
          className="flex items-start gap-2 py-1 px-2 hover:bg-gray-50 rounded cursor-pointer"
          style={{ paddingLeft: `${indent + 8}px` }}
          onClick={() => hasChildren && toggleNode(node.path)}
        >
          {hasChildren && (
            <span className="mt-0.5">
              {node.expanded ? (
                <ChevronDown className="w-4 h-4 text-gray-500" />
              ) : (
                <ChevronRight className="w-4 h-4 text-gray-500" />
              )}
            </span>
          )}
          {!hasChildren && <span className="w-4" />}
          <span className="font-semibold text-blue-600">{node.key}</span>
          <span className="text-gray-400">:</span>
          <span className="text-purple-600 font-medium">{node.type}</span>
          {!hasChildren && (
            <span className="text-gray-600 ml-2">
              {typeof node.value === 'string' ? `"${String(node.value).substring(0, 50)}${String(node.value).length > 50 ? '...' : ''}"` : String(node.value)}
            </span>
          )}
          <span className="text-xs text-gray-400 ml-2">({node.path})</span>
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="w-8 h-8 text-primary-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">JSON Beautifier</h1>
                <p className="text-sm text-gray-600">
                  Beautify JSON and visualize structure with data types
                </p>
              </div>
            </div>
            <a
              href="/"
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
            >
              ← Back to Converter
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Input Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-800">JSON Input</h2>
            <div className="flex gap-2">
              {fileName && (
                <span className="text-sm text-gray-600 flex items-center gap-1">
                  <FileText className="w-4 h-4" />
                  {fileName}
                </span>
              )}
              <button
                onClick={handleClear}
                className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload JSON File
            </label>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 px-4 py-2 bg-primary-50 text-primary-700 rounded-lg cursor-pointer hover:bg-primary-100 transition-colors">
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
              <span className="text-sm text-gray-500">or paste JSON below</span>
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
                className={`w-full h-64 p-4 border-2 rounded-lg font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary-500 scrollbar-thin ${
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
            onClick={() => beautifyJson(jsonText)}
            disabled={!jsonText.trim()}
            className="w-full py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors shadow-md hover:shadow-lg"
          >
            Beautify JSON
          </button>
        </div>

        {/* Beautified JSON Output */}
        {beautifiedJson && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-800">Beautified JSON</h2>
              <div className="flex gap-2">
                <button
                  onClick={handleCopy}
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
                  onClick={handleDownload}
                  className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download
                </button>
              </div>
            </div>
            <pre className="bg-gray-50 p-4 rounded-lg border border-gray-200 overflow-x-auto scrollbar-thin text-sm">
              <code>{beautifiedJson}</code>
            </pre>
          </div>
        )}

        {/* Structure Visualization */}
        {jsonStructure.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">JSON Structure & Data Types</h2>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 max-h-[600px] overflow-y-auto scrollbar-thin">
              <div className="space-y-1">
                {jsonStructure.map((node) => renderNode(node))}
              </div>
            </div>
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">Legend:</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                <div><span className="text-purple-600 font-medium">string</span> - Text value</div>
                <div><span className="text-purple-600 font-medium">number</span> - Numeric value</div>
                <div><span className="text-purple-600 font-medium">boolean</span> - true/false</div>
                <div><span className="text-purple-600 font-medium">null</span> - Null value</div>
                <div><span className="text-purple-600 font-medium">object</span> - JSON object</div>
                <div><span className="text-purple-600 font-medium">array&lt;type&gt;</span> - Array of type</div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

