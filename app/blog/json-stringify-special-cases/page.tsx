import type { Metadata } from 'next';
import BlogPostClient from './client';

export const metadata: Metadata = {
  title: 'JSON.stringify() Edge Cases — undefined, null, Dates, Circular Refs, BigInt | UnblockDevs',
  description:
    'Complete guide to JSON.stringify() edge cases: why undefined is silently dropped, null vs undefined, Date to ISO string conversion, circular reference TypeError, BigInt TypeError, NaN becomes null, Map and Set lose data, and how to fix each one.',
  keywords: [
    'json stringify undefined',
    'json stringify remove undefined',
    'json stringify null vs undefined',
    'json stringify date',
    'json stringify circular reference',
    'json stringify circular reference fix',
    'json stringify bigint',
    'json stringify nan',
    'json stringify infinity',
    'json stringify map',
    'json stringify set',
    'json stringify edge cases',
    'json stringify special values',
    'json stringify undefined becomes null',
    'converting circular structure to json',
  ],
  openGraph: {
    title: 'JSON.stringify() Edge Cases — undefined, null, Dates, Circular Refs, BigInt | UnblockDevs',
    description:
      'Why undefined disappears, null is preserved, Dates become ISO strings, circular refs throw, BigInt throws, NaN becomes null, and how to fix every case.',
    type: 'article',
    publishedTime: '2026-04-13T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/json-stringify-special-cases',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JSON.stringify() Edge Cases — undefined, null, Date, Circular, BigInt',
    description:
      'Complete guide to JSON.stringify() special value behavior: undefined, null, NaN, Date, circular refs, BigInt, Map, Set — with fixes for each.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/json-stringify-special-cases' },
};

export default function JsonStringifySpecialCasesPage() {
  return <BlogPostClient />;
}
