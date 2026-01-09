import type { Metadata } from 'next';
import JsonFixerOnlineClient from './client';

export const metadata: Metadata = {
  title: 'Free JSON Fixer & Repair Tool – Fix Broken JSON Instantly | UnblockDevs',
  description: 'Fix broken JSON and repair syntax errors automatically. Free online JSON fixer with smart error detection. No signup, no login, 100% private. Works entirely in your browser.',
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

