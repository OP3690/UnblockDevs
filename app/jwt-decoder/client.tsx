'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  Key,
  Copy,
  Check,
  Lock,
  AlertTriangle,
  Shield,
  Clock,
  ChevronRight,
  ChevronDown,
  FileCode,
  Download,
  History,
  Code,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { trackCopy, trackCtaClick } from '@/lib/analytics';
import ToolPageShell from '@/components/tools/ToolPageShell';
import type { BreadcrumbItem } from '@/components/Breadcrumb';
import {
  parseJWT,
  JWTError,
  analyzeTemporal,
  detectProvider,
  detectRisks,
  verifyHMAC,
  REGISTERED_CLAIMS,
  CLAIM_DOCS,
  humanizeClaim,
  getAlgorithmSafety,
  getSecurityScore,
  getTokenSize,
  TOKEN_SIZE_WARN_BYTES,
  type ParsedJWT,
  type TemporalAnalysis,
  type RiskItem,
} from '@/lib/jwtDecoderEngine';

const TAB_DECODE = 'decode';
const TAB_ANALYZE = 'analyze';
const TAB_VERIFY = 'verify';
type TabId = typeof TAB_DECODE | typeof TAB_ANALYZE | typeof TAB_VERIFY;

const TOKEN_HISTORY_KEY = 'jwt-decoder-recent-tokens';
const TOKEN_HISTORY_MAX = 5;

const SAMPLE_JWT =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

function objectToYAML(obj: Record<string, unknown>, indent = 0): string {
  const pad = '  '.repeat(indent);
  const lines: string[] = [];
  for (const [k, v] of Object.entries(obj)) {
    if (v != null && typeof v === 'object' && !Array.isArray(v) && !(v instanceof Date)) {
      lines.push(`${pad}${k}:`);
      lines.push(objectToYAML(v as Record<string, unknown>, indent + 1));
    } else {
      const val = Array.isArray(v) ? v.join(', ') : String(v);
      lines.push(`${pad}${k}: ${val}`);
    }
  }
  return lines.join('\n');
}

export default function JWTDecoderClient() {
  const [token, setToken] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [verifySecret, setVerifySecret] = useState('');
  const [verifyResult, setVerifyResult] = useState<{ valid: boolean; error?: string; message?: string } | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabId>(TAB_DECODE);
  const [debugOpen, setDebugOpen] = useState(false);
  const [recentTokens, setRecentTokens] = useState<string[]>([]);

  const { parsed, parseError } = useMemo(() => {
    const t = token.trim();
    if (!t) return { parsed: null as ParsedJWT | null, parseError: null as string | null };
    try {
      return { parsed: parseJWT(t), parseError: null };
    } catch (e) {
      return {
        parsed: null,
        parseError: e instanceof JWTError ? e.message : String(e),
      };
    }
  }, [token]);

  useEffect(() => {
    setError(parseError);
  }, [parseError]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const hash = window.location.hash.slice(1);
    const fromUrl = params.get('token') || hash;
    if (fromUrl) setToken(fromUrl);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const raw = sessionStorage.getItem(TOKEN_HISTORY_KEY);
      const list = raw ? (JSON.parse(raw) as string[]) : [];
      setRecentTokens(Array.isArray(list) ? list.slice(0, TOKEN_HISTORY_MAX) : []);
    } catch {
      setRecentTokens([]);
    }
  }, []);

  const addToHistory = (t: string) => {
    const trimmed = t.trim();
    if (!trimmed) return;
    setRecentTokens((prev) => {
      const next = [trimmed, ...prev.filter((x) => x !== trimmed)].slice(0, TOKEN_HISTORY_MAX);
      try {
        sessionStorage.setItem(TOKEN_HISTORY_KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  };

  const temporal: TemporalAnalysis | null = useMemo(
    () => (parsed ? analyzeTemporal(parsed.payload, Math.floor(Date.now() / 1000)) : null),
    [parsed]
  );
  const provider = useMemo(
    () => (parsed ? detectProvider(parsed.payload) : null),
    [parsed]
  );
  const risks: RiskItem[] = useMemo(
    () => (parsed ? detectRisks(parsed.payload, parsed.header) : []),
    [parsed]
  );
  const securityScore = useMemo(
    () => (parsed ? getSecurityScore(parsed.payload, parsed.header) : null),
    [parsed]
  );
  const tokenSize = useMemo(
    () => (token.trim() ? getTokenSize(token) : null),
    [token]
  );
  const algoSafety = useMemo(
    () => (parsed?.header?.alg ? getAlgorithmSafety(parsed.header.alg as string) : null),
    [parsed]
  );

  const alg = (parsed?.header?.alg as string | undefined) ?? '';
  const algNone = alg === 'none' || !alg;
  const canVerifyHMAC = ['HS256', 'HS384', 'HS512'].includes(alg.toUpperCase());

  const handleVerify = async () => {
    trackCtaClick('jwt_decoder', 'verify');
    if (!parsed || !verifySecret.trim()) {
      toast.error('Enter a secret to verify');
      return;
    }
    if (!canVerifyHMAC) {
      setVerifyResult({ valid: false, error: `Verification for ${alg} is not supported in this tool. Use a dedicated CLI or library.` });
      return;
    }
    setVerifyResult(null);
    try {
      const result = await verifyHMAC(token.trim(), verifySecret, alg);
      setVerifyResult(result);
      if (result.valid) toast.success('Signature valid');
      else toast.error(result.error || result.message || 'Invalid signature');
    } catch (e) {
      setVerifyResult({ valid: false, error: (e as Error).message });
      toast.error((e as Error).message);
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        trackCopy('jwt_decoder');
        setCopied(label);
        toast.success('Copied to clipboard');
        setTimeout(() => setCopied(null), 2000);
      },
      () => toast.error('Copy failed')
    );
  };

  const updateUrl = (t: string) => {
    if (typeof window === 'undefined') return;
    const url = new URL(window.location.href);
    if (t.trim()) {
      url.searchParams.set('token', t.trim().slice(0, 200));
    } else {
      url.searchParams.delete('token');
    }
    window.history.replaceState({}, '', url.toString());
  };

  const jwtBreadcrumb: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Tools', href: '/tools/json' },
    { label: 'JWT Decoder' },
  ];

  return (
    <ToolPageShell
      embedTool
      showFooterBand={false}
      breadcrumbItems={jwtBreadcrumb}
      title="JWT Decoder"
      subtitle="Decode JWTs, verify HMAC signatures, check expiry, and run a security audit — 100% in your browser. Your token never leaves your device."
      toolName="jwt_decoder"
      tool={
        <>
        <div className="rounded-2xl border border-zinc-200/80 bg-white shadow-lg shadow-zinc-200/40 overflow-hidden">
          {/* Privacy badge */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 px-6 md:px-8 py-4 bg-gradient-to-r from-emerald-50/80 to-transparent border-b border-gray-100">
            <span className="text-sm text-gray-700 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100">
                <Check className="w-3.5 h-3.5 text-emerald-600" aria-hidden />
              </span>
              Runs in browser
            </span>
            <span className="text-sm text-gray-700 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100">
                <Check className="w-3.5 h-3.5 text-emerald-600" aria-hidden />
              </span>
              Token never leaves your device
            </span>
            <span className="text-sm text-gray-700 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100">
                <Check className="w-3.5 h-3.5 text-emerald-600" aria-hidden />
              </span>
              Privacy-first
            </span>
          </div>

          {/* Input */}
          <div className="px-6 md:px-8 pt-4 pb-4">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
              <label htmlFor="jwt-input" className="text-sm font-semibold text-gray-800">
                Paste JWT token
              </label>
              <div className="flex flex-wrap items-center gap-1.5">
                {recentTokens.length > 0 && (
                  <div className="flex items-center gap-1.5">
                    <History className="w-3.5 h-3.5 text-gray-500" aria-hidden />
                    <select
                      aria-label="Recent tokens"
                      className="text-xs font-medium text-gray-600 border border-gray-200 rounded-lg px-2.5 py-1.5 bg-white hover:border-gray-300 transition-colors"
                      value=""
                      onChange={(e) => {
                        const v = e.target.value;
                        if (v) setToken(v);
                        e.target.value = '';
                      }}
                    >
                      <option value="">Recent</option>
                      {recentTokens.map((t, i) => (
                        <option key={i} value={t}>
                          {t.slice(0, 40)}…
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => {
                    trackCtaClick('jwt_decoder', 'try_sample');
                    setToken(SAMPLE_JWT);
                    setError(null);
                    setVerifyResult(null);
                    updateUrl(SAMPLE_JWT);
                    addToHistory(SAMPLE_JWT);
                    toast.success('Sample JWT loaded — verify with secret: your-256-bit-secret');
                  }}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-primary-200 bg-primary-50 px-2.5 py-1.5 text-xs font-medium text-primary-700 hover:bg-primary-100 transition-colors"
                >
                  Try Sample
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setToken('');
                    setError(null);
                    setVerifyResult(null);
                    setVerifySecret('');
                    updateUrl('');
                  }}
                  className="rounded-lg px-2.5 py-1.5 text-xs font-medium text-gray-500 hover:bg-gray-100 transition-colors"
                >
                  Clear
                </button>
                {parsed && (
                  <button
                    type="button"
                    onClick={() => copyToClipboard(token.trim(), 'token')}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    {copied === 'token' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    Copy
                  </button>
                )}
              </div>
            </div>
            <textarea
              id="jwt-input"
              value={token}
              onChange={(e) => {
                setToken(e.target.value);
                updateUrl(e.target.value);
                setVerifyResult(null);
              }}
              placeholder="Paste your JWT here (header.payload.signature) or use Try Sample…"
              rows={5}
              className="w-full min-h-[120px] px-4 py-3.5 border border-gray-200 rounded-xl font-mono text-sm leading-relaxed resize-y focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-shadow placeholder:text-gray-400"
              spellCheck={false}
              aria-label="JWT token"
            />
            {error && (
              <div className="mt-2 flex items-center gap-2 rounded-xl bg-red-50 border border-red-100 px-3 py-2 text-red-700 text-sm">
                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                {error}
              </div>
            )}
          </div>

          {parsed && (
            <>
              {/* Tabs */}
              <div className="px-6 md:px-8 pt-2 pb-4">
                <nav className="flex flex-wrap gap-2" aria-label="Decoder sections">
                  <button
                    type="button"
                    onClick={() => setActiveTab(TAB_DECODE)}
                    className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${
                      activeTab === TAB_DECODE
                        ? 'bg-primary-600 text-white shadow-md shadow-primary-200/50'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800'
                    }`}
                  >
                    Decode
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab(TAB_ANALYZE)}
                    className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${
                      activeTab === TAB_ANALYZE
                        ? 'bg-primary-600 text-white shadow-md shadow-primary-200/50'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800'
                    }`}
                  >
                    Analyze
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab(TAB_VERIFY)}
                    className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${
                      activeTab === TAB_VERIFY
                        ? 'bg-primary-600 text-white shadow-md shadow-primary-200/50'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800'
                    }`}
                  >
                    Verify
                  </button>
                </nav>
              </div>

              {activeTab === TAB_DECODE && (
                <>
              {/* Visual token breakdown */}
              <div className="px-6 md:px-8 pb-4">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Token structure</p>
                <div className="flex flex-wrap items-center gap-2 font-mono text-xs overflow-x-auto p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <span className="px-2.5 py-1.5 rounded-lg bg-blue-100 text-blue-800 break-all" title="Header">
                    {parsed.raw.header.slice(0, 30)}…
                  </span>
                  <span className="text-gray-400">.</span>
                  <span className="px-2.5 py-1.5 rounded-lg bg-emerald-100 text-emerald-800 break-all" title="Payload">
                    {parsed.raw.payload.slice(0, 30)}…
                  </span>
                  <span className="text-gray-400">.</span>
                  <span className="px-2.5 py-1.5 rounded-lg bg-rose-100 text-rose-800 break-all" title="Signature">
                    {parsed.raw.signature.slice(0, 20)}…
                  </span>
                </div>
              </div>

              {/* Header panel */}
              <div className="px-6 md:px-8 pb-6">
                <div className="flex items-center justify-between gap-3 mb-3">
                  <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                    <Key className="w-4 h-4 text-blue-600" />
                    Header
                  </h3>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(JSON.stringify(parsed.header, null, 2), 'header')}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    {copied === 'header' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied === 'header' ? 'Copied' : 'Copy'}
                  </button>
                </div>
                <pre className="p-4 bg-gray-50 rounded-xl border border-gray-100 text-sm overflow-x-auto font-mono leading-relaxed">
                  {JSON.stringify(parsed.header, null, 2)}
                </pre>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-xl bg-blue-100 text-blue-800 text-xs font-semibold">
                    {alg || 'unknown'}
                  </span>
                  {algoSafety === 'dangerous' && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-red-100 text-red-800 text-xs font-semibold">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      Dangerous
                    </span>
                  )}
                  {algoSafety === 'safe' && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-semibold">
                      <Check className="w-3.5 h-3.5" />
                      Safe
                    </span>
                  )}
                </div>
              </div>

              {/* Payload panel */}
              <div className="px-6 md:px-8 pb-6">
                <div className="flex items-center justify-between gap-3 mb-3">
                  <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-emerald-600" />
                    Payload
                  </h3>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(JSON.stringify(parsed.payload, null, 2), 'payload')}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    {copied === 'payload' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied === 'payload' ? 'Copied' : 'Copy'}
                  </button>
                </div>
                <pre className="p-4 bg-gray-50 rounded-xl border border-gray-100 text-sm overflow-x-auto font-mono leading-relaxed">
                  {JSON.stringify(parsed.payload, null, 2)}
                </pre>
                {provider && (
                  <p className="mt-3 text-xs text-gray-600 flex flex-wrap items-center gap-1">
                    <span>Provider:</span>
                    <span style={{ color: provider.color }} className="font-medium">{provider.icon} {provider.name}</span>
                    {provider.detectedVia && provider.detectedVia.length > 0 && (
                      <span className="text-gray-500">(via {provider.detectedVia.join(', ')})</span>
                    )}
                  </p>
                )}
                <p className="mt-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Claim explorer</p>
                <div className="mt-2 p-3 bg-gray-50 rounded-xl border border-gray-100 space-y-2">
                  {Object.entries(parsed.payload).map(([key, value]) => (
                    <div key={key} className="flex flex-wrap items-baseline gap-2 text-xs">
                      <span
                        className="font-mono font-medium text-gray-700"
                        title={CLAIM_DOCS[key] ?? undefined}
                      >
                        {key}
                      </span>
                      {REGISTERED_CLAIMS[key] && (
                        <span className="text-gray-500" title={CLAIM_DOCS[key] ?? undefined}>
                          → {REGISTERED_CLAIMS[key].name}
                        </span>
                      )}
                      <span className="text-gray-600">= {humanizeClaim(key, value)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Timeline */}
              {temporal && (temporal.issuedAt || temporal.expiresAt) && (
                <div className="px-6 md:px-8 pb-6">
                  <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2 mb-3">
                    <Clock className="w-4 h-4 text-amber-600" />
                    Expiration & timeline
                  </h3>
                  <div className="p-4 rounded-2xl border border-amber-200/80 bg-amber-50/80">
                    <div className="grid grid-cols-3 gap-2 text-xs font-medium text-gray-600 mb-2">
                      <span>Issued</span>
                      <span className="text-center">Now</span>
                      <span className="text-right">Expiration</span>
                    </div>
                    <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
                      <span
                        className="absolute inset-y-0 left-0 bg-amber-400 rounded-full transition-all"
                        style={{ width: `${Math.min(100, temporal.percentUsed ?? 0)}%` }}
                      />
                      <span
                        className="absolute top-1/2 w-1 h-4 -translate-y-1/2 bg-gray-700 rounded-sm"
                        style={{ left: `${Math.min(100, Math.max(0, temporal.percentUsed ?? 0))}%` }}
                        aria-hidden
                      />
                    </div>
                    <div className="mt-3 flex flex-wrap gap-4 text-sm">
                      {temporal.tokenAge != null && (
                        <span className="text-gray-700">Token issued: <strong>{temporal.tokenAge} ago</strong></span>
                      )}
                      {temporal.timeToExpiry != null && (
                        <span className={temporal.isExpired ? 'text-red-600 font-semibold' : 'text-gray-700'}>
                          {temporal.isExpired ? 'Expired' : 'Expires in:'} <strong>{temporal.timeToExpiry}</strong>
                        </span>
                      )}
                    </div>
                    <div className="mt-2 flex flex-wrap gap-4 text-xs text-gray-500">
                      {temporal.issuedAt && <span>Issued: {new Date(temporal.issuedAt).toUTCString()}</span>}
                      {temporal.expiresAt && (
                        <span>
                          Expires: {new Date(temporal.expiresAt).toUTCString()}
                          {temporal.isExpired && ' (expired)'}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Token size */}
              {tokenSize && (
                <div className="px-6 md:px-8 pb-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-700">
                      {tokenSize.bytes} bytes
                    </span>
                    {tokenSize.bytes >= TOKEN_SIZE_WARN_BYTES && (
                      <span className="text-xs text-amber-600 font-medium">Large token — may cause header size issues</span>
                    )}
                  </div>
                </div>
              )}

              {/* Debug info */}
              <div className="px-6 md:px-8 pb-4">
                <button
                  type="button"
                  onClick={() => setDebugOpen((o) => !o)}
                  className="flex items-center gap-2 rounded-lg py-1.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors w-full text-left"
                >
                  {debugOpen ? <ChevronDown className="w-4 h-4 text-gray-500" /> : <ChevronRight className="w-4 h-4 text-gray-500" />}
                  <FileCode className="w-4 h-4 text-gray-500" />
                  Developer debug info
                </button>
                {debugOpen && parsed && (
                  <div className="mt-2 p-4 bg-gray-50 rounded-xl border border-gray-100 text-xs font-mono space-y-2">
                    <p>Header (base64): {parsed.raw.header.length} chars</p>
                    <p>Payload (base64): {parsed.raw.payload.length} chars</p>
                    <p>Signature: {parsed.raw.signature.length} chars</p>
                  </div>
                )}
              </div>

              {/* Export */}
              <div className="px-6 md:px-8 pb-6">
                <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Export
                </h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const data = { header: parsed.header, payload: parsed.payload };
                      copyToClipboard(JSON.stringify(data, null, 2), 'export');
                    }}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    {copied === 'export' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    JSON
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const yaml = `header:\n${objectToYAML(parsed.header as Record<string, unknown>, 1)}\npayload:\n${objectToYAML(parsed.payload as Record<string, unknown>, 1)}`;
                      copyToClipboard(yaml, 'export');
                    }}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    YAML
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const rows = [
                        ['claim', 'value'],
                        ...Object.entries(parsed.payload).map(([k, v]) => [k, humanizeClaim(k, v)]),
                      ];
                      const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n');
                      copyToClipboard(csv, 'export');
                    }}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    CSV
                  </button>
                </div>
              </div>
                </>
              )}

              {activeTab === TAB_ANALYZE && (
                <div className="px-6 md:px-8 py-6 space-y-6">
                  {/* Security score */}
                  {securityScore && (
                    <div className="p-4 rounded-2xl border border-primary-200/80 bg-primary-50/50">
                      <h3 className="text-sm font-bold text-gray-900 mb-3">JWT Security Score</h3>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-primary-600">{securityScore.score}</span>
                        <span className="text-gray-500">/ {securityScore.max}</span>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <span className="inline-flex rounded-full bg-white/80 px-2.5 py-0.5 text-xs font-medium text-gray-700 border border-primary-100">
                          Expiration {securityScore.breakdown.expiration}
                        </span>
                        <span className="inline-flex rounded-full bg-white/80 px-2.5 py-0.5 text-xs font-medium text-gray-700 border border-primary-100">
                          Issuer {securityScore.breakdown.issuer}
                        </span>
                        <span className="inline-flex rounded-full bg-white/80 px-2.5 py-0.5 text-xs font-medium text-gray-700 border border-primary-100">
                          Algorithm {securityScore.breakdown.algorithm}
                        </span>
                        <span className="inline-flex rounded-full bg-white/80 px-2.5 py-0.5 text-xs font-medium text-gray-700 border border-primary-100">
                          Audience {securityScore.breakdown.audience}
                        </span>
                        <span className="inline-flex rounded-full bg-white/80 px-2.5 py-0.5 text-xs font-medium text-gray-700 border border-primary-100">
                          Replay {securityScore.breakdown.replayProtection}
                        </span>
                        <span className="inline-flex rounded-full bg-white/80 px-2.5 py-0.5 text-xs font-medium text-gray-700 border border-primary-100">
                          Lifespan {securityScore.breakdown.lifespan}
                        </span>
                      </div>
                    </div>
                  )}
                  {/* Vulnerability scanner */}
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2 mb-3">
                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                      Security vulnerability scanner
                    </h3>
                    {risks.length === 0 ? (
                      <p className="text-sm text-gray-700 p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200/80">
                        No obvious vulnerabilities detected. Always verify signature and issuer in production.
                      </p>
                    ) : (
                      <ul className="space-y-2">
                        {risks.map((r, i) => (
                          <li
                            key={i}
                            className={`flex items-start gap-2 p-3 rounded-xl border text-sm ${
                              r.level === 'CRITICAL'
                                ? 'bg-red-50 border-red-200/80 text-red-800'
                                : r.level === 'HIGH'
                                ? 'bg-orange-50 border-orange-200/80 text-orange-800'
                                : r.level === 'MEDIUM'
                                ? 'bg-amber-50 border-amber-200/80 text-amber-800'
                                : 'bg-gray-50 border-gray-200 text-gray-700'
                            }`}
                          >
                            <span className="font-semibold shrink-0">{r.level}:</span>
                            <span>{r.message}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              )}

              {activeTab === TAB_VERIFY && (
                <div className="px-6 md:px-8 py-6 space-y-6">
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2 mb-3">
                      <Lock className="w-4 h-4 text-primary-600" />
                      Signature verification
                    </h3>
                    {algNone ? (
                      <p className="text-sm text-red-700 p-4 rounded-2xl bg-red-50 border border-red-200/80">
                        This token uses &quot;none&quot; algorithm — it cannot be verified and is a security risk.
                      </p>
                    ) : canVerifyHMAC ? (
                      <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 space-y-3">
                        <p className="text-xs text-gray-600">
                          Algorithm: <strong>{alg}</strong> (HMAC). Enter the secret to verify. Your secret never leaves this browser.
                        </p>
                        <div className="flex gap-2 flex-wrap">
                          <input
                            type="password"
                            value={verifySecret}
                            onChange={(e) => {
                              setVerifySecret(e.target.value);
                              setVerifyResult(null);
                            }}
                            placeholder="Enter secret (HMAC key)"
                            className="flex-1 min-w-[200px] px-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm font-mono placeholder:text-gray-400"
                            aria-label="Secret for signature verification"
                          />
                          <button
                            type="button"
                            onClick={handleVerify}
                            className="px-4 py-2.5 bg-primary-600 text-white rounded-xl font-medium text-sm hover:bg-primary-700 transition-colors shadow-sm"
                          >
                            Verify
                          </button>
                        </div>
                        {verifyResult && (
                          <div
                            className={`p-3 rounded-xl text-sm ${
                              verifyResult.valid
                                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                                : 'bg-red-50 text-red-800 border border-red-200'
                            }`}
                          >
                            {verifyResult.valid ? (
                              <span className="flex items-center gap-2 font-semibold">
                                <Check className="w-4 h-4" />
                                Signature verified successfully
                              </span>
                            ) : (
                              <span>{verifyResult.error || verifyResult.message || 'Invalid signature'}</span>
                            )}
                          </div>
                        )}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-600 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                        Verification for <strong>{alg}</strong> (asymmetric) requires a public key or JWKS URL. This tool supports HMAC (HS256/HS384/HS512). For RS256/ES256 use a CLI or a dedicated tool.
                      </p>
                    )}
                  </div>

                  {/* API request simulator */}
                  <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                    <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2 mb-2">
                      <Code className="w-4 h-4 text-gray-600" />
                      API request (Authorization header)
                    </h3>
                    <div className="p-3 bg-white rounded-xl border border-gray-100 font-mono text-xs break-all text-gray-700">
                      Authorization: Bearer {token.trim().slice(0, 60)}…
                    </div>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(`Authorization: Bearer ${token.trim()}`, 'auth')}
                      className="mt-2 inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                    >
                      {copied === 'auth' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      Copy header
                    </button>
                  </div>

                  {/* Code examples */}
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2 mb-2">
                      <FileCode className="w-4 h-4 text-gray-600" />
                      Code examples
                    </h3>
                    <p className="text-xs text-gray-500 mb-3">Verify this JWT in your app (replace secret and token):</p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2 p-3 rounded-xl bg-gray-50 border border-gray-100 hover:border-gray-200 transition-colors">
                        <span className="text-xs font-medium text-gray-700">Node.js (jsonwebtoken)</span>
                        <button
                          type="button"
                          onClick={() => {
                            const code = `const jwt = require('jsonwebtoken');\nconst token = 'YOUR_TOKEN';\nconst secret = 'YOUR_SECRET';\ntry {\n  const decoded = jwt.verify(token, secret);\n  console.log(decoded);\n} catch (err) {\n  console.error(err);\n}`;
                            copyToClipboard(code, 'node');
                          }}
                          className="inline-flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-2 py-1 text-xs font-medium text-primary-600 hover:bg-primary-50 transition-colors"
                        >
                          {copied === 'node' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                          {copied === 'node' ? 'Copied' : 'Copy'}
                        </button>
                      </div>
                      <div className="flex items-center justify-between gap-2 p-3 rounded-xl bg-gray-50 border border-gray-100 hover:border-gray-200 transition-colors">
                        <span className="text-xs font-medium text-gray-700">Python (PyJWT)</span>
                        <button
                          type="button"
                          onClick={() => {
                            const code = `import jwt\ntoken = "YOUR_TOKEN"\nsecret = "YOUR_SECRET"\ntry:\n    decoded = jwt.decode(token, secret, algorithms=["HS256"])\n    print(decoded)\nexcept jwt.InvalidTokenError as e:\n    print(e)`;
                            copyToClipboard(code, 'python');
                          }}
                          className="inline-flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-2 py-1 text-xs font-medium text-primary-600 hover:bg-primary-50 transition-colors"
                        >
                          {copied === 'python' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                          {copied === 'python' ? 'Copied' : 'Copy'}
                        </button>
                      </div>
                      <div className="flex items-center justify-between gap-2 p-3 rounded-xl bg-gray-50 border border-gray-100 hover:border-gray-200 transition-colors">
                        <span className="text-xs font-medium text-gray-700">Go (golang-jwt/jwt)</span>
                        <button
                          type="button"
                          onClick={() => {
                            const code = `token, err := jwt.Parse(tokenString, func(t *jwt.Token) (interface{}, error) {\n  return []byte("YOUR_SECRET"), nil\n})\nif err != nil { return err }\nif claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {\n  // use claims\n}`;
                            copyToClipboard(code, 'go');
                          }}
                          className="inline-flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-2 py-1 text-xs font-medium text-primary-600 hover:bg-primary-50 transition-colors"
                        >
                          {copied === 'go' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                          {copied === 'go' ? 'Copied' : 'Copy'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {!token.trim() && (
            <div className="px-6 md:px-8 pb-8 pt-2 text-center">
              <p className="text-sm text-gray-500 mb-2">Paste a JWT above or use <strong>Try Sample</strong> to explore.</p>
              <p className="text-xs text-gray-400">You can also add <code className="bg-gray-100 px-1.5 py-0.5 rounded">?token=...</code> to the URL.</p>
            </div>
          )}
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-zinc-500">
          <p className="text-center flex items-center gap-2">
            <Lock className="w-3.5 h-3.5 text-zinc-400" aria-hidden />
            Decoding and verification run in your browser. Token and secret never leave your device.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/base64-encoder" className="inline-flex items-center gap-1.5 font-medium text-emerald-700 hover:text-emerald-800">
              Base64 Encoder
              <ChevronRight className="w-4 h-4" />
            </Link>
            <Link href="/password-generator" className="inline-flex items-center gap-1.5 font-medium text-emerald-700 hover:text-emerald-800">
              Password Generator
              <ChevronRight className="w-4 h-4" />
            </Link>
            <Link href="/token-comparator" className="inline-flex items-center gap-1.5 font-medium text-emerald-700 hover:text-emerald-800">
              Compare two JWTs
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
        </>
      }
    />
  );
}
