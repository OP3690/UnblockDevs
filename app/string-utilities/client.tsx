'use client';

import { useState, useMemo, useCallback } from 'react';
import {
  Copy, Check, RotateCcw, ArrowUpDown, Hash, Link2,
  Mail, Phone, Shuffle, Binary, Code2, Braces, X,
  ChevronDown, Sparkles, FileText, Search, Wand2,
} from 'lucide-react';
import ToolPageShell from '@/components/tools/ToolPageShell';

// ── Types ────────────────────────────────────────────────────────────────────

type MainTab = 'cases' | 'lines' | 'extract' | 'transform' | 'encode';

// ── Case conversion ──────────────────────────────────────────────────────────

function splitWords(input: string): string[] {
  let s = input
    .replace(/([a-z])([A-Z])/g, '$1 $2')      // camelCase → camel Case
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2') // XMLParser → XML Parser
    .replace(/([a-zA-Z])(\d)/g, '$1 $2')
    .replace(/(\d)([a-zA-Z])/g, '$1 $2')
    .replace(/[-_./\\]+/g, ' ');
  return s.split(/\s+/).filter(Boolean);
}

const toCamel   = (s: string) => { const w = splitWords(s); return w.map((w2, i) => i === 0 ? w2.toLowerCase() : w2.charAt(0).toUpperCase() + w2.slice(1).toLowerCase()).join(''); };
const toPascal  = (s: string) => splitWords(s).map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join('');
const toSnake   = (s: string) => splitWords(s).map(w => w.toLowerCase()).join('_');
const toKebab   = (s: string) => splitWords(s).map(w => w.toLowerCase()).join('-');
const toScream  = (s: string) => splitWords(s).map(w => w.toUpperCase()).join('_');
const toTitle   = (s: string) => splitWords(s).map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
const toDot     = (s: string) => splitWords(s).map(w => w.toLowerCase()).join('.');
const toPath    = (s: string) => splitWords(s).map(w => w.toLowerCase()).join('/');
const toFlat    = (s: string) => splitWords(s).map(w => w.toLowerCase()).join('');
const toCobol   = (s: string) => splitWords(s).map(w => w.toUpperCase()).join('-');
const toSentence= (s: string) => { const t = s.trim(); return t ? t.charAt(0).toUpperCase() + t.slice(1).toLowerCase() : ''; };
const toInverse = (s: string) => s.split('').map(c => c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()).join('');

const CASE_FORMATS: { label: string; desc: string; fn: (s: string) => string; badge: string; badgeCls: string }[] = [
  { label: 'camelCase',          desc: 'JS variables, JSON keys',         fn: toCamel,    badge: 'JS/TS',   badgeCls: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20' },
  { label: 'PascalCase',         desc: 'Classes, React components',        fn: toPascal,   badge: 'React',   badgeCls: 'text-sky-400 bg-sky-500/10 border-sky-500/20' },
  { label: 'snake_case',         desc: 'Python, Ruby, DB columns',         fn: toSnake,    badge: 'Python',  badgeCls: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
  { label: 'kebab-case',         desc: 'CSS classes, URLs, HTML attrs',    fn: toKebab,    badge: 'CSS',     badgeCls: 'text-teal-400 bg-teal-500/10 border-teal-500/20' },
  { label: 'SCREAMING_SNAKE',    desc: 'Constants, env variables',         fn: toScream,   badge: 'Const',   badgeCls: 'text-red-400 bg-red-500/10 border-red-500/20' },
  { label: 'Title Case',         desc: 'Headings, display names',          fn: toTitle,    badge: 'UI',      badgeCls: 'text-amber-400 bg-amber-500/10 border-amber-500/20' },
  { label: 'dot.case',           desc: 'Config keys, Java packages',       fn: toDot,      badge: 'Config',  badgeCls: 'text-pink-400 bg-pink-500/10 border-pink-500/20' },
  { label: 'path/case',          desc: 'File paths, routes',               fn: toPath,     badge: 'Path',    badgeCls: 'text-orange-400 bg-orange-500/10 border-orange-500/20' },
  { label: 'flatcase',           desc: 'Legacy systems, compact IDs',      fn: toFlat,     badge: 'Legacy',  badgeCls: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20' },
  { label: 'COBOL-CASE',         desc: 'COBOL, HTTP headers',              fn: toCobol,    badge: 'COBOL',   badgeCls: 'text-violet-400 bg-violet-500/10 border-violet-500/20' },
  { label: 'Sentence case',      desc: 'Sentences, descriptions',          fn: toSentence, badge: 'Text',    badgeCls: 'text-lime-400 bg-lime-500/10 border-lime-500/20' },
  { label: 'iNVERSE cASE',       desc: 'Emphasis / stylistic',             fn: toInverse,  badge: 'Style',   badgeCls: 'text-rose-400 bg-rose-500/10 border-rose-500/20' },
];

// ── Text stats ────────────────────────────────────────────────────────────────

function computeStats(text: string) {
  const chars = text.length;
  const charsNoSpace = text.replace(/\s/g, '').length;
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const lines = text ? text.split('\n').length : 0;
  const uniqueWords = text.trim() ? new Set(text.toLowerCase().trim().split(/\s+/)).size : 0;
  const sentences = text.trim() ? (text.match(/[.!?]+\s/g) || []).length + 1 : 0;
  const readingTime = Math.ceil(words / 200);
  return { chars, charsNoSpace, words, lines, uniqueWords, sentences, readingTime };
}

// ── Examples ─────────────────────────────────────────────────────────────────

const EXAMPLES: { label: string; emoji: string; text: string }[] = [
  { label: 'Variable name',  emoji: '📦', text: 'getUserProfileData' },
  { label: 'DB column',      emoji: '🗄️', text: 'created_at_timestamp' },
  { label: 'Config key',     emoji: '⚙️', text: 'max.retry.attempts' },
  { label: 'Mixed sentence', emoji: '📝', text: 'The Quick-Brown FOX jumps_over the lazy dog' },
  { label: 'Email list',     emoji: '📧', text: 'Contact us at support@example.com or admin@company.co.uk\nVisit https://example.com for more info\nServer IP: 192.168.1.1' },
];

// ── Extract patterns ──────────────────────────────────────────────────────────

const EXTRACT_PATTERNS = [
  { label: 'Emails',     emoji: '📧', regex: /[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/g },
  { label: 'URLs',       emoji: '🔗', regex: /https?:\/\/[^\s<>"{}|\\^`[\]]+/g },
  { label: 'IPv4',       emoji: '🌐', regex: /\b(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\b/g },
  { label: 'Phones',     emoji: '📞', regex: /(?:\+?1[-.\s]?)?\(?[2-9]\d{2}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g },
  { label: 'Hashtags',   emoji: '#️⃣', regex: /#[a-zA-Z0-9_]+/g },
  { label: 'Hex Colors', emoji: '🎨', regex: /#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})\b/g },
  { label: 'Numbers',    emoji: '🔢', regex: /\b-?\d+(?:\.\d+)?\b/g },
  { label: 'Dates',      emoji: '📅', regex: /\b\d{4}[-/]\d{2}[-/]\d{2}\b|\b\d{2}[-/]\d{2}[-/]\d{4}\b/g },
];

// ── Encode helpers ────────────────────────────────────────────────────────────

const toHex    = (s: string) => Array.from(new TextEncoder().encode(s)).map(b => b.toString(16).padStart(2, '0')).join(' ');
const fromHex  = (s: string) => { try { return new TextDecoder().decode(new Uint8Array(s.trim().split(/\s+/).map(h => parseInt(h, 16)))); } catch { return 'Invalid hex'; } };
const toBin    = (s: string) => Array.from(new TextEncoder().encode(s)).map(b => b.toString(2).padStart(8, '0')).join(' ');
const fromBin  = (s: string) => { try { return new TextDecoder().decode(new Uint8Array(s.trim().split(/\s+/).map(b => parseInt(b, 2)))); } catch { return 'Invalid binary'; } };
const rot13    = (s: string) => s.replace(/[A-Za-z]/g, c => { const b = c <= 'Z' ? 65 : 97; return String.fromCharCode(((c.charCodeAt(0) - b + 13) % 26) + b); });
const htmlEnc  = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
const htmlDec  = (s: string) => s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#039;/g, "'");

// ── Copy button ───────────────────────────────────────────────────────────────

function CopyBtn({ text, label, icon = false }: { text: string; label?: string; icon?: boolean }) {
  const [ok, setOk] = useState(false);
  const copy = useCallback(async () => { try { await navigator.clipboard.writeText(text); setOk(true); setTimeout(() => setOk(false), 1500); } catch {} }, [text]);
  if (icon) return (
    <button onClick={copy} className="p-1.5 rounded-lg text-zinc-600 hover:text-zinc-300 hover:bg-zinc-700/60 transition" title="Copy">
      {ok ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
    </button>
  );
  return (
    <button onClick={copy} className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-700/50 bg-zinc-800/80 px-2.5 py-1.5 text-[12px] font-medium text-zinc-300 transition hover:bg-zinc-700 hover:text-white">
      {ok ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
      {ok ? 'Copied!' : (label ?? 'Copy')}
    </button>
  );
}

// ── Case card ─────────────────────────────────────────────────────────────────

function CaseCard({ label, desc, value, badge, badgeCls }: { label: string; desc: string; value: string; badge: string; badgeCls: string }) {
  return (
    <div className="group relative flex flex-col gap-2 rounded-xl border border-zinc-800 bg-zinc-900/60 p-3.5 hover:border-zinc-700 transition">
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-zinc-300 tracking-tight">{label}</span>
            <span className={`rounded-full border px-1.5 py-px text-[9px] font-bold uppercase tracking-wide ${badgeCls}`}>{badge}</span>
          </div>
          <p className="text-[10px] text-zinc-600 mt-0.5">{desc}</p>
        </div>
        <CopyBtn text={value} icon />
      </div>
      <p className="font-mono text-[13px] text-zinc-100 break-all leading-relaxed min-h-[1.5rem]">
        {value || <span className="text-zinc-700 italic text-[11px]">—</span>}
      </p>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function StringUtilitiesClient() {
  const [input, setInput] = useState('getUserProfileData');
  const [tab, setTab] = useState<MainTab>('cases');

  // Line tools
  const [lineOutput, setLineOutput] = useState('');
  const [lineFilter, setLineFilter] = useState('');
  const [lineExclude, setLineExclude] = useState('');
  const [joinSep, setJoinSep] = useState(', ');
  const [lineWrap, setLineWrap] = useState('80');

  // Extract
  const [extractResults, setExtractResults] = useState<Record<string, string[]>>({});

  // Transform
  const [findStr, setFindStr] = useState('');
  const [replaceStr, setReplaceStr] = useState('');
  const [useRegex, setUseRegex] = useState(false);
  const [transformOutput, setTransformOutput] = useState('');

  // Encode
  const [encodeOutput, setEncodeOutput] = useState('');
  const [encodeLabel, setEncodeLabel] = useState('');

  const stats = useMemo(() => computeStats(input), [input]);

  const caseResults = useMemo(() =>
    CASE_FORMATS.map(f => ({ ...f, value: input.trim() ? f.fn(input) : '' })),
    [input]
  );

  const clearAll = useCallback(() => {
    setInput(''); setLineOutput(''); setTransformOutput(''); setEncodeOutput('');
    setEncodeLabel(''); setExtractResults({});
  }, []);

  // ── Line ops ────────────────────────────────────────────────────────────────

  const applyLineOp = useCallback((op: string) => {
    const lines = input.split('\n');
    let result: string[];
    switch (op) {
      case 'sort-az':      result = [...lines].sort((a, b) => a.localeCompare(b)); break;
      case 'sort-za':      result = [...lines].sort((a, b) => b.localeCompare(a)); break;
      case 'sort-len':     result = [...lines].sort((a, b) => a.length - b.length); break;
      case 'sort-len-rev': result = [...lines].sort((a, b) => b.length - a.length); break;
      case 'dedupe':       result = [...new Set(lines)]; break;
      case 'dedupe-ci':    result = [...new Map(lines.map(l => [l.toLowerCase(), l])).values()]; break;
      case 'reverse':      result = [...lines].reverse(); break;
      case 'shuffle':      { result = [...lines]; for (let i = result.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [result[i], result[j]] = [result[j], result[i]]; } break; }
      case 'number':       result = lines.map((l, i) => `${i + 1}. ${l}`); break;
      case 'remove-empty': result = lines.filter(l => l.trim()); break;
      case 'trim':         result = lines.map(l => l.trim()); break;
      case 'upper':        result = lines.map(l => l.toUpperCase()); break;
      case 'lower':        result = lines.map(l => l.toLowerCase()); break;
      case 'filter':       result = lines.filter(l => l.toLowerCase().includes(lineFilter.toLowerCase())); break;
      case 'exclude':      result = lines.filter(l => !l.toLowerCase().includes(lineExclude.toLowerCase())); break;
      case 'join':         result = [lines.filter(l => l.trim()).join(joinSep)]; break;
      case 'split-chars':  result = input.split('').map(c => c === '\n' ? '[NL]' : c); break;
      default: result = lines;
    }
    setLineOutput(result.join('\n'));
  }, [input, lineFilter, lineExclude, joinSep]);

  // ── Extract ─────────────────────────────────────────────────────────────────

  const extractAll = useCallback(() => {
    const results: Record<string, string[]> = {};
    EXTRACT_PATTERNS.forEach(p => { results[p.label] = [...new Set(input.match(p.regex) || [])]; });
    setExtractResults(results);
  }, [input]);

  const extractOne = useCallback((label: string, regex: RegExp) => {
    const matches = [...new Set(input.match(regex) || [])];
    setExtractResults(prev => ({ ...prev, [label]: matches }));
  }, [input]);

  // ── Transform ──────────────────────────────────────────────────────────────

  const applyTransform = useCallback((op: string) => {
    let result = input;
    switch (op) {
      case 'trim':        result = input.split('\n').map(l => l.trim()).join('\n'); break;
      case 'collapse':    result = input.replace(/[ \t]+/g, ' ').replace(/\n{3,}/g, '\n\n'); break;
      case 'remove-ws':   result = input.replace(/\s+/g, ''); break;
      case 'remove-dupl-ws': result = input.replace(/  +/g, ' '); break;
      case 'replace': {
        if (useRegex) { try { result = input.replace(new RegExp(findStr, 'g'), replaceStr); } catch { result = '⚠ Invalid regex pattern'; } }
        else { result = input.split(findStr).join(replaceStr); }
        break;
      }
      case 'escape-json':  result = JSON.stringify(input); break;
      case 'unescape-json': { try { result = JSON.parse(input); } catch { result = '⚠ Invalid JSON string'; } break; }
      case 'escape-regex': result = input.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); break;
      case 'escape-html':  result = htmlEnc(input); break;
      case 'wrap': {
        const n = parseInt(lineWrap) || 80;
        result = input.split('\n').map(line => {
          const words = line.split(' '); const ls: string[] = []; let cur = '';
          for (const w of words) { if (cur.length + w.length + 1 > n && cur) { ls.push(cur); cur = w; } else { cur = cur ? cur + ' ' + w : w; } }
          if (cur) ls.push(cur); return ls.join('\n');
        }).join('\n');
        break;
      }
      case 'count-chars':  result = `Characters: ${input.length}\nNo spaces: ${input.replace(/\s/g, '').length}`; break;
      case 'reverse-text': result = input.split('').reverse().join(''); break;
      case 'reverse-lines': result = input.split('\n').reverse().join('\n'); break;
    }
    setTransformOutput(result);
  }, [input, findStr, replaceStr, useRegex, lineWrap]);

  // ── Encode ─────────────────────────────────────────────────────────────────

  const applyEncode = useCallback((op: string, label: string) => {
    let result = '';
    try {
      switch (op) {
        case 'b64-enc':    result = btoa(unescape(encodeURIComponent(input))); break;
        case 'b64-dec':    result = decodeURIComponent(escape(atob(input))); break;
        case 'url-enc':    result = encodeURIComponent(input); break;
        case 'url-dec':    result = decodeURIComponent(input); break;
        case 'html-enc':   result = htmlEnc(input); break;
        case 'html-dec':   result = htmlDec(input); break;
        case 'json-str':   result = JSON.stringify(input); break;
        case 'json-parse': result = JSON.parse(input); break;
        case 'rot13':      result = rot13(input); break;
        case 'hex-enc':    result = toHex(input); break;
        case 'hex-dec':    result = fromHex(input); break;
        case 'bin-enc':    result = toBin(input); break;
        case 'bin-dec':    result = fromBin(input); break;
        case 'morse-enc':  result = input.toUpperCase().split('').map(c => ({ 'A':'.-','B':'-...','C':'-.-.','D':'-..','E':'.','F':'..-.','G':'--.','H':'....','I':'..','J':'.---','K':'-.-','L':'.-..','M':'--','N':'-.','O':'---','P':'.--.','Q':'--.-','R':'.-.','S':'...','T':'-','U':'..-','V':'...-','W':'.--','X':'-..-','Y':'-.--','Z':'--..','0':'-----','1':'.----','2':'..---','3':'...--','4':'....-','5':'.....','6':'-....','7':'--...','8':'---..','9':'----.', ' ':'/' }[c] || '?')).join(' '); break;
        default: result = input;
      }
    } catch (e: unknown) { result = `⚠ Error: ${e instanceof Error ? e.message : 'Unknown error'}`; }
    setEncodeOutput(result);
    setEncodeLabel(label);
  }, [input]);

  // ── Tabs ───────────────────────────────────────────────────────────────────

  const tabs: { id: MainTab; label: string; icon: React.ReactNode }[] = [
    { id: 'cases',     label: 'Case Formats',  icon: <Sparkles className="h-3.5 w-3.5" /> },
    { id: 'lines',     label: 'Line Tools',    icon: <FileText className="h-3.5 w-3.5" /> },
    { id: 'extract',   label: 'Extract',       icon: <Search className="h-3.5 w-3.5" /> },
    { id: 'transform', label: 'Transform',     icon: <Wand2 className="h-3.5 w-3.5" /> },
    { id: 'encode',    label: 'Encode/Decode', icon: <Binary className="h-3.5 w-3.5" /> },
  ];

  // ── Render ─────────────────────────────────────────────────────────────────

  const tool = (
    <div className="space-y-5">

      {/* Examples */}
      <div className="space-y-2">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">Try an example</p>
        <div className="flex flex-wrap gap-2">
          {EXAMPLES.map(ex => (
            <button key={ex.label} onClick={() => { setInput(ex.text); setLineOutput(''); setTransformOutput(''); setEncodeOutput(''); setExtractResults({}); }}
              className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-700/50 bg-zinc-800/60 px-3 py-1.5 text-[12px] font-medium text-zinc-300 transition hover:border-emerald-500/30 hover:bg-zinc-700/60 hover:text-white">
              <span>{ex.emoji}</span> {ex.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input area */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold text-zinc-200">Input</label>
          {input && (
            <button onClick={clearAll} className="flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-300 transition">
              <X className="h-3 w-3" /> Clear
            </button>
          )}
        </div>
        <textarea value={input} onChange={e => { setInput(e.target.value); setLineOutput(''); setTransformOutput(''); setEncodeOutput(''); }}
          rows={4} spellCheck={false}
          placeholder="Paste any text, variable name, code snippet, or multi-line list..."
          className="w-full rounded-xl border border-zinc-700/40 bg-zinc-950 px-4 py-3.5 font-mono text-[13px] leading-relaxed text-zinc-200 placeholder-zinc-700 resize-y focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500/40 transition" />

        {/* Stats bar */}
        <div className="flex flex-wrap gap-1.5">
          {[
            { v: stats.chars.toLocaleString(),        l: 'chars' },
            { v: stats.charsNoSpace.toLocaleString(), l: 'no-space' },
            { v: stats.words.toLocaleString(),        l: 'words' },
            { v: stats.lines.toLocaleString(),        l: 'lines' },
            { v: stats.uniqueWords.toLocaleString(),  l: 'unique' },
            { v: `~${stats.readingTime}min`,          l: 'read' },
          ].map(s => (
            <span key={s.l} className="rounded-lg border border-zinc-800 bg-zinc-900 px-2 py-1 text-[11px] text-zinc-500">
              <span className="font-semibold text-zinc-300">{s.v}</span> {s.l}
            </span>
          ))}
          {/* Copy all as JSON */}
          {input.trim() && tab === 'cases' && (
            <CopyBtn text={JSON.stringify(Object.fromEntries(caseResults.map(f => [f.label, f.value])), null, 2)} label="Copy all as JSON" />
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-0.5 rounded-xl border border-zinc-800 bg-zinc-950 p-1 overflow-x-auto">
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-[12px] font-semibold whitespace-nowrap transition ${tab === t.id ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}>
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {/* ── Case Formats ─────────────────────────────────────────────────────── */}
      {tab === 'cases' && (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {caseResults.map(f => (
            <CaseCard key={f.label} label={f.label} desc={f.desc} value={f.value} badge={f.badge} badgeCls={f.badgeCls} />
          ))}
        </div>
      )}

      {/* ── Line Tools ───────────────────────────────────────────────────────── */}
      {tab === 'lines' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
            {[
              { label: '↑ Sort A → Z',    op: 'sort-az',       icon: <ArrowUpDown className="h-3.5 w-3.5" /> },
              { label: '↓ Sort Z → A',    op: 'sort-za',       icon: <ArrowUpDown className="h-3.5 w-3.5 rotate-180" /> },
              { label: 'Sort by length',  op: 'sort-len',      icon: <ArrowUpDown className="h-3.5 w-3.5" /> },
              { label: 'Sort len (rev)',  op: 'sort-len-rev',  icon: <ArrowUpDown className="h-3.5 w-3.5" /> },
              { label: 'Deduplicate',     op: 'dedupe',        icon: <Hash className="h-3.5 w-3.5" /> },
              { label: 'Dedupe (case ∅)', op: 'dedupe-ci',     icon: <Hash className="h-3.5 w-3.5" /> },
              { label: 'Reverse order',   op: 'reverse',       icon: <RotateCcw className="h-3.5 w-3.5" /> },
              { label: 'Shuffle',         op: 'shuffle',       icon: <Shuffle className="h-3.5 w-3.5" /> },
              { label: 'Number lines',    op: 'number',        icon: <Hash className="h-3.5 w-3.5" /> },
              { label: 'Remove empty',    op: 'remove-empty',  icon: <X className="h-3.5 w-3.5" /> },
              { label: 'Trim spaces',     op: 'trim',          icon: <Wand2 className="h-3.5 w-3.5" /> },
              { label: '→ UPPERCASE',     op: 'upper',         icon: <Sparkles className="h-3.5 w-3.5" /> },
              { label: '→ lowercase',     op: 'lower',         icon: <Sparkles className="h-3.5 w-3.5" /> },
            ].map(btn => (
              <button key={btn.op} onClick={() => applyLineOp(btn.op)}
                className="flex items-center gap-1.5 rounded-xl border border-zinc-800 bg-zinc-900/60 px-3 py-2.5 text-[11px] font-semibold text-zinc-300 transition hover:border-emerald-500/30 hover:bg-zinc-800 hover:text-white">
                {btn.icon} {btn.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex gap-2">
              <input value={lineFilter} onChange={e => setLineFilter(e.target.value)} placeholder="Filter: lines containing..." className="flex-1 rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-[12px] text-zinc-200 placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-emerald-500/40" />
              <button onClick={() => applyLineOp('filter')} className="rounded-xl bg-zinc-700 px-3 py-2 text-[12px] font-semibold text-zinc-200 hover:bg-zinc-600 transition whitespace-nowrap">Keep</button>
            </div>
            <div className="flex gap-2">
              <input value={lineExclude} onChange={e => setLineExclude(e.target.value)} placeholder="Remove: lines containing..." className="flex-1 rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-[12px] text-zinc-200 placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-red-500/40" />
              <button onClick={() => applyLineOp('exclude')} className="rounded-xl bg-red-900/60 border border-red-500/20 px-3 py-2 text-[12px] font-semibold text-red-300 hover:bg-red-900 transition whitespace-nowrap">Remove</button>
            </div>
            <div className="flex gap-2">
              <input value={joinSep} onChange={e => setJoinSep(e.target.value)} placeholder="Join separator (default: , )" className="flex-1 rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-[12px] font-mono text-zinc-200 placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-emerald-500/40" />
              <button onClick={() => applyLineOp('join')} className="rounded-xl bg-zinc-700 px-3 py-2 text-[12px] font-semibold text-zinc-200 hover:bg-zinc-600 transition">Join</button>
            </div>
          </div>

          {lineOutput && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-zinc-500">{lineOutput.split('\n').length} lines in result</span>
                <div className="flex gap-2">
                  <button onClick={() => setInput(lineOutput)} className="text-[11px] text-emerald-400 hover:text-emerald-300 transition font-medium">Use as input ↑</button>
                  <CopyBtn text={lineOutput} />
                </div>
              </div>
              <textarea readOnly value={lineOutput} rows={8}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 font-mono text-[12px] leading-relaxed text-zinc-200 resize-y focus:outline-none" />
            </div>
          )}
        </div>
      )}

      {/* ── Extract ──────────────────────────────────────────────────────────── */}
      {tab === 'extract' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-[12px] text-zinc-500">Extract patterns from your input text</p>
            <button onClick={extractAll} className="flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-[12px] font-semibold text-white hover:bg-emerald-500 transition">
              <Search className="h-3.5 w-3.5" /> Extract All
            </button>
          </div>
          <div className="space-y-2">
            {EXTRACT_PATTERNS.map(p => {
              const results = extractResults[p.label];
              return (
                <div key={p.label} className="rounded-xl border border-zinc-800 bg-zinc-900/40 overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-base">{p.emoji}</span>
                      <span className="text-[13px] font-semibold text-zinc-200">{p.label}</span>
                      {results !== undefined && (
                        <span className={`rounded-full border px-2 py-0.5 text-[10px] font-bold ${results.length > 0 ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' : 'text-zinc-600 bg-zinc-800 border-zinc-700/50'}`}>
                          {results.length} found
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      {results && results.length > 0 && <CopyBtn text={results.join('\n')} label="Copy All" />}
                      <button onClick={() => extractOne(p.label, p.regex)} className="rounded-lg border border-zinc-700/50 bg-zinc-800 px-3 py-1.5 text-[12px] font-medium text-zinc-300 hover:bg-zinc-700 transition">Extract</button>
                    </div>
                  </div>
                  {results !== undefined && results.length > 0 && (
                    <div className="border-t border-zinc-800 px-4 py-3 flex flex-wrap gap-2">
                      {results.map((r, i) => (
                        <div key={i} className="flex items-center gap-1.5 rounded-lg border border-zinc-700/40 bg-zinc-900 px-2.5 py-1">
                          <span className="font-mono text-[11px] text-zinc-200">{r}</span>
                          <CopyBtn text={r} icon />
                        </div>
                      ))}
                    </div>
                  )}
                  {results !== undefined && results.length === 0 && (
                    <div className="border-t border-zinc-800 px-4 py-2.5">
                      <p className="text-[11px] text-zinc-600 italic">No matches found.</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Transform ────────────────────────────────────────────────────────── */}
      {tab === 'transform' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {[
              { label: 'Trim whitespace',      op: 'trim' },
              { label: 'Collapse spaces',       op: 'collapse' },
              { label: 'Remove all whitespace', op: 'remove-ws' },
              { label: 'Escape for JSON string',op: 'escape-json' },
              { label: 'Unescape JSON string',  op: 'unescape-json' },
              { label: 'Escape for Regex',      op: 'escape-regex' },
              { label: 'Escape HTML entities',  op: 'escape-html' },
              { label: 'Reverse text',          op: 'reverse-text' },
              { label: 'Reverse lines',         op: 'reverse-lines' },
            ].map(btn => (
              <button key={btn.op} onClick={() => applyTransform(btn.op)}
                className="rounded-xl border border-zinc-800 bg-zinc-900/60 px-3 py-2.5 text-left text-[12px] font-medium text-zinc-300 transition hover:border-emerald-500/30 hover:bg-zinc-800 hover:text-white">
                {btn.label}
              </button>
            ))}
          </div>

          {/* Word wrap */}
          <div className="flex items-center gap-2">
            <span className="text-[12px] text-zinc-400 whitespace-nowrap">Word wrap at</span>
            <input value={lineWrap} onChange={e => setLineWrap(e.target.value)} type="number" min="20" max="200"
              className="w-20 rounded-lg border border-zinc-800 bg-zinc-950 px-2 py-1.5 text-[12px] font-mono text-zinc-200 focus:outline-none focus:ring-1 focus:ring-emerald-500/40" />
            <span className="text-[12px] text-zinc-400">chars</span>
            <button onClick={() => applyTransform('wrap')} className="rounded-lg bg-zinc-700 px-3 py-1.5 text-[12px] font-medium text-zinc-200 hover:bg-zinc-600 transition">Wrap</button>
          </div>

          {/* Find & Replace */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 space-y-3">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">Find & Replace</p>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <input value={findStr} onChange={e => setFindStr(e.target.value)} placeholder="Find..." className="rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-[12px] font-mono text-zinc-200 placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-emerald-500/40" />
              <input value={replaceStr} onChange={e => setReplaceStr(e.target.value)} placeholder="Replace with..." className="rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-[12px] font-mono text-zinc-200 placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-emerald-500/40" />
            </div>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-1.5 text-[12px] text-zinc-400 cursor-pointer">
                <input type="checkbox" checked={useRegex} onChange={e => setUseRegex(e.target.checked)} className="accent-emerald-500 rounded" />
                Use regex
              </label>
              <button onClick={() => applyTransform('replace')} className="rounded-xl bg-emerald-600 px-4 py-1.5 text-[12px] font-semibold text-white hover:bg-emerald-500 transition">
                Replace All
              </button>
            </div>
          </div>

          {transformOutput && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-zinc-500">Result</span>
                <div className="flex gap-2">
                  <button onClick={() => setInput(transformOutput)} className="text-[11px] text-emerald-400 hover:text-emerald-300 transition font-medium">Use as input ↑</button>
                  <CopyBtn text={transformOutput} />
                </div>
              </div>
              <textarea readOnly value={transformOutput} rows={6}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 font-mono text-[12px] leading-relaxed text-zinc-200 resize-y focus:outline-none" />
            </div>
          )}
        </div>
      )}

      {/* ── Encode / Decode ───────────────────────────────────────────────────── */}
      {tab === 'encode' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { label: 'Base64',        encOp: 'b64-enc',    decOp: 'b64-dec',    icon: <Binary className="h-4 w-4" />,  desc: 'Safe binary-to-text encoding' },
              { label: 'URL Encode',    encOp: 'url-enc',    decOp: 'url-dec',    icon: <Link2 className="h-4 w-4" />,   desc: 'encodeURIComponent / decode' },
              { label: 'HTML Entities', encOp: 'html-enc',   decOp: 'html-dec',   icon: <Code2 className="h-4 w-4" />,   desc: '&amp; &lt; &gt; &quot;' },
              { label: 'JSON String',   encOp: 'json-str',   decOp: 'json-parse', icon: <Braces className="h-4 w-4" />,  desc: 'stringify / parse' },
              { label: 'Hex Bytes',     encOp: 'hex-enc',    decOp: 'hex-dec',    icon: <Hash className="h-4 w-4" />,    desc: 'UTF-8 bytes as hex' },
              { label: 'Binary',        encOp: 'bin-enc',    decOp: 'bin-dec',    icon: <Binary className="h-4 w-4" />,  desc: 'UTF-8 bytes as 8-bit binary' },
              { label: 'Morse Code',    encOp: 'morse-enc',  decOp: '',           icon: <Mail className="h-4 w-4" />,    desc: 'Text to Morse' },
            ].map(op => (
              <div key={op.label} className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-3.5 space-y-2.5">
                <div className="flex items-center gap-2">
                  <span className="text-zinc-400">{op.icon}</span>
                  <div>
                    <p className="text-[13px] font-semibold text-zinc-200">{op.label}</p>
                    <p className="text-[10px] text-zinc-600">{op.desc}</p>
                  </div>
                </div>
                <div className="flex gap-1.5">
                  <button onClick={() => applyEncode(op.encOp, `${op.label} → Encoded`)} className="flex-1 rounded-lg bg-zinc-700 py-1.5 text-[12px] font-semibold text-zinc-200 hover:bg-zinc-600 transition">Encode</button>
                  {op.decOp && <button onClick={() => applyEncode(op.decOp, `${op.label} → Decoded`)} className="flex-1 rounded-lg border border-zinc-700/50 py-1.5 text-[12px] font-semibold text-zinc-300 hover:bg-zinc-700 transition">Decode</button>}
                </div>
              </div>
            ))}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-3.5 space-y-2.5">
              <div className="flex items-center gap-2">
                <Shuffle className="h-4 w-4 text-zinc-400" />
                <div><p className="text-[13px] font-semibold text-zinc-200">ROT13</p><p className="text-[10px] text-zinc-600">Symmetric — encode = decode</p></div>
              </div>
              <button onClick={() => applyEncode('rot13', 'ROT13')} className="w-full rounded-lg bg-zinc-700 py-1.5 text-[12px] font-semibold text-zinc-200 hover:bg-zinc-600 transition">ROT13</button>
            </div>
          </div>

          {encodeOutput && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-semibold text-zinc-400">{encodeLabel}</span>
                <div className="flex gap-2">
                  <button onClick={() => setInput(encodeOutput)} className="text-[11px] text-emerald-400 hover:text-emerald-300 transition font-medium">Use as input ↑</button>
                  <CopyBtn text={encodeOutput} />
                </div>
              </div>
              <textarea readOnly value={encodeOutput} rows={5}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 font-mono text-[12px] leading-relaxed text-zinc-200 resize-y focus:outline-none" />
            </div>
          )}
        </div>
      )}
    </div>
  );

  return (
    <ToolPageShell
      title="String Utilities"
      subtitle="12 case formats simultaneously · extract emails/URLs/IPs · Base64, URL & HTML encode · line sort, dedupe, filter"
      icon="✂️"
      tool={tool}
    />
  );
}
