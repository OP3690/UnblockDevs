import type { Metadata } from 'next';
import FixJsonParseErrorJavascriptClient from './client';

export const metadata: Metadata = {
  title: 'Free Guide: Fix JSON.parse() Errors in JavaScript | UnblockDevs',
  description: 'Learn how to fix JSON.parse() errors in JavaScript. Complete guide with examples, error handling, and free JSON fixer tool. No signup required.',
  keywords: [
    'fix json.parse error javascript',
    'json.parse error handling',
    'json parse error javascript',
    'handle json parse error',
    'json.parse try catch',
    'fix json parse error',
    'javascript json error'
  ],
  openGraph: {
    title: 'Fix JSON.parse() Errors in JavaScript | UnblockDevs',
    description: 'Learn how to fix JSON.parse() errors in JavaScript. Complete guide with examples, error handling, and free JSON fixer tool. No signup required.',
    type: 'website',
    url: 'https://unblockdevs.com/fix-json-parse-error-javascript',
    siteName: 'UnblockDevs',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  twitter: { card: 'summary_large_image', title: 'Fix JSON.parse() Errors in JavaScript | UnblockDevs', description: 'Learn how to fix JSON.parse() errors in JavaScript. Complete guide with examples and free JSON fixer tool.' },
  alternates: { canonical: 'https://unblockdevs.com/fix-json-parse-error-javascript' },
};

export default function FixJsonParseErrorJavascript() {
  return <FixJsonParseErrorJavascriptClient />;
}

