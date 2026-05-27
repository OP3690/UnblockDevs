import type { Metadata } from 'next';
import BlogPostClient from './client';

export const metadata: Metadata = {
  title: 'How to Fix JSON Parse Error — Step by Step (With Examples)',
  description: 'Getting a JSON parse error or unexpected token? Here\'s exactly how to find and fix the most common JSON syntax errors — with an online fixer and real examples.',
  keywords: [
    'how to fix json parse error step by step',
    'what causes unexpected token in json',
    'how to debug broken json file',
    'common json syntax errors and fixes',
    'how to find missing comma in json',
    'json error checker online free',
    'how to validate json data quickly',
    'why is my json invalid',
    'how to repair corrupted json file',
    'json formatter with error highlighting',
  ],
  openGraph: {
    title: 'How to Fix JSON Parse Error — Step by Step (With Examples)',
    description: 'Getting a JSON parse error or unexpected token? Here\'s exactly how to find and fix the most common JSON syntax errors — with an online fixer and real examples.',
    type: 'article',
    publishedTime: '2026-04-13T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/how-to-fix-json-parse-error-step-by-step',
    images: [{ url: 'https://unblockdevs.com/api/og?title=How%20to%20Fix%20JSON%20Parse%20Error%20%E2%80%94%20Step%20by%20Step%20%28With%20Examples%29&emoji=%7B%7D&desc=Getting%20a%20JSON%20parse%20error%20or%20unexpected%20token', width: 1200, height: 630, alt: 'How to Fix JSON Parse Error — Step by Step (With Examples) — UnblockDevs Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Fix JSON Parse Error — Step by Step (With Examples)',
    description: 'Getting a JSON parse error or unexpected token? Here\'s exactly how to find and fix the most common JSON syntax errors — with an online fixer and real examples.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/how-to-fix-json-parse-error-step-by-step' },
};

export default function HowToFixJsonParseError() {
  return <BlogPostClient />;
}
