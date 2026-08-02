import type { Metadata } from 'next';
import MysqlCommaSeparatedIdListGuideClient from './client';

export const metadata: Metadata = {
  title: 'MySQL Comma Separated ID List for IN Clause | UnblockDevs',
  description: 'Build a comma-separated ID list for MySQL IN clause in seconds. Convert arrays, JSON, or pasted IDs to SQL-ready format with step-by-step examples and a free formatter.',
  keywords: [
    'comma separated ID list MySQL',
    'MySQL IN clause',
    'comma separated values MySQL',
    'convert IDs to comma separated list',
    'MySQL IN query',
    'comma separated IDs MySQL',
    'MySQL WHERE IN clause',
    'format ID list for MySQL',
    'MySQL IN clause generator',
    'SQL IN clause formatter',
    'convert array to comma separated MySQL',
    'how to create IN clause MySQL'
  ],
  openGraph: {
    title: 'MySQL Comma Separated ID List for IN Clause — Free SQL Formatter',
    description: 'Struggling to pass a list of IDs to MySQL IN clause? Learn how to build comma-separated ID lists from arrays, JSON, or plain text, with copy-ready examples and a free online formatter.',
    type: 'article',
    publishedTime: '2025-01-31T00:00:00.000Z',
    authors: ['UnblockDevs'],
    tags: ['MySQL', 'SQL', 'Database', 'SQL Formatter'],
    url: 'https://unblockdevs.com/blog/mysql-comma-separated-id-list-guide',
    images: [{ url: 'https://unblockdevs.com/api/og?title=MySQL%20Comma%20Separated%20ID%20List%20for%20IN%20Clause&emoji=%F0%9F%97%84%EF%B8%8F&desc=Learn%20how%20to%20create%20comma%20separated%20ID%20lists%20for%20MySQL%20IN%20clause', width: 1200, height: 630, alt: 'MySQL Comma Separated ID List for IN Clause — UnblockDevs Blog' }],

  },
  twitter: {
    card: 'summary_large_image',
    title: 'MySQL Comma Separated ID List for IN Clause',
    description: 'Convert arrays, JSON, or plain text IDs into a MySQL comma-separated IN clause in seconds. Step-by-step examples and a free online formatter.',
  },  alternates: { canonical: 'https://unblockdevs.com/blog/mysql-comma-separated-id-list-guide' },

};

export default function MysqlCommaSeparatedIdListGuide() {
  return <MysqlCommaSeparatedIdListGuideClient />;
}

