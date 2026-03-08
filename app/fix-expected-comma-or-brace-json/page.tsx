import type { Metadata } from 'next';
import FixExpectedCommaOrBraceClient from './client';

export const metadata: Metadata = {
  title: 'Free Guide: Fix "Expected Comma or Brace" JSON Error | UnblockDevs',
  description: 'Fix "Expected comma or closing brace" JSON error instantly. Free guide with examples and JSON fixer tool. No signup required, works in your browser.',
  keywords: [
    'fix expected comma or brace json',
    'expected comma or } after property value',
    'json missing comma error',
    'fix json comma error',
    'json syntax error comma',
    'expected comma json fix'
  ],
  openGraph: {
    title: 'Fix "Expected Comma or Brace" JSON Error | UnblockDevs',
    description: 'Fix "Expected comma or closing brace" JSON error instantly. Free guide with examples and JSON fixer tool. No signup required, works in your browser.',
    type: 'website',
    url: 'https://unblockdevs.com/fix-expected-comma-or-brace-json',
    siteName: 'UnblockDevs',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  twitter: { card: 'summary_large_image', title: 'Fix Expected Comma or Brace JSON Error | UnblockDevs', description: 'Fix "Expected comma or closing brace" JSON error instantly. Free guide with examples and JSON fixer tool.' },
  alternates: { canonical: 'https://unblockdevs.com/fix-expected-comma-or-brace-json' },
};

export default function FixExpectedCommaOrBrace() {
  return <FixExpectedCommaOrBraceClient />;
}

