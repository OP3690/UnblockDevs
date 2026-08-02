import type { Metadata } from 'next';
import JsonParseStringifyClient from './client';

export const metadata: Metadata = {
  title: 'JSON.parse() & JSON.stringify() Complete Guide | UnblockDevs',
  description: 'Master JSON.parse() and JSON.stringify() in JavaScript. Covers every option, replacer, reviver, error handling, edge cases, and TypeScript-safe patterns.',
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
    title: 'JSON.parse() and JSON.stringify() — The Complete JavaScript Developer Guide',
    description: 'Master every option, edge case, and pattern for JSON.parse() and JSON.stringify() in JavaScript and TypeScript. Covers replacer, reviver, error handling, BigInt edge cases, and performance tips.',
    type: 'article',
    publishedTime: '2026-05-10T09:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/json-parse-stringify-complete-guide',
    images: [{ url: 'https://unblockdevs.com/api/og?title=JSON.parse%28%29%20and%20JSON.stringify%28%29%20%E2%80%94%20The%20Complete%20Developer%20Guide&emoji=%7B%7D&desc=Master%20every%20option%2C%20edge%20case%2C%20and%20pattern%20for%20JSON', width: 1200, height: 630, alt: 'JSON.parse() and JSON.stringify() — The Complete Developer Guide — UnblockDevs Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JSON.parse() & JSON.stringify() Complete Guide',
    description: 'Master every option, edge case, and pattern for JSON.parse() and JSON.stringify() — replacer, reviver, error handling, BigInt, and performance tips.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/json-parse-stringify-complete-guide' },
};

export default function JsonParseStringifyPage() {
  return <JsonParseStringifyClient />;
}
