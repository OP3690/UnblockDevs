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
    images: [{ url: 'https://unblockdevs.com/api/og?title=How%20to%20Check%20HTTP%20Headers%20of%20Any%20Request%20%28Browser%2C%20cURL%20%26%20Online%20Tool%29&emoji=%F0%9F%94%92&desc=Step-by-step%3A%20how%20to%20view%20HTTP%20request%20and%20response%20headers%20in%20Chrome%20DevTools%2C', width: 1200, height: 630, alt: 'How to Check HTTP Headers of Any Request (Browser, cURL & Online Tool) — UnblockDevs Blog' }],
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
