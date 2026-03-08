import type { Metadata } from 'next';
import Link from 'next/link';
import UuidGeneratorClient from './client';

export const metadata: Metadata = {
  title: 'UUID / GUID Generator — v1 v4 v7 All Versions | UnblockDevs',
  description:
    'Generate and analyze UUIDs (v1–v8). Validator, namespace generator, collision calculator, export to JSON/SQL. 100% in your browser — no data sent to any server.',
  keywords: [
    'uuid generator',
    'guid generator',
    'uuid v4',
    'uuid v7',
    'uuid validator',
    'uuid analyzer',
  ],
  openGraph: {
    title: 'UUID / GUID Generator — UnblockDevs',
    description: 'Generate UUIDs v1–v8, validate, analyze, compare. Namespace generator, export. 100% browser-based.',
    type: 'website',
    url: 'https://unblockdevs.com/uuid-generator',
  },
  alternates: {
    canonical: 'https://unblockdevs.com/uuid-generator',
  },
};

export default function UuidGeneratorPage() {
  return (
    <>
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4" aria-labelledby="uuid-heading">
        <h1 id="uuid-heading" className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
          UUID / GUID Generator
        </h1>
        <p className="text-gray-700 text-base leading-relaxed mb-3">
          Generate UUIDs for all versions (v1 timestamp, v3 MD5 namespace, v4 random, v5 SHA-1 namespace, v6/v7 time-ordered, v8 custom).
          Validate, analyze, compare, and export. Runs entirely in your browser — no UUID data is sent to any server.
        </p>
        <Link href="#tool" className="inline-block text-sm font-semibold text-primary-600 hover:text-primary-700">
          Use the tool →
        </Link>
      </article>
      <div id="tool">
        <UuidGeneratorClient />
      </div>
    </>
  );
}
