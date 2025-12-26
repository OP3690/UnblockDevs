'use client';

import { useState } from 'react';
import { Database, Copy, Check, Download } from 'lucide-react';
import toast from 'react-hot-toast';
import { validateJson } from '@/lib/jsonParser';

export default function TestDataGenerator() {
  const [schemaText, setSchemaText] = useState('');
  const [count, setCount] = useState(10);
  const [generatedData, setGeneratedData] = useState('');
  const [copied, setCopied] = useState(false);

  const generateValue = (type: string, key: string): any => {
    switch (type) {
      case 'string':
        if (key.toLowerCase().includes('email')) {
          return `test${Math.floor(Math.random() * 1000)}@example.com`;
        }
        if (key.toLowerCase().includes('name')) {
          return `Test${key}${Math.floor(Math.random() * 100)}`;
        }
        if (key.toLowerCase().includes('id')) {
          return `id-${Math.random().toString(36).substr(2, 9)}`;
        }
        return `test_${key}_${Math.floor(Math.random() * 1000)}`;
      case 'number':
        return Math.floor(Math.random() * 1000);
      case 'boolean':
        return Math.random() > 0.5;
      case 'null':
        return null;
      default:
        return 'test';
    }
  };

  const generateFromSchema = (schema: any, count: number): any[] => {
    const results: any[] = [];

    for (let i = 0; i < count; i++) {
      const obj: any = {};
      
      if (schema.properties) {
        for (const key in schema.properties) {
          const prop = schema.properties[key];
          if (prop.type === 'array' && prop.items) {
            obj[key] = [generateValue(prop.items.type, key)];
          } else if (prop.type === 'object' && prop.properties) {
            obj[key] = generateFromSchema(prop, 1)[0];
          } else {
            obj[key] = generateValue(prop.type, key);
          }
        }
      }

      results.push(obj);
    }

    return results;
  };

  const handleGenerate = () => {
    try {
      const validation = validateJson(schemaText);
      if (!validation.valid) {
        toast.error('Invalid JSON Schema format');
        return;
      }

      const data = generateFromSchema(validation.data, count);
      setGeneratedData(JSON.stringify(data, null, 2));
      toast.success(`Generated ${count} test records`);
    } catch (err: any) {
      toast.error('Failed to generate test data');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedData);
    setCopied(true);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([generatedData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `test-data-${new Date().toISOString().split('T')[0]}.json`;
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
          <Database className="w-6 h-6 text-primary-600" />
          Test Data Generator
        </h2>
        <p className="text-gray-600 mb-4">Generate realistic test data based on JSON Schema.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Record Count</label>
            <input
              type="number"
              value={count}
              onChange={(e) => setCount(parseInt(e.target.value) || 1)}
              min="1"
              max="1000"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">JSON Schema</label>
          <textarea
            value={schemaText}
            onChange={(e) => setSchemaText(e.target.value)}
            placeholder='{"type": "object", "properties": {"name": {"type": "string"}, "age": {"type": "number"}}}'
            className="w-full h-64 p-4 border-2 border-gray-300 rounded-lg font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <button
          onClick={handleGenerate}
          disabled={!schemaText.trim()}
          className="w-full py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          Generate Test Data
        </button>
      </div>

      {generatedData && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-800">Generated Test Data</h3>
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
          <pre className="bg-gray-50 p-4 rounded-lg border border-gray-200 overflow-x-auto scrollbar-thin text-sm max-h-[500px] overflow-y-auto">
            <code>{generatedData}</code>
          </pre>
        </div>
      )}
    </div>
  );
}

