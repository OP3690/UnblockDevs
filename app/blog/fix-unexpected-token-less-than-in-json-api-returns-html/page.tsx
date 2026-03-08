import type { Metadata } from 'next';
import FixUnexpectedTokenLessThanInJsonApiReturnsHtmlClient from './client';

export const metadata: Metadata = {
  title: 'Fix Unexpected token < in JSON (API Returns HTML) | UnblockDevs',
  description: 'Fix "Unexpected token < in JSON" when API returns HTML. Content-Type, redirects, CORS. Solutions.',
  keywords: [
    'unexpected token in json at position 0',
    'api returns html instead of json',
    'json parse error unexpected token',
    'fix unexpected token json',
    'api returns html error',
    'json parse error position 0',
    'unexpected token less than json',
    'api response html not json',
    'fix json parse error html',
    'api returns html fetch',
    'json parse error api',
    'unexpected token json error',
    'api content-type wrong',
    'json parse error html response',
    'fix api returns html'
  ],
  openGraph: {
    title: 'Fix Unexpected token < in JSON (API Returns HTML) | UnblockDevs',
    description: 'Fix "Unexpected token < in JSON" when API returns HTML. Solutions.',
    type: 'article',
    url: 'https://unblockdevs.com/blog/fix-unexpected-token-less-than-in-json-api-returns-html',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],

  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fix Unexpected token < in JSON (API Returns HTML) | UnblockDevs',
    description: 'Fix "Unexpected token < in JSON" when API returns HTML. Solutions.',
  },  alternates: { canonical: 'https://unblockdevs.com/blog/fix-unexpected-token-less-than-in-json-api-returns-html' },

};

export default function FixUnexpectedTokenLessThanInJsonApiReturnsHtmlPage() {
  return <FixUnexpectedTokenLessThanInJsonApiReturnsHtmlClient />;
}
