'use client';

import { useState } from 'react';
import { Database, Copy, Check, RefreshCw, Download } from 'lucide-react';
import toast from 'react-hot-toast';

export default function SqlFormatter() {
  const [input, setInput] = useState('');
  const [formattedOutput, setFormattedOutput] = useState('');
  const [copied, setCopied] = useState(false);
  const [formatType, setFormatType] = useState<'sql' | 'sqlWithIn'>('sql');

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
      
      if (formatType === 'sql') {
        // Format: "ID-123456","ID-11112223"
        output = values.map(v => `"${v}"`).join(',');
      } else {
        // Format: IN ("ID-123456","ID-11112223")
        output = `IN (${values.map(v => `"${v}"`).join(',')})`;
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
    navigator.clipboard.writeText(formattedOutput);
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
          SQL Formatter
        </h2>
        <p className="text-gray-600 mb-4">
          Convert a list of IDs or values into SQL-friendly format with commas and double quotes.
        </p>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Format Type</label>
          <div className="flex gap-2">
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
            <p>Examples:</p>
            <ul className="list-disc list-inside ml-2">
              <li>Space-separated: <code className="bg-gray-100 px-1 rounded">ID-123456 ID-11112223</code></li>
              <li>Comma-separated: <code className="bg-gray-100 px-1 rounded">ID-123456, ID-11112223</code></li>
              <li>Newline-separated: <code className="bg-gray-100 px-1 rounded">ID-123456\nID-11112223</code></li>
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
            <pre className="bg-gray-50 p-4 rounded-lg border border-gray-200 overflow-x-auto scrollbar-thin text-sm">
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
    </div>
  );
}

