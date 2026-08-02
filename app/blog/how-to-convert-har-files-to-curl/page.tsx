import type { Metadata } from 'next';
import HowToConvertHarFilesToCurlClient from './client';

export const metadata: Metadata = {
  title: 'How to Convert HAR Files to cURL Commands | UnblockDevs',
  description: 'Convert HAR files to cURL commands step by step. Export browser network requests from Chrome, Firefox, or Edge and convert them to cURL. Free HAR converter included.',
  keywords: [
    'how to convert har files to curl',
    'convert har file to curl',
    'har file to curl converter',
    'export browser network requests to curl',
    'har to curl command',
    'convert http archive to curl',
    'convert har to curl online',
    'chrome har to curl',
    'firefox har to curl',
    'devtools har to curl',
    'har to curl tool',
    'har to curl conversion',
  ],
  openGraph: {
    title: 'How to Convert HAR Files to cURL: Complete Guide',
    description: 'Convert HAR files to cURL commands from Chrome, Firefox, or Edge. Step-by-step guide with a free online HAR to cURL converter tool.',
    type: 'article',
    publishedTime: '2025-01-15T00:00:00Z',
    authors: ['UnblockDevs'],
    tags: ['HAR', 'cURL', 'Network Requests', 'Browser DevTools', 'API Development'],
    url: 'https://unblockdevs.com/blog/how-to-convert-har-files-to-curl',
    images: [{ url: 'https://unblockdevs.com/api/og?title=How%20to%20Convert%20HAR%20Files%20to%20cURL%3A%20Complete%20Guide&emoji=%E2%9A%A1&desc=Convert%20HAR%20to%20cURL', width: 1200, height: 630, alt: 'How to Convert HAR Files to cURL: Complete Guide — UnblockDevs Blog' }],

  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Convert HAR Files to cURL: Complete Guide',
    description: 'Convert HAR files to cURL commands from Chrome, Firefox, or Edge. Step-by-step guide with a free online HAR to cURL converter tool.',
  },  alternates: { canonical: 'https://unblockdevs.com/blog/how-to-convert-har-files-to-curl' },

};

export default function HowToConvertHarFilesToCurl() {
  return <HowToConvertHarFilesToCurlClient />;
}
