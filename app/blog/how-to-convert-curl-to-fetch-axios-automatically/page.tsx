import type { Metadata } from 'next';
import HowToConvertCurlToFetchAxiosAutomaticallyClient from './client';

export const metadata: Metadata = {
  title: 'Convert cURL to Fetch or Axios Automatically | UnblockDevs',
  description: 'Convert cURL commands to JavaScript Fetch or Axios automatically. Covers all HTTP methods, headers, auth tokens, and request bodies. Tools and manual code conversion guide.',
  keywords: [
    'convert curl to fetch',
    'convert curl to axios',
    'curl to fetch converter online',
    'curl to axios converter',
    'curl to javascript automatically',
    'curl command to axios code',
    'curl to fetch api converter',
    'convert curl headers to axios',
    'how to convert curl to fetch or axios',
    'tool to convert curl to javascript',
    'curl to fetch with auth automatically',
    'auto convert curl command to code'
  ],
  openGraph: {
    title: 'Convert cURL to Fetch or Axios Automatically: Tools & Code Examples',
    description: 'Need to convert cURL commands to JavaScript? This guide covers both Fetch and Axios, with online tools and manual conversion examples for all HTTP methods, headers, auth tokens, and request bodies.',
    type: 'article',
    publishedTime: '2026-01-28T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/how-to-convert-curl-to-fetch-axios-automatically',
    images: [{ url: 'https://unblockdevs.com/api/og?title=Convert%20cURL%20to%20Fetch%20/%20Axios%202026&emoji=%E2%9A%A1&desc=Convert%20cURL%20to%20Fetch%20and%20Axios', width: 1200, height: 630, alt: 'Convert cURL to Fetch / Axios 2026 — UnblockDevs Blog' }],

  },
  twitter: {
    card: 'summary_large_image',
    title: 'Convert cURL to Fetch or Axios Automatically',
    description: 'Convert cURL to JavaScript Fetch or Axios — with tools and manual examples for all HTTP methods, headers, and auth tokens. Quick and easy.',
  },  alternates: { canonical: 'https://unblockdevs.com/blog/how-to-convert-curl-to-fetch-axios-automatically' },

};

export default function HowToConvertCurlToFetchAxiosAutomaticallyPage() {
  return <HowToConvertCurlToFetchAxiosAutomaticallyClient />;
}
