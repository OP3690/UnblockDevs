import type { Metadata } from 'next';
import HowToGetCurlFromChromeClient from './client';

export const metadata: Metadata = {
  title: 'Chrome DevTools Copy as cURL: Complete Guide | UnblockDevs',
  description: 'How to copy network requests as cURL in Chrome DevTools. Step-by-step: open Network tab, right-click request, select "Copy as cURL". Works for all HTTP methods.',
  keywords: [
    'how to get curl from chrome',
    'copy as curl chrome devtools',
    'chrome devtools curl command',
    'chrome network tab copy as curl',
    'export request as curl chrome',
    'chrome devtools copy request as curl',
    'firefox devtools copy as curl',
    'edge devtools copy as curl',
    'how to copy network request as curl',
    'copy curl from devtools chrome',
    'chrome devtools copy fetch request',
    'get curl command from browser devtools'
  ],
  openGraph: {
    title: 'Chrome DevTools: How to Copy Any Network Request as a cURL Command',
    description: 'Step-by-step: open Chrome DevTools Network tab, right-click any request, and select Copy as cURL. Works for all HTTP methods, GET, POST, PUT, and DELETE — plus tips for Firefox and Edge.',
    type: 'article',
    publishedTime: '2025-01-15T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/how-to-get-curl-from-chrome',
    images: [{ url: 'https://unblockdevs.com/api/og?title=Chrome%20DevTools%20Copy%20as%20cURL%3A%20How%20to%20Export%20Network%20Requests&emoji=%E2%9A%A1&desc=Step-by-step%20guide%20to%20copy%20any%20Chrome%20DevTools%20network%20request%20as%20a%20cURL', width: 1200, height: 630, alt: 'Chrome DevTools Copy as cURL: How to Export Network Requests — UnblockDevs Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chrome DevTools Copy as cURL',
    description: 'Open Chrome DevTools Network tab, right-click any request, and copy it as cURL. Works for GET, POST, PUT, DELETE — and also works in Firefox and Edge.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/how-to-get-curl-from-chrome' },
};

export default function HowToGetCurlFromChrome() {
  return <HowToGetCurlFromChromeClient />;
}

