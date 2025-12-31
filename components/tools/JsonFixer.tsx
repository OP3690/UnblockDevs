'use client';

import { useState, useMemo } from 'react';
import { Upload, FileText, X, Copy, Check, Download, AlertCircle, CheckCircle, Wrench, Zap, Eye } from 'lucide-react';
import toast from 'react-hot-toast';

interface JsonError {
  line: number;
  column: number;
  message: string;
  type: 'syntax' | 'parse' | 'structure';
}

export default function JsonFixer() {
  const [jsonText, setJsonText] = useState('');
  const [fixedJson, setFixedJson] = useState('');
  const [errors, setErrors] = useState<JsonError[]>([]);
  const [copied, setCopied] = useState(false);
  const [showErrors, setShowErrors] = useState(true);

  // Detect and analyze JSON errors
  const analyzeJson = useMemo(() => {
    if (!jsonText.trim()) {
      setErrors([]);
      setFixedJson('');
      return;
    }

    const detectedErrors: JsonError[] = [];
    let fixed = jsonText;
    const lines = jsonText.split('\n');

    try {
      // Try to parse JSON
      JSON.parse(jsonText);
      // If successful, no errors
      setErrors([]);
      setFixedJson(jsonText);
      return;
    } catch (e: any) {
      const errorMessage = e.message || '';
      
      // Extract line number from error message
      const lineMatch = errorMessage.match(/position (\d+)/);
      let errorPosition = lineMatch ? parseInt(lineMatch[1]) : 0;
      
      // Calculate line and column
      let currentPos = 0;
      let errorLine = 1;
      let errorColumn = 1;
      
      for (let i = 0; i < lines.length; i++) {
        const lineLength = lines[i].length + 1; // +1 for newline
        if (currentPos + lineLength > errorPosition) {
          errorLine = i + 1;
          errorColumn = errorPosition - currentPos + 1;
          break;
        }
        currentPos += lineLength;
      }

      detectedErrors.push({
        line: errorLine,
        column: errorColumn,
        message: errorMessage.replace(/JSON\.parse: /g, '').replace(/position \d+.*/, '').trim() || 'Invalid JSON syntax',
        type: 'syntax',
      });

      // Attempt to fix common JSON errors
      fixed = attemptFix(jsonText, detectedErrors);
    }

    // Additional error detection
    detectCommonErrors(jsonText, detectedErrors);

    setErrors(detectedErrors);
    
    // Try to parse fixed JSON
    try {
      JSON.parse(fixed);
      setFixedJson(fixed);
    } catch {
      setFixedJson('');
    }
  }, [jsonText]);

  // Attempt to fix common JSON errors
  const attemptFix = (text: string, errors: JsonError[]): string => {
    let fixed = text;

    // Fix 1: Trailing commas
    fixed = fixed.replace(/,(\s*[}\]])/g, '$1');

    // Fix 2: Single quotes to double quotes
    fixed = fixed.replace(/'/g, '"');

    // Fix 3: Unquoted keys
    fixed = fixed.replace(/([{,]\s*)([a-zA-Z_$][a-zA-Z0-9_$]*)\s*:/g, '$1"$2":');

    // Fix 4: Comments (remove single-line and multi-line comments)
    fixed = fixed.replace(/\/\/.*$/gm, ''); // Single-line comments
    fixed = fixed.replace(/\/\*[\s\S]*?\*\//g, ''); // Multi-line comments

    // Fix 5: Trailing commas in arrays
    fixed = fixed.replace(/,(\s*\])/g, '$1');

    // Fix 6: Missing quotes around string values (basic)
    // This is more complex, so we'll be conservative

    // Fix 7: Replace undefined/null with null
    fixed = fixed.replace(/\bundefined\b/g, 'null');

    // Fix 8: Remove BOM
    fixed = fixed.replace(/^\uFEFF/, '');

    // Fix 9: Fix escaped quotes
    fixed = fixed.replace(/\\'/g, "'");

    return fixed;
  };

  // Detect common JSON errors
  const detectCommonErrors = (text: string, errors: JsonError[]): void => {
    const lines = text.split('\n');

    lines.forEach((line, index) => {
      const lineNum = index + 1;

      // Check for trailing commas
      if (line.match(/,\s*[}\]],?\s*$/)) {
        errors.push({
          line: lineNum,
          column: line.length,
          message: 'Trailing comma before closing bracket/brace',
          type: 'syntax',
        });
      }

      // Check for single quotes
      if (line.match(/[']/) && !line.match(/['].*[']/)) {
        errors.push({
          line: lineNum,
          column: line.indexOf("'") + 1,
          message: 'Single quotes used instead of double quotes',
          type: 'syntax',
        });
      }

      // Check for unquoted keys
      if (line.match(/[{,]\s*[a-zA-Z_$][a-zA-Z0-9_$]*\s*:/) && !line.match(/["'][a-zA-Z_$][a-zA-Z0-9_$]*["']\s*:/)) {
        errors.push({
          line: lineNum,
          column: 1,
          message: 'Unquoted object key',
          type: 'syntax',
        });
      }

      // Check for comments
      if (line.match(/\/\//) || line.match(/\/\*/)) {
        errors.push({
          line: lineNum,
          column: line.indexOf('//') > -1 ? line.indexOf('//') + 1 : line.indexOf('/*') + 1,
          message: 'Comments are not allowed in JSON',
          type: 'syntax',
        });
      }
    });
  };

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

  const getLineClass = (lineNum: number): string => {
    const lineErrors = errors.filter(e => e.line === lineNum);
    if (lineErrors.length > 0) {
      return 'bg-red-50 border-l-4 border-red-500';
    }
    return '';
  };

  const getLineErrors = (lineNum: number): JsonError[] => {
    return errors.filter(e => e.line === lineNum);
  };

  const isValid = errors.length === 0 && jsonText.trim() !== '';
  const isFixed = fixedJson !== '' && fixedJson !== jsonText;

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
              <textarea
                value={jsonText}
                onChange={(e) => setJsonText(e.target.value)}
                placeholder="Paste your malformed JSON here...&#10;&#10;Example:&#10;{&#10;  name: 'John', // comment&#10;  age: 30,&#10;}"
                className="flex-1 h-96 p-4 pl-4 font-mono text-sm border-2 border-l-0 border-gray-300 rounded-r-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                style={{ lineHeight: '1.5rem' }}
              />
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
              <button
                onClick={() => setShowErrors(!showErrors)}
                className="text-sm text-red-600 hover:text-red-800 underline"
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
                className="p-4 bg-red-50 border-l-4 border-red-500 rounded-lg hover:bg-red-100 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="p-1.5 bg-red-200 rounded-lg flex-shrink-0">
                    <AlertCircle className="w-4 h-4 text-red-700" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-red-800">
                        Line {error.line}, Column {error.column}
                      </span>
                      <span className="px-2 py-0.5 bg-red-200 text-red-700 rounded text-xs font-medium">
                        {error.type}
                      </span>
                    </div>
                    <p className="text-sm text-red-700">{error.message}</p>
                    {jsonText.split('\n')[error.line - 1] && (
                      <div className="mt-2 p-2 bg-white rounded border border-red-200">
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
    </div>
  );
}

