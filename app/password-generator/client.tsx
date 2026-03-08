'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Copy,
  Check,
  Eye,
  EyeOff,
  RefreshCw,
  Shield,
  Lock,
  Key,
  AlertTriangle,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';
import toast from 'react-hot-toast';
import {
  generateRandom,
  generatePassphrase,
  generateFromPattern,
  generateSecretKey,
  hashPassword,
  checkPwned,
  entropy,
  crackTimeSeconds,
  formatCrackTime,
  getStrength,
  getCharsetSize,
  isCommonWeak,
  PRESETS,
  SECRET_KEY_TYPES,
  type CharSetOptions,
  type PassphraseOptions,
  type GenerationMode,
  type StrengthLevel,
} from '@/lib/passwordGeneratorEngine';

const CRACK_SPEED = 1e9; // 1B/s for display
const HISTORY_KEY = 'password-generator-history';
const HISTORY_MAX = 15;
const CLIPBOARD_CLEAR_MS = 30_000;

const STRENGTH_COLORS: Record<StrengthLevel, string> = {
  'Very Weak': 'bg-red-500',
  'Weak': 'bg-orange-500',
  'Fair': 'bg-yellow-500',
  'Strong': 'bg-lime-500',
  'Very Strong': 'bg-green-500',
  'Extreme': 'bg-emerald-600',
};

export default function PasswordGeneratorClient() {
  const [mode, setMode] = useState<GenerationMode>('random');
  const [length, setLength] = useState(16);
  const [charset, setCharset] = useState<CharSetOptions>({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
    excludeAmbiguous: false,
  });
  const [passphraseOpts, setPassphraseOpts] = useState<PassphraseOptions>({
    wordCount: 4,
    separator: '-',
    capitalize: true,
    addNumber: true,
    addSymbol: false,
  });
  const [pattern, setPattern] = useState('AAaa11!!');
  const [policy, setPolicy] = useState({ minNumbers: 1, minSymbols: 1, noRepeating: false });
  const [password, setPassword] = useState('');
  const [passwords, setPasswords] = useState<string[]>([]);
  const [count, setCount] = useState(1);
  const [reveal, setReveal] = useState(false);
  const [pwned, setPwned] = useState<boolean | null>(null);
  const [pwnedCount, setPwnedCount] = useState<number | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [devMode, setDevMode] = useState(false);
  const [secretKeys, setSecretKeys] = useState<Record<string, string>>({});
  const [hashes, setHashes] = useState<{ sha256: string; sha512: string } | null>(null);
  const [copied, setCopied] = useState(false);
  const clipboardTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const ent = password ? entropy(password, getCharsetSize(charset)) : 0;
  const strength: StrengthLevel = password ? getStrength(ent) : 'Very Weak';
  const crackTime = password ? crackTimeSeconds(ent, CRACK_SPEED) : 0;

  const generate = useCallback(() => {
    if (mode === 'random') {
      const p = generateRandom(length, charset, {
        minLength: length,
        minNumbers: policy.minNumbers,
        minSymbols: policy.minSymbols,
        noRepeating: policy.noRepeating,
      });
      setPassword(p);
      const list = [p];
      for (let i = 1; i < count; i++) {
        list.push(generateRandom(length, charset, { minNumbers: policy.minNumbers, minSymbols: policy.minSymbols, noRepeating: policy.noRepeating }));
      }
      setPasswords(list);
    } else if (mode === 'passphrase') {
      const p = generatePassphrase(passphraseOpts);
      setPassword(p);
      setPasswords([p]);
    } else {
      const p = generateFromPattern(pattern, charset);
      setPassword(p);
      setPasswords([p]);
    }
    setPwned(null);
    setHashes(null);
  }, [mode, length, charset, passphraseOpts, pattern, policy, count]);

  useEffect(() => {
    generate();
  }, []);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(HISTORY_KEY);
      if (raw) setHistory(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  const addToHistory = (p: string) => {
    if (!p) return;
    setHistory((prev) => {
      const next = [p, ...prev.filter((x) => x !== p)].slice(0, HISTORY_MAX);
      try {
        localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  };

  const copyPassword = (p: string) => {
    navigator.clipboard.writeText(p).then(
      () => {
        setCopied(true);
        toast.success('Copied. Clipboard will clear in 30s.');
        addToHistory(p);
        if (clipboardTimeoutRef.current) clearTimeout(clipboardTimeoutRef.current);
        clipboardTimeoutRef.current = setTimeout(() => {
          navigator.clipboard.writeText('');
          toast('Clipboard cleared', { icon: '🔒' });
          clipboardTimeoutRef.current = null;
        }, CLIPBOARD_CLEAR_MS);
      },
      () => toast.error('Copy failed')
    );
    setTimeout(() => setCopied(false), 2000);
  };

  const applyPreset = (presetId: string) => {
    const p = PRESETS.find((x) => x.id === presetId);
    if (p) {
      setLength(p.length);
      setMode('random');
      setCount(1);
      setTimeout(() => {
        const pw = generateRandom(p.length, charset, {
          minNumbers: policy.minNumbers,
          minSymbols: policy.minSymbols,
          noRepeating: policy.noRepeating,
        });
        setPassword(pw);
        setPasswords([pw]);
        setPwned(null);
        setHashes(null);
      }, 0);
    }
  };

  const checkBreach = async () => {
    if (!password) return;
    setPwned(null);
    toast.loading('Checking…', { id: 'pwned' });
    const result = await checkPwned(password);
    setPwned(result.pwned);
    setPwnedCount(result.count ?? null);
    if (result.pwned) {
      toast.error(`Found in ${result.count ?? 0} breaches`, { id: 'pwned' });
    } else {
      toast.success('Not found in known breaches', { id: 'pwned' });
    }
  };

  const updateHashes = async () => {
    if (!password) return;
    const [sha256, sha512] = await Promise.all([
      hashPassword(password, 'SHA-256'),
      hashPassword(password, 'SHA-512'),
    ]);
    setHashes({ sha256, sha512 });
  };

  const generateSecrets = () => {
    const out: Record<string, string> = {};
    SECRET_KEY_TYPES.forEach(({ id, name, length: len, encoding }) => {
      out[name] = generateSecretKey(len, encoding);
    });
    setSecretKeys(out);
  };

  const exportAs = (format: 'json' | 'csv' | 'txt') => {
    const data = passwords.length ? passwords : [password];
    let text = '';
    if (format === 'json') {
      text = JSON.stringify({ passwords: data, generated: new Date().toISOString() }, null, 2);
    } else if (format === 'csv') {
      text = 'password\n' + data.map((p) => `"${p.replace(/"/g, '""')}"`).join('\n');
    } else {
      text = data.join('\n');
    }
    navigator.clipboard.writeText(text).then(
      () => toast.success('Copied to clipboard'),
      () => toast.error('Copy failed')
    );
  };

  const weakWarning = password && isCommonWeak(password);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumb — outside container */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-3" aria-label="Breadcrumb">
          <Link href="/" className="text-primary-600 hover:text-primary-700 hover:underline">Home</Link>
          <span aria-hidden>/</span>
          <span className="text-gray-700 font-medium" aria-current="page">Password Generator</span>
        </nav>

        <div className="rounded-2xl bg-white shadow-xl shadow-gray-200/50 border border-gray-200/80 overflow-hidden">
          {/* Privacy badge */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 px-6 md:px-8 py-4 bg-gradient-to-r from-emerald-50/80 to-transparent border-b border-gray-100">
            <span className="text-sm text-gray-700 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
              </span>
              Runs in browser
            </span>
            <span className="text-sm text-gray-700 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100">
                <Lock className="w-3.5 h-3.5 text-emerald-600" />
              </span>
              No password stored
            </span>
            <span className="text-sm text-gray-700 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100">
                <Shield className="w-3.5 h-3.5 text-emerald-600" />
              </span>
              No data leaves your device
            </span>
          </div>

          <div className="px-6 md:px-8 py-6 space-y-6">
            {/* Mode */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-3">Mode</label>
              <div className="flex flex-wrap gap-2">
                {(['random', 'passphrase', 'pattern'] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMode(m)}
                    className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${
                      mode === m ? 'bg-primary-600 text-white shadow-md shadow-primary-200/50' : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800'
                    }`}
                  >
                    {m === 'random' ? 'Random' : m === 'passphrase' ? 'Passphrase' : 'Pattern'}
                  </button>
                ))}
              </div>
            </div>

            {mode === 'random' && (
              <>
                <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                  <label className="block text-sm font-semibold text-gray-800 mb-2">Length: {length}</label>
                  <input
                    type="range"
                    min={8}
                    max={64}
                    value={length}
                    onChange={(e) => setLength(parseInt(e.target.value, 10))}
                    className="w-full h-2.5 rounded-full appearance-none bg-gray-200 accent-primary-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">Characters</label>
                  <div className="flex flex-wrap gap-3">
                    {[
                      { key: 'uppercase', label: 'Uppercase' },
                      { key: 'lowercase', label: 'Lowercase' },
                      { key: 'numbers', label: 'Numbers' },
                      { key: 'symbols', label: 'Symbols' },
                      { key: 'excludeAmbiguous', label: 'Exclude ambiguous' },
                    ].map(({ key, label }) => (
                      <label key={key} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer rounded-lg border border-gray-200 bg-white px-3 py-2 hover:bg-gray-50 transition-colors has-[:checked]:border-primary-300 has-[:checked]:bg-primary-50/50">
                        <input
                          type="checkbox"
                          checked={(charset as unknown as Record<string, boolean>)[key]}
                          onChange={(e) => setCharset((c) => ({ ...c, [key]: e.target.checked }))}
                          className="rounded border-gray-300 text-primary-600"
                        />
                        {label}
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">Presets</label>
                  <div className="flex flex-wrap gap-2">
                    {PRESETS.map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => applyPreset(p.id)}
                        className="rounded-xl border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-colors"
                      >
                        {p.name}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-4 p-3 rounded-xl bg-gray-50 border border-gray-100 text-sm">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={policy.noRepeating}
                      onChange={(e) => setPolicy((p) => ({ ...p, noRepeating: e.target.checked }))}
                      className="rounded border-gray-300 text-primary-600"
                    />
                    No repeating chars
                  </label>
                  <label className="flex items-center gap-2">
                    Min numbers:
                    <input
                      type="number"
                      min={0}
                      max={10}
                      value={policy.minNumbers}
                      onChange={(e) => setPolicy((p) => ({ ...p, minNumbers: parseInt(e.target.value, 10) || 0 }))}
                      className="w-12 rounded-lg border border-gray-200 px-2 py-1 text-center text-sm"
                    />
                  </label>
                  <label className="flex items-center gap-2">
                    Min symbols:
                    <input
                      type="number"
                      min={0}
                      max={10}
                      value={policy.minSymbols}
                      onChange={(e) => setPolicy((p) => ({ ...p, minSymbols: parseInt(e.target.value, 10) || 0 }))}
                      className="w-12 rounded-lg border border-gray-200 px-2 py-1 text-center text-sm"
                    />
                  </label>
                </div>
              </>
            )}

            {mode === 'passphrase' && (
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 space-y-3">
                <label className="flex items-center gap-2 text-sm text-gray-700">
                  Words:
                  <select
                    value={passphraseOpts.wordCount}
                    onChange={(e) =>
                      setPassphraseOpts((o) => ({ ...o, wordCount: parseInt(e.target.value, 10) }))
                    }
                    className="rounded-lg border border-gray-200 px-2.5 py-1.5 text-sm bg-white"
                  >
                    {[3, 4, 5, 6, 7, 8].map((n) => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </label>
                <label className="flex items-center gap-2 text-sm text-gray-700">
                  Separator:
                  <select
                    value={passphraseOpts.separator}
                    onChange={(e) =>
                      setPassphraseOpts((o) => ({ ...o, separator: e.target.value as PassphraseOptions['separator'] }))
                    }
                    className="rounded-lg border border-gray-200 px-2.5 py-1.5 text-sm bg-white"
                  >
                    <option value="-">-</option>
                    <option value="_">_</option>
                    <option value=".">.</option>
                    <option value=" ">space</option>
                  </select>
                </label>
                <div className="flex flex-wrap gap-3">
                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <input type="checkbox" checked={passphraseOpts.capitalize} onChange={(e) => setPassphraseOpts((o) => ({ ...o, capitalize: e.target.checked }))} className="rounded border-gray-300 text-primary-600" />
                    Capitalize
                  </label>
                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <input type="checkbox" checked={passphraseOpts.addNumber} onChange={(e) => setPassphraseOpts((o) => ({ ...o, addNumber: e.target.checked }))} className="rounded border-gray-300 text-primary-600" />
                    Add number
                  </label>
                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <input type="checkbox" checked={passphraseOpts.addSymbol} onChange={(e) => setPassphraseOpts((o) => ({ ...o, addSymbol: e.target.checked }))} className="rounded border-gray-300 text-primary-600" />
                    Add symbol
                  </label>
                </div>
              </div>
            )}

            {mode === 'pattern' && (
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">Pattern (A=upper, a=lower, 1=digit, !=symbol)</label>
                <input
                  type="text"
                  value={pattern}
                  onChange={(e) => setPattern(e.target.value)}
                  placeholder="AAaa11!!"
                  className="w-full rounded-xl border border-gray-200 px-4 py-2.5 font-mono text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 placeholder:text-gray-400"
                />
              </div>
            )}

            <div className="flex flex-wrap items-center gap-3">
              {mode === 'random' && (
                <label className="flex items-center gap-2 text-sm text-gray-700">
                  Generate
                  <input
                    type="number"
                    min={1}
                    max={20}
                    value={count}
                    onChange={(e) => setCount(Math.min(20, Math.max(1, parseInt(e.target.value, 10) || 1)))}
                    className="w-14 rounded-lg border border-gray-200 px-2 py-1.5 text-center text-sm"
                  />
                  passwords
                </label>
              )}
              <button
                type="button"
                onClick={generate}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-600 text-white rounded-xl font-semibold text-sm shadow-lg shadow-primary-200/50 hover:bg-primary-700 hover:shadow-primary-300/50 transition-all"
              >
                <RefreshCw className="w-4 h-4" />
                Generate
              </button>
            </div>

            {/* Generated password */}
            <div className="p-4 rounded-2xl border border-gray-200 bg-gray-50/50">
              <label className="block text-sm font-semibold text-gray-800 mb-2">Generated password</label>
              <div className="flex items-center gap-2">
                <code className="flex-1 min-h-[44px] rounded-xl border border-gray-200 bg-white px-4 py-2.5 font-mono text-sm break-all flex items-center">
                  {reveal ? password : '•'.repeat(password.length || 12)}
                </code>
                <button
                  type="button"
                  onClick={() => setReveal((r) => !r)}
                  className="p-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition-colors shrink-0"
                  aria-label={reveal ? 'Hide' : 'Reveal'}
                >
                  {reveal ? <EyeOff className="w-4 h-4 text-gray-600" /> : <Eye className="w-4 h-4 text-gray-600" />}
                </button>
                <button
                  type="button"
                  onClick={() => copyPassword(password)}
                  className="p-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition-colors shrink-0"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-gray-600" />}
                </button>
              </div>
              {weakWarning && (
                <p className="mt-2 text-amber-700 text-sm flex items-center gap-2 rounded-lg bg-amber-50 px-3 py-2 border border-amber-200/80">
                  <AlertTriangle className="w-4 h-4 shrink-0" /> This matches a common weak pattern. Consider regenerating.
                </p>
              )}
            </div>

            {/* Strength meter */}
            <div className="p-4 rounded-2xl border border-gray-100 bg-gray-50/50">
              <div className="flex justify-between text-sm mb-2">
                <span className="font-semibold text-gray-800">Strength: {strength}</span>
                <span className="text-gray-500">Entropy: {ent.toFixed(0)} bits</span>
              </div>
              <div className="h-2.5 rounded-full bg-gray-200 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${STRENGTH_COLORS[strength]}`}
                  style={{ width: `${Math.min(100, (ent / 128) * 100)}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Crack time (1B/s): <strong className="text-gray-700">{formatCrackTime(crackTime)}</strong>
              </p>
            </div>

            {/* Multiple passwords */}
            {passwords.length > 1 && (
              <div className="p-4 rounded-2xl border border-gray-100 bg-gray-50/50">
                <label className="block text-sm font-semibold text-gray-800 mb-2">All generated</label>
                <ul className="space-y-2 max-h-44 overflow-y-auto">
                  {passwords.map((p, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <code className="flex-1 font-mono text-xs truncate py-1">{reveal ? p : '•'.repeat(12)}</code>
                      <button
                        type="button"
                        onClick={() => copyPassword(p)}
                        className="shrink-0 rounded-lg border border-gray-200 bg-white px-2 py-1 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                      >
                        Copy
                      </button>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => {
                    const text = passwords.join('\n');
                    navigator.clipboard.writeText(text);
                    toast.success('All copied');
                  }}
                  className="mt-2 inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  <Copy className="w-3.5 h-3.5" /> Copy all
                </button>
              </div>
            )}

            {/* Breach check */}
            <div className="p-4 rounded-2xl border border-gray-100 bg-gray-50/50">
              <button
                type="button"
                onClick={checkBreach}
                className="inline-flex items-center gap-2 rounded-xl border border-primary-200 bg-primary-50 px-3 py-2 text-sm font-medium text-primary-700 hover:bg-primary-100 transition-colors"
              >
                Check Have I Been Pwned
              </button>
              {pwned !== null && (
                <p className={`mt-2 text-sm font-medium rounded-lg px-3 py-2 ${pwned ? 'text-red-800 bg-red-50 border border-red-200/80' : 'text-emerald-800 bg-emerald-50 border border-emerald-200/80'}`}>
                  {pwned ? `Found in ${pwnedCount ?? 0} breaches` : 'Not found in known breaches'}
                </p>
              )}
            </div>

            {/* Hash generator */}
            <div className="p-4 rounded-2xl border border-gray-100 bg-gray-50/50">
              <button
                type="button"
                onClick={updateHashes}
                className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Show SHA-256 / SHA-512 hash
              </button>
              {hashes && (
                <div className="mt-3 p-3 rounded-xl bg-white border border-gray-100 font-mono text-xs break-all text-gray-600 space-y-2">
                  <p><span className="text-gray-500 font-medium">SHA-256:</span> {hashes.sha256}</p>
                  <p><span className="text-gray-500 font-medium">SHA-512:</span> {hashes.sha512}</p>
                </div>
              )}
            </div>

            {/* Secret keys */}
            <div className="p-4 rounded-2xl border border-gray-100 bg-gray-50/50">
              <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Key className="w-4 h-4 text-primary-600" /> Secret key generator
              </h3>
              <button
                type="button"
                onClick={generateSecrets}
                className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Generate JWT / API / OAuth / Encryption keys
              </button>
              {Object.keys(secretKeys).length > 0 && (
                <div className="mt-3 space-y-3">
                  {Object.entries(secretKeys).map(([name, value]) => (
                    <div key={name} className="p-3 rounded-xl bg-white border border-gray-100">
                      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{name}</span>
                      <code className="block mt-1 font-mono text-xs break-all text-gray-700">{value}</code>
                      <button
                        type="button"
                        onClick={() => copyPassword(value)}
                        className="mt-2 inline-flex items-center gap-1 rounded-lg border border-gray-200 px-2 py-1 text-xs font-medium text-gray-600 hover:bg-gray-50"
                      >
                        <Copy className="w-3.5 h-3.5" /> Copy
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Export */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-semibold text-gray-800">Export:</span>
              <button type="button" onClick={() => exportAs('json')} className="rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors">JSON</button>
              <button type="button" onClick={() => exportAs('csv')} className="rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors">CSV</button>
              <button type="button" onClick={() => exportAs('txt')} className="rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors">TXT</button>
            </div>

            {/* Developer mode */}
            <div>
              <button
                type="button"
                onClick={() => setDevMode((d) => !d)}
                className="flex items-center gap-2 rounded-lg py-1.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors w-full text-left"
              >
                {devMode ? <ChevronDown className="w-4 h-4 text-gray-500" /> : <ChevronRight className="w-4 h-4 text-gray-500" />}
                Developer mode
              </button>
              {devMode && (
                <div className="mt-2 p-4 rounded-xl bg-gray-50 border border-gray-100 text-xs font-mono text-gray-600 space-y-1">
                  <p>Entropy: {ent.toFixed(2)} bits</p>
                  <p>Charset size: {getCharsetSize(charset)}</p>
                  <p>Combinations: 2^{ent.toFixed(0)}</p>
                  <p>Randomness: window.crypto.getRandomValues()</p>
                </div>
              )}
            </div>

            {/* History */}
            <div className="pt-2 border-t border-gray-100">
              {history.length > 0 && (
                <p className="text-xs text-gray-500 mb-2">
                  Recent: {history.slice(0, 3).map((h) => (h.length > 20 ? h.slice(0, 20) + '…' : h)).join(', ')}
                </p>
              )}
              <button
                type="button"
                onClick={() => setHistory([])}
                className="text-sm font-medium text-gray-500 hover:text-gray-700 rounded-lg px-2 py-1 hover:bg-gray-100 transition-colors"
              >
                Clear history
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-gray-500">
          <p className="text-center flex items-center gap-2">
            <Lock className="w-3.5 h-3.5 text-slate-400" aria-hidden />
            Passwords are generated locally. Nothing is sent to any server.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/jwt-decoder" className="inline-flex items-center gap-1.5 font-medium text-primary-600 hover:text-primary-700">
              JWT Decoder
              <ChevronRight className="w-4 h-4" />
            </Link>
            <Link href="/base64-encoder" className="inline-flex items-center gap-1.5 font-medium text-primary-600 hover:text-primary-700">
              Base64 Encoder
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
