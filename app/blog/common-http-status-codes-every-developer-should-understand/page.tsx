import type { Metadata } from 'next';
import BlogPostClient from './client';

export const metadata: Metadata = {
  title: 'HTTP Status Codes Every Developer Should Know | UnblockDevs',
  description: 'HTTP status codes: 200, 201, 400, 401, 403, 404, 500, 502, 503. What each means, when to use, how to handle.',
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
    'developer guide http codes',
    'example of 400 api status code',
    '400 bad request example',
    '400 status code api example',
    '401 unauthorized example',
    '403 forbidden example'
  ],
  openGraph: {
    title: 'HTTP Status Codes Every Developer Should Know | UnblockDevs',
    description: 'Learn all HTTP status codes: 200, 400, 404, 500. Understand what each code means and when to use them.',
    type: 'article',
    url: 'https://unblockdevs.com/blog/common-http-status-codes-every-developer-should-understand',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],

  },
  alternates: {
    canonical: 'https://unblockdevs.com/blog/common-http-status-codes-every-developer-should-understand',
  },
};

export default function BlogPost() {
  return <BlogPostClient />;
}
