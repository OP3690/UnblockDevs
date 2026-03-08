import type { Metadata } from 'next';
import HowToConvertHarFilesToCurlClient from './client';

export const metadata: Metadata = {
  title: 'Convert HAR Files to cURL Commands | UnblockDevs',
  description: 'Convert HAR files to cURL. Export browser requests, step-by-step. Free converter tool.',
  keywords: [
    'how to convert har files to curl',
    'convert har file to curl',
    'har file to curl converter',
    'export browser network requests to curl',
    'har to curl command',
    'convert http archive to curl',
    'har json to curl',
    'browser network to curl',
    'har to curl generator',
    'convert har to curl online',
    'har file converter',
    'network request export to curl',
    'chrome har to curl',
    'firefox har to curl',
    'devtools har to curl',
    'har to curl tool',
    'convert har file online',
    'har to curl script',
    'export curl from har',
    'har to curl conversion'
  ],
  openGraph: {
    title: 'How to Convert HAR Files to cURL: Complete Guide',
    description: 'Convert HAR to cURL. Step-by-step, free tool.',
    type: 'article',
    publishedTime: '2025-01-15T00:00:00Z',
    authors: ['UnblockDevs'],
    tags: ['HAR', 'cURL', 'Network Requests', 'Browser DevTools', 'API Development'],
    url: 'https://unblockdevs.com/blog/how-to-convert-har-files-to-curl',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],

  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Convert HAR Files to cURL: Complete Guide',
    description: 'Convert HAR to cURL. Step-by-step, free tool.',
  },  alternates: { canonical: 'https://unblockdevs.com/blog/how-to-convert-har-files-to-curl' },

};

export default function HowToConvertHarFilesToCurl() {
  return <HowToConvertHarFilesToCurlClient />;
}
