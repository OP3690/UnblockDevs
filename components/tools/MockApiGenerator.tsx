'use client';

import { useState } from 'react';
import { Server, Copy, Check, Download, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';
import { validateJson } from '@/lib/jsonParser';
import Link from 'next/link';

export default function MockApiGenerator() {
  const [jsonText, setJsonText] = useState('');
  const [endpoint, setEndpoint] = useState('/api/data');
  const [method, setMethod] = useState('GET');
  const [latency, setLatency] = useState(0);
  const [mockCode, setMockCode] = useState('');
  const [copied, setCopied] = useState(false);

  const generateMockApi = () => {
    const validation = validateJson(jsonText);
    if (!validation.valid) {
      toast.error('Invalid JSON format');
      return;
    }

    try {
      const code = `// Mock API Server
// Install: npm install express cors
// Run: node mock-server.js

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.${method.toLowerCase()}('${endpoint}', (req, res) => {
  // Simulate latency
  setTimeout(() => {
    res.status(200).json(${JSON.stringify(validation.data, null, 2)});
  }, ${latency});
});

app.listen(3001, () => {
  console.log('Mock API running on http://localhost:3001${endpoint}');
});`;

      setMockCode(code);
      toast.success('Mock API code generated!');
    } catch (err: any) {
      toast.error('Failed to generate mock API');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(mockCode);
    setCopied(true);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([mockCode], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mock-server.js';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('File downloaded!');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Server className="w-6 h-6 text-primary-600" />
          Mock API Generator
        </h2>
        <p className="text-gray-600 mb-4">Generate a mock API server from sample JSON response.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Endpoint</label>
            <input
              type="text"
              value={endpoint}
              onChange={(e) => setEndpoint(e.target.value)}
              placeholder="/api/data"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Method</label>
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="PATCH">PATCH</option>
              <option value="DELETE">DELETE</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Latency (ms)</label>
            <input
              type="number"
              value={latency}
              onChange={(e) => setLatency(parseInt(e.target.value) || 0)}
              min="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Sample Response JSON</label>
          <textarea
            value={jsonText}
            onChange={(e) => setJsonText(e.target.value)}
            placeholder='{"data": "value"}'
            className="w-full h-64 p-4 border-2 border-gray-300 rounded-lg font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <button
          onClick={generateMockApi}
          disabled={!jsonText.trim()}
          className="w-full py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          Generate Mock API
        </button>
      </div>

      {mockCode && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-800">Mock Server Code</h3>
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
                className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>
          </div>
          <pre className="bg-gray-50 p-4 rounded-lg border border-gray-200 overflow-x-auto scrollbar-thin text-sm">
            <code>{mockCode}</code>
          </pre>
        </div>
      )}

      {/* Blog Links Section */}
      <div className="mt-12 bg-white rounded-xl shadow-lg p-8 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Learn More About Mock APIs</h2>
        <div className="space-y-3">
          <Link
            href="/blog/free-mock-api-generator-guide"
            className="block p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 hover:border-blue-400 hover:shadow-md transition-all"
          >
            <h3 className="font-semibold text-gray-900 mb-1">Free Mock API in Seconds: Generate Fake Endpoints for Frontend Development</h3>
            <p className="text-sm text-gray-600 mb-2">Learn how to use mock API generators to create realistic endpoints with delay, status codes, and pagination. Perfect for frontend development without a backend.</p>
            <span className="text-blue-600 text-sm font-medium hover:underline">Read Guide →</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

