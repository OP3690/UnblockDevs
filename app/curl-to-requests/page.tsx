import type { Metadata } from 'next';
import CurlToRequestsClient from './client';

export const metadata: Metadata = {
  title: 'cURL to Code – Python, JS, PHP & More | UnblockDevs',
  description: 'Convert cURL to Python, JS, PHP, Ruby, Java, Go, C#. Full auth & headers. No signup, instant.',
  keywords: [
    'curl to requests',
    'convert curl to requests',
    'curl to python requests',
    'curl to javascript fetch',
    'curl to http request',
    'curl converter online',
    'convert curl command'
  ],
  openGraph: {
    title: 'cURL to Code – Python, JS, PHP & More | UnblockDevs',
    description: 'Convert cURL to Python, JS, PHP, Ruby, Java, Go, C#. Full auth & headers. No signup, instant.',
    type: 'website',
    url: 'https://unblockdevs.com/curl-to-requests',
    siteName: 'UnblockDevs',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  twitter: { card: 'summary_large_image', title: 'cURL to Code | UnblockDevs', description: 'Convert cURL to Python, JS, PHP, Ruby, Java, Go, C#. Full auth & headers. No signup, instant.' },
  alternates: { canonical: 'https://unblockdevs.com/curl-to-requests' },
};

export default function CurlToRequests() {
  return <CurlToRequestsClient />;
}

