import type { Metadata } from 'next';
import ConvertCurlToHttpRequestClient from './client';

export const metadata: Metadata = {
  title: 'Convert cURL to HTTP Request - Free Online Converter | UnblockDevs',
  description: 'Convert cURL commands to HTTP requests instantly. Free online tool to transform curl commands to HTTP request format. Supports all HTTP methods, headers, and authentication.',
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

