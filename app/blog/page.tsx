import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { blogPosts, indexablePosts } from '@/lib/blog-posts-data';
import { BlogListClient } from './BlogListClient';
import { BookOpen, Zap, Sparkles, ArrowRight } from 'lucide-react';

const PER_PAGE = 9;

export const revalidate = 3600;

export async function generateMetadata({
  searchParams,
}: {
  searchParams?: { page?: string };
}): Promise<Metadata> {
  const totalPages = Math.ceil(blogPosts.length / PER_PAGE);
  const page = Math.max(1, Math.min(Number.parseInt(searchParams?.page ?? '1', 10) || 1, totalPages || 1));
  const canonical = page <= 1 ? 'https://unblockdevs.com/blog' : `https://unblockdevs.com/blog?page=${page}`;
  const isPagination = page > 1;
  return {
    title: page <= 1
      ? 'Developer Debugging Guides, JSON Fixes & API Tutorials | UnblockDevs'
      : `Developer Debugging Guides - Page ${page} | UnblockDevs`,
    description: 'Natural, practical developer guides for JSON errors, API debugging, curl, schema validation, and security-safe AI workflows.',
    alternates: { canonical },
    ...(isPagination ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      title: 'Developer Debugging Guides, JSON Fixes & API Tutorials | UnblockDevs',
      description: 'Natural, practical developer guides for JSON errors, API debugging, curl, schema validation, and security-safe AI workflows.',
      url: canonical,
      type: 'website',
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Developer Guides' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Developer Debugging Guides, JSON Fixes & API Tutorials | UnblockDevs',
      description: 'Natural, practical developer guides for JSON errors, API debugging, curl, schema validation, and security-safe AI workflows.',
      images: ['/og-image.png'],
    },
    keywords: [
      'fix json parse error', 'unexpected token in json', 'json syntax error checker',
      'json formatter with error highlight', 'how to validate json online', 'decode jwt token',
      'verify jwt signature', 'post json data with curl', 'api debugging guides',
      'developer troubleshooting tutorials',
    ],
  };
}

const FEATURED_GUIDES = [
  { href: '/blog/chatgpt-real-life-usage-guide', title: 'ChatGPT Real-Life Usage Guide', desc: 'Practical use cases and best prompts for everyday dev work.' },
  { href: '/blog/ai-prompt-engineering-guide', title: 'AI Prompt Engineering Guide', desc: 'Write prompts that actually get the output you want.' },
  { href: '/blog/hipaa-compliant-ai-development', title: 'HIPAA-Compliant AI Dev', desc: 'Use ChatGPT without exposing patient data. Client-side masking.' },
  { href: '/blog/fix-unexpected-end-of-json-input-error-explained', title: 'Fix JSON Parse Errors', desc: 'Unexpected token, empty responses, and incomplete data — fixed.' },
  { href: '/blog/why-my-api-works-in-postman-but-not-in-browser', title: 'API Works in Postman, Not Browser', desc: 'CORS, auth headers, cookies — debugged step by step.' },
  { href: '/blog/curl-to-python-requests-complete-guide', title: 'curl → Python Requests', desc: 'Convert any curl command to Python requests in seconds.' },
];

const HUBS = [
  {
    title: 'JSON Error Hub',
    desc: 'Most searched debugging paths for malformed payloads and parse failures.',
    links: [
      { href: '/blog/fix-unexpected-end-of-json-input-error-explained', label: 'Unexpected end of JSON input' },
      { href: '/blog/fix-unexpected-token-less-than-in-json-api-returns-html', label: 'Unexpected token < in JSON' },
      { href: '/fix-json-parse-error-javascript', label: 'JSON parse error: unexpected token' },
      { href: '/json-validator', label: 'Open JSON Validator →' },
    ],
    accent: 'border-l-emerald-500',
  },
  {
    title: 'JWT & Auth Hub',
    desc: 'High-intent auth troubleshooting for token inspection and verification.',
    links: [
      { href: '/jwt-decoder', label: 'Decode JWT Token Online' },
      { href: '/hash-generator', label: 'Generate SHA / MD5 / HMAC Hash' },
      { href: '/url-encoder', label: 'URL Encode/Decode Tool' },
      { href: '/blog/token-security-privacy-best-practices', label: 'Token security best practices' },
    ],
    accent: 'border-l-violet-500',
  },
  {
    title: 'API Debugging Hub',
    desc: 'Natural search patterns developers use when APIs fail in production.',
    links: [
      { href: '/blog/why-my-api-works-in-postman-but-not-in-browser', label: 'API works in Postman, not browser' },
      { href: '/blog/post-json-data-with-curl-examples-complete-guide', label: 'Post JSON data with curl' },
      { href: '/curl-failure-root-cause-engine', label: 'Curl failure root-cause engine' },
      { href: '/cors-tester', label: 'CORS tester tool' },
    ],
    accent: 'border-l-sky-500',
  },
];

export default function BlogPage({
  searchParams,
}: {
  searchParams?: { page?: string };
}) {
  const totalPages = Math.ceil(blogPosts.length / PER_PAGE);
  const currentPage = Math.max(
    1,
    Math.min(Number.parseInt(searchParams?.page ?? '1', 10) || 1, totalPages || 1)
  );
  const start = (currentPage - 1) * PER_PAGE;
  const initialPosts = blogPosts.slice(start, start + PER_PAGE);
  const canonical = currentPage <= 1 ? 'https://unblockdevs.com/blog' : `https://unblockdevs.com/blog?page=${currentPage}`;

  const breadcrumbsSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://unblockdevs.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: canonical },
    ],
  };
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListOrder: 'https://schema.org/ItemListOrderDescending',
    numberOfItems: initialPosts.length,
    itemListElement: initialPosts.map((post, index) => ({
      '@type': 'ListItem',
      position: start + index + 1,
      url: `https://unblockdevs.com/blog/${post.slug}`,
      name: post.title,
    })),
  };

  return (
    <div className="min-h-screen bg-[#F8F8F8]">
      <Script id={`blog-breadcrumb-schema-${currentPage}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsSchema) }} />
      <Script id={`blog-itemlist-schema-${currentPage}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />

      {/* ── HERO ───────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-zinc-950 pb-14 pt-10 sm:pb-16 sm:pt-12">
        {/* Ambient glow */}
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute -left-20 -top-10 h-[400px] w-[500px] rounded-full bg-emerald-600/15 blur-[120px]" />
          <div className="absolute bottom-0 right-0 h-[300px] w-[400px] rounded-full bg-violet-600/15 blur-[100px]" />
        </div>

        <div className="relative mx-auto max-w-full px-5 sm:px-6 lg:px-8">
          {/* eyebrow */}
          <div className="mb-5 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald-300">
              <BookOpen className="h-3 w-3" />
              Developer Blog
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[11px] text-zinc-400">
              <Sparkles className="h-3 w-3 text-violet-400" />
              {blogPosts.length} articles · free to read
            </span>
          </div>

          {/* headline */}
          <h1 className="max-w-2xl text-[2rem] font-bold leading-[1.13] tracking-tight text-white sm:text-[2.6rem] lg:text-[3rem]">
            Guides that{' '}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              unblock developers
            </span>
          </h1>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-zinc-400 sm:text-base">
            JSON errors, API debugging, curl, schema validation, and safe AI workflows.
            Practical — no fluff, no signup required.
          </p>
          <p className="mt-3 text-[13px] text-zinc-500 flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-zinc-400">
              🔍 Search + filter below ↓
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-zinc-400">
              ⌘K to focus search
            </span>
          </p>

          {/* stats */}
          <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3">
            {[
              { value: `${blogPosts.length}`, label: 'articles' },
              { value: '100%', label: 'free' },
              { value: 'Zero', label: 'signup required' },
              { value: 'New', label: 'posts weekly' },
            ].map((s) => (
              <div key={s.label} className="flex items-baseline gap-1.5">
                <span className="text-lg font-bold text-white sm:text-xl">{s.value}</span>
                <span className="text-[12px] text-zinc-500">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT ───────────────────────────────────────── */}
      <main className="mx-auto max-w-full sm:px-0 lg:px-0">

        {/* Post grid + search */}
        <BlogListClient allPosts={blogPosts} initialPosts={initialPosts} totalPages={totalPages} currentPage={currentPage} />

        {/* ── FEATURED GUIDES ──────────────────────────────────── */}
        {currentPage === 1 && (
          <div className="mx-auto max-w-full px-5 py-8 sm:px-6 sm:py-10 lg:px-8">
            <section className="mt-2" aria-labelledby="featured-heading">
              <div className="mb-5 flex items-center justify-between gap-4">
                <div>
                  <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.13em] text-zinc-400">Handpicked</p>
                  <h2 id="featured-heading" className="text-[1.15rem] font-bold tracking-tight text-zinc-900">Featured guides</h2>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {FEATURED_GUIDES.map((g) => (
                  <Link
                    key={g.href}
                    href={g.href}
                    className="group flex flex-col rounded-2xl border border-zinc-200 bg-white p-5 shadow-[0_1px_4px_rgba(0,0,0,0.05)] transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-[0_8px_28px_rgba(0,0,0,0.08)]"
                  >
                    <p className="text-[14px] font-bold leading-snug text-zinc-900 transition-colors group-hover:text-zinc-700">{g.title}</p>
                    <p className="mt-1.5 flex-1 text-[12.5px] leading-relaxed text-zinc-500">{g.desc}</p>
                    <span className="mt-3 inline-flex items-center gap-1 text-[12px] font-semibold text-zinc-400 transition-colors group-hover:text-zinc-800">
                      Read guide
                      <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" aria-hidden />
                    </span>
                  </Link>
                ))}
              </div>
            </section>

            {/* ── QUICK-LINKS HUBS ─────────────────────────────── */}
            <section className="mt-12 grid gap-4 lg:grid-cols-3" aria-label="Topic hubs">
              {HUBS.map((hub) => (
                <div key={hub.title} className={`rounded-2xl border border-zinc-200 bg-white p-5 shadow-[0_1px_4px_rgba(0,0,0,0.05)] border-l-4 ${hub.accent}`}>
                  <h2 className="text-[15px] font-bold text-zinc-900">{hub.title}</h2>
                  <p className="mt-1.5 text-[12.5px] leading-relaxed text-zinc-500">{hub.desc}</p>
                  <div className="mt-4 space-y-2">
                    {hub.links.map((l) => (
                      <Link
                        key={l.href}
                        href={l.href}
                        className="block text-[13px] font-medium text-zinc-600 underline-offset-2 hover:text-zinc-900 hover:underline"
                      >
                        {l.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </section>

            {/* ── SEO PROSE ────────────────────────────────────── */}
            <section className="mt-12 rounded-2xl border border-zinc-200 bg-white p-6 shadow-[0_1px_4px_rgba(0,0,0,0.04)] sm:p-8">
              <h2 className="text-[1.1rem] font-semibold tracking-tight text-zinc-900">About this blog</h2>
              <div className="mt-4 space-y-3 text-[14px] leading-relaxed text-zinc-600">
                <p>
                  <strong className="text-zinc-900">UnblockDevs Blog</strong> publishes practical guides on JSON tools, API debugging, data engineering,
                  and security-safe AI workflows. Every article is written for working developers — no filler, no paywalls.
                </p>
                <p>
                  Topics include <strong className="text-zinc-800">JSON Viewer, Beautifier, Validator</strong>, API response comparison, JWT decoding,
                  curl-to-code conversion, schema masking before ChatGPT, and common JavaScript/Python error fixes.
                </p>
                <p>
                  Whether you&apos;re debugging a JSON parse error at 2 AM or learning how to mask sensitive data before pasting into an AI assistant,
                  these guides have the exact solution — searchable, copy-pasteable, and free forever.
                </p>
              </div>
            </section>
            {/* Bottom nav */}
            <div className="mt-12 flex flex-col items-center gap-3">
              <Link
                href="/tools/json"
                className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-5 py-2.5 text-[13px] font-semibold text-zinc-700 shadow-sm transition-colors hover:bg-zinc-50 hover:text-zinc-900"
              >
                <Zap className="h-3.5 w-3.5 text-amber-500" />
                Browse all {'{'}developer tools{'}'}
              </Link>
            </div>
          </div>
        )}
      </main>

      {/*
        Complete article archive — server-rendered HTML links.
        Ensures all indexable posts are discoverable by Google without JS.
        Grouped by category for topical relevance signals.
        Rendered on page 1 only so pagination pages don't duplicate it.
      */}
      {currentPage === 1 && (() => {
        const byCategory: Record<string, typeof indexablePosts> = {};
        for (const post of indexablePosts) {
          if (!byCategory[post.category]) byCategory[post.category] = [];
          byCategory[post.category].push(post);
        }
        const sorted = Object.entries(byCategory).sort(([a], [b]) => a.localeCompare(b));
        return (
          <section
            className="mx-auto max-w-full px-5 pb-16 pt-2 sm:px-6 lg:px-8"
            aria-labelledby="article-archive-heading"
          >
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-[0_1px_4px_rgba(0,0,0,0.04)] sm:p-8">
              <h2 id="article-archive-heading" className="text-[1.05rem] font-semibold tracking-tight text-zinc-900 mb-6">
                Complete Article Archive ({indexablePosts.length} guides)
              </h2>
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {sorted.map(([category, posts]) => (
                  <div key={category}>
                    <h3 className="mb-3 text-[11px] font-bold uppercase tracking-widest text-zinc-400">{category}</h3>
                    <ul className="space-y-1.5">
                      {posts.map((post) => (
                        <li key={post.slug}>
                          <Link
                            href={`/blog/${post.slug}`}
                            className="text-[13px] font-medium text-zinc-600 underline-offset-2 hover:text-zinc-900 hover:underline"
                          >
                            {post.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      })()}
    </div>
  );
}
