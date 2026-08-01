import type { Metadata } from 'next';
import BrokenJsonExamplesClient from './client';

export const metadata: Metadata = {
  title: '25 Broken JSON Examples and How to Fix Them | UnblockDevs',
  description: '25 broken JSON examples and how to fix them. Before/after. Free JSON Fixer tool.',
  keywords: [
    'broken json examples',
    'invalid json examples',
    'json mistakes examples',
    'broken json fix',
    'json error examples',
    'common json errors',
    'json mistakes'
  ],
  openGraph: {
    title: '25 Broken JSON Examples and How to Fix Them',
    description: '25 broken JSON examples and how to fix them. Before/after. Free JSON Fixer tool.',
    type: 'article',
    publishedTime: '2025-01-15T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/25-broken-json-examples-fix',
    images: [{ url: 'https://unblockdevs.com/api/og?title=25%20Broken%20JSON%20Examples%20and%20How%20to%20Fix%20Them&emoji=%F0%9F%93%9D&desc=25%20broken%20JSON%20examples%20and%20how%20to%20fix%20them.%20Before%2Fafter.%20Free%20JSON%20Fixer%20tool.', width: 1200, height: 630, alt: '25 Broken JSON Examples and How to Fix Them — UnblockDevs Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '25 Broken JSON Examples and How to Fix Them',
    description: '25 broken JSON examples and how to fix them. Before/after. Free JSON Fixer tool.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/25-broken-json-examples-fix' },

};

export default function BrokenJsonExamples() {
  return <BrokenJsonExamplesClient />;
}

