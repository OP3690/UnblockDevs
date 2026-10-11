'use client';

import { useState, useRef, useEffect } from 'react';
import { Server, Copy, Check, Download, Play, ChevronDown, ChevronUp, Zap, Plus, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { trackCopy } from '@/lib/analytics';
import { validateJson } from '@/lib/jsonParser';
import Link from 'next/link';
import {
  getDefaultConfig,
  generateExpressCode,
  generatePostmanCollection,
  generateOpenAPISpec,
  simulateMockResponse,
  PLACEHOLDERS,
  STATUS_CODES,
  type MockApiConfig,
  type HttpMethod,
  type AuthType,
  type StatusCode,
  type ConditionalRule,
} from '@/lib/mockApiGenerator';

type RouteConfig = MockApiConfig & { requestBodySchema?: string };

const METHODS: HttpMethod[] = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];
const AUTH_TYPES: { value: AuthType; label: string }[] = [
  { value: 'none', label: 'None' },
  { value: 'api_key', label: 'API Key' },
  { value: 'bearer', label: 'Bearer Token' },
  { value: 'basic', label: 'Basic Auth' },
];

const METHOD_BADGE: Record<HttpMethod, string> = {
  GET: 'bg-green-100 text-green-700',
  POST: 'bg-blue-100 text-blue-700',
  PUT: 'bg-amber-100 text-amber-700',
  PATCH: 'bg-orange-100 text-orange-700',
  DELETE: 'bg-red-100 text-red-700',
};

const LATENCY_PROFILES: { label: string; ms: number }[] = [
  { label: 'Instant (0 ms)', ms: 0 },
  { label: 'Fast (50 ms)', ms: 50 },
  { label: 'Normal (200 ms)', ms: 200 },
  { label: 'Slow (500 ms)', ms: 500 },
  { label: 'Very Slow (2 s)', ms: 2000 },
  { label: 'Custom', ms: -1 },
];

const PRESETS: Array<{ name: string; emoji: string; updates: Partial<MockApiConfig> }> = [
  {
    name: 'User CRUD',
    emoji: '👤',
    updates: {
      endpoint: '/api/users', method: 'GET', statusCode: 200, latencyMs: 150,
      authType: 'bearer', responseMode: 'template', itemCount: 10,
      responseJson: '{\n  "id": "{{id}}",\n  "name": "{{name}}",\n  "email": "{{email}}",\n  "role": "user",\n  "createdAt": "{{timestamp}}"\n}',
    },
  },
  {
    name: 'Blog Posts',
    emoji: '📝',
    updates: {
      endpoint: '/api/posts', method: 'GET', statusCode: 200, latencyMs: 100,
      authType: 'none', responseMode: 'template', itemCount: 5,
      responseJson: '{\n  "id": "{{id}}",\n  "title": "Blog post {{id}}",\n  "author": "{{name}}",\n  "publishedAt": "{{timestamp}}",\n  "views": {{random_int}}\n}',
    },
  },
  {
    name: 'Products',
    emoji: '🛍️',
    updates: {
      endpoint: '/api/products', method: 'GET', statusCode: 200, latencyMs: 80,
      authType: 'api_key', responseMode: 'template', itemCount: 20,
      responseJson: '{\n  "id": "{{id}}",\n  "name": "Product {{id}}",\n  "price": {{random_int}},\n  "inStock": {{random_bool}},\n  "sku": "SKU-{{id}}"\n}',
    },
  },
  {
    name: 'Auth Error',
    emoji: '🔒',
    updates: {
      endpoint: '/api/auth/login', method: 'POST', statusCode: 401, latencyMs: 200,
      authType: 'none', responseMode: 'static',
      responseJson: '{\n  "error": "Invalid credentials",\n  "code": "UNAUTHORIZED",\n  "message": "Email or password is incorrect"\n}',
    },
  },
  {
    name: 'Order API',
    emoji: '🛒',
    updates: {
      endpoint: '/api/orders', method: 'POST', statusCode: 201, latencyMs: 180,
      authType: 'bearer', responseMode: 'static',
      responseJson: '{\n  "orderId": "ord_{{id}}",\n  "status": "pending",\n  "total": 149.99,\n  "currency": "USD",\n  "createdAt": "{{timestamp}}"\n}',
    },
  },
  {
    name: 'Rate limit',
    emoji: '🚦',
    updates: {
      endpoint: '/api/data', method: 'GET', statusCode: 400, latencyMs: 50,
      authType: 'api_key', responseMode: 'static',
      responseJson: '{\n  "error": "Too Many Requests",\n  "message": "Rate limit exceeded. Retry after 60 seconds.",\n  "retryAfter": 60\n}',
    },
  },
  {
    name: 'Server Error',
    emoji: '💥',
    updates: {
      endpoint: '/api/process', method: 'POST', statusCode: 500, latencyMs: 300,
      authType: 'none', responseMode: 'static',
      responseJson: '{\n  "error": "Internal Server Error",\n  "message": "An unexpected error occurred",\n  "requestId": "req_{{id}}"\n}',
    },
  },
];

function buildCurl(config: RouteConfig): string {
  const base = `http://localhost:3001${config.endpoint}`;
  const lines: string[] = [`curl -X ${config.method}`, `  '${base}'`, `  -H 'Content-Type: application/json'`];
  if (config.authType === 'bearer') lines.push(`  -H 'Authorization: Bearer ${config.authHeaderValue || 'demo-token'}'`);
  if (config.authType === 'api_key') lines.push(`  -H 'X-API-Key: ${config.authHeaderValue || 'your-api-key'}'`);
  if (['POST', 'PUT', 'PATCH'].includes(config.method)) {
    const bodyEx = config.requestBodySchema
      ? config.requestBodySchema.replace(/\s+/g, ' ').slice(0, 120)
      : '{"example":"data"}';
    lines.push(`  -d '${bodyEx}'`);
  }
  return lines.join(' \\\n');
}

function generateMultiRouteExpress(routes: RouteConfig[]): string {
  const lines = [
    "const express = require('express');",
    "const app = express();",
    "app.use(express.json());",
    "",
  ];
  for (const route of routes) {
    const method = route.method.toLowerCase();
    lines.push(`// ---- ${route.method} ${route.endpoint} ----`);
    lines.push(`app.${method}('${route.endpoint}', (req, res) => {`);
    if (route.requestBodySchema && ['POST', 'PUT', 'PATCH'].includes(route.method)) {
      try {
        const schema = JSON.parse(route.requestBodySchema);
        const keys = Object.keys(schema);
        if (keys.length > 0) {
          lines.push(`  const { ${keys.join(', ')} } = req.body;`);
          lines.push(`  // Validate required fields`);
          for (const k of keys) {
            lines.push(`  if (${k} === undefined) return res.status(400).json({ error: 'Missing field: ${k}' });`);
          }
          lines.push('');
        }
      } catch { /* invalid schema JSON — skip */ }
    }
    const responseStr = route.responseJson || '{}';
    if ((route.latencyMs ?? 0) > 0) {
      lines.push(`  setTimeout(() => {`);
      lines.push(`    res.status(${route.statusCode}).json(${responseStr});`);
      lines.push(`  }, ${route.latencyMs});`);
    } else {
      lines.push(`  res.status(${route.statusCode}).json(${responseStr});`);
    }
    lines.push('});');
    lines.push('');
  }
  lines.push("app.listen(3001, () => console.log('Mock API server running on http://localhost:3001'));");
  return lines.join('\n');
}

function generateMultiRoutePostman(routes: RouteConfig[]): string {
  const items = routes.map((route) => {
    const hasBody = ['POST', 'PUT', 'PATCH'].includes(route.method);
    return {
      name: `${route.method} ${route.endpoint}`,
      request: {
        method: route.method,
        header: [{ key: 'Content-Type', value: 'application/json' }],
        url: { raw: `http://localhost:3001${route.endpoint}`, host: ['localhost'], port: '3001', path: route.endpoint.split('/').filter(Boolean) },
        ...(hasBody
          ? { body: { mode: 'raw', raw: route.requestBodySchema || '{}', options: { raw: { language: 'json' } } } }
          : {}),
      },
      response: [{ name: `${route.statusCode} Response`, status: String(route.statusCode), body: route.responseJson }],
    };
  });
  return JSON.stringify(
    {
      info: { name: 'Mock API Collection', schema: 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json' },
      item: items,
    },
    null,
    2
  );
}

function generateMultiRouteOpenAPI(routes: RouteConfig[]): string {
  const paths: Record<string, Record<string, unknown>> = {};
  for (const route of routes) {
    const method = route.method.toLowerCase();
    if (!paths[route.endpoint]) paths[route.endpoint] = {};
    const operation: Record<string, unknown> = {
      summary: `${route.method} ${route.endpoint}`,
      responses: {
        [String(route.statusCode)]: {
          description: 'Response',
          content: {
            'application/json': {
              schema: { type: 'object' },
              example: (() => { try { return JSON.parse(route.responseJson); } catch { return {}; } })(),
            },
          },
        },
      },
    };
    if (route.requestBodySchema && ['post', 'put', 'patch'].includes(method)) {
      operation.requestBody = {
        required: true,
        content: {
          'application/json': {
            schema: { type: 'object' },
            example: (() => { try { return JSON.parse(route.requestBodySchema!); } catch { return {}; } })(),
          },
        },
      };
    }
    paths[route.endpoint][method] = operation;
  }
  return JSON.stringify({ openapi: '3.0.0', info: { title: 'Mock API', version: '1.0.0' }, paths }, null, 2);
}

export default function MockApiGenerator() {
  const [routes, setRoutes] = useState<RouteConfig[]>([getDefaultConfig()]);
  const [activeRouteIdx, setActiveRouteIdx] = useState(0);
  const [mockCode, setMockCode] = useState('');
  const [exportFormat, setExportFormat] = useState<'code' | 'postman' | 'openapi'>('code');
  const [copied, setCopied] = useState(false);
  const [testResult, setTestResult] = useState<{ status: number; latencyMs: number; body: unknown } | null>(null);
  const [testLoading, setTestLoading] = useState(false);
  const [testProgress, setTestProgress] = useState(0);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const resultsSectionRef = useRef<HTMLDivElement>(null);

  const config: RouteConfig = routes[activeRouteIdx] ?? getDefaultConfig();
  const isBodyMethod = ['POST', 'PUT', 'PATCH'].includes(config.method);

  const updateConfig = (updates: Partial<RouteConfig>) => {
    setRoutes((prev) => prev.map((r, i) => (i === activeRouteIdx ? { ...r, ...updates } : r)));
  };

  const addRoute = () => {
    if (routes.length >= 6) { toast.error('Maximum 6 routes allowed'); return; }
    const newRoute: RouteConfig = { ...getDefaultConfig(), endpoint: `/api/route${routes.length + 1}` };
    setRoutes((prev) => [...prev, newRoute]);
    setActiveRouteIdx(routes.length);
  };

  const removeRoute = (idx: number) => {
    if (routes.length === 1) { toast.error('At least one route is required'); return; }
    setRoutes((prev) => prev.filter((_, i) => i !== idx));
    setActiveRouteIdx((prev) => {
      if (prev > idx) return prev - 1;
      if (prev === idx) return Math.max(0, idx - 1);
      return prev;
    });
  };

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        e.preventDefault();
        generateMockApi();
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const generateMockApi = () => {
    for (const route of routes) {
      if (route.responseMode === 'static') {
        const validation = validateJson(route.responseJson);
        if (!validation.valid) {
          toast.error(`Invalid JSON for ${route.method} ${route.endpoint}`);
          return;
        }
      } else {
        try { JSON.parse(route.responseJson); } catch {
          toast.error(`Invalid JSON template for ${route.method} ${route.endpoint}`);
          return;
        }
      }
      if (route.requestBodySchema) {
        try { JSON.parse(route.requestBodySchema); } catch {
          toast.error(`Invalid request body schema for ${route.method} ${route.endpoint}`);
          return;
        }
      }
    }
    try {
      const code = routes.length > 1 ? generateMultiRouteExpress(routes) : generateExpressCode(config);
      setMockCode(code);
      setExportFormat('code');
      toast.success('Mock API generated!');
      setTimeout(() => resultsSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    } catch (err: any) {
      toast.error('Failed to generate: ' + (err?.message || 'Unknown error'));
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    trackCopy('mock_api_generator');
    setCopied(true);
    toast.success('Copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Downloaded ' + filename);
  };

  const runTest = async () => {
    setTestLoading(true);
    setTestResult(null);
    setTestProgress(0);
    const targetLatency = config.latencyMs ?? 0;
    let intervalId: ReturnType<typeof setInterval> | null = null;
    if (targetLatency > 50) {
      const start = Date.now();
      intervalId = setInterval(() => {
        const elapsed = Date.now() - start;
        const pct = Math.min(90, (elapsed / targetLatency) * 100);
        setTestProgress(pct);
      }, 40);
    }
    try {
      const res = await simulateMockResponse(config, { page: 1, limit: config.itemCount ?? 10 });
      setTestResult({ status: res.status, latencyMs: res.latencyMs, body: res.body });
    } catch (e) {
      setTestResult({ status: 0, latencyMs: 0, body: { error: String(e) } });
    }
    if (intervalId) clearInterval(intervalId);
    setTestProgress(100);
    setTimeout(() => { setTestLoading(false); setTestProgress(0); }, 400);
  };

  const addConditionalRule = () => {
    updateConfig({
      conditionalRules: [
        ...config.conditionalRules,
        { id: crypto.randomUUID(), condition: 'body_contains', value: '', statusCode: 400 },
      ],
    });
  };

  const removeConditionalRule = (id: string) => {
    updateConfig({ conditionalRules: config.conditionalRules.filter((r) => r.id !== id) });
  };

  const updateRule = (id: string, updates: Partial<ConditionalRule>) => {
    updateConfig({
      conditionalRules: config.conditionalRules.map((r) => (r.id === id ? { ...r, ...updates } : r)),
    });
  };

  const getExportContent = (): string => {
    if (exportFormat === 'postman') return routes.length > 1 ? generateMultiRoutePostman(routes) : generatePostmanCollection(config);
    if (exportFormat === 'openapi') return routes.length > 1 ? generateMultiRouteOpenAPI(routes) : generateOpenAPISpec(config);
    return routes.length > 1 ? generateMultiRouteExpress(routes) : mockCode;
  };

  const applyPreset = (preset: typeof PRESETS[number]) => {
    setRoutes((prev) =>
      prev.map((r, i) =>
        i === activeRouteIdx ? ({ ...r, conditionalRules: [], requestBodySchema: '', ...preset.updates } as RouteConfig) : r
      )
    );
    setMockCode('');
    setTestResult(null);
    toast.success(`${preset.name} preset loaded`);
  };

  const localUrl = `http://localhost:3001${config.endpoint}`;
  const curlCommand = buildCurl(config);

  // Derive which latency profile option to show selected
  const currentProfileMs = config.latencyMs ?? 0;
  const matchedProfile = LATENCY_PROFILES.find((p) => p.ms === currentProfileMs);
  const isCustomLatency = !matchedProfile || matchedProfile.ms === -1;

  return (
    <div className="space-y-6 tool-panel-contain">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-5 text-white">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Server className="w-7 h-7" />
            Mock API Generator
          </h2>
          <p className="text-indigo-100 text-sm mt-1">
            Create REST endpoints with dynamic responses, auth simulation, latency, and error scenarios. Export to Postman or OpenAPI.
          </p>
        </div>

        {/* Quick presets */}
        <div className="px-6 pt-4 pb-0">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Quick start:</span>
            {PRESETS.map((p) => (
              <button
                key={p.name}
                type="button"
                onClick={() => applyPreset(p)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-medium hover:bg-indigo-100 transition-colors"
              >
                <span>{p.emoji}</span> {p.name}
              </button>
            ))}
          </div>
        </div>

        {/* Core config */}
        <div className="p-6 space-y-6">

          {/* ---- Routes Panel ---- */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                Routes <span className="text-gray-400 font-normal normal-case">({routes.length}/6)</span>
              </h3>
              <button
                type="button"
                onClick={addRoute}
                disabled={routes.length >= 6}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg border border-indigo-300 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Route
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {routes.map((route, idx) => (
                <div
                  key={idx}
                  className={`group flex items-center gap-1.5 rounded-lg border text-xs font-mono transition-colors ${
                    idx === activeRouteIdx
                      ? 'bg-indigo-100 border-indigo-300 text-indigo-800'
                      : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100 hover:border-gray-300'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setActiveRouteIdx(idx)}
                    className="flex items-center gap-1.5 px-2.5 py-1.5"
                  >
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${METHOD_BADGE[route.method]}`}>
                      {route.method}
                    </span>
                    <span className="max-w-[140px] truncate">{route.endpoint}</span>
                  </button>
                  {routes.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeRoute(idx)}
                      className="pr-2 text-gray-400 hover:text-red-500 transition-colors"
                      aria-label="Remove route"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            {routes.length > 1 && (
              <p className="text-xs text-indigo-600 mt-1.5">
                Editing route {activeRouteIdx + 1} of {routes.length}. All routes are exported together.
              </p>
            )}
          </div>

          {/* Endpoint */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">Endpoint</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="lg:col-span-2">
                <label className="block text-xs font-medium text-gray-500 mb-1">Path</label>
                <input
                  type="text"
                  value={config.endpoint}
                  onChange={(e) => updateConfig({ endpoint: e.target.value || '/api/data' })}
                  placeholder="/api/users"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-mono text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Method</label>
                <select
                  value={config.method}
                  onChange={(e) => updateConfig({ method: e.target.value as HttpMethod })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm"
                >
                  {METHODS.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Status code</label>
                <select
                  value={config.statusCode}
                  onChange={(e) => updateConfig({ statusCode: Number(e.target.value) as StatusCode })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm"
                >
                  {STATUS_CODES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Latency Profile + Auth */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Latency profile</label>
              <select
                value={matchedProfile ? matchedProfile.label : 'Custom'}
                onChange={(e) => {
                  const found = LATENCY_PROFILES.find((p) => p.label === e.target.value);
                  if (found && found.ms >= 0) updateConfig({ latencyMs: found.ms });
                  // If Custom selected, don't change latencyMs — user will enter manually
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm"
              >
                {LATENCY_PROFILES.map((p) => (
                  <option key={p.label} value={p.label}>{p.label}</option>
                ))}
              </select>
              {isCustomLatency && (
                <input
                  type="number"
                  min={0}
                  max={10000}
                  value={currentProfileMs}
                  onChange={(e) => updateConfig({ latencyMs: Math.max(0, parseInt(e.target.value, 10) || 0) })}
                  placeholder="Enter ms (0–10000)"
                  className="mt-1.5 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm"
                />
              )}
              <p className="text-xs text-gray-400 mt-0.5">Shown as a progress bar in browser test</p>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Authentication</label>
              <select
                value={config.authType}
                onChange={(e) => updateConfig({ authType: e.target.value as AuthType })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm"
              >
                {AUTH_TYPES.map((a) => (
                  <option key={a.value} value={a.value}>{a.label}</option>
                ))}
              </select>
              {(config.authType === 'bearer' || config.authType === 'api_key') && (
                <input
                  type="text"
                  placeholder={config.authType === 'bearer' ? 'demo-token' : 'your-api-key'}
                  value={config.authHeaderValue ?? ''}
                  onChange={(e) => updateConfig({ authHeaderValue: e.target.value })}
                  className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm"
                />
              )}
            </div>
          </div>

          {/* Response */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">Response</h3>
            <div className="flex flex-wrap gap-4 mb-3">
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="responseMode"
                  checked={config.responseMode === 'static'}
                  onChange={() => updateConfig({ responseMode: 'static' })}
                  className="text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-sm">Static JSON</span>
              </label>
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="responseMode"
                  checked={config.responseMode === 'template'}
                  onChange={() => updateConfig({ responseMode: 'template' })}
                  className="text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-sm">Template (dynamic placeholders)</span>
              </label>
            </div>
            {config.responseMode === 'template' && (
              <div className="mb-3 flex flex-wrap gap-2">
                {PLACEHOLDERS.slice(0, 8).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => {
                      const ta = document.querySelector('[data-response-json]') as HTMLTextAreaElement;
                      if (ta) {
                        const start = ta.selectionStart;
                        const text = config.responseJson;
                        const before = text.slice(0, start);
                        const after = text.slice(start);
                        updateConfig({ responseJson: before + p + after });
                        setTimeout(() => ta.focus(), 0);
                      }
                    }}
                    className="px-2 py-1 text-xs font-mono bg-indigo-50 text-indigo-700 rounded hover:bg-indigo-100"
                  >
                    {p}
                  </button>
                ))}
                <span className="text-xs text-gray-500 self-center">+ uuid, name, email, timestamp, random_int, random_bool, ip, country, id</span>
              </div>
            )}
            <textarea
              data-response-json
              value={config.responseJson}
              onChange={(e) => updateConfig({ responseJson: e.target.value })}
              placeholder='{"id": "{{uuid}}", "name": "{{name}}", "email": "{{email}}"}'
              rows={10}
              className="w-full p-4 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-y"
            />
            {config.responseMode === 'template' && (
              <div className="mt-2">
                <label className="block text-xs font-medium text-gray-500 mb-1">Generated item count (e.g. 10 users)</label>
                <input
                  type="number"
                  min={1}
                  max={1000}
                  value={config.itemCount ?? 10}
                  onChange={(e) => updateConfig({ itemCount: Math.max(1, parseInt(e.target.value, 10) || 10) })}
                  className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm"
                />
              </div>
            )}
          </div>

          {/* Request Body Schema — POST/PUT/PATCH only */}
          {isBodyMethod && (
            <div className="border border-blue-200 rounded-lg bg-blue-50/40 p-4">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Request Body Schema</h3>
                <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${METHOD_BADGE[config.method]}`}>{config.method}</span>
              </div>
              <p className="text-xs text-gray-500 mb-2">
                Define the expected request payload JSON. Keys are destructured with basic validation in the Express.js export, and appear as <code className="bg-blue-100 px-1 rounded">requestBody</code> in the OpenAPI spec.
              </p>
              <textarea
                value={config.requestBodySchema ?? ''}
                onChange={(e) => updateConfig({ requestBodySchema: e.target.value })}
                placeholder={'{\n  "username": "string",\n  "password": "string"\n}'}
                rows={5}
                className="w-full p-3 border border-blue-200 rounded-lg font-mono text-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 resize-y bg-white"
              />
            </div>
          )}

          {/* Advanced */}
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              type="button"
              onClick={() => setAdvancedOpen(!advancedOpen)}
              className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 text-left font-medium text-gray-700"
            >
              <span>Rate limit, failure rate, conditional rules</span>
              {advancedOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
            {advancedOpen && (
              <div className="p-4 space-y-4 border-t border-gray-200 bg-gray-50/50">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Rate limit (requests per minute)</label>
                    <input
                      type="number"
                      min={0}
                      placeholder="e.g. 100"
                      value={config.rateLimitPerMinute ?? ''}
                      onChange={(e) => updateConfig({ rateLimitPerMinute: e.target.value ? parseInt(e.target.value, 10) : undefined })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Failure rate (%) – random 500/429</label>
                    <input
                      type="number"
                      min={0}
                      max={100}
                      placeholder="e.g. 10"
                      value={config.failureRatePercent ?? ''}
                      onChange={(e) => updateConfig({ failureRatePercent: e.target.value ? parseInt(e.target.value, 10) : undefined })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-medium text-gray-500">Conditional responses (e.g. IF body contains "blocked" → 403)</label>
                    <button type="button" onClick={addConditionalRule} className="cta-add inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg border border-indigo-300 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 hover:border-indigo-400">
                      + Add rule
                    </button>
                  </div>
                  <div className="space-y-2">
                    {config.conditionalRules.map((r) => (
                      <div key={r.id} className="flex flex-wrap items-center gap-2 p-2 bg-white rounded border border-gray-200">
                        <select
                          value={r.condition}
                          onChange={(e) => updateRule(r.id, { condition: e.target.value as ConditionalRule['condition'] })}
                          className="px-2 py-1.5 border border-gray-300 rounded text-sm"
                        >
                          <option value="body_contains">Body contains</option>
                          <option value="body_missing">Body missing key</option>
                          <option value="query_has">Query has</option>
                          <option value="header_missing">Header missing</option>
                        </select>
                        <input
                          type="text"
                          placeholder="value"
                          value={r.value}
                          onChange={(e) => updateRule(r.id, { value: e.target.value })}
                          className="flex-1 min-w-[100px] px-2 py-1.5 border border-gray-300 rounded text-sm"
                        />
                        <select
                          value={r.statusCode}
                          onChange={(e) => updateRule(r.id, { statusCode: Number(e.target.value) as StatusCode })}
                          className="px-2 py-1.5 border border-gray-300 rounded text-sm"
                        >
                          {STATUS_CODES.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                        <button type="button" onClick={() => removeConditionalRule(r.id)} className="text-red-600 hover:text-red-700 p-1" aria-label="Remove rule">
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config.maskPii}
                    onChange={(e) => updateConfig({ maskPii: e.target.checked })}
                    className="rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-sm text-gray-700">Privacy: mask PII in response (emails, tokens, IDs)</span>
                  <Link href="/ai-schema-masker" className="text-indigo-600 text-xs hover:underline">AI Schema Masker</Link>
                </label>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={generateMockApi}
            className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors flex items-center justify-center gap-2"
          >
            <Zap className="w-5 h-5" />
            Generate Mock API{routes.length > 1 ? ` (${routes.length} routes)` : ''}
            <kbd className="hidden sm:inline-flex items-center rounded border border-white/30 bg-white/20 px-1 py-0.5 font-mono text-[10px]">⌘↵</kbd>
          </button>
        </div>
      </div>

      {/* Result */}
      {mockCode && (
        <div ref={resultsSectionRef} className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden scroll-mt-4">
          <div className="px-6 py-4 border-b border-gray-200 bg-green-50">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <Check className="w-5 h-5 text-green-600" />
              Mock endpoint{routes.length > 1 ? 's' : ''} ready
            </h3>
            <p className="text-sm text-gray-600 mt-1 font-mono break-all">{localUrl}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              <button
                type="button"
                onClick={() => handleCopy(localUrl)}
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                Copy URL
              </button>
              <button
                type="button"
                onClick={runTest}
                disabled={testLoading}
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:opacity-50"
              >
                <Play className="w-4 h-4" />
                {testLoading ? `Testing… ${Math.round(testProgress)}%` : 'Test API'}
              </button>
              <select
                value={exportFormat}
                onChange={(e) => setExportFormat(e.target.value as 'code' | 'postman' | 'openapi')}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                <option value="code">Express code</option>
                <option value="postman">Postman collection</option>
                <option value="openapi">OpenAPI spec</option>
              </select>
              <button
                type="button"
                onClick={() => handleCopy(getExportContent())}
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200"
              >
                <Copy className="w-4 h-4" />
                Copy export
              </button>
              <button
                type="button"
                onClick={() =>
                  handleDownload(
                    getExportContent(),
                    exportFormat === 'postman' ? 'mock-collection.json' : exportFormat === 'openapi' ? 'openapi.json' : 'mock-server.js'
                  )
                }
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200"
              >
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>
          </div>

          {/* Latency progress bar during test */}
          {testLoading && testProgress > 0 && (
            <div className="px-6 py-3 border-b border-gray-100 bg-indigo-50">
              <div className="flex items-center justify-between text-xs text-indigo-700 mb-1.5">
                <span>Simulating {currentProfileMs} ms latency…</span>
                <span>{Math.round(testProgress)}%</span>
              </div>
              <div className="h-2 bg-indigo-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-500 rounded-full transition-all duration-75 ease-linear"
                  style={{ width: `${testProgress}%` }}
                />
              </div>
            </div>
          )}

          {testResult && (
            <div className="px-6 py-4 border-b border-gray-200 bg-slate-50">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Last test result</h4>
              <div className="flex flex-wrap gap-4 text-sm">
                <span><strong>Status:</strong> {testResult.status}</span>
                <span><strong>Latency:</strong> {testResult.latencyMs} ms</span>
              </div>
              <pre className="mt-2 p-3 bg-white border border-gray-200 rounded-lg overflow-auto max-h-48 text-xs font-mono">
                {JSON.stringify(testResult.body, null, 2)}
              </pre>
            </div>
          )}

          {/* cURL command */}
          <div className="px-6 pb-0 border-t border-gray-100 pt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Test with cURL</span>
              <button
                type="button"
                onClick={() => handleCopy(curlCommand)}
                className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded"
              >
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                Copy
              </button>
            </div>
            <pre className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs font-mono overflow-x-auto whitespace-pre-wrap text-slate-700">
              {curlCommand}
            </pre>
          </div>

          <div className="p-6">
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono whitespace-pre-wrap">
              <code>{getExportContent()}</code>
            </pre>
          </div>
        </div>
      )}

      {/* Blog */}
      <div className="mt-12 bg-white rounded-xl shadow-lg p-8 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Learn more</h2>
        <Link
          href="/blog/free-mock-api-generator-guide"
          className="block p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 hover:border-blue-400 hover:shadow-md transition-all"
        >
          <h3 className="font-semibold text-gray-900 mb-1">Free Mock API in Seconds</h3>
          <p className="text-sm text-gray-600 mb-2">Generate fake endpoints with delay, status codes, and pagination for frontend development.</p>
          <span className="text-blue-600 text-sm font-medium hover:underline">Read guide →</span>
        </Link>
      </div>
    </div>
  );
}
