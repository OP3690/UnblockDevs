import type { Metadata } from 'next';
import CurlToRequestsClient from './client';

export const metadata: Metadata = {
  title: 'Convert cURL to Requests - Python, JavaScript, PHP & More | UnblockDevs',
  description: 'Free online tool to convert cURL commands to Python Requests, JavaScript Fetch, PHP, Ruby, Java, Go, and C#. Supports authentication, headers, and all HTTP methods. No signup required.',
  keywords: [
    'curl to requests',
    'convert curl to requests',
    'curl to python requests',
    'curl to javascript fetch',
    'curl to http request',
    'curl converter online',
    'convert curl command'
  ],
};

export default function CurlToRequests() {
  return <CurlToRequestsClient />;
}

