import type { Metadata } from 'next';
import CurlToPythonRequestsClient from './client';

export const metadata: Metadata = {
  title: 'cURL to Python Requests - Free Online Converter | UnblockDevs',
  description: 'Convert cURL commands to Python Requests code instantly. Free online tool to transform curl commands to Python requests library. Supports authentication, headers, JSON data, and file uploads.',
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

