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
  alternates: { canonical: 'https://unblockdevs.com/blog/top-10-json-errors-waste-developer-time' },

};

export default function Top10JsonErrors() {
  return <Top10JsonErrorsClient />;
}

