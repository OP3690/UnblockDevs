'use client';

import Link from 'next/link';
import { useState, useMemo } from 'react';
import { ArrowRight, Check, Clock, Search } from 'lucide-react';

type Cat = 'all' | 'ai' | 'json' | 'api' | 'encode' | 'dev';

const TABS: { id: Cat; label: string }[] = [
  { id: 'all', label: 'All tools' },
  { id: 'ai', label: 'AI safety' },
  { id: 'json', label: 'JSON' },
  { id: 'api', label: 'API & cURL' },
  { id: 'encode', label: 'Encoding' },
  { id: 'dev', label: 'Dev utilities' },
];

type MiniDef = {
  label: string;
  cats: Cat[];
  variant?: 'ai' | 'hot' | 'new';
  href: string;
};

export default function HomePrivacyFirstSections({
  toolPageUrls,
}: {
  toolPageUrls: Record<string, string>;
}) {
  const [cat, setCat] = useState<Cat>('all');
  const [search, setSearch] = useState('');

  const miniTools: MiniDef[] = useMemo(
    () => [
      { label: 'JSON Beautifier', cats: ['all', 'json'], href: '/json-beautifier' },
      { label: 'JSON Formatter', cats: ['all', 'json'], variant: 'hot', href: '/json-formatter' },
      { label: 'JSON Validator', cats: ['all', 'json'], href: '/json-validator' },
      { label: 'SQL Formatter', cats: ['all', 'json', 'dev'], variant: 'hot', href: toolPageUrls.sql },
      { label: 'JWT Decoder', cats: ['all', 'json', 'dev'], href: '/jwt-decoder' },
      { label: 'Base64 Encoder', cats: ['all', 'encode'], href: '/base64-encoder' },
      { label: 'UUID Generator', cats: ['all', 'encode'], href: '/uuid-generator' },
      { label: 'CORS Tester', cats: ['all', 'api', 'dev'], href: '/cors-tester' },
      { label: 'Hash Generator', cats: ['all', 'encode'], href: '/hash-generator' },
      { label: 'URL Encoder', cats: ['all', 'encode'], href: '/url-encoder' },
      { label: 'Regex Tester', cats: ['all', 'dev'], href: toolPageUrls.regextester },
      { label: 'JSON to Excel', cats: ['all', 'json'], href: '/json-to-excel' },
      { label: 'Smart JSON Diff', cats: ['all', 'json'], href: toolPageUrls.jsoncompare },
      { label: 'Log Unpacker', cats: ['all', 'json', 'ai'], href: toolPageUrls.builder },
      { label: 'cURL Converter', cats: ['all', 'api'], href: toolPageUrls.curl },
      { label: 'HAR to cURL', cats: ['all', 'api'], href: toolPageUrls.hartocurl },
      { label: 'cURL Analyzer', cats: ['all', 'api'], href: toolPageUrls.curlfailure },
      { label: 'Token Compare', cats: ['all', 'json', 'dev'], href: toolPageUrls.tokencompare },
      { label: 'Password Gen', cats: ['all', 'encode', 'dev'], href: '/password-generator' },
      { label: 'Truth Table', cats: ['all', 'dev'], href: '/truth-table-generator' },
      { label: 'Test Data Gen', cats: ['all', 'api', 'dev'], href: toolPageUrls.testdata },
      { label: 'Mock API', cats: ['all', 'api'], href: toolPageUrls.mock },
      { label: 'Prompt Chunker', cats: ['all', 'ai'], variant: 'ai', href: toolPageUrls.promptchunk },
      { label: 'Speed Test', cats: ['all', 'dev'], href: '/speed-test' },
      { label: 'Timezone', cats: ['all', 'dev'], href: toolPageUrls.timezone },
      { label: 'Schema Gen', cats: ['all', 'json'], href: toolPageUrls.schema },
      { label: 'SVG to Image', cats: ['all', 'dev'], variant: 'new', href: '/svg-to-image' },
      { label: 'Data Insights', cats: ['all', 'dev'], variant: 'new', href: '/data-insights' },
      { label: 'Password Audit', cats: ['all', 'dev', 'encode'], variant: 'new', href: '/password-audit' },
      { label: 'JSON Stringify', cats: ['all', 'json'], href: '/json-stringify-online' },
      { label: 'Payload Analyzer', cats: ['all', 'api'], href: toolPageUrls.payload },
      { label: 'API Comparator', cats: ['all', 'api'], href: toolPageUrls.comparator },
      { label: 'Config Compare', cats: ['all', 'api', 'dev'], href: toolPageUrls.config },
      { label: 'JSON Fixer', cats: ['all', 'json'], href: '/json-fixer-online' },
      { label: 'PDF to Excel', cats: ['all', 'dev'], variant: 'new', href: '/pdf-to-excel-word' },
    ],
    [toolPageUrls],
  );

  const visibleMini = useMemo(() => {
    const q = search.trim().toLowerCase();
    let list = cat === 'all' ? miniTools : miniTools.filter((t) => t.cats.includes(cat));
    if (q) list = list.filter((t) => t.label.toLowerCase().includes(q));
    return list;
  }, [cat, miniTools, search]);

  return (
    <>
      {/* ── Tools ─────────────────────────────────────────────── */}
      <section id="home-tools" className="mx-auto max-w-[1100px] px-6 py-14 sm:py-18">
        <header className="mb-10">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-zinc-400">Tools</p>
          <h2 className="mt-2 text-[28px] font-semibold tracking-[-0.025em] text-zinc-900">
            Everything you need, daily
          </h2>
          <p className="mt-2 max-w-[520px] text-[15px] leading-relaxed text-zinc-500">
            From JSON formatting to AI-safe data masking. All tools run in your browser with zero server
            calls for your payloads.
          </p>
        </header>

        {/* Search bar */}
        <div className="mb-5 relative max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" aria-hidden />
          <input
            type="search"
            value={search}
            onChange={(e) => { setSearch(e.target.value); if (e.target.value) setCat('all'); }}
            placeholder="Search tools…"
            aria-label="Search tools"
            className="h-10 w-full rounded-lg border border-zinc-200 bg-white pl-9 pr-4 text-[13.5px] text-zinc-700 shadow-sm placeholder:text-zinc-400 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200 transition-colors"
          />
        </div>

        {/* Category tabs */}
        <div className="mb-7 flex gap-0.5 overflow-x-auto border-b border-zinc-200 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setCat(t.id)}
              className={`shrink-0 whitespace-nowrap border-b-2 px-4 py-2.5 text-[13px] font-medium transition-colors ${
                cat === t.id
                  ? 'border-zinc-900 text-zinc-900'
                  : 'border-transparent text-zinc-500 hover:text-zinc-700'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Featured cards — top 3 */}
        <div className="mb-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {/* AI Schema Masker — primary */}
          <Link
            href={toolPageUrls.schemamasker}
            className="group flex flex-col gap-4 rounded-xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-6 shadow-sm transition-all hover:border-emerald-400 hover:shadow-md hover:shadow-emerald-900/10"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-200 bg-white text-xl shadow-sm">
                🛡️
              </div>
              <div className="flex gap-1.5">
                <span className="rounded-full bg-blue-50 px-2 py-0.5 font-mono text-[10px] font-semibold text-blue-700">
                  AI
                </span>
                <span className="rounded-full bg-amber-100 px-2 py-0.5 font-mono text-[10px] font-semibold text-amber-800">
                  Popular
                </span>
              </div>
            </div>
            <div>
              <p className="text-[15px] font-semibold text-zinc-900">AI Schema Masker</p>
              <p className="mt-1.5 text-[13px] leading-relaxed text-zinc-500">
                Mask SQL table and column names before sending to ChatGPT. Fully reversible with one click.
              </p>
            </div>
            <span className="mt-auto inline-flex items-center gap-1.5 text-[13px] font-semibold text-emerald-700 transition-gap group-hover:gap-2">
              Open tool
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>

          {/* JSON Prompt Shield */}
          <Link
            href={toolPageUrls.jsonpromptshield}
            className="group flex flex-col gap-4 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:border-zinc-300 hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-xl shadow-sm">
                🔒
              </div>
              <span className="rounded-full bg-blue-50 px-2 py-0.5 font-mono text-[10px] font-semibold text-blue-700">
                AI
              </span>
            </div>
            <div>
              <p className="text-[15px] font-semibold text-zinc-900">JSON Prompt Shield</p>
              <p className="mt-1.5 text-[13px] leading-relaxed text-zinc-500">
                Mask JSON keys and values before AI. Keys → K_00001, strings → S_00001. Numbers
                unchanged.
              </p>
            </div>
            <span className="mt-auto inline-flex items-center gap-1.5 text-[13px] font-semibold text-emerald-700 transition-gap group-hover:gap-2">
              Open tool
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>

          {/* Code Prompt Shield */}
          <Link
            href={toolPageUrls.codemasker}
            className="group flex flex-col gap-4 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:border-zinc-300 hover:shadow-md sm:col-span-2 lg:col-span-1"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-amber-100 bg-amber-50 text-xl shadow-sm">
                🔐
              </div>
              <span className="rounded-full bg-blue-50 px-2 py-0.5 font-mono text-[10px] font-semibold text-blue-700">
                AI
              </span>
            </div>
            <div>
              <p className="text-[15px] font-semibold text-zinc-900">Code Prompt Shield</p>
              <p className="mt-1.5 text-[13px] leading-relaxed text-zinc-500">
                Mask API keys, variable names, and secrets in code before sending to Copilot or ChatGPT.
              </p>
            </div>
            <span className="mt-auto inline-flex items-center gap-1.5 text-[13px] font-semibold text-emerald-700 transition-gap group-hover:gap-2">
              Open tool
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        </div>

        {/* Mini tool grid */}
        {visibleMini.length === 0 && (
          <p className="py-8 text-center text-[13.5px] text-zinc-400">
            No tools found for &ldquo;{search}&rdquo; — try a different keyword.
          </p>
        )}
        <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3 lg:grid-cols-6">
          {visibleMini.map((t) => {
            const dot =
              t.variant === 'ai'
                ? 'bg-blue-500'
                : t.variant === 'hot'
                  ? 'bg-amber-500'
                  : t.variant === 'new'
                    ? 'bg-violet-500'
                    : 'bg-zinc-300';
            const cls =
              'flex min-h-[44px] items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 py-2.5 text-left text-[13px] font-medium text-zinc-700 transition-colors hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-900';
            return (
              <Link key={t.label} href={t.href!} className={cls}>
                <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${dot}`} aria-hidden />
                <span className="flex-1 leading-tight">{t.label}</span>
                {t.variant === 'new' && (
                  <span className="shrink-0 rounded-full bg-violet-100 px-1.5 py-0.5 font-mono text-[9px] font-semibold text-violet-700">
                    NEW
                  </span>
                )}
                {t.variant === 'hot' && (
                  <span className="shrink-0 rounded-full bg-amber-100 px-1.5 py-0.5 font-mono text-[9px] font-semibold text-amber-700">
                    HOT
                  </span>
                )}
                {t.variant === 'ai' && (
                  <span className="shrink-0 rounded-full bg-blue-100 px-1.5 py-0.5 font-mono text-[9px] font-semibold text-blue-700">
                    AI
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        <p className="mt-7 text-center">
          <Link
            href="/tools/json"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-700 underline-offset-4 hover:underline"
          >
            Browse full JSON &amp; tools hub
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </p>
      </section>

      {/* ── How it works ───────────────────────────────────────── */}
      <section className="border-y border-zinc-200 bg-white">
        <div className="mx-auto max-w-[1100px] px-6 py-14 sm:py-18">
          <header className="mb-10">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-zinc-400">How it works</p>
            <h2 className="mt-2 text-[28px] font-semibold tracking-[-0.025em] text-zinc-900">
              Use AI safely in 4 steps
            </h2>
            <p className="mt-2 max-w-[480px] text-[15px] leading-relaxed text-zinc-500">
              The AI Schema Masker workflow — applicable to SQL, JSON, and code.
            </p>
          </header>

          <div className="grid gap-px overflow-hidden rounded-xl border border-zinc-200 bg-zinc-200 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                n: '01',
                icon: '📋',
                title: 'Paste your data',
                desc: 'Paste your SQL query, JSON payload, or source code into the tool. Nothing leaves your browser at this stage.',
              },
              {
                n: '02',
                icon: '🔒',
                title: 'Mask identifiers',
                desc: 'Click Mask. Real names become anonymous tokens — T_00001, C_00001. The mapping stays on your device.',
              },
              {
                n: '03',
                icon: '🤖',
                title: 'Send to AI safely',
                desc: 'Copy the masked version and send to ChatGPT or any AI. No real schema data is transmitted by our app.',
              },
              {
                n: '04',
                icon: '✅',
                title: 'Restore real names',
                desc: "Paste the AI's response. Click Restore. Your real identifiers are put back in one click.",
              },
            ].map((step) => (
              <div key={step.n} className="flex flex-col gap-3 bg-white p-6 sm:p-7 lg:p-8">
                <span className="font-mono text-[11px] font-medium text-zinc-400">{step.n}</span>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 text-lg">
                  {step.icon}
                </div>
                <h3 className="text-[15px] font-semibold text-zinc-900">{step.title}</h3>
                <p className="text-[13px] leading-relaxed text-zinc-500">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Privacy ────────────────────────────────────────────── */}
      <section className="mx-auto max-w-[1100px] px-6 py-14 sm:py-18">
        <div className="grid gap-10 overflow-hidden rounded-2xl bg-zinc-950 p-8 sm:grid-cols-2 sm:gap-14 sm:p-14">
          <div className="flex flex-col justify-center">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-zinc-500">
              Privacy by design
            </p>
            <h2 className="mt-3 text-[26px] font-semibold leading-snug tracking-[-0.025em] text-white">
              Your data never touches our servers
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-zinc-400">
              Every single tool on UnblockDevs runs entirely in your browser. We don&apos;t have servers
              that process your data — because we don&apos;t need them.
            </p>
            <Link
              href={toolPageUrls.schemamasker}
              className="mt-7 inline-flex w-fit items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-zinc-900 transition-opacity hover:opacity-90"
            >
              Try AI Schema Masker
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <ul className="flex flex-col gap-5">
            {[
              {
                title: 'No server-side processing',
                desc: 'All computation happens in your browser using JavaScript. No request is made to our backend.',
              },
              {
                title: 'No logging or telemetry',
                desc: "We don't log your SQL schemas, JSON payloads, API keys, or any other sensitive input.",
              },
              {
                title: 'GDPR, HIPAA, SOC 2 safe',
                desc: 'Suitable for regulated industries. Nothing is shared with third parties, ever.',
              },
              {
                title: 'Open architecture',
                desc: 'Built with Next.js. You can inspect every network request and verify no data leaves your device.',
              },
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

      {/* ── Blog ───────────────────────────────────────────────── */}
      <section className="border-y border-zinc-200 bg-white">
        <div className="mx-auto max-w-[1100px] px-6 py-14 sm:py-18">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-zinc-400">
                From the blog
              </p>
              <h2 className="mt-2 text-[28px] font-semibold tracking-[-0.025em] text-zinc-900">
                Guides for developers
              </h2>
            </div>
            <Link
              href="/blog"
              className="inline-flex w-fit shrink-0 items-center gap-2 rounded-lg border border-zinc-300 bg-white px-4 py-2 text-[13px] font-medium text-zinc-700 transition-colors hover:bg-zinc-50 hover:text-zinc-900"
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
                title: 'HIPAA-Compliant AI Development — Using ChatGPT Without Exposing Patient Data',
                desc: 'How to use AI coding tools in healthcare without violating compliance requirements.',
                meta: '8 min read',
              },
              {
                href: '/blog/why-my-api-works-in-postman-but-not-in-browser',
                tag: 'API Debugging',
                title: 'Why Your API Works in Postman but Not in cURL — 7 Reasons',
                desc: 'The most common causes of this frustration and the exact fix for each scenario.',
                meta: '6 min read',
              },
              {
                href: '/blog/json-stringify-complete-guide',
                tag: 'JavaScript',
                title: 'JSON.stringify Complete Guide — Undefined, Circular References, and Edge Cases',
                desc: 'Everything JSON.stringify does that surprises developers, with examples for every edge case.',
                meta: '7 min read',
              },
            ].map((post) => (
              <Link
                key={post.href}
                href={post.href}
                className="group flex flex-col gap-3 rounded-xl border border-zinc-200 bg-[#FAFAFA] p-6 transition-all hover:border-zinc-300 hover:bg-white hover:shadow-sm"
              >
                <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">
                  {post.tag}
                </span>
                <span className="text-[15px] font-semibold leading-snug text-zinc-900 group-hover:text-zinc-800">
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
