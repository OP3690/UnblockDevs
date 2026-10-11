'use client';

import { useState, useRef, useMemo, useDeferredValue, useEffect } from 'react';
import {
  Key,
  Copy,
  Check,
  Download,
  AlertCircle,
  Shield,
  Eye,
  EyeOff,
  AlertTriangle,
  Clock,
  Zap,
  FileJson,
  Binary,
  Layers,
  Link2,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { trackCopy, trackCtaClick } from '@/lib/analytics';
import Link from 'next/link';
import {
  detectTokenType,
  decodeJwt,
  securityAudit,
  getTokenLifetime,
  getEntropy,
  getTokenMetadata,
  compareTokens as compareTokensLib,
  JWT_CLAIM_MEANINGS,
  type TokenDetection,
  type JwtDecoded,
  type SecurityAudit as SecurityAuditType,
  type TokenLifetime,
  type EntropyResult,
  type TokenMetadata,
} from '@/lib/tokenAnalyzer';

interface TokenDiff {
  position: number;
  char1: string;
  char2: string;
  isMatch: boolean;
}

interface BatchRow {
  raw: string;
  display: string;
  type: string;
  length: number;
  expiryStatus: 'expired' | 'soon' | 'valid' | 'n/a';
  entropy: number;
  strength: string;
  assessment: string;
  isDuplicate: boolean;
}

interface ChainToken {
  label: string;
  value: string;
}

interface ChainResult {
  label: string;
  iss: string | null;
  aud: string | null;
  sub: string | null;
  expiresAt: string | null;
  remainingMs: number | null;
}

// ---- Base64url decode helper ----
function tryBase64UrlDecode(token: string): { text: string; isJson: boolean; parsedJson?: unknown } | null {
  try {
    // Pad and swap URL-safe chars
    const base64 = token.replace(/-/g, '+').replace(/_/g, '/').padEnd(
      token.length + ((4 - (token.length % 4)) % 4), '='
    );
    const binary = atob(base64);
    // Try to get UTF-8 text
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    const text = new TextDecoder('utf-8', { fatal: true }).decode(bytes);
    try {
      const parsed = JSON.parse(text);
      return { text, isJson: true, parsedJson: parsed };
    } catch {
      return { text, isJson: false };
    }
  } catch {
    // Fallback: hex dump
    try {
      const base64 = token.replace(/-/g, '+').replace(/_/g, '/').padEnd(
        token.length + ((4 - (token.length % 4)) % 4), '='
      );
      const binary = atob(base64);
      const hex = Array.from(binary).map((c) => c.charCodeAt(0).toString(16).padStart(2, '0')).join(' ');
      return { text: hex, isJson: false };
    } catch {
      return null;
    }
  }
}

export default function TokenComparator() {
  const [token1, setToken1] = useState('');
  const [token2, setToken2] = useState('');
  const [diffResults, setDiffResults] = useState<TokenDiff[]>([]);
  const [showTokens, setShowTokens] = useState(true);
  const [copied, setCopied] = useState<string | null>(null);
  const [comparisonStats, setComparisonStats] = useState<{
    totalChars: number;
    matches: number;
    mismatches: number;
    matchPercentage: number;
    firstMismatchPosition: number | null;
    expectedChar: string;
    actualChar: string;
    token1Length: number;
    token2Length: number;
    entropy1: EntropyResult;
    entropy2: EntropyResult;
  } | null>(null);
  const resultsSectionRef = useRef<HTMLDivElement>(null);

  // Tabs: compare | batch | chain
  const [activeTab, setActiveTab] = useState<'compare' | 'batch' | 'chain'>('compare');

  // Base64 decode (for non-JWT tokens)
  const [base64Result, setBase64Result] = useState<{ text: string; isJson: boolean; parsedJson?: unknown } | null>(null);

  // Batch state
  const [batchInput, setBatchInput] = useState('');
  const [batchRows, setBatchRows] = useState<BatchRow[]>([]);

  // Token chain state
  const [chainTokens, setChainTokens] = useState<ChainToken[]>([
    { label: 'Access Token', value: '' },
    { label: 'Refresh Token', value: '' },
    { label: 'ID Token', value: '' },
  ]);
  const [chainResults, setChainResults] = useState<ChainResult[] | null>(null);

  // Defer analysis so typing stays responsive (INP)
  const deferredToken1 = useDeferredValue(token1);

  const detection: TokenDetection | null = useMemo(
    () => (deferredToken1.trim() ? detectTokenType(deferredToken1) : null),
    [deferredToken1]
  );
  const decoded: JwtDecoded | null = useMemo(
    () => (deferredToken1.trim() ? decodeJwt(deferredToken1) : null),
    [deferredToken1]
  );
  const audit: SecurityAuditType | null = useMemo(
    () => (decoded ? securityAudit(decoded) : null),
    [decoded]
  );
  const lifetime: TokenLifetime | null = useMemo(
    () => (decoded ? getTokenLifetime(decoded.decodedPayload) : null),
    [decoded]
  );
  const entropySingle: EntropyResult | null = useMemo(
    () => (deferredToken1.trim() ? getEntropy(deferredToken1) : null),
    [deferredToken1]
  );
  const metadata: TokenMetadata | null = useMemo(
    () => (deferredToken1.trim() ? getTokenMetadata(deferredToken1) : null),
    [deferredToken1]
  );

  const isNonJwt = detection && decoded === null;

  const normalizeToken = (token: string) => token.replace(/\s+/g, '');

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        e.preventDefault();
        compareTokens();
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const compareTokens = () => {
    if (!token1.trim() || !token2.trim()) {
      toast.error('Please enter both tokens to compare');
      return;
    }
    trackCtaClick('token_comparator', 'compare');
    const t1Normalized = normalizeToken(token1);
    const t2Normalized = normalizeToken(token2);
    const t1Original = token1.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    const t2Original = token2.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    const maxLength = Math.max(t1Normalized.length, t2Normalized.length);
    const diffs: TokenDiff[] = [];
    let matches = 0;
    let mismatches = 0;
    let t1OrigIdx = 0;
    let t2OrigIdx = 0;
    for (let i = 0; i < maxLength; i++) {
      const char1 = i < t1Normalized.length ? t1Normalized[i] : '';
      const char2 = i < t2Normalized.length ? t2Normalized[i] : '';
      const isMatch = char1 === char2 && char1 !== '';
      if (isMatch) matches++;
      else mismatches++;
      let origChar1 = '';
      let origChar2 = '';
      if (char1) {
        while (t1OrigIdx < t1Original.length && /\s/.test(t1Original[t1OrigIdx])) t1OrigIdx++;
        if (t1OrigIdx < t1Original.length) { origChar1 = t1Original[t1OrigIdx]; t1OrigIdx++; }
      }
      if (char2) {
        while (t2OrigIdx < t2Original.length && /\s/.test(t2Original[t2OrigIdx])) t2OrigIdx++;
        if (t2OrigIdx < t2Original.length) { origChar2 = t2Original[t2OrigIdx]; t2OrigIdx++; }
      }
      diffs.push({ position: i, char1: origChar1 || char1, char2: origChar2 || char2, isMatch });
    }
    setDiffResults(diffs);
    const libResult = compareTokensLib(token1, token2);
    const entropy1 = getEntropy(t1Normalized);
    const entropy2 = getEntropy(t2Normalized);
    setComparisonStats({
      totalChars: maxLength, matches, mismatches,
      matchPercentage: libResult.matchPercentage,
      firstMismatchPosition: libResult.firstMismatchPosition,
      expectedChar: libResult.expectedChar,
      actualChar: libResult.actualChar,
      token1Length: libResult.token1Length,
      token2Length: libResult.token2Length,
      entropy1, entropy2,
    });
    if (matches === maxLength && t1Normalized.length === t2Normalized.length) {
      toast.success('Tokens are identical! (ignoring whitespace)');
    } else {
      toast.success(`Comparison complete: ${mismatches} mismatch${mismatches !== 1 ? 'es' : ''} found`);
    }
    setTimeout(() => resultsSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
  };

  const copyToken = (token: string, tokenNum: number) => {
    navigator.clipboard.writeText(token);
    trackCopy('token_comparator');
    setCopied(`token${tokenNum}`);
    toast.success(`Token ${tokenNum} copied!`);
    setTimeout(() => setCopied(null), 2000);
  };

  const copyDecoded = (label: string, text: string) => {
    navigator.clipboard.writeText(text);
    trackCopy('token_comparator');
    toast.success(`${label} copied`);
  };

  const downloadJson = () => {
    if (!decoded) return;
    const obj = { header: decoded.decodedHeader, payload: decoded.decodedPayload, security: audit, lifetime, metadata };
    const blob = new Blob([JSON.stringify(obj, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'token-debug.json';
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Downloaded token-debug.json');
  };

  const exportDebugReport = () => {
    const lines: string[] = ['# Token Debug Report', ''];
    lines.push('## Token type', detection ? `Detected: ${detection.type} (${detection.confidence}% confidence)` : 'N/A', '');
    if (decoded) {
      lines.push('## Header', '```json', JSON.stringify(decoded.decodedHeader, null, 2), '```', '');
      lines.push('## Payload', '```json', JSON.stringify(decoded.decodedPayload, null, 2), '```', '');
    }
    if (audit) {
      lines.push('## Security', `Algorithm: ${audit.algorithm}`, `Risk: ${audit.riskLevel}`, '');
      audit.warnings.forEach((w) => lines.push(`- [${w.level}] ${w.message}`));
      lines.push('');
    }
    if (lifetime?.issuedAt) {
      lines.push('## Lifetime', `Issued: ${lifetime.issuedAt}`, `Expires: ${lifetime.expiresAt}`, '');
    }
    const blob = new Blob([lines.join('\n')], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'token-debug-report.md';
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Downloaded token-debug-report.md');
  };

  const clearAll = () => {
    setToken1('');
    setToken2('');
    setDiffResults([]);
    setComparisonStats(null);
    setBase64Result(null);
    toast.success('Cleared');
  };

  const exportComparisonJson = () => {
    if (!comparisonStats) return;
    const report = {
      timestamp: new Date().toISOString(),
      token1: { length: comparisonStats.token1Length, entropy: comparisonStats.entropy1, detection: detection ? { type: detection.type, confidence: detection.confidence } : null },
      token2: { length: comparisonStats.token2Length, entropy: comparisonStats.entropy2 },
      comparison: {
        matchPercentage: comparisonStats.matchPercentage, matches: comparisonStats.matches, mismatches: comparisonStats.mismatches,
        firstMismatchPosition: comparisonStats.firstMismatchPosition, expectedChar: comparisonStats.expectedChar,
        actualChar: comparisonStats.actualChar, identical: comparisonStats.mismatches === 0,
      },
    };
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `token-comparison-${Date.now()}.json`;
    a.click();
    toast.success('Comparison JSON downloaded');
  };

  const renderTokenWithDiff = (token: string, isToken1: boolean) => {
    if (!diffResults.length) {
      return (
        <div className="font-mono text-sm break-all bg-gray-50 p-4 rounded-lg border border-gray-200 whitespace-pre-wrap">
          {showTokens ? token : token.replace(/./g, '•')}
        </div>
      );
    }
    return (
      <div className="font-mono text-sm break-all bg-gray-50 p-4 rounded-lg border border-gray-200 whitespace-pre-wrap">
        {diffResults.map((diff, idx) => {
          const char = isToken1 ? diff.char1 : diff.char2;
          if (!char && idx < diffResults.length - 1) return null;
          const bgColor = diff.isMatch ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800 border-2 border-red-300';
          if (char === '\n') return <span key={idx} className={bgColor} title={`Position ${diff.position + 1}`}>{'\n'}</span>;
          return (
            <span key={idx} className={bgColor} title={`Position ${diff.position + 1}`}>
              {showTokens ? char : char === ' ' ? ' ' : '•'}
            </span>
          );
        })}
      </div>
    );
  };

  const formatMs = (ms: number) => {
    if (ms < 60000) return `${Math.round(ms / 1000)}s`;
    return `${Math.round(ms / 60000)}m`;
  };

  // ---- Base64 decode ----
  const handleBase64Decode = () => {
    const result = tryBase64UrlDecode(token1.trim());
    if (!result) { toast.error('Could not decode — token may not be base64url'); return; }
    setBase64Result(result);
  };

  // ---- Batch analysis ----
  const analyzeBatch = () => {
    const lines = batchInput.split('\n').map((t) => t.trim()).filter(Boolean);
    if (lines.length === 0) { toast.error('Enter at least one token'); return; }

    // Find prefix groups for duplicate detection
    const prefixMap: Record<string, number[]> = {};
    lines.forEach((t, i) => {
      const prefix = t.slice(0, 24);
      if (!prefixMap[prefix]) prefixMap[prefix] = [];
      prefixMap[prefix].push(i);
    });
    const duplicateIdxs = new Set<number>();
    Object.values(prefixMap).forEach((idxs) => { if (idxs.length > 1) idxs.forEach((i) => duplicateIdxs.add(i)); });

    const rows: BatchRow[] = lines.map((token, i) => {
      const det = detectTokenType(token);
      const ent = getEntropy(token);
      const dec = decodeJwt(token);
      let expiryStatus: BatchRow['expiryStatus'] = 'n/a';
      if (dec) {
        const lt = getTokenLifetime(dec.decodedPayload);
        if (lt?.remainingMs != null) {
          expiryStatus = lt.remainingMs < 0 ? 'expired' : lt.remainingMs < 5 * 60 * 1000 ? 'soon' : 'valid';
        }
      }
      const aud = dec ? securityAudit(dec) : null;
      let assessment = 'OK';
      if (aud) {
        assessment = aud.riskLevel === 'Critical' || aud.riskLevel === 'High'
          ? `${aud.riskLevel} risk`
          : `${aud.algorithm} / ${aud.riskLevel}`;
      } else if (ent.strength === 'Weak') {
        assessment = 'Low entropy — weak';
      }

      return {
        raw: token,
        display: token.length > 28 ? token.slice(0, 12) + '…' + token.slice(-8) : token,
        type: det?.type || 'Unknown',
        length: token.length,
        expiryStatus,
        entropy: ent.bitsPerChar,
        strength: ent.strength,
        assessment,
        isDuplicate: duplicateIdxs.has(i),
      };
    });

    setBatchRows(rows);
    toast.success(`Analyzed ${rows.length} token${rows.length !== 1 ? 's' : ''}`);
  };

  // ---- Token chain analysis ----
  const analyzeChain = () => {
    const filled = chainTokens.filter((t) => t.value.trim());
    if (filled.length < 2) { toast.error('Enter at least 2 tokens for chain analysis'); return; }

    const results: ChainResult[] = filled.map((ct) => {
      const dec = decodeJwt(ct.value.trim());
      if (!dec) return { label: ct.label, iss: null, aud: null, sub: null, expiresAt: null, remainingMs: null };
      const payload = dec.decodedPayload as Record<string, unknown>;
      const lt = getTokenLifetime(dec.decodedPayload);
      return {
        label: ct.label,
        iss: typeof payload.iss === 'string' ? payload.iss : null,
        aud: typeof payload.aud === 'string' ? payload.aud : Array.isArray(payload.aud) ? (payload.aud as string[]).join(', ') : null,
        sub: typeof payload.sub === 'string' ? payload.sub : null,
        expiresAt: lt?.expiresAt ?? null,
        remainingMs: lt?.remainingMs ?? null,
      };
    });

    setChainResults(results);
    toast.success('Chain analyzed');
  };

  const chainMaxMs = useMemo(() => {
    if (!chainResults) return 0;
    return Math.max(...chainResults.map((r) => r.remainingMs ?? 0).filter((ms) => ms > 0), 1);
  }, [chainResults]);

  const TABS = [
    { id: 'compare' as const, label: 'Compare', icon: <Key className="w-4 h-4" /> },
    { id: 'batch' as const, label: 'Batch', icon: <Layers className="w-4 h-4" /> },
    { id: 'chain' as const, label: 'Token Chain', icon: <Link2 className="w-4 h-4" /> },
  ];

  return (
    <div className="space-y-6 tool-panel-contain">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 rounded-xl p-6 text-white shadow-lg">
        <div className="flex items-center gap-3 mb-2">
          <Key className="w-8 h-8" />
          <h2 className="text-2xl font-bold">Token Comparator & JWT Security Analyzer</h2>
        </div>
        <p className="text-purple-100 text-sm mb-3">
          Compare, decode, and analyze authentication tokens entirely in your browser. Perfect for debugging JWT tokens, API keys, OAuth tokens, Bearer tokens, and session tokens.
        </p>
        <div className="flex flex-wrap gap-4 text-xs text-purple-200">
          <span className="flex items-center gap-1"><Zap className="w-4 h-4" /> Smart Token Detection (JWT, Base64, UUID, API keys)</span>
          <span className="flex items-center gap-1"><Shield className="w-4 h-4" /> Privacy First – all processing in your browser</span>
        </div>
      </div>

      {/* Privacy */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-green-900 mb-1">Privacy First</h3>
            <p className="text-sm text-green-800">All processing happens locally. No tokens are stored, logged, or transmitted. 100% client-side.</p>
          </div>
        </div>
      </div>

      {/* Tab nav */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-xl">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-white text-purple-700 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* ===== COMPARE TAB ===== */}
      {activeTab === 'compare' && (
        <>
          {/* Section 1: Token Input & Comparator */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Token Comparator</h3>
            <p className="text-sm text-gray-600 mb-3">Compare two tokens character-by-character. Paste one token to decode and analyze; paste two and click Compare for diff.</p>
            {/* Sample JWTs */}
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-gray-500">Try a sample:</span>
              <button type="button" onClick={() => { setToken1('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'); trackCtaClick('token_comparator', 'sample_jwt'); }}
                className="px-2.5 py-1.5 text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100 rounded-lg hover:bg-indigo-100">
                HS256 JWT (Token 1)
              </button>
              <button type="button" onClick={() => { setToken2('eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5ODc2NTQzMjEwIiwibmFtZSI6IkphbmUgRG9lIiwiaWF0IjoxNzE2MjM5MDIyfQ.dGVzdC1zaWduYXR1cmUtcnMyNTY'); trackCtaClick('token_comparator', 'sample_jwt2'); }}
                className="px-2.5 py-1.5 text-xs font-medium bg-violet-50 text-violet-700 border border-violet-100 rounded-lg hover:bg-violet-100">
                RS256 JWT (Token 2)
              </button>
              <button type="button" onClick={() => { setToken1('sk-proj-abc123XYZ789defGHI456jklMNO012pqrSTU345vwxYZA678'); trackCtaClick('token_comparator', 'sample_apikey'); }}
                className="px-2.5 py-1.5 text-xs font-medium bg-amber-50 text-amber-700 border border-amber-100 rounded-lg hover:bg-amber-100">
                API Key sample
              </button>
              <button type="button" onClick={() => {
                setToken1('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c');
                setToken2('eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5ODc2NTQzMjEwIiwibmFtZSI6IkphbmUgRG9lIiwiaWF0IjoxNzE2MjM5MDIyfQ.dGVzdC1zaWduYXR1cmUtcnMyNTY');
                trackCtaClick('token_comparator', 'sample_pair');
              }}
                className="px-2.5 py-1.5 text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-lg hover:bg-emerald-100">
                Load pair (HS256 vs RS256)
              </button>
              <button type="button" onClick={() => { setToken1('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNjAwMDAwMDAwLCJleHAiOjE2MDAwMDEwMDB9.invalid-signature-expired'); trackCtaClick('token_comparator', 'sample_expired'); }}
                className="px-2.5 py-1.5 text-xs font-medium bg-red-50 text-red-700 border border-red-100 rounded-lg hover:bg-red-100">
                Expired JWT
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-semibold text-gray-700">Token 1</label>
                  <div className="flex items-center gap-2">
                    <button type="button" onClick={() => setShowTokens(!showTokens)} className="p-1.5 text-gray-600 hover:bg-gray-100 rounded" title={showTokens ? 'Hide' : 'Show'}>
                      {showTokens ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                    {token1 && (
                      <button type="button" onClick={() => copyToken(token1, 1)} className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded">
                        {copied === 'token1' ? <Check className="w-4 h-4 text-blue-600" /> : <Copy className="w-4 h-4" />}
                      </button>
                    )}
                  </div>
                </div>
                <textarea
                  value={token1}
                  onChange={(e) => { setToken1(e.target.value); setBase64Result(null); }}
                  placeholder="Paste first token (JWT, API key, etc.) – also used for decode & analysis below"
                  className="w-full h-24 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 font-mono text-sm resize-none"
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-semibold text-gray-700">Token 2</label>
                  {token2 && (
                    <button type="button" onClick={() => copyToken(token2, 2)} className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded">
                      {copied === 'token2' ? <Check className="w-4 h-4 text-blue-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                  )}
                </div>
                <textarea
                  value={token2}
                  onChange={(e) => setToken2(e.target.value)}
                  placeholder="Paste second token for comparison"
                  className="w-full h-24 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 font-mono text-sm resize-none"
                />
              </div>
              <div className="flex flex-wrap gap-3">
                <button type="button" onClick={compareTokens} className="flex-1 min-w-[140px] bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all">
                  Compare Tokens
                  <kbd className="ml-2 hidden sm:inline-flex items-center rounded border border-white/30 bg-white/20 px-1 py-0.5 font-mono text-[10px]">⌘↵</kbd>
                </button>
                {comparisonStats && (
                  <button type="button" onClick={exportComparisonJson} className="px-4 py-3 bg-slate-700 text-white rounded-lg font-semibold hover:bg-slate-800 flex items-center gap-2 text-sm">
                    <Download className="w-4 h-4" />
                    Export JSON
                  </button>
                )}
                <button type="button" onClick={clearAll} className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200">
                  Clear
                </button>
              </div>
            </div>
          </div>

          {/* Section 2: Smart Token Detection */}
          {detection && (
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Smart Token Detection</h3>
              <div className="flex flex-wrap items-center gap-4">
                <span className="text-sm text-gray-600">Detected:</span>
                <span className="px-3 py-1.5 bg-indigo-100 text-indigo-800 font-semibold rounded-lg">{detection.type}</span>
                {detection.structure && <span className="text-sm text-gray-500">{detection.structure}</span>}
                <span className="text-sm text-gray-500">Confidence: {detection.confidence}%</span>
              </div>

              {/* Base64 decode for non-JWT tokens */}
              {isNonJwt && token1.trim() && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-3 mb-2">
                    <Binary className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">Base64url Decode</span>
                    <button
                      type="button"
                      onClick={handleBase64Decode}
                      className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-700 hover:bg-indigo-100"
                    >
                      Decode as Base64
                    </button>
                  </div>
                  {base64Result && (
                    <div className="mt-2 rounded-lg border border-gray-200 bg-gray-50 p-3">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-xs font-semibold text-gray-600">Decoded output</span>
                        {base64Result.isJson && (
                          <span className="px-1.5 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold rounded">Contains JSON</span>
                        )}
                        <button
                          type="button"
                          onClick={() => { navigator.clipboard.writeText(base64Result.text); toast.success('Decoded text copied'); }}
                          className="ml-auto text-xs text-blue-600 hover:underline"
                        >
                          Copy
                        </button>
                      </div>
                      {base64Result.isJson ? (
                        <pre className="text-xs font-mono whitespace-pre-wrap break-all text-gray-800 max-h-48 overflow-y-auto">
                          {JSON.stringify(base64Result.parsedJson, null, 2)}
                        </pre>
                      ) : (
                        <pre className="text-xs font-mono whitespace-pre-wrap break-all text-gray-700 max-h-32 overflow-y-auto">
                          {base64Result.text}
                        </pre>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Section 3: JWT Debugger */}
          {decoded && (
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">JWT Debugger</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-700">Header</span>
                    <button type="button" onClick={() => copyDecoded('Header', JSON.stringify(decoded.decodedHeader, null, 2))} className="text-xs text-blue-600 hover:underline">Copy</button>
                  </div>
                  <pre className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-sm overflow-x-auto">
                    {JSON.stringify(decoded.decodedHeader, null, 2)}
                  </pre>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-700">Payload</span>
                    <button type="button" onClick={() => copyDecoded('Payload', JSON.stringify(decoded.decodedPayload, null, 2))} className="text-xs text-blue-600 hover:underline">Copy</button>
                  </div>
                  <pre className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-sm overflow-x-auto">
                    {JSON.stringify(decoded.decodedPayload, null, 2)}
                  </pre>
                </div>
                <div>
                  <span className="text-sm font-semibold text-gray-700">Signature</span>
                  <p className="mt-1 text-xs text-gray-500 font-mono break-all">{decoded.signature}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Claim meanings</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border border-gray-200 rounded-lg">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="text-left py-2 px-3 font-medium">Claim</th>
                          <th className="text-left py-2 px-3 font-medium">Meaning</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.keys(decoded.decodedPayload).map((key) => (
                          <tr key={key} className="border-t border-gray-100">
                            <td className="py-2 px-3 font-mono">{key}</td>
                            <td className="py-2 px-3 text-gray-600">{JWT_CLAIM_MEANINGS[key] || '—'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Section 4: Security Analyzer */}
          {audit && (
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Security Audit</h3>
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="text-sm text-gray-600">Algorithm:</span>
                <span className="font-mono text-sm">{audit.algorithm}</span>
                <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                  audit.riskLevel === 'Critical' ? 'bg-red-100 text-red-800' :
                  audit.riskLevel === 'High' ? 'bg-orange-100 text-orange-800' :
                  audit.riskLevel === 'Medium' ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'
                }`}>
                  Risk: {audit.riskLevel}
                </span>
              </div>
              <ul className="space-y-2">
                {audit.warnings.map((w, i) => (
                  <li key={i} className={`flex items-center gap-2 text-sm ${
                    w.level === 'error' ? 'text-red-700' : w.level === 'warning' ? 'text-amber-700' : 'text-gray-600'
                  }`}>
                    <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                    {w.message}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Section 5: Token Lifetime */}
          {lifetime && (lifetime.issuedAt != null || lifetime.expiresAt != null) && (
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Token Lifetime
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                {lifetime.issuedAt && <div><span className="text-gray-500">Issued at:</span> <span className="font-mono">{lifetime.issuedAt}</span></div>}
                {lifetime.expiresAt && <div><span className="text-gray-500">Expires at:</span> <span className="font-mono">{lifetime.expiresAt}</span></div>}
                {lifetime.ageMs != null && <div><span className="text-gray-500">Token age:</span> {formatMs(lifetime.ageMs)}</div>}
                {lifetime.remainingMs != null && <div><span className="text-gray-500">Time remaining:</span> {lifetime.remainingMs < 0 ? 'Expired' : formatMs(lifetime.remainingMs)}</div>}
              </div>
              {lifetime.progressPercent != null && (
                <div className="mt-4">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Token lifetime</span>
                    <span>{lifetime.progressPercent.toFixed(0)}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 rounded-full transition-all" style={{ width: `${Math.min(100, lifetime.progressPercent)}%` }} />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Section 6: Entropy & Strength */}
          {entropySingle && (
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Entropy & Strength
              </h3>
              <div className="flex flex-wrap items-center gap-4">
                <span className="text-sm text-gray-600">Token entropy: <strong>{entropySingle.bitsPerChar} bits/char</strong></span>
                <span className={`px-2 py-1 rounded text-sm font-medium ${
                  entropySingle.strength === 'Strong' ? 'bg-green-100 text-green-800' :
                  entropySingle.strength === 'Medium' ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'
                }`}>
                  {entropySingle.strength}
                </span>
              </div>
            </div>
          )}

          {/* Section 7: Token Metadata */}
          {metadata && (
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Token Metadata</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                <div className="p-3 bg-gray-50 rounded-lg"><span className="text-gray-500 block">Length</span><span className="font-semibold">{metadata.length} chars</span></div>
                <div className="p-3 bg-gray-50 rounded-lg"><span className="text-gray-500 block">Segments</span><span className="font-semibold">{metadata.segments}</span></div>
                <div className="p-3 bg-gray-50 rounded-lg"><span className="text-gray-500 block">Encoding</span><span className="font-semibold">{metadata.encoding}</span></div>
                <div className="p-3 bg-gray-50 rounded-lg"><span className="text-gray-500 block">Alphabet</span><span className="font-semibold">{metadata.alphabetSize} chars</span></div>
              </div>
            </div>
          )}

          {/* Section 8: Copy / Export */}
          {decoded && (
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Copy / Export</h3>
              <div className="flex flex-wrap gap-3">
                <button type="button" onClick={() => copyDecoded('Decoded payload', JSON.stringify(decoded.decodedPayload, null, 2))} className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium">
                  <Copy className="w-4 h-4" /> Copy Decoded Payload
                </button>
                <button type="button" onClick={() => copyDecoded('Header', JSON.stringify(decoded.decodedHeader, null, 2))} className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium">
                  <Copy className="w-4 h-4" /> Copy Header
                </button>
                <button type="button" onClick={downloadJson} className="flex items-center gap-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-lg text-sm font-medium">
                  <FileJson className="w-4 h-4" /> Download JSON
                </button>
                <button type="button" onClick={exportDebugReport} className="flex items-center gap-2 px-4 py-2 bg-purple-100 hover:bg-purple-200 text-purple-800 rounded-lg text-sm font-medium">
                  <Download className="w-4 h-4" /> Export Debug Report
                </button>
              </div>
            </div>
          )}

          {/* Comparison Results */}
          {comparisonStats && (
            <div ref={resultsSectionRef} className="bg-white rounded-xl shadow-md p-6 border border-gray-200 scroll-mt-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Comparison Results</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="text-xl font-bold text-blue-600">Token 1</div>
                  <div className="text-sm text-gray-600">{comparisonStats.token1Length} chars</div>
                  <div className="text-xs text-gray-500">{comparisonStats.entropy1.bitsPerChar} bits/char · {comparisonStats.entropy1.strength}</div>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="text-xl font-bold text-blue-600">Token 2</div>
                  <div className="text-sm text-gray-600">{comparisonStats.token2Length} chars</div>
                  <div className="text-xs text-gray-500">{comparisonStats.entropy2.bitsPerChar} bits/char · {comparisonStats.entropy2.strength}</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="text-xl font-bold text-green-600">{comparisonStats.matches}</div>
                  <div className="text-sm text-gray-600">Matches</div>
                </div>
                <div className="text-center p-3 bg-red-50 rounded-lg border border-red-200">
                  <div className="text-xl font-bold text-red-600">{comparisonStats.mismatches}</div>
                  <div className="text-sm text-gray-600">Mismatches</div>
                </div>
              </div>
              {comparisonStats.firstMismatchPosition != null && (
                <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm">
                  <strong>First difference at position:</strong> {comparisonStats.firstMismatchPosition + 1}<br />
                  Expected: <code className="bg-white px-1 rounded">{comparisonStats.expectedChar}</code> · Actual: <code className="bg-white px-1 rounded">{comparisonStats.actualChar}</code>
                </div>
              )}
              <div className="space-y-4">
                <div>
                  <div className="text-sm font-semibold text-gray-700 mb-2">Token 1</div>
                  {renderTokenWithDiff(token1, true)}
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-700 mb-2">Token 2</div>
                  {renderTokenWithDiff(token2, false)}
                </div>
              </div>
              <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-200">
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 bg-green-300 border border-green-500 rounded flex-shrink-0" />
                  <span className="token-comparator-legend-match px-2.5 py-1 rounded-md text-sm font-bold bg-green-600 text-white">Match</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 bg-red-500 border-2 border-red-600 rounded flex-shrink-0" />
                  <span className="token-comparator-legend-mismatch px-2.5 py-1 rounded-md text-sm font-bold bg-red-600 text-white">Mismatch</span>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* ===== BATCH TAB ===== */}
      {activeTab === 'batch' && (
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-1">Batch Token Analysis</h3>
          <p className="text-sm text-gray-600 mb-4">Paste multiple tokens, one per line. The table shows type, length, expiry, entropy, and security assessment. Tokens sharing the same prefix are highlighted as potential duplicates.</p>
          <textarea
            value={batchInput}
            onChange={(e) => setBatchInput(e.target.value)}
            placeholder={`eyJhbGci...\nskprojXYZ...\nBearer abc123...`}
            rows={6}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg font-mono text-sm resize-none focus:ring-2 focus:ring-purple-500 mb-3"
          />
          <button
            type="button"
            onClick={analyzeBatch}
            className="px-5 py-2.5 bg-purple-600 text-white rounded-lg font-semibold text-sm hover:bg-purple-700"
          >
            Analyze All
          </button>

          {batchRows.length > 0 && (
            <div className="mt-5 overflow-x-auto">
              <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-gray-50 text-xs font-semibold text-gray-600">
                  <tr>
                    <th className="text-left py-2 px-3">Token</th>
                    <th className="text-left py-2 px-3">Type</th>
                    <th className="text-right py-2 px-3">Length</th>
                    <th className="text-center py-2 px-3">Expiry</th>
                    <th className="text-right py-2 px-3">Entropy</th>
                    <th className="text-left py-2 px-3">Assessment</th>
                  </tr>
                </thead>
                <tbody>
                  {batchRows.map((row, i) => (
                    <tr key={i} className={`border-t border-gray-100 ${row.isDuplicate ? 'bg-amber-50' : 'hover:bg-gray-50'}`}>
                      <td className="py-2 px-3 font-mono text-xs text-gray-700 max-w-[160px]">
                        <span title={row.raw}>{row.display}</span>
                        {row.isDuplicate && <span className="ml-1.5 px-1 py-0.5 bg-amber-200 text-amber-800 text-[9px] font-bold rounded">DUP</span>}
                      </td>
                      <td className="py-2 px-3">
                        <span className="px-1.5 py-0.5 bg-indigo-50 text-indigo-700 rounded text-xs font-medium">{row.type}</span>
                      </td>
                      <td className="py-2 px-3 text-right text-xs text-gray-600">{row.length}</td>
                      <td className="py-2 px-3 text-center">
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                          row.expiryStatus === 'expired' ? 'bg-red-100 text-red-700' :
                          row.expiryStatus === 'soon' ? 'bg-amber-100 text-amber-700' :
                          row.expiryStatus === 'valid' ? 'bg-green-100 text-green-700' :
                          'bg-gray-100 text-gray-500'
                        }`}>
                          {row.expiryStatus}
                        </span>
                      </td>
                      <td className="py-2 px-3 text-right text-xs text-gray-600">
                        {row.entropy} b/c
                        <span className={`ml-1 text-[9px] font-medium ${row.strength === 'Strong' ? 'text-green-600' : row.strength === 'Medium' ? 'text-amber-600' : 'text-red-600'}`}>
                          {row.strength}
                        </span>
                      </td>
                      <td className="py-2 px-3 text-xs text-gray-700">{row.assessment}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="text-xs text-gray-400 mt-2">DUP = tokens with the same first 24 characters (possible rotated or duplicate tokens)</p>
            </div>
          )}
        </div>
      )}

      {/* ===== CHAIN TAB ===== */}
      {activeTab === 'chain' && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-1">Token Chain Analysis</h3>
            <p className="text-sm text-gray-600 mb-4">Enter the three tokens from an auth flow. The tool checks whether they share the same issuer, audience, and subject, compares expiry times, and shows a visual validity timeline.</p>
            <div className="space-y-3">
              {chainTokens.map((ct, i) => (
                <div key={ct.label}>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">{ct.label}</label>
                  <textarea
                    value={ct.value}
                    onChange={(e) => setChainTokens((prev) => prev.map((t, j) => j === i ? { ...t, value: e.target.value } : t))}
                    placeholder={`Paste ${ct.label.toLowerCase()} here (JWT preferred)`}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg font-mono text-xs resize-none focus:ring-2 focus:ring-purple-400"
                  />
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={analyzeChain}
              className="mt-4 px-5 py-2.5 bg-purple-600 text-white rounded-lg font-semibold text-sm hover:bg-purple-700"
            >
              Analyze Chain
            </button>
          </div>

          {chainResults && (
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
              <h4 className="text-base font-bold text-gray-900 mb-4">Chain Results</h4>

              {/* Shared claims summary */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
                {(() => {
                  const issuers = new Set(chainResults.map((r) => r.iss).filter(Boolean));
                  const audiences = new Set(chainResults.map((r) => r.aud).filter(Boolean));
                  const subjects = new Set(chainResults.map((r) => r.sub).filter(Boolean));
                  return (
                    <>
                      <div className={`p-3 rounded-lg border text-sm ${issuers.size <= 1 && issuers.size > 0 ? 'bg-green-50 border-green-200' : 'bg-amber-50 border-amber-200'}`}>
                        <div className="font-semibold mb-0.5">Issuer (iss)</div>
                        <div className="text-xs text-gray-600 break-all">{issuers.size === 0 ? 'Not present' : issuers.size === 1 ? [...issuers][0] : `${issuers.size} different issuers`}</div>
                        {issuers.size === 1 && <div className="text-[10px] text-green-700 font-bold mt-1">Shared</div>}
                        {issuers.size > 1 && <div className="text-[10px] text-amber-700 font-bold mt-1">Mismatch</div>}
                      </div>
                      <div className={`p-3 rounded-lg border text-sm ${audiences.size <= 1 && audiences.size > 0 ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
                        <div className="font-semibold mb-0.5">Audience (aud)</div>
                        <div className="text-xs text-gray-600 break-all">{audiences.size === 0 ? 'Not present' : audiences.size === 1 ? [...audiences][0] : `${audiences.size} different`}</div>
                        {audiences.size === 1 && <div className="text-[10px] text-green-700 font-bold mt-1">Shared</div>}
                      </div>
                      <div className={`p-3 rounded-lg border text-sm ${subjects.size <= 1 && subjects.size > 0 ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
                        <div className="font-semibold mb-0.5">Subject (sub)</div>
                        <div className="text-xs text-gray-600 break-all">{subjects.size === 0 ? 'Not present' : subjects.size === 1 ? [...subjects][0] : `${subjects.size} different`}</div>
                        {subjects.size === 1 && <div className="text-[10px] text-green-700 font-bold mt-1">Shared</div>}
                      </div>
                    </>
                  );
                })()}
              </div>

              {/* Expiry comparison table */}
              <div className="mb-4">
                <h5 className="text-sm font-semibold text-gray-700 mb-2">Expiry Comparison</h5>
                <div className="space-y-2">
                  {[...chainResults]
                    .sort((a, b) => (a.remainingMs ?? Infinity) - (b.remainingMs ?? Infinity))
                    .map((r, i) => (
                      <div key={r.label} className={`flex items-center gap-3 p-2.5 rounded-lg border text-sm ${
                        i === 0 ? 'bg-amber-50 border-amber-200' : 'bg-gray-50 border-gray-100'
                      }`}>
                        <span className="w-28 font-medium text-gray-700 shrink-0">{r.label}</span>
                        {r.expiresAt ? (
                          <>
                            <span className="text-xs text-gray-500 shrink-0">{r.expiresAt}</span>
                            <span className={`ml-auto text-xs font-semibold ${
                              r.remainingMs == null ? 'text-gray-500' :
                              r.remainingMs < 0 ? 'text-red-600' :
                              r.remainingMs < 5 * 60 * 1000 ? 'text-amber-600' : 'text-green-600'
                            }`}>
                              {r.remainingMs == null ? 'Unknown' : r.remainingMs < 0 ? 'Expired' : formatMs(r.remainingMs) + ' left'}
                            </span>
                            {i === 0 && r.remainingMs != null && r.remainingMs > 0 && (
                              <span className="text-[10px] bg-amber-200 text-amber-800 px-1.5 py-0.5 rounded font-bold">Expires first</span>
                            )}
                          </>
                        ) : (
                          <span className="text-xs text-gray-400">No expiry found (not a JWT)</span>
                        )}
                      </div>
                    ))}
                </div>
              </div>

              {/* Visual timeline */}
              {chainResults.some((r) => r.remainingMs != null && r.remainingMs > 0) && (
                <div>
                  <h5 className="text-sm font-semibold text-gray-700 mb-2">Validity Timeline</h5>
                  <div className="space-y-2.5">
                    {chainResults
                      .filter((r) => r.remainingMs != null)
                      .map((r) => {
                        const pct = r.remainingMs != null && r.remainingMs > 0
                          ? Math.min(100, (r.remainingMs / chainMaxMs) * 100)
                          : 0;
                        const isExpired = (r.remainingMs ?? 0) < 0;
                        return (
                          <div key={r.label}>
                            <div className="flex justify-between text-xs text-gray-500 mb-1">
                              <span className="font-medium">{r.label}</span>
                              <span>{isExpired ? 'Expired' : `${Math.round(pct)}% of max remaining`}</span>
                            </div>
                            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full ${isExpired ? 'bg-red-400' : pct < 20 ? 'bg-amber-400' : 'bg-green-400'}`}
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Security Warning */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-amber-900 mb-1">Never paste production secrets into unknown tools</h3>
            <p className="text-sm text-amber-800">UnblockDevs tools run fully client-side; your tokens never leave your device. Still, only use this in environments you trust.</p>
          </div>
        </div>
      </div>

      {/* Use Cases */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Common Use Cases</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-gray-900 mb-2">JWT verification</h4>
            <p className="text-sm text-gray-700">Compare and decode JWTs, check claims and expiration.</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <h4 className="font-semibold text-gray-900 mb-2">API key validation</h4>
            <p className="text-sm text-gray-700">Verify keys match between environments.</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
            <h4 className="font-semibold text-gray-900 mb-2">Auth token debugging</h4>
            <p className="text-sm text-gray-700">Session, OAuth, Bearer tokens – decode and compare.</p>
          </div>
          <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
            <h4 className="font-semibold text-gray-900 mb-2">Hash comparison</h4>
            <p className="text-sm text-gray-700">Compare hashes and checksums character-by-character.</p>
          </div>
        </div>
      </div>

      {/* Blog links */}
      <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Learn more</h2>
        <div className="space-y-3">
          <Link href="/blog/tokens-complete-guide" className="block p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 hover:border-blue-400 hover:shadow-md transition-all">
            <h3 className="font-semibold text-gray-900 mb-1">Tokens complete guide</h3>
            <p className="text-sm text-gray-600 mb-2">What are tokens, how they work, JWT, API keys, authentication.</p>
            <span className="text-blue-600 text-sm font-medium hover:underline">Read →</span>
          </Link>
          <Link href="/blog/token-security-privacy-best-practices" className="block p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg border border-red-200 hover:border-red-400 hover:shadow-md transition-all">
            <h3 className="font-semibold text-gray-900 mb-1">Token security & privacy</h3>
            <p className="text-sm text-gray-600 mb-2">Best practices, vulnerabilities, secure storage.</p>
            <span className="text-red-600 text-sm font-medium hover:underline">Read →</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
