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
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
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
