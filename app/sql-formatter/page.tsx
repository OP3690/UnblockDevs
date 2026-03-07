import type { Metadata } from 'next';
import SqlFormatterClient from './client';

export const metadata: Metadata = {
  title: 'Format Messy SQL Query – Clean SQL Queries Instantly | UnblockDevs',
  description: 'Format messy SQL query instantly. Clean SQL queries with proper indentation and syntax highlighting. Free online SQL formatter for MySQL, PostgreSQL, Oracle. Paste → instant fix. No signup.',
  keywords: [
    'format messy sql query',
    'clean sql queries instantly',
    'sql formatter',
    'format sql online',
    'sql beautifier',
    'prettify sql',
    'sql formatter online',
    'format sql query',
    'sql code formatter',
    'mysql formatter',
    'mysql query formatter',
  ],
  openGraph: {
    title: 'Format Messy SQL Query – Clean SQL Queries Instantly | UnblockDevs',
    description: 'Format messy SQL query and clean SQL queries instantly. Free online SQL formatter for MySQL, PostgreSQL, Oracle.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://unblockdevs.com/sql-formatter',
  },
};

export default function SqlFormatterPage() {
  return <SqlFormatterClient />;
}
