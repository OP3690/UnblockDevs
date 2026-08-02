import type { Metadata } from 'next';
import BlogPostClient from './client';

export const metadata: Metadata = {
  title: 'Fix JSON Parse Error Step by Step with Examples | UnblockDevs',
  description: 'Fix JSON parse errors and unexpected token issues step by step. Find the most common JSON syntax mistakes — missing commas, trailing commas, invalid strings — and repair them with real examples.',
  keywords: [
    'fix json parse error',
    'json unexpected token error',
    'json syntax error fix',
    'broken json repair',
    'json error checker',
    'how to fix json parse error step by step',
    'what causes unexpected token in json',
    'how to debug broken json',
    'common json syntax errors',
    'json formatter with error highlighting',
    'how to find missing comma in json',
    'why is my json invalid'
  ],
  openGraph: {
    title: 'How to Fix JSON Parse Error Step by Step — With Code Examples and Online Fixer',
    description: 'Getting a JSON parse error or unexpected token? Find and fix the most common JSON syntax mistakes — missing commas, invalid quotes, trailing commas — with real examples and a free online fixer.',
    type: 'article',
    publishedTime: '2026-04-13T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/how-to-fix-json-parse-error-step-by-step',
    images: [{ url: 'https://unblockdevs.com/api/og?title=How%20to%20Fix%20JSON%20Parse%20Error%20%E2%80%94%20Step%20by%20Step%20%28With%20Examples%29&emoji=%7B%7D&desc=Getting%20a%20JSON%20parse%20error%20or%20unexpected%20token', width: 1200, height: 630, alt: 'How to Fix JSON Parse Error — Step by Step (With Examples) — UnblockDevs Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fix JSON Parse Error Step by Step with Examples',
    description: 'Fix JSON parse errors: find missing commas, bad quotes, and syntax errors step by step with real examples and a free online JSON fixer.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/how-to-fix-json-parse-error-step-by-step' },
};

export default function HowToFixJsonParseError() {
  return <BlogPostClient />;
}
