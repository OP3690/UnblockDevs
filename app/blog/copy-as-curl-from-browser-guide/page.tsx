import type { Metadata } from 'next';
import CopyAsCurlFromBrowserGuideClient from './client';

export const metadata: Metadata = {
  title: 'Copy as cURL from Browser – Tutorial | UnblockDevs',
  description: 'Copy browser network requests as cURL. Chrome, Firefox, Edge. Free tool for API testing.',
  keywords: [
    'copy as curl online',
    'copy as curl from browser',
    'network request to curl',
    'browser request to curl',
    'curl from browser request',
    'chrome copy as curl',
    'firefox copy as curl',
    'devtools copy curl',
    'network tab copy curl',
    'export request as curl',
    'browser network to curl',
    'copy request curl',
    'chrome devtools curl',
    'firefox devtools curl',
    'network request converter',
    'browser request converter',
    'copy curl command',
    'export curl from browser',
    'devtools to curl',
    'network to curl converter'
  ],
  openGraph: {
    title: 'Copy as cURL from Browser: Network Request to cURL Converter Tutorial',
    description: 'Learn how to copy browser network requests as cURL commands. Step-by-step guide for all major browsers with examples.',
    type: 'article',
    publishedTime: '2025-01-15T00:00:00Z',
    authors: ['UnblockDevs'],
    tags: ['cURL', 'Browser DevTools', 'Network Requests', 'API Testing', 'Web Development'],
    url: 'https://unblockdevs.com/blog/copy-as-curl-from-browser-guide',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],

  },
  twitter: {
    card: 'summary_large_image',
    title: 'Copy as cURL from Browser: Complete Tutorial',
    description: 'Copy browser requests as cURL. Step-by-step for Chrome, Firefox, Edge.',
  },  alternates: { canonical: 'https://unblockdevs.com/blog/copy-as-curl-from-browser-guide' },

};

export default function CopyAsCurlFromBrowserGuide() {
  return <CopyAsCurlFromBrowserGuideClient />;
}
