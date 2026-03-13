import type { Metadata } from 'next';
import Link from 'next/link';
import JsonComparatorClient from './client';

const canonicalUrl = 'https://unblockdevs.com/json-comparator';

export const metadata: Metadata = {
  title:
    'JSON Comparator — Compare Two JSON Objects, Diff API Responses & Detect Semantic Changes Online Free | UnblockDevs',
  description:
    'Compare two JSON objects or API responses side-by-side. Semantic diff normalizes UUIDs, timestamps, JWTs, and hashes so only real logic changes show. Free, 100% browser-based, no data sent to servers.',
  keywords: [
    'json comparator online',
    'compare json online',
    'json diff tool',
    'json compare tool',
    'json diff online',
    'compare two json objects',
    'semantic json diff',
    'json diff ignore timestamps',
    'json compare ignore uuids',
    'compare api responses online',
    'api response diff tool',
    'compare json dev vs production',
    'compare expected actual json',
    'how to compare two json objects online',
    'how to compare api responses',
    'JSON Comparator',
  ],
  openGraph: {
    title: 'JSON Comparator — Compare JSON, Diff API Responses & Semantic Changes Online Free | UnblockDevs',
    description:
      'Compare two JSON objects or API responses. Semantic diff normalizes UUIDs, timestamps, JWTs so only real logic changes show. 100% browser-based.',
    type: 'website',
    url: canonicalUrl,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JSON Comparator — Compare JSON & Diff API Responses Online Free | UnblockDevs',
    description: 'Semantic diff: normalizes UUIDs, timestamps, JWTs. Only real logic changes show. 100% in your browser.',
  },
  alternates: { canonical: canonicalUrl },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'JSON Comparator — Compare Two JSON Objects, Diff API Responses & Semantic Changes',
  description:
    'Compare two JSON objects or API responses side-by-side. Semantic diff normalizes UUIDs, timestamps, JWTs, and hashes so only real logic changes appear. Free, 100% browser-based. No data sent to servers.',
  url: canonicalUrl,
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  featureList: [
    'Semantic JSON diff — normalizes UUIDs, timestamps, JWTs, hashes',
    'Side-by-side comparison with line numbers',
    'Unordered array comparison',
    'API response and config comparison',
    '100% client-side — no data sent to any server',
  ],
};

const faqSchema = {
  '@context': 'https://schema.org' as const,
  '@type': 'FAQPage' as const,
  mainEntity: [
    {
      '@type': 'Question' as const,
      name: 'How do I compare two JSON objects online?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Paste your first JSON into the left panel and your second JSON into the right panel at unblockdevs.com/json-comparator, then click Compare. Added fields show in green, removed in red, modified in yellow — with full nested object and array support.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'What is semantic JSON diff?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Semantic diff normalizes auto-generated dynamic values like UUIDs, timestamps, JWTs, and hashes before comparing. This filters out noise so only real logic and structure changes appear — unlike raw text diff which flags every changed character.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'How do I compare JSON and ignore timestamps and UUIDs?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Enable UUID, ISO date, Epoch, JWT, and Hash normalization options in JSON Comparator before clicking Compare. Dynamic fields are replaced with placeholders so they don\'t appear as false differences in the result.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'How do I detect breaking API changes with JSON comparison?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Paste your old API response in JSON A and new response in JSON B at unblockdevs.com/json-comparator. Enable semantic normalization to filter dynamic noise. Any remaining differences represent real structural or logic changes that may be breaking changes.',
      },
    },
  ],
};

export default function JsonComparatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4" aria-labelledby="json-diff-heading">
        <h1 id="json-diff-heading" className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
          JSON Comparator — Compare Two JSON Objects, Diff API Responses &amp; Detect Semantic Changes Online Free
        </h1>
        <p className="text-gray-700 text-base leading-relaxed mb-3">
          <strong>Every JSON diff tool shows you what changed. Only this one shows you what actually matters.</strong> Compare two JSON payloads by meaning, not raw text. The tool normalizes UUIDs, timestamps, JWTs, and hashes so only real logic and structure changes stand out. All processing is client-side—your data never leaves your browser.
        </p>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          Paste or load two JSON documents. Enable normalization for dynamic fields. See a side-by-side diff with line numbers. Use it to validate API changes or spot semantic differences. No signup, no server upload.
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
