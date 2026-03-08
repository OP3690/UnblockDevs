import type { Metadata } from 'next';
import FixUnexpectedTokenLessThanClient from './client';

export const metadata: Metadata = {
  title: 'Free Guide: Fix "Unexpected token < in JSON" Error | UnblockDevs',
  description: 'Fix "Unexpected token < in JSON" error instantly. This means HTML was returned instead of JSON. Free guide with solutions and JSON fixer tool. No signup required.',
  keywords: [
    'fix unexpected token < in json',
    'unexpected token < json error',
    'html instead of json',
    'json parse error html',
    'fix json html error',
    'api returned html not json',
    'unexpected token < fix'
  ],
  openGraph: {
    title: 'Fix "Unexpected token < in JSON" Error | UnblockDevs',
    description: 'Fix "Unexpected token < in JSON" error instantly. This means HTML was returned instead of JSON. Free guide with solutions and JSON fixer tool. No signup required.',
    type: 'website',
    url: 'https://unblockdevs.com/fix-unexpected-token-less-than-json',
    siteName: 'UnblockDevs',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  twitter: { card: 'summary_large_image', title: 'Fix Unexpected token < in JSON Error | UnblockDevs', description: 'Fix "Unexpected token < in JSON" error. Free guide with solutions and JSON fixer tool.' },
  alternates: { canonical: 'https://unblockdevs.com/fix-unexpected-token-less-than-json' },
};

export default function FixUnexpectedTokenLessThan() {
  return <FixUnexpectedTokenLessThanClient />;
}

