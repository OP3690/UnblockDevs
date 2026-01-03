import type { Metadata } from 'next';
import JsonFormatterClient from './client';

export const metadata: Metadata = {
  title: 'JSON Formatter - Free Online JSON Formatting Tool | UnblockDevs',
  description: 'Free online JSON Formatter. Format, beautify, and prettify JSON with customizable indentation. No signup required. 100% privacy-focused JSON formatting tool.',
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

