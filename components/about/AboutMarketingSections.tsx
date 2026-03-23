'use client';

import Link from 'next/link';
import NextImage from 'next/image';
import { Shield, ShieldCheck, Lock, Code, BookOpen, Mail } from 'lucide-react';

/**
 * AI-safety / product marketing blocks — shown below the classic About article.
 */
export default function AboutMarketingSections() {
  return (
    <div className="space-y-10 sm:space-y-14">
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">AI safety &amp; client-side guarantees</p>
        <p className="mx-auto mt-2 max-w-2xl text-sm text-zinc-600">
          How we help you use AI with JSON and SQL without exposing schemas or sensitive data.
        </p>
      </div>

      <section className="ud-card-redesign p-6 text-center sm:p-8 lg:p-10">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl lg:text-4xl">
          AI-Safe Tools — Data Security &amp; Privacy First
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-zinc-600 sm:text-lg">
          <strong>UnblockDevs</strong> lets you use <strong>AI</strong> for SQL and JSON without exposing real schemas or sensitive data.{' '}
          <strong>Data masking</strong>, <strong>client-side only</strong>, <strong>no server storage</strong>. Mask before you send to
          ChatGPT—restore after. Plus JSON, API, and 19+ tools. No signup, no install.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2 text-xs text-zinc-700 sm:gap-3 sm:text-sm">
          {[
            'AI Schema Masker (SQL)',
            'JSON Shield (Payload Masking)',
            '100% Data Security',
            'No Data Storage',
            'Client-Side Only',
            'Compliance-Friendly',
            'Reversible Masking',
            'JSON & API Tools',
          ].map((label) => (
            <span
              key={label}
              className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1.5 font-medium sm:px-4 sm:py-2"
            >
              ✓ {label}
            </span>
          ))}
        </div>
      </section>

      <section className="ud-card-redesign p-5 sm:p-8">
        <div className="mx-auto max-w-4xl space-y-8">
          <h2 className="text-center text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
            AI Safety, Privacy &amp; Secure Data Masking
          </h2>
          <p className="mx-auto max-w-2xl text-center text-sm text-zinc-600 sm:text-base">
            Use <strong>AI</strong> for SQL and JSON without exposing real schemas or sensitive data. Our tools run{' '}
            <strong>100% client-side</strong>—nothing leaves your browser. <strong>AI safety</strong> and <strong>privacy</strong> first:
            mask before you send, restore after you get AI help.
          </p>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-xl border border-zinc-200 bg-zinc-50/50 p-6 shadow-sm">
              <h3 className="mb-3 flex items-center gap-2 text-xl font-bold text-zinc-900">
                <Shield className="h-5 w-5 shrink-0 text-emerald-700" />
                JSON Shield
              </h3>
              <p className="mb-3 text-sm leading-relaxed text-zinc-600">
                Mask <strong>JSON payloads</strong> before sending to ChatGPT or any AI. Keys become <strong>K_00001</strong>, string values become{' '}
                <strong>S_00001</strong>; numbers stay unchanged. Preserve structure, restore exactly. Perfect for <strong>API payloads</strong>,
                logs, and configs—<strong>no data leaves your browser</strong>.
              </p>
              <ul className="space-y-1 text-xs text-zinc-600">
                <li>• Mask keys &amp; string values; keep numbers</li>
                <li>• Deterministic, fully reversible mapping</li>
                <li>• Client-side only; enterprise-safe</li>
                <li>• Handles large payloads (MBs)</li>
              </ul>
              <Link href="/json-prompt-shield" className="mt-3 inline-block text-sm font-semibold text-emerald-800 hover:text-emerald-950">
                Try JSON Shield →
              </Link>
            </div>

            <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
              <h3 className="mb-3 flex items-center gap-2 text-xl font-bold text-zinc-900">
                <ShieldCheck className="h-5 w-5 shrink-0 text-emerald-600" />
                SQL Mask
              </h3>
              <p className="mb-3 text-sm leading-relaxed text-zinc-600">
                Mask <strong>table and column names</strong> in raw SQL before sending to AI. Tables → <strong>T_00001</strong>, columns →{' '}
                <strong>C_00001</strong>. Compiler-level, token-aware masking—no regex, no broken strings. Send masked SQL to AI, paste the
                response, <strong>restore</strong> to real names in one click.
              </p>
              <ul className="space-y-1 text-xs text-zinc-600">
                <li>• Hide database schema from AI</li>
                <li>• Deterministic reversible mapping</li>
                <li>• Client-side only; no server, no logging</li>
                <li>• Handles procedures, CTEs, complex SQL</li>
              </ul>
              <Link href="/ai-schema-masker" className="mt-3 inline-block text-sm font-semibold text-emerald-800 hover:text-emerald-950">
                Try AI Schema Masker →
              </Link>
            </div>

            <div className="rounded-xl border border-zinc-200 bg-zinc-50/50 p-6 shadow-sm">
              <h3 className="mb-3 flex items-center gap-2 text-xl font-bold text-zinc-900">
                <ShieldCheck className="h-5 w-5 shrink-0 text-emerald-700" />
                MySQL Mask
              </h3>
              <p className="mb-3 text-sm leading-relaxed text-zinc-600">
                Use <strong>AI for MySQL</strong> without exposing your schema. Same engine as SQL Mask: define tables and columns (or paste MySQL),
                get masked prompts. Build <strong>AI-safe prompts</strong> with optional <strong>JOIN</strong> definitions. Restore AI output to
                run in your MySQL database—<strong>privacy</strong> and <strong>compliance</strong> preserved.
              </p>
              <ul className="space-y-1 text-xs text-zinc-600">
                <li>• Anonymize MySQL schema for AI</li>
                <li>• Prompt compiler with JOIN support</li>
                <li>• No server storage; no schema logging</li>
                <li>• FinTech, healthcare, banking friendly</li>
              </ul>
              <Link href="/ai-schema-masker" className="mt-3 inline-block text-sm font-semibold text-emerald-800 hover:text-emerald-950">
                Try AI Schema Masker →
              </Link>
            </div>
          </div>

          <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-5">
            <h3 className="mb-2 text-lg font-bold text-zinc-900">Why AI safety and privacy matter</h3>
            <p className="text-sm leading-relaxed text-zinc-600">
              Sending raw <strong>SQL</strong> or <strong>JSON</strong> to AI can leak business logic, table names, and sensitive identifiers. Many
              policies forbid sharing schema with third parties. Our masking tools let you get <strong>AI help</strong> while keeping data on your
              device: mask → send only placeholders → restore. <strong>100% data security</strong>, client-side only.
            </p>
          </div>
        </div>
      </section>

      <section className="ud-card-redesign p-5 sm:p-8">
        <div className="mx-auto max-w-4xl space-y-6">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
            AI-Safe JSON &amp; SQL Tools — Security First, Client-Side Only
          </h2>
          <p className="text-sm text-zinc-600 sm:text-base">
            All tools run <strong>100% in your browser</strong>. <strong>No data storage</strong> on our servers—no uploads, no logging. Your{' '}
            <strong>JSON</strong>, SQL, and schemas stay on your device. <strong>AI safety</strong> and <strong>security</strong> by design: mask
            before AI, format and validate locally.
          </p>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-zinc-200 bg-zinc-50/60 p-5">
              <h3 className="mb-3 text-lg font-bold text-zinc-900">AI Safety &amp; No Data Storage</h3>
              <ul className="space-y-2 text-sm text-zinc-600">
                <li>• <strong>AI-safe JSON</strong> masking — keys &amp; values masked client-side</li>
                <li>• <strong>AI-safe SQL</strong> — table &amp; column names masked before AI</li>
                <li>• <strong>No server storage</strong> — nothing sent, nothing saved</li>
                <li>• <strong>Client-side only</strong> — all operations in your browser</li>
              </ul>
            </div>
            <div className="rounded-xl border border-zinc-200 bg-white p-5">
              <h3 className="mb-3 text-lg font-bold text-zinc-900">Security &amp; Privacy</h3>
              <ul className="space-y-2 text-sm text-zinc-600">
                <li>• <strong>JSON</strong> and SQL never leave your device</li>
                <li>• <strong>No logging</strong> of schemas, payloads, or identifiers</li>
                <li>• <strong>Reversible masking</strong> — restore after AI, run locally</li>
                <li>• <strong>Enterprise-safe</strong> — FinTech, healthcare, banking friendly</li>
              </ul>
            </div>
            <div className="rounded-xl border border-zinc-200 bg-white p-5">
              <h3 className="mb-3 text-lg font-bold text-zinc-900">JSON Utilities — All Client-Side</h3>
              <ul className="space-y-2 text-sm text-zinc-600">
                <li>• <strong>JSON formatter</strong> &amp; <strong>JSON minifier</strong> — in-browser</li>
                <li>• <strong>JSON validator</strong> &amp; <strong>JSON viewer</strong> — no upload</li>
                <li>• <strong>JSON compare</strong> &amp; <strong>JSON diff</strong> — local only</li>
                <li>• <strong>JSON to CSV/Excel</strong> — conversion in your browser</li>
              </ul>
            </div>
            <div className="rounded-xl border border-zinc-200 bg-zinc-50/60 p-5">
              <h3 className="mb-3 text-lg font-bold text-zinc-900">API &amp; Debugging — Zero Server</h3>
              <ul className="space-y-2 text-sm text-zinc-600">
                <li>• <strong>API JSON tester</strong> — validate responses client-side</li>
                <li>• <strong>JSON pretty print</strong> &amp; structure view — local</li>
                <li>• <strong>JSON debugging</strong> — no data sent to any server</li>
                <li>• <strong>REST API tools</strong> — all operations client-side only</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="ud-card-redesign p-6 sm:p-10">
        <div className="mx-auto max-w-4xl space-y-6">
          <h2 className="text-center text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
            About UnblockDevs — AI Safety, Data Security &amp; Compliance-First Tools
          </h2>
          <div className="space-y-4 leading-relaxed text-zinc-600">
            <p>
              <strong>UnblockDevs</strong> is built for developers who need to use <strong>AI</strong> without risking <strong>data security</strong>{' '}
              or <strong>compliance</strong>. We provide free, client-side tools so your JSON, SQL, and schemas never leave your device.{' '}
              <strong>Data masking for AI</strong> is at the core: mask table names, column names, and JSON keys before sending anything to ChatGPT or
              other AI—then restore the AI&apos;s output locally. No server storage, no logging, no signups. <strong>Safety</strong> and{' '}
              <strong>privacy</strong> by design.
            </p>
            <p>
              Our mission is to make <strong>AI-safe workflows</strong> accessible: use AI for SQL and JSON while staying within{' '}
              <strong>compliance</strong> (FinTech, healthcare, banking). We believe you shouldn&apos;t have to choose between AI productivity and data
              security. All processing runs in your browser—<strong>100% client-side</strong>—so your code, API payloads, and database identifiers never
              touch our servers. No account creation, no data sharing, no storage of your sensitive information.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {[
              { n: '19+', d: 'Tools incl. AI Masking' },
              { n: '100%', d: 'Client-Side, No Storage' },
              { n: 'Free', d: 'Forever, No Signup' },
            ].map(({ n, d }) => (
              <div key={d} className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 text-center">
                <div className="mb-1 text-2xl font-bold text-emerald-700">{n}</div>
                <div className="text-sm text-zinc-600">{d}</div>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-zinc-600">
            <p>
              <strong>AI Safety &amp; Data Masking:</strong> Use our <strong>JSON Shield</strong> and <strong>AI Schema Masker</strong> to anonymize
              payloads and SQL before AI. Deterministic, reversible mapping—restore AI output to real names in one click. <strong>Data Security:</strong>{' '}
              No uploads, no server processing. Your data stays in your browser. <strong>Compliance:</strong> No logging of schemas or identifiers;
              suitable for regulated industries. <strong>No Barriers:</strong> Start immediately—no accounts, no credit cards.
            </p>
            <p>
              <strong>Tool Suite:</strong> Beyond <strong>data masking for AI</strong>, we offer JSON formatters, validators, API comparators, cURL
              converters, and more—all client-side. <strong>Educational Content:</strong> 100+ blog posts on JSON, API testing, data engineering, and{' '}
              <strong>how to safely use AI</strong> with MySQL and JSON (masking, privacy, compliance).
            </p>
            <p>
              <strong>Architecture:</strong> Built with Next.js, TypeScript, and Tailwind. Every tool runs in your browser—fast, secure, private.{' '}
              <strong>Community-Driven:</strong> Tools and features (including AI masking) were shaped by developers who need <strong>AI safety</strong>{' '}
              and <strong>data security</strong> without sacrificing productivity.
            </p>
          </div>

          <div className="mt-6 rounded-r-lg border border-emerald-200 border-l-4 border-l-emerald-600 bg-emerald-50/60 p-5">
            <p className="mb-2 font-semibold text-emerald-950">Why Choose UnblockDevs?</p>
            <ul className="space-y-1 text-sm text-emerald-900">
              <li>✓ <strong>AI safety</strong> — data masking for AI; schema never sent to servers</li>
              <li>✓ <strong>Data security</strong> — 100% client-side; no storage, no logging</li>
              <li>✓ <strong>Compliance-friendly</strong> — FinTech, healthcare, banking safe</li>
              <li>✓ No signup — use tools immediately, no account or email</li>
              <li>✓ Free forever — no usage limits, no credit cards</li>
              <li>✓ JSON Shield &amp; SQL/MySQL mask — restore AI output locally</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-6 text-center">
          <h2 className="heading-section mb-2 text-zinc-900">Why Choose UnblockDevs?</h2>
          <p className="mx-auto max-w-xl text-sm text-zinc-600 sm:text-base">
            We built this for developers who care where their data goes. No upsells, no lock-in—just tools that work.
          </p>
        </div>
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
          <div className="ud-card-redesign p-5 text-center sm:p-6 md:text-left">
            <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
              <span className="text-lg font-bold">∞</span>
            </div>
            <h3 className="mb-1.5 font-semibold text-zinc-900">Always free</h3>
            <p className="text-sm leading-relaxed text-zinc-600">
              No trials, no &quot;pro&quot; tier, no credit card. Use every tool as much as you need. We don&apos;t gate features behind signup.
            </p>
          </div>
          <div className="ud-card-redesign p-5 text-center sm:p-6 md:text-left">
            <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 text-zinc-700">
              <Lock className="h-5 w-5" aria-hidden />
            </div>
            <h3 className="mb-1.5 font-semibold text-zinc-900">Your data stays yours</h3>
            <p className="text-sm leading-relaxed text-zinc-600">
              Everything runs in your browser. We don&apos;t send your JSON, SQL, or schemas to our servers—there are no servers for your data. No
              tracking, no logging.
            </p>
          </div>
          <div className="ud-card-redesign p-5 text-center sm:p-6 md:text-left">
            <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-800">
              <Code className="h-5 w-5" aria-hidden />
            </div>
            <h3 className="mb-1.5 font-semibold text-zinc-900">No install, no setup</h3>
            <p className="text-sm leading-relaxed text-zinc-600">
              Open the page and start. No npm install, no API keys, no config. Works on any device with a modern browser.
            </p>
          </div>
        </div>
        <div className="mx-auto mt-8 flex w-fit justify-center rounded-lg border border-zinc-200 bg-white p-3">
          <a
            href="https://startupfa.me/s/unblockdevs?utm_source=unblockdevs.com"
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <NextImage
              src="https://startupfa.me/badges/featured-badge-small.webp"
              alt="UnblockDevs - Featured on Startup Fame"
              width={224}
              height={36}
              sizes="224px"
            />
          </a>
        </div>
      </section>

      <section className="ud-card-redesign p-6 sm:p-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-xl font-bold text-zinc-900 sm:text-2xl">Start using the tools</h2>
          <p className="mt-2 text-sm text-zinc-600">
            Everything runs in your browser. Jump to the home page for the full suite or read guides on the blog.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-zinc-800"
            >
              All tools
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-lg border border-zinc-300 bg-white px-5 py-2.5 text-sm font-semibold text-zinc-800 transition-colors hover:bg-zinc-50"
            >
              <BookOpen className="h-4 w-4" aria-hidden />
              Blog
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg border border-zinc-300 bg-white px-5 py-2.5 text-sm font-semibold text-zinc-800 transition-colors hover:bg-zinc-50"
            >
              <Mail className="h-4 w-4" aria-hidden />
              Contact
            </Link>
          </div>
          <p className="mt-6 text-sm text-zinc-600">
            <strong>Email:</strong>{' '}
            <a href="mailto:support@unblockdevs.com" className="font-semibold text-emerald-800 hover:text-emerald-950 hover:underline">
              support@unblockdevs.com
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
