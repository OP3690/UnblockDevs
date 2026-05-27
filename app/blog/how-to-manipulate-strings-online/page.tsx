import type { Metadata } from 'next';
import BlogPostClient from './client';

export const metadata: Metadata = {
  title: 'How to Manipulate & Format Strings Online — Developer String Utilities | UnblockDevs',
  description:
    'Convert string formats, clean up text data, split, replace, and transform strings instantly with a free online string utilities tool. No code needed — handles camelCase, snake_case, Base64, URL encoding, and more.',
  keywords: [
    'how to manipulate strings online',
    'string utilities tool online free',
    'convert string format online',
    'format text string easily online',
    'string operations tool for developers',
    'modify text string quickly',
    'how to clean up string data',
    'tool to process text strings online',
    'string formatter tool free',
    'simple string manipulation tool',
    'string case converter online',
    'text formatter and string utility tool',
  ],
  openGraph: {
    title: 'How to Manipulate & Format Strings Online — Developer String Utilities | UnblockDevs',
    description:
      'Convert string formats, clean up text data, split, replace, and transform strings instantly. Handles camelCase, snake_case, Base64, URL encoding, and bulk mode with CSV export.',
    type: 'article',
    publishedTime: '2026-04-13T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/how-to-manipulate-strings-online',
    images: [{ url: 'https://unblockdevs.com/api/og?title=How%20to%20Manipulate%20%26%20Format%20Strings%20Online%20%E2%80%94%20Developer%20String%20Utilities&emoji=%F0%9F%9B%A0%EF%B8%8F&desc=Convert%20string%20formats%2C%20clean%20up%20text%20data%2C%20split%2C%20replace%2C%20and%20transform', width: 1200, height: 630, alt: 'How to Manipulate & Format Strings Online — Developer String Utilities — UnblockDevs Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Manipulate & Format Strings Online — Developer String Utilities',
    description:
      'Convert string formats, clean up text data, split, replace, and transform strings instantly. Free online tool, no code needed.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/how-to-manipulate-strings-online' },
};

export default function HowToManipulateStringsOnlinePage() {
  return <BlogPostClient />;
}
