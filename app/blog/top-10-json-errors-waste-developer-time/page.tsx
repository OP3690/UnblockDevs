import type { Metadata } from 'next';
import Top10JsonErrorsClient from './client';

export const metadata: Metadata = {
  title: 'Top 10 JSON Errors That Waste Dev Time | UnblockDevs',
  description: 'Top 10 JSON errors that waste time: unexpected token, end of input, invalid control char. Quick fixes.',
  keywords: [
    'json errors waste time',
    'common json errors',
    'json errors developers',
    'fix json errors fast',
    'json error prevention',
    'json debugging',
    'json errors list'
  ],
  openGraph: {
    title: 'Top 10 JSON Errors That Waste Dev Time',
    description: 'Top 10 JSON errors that waste time: unexpected token, end of input, invalid',
    type: 'article',
    url: 'https://unblockdevs.com/blog/top-10-json-errors-waste-developer-time',
    images: [{ url: 'https://unblockdevs.com/api/og?title=Top%2010%20JSON%20Errors%20That%20Waste%20Dev%20Time&emoji=%7B%7D&desc=Top%2010%20JSON%20errors%20that%20waste%20time%3A%20unexpected%20token%2C%20end%20of%20input%2C%20invalid', width: 1200, height: 630, alt: 'Top 10 JSON Errors That Waste Dev Time — UnblockDevs Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Top 10 JSON Errors That Waste Dev Time',
    description: 'Top 10 JSON errors that waste time: unexpected token, end of input, invalid',
    images: ['https://unblockdevs.com/api/og?title=Top%2010%20JSON%20Errors%20That%20Waste%20Dev%20Time&emoji=%7B%7D&desc=Top%2010%20JSON%20errors%20that%20waste%20time%3A%20unexpected%20token%2C%20end%20of%20input%2C%20invalid'],
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/top-10-json-errors-waste-developer-time' },

};

export default function Top10JsonErrors() {
  return <Top10JsonErrorsClient />;
}

