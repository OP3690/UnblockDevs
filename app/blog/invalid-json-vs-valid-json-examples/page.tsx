import type { Metadata } from 'next';
import InvalidJsonVsValidJsonClient from './client';

export const metadata: Metadata = {
  title: 'Invalid vs Valid JSON: 15 Common Examples | UnblockDevs',
  description: '15 invalid vs valid JSON examples with fixes: single quotes, trailing commas, comments, NaN, undefined. Spot common JSON errors and repair them in seconds.',
  keywords: [
    'invalid vs valid JSON',
    'invalid JSON examples',
    'valid JSON examples',
    'JSON syntax errors',
    'JSON common mistakes',
    'fix invalid JSON',
    'JSON trailing comma error',
    'single quotes in JSON invalid',
    'JSON comments not allowed',
    'JSON NaN undefined invalid',
    'why is my JSON invalid',
    'JSON error examples and fixes',
    'JSON validation examples',
  ],
  openGraph: {
    title: 'Invalid JSON vs Valid JSON: 15 Examples Every Developer Gets Wrong',
    description: 'Confused why your JSON is invalid? This guide walks through 15 real-world invalid vs valid JSON examples — single quotes, trailing commas, comments, NaN, undefined — with an instant fix for each.',
    type: 'article',
    publishedTime: '2025-01-15T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/invalid-json-vs-valid-json-examples',
    images: [{ url: 'https://unblockdevs.com/api/og?title=Invalid%20JSON%20vs%20Valid%20JSON%3A%2015%20Real%20Examples&emoji=%7B%7D&desc=Learn%20the%20difference%20between%20invalid%20and%20valid%20JSON%20with%20real%20examples', width: 1200, height: 630, alt: 'Invalid JSON vs Valid JSON: 15 Real Examples — UnblockDevs Blog' }],

  },  twitter: {
    card: 'summary_large_image',
    title: 'Invalid vs Valid JSON: 15 Common Examples',
    description: '15 invalid vs valid JSON examples with fixes: single quotes, trailing commas, comments, NaN, undefined. Fix JSON errors in seconds.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/invalid-json-vs-valid-json-examples' },

};

export default function InvalidJsonVsValidJson() {
  return <InvalidJsonVsValidJsonClient />;
}

