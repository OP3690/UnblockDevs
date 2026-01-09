import type { Metadata } from 'next';
import HarToCurlClient from './client';

export const metadata: Metadata = {
  title: 'HAR to cURL Converter | Network Request to cURL | Copy as cURL Online | UnblockDevs',
  description: 'Free online HAR to cURL converter. Convert HAR files, browser network requests, and HTTP archives to cURL commands instantly. Network request to cURL, copy as curl online, har to curl generator. No signup required.',
  keywords: [
    'har to curl',
    'network to curl',
    'convert curl',
    'copy as curl online',
    'curl from browser request',
    'network request to curl converter',
    'har to curl generator',
    'browser request to curl',
    'har to http client converter',
    'convert har to curl',
    'export curl from browser',
    'chrome network to curl',
    'firefox network to curl',
    'devtools to curl',
    'http archive to curl',
    'har file converter',
    'network request converter',
    'browser request converter',
    'curl generator from har',
    'curl command generator'
  ],
  openGraph: {
    title: 'HAR to cURL Converter | Network Request to cURL | UnblockDevs',
    description: 'Convert HAR files and browser network requests to cURL commands instantly. Free online tool for developers.',
    type: 'website',
  },
};

export default function HarToCurl() {
  return <HarToCurlClient />;
}
