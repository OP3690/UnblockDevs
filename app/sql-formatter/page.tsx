import type { Metadata } from 'next';
import SqlFormatterClient from './client';

export const metadata: Metadata = {
  title: 'Free SQL Formatter Online - Format SQL Queries Instantly | UnblockDevs',
  description: 'Format SQL queries instantly. Free online SQL formatter tool to beautify, format, and prettify SQL code with proper indentation and syntax highlighting. No signup required.',
  keywords: [
    'sql formatter',
    'format sql online',
    'sql beautifier',
    'prettify sql',
    'sql formatter online',
    'format sql query',
    'sql code formatter',
    'sql prettifier'
  ],
  openGraph: {
    title: 'Free SQL Formatter Online - Format SQL Queries Instantly',
    description: 'Format SQL queries instantly. Free online SQL formatter tool.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://unblockdevs.com/sql-formatter',
  },
};

export default function SqlFormatterPage() {
  return <SqlFormatterClient />;
}
