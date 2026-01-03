import type { Metadata } from 'next';
import BrokenJsonExamplesClient from './client';

export const metadata: Metadata = {
  title: '25 Broken JSON Examples and How to Fix Them | UnblockDevs',
  description: 'Learn from 25 real broken JSON examples and how to fix them. Common JSON mistakes with before/after examples. Fix broken JSON instantly with free JSON Fixer tool.',
  keywords: [
    'broken json examples',
    'invalid json examples',
    'json mistakes examples',
    'broken json fix',
    'json error examples',
    'common json errors',
    'json mistakes'
  ],
};

export default function BrokenJsonExamples() {
  return <BrokenJsonExamplesClient />;
}

