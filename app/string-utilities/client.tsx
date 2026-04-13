'use client';

import { useState, useMemo, useCallback } from 'react';
import {
  Copy, Check, RotateCcw, ArrowUpDown, Hash, Link2,
  Mail, Phone, Shuffle, Binary, Code2, Braces, X,
  ChevronDown, Sparkles, FileText, Search, Wand2,
  Download, Table2, SplitSquareHorizontal,
} from 'lucide-react';
import ToolPageShell from '@/components/tools/ToolPageShell';

// ── Types ────────────────────────────────────────────────────────────────────

type MainTab = 'cases' | 'lines' | 'extract' | 'transform' | 'encode';
type SeparatorType = 'auto' | 'newline' | 'comma' | 'pipe' | 'space' | 'tab' | 'semicolon' | 'colon';

// ── Separator splitting ───────────────────────────────────────────────────────

const SEPARATOR_OPTIONS: { value: SeparatorType; label: string; char: string }[] = [
  { value: 'auto',      label: 'Auto-detect',  char: '?' },
  { value: 'newline',   label: 'New line',      char: '↵' },
  { value: 'comma',     label: 'Comma',         char: ',' },
  { value: 'pipe',      label: 'Pipe',          char: '|' },
  { value: 'space',     label: 'Space',         char: '␣' },
  { value: 'tab',       label: 'Tab',           char: '→' },
  { value: 'semicolon', label: 'Semicolon',     char: ';' },
  { value: 'colon',     label: 'Colon',         char: ':' },
];

function splitBySeparator(input: string, sep: SeparatorType): string[] {
  if (!input.trim()) return [];
  let tokens: string[];
  switch (sep) {
    case 'auto': {
      // Detect priority: newline > pipe > comma > semicolon > space
      if (/\n/.test(input)) tokens = input.split('\n');
      else if (/\|/.test(input)) tokens = input.split('|');
      else if (/,/.test(input)) tokens = input.split(',');
      else if (/;/.test(input)) tokens = input.split(';');
      else tokens = input.split(/\s+/);
      break;
    }
    case 'newline':   tokens = input.split('\n'); break;
    case 'comma':     tokens = input.split(','); break;
    case 'pipe':      tokens = input.split('|'); break;
    case 'space':     tokens = input.split(/\s+/); break;
    case 'tab':       tokens = input.split('\t'); break;
    case 'semicolon': tokens = input.split(';'); break;
    case 'colon':     tokens = input.split(':'); break;
    default:          tokens = input.split('\n');
  }
  return tokens.map(t => t.trim()).filter(Boolean);
}

function detectSeparator(input: string): SeparatorType {
  if (/\n/.test(input)) return 'newline';
  if (/\|/.test(input)) return 'pipe';
  if (/,/.test(input)) return 'comma';
  if (/;/.test(input)) return 'semicolon';
  if (/\t/.test(input)) return 'tab';
  return 'space';
}

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
  { label: 'camelCase',          desc: 'JS variables, JSON keys',         fn: toCamel,    badge: 'JS/TS',   badgeCls: 'text-amber-700 bg-amber-50 border-amber-200' },
  { label: 'PascalCase',         desc: 'Classes, React components',        fn: toPascal,   badge: 'React',   badgeCls: 'text-sky-700 bg-sky-50 border-sky-200' },
  { label: 'snake_case',         desc: 'Python, Ruby, DB columns',         fn: toSnake,    badge: 'Python',  badgeCls: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
  { label: 'kebab-case',         desc: 'CSS classes, URLs, HTML attrs',    fn: toKebab,    badge: 'CSS',     badgeCls: 'text-teal-700 bg-teal-50 border-teal-200' },
  { label: 'SCREAMING_SNAKE',    desc: 'Constants, env variables',         fn: toScream,   badge: 'Const',   badgeCls: 'text-red-700 bg-red-50 border-red-200' },
  { label: 'Title Case',         desc: 'Headings, display names',          fn: toTitle,    badge: 'UI',      badgeCls: 'text-amber-700 bg-yellow-50 border-yellow-200' },
  { label: 'dot.case',           desc: 'Config keys, Java packages',       fn: toDot,      badge: 'Config',  badgeCls: 'text-pink-700 bg-pink-50 border-pink-200' },
  { label: 'path/case',          desc: 'File paths, routes',               fn: toPath,     badge: 'Path',    badgeCls: 'text-orange-700 bg-orange-50 border-orange-200' },
  { label: 'flatcase',           desc: 'Legacy systems, compact IDs',      fn: toFlat,     badge: 'Legacy',  badgeCls: 'text-indigo-700 bg-indigo-50 border-indigo-200' },
  { label: 'COBOL-CASE',         desc: 'COBOL, HTTP headers',              fn: toCobol,    badge: 'COBOL',   badgeCls: 'text-violet-700 bg-violet-50 border-violet-200' },
  { label: 'Sentence case',      desc: 'Sentences, descriptions',          fn: toSentence, badge: 'Text',    badgeCls: 'text-lime-700 bg-lime-50 border-lime-200' },
  { label: 'iNVERSE cASE',       desc: 'Emphasis / stylistic',             fn: toInverse,  badge: 'Style',   badgeCls: 'text-rose-700 bg-rose-50 border-rose-200' },
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

const EXAMPLES: { label: string; emoji: string; text: string; bulk?: boolean }[] = [
  { label: 'Variable name',      emoji: '📦', text: 'getUserProfileData' },
  { label: 'DB column',          emoji: '🗄️', text: 'created_at_timestamp' },
  { label: 'Config key',         emoji: '⚙️', text: 'max.retry.attempts' },
  { label: 'CSS class name',     emoji: '🎨', text: 'btn--primary-large__icon-left' },
  { label: 'Bulk — comma',       emoji: '📋', text: 'userId,firstName,lastName,emailAddress,phoneNumber', bulk: true },
  { label: 'Bulk — pipe',        emoji: '🔀', text: 'user_id|created_at|updated_at|deleted_at|is_active', bulk: true },
  { label: 'Bulk — newline',     emoji: '📄', text: 'getProductById\ncreateNewOrder\nupdateUserProfile\ndeleteExpiredSessions', bulk: true },
  { label: 'Bulk — space',       emoji: '🔠', text: 'firstName lastName emailAddress phoneNumber dateOfBirth', bulk: true },
  { label: 'Mixed sentence',     emoji: '📝', text: 'The Quick-Brown FOX jumps_over the lazy dog' },
  { label: 'API endpoint',       emoji: '🌐', text: 'GET /api/v2/user-profile/{userId}' },
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
    <button onClick={copy} className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition" title="Copy">
      {ok ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
    </button>
  );
  return (
    <button onClick={copy} className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-[12px] font-medium text-gray-600 transition hover:bg-gray-50 hover:border-gray-300 shadow-sm">
      {ok ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
      {ok ? 'Copied!' : (label ?? 'Copy')}
    </button>
  );
}

// ── Case card ─────────────────────────────────────────────────────────────────

function CaseCard({ label, desc, value, badge, badgeCls }: { label: string; desc: string; value: string; badge: string; badgeCls: string }) {
  return (
    <div className="group flex flex-col gap-2.5 rounded-xl border border-gray-200 bg-white p-4 hover:border-emerald-300 hover:shadow-md transition shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-gray-900 tracking-tight">{label}</span>
            <span className={`rounded-full border px-1.5 py-px text-[9px] font-bold uppercase tracking-wide ${badgeCls}`}>{badge}</span>
          </div>
          <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
        </div>
        <CopyBtn text={value} icon />
      </div>
      <div className="font-mono text-sm text-gray-900 font-semibold bg-gray-50 rounded-lg px-3 py-2 break-all leading-relaxed min-h-[2rem]">
        {value || <span className="text-gray-300 italic text-xs font-normal">—</span>}
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function StringUtilitiesClient() {
  const [input, setInput] = useState('getUserProfileData');
  const [tab, setTab] = useState<MainTab>('cases');
  const [separator, setSeparator] = useState<SeparatorType>('auto');

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

  // ── Bulk mode ────────────────────────────────────────────────────────────────
  const bulkTokens = useMemo(() => splitBySeparator(input, separator), [input, separator]);
  const isBulk = bulkTokens.length > 1;
  const detectedSep = useMemo(() => detectSeparator(input), [input]);

  const bulkResults = useMemo(() => {
    if (!isBulk) return [];
    return bulkTokens.map(token => ({
      original: token,
      cases: CASE_FORMATS.map(f => ({ label: f.label, badge: f.badge, value: f.fn(token) })),
    }));
  }, [bulkTokens, isBulk]);

  const downloadCSV = useCallback(() => {
    const headers = ['Original', ...CASE_FORMATS.map(f => f.label)];
    const rows = bulkResults.map(r => [r.original, ...r.cases.map(c => c.value)]);
    const csv = [headers, ...rows]
      .map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
      .join('\n');
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'string-cases-bulk.csv'; a.click();
    URL.revokeObjectURL(url);
  }, [bulkResults]);

  const copyBulkCSV = useCallback(() => {
    const headers = ['Original', ...CASE_FORMATS.map(f => f.label)];
    const rows = bulkResults.map(r => [r.original, ...r.cases.map(c => c.value)]);
    const csv = [headers, ...rows].map(row => row.join('\t')).join('\n');
    navigator.clipboard.writeText(csv);
  }, [bulkResults]);

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
        <div className="flex items-center gap-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Try an example</p>
          <span className="text-[10px] text-gray-400 bg-gray-100 rounded-full px-2 py-0.5">Examples marked 📋🔀📄🔠 activate Bulk Mode</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {EXAMPLES.map(ex => (
            <button key={ex.label} onClick={() => { setInput(ex.text); setLineOutput(''); setTransformOutput(''); setEncodeOutput(''); setExtractResults({}); }}
              className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium shadow-sm transition ${
                ex.bulk
                  ? 'border-emerald-200 bg-emerald-50 text-emerald-700 hover:border-emerald-400 hover:bg-emerald-100'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700'
              }`}>
              <span>{ex.emoji}</span> {ex.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input area */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold text-gray-700">Input</label>
          {input && (
            <button onClick={clearAll} className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-700 transition">
              <X className="h-3 w-3" /> Clear
            </button>
          )}
        </div>
        <textarea value={input} onChange={e => { setInput(e.target.value); setLineOutput(''); setTransformOutput(''); setEncodeOutput(''); }}
          rows={4} spellCheck={false}
          placeholder="Paste one token — or multiple separated by comma, pipe (|), newline, space, semicolon for Bulk Mode..."
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 font-mono text-sm leading-relaxed text-gray-900 placeholder-gray-300 resize-y focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 shadow-sm min-h-[100px]" />

        {/* Stats bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <div className="flex gap-1.5 flex-nowrap">
            {[
              { v: stats.chars.toLocaleString(),        l: 'chars' },
              { v: stats.words.toLocaleString(),        l: 'words' },
              { v: stats.lines.toLocaleString(),        l: 'lines' },
              { v: stats.uniqueWords.toLocaleString(),  l: 'unique words' },
              { v: `~${stats.readingTime}min`,          l: 'read time' },
            ].map(s => (
              <span key={s.l} className="flex items-baseline gap-1 rounded-lg border border-gray-100 bg-gray-50 px-3 py-1.5 whitespace-nowrap">
                <span className="text-sm font-bold text-gray-900">{s.v}</span>
                <span className="text-xs text-gray-500">{s.l}</span>
              </span>
            ))}
          </div>
          {/* Copy all as JSON */}
          {input.trim() && tab === 'cases' && (
            <CopyBtn text={JSON.stringify(Object.fromEntries(caseResults.map(f => [f.label, f.value])), null, 2)} label="Copy stats as JSON" />
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-gray-100 rounded-xl p-1 flex gap-1 overflow-x-auto">
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-semibold whitespace-nowrap transition ${tab === t.id ? 'bg-white border border-gray-200 text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700 hover:bg-white/60'}`}>
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {/* ── Case Formats ─────────────────────────────────────────────────────── */}
      {tab === 'cases' && (
        <div className="space-y-4">

          {/* Separator selector — always visible */}
          <div className="flex flex-wrap items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wider shrink-0">
              <SplitSquareHorizontal className="h-3.5 w-3.5" />
              Separator
            </div>
            <div className="flex flex-wrap gap-1.5">
              {SEPARATOR_OPTIONS.map(s => (
                <button key={s.value} onClick={() => setSeparator(s.value)}
                  className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-semibold transition ${
                    separator === s.value
                      ? 'border-emerald-300 bg-emerald-50 text-emerald-700'
                      : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                  }`}>
                  <span className="font-mono text-[10px] bg-gray-100 rounded px-1">{s.char}</span>
                  {s.label}
                  {s.value === 'auto' && input.trim() && (
                    <span className="text-[9px] text-gray-400 font-normal">→ {detectedSep}</span>
                  )}
                </button>
              ))}
            </div>
            {isBulk && (
              <span className="ml-auto flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-2.5 py-1 shrink-0">
                <Table2 className="h-3 w-3" />
                {bulkTokens.length} tokens detected — Bulk Mode
              </span>
            )}
          </div>

          {/* BULK MODE — table view */}
          {isBulk ? (
            <div className="space-y-3">
              {/* Actions bar */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm text-gray-600">
                  <span className="font-semibold text-gray-900">{bulkTokens.length} tokens</span> — each converted to all 12 case formats
                </p>
                <div className="flex gap-2">
                  <button onClick={copyBulkCSV}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:border-gray-300 hover:bg-gray-50 shadow-sm transition">
                    <Copy className="h-3.5 w-3.5" /> Copy as TSV
                  </button>
                  <button onClick={downloadCSV}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 px-4 py-1.5 text-sm font-semibold text-white shadow-sm transition">
                    <Download className="h-3.5 w-3.5" /> Download CSV
                  </button>
                </div>
              </div>

              {/* Scrollable table */}
              <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="sticky left-0 z-10 bg-gray-50 px-4 py-3 font-semibold text-gray-700 border-r border-gray-200 whitespace-nowrap min-w-[140px]">
                        Original
                      </th>
                      {CASE_FORMATS.map(f => (
                        <th key={f.label} className="px-3 py-3 font-semibold text-gray-700 whitespace-nowrap border-r border-gray-100 last:border-r-0">
                          <div className="flex items-center gap-1.5">
                            <span>{f.label}</span>
                            <span className={`rounded-full border px-1 py-px text-[8px] font-bold uppercase tracking-wide ${f.badgeCls}`}>{f.badge}</span>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {bulkResults.map((row, ri) => (
                      <tr key={ri} className={`group hover:bg-emerald-50/40 transition ${ri % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                        <td className="sticky left-0 z-10 bg-inherit px-4 py-2.5 border-r border-gray-200">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-gray-900 break-all">{row.original}</span>
                          </div>
                        </td>
                        {row.cases.map((c, ci) => (
                          <td key={ci} className="px-3 py-2.5 border-r border-gray-100 last:border-r-0">
                            <div className="flex items-center gap-1.5 min-w-[120px]">
                              <span className="font-mono text-xs text-gray-800 break-all">{c.value}</span>
                              <CopyBtn text={c.value} icon />
                            </div>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mini cards still shown below for quick access */}
              <p className="text-xs text-gray-400 pt-1">Scroll right to see all formats · Click any copy icon to copy individual values</p>
            </div>
          ) : (
            /* SINGLE MODE — card grid */
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {caseResults.map(f => (
                <CaseCard key={f.label} label={f.label} desc={f.desc} value={f.value} badge={f.badge} badgeCls={f.badgeCls} />
              ))}
            </div>
          )}
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
                className="bg-white border border-gray-200 text-gray-700 text-sm hover:border-emerald-300 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg px-3 py-2 flex items-center gap-1.5 font-medium transition">
                {btn.icon} {btn.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex gap-2">
              <input value={lineFilter} onChange={e => setLineFilter(e.target.value)} placeholder="Filter: lines containing..." className="flex-1 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400" />
              <button onClick={() => applyLineOp('filter')} className="rounded-lg bg-emerald-600 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-700 transition whitespace-nowrap">Keep</button>
            </div>
            <div className="flex gap-2">
              <input value={lineExclude} onChange={e => setLineExclude(e.target.value)} placeholder="Remove: lines containing..." className="flex-1 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-300" />
              <button onClick={() => applyLineOp('exclude')} className="rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-sm font-semibold text-red-700 hover:bg-red-100 transition whitespace-nowrap">Remove</button>
            </div>
            <div className="flex gap-2">
              <input value={joinSep} onChange={e => setJoinSep(e.target.value)} placeholder="Join separator (default: , )" className="flex-1 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-mono text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400" />
              <button onClick={() => applyLineOp('join')} className="rounded-lg bg-white border border-gray-200 px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition">Join</button>
            </div>
          </div>

          {lineOutput && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-600">{lineOutput.split('\n').length} lines in result</span>
                <div className="flex gap-2">
                  <button onClick={() => setInput(lineOutput)} className="text-xs text-emerald-700 hover:text-emerald-800 bg-white border border-emerald-200 hover:bg-emerald-50 transition font-semibold rounded-lg px-2.5 py-1">Use as Input ↑</button>
                  <CopyBtn text={lineOutput} />
                </div>
              </div>
              <textarea readOnly value={lineOutput} rows={8}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 font-mono text-sm leading-relaxed text-gray-900 resize-y focus:outline-none" />
            </div>
          )}
        </div>
      )}

      {/* ── Extract ──────────────────────────────────────────────────────────── */}
      {tab === 'extract' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">Extract patterns from your input text</p>
            <button onClick={extractAll} className="flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 px-4 py-2 text-sm font-semibold text-white transition">
              <Search className="h-3.5 w-3.5" /> Extract All
            </button>
          </div>
          <div className="space-y-2">
            {EXTRACT_PATTERNS.map(p => {
              const results = extractResults[p.label];
              return (
                <div key={p.label} className="rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm">
                  <div className="flex items-center justify-between px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-base">{p.emoji}</span>
                      <span className="text-sm font-semibold text-gray-900">{p.label}</span>
                      {results !== undefined && (
                        <span className={`rounded-full border px-2 py-0.5 text-[10px] font-bold ${results.length > 0 ? 'text-emerald-700 bg-emerald-50 border-emerald-200' : 'text-gray-500 bg-gray-100 border-gray-200'}`}>
                          {results.length} found
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      {results && results.length > 0 && <CopyBtn text={results.join('\n')} label="Copy All" />}
                      <button onClick={() => extractOne(p.label, p.regex)} className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 hover:border-emerald-300 hover:bg-emerald-50 font-medium transition">Extract</button>
                    </div>
                  </div>
                  {results !== undefined && results.length > 0 && (
                    <div className="border-t border-gray-100 bg-gray-50 px-4 py-3 flex flex-wrap gap-2">
                      {results.map((r, i) => (
                        <div key={i} className="flex items-center gap-1.5 bg-white rounded-lg border border-gray-200 p-2">
                          <span className="font-mono text-sm text-gray-900">{r}</span>
                          <CopyBtn text={r} icon />
                        </div>
                      ))}
                    </div>
                  )}
                  {results !== undefined && results.length === 0 && (
                    <div className="border-t border-gray-100 bg-gray-50 px-4 py-2.5">
                      <p className="text-xs text-gray-400 italic">No matches found.</p>
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
                className="bg-white border border-gray-200 text-gray-700 text-sm hover:border-emerald-300 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg px-3 py-2.5 text-left font-medium transition">
                {btn.label}
              </button>
            ))}
          </div>

          {/* Word wrap */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 whitespace-nowrap">Word wrap at</span>
            <input value={lineWrap} onChange={e => setLineWrap(e.target.value)} type="number" min="20" max="200"
              className="w-20 rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-sm font-mono text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400" />
            <span className="text-sm text-gray-600">chars</span>
            <button onClick={() => applyTransform('wrap')} className="rounded-lg bg-white border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition">Wrap</button>
          </div>

          {/* Find & Replace */}
          <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Find &amp; Replace</p>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <input value={findStr} onChange={e => setFindStr(e.target.value)} placeholder="Find..." className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-mono text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400" />
              <input value={replaceStr} onChange={e => setReplaceStr(e.target.value)} placeholder="Replace with..." className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-mono text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400" />
            </div>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-1.5 text-sm text-gray-600 cursor-pointer">
                <input type="checkbox" checked={useRegex} onChange={e => setUseRegex(e.target.checked)} className="accent-emerald-500 rounded" />
                Use regex
              </label>
              <button onClick={() => applyTransform('replace')} className="rounded-xl bg-emerald-600 hover:bg-emerald-700 px-4 py-1.5 text-sm font-semibold text-white transition">
                Replace All
              </button>
            </div>
          </div>

          {transformOutput && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-600">Result</span>
                <div className="flex gap-2">
                  <button onClick={() => setInput(transformOutput)} className="text-xs text-emerald-700 hover:text-emerald-800 bg-white border border-emerald-200 hover:bg-emerald-50 transition font-semibold rounded-lg px-2.5 py-1">Use as Input ↑</button>
                  <CopyBtn text={transformOutput} />
                </div>
              </div>
              <textarea readOnly value={transformOutput} rows={6}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 font-mono text-sm leading-relaxed text-gray-900 resize-y focus:outline-none" />
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
              <div key={op.label} className="rounded-xl border border-gray-200 bg-white p-3.5 space-y-2.5 shadow-sm">
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">{op.icon}</span>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{op.label}</p>
                    <p className="text-xs text-gray-500">{op.desc}</p>
                  </div>
                </div>
                <div className="flex gap-1.5">
                  <button onClick={() => applyEncode(op.encOp, `${op.label} → Encoded`)} className="flex-1 rounded-lg bg-white border border-gray-200 py-1.5 text-sm font-semibold text-gray-700 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700 transition">Encode</button>
                  {op.decOp && <button onClick={() => applyEncode(op.decOp, `${op.label} → Decoded`)} className="flex-1 rounded-lg border border-gray-200 bg-white py-1.5 text-sm font-semibold text-gray-700 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700 transition">Decode</button>}
                </div>
              </div>
            ))}
            <div className="rounded-xl border border-gray-200 bg-white p-3.5 space-y-2.5 shadow-sm">
              <div className="flex items-center gap-2">
                <Shuffle className="h-4 w-4 text-gray-500" />
                <div><p className="text-sm font-semibold text-gray-900">ROT13</p><p className="text-xs text-gray-500">Symmetric — encode = decode</p></div>
              </div>
              <button onClick={() => applyEncode('rot13', 'ROT13')} className="w-full rounded-lg bg-white border border-gray-200 py-1.5 text-sm font-semibold text-gray-700 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700 transition">ROT13</button>
            </div>
          </div>

          {encodeOutput && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-700">{encodeLabel}</span>
                <div className="flex gap-2">
                  <button onClick={() => setInput(encodeOutput)} className="text-xs text-emerald-700 hover:text-emerald-800 bg-white border border-emerald-200 hover:bg-emerald-50 transition font-semibold rounded-lg px-2.5 py-1">Use as Input ↑</button>
                  <CopyBtn text={encodeOutput} />
                </div>
              </div>
              <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                <p className="font-mono text-sm text-gray-900 break-all leading-relaxed whitespace-pre-wrap">{encodeOutput}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );

  return (
    <ToolPageShell
      title="String Utilities"
      subtitle="Case conversion, line tools, text extraction, encode/decode — all in one place"
      icon="✏️"
      tool={tool}
    />
  );
}
