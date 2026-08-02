import type { Metadata } from 'next';
import BlogPostClient from './client';

export const metadata: Metadata = {
  title: 'String Case Converter Guide — camelCase, snake_case | UnblockDevs',
  description: 'Learn when to use camelCase, snake_case, PascalCase, or kebab-case. Free online converter handles all 12 formats with bulk conversion and CSV export included.',
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
    'text formatter and string utility tool',
    'how to convert string to lowercase or uppercase',
    'what is the difference between camelcase and snake case'
  ],
  openGraph: {
    title: 'String Case Converter Guide — camelCase, snake_case, PascalCase & More',
    description:
      'Complete guide to string case conversion — when to use each format, how to convert between them, and a free online converter that handles all 12 formats with bulk CSV export.',
    type: 'article',
    publishedTime: '2026-04-13T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/string-case-converter-guide',
    images: [{ url: 'https://unblockdevs.com/api/og?title=String%20Case%20Converter%20Guide%20%E2%80%94%20camelCase%2C%20snake_case%2C%20PascalCase%2C%20kebab-case%20%26...&emoji=%F0%9F%93%96&desc=Complete%20guide%20to%20string%20case%20conversion', width: 1200, height: 630, alt: 'String Case Converter Guide — camelCase, snake_case, PascalCase, kebab-case &... — UnblockDevs Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'String Case Converter Guide — camelCase, snake_case & More',
    description:
      'When to use camelCase vs snake_case vs PascalCase vs kebab-case. Free online converter supporting all 12 formats with bulk conversion and CSV export.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/string-case-converter-guide' },
};

export default function StringCaseConverterGuidePage() {
  return <BlogPostClient />;
}
