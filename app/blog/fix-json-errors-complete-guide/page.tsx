import type { Metadata } from 'next';
import FixJsonErrorsGuideClient from './client';

export const metadata: Metadata = {
  title: 'Fix JSON Parse Errors: Unexpected Token & Stringify | UnblockDevs',
  description: 'Fix all common JSON errors: parse failures, unexpected token (including when API returns HTML), and JSON.stringify returning undefined. With causes and code examples.',
  keywords: [
    'fix json errors',
    'json parse error unexpected token',
    'unexpected token less than json',
    'api returns html instead of json',
    'json stringify returns undefined',
    'json error debugging',
    'json parse unexpected token <',
    'fix json syntax error',
    'json validation error fix',
    'why does json stringify return undefined',
    'how to fix json parse error',
    'fix unexpected token in json'
  ],
  openGraph: {
    title: 'Fix JSON Errors: Complete Guide to Parse, Unexpected Token & Stringify Issues',
    description: 'All the JSON errors you\'ll actually hit: SyntaxError on parse, unexpected token < when your API returns HTML, and JSON.stringify returning undefined. Causes, fixes, and copy-paste code in one place.',
    type: 'article',
    publishedTime: '2026-03-02T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/fix-json-errors-complete-guide',
    images: [{ url: 'https://unblockdevs.com/api/og?title=Fix%20JSON%20Errors%20Complete%20Guide%20%E2%80%93%20Parse%2C%20Unexpected%20Token%2C%20Stringify&emoji=%7B%7D&desc=Fix%20JSON%20parse%20errors%2C%20unexpected%20token%20%3C%20when%20API%20returns%20HTML%2C%20and%20JSON', width: 1200, height: 630, alt: 'Fix JSON Errors Complete Guide – Parse, Unexpected Token, Stringify — UnblockDevs Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fix JSON Parse Errors: Unexpected Token & Stringify',
    description: 'JSON parse error, unexpected token <, or JSON.stringify returning undefined? All three fixed here with causes and copy-paste code examples.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/fix-json-errors-complete-guide' },
};

export default function FixJsonErrorsGuidePage() {
  return <FixJsonErrorsGuideClient />;
}
