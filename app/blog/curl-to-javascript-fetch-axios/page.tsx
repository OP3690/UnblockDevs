import type { Metadata } from 'next';
import BlogPostClient from './client';

export const metadata: Metadata = {
  title: 'How to Convert cURL to JavaScript fetch, Axios & Node.js — Complete Guide | UnblockDevs',
  description:
    'Convert any cURL command to JavaScript fetch(), Axios, or Node.js. GET, POST with JSON, auth headers, form data, file uploads — step-by-step guide with code examples and free online converter.',
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
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Convert cURL to JavaScript fetch, Axios & Node.js',
    description:
      'Step-by-step guide: convert cURL GET, POST, auth headers, form data to JavaScript fetch() and Axios with code examples.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/curl-to-javascript-fetch-axios' },
};

export default function CurlToJavascriptFetchAxiosPage() {
  return <BlogPostClient />;
}
