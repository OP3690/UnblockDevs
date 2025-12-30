import type { Metadata } from 'next';
import PrivacyPolicyClient from './client';

export const metadata: Metadata = {
  title: 'Privacy Policy | UnblockDevs',
  description: 'Privacy Policy for UnblockDevs - Learn how we collect, use, and protect your data. Compliant with GDPR, CCPA, and other privacy regulations.',
  keywords: [
    'privacy policy',
    'data protection',
    'GDPR',
    'CCPA',
    'privacy',
    'UnblockDevs privacy',
    'data privacy',
    'cookie policy'
  ],
  openGraph: {
    title: 'Privacy Policy | UnblockDevs',
    description: 'Privacy Policy for UnblockDevs - Learn how we collect, use, and protect your data.',
    type: 'website',
  },
};

export default function PrivacyPolicy() {
  return <PrivacyPolicyClient />;
}
