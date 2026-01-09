import type { Metadata } from 'next';
import CurlToPythonRequestsClient from './client';

export const metadata: Metadata = {
  title: 'Free cURL to Python Converter – Generate Requests Code Instantly | UnblockDevs',
  description: 'Convert cURL commands to Python Requests code instantly. Free online converter with full auth, headers, and JSON support. No signup, no login, works in your browser.',
  keywords: [
    'curl to python requests',
    'convert curl to python',
    'curl to requests python',
    'python requests from curl',
    'convert curl command python',
    'curl python converter',
    'python http requests from curl'
  ],
};

export default function CurlToPythonRequests() {
  return <CurlToPythonRequestsClient />;
}

