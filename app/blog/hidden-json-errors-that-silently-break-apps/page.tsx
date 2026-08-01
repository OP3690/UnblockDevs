import type { Metadata } from 'next';
import Link from 'next/link';
import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';

export const metadata: Metadata = {
  title: 'Hidden JSON Errors That Silently Break Your App | UnblockDevs',
  description: 'The sneaky JSON bugs that never throw exceptions but corrupt your data: duplicate keys, BOM characters, number precision loss, deep nesting, and control characters explained.',
  keywords: [
    'json duplicate keys bug',
    'json silent errors',
    'json bom character fix',
    'json number precision loss',
    'json data corruption bug',
    'hidden json errors',
    'json duplicate key behavior',
    'json float precision javascript',
    'json control characters',
    'json deep nesting limit',
    'json encoding bug',
    'json key order guarantee',
    'json parser duplicate key',
  ],
  openGraph: {
    title: 'Hidden JSON Errors That Silently Break Your App',
    description: 'The sneaky JSON bugs that never throw exceptions but corrupt your data: duplicate keys, BOM characters, number precision loss, and more.',
    type: 'article',
    publishedTime: '2026-05-10T10:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/hidden-json-errors-that-silently-break-apps',
    images: [{ url: 'https://unblockdevs.com/api/og?title=Hidden%20JSON%20Errors%20That%20Silently%20Break%20Your%20App&emoji=%7B%7D&desc=The%20sneaky%20JSON%20bugs%20that%20never%20throw%20exceptions%20but%20corrupt%20your%20data%3A', width: 1200, height: 630, alt: 'Hidden JSON Errors That Silently Break Your App — UnblockDevs Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hidden JSON Errors That Silently Break Your App',
    description: 'Duplicate keys, BOM, precision loss — the JSON bugs that corrupt data without throwing a single exception.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/hidden-json-errors-that-silently-break-apps' },
};

export default function HiddenJsonErrorsPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
          <Link href="/blog" className="mb-5 inline-flex items-center gap-1.5 text-[13px] font-medium text-zinc-400 transition-colors hover:text-zinc-900">
            ← Blog
          </Link>
          <h1 className="text-2xl font-bold leading-snug text-zinc-900 sm:text-3xl">
            Hidden JSON Errors That Silently Break Your App
          </h1>
          <p className="mt-1.5 text-[14px] text-zinc-500">10 min read · JSON &amp; APIs</p>
        </div>
      </header>
      <BlogLayoutWithSidebarAds>
        <article>
          <p className="mt-6 text-[15px] leading-relaxed text-zinc-700">
            Most JSON errors are loud — <code className="rounded bg-zinc-100 px-1 font-mono text-[13px]">JSON.parse()</code> throws a <code className="rounded bg-zinc-100 px-1 font-mono text-[13px]">SyntaxError</code>, the console lights up, and you know exactly where to look. But some JSON bugs are silent. They parse successfully, return no error, and then corrupt your data in ways that only surface later — a wrong price, a missing field, or a test that passes locally and fails in production.
          </p>
          <p className="mt-4 text-[15px] leading-relaxed text-zinc-700">
            This guide covers the most dangerous silent JSON errors: duplicate keys, UTF-8 BOM characters, floating-point precision loss on large integers, deep nesting that hits parser stack limits, and invisible control characters inside string values.
          </p>
          <h2 className="mt-8 text-xl font-bold text-zinc-900">1. Duplicate Keys</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-zinc-700">
            The JSON specification says keys within an object SHOULD be unique but does not forbid duplicates. In practice, most parsers silently take the last value. <code className="rounded bg-zinc-100 px-1 font-mono text-[13px]">{`{"id":1,"id":2}`}</code> parses to <code className="rounded bg-zinc-100 px-1 font-mono text-[13px]">{`{"id":2}`}</code> with zero warnings. The first value is quietly dropped — a common source of subtle bugs in responses built by templating code.
          </p>
          <h2 className="mt-8 text-xl font-bold text-zinc-900">2. BOM Characters</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-zinc-700">
            A UTF-8 Byte Order Mark (<code className="rounded bg-zinc-100 px-1 font-mono text-[13px]">U+FEFF</code>) at the start of a JSON string causes <code className="rounded bg-zinc-100 px-1 font-mono text-[13px]">JSON.parse()</code> to throw in Node.js and most browsers. The BOM is invisible in most editors so the file looks valid. Strip it before parsing: <code className="rounded bg-zinc-100 px-1 font-mono text-[13px]">str.replace(/^﻿/, '')</code>.
          </p>
          <h2 className="mt-8 text-xl font-bold text-zinc-900">3. Number Precision Loss</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-zinc-700">
            JavaScript uses 64-bit floats for all numbers. Integers larger than <code className="rounded bg-zinc-100 px-1 font-mono text-[13px]">Number.MAX_SAFE_INTEGER</code> (9007199254740991) lose precision silently. A JSON field like <code className="rounded bg-zinc-100 px-1 font-mono text-[13px]">{`{"id":9999999999999999}`}</code> will parse as <code className="rounded bg-zinc-100 px-1 font-mono text-[13px]">10000000000000000</code>. Use <code className="rounded bg-zinc-100 px-1 font-mono text-[13px]">BigInt</code> or transmit large IDs as strings.
          </p>
          <h2 className="mt-8 text-xl font-bold text-zinc-900">4. Control Characters in Strings</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-zinc-700">
            Unescaped control characters (ASCII 0x00–0x1F) inside a JSON string are technically invalid but many parsers accept them silently. When the string is later re-serialized or transmitted to a stricter parser, it may fail. Always sanitize user-generated content before embedding it in JSON.
          </p>
          <div className="mt-8 rounded-xl border border-emerald-200 bg-emerald-50 p-5">
            <p className="text-[14px] font-semibold text-emerald-800">Validate JSON before it reaches production</p>
            <p className="mt-1 text-[13px] text-emerald-700">The UnblockDevs JSON Validator catches duplicate keys, encoding issues, and structural errors that standard parsers miss.</p>
            <Link href="/json-validator" className="mt-3 inline-flex items-center gap-1 text-[13px] font-bold text-emerald-700 hover:text-emerald-900">
              Open JSON Validator →
            </Link>
          </div>
        </article>
      </BlogLayoutWithSidebarAds>
    </div>
  );
}
