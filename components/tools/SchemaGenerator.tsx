'use client';

import { useState, useRef } from 'react';
import { FileCode, Copy, Check, Download, Sparkles, CheckCircle, XCircle, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';
import { validateJson } from '@/lib/jsonParser';
import Link from 'next/link';

export default function SchemaGenerator() {
  const [jsonText, setJsonText] = useState('');
  const [schema, setSchema] = useState<any>(null);
  const [schemaFormat, setSchemaFormat] = useState<'draft7' | 'openapi'>('draft7');
  const [copied, setCopied] = useState(false);
  const [showExamples, setShowExamples] = useState(false);
  const [validationResult, setValidationResult] = useState<{ valid: boolean; errors: string[] } | null>(null);
  const [jsonToValidate, setJsonToValidate] = useState('');
  const resultsSectionRef = useRef<HTMLDivElement>(null);

  const generateSchema = (obj: any, required: boolean = true): any => {
    if (obj === null) {
      return { type: 'null' };
    }

    if (Array.isArray(obj)) {
      if (obj.length === 0) {
        return { type: 'array', items: {} };
      }
      // Analyze all items to find common schema
      const itemSchemas = obj.map(item => generateSchema(item, false));
      const firstItem = itemSchemas[0];
      
      // Check if all items have the same structure
      const allSame = itemSchemas.every(s => JSON.stringify(s) === JSON.stringify(firstItem));
      
      if (allSame) {
        return {
          type: 'array',
          items: firstItem,
        };
      } else {
        // Use oneOf if items differ
        return {
          type: 'array',
          items: {
            oneOf: itemSchemas.slice(0, 5) // Limit to first 5 variations
          }
        };
      }
    }

    if (typeof obj === 'object') {
      const properties: any = {};
      const requiredFields: string[] = [];

      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          properties[key] = generateSchema(obj[key], false);
          
          // Add description based on key name
          if (key.toLowerCase().includes('email')) {
            properties[key].format = 'email';
          } else if (key.toLowerCase().includes('url') || key.toLowerCase().includes('uri')) {
            properties[key].format = 'uri';
          } else if (key.toLowerCase().includes('date') || key.toLowerCase().includes('time')) {
            properties[key].format = 'date-time';
          }
          
          // Mark as required if not null/undefined
          if (obj[key] !== null && obj[key] !== undefined && obj[key] !== '') {
            requiredFields.push(key);
          }
        }
      }

      const schema: any = {
        $schema: 'http://json-schema.org/draft-07/schema#',
        type: 'object',
        properties,
      };

      if (requiredFields.length > 0) {
        schema.required = requiredFields;
      }

      return schema;
    }

    // Handle primitive types with better detection
    if (typeof obj === 'string') {
      const schema: any = { type: 'string' };
      // Detect patterns
      if (/^\d{4}-\d{2}-\d{2}/.test(obj)) {
        schema.format = 'date';
      } else if (/^\d{4}-\d{2}-\d{2}T/.test(obj)) {
        schema.format = 'date-time';
      } else if (/^https?:\/\//.test(obj)) {
        schema.format = 'uri';
      } else if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(obj)) {
        schema.format = 'email';
      }
      return schema;
    }

    if (typeof obj === 'number') {
      return { type: Number.isInteger(obj) ? 'integer' : 'number' };
    }

    if (typeof obj === 'boolean') {
      return { type: 'boolean' };
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
      
      if (schemaFormat === 'openapi') {
        // Convert to OpenAPI schema format
        const openApiSchema = {
          type: 'object',
          properties: generatedSchema.properties || {},
          required: generatedSchema.required || [],
        };
        setSchema(openApiSchema);
      } else {
        // Use JSON Schema Draft 7
        setSchema(generatedSchema);
      }
      
      toast.success('Schema generated successfully!');
      setTimeout(() => {
        resultsSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } catch (err: any) {
      toast.error('Failed to generate schema: ' + err.message);
    }
  };

  const validateJsonAgainstSchema = () => {
    if (!schema) {
      toast.error('Please generate a schema first');
      return;
    }

    const validation = validateJson(jsonToValidate);
    if (!validation.valid) {
      setValidationResult({ valid: false, errors: ['Invalid JSON format'] });
      return;
    }

    try {
      const errors: string[] = [];
      const data = validation.data;

      // Basic validation against schema
      if (schema.type === 'object' && typeof data === 'object' && !Array.isArray(data)) {
        // Check required fields
        if (schema.required) {
          for (const field of schema.required) {
            if (!(field in data)) {
              errors.push(`Missing required field: ${field}`);
            }
          }
        }

        // Check properties
        if (schema.properties) {
          for (const key in data) {
            if (key in schema.properties) {
              const propSchema = schema.properties[key];
              const value = data[key];

              // Type checking
              if (propSchema.type === 'string' && typeof value !== 'string') {
                errors.push(`Field '${key}' should be a string`);
              } else if (propSchema.type === 'integer' && !Number.isInteger(value)) {
                errors.push(`Field '${key}' should be an integer`);
              } else if (propSchema.type === 'number' && typeof value !== 'number') {
                errors.push(`Field '${key}' should be a number`);
              } else if (propSchema.type === 'boolean' && typeof value !== 'boolean') {
                errors.push(`Field '${key}' should be a boolean`);
              } else if (propSchema.type === 'array' && !Array.isArray(value)) {
                errors.push(`Field '${key}' should be an array`);
              }
            }
          }
        }
      }

      if (errors.length === 0) {
        setValidationResult({ valid: true, errors: [] });
        toast.success('JSON is valid against the schema!');
      } else {
        setValidationResult({ valid: false, errors });
        toast.error('Validation failed');
      }
    } catch (err: any) {
      setValidationResult({ valid: false, errors: ['Validation error: ' + err.message] });
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

  const examples = [
    {
      name: 'User Object',
      json: JSON.stringify({ name: 'John Doe', email: 'john@example.com', age: 30, active: true }, null, 2)
    },
    {
      name: 'Product Array',
      json: JSON.stringify([{ id: 1, name: 'Product 1', price: 99.99 }, { id: 2, name: 'Product 2', price: 149.99 }], null, 2)
    },
    {
      name: 'Nested Object',
      json: JSON.stringify({ user: { name: 'John', address: { city: 'NYC', zip: '10001' } } }, null, 2)
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
              <FileCode className="w-6 h-6 text-primary-600" />
              JSON Schema Generator
            </h2>
            <p className="text-gray-600 text-sm">Generate JSON Schema from sample JSON. Supports Draft 7 and OpenAPI formats. Validate JSON against schemas.</p>
          </div>
          <button
            onClick={() => setShowExamples(!showExamples)}
            className="flex items-center gap-2 px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <Sparkles className="w-4 h-4" />
            Examples
          </button>
        </div>

        {showExamples && (
          <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-gray-900 mb-2">Example JSON:</h3>
            <div className="space-y-2">
              {examples.map((example, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setJsonText(example.json);
                    setShowExamples(false);
                  }}
                  className="block w-full text-left p-2 bg-white rounded border border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-colors text-sm"
                >
                  <span className="font-medium text-gray-700">{example.name}:</span>
                  <pre className="text-xs text-gray-600 mt-1 overflow-x-auto">{example.json.substring(0, 100)}...</pre>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Sample JSON</label>
          <textarea
            value={jsonText}
            onChange={(e) => setJsonText(e.target.value)}
            placeholder='{"name": "John", "age": 30, "email": "john@example.com"}'
            className="w-full h-48 p-4 border-2 border-gray-300 rounded-lg font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Schema Format</label>
          <select
            value={schemaFormat}
            onChange={(e) => setSchemaFormat(e.target.value as 'draft7' | 'openapi')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="draft7">JSON Schema Draft 7</option>
            <option value="openapi">OpenAPI Schema</option>
          </select>
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
        <>
          <div ref={resultsSectionRef} className="bg-white rounded-lg shadow-lg p-6 scroll-mt-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800">Generated Schema ({schemaFormat === 'draft7' ? 'Draft 7' : 'OpenAPI'})</h3>
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
            <pre className="bg-gray-50 p-4 rounded-lg border border-gray-200 overflow-x-auto scrollbar-thin text-sm max-h-96 overflow-y-auto">
              <code>{JSON.stringify(schema, null, 2)}</code>
            </pre>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Validate JSON Against Schema</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">JSON to Validate</label>
              <textarea
                value={jsonToValidate}
                onChange={(e) => setJsonToValidate(e.target.value)}
                placeholder='{"name": "John", "age": 30}'
                className="w-full h-32 p-4 border-2 border-gray-300 rounded-lg font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <button
              onClick={validateJsonAgainstSchema}
              disabled={!jsonToValidate.trim()}
              className="w-full py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              Validate JSON
            </button>

            {validationResult && (
              <div className={`mt-4 p-4 rounded-lg border-2 ${validationResult.valid ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'}`}>
                <div className="flex items-center gap-2 mb-2">
                  {validationResult.valid ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600" />
                  )}
                  <span className={`font-semibold ${validationResult.valid ? 'text-green-900' : 'text-red-900'}`}>
                    {validationResult.valid ? 'Valid' : 'Invalid'}
                  </span>
                </div>
                {validationResult.errors.length > 0 && (
                  <ul className="list-disc list-inside text-sm text-red-800 mt-2">
                    {validationResult.errors.map((error, idx) => (
                      <li key={idx}>{error}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        </>
      )}

      {/* Blog Links Section */}
      <div className="mt-12 bg-white rounded-xl shadow-lg p-8 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Learn More About JSON Schema</h2>
        <div className="space-y-3">
          <Link
            href="/blog/json-schema-generator-tutorial"
            className="block p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 hover:border-blue-400 hover:shadow-md transition-all"
          >
            <h3 className="font-semibold text-gray-900 mb-1">JSON Schema Generator Tutorial: Create Schemas from JSON</h3>
            <p className="text-sm text-gray-600 mb-2">Complete tutorial on generating JSON Schema from sample JSON. Learn how to create schemas, validate JSON, use Draft 7 and OpenAPI formats.</p>
            <span className="text-blue-600 text-sm font-medium hover:underline">Read Guide →</span>
          </Link>
          <Link
            href="/blog/json-schema-generator-validation-guide"
            className="block p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200 hover:border-green-400 hover:shadow-md transition-all"
          >
            <h3 className="font-semibold text-gray-900 mb-1">JSON Schema Generator and Validation: Complete Guide</h3>
            <p className="text-sm text-gray-600 mb-2">Comprehensive guide to JSON Schema generation and validation with examples and best practices.</p>
            <span className="text-green-600 text-sm font-medium hover:underline">Read Guide →</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
