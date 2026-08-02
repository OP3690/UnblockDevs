import type { Metadata } from 'next';
import BlogPostClient from './client';

export const metadata: Metadata = {
  title: 'HTTP Status Codes Every Developer Should Know | UnblockDevs',
  description: 'HTTP status codes explained: 200, 201, 301, 400, 401, 403, 404, 500, 502, 503. What each code means, when it occurs, and how to handle it in your API.',
  keywords: [
    'http status codes',
    'http status code list',
    'http error codes',
    'api status codes',
    'rest api status codes',
    '404 not found',
    '500 internal server error',
    '400 bad request example',
    '401 unauthorized example',
    '403 forbidden example',
    'http response codes explained',
    'what does 502 mean'
  ],
  openGraph: {
    title: 'HTTP Status Codes Every Developer Should Know: 2xx, 3xx, 4xx, 5xx Explained',
    description: 'A complete HTTP status code reference — 200, 201, 301, 400, 401, 403, 404, 500, 502, 503 and more. Learn what each code means, when it is returned, and how to handle it in your API or web app.',
    type: 'article',
    publishedTime: '2026-02-04T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/common-http-status-codes-every-developer-should-understand',
    images: [{ url: 'https://unblockdevs.com/api/og?title=HTTP%20Status%20Codes%20Every%20Developer%20Should%20Know&emoji=%E2%9A%A1&desc=Learn%20all%20HTTP%20status%20codes%3A%20200%2C%20400%2C%20404%2C%20500', width: 1200, height: 630, alt: 'HTTP Status Codes Every Developer Should Know — UnblockDevs Blog' }],

  },
  twitter: {
    card: 'summary_large_image',
    title: 'HTTP Status Codes Every Developer Should Know',
    description: 'HTTP status codes explained: 200, 400, 401, 403, 404, 500, and more. What each code means and how to handle it — quick developer reference.',
  },
  alternates: {
    canonical: 'https://unblockdevs.com/blog/common-http-status-codes-every-developer-should-understand',
  },
};

export default function BlogPost() {
  return <BlogPostClient />;
}
