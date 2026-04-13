import type { Metadata } from 'next';
import BlogPostClient from './client';

export const metadata: Metadata = {
  title: 'JSON Formatter Guide — Format, Validate, Auto-Fix & Minify JSON | UnblockDevs',
  description:
    'Complete JSON formatter guide: pretty-print with configurable indent, validate syntax with exact error positions, auto-fix trailing commas and single quotes, minify for production. Free online JSON formatter.',
  keywords: [
    'json formatter',
    'json formatter online free',
    'format json',
    'json formatter and validator',
    'json format online',
    'json formatter guide',
    'json auto fix',
    'json fixer online',
    'fix invalid json online',
    'json format and validate',
    'json beautifier formatter',
    'json minifier',
    'json parser online',
    'json format checker',
    'online json formatter',
  ],
  openGraph: {
    title: 'JSON Formatter Guide — Format, Validate, Auto-Fix & Minify JSON | UnblockDevs',
    description: 'Format, validate, auto-fix, and minify JSON. Trailing commas, single quotes, unquoted keys — auto-repaired. Free online JSON formatter.',
    type: 'article',
    publishedTime: '2026-04-13T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/json-formatter-guide',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JSON Formatter Guide — Format, Validate, Auto-Fix & Minify',
    description: 'Format, validate, auto-fix trailing commas/single quotes, minify JSON. Free online formatter.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/json-formatter-guide' },
};

export default function JsonFormatterGuidePage() {
  return <BlogPostClient />;
}
