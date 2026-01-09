import type { Metadata } from 'next';
import ConvertCurlToHttpRequestClient from './client';

export const metadata: Metadata = {
  title: 'Free cURL to HTTP Request Converter – Instant Conversion | UnblockDevs',
  description: 'Convert cURL commands to HTTP request format instantly. Free online converter supporting all HTTP methods, headers, and authentication. No signup, no login, works in your browser.',
  keywords: [
    'convert curl to http request',
    'curl to http request',
    'convert curl command to http',
    'curl http request converter',
    'curl to http online',
    'transform curl to http'
  ],
};

export default function ConvertCurlToHttpRequest() {
  return <ConvertCurlToHttpRequestClient />;
}

