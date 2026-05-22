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
  Package,
  Code,
  ChevronDown,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type Cat = 'all' | 'ai' | 'json' | 'api' | 'encode' | 'dev';

const TABS: { id: Cat; label: string; icon: LucideIcon; color: string; activeColor: string; activeBg: string }[] = [
  { id: 'all',    label: 'All',        icon: Sparkles,   color: 'text-indigo-500',  activeColor: 'text-white', activeBg: 'bg-indigo-600' },
  { id: 'ai',     label: 'AI Safety',  icon: ShieldCheck,color: 'text-violet-500',  activeColor: 'text-white', activeBg: 'bg-violet-600' },
  { id: 'json',   label: 'JSON',       icon: Code2,      color: 'text-emerald-600', activeColor: 'text-white', activeBg: 'bg-emerald-600' },
  { id: 'api',    label: 'API & cURL', icon: Network,    color: 'text-sky-500',     activeColor: 'text-white', activeBg: 'bg-sky-500' },
  { id: 'encode', label: 'Encoding',   icon: Binary,     color: 'text-amber-600',   activeColor: 'text-white', activeBg: 'bg-amber-500' },
  { id: 'dev',    label: 'Dev Utils',  icon: Wrench,     color: 'text-rose-500',    activeColor: 'text-white', activeBg: 'bg-rose-500' },
];

type MiniDef = {
  label: string;
  desc: string;
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
  hot: { label: 'HOT', cls: 'bg-red-100    text-red-700'    },
  new: { label: 'NEW', cls: 'bg-sky-100    text-sky-700'    },
};

// Unique, deduplicated tool list — every href appears exactly once.
const ALL_TOOLS: MiniDef[] = [
  // ── JSON ───────────────────────────────────────────────────────────────
  { label: 'JSON Formatter',     desc: 'Beautify & indent JSON',              cats: ['all','json'],          icon: FileCode,       variant: 'hot', href: '/json-formatter' },
  { label: 'JSON Beautifier',    desc: 'Pretty-print with syntax color',      cats: ['all','json'],          icon: Code2,                          href: '/json-beautifier' },
  { label: 'JSON Validator',     desc: 'Check syntax & structure instantly',  cats: ['all','json'],          icon: CheckCircle,                    href: '/json-validator' },
  { label: 'JSON Fixer',         desc: 'Auto-repair broken JSON',             cats: ['all','json'],          icon: Wrench,                         href: '/json-fixer-online' },
  { label: 'AI JSON Fixer',      desc: 'AI explains & fixes every error',     cats: ['all','json','ai'],     icon: Sparkles,       variant: 'ai',  href: '/json-error-explainer' },
  { label: 'JSON Comparator',    desc: 'Diff & highlight two JSON objects',   cats: ['all','json'],          icon: GitCompare,                     href: '/json-comparator' },
  { label: 'JSON → TypeScript',  desc: 'Generate TS types from any JSON',     cats: ['all','json'],          icon: Code2,          variant: 'new', href: '/json-to-typescript' },
  { label: 'JSON Schema Gen',    desc: 'Build JSON Schema from a sample',     cats: ['all','json'],          icon: FileCode,                       href: '/json-schema-generation' },
  { label: 'JSON Stringify',     desc: 'Stringify & escape JSON strings',     cats: ['all','json'],          icon: Code2,                          href: '/json-stringify-online' },
  { label: 'JSON to Excel',      desc: 'Export JSON rows to .xlsx',           cats: ['all','json'],          icon: FileSpreadsheet,                href: '/json-to-excel' },
  { label: 'Text Diff',          desc: 'Diff any two blocks of text',         cats: ['all','json','dev'],    icon: GitCompare,     variant: 'new', href: '/text-diff' },
  // ── SQL ────────────────────────────────────────────────────────────────
  { label: 'SQL Formatter',      desc: 'Beautify & indent SQL queries',       cats: ['all','dev'],           icon: Database,       variant: 'hot', href: '/sql-formatter' },
  { label: 'SQL IN Generator',   desc: 'Build IN (val, val, …) lists fast',   cats: ['all','dev'],           icon: Database,       variant: 'new', href: '/sql-in-generator' },
  // ── JWT / Auth / Security ──────────────────────────────────────────────
  { label: 'JWT Decoder',        desc: 'Decode & inspect JWT tokens',         cats: ['all','encode','dev'],  icon: Key,                            href: '/jwt-decoder' },
  { label: 'Token Compare',      desc: 'Spot differences between tokens',     cats: ['all','encode'],        icon: Columns,                        href: '/token-comparator' },
  { label: 'Hash Generator',     desc: 'MD5, SHA-256, bcrypt & more',         cats: ['all','encode'],        icon: Hash,                           href: '/hash-generator' },
  { label: 'Password Gen',       desc: 'Generate strong secure passwords',    cats: ['all','encode','dev'],  icon: Lock,                           href: '/password-generator' },
  { label: 'Password Audit',     desc: 'Score & audit password strength',     cats: ['all','encode','dev'],  icon: ShieldCheck,    variant: 'new', href: '/password-audit' },
  // ── Encoding ───────────────────────────────────────────────────────────
  { label: 'Base64 Encoder',     desc: 'Encode & decode Base64 strings',      cats: ['all','encode'],        icon: Binary,                         href: '/base64-encoder' },
  { label: 'URL Encoder',        desc: 'Encode & decode URL components',      cats: ['all','encode'],        icon: Link2,                          href: '/url-encoder' },
  { label: 'Image → Base64',     desc: 'Convert images to data URIs',         cats: ['all','encode','dev'],  icon: Image,          variant: 'new', href: '/image-to-base64' },
  { label: 'UUID Generator',     desc: 'Generate v4 UUIDs instantly',         cats: ['all','encode'],        icon: Fingerprint,                    href: '/uuid-generator' },
  // ── API & cURL ─────────────────────────────────────────────────────────
  { label: 'cURL Converter',     desc: 'Convert cURL to 10+ languages',       cats: ['all','api'],           icon: Terminal,                       href: '/curl-converter' },
  { label: 'HAR to cURL',        desc: 'Replay browser requests as cURL',     cats: ['all','api'],           icon: Network,                        href: '/har-to-curl' },
  { label: 'cURL Analyzer',      desc: 'AI diagnoses cURL failures',          cats: ['all','api'],           icon: Activity,                       href: '/curl-failure-root-cause-engine' },
  { label: 'CORS Tester',        desc: 'Test CORS headers live',              cats: ['all','api','dev'],     icon: Globe,                          href: '/cors-tester' },
  { label: 'HTTP Headers',       desc: 'Analyze HTTP response headers',       cats: ['all','api','dev'],     icon: Globe,          variant: 'new', href: '/http-headers-analyzer' },
  { label: 'API Comparator',     desc: 'Diff two API responses side-by-side', cats: ['all','api'],           icon: ArrowLeftRight,                 href: '/api-comparator' },
  { label: 'Config Compare',     desc: 'Diff JSON / YAML config files',       cats: ['all','api','dev'],     icon: Settings,                       href: '/config-comparator' },
  { label: 'Payload Analyzer',   desc: 'Inspect & profile API payloads',      cats: ['all','api'],           icon: BarChart2,                      href: '/payload-analyzer' },
  { label: 'Mock API',           desc: 'Generate mock JSON responses',        cats: ['all','api'],           icon: Server,                         href: '/mock-api-generator' },
  { label: 'Test Data Gen',      desc: 'Realistic fake data for testing',     cats: ['all','api','dev'],     icon: FlaskConical,                   href: '/test-data-generator' },
  // ── AI Tools ───────────────────────────────────────────────────────────
  { label: 'AI Schema Masker',   desc: 'Mask schema before ChatGPT',          cats: ['all','ai'],            icon: ShieldCheck,    variant: 'ai',  href: '/ai-schema-masker' },
  { label: 'JSON Prompt Shield', desc: 'Mask JSON keys before sending to AI', cats: ['all','ai'],            icon: Shield,         variant: 'ai',  href: '/json-prompt-shield' },
  { label: 'Code Prompt Shield', desc: 'Hide secrets before Copilot',         cats: ['all','ai'],            icon: ShieldCheck,    variant: 'ai',  href: '/code-prompt-shield' },
  { label: 'Data Insights',      desc: 'AI analysis of any data',             cats: ['all','ai','dev'],      icon: BarChart3,      variant: 'new', href: '/data-insights' },
  { label: 'Log Explorer',       desc: 'Parse & search structured logs',      cats: ['all','ai','dev'],      icon: FileSearch,                     href: '/log-explorer' },
  { label: 'Log Unpacker',       desc: 'Decompress & decode log bundles',     cats: ['all','ai','dev'],      icon: Package,                        href: '/log-unpacker' },
  { label: 'Prompt Chunker',     desc: 'Split prompts by token budget',       cats: ['all','ai'],            icon: Scissors,       variant: 'ai',  href: '/prompt-chunker' },
  // ── Dev Utilities ──────────────────────────────────────────────────────
  { label: 'Regex Tester',       desc: 'Live regex test & explanation',       cats: ['all','dev'],           icon: Search,                         href: '/regex-tester' },
  { label: 'Timestamp',          desc: 'Convert Unix ↔ human-readable time',  cats: ['all','dev'],           icon: Clock,          variant: 'new', href: '/timestamp-converter' },
  { label: 'Timezone',           desc: 'Translate times across zones',        cats: ['all','dev'],           icon: Timer,                          href: '/timezone-translator' },
  { label: 'Cron Builder',       desc: 'Build & decode cron expressions',     cats: ['all','dev'],           icon: CalendarClock,  variant: 'new', href: '/cron-expression' },
  { label: 'Truth Table',        desc: 'Generate logic truth tables',         cats: ['all','dev'],           icon: Binary,                         href: '/truth-table-generator' },
  { label: 'Markdown Preview',   desc: 'Live Markdown → HTML preview',        cats: ['all','dev'],           icon: FileText,       variant: 'new', href: '/markdown-preview' },
  { label: 'String Utilities',   desc: 'Trim, case, encode & transform',      cats: ['all','dev'],           icon: Type,                           href: '/string-utilities' },
  { label: 'Speed Test',         desc: 'Test your browser download speed',    cats: ['all','dev'],           icon: Zap,                            href: '/speed-test' },
  // ── HTML / CSS / Design ────────────────────────────────────────────────
  { label: 'HTML Formatter',     desc: 'Beautify & indent HTML markup',       cats: ['all','dev'],           icon: FileCode,       variant: 'new', href: '/html-formatter' },
  { label: 'HTML Viewer',        desc: 'Render & preview HTML live',          cats: ['all','dev'],           icon: Eye,            variant: 'new', href: '/html-viewer' },
  { label: 'Box Shadow',         desc: 'CSS box-shadow visual builder',       cats: ['all','dev'],           icon: BoxSelect,      variant: 'new', href: '/css-box-shadow' },
  { label: 'CSS Gradients',      desc: 'Visual CSS gradient builder',         cats: ['all','dev'],           icon: Palette,        variant: 'hot', href: '/css-gradient-generator' },
  { label: 'Color Picker',       desc: 'Pick, convert & export colors',       cats: ['all','dev'],           icon: Palette,        variant: 'new', href: '/color-picker' },
  { label: 'SVG to Image',       desc: 'Export SVG as PNG or JPEG',           cats: ['all','dev'],           icon: Image,          variant: 'new', href: '/svg-to-image' },
  { label: 'Image to Text',      desc: 'OCR: extract text from images',       cats: ['all','dev'],           icon: FileSearch,     variant: 'new', href: '/image-to-text' },
  { label: 'PDF to Excel',       desc: 'Extract tables from PDF files',       cats: ['all','dev'],           icon: FileSpreadsheet,variant: 'new', href: '/pdf-to-excel-word' },
];

export default function HomePrivacyFirstSections({
  toolPageUrls,
}: {
  toolPageUrls: Record<string, string>;
}) {
  const [cat, setCat] = useState<Cat>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const visibleTools = useMemo(() => {
    const byCategory = cat === 'all' ? ALL_TOOLS : ALL_TOOLS.filter((t) => t.cats.includes(cat));
    if (!searchQuery.trim()) return byCategory;
    const q = searchQuery.toLowerCase();
    return byCategory.filter(
      (t) => t.label.toLowerCase().includes(q) || t.desc.toLowerCase().includes(q),
    );
  }, [cat, searchQuery]);

  // Count per category (based on unique ALL_TOOLS list)
  const counts = useMemo(() => {
    const m: Partial<Record<Cat, number>> = {};
    for (const tab of TABS) {
      m[tab.id] = tab.id === 'all'
        ? ALL_TOOLS.length
        : ALL_TOOLS.filter((t) => t.cats.includes(tab.id)).length;
    }
    return m;
  }, []);

  // Dominant category for icon color
  function getDominantCat(tool: MiniDef): Cat {
    const priority: Cat[] = ['ai','json','api','encode','dev'];
    return priority.find((c) => tool.cats.includes(c)) ?? 'all';
  }

  return (
    <>
      {/* ── Tools Section ──────────────────────────────────────────────── */}
      <section id="home-tools" className="mx-auto max-w-[1100px] px-4 sm:px-6 py-12 sm:py-16">

        {/* Section header */}
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-[28px] font-bold tracking-[-0.025em] text-zinc-900 sm:text-3xl">
              Every tool you need,{' '}
              <span className="relative inline-block">
                <span className="relative z-10 text-emerald-600">right here</span>
                <span className="absolute bottom-0.5 left-0 h-[6px] w-full rounded-full bg-emerald-100" aria-hidden />
              </span>
            </h2>
            <p className="mt-2 max-w-[480px] text-[15px] leading-relaxed text-zinc-500">
              {ALL_TOOLS.length} tools that open instantly, run privately in your browser, and never ask you to sign up.
            </p>
          </div>
          {/* Quick stats */}
          <div className="flex items-center gap-5 shrink-0">
            {[
              { n: `${ALL_TOOLS.length}+`, sub: 'Free tools' },
              { n: '0',                    sub: 'Server calls' },
              { n: '∞',                    sub: 'No login' },
            ].map((s) => (
              <div key={s.sub} className="text-center">
                <p className="text-lg font-bold text-zinc-900 leading-none">{s.n}</p>
                <p className="text-[10px] text-zinc-400 mt-0.5 uppercase tracking-wide font-medium">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Search bar — full width, prominent ────────────────────── */}
        <div className="mb-4">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" aria-hidden />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => {
                if (!searchQuery) {
                  trackSearchOpened('homepage_search');
                }
              }}
              placeholder={`Search ${ALL_TOOLS.length}+ tools — try "JWT", "cURL", "Base64"…`}
              className="h-12 w-full rounded-xl border border-zinc-200 bg-white pl-11 pr-4 text-[14px] text-zinc-800 placeholder:text-zinc-400 shadow-sm transition-all focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200/60 hover:border-zinc-300"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-0.5 text-zinc-400 hover:text-zinc-600 transition-colors"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* ── Category filter pills ──────────────────────────────────── */}
        <div className="mb-6 flex gap-1.5 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {TABS.map((t) => {
            const Icon = t.icon;
            const isActive = cat === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => { setCat(t.id); setSearchQuery(''); }}
                className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-[12px] font-semibold transition-all ${
                  isActive
                    ? `${t.activeBg} ${t.activeColor} border-transparent shadow-sm`
                    : 'bg-white border-zinc-200 text-zinc-500 hover:border-zinc-300 hover:text-zinc-700'
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

        {/* ── Featured AI hero cards (shown in all / ai tabs only) ───── */}
        {(cat === 'all' || cat === 'ai') && !searchQuery && (
          <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {/* AI Schema Masker */}
            <Link
              href="/ai-schema-masker"
              className="group relative flex flex-col gap-0 overflow-hidden rounded-2xl border border-emerald-200/80 bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-900 p-6 shadow-lg shadow-emerald-900/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-emerald-900/30 sm:col-span-1"
            >
              <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-emerald-400/20 blur-2xl" aria-hidden />
              <div className="relative flex items-start justify-between gap-2 mb-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-2xl backdrop-blur-sm ring-1 ring-white/20">🛡️</div>
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
                    <Check className="h-3 w-3 text-emerald-400 shrink-0" strokeWidth={2.5} aria-hidden />{f}
                  </li>
                ))}
              </ul>
              <span className="relative mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-white group-hover:gap-2.5 transition-all">
                Open tool <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>

            {/* JSON Prompt Shield */}
            <Link
              href="/json-prompt-shield"
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-blue-200/80 bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-900 p-6 shadow-lg shadow-blue-900/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-900/30"
            >
              <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-blue-400/20 blur-2xl" aria-hidden />
              <div className="relative flex items-start justify-between gap-2 mb-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-2xl backdrop-blur-sm ring-1 ring-white/20">🔒</div>
                <span className="rounded-full bg-white/15 px-2 py-0.5 font-mono text-[10px] font-bold text-white/90">AI</span>
              </div>
              <p className="relative text-[16px] font-bold text-white">JSON Prompt Shield</p>
              <p className="relative mt-2 text-[13px] leading-relaxed text-blue-200/80">
                Mask JSON keys & values before AI. Keys→K_00001, strings→S_00001.
              </p>
              <ul className="relative mt-4 flex flex-col gap-1.5">
                {['Preserve structure','Batch masking','Instant restore'].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-[12px] text-blue-100/70">
                    <Check className="h-3 w-3 text-blue-400 shrink-0" strokeWidth={2.5} aria-hidden />{f}
                  </li>
                ))}
              </ul>
              <span className="relative mt-auto pt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-white group-hover:gap-2.5 transition-all">
                Open tool <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>

            {/* Code Prompt Shield */}
            <Link
              href="/code-prompt-shield"
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-violet-200/80 bg-gradient-to-br from-violet-950 via-violet-900 to-purple-900 p-6 shadow-lg shadow-violet-900/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-violet-900/30"
            >
              <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-violet-400/20 blur-2xl" aria-hidden />
              <div className="relative flex items-start justify-between gap-2 mb-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-2xl backdrop-blur-sm ring-1 ring-white/20">🔐</div>
                <span className="rounded-full bg-white/15 px-2 py-0.5 font-mono text-[10px] font-bold text-white/90">AI</span>
              </div>
              <p className="relative text-[16px] font-bold text-white">Code Prompt Shield</p>
              <p className="relative mt-2 text-[13px] leading-relaxed text-violet-200/80">
                Mask API keys, variable names & secrets before Copilot or ChatGPT.
              </p>
              <ul className="relative mt-4 flex flex-col gap-1.5">
                {['18 languages','Pre-scan risk','Custom patterns'].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-[12px] text-violet-100/70">
                    <Check className="h-3 w-3 text-violet-400 shrink-0" strokeWidth={2.5} aria-hidden />{f}
                  </li>
                ))}
              </ul>
              <span className="relative mt-auto pt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-white group-hover:gap-2.5 transition-all">
                Open tool <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          </div>
        )}

        {/* ── Mini tool grid ─────────────────────────────────────────── */}
        {visibleTools.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-14 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-100">
              <Search className="h-5 w-5 text-zinc-400" />
            </div>
            <p className="text-[15px] font-semibold text-zinc-700">
              No tools match &ldquo;{searchQuery}&rdquo;
            </p>
            <p className="text-[13px] text-zinc-400">Try a different keyword or browse by category above</p>
            <button
              type="button"
              onClick={() => { setCat('all'); setSearchQuery(''); }}
              className="mt-1 rounded-full bg-zinc-900 px-4 py-2 text-[12px] font-semibold text-white transition-opacity hover:opacity-80"
            >
              Show all tools
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {visibleTools.map((t) => {
              const Icon = t.icon;
              const dom = getDominantCat(t);
              const colors = CAT_ICON_COLOR[dom];
              const badge = t.variant ? VARIANT_BADGE[t.variant] : null;
              return (
                <Link
                  key={t.href}
                  href={t.href}
                  className="group flex items-start gap-3 rounded-xl border border-zinc-200/80 bg-white px-4 py-3.5 shadow-sm ring-1 ring-zinc-900/[0.03] transition-all duration-150 hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md hover:shadow-zinc-900/[0.06] active:scale-[0.99]"
                >
                  {/* Icon */}
                  <div className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ring-1 ${colors.bg} ${colors.text} ${colors.ring}`}>
                    <Icon className="h-4 w-4" aria-hidden />
                  </div>

                  {/* Name + description + badge */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="truncate text-[13px] font-semibold text-zinc-800 group-hover:text-zinc-900 leading-tight">
                        {t.label}
                      </p>
                      {badge && (
                        <span className={`shrink-0 rounded-full px-1.5 py-px font-mono text-[9px] font-bold uppercase tracking-wide ${badge.cls}`}>
                          {badge.label}
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 text-[12px] leading-snug text-zinc-400 truncate">
                      {t.desc}
                    </p>
                  </div>

                  {/* Arrow */}
                  <ChevronRight className="mt-1 h-3.5 w-3.5 shrink-0 text-zinc-300 transition-all group-hover:text-zinc-500 group-hover:translate-x-0.5" aria-hidden />
                </Link>
              );
            })}
          </div>
        )}
      </section>

      {/* ── How it works ──────────────────────────────────────────────── */}
      <section className="border-y border-zinc-200 bg-white">
        <div className="mx-auto max-w-[1100px] px-4 sm:px-6 py-12 sm:py-16">
          <header className="mb-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 mb-3">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">How it works</span>
            </div>
            <h2 className="text-[28px] font-bold tracking-[-0.025em] text-zinc-900">
              Fast. Private. No account needed.
            </h2>
            <p className="mt-2 max-w-[480px] text-[15px] leading-relaxed text-zinc-500">
              All tools run entirely in your browser — zero server round-trips, zero data exposure.
            </p>
          </header>

          <div className="grid gap-px overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { n: '01', icon: '🔍', title: 'Find your tool',    desc: 'Search or browse by category. Every tool is one click away — no accounts, no ads blocking your path.' },
              { n: '02', icon: '📋', title: 'Paste your data',   desc: 'Paste JSON, SQL, cURL, tokens, code — whatever you need to work with. Nothing leaves your device.' },
              { n: '03', icon: '⚡', title: 'Get your result',   desc: 'Tools process everything locally in milliseconds. Copy, download, or use the output directly.' },
              { n: '04', icon: '🔗', title: 'Discover more',     desc: 'Every tool page shows related tools. One tab, zero friction — bookmark and come back anytime.' },
            ].map((step) => (
              <div key={step.n} className="group relative flex flex-col gap-4 bg-white p-6 sm:p-7 transition-colors hover:bg-zinc-50/60">
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

      {/* ── Privacy ───────────────────────────────────────────────────── */}
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
              href="/ai-schema-masker"
              className="mt-7 inline-flex w-fit items-center gap-2 rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition-all hover:bg-emerald-400"
            >
              Try AI Schema Masker
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <ul className="flex flex-col gap-5">
            {[
              { title: 'No server-side processing', desc: 'All computation happens in your browser using JavaScript. No request is made to our backend.' },
              { title: 'No logging or telemetry',   desc: "We don't log your SQL schemas, JSON payloads, API keys, or any other sensitive input." },
              { title: 'GDPR, HIPAA, SOC 2 safe',   desc: 'Suitable for regulated industries. Nothing is shared with third parties, ever.' },
              { title: 'Open architecture',          desc: 'Built with Next.js. Inspect every network request and verify no data leaves your device.' },
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

      {/* ── Blog ──────────────────────────────────────────────────────── */}
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
