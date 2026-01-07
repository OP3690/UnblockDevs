'use client';

import { useState } from 'react';
import { Database, Copy, Check, RefreshCw, Download, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function SqlFormatter() {
  const [input, setInput] = useState('');
  const [formattedOutput, setFormattedOutput] = useState('');
  const [copied, setCopied] = useState(false);
  const [formatType, setFormatType] = useState<'sql' | 'sqlWithIn'>('sql');
  const [quoteType, setQuoteType] = useState<'single' | 'double'>('double');
  const [outputFormat, setOutputFormat] = useState<'horizontal' | 'vertical'>('horizontal');

  const formatInput = () => {
    if (!input.trim()) {
      toast.error('Please enter some values');
      return;
    }

    try {
      // Split by whitespace, newlines, commas, or semicolons
      const values = input
        .split(/[\s,\n;]+/)
        .map(v => v.trim())
        .filter(v => v.length > 0);

      if (values.length === 0) {
        toast.error('No valid values found');
        return;
      }

      let output = '';
      const quote = quoteType === 'single' ? "'" : '"';
      const separator = outputFormat === 'vertical' ? ',\n' : ',';
      
      if (formatType === 'sql') {
        // Format: "ID-123456","ID-11112223" or 'ID-123456','ID-11112223'
        // Vertical: "ID-123456",\n"ID-11112223" or 'ID-123456',\n'ID-11112223'
        const formattedValues = values.map(v => `${quote}${v}${quote}`);
        output = formattedValues.join(separator);
        if (outputFormat === 'vertical') {
          output += ','; // Add trailing comma for vertical format
        }
      } else {
        // Format: IN ("ID-123456","ID-11112223") or IN ('ID-123456','ID-11112223')
        const formattedValues = values.map(v => `${quote}${v}${quote}`);
        if (outputFormat === 'vertical') {
          // Add comma to all except last item
          const verticalValues = formattedValues.map((v, i) => i < formattedValues.length - 1 ? `${v},` : v).join('\n  ');
          output = `IN (\n  ${verticalValues}\n)`;
        } else {
          output = `IN (${formattedValues.join(separator)})`;
        }
      }

      setFormattedOutput(output);
      toast.success(`Formatted ${values.length} value(s)`);
    } catch (err: any) {
      toast.error('Failed to format input');
    }
  };

  const handleCopy = () => {
    if (!formattedOutput) {
      toast.error('Nothing to copy');
      return;
    }
    
    // Always copy in vertical format for better usability
    let copyText = formattedOutput;
    
    // If output is horizontal, convert to vertical for copying
    if (outputFormat === 'horizontal') {
      // Extract values from formatted output
      let values: string[] = [];
      
      if (formatType === 'sql') {
        // Extract from: "ID-123","ID-456" or 'ID-123','ID-456'
        values = formattedOutput
          .split(',')
          .map(v => v.trim())
          .filter(v => v.length > 0);
      } else {
        // Extract from: IN ("ID-123","ID-456") or IN ('ID-123','ID-456')
        const match = formattedOutput.match(/IN\s*\((.+)\)/);
        if (match) {
          values = match[1]
            .split(',')
            .map(v => v.trim())
            .filter(v => v.length > 0);
        }
      }
      
      // Format as vertical without trailing comma on last item
      if (formatType === 'sql') {
        copyText = values.map((v, i) => i < values.length - 1 ? `${v},` : v).join('\n');
      } else {
        copyText = `IN (\n  ${values.map((v, i) => i < values.length - 1 ? `${v},` : v).join('\n')}\n)`;
      }
    } else {
      // Already vertical, remove trailing comma from last line
      if (formatType === 'sql') {
        // Remove trailing comma from the last line
        const lines = formattedOutput.split('\n');
        if (lines.length > 0) {
          const lastLine = lines[lines.length - 1].replace(/,\s*$/, '');
          lines[lines.length - 1] = lastLine;
          copyText = lines.join('\n');
        }
      } else {
        // For IN clause format, remove trailing comma from last item inside parentheses
        copyText = formattedOutput.replace(/,(\s*\n\s*\))/, '$1');
      }
    }
    
    navigator.clipboard.writeText(copyText);
    setCopied(true);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setInput('');
    setFormattedOutput('');
    setCopied(false);
  };

  const handleDownload = () => {
    if (!formattedOutput) {
      toast.error('Nothing to download');
      return;
    }
    const blob = new Blob([formattedOutput], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sql-formatted.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Downloaded!');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Database className="w-6 h-6 text-primary-600" />
          SQL Formatter - Comma Separated ID List for MySQL IN Clause
        </h2>
        <p className="text-gray-600 mb-4">
          Create comma separated ID lists for MySQL IN clause instantly. Convert multiple IDs, arrays, or values into properly formatted MySQL IN query format. 
          Perfect for converting lists of IDs into SQL-friendly comma separated values with proper quoting.
        </p>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg mb-4">
          <p className="text-sm text-blue-800">
            <strong>Quick Guide:</strong> Paste your IDs (one per line, comma-separated, or space-separated) and get instant formatted output ready for MySQL WHERE IN clause. 
            Supports both numeric and string IDs with automatic proper quoting.
          </p>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Format Type</label>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setFormatType('sql')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                formatType === 'sql'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Values Only: "ID-123","ID-456"
            </button>
            <button
              onClick={() => setFormatType('sqlWithIn')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                formatType === 'sqlWithIn'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              With IN Clause: IN ("ID-123","ID-456")
            </button>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Quote Type</label>
          <div className="flex gap-2">
            <button
              onClick={() => setQuoteType('single')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                quoteType === 'single'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Single Quotes: 'ID-123','ID-456'
            </button>
            <button
              onClick={() => setQuoteType('double')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                quoteType === 'double'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Double Quotes: "ID-123","ID-456"
            </button>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Output Format</label>
          <div className="flex gap-2">
            <button
              onClick={() => setOutputFormat('horizontal')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                outputFormat === 'horizontal'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Horizontal: 'ID-123','ID-456'
            </button>
            <button
              onClick={() => setOutputFormat('vertical')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                outputFormat === 'vertical'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Vertical: 'ID-123',\n'ID-456'
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Note: When copying, output is always copied in vertical format for better readability.
          </p>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Input (separate values by space, comma, newline, or semicolon)
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="ID-123456   ID-11112223
ID-33334444
ID-55556666"
            className="w-full h-48 p-4 border-2 border-gray-300 rounded-lg font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <div className="mt-2 text-xs text-gray-500">
            <p className="font-semibold mb-1">Supported Input Formats:</p>
            <ul className="list-disc list-inside ml-2 space-y-1">
              <li>Space-separated: <code className="bg-gray-100 px-1 rounded">ID-123456 ID-11112223</code></li>
              <li>Comma-separated: <code className="bg-gray-100 px-1 rounded">ID-123456, ID-11112223</code></li>
              <li>Newline-separated: <code className="bg-gray-100 px-1 rounded">ID-123456\nID-11112223</code></li>
              <li>Semicolon-separated: <code className="bg-gray-100 px-1 rounded">ID-123456; ID-11112223</code></li>
            </ul>
            <p className="font-semibold mt-2 mb-1">Use Cases:</p>
            <ul className="list-disc list-inside ml-2 space-y-1">
              <li>Convert array to comma separated list for MySQL</li>
              <li>Format multiple IDs for MySQL IN clause</li>
              <li>Generate comma separated values from table data</li>
              <li>Prepare ID list for MySQL WHERE IN query</li>
            </ul>
          </div>
        </div>

        <div className="flex gap-3 mb-4">
          <button
            onClick={formatInput}
            disabled={!input.trim()}
            className="flex-1 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            <Database className="w-5 h-5" />
            Format
          </button>
          <button
            onClick={handleClear}
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors flex items-center gap-2"
          >
            <RefreshCw className="w-5 h-5" />
            Clear
          </button>
        </div>
      </div>

      {formattedOutput && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-800">Formatted Output</h3>
            <div className="flex gap-2">
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>
          </div>
          <div className="relative">
            <pre className="bg-gray-50 p-4 rounded-lg border border-gray-200 overflow-x-auto scrollbar-thin text-sm whitespace-pre">
              <code className="font-mono">{formattedOutput}</code>
            </pre>
            <div className="mt-2 text-xs text-gray-500">
              <p>Ready to use in your SQL query!</p>
              {formatType === 'sql' && (
                <p className="mt-1">
                  Example: <code className="bg-gray-100 px-1 rounded">WHERE id IN ({formattedOutput})</code>
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Blog Links Section */}
      <div className="mt-12 bg-white rounded-xl shadow-lg p-8 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Learn More About MySQL</h2>
        <div className="space-y-3">
          <Link
            href="/blog/mysql-json-complete-guide"
            className="block p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200 hover:border-purple-400 hover:shadow-md transition-all"
          >
            <h3 className="font-semibold text-gray-900 mb-1">Working with JSON in MySQL: Complete Guide</h3>
            <p className="text-sm text-gray-600 mb-2">Complete guide to working with JSON in MySQL: JSON data types, structure, extracting data from JSON columns, nested JSON queries, 10 practical examples, and tips & tricks.</p>
            <span className="text-purple-600 text-sm font-medium hover:underline">Read Guide →</span>
          </Link>
          <Link
            href="/blog/mysql-10-most-used-functions"
            className="block p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 hover:border-blue-400 hover:shadow-md transition-all"
          >
            <h3 className="font-semibold text-gray-900 mb-1">MySQL 10 Most Used Functions: Complete Guide</h3>
            <p className="text-sm text-gray-600 mb-2">Complete guide to MySQL 10 most used functions: COUNT, SUM, AVG, MAX, MIN, CONCAT, SUBSTRING, DATE_FORMAT, IF, and CASE with examples and best practices.</p>
            <span className="text-blue-600 text-sm font-medium hover:underline">Read Guide →</span>
          </Link>
          <Link
            href="/blog/mysql-25-most-used-queries"
            className="block p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200 hover:border-green-400 hover:shadow-md transition-all"
          >
            <h3 className="font-semibold text-gray-900 mb-1">MySQL 25 Most Used Queries: Complete Guide</h3>
            <p className="text-sm text-gray-600 mb-2">Complete guide to MySQL 25 most used queries: SELECT, INSERT, UPDATE, DELETE, JOIN, WHERE, GROUP BY, ORDER BY, and more with examples and best practices.</p>
            <span className="text-green-600 text-sm font-medium hover:underline">Read Guide →</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

