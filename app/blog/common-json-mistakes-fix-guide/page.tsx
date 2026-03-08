import type { Metadata } from 'next';
import CommonJsonMistakesGuideClient from './client';

export const metadata: Metadata = {
  title: '10 Common JSON Mistakes & How to Fix | UnblockDevs',
  description: 'Fix common JSON mistakes: trailing commas, missing quotes, broken arrays. Free JSON Fixer. Paste to fix.',
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
    description: '10 common JSON mistakes and how to fix them. Free JSON Fixer.',
    type: 'article',
    publishedTime: '2025-01-15T00:00:00.000Z',
    authors: ['UnblockDevs'],
    tags: ['JSON', 'JSON Errors', 'JSON Fixing', 'Web Development', 'Programming'],
    url: 'https://unblockdevs.com/blog/common-json-mistakes-fix-guide',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],

  },
  twitter: {
    card: 'summary_large_image',
    title: '10 Most Common JSON Mistakes Developers Make',
    description: 'Fix common JSON errors instantly. Free JSON Fixer.',
  },  alternates: { canonical: 'https://unblockdevs.com/blog/common-json-mistakes-fix-guide' },

};

export default function CommonJsonMistakesGuide() {
  return <CommonJsonMistakesGuideClient />;
}

