import type { Metadata } from 'next';
import MysqlCommaSeparatedIdListGuideClient from './client';

export const metadata: Metadata = {
  title: 'How to Create Comma Separated ID List for MySQL IN Clause - Complete Guide | UnblockDevs',
  description: 'Learn how to create comma separated ID lists for MySQL IN clause. Convert multiple IDs, arrays, and values into MySQL-friendly format. Complete guide with examples, best practices, and free SQL formatter tool.',
  keywords: [
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
    title: 'How to Create Comma Separated ID List for MySQL IN Clause - Complete Guide',
    description: 'Learn how to create comma separated ID lists for MySQL IN clause. Complete guide with examples and free SQL formatter tool.',
    type: 'article',
    publishedTime: '2025-01-31T00:00:00.000Z',
    authors: ['UnblockDevs'],
    tags: ['MySQL', 'SQL', 'Database', 'SQL Formatter'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Create Comma Separated ID List for MySQL IN Clause',
    description: 'Complete guide to creating comma separated ID lists for MySQL IN clause with free SQL formatter tool.',
  },
};

export default function MysqlCommaSeparatedIdListGuide() {
  return <MysqlCommaSeparatedIdListGuideClient />;
}

