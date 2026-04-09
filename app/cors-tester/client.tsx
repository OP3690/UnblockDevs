'use client';

import { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import {
  Copy,
  Check,
  Shield,
  Lock,
  ChevronRight,
  ChevronDown,
  Play,
  AlertTriangle,
  FileCode,
  Globe,
  Server,
  ArrowRight,
  Clock,
  Download,
  RotateCcw,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { trackCopy, trackCtaClick } from '@/lib/analytics';
import ToolPageShell from '@/components/tools/ToolPageShell';
import type { BreadcrumbItem } from '@/components/Breadcrumb';
import {
  parseCorsHeaders,
  analyzeCors,
  buildPreflightCurl,
  buildActualCurl,
  CODE_SNIPPETS,
  MULTI_ORIGIN_PRESETS,
  explainBlockedReason,
  needsPreflight,
  type CorsAnalysis,
  type SecurityFinding,
} from '@/lib/corsTesterEngine';

const METHODS = ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'];

export default function CorsTesterClient() {
  const [url, setUrl] = useState('https://api.example.com/users');
  const [method, setMethod] = useState('GET');
  const [origin, setOrigin] = useState('');
  const [withCredentials, setWithCredentials] = useState(false);
  const [headers, setHeaders] = useState<{ key: string; value: string }[]>([{ key: 'Content-Type', value: 'application/json' }]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    status?: number;
    statusText?: string;
    headers?: Headers;
    timing?: number;
    error?: string;
    analysis?: CorsAnalysis;
  } | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [snippetsOpen, setSnippetsOpen] = useState(false);
  const [multiOriginOpen, setMultiOriginOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [history, setHistory] = useState<Array<{
    url: string; method: string; status?: number; score?: number;
    timing?: number; success: boolean; ts: number;
  }>>([]);

  // Expand Code snippets and Multi-origin sections on desktop and tablet (md+)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    if (mq.matches) {
      setSnippetsOpen(true);
      setMultiOriginOpen(true);
    }
  }, []);

  const effectiveOrigin = origin.trim() || (typeof window !== 'undefined' ? window.location.origin : 'https://example.com');
  const headerRecord = headers.reduce<Record<string, string>>((acc, { key, value }) => {
    if (key.trim()) acc[key.trim()] = value.trim();
    return acc;
  }, {});
  const customHeaderNames = headers.map((h) => h.key.trim()).filter(Boolean);
  const willPreflight = needsPreflight(method, headerRecord);

  const runTest = useCallback(async () => {
    if (!url.trim()) {
      toast.error('Enter a target URL');
      return;
    }
    trackCtaClick('cors_tester', 'run_test');
    setLoading(true);
    setResult(null);
    const start = performance.now();
    try {
      const res = await fetch(url.trim(), {
        method,
        headers: headerRecord,
        credentials: withCredentials ? 'include' : 'omit',
        mode: 'cors',
      });
      const timing = performance.now() - start;
      const corsHeaders = parseCorsHeaders(res.headers);
      const analysis = analyzeCors(corsHeaders, { withCredentials, origin: effectiveOrigin });
      setResult({
        success: true,
        status: res.status,
        statusText: res.statusText,
        headers: res.headers,
        timing,
        analysis,
      });
      setHistory((prev) => [{
        url: url.trim(), method, status: res.status,
        score: analysis?.score, timing, success: true, ts: Date.now(),
      }, ...prev].slice(0, 8));
      toast.success('Request completed');
    } catch (err) {
      const timing = performance.now() - start;
      setResult({
        success: false,
        timing,
        error: err instanceof Error ? err.message : String(err),
      });
      setHistory((prev) => [{
        url: url.trim(), method, timing, success: false, ts: Date.now(),
      }, ...prev].slice(0, 8));
      toast.error('Request failed');
    } finally {
      setLoading(false);
    }
  }, [url, method, origin, withCredentials, headerRecord, effectiveOrigin]);

  const addHeader = () => setHeaders((h) => [...h, { key: '', value: '' }]);
  const removeHeader = (i: number) => setHeaders((h) => h.filter((_, j) => j !== i));
  const updateHeader = (i: number, field: 'key' | 'value', value: string) => {
    setHeaders((h) => h.map((row, j) => (j === i ? { ...row, [field]: value } : row)));
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        trackCopy('cors_tester');
        setCopied(label);
        toast.success('Copied');
        setTimeout(() => setCopied(null), 2000);
      },
      () => toast.error('Copy failed')
    );
  };

  const exportReport = () => {
    if (!result) return;
    const report = {
      url: url.trim(), method, origin: effectiveOrigin,
      withCredentials, timestamp: new Date().toISOString(),
      result: {
        success: result.success, status: result.status,
        statusText: result.statusText, timing: result.timing,
        error: result.error, analysis: result.analysis,
      },
    };
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `cors-report-${Date.now()}.json`;
    a.click();
    toast.success('Report downloaded');
  };

  const severityColor = (s: SecurityFinding['severity']) =>
    s === 'CRITICAL' ? 'bg-red-100 text-red-800 border-red-200' :
    s === 'HIGH' ? 'bg-orange-100 text-orange-800 border-orange-200' :
    s === 'MEDIUM' ? 'bg-amber-100 text-amber-800 border-amber-200' :
    s === 'LOW' ? 'bg-gray-100 text-gray-800 border-gray-200' : 'bg-blue-100 text-blue-800 border-blue-200';

  const preflightCurl = buildPreflightCurl(url.trim(), method, effectiveOrigin, customHeaderNames);
  const actualCurl = buildActualCurl(url.trim(), method, effectiveOrigin, headerRecord, withCredentials);

  const corsBreadcrumb: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Tools', href: '/tools/json' },
    { label: 'CORS Tester' },
  ];

  return (
    <ToolPageShell
      embedTool
      showFooterBand={false}
      breadcrumbItems={corsBreadcrumb}
      title="CORS Tester"
      subtitle="Simulate preflight OPTIONS and real requests, inspect CORS headers, and catch misconfigurations — in your browser. No request data stored."
      toolName="cors_tester"
      tool={
        <>
        <div className="rounded-2xl border border-zinc-200/80 bg-white shadow-lg shadow-zinc-200/40 overflow-hidden">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 px-6 md:px-8 py-4 bg-gradient-to-r from-sky-50/80 to-transparent border-b border-gray-100">
            <span className="text-sm text-gray-700 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-sky-100">
                <Shield className="w-3.5 h-3.5 text-sky-600" />
              </span>
              Runs in your browser
            </span>
            <span className="text-sm text-gray-700 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-sky-100">
                <Lock className="w-3.5 h-3.5 text-sky-600" />
              </span>
              No API data stored
            </span>
            <span className="text-sm text-gray-700 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-sky-100">
                <Check className="w-3.5 h-3.5 text-sky-600" />
              </span>
              No request history saved
            </span>
          </div>

          <div className="px-6 md:px-8 py-6 space-y-6">
            {/* Request builder */}
            <div>
              <h2 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Globe className="w-4 h-4 text-sky-600" />
                Request builder
              </h2>
              <div className="space-y-4 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                {/* Quick URL presets */}
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Quick test with public APIs</p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { label: '📝 JSONPlaceholder', url: 'https://jsonplaceholder.typicode.com/posts' },
                      { label: '🌐 httpbin GET', url: 'https://httpbin.org/get' },
                      { label: '🌤️ Open-Meteo', url: 'https://api.open-meteo.com/v1/forecast?latitude=40.71&longitude=-74.01&current_weather=true' },
                      { label: '🐱 GitHub API', url: 'https://api.github.com/repos/octocat/Hello-World' },
                    ].map((s) => (
                      <button
                        key={s.label}
                        type="button"
                        onClick={() => { trackCtaClick('cors_tester', 'load_sample_url'); setUrl(s.url); }}
                        className="rounded-lg border border-sky-200 bg-sky-50 px-3 py-1.5 text-xs font-medium text-sky-700 hover:bg-sky-100 transition-colors"
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Target URL</label>
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://api.example.com/users"
                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 font-mono text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 placeholder:text-gray-400"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Origin (for preflight / cURL)</label>
                    <input
                      type="text"
                      value={origin}
                      onChange={(e) => setOrigin(e.target.value)}
                      placeholder={typeof window !== 'undefined' ? window.location.origin : 'https://example.com'}
                      className="w-full rounded-xl border border-gray-200 px-3 py-2 font-mono text-sm focus:ring-2 focus:ring-primary-500 placeholder:text-gray-400"
                    />
                    <p className="text-[10px] text-gray-500 mt-1">Actual request uses this page&apos;s origin</p>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Method</label>
                    <div className="flex flex-wrap gap-2">
                      {METHODS.map((m) => (
                        <button
                          key={m}
                          type="button"
                          onClick={() => setMethod(m)}
                          className={`rounded-xl px-3 py-1.5 text-sm font-medium transition-all ${
                            method === m ? 'bg-primary-600 text-white shadow-sm' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          {m}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={withCredentials}
                      onChange={(e) => setWithCredentials(e.target.checked)}
                      className="rounded border-gray-300 text-primary-600"
                    />
                    Include credentials (cookies, Authorization)
                  </label>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-semibold text-gray-600">Custom headers</label>
                    <button type="button" onClick={addHeader} className="text-xs font-medium text-primary-600 hover:underline">
                      + Add header
                    </button>
                  </div>
                  <div className="space-y-2">
                    {headers.map((h, i) => (
                      <div key={i} className="flex gap-2">
                        <input
                          type="text"
                          value={h.key}
                          onChange={(e) => updateHeader(i, 'key', e.target.value)}
                          placeholder="Header name"
                          className="flex-1 rounded-lg border border-gray-200 px-2 py-1.5 font-mono text-sm"
                        />
                        <input
                          type="text"
                          value={h.value}
                          onChange={(e) => updateHeader(i, 'value', e.target.value)}
                          placeholder="Value"
                          className="flex-1 rounded-lg border border-gray-200 px-2 py-1.5 font-mono text-sm"
                        />
                        <button type="button" onClick={() => removeHeader(i)} className="text-gray-400 hover:text-red-600 px-2">
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Run test */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={runTest}
                disabled={loading}
                className="inline-flex items-center gap-2 rounded-xl bg-primary-600 text-white px-5 py-2.5 font-semibold text-sm shadow-lg shadow-primary-200/50 hover:bg-primary-700 disabled:opacity-60 transition-all"
              >
                <Play className="w-4 h-4" />
                {loading ? 'Sending…' : 'Run test'}
              </button>
              {result && (
                <button
                  type="button"
                  onClick={exportReport}
                  className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white text-gray-700 px-4 py-2.5 font-medium text-sm hover:bg-gray-50 transition-all"
                >
                  <Download className="w-4 h-4" />
                  Export report
                </button>
              )}
              <p className="text-xs text-gray-500">
                Request is sent from this page&apos;s origin. Results show CORS headers and security analysis.
              </p>
            </div>

            {/* Request flow */}
            <div className="p-4 rounded-2xl border border-gray-100 bg-gray-50/50">
              <h3 className="text-sm font-bold text-gray-900 mb-2">Request flow</h3>
              <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-gray-600">
                <span className="rounded-lg bg-white border border-gray-200 px-2 py-1">Browser</span>
                <ArrowRight className="w-4 h-4 text-gray-400" />
                {willPreflight && (
                  <>
                    <span className="rounded-lg bg-amber-100 text-amber-800 px-2 py-1">Preflight OPTIONS</span>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </>
                )}
                <span className="rounded-lg bg-sky-100 text-sky-800 px-2 py-1">{method} request</span>
                <ArrowRight className="w-4 h-4 text-gray-400" />
                <span className="rounded-lg bg-emerald-100 text-emerald-800 px-2 py-1">Response</span>
              </div>
              {willPreflight && (
                <p className="text-xs text-gray-500 mt-2">
                  Non-simple request: browser will send OPTIONS first, then {method} if allowed.
                </p>
              )}
            </div>

            {/* Results */}
            {result && (
              <>
                {result.success ? (
                  <>
                    <div className="p-4 rounded-2xl border border-emerald-200/80 bg-emerald-50/50">
                      <div className="flex flex-wrap items-center gap-4 text-sm">
                        <span className="font-semibold text-emerald-800">Request succeeded</span>
                        <span className="text-gray-600">Status: {result.status} {result.statusText}</span>
                        {result.timing != null && <span className="text-gray-600">Time: {result.timing.toFixed(0)} ms</span>}
                      </div>
                    </div>
                    {result.analysis && (
                      <>
                        <div className="p-4 rounded-2xl border border-gray-100 bg-gray-50/50">
                          <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                            <Server className="w-4 h-4" />
                            CORS response headers
                          </h3>
                          <ul className="space-y-1.5 text-sm font-mono">
                            {result.analysis.headers.allowOrigin != null && (
                              <li><span className="text-gray-500">Access-Control-Allow-Origin:</span> {result.analysis.headers.allowOrigin}</li>
                            )}
                            {result.analysis.headers.allowMethods != null && (
                              <li><span className="text-gray-500">Access-Control-Allow-Methods:</span> {result.analysis.headers.allowMethods}</li>
                            )}
                            {result.analysis.headers.allowHeaders != null && (
                              <li><span className="text-gray-500">Access-Control-Allow-Headers:</span> {result.analysis.headers.allowHeaders}</li>
                            )}
                            {result.analysis.headers.allowCredentials != null && (
                              <li><span className="text-gray-500">Access-Control-Allow-Credentials:</span> {result.analysis.headers.allowCredentials}</li>
                            )}
                            {result.analysis.headers.maxAge != null && (
                              <li><span className="text-gray-500">Access-Control-Max-Age:</span> {result.analysis.headers.maxAge}
                                {result.analysis.preflightCachedSeconds != null && (
                                  <span className="text-gray-500 ml-1">(preflight cached {result.analysis.preflightCachedSeconds}s)</span>
                                )}
                              </li>
                            )}
                            {result.analysis.headers.exposeHeaders != null && (
                              <li><span className="text-gray-500">Access-Control-Expose-Headers:</span> {result.analysis.headers.exposeHeaders}</li>
                            )}
                          </ul>
                        </div>
                        <div className="p-4 rounded-2xl border border-gray-100 bg-gray-50/50">
                          <h3 className="text-sm font-bold text-gray-900 mb-2">CORS policy summary</h3>
                          <p className="text-sm text-gray-700">{result.analysis.summary}</p>
                        </div>
                        <div className="p-4 rounded-2xl border border-amber-100 bg-amber-50/30">
                          <h3 className="text-sm font-bold text-gray-900 mb-2">CORS security score</h3>
                          <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold text-primary-600">{result.analysis.score}</span>
                            <span className="text-gray-500">/ 100</span>
                          </div>
                          {result.analysis.findings.length > 0 && (
                            <ul className="mt-3 space-y-2">
                              {result.analysis.findings.map((f, i) => (
                                <li key={i} className={`rounded-lg border px-3 py-2 text-sm ${severityColor(f.severity)}`}>
                                  <span className="font-semibold">{f.severity}:</span> {f.message}
                                  {f.recommendation && <p className="mt-1 text-xs opacity-90">{f.recommendation}</p>}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <div className="p-4 rounded-2xl border border-red-200/80 bg-red-50/50">
                    <h3 className="text-sm font-bold text-red-800 flex items-center gap-2 mb-2">
                      <AlertTriangle className="w-4 h-4" />
                      Request failed
                    </h3>
                    <p className="text-sm text-red-700 font-mono mb-2">{result.error}</p>
                    <p className="text-sm text-gray-700">{explainBlockedReason(result.error)}</p>
                    {result.timing != null && <p className="text-xs text-gray-500 mt-2">Time to failure: {result.timing.toFixed(0)} ms</p>}
                  </div>
                )}
              </>
            )}

            {/* Request history */}
            {history.length > 0 && (
              <div>
                <button
                  type="button"
                  onClick={() => setHistoryOpen((o) => !o)}
                  className="flex items-center gap-2 rounded-lg py-1.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 w-full text-left"
                >
                  {historyOpen ? <ChevronDown className="w-4 h-4 text-gray-500" /> : <ChevronRight className="w-4 h-4 text-gray-500" />}
                  <Clock className="w-4 h-4 text-gray-500" />
                  Request history ({history.length})
                </button>
                {historyOpen && (
                  <div className="mt-2 space-y-1.5">
                    {history.map((h, i) => (
                      <div key={i} className="flex flex-wrap items-center gap-3 px-3 py-2.5 rounded-xl border border-gray-100 bg-gray-50/60 text-xs">
                        <span className={h.success ? 'text-emerald-500 font-bold' : 'text-red-500 font-bold'}>
                          {h.success ? '✓' : '✗'}
                        </span>
                        <span className="font-semibold text-gray-700 bg-gray-200 px-1.5 py-0.5 rounded">{h.method}</span>
                        <span className="font-mono text-gray-700 flex-1 truncate">{h.url}</span>
                        {h.status != null && <span className="text-gray-600">{h.status}</span>}
                        {h.score != null && (
                          <span className={`font-medium px-1.5 py-0.5 rounded ${h.score >= 80 ? 'bg-emerald-100 text-emerald-700' : h.score >= 50 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>
                            {h.score}/100
                          </span>
                        )}
                        {h.timing != null && <span className="text-gray-500">{h.timing.toFixed(0)} ms</span>}
                        <span className="text-gray-400">{new Date(h.ts).toLocaleTimeString()}</span>
                        <button
                          type="button"
                          onClick={() => { setUrl(h.url); setMethod(h.method); }}
                          className="inline-flex items-center gap-1 text-sky-600 hover:text-sky-800 font-medium"
                          title="Reload this URL + method"
                        >
                          <RotateCcw className="w-3 h-3" /> Replay
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Preflight cURL */}
            <div className="p-4 rounded-2xl border border-gray-100 bg-gray-50/50">
              <h3 className="text-sm font-bold text-gray-900 mb-2">Preflight (OPTIONS) cURL</h3>
              <pre className="p-3 rounded-xl bg-white border border-gray-100 text-xs font-mono overflow-x-auto whitespace-pre-wrap break-all">
                {preflightCurl}
              </pre>
              <button
                type="button"
                onClick={() => copyToClipboard(preflightCurl, 'preflight')}
                className="mt-2 inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50"
              >
                {copied === 'preflight' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                Copy
              </button>
            </div>

            {/* Actual request cURL */}
            <div className="p-4 rounded-2xl border border-gray-100 bg-gray-50/50">
              <h3 className="text-sm font-bold text-gray-900 mb-2">Actual request cURL</h3>
              <pre className="p-3 rounded-xl bg-white border border-gray-100 text-xs font-mono overflow-x-auto whitespace-pre-wrap break-all">
                {actualCurl}
              </pre>
              <button
                type="button"
                onClick={() => copyToClipboard(actualCurl, 'actual')}
                className="mt-2 inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50"
              >
                {copied === 'actual' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                Copy
              </button>
            </div>

            {/* Code snippets */}
            <div>
              <button
                type="button"
                onClick={() => setSnippetsOpen((o) => !o)}
                className="flex items-center gap-2 rounded-lg py-1.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 w-full text-left"
              >
                {snippetsOpen ? <ChevronDown className="w-4 h-4 text-gray-500" /> : <ChevronRight className="w-4 h-4 text-gray-500" />}
                <FileCode className="w-4 h-4 text-gray-500" />
                Code snippets
              </button>
              {snippetsOpen && (
                <div className="mt-2 space-y-3">
                  <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                    <p className="text-xs font-semibold text-gray-500 mb-1">JavaScript (fetch)</p>
                    <pre className="text-xs font-mono overflow-x-auto whitespace-pre-wrap">{CODE_SNIPPETS.fetch(url.trim(), method, withCredentials, headerRecord)}</pre>
                    <button type="button" onClick={() => copyToClipboard(CODE_SNIPPETS.fetch(url.trim(), method, withCredentials, headerRecord), 'fetch')} className="mt-1 text-xs text-primary-600 hover:underline">
                      {copied === 'fetch' ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                  <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                    <p className="text-xs font-semibold text-gray-500 mb-1">Axios</p>
                    <pre className="text-xs font-mono overflow-x-auto whitespace-pre-wrap">{CODE_SNIPPETS.axios(url.trim(), method, withCredentials, headerRecord)}</pre>
                    <button type="button" onClick={() => copyToClipboard(CODE_SNIPPETS.axios(url.trim(), method, withCredentials, headerRecord), 'axios')} className="mt-1 text-xs text-primary-600 hover:underline">
                      {copied === 'axios' ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                  <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                    <p className="text-xs font-semibold text-gray-500 mb-1">Python (requests)</p>
                    <pre className="text-xs font-mono overflow-x-auto whitespace-pre-wrap">{CODE_SNIPPETS.python(url.trim(), method, withCredentials, headerRecord)}</pre>
                    <button type="button" onClick={() => copyToClipboard(CODE_SNIPPETS.python(url.trim(), method, withCredentials, headerRecord), 'python')} className="mt-1 text-xs text-primary-600 hover:underline">
                      {copied === 'python' ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Multi-origin testing */}
            <div>
              <button
                type="button"
                onClick={() => setMultiOriginOpen((o) => !o)}
                className="flex items-center gap-2 rounded-lg py-1.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 w-full text-left"
              >
                {multiOriginOpen ? <ChevronDown className="w-4 h-4 text-gray-500" /> : <ChevronRight className="w-4 h-4 text-gray-500" />}
                <Globe className="w-4 h-4 text-gray-500" />
                Multi-origin testing
              </button>
              {multiOriginOpen && (
                <div className="mt-2 p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <p className="text-xs text-gray-600 mb-3">
                    Run the preflight cURL from each origin (e.g. in terminal or from that origin&apos;s console) to test how the API responds.
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-2 font-semibold text-gray-700">Origin</th>
                          <th className="text-left py-2 font-semibold text-gray-700">Preflight cURL</th>
                        </tr>
                      </thead>
                      <tbody>
                        {MULTI_ORIGIN_PRESETS.map((preset, i) => {
                          const o = preset.value || effectiveOrigin;
                          const curl = buildPreflightCurl(url.trim(), method, o, customHeaderNames);
                          return (
                            <tr key={i} className="border-b border-gray-100">
                              <td className="py-2 font-mono text-gray-700">{preset.label}</td>
                              <td className="py-2">
                                <pre className="font-mono whitespace-pre-wrap break-all max-w-md">{curl}</pre>
                                <button type="button" onClick={() => copyToClipboard(curl, `multi-${i}`)} className="text-primary-600 hover:underline mt-1">
                                  {copied === `multi-${i}` ? 'Copied' : 'Copy'}
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-zinc-500">
          <p className="text-center flex items-center gap-2">
            <Lock className="w-3.5 h-3.5 text-zinc-400" aria-hidden />
            Requests run from your browser. No data is stored or sent to our servers.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/curl-converter" className="inline-flex items-center gap-1.5 font-medium text-emerald-700 hover:text-emerald-800">
              cURL Converter
              <ChevronRight className="w-4 h-4" />
            </Link>
            <Link href="/jwt-decoder" className="inline-flex items-center gap-1.5 font-medium text-emerald-700 hover:text-emerald-800">
              JWT Decoder
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
        </>
      }
    />
  );
}
