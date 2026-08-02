import type { Metadata } from 'next';
import BlogPostClient from './client';

export const metadata: Metadata = {
  title: 'JavaScript Object to JSON: JSON.stringify() Guide | UnblockDevs',
  description: 'Convert a JavaScript object to a JSON string with JSON.stringify(). Covers pretty-print, field filtering, nested objects, API requests, localStorage, and Node.js use cases.',
  keywords: [
    'javascript object to json string',
    'json stringify object javascript',
    'convert object to json javascript',
    'js object to json',
    'json stringify pretty print',
    'json stringify nested object',
    'javascript stringify object to string',
    'how to convert javascript object to json',
    'what does json.stringify do',
    'json stringify with indentation',
    'javascript object to json online',
    'convert js object to json string'
  ],
  openGraph: {
    title: 'Convert JavaScript Object to JSON String Using JSON.stringify() — Full Guide',
    description: 'Everything about JSON.stringify(): convert JavaScript objects to JSON strings with pretty-print, field filtering, nested objects, API requests, localStorage, and Node.js included.',
    type: 'article',
    publishedTime: '2026-04-13T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/how-to-convert-javascript-object-to-json-string',
    images: [{ url: 'https://unblockdevs.com/api/og?title=How%20to%20Convert%20a%20JavaScript%20Object%20to%20a%20JSON%20String&emoji=%7B%7D&desc=Complete%20guide%20to%20converting%20JavaScript%20objects%20to%20JSON%20strings%3A%20JSON', width: 1200, height: 630, alt: 'How to Convert a JavaScript Object to a JSON String — UnblockDevs Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JavaScript Object to JSON: JSON.stringify() Guide',
    description: 'Use JSON.stringify() to convert any JavaScript object to a JSON string. Covers pretty-print, field filtering, nested objects, API requests, and more.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/how-to-convert-javascript-object-to-json-string' },
};

export default function HowToConvertJavascriptObjectToJsonStringPage() {
  return <BlogPostClient />;
}
