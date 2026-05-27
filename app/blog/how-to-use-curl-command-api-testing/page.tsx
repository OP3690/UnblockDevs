import type { Metadata } from 'next';
import BlogPostClient from './client';

export const metadata: Metadata = {
  title: 'How to Use cURL to Test APIs — Commands, Examples & Convert to Code | UnblockDevs',
  description:
    'Complete cURL guide for API testing: GET, POST with JSON, Bearer token auth, PUT/PATCH/DELETE, debugging flags, and how to convert any cURL command to Python or JavaScript in seconds.',
  keywords: [
    'how to use curl command',
    'curl command examples api',
    'how to curl an api',
    'curl api testing tutorial',
    'curl get post put delete examples',
    'curl post json example',
    'curl bearer token example',
    'curl with authorization header',
    'curl command to test api',
    'how to use curl in terminal',
    'curl -X POST json example',
    'curl api request examples',
    'curl debugging flags',
    'curl -v verbose example',
    'curl to python converter online',
  ],
  openGraph: {
    title: 'How to Use cURL to Test APIs — Commands, Examples & Convert to Code | UnblockDevs',
    description:
      'Complete cURL guide: GET, POST with JSON, Bearer token, PUT/PATCH/DELETE, debugging flags, and convert any cURL to Python or JavaScript.',
    type: 'article',
    publishedTime: '2026-04-13T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/how-to-use-curl-command-api-testing',
    images: [{ url: 'https://unblockdevs.com/api/og?title=How%20to%20Use%20cURL%20to%20Test%20APIs%20%E2%80%94%20Commands%2C%20Examples%20%26%20Convert%20to%20Code&emoji=%E2%9A%A1&desc=Complete%20cURL%20guide%3A%20GET%2C%20POST%20with%20JSON%2C%20Bearer%20token%2C%20PUT/PATCH/DELETE%2C', width: 1200, height: 630, alt: 'How to Use cURL to Test APIs — Commands, Examples & Convert to Code — UnblockDevs Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Use cURL to Test APIs — Commands & Examples',
    description:
      'Complete cURL guide: GET, POST with JSON, auth headers, PUT/PATCH/DELETE, and convert any cURL to Python or JavaScript code.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/how-to-use-curl-command-api-testing' },
};

export default function HowToUseCurlCommandApiTestingPage() {
  return <BlogPostClient />;
}
