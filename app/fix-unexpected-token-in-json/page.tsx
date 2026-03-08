import type { Metadata } from 'next';
import FixUnexpectedTokenClient from './client';

export const metadata: Metadata = {
  title: 'Free Guide: Fix "Unexpected token } in JSON" Error | UnblockDevs',
  description: 'Fix "Unexpected token } in JSON" error instantly. Free guide with examples and JSON fixer tool. No signup required, works in your browser.',
  keywords: [
    'fix unexpected token in json',
    'unexpected token json error',
    'fix unexpected token } in json',
    'json parse unexpected token',
    'json syntax error fix',
    'unexpected token error',
    'json error fixer',
    'fix broken json'
  ],
  openGraph: {
    title: 'Fix "Unexpected token } in JSON" Error | UnblockDevs',
    description: 'Fix "Unexpected token } in JSON" error instantly. Free guide with examples and JSON fixer tool. No signup required, works in your browser.',
    type: 'website',
    url: 'https://unblockdevs.com/fix-unexpected-token-in-json',
    siteName: 'UnblockDevs',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  twitter: { card: 'summary_large_image', title: 'Fix Unexpected token in JSON Error | UnblockDevs', description: 'Fix "Unexpected token } in JSON" error instantly. Free guide with examples and JSON fixer tool.' },
  alternates: { canonical: 'https://unblockdevs.com/fix-unexpected-token-in-json' },
};

export default function FixUnexpectedToken() {
  return <FixUnexpectedTokenClient />;
}

