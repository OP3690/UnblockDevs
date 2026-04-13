'use client';

import { useState, useMemo, useCallback, useRef } from 'react';
import {
  Copy, Check, RotateCcw, ArrowUpDown, Hash, Link2,
  Mail, Phone, Shuffle, Filter, Binary, Code2, Braces,
} from 'lucide-react';
import ToolPageShell from '@/components/tools/ToolPageShell';

// ── Types ────────────────────────────────────────────────────────────────────

type MainTab = 'cases' | 'lines' | 'extract' | 'transform' | 'encode';

// ── Case conversion ──────────────────────────────────────────────────────────

function splitWords(input: string): string[] {
  // Insert space before uppercase that follows lowercase (camelCase/PascalCase split)
  let s = input.replace(/([a-z])([A-Z])/g, '$1 $2');
  // Insert space between letter and digit transitions
  s = s.replace(/([a-zA-Z])(\d)/g, '$1 $2');
  s = s.replace(/(\d)([a-zA-Z])/g, '$1 $2');
  // Replace common separators with space
  s = s.replace(/[-_./\\]+/g, ' ');
  // Split and filter empty
  return s.split(/\s+/).filter(Boolean);
}

function toCamel(input: string): string {
  const words = splitWords(input);
  return words.map((w, i) => i === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join('');
}

function toPascal(input: string): string {
  return splitWords(input).map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join('');
}

function toSnake(input: string): string {
  return splitWords(input).map(w => w.toLowerCase()).join('_');
}

function toKebab(input: string): string {
  return splitWords(input).map(w => w.toLowerCase()).join('-');
}

function toScreaming(input: string): string {
  return splitWords(input).map(w => w.toUpperCase()).join('_');
}

function toTitle(input: string): string {
  return splitWords(input).map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
}

function toDot(input: string): string {
  return splitWords(input).map(w => w.toLowerCase()).join('.');
}

function toPath(input: string): string {
  return splitWords(input).map(w => w.toLowerCase()).join('/');
}

function toFlat(input: string): string {
  return splitWords(input).map(w => w.toLowerCase()).join('');
}

function toUpper(input: string): string {
  return input.toUpperCase();
}

function toLower(input: string): string {
  return input.toLowerCase();
}

function toSentence(input: string): string {
  const s = input.trim();
  if (!s) return '';
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}

const CASE_FORMATS = [
  { label: 'camelCase', fn: toCamel, example: 'myVariableName', color: 'border-violet-500/30 bg-violet-500/5' },
  { label: 'PascalCase', fn: toPascal, example: 'MyVariableName', color: 'border-sky-500/30 bg-sky-500/5' },
  { label: 'snake_case', fn: toSnake, example: 'my_variable_name', color: 'border-emerald-500/30 bg-emerald-500/5' },
  { label: 'kebab-case', fn: toKebab, example: 'my-variable-name', color: 'border-teal-500/30 bg-teal-500/5' },
  { label: 'SCREAMING_SNAKE', fn: toScreaming, example: 'MY_VARIABLE_NAME', color: 'border-red-500/30 bg-red-500/5' },
  { label: 'Title Case', fn: toTitle, example: 'My Variable Name', color: 'border-amber-500/30 bg-amber-500/5' },
  { label: 'dot.case', fn: toDot, example: 'my.variable.name', color: 'border-pink-500/30 bg-pink-500/5' },
  { label: 'path/case', fn: toPath, example: 'my/variable/name', color: 'border-orange-500/30 bg-orange-500/5' },
  { label: 'flatcase', fn: toFlat, example: 'myvariablename', color: 'border-indigo-500/30 bg-indigo-500/5' },
  { label: 'UPPER CASE', fn: toUpper, example: 'MY VARIABLE NAME', color: 'border-rose-500/30 bg-rose-500/5' },
  { label: 'lower case', fn: toLower, example: 'my variable name', color: 'border-cyan-500/30 bg-cyan-500/5' },
  { label: 'Sentence case', fn: toSentence, example: 'My variable name', color: 'border-lime-500/30 bg-lime-500/5' },
];

// ── Text stats ────────────────────────────────────────────────────────────────

function computeStats(text: string) {
  const chars = text.length;
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const lines = text ? text.split('\n').length : 0;
  const uniqueWords = text.trim() ? new Set(text.toLowerCase().trim().split(/\s+/)).size : 0;
  const readingTime = Math.max(1, Math.round(words / 200));
  return { chars, words, lines, uniqueWords, readingTime };
}

// ── Extract patterns ──────────────────────────────────────────────────────────

const EXTRACT_PATTERNS = [
  {
    label: 'Emails', icon: <Mail className="h-3.5 w-3.5" />,
    regex: /[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/g,
  },
  {
    label: 'URLs', icon: <Link2 className="h-3.5 w-3.5" />,
    regex: /https?:\/\/[^\s<>"{}|\\^`[\]]+/g,
  },
  {
    label: 'IP Addresses', icon: <Hash className="h-3.5 w-3.5" />,
    regex: /\b(?:\d{1,3}\.){3}\d{1,3}\b/g,
  },
  {
    label: 'Phone Numbers', icon: <Phone className="h-3.5 w-3.5" />,
    regex: /(?:\+?1[-.\s]?)?\(?[2-9]\d{2}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g,
  },
  {
    label: 'Hashtags', icon: <Hash className="h-3.5 w-3.5" />,
    regex: /#[a-zA-Z0-9_]+/g,
  },
  {
    label: 'Hex Colors', icon: <Filter className="h-3.5 w-3.5" />,
    regex: /#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})\b/g,
  },
  {
    label: 'Numbers', icon: <Binary className="h-3.5 w-3.5" />,
    regex: /\b-?\d+(?:\.\d+)?\b/g,
  },
];

// ── Encode/Decode operations ──────────────────────────────────────────────────

function toHex(str: string): string {
  return Array.from(new TextEncoder().encode(str)).map(b => b.toString(16).padStart(2, '0')).join(' ');
}

function fromHex(hex: string): string {
  try {
    const bytes = hex.trim().split(/\s+/).map(h => parseInt(h, 16));
    return new TextDecoder().decode(new Uint8Array(bytes));
  } catch { return 'Invalid hex input'; }
}

function toBinary(str: string): string {
  return Array.from(new TextEncoder().encode(str)).map(b => b.toString(2).padStart(8, '0')).join(' ');
}

function fromBinary(bin: string): string {
  try {
    const bytes = bin.trim().split(/\s+/).map(b => parseInt(b, 2));
    return new TextDecoder().decode(new Uint8Array(bytes));
  } catch { return 'Invalid binary input'; }
}

function rot13(str: string): string {
  return str.replace(/[A-Za-z]/g, c => {
    const base = c <= 'Z' ? 65 : 97;
    return String.fromCharCode(((c.charCodeAt(0) - base + 13) % 26) + base);
  });
}

function htmlEncode(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}

function htmlDecode(str: string): string {
  return str.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#039;/g, "'");
}

// ── Copy button ───────────────────────────────────────────────────────────────

function CopyBtn({ text, size = 'sm', label }: { text: string; size?: 'xs' | 'sm'; label?: string }) {
  const [copied, setCopied] = useState(false);
  const copy = useCallback(async () => {
    try { await navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch {}
  }, [text]);
  const cls = size === 'xs'
    ? 'p-1 rounded text-zinc-500 hover:text-zinc-300'
    : 'inline-flex items-center gap-1.5 rounded-lg border border-zinc-700/50 bg-zinc-800 px-2.5 py-1 text-xs font-medium text-zinc-300 hover:bg-zinc-700 hover:text-white';
  return (
    <button onClick={copy} className={`transition ${cls}`} title="Copy">
      {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
      {size === 'sm' && <span>{copied ? 'Copied!' : (label || 'Copy')}</span>}
    </button>
  );
}

// ── Case card ─────────────────────────────────────────────────────────────────

function CaseCard({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className={`flex flex-col gap-1.5 rounded-xl border p-3 ${color}`}>
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">{label}</span>
        <CopyBtn text={value} size="xs" />
      </div>
      <p className="font-mono text-sm text-zinc-100 break-all leading-relaxed">{value || <span className="text-zinc-600 italic">—</span>}</p>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function StringUtilitiesClient() {
  const [input, setInput] = useState('my variable name example');
  const [tab, setTab] = useState<MainTab>('cases');

  // Line tools state
  const [lineOutput, setLineOutput] = useState('');
  const [lineFilter, setLineFilter] = useState('');
  const [joinSep, setJoinSep] = useState(', ');

  // Extract state
  const [extractResults, setExtractResults] = useState<Record<string, string[]>>({});

  // Transform state
  const [findStr, setFindStr] = useState('');
  const [replaceStr, setReplaceStr] = useState('');
  const [useRegex, setUseRegex] = useState(false);
  const [transformOutput, setTransformOutput] = useState('');

  // Encode state
  const [encodeOutput, setEncodeOutput] = useState('');
  const [encodeOp, setEncodeOp] = useState('');

  const stats = useMemo(() => computeStats(input), [input]);

  const caseResults = useMemo(() =>
    CASE_FORMATS.map(f => ({ ...f, value: input ? f.fn(input) : '' })),
    [input]
  );

  // ── Line tools ──────────────────────────────────────────────────────────────

  const applyLineOp = useCallback((op: string) => {
    const lines = input.split('\n');
    let result: string[];
    switch (op) {
      case 'sort-az': result = [...lines].sort((a, b) => a.localeCompare(b)); break;
      case 'sort-za': result = [...lines].sort((a, b) => b.localeCompare(a)); break;
      case 'dedupe': result = [...new Set(lines)]; break;
      case 'dedupe-ci': result = [...new Map(lines.map(l => [l.toLowerCase(), l])).values()]; break;
      case 'reverse': result = [...lines].reverse(); break;
      case 'shuffle': {
        result = [...lines];
        for (let i = result.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [result[i], result[j]] = [result[j], result[i]];
        }
        break;
      }
      case 'number': result = lines.map((l, i) => `${i + 1}. ${l}`); break;
      case 'remove-empty': result = lines.filter(l => l.trim()); break;
      case 'filter': result = lines.filter(l => l.includes(lineFilter)); break;
      case 'join': result = [lines.join(joinSep)]; break;
      case 'trim': result = lines.map(l => l.trim()); break;
      case 'upper': result = lines.map(l => l.toUpperCase()); break;
      case 'lower': result = lines.map(l => l.toLowerCase()); break;
      default: result = lines;
    }
    setLineOutput(result.join('\n'));
  }, [input, lineFilter, joinSep]);

  // ── Extract ─────────────────────────────────────────────────────────────────

  const extractPattern = useCallback((label: string, regex: RegExp) => {
    const matches = [...new Set(input.match(regex) || [])];
    setExtractResults(prev => ({ ...prev, [label]: matches }));
  }, [input]);

  // ── Transform ──────────────────────────────────────────────────────────────

  const applyTransform = useCallback((op: string) => {
    let result = input;
    switch (op) {
      case 'trim': result = input.split('\n').map(l => l.trim()).join('\n'); break;
      case 'collapse': result = input.replace(/[ \t]+/g, ' '); break;
      case 'remove-ws': result = input.replace(/\s+/g, ''); break;
      case 'replace': {
        if (useRegex) {
          try { result = input.replace(new RegExp(findStr, 'g'), replaceStr); } catch { result = 'Invalid regex'; }
        } else {
          result = input.split(findStr).join(replaceStr);
        }
        break;
      }
      case 'escape-json': result = JSON.stringify(input); break;
      case 'escape-regex': result = input.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); break;
      case 'wrap80': {
        result = input.split('\n').map(line => {
          const words = line.split(' ');
          const lines: string[] = [];
          let cur = '';
          for (const w of words) {
            if (cur.length + w.length + 1 > 80 && cur) { lines.push(cur); cur = w; }
            else { cur = cur ? cur + ' ' + w : w; }
          }
          if (cur) lines.push(cur);
          return lines.join('\n');
        }).join('\n');
        break;
      }
    }
    setTransformOutput(result);
  }, [input, findStr, replaceStr, useRegex]);

  // ── Encode ─────────────────────────────────────────────────────────────────

  const applyEncode = useCallback((op: string) => {
    let result = '';
    try {
      switch (op) {
        case 'b64-enc': result = btoa(unescape(encodeURIComponent(input))); break;
        case 'b64-dec': result = decodeURIComponent(escape(atob(input))); break;
        case 'url-enc': result = encodeURIComponent(input); break;
        case 'url-dec': result = decodeURIComponent(input); break;
        case 'html-enc': result = htmlEncode(input); break;
        case 'html-dec': result = htmlDecode(input); break;
        case 'json-str': result = JSON.stringify(input); break;
        case 'json-parse': result = JSON.parse(input); break;
        case 'rot13': result = rot13(input); break;
        case 'hex-enc': result = toHex(input); break;
        case 'hex-dec': result = fromHex(input); break;
        case 'bin-enc': result = toBinary(input); break;
        case 'bin-dec': result = fromBinary(input); break;
        default: result = input;
      }
    } catch (e: any) {
      result = `Error: ${e.message}`;
    }
    setEncodeOutput(result);
    setEncodeOp(op);
  }, [input]);

  // ── Tabs ───────────────────────────────────────────────────────────────────

  const tabs: { id: MainTab; label: string }[] = [
    { id: 'cases', label: '⚡ Case Formats' },
    { id: 'lines', label: '📋 Line Tools' },
    { id: 'extract', label: '🔍 Extract' },
    { id: 'transform', label: '🔧 Transform' },
    { id: 'encode', label: '🔐 Encode/Decode' },
  ];

  // ── Tool UI ────────────────────────────────────────────────────────────────

  const tool = (
    <div className="space-y-4">
      {/* Input */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-zinc-300">Input Text</label>
          <button onClick={() => { setInput(''); setLineOutput(''); setTransformOutput(''); setEncodeOutput(''); setExtractResults({}); }} className="text-xs text-zinc-500 hover:text-zinc-300 transition flex items-center gap-1">
            <RotateCcw className="h-3 w-3" /> Clear
          </button>
        </div>
        <textarea
          value={input}
          onChange={e => { setInput(e.target.value); setLineOutput(''); setTransformOutput(''); setEncodeOutput(''); }}
          rows={4}
          spellCheck={false}
          placeholder="Paste any text, variable name, or code snippet..."
          className="w-full rounded-xl border border-zinc-700/50 bg-zinc-900/80 px-4 py-3 font-mono text-sm text-zinc-200 placeholder-zinc-600 resize-y focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50"
        />
        {/* Stats bar */}
        <div className="flex flex-wrap gap-2 text-[11px]">
          {[
            { label: 'chars', val: stats.chars.toLocaleString() },
            { label: 'words', val: stats.words.toLocaleString() },
            { label: 'lines', val: stats.lines.toLocaleString() },
            { label: 'unique words', val: stats.uniqueWords.toLocaleString() },
            { label: 'read time', val: `~${stats.readingTime} min` },
          ].map(s => (
            <span key={s.label} className="rounded-full border border-zinc-700/40 bg-zinc-800/60 px-2.5 py-1 text-zinc-400">
              <span className="font-semibold text-zinc-200">{s.val}</span> {s.label}
            </span>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 rounded-xl border border-zinc-700/40 bg-zinc-900/60 p-1 overflow-x-auto">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`rounded-lg px-3 py-2 text-xs font-medium whitespace-nowrap transition ${
              tab === t.id ? 'bg-zinc-700 text-white shadow-sm' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ── Case Formats ──────────────────────────────────────────────────────── */}
      {tab === 'cases' && (
        <div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {caseResults.map(f => (
              <CaseCard key={f.label} label={f.label} value={f.value} color={f.color} />
            ))}
          </div>
          <p className="mt-3 text-[11px] text-zinc-600">
            Algorithm: splits on spaces, hyphens, underscores, dots, slashes, and camelCase transitions.
          </p>
        </div>
      )}

      {/* ── Line Tools ────────────────────────────────────────────────────────── */}
      {tab === 'lines' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {[
              { label: 'Sort A→Z', op: 'sort-az', icon: <ArrowUpDown className="h-3.5 w-3.5" /> },
              { label: 'Sort Z→A', op: 'sort-za', icon: <ArrowUpDown className="h-3.5 w-3.5 rotate-180" /> },
              { label: 'Deduplicate', op: 'dedupe', icon: <Filter className="h-3.5 w-3.5" /> },
              { label: 'Dedupe (case-insensitive)', op: 'dedupe-ci', icon: <Filter className="h-3.5 w-3.5" /> },
              { label: 'Reverse', op: 'reverse', icon: <RotateCcw className="h-3.5 w-3.5" /> },
              { label: 'Shuffle', op: 'shuffle', icon: <Shuffle className="h-3.5 w-3.5" /> },
              { label: 'Number Lines', op: 'number', icon: <Hash className="h-3.5 w-3.5" /> },
              { label: 'Remove Empty', op: 'remove-empty', icon: <Filter className="h-3.5 w-3.5" /> },
              { label: 'Trim Whitespace', op: 'trim', icon: <Filter className="h-3.5 w-3.5" /> },
              { label: 'UPPER CASE', op: 'upper', icon: <ArrowUpDown className="h-3.5 w-3.5" /> },
              { label: 'lower case', op: 'lower', icon: <ArrowUpDown className="h-3.5 w-3.5" /> },
            ].map(btn => (
              <button
                key={btn.op}
                onClick={() => applyLineOp(btn.op)}
                className="flex items-center gap-2 rounded-lg border border-zinc-700/50 bg-zinc-800/50 px-3 py-2.5 text-xs font-medium text-zinc-300 transition hover:bg-zinc-700 hover:text-white"
              >
                {btn.icon} {btn.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="flex gap-2">
              <input
                value={lineFilter}
                onChange={e => setLineFilter(e.target.value)}
                placeholder="Filter contains..."
                className="flex-1 rounded-lg border border-zinc-700/50 bg-zinc-900 px-3 py-2 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-emerald-500/50"
              />
              <button onClick={() => applyLineOp('filter')} className="rounded-lg bg-zinc-700 px-3 py-2 text-xs font-medium text-zinc-200 hover:bg-zinc-600 transition">Filter</button>
            </div>
            <div className="flex gap-2">
              <input
                value={joinSep}
                onChange={e => setJoinSep(e.target.value)}
                placeholder="Join separator..."
                className="flex-1 rounded-lg border border-zinc-700/50 bg-zinc-900 px-3 py-2 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-emerald-500/50"
              />
              <button onClick={() => applyLineOp('join')} className="rounded-lg bg-zinc-700 px-3 py-2 text-xs font-medium text-zinc-200 hover:bg-zinc-600 transition">Join</button>
            </div>
          </div>

          {lineOutput && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-400">Result ({lineOutput.split('\n').length} lines)</span>
                <CopyBtn text={lineOutput} />
              </div>
              <textarea
                readOnly
                value={lineOutput}
                rows={8}
                className="w-full rounded-xl border border-zinc-700/40 bg-zinc-900/60 px-4 py-3 font-mono text-sm text-zinc-200 resize-y focus:outline-none"
              />
            </div>
          )}
        </div>
      )}

      {/* ── Extract ───────────────────────────────────────────────────────────── */}
      {tab === 'extract' && (
        <div className="space-y-3">
          {EXTRACT_PATTERNS.map(p => {
            const results = extractResults[p.label];
            return (
              <div key={p.label} className="rounded-xl border border-zinc-700/40 bg-zinc-800/30 p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-sm font-medium text-zinc-200">
                    {p.icon} {p.label}
                    {results && (
                      <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">
                        {results.length} found
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    {results && results.length > 0 && (
                      <CopyBtn text={results.join('\n')} label="Copy All" size="sm" />
                    )}
                    <button
                      onClick={() => extractPattern(p.label, p.regex)}
                      className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-emerald-500"
                    >
                      Extract
                    </button>
                  </div>
                </div>
                {results !== undefined && (
                  results.length === 0 ? (
                    <p className="text-xs text-zinc-500 italic">No matches found.</p>
                  ) : (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {results.map((r, i) => (
                        <div key={i} className="flex items-center gap-1.5 rounded-lg border border-zinc-700/40 bg-zinc-900 px-2.5 py-1">
                          <span className="font-mono text-xs text-zinc-200">{r}</span>
                          <CopyBtn text={r} size="xs" />
                        </div>
                      ))}
                    </div>
                  )
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ── Transform ─────────────────────────────────────────────────────────── */}
      {tab === 'transform' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {[
              { label: 'Trim whitespace', op: 'trim' },
              { label: 'Collapse spaces', op: 'collapse' },
              { label: 'Remove all whitespace', op: 'remove-ws' },
              { label: 'Escape for JSON', op: 'escape-json' },
              { label: 'Escape for Regex', op: 'escape-regex' },
              { label: 'Word wrap at 80', op: 'wrap80' },
            ].map(btn => (
              <button
                key={btn.op}
                onClick={() => applyTransform(btn.op)}
                className="rounded-lg border border-zinc-700/50 bg-zinc-800/50 px-3 py-2.5 text-xs font-medium text-zinc-300 transition hover:bg-zinc-700 hover:text-white text-left"
              >
                {btn.label}
              </button>
            ))}
          </div>

          <div className="space-y-2">
            <p className="text-xs font-medium text-zinc-400">Find & Replace</p>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <input value={findStr} onChange={e => setFindStr(e.target.value)} placeholder="Find..." className="rounded-lg border border-zinc-700/50 bg-zinc-900 px-3 py-2 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-emerald-500/50" />
              <input value={replaceStr} onChange={e => setReplaceStr(e.target.value)} placeholder="Replace with..." className="rounded-lg border border-zinc-700/50 bg-zinc-900 px-3 py-2 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-emerald-500/50" />
            </div>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-1.5 text-xs text-zinc-400 cursor-pointer select-none">
                <input type="checkbox" checked={useRegex} onChange={e => setUseRegex(e.target.checked)} className="accent-emerald-500" />
                Use regex
              </label>
              <button onClick={() => applyTransform('replace')} className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-emerald-500">
                Replace All
              </button>
            </div>
          </div>

          {transformOutput && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-400">Result</span>
                <CopyBtn text={transformOutput} />
              </div>
              <textarea
                readOnly
                value={transformOutput}
                rows={6}
                className="w-full rounded-xl border border-zinc-700/40 bg-zinc-900/60 px-4 py-3 font-mono text-sm text-zinc-200 resize-y focus:outline-none"
              />
            </div>
          )}
        </div>
      )}

      {/* ── Encode/Decode ──────────────────────────────────────────────────────── */}
      {tab === 'encode' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { label: 'Base64', encOp: 'b64-enc', decOp: 'b64-dec', icon: <Binary className="h-4 w-4" /> },
              { label: 'URL Encode', encOp: 'url-enc', decOp: 'url-dec', icon: <Link2 className="h-4 w-4" /> },
              { label: 'HTML Entities', encOp: 'html-enc', decOp: 'html-dec', icon: <Code2 className="h-4 w-4" /> },
              { label: 'JSON Stringify', encOp: 'json-str', decOp: 'json-parse', icon: <Braces className="h-4 w-4" /> },
              { label: 'Hex Bytes', encOp: 'hex-enc', decOp: 'hex-dec', icon: <Hash className="h-4 w-4" /> },
              { label: 'Binary', encOp: 'bin-enc', decOp: 'bin-dec', icon: <Binary className="h-4 w-4" /> },
            ].map(op => (
              <div key={op.label} className="flex flex-col gap-2 rounded-xl border border-zinc-700/40 bg-zinc-800/30 p-3">
                <div className="flex items-center gap-2 text-sm font-medium text-zinc-200">
                  {op.icon} {op.label}
                </div>
                <div className="flex gap-1.5">
                  <button onClick={() => applyEncode(op.encOp)} className="flex-1 rounded-lg bg-zinc-700 py-1.5 text-xs font-medium text-zinc-200 hover:bg-zinc-600 transition">Encode</button>
                  <button onClick={() => applyEncode(op.decOp)} className="flex-1 rounded-lg border border-zinc-700/50 py-1.5 text-xs font-medium text-zinc-300 hover:bg-zinc-700 transition">Decode</button>
                </div>
              </div>
            ))}
            <div className="flex flex-col gap-2 rounded-xl border border-zinc-700/40 bg-zinc-800/30 p-3">
              <div className="flex items-center gap-2 text-sm font-medium text-zinc-200">
                <Shuffle className="h-4 w-4" /> ROT13
              </div>
              <button onClick={() => applyEncode('rot13')} className="rounded-lg bg-zinc-700 py-1.5 text-xs font-medium text-zinc-200 hover:bg-zinc-600 transition">
                Encode / Decode
              </button>
            </div>
          </div>

          {encodeOutput && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-400">Result</span>
                <CopyBtn text={encodeOutput} />
              </div>
              <textarea
                readOnly
                value={encodeOutput}
                rows={5}
                className="w-full rounded-xl border border-zinc-700/40 bg-zinc-900/60 px-4 py-3 font-mono text-sm text-zinc-200 resize-y focus:outline-none"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );

  return (
    <ToolPageShell
      title="String Utilities"
      subtitle="All case conversions, extract, encode/decode, and line tools — in one place"
      icon="✂️"
      tool={tool}
    />
  );
}
