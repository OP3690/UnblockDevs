import type { Metadata } from 'next';
import BlogPostClient from './client';

export const metadata: Metadata = {
  title: 'String Case Converter Guide — camelCase, snake_case, PascalCase, kebab-case & More | UnblockDevs',
  description:
    'Complete guide to string case conversion — when to use camelCase vs snake_case vs PascalCase vs kebab-case. Includes a free online converter that handles all 12 formats and bulk conversion with CSV export.',
  keywords: [
    'string case converter online',
    'camelcase to snake case online',
    'snake case to camelcase converter',
    'camelcase vs snake case when to use',
    'pascalcase converter online',
    'kebab case converter',
    'string case converter tool free',
    'convert variable name to different case',
    'rename variable case format online',
    'how to convert camelcase to snake case',
    'string replace tool online',
    'text formatter and string utility tool',
    'how to convert string to lowercase or uppercase',
    'string case converter online',
  ],
  openGraph: {
    title: 'String Case Converter Guide — camelCase, snake_case, PascalCase, kebab-case & More | UnblockDevs',
    description:
      'Complete guide to string case conversion — when to use each format, how to convert between them, and a free online converter that handles all 12 formats with bulk CSV export.',
    type: 'article',
    publishedTime: '2026-04-13T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/string-case-converter-guide',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'String Case Converter Guide — camelCase, snake_case, PascalCase, kebab-case & More',
    description:
      'When to use camelCase vs snake_case vs PascalCase vs kebab-case. Free online converter supporting all 12 formats with bulk conversion and CSV export.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/string-case-converter-guide' },
};

export default function StringCaseConverterGuidePage() {
  return <BlogPostClient />;
}
