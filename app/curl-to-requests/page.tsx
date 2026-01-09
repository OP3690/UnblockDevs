import type { Metadata } from 'next';
import CurlToRequestsClient from './client';

export const metadata: Metadata = {
  title: 'Free cURL to Code Converter – Python, JavaScript, PHP & More | UnblockDevs',
  description: 'Convert cURL commands to Python, JavaScript, PHP, Ruby, Java, Go, and C# code instantly. Free online converter with full auth & header support. No signup, no login, instant results.',
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

