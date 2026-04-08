import type { Metadata } from 'next';
import FixUnexpectedEndOfJsonInputErrorExplainedClient from './client';

export const metadata: Metadata = {
  title: 'Fix Unexpected End of JSON Input 2026 | UnblockDevs',
  description: 'Fix "Unexpected end of JSON input" in JS, Node, browsers. Causes, solutions, code examples.',
  keywords: [
    'unexpected end of json input',
    'fix json parse error',
    'json parse error unexpected end',
    'unexpected end of json input fix',
    'json parse error javascript',
    'fix json parsing error',
    'unexpected end of json',
    'json parse error solution',
    'fix unexpected end json',
    'json parse error explained',
    'unexpected end json input',
    'json parse error fix',
    'javascript json parse error',
    'node.js json parse error',
    'fix json input error',
    'fetch 204 no content response.json unexpected end of json input',
    'response.json() unexpected end of json input',
    'json parse empty response 204'
  ],
  openGraph: {
    title: 'Fix Unexpected End of JSON Input 2026 | UnblockDevs',
    description: 'Fix "Unexpected end of JSON input". Causes, solutions, code.',
    type: 'article',
    url: 'https://unblockdevs.com/blog/fix-unexpected-end-of-json-input-error-explained',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],

  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fix Unexpected End of JSON Input 2026 | UnblockDevs',
    description: 'Fix "Unexpected end of JSON input". Causes, solutions, code.',
  },  alternates: { canonical: 'https://unblockdevs.com/blog/fix-unexpected-end-of-json-input-error-explained' },

};

export default function FixUnexpectedEndOfJsonInputErrorExplainedPage() {
  return <FixUnexpectedEndOfJsonInputErrorExplainedClient />;
}
