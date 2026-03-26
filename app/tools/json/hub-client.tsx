'use client';

import { useMemo, useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import {
  AlertCircle,
  AlignLeft,
  ArrowLeft,
  ArrowRight,
  ArrowRightLeft,
  BarChart3,
  Binary,
  Braces,
  CheckCircle,
  Clock,
  Code,
  Code2,
  Database,
  Download,
  FileCode,
  FileCode2,
  FileJson,
  FileSearch,
  Fingerprint,
  Flame,
  Gauge,
  GitCompare,
  Globe,
  Grid3x3,
  Hash,
  Key,
  KeyRound,
  Layers,
  Link2,
  Lock,
  Package,
  Regex,
  Scissors,
  ScrollText,
  Search,
  Settings2,
  Shield,
  ShieldCheck,
  Sparkles,
  SplitSquareHorizontal,
  Table,
  Terminal,
  TestTube2,
  Webhook,
  Wrench,
  X,
  Zap,
} from 'lucide-react';
import type { ToolCategory } from './tools-data';
import { CATEGORY_LABELS, TOOLS_DIRECTORY, TOOL_COUNT } from './tools-data';
import MaskingHeroAnimation from './MaskingHeroAnimation';

const TOOL_ICON_MAP: Record<string, LucideIcon> = {
  FileJson, Code, CheckCircle, Wrench, Table, Layers, GitCompare, Braces,
  ScrollText, FileSearch, Package, BarChart3, Database, ArrowRightLeft,
  Settings2, Shield, Lock, FileCode2, Scissors, Terminal, FileCode, Code2,
  Download, AlertCircle, Webhook, TestTube2, Globe, KeyRound, Binary,
  Fingerprint, Hash, Link2, Key, ShieldCheck, SplitSquareHorizontal,
  AlignLeft, Regex, Grid3x3, Gauge, Clock,
};

const CATEGORIES: (ToolCategory | 'all')[] = ['all', 'json', 'ai', 'api', 'encode', 'dev'];

const CAT_COLOR: Record<ToolCategory, { icon: string; badge: string; accent: string; dot: string }> = {
  json:   { icon: 'bg-emerald-100 text-emerald-700', badge: 'bg-emerald-50 text-emerald-700 border-emerald-200', accent: 'hover:border-emerald-300', dot: 'bg-emerald-500' },
  ai:     { icon: 'bg-violet-100 text-violet-700',   badge: 'bg-violet-50 text-violet-700 border-violet-200',   accent: 'hover:border-violet-300',   dot: 'bg-violet-500' },
  api:    { icon: 'bg-sky-100 text-sky-700',         badge: 'bg-sky-50 text-sky-700 border-sky-200',           accent: 'hover:border-sky-300',       dot: 'bg-sky-500' },
  encode: { icon: 'bg-amber-100 text-amber-700',     badge: 'bg-amber-50 text-amber-700 border-amber-200',     accent: 'hover:border-amber-300',     dot: 'bg-amber-500' },
  dev:    { icon: 'bg-zinc-100 text-zinc-700',       badge: 'bg-zinc-50 text-zinc-600 border-zinc-200',        accent: 'hover:border-zinc-300',       dot: 'bg-zinc-400' },
};

const CAT_COUNTS = CATEGORIES.reduce<Record<string, number>>((acc, c) => {
  acc[c] = c === 'all' ? TOOL_COUNT : TOOLS_DIRECTORY.filter((t) => t.category === c).length;
  return acc;
}, {});

function ToolIcon({ name, className }: { name: string; className?: string }) {
  const Icon = TOOL_ICON_MAP[name] ?? Wrench;
  return <Icon className={className} aria-hidden />;
}

const STATS = [
  { value: `${TOOL_COUNT}`, label: 'tools' },
  { value: '100%', label: 'browser-side' },
  { value: 'Zero', label: 'data stored' },
  { value: 'Free', label: 'forever' },
];

export default function ToolsJsonHubClient() {
  const [cat, setCat] = useState<ToolCategory | 'all'>('all');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    let list = cat === 'all'
      ? TOOLS_DIRECTORY.filter((t) => t.category !== 'ai')
      : TOOLS_DIRECTORY.filter((t) => t.category === cat);

    if (query.trim()) {
      const q = query.toLowerCase();
      list = TOOLS_DIRECTORY.filter((t) =>
        t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q)
      );
    }
    return list;
  }, [cat, query]);

  const aiTools = useMemo(() => TOOLS_DIRECTORY.filter((t) => t.category === 'ai'), []);
  const popularTools = useMemo(() => TOOLS_DIRECTORY.filter((t) => t.badge === 'popular').slice(0, 5), []);

  const isSearching = query.trim().length > 0;

  return (
    <div className="min-h-screen bg-[#F8F8F8]">

      {/* ── HERO ────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-zinc-950 pb-14 pt-10 sm:pb-16 sm:pt-12">
        {/* ambient glow */}
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute -left-32 -top-20 h-[500px] w-[500px] rounded-full bg-emerald-600/20 blur-[120px]" />
          <div className="absolute -bottom-10 right-0 h-[400px] w-[500px] rounded-full bg-violet-600/15 blur-[100px]" />
          <div className="absolute left-1/2 top-1/2 h-px w-[90%] -translate-x-1/2 -translate-y-1/2 bg-white/[0.03]" />
        </div>

        <div className="relative mx-auto max-w-[1100px] px-5 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_min(440px,44%)]">

            {/* ── LEFT: headline + search + stats ── */}
            <div>
              {/* eyebrow */}
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

              {/* headline */}
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

              {/* ── Search bar ── */}
              <div className="mt-7 flex w-full max-w-lg items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 ring-1 ring-transparent transition-all focus-within:border-emerald-500/40 focus-within:bg-white/[0.08] focus-within:ring-emerald-500/20">
                <Search className="h-4 w-4 shrink-0 text-zinc-500" aria-hidden />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search tools…"
                  className="flex-1 bg-transparent text-[14px] text-white placeholder:text-zinc-500 focus:outline-none"
                  aria-label="Search all tools"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery('')}
                    className="rounded p-0.5 text-zinc-500 hover:text-zinc-300"
                    aria-label="Clear search"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>

              {/* stats strip */}
              <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3">
                {STATS.map((s) => (
                  <div key={s.label} className="flex items-baseline gap-1.5">
                    <span className="text-lg font-bold text-white sm:text-xl">{s.value}</span>
                    <span className="text-[12px] text-zinc-500">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── RIGHT: live masking animation ── */}
            <div className="hidden lg:block lg:h-[360px]">
              <MaskingHeroAnimation />
            </div>

          </div>
        </div>
      </section>

      {/* ── POPULAR QUICK-ACCESS ────────────────────────── */}
      {!isSearching && (
        <section className="border-b border-zinc-200 bg-white">
          <div className="mx-auto max-w-[1100px] px-5 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 overflow-x-auto py-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <span className="flex shrink-0 items-center gap-1.5 pr-3 font-mono text-[10px] uppercase tracking-[0.12em] text-zinc-400">
                <Flame className="h-3 w-3 text-amber-500" />
                Popular
              </span>
              {popularTools.map((t) => (
                <Link
                  key={t.href}
                  href={t.href}
                  className="group flex shrink-0 items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-[13px] font-medium text-zinc-700 transition-all hover:border-zinc-300 hover:bg-white hover:text-zinc-900 hover:shadow-sm"
                >
                  <span className={`flex h-5 w-5 items-center justify-center rounded ${CAT_COLOR[t.category].icon}`}>
                    <ToolIcon name={t.icon} className="h-3 w-3" />
                  </span>
                  {t.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <div className="mx-auto max-w-[1100px] px-5 py-10 sm:px-6 sm:py-12 lg:px-8">

        {/* ── AI SAFETY FEATURE STRIP ─────────────────── */}
        {!isSearching && cat === 'all' && (
          <section className="mb-12" aria-labelledby="ai-strip-heading">
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.13em] text-violet-600">AI Safety</p>
                <h2 id="ai-strip-heading" className="text-[1.25rem] font-semibold tracking-tight text-zinc-900">
                  Mask before you prompt
                </h2>
                <p className="mt-1 text-[13.5px] text-zinc-500">
                  Protect sensitive data before pasting into ChatGPT, Claude, or Copilot.
                </p>
              </div>
              <button
                type="button"
                onClick={() => { setCat('ai'); setQuery(''); }}
                className="hidden shrink-0 items-center gap-1 text-[13px] font-semibold text-violet-700 hover:text-violet-900 sm:flex"
              >
                See all
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {aiTools.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-violet-200/60 bg-gradient-to-br from-violet-50 via-white to-fuchsia-50/40 p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-violet-300 hover:shadow-md"
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-violet-700 ring-1 ring-inset ring-violet-200/60">
                    <ToolIcon name={tool.icon} className="h-5 w-5" />
                  </div>
                  <p className="text-[13.5px] font-semibold text-zinc-900 group-hover:text-violet-900">{tool.name}</p>
                  <p className="mt-1 flex-1 text-[12.5px] leading-relaxed text-zinc-500">{tool.description}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-[12px] font-semibold text-violet-700">
                    Open tool
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ── CATEGORY TABS + HEADING ──────────────────── */}
        {!isSearching && (
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-[1.1rem] font-semibold text-zinc-900">
              {cat === 'all' ? 'All tools' : CATEGORY_LABELS[cat]}
              <span className="ml-2 font-normal text-zinc-400 text-[14px]">({CAT_COUNTS[cat]})</span>
            </h2>
            <div
              role="tablist"
              aria-label="Filter by category"
              className="flex gap-1 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {CATEGORIES.map((id) => (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  aria-selected={cat === id}
                  onClick={() => setCat(id)}
                  className={`shrink-0 rounded-full border px-3.5 py-1.5 text-[12.5px] font-semibold transition-all ${
                    cat === id
                      ? 'border-zinc-900 bg-zinc-900 text-white shadow-sm'
                      : 'border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-900'
                  }`}
                >
                  {CATEGORY_LABELS[id]}
                  <span className={`ml-1.5 text-[10px] tabular-nums ${cat === id ? 'opacity-60' : 'opacity-50'}`}>
                    {CAT_COUNTS[id]}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── SEARCH RESULT HEADING ───────────────────── */}
        {isSearching && (
          <div className="mb-6 flex items-center justify-between">
            <p className="text-[14px] text-zinc-600">
              <span className="font-semibold text-zinc-900">{filtered.length}</span> result{filtered.length !== 1 ? 's' : ''} for{' '}
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

        {/* ── TOOL GRID ───────────────────────────────── */}
        <div
          className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3"
          role="tabpanel"
          aria-live="polite"
        >
          {filtered.map((tool) => {
            const col = CAT_COLOR[tool.category];
            return (
              <Link
                key={`${tool.href}-${tool.name}`}
                href={tool.href}
                className={`group relative flex flex-col rounded-2xl border border-zinc-200 bg-white p-4 shadow-[0_1px_4px_rgba(0,0,0,0.05)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(0,0,0,0.09)] ${col.accent}`}
              >
                {/* top row: icon + badge */}
                <div className="mb-3 flex items-start justify-between gap-2">
                  <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${col.icon}`}>
                    <ToolIcon name={tool.icon} className="h-4.5 w-4.5 h-[18px] w-[18px]" />
                  </div>
                  <div className="flex gap-1">
                    {tool.badge === 'popular' && (
                      <span className="inline-flex items-center gap-0.5 rounded-md border border-amber-200 bg-amber-50 px-1.5 py-0.5 font-mono text-[9.5px] font-bold uppercase tracking-wide text-amber-700">
                        <Flame className="h-2.5 w-2.5" />Hot
                      </span>
                    )}
                    {tool.badge === 'ai' && (
                      <span className="inline-flex items-center gap-0.5 rounded-md border border-violet-200 bg-violet-50 px-1.5 py-0.5 font-mono text-[9.5px] font-bold uppercase tracking-wide text-violet-700">
                        <Sparkles className="h-2.5 w-2.5" />AI
                      </span>
                    )}
                    {tool.badge === 'new' && (
                      <span className="inline-flex items-center gap-0.5 rounded-md border border-emerald-200 bg-emerald-50 px-1.5 py-0.5 font-mono text-[9.5px] font-bold uppercase tracking-wide text-emerald-700">
                        New
                      </span>
                    )}
                  </div>
                </div>

                {/* title + description */}
                <p className="text-[14px] font-semibold leading-snug text-zinc-900 group-hover:text-zinc-950">
                  {tool.name}
                </p>
                <p className="mt-1 flex-1 text-[12.5px] leading-relaxed text-zinc-500">
                  {tool.description}
                </p>

                {/* footer */}
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className={`h-1.5 w-1.5 rounded-full ${col.dot}`} />
                    <span className="text-[11px] text-zinc-400">{CATEGORY_LABELS[tool.category]}</span>
                  </div>
                  <span className="flex items-center gap-0.5 text-[11.5px] font-semibold text-zinc-400 transition-colors group-hover:text-zinc-700">
                    Open
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" aria-hidden />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* ── EMPTY STATE ─────────────────────────────── */}
        {filtered.length === 0 && (
          <div className="mt-16 flex flex-col items-center gap-3 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-400">
              <Search className="h-6 w-6" />
            </div>
            <p className="text-[15px] font-semibold text-zinc-900">No tools found</p>
            <p className="text-[13.5px] text-zinc-500">
              Try a different search term or{' '}
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

        {/* ── BOTTOM NAV ──────────────────────────────── */}
        <div className="mt-14 flex flex-col items-center gap-4">
          <div className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-2.5 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span className="text-[13px] text-zinc-600">
              All <strong className="font-semibold text-zinc-900">{TOOL_COUNT} tools</strong> are free forever — no account needed
            </span>
          </div>
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
