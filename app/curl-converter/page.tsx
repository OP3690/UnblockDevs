import type { Metadata } from 'next';
import CurlConverterClient from './client';

export const metadata: Metadata = {
  title: 'cURL Converter – To Python, JS, Go, Postman | UnblockDevs',
  description: 'Convert cURL to JavaScript, Python, Go, Java, PHP, C#, Rust. Export Postman & OpenAPI. Headers, auth, JSON. 100% local.',
  keywords: [
    'curl to python',
    'curl to javascript',
    'curl to axios',
    'curl to fetch',
    'curl to requests python',
    'curl to postman',
    'curl to openapi',
    'convert curl command',
    'curl to api client',
    'curl to nodejs',
  ],
  openGraph: {
    title: 'cURL Converter – Convert cURL to Code, Postman, OpenAPI',
    description: 'Convert cURL to JavaScript, Python, Go, Java, PHP, C#, Rust. Export Postman & OpenAPI. Local only.',
    type: 'website',
    url: 'https://unblockdevs.com/curl-converter',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  alternates: {
    canonical: 'https://unblockdevs.com/curl-converter',
  },
};

export default function CurlConverterPage() {
  return <CurlConverterClient />;
}
