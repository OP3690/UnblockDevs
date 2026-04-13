import type { Metadata } from 'next';
import BlogPostClient from './client';

export const metadata: Metadata = {
  title: 'How to Format SQL Online — Beautify, Indent & Clean SQL Queries Instantly | UnblockDevs',
  description:
    'Format messy SQL online in one click. Covers SQL beautifier tools, keyword casing, indentation rules, minify vs pretty-print, and how to format SQL IN lists, subqueries, and CTEs. MySQL, PostgreSQL, SQL Server.',
  keywords: [
    'format sql online',
    'sql formatter online',
    'sql beautifier online',
    'sql pretty printer online',
    'format sql query online free',
    'clean sql query online',
    'sql indentation online',
    'mysql query formatter',
    'postgresql formatter online',
    'format sql select statement',
    'sql formatter tool',
    'online sql formatter free',
    'format messy sql',
    'sql keyword uppercase formatter',
    'sql beautify tool',
  ],
  openGraph: {
    title: 'How to Format SQL Online — Beautify SQL Queries Instantly | UnblockDevs',
    description: 'Format messy SQL in one click. SQL indentation, keyword casing, IN list formatting, subquery formatting. MySQL, PostgreSQL, SQL Server. Free online SQL beautifier.',
    type: 'article',
    publishedTime: '2026-04-13T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/how-to-format-sql-online',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Format SQL Online — SQL Beautifier Guide',
    description: 'Format, beautify, and clean SQL queries online. Covers indentation, keyword casing, IN lists, subqueries, CTEs.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/how-to-format-sql-online' },
};

export default function HowToFormatSqlOnlinePage() {
  return <BlogPostClient />;
}
