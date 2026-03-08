import type { Metadata } from 'next';
import FixInvalidControlCharacterClient from './client';

export const metadata: Metadata = {
  title: 'Free Guide: Fix "Invalid Control Character" JSON Error | UnblockDevs',
  description: 'Fix "Invalid control character" JSON error instantly. Free guide with examples and JSON fixer tool. No signup required, works in your browser.',
  keywords: [
    'fix invalid control character json',
    'invalid control character json error',
    'json control character error',
    'fix json newline error',
    'json escape characters',
    'invalid control character fix'
  ],
  openGraph: {
    title: 'Fix "Invalid Control Character" JSON Error | UnblockDevs',
    description: 'Fix "Invalid control character" JSON error instantly. Free guide with examples and JSON fixer tool. No signup required, works in your browser.',
    type: 'website',
    url: 'https://unblockdevs.com/fix-invalid-control-character-json',
    siteName: 'UnblockDevs',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  twitter: { card: 'summary_large_image', title: 'Fix Invalid Control Character JSON Error | UnblockDevs', description: 'Fix "Invalid control character" JSON error instantly. Free guide with examples and JSON fixer tool.' },
  alternates: { canonical: 'https://unblockdevs.com/fix-invalid-control-character-json' },
};

export default function FixInvalidControlCharacter() {
  return <FixInvalidControlCharacterClient />;
}

