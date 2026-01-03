import type { Metadata } from 'next';
import Top10JsonErrorsClient from './client';

export const metadata: Metadata = {
  title: 'Top 10 JSON Errors That Waste Developer Time (And How to Avoid Them) | UnblockDevs',
  description: 'Discover the top 10 JSON errors that waste developer time: unexpected token, unexpected end of JSON input, invalid control character. Quick fixes and prevention tips.',
  keywords: [
    'json errors waste time',
    'common json errors',
    'json errors developers',
    'fix json errors fast',
    'json error prevention',
    'json debugging',
    'json errors list'
  ],
};

export default function Top10JsonErrors() {
  return <Top10JsonErrorsClient />;
}

