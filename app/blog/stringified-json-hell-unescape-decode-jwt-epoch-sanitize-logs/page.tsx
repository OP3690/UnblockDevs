import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowLeft,
  FileCode,
  Flame,
  Zap,
  Shield,
  CheckCircle,
  ArrowRight,
  Clock,
  Key,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Stringified JSON Hell: Unescape, Decode JWTs, Convert Epoch & Sanitize Logs in Seconds | UnblockDevs',
  description:
    'Escape stringified JSON hell: unescape nested JSON, decode JWTs, convert epoch time, and sanitize logs in seconds—one tool, client-side.',
  keywords: [
    'stringified JSON',
    'unescape JSON',
    'decode JWT',
    'epoch time converter',
    'sanitize logs',
    'JSON hell',
    'log decoder',
    'JWT decoder',
    'epoch to date',
    'log sanitizer',
  ],
  openGraph: {
    title: 'Stringified JSON Hell: Unescape, Decode JWTs, Convert Epoch & Sanitize Logs in Seconds',
    description: 'Get out of stringified JSON hell—unescape, decode JWTs, convert epoch, and sanitize logs in one go.',
    type: 'article',
    publishedTime: '2025-03-02T00:00:00Z',
    authors: ['UnblockDevs'],
  },
};

export default function StringifiedJsonHellUnescapeDecodeJwtEpochSanitizeLogsPage() {
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
            <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
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
            Stringified JSON Hell: How to Unescape, Decode JWTs, Convert Epoch Time & Sanitize Logs in Seconds
          </h1>
          <p className="text-xl leading-relaxed text-gray-600">
            If your logs look like one long mess of backslashes, tokens, and numbers—you’re in stringified JSON hell.
            Here’s how to get out in seconds with one workflow.
          </p>
        </header>

        <div className="prose prose-lg max-w-none rounded-lg bg-white p-8 shadow-md">
          {/* Definition */}
          <section className="mb-10">
            <h2 className="mb-4 flex items-center gap-2 text-3xl font-bold text-gray-900">
              <Flame className="h-8 w-8 text-amber-500" />
              Definition: What Is “Stringified JSON Hell”?
            </h2>
            <p className="mb-4 leading-relaxed text-gray-700">
              <strong>Stringified JSON hell</strong> is what developers call the situation where a single log line or
              API response contains: nested stringified JSON (multiple layers of escaped quotes and backslashes), JWT
              tokens (long base64-like strings), epoch timestamps (raw numbers), and stack traces or paths—all mixed
              together. Nothing is human-readable at a glance; you need to unescape, decode, convert, and sanitize
              before you can debug or share safely. “Hell” because doing it by hand with multiple tools is slow and
              error-prone.
            </p>
            <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 p-4">
              <p className="text-sm font-semibold text-amber-900">In short</p>
              <p className="text-amber-800">
                Stringified JSON hell = one blob of escaped JSON + JWTs + epoch numbers + paths. Fixing it = unescape
                → decode JWT → convert epoch → sanitize paths, in one go.
              </p>
            </div>
          </section>

          {/* What */}
          <section className="mb-10">
            <h2 className="mb-4 flex items-center gap-2 text-3xl font-bold text-gray-900">
              <FileCode className="h-8 w-8 text-blue-600" />
              What You’re Actually Looking At
            </h2>
            <p className="mb-4 leading-relaxed text-gray-700">
              In that one messy string you typically have: (1) <strong>Escaped/nested JSON</strong>—a value that is a
              string but contains valid JSON when you parse it, sometimes several levels deep. (2) <strong>JWTs</strong>—three
              dot-separated base64url segments (header.payload.signature) in fields like <code>auth</code> or{' '}
              <code>token</code>. (3) <strong>Epoch time</strong>—numbers like 1740932654000 (milliseconds) or
              1516239022 (seconds) in <code>timestamp</code>, <code>iat</code>, or <code>exp</code>. (4){' '}
              <strong>Paths and stack traces</strong>—file paths and error backtraces that may expose usernames or
              local paths. Identifying each part is the first step; then you apply the right fix (parse, decode, convert,
              scrub) so the log becomes readable and safe.
            </p>
          </section>

          {/* When */}
          <section className="mb-10">
            <h2 className="mb-4 flex items-center gap-2 text-3xl font-bold text-gray-900">
              <Clock className="h-8 w-8 text-blue-600" />
              When You End Up Here
            </h2>
            <p className="mb-4 leading-relaxed text-gray-700">
              You hit stringified JSON hell when logging or transport layers serialize everything into strings: e.g.
              structured loggers that stringify context, message queues that accept only strings, or error handlers that
              dump exception message + stack into a single JSON field. Microservices and serverless logs are especially
              prone because each service may add a layer of encoding. So you see it in <strong>API logs, error
              dashboards, event streams, and support tickets</strong>—whenever “one line” was built by repeatedly
              stringifying or embedding JSON, auth tokens, and timestamps.
            </p>
          </section>

          {/* How - Flow */}
          <section className="mb-10">
            <h2 className="mb-4 flex items-center gap-2 text-3xl font-bold text-gray-900">
              <Zap className="h-8 w-8 text-blue-600" />
              How to Get Out in Seconds
            </h2>
            <p className="mb-4 leading-relaxed text-gray-700">
              The fix is a single pipeline: unescape (recursive parse) → decode (JWT + epoch) → sanitize (paths). Run
              it in one tool so you paste once and get a clean, readable, and optionally sanitized output.
            </p>

            <div className="mb-6 overflow-hidden rounded-lg border border-gray-200">
              <div className="grid grid-cols-1 gap-0 sm:grid-cols-5">
                <div className="border-b border-gray-200 bg-slate-50 p-4 text-center sm:border-b-0 sm:border-r">
                  <span className="text-xs font-semibold uppercase text-slate-500">Paste</span>
                  <p className="mt-1 text-sm font-medium text-gray-900">Raw log</p>
                </div>
                <div className="flex items-center justify-center border-b border-gray-200 bg-amber-50/50 p-2 sm:border-b-0 sm:border-r">
                  <ArrowRight className="h-5 w-5 text-amber-600" />
                </div>
                <div className="border-b border-gray-200 bg-slate-50 p-4 text-center sm:border-b-0 sm:border-r">
                  <span className="text-xs font-semibold uppercase text-slate-500">Unescape</span>
                  <p className="mt-1 text-sm font-medium text-gray-900">Nested JSON</p>
                </div>
                <div className="flex items-center justify-center border-b border-gray-200 bg-amber-50/50 p-2 sm:border-b-0 sm:border-r">
                  <ArrowRight className="h-5 w-5 text-amber-600" />
                </div>
                <div className="bg-slate-50 p-4 text-center">
                  <span className="text-xs font-semibold uppercase text-slate-500">Decode + Scrub</span>
                  <p className="mt-1 text-sm font-medium text-gray-900">JWT, epoch, paths</p>
                </div>
              </div>
            </div>

            <ol className="mb-6 list-decimal space-y-3 pl-6 text-gray-700">
              <li>
                <strong>Paste the raw log</strong> into a single input (one text area). No need to split or pre-edit.
              </li>
              <li>
                <strong>Unescape.</strong> The tool recursively parses string values that look like JSON (start with{' '}
                <code>{'{'}</code> or <code>[</code>) until the structure is fully expanded. Depth limit (e.g. 10)
                prevents runaway parsing.
              </li>
              <li>
                <strong>Decode JWTs.</strong> Strings that match JWT format (three segments, valid header with{' '}
                <code>alg</code>) are decoded to header + payload. Bearer prefix is stripped automatically.
              </li>
              <li>
                <strong>Convert epoch.</strong> Numbers that look like 10- or 13-digit Unix time get a human-readable
                ISO date next to them.
              </li>
              <li>
                <strong>Sanitize.</strong> Paths like <code>/Users/name/</code> or <code>C:\Users\name\</code> are
                scrubbed to use <code>~</code> so you can share the log without exposing local identities. Use “Copy
                AI-safe” for a version with tokens and secrets redacted.
              </li>
            </ol>
          </section>

          {/* Why */}
          <section className="mb-10">
            <h2 className="mb-4 flex items-center gap-2 text-3xl font-bold text-gray-900">
              <CheckCircle className="h-8 w-8 text-green-600" />
              Why “In Seconds” and One Tool?
            </h2>
            <p className="mb-4 leading-relaxed text-gray-700">
              Doing this with five different sites (unescaper, jwt.io, epoch converter, find-replace for paths) takes
              minutes and increases the chance of leaking a token or path. One tool means one paste, one click, and
              optionally one “Copy AI-safe” for sharing. Because the steps are ordered (unescape first, then decode,
              then scrub), you get consistent results. Client-side-only execution means the log never leaves your
              machine until you choose to copy a sanitized version—so you can safely paste production or sensitive logs
              and still get out of stringified JSON hell in seconds.
            </p>
          </section>

          {/* JWT / Epoch tips */}
          <section className="mb-10">
            <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-gray-900">
              <Key className="h-6 w-6 text-blue-600" />
              Quick Tips: JWT and Epoch
            </h2>
            <p className="mb-4 leading-relaxed text-gray-700">
              <strong>JWT:</strong> Only decode if the string has three base64url segments and the decoded header
              contains <code>alg</code>—that avoids misclassifying hostnames or random strings. If the value is
              “Bearer &lt;token&gt;”, the tool should strip the prefix and decode only the token. <strong>Epoch:</strong> 10
              digits = seconds (e.g. 1516239022 → 2018-01-17); 13 digits = milliseconds (e.g. 1740932654000 →
              2025-03-02). Plausible range checks (e.g. 2015–2035) reduce false positives. For sharing, use the
              human-readable date in the sanitized export so readers don’t need to convert.
            </p>
          </section>

          {/* Summary table */}
          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">At a Glance</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 text-left text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="border-b border-gray-200 px-4 py-2 font-semibold text-gray-900">Problem</th>
                    <th className="border-b border-gray-200 px-4 py-2 font-semibold text-gray-900">Fix</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  <tr className="border-b border-gray-100">
                    <td className="px-4 py-2 font-medium">Stringified / escaped JSON</td>
                    <td className="px-4 py-2">Recursive parse with depth limit.</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="px-4 py-2 font-medium">JWT in auth / token field</td>
                    <td className="px-4 py-2">Decode header + payload; optional PII mask.</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="px-4 py-2 font-medium">Epoch timestamp</td>
                    <td className="px-4 py-2">Convert to ISO date; show both in output.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-medium">Paths in stack / message</td>
                    <td className="px-4 py-2">Scrub usernames to ~; “Copy AI-safe” for share.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="rounded-lg border-2 border-primary-200 bg-primary-50 p-6">
            <p className="mb-2 font-semibold text-primary-900">Get out of JSON hell in seconds</p>
            <p className="mb-4 text-sm text-primary-800">
              Log Unpacker: unescape, decode JWTs, convert epoch, sanitize paths—all in the browser, no uploads.
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
