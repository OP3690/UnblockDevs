'use client';

import { useState, useRef, useMemo } from 'react';
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
} from 'lucide-react';
import toast from 'react-hot-toast';
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

  // Single-token analysis (from Token 1)
  const detection: TokenDetection | null = useMemo(
    () => (token1.trim() ? detectTokenType(token1) : null),
    [token1]
  );
  const decoded: JwtDecoded | null = useMemo(
    () => (token1.trim() ? decodeJwt(token1) : null),
    [token1]
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
    () => (token1.trim() ? getEntropy(token1) : null),
    [token1]
  );
  const metadata: TokenMetadata | null = useMemo(
    () => (token1.trim() ? getTokenMetadata(token1) : null),
    [token1]
  );

  const normalizeToken = (token: string) => token.replace(/\s+/g, '');
  const compareTokens = () => {
    if (!token1.trim() || !token2.trim()) {
      toast.error('Please enter both tokens to compare');
      return;
    }
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
        if (t1OrigIdx < t1Original.length) {
          origChar1 = t1Original[t1OrigIdx];
          t1OrigIdx++;
        }
      }
      if (char2) {
        while (t2OrigIdx < t2Original.length && /\s/.test(t2Original[t2OrigIdx])) t2OrigIdx++;
        if (t2OrigIdx < t2Original.length) {
          origChar2 = t2Original[t2OrigIdx];
          t2OrigIdx++;
        }
      }
      diffs.push({ position: i, char1: origChar1 || char1, char2: origChar2 || char2, isMatch });
    }
    setDiffResults(diffs);
    const libResult = compareTokensLib(token1, token2);
    const entropy1 = getEntropy(t1Normalized);
    const entropy2 = getEntropy(t2Normalized);
    setComparisonStats({
      totalChars: maxLength,
      matches,
      mismatches,
      matchPercentage: libResult.matchPercentage,
      firstMismatchPosition: libResult.firstMismatchPosition,
      expectedChar: libResult.expectedChar,
      actualChar: libResult.actualChar,
      token1Length: libResult.token1Length,
      token2Length: libResult.token2Length,
      entropy1,
      entropy2,
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
    setCopied(`token${tokenNum}`);
    toast.success(`Token ${tokenNum} copied!`);
    setTimeout(() => setCopied(null), 2000);
  };

  const copyDecoded = (label: string, text: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied`);
  };

  const downloadJson = () => {
    if (!decoded) return;
    const obj = {
      header: decoded.decodedHeader,
      payload: decoded.decodedPayload,
      security: audit,
      lifetime,
      metadata,
    };
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
    const lines: string[] = [
      '# Token Debug Report',
      '',
      '## Token type',
      detection ? `Detected: ${detection.type} (${detection.confidence}% confidence)` : 'N/A',
      '',
    ];
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
    toast.success('Cleared');
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
          if (char === '\n') {
            return (
              <span key={idx} className={bgColor} title={`Position ${diff.position + 1}`}>
                {'\n'}
              </span>
            );
          }
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

  return (
    <div className="space-y-6">
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
          <span className="flex items-center gap-1">
            <Zap className="w-4 h-4" />
            Smart Token Detection (JWT, Base64, UUID, API keys)
          </span>
          <span className="flex items-center gap-1">
            <Shield className="w-4 h-4" />
            Privacy First – all processing in your browser
          </span>
        </div>
      </div>

      {/* Privacy */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-green-900 mb-1">🔒 Privacy First</h3>
            <p className="text-sm text-green-800">
              All processing happens locally. No tokens are stored, logged, or transmitted. 100% client-side.
            </p>
          </div>
        </div>
      </div>

      {/* Section 1: Token Input & Comparator */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Token Comparator</h3>
        <p className="text-sm text-gray-600 mb-4">Compare two tokens character-by-character. Paste one token to decode and analyze; paste two and click Compare for diff.</p>
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
              onChange={(e) => setToken1(e.target.value)}
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
          <div className="flex gap-3">
            <button type="button" onClick={compareTokens} className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all">
              Compare Tokens
            </button>
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
                <button type="button" onClick={() => copyDecoded('Header', JSON.stringify(decoded.decodedHeader, null, 2))} className="text-xs text-blue-600 hover:underline">
                  Copy
                </button>
              </div>
              <pre className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-sm overflow-x-auto">
                {JSON.stringify(decoded.decodedHeader, null, 2)}
              </pre>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-700">Payload</span>
                <button type="button" onClick={() => copyDecoded('Payload', JSON.stringify(decoded.decodedPayload, null, 2))} className="text-xs text-blue-600 hover:underline">
                  Copy
                </button>
              </div>
              <pre className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-sm overflow-x-auto">
                {JSON.stringify(decoded.decodedPayload, null, 2)}
              </pre>
            </div>
            <div>
              <span className="text-sm font-semibold text-gray-700">Signature</span>
              <p className="mt-1 text-xs text-gray-500 font-mono break-all">{decoded.signature}</p>
            </div>
            {/* Claim table */}
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
              <span className="w-4 h-4 bg-green-100 border border-green-300 rounded" />
              <span className="text-sm">Match</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 bg-red-100 border-2 border-red-300 rounded" />
              <span className="text-sm">Mismatch</span>
            </div>
          </div>
        </div>
      )}

      {/* Security Warning */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-amber-900 mb-1">⚠ Never paste production secrets into unknown tools</h3>
            <p className="text-sm text-amber-800">
              UnblockDevs tools run fully client-side; your tokens never leave your device. Still, only use this in environments you trust.
            </p>
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
