import type { Metadata } from 'next';
import HowToConvertCurlToFetchAxiosAutomaticallyClient from './client';

export const metadata: Metadata = {
  title: 'Convert cURL to Fetch / Axios 2026 | UnblockDevs',
  description: 'Convert cURL to JavaScript Fetch and Axios. Tools, manual methods, code for all HTTP and auth.',
  keywords: [
    'convert curl to fetch',
    'convert curl to axios',
    'curl to fetch converter',
    'curl to axios converter',
    'convert curl command to javascript',
    'curl to fetch online',
    'curl to axios online',
    'convert curl to fetch api',
    'curl to javascript fetch',
    'curl to javascript axios',
    'convert curl automatically',
    'curl to fetch tool',
    'curl to axios tool',
    'convert curl command',
    'curl converter javascript'
  ],
  openGraph: {
    title: 'Convert cURL to Fetch / Axios 2026 | UnblockDevs',
    description: 'Convert cURL to Fetch and Axios. Tools and code examples.',
    type: 'article',
    url: 'https://unblockdevs.com/blog/how-to-convert-curl-to-fetch-axios-automatically',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],

  },
  twitter: {
    card: 'summary_large_image',
    title: 'Convert cURL to Fetch / Axios 2026 | UnblockDevs',
    description: 'Convert cURL to Fetch and Axios. Tools and code examples.',
  },  alternates: { canonical: 'https://unblockdevs.com/blog/how-to-convert-curl-to-fetch-axios-automatically' },

};

export default function HowToConvertCurlToFetchAxiosAutomaticallyPage() {
  return <HowToConvertCurlToFetchAxiosAutomaticallyClient />;
}
