import type { Metadata } from 'next';
import BlogPostClient from './client';

export const metadata: Metadata = {
  title: 'How to Check HTTP Headers of Any Request (Browser, cURL & Online Tool) | UnblockDevs',
  description:
    'Step-by-step: how to view HTTP request and response headers in Chrome DevTools, Firefox, cURL, and with a free online HTTP header analyzer. Debug missing headers, wrong content-type, and CORS issues instantly.',
  keywords: [
    'how to check http headers of a request',
    'how to analyze http headers online',
    'view response headers from api request',
    'tool to inspect http headers easily',
    'how to debug http request headers',
    'check headers of a website online',
    'how to read http response headers',
    'http header analyzer tool free',
    'inspect request and response headers',
    'how to see headers in browser',
    'http headers checker online',
    'http header viewer tool',
  ],
  openGraph: {
    title: 'How to Check HTTP Headers of Any Request (Browser, cURL & Online Tool) | UnblockDevs',
    description:
      'Step-by-step: how to view HTTP request and response headers in Chrome DevTools, Firefox, cURL, and with a free online HTTP header analyzer. Debug missing headers, wrong content-type, and CORS issues instantly.',
    type: 'article',
    publishedTime: '2026-04-13T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/how-to-check-http-headers-of-a-request',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Check HTTP Headers of Any Request (Browser, cURL & Online Tool)',
    description:
      'Step-by-step: view HTTP headers in Chrome DevTools, Firefox, cURL, and with a free online HTTP header analyzer. Debug CORS and auth issues instantly.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/how-to-check-http-headers-of-a-request' },
};

export default function HowToCheckHttpHeadersPage() {
  return <BlogPostClient />;
}
