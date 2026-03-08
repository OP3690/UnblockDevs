import type { Metadata } from 'next';
import JsonStringifyVsJsonParseDifferenceClient from './client';

export const metadata: Metadata = {
  title: 'JSON.stringify() vs JSON.parse() Guide | UnblockDevs',
  description: 'JSON.stringify() vs JSON.parse(): when to use each, examples, how they work together.',
  keywords: [
    'json stringify vs json parse',
    'json parse online',
    'json serialize online',
    'json stringify js',
    'json parser online',
    'json stringify example',
    'json parse vs stringify'
  ],
  alternates: { canonical: 'https://unblockdevs.com/blog/json-stringify-vs-json-parse-difference' },

};

export default function JsonStringifyVsJsonParseDifference() {
  return <JsonStringifyVsJsonParseDifferenceClient />;
}

