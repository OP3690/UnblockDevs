import type { Metadata } from 'next';
import JsonFixerOnlineClient from './client';

export const metadata: Metadata = {
  title: 'JSON Fixer Online - Free JSON Repair Tool | UnblockDevs',
  description: 'Free JSON Fixer online tool. Fix broken JSON, repair syntax errors, validate JSON structure instantly. No signup required. 100% privacy-focused.',
  keywords: [
    'json fixer online',
    'json fixer online free',
    'fix json online',
    'json repair tool',
    'fix broken json',
    'json error fixer',
    'json syntax fixer',
    'repair json online'
  ],
};

export default function JsonFixerOnline() {
  return <JsonFixerOnlineClient />;
}

