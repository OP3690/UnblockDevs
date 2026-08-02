import type { Metadata } from 'next';
import BlogPostClient from './client';

export const metadata: Metadata = {
  title: 'JSON Formatter Guide: Format, Validate & Fix JSON | UnblockDevs',
  description: 'JSON formatter guide: pretty-print, validate syntax, auto-fix trailing commas and single quotes, and minify JSON for production. Free online tool included.',
  keywords: [
    'json formatter',
    'json formatter online free',
    'format json',
    'json formatter and validator',
    'json format online',
    'json auto fix',
    'json fixer online',
    'fix invalid json online',
    'json beautifier formatter',
    'json minifier',
    'json parser online',
    'how to format json online',
    'json formatter with error detection',
    'best online json formatter',
  ],
  openGraph: {
    title: 'JSON Formatter Guide — Format, Validate, Auto-Fix & Minify JSON Online',
    description: 'Learn JSON formatting: pretty-print with configurable indent, validate with exact error positions, auto-fix trailing commas and single quotes, and minify for production. Free online tool.',
    type: 'article',
    publishedTime: '2026-04-13T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/json-formatter-guide',
    images: [{ url: 'https://unblockdevs.com/api/og?title=JSON%20Formatter%20Guide%20%E2%80%94%20Format%2C%20Validate%2C%20Auto-Fix%20%26%20Minify%20JSON&emoji=%7B%7D&desc=Format%2C%20validate%2C%20auto-fix%2C%20and%20minify%20JSON', width: 1200, height: 630, alt: 'JSON Formatter Guide — Format, Validate, Auto-Fix & Minify JSON — UnblockDevs Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JSON Formatter Guide: Format, Validate & Fix JSON',
    description: 'Pretty-print, validate, auto-fix trailing commas and single quotes, and minify JSON. The complete guide with a free online formatter tool.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/json-formatter-guide' },
};

export default function JsonFormatterGuidePage() {
  return <BlogPostClient />;
}
