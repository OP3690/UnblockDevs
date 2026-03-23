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
  ChevronsDown,
  ScrollText,
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
  Zap,
} from 'lucide-react';
import type { ToolCategory } from './tools-data';
import { CATEGORY_LABELS, TOOLS_DIRECTORY, TOOL_COUNT } from './tools-data';
import MaskingHeroAnimation from './MaskingHeroAnimation';

/** Explicit map — avoid `import * from 'lucide-react'` (breaks Next/Webpack chunks). */
const TOOL_ICON_MAP: Record<string, LucideIcon> = {
  FileJson,
  Code,
  CheckCircle,
  Wrench,
  Table,
  Layers,
  GitCompare,
  Braces,
  ScrollText,
  FileSearch,
  Package,
  BarChart3,
  Database,
  ArrowRightLeft,
  Settings2,
  Shield,
  Lock,
  FileCode2,
  Scissors,
  Terminal,
  FileCode,
  Code2,
  Download,
  AlertCircle,
  Webhook,
  TestTube2,
  Globe,
  KeyRound,
  Binary,
  Fingerprint,
  Hash,
  Link2,
  Key,
  ShieldCheck,
  SplitSquareHorizontal,
  AlignLeft,
  Regex,
  Grid3x3,
  Gauge,
  Clock,
};

const CATEGORIES: (ToolCategory | 'all')[] = ['all', 'json', 'ai', 'api', 'encode', 'dev'];

const CARD_ACCENT: Record<ToolCategory, string> = {
  json: 'bg-gradient-to-br from-emerald-500/[0.08] via-white to-teal-500/[0.04] border-emerald-200/70 hover:border-emerald-400/50 hover:shadow-emerald-500/10',
  ai: 'bg-gradient-to-br from-violet-500/[0.1] via-white to-fuchsia-500/[0.04] border-violet-200/70 hover:border-violet-400/50 hover:shadow-violet-500/10',
  api: 'bg-gradient-to-br from-sky-500/[0.08] via-white to-blue-500/[0.04] border-sky-200/70 hover:border-sky-400/50 hover:shadow-sky-500/10',
  encode: 'bg-gradient-to-br from-amber-500/[0.08] via-white to-orange-500/[0.04] border-amber-200/70 hover:border-amber-400/50 hover:shadow-amber-500/10',
  dev: 'bg-gradient-to-br from-zinc-400/[0.12] via-white to-slate-500/[0.04] border-zinc-200/70 hover:border-zinc-400/50 hover:shadow-zinc-500/10',
};

const ICON_WRAP: Record<ToolCategory, string> = {
  json: 'bg-emerald-100 text-emerald-800 ring-emerald-200/60',
  ai: 'bg-violet-100 text-violet-800 ring-violet-200/60',
  api: 'bg-sky-100 text-sky-800 ring-sky-200/60',
  encode: 'bg-amber-100 text-amber-900 ring-amber-200/60',
  dev: 'bg-zinc-100 text-zinc-800 ring-zinc-200/60',
};

function ToolIcon({ name, className }: { name: string; className?: string }) {
  const Icon = TOOL_ICON_MAP[name] ?? Wrench;
  return <Icon className={className} aria-hidden />;
}

export default function ToolsJsonHubClient() {
  const [cat, setCat] = useState<ToolCategory | 'all'>('all');

  const filtered = useMemo(() => {
    if (cat === 'all') {
      /* AI tools already in the featured strip above — avoid duplicate cards */
      return TOOLS_DIRECTORY.filter((t) => t.category !== 'ai');
    }
    return TOOLS_DIRECTORY.filter((t) => t.category === cat);
  }, [cat]);

  const aiTools = useMemo(() => TOOLS_DIRECTORY.filter((t) => t.category === 'ai'), []);

  return (
    <div className="min-h-0 bg-[#FAFAFA]">
      <div className="ud-content-tool pb-16 pt-8 sm:pb-20 sm:pt-10 lg:pt-12">
        {/* Hero — distinctive, shareable hook */}
        <header className="relative mb-10 overflow-hidden rounded-3xl border border-zinc-200/80 bg-zinc-950 text-white shadow-2xl shadow-zinc-900/20 sm:mb-12">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.35]"
            style={{
              backgroundImage: `radial-gradient(ellipse 120% 80% at 20% 0%, rgba(16,185,129,0.45), transparent 50%),
                radial-gradient(ellipse 90% 70% at 100% 100%, rgba(99,102,241,0.35), transparent 45%),
                linear-gradient(180deg, rgba(255,255,255,0.04), transparent)`,
            }}
            aria-hidden
          />
          <div className="relative px-6 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-14">
            <div className="grid items-center gap-10 lg:grid-cols-[1fr_min(380px,42%)] lg:gap-12 xl:min-h-[320px]">
              <div className="min-w-0">
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald-200">
                    <Zap className="h-3.5 w-3.5 text-amber-300" aria-hidden />
                    Free · No signup
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-zinc-300">
                    <Sparkles className="h-3.5 w-3.5 text-violet-300" aria-hidden />
                    {TOOL_COUNT} tools · 100% browser-side
                  </span>
                </div>
                <h1 className="max-w-4xl text-3xl font-bold tracking-tight sm:text-4xl lg:text-[2.5rem] lg:leading-[1.12] xl:text-[2.65rem]">
                  The developer tools directory —{' '}
                  <span className="text-white">AI Schema Masker</span>,{' '}
                  <span className="text-white">Code Prompt Shield</span> &amp;{' '}
                  <span className="text-white">JSON Prompt Shield</span>
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-300 sm:text-lg">
                  One bookmark for <strong className="font-semibold text-white">masking SQL before ChatGPT</strong>,{' '}
                  <strong className="font-semibold text-white">scrubbing secrets in code</strong>, and{' '}
                  <strong className="font-semibold text-white">abstracting JSON keys &amp; values</strong> — then format JSON,
                  diff APIs, encode, hash, and the utilities devs paste into Slack. Everything runs locally; your payloads never
                  hit our servers.
                </p>
                <p className="mt-3 max-w-2xl font-mono text-sm leading-relaxed text-emerald-200/90">
                  → Still built for the &quot;can someone pretty-print this JSON?&quot; moment — now with AI-safe masking first.
                </p>
                <a
                  href="#all-tools"
                  className="group mt-5 inline-flex max-w-full flex-row flex-nowrap items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 outline-none transition hover:border-emerald-400/35 hover:bg-white/[0.07] focus-visible:ring-2 focus-visible:ring-emerald-400/70 motion-reduce:transition-none"
                  aria-label="Scroll to all tools"
                >
                  <span className="whitespace-nowrap font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-200/95 motion-safe:animate-hub-all-tools-hint">
                    Scroll for All Tools
                  </span>
                  <ChevronsDown
                    className="h-4 w-4 shrink-0 text-emerald-300/90 motion-safe:animate-hub-all-tools-chevron motion-reduce:opacity-90"
                    strokeWidth={2.25}
                    aria-hidden
                  />
                </a>
              </div>
              <div className="min-w-0 lg:justify-self-end lg:self-stretch">
                <MaskingHeroAnimation />
              </div>
            </div>
          </div>
        </header>

        <div id="all-tools" className="scroll-mt-28">
        {/* AI featured strip — only on full directory view */}
        {cat === 'all' ? (
        <section aria-labelledby="ai-tools-strip" className="mb-10 sm:mb-12">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 id="ai-tools-strip" className="text-lg font-semibold tracking-tight text-zinc-900 sm:text-xl">
                AI safety — mask before you prompt
              </h2>
              <p className="mt-1 max-w-xl text-sm text-zinc-600">
                Share screenshots of these tools, not raw production JSON. Reversible masking in your browser.
              </p>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {aiTools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className={`group relative flex flex-col rounded-2xl border p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${CARD_ACCENT.ai}`}
              >
                <div
                  className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ring-1 ring-inset ${ICON_WRAP.ai}`}
                >
                  <ToolIcon name={tool.icon} className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-semibold text-zinc-900 group-hover:text-violet-900">{tool.name}</h3>
                <p className="mt-1 flex-1 text-xs leading-relaxed text-zinc-600">{tool.description}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-violet-700">
                  Open
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
                </span>
              </Link>
            ))}
          </div>
        </section>
        ) : null}

        {/* Category filter */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-lg font-semibold text-zinc-900 sm:text-xl">
            {cat === 'all' ? 'Browse by category' : CATEGORY_LABELS[cat]}
          </h2>
          <div
            role="tablist"
            aria-label="Filter by category"
            className="flex gap-1 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {CATEGORIES.map((id) => (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={cat === id}
                onClick={() => setCat(id)}
                className={`shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all sm:text-[13px] ${
                  cat === id
                    ? 'border-zinc-900 bg-zinc-900 text-white shadow-md'
                    : 'border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:bg-zinc-50'
                }`}
              >
                {CATEGORY_LABELS[id]}
                {id === 'all' ? (
                  <span className="ml-1.5 tabular-nums text-[10px] opacity-80">({TOOL_COUNT})</span>
                ) : null}
              </button>
            ))}
          </div>
        </div>

        {/* Tool grid */}
        <div
          className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3"
          role="tabpanel"
          aria-live="polite"
        >
          {filtered.map((tool) => (
            <Link
              key={`${tool.href}-${tool.name}`}
              href={tool.href}
              className={`group relative flex min-h-[120px] flex-col rounded-2xl border p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg ${CARD_ACCENT[tool.category]}`}
            >
              <div className="mb-2 flex items-start justify-between gap-2">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ring-1 ring-inset ${ICON_WRAP[tool.category]}`}
                >
                  <ToolIcon name={tool.icon} className="h-5 w-5" />
                </div>
                <div className="flex flex-wrap justify-end gap-1">
                  {tool.badge === 'popular' ? (
                    <span className="rounded-md bg-amber-100 px-1.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wide text-amber-900">
                      Hot
                    </span>
                  ) : null}
                  {tool.badge === 'ai' ? (
                    <span className="rounded-md bg-violet-100 px-1.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wide text-violet-900">
                      AI
                    </span>
                  ) : null}
                  {tool.badge === 'new' ? (
                    <span className="rounded-md bg-emerald-100 px-1.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wide text-emerald-900">
                      New
                    </span>
                  ) : null}
                </div>
              </div>
              <h3 className="text-sm font-semibold text-zinc-900 sm:text-[15px]">{tool.name}</h3>
              <p className="mt-1 flex-1 text-xs leading-relaxed text-zinc-600 sm:text-[13px]">{tool.description}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-emerald-800 opacity-90 group-hover:opacity-100">
                Launch
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </span>
            </Link>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="mt-8 text-center text-sm text-zinc-500">No tools in this category.</p>
        ) : null}
        </div>

        <p className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-800 underline-offset-4 hover:underline"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Back to JSON workbench on home
          </Link>
        </p>
      </div>
    </div>
  );
}
