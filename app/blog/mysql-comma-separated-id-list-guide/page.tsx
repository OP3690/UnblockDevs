import type { Metadata } from 'next';
import MysqlCommaSeparatedIdListGuideClient from './client';

export const metadata: Metadata = {
  title: 'MySQL Comma Separated ID List for IN Clause | UnblockDevs',
  description: 'Create comma separated ID lists for MySQL IN clause. Convert IDs, arrays. Examples, free formatter.',
  keywords: [
    'unblock devs mysql',
    'unblockdevs mysql',
    'comma separated ID list MySQL',
    'MySQL IN clause',
    'comma separated values MySQL',
    'convert IDs to comma separated list',
    'MySQL IN query',
    'SQL formatter',
    'comma separated IDs MySQL',
    'MySQL WHERE IN clause',
    'format ID list for MySQL',
    'comma separated list generator',
    'MySQL query formatter',
    'SQL IN clause formatter',
    'convert array to comma separated MySQL',
    'MySQL IN clause generator',
    'comma separated values formatter'
  ],
  openGraph: {
    title: 'MySQL Comma Separated ID List for IN Clause',
    description: 'Learn how to create comma separated ID lists for MySQL IN clause. Complete guide with examples and free SQL formatter tool.',
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
    description: 'Comma separated ID lists for MySQL IN. Free SQL formatter.',
  },  alternates: { canonical: 'https://unblockdevs.com/blog/mysql-comma-separated-id-list-guide' },

};

export default function MysqlCommaSeparatedIdListGuide() {
  return <MysqlCommaSeparatedIdListGuideClient />;
}

