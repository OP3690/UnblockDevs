import type { Metadata } from 'next';
import BlogPostClient from './client';

export const metadata: Metadata = {
  title: 'JSON.stringify() Complete Guide — Options, Replacer, Space & Examples | UnblockDevs',
  description:
    'Complete JSON.stringify() guide: all three parameters (value, replacer, space), pretty-print vs compact output, filtering fields, toJSON(), real-world patterns, and common mistakes with fixes.',
  keywords: [
    'json stringify',
    'json stringify javascript',
    'json stringify examples',
    'json stringify options',
    'json stringify replacer',
    'json stringify space parameter',
    'json stringify pretty print',
    'json stringify tutorial',
    'json stringify online',
    'json stringify guide',
    'json stringify complete guide',
    'json stringify without newlines',
    'json stringify filter fields',
    'json serialize object javascript',
    'how json stringify works',
  ],
  openGraph: {
    title: 'JSON.stringify() Complete Guide — Options, Replacer, Space & Examples | UnblockDevs',
    description:
      'All three parameters, pretty-print vs compact, replacer for field filtering, toJSON(), real-world patterns, and common mistakes. Free online tool included.',
    type: 'article',
    publishedTime: '2026-04-13T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/json-stringify-complete-guide',
    images: [{ url: 'https://unblockdevs.com/api/og?title=JSON.stringify%28%29%20Complete%20Guide%20%E2%80%94%20Options%2C%20Replacer%2C%20Space%20%26%20Examples&emoji=%7B%7D&desc=All%20three%20parameters%2C%20pretty-print%20vs%20compact%2C%20replacer%20for%20field%20filtering%2C', width: 1200, height: 630, alt: 'JSON.stringify() Complete Guide — Options, Replacer, Space & Examples — UnblockDevs Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JSON.stringify() Complete Guide — Options, Replacer, Space & Examples',
    description:
      'Master JSON.stringify(): all three parameters, pretty-print, replacer function, toJSON(), patterns, and common mistakes.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/json-stringify-complete-guide' },
};

export default function JsonStringifyCompleteGuidePage() {
  return <BlogPostClient />;
}
