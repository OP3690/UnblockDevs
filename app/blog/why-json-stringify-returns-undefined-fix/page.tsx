import type { Metadata } from 'next';
import WhyJsonStringifyReturnsUndefinedFixClient from './client';

export const metadata: Metadata = {
  title: 'Why JSON.stringify() Returns Undefined – Fix | UnblockDevs',
  description: 'Learn why JSON.stringify() returns undefined and how to fix it. Covers undefined values, circular references, NaN, Infinity, and the replacer function.',
  keywords: [
    'json.stringify returns undefined',
    'json.stringify undefined fix',
    'why json.stringify undefined',
    'json.stringify undefined value',
    'fix json.stringify undefined',
    'json.stringify undefined error',
    'json.stringify circular reference',
    'json.stringify nan infinity',
    'json.stringify undefined null',
    'json.stringify replacer function',
    'json.stringify undefined javascript',
    'json stringify returns nothing'
  ],
  openGraph: {
    title: 'Why JSON.stringify() Returns Undefined — Causes and Fixes',
    description: 'JSON.stringify() silently returns undefined for several reasons. Learn what causes it — undefined values, circular references, special numbers — and how to handle each case correctly.',
    type: 'article',
    url: 'https://unblockdevs.com/blog/why-json-stringify-returns-undefined-fix',
    images: [{ url: 'https://unblockdevs.com/api/og?title=Why%20JSON.stringify%28%29%20Returns%20Undefined%20%E2%80%93%20Fix&emoji=%7B%7D&desc=Developer%20guide%20for%20modern%20web%20applications', width: 1200, height: 630, alt: 'Why JSON.stringify() Returns Undefined – Fix — UnblockDevs Blog' }],

  },
  twitter: {
    card: 'summary_large_image',
    title: 'Why JSON.stringify() Returns Undefined – Fix',
    description: 'JSON.stringify() returns undefined? Learn the exact causes — undefined values, circular refs, NaN — and how to fix each one in JavaScript.',
  },  alternates: { canonical: 'https://unblockdevs.com/blog/why-json-stringify-returns-undefined-fix' },

};

export default function WhyJsonStringifyReturnsUndefinedFixPage() {
  return <WhyJsonStringifyReturnsUndefinedFixClient />;
}
