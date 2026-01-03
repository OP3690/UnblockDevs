import type { Metadata } from 'next';
import HowToFixBrokenJsonClient from './client';

export const metadata: Metadata = {
  title: 'How to Fix Broken JSON Online - Step by Step Guide | UnblockDevs',
  description: 'Learn how to fix broken JSON online step by step. Complete beginner-friendly guide with examples, common errors, and free JSON Fixer tool. Fix malformed JSON instantly.',
  keywords: [
    'how to fix broken json online',
    'fix broken json',
    'repair json online',
    'fix malformed json',
    'json error fixer',
    'fix invalid json',
    'json repair tool',
    'fix json syntax errors'
  ],
};

export default function HowToFixBrokenJson() {
  return <HowToFixBrokenJsonClient />;
}

