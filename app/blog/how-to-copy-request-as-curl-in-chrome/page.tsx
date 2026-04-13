import type { Metadata } from 'next';
import BlogPostClient from './client';

export const metadata: Metadata = {
  title: 'How to Copy a Request as cURL in Chrome — DevTools Guide',
  description: 'Step-by-step: how to copy any network request as a cURL command in Chrome DevTools. Plus: how to export all requests at once from a HAR file when copy as cURL doesn\'t work.',
  keywords: [
    'how to copy request as curl in chrome',
    'where is copy as curl in devtools',
    'how to convert network request to curl',
    'how to generate curl from browser request',
    'copy as curl not working in chrome fix',
    'how to use curl command from devtools',
    'how to export api request as curl',
    'how to debug api using curl command',
    'convert api request to curl online',
    'how to simplify curl command',
  ],
  openGraph: {
    title: 'How to Copy a Request as cURL in Chrome — DevTools Guide',
    description: 'Step-by-step: how to copy any network request as a cURL command in Chrome DevTools. Plus: how to export all requests at once from a HAR file when copy as cURL doesn\'t work.',
    type: 'article',
    publishedTime: '2026-04-13T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/how-to-copy-request-as-curl-in-chrome',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Copy a Request as cURL in Chrome — DevTools Guide',
    description: 'Step-by-step: how to copy any network request as a cURL command in Chrome DevTools. Plus: how to export all requests at once from a HAR file when copy as cURL doesn\'t work.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/how-to-copy-request-as-curl-in-chrome' },
};

export default function HowToCopyRequestAsCurlInChrome() {
  return <BlogPostClient />;
}
