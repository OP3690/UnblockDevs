import type { Metadata } from 'next';
import BlogPostClient from './client';

export const metadata: Metadata = {
  title: 'How to Fix JSON Syntax Errors — Trailing Commas, Single Quotes, Brackets & More | UnblockDevs',
  description:
    'Fix every common JSON syntax error: trailing commas, single quotes, unquoted keys, comments, missing brackets, unterminated strings, backslash escaping — with exact causes and fixes for each error message.',
  keywords: [
    'json syntax error fix',
    'fix json error',
    'json parse error fix',
    'json unexpected token fix',
    'json trailing comma fix',
    'invalid json fix online',
    'json error unexpected token',
    'fix json online',
    'json syntax error checker',
    'json syntax errors list',
    'json unterminated string fix',
    'json missing bracket fix',
    'json comments not allowed',
    'json single quote error',
    'json parse error position',
  ],
  openGraph: {
    title: 'How to Fix JSON Syntax Errors — Trailing Commas, Quotes, Brackets & More | UnblockDevs',
    description: 'Every common JSON error explained and fixed: trailing commas, single quotes, unquoted keys, comments, mismatched brackets, unterminated strings, backslash escaping.',
    type: 'article',
    publishedTime: '2026-04-13T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/json-syntax-error-fix',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Fix JSON Syntax Errors — Every Common Error Explained & Fixed',
    description: 'Trailing commas, single quotes, missing brackets, unterminated strings — every JSON error with its exact fix.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/json-syntax-error-fix' },
};

export default function JsonSyntaxErrorFixPage() {
  return <BlogPostClient />;
}
