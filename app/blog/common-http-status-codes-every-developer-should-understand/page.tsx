import type { Metadata } from 'next';
import BlogPostClient from './client';

export const metadata: Metadata = {
  title: 'Common HTTP Status Codes Every Developer Should Understand (Complete Guide)',
  description: 'Learn all HTTP status codes: 200, 201, 400, 401, 403, 404, 500, 502, 503. Understand what each code means, when to use them, and how to handle them in your applications. Complete reference guide.',
  keywords: [
    'http status codes',
    'http status code',
    'status codes',
    'http codes',
    '200 ok',
    '404 not found',
    '500 internal server error',
    'http response codes',
    'api status codes',
    'rest api status codes',
    'http error codes',
    'status code meaning',
    'http status code list',
    'developer guide http codes'
  ],
  openGraph: {
    title: 'Common HTTP Status Codes Every Developer Should Understand (Complete Guide)',
    description: 'Learn all HTTP status codes: 200, 400, 404, 500. Understand what each code means and when to use them.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://unblockdevs.com/blog/common-http-status-codes-every-developer-should-understand',
  },
};

export default function BlogPost() {
  return <BlogPostClient />;
}
