import type { Metadata } from 'next';
import SqlFormatterClient from './client';

export const metadata: Metadata = {
  title: 'Free SQL Formatter Online - Format SQL Queries Instantly | UnblockDevs',
  description: 'UnblockDevs SQL Formatter: Format SQL queries instantly. Free online SQL formatter tool to beautify, format, and prettify SQL code with proper indentation and syntax highlighting. Supports MySQL, PostgreSQL, Oracle, and more. No signup required.',
  keywords: [
    'unblock devs mysql',
    'unblockdevs mysql',
    'sql formatter',
    'format sql online',
    'sql beautifier',
    'prettify sql',
    'sql formatter online',
    'format sql query',
    'sql code formatter',
    'sql prettifier',
    'mysql formatter',
    'mysql query formatter'
  ],
  openGraph: {
    title: 'UnblockDevs SQL Formatter - Format SQL Queries Instantly',
    description: 'UnblockDevs SQL Formatter: Format SQL queries instantly. Free online SQL formatter tool for MySQL, PostgreSQL, Oracle, and more.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://unblockdevs.com/sql-formatter',
  },
};

export default function SqlFormatterPage() {
  return <SqlFormatterClient />;
}
