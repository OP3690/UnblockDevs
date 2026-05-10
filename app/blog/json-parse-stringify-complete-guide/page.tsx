import type { Metadata } from 'next';
import JsonParseStringifyClient from './client';

export const metadata: Metadata = {
  title: 'JSON.parse() and JSON.stringify() — The Complete Developer Guide | UnblockDevs',
  description: 'Master JSON.parse() and JSON.stringify() in JavaScript. Covers every option, replacer, reviver, error handling, edge cases, performance, and TypeScript-safe patterns.',
  keywords: [
    'JSON.parse complete guide',
    'JSON.stringify options',
    'json parse replacer reviver',
    'json stringify indent',
    'json parse error handling javascript',
    'json stringify custom serialization',
    'json parse typescript',
    'json stringify filter keys',
    'json deep clone javascript',
    'json parse performance',
    'json stringify bigint',
    'json parse undefined',
    'json stringify null replacer',
  ],
  openGraph: {
    title: 'JSON.parse() and JSON.stringify() — The Complete Developer Guide',
    description: 'Master every option, edge case, and pattern for JSON.parse() and JSON.stringify() in JavaScript and TypeScript.',
    type: 'article',
    publishedTime: '2026-05-10T09:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/json-parse-stringify-complete-guide',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs — JSON.parse and JSON.stringify Guide' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JSON.parse() and JSON.stringify() — The Complete Developer Guide',
    description: 'Master every option, edge case, and pattern for JSON.parse() and JSON.stringify() in JavaScript.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/json-parse-stringify-complete-guide' },
};

export default function JsonParseStringifyPage() {
  return <JsonParseStringifyClient />;
}
