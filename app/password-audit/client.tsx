'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Lock, Shield, AlertTriangle, Code, Copy, Check, User, Wrench } from 'lucide-react';
import toast from 'react-hot-toast';
import {
  auditEntropy,
  auditCrackTime,
  auditStrength,
  formatCrackTime,
  detectPatterns,
  getImprovementSuggestions,
  policyToSimpleRegex,
  policyToCodeCorrect,
  DEFAULT_POLICY,
  type PasswordPolicy,
} from '@/lib/passwordAuditEngine';
import type { StrengthLevel } from '@/lib/passwordGeneratorEngine';

const STRENGTH_COLORS: Record<StrengthLevel, string> = {
  'Very Weak': 'bg-red-500',
  'Weak': 'bg-orange-500',
  'Fair': 'bg-yellow-500',
  'Strong': 'bg-lime-500',
  'Very Strong': 'bg-green-500',
  'Extreme': 'bg-emerald-600',
};

const CODE_LANGS = [
  { id: 'js' as const, name: 'JavaScript' },
  { id: 'python' as const, name: 'Python' },
  { id: 'go' as const, name: 'Go' },
  { id: 'java' as const, name: 'Java' },
  { id: 'php' as const, name: 'PHP' },
];

export default function PasswordAuditClient() {
  const [mode, setMode] = useState<'personal' | 'developer'>('personal');
  const [password, setPassword] = useState('');
  const [reveal, setReveal] = useState(false);
  const [policy, setPolicy] = useState<PasswordPolicy>(DEFAULT_POLICY);
  const [codeLang, setCodeLang] = useState<'js' | 'python' | 'go' | 'java' | 'php'>('js');
  const [copiedCode, setCopiedCode] = useState(false);

  const ent = useMemo(() => auditEntropy(password), [password]);
  const crackTime = useMemo(() => auditCrackTime(password), [password]);
  const strength = useMemo(() => auditStrength(password), [password]);
  const patterns = useMemo(() => detectPatterns(password), [password]);
  const suggestions = useMemo(
    () => getImprovementSuggestions(password, ent, patterns),
    [password, ent, patterns]
  );

  const regex = useMemo(() => policyToSimpleRegex(policy), [policy]);
  const code = useMemo(() => policyToCodeCorrect(policy, codeLang), [policy, codeLang]);

  const copyCode = () => {
    navigator.clipboard.writeText(code).then(
      () => {
        setCopiedCode(true);
        toast.success('Code copied');
        setTimeout(() => setCopiedCode(false), 2000);
      },
      () => toast.error('Copy failed')
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50/80">
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary-100 rounded-lg">
                <Shield className="w-6 h-6 text-primary-700" aria-hidden />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Password Audit &amp; Policy Generator</h1>
                <p className="text-sm text-gray-500">Strength checker, entropy, NIST 2024 · 100% in browser</p>
              </div>
            </div>
            <Link
              href="/password-generator"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-primary-700 bg-primary-50 border border-primary-200 hover:bg-primary-100"
            >
              Password Generator
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-2 p-1 bg-gray-100 rounded-lg w-fit mb-6">
          <button
            type="button"
            onClick={() => setMode('personal')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${mode === 'personal' ? 'bg-white text-gray-900 shadow' : 'text-gray-600 hover:text-gray-900'}`}
          >
            <User className="w-4 h-4" />
            Personal
          </button>
          <button
            type="button"
            onClick={() => setMode('developer')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${mode === 'developer' ? 'bg-white text-gray-900 shadow' : 'text-gray-600 hover:text-gray-900'}`}
          >
            <Wrench className="w-4 h-4" />
            Developer
          </button>
        </div>

        {mode === 'personal' && (
          <div className="space-y-6">
            <section className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-2">
                <Lock className="w-5 h-5 text-gray-500" />
                <h2 className="text-lg font-semibold text-gray-900">Check password strength</h2>
              </div>
              <p className="text-sm text-gray-600 mb-4">Paste a password below. Nothing is sent to any server; all math runs in your browser.</p>
              <div className="relative">
                <input
                  type={reveal ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter or paste password to audit..."
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 font-mono text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  autoComplete="off"
                />
                <button
                  type="button"
                  onClick={() => setReveal((r) => !r)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  aria-label={reveal ? 'Hide password' : 'Show password'}
                >
                  {reveal ? 'Hide' : 'Show'}
                </button>
              </div>
            </section>

            {password && (
              <>
                <section className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Score</h2>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Entropy</p>
                      <p className="text-2xl font-bold text-gray-900">{ent.toFixed(1)} bits</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Strength</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`inline-block w-2 h-2 rounded-full ${STRENGTH_COLORS[strength]}`} />
                        <span className="font-semibold text-gray-900">{strength}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Crack time (1B/s)</p>
                      <p className="text-lg font-semibold text-gray-900">{formatCrackTime(crackTime)}</p>
                    </div>
                  </div>
                </section>

                {(patterns.keyboardWalks.length > 0 || patterns.leetSpeak.length > 0 || patterns.yearPatterns.length > 0) && (
                  <section className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-amber-600" />
                      Pattern detection
                    </h2>
                    <ul className="space-y-2 text-sm text-gray-700">
                      {patterns.keyboardWalks.length > 0 && (
                        <li><strong>Keyboard walks:</strong> {patterns.keyboardWalks.map((p) => p.pattern).join(', ')}</li>
                      )}
                      {patterns.leetSpeak.length > 0 && (
                        <li><strong>Leet speak:</strong> {patterns.leetSpeak.map((p) => `"${p.leet}"→${p.original}`).join(', ')}</li>
                      )}
                      {patterns.yearPatterns.length > 0 && (
                        <li><strong>Year patterns:</strong> {patterns.yearPatterns.map((p) => p.year).join(', ')}</li>
                      )}
                    </ul>
                  </section>
                )}

                {suggestions.length > 0 && (
                  <section className="bg-amber-50 rounded-xl border border-amber-200 p-6">
                    <h2 className="text-lg font-semibold text-amber-900 mb-3">Improvement suggestions</h2>
                    <ul className="list-disc list-inside space-y-1 text-sm text-amber-900">
                      {suggestions.map((s, i) => (
                        <li key={i}>{s}</li>
                      ))}
                    </ul>
                  </section>
                )}
              </>
            )}
          </div>
        )}

        {mode === 'developer' && (
          <div className="space-y-6">
            <section className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Policy rules</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Min length</label>
                  <input
                    type="number"
                    min={1}
                    max={256}
                    value={policy.minLength}
                    onChange={(e) => setPolicy((p) => ({ ...p, minLength: Math.max(1, parseInt(e.target.value, 10) || 8) }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Max length (empty = 128)</label>
                  <input
                    type="number"
                    min={1}
                    max={256}
                    placeholder="128"
                    value={policy.maxLength ?? ''}
                    onChange={(e) => {
                      const v = e.target.value.trim();
                      setPolicy((p) => ({ ...p, maxLength: v === '' ? null : Math.max(1, parseInt(v, 10) || 128) }));
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div className="sm:col-span-2 flex flex-wrap gap-4">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" checked={policy.requireUppercase} onChange={(e) => setPolicy((p) => ({ ...p, requireUppercase: e.target.checked }))} className="rounded" />
                    <span className="text-sm text-gray-700">Require uppercase</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" checked={policy.requireLowercase} onChange={(e) => setPolicy((p) => ({ ...p, requireLowercase: e.target.checked }))} className="rounded" />
                    <span className="text-sm text-gray-700">Require lowercase</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" checked={policy.requireDigit} onChange={(e) => setPolicy((p) => ({ ...p, requireDigit: e.target.checked }))} className="rounded" />
                    <span className="text-sm text-gray-700">Require digit</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" checked={policy.requireSymbol} onChange={(e) => setPolicy((p) => ({ ...p, requireSymbol: e.target.checked }))} className="rounded" />
                    <span className="text-sm text-gray-700">Require symbol</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" checked={policy.allowSpaces} onChange={(e) => setPolicy((p) => ({ ...p, allowSpaces: e.target.checked }))} className="rounded" />
                    <span className="text-sm text-gray-700">Allow spaces</span>
                  </label>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Allowed symbols</label>
                  <input
                    type="text"
                    value={policy.allowedSymbols}
                    onChange={(e) => setPolicy((p) => ({ ...p, allowedSymbols: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg font-mono text-sm"
                    placeholder="!@#$%^&*()_+-=[]{}|;:,.<>?"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Max consecutive repeating (empty = no limit)</label>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    placeholder="2"
                    value={policy.maxConsecutiveRepeating ?? ''}
                    onChange={(e) => {
                      const v = e.target.value.trim();
                      setPolicy((p) => ({ ...p, maxConsecutiveRepeating: v === '' ? null : Math.max(1, parseInt(v, 10) || 2) }));
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
            </section>

            <section className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <Code className="w-5 h-5 text-gray-600" />
                Live regex
              </h2>
              <pre className="p-4 bg-gray-900 text-gray-100 rounded-lg overflow-x-auto text-sm font-mono break-all">
                {regex}
              </pre>
            </section>

            <section className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                <h2 className="text-lg font-semibold text-gray-900">Code export</h2>
                <div className="flex items-center gap-2">
                  <select
                    value={codeLang}
                    onChange={(e) => setCodeLang(e.target.value as 'js' | 'python' | 'go' | 'java' | 'php')}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  >
                    {CODE_LANGS.map((l) => (
                      <option key={l.id} value={l.id}>{l.name}</option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={copyCode}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-600 text-white text-sm font-medium hover:bg-primary-700"
                  >
                    {copiedCode ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    Copy
                  </button>
                </div>
              </div>
              <pre className="p-4 bg-gray-900 text-gray-100 rounded-lg overflow-x-auto text-sm font-mono whitespace-pre">
                {code}
              </pre>
            </section>
          </div>
        )}

        <p className="mt-8 text-center text-sm text-gray-500">
          <Lock className="w-4 h-4 inline-block mr-1 align-middle" />
          Runs in your browser — nothing is sent to any server. NIST 2024–aligned.
        </p>
      </main>
    </div>
  );
}
