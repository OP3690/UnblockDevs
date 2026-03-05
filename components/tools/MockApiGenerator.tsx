'use client';

import { useState, useRef } from 'react';
import { Server, Copy, Check, Download, Play, ChevronDown, ChevronUp, Zap } from 'lucide-react';
import toast from 'react-hot-toast';
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

const METHODS: HttpMethod[] = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];
const AUTH_TYPES: { value: AuthType; label: string }[] = [
  { value: 'none', label: 'None' },
  { value: 'api_key', label: 'API Key' },
  { value: 'bearer', label: 'Bearer Token' },
  { value: 'basic', label: 'Basic Auth' },
];

export default function MockApiGenerator() {
  const [config, setConfig] = useState<MockApiConfig>(getDefaultConfig());
  const [mockCode, setMockCode] = useState('');
  const [exportFormat, setExportFormat] = useState<'code' | 'postman' | 'openapi'>('code');
  const [copied, setCopied] = useState(false);
  const [testResult, setTestResult] = useState<{
    status: number;
    latencyMs: number;
    body: unknown;
  } | null>(null);
  const [testLoading, setTestLoading] = useState(false);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const resultsSectionRef = useRef<HTMLDivElement>(null);

  const updateConfig = (updates: Partial<MockApiConfig>) => {
    setConfig((c) => ({ ...c, ...updates }));
  };

  const generateMockApi = () => {
    if (config.responseMode === 'static') {
      const validation = validateJson(config.responseJson);
      if (!validation.valid) {
        toast.error('Invalid JSON for static response');
        return;
      }
    } else {
      try {
        JSON.parse(config.responseJson);
      } catch {
        toast.error('Invalid JSON template');
        return;
      }
    }

    try {
      const code = generateExpressCode(config);
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
    try {
      const res = await simulateMockResponse(config, { page: 1, limit: config.itemCount ?? 10 });
      setTestResult({ status: res.status, latencyMs: res.latencyMs, body: res.body });
    } catch (e) {
      setTestResult({ status: 0, latencyMs: 0, body: { error: String(e) } });
    }
    setTestLoading(false);
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
    if (exportFormat === 'postman') return generatePostmanCollection(config);
    if (exportFormat === 'openapi') return generateOpenAPISpec(config);
    return mockCode;
  };

  const localUrl = `http://localhost:3001${config.endpoint}`;

  return (
    <div className="space-y-6">
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

        {/* Core config */}
        <div className="p-6 space-y-6">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Latency (ms)</label>
              <input
                type="number"
                min={0}
                max={10000}
                value={config.latencyMs}
                onChange={(e) => updateConfig({ latencyMs: Math.max(0, parseInt(e.target.value, 10) || 0) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm"
              />
              <p className="text-xs text-gray-400 mt-0.5">0–10000 ms to simulate real API delay</p>
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
                    <button type="button" onClick={addConditionalRule} className="text-xs text-indigo-600 hover:text-indigo-700 font-medium">
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
            Generate Mock API
          </button>
        </div>
      </div>

      {/* Result */}
      {mockCode && (
        <div ref={resultsSectionRef} className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden scroll-mt-4">
          <div className="px-6 py-4 border-b border-gray-200 bg-green-50">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <Check className="w-5 h-5 text-green-600" />
              Mock endpoint ready
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
                {testLoading ? 'Testing…' : 'Test API'}
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
