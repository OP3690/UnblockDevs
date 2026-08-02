import type { Metadata } from 'next';
import CopyAsCurlFromBrowserGuideClient from './client';

export const metadata: Metadata = {
  title: 'Copy as cURL from Browser – Tutorial | UnblockDevs',
  description: 'Copy browser network requests as cURL commands from Chrome, Firefox, and Edge DevTools. Step-by-step guide for all major browsers. Free cURL converter tool included.',
  keywords: [
    'copy as curl from browser',
    'chrome copy as curl',
    'firefox copy as curl',
    'devtools copy curl',
    'network request to curl',
    'browser request to curl',
    'export request as curl',
    'chrome devtools curl',
    'copy curl command',
    'edge devtools copy as curl',
    'network to curl converter',
    'copy as fetch chrome devtools',
  ],
  openGraph: {
    title: 'Copy as cURL from Browser: Network Request to cURL Converter Tutorial',
    description: 'Learn how to copy browser network requests as cURL commands. Step-by-step guide for Chrome, Firefox, and Edge DevTools with working examples.',
    type: 'article',
    publishedTime: '2025-01-15T00:00:00Z',
    authors: ['UnblockDevs'],
    tags: ['cURL', 'Browser DevTools', 'Network Requests', 'API Testing', 'Web Development'],
    url: 'https://unblockdevs.com/blog/copy-as-curl-from-browser-guide',
    images: [{ url: 'https://unblockdevs.com/api/og?title=Copy%20as%20cURL%20from%20Browser%3A%20Network%20Request%20to%20cURL%20Converter%20Tutorial&emoji=%E2%9A%A1&desc=Learn%20how%20to%20copy%20browser%20network%20requests%20as%20cURL%20commands', width: 1200, height: 630, alt: 'Copy as cURL from Browser: Network Request to cURL Converter Tutorial — UnblockDevs Blog' }],

  },
  twitter: {
    card: 'summary_large_image',
    title: 'Copy as cURL from Browser: Complete Tutorial',
    description: 'Copy browser network requests as cURL commands from Chrome, Firefox, and Edge DevTools. Step-by-step guide with a free cURL converter tool.',
  },  alternates: { canonical: 'https://unblockdevs.com/blog/copy-as-curl-from-browser-guide' },

};

export default function CopyAsCurlFromBrowserGuide() {
  return <CopyAsCurlFromBrowserGuideClient />;
}
