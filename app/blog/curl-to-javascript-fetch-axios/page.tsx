import type { Metadata } from 'next';
import BlogPostClient from './client';

export const metadata: Metadata = {
  title: 'Convert cURL to JavaScript fetch, Axios & Node.js | UnblockDevs',
  description:
    'Convert any cURL command to JavaScript fetch(), Axios, or Node.js. GET, POST, auth headers, form data, and file uploads — step-by-step with code examples.',
  keywords: [
    'curl to javascript',
    'curl to fetch',
    'curl to axios',
    'convert curl to javascript',
    'curl to node.js',
    'curl to fetch online',
    'curl to javascript converter',
    'curl to axios online',
    'convert curl command to fetch',
    'curl -X POST to javascript fetch',
    'curl headers to javascript',
    'curl to js online tool free',
    'curl to javascript online converter',
    'curl command to fetch api',
    'curl to node fetch',
  ],
  openGraph: {
    title: 'How to Convert cURL to JavaScript fetch, Axios & Node.js | UnblockDevs',
    description:
      'Convert any cURL command to JavaScript fetch(), Axios, or Node.js. Step-by-step examples for GET, POST, auth, form data, and file uploads.',
    type: 'article',
    publishedTime: '2026-04-13T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/curl-to-javascript-fetch-axios',
    images: [{ url: 'https://unblockdevs.com/api/og?title=How%20to%20Convert%20cURL%20to%20JavaScript%20fetch%2C%20Axios%20%26%20Node.js&emoji=%E2%9A%A1&desc=Convert%20any%20cURL%20command%20to%20JavaScript%20fetch%28%29%2C%20Axios%2C%20or%20Node', width: 1200, height: 630, alt: 'How to Convert cURL to JavaScript fetch, Axios & Node.js — UnblockDevs Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Convert cURL to JavaScript fetch, Axios & Node.js',
    description:
      'Convert cURL GET, POST, auth headers, and form data to JavaScript fetch() and Axios. Step-by-step guide with code examples and a free online converter.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/curl-to-javascript-fetch-axios' },
};

export default function CurlToJavascriptFetchAxiosPage() {
  return <BlogPostClient />;
}
