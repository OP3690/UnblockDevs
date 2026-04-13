import type { Metadata } from 'next';
import BlogPostClient from './client';

export const metadata: Metadata = {
  title: 'SQL IN Clause — Complete Guide with Examples for MySQL, PostgreSQL & More | UnblockDevs',
  description:
    'Complete SQL IN clause guide: syntax, multiple values, subqueries, NOT IN, NULL handling, performance tips, Oracle 1000-item limit, parameterized queries. MySQL, PostgreSQL, SQL Server, Oracle, SQLite examples.',
  keywords: [
    'sql in clause',
    'sql in clause examples',
    'sql where in clause',
    'sql in clause multiple values',
    'sql in clause subquery',
    'sql not in clause',
    'mysql in clause',
    'postgresql in clause',
    'sql in clause performance',
    'sql in clause parameterized',
    'oracle in clause 1000 limit',
    'sql in clause vs join',
    'sql in clause null handling',
    'sql in clause list of ids',
    'sql where id in list',
  ],
  openGraph: {
    title: 'SQL IN Clause — Complete Guide with Examples | UnblockDevs',
    description: 'SQL IN clause: syntax, subqueries, NOT IN, NULL pitfalls, performance, Oracle 1000 limit, parameterized queries. MySQL, PostgreSQL, SQL Server, Oracle, SQLite.',
    type: 'article',
    publishedTime: '2026-04-13T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/sql-in-clause-guide',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SQL IN Clause — Complete Guide with Examples',
    description: 'Syntax, subqueries, NOT IN, NULL pitfalls, performance, Oracle limit, parameterized queries — everything about SQL IN clause.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/sql-in-clause-guide' },
};

export default function SqlInClauseGuidePage() {
  return <BlogPostClient />;
}
