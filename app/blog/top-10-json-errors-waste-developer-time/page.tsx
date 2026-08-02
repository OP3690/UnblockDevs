import type { Metadata } from 'next';
import Top10JsonErrorsClient from './client';

export const metadata: Metadata = {
  title: 'Top 10 JSON Errors That Waste Dev Time | UnblockDevs',
  description: 'Avoid the 10 most common JSON errors that slow developers down. Fix unexpected token, end of input, invalid control characters, and trailing commas with clear explanations.',
  keywords: [
    'common json errors',
    'json errors waste developer time',
    'unexpected token json error',
    'json end of input error',
    'json invalid control character',
    'json trailing comma error',
    'fix json errors fast',
    'json debugging tips',
    'json parse error fix',
    'json syntax error list',
    'json errors explained',
    'how to fix json parse errors'
  ],
  openGraph: {
    title: 'Top 10 JSON Errors That Waste Developer Time — and How to Fix Them',
    description: 'Unexpected token, end of input, invalid control characters — these JSON errors cost developers hours every week. Learn what each error means and how to fix it permanently.',
    type: 'article',
    publishedTime: '2025-01-15T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/top-10-json-errors-waste-developer-time',
    images: [{ url: 'https://unblockdevs.com/api/og?title=Top%2010%20JSON%20Errors%20That%20Waste%20Dev%20Time&emoji=%F0%9F%93%9D&desc=Top%2010%20JSON%20errors%20that%20waste%20time%3A%20unexpected%20token%2C%20end%20of%20input%2C%20invalid%20cont', width: 1200, height: 630, alt: 'Top 10 JSON Errors That Waste Dev Time — UnblockDevs Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Top 10 JSON Errors That Waste Dev Time',
    description: 'The 10 most common JSON errors that waste developer time — with exact causes and fixes, from unexpected tokens to circular references.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/top-10-json-errors-waste-developer-time' },

};

export default function Top10JsonErrors() {
  return <Top10JsonErrorsClient />;
}

