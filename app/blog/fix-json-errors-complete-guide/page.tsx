import type { Metadata } from 'next';
import FixJsonErrorsGuideClient from './client';

export const metadata: Metadata = {
  title: 'Fix JSON Errors Complete Guide – Parse, Unexpected Token, Stringify | UnblockDevs',
  description: 'Fix all JSON errors: parse error unexpected token, API returns HTML (unexpected token <), JSON.stringify returns undefined. Causes, solutions, and code examples. One guide.',
  keywords: [
    'fix json errors',
    'json parse error',
    'json parse error unexpected token',
    'unexpected token less than json',
    'api returns html instead of json',
    'json stringify returns undefined',
    'fix json parse error',
    'json parse error javascript',
    'validate json',
  ],
  openGraph: {
    title: 'Fix JSON Errors Complete Guide – Parse, Unexpected Token, Stringify',
    description: 'Fix JSON parse errors, unexpected token < when API returns HTML, and JSON.stringify undefined. One complete guide with code.',
    type: 'article',
    publishedTime: '2026-03-02T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/fix-json-errors-complete-guide',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/fix-json-errors-complete-guide' },
};

export default function FixJsonErrorsGuidePage() {
  return <FixJsonErrorsGuideClient />;
}
