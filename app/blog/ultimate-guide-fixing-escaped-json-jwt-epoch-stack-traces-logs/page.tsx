import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowLeft,
  FileCode,
  Clock,
  Key,
  AlertTriangle,
  Zap,
  CheckCircle,
  ArrowRight,
  Shield,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Ultimate Guide to Fixing Escaped JSON, JWTs, Epoch Timestamps & Stack Traces in Logs | UnblockDevs',
  description:
    'Fix escaped JSON, decode JWTs, convert epoch timestamps, and clean stack traces in logs. One guide for all embedded log problems—with flow and examples.',
  keywords: [
    'escaped JSON',
    'JWT decode',
    'epoch timestamp converter',
    'stack trace debugging',
    'log parsing',
    'fix escaped JSON',
    'JWT decoder online',
    'epoch to date',
    'sanitize stack trace',
    'log sanitizer',
  ],
  openGraph: {
    title: 'Ultimate Guide to Fixing Escaped JSON, JWTs, Epoch Timestamps & Stack Traces in Logs',
    description: 'Fix escaped JSON, decode JWTs, convert epoch time, and clean stack traces—one comprehensive guide.',
    type: 'article',
    publishedTime: '2025-03-02T00:00:00Z',
    authors: ['UnblockDevs'],
  },
};

export default function UltimateGuideFixingEscapedJsonJwtEpochStackTracesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="border-b border-gray-200 bg-white shadow-md">
        <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="mb-4 inline-flex items-center gap-2 rounded-lg border-2 border-primary-200 bg-primary-50 px-4 py-2 text-sm font-medium text-primary-700 transition-colors hover:border-primary-300 hover:bg-primary-100"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
              Logs & Debugging
            </span>
            <time className="text-sm text-gray-500" dateTime="2025-03-02">
              March 2, 2025
            </time>
          </div>
        </div>
      </header>

      <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <header className="mb-8">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">
            The Ultimate Guide to Fixing Escaped JSON, JWTs, Epoch Timestamps & Stack Traces in Logs
          </h1>
          <p className="text-xl leading-relaxed text-gray-600">
            Logs pack in escaped JSON, JWTs, epoch times, and raw stack traces. This guide explains what each is, when
            they appear, and how to fix them in one workflow.
          </p>
        </header>

        <div className="prose prose-lg max-w-none rounded-lg bg-white p-8 shadow-md">
          {/* Definition */}
          <section className="mb-10">
            <h2 className="mb-4 flex items-center gap-2 text-3xl font-bold text-gray-900">
              <FileCode className="h-8 w-8 text-blue-600" />
              Definition: What Are We Fixing?
            </h2>
            <p className="mb-4 leading-relaxed text-gray-700">
              <strong>Escaped JSON</strong> is JSON that has been turned into a string and escaped for embedding (e.g.
              backslash before quotes). <strong>JWTs</strong> (JSON Web Tokens) are base64url-encoded header.payload.signature
              strings that need decoding to read claims. <strong>Epoch timestamps</strong> are Unix seconds or
              milliseconds (e.g. 1740932654000) that need converting to human-readable dates. <strong>Stack traces</strong> in
              logs are multi-line error backtraces that often contain local file paths (e.g. /Users/yourname/project)—
              fixing means unescaping, decoding, converting, and optionally scrubbing those paths for safe sharing.
            </p>
            <div className="mb-6 rounded-lg border border-emerald-200 bg-emerald-50 p-4">
              <p className="text-sm font-semibold text-emerald-900">In one sentence</p>
              <p className="text-emerald-800">
                Fixing logs = unescape nested JSON + decode JWTs + convert epoch to dates + scrub or preserve stack
                traces so logs are readable and safe to share.
              </p>
            </div>
          </section>

          {/* What */}
          <section className="mb-10">
            <h2 className="mb-4 flex items-center gap-2 text-3xl font-bold text-gray-900">
              <AlertTriangle className="h-8 w-8 text-amber-600" />
              What You See in Raw Logs
            </h2>
            <p className="mb-4 leading-relaxed text-gray-700">
              In a single log line you might see: (1) A top-level JSON object whose <code>context</code> or{' '}
              <code>payload</code> field is a string full of escaped quotes and backslashes—that’s escaped/nested JSON.
              (2) An <code>auth</code> or <code>token</code> field with a long base64-like string in three
              dot-separated parts—that’s a JWT. (3) A <code>timestamp</code> or <code>iat</code> as a number like
              1740932654000—epoch milliseconds. (4) An <code>exception</code> or <code>stack</code> field with newlines
              and paths like <code>/Users/john/app/src/index.js</code>—that’s a stack trace. Fixing means turning each
              of these into a readable, usable form without losing structure.
            </p>
          </section>

          {/* When */}
          <section className="mb-10">
            <h2 className="mb-4 flex items-center gap-2 text-3xl font-bold text-gray-900">
              <Clock className="h-8 w-8 text-blue-600" />
              When Do These Show Up?
            </h2>
            <p className="mb-4 leading-relaxed text-gray-700">
              <strong>Escaped JSON</strong> appears when logging frameworks or message queues serialize objects to
              strings (e.g. for a single log line or event payload). <strong>JWTs</strong> appear in auth headers, API
              responses, and log context when requests are logged. <strong>Epoch timestamps</strong> are common in
              system logs, analytics, and JWT <code>iat</code>/<code>exp</code> claims. <strong>Stack traces</strong>
              appear in error logs when exceptions are caught and logged. So you see them together in API logs, error
              reports, and event streams—anywhere structured logging mixes JSON, auth, time, and errors.
            </p>
          </section>

          {/* How - Flow */}
          <section className="mb-10">
            <h2 className="mb-4 flex items-center gap-2 text-3xl font-bold text-gray-900">
              <Zap className="h-8 w-8 text-blue-600" />
              How to Fix: Processing Flow
            </h2>
            <p className="mb-4 leading-relaxed text-gray-700">
              A robust fix follows a clear order so that one step doesn’t break another: first unescape and parse JSON,
              then detect and decode JWTs and epoch, then scrub paths in strings (e.g. stack traces).
            </p>

            <div className="mb-6 overflow-hidden rounded-lg border border-gray-200">
              <div className="grid grid-cols-1 gap-0 sm:grid-cols-4">
                <div className="border-b border-gray-200 bg-slate-50 p-4 text-center sm:border-b-0 sm:border-r">
                  <span className="text-xs font-semibold uppercase text-slate-500">1. Unescape</span>
                  <p className="mt-1 text-sm font-medium text-gray-900">Parse nested JSON</p>
                </div>
                <div className="flex items-center justify-center border-b border-gray-200 bg-blue-50/50 p-2 sm:border-b-0 sm:border-r">
                  <ArrowRight className="h-5 w-5 text-blue-600" />
                </div>
                <div className="border-b border-gray-200 bg-slate-50 p-4 text-center sm:border-b-0 sm:border-r">
                  <span className="text-xs font-semibold uppercase text-slate-500">2. Decode</span>
                  <p className="mt-1 text-sm font-medium text-gray-900">JWT + Epoch</p>
                </div>
                <div className="flex items-center justify-center border-b border-gray-200 bg-blue-50/50 p-2 sm:border-b-0 sm:border-r">
                  <ArrowRight className="h-5 w-5 text-blue-600" />
                </div>
                <div className="bg-slate-50 p-4 text-center">
                  <span className="text-xs font-semibold uppercase text-slate-500">3. Scrub</span>
                  <p className="mt-1 text-sm font-medium text-gray-900">Paths in stack</p>
                </div>
              </div>
            </div>

            <ol className="mb-6 list-decimal space-y-3 pl-6 text-gray-700">
              <li>
                <strong>Unescape and parse.</strong> Recursively parse string values that look like JSON (start with <code>{'{'}</code> or <code>[</code>) until you have a full object tree. Use a depth limit (e.g. 10) to
                avoid runaway parsing.
              </li>
              <li>
                <strong>Decode JWTs.</strong> For strings that match JWT shape (three base64url segments) and decode to a
                header with <code>alg</code>, decode header and payload. Optionally mask PII (sub, name, email) in the
                payload for safe sharing.
              </li>
              <li>
                <strong>Convert epoch.</strong> For numbers that look like 10- or 13-digit Unix time (e.g. 1xxxxxxxxx),
                show human-readable ISO date alongside the original value.
              </li>
              <li>
                <strong>Scrub paths.</strong> In string values (including stack traces), replace usernames in paths like
                <code> /Users/username/</code> or <code>C:\Users\username\</code> with <code>~</code> so logs are
                safe to share without exposing local identities.
              </li>
            </ol>
          </section>

          {/* Why */}
          <section className="mb-10">
            <h2 className="mb-4 flex items-center gap-2 text-3xl font-bold text-gray-900">
              <CheckCircle className="h-8 w-8 text-green-600" />
              Why This Order and One Tool?
            </h2>
            <p className="mb-4 leading-relaxed text-gray-700">
              Doing unescape first gives you real objects so JWT and epoch detection run on the right fields (e.g.{' '}
              <code>context.request.auth</code> and <code>timestamp</code>). Decoding before scrubbing keeps JWT
              payload structure intact; then path scrubbing cleans stack traces and any path-like strings. One pipeline
              means one paste, one click, and one sanitized output—no switching between unescaper, jwt.io, epoch
              converter, and manual find-replace. That speeds debugging and reduces the risk of leaking tokens or paths
              when you share logs with teammates or AI.
            </p>
          </section>

          {/* Risk / safe sharing */}
          <section className="mb-10">
            <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-gray-900">
              <Shield className="h-6 w-6 text-emerald-600" />
              Safe Sharing and Export
            </h2>
            <p className="mb-4 leading-relaxed text-gray-700">
              Logs often contain tokens, paths, and PII. Before pasting into chat, tickets, or AI: use a sanitized
              export that replaces JWTs with a placeholder (e.g. [JWT]), converts epoch to readable dates, and scrubs
              paths. That way you keep the structure and timing without exposing secrets or local identities. Prefer
              client-side-only tools so the log never leaves your machine until it’s already sanitized.
            </p>
          </section>

          {/* JWT & Epoch detail */}
          <section className="mb-10">
            <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-gray-900">
              <Key className="h-6 w-6 text-blue-600" />
              JWT and Epoch in More Detail
            </h2>
            <p className="mb-4 leading-relaxed text-gray-700">
              <strong>JWT:</strong> Only treat a string as a JWT if it has three dot-separated segments, each valid
              base64url, and the first segment decodes to a JSON object with an <code>alg</code> field. That avoids
              false positives (e.g. hostnames like <code>a.b.c</code>). Extract the token from <code>Bearer &lt;token&gt;</code> when
              present. <strong>Epoch:</strong> 10 digits = seconds (e.g. 1516239022); 13 digits = milliseconds (e.g.
              1740932654000). Restrict to plausible date ranges (e.g. 2015–2035) to avoid matching random numbers.
              Confidence scoring (e.g. 0.8 for plausible epoch) helps future tooling (e.g. risk or PII flags).
            </p>
          </section>

          {/* Summary table */}
          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Quick Reference</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 text-left text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="border-b border-gray-200 px-4 py-2 font-semibold text-gray-900">Item</th>
                    <th className="border-b border-gray-200 px-4 py-2 font-semibold text-gray-900">What to do</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  <tr className="border-b border-gray-100">
                    <td className="px-4 py-2 font-medium">Escaped JSON</td>
                    <td className="px-4 py-2">Recursive parse with depth limit.</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="px-4 py-2 font-medium">JWT</td>
                    <td className="px-4 py-2">Decode header + payload; validate header.alg; optional PII mask.</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="px-4 py-2 font-medium">Epoch</td>
                    <td className="px-4 py-2">Detect 10/13 digit; convert to ISO date; show both.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-medium">Stack trace</td>
                    <td className="px-4 py-2">Scrub /Users/name, C:\Users\name, /home/name to ~ for safe share.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="rounded-lg border-2 border-primary-200 bg-primary-50 p-6">
            <p className="mb-2 font-semibold text-primary-900">Fix logs in one place</p>
            <p className="mb-4 text-sm text-primary-800">
              Log Unpacker does unescape, JWT decode, epoch conversion, and path scrubbing—client-side, no server.
            </p>
            <Link
              href="/log-unpacker"
              className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-primary-700"
            >
              Open Log Unpacker
              <ArrowRight className="h-4 w-4" />
            </Link>
          </section>
        </div>
      </article>
    </div>
  );
}
