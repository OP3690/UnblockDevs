import type { Metadata } from 'next';
import JsonStringifyOnlineClient from './client';

export const metadata: Metadata = {
  title: 'Free JSON.stringify() Tool – Convert Objects to JSON Online | UnblockDevs',
  description: 'Convert JavaScript objects to JSON strings instantly. Free online JSON.stringify() tool with pretty print and custom formatting. No signup, no login, works in your browser.',
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
};

export default function JsonStringifyOnline() {
  return <JsonStringifyOnlineClient />;
}

