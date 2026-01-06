'use client';

import { useState } from 'react';
import { Key, Copy, Check, AlertCircle, CheckCircle, Shield, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';

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
  } | null>(null);

  const compareTokens = () => {
    if (!token1.trim() || !token2.trim()) {
      toast.error('Please enter both tokens to compare');
      return;
    }

    // Normalize tokens: remove all whitespace (spaces, tabs, newlines) for comparison
    // This handles cases where one token has line breaks (from PDF) and the other doesn't
    // We compare the actual content, ignoring formatting differences
    const normalizeToken = (token: string) => {
      return token.replace(/\s+/g, ''); // Remove all whitespace (spaces, tabs, newlines)
    };

    const t1Normalized = normalizeToken(token1);
    const t2Normalized = normalizeToken(token2);
    
    // Also keep original versions for display
    const t1Original = token1.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    const t2Original = token2.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    
    const maxLength = Math.max(t1Normalized.length, t2Normalized.length);
    const diffs: TokenDiff[] = [];
    let matches = 0;
    let mismatches = 0;

    // Create mapping from normalized position to original position for display
    let t1OrigIdx = 0;
    let t2OrigIdx = 0;

    for (let i = 0; i < maxLength; i++) {
      const char1 = i < t1Normalized.length ? t1Normalized[i] : '';
      const char2 = i < t2Normalized.length ? t2Normalized[i] : '';
      const isMatch = char1 === char2 && char1 !== '';

      if (isMatch) {
        matches++;
      } else {
        mismatches++;
      }

      // Find corresponding characters in original tokens (skipping whitespace)
      let origChar1 = '';
      let origChar2 = '';
      
      if (char1) {
        while (t1OrigIdx < t1Original.length && /\s/.test(t1Original[t1OrigIdx])) {
          t1OrigIdx++;
        }
        if (t1OrigIdx < t1Original.length) {
          origChar1 = t1Original[t1OrigIdx];
          t1OrigIdx++;
        }
      }
      
      if (char2) {
        while (t2OrigIdx < t2Original.length && /\s/.test(t2Original[t2OrigIdx])) {
          t2OrigIdx++;
        }
        if (t2OrigIdx < t2Original.length) {
          origChar2 = t2Original[t2OrigIdx];
          t2OrigIdx++;
        }
      }

      diffs.push({
        position: i,
        char1: origChar1 || char1,
        char2: origChar2 || char2,
        isMatch,
      });
    }

    setDiffResults(diffs);
    setComparisonStats({
      totalChars: maxLength,
      matches,
      mismatches,
      matchPercentage: maxLength > 0 ? Math.round((matches / maxLength) * 100) : 0,
    });

    if (matches === maxLength && t1.length === t2.length) {
      toast.success('Tokens are identical!');
    } else {
      toast.success(`Comparison complete: ${mismatches} mismatch${mismatches !== 1 ? 'es' : ''} found`);
    }
  };

  const copyToken = (token: string, tokenNum: number) => {
    navigator.clipboard.writeText(token);
    setCopied(`token${tokenNum}`);
    toast.success(`Token ${tokenNum} copied!`);
    setTimeout(() => setCopied(null), 2000);
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

          const bgColor = diff.isMatch
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800 border-2 border-red-300';

          // Handle newline characters - render as actual line break
          if (char === '\n') {
            return (
              <span key={idx} className={bgColor} title={`Position ${diff.position + 1}: ${diff.isMatch ? 'Match (newline)' : 'Mismatch (newline)'}`}>
                {'\n'}
              </span>
            );
          }

          return (
            <span
              key={idx}
              className={bgColor}
              title={
                diff.isMatch
                  ? `Position ${diff.position + 1}: Match`
                  : `Position ${diff.position + 1}: Mismatch (${isToken1 ? (diff.char1 === '\n' ? '\\n' : diff.char1 === ' ' ? 'space' : diff.char1) : (diff.char2 === '\n' ? '\\n' : diff.char2 === ' ' ? 'space' : diff.char2)})`
              }
            >
              {showTokens ? char : (char === ' ' ? ' ' : '•')}
            </span>
          );
        })}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 rounded-xl p-6 text-white shadow-lg">
        <div className="flex items-center gap-3 mb-2">
          <Key className="w-8 h-8" />
          <h2 className="text-2xl font-bold">Token Comparator</h2>
        </div>
        <p className="text-purple-100 text-sm">
          Compare two tokens character by character. Perfect for verifying JWT tokens, API keys, authentication tokens, and more.
        </p>
      </div>

      {/* Privacy Notice */}
      <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-green-900 mb-1">🔒 Privacy First</h3>
            <p className="text-sm text-green-800">
              <strong>We do not store, log, or transmit your tokens.</strong> All comparison happens entirely in your browser. 
              Your sensitive data never leaves your device. This tool is 100% client-side for maximum security.
            </p>
          </div>
        </div>
      </div>

      {/* Input Section */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
        <div className="space-y-4">
          {/* Token 1 */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-semibold text-gray-700">Token 1</label>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowTokens(!showTokens)}
                  className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
                  title={showTokens ? 'Hide tokens' : 'Show tokens'}
                >
                  {showTokens ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
                {token1 && (
                  <button
                    onClick={() => copyToken(token1, 1)}
                    className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                    title="Copy token 1"
                  >
                    {copied === 'token1' ? (
                      <Check className="w-4 h-4 text-blue-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                )}
              </div>
            </div>
            <textarea
              value={token1}
              onChange={(e) => setToken1(e.target.value)}
              placeholder="Paste first token here (JWT, API key, etc.)"
              className="w-full h-24 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent font-mono text-sm resize-none"
            />
          </div>

          {/* Token 2 */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-semibold text-gray-700">Token 2</label>
              {token2 && (
                <button
                  onClick={() => copyToken(token2, 2)}
                  className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                  title="Copy token 2"
                >
                  {copied === 'token2' ? (
                    <Check className="w-4 h-4 text-blue-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              )}
            </div>
            <textarea
              value={token2}
              onChange={(e) => setToken2(e.target.value)}
              placeholder="Paste second token here for comparison"
              className="w-full h-24 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent font-mono text-sm resize-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={compareTokens}
              className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg"
            >
              Compare Tokens
            </button>
            <button
              onClick={clearAll}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
            >
              Clear
            </button>
          </div>
        </div>
      </div>

      {/* Comparison Stats */}
      {comparisonStats && (
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Comparison Statistics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="text-2xl font-bold text-blue-600">{comparisonStats.totalChars}</div>
              <div className="text-sm text-gray-600 mt-1">Total Characters</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="text-2xl font-bold text-green-600">{comparisonStats.matches}</div>
              <div className="text-sm text-gray-600 mt-1">Matches</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
              <div className="text-2xl font-bold text-red-600">{comparisonStats.mismatches}</div>
              <div className="text-sm text-gray-600 mt-1">Mismatches</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
              <div className="text-2xl font-bold text-purple-600">{comparisonStats.matchPercentage}%</div>
              <div className="text-sm text-gray-600 mt-1">Match Rate</div>
            </div>
          </div>
        </div>
      )}

      {/* Comparison Results */}
      {diffResults.length > 0 && (
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Character-by-Character Comparison</h3>
          <div className="space-y-4">
            {/* Token 1 Display */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-semibold text-gray-700">Token 1</span>
                <span className="text-xs text-gray-500">({token1.length} characters)</span>
              </div>
              {renderTokenWithDiff(token1, true)}
            </div>

            {/* Token 2 Display */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-semibold text-gray-700">Token 2</span>
                <span className="text-xs text-gray-500">({token2.length} characters)</span>
              </div>
              {renderTokenWithDiff(token2, false)}
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-200">
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 bg-green-100 border border-green-300 rounded"></span>
                <span className="text-sm text-gray-700">Match</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 bg-red-100 border-2 border-red-300 rounded"></span>
                <span className="text-sm text-gray-700">Mismatch</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Use Cases */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Common Use Cases</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-gray-900 mb-2">JWT Token Verification</h4>
            <p className="text-sm text-gray-700">
              Compare JWT tokens to verify they match or identify differences in claims, signatures, or headers.
            </p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <h4 className="font-semibold text-gray-900 mb-2">API Key Validation</h4>
            <p className="text-sm text-gray-700">
              Verify API keys match between environments or check if keys were copied correctly.
            </p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
            <h4 className="font-semibold text-gray-900 mb-2">Authentication Tokens</h4>
            <p className="text-sm text-gray-700">
              Compare session tokens, OAuth tokens, or other authentication credentials for debugging.
            </p>
          </div>
          <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
            <h4 className="font-semibold text-gray-900 mb-2">Hash Comparison</h4>
            <p className="text-sm text-gray-700">
              Compare hashes, checksums, or other cryptographic strings to verify integrity.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

