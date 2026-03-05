import type { Metadata } from 'next';
import HarToCurlClient from './client';

export const metadata: Metadata = {
  title: 'HAR to cURL Converter – Reproducible API Requests from HAR Files | UnblockDevs',
  description: 'Convert HAR files into clean cURL, Python, Go, Java, PHP, Ruby & more. Multi-request extraction, secret masking, timeline analyzer, batch script, AI debug prompt. 100% client-side.',
  keywords: [
    'har to curl',
    'har to curl converter',
    'convert har to curl',
    'har file converter',
    'network request to curl',
    'browser request to curl',
    'copy as curl online',
    'har to python',
    'har to code',
    'har timeline',
    'har debug',
    'api request from har',
    'replay har requests',
    'har batch convert',
    'chrome har to curl',
    'firefox har to curl',
    'devtools har export',
  ],
  openGraph: {
    title: 'HAR to cURL Converter – Reproducible API Requests | UnblockDevs',
    description: 'Convert HAR files to cURL and multiple languages. Clean headers, mask secrets, timeline, batch script, AI debug prompt. 100% client-side.',
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
