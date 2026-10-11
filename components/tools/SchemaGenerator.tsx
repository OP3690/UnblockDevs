'use client';

import { useState, useRef, useEffect } from 'react';
import { FileCode, Copy, Check, Download, Sparkles, CheckCircle, XCircle, ExternalLink, Code2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { trackCopy, trackCtaClick } from '@/lib/analytics';
import { validateJson } from '@/lib/jsonParser';
import Link from 'next/link';

// ─── Enum inference ──────────────────────────────────────────────────────────
function collectEnumCandidates(items: unknown[]): Map<string, string[]> {
  const fieldValues = new Map<string, Set<string>>();
  for (const item of items) {
    if (!item || typeof item !== 'object' || Array.isArray(item)) continue;
    for (const [key, val] of Object.entries(item as Record<string, unknown>)) {
      if (typeof val === 'string') {
        if (!fieldValues.has(key)) fieldValues.set(key, new Set());
        fieldValues.get(key)!.add(val);
      }
    }
  }
  const result = new Map<string, string[]>();
  for (const [key, values] of fieldValues.entries()) {
    if (values.size >= 2 && values.size <= 5) {
      result.set(key, Array.from(values));
    }
  }
  return result;
}

// ─── $defs extraction ────────────────────────────────────────────────────────
function extractDefs(schema: any): any {
  const seen = new Map<string, { count: number; schema: any; name: string }>();
  let defCounter = 0;

  function traverse(node: any): void {
    if (!node || typeof node !== 'object') return;
    if (node.type === 'object' && node.properties && !node.$ref) {
      const key = JSON.stringify(node.properties);
      if (seen.has(key)) {
        seen.get(key)!.count++;
      } else {
        const name = `Type${++defCounter}`;
        seen.set(key, { count: 1, schema: node, name });
      }
    }
    for (const v of Object.values(node)) {
      if (typeof v === 'object') traverse(v);
    }
  }
  traverse(schema);

  const defs: Record<string, any> = {};
  const refMap = new Map<string, string>();
  for (const [key, entry] of seen.entries()) {
    if (entry.count >= 2) {
      defs[entry.name] = { ...entry.schema };
      refMap.set(key, entry.name);
    }
  }
  if (Object.keys(defs).length === 0) return schema;

  function replace(node: any): any {
    if (!node || typeof node !== 'object') return node;
    if (Array.isArray(node)) return node.map(replace);
    if (node.type === 'object' && node.properties && !node.$ref) {
      const key = JSON.stringify(node.properties);
      if (refMap.has(key)) return { $ref: `#/$defs/${refMap.get(key)}` };
    }
    const result: Record<string, any> = {};
    for (const [k, v] of Object.entries(node)) {
      result[k] = replace(v);
    }
    return result;
  }

  const replaced = replace(schema);
  if (replaced.$defs || Object.keys(defs).length > 0) {
    replaced.$defs = { ...replaced.$defs, ...defs };
  }
  return replaced;
}

// ─── Enhanced AJV-style validator ────────────────────────────────────────────
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{2}:\d{2})?)?$/;
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const URI_RE = /^https?:\/\/.+/;

function validateValue(data: unknown, schema: any, path: string, errors: string[]): void {
  if (!schema || typeof schema !== 'object') return;

  // $ref — skip for now (requires defs context)
  if (schema.$ref) return;

  // type checking
  if (schema.type) {
    const actualType = data === null ? 'null' : Array.isArray(data) ? 'array' : typeof data;
    const expectedType = schema.type === 'integer' ? 'number' : schema.type;
    if (actualType !== expectedType) {
      errors.push(`${path}: expected type '${schema.type}', got '${actualType}'`);
      return;
    }
    if (schema.type === 'integer' && typeof data === 'number' && !Number.isInteger(data)) {
      errors.push(`${path}: expected integer, got float`);
    }
  }

  // enum
  if (schema.enum && Array.isArray(schema.enum)) {
    if (!schema.enum.includes(data)) {
      errors.push(`${path}: value must be one of [${schema.enum.map((v: unknown) => JSON.stringify(v)).join(', ')}]`);
    }
  }

  // string-specific
  if (typeof data === 'string') {
    if (schema.minLength !== undefined && data.length < schema.minLength) {
      errors.push(`${path}: string length ${data.length} < minLength ${schema.minLength}`);
    }
    if (schema.maxLength !== undefined && data.length > schema.maxLength) {
      errors.push(`${path}: string length ${data.length} > maxLength ${schema.maxLength}`);
    }
    if (schema.format === 'email' && !EMAIL_RE.test(data)) {
      errors.push(`${path}: expected format 'email'`);
    }
    if ((schema.format === 'date' || schema.format === 'date-time') && !ISO_DATE_RE.test(data)) {
      errors.push(`${path}: expected format '${schema.format}'`);
    }
    if (schema.format === 'uri' && !URI_RE.test(data)) {
      errors.push(`${path}: expected format 'uri'`);
    }
    if (schema.format === 'uuid' && !UUID_RE.test(data)) {
      errors.push(`${path}: expected format 'uuid'`);
    }
  }

  // number-specific
  if (typeof data === 'number') {
    if (schema.minimum !== undefined && data < schema.minimum) {
      errors.push(`${path}: value ${data} < minimum ${schema.minimum}`);
    }
    if (schema.maximum !== undefined && data > schema.maximum) {
      errors.push(`${path}: value ${data} > maximum ${schema.maximum}`);
    }
  }

  // object
  if (typeof data === 'object' && data !== null && !Array.isArray(data)) {
    const obj = data as Record<string, unknown>;
    // required
    if (schema.required && Array.isArray(schema.required)) {
      for (const req of schema.required) {
        if (!(req in obj)) {
          errors.push(`${path}: missing required field '${req}'`);
        }
      }
    }
    // properties
    if (schema.properties) {
      for (const [key, propSchema] of Object.entries(schema.properties)) {
        if (key in obj) {
          validateValue(obj[key], propSchema, `${path}.${key}`, errors);
        }
      }
    }
  }

  // array
  if (Array.isArray(data) && schema.items) {
    data.forEach((item, idx) => {
      validateValue(item, schema.items, `${path}[${idx}]`, errors);
    });
  }
}
// ─────────────────────────────────────────────────────────────────────────────

// Generate TypeScript interface from JSON Schema
function schemaToTypescript(schema: any, name: string = 'Root', indent: number = 0): string {
  const pad = '  '.repeat(indent);
  if (!schema || typeof schema !== 'object') return 'unknown';
  if (schema.type === 'object' || schema.properties) {
    const props = schema.properties || {};
    const required: string[] = schema.required || [];
    const lines: string[] = [`${pad}interface ${name} {`];
    for (const [key, val] of Object.entries(props)) {
      const propSchema = val as any;
      const optional = !required.includes(key) ? '?' : '';
      const tsType = schemaTypeToTs(propSchema, key);
      lines.push(`${'  '.repeat(indent + 1)}${key}${optional}: ${tsType};`);
    }
    lines.push(`${pad}}`);
    return lines.join('\n');
  }
  return schemaTypeToTs(schema, name);
}

function schemaTypeToTs(schema: any, key: string = ''): string {
  if (!schema) return 'unknown';
  if (schema.type === 'string') return 'string';
  if (schema.type === 'number' || schema.type === 'integer') return 'number';
  if (schema.type === 'boolean') return 'boolean';
  if (schema.type === 'null') return 'null';
  if (schema.type === 'array') {
    const itemType = schema.items ? schemaTypeToTs(schema.items, key + 'Item') : 'unknown';
    return `${itemType}[]`;
  }
  if (schema.type === 'object' || schema.properties) {
    const props = schema.properties || {};
    const required: string[] = schema.required || [];
    const fields = Object.entries(props).map(([k, v]) => {
      const opt = !required.includes(k) ? '?' : '';
      return `${k}${opt}: ${schemaTypeToTs(v as any, k)}`;
    });
    return `{ ${fields.join('; ')} }`;
  }
  if (schema.oneOf) return schema.oneOf.map((s: any) => schemaTypeToTs(s, key)).join(' | ');
  return 'unknown';
}

export default function SchemaGenerator() {
  const [jsonText, setJsonText] = useState('');
  const [schema, setSchema] = useState<any>(null);
  const [schemaFormat, setSchemaFormat] = useState<'draft7' | 'openapi'>('draft7');
  const [copied, setCopied] = useState(false);
  const [copiedTs, setCopiedTs] = useState(false);
  const [showExamples, setShowExamples] = useState(false);
  const [validationResult, setValidationResult] = useState<{ valid: boolean; errors: string[] } | null>(null);
  const [jsonToValidate, setJsonToValidate] = useState('');
  const resultsSectionRef = useRef<HTMLDivElement>(null);
  const [tsInterface, setTsInterface] = useState<string | null>(null);
  const [inferEnumsEnabled, setInferEnumsEnabled] = useState(true);
  const [useDefsEnabled, setUseDefsEnabled] = useState(true);

  const generateSchema = (obj: any, required: boolean = true, enumCandidates?: Map<string, string[]>): any => {
    if (obj === null) {
      return { type: 'null' };
    }

    if (Array.isArray(obj)) {
      if (obj.length === 0) {
        return { type: 'array', items: {} };
      }
      // Collect enum candidates from array items if enabled
      const candidatesForItems = inferEnumsEnabled ? collectEnumCandidates(obj) : new Map<string, string[]>();

      // Analyze all items to find common schema
      const itemSchemas = obj.map(item => generateSchema(item, false, candidatesForItems));
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
          properties[key] = generateSchema(obj[key], false, enumCandidates);

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
      // Check enum candidates first (only when the caller passed candidates)
      if (enumCandidates) {
        // Reverse-look-up: this path doesn't have key context, so enum resolution happens at object level
        // (handled above when processing object properties — see below)
      }
      const schema: any = { type: 'string' };
      // Detect patterns
      if (/^\d{4}-\d{2}-\d{2}T/.test(obj)) {
        schema.format = 'date-time';
      } else if (/^\d{4}-\d{2}-\d{2}$/.test(obj)) {
        schema.format = 'date';
      } else if (/^https?:\/\//.test(obj)) {
        schema.format = 'uri';
      } else if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(obj)) {
        schema.format = 'email';
      } else if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(obj)) {
        schema.format = 'uuid';
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

  // Apply enum inference to object properties after schema generation
  const applyEnums = (schema: any, enumCandidates: Map<string, string[]>): any => {
    if (!schema || typeof schema !== 'object') return schema;
    if (schema.type === 'object' && schema.properties) {
      const props: Record<string, any> = {};
      for (const [key, val] of Object.entries(schema.properties as Record<string, any>)) {
        if (val.type === 'string' && !val.format && enumCandidates.has(key)) {
          props[key] = { ...val, enum: enumCandidates.get(key) };
        } else {
          props[key] = applyEnums(val, enumCandidates);
        }
      }
      return { ...schema, properties: props };
    }
    if (schema.type === 'array' && schema.items) {
      return { ...schema, items: applyEnums(schema.items, enumCandidates) };
    }
    return schema;
  };

  // ⌘+Enter / Ctrl+Enter to generate
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        e.preventDefault();
        handleGenerate();
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGenerate = () => {
    const validation = validateJson(jsonText);
    if (!validation.valid) {
      toast.error('Invalid JSON format');
      return;
    }

    try {
      let generatedSchema = generateSchema(validation.data);

      // Apply enum inference post-processing when input is an array
      if (inferEnumsEnabled && Array.isArray(validation.data) && validation.data.length > 1) {
        const enumCandidates = collectEnumCandidates(validation.data);
        if (generatedSchema.items) {
          generatedSchema = { ...generatedSchema, items: applyEnums(generatedSchema.items, enumCandidates) };
        }
      }

      // Apply $defs extraction
      if (useDefsEnabled) {
        generatedSchema = extractDefs(generatedSchema);
      }

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
      
      // Generate TypeScript interface
      try {
        const ts = schemaToTypescript(generatedSchema, 'Root');
        setTsInterface(ts);
      } catch { setTsInterface(null); }

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
      validateValue(validation.data, schema, '$', errors);

      if (errors.length === 0) {
        setValidationResult({ valid: true, errors: [] });
        toast.success('JSON is valid against the schema!');
      } else {
        setValidationResult({ valid: false, errors });
        toast.error(`Validation failed: ${errors.length} issue${errors.length > 1 ? 's' : ''}`);
      }
    } catch (err: any) {
      setValidationResult({ valid: false, errors: ['Validation error: ' + err.message] });
    }
  };

  const handleCopy = () => {
    if (schema) {
      navigator.clipboard.writeText(JSON.stringify(schema, null, 2));
      trackCopy('schema_generator');
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
      name: 'User Profile',
      json: JSON.stringify({ id: 1, name: 'John Doe', email: 'john@example.com', age: 30, active: true, role: 'admin', createdAt: '2024-01-15T10:30:00Z' }, null, 2)
    },
    {
      name: 'Product Catalog',
      json: JSON.stringify([{ id: 1, name: 'Widget Pro', price: 99.99, inStock: true, tags: ['hardware', 'featured'] }, { id: 2, name: 'Widget Lite', price: 29.99, inStock: false, tags: ['hardware'] }], null, 2)
    },
    {
      name: 'API Response',
      json: JSON.stringify({ success: true, data: { users: [{ id: 1, name: 'Alice' }], total: 1, page: 1 }, message: null, timestamp: 1710000000 }, null, 2)
    },
    {
      name: 'Config File',
      json: JSON.stringify({ database: { host: 'localhost', port: 5432, name: 'mydb', ssl: false }, cache: { ttl: 3600, maxSize: 1000 }, features: { darkMode: true, beta: false } }, null, 2)
    },
    {
      name: 'Order',
      json: JSON.stringify({ orderId: 'ord_001', customerId: 'cust_123', status: 'pending', items: [{ sku: 'PRD-001', name: 'Widget', quantity: 2, unitPrice: 49.99 }], total: 99.98, currency: 'USD', createdAt: '2024-03-15T10:00:00Z' }, null, 2)
    },
    {
      name: 'Event',
      json: JSON.stringify({ eventId: 'evt_xyz789', type: 'user.signup', source: 'web', userId: 'usr_456', properties: { email: 'alice@example.com', plan: 'pro', referral: null }, occurredAt: 1710000000, version: '1.0' }, null, 2)
    },
  ];

  const handleCopyTs = () => {
    if (!tsInterface) return;
    navigator.clipboard.writeText(tsInterface);
    trackCopy('schema_generator');
    setCopiedTs(true);
    toast.success('TypeScript interface copied!');
    setTimeout(() => setCopiedTs(false), 2000);
  };

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
            onClick={() => {
              if (!showExamples) trackCtaClick('schema_generator', 'show_examples');
              setShowExamples(!showExamples);
            }}
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
                    trackCtaClick('schema_generator', 'load_example', { example_name: example.name });
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

        <div className="mb-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
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
          <div className="flex flex-col justify-end">
            <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer select-none pb-2">
              <input
                type="checkbox"
                checked={inferEnumsEnabled}
                onChange={(e) => setInferEnumsEnabled(e.target.checked)}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              Infer enums
              <span className="text-xs text-gray-400">(2–5 distinct values)</span>
            </label>
          </div>
          <div className="flex flex-col justify-end">
            <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer select-none pb-2">
              <input
                type="checkbox"
                checked={useDefsEnabled}
                onChange={(e) => setUseDefsEnabled(e.target.checked)}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              Use $defs
              <span className="text-xs text-gray-400">(extract repeated types)</span>
            </label>
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={!jsonText.trim()}
          className="w-full py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          Generate Schema
          <kbd className="ml-2 hidden sm:inline-flex items-center rounded border border-white/30 bg-white/20 px-1 py-0.5 font-mono text-[10px]">⌘↵</kbd>
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

          {tsInterface && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-blue-600" />
                  TypeScript Interface
                </h3>
                <button
                  onClick={handleCopyTs}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  {copiedTs ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copiedTs ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <pre className="bg-gray-50 p-4 rounded-lg border border-gray-200 overflow-x-auto text-sm max-h-64 overflow-y-auto">
                <code className="language-typescript">{tsInterface}</code>
              </pre>
            </div>
          )}

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
              className="cta-validate-json w-full py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
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
