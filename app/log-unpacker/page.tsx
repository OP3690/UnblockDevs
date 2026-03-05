import type { Metadata } from 'next';
import Link from 'next/link';
import LogUnpackerClient from './client';

export const metadata: Metadata = {
  title: 'Log Unpacker & Sanitizer - Unescape JSON, Decode JWT, Scrub Paths | UnblockDevs',
  description:
    'Client-side log unpacker: recursively unescape nested JSON, decode JWTs, detect epoch timestamps, scrub local paths. No server, no tracking. Safe for AI paste.',
  keywords: [
    'log unpacker',
    'json unescape',
    'jwt decoder',
    'epoch timestamp',
    'path scrubber',
    'log sanitizer',
    'client-side',
    'privacy',
  ],
  openGraph: {
    title: 'Log Unpacker & Sanitizer - Decode & Sanitize Logs',
    description: 'Unpack nested JSON, decode JWTs, scrub paths. 100% client-side, no data sent.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://unblockdevs.com/log-unpacker',
  },
};

const faqSchema = {
  '@context': 'https://schema.org' as const,
  '@type': 'FAQPage' as const,
  mainEntity: [
    {
      '@type': 'Question' as const,
      name: 'What does the Log Unpacker do?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'It unescapes nested stringified JSON, decodes embedded JWTs, humanizes epoch timestamps, and can scrub local file paths. Use it to clean logs before pasting into AI or for debugging.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'Is it safe to paste logs with sensitive data?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'All processing is client-side. Nothing is sent to our servers. You can enable path scrubbing to redact local paths. We do not store or log your input.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'How do I fix stringified JSON in logs?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Paste the log line or blob into the Log Unpacker. It recursively unescapes JSON strings so you get readable, formatted JSON. You can then copy or inspect the result.',
      },
    },
  ],
};

export default function LogUnpackerPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4" aria-labelledby="log-unpacker-heading">
        <h1 id="log-unpacker-heading" className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
          Log Unpacker — Unescape JSON, Decode JWTs, Scrub Paths. Safe for AI.
        </h1>
        <p className="text-gray-700 text-base leading-relaxed mb-3">
          Fix stringified JSON, decode JWTs embedded in logs, detect epoch timestamps, and scrub local file paths—all in your browser. No data is sent to our servers. Sanitize logs before pasting into ChatGPT or any AI.
        </p>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          How it works: Paste a log line or blob of escaped JSON. The tool recursively unescapes nested JSON, decodes JWTs, humanizes epochs, and optionally redacts paths. Copy the cleaned output. No signup, no tracking.
        </p>
        <Link href="#tool" className="inline-block text-sm font-semibold text-amber-600 hover:text-amber-700">
          Use the tool →
        </Link>
      </article>
      <div id="tool">
        <LogUnpackerClient />
      </div>
    </>
  );
}
