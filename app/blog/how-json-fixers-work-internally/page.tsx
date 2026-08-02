import type { Metadata } from 'next';
import HowJsonFixersWorkClient from './client';

export const metadata: Metadata = {
  title: 'How JSON Fixers Work Internally: Tokenization Guide | UnblockDevs',
  description: 'Learn how JSON fixers work under the hood: tokenization, error recovery, trailing comma removal, and quote repairs. Understand how tools auto-fix invalid and AI-generated JSON.',
  keywords: [
    'how json fixers work',
    'json error recovery',
    'fix invalid json automatically',
    'json tokenization',
    'json fixer algorithm',
    'json parser error recovery',
    'fix ai generated json',
    'trailing comma json fix',
    'auto fix json errors',
    'how to fix invalid json from ai',
    'what does a json fixer do internally',
    'json repair algorithm explained'
  ],
  openGraph: {
    title: 'How JSON Fixers Work Internally: Tokenization, Error Recovery & AI JSON',
    description: 'Ever wondered how tools auto-fix broken JSON? This guide explains tokenization, error recovery passes, trailing comma removal, and quote repairs — the exact steps JSON fixers take under the hood.',
    type: 'article',
    publishedTime: '2025-01-15T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/how-json-fixers-work-internally',
    images: [{ url: 'https://unblockdevs.com/api/og?title=How%20JSON%20Fixers%20Work%20Internally&emoji=%F0%9F%93%9D&desc=How%20JSON%20fixers%20work%3A%20tokenization%2C%20error%20recovery%2C%20trailing%20comma%20and%20quote%20fix', width: 1200, height: 630, alt: 'How JSON Fixers Work Internally — UnblockDevs Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How JSON Fixers Work Internally: Tokenization Guide',
    description: 'Understand how JSON fixers auto-repair broken JSON: tokenization, error recovery, trailing comma removal, and AI JSON fixes explained clearly.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/how-json-fixers-work-internally' },

};

export default function HowJsonFixersWork() {
  return <HowJsonFixersWorkClient />;
}

