import type { Metadata } from 'next';
import CurlConverterClient from './client';

export const metadata: Metadata = {
  title: 'Free cURL Converter Online - Convert cURL to Code Instantly | UnblockDevs',
  description: 'Convert cURL commands to code instantly. Free online cURL converter tool to transform cURL commands into JavaScript, Python, Java, PHP, and more. No signup required.',
  keywords: [
    'curl converter',
    'convert curl to code',
    'curl to javascript',
    'curl to python',
    'curl to java',
    'curl converter online',
    'curl to fetch',
    'curl to requests'
  ],
  openGraph: {
    title: 'Free cURL Converter Online - Convert cURL to Code Instantly',
    description: 'Convert cURL commands to code instantly. Free online cURL converter tool.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://unblockdevs.com/curl-converter',
  },
};

export default function CurlConverterPage() {
  return <CurlConverterClient />;
}
