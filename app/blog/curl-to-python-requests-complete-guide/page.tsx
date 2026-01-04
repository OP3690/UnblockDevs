import type { Metadata } from 'next';
import CurlToPythonRequestsGuideClient from './client';

export const metadata: Metadata = {
  title: 'How to Convert cURL to Python Requests: Complete Guide with Examples | UnblockDevs',
  description: 'Learn how to convert cURL commands to Python Requests library. Step-by-step guide with real examples, authentication, headers, JSON data, and error handling. Free converter tool included.',
  keywords: [
    'curl to python requests',
    'convert curl to python',
    'curl to requests library',
    'python requests from curl',
    'convert curl command python',
    'curl python converter',
    'python http requests tutorial'
  ],
  openGraph: {
    title: 'How to Convert cURL to Python Requests: Complete Guide',
    description: 'Step-by-step guide to convert cURL commands to Python Requests with real examples and best practices.',
    type: 'article',
  },
};

export default function CurlToPythonRequestsGuide() {
  return <CurlToPythonRequestsGuideClient />;
}

