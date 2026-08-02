import type { Metadata } from 'next';
import HarToCurlConverterGuideClient from './client';

export const metadata: Metadata = {
  title: 'HAR to cURL Converter: Convert Browser Requests | UnblockDevs',
  description: 'Convert HAR files to cURL commands from Chrome, Firefox, or Edge. Learn to export network requests, debug API calls, and replay HTTP sessions with free tools.',
  keywords: [
    'har to curl converter',
    'convert har file to curl',
    'har to curl chrome',
    'browser network request to curl',
    'http archive to curl command',
    'export devtools request as curl',
    'har file converter online',
    'how to convert har to curl',
    'what is a har file and how to use it',
    'har to curl from chrome devtools',
    'convert browser request to curl command',
    'debug api with har file'
  ],
  openGraph: {
    title: 'HAR to cURL Converter: Export Chrome & Firefox Network Requests as cURL',
    description: 'Learn how to convert HAR files to cURL commands from Chrome, Firefox, and Edge DevTools. Complete guide with step-by-step instructions, examples, and a free online HAR to cURL converter tool.',
    type: 'article',
    publishedTime: '2025-01-15T00:00:00Z',
    authors: ['UnblockDevs'],
    tags: ['HAR', 'cURL', 'Network Requests', 'Browser DevTools', 'API Testing'],
    url: 'https://unblockdevs.com/blog/har-to-curl-converter-complete-guide',
    images: [{ url: 'https://unblockdevs.com/api/og?title=HAR%20to%20cURL%20Converter%3A%20Complete%20Guide%20to%20Convert%20Browser%20Requests%20to%20cURL&emoji=%E2%9A%A1&desc=HAR%20to%20cURL%3A%20convert%20HAR%20files%2C%20browser%20requests', width: 1200, height: 630, alt: 'HAR to cURL Converter: Complete Guide to Convert Browser Requests to cURL — UnblockDevs Blog' }],

  },
  twitter: {
    card: 'summary_large_image',
    title: 'HAR to cURL Converter: Convert Browser Requests',
    description: 'Convert HAR files from Chrome, Firefox, or Edge to cURL commands. Debug API calls and replay HTTP sessions with our free converter tool.',
  },  alternates: { canonical: 'https://unblockdevs.com/blog/har-to-curl-converter-complete-guide' },

};

export default function HarToCurlConverterGuide() {
  return <HarToCurlConverterGuideClient />;
}
