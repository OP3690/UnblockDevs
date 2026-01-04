import type { Metadata } from 'next';
import JsonStringifyVsJsonParseDifferenceClient from './client';

export const metadata: Metadata = {
  title: 'JSON.stringify() vs JSON.parse(): Complete Difference Guide | UnblockDevs',
  description: 'Learn the difference between JSON.stringify() and JSON.parse(). When to use each, examples, and how they work together. Includes json parse online and json serialize online examples.',
  keywords: [
    'json stringify vs json parse',
    'json parse online',
    'json serialize online',
    'json stringify js',
    'json parser online',
    'json stringify example',
    'json parse vs stringify'
  ],
};

export default function JsonStringifyVsJsonParseDifference() {
  return <JsonStringifyVsJsonParseDifferenceClient />;
}

