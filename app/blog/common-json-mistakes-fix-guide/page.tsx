import type { Metadata } from 'next';
import CommonJsonMistakesGuideClient from './client';

export const metadata: Metadata = {
  title: 'How to Fix Invalid JSON From AI – 10 Common Mistakes & Resolve Instantly | UnblockDevs',
  description: 'How to fix invalid JSON from AI and resolve common mistakes: trailing commas, missing quotes, broken arrays. Fix broken JSON instantly with our free JSON Fixer. Paste to instant fix.',
  keywords: [
    'how to fix invalid json from ai',
    'fix invalid json',
    'fix broken JSON online',
    'common JSON errors',
    'remove trailing comma json',
    'malformed JSON fixer',
    'JSON syntax errors',
    'JSON validation',
    'JSON repair tool',
    'fix JSON mistakes',
    'JSON error fixing',
    'broken JSON',
    'invalid JSON',
    'JSON parser errors',
    'JSON debugging',
    'fix JSON online free',
    'JSON error checker'
  ],
  openGraph: {
    title: '10 Most Common JSON Mistakes Developers Make (And How to Fix Them Instantly)',
    description: 'Learn the 10 most common JSON mistakes and how to fix them instantly with our free JSON Fixer tool.',
    type: 'article',
    publishedTime: '2025-01-15T00:00:00.000Z',
    authors: ['UnblockDevs'],
    tags: ['JSON', 'JSON Errors', 'JSON Fixing', 'Web Development', 'Programming'],
  },
  twitter: {
    card: 'summary_large_image',
    title: '10 Most Common JSON Mistakes Developers Make',
    description: 'Learn how to fix the most common JSON errors instantly with our free JSON Fixer tool.',
  },
};

export default function CommonJsonMistakesGuide() {
  return <CommonJsonMistakesGuideClient />;
}

