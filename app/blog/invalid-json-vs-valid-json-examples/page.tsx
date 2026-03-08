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
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],

  },  alternates: { canonical: 'https://unblockdevs.com/blog/invalid-json-vs-valid-json-examples' },

};

export default function InvalidJsonVsValidJson() {
  return <InvalidJsonVsValidJsonClient />;
}

