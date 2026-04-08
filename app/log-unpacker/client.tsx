'use client';

import Link from 'next/link';
import ToolPageShell from '@/components/tools/ToolPageShell';
import type { BreadcrumbItem } from '@/components/Breadcrumb';
import dynamic from 'next/dynamic';

const LogUnpacker = dynamic(() => import('@/components/tools/LogUnpacker'), {
  loading: () => (
    <div className="flex items-center justify-center py-12">
      <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-emerald-700" />
    </div>
  ),
});

const JSON_BREADCRUMB: BreadcrumbItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Tools', href: '/tools/json' },
  { label: 'JSON', href: '/tools/json' },
  { label: 'Log Unpacker' },
];

export default function LogUnpackerClient() {
  return (
    <ToolPageShell
      showFooterBand={false}
      breadcrumbItems={JSON_BREADCRUMB}
      title="Log Unpacker — Unescape Stringified JSON, Decode JWTs, Epoch Timestamps & Sanitize for AI"
      subtitle="Recursively unescape nested JSON, decode JWTs, convert epoch timestamps, scrub paths. 100% client-side. AI-safe output."
      toolName="log_unpacker"
      tool={<LogUnpacker />}
      belowCard={
        <article className="max-w-none">
          <section className="mb-12">
            <h2 className="mb-6 text-3xl font-bold text-gray-900">What This Tool Does</h2>
            <p className="mb-4 leading-relaxed text-gray-700">
              Logs and APIs often ship <strong>stringified JSON</strong>, <strong>JWTs</strong>, <strong>epoch
              timestamps</strong>, and <strong>local file paths</strong>. Debugging means juggling multiple tabs:
              unescapers, jwt.io, epoch converters, and manual path editing. This engine does it in one place,
              in-browser, with no data sent to any server.
            </p>
            <ul className="mb-6 ml-4 list-disc space-y-2 text-gray-700">
              <li>Recursively unescape nested stringified JSON (safe depth limit)</li>
              <li>Detect and decode JWTs inline (header + payload)</li>
              <li>Detect epoch timestamps (10- and 13-digit) and show human-readable dates</li>
              <li>Detect and scrub Windows/Unix paths (usernames replaced with ~)</li>
              <li>Optional Base64 detection and decode</li>
              <li>Output an AI-safe copy: paths and tokens sanitized, ready to paste into prompts</li>
            </ul>
            <div className="mt-6 rounded-r-lg border-l-4 border-primary-500 bg-primary-50 p-5">
              <p className="mb-2 font-semibold text-primary-900">Privacy</p>
              <p className="text-sm text-primary-800">
                No network requests, no telemetry, no storage. Everything runs in memory in your browser. Safe for
                sensitive logs.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="mb-3 text-xl font-bold text-gray-900">Sanitize before AI</h2>
            <p className="mb-4 text-sm text-gray-600">
              Mask or sanitize data before pasting into ChatGPT: <Link href="/code-prompt-shield" className="text-primary-600 hover:text-primary-700 font-medium">Code Prompt Shield</Link> (code),{' '}
              <Link href="/json-prompt-shield" className="text-primary-600 hover:text-primary-700 font-medium">JSON Prompt Shield</Link> (JSON payloads),{' '}
              <Link href="/ai-schema-masker" className="text-primary-600 hover:text-primary-700 font-medium">AI Schema Masker</Link> (SQL/schemas).
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-6 text-3xl font-bold text-gray-900">Related Tools</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <Link
                href="/json-beautifier"
                className="rounded-lg border border-gray-200 bg-gray-50 p-4 transition-colors hover:bg-gray-100"
              >
                <h3 className="font-semibold text-gray-900">JSON Beautifier</h3>
                <p className="text-sm text-gray-700">Format and prettify JSON</p>
              </Link>
              <Link
                href="/log-explorer"
                className="rounded-lg border border-gray-200 bg-gray-50 p-4 transition-colors hover:bg-gray-100"
              >
                <h3 className="font-semibold text-gray-900">Log Explorer</h3>
                <p className="text-sm text-gray-700">Explore and analyze log files</p>
              </Link>
              <Link
                href="/json-schema-generation"
                className="rounded-lg border border-gray-200 bg-gray-50 p-4 transition-colors hover:bg-gray-100"
              >
                <h3 className="font-semibold text-gray-900">Schema Generator</h3>
                <p className="text-sm text-gray-700">Generate schemas from JSON</p>
              </Link>
              <Link
                href="/test-data-generator"
                className="rounded-lg border border-gray-200 bg-gray-50 p-4 transition-colors hover:bg-gray-100"
              >
                <h3 className="font-semibold text-gray-900">Test Data Generator</h3>
                <p className="text-sm text-gray-700">Generate test data</p>
              </Link>
            </div>
          </section>
        </article>
      }
    />
  );
}
