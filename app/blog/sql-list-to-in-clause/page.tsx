import type { Metadata } from 'next';
import BlogPostClient from './client';

export const metadata: Metadata = {
  title: 'Convert Any List to SQL IN Clause — CSV, Excel, JSON, Newline | UnblockDevs',
  description:
    'Convert a list of IDs from Excel, CSV, JSON, or any format to a SQL IN clause in seconds. Step-by-step guide for MySQL, PostgreSQL, SQL Server, Oracle. Includes parameterized queries, chunking, and SQL INSERT methods.',
  keywords: [
    'convert list to sql in clause',
    'list to sql in clause',
    'csv to sql in clause',
    'excel to sql in clause',
    'json to sql in clause',
    'ids to sql where in',
    'sql in clause from spreadsheet',
    'convert csv to sql query',
    'paste list into sql in clause',
    'sql in clause generator online',
    'bulk ids sql in clause',
    'sql in list from excel column',
    'convert text to sql in clause',
    'sql where id in list online',
    'generate sql in clause from list',
  ],
  openGraph: {
    title: 'Convert Any List to SQL IN Clause — CSV, Excel, JSON | UnblockDevs',
    description: 'Convert CSV, Excel, JSON, or newline-separated IDs into a SQL IN clause. MySQL, PostgreSQL, SQL Server, Oracle. Parameterized queries, chunking, SQL INSERT.',
    type: 'article',
    publishedTime: '2026-04-13T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/sql-list-to-in-clause',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Convert Any List (CSV, Excel, JSON) to SQL IN Clause',
    description: 'Paste IDs from any source → get a SQL IN clause instantly. MySQL, PostgreSQL, Oracle, SQL Server supported.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/sql-list-to-in-clause' },
};

export default function SqlListToInClausePage() {
  return <BlogPostClient />;
}
