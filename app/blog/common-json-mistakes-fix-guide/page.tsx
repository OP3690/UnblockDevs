import type { Metadata } from 'next';
import CommonJsonMistakesGuideClient from './client';

export const metadata: Metadata = {
  title: '10 Common JSON Mistakes & How to Fix | UnblockDevs',
  description: 'Fix the 10 most common JSON mistakes: trailing commas, missing quotes, wrong data types, and more. Paste your broken JSON and fix it instantly with our free tool.',
  keywords: [
    'common JSON errors',
    'fix invalid json',
    'fix broken JSON online',
    'remove trailing comma json',
    'malformed JSON fixer',
    'JSON syntax errors',
    'JSON repair tool',
    'how to fix invalid json from ai',
    'JSON validation errors',
    'fix JSON online free',
    'json mistake examples',
    'json debugging guide'
  ],
  openGraph: {
    title: '10 Most Common JSON Mistakes Developers Make — And How to Fix Them Instantly',
    description: 'Learn the 10 most common JSON mistakes developers make — trailing commas, missing quotes, wrong data types, and more — with clear before-and-after examples and a free JSON fixer to repair them instantly.',
    type: 'article',
    publishedTime: '2025-01-15T00:00:00.000Z',
    authors: ['UnblockDevs'],
    tags: ['JSON', 'JSON Errors', 'JSON Fixing', 'Web Development', 'Programming'],
    url: 'https://unblockdevs.com/blog/common-json-mistakes-fix-guide',
    images: [{ url: 'https://unblockdevs.com/api/og?title=10%20Most%20Common%20JSON%20Mistakes%20Developers%20Make%20%28And%20How%20to%20Fix%20Them%20Instantly%29&emoji=%7B%7D&desc=10%20common%20JSON%20mistakes%20and%20how%20to%20fix%20them', width: 1200, height: 630, alt: '10 Most Common JSON Mistakes Developers Make (And How to Fix Them Instantly) — UnblockDevs Blog' }],

  },
  twitter: {
    card: 'summary_large_image',
    title: '10 Most Common JSON Mistakes Developers Make',
    description: 'The 10 most common JSON mistakes — trailing commas, missing quotes, wrong data types — explained with fixes. Try our free JSON fixer tool.',
  },  alternates: { canonical: 'https://unblockdevs.com/blog/common-json-mistakes-fix-guide' },

};

export default function CommonJsonMistakesGuide() {
  return <CommonJsonMistakesGuideClient />;
}

