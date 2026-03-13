import type { Metadata } from 'next';
import Link from 'next/link';
import LogUnpackerClient from './client';

const canonicalUrl = 'https://unblockdevs.com/log-unpacker';

export const metadata: Metadata = {
  title:
    'Log Unpacker — Unescape Stringified JSON, Decode JWTs, Convert Epoch Timestamps & Sanitize Logs for AI | UnblockDevs',
  description:
    'Recursively unescape nested JSON, decode JWTs, convert epoch timestamps, and scrub file paths from logs — all in your browser. AI-safe output ready to paste into ChatGPT. Free, no signup, nothing sent to servers.',
  keywords: [
    'unescape json logs',
    'decode jwt in logs',
    'log json unescaper',
    'stringified json decoder',
    'unescape nested json online',
    'parse stringified json online',
    'log sanitizer for chatgpt',
    'parse stringified json logs',
    'stringified json beautifier',
    'recursive json unescape',
    'decode jwt from logs',
    'jwt decoder logs',
    'epoch timestamp in logs converter',
    'convert epoch timestamp logs',
    'human readable timestamp logs',
    'sanitize logs before chatgpt',
    'safe logs for ai prompts',
    'scrub logs for chatgpt',
    'paste logs into chatgpt safely',
    'log file decoder online',
    'production log sanitizer',
    'log analysis tool browser',
    'how to unescape json in logs',
    'how to decode jwt from log file',
    'how to safely paste logs into chatgpt',
    'what is stringified json in logs',
    'Log Unpacker',
    'log unpacker tool',
  ],
  openGraph: {
    title: 'Log Unpacker — Unescape JSON, Decode JWTs, Epoch Timestamps & Sanitize for AI | UnblockDevs',
    description:
      'Unescape nested JSON, decode JWTs, convert epochs, scrub paths — all in your browser. AI-safe output for ChatGPT. Free, nothing sent to servers.',
    type: 'website',
    url: canonicalUrl,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Log Unpacker — Unescape JSON, Decode JWTs & Sanitize Logs for AI | UnblockDevs',
    description: 'One tool for stringified JSON, JWTs, epoch timestamps, path scrubbing. 100% in your browser.',
  },
  alternates: { canonical: canonicalUrl },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Log Unpacker — Unescape Stringified JSON, Decode JWTs, Sanitize Logs for AI',
  description:
    'Recursively unescape nested JSON, decode JWTs, convert epoch timestamps, and scrub file paths from logs. AI-safe output for ChatGPT. 100% browser-based. Nothing sent to servers.',
  url: canonicalUrl,
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  featureList: [
    'Recursively unescape nested stringified JSON',
    'Detect and decode JWTs inline (header + payload, optional PII masking)',
    'Convert 10- and 13-digit epoch timestamps to human-readable dates',
    'Scrub Windows/Unix file paths (usernames redacted)',
    'AI-safe output — ready to paste into ChatGPT or any AI',
    '100% client-side — no data sent to any server',
  ],
};

const faqSchema = {
  '@context': 'https://schema.org' as const,
  '@type': 'FAQPage' as const,
  mainEntity: [
    {
      '@type': 'Question' as const,
      name: 'How do I unescape stringified JSON from logs?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Paste your log line into Log Unpacker at unblockdevs.com/log-unpacker. It recursively unescapes nested JSON strings, even multiple levels deep, and outputs clean readable JSON entirely in your browser.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'How do I decode a JWT token found in log files?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Log Unpacker automatically detects JWT tokens embedded in log output and decodes the header and payload inline. It also optionally masks PII fields like sub, name, and email.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'Is it safe to paste production logs into ChatGPT?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Not without sanitizing first. Logs often contain JWTs, file paths with usernames, and sensitive data. Log Unpacker produces an AI-safe output with paths and tokens scrubbed — safe to paste into ChatGPT or any AI tool.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'How do I convert epoch timestamps in logs to readable dates?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Log Unpacker detects both 10-digit and 13-digit epoch timestamps automatically and converts them to human-readable date strings as part of the unpacking process.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'Does Log Unpacker send my logs to a server?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'No. Everything runs in your browser. No network requests, no storage, no telemetry. Safe for sensitive production logs.',
      },
    },
  ],
};

export default function LogUnpackerPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4" aria-labelledby="log-unpacker-heading">
        <h1 id="log-unpacker-heading" className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
          Log Unpacker — Unescape Stringified JSON, Decode JWTs, Convert Epoch Timestamps &amp; Sanitize Logs for AI
        </h1>
        <p className="text-gray-700 text-base leading-relaxed mb-3">
          Recursively unescape nested JSON, decode JWTs embedded in logs, convert epoch timestamps to readable dates, and scrub file paths—all in your browser. No data is sent to our servers. Sanitize logs before pasting into ChatGPT or any AI.
        </p>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          How it works: Paste a log line or blob of escaped JSON. The tool recursively unescapes nested JSON, decodes JWTs, humanizes epochs, and optionally redacts paths. Copy the AI-safe output. No signup, no tracking.
        </p>
        <Link href="#tool" className="inline-block text-sm font-semibold text-amber-600 hover:text-amber-700">
          Use the tool →
        </Link>
      </article>
      <div id="tool">
        <LogUnpackerClient />
      </div>
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12" aria-labelledby="log-unpacker-faq-heading">
        <h2 id="log-unpacker-faq-heading" className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
          Log Unpacker — FAQs &amp; How-To
        </h2>

        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-2">What is stringified JSON in logs?</h2>
        <p className="text-gray-700 text-base leading-relaxed mb-4">
          Stringified JSON is JSON that has been turned into a string (e.g. escaped quotes and backslashes), often when logs or APIs nest one JSON payload inside another. You end up with <code className="rounded bg-gray-100 px-1 py-0.5 text-sm">{`\"key\":\"value\"`}</code> instead of readable <code className="rounded bg-gray-100 px-1 py-0.5 text-sm">key: value</code>. Log Unpacker recursively unescapes these strings so you get clean, readable JSON—and can safely paste the result into AI.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-2">How to decode a JWT embedded in logs</h2>
        <p className="text-gray-700 text-base leading-relaxed mb-4">
          Paste your log line into Log Unpacker. It automatically detects JWT tokens (Bearer tokens, auth headers, or inline in the log), decodes the header and payload, and shows them in readable form. You can enable &quot;Mask PII in JWT&quot; to redact <code className="rounded bg-gray-100 px-1 py-0.5 text-sm">sub</code>, <code className="rounded bg-gray-100 px-1 py-0.5 text-sm">name</code>, and <code className="rounded bg-gray-100 px-1 py-0.5 text-sm">email</code> so the output is safe to paste into ChatGPT.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-2">How to convert epoch timestamps in log files</h2>
        <p className="text-gray-700 text-base leading-relaxed mb-4">
          Log Unpacker detects both 10-digit (seconds) and 13-digit (milliseconds) epoch/unix timestamps in your logs and converts them to human-readable date strings automatically. No separate epoch converter tab needed—paste the log, get unpacked output with readable timestamps.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-2">How to safely paste logs into ChatGPT</h2>
        <p className="text-gray-700 text-base leading-relaxed mb-4">
          Production logs often contain JWTs, file paths with usernames, and other sensitive identifiers. Use Log Unpacker first: paste your log, enable path scrubbing and optional JWT PII masking, then copy the &quot;AI-safe&quot; output. That version has paths and tokens sanitized—safe to paste into ChatGPT or any AI tool for debugging help.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-2">Why scrubbing file paths from logs matters</h2>
        <p className="text-gray-700 text-base leading-relaxed mb-4">
          Logs frequently include full Windows or Unix paths (e.g. <code className="rounded bg-gray-100 px-1 py-0.5 text-sm">/Users/jane/project/...</code>), which expose usernames and directory structure. When you paste such logs into AI, you leak that information. Log Unpacker scrubs these paths (replacing usernames with ~) so the output is safe to share.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-2">How do I unescape stringified JSON from logs?</h2>
        <p className="text-gray-700 text-base leading-relaxed mb-4">
          Paste your log line into Log Unpacker. It recursively unescapes nested JSON strings—even multiple levels deep—and outputs clean, readable JSON instantly in your browser. No server round-trip.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-2">Does Log Unpacker send my logs to a server?</h2>
        <p className="text-gray-700 text-base leading-relaxed mb-4">
          No. Everything runs in your browser. No network requests, no storage, no telemetry. Safe for sensitive or production logs.
        </p>

        <p className="text-gray-600 text-sm mt-8">
          For masking <strong>code</strong> (API keys, variables) before sending to AI, use{' '}
          <Link href="/code-prompt-shield" className="text-amber-600 hover:text-amber-700 font-medium">
            Code Prompt Shield
          </Link>
          . For <strong>JSON payloads</strong> (keys/values), use{' '}
          <Link href="/json-prompt-shield" className="text-amber-600 hover:text-amber-700 font-medium">
            JSON Prompt Shield
          </Link>
          . For <strong>database schemas</strong>, use{' '}
          <Link href="/ai-schema-masker" className="text-amber-600 hover:text-amber-700 font-medium">
            AI Schema Masker
          </Link>
          —same AI-safe idea for every format.
        </p>
      </article>
    </>
  );
}
