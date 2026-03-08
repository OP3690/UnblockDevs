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
  alternates: { canonical: 'https://unblockdevs.com/blog/25-broken-json-examples-fix' },

};

export default function BrokenJsonExamples() {
  return <BrokenJsonExamplesClient />;
}

