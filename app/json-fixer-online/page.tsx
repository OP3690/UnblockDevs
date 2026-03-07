import type { Metadata } from 'next';
import JsonFixerOnlineClient from './client';

export const metadata: Metadata = {
  title: 'Fix Invalid JSON Online – Remove Trailing Comma, Repair AI JSON | UnblockDevs',
  description: 'Paste → Instant fix. Fix invalid JSON: remove trailing comma JSON, fix missing quotes, broken arrays, and AI-generated JSON. Resolve trailing commas, fix API responses. 100% client-side.',
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
};

export default function JsonFixerOnline() {
  return <JsonFixerOnlineClient />;
}

