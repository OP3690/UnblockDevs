import type { Metadata } from 'next';
import Link from 'next/link';
import JsonComparatorClient from './client';

export const metadata: Metadata = {
  title: 'Smart JSON Data Diff - Semantic API Payload Comparison | UnblockDevs',
  description: 'Compare JSON by meaning, not text. Smart JSON Data Diff normalizes UUIDs, timestamps, JWTs, and hashes so only real logic changes appear. Client-side, private, no signup.',
  keywords: [
    'smart json diff',
    'json data diff',
    'semantic json comparison',
    'compare json api',
    'json diff tool',
    'compare json payloads',
    'json normalization',
    'api payload diff'
  ],
  openGraph: {
    title: 'Smart JSON Data Diff - Semantic API Payload Comparison',
    description: 'Compare JSON by meaning. Normalizes dynamic noise so only real logic changes appear. Client-side and private.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://unblockdevs.com/json-comparator',
  },
};

const faqSchema = {
  '@context': 'https://schema.org' as const,
  '@type': 'FAQPage' as const,
  mainEntity: [
    {
      '@type': 'Question' as const,
      name: 'What is a semantic JSON diff?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'A semantic diff compares two JSON payloads by meaning, not raw text. It normalizes dynamic values (UUIDs, timestamps, JWTs, hashes) so only real logic or structure changes are highlighted.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'How do I compare two API responses?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Paste or load two JSON documents into the Smart JSON Data Diff. Enable normalization for UUIDs, dates, and JWTs so noise is ignored. Use the side-by-side view with line numbers to see what actually changed.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'Is my JSON sent to a server?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'No. Comparison runs entirely in your browser. Your data never leaves your device.',
      },
    },
  ],
};

export default function JsonComparatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4" aria-labelledby="json-diff-heading">
        <h1 id="json-diff-heading" className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
          Smart JSON Data Diff — Semantic API Payload Comparison
        </h1>
        <p className="text-gray-700 text-base leading-relaxed mb-3">
          Compare two JSON payloads by meaning, not raw text. The tool normalizes UUIDs, timestamps, JWTs, and hashes so only real logic and structure changes stand out. All processing is client-side—your data never leaves your browser.
        </p>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          How it works: Paste or load two JSON documents. Enable normalization for dynamic fields. See a side-by-side diff with line numbers. Use it to validate API changes or spot semantic differences. No signup, no server upload.
        </p>
        <Link href="#tool" className="inline-block text-sm font-semibold text-indigo-600 hover:text-indigo-700">
          Use the tool →
        </Link>
      </article>
      <div id="tool">
        <JsonComparatorClient />
      </div>
    </>
  );
}
