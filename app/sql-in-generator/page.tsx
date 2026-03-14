import type { Metadata } from 'next';
import Link from 'next/link';
import TrackedCtaLink from '@/components/TrackedCtaLink';
import SqlInGeneratorClient from './client';

const canonicalUrl = 'https://unblockdevs.com/sql-in-generator';

export const metadata: Metadata = {
  title: 'SQL IN Clause Generator | UnblockDevs',
  description: 'Convert CSV, JSON, or IDs to SQL IN. Chunking, parameterized, range compression, INSERT. MySQL, PostgreSQL, Oracle, SQLite. Free.',
  keywords: [
    'SQL IN clause generator',
    'convert list to SQL IN',
    'comma separated list to SQL',
    'SQL IN clause builder',
    'convert IDs to SQL IN',
    'SQL IN clause formatter',
    'list to SQL IN online',
    'MySQL IN clause generator',
    'PostgreSQL IN clause',
    'parameterized SQL IN',
  ],
  openGraph: {
    title: 'SQL IN Clause Generator | UnblockDevs',
    description: 'Convert any list to SQL IN clause. Auto-detect format, chunking, multi-database, parameterized, range compression. Free and client-side.',
    type: 'website',
    url: canonicalUrl,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  alternates: { canonical: canonicalUrl },
};

const faqSchema = {
  '@context': 'https://schema.org' as const,
  '@type': 'FAQPage' as const,
  mainEntity: [
    {
      '@type': 'Question' as const,
      name: 'How do I convert a list of IDs to SQL IN clause?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Paste your IDs (CSV, JSON array, one per line, or tab-separated) into the SQL IN Generator. The tool auto-detects format, removes duplicates, and outputs a valid IN clause for MySQL, PostgreSQL, SQL Server, Oracle, or SQLite. You can also get parameterized queries, chunked OR blocks for large lists, and range compression.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'What is the maximum size of SQL IN clause?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Oracle has a limit of 1000 items per IN list. MySQL and others can handle more but performance may drop. Use the chunk size option to split into multiple OR id IN (...) blocks automatically.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'Can I get a parameterized SQL IN query to prevent SQL injection?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Yes. Enable "Parameterized" to get placeholders (?, $1,$2 for PostgreSQL, @p1 for SQL Server). Use these with your driver\'s prepared statements for secure queries.',
      },
    },
  ],
};

export default function SqlInGeneratorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div id="tool">
        <SqlInGeneratorClient />
      </div>
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-gray-200" aria-labelledby="sql-in-heading">
        <h1 id="sql-in-heading" className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
          SQL IN Clause Generator — Convert List to SQL IN, JSON, MongoDB
        </h1>
        <p className="text-gray-700 text-base leading-relaxed mb-3">
          Paste CSV, JSON array, newline or tab-separated values; the tool auto-detects format and outputs a clean SQL IN clause. Supports MySQL, PostgreSQL, SQL Server, Oracle, and SQLite. Optional chunking for large lists (e.g. Oracle 1000 limit), parameterized queries, range compression, and INSERT generator.
        </p>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          All processing runs in your browser. No data is sent to our servers. You can also export as JSON, CSV, GraphQL, or MongoDB <code className="text-sm bg-gray-100 px-1 rounded">$in</code> and share a link with your IDs.
        </p>
        <TrackedCtaLink href="#tool" toolName="sql_in_generator" className="inline-block text-sm font-semibold text-primary-600 hover:text-primary-700">
          Use the tool →
        </TrackedCtaLink>
      </article>
    </>
  );
}
