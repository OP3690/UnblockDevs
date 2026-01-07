'use client';

import { useState, useEffect } from 'react';
import { Upload, FileText, X, Copy, Check, Download, AlertCircle, CheckCircle, Wrench, Zap, Eye, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';
import Link from 'next/link';

interface JsonError {
  line: number;
  column: number;
  message: string;
  type: 'syntax' | 'parse' | 'structure';
  severity: 'safe-fix' | 'heuristic-fix' | 'non-fixable';
}

export default function JsonFixer() {
  const [jsonText, setJsonText] = useState('');
  const [fixedJson, setFixedJson] = useState('');
  const [errors, setErrors] = useState<JsonError[]>([]);
  const [copied, setCopied] = useState(false);
  const [showErrors, setShowErrors] = useState(true);

  // Detect errors in JSON
  const detectErrors = (text: string): JsonError[] => {
    const errors: JsonError[] = [];
    const lines = text.split('\n');

    // First, check if JSON is parseable
    let isParseable = false;
    try {
      JSON.parse(text);
      isParseable = true;
    } catch {
      isParseable = false;
    }

    // Check for missing closing braces/brackets
    if (!isParseable) {
      const openBraces = (text.match(/{/g) || []).length;
      const closeBraces = (text.match(/}/g) || []).length;
      const openBrackets = (text.match(/\[/g) || []).length;
      const closeBrackets = (text.match(/\]/g) || []).length;

      // Find the last non-empty line (where the error should be reported)
      let lastContentLine = lines.length;
      for (let i = lines.length - 1; i >= 0; i--) {
        if (lines[i].trim().length > 0) {
          lastContentLine = i + 1; // Convert to 1-based line number
          break;
        }
      }
      // Ensure line number is within bounds
      if (lastContentLine === 0 || lastContentLine > lines.length) {
        lastContentLine = Math.max(1, lines.length);
      }

      if (closeBraces < openBraces) {
        const missing = openBraces - closeBraces;
        errors.push({
          line: lastContentLine,
          column: lines[lastContentLine - 1]?.length || 0,
          message: `Missing ${missing} closing brace${missing > 1 ? 's' : ''} (})`,
          type: 'structure',
          severity: 'safe-fix',
        });
      }

      if (closeBrackets < openBrackets) {
        const missing = openBrackets - closeBrackets;
        errors.push({
          line: lastContentLine,
          column: lines[lastContentLine - 1]?.length || 0,
          message: `Missing ${missing} closing bracket${missing > 1 ? 's' : ''} (])`,
          type: 'structure',
          severity: 'safe-fix',
        });
      }
    }

    lines.forEach((line, index) => {
      const lineNum = index + 1;
      const trimmed = line.trim();

      // Check for trailing comma before closing bracket/brace
      if (trimmed.match(/,\s*[}\]],?\s*$/)) {
        errors.push({
          line: lineNum,
          column: line.length - line.trimEnd().length + trimmed.lastIndexOf(',') + 1,
          message: 'Trailing comma before closing bracket/brace',
          type: 'syntax',
          severity: 'safe-fix',
        });
      }

      // Check for single quotes in string values
      const colonIndex = line.indexOf(':');
      if (colonIndex > -1) {
        const valuePart = line.substring(colonIndex + 1).trim();
        const singleQuoteMatch = valuePart.match(/^'([^']*)'(\s*,?\s*)$/);
        if (singleQuoteMatch) {
          errors.push({
            line: lineNum,
            column: colonIndex + 1 + valuePart.indexOf("'") + 1,
            message: 'Single quotes used instead of double quotes',
            type: 'syntax',
            severity: 'safe-fix',
          });
        }
      }

      // Check for missing opening brace after key: (heuristic)
      if (trimmed.match(/^"[^"]+"\s*:\s*$/) && index < lines.length - 1) {
        const nextLine = lines[index + 1].trim();
        if (nextLine.match(/^"[^"]+"\s*:/)) {
          errors.push({
            line: lineNum,
            column: line.length,
            message: 'Missing opening brace { for object',
            type: 'structure',
            severity: 'heuristic-fix',
          });
        }
      }

      // Check for missing comma between properties (heuristic)
      if (trimmed.match(/^"[^"]+"\s*:\s*"[^"]+"\s*$/) && index < lines.length - 1) {
        const nextLine = lines[index + 1].trim();
        if (nextLine.match(/^"[^"]+"\s*:/) && !nextLine.startsWith('}')) {
          errors.push({
            line: lineNum,
            column: line.length,
            message: 'Missing comma after property',
            type: 'syntax',
            severity: 'heuristic-fix',
          });
        }
      }
    });

    return errors;
  };

  // Fix JSON with proper error handling
  const fixJson = (text: string): { fixed: string; errors: JsonError[] } => {
    let fixed = text;
    const detectedErrors = detectErrors(text);

    try {
      // Try parsing first - if valid, return as-is
      JSON.parse(text);
      return { fixed: JSON.stringify(JSON.parse(text), null, 2), errors: [] };
    } catch {
      // Apply fixes in order
      
      // Fix 1: Remove comments
      fixed = fixed.replace(/\/\/.*$/gm, '');
      fixed = fixed.replace(/\/\*[\s\S]*?\*\//g, '');

      // Fix 2: Remove trailing commas
      fixed = fixed.replace(/,(\s*[}\]])/g, '$1');

      // Fix 3: Single quotes to double quotes (only for string values)
      fixed = fixed.replace(/(:\s*)'([^']*)'(\s*[,}])/g, '$1"$2"$3');
      fixed = fixed.replace(/(\[\s*)'([^']*)'(\s*[,,\]])/g, '$1"$2"$3');

      // Fix 4: Add missing opening brace after key: when next line is a key
      const lines = fixed.split('\n');
      const fixedLines: string[] = [];
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const trimmed = line.trim();
        
        // Check if line ends with key: and next line starts with a key
        if (trimmed.match(/^"[^"]+"\s*:\s*$/) && i < lines.length - 1) {
          const nextLine = lines[i + 1].trim();
          if (nextLine.match(/^"[^"]+"\s*:/) && !nextLine.startsWith('}')) {
            // Add opening brace
            fixedLines.push(line + ' {');
            continue;
          }
        }
        fixedLines.push(line);
      }
      fixed = fixedLines.join('\n');

      // Fix 5: Add missing commas between properties
      const lines2 = fixed.split('\n');
      const fixedLines2: string[] = [];
      for (let i = 0; i < lines2.length; i++) {
        const line = lines2[i];
        const trimmed = line.trim();
        
        // Check if line is a property (key: value) without comma and next line is also a property
        if (trimmed.match(/^"[^"]+"\s*:\s*("[^"]+"|\d+|true|false|null)\s*$/) && i < lines2.length - 1) {
          const nextLine = lines2[i + 1].trim();
          if (nextLine.match(/^"[^"]+"\s*:/) && !nextLine.startsWith('}') && !line.trim().endsWith(',')) {
            fixedLines2.push(line + ',');
            continue;
          }
        }
        fixedLines2.push(line);
      }
      fixed = fixedLines2.join('\n');

      // Fix 6: Remove extra closing braces (heuristic - remove if there are too many)
      try {
        const parsed = JSON.parse(fixed);
        fixed = JSON.stringify(parsed, null, 2);
      } catch (e: any) {
        // Count braces and brackets to find extra ones
        const openBraces = (fixed.match(/{/g) || []).length;
        const closeBraces = (fixed.match(/}/g) || []).length;
        const openBrackets = (fixed.match(/\[/g) || []).length;
        const closeBrackets = (fixed.match(/\]/g) || []).length;

        // Remove extra closing braces at the end
        if (closeBraces > openBraces) {
          const extra = closeBraces - openBraces;
          for (let i = 0; i < extra; i++) {
            fixed = fixed.replace(/\}\s*$/, '');
          }
        }
        if (closeBrackets > openBrackets) {
          const extra = closeBrackets - openBrackets;
          for (let i = 0; i < extra; i++) {
            fixed = fixed.replace(/\]\s*$/, '');
          }
        }

        // Try parsing again
        try {
          const parsed = JSON.parse(fixed);
          fixed = JSON.stringify(parsed, null, 2);
        } catch {
          // If still can't parse, return what we have
        }
      }

      // Final validation
      try {
        const parsed = JSON.parse(fixed);
        return { fixed: JSON.stringify(parsed, null, 2), errors: detectedErrors };
      } catch {
        return { fixed: fixed, errors: detectedErrors };
      }
    }
  };

  // Detect and analyze JSON errors
  useEffect(() => {
    if (!jsonText.trim()) {
      setErrors([]);
      setFixedJson('');
      return;
    }

    // Check if original JSON is valid
    let originalIsValid = false;
    try {
      JSON.parse(jsonText);
      originalIsValid = true;
    } catch {
      originalIsValid = false;
    }

    if (originalIsValid) {
      // JSON is already valid
      setErrors([]);
      setFixedJson(JSON.stringify(JSON.parse(jsonText), null, 2));
      return;
    }

    // JSON is invalid, detect errors and try to fix it
    const detectedErrors = detectErrors(jsonText);
    const result = fixJson(jsonText);
    
    // Merge detected errors with any additional errors from fix process
    setErrors(detectedErrors);
    setFixedJson(result.fixed || '');
  }, [jsonText]);

  const handleCopy = () => {
    if (fixedJson) {
      navigator.clipboard.writeText(fixedJson);
      setCopied(true);
      toast.success('Fixed JSON copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    if (fixedJson) {
      const blob = new Blob([fixedJson], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `fixed-json-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      toast.success('Fixed JSON downloaded!');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        setJsonText(content);
        toast.success('JSON file loaded!');
      };
      reader.readAsText(file);
    }
  };

  const getLineErrors = (lineNum: number): JsonError[] => {
    return errors.filter(e => e.line === lineNum);
  };

  // Check if original JSON is valid (before any fixes)
  let originalIsValid = false;
  try {
    if (jsonText.trim()) {
      JSON.parse(jsonText);
      originalIsValid = true;
    }
  } catch {
    originalIsValid = false;
  }

  const isValid = originalIsValid && errors.length === 0 && jsonText.trim() !== '';
  const isFixed = fixedJson !== '' && fixedJson !== jsonText;
  const safeFixErrors = errors.filter(e => e.severity === 'safe-fix').length;
  const heuristicFixErrors = errors.filter(e => e.severity === 'heuristic-fix').length;
  const nonFixableErrors = errors.filter(e => e.severity === 'non-fixable').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 rounded-xl p-6 text-white shadow-lg">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
            <Wrench className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">JSON Fixer & Repair Tool</h2>
            <p className="text-purple-100 text-sm mt-1">
              Fix malformed JSON, repair syntax errors, and validate JSON structure
            </p>
          </div>
        </div>
      </div>

      {/* Upload Section */}
      <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-200">
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Upload JSON File
        </label>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-colors">
            <Upload className="w-4 h-4" />
            <span>Choose File</span>
            <input
              type="file"
              accept=".json,application/json"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
          <span className="text-sm text-gray-500">or paste JSON below</span>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              JSON Input
            </h3>
            <button
              onClick={() => setJsonText('')}
              className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Clear JSON input"
            >
              Clear
            </button>
          </div>
          
          <div className="relative">
            <div className="flex">
              {/* Line numbers */}
              <div className="w-12 bg-gray-50 border-r border-gray-300 rounded-l-lg overflow-y-auto max-h-96 flex-shrink-0">
                {jsonText.split('\n').map((_, index) => {
                  const lineNum = index + 1;
                  const lineErrors = getLineErrors(lineNum);
                  return (
                    <div
                      key={index}
                      className={`h-6 flex items-center justify-end pr-2 text-xs font-mono ${
                        lineErrors.length > 0 ? 'text-red-600 font-bold bg-red-50' : 'text-gray-400'
                      }`}
                    >
                      {lineNum}
                    </div>
                  );
                })}
                {jsonText === '' && (
                  <div className="h-6 flex items-center justify-end pr-2 text-xs text-gray-400 font-mono">
                    1
                  </div>
                )}
              </div>
              <div className="flex-1 relative">
                {/* Background highlight for error lines */}
                <div className="absolute inset-0 pointer-events-none z-0">
                  {jsonText.split('\n').map((_, index) => {
                    const lineNum = index + 1;
                    const lineErrors = getLineErrors(lineNum);
                    if (lineErrors.length > 0) {
                      return (
                        <div
                          key={index}
                          className="absolute left-0 right-0 bg-red-100 border-l-4 border-red-500"
                          style={{
                            top: `${index * 1.5}rem`,
                            height: '1.5rem',
                          }}
                        />
                      );
                    }
                    return null;
                  })}
                </div>
                <textarea
                  value={jsonText}
                  onChange={(e) => setJsonText(e.target.value)}
                  placeholder="Paste your malformed JSON here...&#10;&#10;Example:&#10;{&#10;  name: 'John', // comment&#10;  age: 30,&#10;}"
                  className="relative z-10 w-full h-96 p-4 pl-4 font-mono text-sm border-2 border-l-0 border-gray-300 rounded-r-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none bg-transparent"
                  style={{ lineHeight: '1.5rem' }}
                />
              </div>
            </div>
          </div>

          {/* Error Summary */}
          {errors.length > 0 && (
            <div className="mt-4 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <span className="font-semibold text-red-800">
                  {errors.length} Error{errors.length !== 1 ? 's' : ''} Detected
                </span>
              </div>
              <div className="flex flex-wrap gap-2 text-xs mt-2">
                {safeFixErrors > 0 && (
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded">✓ {safeFixErrors} Safe Fixes</span>
                )}
                {heuristicFixErrors > 0 && (
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded">⚠ {heuristicFixErrors} Heuristic Fixes</span>
                )}
                {nonFixableErrors > 0 && (
                  <span className="px-2 py-1 bg-red-100 text-red-700 rounded">✗ {nonFixableErrors} Non-Fixable</span>
                )}
              </div>
              <button
                onClick={() => setShowErrors(!showErrors)}
                className="text-sm text-red-600 hover:text-red-800 underline mt-2"
              >
                {showErrors ? 'Hide' : 'Show'} Error Details
              </button>
            </div>
          )}

          {isValid && (
            <div className="mt-4 p-4 bg-green-50 border-l-4 border-green-500 rounded-lg">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="font-semibold text-green-800">Valid JSON - No errors found!</span>
              </div>
            </div>
          )}
        </div>

        {/* Output Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <Zap className="w-5 h-5 text-green-600" />
              Fixed JSON Output
            </h3>
            <div className="flex items-center gap-2">
              {isFixed && (
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                  Fixed!
                </span>
              )}
              <button
                onClick={handleCopy}
                disabled={!fixedJson}
                className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                Copy
              </button>
              <button
                onClick={handleDownload}
                disabled={!fixedJson}
                className="px-3 py-1.5 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>
          </div>
          
          <pre className="w-full h-96 p-4 font-mono text-sm bg-gray-900 text-gray-100 rounded-lg overflow-auto border-2 border-gray-700">
            <code>{fixedJson || (jsonText ? 'Fixing JSON...' : 'Fixed JSON will appear here...')}</code>
          </pre>

          {isFixed && (
            <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-lg">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-blue-600" />
                <span className="font-semibold text-blue-800">JSON has been automatically fixed!</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Error Details Panel */}
      {showErrors && errors.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-600" />
              Error Detection & Review
            </h3>
            <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-semibold">
              {errors.length} Error{errors.length !== 1 ? 's' : ''}
            </span>
          </div>
          
          <p className="text-sm text-gray-600 mb-4">
            The tool automatically scans your JSON and identifies all syntax errors with precise locations and descriptions:
          </p>

          <div className="space-y-3">
            {errors.map((error, index) => (
              <div
                key={index}
                className={`p-4 border-l-4 rounded-lg ${
                  error.severity === 'safe-fix'
                    ? 'bg-green-50 border-green-500'
                    : error.severity === 'heuristic-fix'
                    ? 'bg-yellow-50 border-yellow-500'
                    : 'bg-red-50 border-red-500'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-1.5 rounded-lg flex-shrink-0 ${
                    error.severity === 'safe-fix'
                      ? 'bg-green-200'
                      : error.severity === 'heuristic-fix'
                      ? 'bg-yellow-200'
                      : 'bg-red-200'
                  }`}>
                    <AlertCircle className={`w-4 h-4 ${
                      error.severity === 'safe-fix'
                        ? 'text-green-700'
                        : error.severity === 'heuristic-fix'
                        ? 'text-yellow-700'
                        : 'text-red-700'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`font-semibold ${
                        error.severity === 'safe-fix'
                          ? 'text-green-800'
                          : error.severity === 'heuristic-fix'
                          ? 'text-yellow-800'
                          : 'text-red-800'
                      }`}>
                        Line {error.line}, Column {error.column}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                        error.severity === 'safe-fix'
                          ? 'bg-green-200 text-green-700'
                          : error.severity === 'heuristic-fix'
                          ? 'bg-yellow-200 text-yellow-700'
                          : 'bg-red-200 text-red-700'
                      }`}>
                        {error.severity === 'safe-fix' ? 'Safe Fix' : error.severity === 'heuristic-fix' ? 'Heuristic Fix' : 'Non-Fixable'}
                      </span>
                    </div>
                    <p className={`text-sm ${
                      error.severity === 'safe-fix'
                        ? 'text-green-700'
                        : error.severity === 'heuristic-fix'
                        ? 'text-yellow-700'
                        : 'text-red-700'
                    }`}>{error.message}</p>
                    {jsonText.split('\n')[error.line - 1] && (
                      <div className="mt-2 p-2 bg-white rounded border border-gray-200">
                        <code className="text-xs text-gray-800">
                          {jsonText.split('\n')[error.line - 1]}
                        </code>
                        <div className="mt-1 text-xs text-red-600">
                          {' '.repeat(Math.max(0, error.column - 1))}^
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <Eye className="w-4 h-4 text-blue-600" />
                <span className="font-semibold text-blue-800 text-sm">Error Highlighting</span>
              </div>
              <p className="text-xs text-blue-700">
                See exactly where each syntax error occurs in your JSON
              </p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-4 h-4 text-purple-600" />
                <span className="font-semibold text-purple-800 text-sm">Detailed Descriptions</span>
              </div>
              <p className="text-xs text-purple-700">
                Get clear explanations of what's wrong and why it breaks parsing
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="font-semibold text-green-800 text-sm">Line Numbers</span>
              </div>
              <p className="text-xs text-green-700">
                Pinpoint exact locations of errors for easy identification
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Features Section */}
      <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6 border-2 border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4">JSON Fixer Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-gray-800">Automatic Error Detection</h4>
              <p className="text-sm text-gray-600">Scans and identifies all JSON syntax errors automatically</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-gray-800">Smart JSON Repair</h4>
              <p className="text-sm text-gray-600">Fixes common errors like trailing commas, single quotes, and unquoted keys</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-gray-800">Precise Error Location</h4>
              <p className="text-sm text-gray-600">Shows exact line and column numbers for each error</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-gray-800">Visual Error Highlighting</h4>
              <p className="text-sm text-gray-600">Highlights problematic lines with color-coded indicators</p>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Links Section */}
      <div className="mt-12 bg-white rounded-xl shadow-lg p-8 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Learn More About JSON Fixing</h2>
        <div className="space-y-3">
          <Link
            href="/blog/common-json-mistakes-fix-guide"
            className="block p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200 hover:border-purple-400 hover:shadow-md transition-all"
          >
            <h3 className="font-semibold text-gray-900 mb-1">10 Most Common JSON Mistakes Developers Make</h3>
            <p className="text-sm text-gray-600 mb-2">Learn about the most common JSON mistakes and how to fix them instantly with examples.</p>
            <span className="text-purple-600 text-sm font-medium hover:underline">Read Guide →</span>
          </Link>
          <Link
            href="/blog/25-broken-json-examples-fix"
            className="block p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg border border-red-200 hover:border-red-400 hover:shadow-md transition-all"
          >
            <h3 className="font-semibold text-gray-900 mb-1">25 Broken JSON Examples and How to Fix Them</h3>
            <p className="text-sm text-gray-600 mb-2">Real-world broken JSON examples with step-by-step fixes and explanations.</p>
            <span className="text-red-600 text-sm font-medium hover:underline">Read Guide →</span>
          </Link>
          <Link
            href="/blog/why-json-breaks-in-real-world-apis"
            className="block p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 hover:border-blue-400 hover:shadow-md transition-all"
          >
            <h3 className="font-semibold text-gray-900 mb-1">Why JSON Breaks in Real-World APIs</h3>
            <p className="text-sm text-gray-600 mb-2">Understand why APIs return broken JSON in production and how to fix it effectively.</p>
            <span className="text-blue-600 text-sm font-medium hover:underline">Read Guide →</span>
          </Link>
          <Link
            href="/blog/how-json-fixers-work-internally"
            className="block p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200 hover:border-green-400 hover:shadow-md transition-all"
          >
            <h3 className="font-semibold text-gray-900 mb-1">How JSON Fixers Work Internally</h3>
            <p className="text-sm text-gray-600 mb-2">Learn how JSON fixers work internally and why manual fixing often fails.</p>
            <span className="text-green-600 text-sm font-medium hover:underline">Read Guide →</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
