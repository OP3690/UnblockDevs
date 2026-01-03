import type { Metadata } from 'next';
import InvalidJsonVsValidJsonClient from './client';

export const metadata: Metadata = {
  title: 'Invalid JSON vs Valid JSON: 15 Real Examples Developers Get Wrong | UnblockDevs',
  description: 'Learn the difference between invalid JSON and valid JSON with 15 real examples. Common mistakes: single quotes, trailing commas, comments, NaN, Infinity. Fix JSON instantly.',
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
  },
};

export default function InvalidJsonVsValidJson() {
  return <InvalidJsonVsValidJsonClient />;
}

