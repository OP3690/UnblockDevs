import type { Metadata } from 'next';
import CurlConverterClient from './client';

export const metadata: Metadata = {
  title: 'cURL Converter – Convert cURL to Python, JavaScript, Go, Postman, OpenAPI | UnblockDevs',
  description: 'Convert cURL to production-ready code: JavaScript (Fetch/Axios), Python (Requests/HTTPX), Go, Java, PHP, C#, Rust. Export to Postman & OpenAPI. Parse headers, auth, JSON. 100% local.',
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
  },
  alternates: {
    canonical: 'https://unblockdevs.com/curl-converter',
  },
};

export default function CurlConverterPage() {
  return <CurlConverterClient />;
}
