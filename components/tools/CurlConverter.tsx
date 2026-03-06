'use client';

import { useState, useRef } from 'react';
import {
  Code,
  Copy,
  Check,
  Download,
  Sparkles,
  Shield,
  AlertTriangle,
  Play,
  FileJson,
  MessageSquare,
  Lock,
} from 'lucide-react';
import toast from 'react-hot-toast';
import Link from 'next/link';
import {
  parseCurl,
  beautifyCurl,
  convertToLanguage,
  getRequestBreakdown,
  getCurlWarnings,
  generatePostmanCollection,
  generateOpenAPISpec,
  generateAIPrompt,
  detectSecrets,
  type ParsedCurl,
  type CurlTarget,
} from '@/lib/curlConverter';

const TARGETS: { value: CurlTarget; label: string }[] = [
  { value: 'js_fetch', label: 'JavaScript (Fetch)' },
  { value: 'js_axios', label: 'JavaScript (Axios)' },
  { value: 'node_fetch', label: 'Node.js (fetch)' },
  { value: 'python_requests', label: 'Python (Requests)' },
  { value: 'python_httpx', label: 'Python (HTTPX)' },
  { value: 'go', label: 'Go' },
  { value: 'java', label: 'Java' },
  { value: 'php', label: 'PHP (Guzzle/cURL)' },
  { value: 'csharp', label: 'C# (HttpClient)' },
  { value: 'rust', label: 'Rust (Reqwest)' },
];

const EXAMPLE_CURLS = [
  { name: 'Simple GET', command: 'curl https://api.example.com/users' },
  { name: 'POST with JSON', command: "curl -X POST https://api.example.com/users -H \"Content-Type: application/json\" -d '{\"name\":\"John\",\"age\":30}'" },
  { name: 'With Bearer', command: 'curl -X GET https://api.example.com/data -H "Authorization: Bearer your-token-here"' },
  { name: 'With Basic Auth', command: 'curl -u username:password https://api.example.com/protected' },
];

export default function CurlConverter() {
  const [curlCommand, setCurlCommand] = useState('');
  const [convertedCode, setConvertedCode] = useState('');
  const [targetLanguage, setTargetLanguage] = useState<CurlTarget>('js_fetch');
  const [parsed, setParsed] = useState<ParsedCurl | null>(null);
  const [copied, setCopied] = useState(false);
  const [showExamples, setShowExamples] = useState(false);
  const [testResult, setTestResult] = useState<{ status?: number; body?: string; error?: string } | null>(null);
  const [testLoading, setTestLoading] = useState(false);
  const resultsSectionRef = useRef<HTMLDivElement>(null);

  const convert = () => {
    const p = parseCurl(curlCommand);
    if (!p || !p.url) {
      toast.error('Could not parse cURL command. Check the URL.');
        return;
    }
    setParsed(p);
    const code = convertToLanguage(p, targetLanguage);
    setConvertedCode(code);
    setTestResult(null);
    toast.success('Converted successfully');
    setTimeout(() => resultsSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
  };

  const handleBeautify = () => {
    const beautified = beautifyCurl(curlCommand);
    setCurlCommand(beautified);
    toast.success('cURL beautified');
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success('Copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Downloaded ' + filename);
  };

  const runTest = async () => {
    if (!parsed) return;
    setTestLoading(true);
    setTestResult(null);
    try {
      const headers: Record<string, string> = { ...parsed.headers };
      if (parsed.auth?.type === 'bearer') headers['Authorization'] = `Bearer ${parsed.auth.token}`;
      if (parsed.auth?.type === 'basic') {
        headers['Authorization'] = 'Basic ' + btoa(`${parsed.auth.username}:${parsed.auth.password}`);
      }
      const opts: RequestInit = {
        method: parsed.method,
        headers,
      };
      if (parsed.data && parsed.method !== 'GET') opts.body = parsed.data;
      const res = await fetch(parsed.url, opts);
      const text = await res.text();
      setTestResult({ status: res.status, body: text.slice(0, 2000) });
    } catch (e: any) {
      setTestResult({ error: e?.message || 'Request failed (CORS may block cross-origin requests)' });
    }
    setTestLoading(false);
  };

  const breakdown = parsed ? getRequestBreakdown(parsed) : null;
  const warnings = parsed ? getCurlWarnings(parsed) : [];
  const secrets = parsed ? detectSecrets(parsed) : [];

  return (
    <div className="space-y-6">
      {/* Privacy banner */}
      <div className="rounded-lg border border-emerald-200 bg-emerald-50/80 px-4 py-3 flex items-start gap-3">
        <Lock className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
          <div>
          <p className="font-medium text-emerald-900">All processing happens locally in your browser.</p>
          <p className="text-sm text-emerald-800 mt-0.5">Your API keys or requests are never sent to any server.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-slate-700 to-slate-800 px-6 py-5 text-white">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Code className="w-7 h-7" />
            cURL to Code Converter
            </h2>
          <p className="text-slate-200 text-sm mt-1">
            Convert cURL to production-ready code in JavaScript (Fetch/Axios), Python (Requests/HTTPX), Go, Java, PHP, C#, Rust. Export to Postman & OpenAPI.
          </p>
        </div>

        <div className="p-6 space-y-6">
        {showExamples && (
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
              <h3 className="font-semibold text-gray-900 mb-2">Example cURL commands</h3>
            <div className="space-y-2">
                {EXAMPLE_CURLS.map((ex, i) => (
                <button
                    key={i}
                    type="button"
                  onClick={() => {
                      setCurlCommand(ex.command);
                    setShowExamples(false);
                  }}
                    className="block w-full text-left p-2 bg-white rounded border border-slate-200 hover:border-slate-400 hover:bg-slate-50 text-sm"
                >
                    <span className="font-medium text-gray-700">{ex.name}</span>
                    <code className="block text-xs text-gray-600 mt-1 truncate">{ex.command}</code>
                </button>
              ))}
            </div>
          </div>
        )}

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">Paste cURL command</label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowExamples(!showExamples)}
                  className="text-sm text-slate-600 hover:text-slate-800 flex items-center gap-1"
                >
                  <Sparkles className="w-4 h-4" /> Examples
                </button>
                <button
                  type="button"
                  onClick={handleBeautify}
                  disabled={!curlCommand.trim()}
                  className="text-sm text-slate-600 hover:text-slate-800 disabled:opacity-50"
                >
                  Beautify
                </button>
              </div>
            </div>
          <textarea
            value={curlCommand}
            onChange={(e) => setCurlCommand(e.target.value)}
              placeholder={'curl -X POST https://api.example.com/data -H "Content-Type: application/json" -d \'{"key":"value"}\''}
              rows={6}
              className="w-full p-4 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-slate-500 focus:border-slate-500 resize-y"
          />
        </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Target language</label>
          <select
            value={targetLanguage}
              onChange={(e) => {
                setTargetLanguage(e.target.value as CurlTarget);
                if (parsed) setConvertedCode(convertToLanguage(parsed, e.target.value as CurlTarget));
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500"
            >
              {TARGETS.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
          </select>
        </div>

        <button
            type="button"
          onClick={convert}
          disabled={!curlCommand.trim()}
            className="w-full py-3 bg-slate-700 text-white font-semibold rounded-lg hover:bg-slate-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          Convert cURL to Code
        </button>
      </div>
      </div>

      {parsed && (
        <div ref={resultsSectionRef} className="space-y-6 scroll-mt-4">
          {/* Request breakdown */}
          {breakdown && (
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Code className="w-5 h-5 text-slate-600" />
                Request breakdown
              </h3>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div><dt className="text-gray-500">Method</dt><dd className="font-mono font-medium">{breakdown.method}</dd></div>
                <div><dt className="text-gray-500">URL</dt><dd className="font-mono break-all">{breakdown.url || '—'}</dd></div>
                <div><dt className="text-gray-500">Query params</dt><dd>{Object.keys(breakdown.queryParams).length ? Object.entries(breakdown.queryParams).map(([k, v]) => `${k}=${v}`).join(', ') : 'None'}</dd></div>
                <div><dt className="text-gray-500">Headers</dt><dd>{breakdown.headerCount}</dd></div>
                <div><dt className="text-gray-500">Auth</dt><dd>{breakdown.authSummary}</dd></div>
                <div><dt className="text-gray-500">Body</dt><dd>{breakdown.bodyType} {breakdown.bodySize ? `(${breakdown.bodySize} bytes)` : ''}</dd></div>
              </dl>
              {Object.keys(breakdown.headers).length > 0 && (
                <div className="mt-4">
                  <dt className="text-gray-500 text-sm mb-1">Headers (sanitized)</dt>
                  <pre className="text-xs font-mono bg-gray-50 p-3 rounded border border-gray-100 overflow-x-auto">
                    {Object.entries(breakdown.headers).map(([k, v]) => `${k}: ${v}`).join('\n')}
                  </pre>
                </div>
              )}
            </div>
          )}

          {/* Security */}
          {secrets.length > 0 && (
            <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 flex items-start gap-3">
              <Shield className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-amber-900">Detected: {secrets.join(', ')} (masked in breakdown)</p>
                <p className="text-sm text-amber-800 mt-0.5">Do not share generated code with real secrets. Use <Link href="/code-prompt-shield" className="underline">Code Prompt Shield</Link> before sending to AI.</p>
              </div>
            </div>
          )}

          {/* Warnings */}
          {warnings.length > 0 && (
            <div className="space-y-2">
              {warnings.map((w, i) => (
                <div
                  key={i}
                  className={`rounded-lg px-4 py-3 flex items-start gap-3 ${w.type === 'error' ? 'bg-red-50 border border-red-200' : 'bg-amber-50 border border-amber-200'}`}
                >
                  <AlertTriangle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${w.type === 'error' ? 'text-red-600' : 'text-amber-600'}`} />
                  <p className={w.type === 'error' ? 'text-red-800' : 'text-amber-800'}>{w.message}</p>
                </div>
              ))}
            </div>
          )}

          {/* Generated code + actions */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex flex-wrap items-center justify-between gap-3">
              <h3 className="font-semibold text-gray-900">Generated code ({TARGETS.find((t) => t.value === targetLanguage)?.label})</h3>
              <div className="flex flex-wrap gap-2">
              <button
                  type="button"
                  onClick={() => handleCopy(convertedCode)}
                  className="inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  Copy
              </button>
              <button
                  type="button"
                  onClick={() => {
                    const ext: Record<string, string> = { python_requests: 'py', python_httpx: 'py', php: 'php', go: 'go', java: 'java', csharp: 'cs', rust: 'rs' };
                    handleDownload(convertedCode, `request.${ext[targetLanguage] || 'js'}`);
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <Download className="w-4 h-4" />
                Download
              </button>
                <button
                  type="button"
                  onClick={runTest}
                  disabled={testLoading}
                  className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-700 text-white rounded-lg text-sm font-medium hover:bg-slate-800 disabled:opacity-50"
                >
                  <Play className="w-4 h-4" />
                  {testLoading ? 'Sending…' : 'Test API'}
                </button>
                <button
                  type="button"
                  onClick={() => handleCopy(generatePostmanCollection(parsed))}
                  className="inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <FileJson className="w-4 h-4" />
                  Postman
                </button>
                <button
                  type="button"
                  onClick={() => handleCopy(generateOpenAPISpec(parsed))}
                  className="inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  OpenAPI
                </button>
                <button
                  type="button"
                  onClick={() => handleCopy(generateAIPrompt(parsed))}
                  className="inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                  title="Copy prompt to explain this request with AI"
                >
                  <MessageSquare className="w-4 h-4" />
                  AI prompt
                </button>
              </div>
            </div>
            {testResult && (
              <div className="px-6 py-4 border-b border-gray-200 bg-slate-50">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Test result</h4>
                {testResult.error ? (
                  <p className="text-sm text-red-700">{testResult.error}</p>
                ) : (
                  <>
                    <p className="text-sm text-gray-600">Status: {testResult.status}</p>
                    <pre className="mt-2 p-3 bg-white border border-gray-200 rounded text-xs font-mono overflow-auto max-h-40 whitespace-pre-wrap">
                      {testResult.body}
                    </pre>
                  </>
                )}
          </div>
            )}
            <pre className="p-6 bg-gray-900 text-gray-100 overflow-x-auto text-sm font-mono whitespace-pre-wrap">
            <code>{convertedCode}</code>
          </pre>
          </div>
        </div>
      )}

      {/* Cross-links */}
      <div className="flex flex-wrap gap-4 text-sm">
        <Link href="/" className="text-slate-600 hover:text-slate-800 font-medium">Home</Link>
        <Link href="/ai-schema-masker" className="text-slate-600 hover:text-slate-800 font-medium">AI Schema Masker</Link>
        <Link href="/code-prompt-shield" className="text-slate-600 hover:text-slate-800 font-medium">Code Prompt Shield</Link>
        <Link href="/json-comparator" className="text-slate-600 hover:text-slate-800 font-medium">JSON Comparator</Link>
      </div>

      {/* Blog */}
      <div className="mt-12 bg-white rounded-xl shadow-lg p-8 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Learn more</h2>
        <div className="space-y-3">
          <Link href="/blog/curl-to-python-requests-complete-guide" className="block p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 hover:border-blue-400 transition-all">
            <h3 className="font-semibold text-gray-900 mb-1">cURL to Python Requests: Complete Guide</h3>
            <p className="text-sm text-gray-600 mb-2">Step-by-step with auth, headers, JSON, and error handling.</p>
            <span className="text-blue-600 text-sm font-medium hover:underline">Read →</span>
          </Link>
          <Link href="/blog/how-to-convert-curl-to-fetch-axios-automatically" className="block p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200 hover:border-green-400 transition-all">
            <h3 className="font-semibold text-gray-900 mb-1">Convert cURL to Fetch & Axios</h3>
            <p className="text-sm text-gray-600 mb-2">Automatically convert cURL to JavaScript.</p>
            <span className="text-green-600 text-sm font-medium hover:underline">Read →</span>
          </Link>
          <Link href="/blog/curl-to-code-converter-2026" className="block p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg border border-orange-200 hover:border-orange-400 transition-all">
            <h3 className="font-semibold text-gray-900 mb-1">cURL to Code in 2026</h3>
            <p className="text-sm text-gray-600 mb-2">JavaScript, Python, Go, PHP, and more.</p>
            <span className="text-orange-600 text-sm font-medium hover:underline">Read →</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
