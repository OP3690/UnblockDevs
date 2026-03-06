import type { Metadata } from 'next';
import JsonFixerOnlineClient from './client';

export const metadata: Metadata = {
  title: 'Advanced JSON Fixer & Repair Tool – Recover Truncated, Logs, AI Output | UnblockDevs',
  description: 'Repair malformed JSON, recover truncated payloads, extract JSON from logs, fix AI/API output. Smart error detection, duplicate key fix, stats. 100% client-side.',
  keywords: [
    'json fixer online',
    'advanced json fixer',
    'repair json',
    'fix invalid json',
    'json repair tool',
    'json syntax fixer',
    'fix json from api error',
    'extract json from logs',
  ],
};

export default function JsonFixerOnline() {
  return <JsonFixerOnlineClient />;
}

