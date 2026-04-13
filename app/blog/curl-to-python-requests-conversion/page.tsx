import type { Metadata } from 'next';
import BlogPostClient from './client';

export const metadata: Metadata = {
  title: 'How to Convert cURL to Python requests — Complete Guide | UnblockDevs',
  description:
    'Convert any cURL command to Python requests code. GET, POST with JSON, auth headers, cookies, form data, file uploads — step-by-step guide with examples and a free online cURL to Python converter.',
  keywords: [
    'curl to python',
    'convert curl to python requests',
    'curl to requests.get python',
    'curl to python online',
    'curl -X POST to python',
    'curl to python requests converter',
    'python requests equivalent of curl',
    'curl headers to python',
    'curl -H to python requests',
    'curl to python bearer token',
    'curl -d to python',
    'curl --data to python requests',
    'curl to python script',
    'convert curl command to python code',
    'curl to python3 requests library',
  ],
  openGraph: {
    title: 'How to Convert cURL to Python requests — Complete Guide | UnblockDevs',
    description:
      'Convert any cURL command to Python requests code. GET, POST with JSON, auth headers, cookies, form data, file uploads — step-by-step with examples.',
    type: 'article',
    publishedTime: '2026-04-13T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/curl-to-python-requests-conversion',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Convert cURL to Python requests — Complete Guide',
    description:
      'Convert GET, POST, auth headers, cookies, form data from cURL to Python requests. Step-by-step examples and free online converter.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/curl-to-python-requests-conversion' },
};

export default function CurlToPythonRequestsConversionPage() {
  return <BlogPostClient />;
}
