import type { Metadata } from 'next';
import JsonFixerOnlineClient from './client';

export const metadata: Metadata = {
  title: 'Fix Invalid JSON Online – Trailing Comma, AI JSON | UnblockDevs',
  description: 'Paste → instant fix. Remove trailing commas, fix quotes, broken arrays, AI JSON. 100% client-side.',
  keywords: [
    'fix invalid json',
    'remove trailing comma json',
    'json fixer online',
    'advanced json fixer',
    'repair json',
    'trailing comma json',
    'json repair tool',
    'json syntax fixer',
    'fix json from api error',
    'extract json from logs',
    'fix ai generated json',
    'broken json fixer',
  ],
  openGraph: {
    title: 'Fix Invalid JSON Online | UnblockDevs',
    description: 'Paste → instant fix. Remove trailing commas, fix quotes, broken arrays, AI JSON. 100% client-side.',
    type: 'website',
    url: 'https://unblockdevs.com/json-fixer-online',
    siteName: 'UnblockDevs',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  twitter: { card: 'summary_large_image', title: 'Fix Invalid JSON Online | UnblockDevs', description: 'Paste → instant fix. Remove trailing commas, fix quotes, broken arrays, AI JSON. 100% client-side.' },
  alternates: { canonical: 'https://unblockdevs.com/json-fixer-online' },
};

export default function JsonFixerOnline() {
  return <JsonFixerOnlineClient />;
}

