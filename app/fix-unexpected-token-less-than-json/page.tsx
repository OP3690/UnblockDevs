import type { Metadata } from 'next';
import FixUnexpectedTokenLessThanClient from './client';

export const metadata: Metadata = {
  title: 'Fix "Unexpected token < in JSON" Error - Complete Guide | UnblockDevs',
  description: 'Learn how to fix "Unexpected token < in JSON" error instantly. This error means HTML was returned instead of JSON. Common causes and solutions with free JSON Fixer tool.',
  keywords: [
    'fix unexpected token < in json',
    'unexpected token < json error',
    'html instead of json',
    'json parse error html',
    'fix json html error',
    'api returned html not json',
    'unexpected token < fix'
  ],
};

export default function FixUnexpectedTokenLessThan() {
  return <FixUnexpectedTokenLessThanClient />;
}

