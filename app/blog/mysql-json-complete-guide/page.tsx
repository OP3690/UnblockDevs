import type { Metadata } from 'next';
import MysqlJsonCompleteGuideClient from './client';

export const metadata: Metadata = {
  title: 'MySQL JSON Complete Guide — Functions & Examples | UnblockDevs',
  description: 'Complete MySQL JSON guide: data types, JSON_EXTRACT, nested queries, JSON_SET and JSON_CONTAINS with 10 practical examples. Indexing and performance tips.',
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
    title: 'MySQL JSON Complete Guide — Functions & Examples | UnblockDevs',
    description: 'Complete MySQL JSON guide: data types, JSON_EXTRACT, nested queries, JSON_SET and JSON_CONTAINS with 10 practical examples. Indexing and performance tips.',
    type: 'article',
    publishedTime: '2025-01-30T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/mysql-json-complete-guide',
    images: [{ url: 'https://unblockdevs.com/api/og?title=JSON%20in%20MySQL%3A%20Complete%20Guide&emoji=%F0%9F%93%9D&desc=JSON%20in%20MySQL%3A%20data%20types%2C%20extract%20from%20columns%2C%20nested%20queries%2C%2010%20examples.%20Ti', width: 1200, height: 630, alt: 'JSON in MySQL: Complete Guide — UnblockDevs Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MySQL JSON Complete Guide — Functions & Examples',
    description: 'MySQL JSON: data types, JSON_EXTRACT, nested queries, JSON_SET, and JSON_CONTAINS with 10 practical examples and performance tips.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/mysql-json-complete-guide' },

};

export default function MysqlJsonCompleteGuide() {
  return <MysqlJsonCompleteGuideClient />;
}

