import type { Metadata } from 'next';
import DisclaimerClient from './client';

export const metadata: Metadata = {
  title: 'Disclaimer | UnblockDevs',
  description: 'Disclaimer for UnblockDevs - Free developer tools. Read our disclaimers regarding tool accuracy, third-party content, and service availability.',
  keywords: [
    'disclaimer',
    'legal disclaimer',
    'tool disclaimer',
    'unblockdevs disclaimer',
    'developer tools disclaimer'
  ],
  openGraph: {
    title: 'Disclaimer | UnblockDevs',
    description: 'Disclaimer for UnblockDevs - Free developer tools.',
    type: 'website',
  },
};

export default function Disclaimer() {
  return <DisclaimerClient />;
}
