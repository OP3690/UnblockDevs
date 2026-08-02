import type { Metadata } from 'next';
import BlogPostClient from './client';

export const metadata: Metadata = {
  title: 'Convert List to SQL IN Clause — CSV, Excel, JSON | UnblockDevs',
  description: 'Convert a list of IDs from CSV, Excel, JSON, or plain text into a SQL IN clause in seconds. Works with MySQL, PostgreSQL, SQL Server, and Oracle databases.',
  keywords: [
    'convert list to sql in clause',
    'csv to sql in clause',
    'excel to sql in clause',
    'json to sql in clause',
    'ids to sql where in',
    'sql in clause generator online',
    'bulk ids sql in clause',
    'sql in list from excel column',
    'convert text to sql in clause',
    'sql where id in list online',
    'generate sql in clause from list',
    'how to build sql in clause from list'
  ],
  openGraph: {
    title: 'Convert Any List to SQL IN Clause — CSV, Excel, JSON, Newline Supported',
    description: 'Stop manually formatting ID lists for SQL. Paste CSV, Excel, JSON, or newline-separated values and get a clean SQL IN clause instantly for MySQL, PostgreSQL, SQL Server, and Oracle.',
    type: 'article',
    publishedTime: '2026-04-13T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/sql-list-to-in-clause',
    images: [{ url: 'https://unblockdevs.com/api/og?title=Convert%20Any%20List%20to%20SQL%20IN%20Clause%20%E2%80%94%20CSV%2C%20Excel%2C%20JSON&emoji=%F0%9F%97%84%EF%B8%8F&desc=Convert%20CSV%2C%20Excel%2C%20JSON%2C%20or%20newline-separated%20IDs%20into%20a%20SQL%20IN%20clause', width: 1200, height: 630, alt: 'Convert Any List to SQL IN Clause — CSV, Excel, JSON — UnblockDevs Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Convert List to SQL IN Clause — CSV, Excel, JSON',
    description: 'Paste IDs from CSV, Excel, JSON, or plain text to get a SQL IN clause in seconds. MySQL, PostgreSQL, SQL Server, and Oracle supported.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/sql-list-to-in-clause' },
};

export default function SqlListToInClausePage() {
  return <BlogPostClient />;
}
