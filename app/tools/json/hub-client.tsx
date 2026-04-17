'use client';

import { useMemo, useState } from 'react';
import { trackSearchOpened } from '@/lib/analytics';
import type { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import {
  AlertCircle, AlignLeft, ArrowLeft, ArrowRight, ArrowRightLeft,
  ArrowUpRight, BarChart3, Binary, Braces, CheckCircle, ChevronRight,
  Clock, Code, Code2, Database, Download, FileCode, FileCode2, FileJson,
  FileSearch, FileText, Fingerprint, Flame, Gauge, GitCompare, Globe, Grid3x3,
  Hash, ImageIcon, Key, KeyRound, Layers, Link2, Lock, Monitor, Package, Palette, Regex, Scissors,
  ScrollText, Search, Settings2, Shield, ShieldCheck, Sparkles,
  SplitSquareHorizontal, Square, Star, Table, Terminal, TestTube2, Timer, Webhook,
  Wrench, Zap, LayoutGrid, List, SlidersHorizontal, TrendingUp,
} from 'lucide-react';
import type { ToolCategory } from './tools-data';
import { CATEGORY_LABELS, TOOLS_DIRECTORY, TOOL_COUNT } from './tools-data';
import MaskingHeroAnimation from './MaskingHeroAnimation';

/* ─── Icon registry ──────────────────────────────────────────────────────── */
const TOOL_ICON_MAP: Record<string, LucideIcon> = {
  FileJson, Code, CheckCircle, Wrench, Table, Layers, GitCompare, Braces,
  ScrollText, FileSearch, Package, BarChart3, Database, ArrowRightLeft,
  Settings2, Shield, Lock, FileCode2, Scissors, Terminal, FileCode, Code2,
  Download, AlertCircle, Webhook, TestTube2, Globe, KeyRound, Binary,
  Fingerprint, Hash, ImageIcon, Link2, Key, ShieldCheck, SplitSquareHorizontal, Monitor,
  AlignLeft, Regex, Grid3x3, Gauge, Clock, FileText, Palette, Timer, Square,
};

const CATEGORIES: (ToolCategory | 'all')[] = ['all', 'json', 'ai', 'api', 'encode', 'dev'];

/* ─── Category color system ──────────────────────────────────────────────── */
const CAT_COLOR: Record<ToolCategory, {
  iconBg: string; iconText: string; iconRing: string;
  topBar: string; leftBorder: string;
  tabActiveBg: string; tabActiveBorder: string; tabActiveText: string;
  tabHover: string;
  hoverBg: string; hoverBorder: string; hoverShadow: string;
  dot: string; badge: string;
  featureText: string; featureIcon: string;
  sectionBg: string; sectionBorder: string; sectionText: string;
  ctaText: string;
}> = {
  json: {
    iconBg: 'bg-emerald-100', iconText: 'text-emerald-700', iconRing: 'ring-emerald-200/80',
    topBar: 'from-emerald-400 to-teal-400', leftBorder: 'border-emerald-400',
    tabActiveBg: 'bg-emerald-600', tabActiveBorder: 'border-emerald-600', tabActiveText: 'text-white',
    tabHover: 'hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200',
    hoverBg: 'hover:bg-emerald-50/40', hoverBorder: 'hover:border-emerald-300', hoverShadow: 'hover:shadow-[0_8px_24px_rgba(16,185,129,0.12)]',
    dot: 'bg-emerald-500', badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    featureText: 'text-emerald-700', featureIcon: 'text-emerald-500',
    sectionBg: 'bg-emerald-50/60', sectionBorder: 'border-emerald-200/60', sectionText: 'text-emerald-700',
    ctaText: 'text-emerald-700 group-hover:text-emerald-800',
  },
  ai: {
    iconBg: 'bg-violet-100', iconText: 'text-violet-700', iconRing: 'ring-violet-200/80',
    topBar: 'from-violet-400 to-fuchsia-400', leftBorder: 'border-violet-400',
    tabActiveBg: 'bg-violet-600', tabActiveBorder: 'border-violet-600', tabActiveText: 'text-white',
    tabHover: 'hover:bg-violet-50 hover:text-violet-700 hover:border-violet-200',
    hoverBg: 'hover:bg-violet-50/40', hoverBorder: 'hover:border-violet-300', hoverShadow: 'hover:shadow-[0_8px_24px_rgba(139,92,246,0.12)]',
    dot: 'bg-violet-500', badge: 'bg-violet-50 text-violet-700 border-violet-200',
    featureText: 'text-violet-700', featureIcon: 'text-violet-500',
    sectionBg: 'bg-violet-50/60', sectionBorder: 'border-violet-200/60', sectionText: 'text-violet-700',
    ctaText: 'text-violet-700 group-hover:text-violet-800',
  },
  api: {
    iconBg: 'bg-sky-100', iconText: 'text-sky-700', iconRing: 'ring-sky-200/80',
    topBar: 'from-sky-400 to-cyan-400', leftBorder: 'border-sky-400',
    tabActiveBg: 'bg-sky-600', tabActiveBorder: 'border-sky-600', tabActiveText: 'text-white',
    tabHover: 'hover:bg-sky-50 hover:text-sky-700 hover:border-sky-200',
    hoverBg: 'hover:bg-sky-50/40', hoverBorder: 'hover:border-sky-300', hoverShadow: 'hover:shadow-[0_8px_24px_rgba(14,165,233,0.12)]',
    dot: 'bg-sky-500', badge: 'bg-sky-50 text-sky-700 border-sky-200',
    featureText: 'text-sky-700', featureIcon: 'text-sky-500',
    sectionBg: 'bg-sky-50/60', sectionBorder: 'border-sky-200/60', sectionText: 'text-sky-700',
    ctaText: 'text-sky-700 group-hover:text-sky-800',
  },
  encode: {
    iconBg: 'bg-amber-100', iconText: 'text-amber-700', iconRing: 'ring-amber-200/80',
    topBar: 'from-amber-400 to-orange-400', leftBorder: 'border-amber-400',
    tabActiveBg: 'bg-amber-500', tabActiveBorder: 'border-amber-500', tabActiveText: 'text-white',
    tabHover: 'hover:bg-amber-50 hover:text-amber-700 hover:border-amber-200',
    hoverBg: 'hover:bg-amber-50/40', hoverBorder: 'hover:border-amber-300', hoverShadow: 'hover:shadow-[0_8px_24px_rgba(245,158,11,0.12)]',
    dot: 'bg-amber-500', badge: 'bg-amber-50 text-amber-700 border-amber-200',
    featureText: 'text-amber-700', featureIcon: 'text-amber-500',
    sectionBg: 'bg-amber-50/60', sectionBorder: 'border-amber-200/60', sectionText: 'text-amber-700',
    ctaText: 'text-amber-700 group-hover:text-amber-800',
  },
  dev: {
    iconBg: 'bg-slate-100', iconText: 'text-slate-600', iconRing: 'ring-slate-200/80',
    topBar: 'from-slate-400 to-zinc-500', leftBorder: 'border-slate-400',
    tabActiveBg: 'bg-slate-800', tabActiveBorder: 'border-slate-800', tabActiveText: 'text-white',
    tabHover: 'hover:bg-slate-50 hover:text-slate-700 hover:border-slate-200',
    hoverBg: 'hover:bg-slate-50/60', hoverBorder: 'hover:border-slate-300', hoverShadow: 'hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)]',
    dot: 'bg-slate-400', badge: 'bg-slate-50 text-slate-600 border-slate-200',
    featureText: 'text-slate-600', featureIcon: 'text-slate-400',
    sectionBg: 'bg-slate-50/60', sectionBorder: 'border-slate-200/60', sectionText: 'text-slate-600',
    ctaText: 'text-slate-600 group-hover:text-slate-800',
  },
};

const CAT_ICON: Record<ToolCategory | 'all', LucideIcon> = {
  all: Grid3x3, json: FileJson, ai: Sparkles, api: Globe, encode: Key, dev: Code,
};

const CAT_COUNTS = CATEGORIES.reduce<Record<string, number>>((acc, c) => {
  acc[c] = c === 'all' ? TOOL_COUNT : TOOLS_DIRECTORY.filter((t) => t.category === c).length;
  return acc;
}, {});

/* ─── Per-tool feature hints ─────────────────────────────────────────────── */
const TOOL_FEATURES: Record<string, string[]> = {
  '/':                              ['Tree view', 'Export XLSX', 'JSON → Table'],
  '/json-beautifier':               ['One-click format', 'Minify & validate', 'Clipboard copy'],
  '/json-validator':                ['Syntax errors', 'Schema validation', 'Real-time'],
  '/json-fixer-online':             ['Fix trailing commas', 'AI-broken JSON', 'Auto-recovery'],
  '/json-to-excel':                 ['Nested → XLSX', 'CSV export', 'In-browser'],
  '/json-comparator':               ['Semantic diff', 'Side-by-side', 'UUID normalize'],
  '/log-unpacker':                  ['Nested JSON unescape', 'Decode JWTs', 'Scrub paths'],
  '/json-schema-generation':        ['Generate schema', 'Validate structure', 'Copy JSON'],
  '/json-stringify-online':         ['Pretty-print', 'Escape strings', 'Copy-ready'],
  '/log-explorer':                  ['Browse logs', 'Filter & search', 'Navigate easily'],
  '/payload-analyzer':              ['Inspect payloads', 'No upload', 'Deep view'],
  '/data-insights':                 ['Stats from JSON', 'Pattern detect', 'Instant'],
  '/sql-in-generator':              ['IDs → SQL IN', 'MongoDB $in', 'CSV output'],
  '/api-comparator':                ['Diff responses', 'Side-by-side', 'Highlight changes'],
  '/config-comparator':             ['YAML/JSON configs', 'Env-file support', 'Diff view'],
  '/ai-schema-masker':              ['Reversible mask', 'Table & columns', 'ChatGPT-safe'],
  '/json-prompt-shield':            ['Mask keys', 'Any LLM', 'Reversible'],
  '/code-prompt-shield':            ['Redact secrets', '18 languages', 'Copilot-safe'],
  '/prompt-chunker':                ['Split prompts', 'Token limits', 'Copy chunks'],
  '/curl-converter':                ['JS/Python/fetch', 'Multi-language', 'Copy-paste'],
  '/curl-to-python':                ['Python requests', 'Full headers', 'Instant'],
  '/curl-to-python-requests':       ['requests.get/.post', 'Raw cURL', 'Copy-ready'],
  '/har-to-curl':                   ['Browser HAR', 'Extract cURL', 'Replay requests'],
  '/curl-failure-root-cause-engine':['TLS/DNS/proxy', 'HTTP diagnosis', 'Root-cause'],
  '/mock-api-generator':            ['Mock JSON APIs', 'Front-end dev', 'Instant'],
  '/test-data-generator':           ['Fake users', 'UUIDs', 'Structured fixtures'],
  '/cors-tester':                   ['Preflight sim', 'Real CORS', 'Policy check'],
  '/jwt-decoder':                   ['Decode & verify', 'Audit claims', 'No upload'],
  '/base64-encoder':                ['Base64/URL', 'MIME detect', 'Auto-detect JWT'],
  '/uuid-generator':                ['v1–v8 UUIDs', 'Bulk generate', 'Export JSON'],
  '/hash-generator':                ['MD5/SHA-256/SHA3', 'HMAC/bcrypt', 'File checksum'],
  '/url-encoder':                   ['Encode strings', 'Path safe', 'Decode instantly'],
  '/password-generator':            ['Entropy score', 'Passphrase', 'Crack-time'],
  '/password-audit':                ['Strength check', 'Breach hints', 'Local only'],
  '/token-comparator':              ['Visual JWT diff', 'API compare', 'Long string'],
  '/sql-formatter':                 ['Pretty SQL', 'Minify', 'Copy formatted'],
  '/regex-tester':                  ['Live highlights', 'Flags support', 'Replace preview'],
  '/truth-table-generator':         ['Boolean tables', 'Expression input', 'Export'],
  '/speed-test':                    ['Network latency', 'Throughput', 'Browser-based'],
  '/timezone-translator':           ['Convert timestamps', 'Multi-zone', 'Deploy-friendly'],
};

const STATS = [
  { value: '50+',   label: 'Free tools',   icon: Zap,    color: 'text-amber-400' },
  { value: '100%',  label: 'Browser-side', icon: Shield, color: 'text-emerald-400' },
  { value: 'Zero',  label: 'Data stored',  icon: Lock,   color: 'text-sky-400' },
  { value: 'Free',  label: 'Forever',      icon: Star,   color: 'text-violet-400' },
];

type ViewMode = 'grid' | 'compact';

function ToolIcon({ name, className }: { name: string; className?: string }) {
  const Icon = TOOL_ICON_MAP[name] ?? Wrench;
  return <Icon className={className} aria-hidden />;
}

/* ─── Grid card (rich, 3-4 col) ──────────────────────────────────────────── */
function GridCard({ tool }: { tool: typeof TOOLS_DIRECTORY[0] }) {
  const col = CAT_COLOR[tool.category];
  const features = TOOL_FEATURES[tool.href];

  return (
    <Link
      href={tool.href}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-sm transition-all duration-200 hover:-translate-y-[3px] ${col.hoverBorder} ${col.hoverShadow}`}
    >
      {/* gradient top accent */}
      <div className={`h-[3px] w-full bg-gradient-to-r ${col.topBar}`} />

      <div className="flex flex-1 flex-col p-5">
        {/* icon + badges */}
        <div className="mb-4 flex items-start justify-between gap-2">
          <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ring-1 ring-inset ${col.iconBg} ${col.iconText} ${col.iconRing}`}>
            <ToolIcon name={tool.icon} className="h-5 w-5" />
          </div>
          <div className="flex flex-wrap justify-end gap-1">
            {tool.badge === 'popular' && (
              <span className="inline-flex items-center gap-0.5 rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-amber-700">
                <Flame className="h-2.5 w-2.5" />Hot
              </span>
            )}
            {tool.badge === 'ai' && (
              <span className="inline-flex items-center gap-0.5 rounded-full border border-violet-200 bg-violet-50 px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-violet-700">
                <Sparkles className="h-2.5 w-2.5" />AI
              </span>
            )}
            {tool.badge === 'new' && (
              <span className="inline-flex items-center gap-0.5 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-emerald-700">
                New
              </span>
            )}
          </div>
        </div>

        {/* name + description */}
        <p className="text-[14.5px] font-bold leading-snug tracking-tight text-zinc-900 group-hover:text-zinc-700">
          {tool.name}
        </p>
        <p className="mt-1.5 text-[12.5px] leading-relaxed text-zinc-500 line-clamp-2">
          {tool.description}
        </p>

        {/* feature chips */}
        {features && (
          <div className="mt-3 flex flex-1 flex-wrap gap-1.5">
            {features.slice(0, 3).map((f) => (
              <span key={f} className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10.5px] font-medium leading-none ${col.badge}`}>
                <CheckCircle className={`h-2.5 w-2.5 shrink-0 ${col.featureIcon}`} />
                {f}
              </span>
            ))}
          </div>
        )}

        {/* footer */}
        <div className="mt-4 flex items-center justify-between border-t border-zinc-100 pt-3">
          <div className="flex items-center gap-1.5">
            <span className={`h-1.5 w-1.5 rounded-full ${col.dot}`} />
            <span className="text-[11px] font-medium text-zinc-400">{CATEGORY_LABELS[tool.category]}</span>
          </div>
          <span className={`flex items-center gap-1 text-[12px] font-bold transition-all ${col.ctaText} opacity-50 group-hover:opacity-100`}>
            Open
            <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </span>
        </div>
      </div>
    </Link>
  );
}

/* ─── Compact card (scannable, 2-5 col) ─────────────────────────────────── */
function CompactCard({ tool }: { tool: typeof TOOLS_DIRECTORY[0] }) {
  const col = CAT_COLOR[tool.category];
  return (
    <Link
      href={tool.href}
      className={`group relative flex items-center gap-3 overflow-hidden rounded-xl border border-zinc-200/80 bg-white px-4 py-3 shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all duration-150 ${col.hoverBg} ${col.hoverBorder} hover:-translate-y-[1px] hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)]`}
    >
      {/* category left strip */}
      <div className={`absolute left-0 top-0 h-full w-[3px] rounded-l-xl bg-gradient-to-b ${col.topBar} opacity-0 transition-opacity group-hover:opacity-100`} />

      {/* icon */}
      <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ring-1 ring-inset ${col.iconBg} ${col.iconText} ${col.iconRing}`}>
        <ToolIcon name={tool.icon} className="h-4 w-4" />
      </div>

      {/* name + badges */}
      <div className="min-w-0 flex-1">
        <p className="truncate text-[13px] font-semibold leading-tight text-zinc-800 group-hover:text-zinc-900">
          {tool.name}
        </p>
        <p className="mt-0.5 truncate text-[11px] text-zinc-400 group-hover:text-zinc-500">
          {tool.description.split('.')[0]}
        </p>
      </div>

      {/* badge + arrow */}
      <div className="flex shrink-0 items-center gap-1.5">
        {tool.badge === 'popular' && (
          <span className="hidden rounded-full border border-amber-200 bg-amber-50 px-1.5 py-0.5 font-mono text-[8.5px] font-bold uppercase tracking-wide text-amber-700 sm:inline-flex items-center gap-0.5">
            <Flame className="h-2 w-2" />Hot
          </span>
        )}
        {tool.badge === 'ai' && (
          <span className="hidden rounded-full border border-violet-200 bg-violet-50 px-1.5 py-0.5 font-mono text-[8.5px] font-bold uppercase tracking-wide text-violet-700 sm:inline-flex items-center gap-0.5">
            <Sparkles className="h-2 w-2" />AI
          </span>
        )}
        {tool.badge === 'new' && (
          <span className="hidden rounded-full border border-emerald-200 bg-emerald-50 px-1.5 py-0.5 font-mono text-[8.5px] font-bold uppercase tracking-wide text-emerald-700 sm:inline-flex">
            New
          </span>
        )}
        <ArrowRight className={`h-3.5 w-3.5 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100 ${col.ctaText}`} aria-hidden />
      </div>
    </Link>
  );
}

/* ─── Category section header ────────────────────────────────────────────── */
function CategorySection({
  categoryId,
  tools,
  viewMode,
}: {
  categoryId: ToolCategory;
  tools: typeof TOOLS_DIRECTORY;
  viewMode: ViewMode;
}) {
  const col = CAT_COLOR[categoryId];
  const Icon = CAT_ICON[categoryId];

  return (
    <section>
      {/* section header */}
      <div className={`mb-4 flex items-center gap-3 rounded-xl border px-4 py-2.5 ${col.sectionBg} ${col.sectionBorder}`}>
        <div className={`flex h-7 w-7 items-center justify-center rounded-lg ${col.iconBg} ${col.iconText}`}>
          <Icon className="h-3.5 w-3.5" aria-hidden />
        </div>
        <span className={`text-[13px] font-bold tracking-tight ${col.sectionText}`}>
          {CATEGORY_LABELS[categoryId]}
        </span>
        <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${col.iconBg} ${col.sectionText} opacity-70`}>
          {tools.length}
        </span>
      </div>

      {/* grid */}
      <div className={
        viewMode === 'grid'
          ? 'grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3'
          : 'grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
      }>
        {tools.map((tool) =>
          viewMode === 'grid'
            ? <GridCard key={tool.href} tool={tool} />
            : <CompactCard key={tool.href} tool={tool} />
        )}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   Main component
   ═══════════════════════════════════════════════════════════════════════════ */
export default function ToolsJsonHubClient() {
  const [cat, setCat]         = useState<ToolCategory | 'all'>('all');
  const [viewMode, setView]   = useState<ViewMode>('grid');

  const openGlobalSearch = () => {
    trackSearchOpened('hub_search');
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true, bubbles: true, cancelable: true }));
  };

  const filtered = useMemo(() => {
    return cat === 'all'
      ? TOOLS_DIRECTORY.filter((t) => t.category !== 'ai')
      : TOOLS_DIRECTORY.filter((t) => t.category === cat);
  }, [cat]);

  const aiTools      = useMemo(() => TOOLS_DIRECTORY.filter((t) => t.category === 'ai'), []);
  const popularTools = useMemo(() => TOOLS_DIRECTORY.filter((t) => t.badge === 'popular').slice(0, 8), []);
  const newTools     = useMemo(() => TOOLS_DIRECTORY.filter((t) => t.badge === 'new').slice(0, 6), []);

  /* Group tools by category for "All" view */
  const groupedTools = useMemo(() => {
    if (cat !== 'all') return null;
    const categoryOrder: ToolCategory[] = ['json', 'api', 'encode', 'dev'];
    return categoryOrder.map((id) => ({
      id,
      tools: filtered.filter((t) => t.category === id),
    })).filter(({ tools }) => tools.length > 0);
  }, [cat, filtered]);

  return (
    <div className="min-h-screen bg-[#F6F7F9]">

      {/* ══ HERO ══════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-zinc-950 pb-14 pt-10 sm:pb-16 sm:pt-12">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute -left-32 -top-20 h-[500px] w-[500px] rounded-full bg-emerald-600/20 blur-[130px]" />
          <div className="absolute -bottom-10 right-0 h-[400px] w-[500px] rounded-full bg-violet-600/15 blur-[110px]" />
          <div className="absolute left-1/2 top-1/3 h-[200px] w-[300px] -translate-x-1/2 rounded-full bg-sky-600/8 blur-[100px]" />
        </div>

        <div className="relative mx-auto max-w-[1200px] px-5 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_min(420px,42%)]">

            {/* Left copy */}
            <div>
              <div className="mb-5 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald-300">
                  <Zap className="h-3 w-3 text-amber-400" />
                  Free · No signup
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[11px] text-zinc-400">
                  <Sparkles className="h-3 w-3 text-violet-400" />
                  {TOOL_COUNT}+ tools · everything in your browser
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

              {/* Search — opens global popup */}
              <button
                type="button"
                aria-label="Search all tools"
                onClick={openGlobalSearch}
                className="mt-7 flex w-full max-w-lg cursor-text items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 ring-1 ring-transparent transition-all hover:border-emerald-500/40 hover:bg-white/[0.07] hover:ring-emerald-500/20 text-left"
              >
                <Search className="h-[18px] w-[18px] shrink-0 text-zinc-400" aria-hidden />
                <span className="flex-1 text-[15px] text-zinc-500">{`Search ${TOOL_COUNT}+ tools…`}</span>
                <kbd className="hidden items-center rounded border border-white/10 bg-white/5 px-1.5 py-1 font-mono text-[10px] text-zinc-500 sm:flex">⌘K</kbd>
              </button>

              {/* Stats */}
              <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3 sm:flex sm:flex-wrap sm:items-center sm:gap-x-7">
                {STATS.map(({ value, label, icon: Icon, color }) => (
                  <div key={label} className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/5">
                      <Icon className={`h-3.5 w-3.5 ${color}`} aria-hidden />
                    </div>
                    <div>
                      <span className="text-base font-bold text-white">{value}</span>
                      <span className="ml-1.5 text-[12px] text-zinc-500">{label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: animation */}
            <div className="hidden lg:block lg:h-[360px]">
              <MaskingHeroAnimation />
            </div>
          </div>
        </div>
      </section>

      {/* ══ POPULAR STRIP ═════════════════════════════════════════════════════ */}
      {(
        <div className="border-b border-zinc-200/80 bg-white shadow-[0_1px_0_rgba(0,0,0,0.03)]">
          <div className="mx-auto max-w-[1200px] px-5 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 overflow-x-auto py-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div className="flex shrink-0 items-center gap-1.5 border-r border-zinc-200 pr-4">
                <TrendingUp className="h-3.5 w-3.5 text-amber-500" />
                <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-zinc-400">Trending</span>
              </div>
              {popularTools.map((t) => {
                const col = CAT_COLOR[t.category];
                return (
                  <Link
                    key={t.href}
                    href={t.href}
                    className={`group flex shrink-0 items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-[12.5px] font-semibold text-zinc-600 transition-all hover:bg-white hover:text-zinc-900 hover:shadow-sm ${col.hoverBorder}`}
                  >
                    <span className={`flex h-4.5 w-4.5 items-center justify-center rounded-md ${col.iconBg} ${col.iconText}`}>
                      <ToolIcon name={t.icon} className="h-3 w-3" />
                    </span>
                    {t.name}
                    <ArrowUpRight className="h-3 w-3 opacity-0 transition-all group-hover:opacity-60" />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-[1200px] px-5 py-10 sm:px-6 sm:py-12 lg:px-8">

        {/* ══ AI SAFETY SPOTLIGHT ═══════════════════════════════════════════════ */}
        {cat === 'all' && (
          <section className="mb-12" aria-labelledby="ai-strip-heading">
            <div className="mb-5 flex items-end justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-100 ring-1 ring-violet-200/60">
                  <Sparkles className="h-4.5 w-4.5 text-violet-700" />
                </div>
                <div>
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-violet-500">AI Safety</p>
                  <h2 id="ai-strip-heading" className="text-[1.1rem] font-bold tracking-tight text-zinc-900">
                    Mask before you prompt
                  </h2>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setCat('ai')}
                className="hidden shrink-0 items-center gap-1.5 rounded-xl border border-violet-200 bg-violet-50 px-4 py-2 text-[12.5px] font-semibold text-violet-700 transition-all hover:bg-violet-100 sm:flex"
              >
                See all AI tools <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {aiTools.map((tool) => {
                const features = TOOL_FEATURES[tool.href];
                return (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    className="group relative flex flex-col overflow-hidden rounded-2xl border border-violet-200/60 bg-white shadow-sm transition-all duration-200 hover:-translate-y-[3px] hover:border-violet-300 hover:shadow-[0_10px_28px_rgba(139,92,246,0.14)]"
                  >
                    <div className="h-[3px] w-full bg-gradient-to-r from-violet-400 to-fuchsia-400" />
                    <div className="flex flex-1 flex-col p-5">
                      <div className="mb-3.5 flex h-11 w-11 items-center justify-center rounded-xl bg-violet-100 text-violet-700 ring-1 ring-inset ring-violet-200/60">
                        <ToolIcon name={tool.icon} className="h-5 w-5" />
                      </div>
                      <p className="text-[14px] font-bold tracking-tight text-zinc-900 group-hover:text-violet-900">
                        {tool.name}
                      </p>
                      <p className="mt-1 flex-1 text-[12px] leading-relaxed text-zinc-500">
                        {tool.description}
                      </p>
                      {features && (
                        <div className="mt-3 flex flex-wrap gap-1">
                          {features.slice(0, 3).map((f) => (
                            <span key={f} className="inline-flex items-center gap-1 rounded-full border border-violet-200 bg-violet-50 px-2 py-0.5 text-[10.5px] font-medium text-violet-700">
                              <CheckCircle className="h-2.5 w-2.5 text-violet-400" />
                              {f}
                            </span>
                          ))}
                        </div>
                      )}
                      <span className="mt-4 inline-flex items-center gap-1 text-[12px] font-bold text-violet-600 group-hover:text-violet-800">
                        Try it free <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* ══ NEW TOOLS SECTION ════════════════════════════════════════════════ */}
        {cat === 'all' && newTools.length > 0 && (
          <section className="mb-12">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 ring-1 ring-emerald-200/60">
                <Zap className="h-4.5 w-4.5 text-emerald-700" />
              </div>
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-emerald-500">Just shipped</p>
                <h2 className="text-[1.1rem] font-bold tracking-tight text-zinc-900">New tools</h2>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
              {newTools.map((tool) => <CompactCard key={tool.href} tool={tool} />)}
            </div>
          </section>
        )}

        {/* ══ STICKY FILTER BAR ════════════════════════════════════════════════ */}
        <div className="sticky top-[61px] z-20 -mx-5 sm:-mx-6 lg:-mx-8">
          <div className="border-b border-zinc-200/80 bg-[#F6F7F9]/95 px-5 py-3 backdrop-blur-md sm:px-6 lg:px-8 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
            <div className="flex flex-wrap items-center justify-between gap-3">

              {/* Category tabs */}
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
                          : col
                            ? `border-zinc-200 bg-white text-zinc-600 ${col.tabHover}`
                            : 'border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-900'
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5" aria-hidden />
                      <span className="hidden sm:inline">{CATEGORY_LABELS[id]}</span>
                      <span className="sm:hidden">{id === 'all' ? 'All' : CATEGORY_LABELS[id].split(' ')[0]}</span>
                      <span className={`rounded-full px-1.5 py-0.5 font-mono text-[9px] tabular-nums leading-none ${isActive ? 'bg-white/20 text-white' : 'bg-zinc-100 text-zinc-500'}`}>
                        {CAT_COUNTS[id]}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Right controls: view toggle */}
              <div className="flex shrink-0 items-center gap-2">
                <div className="flex items-center rounded-lg border border-zinc-200 bg-white p-0.5 shadow-sm">
                  <button
                    type="button"
                    onClick={() => setView('grid')}
                    aria-label="Grid view"
                    aria-pressed={viewMode === 'grid'}
                    className={`flex h-7 w-7 items-center justify-center rounded-md transition-all ${viewMode === 'grid' ? 'bg-zinc-900 text-white shadow-sm' : 'text-zinc-400 hover:text-zinc-700'}`}
                  >
                    <LayoutGrid className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setView('compact')}
                    aria-label="Compact view"
                    aria-pressed={viewMode === 'compact'}
                    className={`flex h-7 w-7 items-center justify-center rounded-md transition-all ${viewMode === 'compact' ? 'bg-zinc-900 text-white shadow-sm' : 'text-zinc-400 hover:text-zinc-700'}`}
                  >
                    <List className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ══ TOOL GRID — GROUPED (All) ═══════════════════════════════════════ */}
        {groupedTools && (
          <div className="mt-8 space-y-10">
            {groupedTools.map(({ id, tools }) => (
              <CategorySection key={id} categoryId={id} tools={tools} viewMode={viewMode} />
            ))}
          </div>
        )}

        {/* ══ TOOL GRID — FLAT (single category) ═══════════════════════════════ */}
        {!groupedTools && filtered.length > 0 && (
          <div
            className={`mt-8 ${
              viewMode === 'grid'
                ? 'grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3'
                : 'grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
            }`}
            role="tabpanel"
            aria-live="polite"
          >
            {filtered.map((tool) =>
              viewMode === 'grid'
                ? <GridCard key={tool.href} tool={tool} />
                : <CompactCard key={tool.href} tool={tool} />
            )}
          </div>
        )}

        {/* ══ EMPTY STATE ══════════════════════════════════════════════════════ */}
        {filtered.length === 0 && (
          <div className="mt-20 flex flex-col items-center gap-4 py-10 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-100">
              <Search className="h-7 w-7 text-zinc-400" />
            </div>
            <div>
              <p className="text-[16px] font-bold text-zinc-900">No tools in this category</p>
              <p className="mt-1 text-[13.5px] text-zinc-500">
                <button
                  type="button"
                  onClick={() => setCat('all')}
                  className="font-semibold text-emerald-700 underline-offset-2 hover:underline"
                >
                  Browse all tools
                </button>
              </p>
            </div>
          </div>
        )}

        {/* ══ BOTTOM TRUST BANNER ══════════════════════════════════════════════ */}
        <div className="mt-16 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
          <div className="h-[3px] w-full bg-gradient-to-r from-emerald-400 via-sky-400 to-violet-400" />
          <div className="flex flex-col items-center gap-5 p-7 text-center sm:flex-row sm:justify-between sm:text-left">
            <div>
              <p className="text-[16px] font-bold text-zinc-900">All {TOOL_COUNT}+ tools — free, forever</p>
              <p className="mt-0.5 text-[13px] text-zinc-500">No signup, no paywall. Everything runs entirely in your browser.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-2 sm:justify-end">
              {['No account', 'Zero data stored', 'Free forever', 'Open instantly'].map((badge) => (
                <span key={badge} className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-[12px] font-semibold text-zinc-600">
                  <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <Link href="/" className="inline-flex items-center gap-2 text-[13px] font-medium text-zinc-400 transition-colors hover:text-zinc-700">
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to JSON workbench
          </Link>
        </div>

      </div>
    </div>
  );
}
