import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowLeft,
  FileCode,
  Layers,
  Zap,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Code,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'How to Decode Stringified Nested JSON Logs (Without Using 5 Different Tools) | UnblockDevs',
  description:
    'Decode stringified JSON logs in one place. Learn what nested stringified JSON is, when it happens, and how to unescape and parse it without juggling multiple tools.',
  keywords: [
    'decode stringified JSON',
    'stringified JSON logs',
    'nested JSON decode',
    'unescape JSON',
    'parse stringified JSON',
    'JSON log decoder',
    'nested JSON parser',
    'log parsing',
    'escape JSON',
    'JSON unescape online',
  ],
  openGraph: {
    title: 'How to Decode Stringified Nested JSON Logs Without 5 Different Tools',
    description: 'Decode and parse stringified nested JSON logs in one place. No more juggling unescapers, jwt.io, and epoch converters.',
    type: 'article',
    publishedTime: '2025-03-02T00:00:00Z',
    authors: ['UnblockDevs'],
  },
};

export default function DecodeStringifiedNestedJsonLogsPage() {
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
            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
              JSON & Logs
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
            How to Decode Stringified Nested JSON Logs (Without Using 5 Different Tools)
          </h1>
          <p className="text-xl leading-relaxed text-gray-600">
            Stop switching between unescapers, jwt.io, and epoch converters. Learn what stringified nested JSON is and
            how to decode it in one place.
          </p>
        </header>

        <div className="prose prose-lg max-w-none rounded-lg bg-white p-8 shadow-md">
          {/* Definition */}
          <section className="mb-10">
            <h2 className="mb-4 flex items-center gap-2 text-3xl font-bold text-gray-900">
              <FileCode className="h-8 w-8 text-blue-600" />
              Definition: What Is Stringified Nested JSON?
            </h2>
            <p className="mb-4 leading-relaxed text-gray-700">
              <strong>Stringified nested JSON</strong> is JSON that has been turned into a string and then embedded
              inside another JSON value—often more than once. Each layer adds escape characters (backslashes and
              quotes), so what you see in logs looks like a long, hard-to-read string instead of a clean object.
            </p>
            <p className="mb-4 leading-relaxed text-gray-700">
              For example, a log entry might look like a long string full of backslashes and quotes—e.g. a
              <code className="rounded bg-gray-100 px-1.5 py-0.5 text-sm"> context </code>
              field whose value is the string
              <code className="rounded bg-gray-100 px-1.5 py-0.5 text-sm"> &quot;{\\&quot;service\\&quot;:\\&quot;api\\&quot;}&quot; </code>
              instead of a nested object. The outer quotes and backslashes are the &quot;stringification&quot;—the real
              payload is JSON buried inside.
            </p>
            <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-4">
              <p className="text-sm font-semibold text-blue-900">In short</p>
              <p className="text-blue-800">
                Stringified nested JSON = JSON stored as a string inside JSON, possibly multiple levels deep, with
                escape characters that make it look like gibberish until you decode it.
              </p>
            </div>
          </section>

          {/* What */}
          <section className="mb-10">
            <h2 className="mb-4 flex items-center gap-2 text-3xl font-bold text-gray-900">
              <Layers className="h-8 w-8 text-blue-600" />
              What You Actually Have (Structure)
            </h2>
            <p className="mb-4 leading-relaxed text-gray-700">
              When your logging framework or API returns &quot;stringified nested JSON,&quot; you have:
            </p>
            <ul className="mb-6 list-disc space-y-2 pl-6 text-gray-700">
              <li>
                <strong>Layer 1:</strong> A top-level object (e.g. <code>timestamp</code>, <code>level</code>,{' '}
                <code>context</code>).
              </li>
              <li>
                <strong>Layer 2:</strong> One or more values that are <em>strings</em> but contain valid JSON when
                unescaped (e.g. <code>context</code> is a string like <code>&quot;{\\'&quot;service\\'&quot;: ...}&quot;</code>).
              </li>
              <li>
                <strong>Layer 3+:</strong> Inside that string, there may be another JSON string (e.g. a{' '}
                <code>payload</code> or <code>metadata</code> field that is again a stringified object).
              </li>
            </ul>
            <p className="mb-4 leading-relaxed text-gray-700">
              So structurally you have: <strong>object → string (that is JSON) → possibly another string (that is
              JSON)</strong>. Decoding means repeatedly parsing those strings until you get plain objects and primitives.
            </p>
          </section>

          {/* When */}
          <section className="mb-10">
            <h2 className="mb-4 flex items-center gap-2 text-3xl font-bold text-gray-900">
              <AlertCircle className="h-8 w-8 text-amber-600" />
              When Does Stringified Nested JSON Appear?
            </h2>
            <p className="mb-4 leading-relaxed text-gray-700">
              This pattern shows up whenever systems serialize data multiple times or pass JSON through string-only
              channels:
            </p>
            <ul className="mb-6 list-disc space-y-2 pl-6 text-gray-700">
              <li>
                <strong>Structured logging:</strong> Loggers often stringify the &quot;context&quot; or
                &quot;metadata&quot; object so it fits in a single log line, producing one big string value.
              </li>
              <li>
                <strong>Message queues / event buses:</strong> Payloads are sometimes double-encoded so that the
                transport only deals with strings.
              </li>
              <li>
                <strong>API responses:</strong> Backends may return a field that is &quot;JSON as a string&quot; (e.g. a
                <code> config</code> or <code>payload</code> field) instead of a nested object.
              </li>
              <li>
                <strong>Error objects:</strong> Stack traces or error details are often serialized to a string and then
                embedded in a JSON log line.
              </li>
            </ul>
            <p className="mb-4 leading-relaxed text-gray-700">
              So you see it in <strong>logs, event payloads, API responses, and error reports</strong>—anywhere JSON is
              turned into a string and then wrapped again in JSON.
            </p>
          </section>

          {/* How - Flow */}
          <section className="mb-10">
            <h2 className="mb-4 flex items-center gap-2 text-3xl font-bold text-gray-900">
              <Zap className="h-8 w-8 text-blue-600" />
              How to Decode It (Step-by-Step Flow)
            </h2>
            <p className="mb-4 leading-relaxed text-gray-700">
              Decoding stringified nested JSON follows a simple, repeatable flow. You don’t need five different tools—one
              pipeline can do it.
            </p>

            <div className="mb-6 overflow-hidden rounded-lg border border-gray-200">
              <div className="grid grid-cols-1 gap-0 sm:grid-cols-5">
                <div className="border-b border-gray-200 bg-slate-50 p-4 text-center sm:border-b-0 sm:border-r">
                  <span className="text-xs font-semibold uppercase text-slate-500">Step 1</span>
                  <p className="mt-1 text-sm font-medium text-gray-900">Raw log line</p>
                  <p className="text-xs text-gray-600">Single string</p>
                </div>
                <div className="flex items-center justify-center border-b border-gray-200 bg-blue-50/50 p-2 sm:border-b-0 sm:border-r">
                  <ArrowRight className="h-5 w-5 text-blue-600" />
                </div>
                <div className="border-b border-gray-200 bg-slate-50 p-4 text-center sm:border-b-0 sm:border-r">
                  <span className="text-xs font-semibold uppercase text-slate-500">Step 2</span>
                  <p className="mt-1 text-sm font-medium text-gray-900">Parse once</p>
                  <p className="text-xs text-gray-600">JSON.parse</p>
                </div>
                <div className="flex items-center justify-center border-b border-gray-200 bg-blue-50/50 p-2 sm:border-b-0 sm:border-r">
                  <ArrowRight className="h-5 w-5 text-blue-600" />
                </div>
                <div className="bg-slate-50 p-4 text-center">
                  <span className="text-xs font-semibold uppercase text-slate-500">Step 3+</span>
                  <p className="mt-1 text-sm font-medium text-gray-900">Repeat on strings</p>
                  <p className="text-xs text-gray-600">Until no string-JSON</p>
                </div>
              </div>
            </div>

            <ol className="mb-6 list-decimal space-y-3 pl-6 text-gray-700">
              <li>
                <strong>Parse the top level.</strong> Run <code>JSON.parse</code> on the raw log string. You get an
                object with keys like <code>timestamp</code>, <code>level</code>, <code>context</code>.
              </li>
              <li>
                <strong>Inspect each value.</strong> If a value is a string and it starts with <code>{'{{'}'}</code> or{' '}
                <code>[</code>, try <code>JSON.parse</code> on it. If it succeeds, you now have an object or array.
              </li>
              <li>
                <strong>Recurse.</strong> For every new object/array, repeat: for each string value that looks like
                JSON, parse it. Stop when no more values are stringified JSON (or when you hit a safe depth limit, e.g.
                10).
              </li>
            </ol>
            <p className="mb-4 leading-relaxed text-gray-700">
              This &quot;parse → inspect strings → parse again&quot; loop is the core of decoding stringified nested
              JSON. One tool that does this recursively replaces the need for multiple manual unescape steps.
            </p>
          </section>

          {/* Why */}
          <section className="mb-10">
            <h2 className="mb-4 flex items-center gap-2 text-3xl font-bold text-gray-900">
              <CheckCircle className="h-8 w-8 text-green-600" />
              Why Decode in One Place?
            </h2>
            <p className="mb-4 leading-relaxed text-gray-700">
              Manually decoding with five different tools is slow and error-prone: you copy to an unescaper, then to
              jwt.io for tokens, then to an epoch converter, then scrub paths by hand. A single pipeline that does
              recursive parse + JWT decode + epoch detection + path scrubbing:
            </p>
            <ul className="mb-6 list-disc space-y-2 pl-6 text-gray-700">
              <li>Keeps everything in one workflow so you don’t lose context.</li>
              <li>Reduces copy-paste mistakes and accidental exposure of secrets.</li>
              <li>Handles nested layers consistently with a fixed depth limit.</li>
              <li>Lets you export a sanitized version for sharing or AI without redoing steps.</li>
            </ul>
          </section>

          {/* Example & pitfalls */}
          <section className="mb-10">
            <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-gray-900">
              <Code className="h-6 w-6 text-blue-600" />
              Example: Before and After Decoding
            </h2>
            <p className="mb-4 leading-relaxed text-gray-700">
              Before decoding, a typical log line might look like one long string with lots of backslashes and quotes.
              After the first parse you get an object; after recursively parsing string values, nested objects like{' '}
              <code>context</code> and <code>request.payload</code> become real objects you can expand and search.
              Epoch timestamps can be shown as human-readable dates, and JWTs as decoded header and payload—all in the
              same view.
            </p>
            <p className="mb-4 leading-relaxed text-gray-700">
              <strong>Common pitfalls when decoding:</strong> (1) Forgetting to set a maximum recursion depth—malformed
              or malicious input can cause infinite loops. (2) Assuming every string that starts with{' '}
              <code>{'{{'}'}</code> is JSON—sometimes it’s a different format or corrupted. (3) Not handling parse
              errors: if one branch fails, the rest of the structure can still be decoded. (4) Exposing decoded data:
              when sharing with AI or teammates, use a sanitized export that scrubs paths and redacts tokens.
            </p>
          </section>

          {/* Summary table */}
          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Quick Reference</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 text-left text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="border-b border-gray-200 px-4 py-2 font-semibold text-gray-900">Aspect</th>
                    <th className="border-b border-gray-200 px-4 py-2 font-semibold text-gray-900">Summary</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  <tr className="border-b border-gray-100">
                    <td className="px-4 py-2 font-medium">Definition</td>
                    <td className="px-4 py-2">JSON stored as a string inside JSON, possibly multiple levels.</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="px-4 py-2 font-medium">What you have</td>
                    <td className="px-4 py-2">Object → string (JSON) → string (JSON) …</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="px-4 py-2 font-medium">When it appears</td>
                    <td className="px-4 py-2">Logs, queues, API responses, error payloads.</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="px-4 py-2 font-medium">How to decode</td>
                    <td className="px-4 py-2">Parse → for each string that looks like JSON, parse again (with depth limit).</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-medium">Why one tool</td>
                    <td className="px-4 py-2">Faster, fewer mistakes, consistent nesting, sanitized export.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="rounded-lg border-2 border-primary-200 bg-primary-50 p-6">
            <p className="mb-2 font-semibold text-primary-900">Try it in one place</p>
            <p className="mb-4 text-sm text-primary-800">
              Use the Log Unpacker to decode stringified nested JSON, JWTs, and epoch timestamps—all client-side, no
              data sent to servers.
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
