import type { Metadata } from 'next';
import PayloadAnalyzerClient from './client';

export const metadata: Metadata = {
  title: 'Free Payload Analyzer Online - Analyze API Payloads Instantly | UnblockDevs',
  description: 'Analyze API payloads and responses instantly. Free online payload analyzer tool to inspect request/response data, identify issues, and optimize payload size. No signup required.',
  keywords: [
    'payload analyzer',
    'api payload analyzer',
    'analyze api payload',
    'payload size analyzer',
    'api response analyzer',
    'request payload analyzer',
    'payload optimization',
    'api payload tool'
  ],
  openGraph: {
    title: 'Free Payload Analyzer Online - Analyze API Payloads Instantly',
    description: 'Analyze API payloads and responses instantly. Free online payload analyzer tool.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://unblockdevs.com/payload-analyzer',
  },
};

export default function PayloadAnalyzerPage() {
  return <PayloadAnalyzerClient />;
}
