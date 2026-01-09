import type { Metadata } from 'next';
import JsonFormatterClient from './client';

export const metadata: Metadata = {
  title: 'Free JSON Formatter & Validator – No Login Required | UnblockDevs',
  description: 'Format, beautify, and validate JSON instantly. Free online JSON formatter with customizable indentation. No signup, no login, 100% private. Works in your browser – no data sent to servers.',
  keywords: [
    'json formatter',
    'json formatter online',
    'json formatter free',
    'format json online',
    'beautify json',
    'prettify json',
    'json beautifier',
    'format json tool'
  ],
};

export default function JsonFormatter() {
  return <JsonFormatterClient />;
}

