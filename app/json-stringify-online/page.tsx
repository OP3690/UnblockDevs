import type { Metadata } from 'next';
import JsonStringifyOnlineClient from './client';

export const metadata: Metadata = {
  title: 'JSON.stringify() Online - Free JSON Stringify Tool | UnblockDevs',
  description: 'Convert JavaScript objects to JSON strings online. Free JSON.stringify() tool with pretty print, replacer function, and space parameter support. No installation required.',
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

