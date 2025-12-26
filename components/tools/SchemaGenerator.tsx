'use client';

import { useState } from 'react';
import { FileCode, Copy, Check, Download } from 'lucide-react';
import toast from 'react-hot-toast';
import { validateJson } from '@/lib/jsonParser';

export default function SchemaGenerator() {
  const [jsonText, setJsonText] = useState('');
  const [schema, setSchema] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  const generateSchema = (obj: any, required: boolean = true): any => {
    if (obj === null) {
      return { type: 'null' };
    }

    if (Array.isArray(obj)) {
      if (obj.length === 0) {
        return { type: 'array', items: {} };
      }
      return {
        type: 'array',
        items: generateSchema(obj[0], false),
      };
    }

    if (typeof obj === 'object') {
      const properties: any = {};
      const requiredFields: string[] = [];

      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          properties[key] = generateSchema(obj[key], false);
          if (obj[key] !== null && obj[key] !== undefined) {
            requiredFields.push(key);
          }
        }
      }

      const schema: any = {
        type: 'object',
        properties,
      };

      if (requiredFields.length > 0) {
        schema.required = requiredFields;
      }

      return schema;
    }

    return { type: typeof obj };
  };

  const handleGenerate = () => {
    const validation = validateJson(jsonText);
    if (!validation.valid) {
      toast.error('Invalid JSON format');
      return;
    }

    try {
      const generatedSchema = generateSchema(validation.data);
      const openApiSchema = {
        type: 'object',
        properties: generatedSchema.properties || {},
        required: generatedSchema.required || [],
      };

      setSchema(openApiSchema);
      toast.success('Schema generated successfully');
    } catch (err: any) {
      toast.error('Failed to generate schema');
    }
  };

  const handleCopy = () => {
    if (schema) {
      navigator.clipboard.writeText(JSON.stringify(schema, null, 2));
      setCopied(true);
      toast.success('Schema copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    if (schema) {
      const blob = new Blob([JSON.stringify(schema, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `schema-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success('Schema downloaded!');
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <FileCode className="w-6 h-6 text-primary-600" />
          JSON Schema Generator & Validator
        </h2>
        <p className="text-gray-600 mb-4">Generate JSON Schema from sample JSON and validate JSON against schemas.</p>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Sample JSON</label>
          <textarea
            value={jsonText}
            onChange={(e) => setJsonText(e.target.value)}
            placeholder='{"name": "John", "age": 30}'
            className="w-full h-64 p-4 border-2 border-gray-300 rounded-lg font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <button
          onClick={handleGenerate}
          disabled={!jsonText.trim()}
          className="w-full py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          Generate Schema
        </button>
      </div>

      {schema && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-800">Generated Schema</h3>
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
            <code>{JSON.stringify(schema, null, 2)}</code>
          </pre>
        </div>
      )}
    </div>
  );
}

