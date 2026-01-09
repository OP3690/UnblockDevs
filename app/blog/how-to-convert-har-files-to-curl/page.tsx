import type { Metadata } from 'next';
import HowToConvertHarFilesToCurlClient from './client';

export const metadata: Metadata = {
  title: 'How to Convert HAR Files to cURL: Export Browser Network Requests to cURL Commands | UnblockDevs',
  description: 'Complete guide on how to convert HAR files to cURL commands. Learn step-by-step methods to export browser network requests, convert HTTP archives, and generate cURL commands. Free HAR to cURL converter tool included.',
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
    description: 'Learn how to convert HAR files to cURL commands. Step-by-step guide with examples and free converter tool.',
    type: 'article',
    publishedTime: '2025-01-15T00:00:00Z',
    authors: ['UnblockDevs'],
    tags: ['HAR', 'cURL', 'Network Requests', 'Browser DevTools', 'API Development'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Convert HAR Files to cURL: Complete Guide',
    description: 'Step-by-step guide to convert HAR files to cURL commands with examples and best practices.',
  },
};

export default function HowToConvertHarFilesToCurl() {
  return <HowToConvertHarFilesToCurlClient />;
}
