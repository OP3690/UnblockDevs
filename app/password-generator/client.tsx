'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import {
  Copy, Check, Eye, EyeOff, RefreshCw, Shield, Lock,
  Key, AlertTriangle, ChevronDown, ChevronRight,
  Zap, Hash, Database,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { trackCopy, trackCtaClick } from '@/lib/analytics';
import {
  generateRandom, generatePassphrase, generateFromPattern,
  generateSecretKey, hashPassword, checkPwned,
  entropy, crackTimeSeconds, formatCrackTime, getStrength,
  getCharsetSize, isCommonWeak, PRESETS, SECRET_KEY_TYPES,
  type CharSetOptions, type PassphraseOptions,
  type GenerationMode, type StrengthLevel,
} from '@/lib/passwordGeneratorEngine';

const CRACK_SPEED = 1e9;
const HISTORY_KEY = 'password-generator-history';
const HISTORY_MAX = 15;
const CLIPBOARD_CLEAR_MS = 30_000;

const STRENGTH_META: Record<StrengthLevel, { bar: string; text: string; pct: number }> = {
  'Very Weak': { bar: 'bg-red-500',     text: 'text-red-600',     pct: 10 },
  'Weak':      { bar: 'bg-orange-500',  text: 'text-orange-600',  pct: 25 },
  'Fair':      { bar: 'bg-yellow-500',  text: 'text-yellow-600',  pct: 45 },
  'Strong':    { bar: 'bg-lime-500',    text: 'text-lime-700',    pct: 65 },
  'Very Strong':{ bar: 'bg-emerald-500',text: 'text-emerald-700', pct: 82 },
  'Extreme':   { bar: 'bg-emerald-600', text: 'text-emerald-800', pct: 100 },
};

/* ─── small helper ────────────────────────────────────────────── */
function CopyBtn({ value, label = 'Copy' }: { value: string; label?: string }) {
  const [ok, setOk] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(value).then(() => {
      setOk(true);
      setTimeout(() => setOk(false), 1800);
    });
  };
  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-2.5 py-1.5 text-xs font-medium text-zinc-600 transition-colors hover:bg-zinc-50"
    >
      {ok ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
      {ok ? 'Copied' : label}
    </button>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Main component
   ═══════════════════════════════════════════════════════════════ */
export default function PasswordGeneratorClient() {
  /* ── state ── */
  const [mode, setMode]         = useState<GenerationMode>('random');
  const [length, setLength]     = useState(16);
  const [charset, setCharset]   = useState<CharSetOptions>({
    uppercase: true, lowercase: true, numbers: true, symbols: true, excludeAmbiguous: false,
  });
  const [passphraseOpts, setPassphraseOpts] = useState<PassphraseOptions>({
    wordCount: 4, separator: '-', capitalize: true, addNumber: true, addSymbol: false,
  });
  const [pattern, setPattern]   = useState('AAaa11!!');
  const [policy, setPolicy]     = useState({ minNumbers: 1, minSymbols: 1, noRepeating: false });
  const [password, setPassword] = useState('');
  const [passwords, setPasswords] = useState<string[]>([]);
  const [count, setCount]       = useState(1);
  const [reveal, setReveal]     = useState(false);
  const [pwned, setPwned]       = useState<boolean | null>(null);
  const [pwnedCount, setPwnedCount] = useState<number | null>(null);
  const [history, setHistory]   = useState<string[]>([]);
  const [devMode, setDevMode]   = useState(false);
  const [secretKeys, setSecretKeys] = useState<Record<string, string>>({});
  const [hashes, setHashes]     = useState<{ sha256: string; sha512: string } | null>(null);
  const [copied, setCopied]     = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const clipboardTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ── derived ── */
  const ent      = password ? entropy(password, getCharsetSize(charset)) : 0;
  const strength = (password ? getStrength(ent) : 'Very Weak') as StrengthLevel;
  const crackTime = password ? crackTimeSeconds(ent, CRACK_SPEED) : 0;
  const sm       = STRENGTH_META[strength];
  const weakWarning = password && isCommonWeak(password);

  /* ── generate ── */
  const generate = useCallback(() => {
    trackCtaClick('password_generator', 'generate');
    if (mode === 'random') {
      const p = generateRandom(length, charset, {
        minLength: length, minNumbers: policy.minNumbers,
        minSymbols: policy.minSymbols, noRepeating: policy.noRepeating,
      });
      setPassword(p);
      const list = [p];
      for (let i = 1; i < count; i++) {
        list.push(generateRandom(length, charset, {
          minNumbers: policy.minNumbers, minSymbols: policy.minSymbols, noRepeating: policy.noRepeating,
        }));
      }
      setPasswords(list);
    } else if (mode === 'passphrase') {
      const p = generatePassphrase(passphraseOpts);
      setPassword(p); setPasswords([p]);
    } else {
      const p = generateFromPattern(pattern, charset);
      setPassword(p); setPasswords([p]);
    }
    setPwned(null); setHashes(null);
  }, [mode, length, charset, passphraseOpts, pattern, policy, count]);

  useEffect(() => { generate(); }, []);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(HISTORY_KEY);
      if (raw) setHistory(JSON.parse(raw));
    } catch { /* ignore */ }
  }, []);

  /* ── handlers ── */
  const addToHistory = (p: string) => {
    if (!p) return;
    setHistory((prev) => {
      const next = [p, ...prev.filter((x) => x !== p)].slice(0, HISTORY_MAX);
      try { localStorage.setItem(HISTORY_KEY, JSON.stringify(next)); } catch { /* ignore */ }
      return next;
    });
  };

  const copyPassword = (p: string) => {
    navigator.clipboard.writeText(p).then(
      () => {
        trackCopy('password_generator');
        setCopied(true);
        toast.success('Copied — clipboard clears in 30s');
        addToHistory(p);
        if (clipboardTimeoutRef.current) clearTimeout(clipboardTimeoutRef.current);
        clipboardTimeoutRef.current = setTimeout(() => {
          navigator.clipboard.writeText('');
          toast('Clipboard cleared', { icon: '🔒' });
          clipboardTimeoutRef.current = null;
        }, CLIPBOARD_CLEAR_MS);
      },
      () => toast.error('Copy failed'),
    );
    setTimeout(() => setCopied(false), 2000);
  };

  const applyPreset = (presetId: string) => {
    trackCtaClick('password_generator', 'load_preset', { preset_id: presetId });
    const p = PRESETS.find((x) => x.id === presetId);
    if (p) {
      setLength(p.length); setMode('random'); setCount(1);
      setTimeout(() => {
        const pw = generateRandom(p.length, charset, {
          minNumbers: policy.minNumbers, minSymbols: policy.minSymbols, noRepeating: policy.noRepeating,
        });
        setPassword(pw); setPasswords([pw]); setPwned(null); setHashes(null);
      }, 0);
    }
  };

  const checkBreach = async () => {
    if (!password) return;
    setPwned(null);
    toast.loading('Checking…', { id: 'pwned' });
    const result = await checkPwned(password);
    setPwned(result.pwned); setPwnedCount(result.count ?? null);
    if (result.pwned) toast.error(`Found in ${result.count ?? 0} breaches`, { id: 'pwned' });
    else toast.success('Not found in known breaches', { id: 'pwned' });
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
    SECRET_KEY_TYPES.forEach(({ name, length: len, encoding }) => {
      out[name] = generateSecretKey(len, encoding);
    });
    setSecretKeys(out);
  };

  const exportHistoryCSV = () => {
    if (!history.length) { toast.error('No history to export'); return; }
    const rows = ['index,password,length'].concat(
      history.map((p, i) => `${i + 1},"${p.replace(/"/g, '""')}",${p.length}`)
    );
    const blob = new Blob([rows.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'password-history.csv'; a.click();
    URL.revokeObjectURL(url);
    toast.success('History downloaded as CSV');
  };

  const exportAs = (format: 'json' | 'csv' | 'txt') => {
    const data = passwords.length ? passwords : [password];
    let text = '';
    if (format === 'json') text = JSON.stringify({ passwords: data, generated: new Date().toISOString() }, null, 2);
    else if (format === 'csv') text = 'password\n' + data.map((p) => `"${p.replace(/"/g, '""')}"`).join('\n');
    else text = data.join('\n');
    navigator.clipboard.writeText(text).then(
      () => { trackCopy('password_generator'); toast.success('Copied to clipboard'); },
      () => toast.error('Copy failed'),
    );
  };

  /* ════════════════════════════════════════════════════════
     RENDER
     ════════════════════════════════════════════════════════ */
  return (
    <div className="flex flex-col gap-0 lg:flex-row lg:items-start lg:gap-0">

      {/* ══ LEFT: Settings panel ══════════════════════════════ */}
      <div className="w-full border-b border-zinc-100 bg-zinc-50/60 lg:w-72 lg:shrink-0 lg:border-b-0 lg:border-r xl:w-80">
        <div className="p-5 lg:sticky lg:top-[61px] lg:max-h-[calc(100vh-61px)] lg:overflow-y-auto">

          {/* Mode tabs */}
          <div className="mb-5">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-zinc-400">Mode</p>
            <div className="flex gap-1.5">
              {(['random', 'passphrase', 'pattern'] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMode(m)}
                  className={`flex-1 rounded-lg px-2 py-2 text-[12.5px] font-semibold capitalize transition-all ${
                    mode === m
                      ? 'bg-zinc-900 text-white shadow-sm'
                      : 'border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* ── Random options ── */}
          {mode === 'random' && (
            <div className="space-y-4">
              {/* Length */}
              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <p className="text-[12px] font-semibold text-zinc-700">Length</p>
                  <span className="rounded-md bg-zinc-900 px-2 py-0.5 font-mono text-[12px] font-bold text-white">{length}</span>
                </div>
                <input
                  type="range" min={8} max={64} value={length}
                  onChange={(e) => setLength(parseInt(e.target.value, 10))}
                  className="w-full accent-emerald-600"
                />
                <div className="mt-0.5 flex justify-between text-[10px] text-zinc-400">
                  <span>8</span><span>64</span>
                </div>
              </div>

              {/* Character sets */}
              <div>
                <p className="mb-2 text-[12px] font-semibold text-zinc-700">Characters</p>
                <div className="space-y-1.5">
                  {[
                    { key: 'uppercase',       label: 'A–Z Uppercase' },
                    { key: 'lowercase',       label: 'a–z Lowercase' },
                    { key: 'numbers',         label: '0–9 Numbers' },
                    { key: 'symbols',         label: '!@# Symbols' },
                    { key: 'excludeAmbiguous', label: 'Exclude ambiguous (0Ol1)' },
                  ].map(({ key, label }) => (
                    <label key={key} className="flex cursor-pointer items-center gap-2.5 rounded-lg border border-transparent px-2 py-1.5 text-[12.5px] text-zinc-700 transition-colors hover:bg-white has-[:checked]:border-emerald-200 has-[:checked]:bg-emerald-50/60">
                      <input
                        type="checkbox"
                        checked={(charset as unknown as Record<string, boolean>)[key]}
                        onChange={(e) => setCharset((c) => ({ ...c, [key]: e.target.checked }))}
                        className="rounded border-zinc-300 accent-emerald-600"
                      />
                      {label}
                    </label>
                  ))}
                </div>
              </div>

              {/* Presets */}
              <div>
                <p className="mb-2 text-[12px] font-semibold text-zinc-700">Presets</p>
                <div className="flex flex-wrap gap-1.5">
                  {PRESETS.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => applyPreset(p.id)}
                      className="rounded-lg border border-zinc-200 bg-white px-2.5 py-1 text-[11.5px] font-medium text-zinc-600 transition-colors hover:border-zinc-300 hover:bg-zinc-50"
                    >
                      {p.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Policy */}
              <div className="rounded-xl border border-zinc-200 bg-white p-3">
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-zinc-400">Policy</p>
                <div className="space-y-2 text-[12.5px]">
                  <label className="flex cursor-pointer items-center gap-2 text-zinc-700">
                    <input
                      type="checkbox" checked={policy.noRepeating}
                      onChange={(e) => setPolicy((p) => ({ ...p, noRepeating: e.target.checked }))}
                      className="rounded border-zinc-300 accent-emerald-600"
                    />
                    No repeating characters
                  </label>
                  <div className="flex items-center gap-2 text-zinc-700">
                    Min numbers:
                    <input
                      type="number" min={0} max={10} value={policy.minNumbers}
                      onChange={(e) => setPolicy((p) => ({ ...p, minNumbers: parseInt(e.target.value, 10) || 0 }))}
                      className="w-12 rounded-lg border border-zinc-200 px-2 py-1 text-center text-xs"
                    />
                  </div>
                  <div className="flex items-center gap-2 text-zinc-700">
                    Min symbols:
                    <input
                      type="number" min={0} max={10} value={policy.minSymbols}
                      onChange={(e) => setPolicy((p) => ({ ...p, minSymbols: parseInt(e.target.value, 10) || 0 }))}
                      className="w-12 rounded-lg border border-zinc-200 px-2 py-1 text-center text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Count */}
              <div className="flex items-center gap-2 text-[12.5px] text-zinc-700">
                <span>Bulk count:</span>
                <input
                  type="number" min={1} max={20} value={count}
                  onChange={(e) => setCount(Math.min(20, Math.max(1, parseInt(e.target.value, 10) || 1)))}
                  className="w-14 rounded-lg border border-zinc-200 px-2 py-1.5 text-center text-sm"
                />
                <span className="text-zinc-400">/ 20</span>
              </div>
            </div>
          )}

          {/* ── Passphrase options ── */}
          {mode === 'passphrase' && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-[12.5px] text-zinc-700">
                Words:
                <select
                  value={passphraseOpts.wordCount}
                  onChange={(e) => setPassphraseOpts((o) => ({ ...o, wordCount: parseInt(e.target.value, 10) }))}
                  className="rounded-lg border border-zinc-200 bg-white px-2.5 py-1.5 text-sm"
                >
                  {[3, 4, 5, 6, 7, 8].map((n) => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
              <div className="flex items-center gap-2 text-[12.5px] text-zinc-700">
                Separator:
                <select
                  value={passphraseOpts.separator}
                  onChange={(e) => setPassphraseOpts((o) => ({ ...o, separator: e.target.value as PassphraseOptions['separator'] }))}
                  className="rounded-lg border border-zinc-200 bg-white px-2.5 py-1.5 text-sm"
                >
                  <option value="-">-  (hyphen)</option>
                  <option value="_">_  (underscore)</option>
                  <option value=".">. (dot)</option>
                  <option value=" ">space</option>
                </select>
              </div>
              <div className="space-y-2">
                {[
                  { key: 'capitalize', label: 'Capitalize words' },
                  { key: 'addNumber',  label: 'Append a number' },
                  { key: 'addSymbol',  label: 'Append a symbol' },
                ].map(({ key, label }) => (
                  <label key={key} className="flex cursor-pointer items-center gap-2 text-[12.5px] text-zinc-700">
                    <input
                      type="checkbox"
                      checked={(passphraseOpts as unknown as Record<string, boolean>)[key]}
                      onChange={(e) => setPassphraseOpts((o) => ({ ...o, [key]: e.target.checked }))}
                      className="rounded border-zinc-300 accent-emerald-600"
                    />
                    {label}
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* ── Pattern options ── */}
          {mode === 'pattern' && (
            <div>
              <p className="mb-1.5 text-[12px] font-semibold text-zinc-700">
                Pattern
                <span className="ml-1.5 font-normal text-zinc-400">(A=upper a=lower 1=digit !=symbol)</span>
              </p>
              <input
                type="text" value={pattern}
                onChange={(e) => setPattern(e.target.value)}
                placeholder="AAaa11!!"
                className="w-full rounded-xl border border-zinc-200 px-3 py-2 font-mono text-sm focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400"
              />
            </div>
          )}

          {/* Generate button */}
          <button
            type="button"
            onClick={generate}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-[14px] font-bold text-white shadow-lg shadow-emerald-200/60 transition-all hover:bg-emerald-700 active:scale-[0.98]"
          >
            <RefreshCw className="h-4 w-4" />
            Generate{count > 1 ? ` ${count} passwords` : ''}
          </button>
        </div>
      </div>

      {/* ══ RIGHT: Output + analysis ══════════════════════════ */}
      <div className="flex-1 p-5 sm:p-7">

        {/* ── Primary output ── */}
        <div className="mb-5 rounded-2xl border border-zinc-200 bg-zinc-50/50 p-4">
          <div className="mb-3 flex items-center justify-between gap-2">
            <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-zinc-400">Generated password</p>
            <div className="flex items-center gap-1.5">
              <button
                type="button" onClick={() => setReveal((r) => !r)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-2.5 py-1.5 text-xs font-medium text-zinc-600 hover:bg-zinc-50"
                aria-label={reveal ? 'Hide' : 'Reveal'}
              >
                {reveal ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                {reveal ? 'Hide' : 'Reveal'}
              </button>
              <button
                type="button" onClick={() => copyPassword(password)}
                className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-semibold transition-all ${
                  copied
                    ? 'border-emerald-300 bg-emerald-50 text-emerald-700'
                    : 'border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50'
                }`}
              >
                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>

          <div className="min-h-[52px] rounded-xl border border-zinc-200 bg-white px-4 py-3">
            <code className="block break-all font-mono text-[15px] leading-relaxed text-zinc-900">
              {password
                ? reveal ? password : '•'.repeat(Math.min(password.length, 40))
                : <span className="text-zinc-300">Press Generate</span>}
            </code>
          </div>

          {weakWarning && (
            <div className="mt-2.5 flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-[12px] text-amber-700">
              <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              This matches a common weak pattern — consider regenerating.
            </div>
          )}
        </div>

        {/* ── Strength meter ── */}
        <div className="mb-5 rounded-2xl border border-zinc-200 bg-white p-4">
          <div className="mb-2 flex items-center justify-between gap-2">
            <div className="flex items-baseline gap-2">
              <span className="text-[13px] font-bold text-zinc-900">Strength:</span>
              <span className={`text-[13px] font-bold ${sm.text}`}>{strength}</span>
            </div>
            <span className="font-mono text-[12px] text-zinc-500">{ent.toFixed(0)} bits entropy</span>
          </div>
          <div className="h-2.5 overflow-hidden rounded-full bg-zinc-100">
            <div
              className={`h-full rounded-full transition-all duration-500 ${sm.bar}`}
              style={{ width: `${sm.pct}%` }}
            />
          </div>
          <p className="mt-2 text-[11.5px] text-zinc-500">
            Crack time at 1B/s:{' '}
            <strong className="font-semibold text-zinc-700">{formatCrackTime(crackTime)}</strong>
          </p>
        </div>

        {/* ── Bulk output ── */}
        {passwords.length > 1 && (
          <div className="mb-5 rounded-2xl border border-zinc-200 bg-white p-4">
            <div className="mb-2.5 flex items-center justify-between">
              <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-zinc-400">
                All {passwords.length} generated
              </p>
              <div className="flex gap-1.5">
                {(['json', 'csv', 'txt'] as const).map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => exportAs(f)}
                    className="rounded-lg border border-zinc-200 bg-zinc-50 px-2 py-1 text-[11px] font-semibold uppercase text-zinc-500 hover:bg-white"
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
            <ul className="max-h-44 space-y-1.5 overflow-y-auto">
              {passwords.map((p, i) => (
                <li key={i} className="flex items-center gap-2 rounded-lg border border-zinc-100 bg-zinc-50 px-3 py-1.5">
                  <code className="flex-1 truncate font-mono text-[12px] text-zinc-700">
                    {reveal ? p : '•'.repeat(Math.min(p.length, 24))}
                  </code>
                  <CopyBtn value={p} />
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* ── Actions row ── */}
        <div className="mb-5 grid gap-3 sm:grid-cols-2">

          {/* Breach check */}
          <div className="rounded-xl border border-zinc-200 bg-white p-4">
            <div className="mb-2 flex items-center gap-2">
              <Shield className="h-4 w-4 text-violet-600" />
              <p className="text-[12.5px] font-bold text-zinc-800">Breach check</p>
            </div>
            <p className="mb-3 text-[11.5px] text-zinc-500">Check against Have I Been Pwned using k-anonymity — your password is never transmitted.</p>
            <button
              type="button" onClick={checkBreach}
              className="rounded-lg border border-violet-200 bg-violet-50 px-3 py-1.5 text-[12.5px] font-semibold text-violet-700 hover:bg-violet-100 transition-colors"
            >
              Check HIBP
            </button>
            {pwned !== null && (
              <div className={`mt-2.5 rounded-lg border px-3 py-2 text-[12px] font-semibold ${
                pwned ? 'border-red-200 bg-red-50 text-red-700' : 'border-emerald-200 bg-emerald-50 text-emerald-700'
              }`}>
                {pwned ? `⚠ Found in ${pwnedCount ?? 0} breaches` : '✓ Not found in known breaches'}
              </div>
            )}
          </div>

          {/* Hash viewer */}
          <div className="rounded-xl border border-zinc-200 bg-white p-4">
            <div className="mb-2 flex items-center gap-2">
              <Hash className="h-4 w-4 text-sky-600" />
              <p className="text-[12.5px] font-bold text-zinc-800">Hash viewer</p>
            </div>
            <p className="mb-3 text-[11.5px] text-zinc-500">View SHA-256 and SHA-512 hashes of the generated password.</p>
            <button
              type="button" onClick={updateHashes}
              className="rounded-lg border border-sky-200 bg-sky-50 px-3 py-1.5 text-[12.5px] font-semibold text-sky-700 hover:bg-sky-100 transition-colors"
            >
              Compute hashes
            </button>
            {hashes && (
              <div className="mt-2.5 space-y-1.5 rounded-lg border border-zinc-100 bg-zinc-50 p-2.5 font-mono text-[10.5px] text-zinc-600">
                <div className="flex items-start gap-1.5">
                  <span className="shrink-0 font-semibold text-zinc-400">SHA-256</span>
                  <span className="break-all">{hashes.sha256}</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="shrink-0 font-semibold text-zinc-400">SHA-512</span>
                  <span className="break-all">{hashes.sha512}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── Secret key generator ── */}
        <div className="mb-5 rounded-xl border border-zinc-200 bg-white p-4">
          <div className="mb-2 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Key className="h-4 w-4 text-amber-600" />
              <p className="text-[12.5px] font-bold text-zinc-800">Secret key generator</p>
            </div>
            <button
              type="button" onClick={generateSecrets}
              className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-1.5 text-[12px] font-semibold text-amber-700 hover:bg-amber-100 transition-colors"
            >
              Generate keys
            </button>
          </div>
          <p className="mb-3 text-[11.5px] text-zinc-500">JWT signing secrets, API keys, OAuth secrets, and AES-256 encryption keys.</p>
          {Object.keys(secretKeys).length > 0 ? (
            <div className="space-y-2">
              {Object.entries(secretKeys).map(([name, value]) => (
                <div key={name} className="rounded-lg border border-zinc-100 bg-zinc-50 p-2.5">
                  <div className="mb-1 flex items-center justify-between gap-2">
                    <span className="text-[10.5px] font-bold uppercase tracking-wider text-zinc-400">{name}</span>
                    <CopyBtn value={value} />
                  </div>
                  <code className="block break-all font-mono text-[11px] text-zinc-700">{value}</code>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center gap-2 text-[11.5px] text-zinc-400">
              <Database className="h-3.5 w-3.5" />
              JWT · API Key · OAuth · AES-256 · HMAC-SHA256 · Base64url
            </div>
          )}
        </div>

        {/* ── Developer mode + History ── */}
        <div className="space-y-2">
          <button
            type="button"
            onClick={() => setDevMode((d) => !d)}
            className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-[12.5px] font-semibold text-zinc-600 hover:bg-zinc-50 transition-colors"
          >
            <Zap className="h-3.5 w-3.5 text-zinc-400" />
            Developer info
            {devMode ? <ChevronDown className="ml-auto h-3.5 w-3.5 text-zinc-400" /> : <ChevronRight className="ml-auto h-3.5 w-3.5 text-zinc-400" />}
          </button>
          {devMode && (
            <div className="rounded-xl border border-zinc-100 bg-zinc-50 p-3 font-mono text-[11.5px] text-zinc-600">
              <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                <span className="text-zinc-400">Entropy</span><span>{ent.toFixed(2)} bits</span>
                <span className="text-zinc-400">Charset size</span><span>{getCharsetSize(charset)}</span>
                <span className="text-zinc-400">Combinations</span><span>2^{ent.toFixed(0)}</span>
                <span className="text-zinc-400">RNG source</span><span>crypto.getRandomValues()</span>
              </div>
            </div>
          )}

          {history.length > 0 && (
            <>
              <button
                type="button"
                onClick={() => setShowHistory((s) => !s)}
                className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-[12.5px] font-semibold text-zinc-600 hover:bg-zinc-50 transition-colors"
              >
                <Lock className="h-3.5 w-3.5 text-zinc-400" />
                Recent history ({history.length})
                {showHistory ? <ChevronDown className="ml-auto h-3.5 w-3.5 text-zinc-400" /> : <ChevronRight className="ml-auto h-3.5 w-3.5 text-zinc-400" />}
              </button>
              {showHistory && (
                <div className="rounded-xl border border-zinc-100 bg-zinc-50 p-3">
                  <ul className="space-y-1.5">
                    {history.map((h, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <code className="flex-1 truncate font-mono text-[11.5px] text-zinc-600">
                          {reveal ? h : '•'.repeat(Math.min(h.length, 20))}
                        </code>
                        <CopyBtn value={h} />
                      </li>
                    ))}
                  </ul>
                  <div className="mt-2 flex items-center gap-3">
                    <button
                      type="button" onClick={() => setHistory([])}
                      className="text-[11.5px] font-medium text-zinc-400 hover:text-red-500 transition-colors"
                    >
                      Clear history
                    </button>
                    <button
                      type="button" onClick={exportHistoryCSV}
                      className="text-[11.5px] font-medium text-emerald-600 hover:text-emerald-800 transition-colors"
                    >
                      ↓ Export CSV
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

      </div>
    </div>
  );
}
