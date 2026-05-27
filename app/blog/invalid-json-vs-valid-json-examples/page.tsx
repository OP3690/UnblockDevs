import type { Metadata } from 'next';
import InvalidJsonVsValidJsonClient from './client';

export const metadata: Metadata = {
  title: 'Invalid vs Valid JSON: 15 Examples | UnblockDevs',
  description: 'Invalid vs valid JSON: 15 examples. Single quotes, trailing commas, comments, NaN. Fix instantly.',
  keywords: [
    'invalid json vs valid json',
    'invalid json examples',
    'valid json examples',
    'json mistakes',
    'json errors examples',
    'invalid json',
    'valid json',
    'json validation examples'
  ],
  openGraph: {
    title: 'Invalid JSON vs Valid JSON: 15 Real Examples',
    description: 'Learn the difference between invalid and valid JSON with real examples developers get wrong.',
    type: 'article',
    url: 'https://unblockdevs.com/blog/invalid-json-vs-valid-json-examples',
    images: [{ url: 'https://unblockdevs.com/api/og?title=Invalid%20JSON%20vs%20Valid%20JSON%3A%2015%20Real%20Examples&emoji=%7B%7D&desc=Learn%20the%20difference%20between%20invalid%20and%20valid%20JSON%20with%20real%20examples', width: 1200, height: 630, alt: 'Invalid JSON vs Valid JSON: 15 Real Examples — UnblockDevs Blog' }],

  },  alternates: { canonical: 'https://unblockdevs.com/blog/invalid-json-vs-valid-json-examples' },

};

export default function InvalidJsonVsValidJson() {
  return <InvalidJsonVsValidJsonClient />;
}

