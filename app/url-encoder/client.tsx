'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Copy,
  Check,
  Shield,
  ChevronDown,
  ChevronRight,
  AlertTriangle,
  Code2,
  FileCode2,
  ScanSearch,
  Plus,
  Trash2,
} from 'lucide-react';
import toast from 'react-hot-toast';
import {
  type EncodeMode,
  type EncodingStandard,
  type ParsedUrl,
  type SecurityWarning,
  encodeByStandard,
  decodeByStandard,
  autoTransform,
  parseUrl,
  buildUrlFromParsed,
  detectDoubleEncoding,
  analyzeSecurity,
  normalizeUrl,
  encodingVisualization,
  getRequestSimulation,
  getUrlLengthInfo,
  detectBase64,
  CODE_SNIPPETS,
  ENCODING_STANDARDS,
  SAMPLE_URL,
} from '@/lib/urlEncoderEngine';

const HISTORY_KEY = 'url-encoder-history';
const HISTORY_MAX = 15;
const DEBOUNCE_MS = 120;

export default function UrlEncoderClient() {
  const [mode, setMode] = useState<EncodeMode>('auto');
  const [standard, setStandard] = useState<EncodingStandard>('uriComponent');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [parsed, setParsed] = useState<ParsedUrl | null>(null);
  const [editedParams, setEditedParams] = useState<{ key: string; value: string }[]>([]);
  const [doubleEncode, setDoubleEncode] = useState<ReturnType<typeof detectDoubleEncoding> | null>(null);
  const [securityWarnings, setSecurityWarnings] = useState<SecurityWarning[]>([]);
  const [bulkInput, setBulkInput] = useState('');
  const [bulkOutput, setBulkOutput] = useState<string[]>([]);
  const [bulkMode, setBulkMode] = useState(false);
  const [showParse, setShowParse] = useState(true);
  const [showSecurity, setShowSecurity] = useState(true);
  const [showSnippets, setShowSnippets] = useState(false);
  const [requestLine, setRequestLine] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Live transform
  useEffect(() => {
    if (bulkMode) return;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const trimmed = input.trim();
      if (!trimmed) {
        setOutput('');
        setParsed(null);
        setDoubleEncode(null);
        setSecurityWarnings([]);
        return;
      }
      if (mode === 'encode') {
        setOutput(encodeByStandard(trimmed, standard));
      } else if (mode === 'decode') {
        const decoded = decodeByStandard(trimmed, standard);
        setOutput(decoded);
        setDoubleEncode(detectDoubleEncoding(trimmed));
        setSecurityWarnings(analyzeSecurity(decoded));
      } else {
        const { result, mode: used } = autoTransform(trimmed, standard);
        setOutput(result);
        if (used === 'decode') {
          setDoubleEncode(detectDoubleEncoding(trimmed));
          setSecurityWarnings(analyzeSecurity(result));
        } else {
          setDoubleEncode(null);
          setSecurityWarnings([]);
        }
      }
      try {
        const p = parseUrl(trimmed);
        if (p.valid) {
          setParsed(p);
          setEditedParams(p.queryParams.length ? p.queryParams : [{ key: '', value: '' }]);
        } else {
          setParsed(null);
          setEditedParams([{ key: '', value: '' }]);
        }
      } catch {
        setParsed(null);
      }
      debounceRef.current = null;
    }, DEBOUNCE_MS);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [input, mode, standard, bulkMode]);

  // Request line when output is URL
  useEffect(() => {
    if (output && (output.startsWith('http') || parsed?.valid)) {
      setRequestLine(getRequestSimulation('GET', output.startsWith('http') ? output : (parsed ? buildUrlFromParsed({ ...parsed, queryParams: editedParams }) : output)));
    } else {
      setRequestLine('');
    }
  }, [output, parsed, editedParams]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(HISTORY_KEY);
      if (raw) setHistory(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  const addToHistory = (value: string) => {
    if (!value.trim()) return;
    setHistory((prev) => {
      const next = [value.slice(0, 200), ...prev.filter((x) => x !== value)].slice(0, HISTORY_MAX);
      try {
        localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        setCopiedId(id);
        toast.success('Copied');
        setTimeout(() => setCopiedId(null), 2000);
        addToHistory(text);
      },
      () => toast.error('Copy failed')
    );
  };

  const runBulk = () => {
    const lines = bulkInput.split('\n').map((l) => l.trim()).filter(Boolean);
    if (mode === 'encode') {
      setBulkOutput(lines.map((l) => encodeByStandard(l, standard)));
    } else if (mode === 'decode') {
      setBulkOutput(lines.map((l) => decodeByStandard(l, standard)));
    } else {
      setBulkOutput(lines.map((l) => autoTransform(l, standard).result));
    }
  };

  const updateParam = (index: number, field: 'key' | 'value', value: string) => {
    setEditedParams((prev) => {
      const next = prev.map((p, i) => (i === index ? { ...p, [field]: value } : p));
      return next;
    });
  };

  const addParam = () => setEditedParams((prev) => [...prev, { key: '', value: '' }]);
  const removeParam = (index: number) => setEditedParams((prev) => prev.filter((_, i) => i !== index));

  const rebuiltUrl = parsed
    ? buildUrlFromParsed({
        ...parsed,
        queryParams: editedParams.filter((p) => p.key.trim()),
      })
    : '';

  const lengthInfo = output && (output.startsWith('http') || parsed?.valid) ? getUrlLengthInfo(output.startsWith('http') ? output : rebuiltUrl) : null;
  const base64Detect = mode !== 'encode' && input.trim() ? detectBase64(input.trim()) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-12">
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-3" aria-label="Breadcrumb">
          <Link href="/" className="text-primary-600 hover:text-primary-700 hover:underline transition-colors">Home</Link>
          <span aria-hidden className="text-gray-300">/</span>
          <span className="text-gray-700 font-medium" aria-current="page">URL Encoder</span>
        </nav>

        <div className="rounded-2xl bg-white shadow-xl shadow-gray-200/50 border border-gray-200/80 overflow-hidden">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 px-6 md:px-8 py-4 bg-gradient-to-r from-emerald-50/80 to-transparent border-b border-gray-100">
            <span className="text-sm text-gray-700 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100">
                <Shield className="w-3.5 h-3.5 text-emerald-600" aria-hidden />
              </span>
              Runs fully in your browser
            </span>
            <span className="text-sm text-gray-700 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100">
                <Check className="w-3.5 h-3.5 text-emerald-600" aria-hidden />
              </span>
              No URLs sent to any server
            </span>
          </div>

          <div className="px-6 md:px-8 pt-4">
            <div className="flex flex-wrap gap-2 mb-4">
              {(['encode', 'decode', 'auto'] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMode(m)}
                  className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${
                    mode === m ? 'bg-primary-600 text-white shadow-md shadow-primary-200/50' : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800'
                  }`}
                >
                  {m.charAt(0).toUpperCase() + m.slice(1)}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <span className="text-sm font-medium text-gray-600">Encoding:</span>
              {ENCODING_STANDARDS.map((s) => (
                <label key={s.id} className="inline-flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="std" checked={standard === s.id} onChange={() => setStandard(s.id)} className="text-primary-600 focus:ring-primary-500" />
                  <span className="text-sm">{s.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="px-6 md:px-8 py-6 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <label className="text-sm font-semibold text-gray-800">Input</label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => { setInput(SAMPLE_URL); setBulkMode(false); }}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-primary-200 bg-primary-50 px-3 py-1.5 text-xs font-medium text-primary-700 hover:bg-primary-100 transition-colors"
                >
                  Try Example
                </button>
                <button
                  type="button"
                  onClick={() => setBulkMode(!bulkMode)}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  {bulkMode ? 'Single' : 'Bulk'}
                </button>
              </div>
            </div>

            {!bulkMode ? (
              <>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Enter URL or text to encode/decode..."
                  className="w-full min-h-[100px] rounded-xl border border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-mono text-sm"
                  spellCheck={false}
                />
                <div className="rounded-xl border border-gray-200 bg-gray-50/80 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                    <span className="text-sm font-semibold text-gray-800">Output</span>
                    <div className="flex flex-wrap gap-2">
                      <button type="button" onClick={() => output && copyToClipboard(output, 'out')} className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50">
                        {copiedId === 'out' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />} Copy
                      </button>
                      <button type="button" onClick={() => { setInput(''); setOutput(''); setParsed(null); }} className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50">
                        Clear
                      </button>
                    </div>
                  </div>
                  <pre className="font-mono text-sm text-gray-900 break-all whitespace-pre-wrap min-h-[2rem]">{output || '—'}</pre>
                </div>
              </>
            ) : (
              <>
                <textarea
                  value={bulkInput}
                  onChange={(e) => setBulkInput(e.target.value)}
                  placeholder="One URL or string per line..."
                  className="w-full min-h-[120px] rounded-xl border border-gray-200 px-4 py-3 font-mono text-sm"
                />
                <button type="button" onClick={runBulk} className="px-4 py-2 rounded-xl bg-primary-600 text-white font-medium hover:bg-primary-700">
                  Process all
                </button>
                {bulkOutput.length > 0 && (
                  <div className="rounded-xl border border-gray-200 bg-gray-50/80 p-4 space-y-2">
                    {bulkOutput.map((line, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <code className="flex-1 min-w-0 break-all text-sm font-mono">{line}</code>
                        <button type="button" onClick={() => copyToClipboard(line, `bulk-${i}`)} className="p-2 rounded-lg hover:bg-gray-200 shrink-0">
                          {copiedId === `bulk-${i}` ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-gray-400" />}
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {doubleEncode?.detected && (
              <div className="rounded-xl border-2 border-amber-200 bg-amber-50 p-4 flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-amber-800">Double encoding detected</p>
                  <p className="text-sm text-amber-700 mt-1">{doubleEncode.example}</p>
                  <p className="text-sm text-amber-700 mt-1">Decoded once: {doubleEncode.decoded}</p>
                </div>
              </div>
            )}

            {securityWarnings.length > 0 && (
              <div className="rounded-xl border-2 border-red-200 bg-red-50 p-4 space-y-2">
                <p className="font-semibold text-red-800 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" /> Security warnings
                </p>
                {securityWarnings.map((w, i) => (
                  <p key={i} className="text-sm text-red-700">{w.message}</p>
                ))}
              </div>
            )}

            {base64Detect?.detected && (
              <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
                <p className="text-sm font-medium text-blue-800">Possible Base64 detected</p>
                <p className="text-sm text-blue-700 mt-1">Decoded: {base64Detect.decoded}</p>
              </div>
            )}

            {lengthInfo && (
              <div className="rounded-xl border border-gray-200 p-4">
                <p className="text-sm font-medium text-gray-800">URL length</p>
                <p className="text-sm text-gray-600 mt-1">Total: {lengthInfo.total} chars · Query: {lengthInfo.queryLength} · Path: {lengthInfo.pathLength}</p>
                {lengthInfo.warning && <p className="text-sm text-amber-700 mt-1">{lengthInfo.warning}</p>}
              </div>
            )}

            {/* Parsed URL + Query editor */}
            {parsed?.valid && (
              <section className="rounded-xl border border-gray-200 overflow-hidden">
                <button type="button" onClick={() => setShowParse(!showParse)} className="w-full flex items-center justify-between p-4 text-left font-semibold text-gray-900 hover:bg-gray-50">
                  Parsed URL &amp; query editor
                  {showParse ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                </button>
                {showParse && (
                  <div className="border-t border-gray-200 p-4 bg-gray-50/50 space-y-4">
                    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                      <div><dt className="text-gray-500 font-medium">Protocol</dt><dd className="font-mono">{parsed.protocol || '—'}</dd></div>
                      <div><dt className="text-gray-500 font-medium">Hostname</dt><dd className="font-mono">{parsed.hostname || '—'}</dd></div>
                      <div><dt className="text-gray-500 font-medium">Port</dt><dd className="font-mono">{parsed.port || '—'}</dd></div>
                      <div><dt className="text-gray-500 font-medium">Path</dt><dd className="font-mono break-all">{parsed.path || '—'}</dd></div>
                      <div className="sm:col-span-2"><dt className="text-gray-500 font-medium">Fragment</dt><dd className="font-mono">{parsed.fragment || '—'}</dd></div>
                    </dl>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Query parameters</span>
                        <button type="button" onClick={addParam} className="inline-flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-2 py-1 text-xs font-medium text-gray-600 hover:bg-gray-50">
                          <Plus className="w-3.5 h-3.5" /> Add
                        </button>
                      </div>
                      <div className="space-y-2">
                        {editedParams.map((p, i) => (
                          <div key={i} className="flex flex-wrap items-center gap-2">
                            <input type="text" value={p.key} onChange={(e) => updateParam(i, 'key', e.target.value)} placeholder="Key" className="flex-1 min-w-[80px] rounded-lg border border-gray-200 px-3 py-2 text-sm font-mono" />
                            <input type="text" value={p.value} onChange={(e) => updateParam(i, 'value', e.target.value)} placeholder="Value" className="flex-1 min-w-[80px] rounded-lg border border-gray-200 px-3 py-2 text-sm font-mono" />
                            <button type="button" onClick={() => removeParam(i)} className="p-2 rounded-lg hover:bg-red-50 text-gray-500 hover:text-red-600" title="Remove">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                    {rebuiltUrl && (
                      <div className="pt-2">
                        <p className="text-xs font-medium text-gray-500 mb-1">Rebuilt URL</p>
                        <div className="flex items-center gap-2 flex-wrap">
                          <code className="flex-1 min-w-0 break-all text-sm font-mono bg-white border border-gray-200 rounded-lg px-3 py-2">{rebuiltUrl}</code>
                          <button type="button" onClick={() => copyToClipboard(rebuiltUrl, 'rebuilt')} className="p-2 rounded-lg hover:bg-gray-200 shrink-0">
                            {copiedId === 'rebuilt' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </section>
            )}

            {requestLine && (
              <div className="rounded-xl border border-gray-200 p-4 bg-gray-50/50">
                <p className="text-xs font-medium text-gray-500 mb-2">Request line (HTTP)</p>
                <pre className="font-mono text-sm text-gray-800 whitespace-pre-wrap break-all">{requestLine}</pre>
                <button type="button" onClick={() => copyToClipboard(requestLine, 'req')} className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-primary-600 hover:text-primary-700">
                  {copiedId === 'req' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />} Copy
                </button>
              </div>
            )}

            {output && (output.startsWith('http') || rebuiltUrl) && (
              <div className="rounded-xl border border-gray-200 p-4">
                <p className="text-xs font-medium text-gray-500 mb-2">Normalized URL</p>
                <code className="text-sm font-mono break-all text-gray-800">{normalizeUrl(output.startsWith('http') ? output : rebuiltUrl)}</code>
              </div>
            )}

            {/* Security analysis expandable */}
            {securityWarnings.length > 0 && (
              <section className="rounded-xl border border-gray-200 overflow-hidden">
                <button type="button" onClick={() => setShowSecurity(!showSecurity)} className="w-full flex items-center justify-between p-4 text-left font-semibold text-gray-900 hover:bg-gray-50">
                  Security analysis
                  {showSecurity ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                </button>
                {showSecurity && (
                  <div className="border-t border-gray-200 p-4 bg-gray-50/50 text-sm text-gray-700">
                    {securityWarnings.map((w, i) => (
                      <p key={i} className="mb-2">{w.message}</p>
                    ))}
                  </div>
                )}
              </section>
            )}

            {/* Code snippets */}
            <section className="rounded-xl border border-gray-200 overflow-hidden">
              <button type="button" onClick={() => setShowSnippets(!showSnippets)} className="w-full flex items-center justify-between p-4 text-left font-semibold text-gray-900 hover:bg-gray-50">
                Code snippets
                {showSnippets ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
              </button>
              {showSnippets && (
                <div className="border-t border-gray-200 p-4 bg-gray-900 text-gray-100 rounded-b-xl">
                  <pre className="font-mono text-sm whitespace-pre-wrap overflow-x-auto"><code>{CODE_SNIPPETS.js}</code></pre>
                  <p className="text-xs text-gray-400 mt-2">JavaScript · Use encodeURIComponent for query values.</p>
                </div>
              )}
            </section>
          </div>
        </div>

        {history.length > 0 && (
          <section className="mt-6 rounded-xl border border-gray-200 p-4">
            <h3 className="text-sm font-semibold text-gray-800 mb-2">Recent</h3>
            <div className="flex flex-wrap gap-2">
              {history.slice(0, 8).map((h, i) => (
                <button key={i} type="button" onClick={() => setInput(h)} className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm font-mono truncate max-w-[220px]">
                  {h}
                </button>
              ))}
            </div>
          </section>
        )}

        <section className="mt-10 pt-8 border-t border-gray-200">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Related tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link href="/hash-generator" className="group flex items-start gap-3 p-4 rounded-xl border border-gray-200 bg-white hover:border-primary-200 hover:shadow-md hover:bg-primary-50/30 transition-all">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-600 group-hover:bg-primary-100 group-hover:text-primary-600">
                <Code2 className="w-5 h-5" />
              </span>
              <div className="min-w-0">
                <span className="font-semibold text-gray-900 group-hover:text-primary-700 block">Hash Generator</span>
                <span className="text-sm text-gray-500 mt-0.5 block">MD5, SHA256, file hash, HMAC, bcrypt. Verify and compare.</span>
              </div>
            </Link>
            <Link href="/base64-encoder" className="group flex items-start gap-3 p-4 rounded-xl border border-gray-200 bg-white hover:border-primary-200 hover:shadow-md hover:bg-primary-50/30 transition-all">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-600 group-hover:bg-primary-100 group-hover:text-primary-600">
                <FileCode2 className="w-5 h-5" />
              </span>
              <div className="min-w-0">
                <span className="font-semibold text-gray-900 group-hover:text-primary-700 block">Base64 Encoder</span>
                <span className="text-sm text-gray-500 mt-0.5 block">Encode and decode Base64 text or files.</span>
              </div>
            </Link>
            <Link href="/jwt-decoder" className="group flex items-start gap-3 p-4 rounded-xl border border-gray-200 bg-white hover:border-primary-200 hover:shadow-md hover:bg-primary-50/30 transition-all">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-600 group-hover:bg-primary-100 group-hover:text-primary-600">
                <ScanSearch className="w-5 h-5" />
              </span>
              <div className="min-w-0">
                <span className="font-semibold text-gray-900 group-hover:text-primary-700 block">JWT Decoder</span>
                <span className="text-sm text-gray-500 mt-0.5 block">Decode and verify JSON Web Tokens.</span>
              </div>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
