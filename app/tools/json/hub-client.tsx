'use client';

import { useMemo, useState, useRef, useEffect } from 'react';
import type { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import {
  AlertCircle, AlignLeft, ArrowLeft, ArrowRight, ArrowRightLeft,
  ArrowUpRight, BarChart3, Binary, Braces, CheckCircle, ChevronRight,
  Clock, Code, Code2, Database, Download, FileCode, FileCode2, FileJson,
  FileSearch, FileText, Fingerprint, Flame, Gauge, GitCompare, Globe, Grid3x3,
  Hash, Key, KeyRound, Layers, Link2, Lock, Package, Regex, Scissors,
  ScrollText, Search, Settings2, Shield, ShieldCheck, Sparkles,
  SplitSquareHorizontal, Star, Table, Terminal, TestTube2, Webhook,
  Wrench, X, Zap,
} from 'lucide-react';
import type { ToolCategory } from './tools-data';
import { CATEGORY_LABELS, TOOLS_DIRECTORY, TOOL_COUNT } from './tools-data';
import MaskingHeroAnimation from './MaskingHeroAnimation';

/* ─── icon registry ─────────────────────────────────────────────────────── */
const TOOL_ICON_MAP: Record<string, LucideIcon> = {
  FileJson, Code, CheckCircle, Wrench, Table, Layers, GitCompare, Braces,
  ScrollText, FileSearch, Package, BarChart3, Database, ArrowRightLeft,
  Settings2, Shield, Lock, FileCode2, Scissors, Terminal, FileCode, Code2,
  Download, AlertCircle, Webhook, TestTube2, Globe, KeyRound, Binary,
  Fingerprint, Hash, Link2, Key, ShieldCheck, SplitSquareHorizontal,
  AlignLeft, Regex, Grid3x3, Gauge, Clock, FileText,
};

const CATEGORIES: (ToolCategory | 'all')[] = ['all', 'json', 'ai', 'api', 'encode', 'dev'];

/* ─── per-category color tokens ─────────────────────────────────────────── */
const CAT_COLOR: Record<ToolCategory, {
  iconBg: string; iconText: string;
  topBar: string;
  tabActiveBg: string; tabActiveBorder: string; tabActiveText: string;
  hoverBorder: string; hoverShadow: string;
  dot: string; badge: string;
  featureText: string; featureIcon: string;
}> = {
  json: {
    iconBg: 'bg-emerald-50', iconText: 'text-emerald-700',
    topBar: 'from-emerald-400 to-teal-400',
    tabActiveBg: 'bg-emerald-600', tabActiveBorder: 'border-emerald-600', tabActiveText: 'text-white',
    hoverBorder: 'hover:border-emerald-300', hoverShadow: 'hover:shadow-[0_6px_20px_rgba(16,185,129,0.12)]',
    dot: 'bg-emerald-500', badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    featureText: 'text-emerald-700', featureIcon: 'text-emerald-400',
  },
  ai: {
    iconBg: 'bg-violet-50', iconText: 'text-violet-700',
    topBar: 'from-violet-400 to-fuchsia-400',
    tabActiveBg: 'bg-violet-600', tabActiveBorder: 'border-violet-600', tabActiveText: 'text-white',
    hoverBorder: 'hover:border-violet-300', hoverShadow: 'hover:shadow-[0_6px_20px_rgba(139,92,246,0.12)]',
    dot: 'bg-violet-500', badge: 'bg-violet-50 text-violet-700 border-violet-200',
    featureText: 'text-violet-700', featureIcon: 'text-violet-400',
  },
  api: {
    iconBg: 'bg-sky-50', iconText: 'text-sky-700',
    topBar: 'from-sky-400 to-cyan-400',
    tabActiveBg: 'bg-sky-600', tabActiveBorder: 'border-sky-600', tabActiveText: 'text-white',
    hoverBorder: 'hover:border-sky-300', hoverShadow: 'hover:shadow-[0_6px_20px_rgba(14,165,233,0.12)]',
    dot: 'bg-sky-500', badge: 'bg-sky-50 text-sky-700 border-sky-200',
    featureText: 'text-sky-700', featureIcon: 'text-sky-400',
  },
  encode: {
    iconBg: 'bg-amber-50', iconText: 'text-amber-700',
    topBar: 'from-amber-400 to-orange-400',
    tabActiveBg: 'bg-amber-500', tabActiveBorder: 'border-amber-500', tabActiveText: 'text-white',
    hoverBorder: 'hover:border-amber-300', hoverShadow: 'hover:shadow-[0_6px_20px_rgba(245,158,11,0.12)]',
    dot: 'bg-amber-500', badge: 'bg-amber-50 text-amber-700 border-amber-200',
    featureText: 'text-amber-700', featureIcon: 'text-amber-400',
  },
  dev: {
    iconBg: 'bg-zinc-100', iconText: 'text-zinc-600',
    topBar: 'from-zinc-400 to-slate-500',
    tabActiveBg: 'bg-zinc-800', tabActiveBorder: 'border-zinc-800', tabActiveText: 'text-white',
    hoverBorder: 'hover:border-zinc-300', hoverShadow: 'hover:shadow-[0_6px_20px_rgba(0,0,0,0.08)]',
    dot: 'bg-zinc-400', badge: 'bg-zinc-50 text-zinc-600 border-zinc-200',
    featureText: 'text-zinc-600', featureIcon: 'text-zinc-400',
  },
};

/* ─── category tab icons ─────────────────────────────────────────────────── */
const CAT_ICON: Record<ToolCategory | 'all', LucideIcon> = {
  all: Grid3x3,
  json: FileJson,
  ai: Sparkles,
  api: Globe,
  encode: Key,
  dev: Code,
};

const CAT_COUNTS = CATEGORIES.reduce<Record<string, number>>((acc, c) => {
  acc[c] = c === 'all' ? TOOL_COUNT : TOOLS_DIRECTORY.filter((t) => t.category === c).length;
  return acc;
}, {});

/* ─── per-tool feature hints (shown as checkmark bullets) ───────────────── */
const TOOL_FEATURES: Record<string, string[]> = {
  '/':                              ['Tree view + formatter', 'Export XLSX / CSV', 'JSON → Table instantly'],
  '/json-beautifier':               ['One-click format', 'Minify & validate', 'Copy to clipboard'],
  '/json-validator':                ['Syntax error details', 'Schema validation', 'Real-time feedback'],
  '/json-fixer-online':             ['Trailing commas fix', 'AI-broken JSON repair', 'Auto-recovery'],
  '/json-to-excel':                 ['Nested JSON → XLSX', 'CSV / Table export', '100% in-browser'],
  '/json-comparator':               ['Semantic diff', 'UUID normalizing', 'Side-by-side view'],
  '/log-unpacker':                  ['Unescape nested JSON', 'Decode JWTs in logs', 'Scrub file paths'],
  '/json-schema-generation':        ['Generate from sample', 'Validate structure', 'Copy schema'],
  '/json-stringify-online':         ['Pretty-print options', 'Escape strings', 'Copy-paste ready'],
  '/log-explorer':                  ['Browse structured logs', 'Filter & search', 'Navigate easily'],
  '/payload-analyzer':              ['Inspect API payloads', 'No server upload', 'Deep structure view'],
  '/data-insights':                 ['Stats from JSON', 'Pattern detection', 'Instant analysis'],
  '/sql-in-generator':              ['Paste IDs → SQL IN', 'JSON / MongoDB $in', 'CSV output'],
  '/api-comparator':                ['Diff two responses', 'Side-by-side JSON', 'Highlight changes'],
  '/config-comparator':             ['YAML / JSON configs', 'Env-file support', 'Diff view'],
  '/ai-schema-masker':              ['Reversible SQL mask', 'Table & column names', 'ChatGPT-safe'],
  '/json-prompt-shield':            ['Mask keys & values', 'Any LLM supported', 'Reversible tokens'],
  '/code-prompt-shield':            ['Redact secrets', 'Identifiers in code', 'Copilot-safe'],
  '/prompt-chunker':                ['Split for token limits', 'Keep context clean', 'Copy chunks'],
  '/curl-converter':                ['JS / Python / fetch', 'Multi-language output', 'Copy-paste ready'],
  '/curl-to-python':                ['Python requests', 'Full headers & body', 'Instant convert'],
  '/curl-to-python-requests':       ['requests.get / .post', 'Raw cURL → Python', 'Copy-paste ready'],
  '/har-to-curl':                   ['Browser HAR export', 'Extract cURL', 'Replay requests'],
  '/curl-failure-root-cause-engine':['TLS / DNS / proxy', 'HTTP error diagnosis', 'Root-cause hints'],
  '/mock-api-generator':            ['Mock JSON APIs', 'Front-end dev', 'Instant fixtures'],
  '/test-data-generator':           ['Fake users & emails', 'UUIDs & numbers', 'Structured fixtures'],
  '/cors-tester':                   ['Preflight simulation', 'Real CORS headers', 'Policy check'],
  '/jwt-decoder':                   ['Decode & verify', 'Audit JWT claims', 'No server upload'],
  '/base64-encoder':                ['Base64 / Base64URL', 'MIME / image detect', 'Auto-detect JWT'],
  '/uuid-generator':                ['v1 – v8 UUIDs', 'Bulk generate', 'Export JSON / SQL'],
  '/hash-generator':                ['MD5 / SHA-256 / SHA3', 'HMAC / bcrypt', 'File checksum'],
  '/url-encoder':                   ['Encode query strings', 'Path segment safe', 'Decode instantly'],
  '/password-generator':            ['Entropy score', 'Passphrase mode', 'Crack-time estimate'],
  '/password-audit':                ['Strength checks', 'Breach-aware hints', 'Runs locally'],
  '/token-comparator':              ['Visual JWT diff', 'API token compare', 'Long string diff'],
  '/sql-formatter':                 ['Pretty-print SQL', 'Minify support', 'Copy formatted'],
  '/regex-tester':                  ['Live match highlights', 'Flags support', 'Replace preview'],
  '/truth-table-generator':         ['Boolean logic tables', 'Expression input', 'Export / copy'],
  '/speed-test':                    ['Network latency', 'Throughput check', 'Browser-based'],
  '/timezone-translator':           ['Convert timestamps', 'Debug across zones', 'Deploy-friendly'],
};

const STATS = [
  { value: `${TOOL_COUNT}+`, label: 'Free tools',    icon: Zap },
  { value: '100%',           label: 'Browser-side',  icon: Shield },
  { value: 'Zero',           label: 'Data stored',   icon: Lock },
  { value: 'Free',           label: 'Forever',       icon: Star },
];

function ToolIcon({ name, className }: { name: string; className?: string }) {
  const Icon = TOOL_ICON_MAP[name] ?? Wrench;
  return <Icon className={className} aria-hidden />;
}

/* ═══════════════════════════════════════════════════════════════════════════
   Main component
   ═══════════════════════════════════════════════════════════════════════════ */
export default function ToolsJsonHubClient() {
  const [cat, setCat] = useState<ToolCategory | 'all'>('all');
  const [query, setQuery] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);

  /* ⌘K / Ctrl+K → focus search */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const filtered = useMemo(() => {
    if (query.trim()) {
      const q = query.toLowerCase();
      return TOOLS_DIRECTORY.filter(
        (t) => t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q),
      );
    }
    return cat === 'all'
      ? TOOLS_DIRECTORY.filter((t) => t.category !== 'ai')
      : TOOLS_DIRECTORY.filter((t) => t.category === cat);
  }, [cat, query]);

  const aiTools = useMemo(() => TOOLS_DIRECTORY.filter((t) => t.category === 'ai'), []);
  const popularTools = useMemo(() => TOOLS_DIRECTORY.filter((t) => t.badge === 'popular').slice(0, 6), []);
  const isSearching = query.trim().length > 0;

  return (
    <div className="min-h-screen bg-zinc-50">

      {/* ══ HERO ══════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-zinc-950 pb-14 pt-10 sm:pb-16 sm:pt-12">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute -left-32 -top-20 h-[500px] w-[500px] rounded-full bg-emerald-600/20 blur-[120px]" />
          <div className="absolute -bottom-10 right-0 h-[400px] w-[500px] rounded-full bg-violet-600/15 blur-[100px]" />
        </div>

        <div className="relative mx-auto max-w-[1200px] px-5 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_min(420px,42%)]">

            {/* ── Left: copy ── */}
            <div>
              <div className="mb-5 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald-300">
                  <Zap className="h-3 w-3 text-amber-400" />
                  Free · No signup
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[11px] text-zinc-400">
                  <Sparkles className="h-3 w-3 text-violet-400" />
                  {TOOL_COUNT} tools · everything runs in your browser
                </span>
              </div>

              <h1 className="text-[2rem] font-bold leading-[1.13] tracking-tight text-white sm:text-[2.6rem] lg:text-[2.8rem]">
                Every dev tool you{' '}
                <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  paste&nbsp;into&nbsp;Slack
                </span>
                {' '}— in one tab
              </h1>
              <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-zinc-400 sm:text-base">
                Format JSON, diff APIs, decode JWTs, generate UUIDs, hash passwords, and mask
                sensitive data before ChatGPT. No account. Nothing leaves your browser.
              </p>

              {/* search bar */}
              <div className="mt-7 flex w-full max-w-lg items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 ring-1 ring-transparent transition-all focus-within:border-emerald-500/40 focus-within:bg-white/[0.08] focus-within:ring-emerald-500/20">
                <Search className="h-[18px] w-[18px] shrink-0 text-zinc-400" aria-hidden />
                <input
                  ref={searchRef}
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={`Search ${TOOL_COUNT} tools…`}
                  className="flex-1 bg-transparent text-[15px] text-white placeholder:text-zinc-500 focus:outline-none"
                  aria-label="Search all tools"
                />
                {query ? (
                  <button
                    type="button"
                    onClick={() => setQuery('')}
                    className="rounded p-0.5 text-zinc-500 hover:text-zinc-300"
                    aria-label="Clear search"
                  >
                    <X className="h-4 w-4" />
                  </button>
                ) : (
                  <kbd className="hidden items-center rounded border border-white/10 bg-white/5 px-1.5 py-1 font-mono text-[10px] text-zinc-500 sm:flex">
                    ⌘K
                  </kbd>
                )}
              </div>

              {/* stats row */}
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                {STATS.map(({ value, label, icon: Icon }) => (
                  <div key={label} className="flex items-center gap-2">
                    <Icon className="h-4 w-4 text-zinc-600" aria-hidden />
                    <span className="text-lg font-bold text-white">{value}</span>
                    <span className="text-[12px] text-zinc-500">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Right: masking animation ── */}
            <div className="hidden lg:block lg:h-[360px]">
              <MaskingHeroAnimation />
            </div>
          </div>
        </div>
      </section>

      {/* ══ POPULAR QUICK-ACCESS STRIP ════════════════════════════════════════ */}
      {!isSearching && (
        <section className="border-b border-zinc-200 bg-white">
          <div className="mx-auto max-w-[1200px] px-5 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 overflow-x-auto py-3.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <span className="flex shrink-0 items-center gap-1.5 border-r border-zinc-200 pr-4 font-mono text-[10px] uppercase tracking-[0.12em] text-zinc-400">
                <Flame className="h-3.5 w-3.5 text-amber-500" />
                Popular
              </span>
              {popularTools.map((t) => {
                const col = CAT_COLOR[t.category];
                return (
                  <Link
                    key={t.href}
                    href={t.href}
                    className={`group flex shrink-0 items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-3.5 py-2 text-[13px] font-semibold text-zinc-700 transition-all hover:bg-white hover:text-zinc-900 hover:shadow-sm ${col.hoverBorder}`}
                  >
                    <span className={`flex h-5 w-5 items-center justify-center rounded-md ${col.iconBg} ${col.iconText}`}>
                      <ToolIcon name={t.icon} className="h-3 w-3" />
                    </span>
                    {t.name}
                    <ArrowUpRight className="h-3 w-3 -translate-y-0.5 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-60" />
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <div className="mx-auto max-w-[1200px] px-5 py-10 sm:px-6 sm:py-12 lg:px-8">

        {/* ══ AI SAFETY SPOTLIGHT ═══════════════════════════════════════════════ */}
        {!isSearching && cat === 'all' && (
          <section className="mb-14" aria-labelledby="ai-strip-heading">
            {/* section header */}
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-violet-100">
                    <Sparkles className="h-3.5 w-3.5 text-violet-700" />
                  </span>
                  <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.13em] text-violet-600">
                    AI Safety
                  </p>
                </div>
                <h2
                  id="ai-strip-heading"
                  className="text-xl font-bold tracking-tight text-zinc-900 sm:text-2xl"
                >
                  Mask before you prompt
                </h2>
                <p className="mt-1.5 text-[14px] text-zinc-500">
                  Protect sensitive data before pasting into ChatGPT, Claude, or Copilot.
                </p>
              </div>
              <button
                type="button"
                onClick={() => { setCat('ai'); setQuery(''); }}
                className="hidden shrink-0 items-center gap-1.5 rounded-lg border border-violet-200 bg-violet-50 px-3.5 py-2 text-[13px] font-semibold text-violet-700 transition-all hover:bg-violet-100 sm:flex"
              >
                See all
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* AI tool cards */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {aiTools.map((tool) => {
                const features = TOOL_FEATURES[tool.href];
                return (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    className="group relative flex flex-col overflow-hidden rounded-2xl border border-violet-200/70 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-violet-300 hover:shadow-[0_8px_24px_rgba(139,92,246,0.13)]"
                  >
                    <div className="h-1 w-full bg-gradient-to-r from-violet-400 to-fuchsia-400" />
                    <div className="flex flex-1 flex-col p-5">
                      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-700 ring-1 ring-inset ring-violet-200/60">
                        <ToolIcon name={tool.icon} className="h-5 w-5" />
                      </div>
                      <p className="text-[14px] font-bold text-zinc-900 group-hover:text-violet-900">
                        {tool.name}
                      </p>
                      <p className="mt-1.5 flex-1 text-[12.5px] leading-relaxed text-zinc-500">
                        {tool.description}
                      </p>
                      {features && (
                        <ul className="mt-3 space-y-1">
                          {features.slice(0, 3).map((f) => (
                            <li key={f} className="flex items-center gap-1.5 text-[11.5px] text-violet-600/80">
                              <CheckCircle className="h-3 w-3 shrink-0 text-violet-400" />
                              {f}
                            </li>
                          ))}
                        </ul>
                      )}
                      <span className="mt-4 inline-flex items-center gap-1 text-[12.5px] font-bold text-violet-700">
                        Try it free
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* ══ STICKY CATEGORY TABS ═════════════════════════════════════════════ */}
        {!isSearching && (
          <div className="sticky top-[61px] z-20 -mx-5 mb-7 border-b border-zinc-200 bg-zinc-50/95 px-5 py-3 backdrop-blur-md sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            <div className="flex items-center justify-between gap-4">
              <h2 className="shrink-0 text-[15px] font-bold text-zinc-900">
                {cat === 'all' ? 'All tools' : CATEGORY_LABELS[cat]}
                <span className="ml-1.5 text-sm font-normal text-zinc-400">
                  ({CAT_COUNTS[cat]})
                </span>
              </h2>
              <div
                role="tablist"
                aria-label="Filter by category"
                className="flex gap-1.5 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                {CATEGORIES.map((id) => {
                  const Icon = CAT_ICON[id];
                  const isActive = cat === id;
                  const col = id !== 'all' ? CAT_COLOR[id as ToolCategory] : null;
                  return (
                    <button
                      key={id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setCat(id)}
                      className={`flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[12.5px] font-semibold transition-all ${
                        isActive
                          ? col
                            ? `${col.tabActiveBg} ${col.tabActiveBorder} ${col.tabActiveText} shadow-sm`
                            : 'border-zinc-900 bg-zinc-900 text-white shadow-sm'
                          : 'border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-900'
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5" aria-hidden />
                      {CATEGORY_LABELS[id]}
                      <span className={`tabular-nums text-[10px] ${isActive ? 'opacity-70' : 'opacity-50'}`}>
                        {CAT_COUNTS[id]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ══ SEARCH RESULT HEADING ════════════════════════════════════════════ */}
        {isSearching && (
          <div className="mb-6 flex items-center justify-between">
            <p className="text-[14px] text-zinc-600">
              <span className="font-semibold text-zinc-900">{filtered.length}</span>{' '}
              result{filtered.length !== 1 ? 's' : ''} for{' '}
              <span className="font-semibold text-zinc-900">"{query}"</span>
            </p>
            <button
              type="button"
              onClick={() => setQuery('')}
              className="flex items-center gap-1.5 text-[13px] text-zinc-500 hover:text-zinc-800"
            >
              <X className="h-3.5 w-3.5" /> Clear
            </button>
          </div>
        )}

        {/* ══ TOOL GRID ════════════════════════════════════════════════════════ */}
        <div
          className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
          role="tabpanel"
          aria-live="polite"
        >
          {filtered.map((tool) => {
            const col = CAT_COLOR[tool.category];
            const features = TOOL_FEATURES[tool.href];
            return (
              <Link
                key={`${tool.href}-${tool.name}`}
                href={tool.href}
                className={`group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 ${col.hoverBorder} ${col.hoverShadow}`}
              >
                {/* coloured top accent bar */}
                <div className={`h-[3px] w-full bg-gradient-to-r ${col.topBar}`} />

                <div className="flex flex-1 flex-col p-5">
                  {/* icon row + badges */}
                  <div className="mb-4 flex items-start justify-between gap-2">
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ring-1 ring-inset ring-black/5 ${col.iconBg} ${col.iconText}`}>
                      <ToolIcon name={tool.icon} className="h-[18px] w-[18px]" />
                    </div>
                    <div className="flex flex-wrap justify-end gap-1">
                      {tool.badge === 'popular' && (
                        <span className="inline-flex items-center gap-0.5 rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 font-mono text-[9.5px] font-bold uppercase tracking-wide text-amber-700">
                          <Flame className="h-2.5 w-2.5" />Hot
                        </span>
                      )}
                      {tool.badge === 'ai' && (
                        <span className="inline-flex items-center gap-0.5 rounded-full border border-violet-200 bg-violet-50 px-2 py-0.5 font-mono text-[9.5px] font-bold uppercase tracking-wide text-violet-700">
                          <Sparkles className="h-2.5 w-2.5" />AI
                        </span>
                      )}
                      {tool.badge === 'new' && (
                        <span className="inline-flex items-center gap-0.5 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 font-mono text-[9.5px] font-bold uppercase tracking-wide text-emerald-700">
                          New
                        </span>
                      )}
                    </div>
                  </div>

                  {/* name + description */}
                  <p className="text-[14.5px] font-bold leading-snug text-zinc-900">
                    {tool.name}
                  </p>
                  <p className="mt-1.5 text-[12.5px] leading-relaxed text-zinc-500">
                    {tool.description}
                  </p>

                  {/* feature hints */}
                  {features && (
                    <ul className="mt-3 flex-1 space-y-1.5">
                      {features.slice(0, 3).map((f) => (
                        <li key={f} className={`flex items-center gap-1.5 text-[11.5px] ${col.featureText} opacity-75`}>
                          <CheckCircle className={`h-3 w-3 shrink-0 ${col.featureIcon}`} />
                          {f}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* card footer */}
                  <div className="mt-4 flex items-center justify-between border-t border-zinc-100 pt-3">
                    <div className="flex items-center gap-1.5">
                      <span className={`h-2 w-2 rounded-full ${col.dot}`} />
                      <span className="text-[11px] font-medium text-zinc-400">
                        {CATEGORY_LABELS[tool.category]}
                      </span>
                    </div>
                    <span className="flex items-center gap-1 text-[12px] font-bold text-zinc-400 transition-colors group-hover:text-zinc-700">
                      Open
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* ══ EMPTY STATE ══════════════════════════════════════════════════════ */}
        {filtered.length === 0 && (
          <div className="mt-16 flex flex-col items-center gap-3 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-400">
              <Search className="h-6 w-6" />
            </div>
            <p className="text-[15px] font-semibold text-zinc-900">No tools found</p>
            <p className="text-[13.5px] text-zinc-500">
              Try a different term or{' '}
              <button
                type="button"
                onClick={() => { setQuery(''); setCat('all'); }}
                className="font-semibold text-emerald-700 underline-offset-2 hover:underline"
              >
                browse all tools
              </button>
            </p>
          </div>
        )}

        {/* ══ BOTTOM TRUST BANNER ══════════════════════════════════════════════ */}
        <div className="mt-16 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
          <div className="h-1 w-full bg-gradient-to-r from-emerald-400 via-teal-400 to-sky-400" />
          <div className="flex flex-col items-center gap-5 p-7 text-center sm:flex-row sm:justify-between sm:text-left">
            <div>
              <p className="text-[16px] font-bold text-zinc-900">
                All {TOOL_COUNT}+ tools — free, forever
              </p>
              <p className="mt-0.5 text-[13px] text-zinc-500">
                No signup, no paywall. Everything runs entirely in your browser.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-2 sm:justify-end">
              {['No signup', 'Zero data stored', 'Free forever', 'Open instantly'].map((badge) => (
                <span
                  key={badge}
                  className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-[12px] font-semibold text-zinc-600"
                >
                  <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[13px] font-medium text-zinc-500 transition-colors hover:text-zinc-900"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to JSON workbench
          </Link>
        </div>

      </div>
    </div>
  );
}
