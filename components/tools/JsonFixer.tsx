'use client';

import { useState, useEffect } from 'react';
import { Upload, FileText, X, Copy, Check, Download, AlertCircle, CheckCircle, Wrench, Zap, Eye } from 'lucide-react';
import toast from 'react-hot-toast';

interface JsonError {
  line: number;
  column: number;
  message: string;
  type: 'syntax' | 'parse' | 'structure';
  severity: 'safe-fix' | 'heuristic-fix' | 'non-fixable';
}

interface Token {
  type: 'LBRACE' | 'RBRACE' | 'LBRACKET' | 'RBRACKET' | 'COMMA' | 'COLON' | 'STRING' | 'NUMBER' | 'BOOLEAN' | 'NULL' | 'INVALID';
  value: string;
  position: number;
  line: number;
  column: number;
}

export default function JsonFixer() {
  const [jsonText, setJsonText] = useState('');
  const [fixedJson, setFixedJson] = useState('');
  const [errors, setErrors] = useState<JsonError[]>([]);
  const [copied, setCopied] = useState(false);
  const [showErrors, setShowErrors] = useState(true);

  // Tokenize JSON input
  const tokenize = (input: string): Token[] => {
    const tokens: Token[] = [];
    let position = 0;
    let line = 1;
    let column = 1;
    const lines = input.split('\n');

    const updatePosition = (char: string) => {
      if (char === '\n') {
        line++;
        column = 1;
      } else {
        column++;
      }
      position++;
    };

    const skipWhitespace = () => {
      while (position < input.length && /\s/.test(input[position])) {
        updatePosition(input[position]);
      }
    };

    const readString = (): Token | null => {
      const startPos = position;
      const startLine = line;
      const startCol = column;
      const quote = input[position];
      
      if (quote !== '"' && quote !== "'") return null;
      
      updatePosition(input[position]);
      let value = '';
      let escaped = false;

      while (position < input.length) {
        const char = input[position];
        
        if (escaped) {
          if (char === 'u' && position + 4 < input.length) {
            // Unicode escape
            value += char + input[position + 1] + input[position + 2] + input[position + 3] + input[position + 4];
            for (let i = 0; i < 5; i++) {
              updatePosition(input[position]);
            }
            escaped = false;
            continue;
          }
          // Valid escape sequences: \" \\ \/ \b \f \n \r \t
          if (['"', '\\', '/', 'b', 'f', 'n', 'r', 't'].includes(char)) {
            value += '\\' + char;
            updatePosition(input[position]);
            escaped = false;
            continue;
          }
          escaped = false;
        }

        if (char === '\\') {
          escaped = true;
          updatePosition(input[position]);
          continue;
        }

        if (char === quote) {
          updatePosition(input[position]);
          return {
            type: 'STRING',
            value: quote === "'" ? `"${value}"` : `"${value}"`, // Normalize to double quotes
            position: startPos,
            line: startLine,
            column: startCol,
          };
        }

        if (char === '\n' && !escaped) {
          // Unescaped newline in string
          return {
            type: 'INVALID',
            value: `Unescaped newline in string`,
            position: startPos,
            line: startLine,
            column: startCol,
          };
        }

        value += char;
        updatePosition(input[position]);
      }

      return {
        type: 'INVALID',
        value: 'Unclosed string',
        position: startPos,
        line: startLine,
        column: startCol,
      };
    };

    const readNumber = (): Token | null => {
      const startPos = position;
      const startLine = line;
      const startCol = column;
      let value = '';
      let hasDot = false;
      let hasExp = false;

      while (position < input.length) {
        const char = input[position];
        
        if (char >= '0' && char <= '9') {
          value += char;
          updatePosition(input[position]);
        } else if (char === '.' && !hasDot && !hasExp) {
          value += char;
          hasDot = true;
          updatePosition(input[position]);
        } else if ((char === 'e' || char === 'E') && !hasExp) {
          value += char;
          hasExp = true;
          updatePosition(input[position]);
          if (position < input.length && (input[position] === '+' || input[position] === '-')) {
            value += input[position];
            updatePosition(input[position]);
          }
        } else {
          break;
        }
      }

      if (value.length === 0) return null;

      // Validate number
      if (value.startsWith('0') && value.length > 1 && value[1] !== '.') {
        // Leading zero
        return {
          type: 'NUMBER',
          value: value.replace(/^0+/, '') || '0',
          position: startPos,
          line: startLine,
          column: startCol,
        };
      }

      if (value.endsWith('.')) {
        value += '0';
      }

      if (value === 'NaN' || value === 'Infinity' || value === '-Infinity') {
        return {
          type: 'NULL',
          value: 'null',
          position: startPos,
          line: startLine,
          column: startCol,
        };
      }

      return {
        type: 'NUMBER',
        value,
        position: startPos,
        line: startLine,
        column: startCol,
      };
    };

    const readKeyword = (): Token | null => {
      const keywords = {
        'true': 'BOOLEAN',
        'false': 'BOOLEAN',
        'null': 'NULL',
        'True': 'BOOLEAN',
        'False': 'BOOLEAN',
        'None': 'NULL',
        'TRUE': 'BOOLEAN',
        'FALSE': 'BOOLEAN',
      };

      for (const [keyword, type] of Object.entries(keywords)) {
        if (input.substring(position, position + keyword.length) === keyword) {
          const nextChar = input[position + keyword.length];
          if (!nextChar || !/[a-zA-Z0-9_]/.test(nextChar)) {
            const startPos = position;
            const startLine = line;
            const startCol = column;
            for (let i = 0; i < keyword.length; i++) {
              updatePosition(input[position]);
            }
            return {
              type: type as 'BOOLEAN' | 'NULL',
              value: keyword.toLowerCase() === 'none' ? 'null' : keyword.toLowerCase(),
              position: startPos,
              line: startLine,
              column: startCol,
            };
          }
        }
      }

      return null;
    };

    while (position < input.length) {
      skipWhitespace();
      if (position >= input.length) break;

      const char = input[position];
      const startLine = line;
      const startCol = column;

      switch (char) {
        case '{':
          tokens.push({ type: 'LBRACE', value: char, position, line: startLine, column: startCol });
          updatePosition(char);
          break;
        case '}':
          tokens.push({ type: 'RBRACE', value: char, position, line: startLine, column: startCol });
          updatePosition(char);
          break;
        case '[':
          tokens.push({ type: 'LBRACKET', value: char, position, line: startLine, column: startCol });
          updatePosition(char);
          break;
        case ']':
          tokens.push({ type: 'RBRACKET', value: char, position, line: startLine, column: startCol });
          updatePosition(char);
          break;
        case ',':
          tokens.push({ type: 'COMMA', value: char, position, line: startLine, column: startCol });
          updatePosition(char);
          break;
        case ':':
          tokens.push({ type: 'COLON', value: char, position, line: startLine, column: startCol });
          updatePosition(char);
          break;
        case '"':
        case "'":
          const stringToken = readString();
          if (stringToken) tokens.push(stringToken);
          break;
        default:
          if (char >= '0' && char <= '9' || char === '-' || char === '+') {
            const numToken = readNumber();
            if (numToken) {
              tokens.push(numToken);
              break;
            }
          }
          
          const keywordToken = readKeyword();
          if (keywordToken) {
            tokens.push(keywordToken);
            break;
          }

          // Invalid character
          tokens.push({
            type: 'INVALID',
            value: `Unexpected character: ${char}`,
            position,
            line: startLine,
            column: startCol,
          });
          updatePosition(char);
      }
    }

    return tokens;
  };

  // Parse tokens and detect errors
  const parseAndDetectErrors = (tokens: Token[], originalText: string): { errors: JsonError[]; fixedTokens: Token[] } => {
    const errors: JsonError[] = [];
    const fixedTokens: Token[] = [];
    const stack: Array<'object' | 'array'> = [];
    let i = 0;
    let expectingKey = false;
    let expectingValue = false;
    let expectingComma = false;
    let inObject = false;
    let inArray = false;

    const addError = (token: Token, message: string, severity: JsonError['severity'] = 'safe-fix') => {
      errors.push({
        line: token.line,
        column: token.column,
        message,
        type: 'syntax',
        severity,
      });
    };

    // Check for top-level structure
    if (tokens.length === 0) {
      errors.push({
        line: 1,
        column: 1,
        message: 'Empty JSON - must be an object or array',
        type: 'structure',
        severity: 'heuristic-fix',
      });
      return { errors, fixedTokens: [{ type: 'LBRACE', value: '{', position: 0, line: 1, column: 1 }, { type: 'RBRACE', value: '}', position: 1, line: 1, column: 2 }] };
    }

    // First token must be { or [
    if (tokens[0].type !== 'LBRACE' && tokens[0].type !== 'LBRACKET') {
      addError(tokens[0], 'JSON must start with { or [', 'heuristic-fix');
      fixedTokens.push({ type: 'LBRACE', value: '{', position: 0, line: tokens[0].line, column: tokens[0].column });
    }

    while (i < tokens.length) {
      const token = tokens[i];
      const prevToken = fixedTokens[fixedTokens.length - 1];

      // Handle invalid tokens
      if (token.type === 'INVALID') {
        addError(token, token.value, 'non-fixable');
        i++;
        continue;
      }

      // Handle structure tokens
      if (token.type === 'LBRACE') {
        if (expectingValue || !inObject && !inArray && fixedTokens.length === 0) {
          fixedTokens.push(token);
          stack.push('object');
          inObject = true;
          expectingKey = true;
          expectingValue = false;
          expectingComma = false;
        } else if (expectingComma) {
          addError(token, 'Missing comma before object', 'heuristic-fix');
          fixedTokens.push({ type: 'COMMA', value: ',', position: token.position, line: token.line, column: token.column });
          fixedTokens.push(token);
          stack.push('object');
          inObject = true;
          expectingKey = true;
          expectingComma = false;
        } else {
          addError(token, 'Unexpected object start', 'non-fixable');
        }
        i++;
        continue;
      }

      if (token.type === 'RBRACE') {
        if (inObject) {
          // Check for trailing comma
          if (prevToken && prevToken.type === 'COMMA') {
            fixedTokens.pop(); // Remove trailing comma
            addError(token, 'Trailing comma removed', 'safe-fix');
          }
          fixedTokens.push(token);
          stack.pop();
          inObject = stack[stack.length - 1] === 'object';
          inArray = stack[stack.length - 1] === 'array';
          expectingComma = stack.length > 0;
          expectingKey = false;
          expectingValue = false;
        } else {
          addError(token, 'Unmatched closing brace', 'heuristic-fix');
        }
        i++;
        continue;
      }

      if (token.type === 'LBRACKET') {
        if (expectingValue || !inObject && !inArray && fixedTokens.length === 0) {
          fixedTokens.push(token);
          stack.push('array');
          inArray = true;
          expectingValue = true;
          expectingKey = false;
          expectingComma = false;
        } else if (expectingComma) {
          addError(token, 'Missing comma before array', 'heuristic-fix');
          fixedTokens.push({ type: 'COMMA', value: ',', position: token.position, line: token.line, column: token.column });
          fixedTokens.push(token);
          stack.push('array');
          inArray = true;
          expectingValue = true;
          expectingComma = false;
        } else {
          addError(token, 'Unexpected array start', 'non-fixable');
        }
        i++;
        continue;
      }

      if (token.type === 'RBRACKET') {
        if (inArray) {
          // Check for trailing comma
          if (prevToken && prevToken.type === 'COMMA') {
            fixedTokens.pop();
            addError(token, 'Trailing comma removed', 'safe-fix');
          }
          fixedTokens.push(token);
          stack.pop();
          inObject = stack[stack.length - 1] === 'object';
          inArray = stack[stack.length - 1] === 'array';
          expectingComma = stack.length > 0;
          expectingValue = false;
        } else {
          addError(token, 'Unmatched closing bracket', 'heuristic-fix');
        }
        i++;
        continue;
      }

      // Handle commas
      if (token.type === 'COMMA') {
        if (expectingComma) {
          fixedTokens.push(token);
          expectingComma = false;
          if (inObject) {
            expectingKey = true;
          } else if (inArray) {
            expectingValue = true;
          }
        } else {
          addError(token, 'Unexpected comma', 'safe-fix');
          // Don't add it
        }
        i++;
        continue;
      }

      // Handle colons
      if (token.type === 'COLON') {
        if (expectingValue && inObject) {
          fixedTokens.push(token);
          expectingValue = false;
          expectingKey = false;
        } else {
          addError(token, 'Unexpected colon', 'heuristic-fix');
          if (inObject && !expectingValue) {
            // Missing value before colon
            fixedTokens.push(token);
            expectingValue = true;
          }
        }
        i++;
        continue;
      }

      // Handle values (STRING, NUMBER, BOOLEAN, NULL)
      if (['STRING', 'NUMBER', 'BOOLEAN', 'NULL'].includes(token.type)) {
        if (expectingValue || expectingKey) {
          // Check if key needs quotes in object
          if (inObject && expectingKey && token.type !== 'STRING') {
            addError(token, 'Object key must be a string', 'safe-fix');
            fixedTokens.push({
              type: 'STRING',
              value: `"${token.value}"`,
              position: token.position,
              line: token.line,
              column: token.column,
            });
          } else {
            fixedTokens.push(token);
          }

          if (inObject) {
            if (expectingKey) {
              expectingKey = false;
              expectingValue = true; // Expect colon after key
            } else {
              expectingComma = true;
              expectingValue = false;
            }
          } else if (inArray) {
            expectingComma = true;
            expectingValue = false;
          }
        } else {
          addError(token, 'Unexpected value', 'non-fixable');
        }
        i++;
        continue;
      }

      i++;
    }

    // Check for unclosed structures
    while (stack.length > 0) {
      const structure = stack.pop()!;
      const lastToken = fixedTokens[fixedTokens.length - 1];
      if (structure === 'object') {
        fixedTokens.push({ type: 'RBRACE', value: '}', position: lastToken.position + 1, line: lastToken.line, column: lastToken.column + 1 });
        addError(lastToken, 'Missing closing brace', 'safe-fix');
      } else {
        fixedTokens.push({ type: 'RBRACKET', value: ']', position: lastToken.position + 1, line: lastToken.line, column: lastToken.column + 1 });
        addError(lastToken, 'Missing closing bracket', 'safe-fix');
      }
    }

    return { errors, fixedTokens };
  };

  // Convert tokens back to JSON string
  const tokensToJson = (tokens: Token[]): string => {
    let result = '';
    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];
      const nextToken = tokens[i + 1];

      if (token.type === 'STRING') {
        result += token.value;
      } else if (token.type === 'NUMBER' || token.type === 'BOOLEAN' || token.type === 'NULL') {
        result += token.value;
      } else {
        result += token.value;
      }

      // Add space after certain tokens for readability
      if (token.type === 'COLON' && nextToken) {
        result += ' ';
      } else if (token.type === 'COMMA' && nextToken && nextToken.type !== 'RBRACE' && nextToken.type !== 'RBRACKET') {
        result += ' ';
      }
    }
    return result;
  };

  // Main fix function
  const fixJson = (input: string): { fixed: string; errors: JsonError[] } => {
    const tokens = tokenize(input);
    const { errors, fixedTokens } = parseAndDetectErrors(tokens, input);
    const fixed = tokensToJson(fixedTokens);

    // Validate fixed JSON
    try {
      JSON.parse(fixed);
      return { fixed, errors };
    } catch (e: any) {
      // If still invalid, try one more pass
      try {
        const retryTokens = tokenize(fixed);
        const retryResult = parseAndDetectErrors(retryTokens, fixed);
        const retryFixed = tokensToJson(retryResult.fixedTokens);
        JSON.parse(retryFixed);
        return { fixed: retryFixed, errors: [...errors, ...retryResult.errors] };
      } catch {
        return { fixed: '', errors: [...errors, { line: 1, column: 1, message: 'Could not fully fix JSON', type: 'non-fixable', severity: 'non-fixable' }] };
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

    try {
      // First, try to parse as-is
      JSON.parse(jsonText);
      setErrors([]);
      setFixedJson(JSON.stringify(JSON.parse(jsonText), null, 2));
      return;
    } catch {
      // JSON is invalid, try to fix it
      const { fixed, errors: detectedErrors } = fixJson(jsonText);
      setErrors(detectedErrors);
      
      if (fixed) {
        try {
          // Validate and pretty-print
          const parsed = JSON.parse(fixed);
          setFixedJson(JSON.stringify(parsed, null, 2));
        } catch {
          setFixedJson(fixed);
        }
      } else {
        setFixedJson('');
      }
    }
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

  const isValid = errors.length === 0 && jsonText.trim() !== '';
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
              Fix malformed JSON, repair syntax errors, and validate JSON structure (RFC 8259 compliant)
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
        <h3 className="text-xl font-bold text-gray-900 mb-4">JSON Fixer Features (RFC 8259 Compliant)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-gray-800">Spec-Accurate Parsing</h4>
              <p className="text-sm text-gray-600">Follows RFC 8259 JSON standard with proper tokenization and stateful parsing</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-gray-800">Error Classification</h4>
              <p className="text-sm text-gray-600">Categorizes errors as safe-fix, heuristic-fix, or non-fixable</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-gray-800">Minimal Corrections</h4>
              <p className="text-sm text-gray-600">Applies deterministic fixes that preserve intent without inventing data</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-gray-800">Post-Fix Validation</h4>
              <p className="text-sm text-gray-600">Re-validates fixed JSON to ensure zero syntax errors</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
