import type { Metadata } from 'next';
import HowToConvertCurlToJavascriptFetchClient from './client';

export const metadata: Metadata = {
  title: 'Convert cURL to JavaScript Fetch: Complete Guide | UnblockDevs',
  description: 'Convert any cURL command to JavaScript fetch code. Covers GET, POST, PUT, DELETE, custom headers, authorization tokens, and request bodies with step-by-step examples.',
  keywords: [
    'convert curl to javascript fetch',
    'curl to fetch api converter',
    'curl command to javascript',
    'javascript fetch from curl',
    'curl to fetch code example',
    'convert curl post to javascript fetch',
    'curl headers to fetch headers',
    'how to convert curl to fetch in javascript',
    'curl command to fetch request',
    'turn curl into javascript fetch code',
    'convert curl auth to fetch',
    'curl to fetch with authorization'
  ],
  openGraph: {
    title: 'Convert cURL to JavaScript Fetch: Headers, Auth, POST & More',
    description: 'Learn how to translate any cURL command into equivalent JavaScript fetch code — covering GET, POST, PUT, DELETE, custom headers, bearer tokens, and request bodies. With copy-paste examples.',
    type: 'article',
    publishedTime: '2026-01-25T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/how-to-convert-curl-command-to-javascript-fetch',
    images: [{ url: 'https://unblockdevs.com/api/og?title=How%20to%20Convert%20cURL%20Command%20to%20JavaScript%20Fetch%3A%20Complete%20Guide%202026&emoji=%E2%9A%A1&desc=Convert%20cURL%20to%20JavaScript%20fetch', width: 1200, height: 630, alt: 'How to Convert cURL Command to JavaScript Fetch: Complete Guide 2026 — UnblockDevs Blog' }],

  },  twitter: {
    card: 'summary_large_image',
    title: 'Convert cURL to JavaScript Fetch: Complete Guide',
    description: 'Convert cURL commands to JavaScript fetch — GET, POST, headers, auth, and request bodies. Clear examples for every HTTP method and use case.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/how-to-convert-curl-command-to-javascript-fetch' },

};

export default function HowToConvertCurlToJavascriptFetchGuide() {
  return <HowToConvertCurlToJavascriptFetchClient />;
}
