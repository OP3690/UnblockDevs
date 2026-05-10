'use client';

import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import {
  Code2,
  Database,
  ShieldCheck,
  Shield,
  Scissors,
  FileSpreadsheet,
  Image,
  GitCompare,
  Wrench,
  Key,
  FileCode,
  Lock,
  Network,
  Code,
  Server,
  Settings,
  BarChart3,
  FileSearch,
  Clock,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Zap,
  CheckCircle,
  ScanLine,
} from 'lucide-react';
import type { ToolTab } from '@/lib/personalization';

type ToolPageUrls = Record<Exclude<ToolTab, 'converter'>, string>;

type SpotlightItem = {
  id: string;
  label: string;
  hint: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  href?: string;
  badge?: string;
  onClick?: () => void;
  active?: boolean;
};

type CategoryTile = {
  href: string;
  label: string;
  hint: string;
  icon: LucideIcon;
  badge?: string;
};

type CategoryBlock = {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  accent: string; // tailwind bg/text for icon box
  tiles: CategoryTile[];
};

const tileClass =
  'group relative flex min-h-[100px] flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-gradient-to-b from-white to-slate-50/90 p-3 sm:p-4 text-left shadow-sm ring-1 ring-slate-900/[0.03] transition-all duration-200 hover:-translate-y-0.5 hover:border-primary-200/90 hover:shadow-lg hover:shadow-primary-500/10 active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:scale-x-0 after:bg-gradient-to-r after:from-primary-500 after:to-sky-500 after:transition-transform after:duration-200 group-hover:after:scale-x-100';

const spotlightClass =
  'group relative flex min-h-[132px] flex-col items-center justify-center overflow-hidden rounded-2xl border border-slate-200/90 bg-gradient-to-b from-white to-slate-50/50 p-4 text-center shadow-md ring-1 ring-slate-900/[0.03] transition-all duration-200 hover:-translate-y-1 hover:border-primary-300/80 hover:shadow-xl hover:shadow-primary-500/15 active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 sm:min-h-[148px]';

function TileContent({
  icon: Icon,
  label,
  hint,
  badge,
  iconWrapClass,
}: {
  icon: LucideIcon;
  label: string;
  hint: string;
  badge?: string;
  iconWrapClass: string;
}) {
  return (
    <>
      <div className="flex items-start justify-between gap-2">
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${iconWrapClass}`}>
          <Icon className="h-5 w-5" aria-hidden />
        </div>
        {badge ? (
          <span
            className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
              badge === 'Hot' ? 'bg-red-100 text-red-800' : 'bg-violet-100 text-violet-700'
            }`}
          >
            {badge}
          </span>
        ) : (
          <ArrowRight
            className="h-4 w-4 shrink-0 text-slate-300 transition-all group-hover:translate-x-0.5 group-hover:text-primary-500"
            aria-hidden
          />
        )}
      </div>
      <span className="mt-3 font-semibold text-slate-900 text-sm leading-snug">{label}</span>
      <span className="mt-1 text-[11px] leading-snug text-slate-500 line-clamp-2 sm:text-xs">{hint}</span>
      <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-primary-600 opacity-90 group-hover:opacity-100">
        Try it
        <span aria-hidden>→</span>
      </span>
    </>
  );
}

export default function HomeToolDiscovery({
  activeTab,
  onBeautifierClick,
  toolPageUrls,
  jumpToToolHref,
}: {
  activeTab: ToolTab;
  onBeautifierClick: () => void;
  toolPageUrls: ToolPageUrls;
  jumpToToolHref: string;
}) {
  const spotlights: SpotlightItem[] = [
    {
      id: 'beautifier',
      label: 'JSON Beautifier',
      hint: 'Format, tree view, minify — on this page',
      icon: Code2,
      iconBg: 'bg-primary-100',
      iconColor: 'text-primary-700',
      onClick: onBeautifierClick,
      active: activeTab === 'beautifier',
    },
    {
      id: 'fixer',
      label: 'JSON Fixer',
      hint: 'Repair broken & AI-generated JSON',
      icon: Wrench,
      iconBg: 'bg-amber-100',
      iconColor: 'text-amber-700',
      href: toolPageUrls.fixer,
    },
    {
      id: 'jwt',
      label: 'JWT Decoder',
      hint: 'Decode headers, claims & expiry',
      icon: Key,
      iconBg: 'bg-sky-100',
      iconColor: 'text-sky-700',
      href: '/jwt-decoder',
    },
    {
      id: 'masker',
      label: 'AI schema masker',
      hint: 'Mask SQL/JSON before ChatGPT',
      icon: ShieldCheck,
      iconBg: 'bg-violet-100',
      iconColor: 'text-violet-700',
      href: toolPageUrls.schemamasker,
      badge: 'AI',
    },
  ];

  const categories: CategoryBlock[] = [
    {
      title: 'JSON & data',
      subtitle: 'Parse, compare, export',
      icon: FileSpreadsheet,
      accent: 'bg-emerald-100 text-emerald-700',
      tiles: [
        { href: '/json-to-excel', label: 'JSON → Excel', hint: 'Spreadsheet & CSV export', icon: FileSpreadsheet },
        { href: toolPageUrls.jsoncompare, label: 'Smart JSON diff', hint: 'See real changes only', icon: GitCompare },
        { href: toolPageUrls.schema, label: 'JSON schema', hint: 'Generate & validate', icon: FileCode },
        { href: toolPageUrls.logs, label: 'Logs analyzer', hint: 'Explore log payloads', icon: FileSearch },
        { href: toolPageUrls.payload, label: 'Payload insights', hint: 'Size & shape stats', icon: BarChart3 },
        { href: toolPageUrls.builder, label: 'Log unpacker', hint: 'Unescape nested JSON', icon: Wrench },
      ],
    },
    {
      title: 'API & HTTP',
      subtitle: 'Requests, mocks, debugging',
      icon: Network,
      accent: 'bg-sky-100 text-sky-700',
      tiles: [
        { href: toolPageUrls.comparator, label: 'API comparator', hint: 'Diff two responses', icon: GitCompare },
        { href: toolPageUrls.curl, label: 'cURL converter', hint: 'To fetch, axios, etc.', icon: Code },
        { href: toolPageUrls.mock, label: 'Mock API', hint: 'Generate mock JSON', icon: Server },
        { href: toolPageUrls.testdata, label: 'Test data', hint: 'Realistic fixtures', icon: Database },
        { href: toolPageUrls.hartocurl, label: 'HAR → cURL', hint: 'From browser capture', icon: Network },
        { href: toolPageUrls.curlfailure, label: 'cURL analyzer', hint: 'Why requests fail', icon: AlertTriangle },
      ],
    },
    {
      title: 'Safe for AI',
      subtitle: 'Mask before you paste',
      icon: Sparkles,
      accent: 'bg-violet-100 text-violet-700',
      tiles: [
        { href: toolPageUrls.jsonpromptshield, label: 'JSON shield', hint: 'Redact payload fields', icon: Shield, badge: 'AI' },
        { href: toolPageUrls.codemasker, label: 'Code shield', hint: 'Sanitize snippets', icon: Shield, badge: 'AI' },
        { href: toolPageUrls.promptchunk, label: 'Prompt chunker', hint: 'Split long prompts', icon: Scissors, badge: 'AI' },
        { href: toolPageUrls.sql, label: 'SQL formatter', hint: 'Pretty-print queries', icon: Database, badge: 'Hot' },
        { href: toolPageUrls.tokencompare, label: 'Token compare', hint: 'JWT & keys side by side', icon: Key },
        { href: '/svg-to-image', label: 'SVG → image', hint: 'PNG / JPEG export', icon: Image },
        { href: '/image-to-text', label: 'Image → text', hint: 'OCR any photo or scan', icon: ScanLine },
      ],
    },
    {
      title: 'Encoding & utils',
      subtitle: 'Everyday dev helpers',
      icon: Zap,
      accent: 'bg-amber-100 text-amber-800',
      tiles: [
        { href: '/base64-encoder', label: 'Base64', hint: 'Encode & decode', icon: FileCode },
        { href: '/uuid-generator', label: 'UUID', hint: 'Generate v4 IDs', icon: FileCode },
        { href: '/hash-generator', label: 'Hashes', hint: 'SHA, MD5, HMAC', icon: Key },
        { href: '/url-encoder', label: 'URL encode', hint: 'Query-safe strings', icon: Code2 },
        { href: '/password-generator', label: 'Passwords', hint: 'Strong secrets', icon: Lock },
        { href: '/truth-table-generator', label: 'Truth tables', hint: 'Logic & booleans', icon: Code2 },
      ],
    },
  ];

  const extraRow: CategoryTile[] = [
    { href: '/cors-tester', label: 'CORS tester', hint: 'Browser vs API', icon: Network },
    { href: toolPageUrls.config, label: 'Config compare', hint: 'YAML / JSON diff', icon: Settings },
    { href: toolPageUrls.timezone, label: 'Time zones', hint: 'Convert & schedule', icon: Clock },
    { href: toolPageUrls.regextester, label: 'Regex tester', hint: 'Live match & flags', icon: Code2 },
    { href: '/json-validator', label: 'JSON validator', hint: 'Syntax check', icon: CheckCircle },
    { href: '/tools/json', label: 'All JSON tools', hint: 'Browse the full hub', icon: FileCode },
  ];

  return (
    <div className="relative bg-gradient-to-b from-slate-50/90 via-white to-slate-100/50 py-6 sm:py-8 lg:py-10">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_85%_45%_at_50%_0%,rgba(14,165,233,0.1),transparent_60%)]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[1.75rem] border border-slate-200/85 bg-white shadow-xl shadow-slate-900/[0.06] ring-1 ring-slate-900/[0.04] sm:rounded-[2rem]">
        <div className="h-1 w-full bg-gradient-to-r from-primary-500 via-cyan-500 to-violet-500" aria-hidden />
        <div className="p-4 sm:p-6 lg:p-8">
          {/* Title row — centered for symmetry */}
          <div className="mx-auto mb-8 max-w-2xl text-center sm:mb-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-600">Pick a tool</p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              What do you want to do?
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">
              Large tiles below are the fastest starts. Everything runs locally — tap anything that fits your task.
            </p>
            <ul className="mt-5 flex flex-wrap items-center justify-center gap-2 sm:gap-3" aria-label="Tool guarantees">
              {[
                { label: 'Private', sub: 'In-browser' },
                { label: 'Instant', sub: 'No signup' },
                { label: 'Free', sub: 'Core tools' },
              ].map((chip) => (
                <li
                  key={chip.label}
                  className="rounded-2xl border border-slate-200/90 bg-slate-50/90 px-3 py-2 text-left shadow-sm backdrop-blur-sm sm:px-4"
                >
                  <span className="block text-xs font-bold text-slate-900">{chip.label}</span>
                  <span className="block text-[10px] text-slate-500 sm:text-xs">{chip.sub}</span>
                </li>
              ))}
            </ul>
            <a
              href={jumpToToolHref}
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-600/25 transition hover:bg-primary-700 hover:shadow-primary-600/35 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
            >
              Use JSON Beautifier on this page
              <span aria-hidden>↓</span>
            </a>
          </div>

          {/* Spotlight — symmetric 2×2 mobile, 4×1 desktop */}
          <div className="mb-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
          {spotlights.map((s) => {
            const Icon = s.icon;
            const activeRing = s.active
              ? 'ring-2 ring-primary-500 border-primary-300/80 bg-gradient-to-b from-primary-50/80 to-white shadow-lg shadow-primary-500/10 sm:scale-[1.02]'
              : '';
            const inner = (
              <>
                <div
                  className={`mb-3 flex h-12 w-12 items-center justify-center rounded-2xl ${s.iconBg} ${s.iconColor} sm:h-14 sm:w-14`}
                >
                  <Icon className="h-6 w-6 sm:h-7 sm:w-7" aria-hidden />
                </div>
                <span className="text-sm font-bold text-slate-900 sm:text-base">{s.label}</span>
                <span className="mt-1 max-w-[12rem] text-[11px] leading-snug text-slate-500 sm:text-xs">{s.hint}</span>
                {s.badge && (
                  <span className="absolute right-3 top-3 rounded-full bg-violet-100 px-2 py-0.5 text-[10px] font-bold text-violet-700">
                    {s.badge}
                  </span>
                )}
                <span className="mt-3 text-xs font-semibold text-primary-600 group-hover:underline">Open now →</span>
              </>
            );
            const className = `${spotlightClass} ${activeRing}`;
            if (s.onClick) {
              return (
                <button key={s.id} type="button" onClick={s.onClick} className={className}>
                  {inner}
                </button>
              );
            }
            return (
              <Link key={s.id} href={s.href!} className={className}>
                {inner}
              </Link>
            );
          })}
        </div>

        <div
          className="mb-10 flex items-center gap-4"
          role="separator"
          aria-hidden
        >
          <span className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
          <span className="shrink-0 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Browse by category</span>
          <span className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        </div>

        {/* Four symmetric category quadrants */}
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          {categories.map((cat, catIndex) => {
            const CatIcon = cat.icon;
            const num = String(catIndex + 1).padStart(2, '0');
            return (
              <section
                key={cat.title}
                className="flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-gradient-to-br from-slate-50/95 via-white to-white p-4 shadow-sm ring-1 ring-slate-900/[0.03] sm:p-5 lg:p-6"
                aria-labelledby={`cat-${cat.title.replace(/\s+/g, '-')}`}
              >
                <div className="mb-4 flex items-center gap-3 border-b border-slate-100 pb-4">
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-xs font-black tabular-nums text-slate-500"
                    aria-hidden
                  >
                    {num}
                  </span>
                  <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${cat.accent}`}>
                    <CatIcon className="h-5 w-5" aria-hidden />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 id={`cat-${cat.title.replace(/\s+/g, '-')}`} className="text-base font-bold text-slate-900 sm:text-lg">
                      {cat.title}
                    </h2>
                    <p className="text-xs text-slate-500 sm:text-sm">{cat.subtitle}</p>
                  </div>
                </div>
                <div className="grid flex-1 grid-cols-2 gap-3 sm:gap-3.5">
                  {cat.tiles.map((t) => {
                    const TIcon = t.icon;
                    return (
                      <Link key={t.href + t.label} href={t.href} className={tileClass}>
                        <TileContent
                          icon={TIcon}
                          label={t.label}
                          hint={t.hint}
                          badge={t.badge}
                          iconWrapClass="bg-white text-primary-600 shadow-sm ring-1 ring-slate-100"
                        />
                      </Link>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>

        {/* Bottom symmetric row — more tools */}
        <div className="mt-8 rounded-2xl border border-dashed border-slate-200/90 bg-gradient-to-b from-slate-50/80 to-slate-50/40 p-4 shadow-inner sm:p-5">
          <div className="mb-4 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Still exploring?</p>
            <p className="mt-1 text-sm font-semibold text-slate-800">More tools</p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {extraRow.map((t) => {
              const TIcon = t.icon;
              const isHub = t.href === '/tools/json';
              return (
                <Link
                  key={t.href}
                  href={t.href}
                  className={`${tileClass} ${isHub ? 'border-primary-100 bg-primary-50/40 hover:bg-primary-50/70' : ''}`}
                >
                  <TileContent
                    icon={TIcon}
                    label={t.label}
                    hint={t.hint}
                    iconWrapClass={
                      isHub
                        ? 'bg-primary-100 text-primary-700 ring-primary-200'
                        : 'bg-white text-slate-600 shadow-sm ring-1 ring-slate-100 group-hover:text-primary-600'
                    }
                  />
                </Link>
              );
            })}
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
