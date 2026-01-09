import type { Metadata } from 'next';
import CopyAsCurlFromBrowserGuideClient from './client';

export const metadata: Metadata = {
  title: 'Copy as cURL from Browser: Network Request to cURL Converter Tutorial | UnblockDevs',
  description: 'Learn how to copy browser network requests as cURL commands. Step-by-step guide for Chrome, Firefox, and Edge. Convert network requests to cURL instantly with our free online tool. Perfect for API testing and debugging.',
  keywords: [
    'copy as curl online',
    'copy as curl from browser',
    'network request to curl',
    'browser request to curl',
    'curl from browser request',
    'chrome copy as curl',
    'firefox copy as curl',
    'devtools copy curl',
    'network tab copy curl',
    'export request as curl',
    'browser network to curl',
    'copy request curl',
    'chrome devtools curl',
    'firefox devtools curl',
    'network request converter',
    'browser request converter',
    'copy curl command',
    'export curl from browser',
    'devtools to curl',
    'network to curl converter'
  ],
  openGraph: {
    title: 'Copy as cURL from Browser: Network Request to cURL Converter Tutorial',
    description: 'Learn how to copy browser network requests as cURL commands. Step-by-step guide for all major browsers with examples.',
    type: 'article',
    publishedTime: '2025-01-15T00:00:00Z',
    authors: ['UnblockDevs'],
    tags: ['cURL', 'Browser DevTools', 'Network Requests', 'API Testing', 'Web Development'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Copy as cURL from Browser: Complete Tutorial',
    description: 'Learn how to copy browser network requests as cURL commands with step-by-step instructions.',
  },
};

export default function CopyAsCurlFromBrowserGuide() {
  return <CopyAsCurlFromBrowserGuideClient />;
}
