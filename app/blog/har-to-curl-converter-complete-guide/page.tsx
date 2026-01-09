import type { Metadata } from 'next';
import HarToCurlConverterGuideClient from './client';

export const metadata: Metadata = {
  title: 'HAR to cURL Converter: Complete Guide to Convert Browser Requests to cURL Commands | UnblockDevs',
  description: 'Master HAR to cURL conversion with our complete guide. Learn how to convert HAR files, browser network requests, and HTTP archives to cURL commands. Step-by-step tutorial with examples. Free HAR to cURL converter tool included.',
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
    description: 'Master HAR to cURL conversion. Learn how to convert HAR files and browser network requests to cURL commands with step-by-step examples.',
    type: 'article',
    publishedTime: '2025-01-15T00:00:00Z',
    authors: ['UnblockDevs'],
    tags: ['HAR', 'cURL', 'Network Requests', 'Browser DevTools', 'API Testing'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HAR to cURL Converter: Complete Guide',
    description: 'Master HAR to cURL conversion. Convert HAR files and browser network requests to cURL commands instantly.',
  },
};

export default function HarToCurlConverterGuide() {
  return <HarToCurlConverterGuideClient />;
}
