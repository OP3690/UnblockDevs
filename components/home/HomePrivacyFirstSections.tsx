'use client';

import Link from 'next/link';
import { useState, useMemo } from 'react';
import { trackSearchOpened } from '@/lib/analytics';
import {
  ArrowRight,
  Check,
  Clock,
  Search,
  Code2,
  Database,
  Key,
  FileCode,
  Globe,
  Network,
  GitCompare,
  Wrench,
  Server,
  Lock,
  Hash,
  Link2,
  FileSpreadsheet,
  Image,
  BarChart3,
  Settings,
  FileSearch,
  CheckCircle,
  Terminal,
  Activity,
  Columns,
  FlaskConical,
  Scissors,
  Zap,
  Timer,
  Shield,
  ShieldCheck,
  Palette,
  FileText,
  Eye,
  Type,
  BoxSelect,
  CalendarClock,
  ArrowLeftRight,
  Binary,
  BarChart2,
  Fingerprint,
  ChevronRight,
  Sparkles,
  TrendingUp,
  Package,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type Cat = 'all' | 'ai' | 'json' | 'api' | 'encode' | 'dev';

const TABS: { id: Cat; label: string; icon: LucideIcon; color: string; activeColor: string; activeBg: string }[] = [
  { id: 'all', label: 'All', icon: Sparkles, color: 'text-indigo-500', activeColor: 'text-white', activeBg: 'bg-indigo-600' },
  { id: 'ai', label: 'AI Safety', icon: ShieldCheck, color: 'text-violet-500', activeColor: 'text-white', activeBg: 'bg-violet-600' },
  { id: 'json', label: 'JSON', icon: Code2, color: 'text-emerald-600', activeColor: 'text-white', activeBg: 'bg-emerald-600' },
  { id: 'api', label: 'API & cURL', icon: Network, color: 'text-sky-500', activeColor: 'text-white', activeBg: 'bg-sky-500' },
  { id: 'encode', label: 'Encoding', icon: Binary, color: 'text-amber-600', activeColor: 'text-white', activeBg: 'bg-amber-500' },
  { id: 'dev', label: 'Dev Utils', icon: Wrench, color: 'text-rose-500', activeColor: 'text-white', activeBg: 'bg-rose-500' },
];

type MiniDef = {
  label: string;
  cats: Cat[];
  variant?: 'ai' | 'hot' | 'new';
  href: string;
  icon: LucideIcon;
};

const CAT_ICON_COLOR: Record<Cat, { bg: string; text: string; ring: string }> = {
  all:    { bg: 'bg-zinc-100',    text: 'text-zinc-600',    ring: 'ring-zinc-200/60' },
  json:   { bg: 'bg-emerald-50',  text: 'text-emerald-700', ring: 'ring-emerald-200/60' },
  api:    { bg: 'bg-sky-50',      text: 'text-sky-700',     ring: 'ring-sky-200/60' },
  ai:     { bg: 'bg-violet-50',   text: 'text-violet-700',  ring: 'ring-violet-200/60' },
  encode: { bg: 'bg-amber-50',    text: 'text-amber-700',   ring: 'ring-amber-200/60' },
  dev:    { bg: 'bg-rose-50',     text: 'text-rose-700',    ring: 'ring-rose-200/60' },
};

const VARIANT_BADGE: Record<string, { label: string; cls: string }> = {
  ai:  { label: 'AI',  cls: 'bg-violet-100 text-violet-700' },
  hot: { label: 'HOT', cls: 'bg-red-100 text-red-700' },
  new: { label: 'NEW', cls: 'bg-sky-100 text-sky-700' },
};

export default function HomePrivacyFirstSections({
  toolPageUrls,
}: {
  toolPageUrls: Record<string, string>;
}) {
  const [cat, setCat] = useState<Cat>('all');

  const miniTools: MiniDef[] = useMemo(
    () => [
      { label: 'JSON Beautifier',   cats: ['all','json'],          icon: Code2,         href: '/json-beautifier' },
      { label: 'JSON Formatter',    cats: ['all','json'],          icon: FileCode,       variant: 'hot', href: '/json-formatter' },
      { label: 'JSON Validator',    cats: ['all','json'],          icon: CheckCircle,    href: '/json-validator' },
      { label: 'SQL Formatter',     cats: ['all','json','dev'],    icon: Database,       variant: 'hot', href: toolPageUrls.sql },
      { label: 'JWT Decoder',       cats: ['all','json','dev'],    icon: Key,            href: '/jwt-decoder' },
      { label: 'Base64 Encoder',    cats: ['all','encode'],        icon: Binary,         href: '/base64-encoder' },
      { label: 'UUID Generator',    cats: ['all','encode'],        icon: Fingerprint,    href: '/uuid-generator' },
      { label: 'CORS Tester',       cats: ['all','api','dev'],     icon: Globe,          href: '/cors-tester' },
      { label: 'Hash Generator',    cats: ['all','encode'],        icon: Hash,           href: '/hash-generator' },
      { label: 'URL Encoder',       cats: ['all','encode'],        icon: Link2,          href: '/url-encoder' },
      { label: 'Regex Tester',      cats: ['all','dev'],           icon: Search,         href: toolPageUrls.regextester },
      { label: 'JSON to Excel',     cats: ['all','json'],          icon: FileSpreadsheet,href: '/json-to-excel' },
      { label: 'Smart JSON Diff',   cats: ['all','json'],          icon: GitCompare,     href: toolPageUrls.jsoncompare },
      { label: 'Log Unpacker',      cats: ['all','json','ai'],     icon: Package,        href: toolPageUrls.builder },
      { label: 'cURL Converter',    cats: ['all','api'],           icon: Terminal,       href: toolPageUrls.curl },
      { label: 'HAR to cURL',       cats: ['all','api'],           icon: Network,        href: toolPageUrls.hartocurl },
      { label: 'cURL Analyzer',     cats: ['all','api'],           icon: Activity,       href: toolPageUrls.curlfailure },
      { label: 'Token Compare',     cats: ['all','json','dev'],    icon: Columns,        href: toolPageUrls.tokencompare },
      { label: 'Password Gen',      cats: ['all','encode','dev'],  icon: Lock,           href: '/password-generator' },
      { label: 'Truth Table',       cats: ['all','dev'],           icon: Binary,         href: '/truth-table-generator' },
      { label: 'Test Data Gen',     cats: ['all','api','dev'],     icon: FlaskConical,   href: toolPageUrls.testdata },
      { label: 'Mock API',          cats: ['all','api'],           icon: Server,         href: toolPageUrls.mock },
      { label: 'Prompt Chunker',    cats: ['all','ai'],            icon: Scissors,       variant: 'ai', href: toolPageUrls.promptchunk },
      { label: 'Speed Test',        cats: ['all','dev'],           icon: Zap,            href: '/speed-test' },
      { label: 'Timezone',          cats: ['all','dev'],           icon: Timer,          href: toolPageUrls.timezone },
      { label: 'Schema Gen',        cats: ['all','json'],          icon: FileCode,       href: toolPageUrls.schema },
      { label: 'SVG to Image',      cats: ['all','dev'],           icon: Image,          variant: 'new', href: '/svg-to-image' },
      { label: 'Data Insights',     cats: ['all','dev'],           icon: BarChart3,      variant: 'new', href: '/data-insights' },
      { label: 'Password Audit',    cats: ['all','dev','encode'],  icon: ShieldCheck,    variant: 'new', href: '/password-audit' },
      { label: 'JSON Stringify',    cats: ['all','json'],          icon: Code2,          href: '/json-stringify-online' },
      { label: 'Payload Analyzer',  cats: ['all','api'],           icon: BarChart2,      href: toolPageUrls.payload },
      { label: 'API Comparator',    cats: ['all','api'],           icon: ArrowLeftRight, href: toolPageUrls.comparator },
      { label: 'Config Compare',    cats: ['all','api','dev'],     icon: Settings,       href: toolPageUrls.config },
      { label: 'JSON Fixer',        cats: ['all','json'],          icon: Wrench,         href: '/json-fixer-online' },
      { label: 'PDF to Excel',      cats: ['all','dev'],           icon: FileSpreadsheet,variant: 'new', href: '/pdf-to-excel-word' },
      { label: 'Cron Builder',      cats: ['all','dev'],           icon: CalendarClock,  variant: 'new', href: '/cron-expression' },
      { label: 'Markdown Preview',  cats: ['all','dev'],           icon: FileText,       variant: 'new', href: '/markdown-preview' },
      { label: 'Color Picker',      cats: ['all','dev'],           icon: Palette,        variant: 'new', href: '/color-picker' },
      { label: 'Text Diff',         cats: ['all','dev','json'],    icon: GitCompare,     variant: 'new', href: '/text-diff' },
      { label: 'JSON → TypeScript', cats: ['all','json'],          icon: Code2,          variant: 'new', href: '/json-to-typescript' },
      { label: 'Timestamp',         cats: ['all','dev'],           icon: Clock,          variant: 'new', href: '/timestamp-converter' },
      { label: 'Box Shadow',        cats: ['all','dev'],           icon: BoxSelect,      variant: 'new', href: '/css-box-shadow' },
      { label: 'CSS Gradients',     cats: ['all','dev'],           icon: Palette,        variant: 'hot', href: '/css-gradient-generator' },
      { label: 'HTML Formatter',    cats: ['all','dev'],           icon: FileCode,       variant: 'new', href: '/html-formatter' },
      { label: 'Image → Base64',    cats: ['all','encode','dev'],  icon: Image,          variant: 'new', href: '/image-to-base64' },
      { label: 'HTML Viewer',       cats: ['all','dev'],           icon: Eye,            variant: 'new', href: '/html-viewer' },
      { label: 'HTTP Headers',      cats: ['all','dev'],           icon: Globe,          variant: 'new', href: '/http-headers-analyzer' },
      { label: 'String Utilities',  cats: ['all','dev'],           icon: Type,           variant: 'new', href: '/string-utilities' },
      { label: 'Log Explorer',      cats: ['all','json','dev'],    icon: FileSearch,     href: toolPageUrls.logs },
      { label: 'SQL IN Generator',  cats: ['all','json','dev'],    icon: Database,       variant: 'new', href: '/sql-in-generator' },
      { label: 'AI Schema Masker',  cats: ['all','ai'],            icon: ShieldCheck,    variant: 'ai', href: toolPageUrls.schemamasker },
    ],
    [toolPageUrls],
  );

  const visibleMini = useMemo(() => {
    return cat === 'all' ? miniTools : miniTools.filter((t) => t.cats.includes(cat));
  }, [cat, miniTools]);

  // Count per category
  const counts = useMemo(() => {
    const m: Partial<Record<Cat, number>> = {};
    for (const tab of TABS) {
      m[tab.id] = tab.id === 'all' ? miniTools.length : miniTools.filter((t) => t.cats.includes(tab.id)).length;
    }
    return m;
  }, [miniTools]);

  // Dominant category for color of each tool card
  function getDominantCat(tool: MiniDef): Cat {
    const priority: Cat[] = ['ai','json','api','encode','dev'];
    return priority.find((c) => tool.cats.includes(c)) ?? 'all';
  }

  return (
    <>
      {/* ── Tools Section ─────────────────────────────────────── */}
      <section id="home-tools" className="mx-auto max-w-[1100px] px-4 sm:px-6 py-12 sm:py-16">

        {/* Header */}
        <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 mb-3">
              <TrendingUp className="h-3.5 w-3.5 text-emerald-600" aria-hidden />
              <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-700">50+ Tools · All Free</span>
            </div>
            <h2 className="text-[28px] font-bold tracking-[-0.025em] text-zinc-900 sm:text-3xl">
              Everything you need, daily
            </h2>
            <p className="mt-2 max-w-[500px] text-[15px] leading-relaxed text-zinc-500">
              From JSON formatting to AI-safe masking. 100% client-side — nothing leaves your browser.
            </p>
          </div>

          {/* Quick stats */}
          <div className="flex items-center gap-4 shrink-0">
            {[
              { n: '50+', sub: 'Free tools' },
              { n: '0', sub: 'Server calls' },
              { n: '∞', sub: 'No signup' },
            ].map((s) => (
              <div key={s.sub} className="text-center">
                <p className="text-lg font-bold text-zinc-900 leading-none">{s.n}</p>
                <p className="text-[10px] text-zinc-400 mt-0.5 uppercase tracking-wide font-medium">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Search + category filter row */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          {/* Search — opens global search popup */}
          <div className="relative flex-1 max-w-sm">
            <button
              type="button"
              aria-label="Search tools"
              onClick={() => {
                trackSearchOpened('homepage_search');
                window.dispatchEvent(
                  new KeyboardEvent('keydown', { key: 'k', metaKey: true, bubbles: true, cancelable: true })
                );
              }}
              className="flex h-11 w-full items-center gap-2.5 rounded-xl border border-zinc-200 bg-white pl-3.5 pr-4 text-left shadow-sm transition-all hover:border-zinc-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-200/60 cursor-text"
            >
              <Search className="h-4 w-4 shrink-0 text-zinc-400" aria-hidden />
              <span className="flex-1 text-[13.5px] text-zinc-400">Search 50+ tools…</span>
              <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded border border-zinc-200 bg-zinc-50 px-1.5 py-0.5 font-mono text-[10px] text-zinc-400">⌘K</kbd>
            </button>
          </div>

          {/* Category pills */}
          <div className="flex gap-1.5 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {TABS.map((t) => {
              const Icon = t.icon;
              const isActive = cat === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setCat(t.id)}
                  className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-[12px] font-semibold transition-all ${
                    isActive
                      ? `${t.activeBg} ${t.activeColor} border-transparent shadow-sm`
                      : `bg-white border-zinc-200 text-zinc-500 hover:border-zinc-300 hover:text-zinc-700`
                  }`}
                >
                  <Icon className={`h-3 w-3 ${isActive ? t.activeColor : t.color}`} aria-hidden />
                  {t.label}
                  <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${isActive ? 'bg-white/20' : 'bg-zinc-100 text-zinc-400'}`}>
                    {counts[t.id]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Featured AI cards ───────────────────────────────── */}
        {(cat === 'all' || cat === 'ai') && (
          <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {/* AI Schema Masker — hero */}
            <Link
              href={toolPageUrls.schemamasker}
              className="group relative flex flex-col gap-0 overflow-hidden rounded-2xl border border-emerald-200/80 bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-900 p-6 shadow-lg shadow-emerald-900/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-emerald-900/30 sm:col-span-1"
            >
              {/* Gradient orb */}
              <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-emerald-400/20 blur-2xl" aria-hidden />
              <div className="relative flex items-start justify-between gap-2 mb-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-2xl backdrop-blur-sm ring-1 ring-white/20">
                  🛡️
                </div>
                <div className="flex gap-1.5">
                  <span className="rounded-full bg-white/15 px-2 py-0.5 font-mono text-[10px] font-bold text-white/90 backdrop-blur-sm">AI</span>
                  <span className="rounded-full bg-amber-400/20 px-2 py-0.5 font-mono text-[10px] font-bold text-amber-300 backdrop-blur-sm">Popular</span>
                </div>
              </div>
              <p className="relative text-[16px] font-bold text-white">AI Schema Masker</p>
              <p className="relative mt-2 text-[13px] leading-relaxed text-emerald-200/80">
                Mask SQL/JSON schema before ChatGPT. Fully reversible in one click.
              </p>
              <ul className="relative mt-4 flex flex-col gap-1.5">
                {['GDPR & HIPAA safe','Deterministic mapping','Works offline'].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-[12px] text-emerald-100/70">
                    <Check className="h-3 w-3 text-emerald-400 shrink-0" strokeWidth={2.5} aria-hidden />
                    {f}
                  </li>
                ))}
              </ul>
              <span className="relative mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-white group-hover:gap-2.5 transition-all">
                Open tool <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>

            {/* JSON Prompt Shield */}
            <Link
              href={toolPageUrls.jsonpromptshield}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-blue-200/80 bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-900 p-6 shadow-lg shadow-blue-900/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-900/30"
            >
              <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-blue-400/20 blur-2xl" aria-hidden />
              <div className="relative flex items-start justify-between gap-2 mb-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-2xl backdrop-blur-sm ring-1 ring-white/20">
                  🔒
                </div>
                <span className="rounded-full bg-white/15 px-2 py-0.5 font-mono text-[10px] font-bold text-white/90">AI</span>
              </div>
              <p className="relative text-[16px] font-bold text-white">JSON Prompt Shield</p>
              <p className="relative mt-2 text-[13px] leading-relaxed text-blue-200/80">
                Mask JSON keys & values before AI. Keys→K_00001, strings→S_00001.
              </p>
              <ul className="relative mt-4 flex flex-col gap-1.5">
                {['Preserve structure','Batch masking','Instant restore'].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-[12px] text-blue-100/70">
                    <Check className="h-3 w-3 text-blue-400 shrink-0" strokeWidth={2.5} aria-hidden />
                    {f}
                  </li>
                ))}
              </ul>
              <span className="relative mt-auto pt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-white group-hover:gap-2.5 transition-all">
                Open tool <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>

            {/* Code Prompt Shield */}
            <Link
              href={toolPageUrls.codemasker}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-violet-200/80 bg-gradient-to-br from-violet-950 via-violet-900 to-purple-900 p-6 shadow-lg shadow-violet-900/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-violet-900/30"
            >
              <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-violet-400/20 blur-2xl" aria-hidden />
              <div className="relative flex items-start justify-between gap-2 mb-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-2xl backdrop-blur-sm ring-1 ring-white/20">
                  🔐
                </div>
                <span className="rounded-full bg-white/15 px-2 py-0.5 font-mono text-[10px] font-bold text-white/90">AI</span>
              </div>
              <p className="relative text-[16px] font-bold text-white">Code Prompt Shield</p>
              <p className="relative mt-2 text-[13px] leading-relaxed text-violet-200/80">
                Mask API keys, variable names & secrets before Copilot or ChatGPT.
              </p>
              <ul className="relative mt-4 flex flex-col gap-1.5">
                {['18 languages','Pre-scan risk','Custom patterns'].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-[12px] text-violet-100/70">
                    <Check className="h-3 w-3 text-violet-400 shrink-0" strokeWidth={2.5} aria-hidden />
                    {f}
                  </li>
                ))}
              </ul>
              <span className="relative mt-auto pt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-white group-hover:gap-2.5 transition-all">
                Open tool <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          </div>
        )}

        {/* ── Mini tool grid ──────────────────────────────────── */}
        {visibleMini.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-14 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-100">
              <Search className="h-5 w-5 text-zinc-400" />
            </div>
            <p className="text-[15px] font-semibold text-zinc-700">No tools in this category</p>
            <button
              type="button"
              onClick={() => setCat('all')}
              className="mt-1 rounded-full bg-zinc-900 px-4 py-2 text-[12px] font-semibold text-white transition-opacity hover:opacity-80"
            >
              Show all tools
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
            {visibleMini.map((t) => {
              const Icon = t.icon;
              const dom = getDominantCat(t);
              const colors = CAT_ICON_COLOR[dom];
              const badge = t.variant ? VARIANT_BADGE[t.variant] : null;
              return (
                <Link
                  key={t.label + t.href}
                  href={t.href}
                  className="group flex items-center gap-3 rounded-xl border border-zinc-200/80 bg-white px-3.5 py-3 shadow-sm ring-1 ring-zinc-900/[0.03] transition-all duration-150 hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md hover:shadow-zinc-900/[0.06] active:scale-[0.99]"
                >
                  {/* Icon */}
                  <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ring-1 ${colors.bg} ${colors.text} ${colors.ring}`}>
                    <Icon className="h-4 w-4" aria-hidden />
                  </div>
                  {/* Name + badge */}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13px] font-semibold text-zinc-800 group-hover:text-zinc-900 leading-tight">{t.label}</p>
                    {badge && (
                      <span className={`mt-0.5 inline-block rounded-full px-1.5 py-px font-mono text-[9px] font-bold uppercase tracking-wide ${badge.cls}`}>
                        {badge.label}
                      </span>
                    )}
                  </div>
                  {/* Arrow */}
                  <ChevronRight className="h-3.5 w-3.5 shrink-0 text-zinc-300 transition-all group-hover:text-zinc-500 group-hover:translate-x-0.5" aria-hidden />
                </Link>
              );
            })}
          </div>
        )}

        {/* ── Browse full hub CTA ─────────────────────────────── */}
        <div className="mt-8 flex flex-col items-center gap-3 rounded-2xl border border-dashed border-zinc-200 bg-gradient-to-b from-zinc-50/80 to-white px-6 py-6 sm:flex-row sm:justify-between">
          <div>
            <p className="text-[15px] font-semibold text-zinc-900">Need more tools?</p>
            <p className="text-[13px] text-zinc-500 mt-0.5">Browse the full hub with categories, search, and view modes.</p>
          </div>
          <Link
            href="/tools/json"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-zinc-900 px-5 py-2.5 text-[13px] font-semibold text-white shadow-sm transition-all hover:bg-zinc-800 hover:shadow-md"
          >
            Browse full JSON &amp; tools hub
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>

      {/* ── How it works ────────────────────────────────────────── */}
      <section className="border-y border-zinc-200 bg-white">
        <div className="mx-auto max-w-[1100px] px-4 sm:px-6 py-12 sm:py-16">
          <header className="mb-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 mb-3">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">How it works</span>
            </div>
            <h2 className="text-[28px] font-bold tracking-[-0.025em] text-zinc-900">
              Use AI safely in 4 steps
            </h2>
            <p className="mt-2 max-w-[480px] text-[15px] leading-relaxed text-zinc-500">
              The AI Schema Masker workflow — applicable to SQL, JSON, and code.
            </p>
          </header>

          <div className="grid gap-px overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { n: '01', icon: '📋', title: 'Paste your data', desc: 'Paste your SQL query, JSON payload, or source code. Nothing leaves your browser at this stage.' },
              { n: '02', icon: '🔒', title: 'Mask identifiers', desc: 'Click Mask. Real names become anonymous tokens — T_00001, C_00001. The mapping stays on your device.' },
              { n: '03', icon: '🤖', title: 'Send to AI safely', desc: 'Copy the masked version and send to ChatGPT or any AI. No real schema data is transmitted.' },
              { n: '04', icon: '✅', title: 'Restore real names', desc: "Paste the AI's response. Click Restore. Your real identifiers are put back in one click." },
            ].map((step, i) => (
              <div key={step.n} className="group relative flex flex-col gap-4 bg-white p-6 sm:p-7 transition-colors hover:bg-zinc-50/60">
                {/* Step connector line on desktop */}
                {i < 3 && (
                  <span className="pointer-events-none absolute right-0 top-1/2 hidden h-px w-px translate-x-px -translate-y-1/2 lg:block" aria-hidden />
                )}
                <span className="font-mono text-[11px] font-bold text-zinc-300 tracking-widest">{step.n}</span>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-zinc-100 text-xl group-hover:bg-emerald-50 transition-colors">
                  {step.icon}
                </div>
                <h3 className="text-[15px] font-bold text-zinc-900">{step.title}</h3>
                <p className="text-[13px] leading-relaxed text-zinc-500">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Privacy ─────────────────────────────────────────────── */}
      <section className="mx-auto max-w-[1100px] px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid gap-10 overflow-hidden rounded-2xl bg-zinc-950 p-8 sm:grid-cols-2 sm:gap-12 sm:p-12">
          <div className="flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 mb-4 w-fit">
              <Shield className="h-3.5 w-3.5 text-emerald-400" aria-hidden />
              <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">Privacy by design</span>
            </div>
            <h2 className="text-[26px] font-bold leading-snug tracking-[-0.025em] text-white">
              Your data never touches our servers
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-zinc-400">
              Every single tool on UnblockDevs runs entirely in your browser. We don&apos;t have servers
              that process your data — because we don&apos;t need them.
            </p>
            <Link
              href={toolPageUrls.schemamasker}
              className="mt-7 inline-flex w-fit items-center gap-2 rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition-all hover:bg-emerald-400"
            >
              Try AI Schema Masker
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <ul className="flex flex-col gap-5">
            {[
              { title: 'No server-side processing', desc: 'All computation happens in your browser using JavaScript. No request is made to our backend.' },
              { title: 'No logging or telemetry', desc: "We don't log your SQL schemas, JSON payloads, API keys, or any other sensitive input." },
              { title: 'GDPR, HIPAA, SOC 2 safe', desc: 'Suitable for regulated industries. Nothing is shared with third parties, ever.' },
              { title: 'Open architecture', desc: 'Built with Next.js. Inspect every network request and verify no data leaves your device.' },
            ].map((item) => (
              <li key={item.title} className="flex gap-3.5">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/20">
                  <Check className="h-2.5 w-2.5 text-emerald-400" strokeWidth={3} aria-hidden />
                </span>
                <div>
                  <p className="text-[14px] font-semibold text-white">{item.title}</p>
                  <p className="mt-0.5 text-[13px] leading-relaxed text-zinc-500">{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Blog ─────────────────────────────────────────────────── */}
      <section className="border-y border-zinc-200 bg-white">
        <div className="mx-auto max-w-[1100px] px-4 sm:px-6 py-12 sm:py-16">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 mb-3">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">From the blog</span>
              </div>
              <h2 className="text-[28px] font-bold tracking-[-0.025em] text-zinc-900">
                Guides for developers
              </h2>
            </div>
            <Link
              href="/blog"
              className="inline-flex w-fit shrink-0 items-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-[13px] font-semibold text-zinc-700 shadow-sm transition-all hover:bg-zinc-50 hover:border-zinc-300 hover:text-zinc-900"
            >
              View all posts
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                href: '/blog/hipaa-compliant-ai-development',
                tag: 'AI Safety',
                tagColor: 'text-violet-600 bg-violet-50 border-violet-100',
                title: 'HIPAA-Compliant AI Development — Using ChatGPT Without Exposing Patient Data',
                desc: 'How to use AI coding tools in healthcare without violating compliance requirements.',
                meta: '8 min read',
              },
              {
                href: '/blog/why-my-api-works-in-postman-but-not-in-browser',
                tag: 'API Debugging',
                tagColor: 'text-sky-600 bg-sky-50 border-sky-100',
                title: 'Why Your API Works in Postman but Not in cURL — 7 Reasons',
                desc: 'The most common causes of this frustration and the exact fix for each scenario.',
                meta: '6 min read',
              },
              {
                href: '/blog/json-stringify-complete-guide',
                tag: 'JavaScript',
                tagColor: 'text-amber-700 bg-amber-50 border-amber-100',
                title: 'JSON.stringify Complete Guide — Undefined, Circular References, and Edge Cases',
                desc: 'Everything JSON.stringify does that surprises developers, with examples for every edge case.',
                meta: '7 min read',
              },
            ].map((post) => (
              <Link
                key={post.href}
                href={post.href}
                className="group flex flex-col gap-3 rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-sm ring-1 ring-zinc-900/[0.03] transition-all duration-150 hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md"
              >
                <span className={`inline-flex w-fit items-center rounded-full border px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider ${post.tagColor}`}>
                  {post.tag}
                </span>
                <span className="text-[15px] font-bold leading-snug text-zinc-900 group-hover:text-zinc-800">
                  {post.title}
                </span>
                <p className="text-[13px] leading-relaxed text-zinc-500">{post.desc}</p>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-[12px] text-zinc-400">
                  <Clock className="h-3 w-3" aria-hidden />
                  {post.meta}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
