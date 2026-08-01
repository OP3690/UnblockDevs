import type { Metadata } from 'next';
import MysqlJsonCompleteGuideClient from './client';

export const metadata: Metadata = {
  title: 'JSON in MySQL: Complete Guide | UnblockDevs',
  description: 'JSON in MySQL: data types, extract from columns, nested queries, 10 examples. Tips for efficient JSON.',
  keywords: [
    'unblock devs mysql',
    'unblockdevs mysql',
    'mysql json',
    'mysql json extract',
    'mysql json functions',
    'mysql nested json',
    'mysql json query',
    'mysql json data type',
    'mysql json manipulation',
    'mysql json examples',
    'mysql json best practices',
    'mysql json_extract boolean true comparison',
    'mysql json_extract boolean value',
    'mysql json_extract true false',
    'mysql json column query boolean'
  ],
  openGraph: {
    title: 'JSON in MySQL: Complete Guide',
    description: 'JSON in MySQL: data types, extract from columns, nested queries, 10 examples. Tips for efficient JSON.',
    type: 'article',
    publishedTime: '2025-01-30T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/mysql-json-complete-guide',
    images: [{ url: 'https://unblockdevs.com/api/og?title=JSON%20in%20MySQL%3A%20Complete%20Guide&emoji=%F0%9F%93%9D&desc=JSON%20in%20MySQL%3A%20data%20types%2C%20extract%20from%20columns%2C%20nested%20queries%2C%2010%20examples.%20Ti', width: 1200, height: 630, alt: 'JSON in MySQL: Complete Guide — UnblockDevs Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JSON in MySQL: Complete Guide',
    description: 'JSON in MySQL: data types, extract from columns, nested queries, 10 examples. Tips for efficient JSON.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/mysql-json-complete-guide' },

};

export default function MysqlJsonCompleteGuide() {
  return <MysqlJsonCompleteGuideClient />;
}

