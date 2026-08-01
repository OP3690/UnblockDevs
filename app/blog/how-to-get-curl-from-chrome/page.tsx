import type { Metadata } from 'next';
import HowToGetCurlFromChromeClient from './client';

export const metadata: Metadata = {
  title: 'Chrome DevTools Copy as cURL: Complete Guide | UnblockDevs',
  description: 'How to copy network requests as cURL in Chrome DevTools. Step-by-step: open Network tab, right-click request, select "Copy as cURL". Works for all HTTP methods.',
  keywords: [
    'how to get curl from chrome',
    'copy as curl chrome',
    'chrome devtools curl',
    'export request as curl',
    'chrome network tab curl',
    'copy request curl chrome',
    'chrome curl command',
    'chrome devtools copy as curl',
    'chrome devtools network copy as curl',
    'copy as curl chrome devtools network request',
    'chrome devtools copy as curl feature',
    'chrome devtools copy request as curl',
    'chrome devtools network tab copy as curl option',
    'copy as curl chrome devtools network',
    'chrome devtools copy as curl how to',
    'chrome devtools copy as curl network',
    'chrome devtools copy as curl network request',
    'copy request as curl chrome devtools',
    'chrome devtools network panel copy as curl',
    'chrome devtools copy as curl network request official docs',
    'chrome devtools copy as fetch network request',
    'copy as curl chrome devtools network request documentation',
    'copy curl from chrome devtools',
    'chrome network panel copy as curl',
    'devtools copy as curl',
    'chrome devtools copy as fetch network',
    'microsoft edge devtools copy as curl network request',
    'edge devtools copy as curl',
    'firefox devtools copy as curl network request'
  ],
  openGraph: {
    title: 'Chrome DevTools Copy as cURL: How to Export Network Requests | UnblockDevs',
    description: 'Step-by-step guide to copy any Chrome DevTools network request as a cURL command for debugging and API testing.',
    type: 'article',
    publishedTime: '2025-01-15T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/how-to-get-curl-from-chrome',
    images: [{ url: 'https://unblockdevs.com/api/og?title=Chrome%20DevTools%20Copy%20as%20cURL%3A%20How%20to%20Export%20Network%20Requests&emoji=%E2%9A%A1&desc=Step-by-step%20guide%20to%20copy%20any%20Chrome%20DevTools%20network%20request%20as%20a%20cURL', width: 1200, height: 630, alt: 'Chrome DevTools Copy as cURL: How to Export Network Requests — UnblockDevs Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chrome DevTools Copy as cURL | UnblockDevs',
    description: 'How to copy network requests as cURL from Chrome DevTools. Step-by-step guide.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/how-to-get-curl-from-chrome' },
};

export default function HowToGetCurlFromChrome() {
  return <HowToGetCurlFromChromeClient />;
}

