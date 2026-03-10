import type { Metadata } from 'next';
import CurlToPythonClient from './client';

export const metadata: Metadata = {
  title: 'Convert cURL to Python Requests — Free Online Converter | UnblockDevs',
  description: 'Convert cURL commands to Python Requests code instantly. GET, POST, headers, auth, JSON. Free, no signup. Paste curl, get Python.',
  keywords: [
    'convert curl to python',
    'curl to python',
    'curl to python requests',
    'convert curl to python requests',
    'curl to requests python',
    'curl python converter',
    'convert curl command to python',
    'curl to python code',
    'python requests from curl',
  ],
  openGraph: {
    title: 'Convert cURL to Python Requests — Free Online Converter',
    description: 'Convert cURL to Python Requests instantly. Full auth, headers, JSON. No signup.',
    type: 'website',
    url: 'https://unblockdevs.com/curl-to-python',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - cURL to Python Converter' }],
  },
  alternates: { canonical: 'https://unblockdevs.com/curl-to-python' },
};

export default function CurlToPythonPage() {
  return <CurlToPythonClient />;
}
