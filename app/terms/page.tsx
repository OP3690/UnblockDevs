import type { Metadata } from 'next';
import TermsClient from './client';

export const metadata: Metadata = {
  title: 'Terms & Conditions | UnblockDevs',
  description: 'Terms and Conditions for UnblockDevs - Free developer tools. Read our terms of service, usage policies, and user agreements.',
  keywords: [
    'terms and conditions',
    'terms of service',
    'user agreement',
    'legal',
    'unblockdevs terms',
    'developer tools terms'
  ],
  openGraph: {
    title: 'Terms & Conditions | UnblockDevs',
    description: 'Terms and Conditions for UnblockDevs - Free developer tools.',
    type: 'website',
  },
};

export default function Terms() {
  return <TermsClient />;
}
