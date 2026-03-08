import type { Metadata } from 'next';
import CurlToPythonRequestsClient from './client';

export const metadata: Metadata = {
  title: 'cURL to Python Requests Converter | UnblockDevs',
  description: 'Convert cURL to Python Requests instantly. Full auth, headers, JSON. No signup, in-browser.',
  keywords: [
    'curl to python requests',
    'convert curl to python',
    'curl to requests python',
    'python requests from curl',
    'convert curl command python',
    'curl python converter',
    'python http requests from curl'
  ],
  openGraph: {
    title: 'cURL to Python Requests Converter | UnblockDevs',
    description: 'Convert cURL to Python Requests instantly. Full auth, headers, JSON. No signup, in-browser.',
    type: 'website',
    url: 'https://unblockdevs.com/curl-to-python-requests',
    siteName: 'UnblockDevs',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  twitter: { card: 'summary_large_image', title: 'cURL to Python Requests Converter | UnblockDevs', description: 'Convert cURL to Python Requests instantly. Full auth, headers, JSON. No signup, in-browser.' },
  alternates: { canonical: 'https://unblockdevs.com/curl-to-python-requests' },
};

export default function CurlToPythonRequests() {
  return <CurlToPythonRequestsClient />;
}

