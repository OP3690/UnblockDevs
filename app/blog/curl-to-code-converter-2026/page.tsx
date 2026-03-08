import type { Metadata } from 'next';
import CurlToCodeConverter2026Client from './client';

export const metadata: Metadata = {
  title: 'Convert cURL to Code in 2026 – JS, Python, Go, PHP | UnblockDevs',
  description: 'Convert cURL to code: JavaScript, Python, Go, PHP, Java. GET, POST, headers, auth. Free converter.',
  keywords: [
    'curl to javascript fetch',
    'curl to python requests',
    'convert curl to code online',
    'curl to code converter',
    'curl to javascript',
    'curl to python',
    'curl to go',
    'curl to php',
    'curl to java',
    'curl converter',
    'HTTP request converter',
    'API request converter',
    'convert curl command',
    'curl code generator'
  ],
  openGraph: {
    title: 'How to Convert cURL Commands to Code in 2026',
    description: 'Step-by-step guide to convert cURL commands to code in JavaScript, Python, Go, PHP, Java, and more.',
    type: 'article',
    publishedTime: '2025-01-15T00:00:00.000Z',
    authors: ['UnblockDevs'],
    tags: ['cURL', 'API', 'HTTP Requests', 'Code Generation', 'Web Development'],
    url: 'https://unblockdevs.com/blog/curl-to-code-converter-2026',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],

  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Convert cURL Commands to Code in 2026',
    description: 'Convert cURL commands to code in JavaScript, Python, Go, PHP, and more with our free converter.',
  },  alternates: { canonical: 'https://unblockdevs.com/blog/curl-to-code-converter-2026' },

};

export default function CurlToCodeConverter2026() {
  return <CurlToCodeConverter2026Client />;
}

