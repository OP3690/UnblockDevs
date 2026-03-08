import type { Metadata } from 'next';
import PayloadAnalyzerClient from './client';

export const metadata: Metadata = {
  title: 'Payload Analyzer – Analyze API Payloads | UnblockDevs',
  description: 'Analyze API payloads and responses. Inspect data, identify issues, optimize size. No signup.',
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
    title: 'Payload Analyzer | UnblockDevs',
    description: 'Analyze API payloads and responses instantly. Free online payload analyzer tool.',
    type: 'website',
    url: 'https://unblockdevs.com/payload-analyzer',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  alternates: {
    canonical: 'https://unblockdevs.com/payload-analyzer',
  },
};

export default function PayloadAnalyzerPage() {
  return <PayloadAnalyzerClient />;
}
