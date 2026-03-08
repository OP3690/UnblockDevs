import type { Metadata } from 'next';
import JsonFixerOnlineClient from './client';

export const metadata: Metadata = {
  title: 'Fix Invalid JSON Online – Trailing Comma, AI JSON | UnblockDevs',
  description: 'Paste → instant fix. Remove trailing commas, fix quotes, broken arrays, AI JSON. 100% client-side.',
  keywords: [
    'fix invalid json',
    'remove trailing comma json',
    'json fixer online',
    'advanced json fixer',
    'repair json',
    'trailing comma json',
    'json repair tool',
    'json syntax fixer',
    'fix json from api error',
    'extract json from logs',
    'fix ai generated json',
    'broken json fixer',
  ],
  alternates: { canonical: 'https://unblockdevs.com/json-fixer-online' },
};

export default function JsonFixerOnline() {
  return <JsonFixerOnlineClient />;
}

