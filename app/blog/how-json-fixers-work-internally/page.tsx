import type { Metadata } from 'next';
import HowJsonFixersWorkClient from './client';

export const metadata: Metadata = {
  title: 'How JSON Fixers Work Internally (And Why Manual Fixing Fails) | UnblockDevs',
  description: 'Learn how JSON fixers work internally: tokenization, parsing, error recovery logic, deterministic vs heuristic fixes. Why online fixers are safer for large JSON.',
  keywords: [
    'how json fixers work',
    'json fixer algorithm',
    'json error recovery',
    'json parser internals',
    'json fixer logic',
    'how json repair works',
    'json tokenization'
  ],
};

export default function HowJsonFixersWork() {
  return <HowJsonFixersWorkClient />;
}

