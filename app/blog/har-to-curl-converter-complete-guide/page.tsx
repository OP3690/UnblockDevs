import type { Metadata } from 'next';
import HarToCurlConverterGuideClient from './client';

export const metadata: Metadata = {
  title: 'HAR to cURL Converter – Complete Guide | UnblockDevs',
  description: 'HAR to cURL: convert HAR files, browser requests to cURL. Step-by-step, examples. Free converter.',
  keywords: [
    'har to curl',
    'har to curl converter',
    'convert har to curl',
    'har file to curl',
    'browser request to curl',
    'network request to curl',
    'http archive to curl',
    'har converter',
    'export curl from browser',
    'chrome har to curl',
    'firefox har to curl',
    'devtools to curl',
    'network tab to curl',
    'har to curl generator',
    'convert har file',
    'har to curl online',
    'har to curl tool',
    'har to curl command',
    'browser network to curl',
    'har json to curl'
  ],
  openGraph: {
    title: 'HAR to cURL Converter: Complete Guide to Convert Browser Requests to cURL',
    description: 'HAR to cURL: convert HAR files, browser requests. Step-by-step, free tool.',
    type: 'article',
    publishedTime: '2025-01-15T00:00:00Z',
    authors: ['UnblockDevs'],
    tags: ['HAR', 'cURL', 'Network Requests', 'Browser DevTools', 'API Testing'],
    url: 'https://unblockdevs.com/blog/har-to-curl-converter-complete-guide',
    images: [{ url: 'https://unblockdevs.com/api/og?title=HAR%20to%20cURL%20Converter%3A%20Complete%20Guide%20to%20Convert%20Browser%20Requests%20to%20cURL&emoji=%E2%9A%A1&desc=HAR%20to%20cURL%3A%20convert%20HAR%20files%2C%20browser%20requests', width: 1200, height: 630, alt: 'HAR to cURL Converter: Complete Guide to Convert Browser Requests to cURL — UnblockDevs Blog' }],

  },
  twitter: {
    card: 'summary_large_image',
    title: 'HAR to cURL Converter: Complete Guide',
    description: 'HAR to cURL: convert HAR files to cURL instantly. Free tool.',
  },  alternates: { canonical: 'https://unblockdevs.com/blog/har-to-curl-converter-complete-guide' },

};

export default function HarToCurlConverterGuide() {
  return <HarToCurlConverterGuideClient />;
}
