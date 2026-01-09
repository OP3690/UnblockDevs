import type { Metadata } from 'next';
import FixUnexpectedEndOfJsonInputClient from './client';

export const metadata: Metadata = {
  title: 'Free Guide: Fix "Unexpected end of JSON input" Error | UnblockDevs',
  description: 'Fix "Unexpected end of JSON input" error instantly. Free guide with examples and JSON fixer tool. No signup required, works in your browser.',
  keywords: [
    'fix unexpected end of json input',
    'unexpected end of json input error',
    'json parse error unexpected end',
    'fix json input error',
    'json input error solution',
    'unexpected end of json',
    'json parse error fix',
    'invalid json input',
    'json error fixer',
    'fix broken json'
  ],
  openGraph: {
    title: 'Fix "Unexpected end of JSON input" Error - Complete Guide',
    description: 'Learn how to fix "Unexpected end of JSON input" error instantly with examples and free tools.',
    type: 'article',
  },
};

export default function FixUnexpectedEndOfJsonInput() {
  return <FixUnexpectedEndOfJsonInputClient />;
}

