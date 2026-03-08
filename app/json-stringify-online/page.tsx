import type { Metadata } from 'next';
import JsonStringifyOnlineClient from './client';

export const metadata: Metadata = {
  title: 'JSON.stringify() Tool – Objects to JSON | UnblockDevs',
  description: 'Convert JS objects to JSON strings. Free JSON.stringify() tool, pretty print. No signup, in-browser.',
  keywords: [
    'json stringify online',
    'json stringify',
    'json stringify pretty',
    'json stringify to json online',
    'stringify json online',
    'json stringify tool',
    'javascript json stringify',
    'json stringify online without newlines',
    'json stringify without newlines',
    'json stringify js',
    'json stringify example',
    'json serialize online'
  ],
  alternates: { canonical: 'https://unblockdevs.com/json-stringify-online' },
};

export default function JsonStringifyOnline() {
  return <JsonStringifyOnlineClient />;
}

