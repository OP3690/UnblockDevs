'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Lock,
  Shield,
  AlertTriangle,
  Code,
  Copy,
  Check,
  User,
  Wrench,
  Download,
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff,
  BarChart2,
  ShieldCheck,
  Info,
} from 'lucide-react';
import { trackCtaClick, trackCopy } from '@/lib/analytics';
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
import ToolPageShell from '@/components/tools/ToolPageShell';

const STRENGTH_COLORS: Record<StrengthLevel, string> = {
  'Very Weak': 'bg-red-500',
  'Weak': 'bg-orange-500',
  'Fair': 'bg-yellow-500',
  'Strong': 'bg-lime-500',
  'Very Strong': 'bg-green-500',
  'Extreme': 'bg-emerald-600',
};

const STRENGTH_TEXT: Record<StrengthLevel, string> = {
  'Very Weak': 'text-red-600',
  'Weak': 'text-orange-600',
  'Fair': 'text-yellow-600',
  'Strong': 'text-lime-600',
  'Very Strong': 'text-green-600',
  'Extreme': 'text-emerald-600',
};

const CODE_LANGS = [
  { id: 'js' as const, name: 'JavaScript' },
  { id: 'python' as const, name: 'Python' },
  { id: 'go' as const, name: 'Go' },
  { id: 'java' as const, name: 'Java' },
  { id: 'php' as const, name: 'PHP' },
];

// Character composition analysis
function analyzeComposition(pw: string) {
  const lowercase = (pw.match(/[a-z]/g) || []).length;
  const uppercase = (pw.match(/[A-Z]/g) || []).length;
  const digits = (pw.match(/[0-9]/g) || []).length;
  const symbols = (pw.match(/[^a-zA-Z0-9]/g) || []).length;
  const total = pw.length || 1;
  return [
    { label: 'Lowercase', count: lowercase, pct: Math.round((lowercase / total) * 100), color: 'bg-blue-500' },
    { label: 'Uppercase', count: uppercase, pct: Math.round((uppercase / total) * 100), color: 'bg-violet-500' },
    { label: 'Digits', count: digits, pct: Math.round((digits / total) * 100), color: 'bg-amber-500' },
    { label: 'Symbols', count: symbols, pct: Math.round((symbols / total) * 100), color: 'bg-emerald-500' },
  ];
}

// NIST SP 800-63B checks
function nistChecks(pw: string, ent: number) {
  return [
    { label: 'Minimum 8 characters', pass: pw.length >= 8, detail: `${pw.length} chars` },
    { label: 'No repeated sequences (aaa)', pass: !/(.)\1{2,}/.test(pw), detail: '' },
    { label: 'No common patterns (qwerty, 123456)', pass: !/qwerty|12345|password|abc123|letmein/i.test(pw), detail: '' },
    { label: 'Sufficient entropy (≥ 36 bits)', pass: ent >= 36, detail: `${ent.toFixed(1)} bits` },
    { label: 'Not exclusively keyboard walk', pass: !/^(qwerty|asdf|zxcv|1234567890)/i.test(pw), detail: '' },
  ];
}

function CharBar({ pct, color }: { pct: number; color: string }) {
  return (
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div className={`${color} h-2 rounded-full transition-all`} style={{ width: `${pct}%` }} />
    </div>
  );
}

export default function PasswordAuditClient() {
  const [mode, setMode] = useState<'personal' | 'developer'>('personal');
  const [password, setPassword] = useState('');
  const [reveal, setReveal] = useState(false);
  const [policy, setPolicy] = useState<PasswordPolicy>(DEFAULT_POLICY);
  const [codeLang, setCodeLang] = useState<'js' | 'python' | 'go' | 'java' | 'php'>('js');
  const [copiedCode, setCopiedCode] = useState(false);
  const [showNist, setShowNist] = useState(false);

  const ent = useMemo(() => auditEntropy(password), [password]);
  const crackTime = useMemo(() => auditCrackTime(password), [password]);
  const strength = useMemo(() => auditStrength(password), [password]);
  const patterns = useMemo(() => detectPatterns(password), [password]);
  const suggestions = useMemo(() => getImprovementSuggestions(password, ent, patterns), [password, ent, patterns]);
  const composition = useMemo(() => analyzeComposition(password), [password]);
  const nist = useMemo(() => nistChecks(password, ent), [password, ent]);
  const nistScore = useMemo(() => nist.filter((c) => c.pass).length, [nist]);

  const regex = useMemo(() => policyToSimpleRegex(policy), [policy]);
  const code = useMemo(() => policyToCodeCorrect(policy, codeLang), [policy, codeLang]);

  const copyCode = () => {
    trackCopy('password_audit');
    navigator.clipboard.writeText(code).then(
      () => { setCopiedCode(true); toast.success('Code copied'); setTimeout(() => setCopiedCode(false), 2000); },
      () => toast.error('Copy failed')
    );
  };

  const exportPolicy = () => {
    trackCopy('password_audit');
    const payload = JSON.stringify({ policy, regex, generatedAt: new Date().toISOString() }, null, 2);
    navigator.clipboard.writeText(payload);
    toast.success('Policy JSON copied');
  };

  const downloadPolicy = () => {
    const payload = { policy, regex, generatedAt: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'password-policy.json';
    a.click();
    URL.revokeObjectURL(a.href);
    toast.success('Downloaded password-policy.json');
  };

  // Strength bar width
  const strengthPct: Record<StrengthLevel, number> = {
    'Very Weak': 10, 'Weak': 28, 'Fair': 50, 'Strong': 70, 'Very Strong': 88, 'Extreme': 100,
  };

  return (
    <ToolPageShell
      showFooterBand={false}
      title="Password Audit & Policy Generator"
      subtitle="Strength checker, entropy, NIST 2024 compliance, character composition · 100% in browser"
      toolName="password_audit"
      embedTool
      tool={
        <div className="space-y-5">
          {/* Mode selector */}
          <div className="flex items-center gap-1 p-1 bg-gray-100 rounded-lg w-fit">
            {(['personal', 'developer'] as const).map((m) => (
              <button key={m} type="button"
                onClick={() => { trackCtaClick('password_audit', `mode_${m}`); setMode(m); }}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${mode === m ? 'bg-white text-gray-900 shadow' : 'text-gray-600 hover:text-gray-900'}`}
              >
                {m === 'personal' ? <User className="w-4 h-4" /> : <Wrench className="w-4 h-4" />}
                {m === 'personal' ? 'Personal' : 'Developer'}
              </button>
            ))}
          </div>

          {/* ── PERSONAL MODE ── */}
          {mode === 'personal' && (
            <div className="space-y-5">
              {/* Input */}
              <section className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Lock className="w-5 h-5 text-gray-500" />
                  <h2 className="text-base font-semibold text-gray-900">Check password strength</h2>
                </div>
                <p className="text-sm text-gray-500 mb-4">All analysis runs in your browser — nothing is sent to any server.</p>
                <div className="relative">
                  <input
                    type={reveal ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter or paste password to audit..."
                    className="w-full px-4 py-3 pr-20 rounded-lg border border-gray-300 bg-gray-50 font-mono text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    autoComplete="off"
                  />
                  <button type="button" onClick={() => setReveal((r) => !r)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700"
                    aria-label={reveal ? 'Hide password' : 'Show password'}
                  >
                    {reveal ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    {reveal ? 'Hide' : 'Show'}
                  </button>
                </div>
                {password && (
                  <div className="mt-3">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Strength</span>
                      <span className={`font-semibold ${STRENGTH_TEXT[strength]}`}>{strength}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className={`${STRENGTH_COLORS[strength]} h-2.5 rounded-full transition-all`} style={{ width: `${strengthPct[strength]}%` }} />
                    </div>
                  </div>
                )}
              </section>

              {password && (
                <>
                  {/* Score cards */}
                  <section className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                    <h2 className="text-sm font-semibold text-gray-800 mb-3">Score</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {[
                        { label: 'Entropy', value: `${ent.toFixed(1)} bits`, sub: ent >= 60 ? 'Excellent' : ent >= 36 ? 'Good' : 'Weak', color: ent >= 60 ? 'text-emerald-600' : ent >= 36 ? 'text-amber-600' : 'text-red-600' },
                        { label: 'Length', value: `${password.length} chars`, sub: password.length >= 16 ? 'Great' : password.length >= 12 ? 'OK' : 'Short', color: password.length >= 16 ? 'text-emerald-600' : password.length >= 12 ? 'text-amber-600' : 'text-red-600' },
                        { label: 'Crack time', value: formatCrackTime(crackTime), sub: '@ 1B guesses/s', color: 'text-gray-700' },
                        { label: 'NIST', value: `${nistScore}/5`, sub: nistScore === 5 ? 'Compliant' : 'Issues found', color: nistScore === 5 ? 'text-emerald-600' : 'text-amber-600' },
                      ].map((card) => (
                        <div key={card.label} className="rounded-lg border border-gray-100 bg-gray-50 p-3 text-center">
                          <div className="text-xs text-gray-500 mb-1">{card.label}</div>
                          <div className={`text-lg font-bold ${card.color}`}>{card.value}</div>
                          <div className="text-xs text-gray-500 mt-0.5">{card.sub}</div>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Character composition */}
                  <section className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                    <h2 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-1.5">
                      <BarChart2 className="w-4 h-4 text-primary-600" /> Character Composition
                    </h2>
                    <div className="space-y-2.5">
                      {composition.map((c) => (
                        <div key={c.label} className="grid grid-cols-5 items-center gap-2">
                          <span className="text-xs text-gray-600 font-medium col-span-1">{c.label}</span>
                          <div className="col-span-3"><CharBar pct={c.pct} color={c.color} /></div>
                          <span className="text-xs text-gray-500 text-right">{c.count} ({c.pct}%)</span>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* NIST compliance */}
                  <section className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                    <button type="button" onClick={() => setShowNist((n) => !n)}
                      className="flex items-center justify-between w-full text-left"
                    >
                      <h2 className="text-sm font-semibold text-gray-800 flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-primary-600" />
                        NIST SP 800-63B Compliance
                        <span className={`ml-2 text-xs px-2 py-0.5 rounded-full font-bold ${nistScore === 5 ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                          {nistScore}/5
                        </span>
                      </h2>
                      {showNist ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                    </button>
                    {showNist && (
                      <ul className="mt-3 space-y-2">
                        {nist.map((c, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm">
                            <span className={`shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${c.pass ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                              {c.pass ? '✓' : '✗'}
                            </span>
                            <span className={c.pass ? 'text-gray-700' : 'text-red-700'}>{c.label}</span>
                            {c.detail && <span className="text-xs text-gray-400">({c.detail})</span>}
                          </li>
                        ))}
                      </ul>
                    )}
                  </section>

                  {/* Pattern detection */}
                  {(patterns.keyboardWalks.length > 0 || patterns.leetSpeak.length > 0 || patterns.yearPatterns.length > 0) && (
                    <section className="rounded-xl border border-amber-200 bg-amber-50 p-5">
                      <h2 className="text-sm font-semibold text-amber-900 mb-2 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4" /> Pattern Detection
                      </h2>
                      <ul className="space-y-1.5 text-sm text-amber-800">
                        {patterns.keyboardWalks.length > 0 && <li>• <strong>Keyboard walks:</strong> {patterns.keyboardWalks.map((p) => p.pattern).join(', ')}</li>}
                        {patterns.leetSpeak.length > 0 && <li>• <strong>Leet speak:</strong> {patterns.leetSpeak.map((p) => `"${p.leet}"→${p.original}`).join(', ')}</li>}
                        {patterns.yearPatterns.length > 0 && <li>• <strong>Year patterns:</strong> {patterns.yearPatterns.map((p) => p.year).join(', ')}</li>}
                      </ul>
                    </section>
                  )}

                  {/* Suggestions */}
                  {suggestions.length > 0 && (
                    <section className="rounded-xl border border-blue-200 bg-blue-50 p-5">
                      <h2 className="text-sm font-semibold text-blue-900 mb-2 flex items-center gap-2">
                        <Info className="w-4 h-4" /> Improvement Suggestions
                      </h2>
                      <ul className="list-disc list-inside space-y-1 text-sm text-blue-900">
                        {suggestions.map((s, i) => <li key={i}>{s}</li>)}
                      </ul>
                    </section>
                  )}
                </>
              )}
            </div>
          )}

          {/* ── DEVELOPER MODE ── */}
          {mode === 'developer' && (
            <div className="space-y-5">
              {/* Policy rules */}
              <section className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-base font-semibold text-gray-900">Policy Rules</h2>
                  <div className="flex gap-2">
                    <button type="button" onClick={exportPolicy} className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50">
                      <Copy className="w-3.5 h-3.5" /> Copy JSON
                    </button>
                    <button type="button" onClick={downloadPolicy} className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50">
                      <Download className="w-3.5 h-3.5" /> Download
                    </button>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Min length</label>
                    <input type="number" min={1} max={256} value={policy.minLength}
                      onChange={(e) => setPolicy((p) => ({ ...p, minLength: Math.max(1, parseInt(e.target.value, 10) || 8) }))}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Max length (blank = 128)</label>
                    <input type="number" min={1} max={256} placeholder="128" value={policy.maxLength ?? ''}
                      onChange={(e) => { const v = e.target.value.trim(); setPolicy((p) => ({ ...p, maxLength: v === '' ? null : Math.max(1, parseInt(v, 10) || 128) })); }}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" />
                  </div>
                  <div className="sm:col-span-2 flex flex-wrap gap-4">
                    {[
                      { key: 'requireUppercase', label: 'Require uppercase' },
                      { key: 'requireLowercase', label: 'Require lowercase' },
                      { key: 'requireDigit', label: 'Require digit' },
                      { key: 'requireSymbol', label: 'Require symbol' },
                      { key: 'allowSpaces', label: 'Allow spaces' },
                    ].map(({ key, label }) => (
                      <label key={key} className="flex items-center gap-2 text-sm cursor-pointer">
                        <input type="checkbox" checked={(policy as any)[key]} onChange={(e) => setPolicy((p) => ({ ...p, [key]: e.target.checked }))} className="rounded border-gray-300 text-primary-600" />
                        {label}
                      </label>
                    ))}
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Allowed symbols</label>
                    <input type="text" value={policy.allowedSymbols} onChange={(e) => setPolicy((p) => ({ ...p, allowedSymbols: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg font-mono text-sm" placeholder="!@#$%^&*()_+-=[]{}|;:,.<>?" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Max consecutive repeating (blank = no limit)</label>
                    <input type="number" min={1} max={10} placeholder="2" value={policy.maxConsecutiveRepeating ?? ''}
                      onChange={(e) => { const v = e.target.value.trim(); setPolicy((p) => ({ ...p, maxConsecutiveRepeating: v === '' ? null : Math.max(1, parseInt(v, 10) || 2) })); }}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" />
                  </div>
                </div>
              </section>

              {/* Live regex */}
              <section className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-base font-semibold text-gray-800 flex items-center gap-2">
                    <Code className="w-4 h-4 text-gray-600" /> Live Regex
                  </h2>
                  <button type="button" onClick={() => { navigator.clipboard.writeText(regex); trackCopy('password_audit'); toast.success('Regex copied'); }}
                    className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50">
                    <Copy className="w-3 h-3" /> Copy
                  </button>
                </div>
                <pre className="p-4 bg-gray-900 text-gray-100 rounded-lg overflow-x-auto text-sm font-mono break-all">{regex}</pre>
              </section>

              {/* Code export */}
              <section className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                  <h2 className="text-base font-semibold text-gray-900">Code Export</h2>
                  <div className="flex items-center gap-2">
                    <select value={codeLang} onChange={(e) => setCodeLang(e.target.value as typeof codeLang)}
                      className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm">
                      {CODE_LANGS.map((l) => <option key={l.id} value={l.id}>{l.name}</option>)}
                    </select>
                    <button type="button" onClick={copyCode}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary-600 text-white text-sm font-medium hover:bg-primary-700">
                      {copiedCode ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      Copy
                    </button>
                  </div>
                </div>
                <pre className="p-4 bg-gray-900 text-gray-100 rounded-lg overflow-x-auto text-sm font-mono whitespace-pre">{code}</pre>
              </section>

              {/* Test password against policy */}
              <section className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                <h2 className="text-base font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-primary-600" /> Test a Password Against This Policy
                </h2>
                <div className="relative mb-3">
                  <input
                    type={reveal ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password to test..."
                    className="w-full px-4 py-2.5 pr-20 rounded-lg border border-gray-200 bg-gray-50 font-mono text-sm focus:ring-2 focus:ring-primary-500"
                    autoComplete="off"
                  />
                  <button type="button" onClick={() => setReveal((r) => !r)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1">
                    {reveal ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    {reveal ? 'Hide' : 'Show'}
                  </button>
                </div>
                {password && (
                  <div className="space-y-1.5">
                    {[
                      { label: `Min ${policy.minLength} chars`, pass: password.length >= policy.minLength },
                      { label: `Max ${policy.maxLength ?? 128} chars`, pass: password.length <= (policy.maxLength ?? 128) },
                      ...(policy.requireUppercase ? [{ label: 'Has uppercase', pass: /[A-Z]/.test(password) }] : []),
                      ...(policy.requireLowercase ? [{ label: 'Has lowercase', pass: /[a-z]/.test(password) }] : []),
                      ...(policy.requireDigit ? [{ label: 'Has digit', pass: /[0-9]/.test(password) }] : []),
                      ...(policy.requireSymbol ? [{ label: 'Has symbol', pass: /[^a-zA-Z0-9]/.test(password) }] : []),
                    ].map((rule, i) => (
                      <div key={i} className={`flex items-center gap-2 text-sm px-3 py-1.5 rounded-lg ${rule.pass ? 'bg-emerald-50 text-emerald-800' : 'bg-red-50 text-red-800'}`}>
                        <span className="font-bold">{rule.pass ? '✓' : '✗'}</span>
                        {rule.label}
                      </div>
                    ))}
                  </div>
                )}
              </section>
            </div>
          )}

          <p className="text-center text-sm text-gray-500 flex items-center justify-center gap-1.5">
            <Lock className="w-3.5 h-3.5" /> Runs in your browser — nothing is sent to any server. NIST SP 800-63B aligned.
          </p>
          <div className="text-center">
            <Link href="/password-generator" className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-700 hover:underline">
              Need to generate a strong password? →
            </Link>
          </div>
        </div>
      }
    />
  );
}
