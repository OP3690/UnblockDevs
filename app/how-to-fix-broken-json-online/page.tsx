import type { Metadata } from 'next';
import HowToFixBrokenJsonClient from './client';

export const metadata: Metadata = {
  title: 'Free Guide: How to Fix Broken JSON Online – Step by Step | UnblockDevs',
  description: 'Fix broken JSON online with our step-by-step guide. Free JSON fixer tool included. No signup required. Works entirely in your browser.',
  keywords: [
    'how to fix broken json online',
    'fix broken json',
    'repair json online',
    'fix malformed json',
    'json error fixer',
    'fix invalid json',
    'json repair tool',
    'fix json syntax errors'
  ],
  openGraph: {
    title: 'How to Fix Broken JSON Online | UnblockDevs',
    description: 'Fix broken JSON online with our step-by-step guide. Free JSON fixer tool included. No signup required. Works entirely in your browser.',
    type: 'website',
    url: 'https://unblockdevs.com/how-to-fix-broken-json-online',
    siteName: 'UnblockDevs',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  twitter: { card: 'summary_large_image', title: 'How to Fix Broken JSON Online | UnblockDevs', description: 'Fix broken JSON online with our step-by-step guide. Free JSON fixer tool included. No signup required.' },
  alternates: { canonical: 'https://unblockdevs.com/how-to-fix-broken-json-online' },
};

export default function HowToFixBrokenJson() {
  return <HowToFixBrokenJsonClient />;
}

