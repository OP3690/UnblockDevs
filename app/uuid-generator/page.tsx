import type { Metadata } from 'next';
import Link from 'next/link';
import TrackedCtaLink from '@/components/TrackedCtaLink';
import { ToolPageFooterBand } from '@/components/tools/ToolPageShell';
import UuidGeneratorClient from './client';

const canonicalUrl = 'https://unblockdevs.com/uuid-generator';

export const metadata: Metadata = {
  title: 'UUID / GUID Generator — Generate v1, v4, v7 UUIDs, Validate, Analyze & Bulk Export Online Free | UnblockDevs',
  description:
    'Generate UUIDs and GUIDs for all versions — v1, v3, v4, v5, v6, v7, v8. Bulk generate up to 1,000, validate, analyze, compare, and export to JSON, CSV, or SQL. Free, 100% browser-based, cryptographically secure.',
  keywords: [
    'uuid generator online',
    'guid generator online',
    'uuid generator free',
    'generate uuid online',
    'random uuid generator',
    'uuid v4 generator',
    'uuid v7 generator',
    'uuid v1 generator',
    'uuid v5 generator',
    'namespace uuid generator',
    'bulk uuid generator',
    'generate multiple uuids online',
    'uuid analyzer',
    'decode uuid online',
    'uuid validator online',
    'validate uuid online',
    'guid generator',
    'GUID generator online',
    'uuid collision probability calculator',
    'uuid primary key database',
    'generate uuid for sql insert',
    'UUID / GUID Generator',
    'uuid generator postgresql',
    'uuid generator aws dynamodb',
    'uuid v7 nodejs',
    'uuid react application',
    'supabase uuid',
  ],
  openGraph: {
    title: 'UUID / GUID Generator — Generate v1, v4, v7 UUIDs, Validate & Bulk Export | UnblockDevs',
    description:
      'Generate UUIDs v1–v8, validate, analyze, compare, bulk export to JSON/CSV/SQL. 100% browser-based, cryptographically secure. No UUID data sent to servers.',
    type: 'website',
    url: canonicalUrl,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UUID / GUID Generator — v1–v8, Bulk, Validate, Analyze | UnblockDevs',
    description: 'Generate UUIDs v1–v8. Bulk, validate, analyze, compare, export. 100% in your browser.',
  },
  alternates: {
    canonical: canonicalUrl,
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'UUID / GUID Generator — v1–v8, Validate, Analyze & Bulk Export',
  description:
    'Generate UUIDs for all versions (v1–v8). Validate, analyze, compare, calculate collision probability, bulk export to JSON/CSV/SQL. 100% browser-based and cryptographically secure. No UUID data sent to any server.',
  url: canonicalUrl,
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  featureList: [
    'Generate UUID v1, v3, v4, v5, v6, v7, v8',
    'Bulk generate up to 1,000 UUIDs',
    'UUID validator and analyzer',
    'Compare two UUIDs',
    'Collision probability calculator',
    'Export to JSON, CSV, SQL INSERT',
    '100% client-side — no UUID data sent to any server',
  ],
};

const faqSchema = {
  '@context': 'https://schema.org' as const,
  '@type': 'FAQPage' as const,
  mainEntity: [
    {
      '@type': 'Question' as const,
      name: 'What is the difference between UUID and GUID?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: "They are the same thing. GUID is Microsoft's term for UUID. Both follow the RFC 4122 standard and are completely interchangeable. GUID is common in Windows and .NET development; UUID is used everywhere else.",
      },
    },
    {
      '@type': 'Question' as const,
      name: 'What is the difference between UUID v4 and v7?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'UUID v4 is purely random. UUID v7 encodes a Unix millisecond timestamp in the first 48 bits making it time-sortable. v7 is recommended for database primary keys because records insert in chronological order, improving index performance significantly.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'Can two UUIDs ever be the same?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'In practice, virtually impossible. A v4 UUID has 2^122 possible values. To have a 50% chance of a collision you would need to generate approximately 2.7 quintillion UUIDs. Use the collision probability calculator at unblockdevs.com/uuid-generator to see exact probabilities for your use case.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'Should I use UUID v4 or v7 for database primary keys?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'UUID v7 for new applications. It is time-sortable which means records insert in chronological order, dramatically improving database index performance compared to random v4 UUIDs. v4 is still fine for non-database use cases.',
      },
    },
  ],
};

export default function UuidGeneratorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <UuidGeneratorClient />
      <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-gray-200" aria-labelledby="uuid-heading">
        <h1 id="uuid-heading" className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
          UUID / GUID Generator — Generate v1, v4, v7 UUIDs, Validate, Analyze &amp; Bulk Export Online Free
        </h1>
        <p className="text-gray-700 text-base leading-relaxed mb-3">
          Generate UUIDs for all versions (v1 timestamp, v3 MD5 namespace, v4 random, v5 SHA-1 namespace, v6/v7 time-ordered, v8 custom).
          Validate, analyze, compare, and export. Runs entirely in your browser — no UUID data is sent to any server.
        </p>
        <TrackedCtaLink href="#tool" toolName="uuid_generator" className="inline-block text-sm font-semibold text-primary-600 hover:text-primary-700">
          Use the tool →
        </TrackedCtaLink>
      </article>

      <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12" aria-labelledby="uuid-learn-heading">
        <h2 id="uuid-learn-heading" className="text-2xl font-bold text-gray-900 mb-4">
          What Is a UUID?
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          A UUID (Universally Unique Identifier) is a 128-bit label used to uniquely identify information in computer systems. Standardized in
          RFC 4122, a UUID is typically displayed as 32 hexadecimal digits in five groups separated by hyphens:
        </p>
        <p className="font-mono text-sm bg-gray-100 p-3 rounded-lg text-gray-800 mb-4">
          xxxxxxxx-xxxx-Mxxx-Nxxx-xxxxxxxxxxxx
        </p>
        <p className="text-gray-700 leading-relaxed mb-6">
          Where <strong>M</strong> indicates the UUID version and <strong>N</strong> indicates the variant. UUIDs are used as database primary
          keys, session IDs, transaction IDs, correlation IDs, and anywhere a globally unique identifier is needed without coordination.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">UUID vs GUID</h2>
        <p className="text-gray-700 leading-relaxed mb-6">
          GUID (Globally Unique Identifier) is Microsoft&apos;s term for UUID. They are functionally identical — a GUID is a UUID. The term GUID is
          common in Windows and .NET development; UUID is used everywhere else.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">UUID Versions Explained (v1–v8)</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6 ml-2">
          <li><strong>v1</strong> — Timestamp-based (time + node). Unique but may leak device/network info. Sortable by time.</li>
          <li><strong>v3</strong> — Deterministic namespace UUID using MD5 (same namespace + name → same UUID).</li>
          <li><strong>v4</strong> — Random. Most common. 122 bits of randomness. Use for most non-time-ordered needs.</li>
          <li><strong>v5</strong> — Deterministic namespace UUID using SHA-1. Preferred over v3 for deterministic IDs.</li>
          <li><strong>v6</strong> — Reordered v1 (time-ordered / DB-friendly sort order).</li>
          <li><strong>v7</strong> — Unix timestamp + random. Modern, sortable, database-optimized. Recommended for new apps.</li>
          <li><strong>v8</strong> — Custom. Application-defined layout.</li>
        </ul>

        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">Frequently Asked Questions</h2>
        <dl className="space-y-4">
          <div>
            <dt className="font-semibold text-gray-900">What is the difference between UUID and GUID?</dt>
            <dd className="text-gray-700 mt-1">
              They are the same thing. GUID is Microsoft&apos;s term for UUID and both follow the same RFC 4122 format.
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-gray-900">What is the difference between UUID v4 and v7?</dt>
            <dd className="text-gray-700 mt-1">
              v4 is purely random. v7 includes a Unix millisecond timestamp so it is time-sortable and index-friendly for databases.
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-gray-900">Can two UUIDs ever be the same?</dt>
            <dd className="text-gray-700 mt-1">
              Theoretically yes, but for v4 UUIDs it&apos;s practically impossible. Use the collision probability calculator in the tool to see exact
              probabilities for your scale.
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-gray-900">What is a namespace UUID (v3 and v5)?</dt>
            <dd className="text-gray-700 mt-1">
              Namespace UUIDs are deterministic — the same namespace and name always produce the same UUID. v3 uses MD5, v5 uses SHA-1. Use them
              when you want stable IDs for the same input (e.g. a URL or email).
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-gray-900">Should I use UUID or auto-increment for database IDs?</dt>
            <dd className="text-gray-700 mt-1">
              Auto-increment is simpler for single-database setups. UUIDs are better for distributed systems, offline ID creation, merging
              databases, and public APIs. UUID v7 minimizes index fragmentation compared to random v4 UUIDs.
            </dd>
          </div>
        </dl>

        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">Related Tools</h2>
        <p className="text-gray-700 leading-relaxed mb-2">
          <Link href="/hash-generator" className="text-primary-600 hover:underline font-medium">Hash Generator</Link> — UUID v3/v5 use MD5/SHA-1 namespace hashing.{' '}
          <Link href="/token-comparator" className="text-primary-600 hover:underline font-medium">Token Comparator</Link> — compare two UUIDs/tokens with visual diff.{' '}
          <Link href="/json-comparator" className="text-primary-600 hover:underline font-medium">JSON Comparator</Link> — semantic diff that can normalize UUID noise.{' '}
          <Link href="/base64-encoder" className="text-primary-600 hover:underline font-medium">Base64 Encoder</Link> — encode UUIDs as Base64 (or decode values).
        </p>
      </article>
      <ToolPageFooterBand toolName="uuid_generator" />
    </>
  );
}
