import type { Metadata } from 'next';
import HarToCurlClient from './client';

export const metadata: Metadata = {
  title: 'Free HAR to cURL Converter – Convert Browser Requests Instantly | UnblockDevs',
  description: 'Convert HAR files and browser network requests to cURL commands instantly. Free online HAR to cURL converter with multiple request support. No signup, no login, works entirely in your browser.',
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
    url: 'https://unblockdevs.com/har-to-curl',
  },
  alternates: {
    canonical: 'https://unblockdevs.com/har-to-curl',
  },
};

export default function HarToCurl() {
  return <HarToCurlClient />;
}
