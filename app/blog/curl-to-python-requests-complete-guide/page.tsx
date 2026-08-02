import type { Metadata } from 'next';
import CurlToPythonRequestsGuideClient from './client';

export const metadata: Metadata = {
  title: 'cURL to Python Requests: Complete Converter Guide | UnblockDevs',
  description: 'Convert cURL commands to Python Requests: real examples covering authentication, headers, JSON body, and error handling. Free cURL-to-Python converter included.',
  keywords: [
    'curl to python requests',
    'convert curl to python',
    'curl to requests library',
    'python requests from curl',
    'convert curl command python',
    'curl python converter',
    'python http requests tutorial',
    'curl authentication python',
    'curl headers python requests',
    'how to convert curl to python',
    'curl to python online tool'
  ],
  openGraph: {
    title: 'How to Convert cURL Commands to Python Requests: Step-by-Step Guide',
    description: 'Learn to convert cURL commands to Python Requests with real examples — authentication, headers, JSON data, file uploads, and error handling. Includes a free online cURL-to-Python converter tool.',
    type: 'article',
    publishedTime: '2025-01-15T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/curl-to-python-requests-complete-guide',
    images: [{ url: 'https://unblockdevs.com/api/og?title=How%20to%20Convert%20cURL%20to%20Python%20Requests%3A%20Complete%20Guide&emoji=%E2%9A%A1&desc=Step-by-step%20guide%20to%20convert%20cURL%20commands%20to%20Python%20Requests%20with%20real', width: 1200, height: 630, alt: 'How to Convert cURL to Python Requests: Complete Guide — UnblockDevs Blog' }],

  },
  twitter: {
    card: 'summary_large_image',
    title: 'cURL to Python Requests: Complete Converter Guide',
    description: 'Convert cURL to Python Requests with real examples — auth, headers, JSON body, file uploads, error handling. Free converter tool included.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/curl-to-python-requests-complete-guide' },
};

export default function CurlToPythonRequestsGuide() {
  return <CurlToPythonRequestsGuideClient />;
}

