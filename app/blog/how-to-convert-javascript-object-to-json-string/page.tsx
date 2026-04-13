import type { Metadata } from 'next';
import BlogPostClient from './client';

export const metadata: Metadata = {
  title: 'How to Convert a JavaScript Object to a JSON String — JSON.stringify() Guide | UnblockDevs',
  description:
    'Convert any JavaScript object to a JSON string using JSON.stringify(). Covers pretty-print, field filtering, nested objects, arrays, and all scenarios: API requests, localStorage, Node.js file writing, and logging.',
  keywords: [
    'convert javascript object to json string',
    'javascript object to json',
    'js object to json string',
    'how to stringify an object javascript',
    'json stringify object online',
    'convert object to json online',
    'javascript convert object to json',
    'object to json string javascript',
    'stringify js object to json',
    'json stringify nested object',
    'json stringify array',
    'convert js object to json online',
    'how to convert object to json in javascript',
    'json serialize object',
    'object to json converter online',
  ],
  openGraph: {
    title: 'How to Convert a JavaScript Object to a JSON String | UnblockDevs',
    description:
      'Complete guide to converting JavaScript objects to JSON strings: JSON.stringify(), pretty-print, field filtering, all scenarios with code examples.',
    type: 'article',
    publishedTime: '2026-04-13T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/how-to-convert-javascript-object-to-json-string',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Convert a JavaScript Object to a JSON String',
    description:
      'JSON.stringify() guide: compact, pretty-print, field filtering, nested objects, API requests, localStorage, Node.js file writing.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/how-to-convert-javascript-object-to-json-string' },
};

export default function HowToConvertJavascriptObjectToJsonStringPage() {
  return <BlogPostClient />;
}
