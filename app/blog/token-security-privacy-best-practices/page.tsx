import type { Metadata } from 'next';
import TokenSecurityPrivacyBestPracticesClient from './client';

export const metadata: Metadata = {
  title: 'Token Security & Privacy: Best Practices, Dos & Don\'ts | UnblockDevs',
  description: 'Complete guide to token security and privacy: best practices, dos and don\'ts, common vulnerabilities, secure storage, token rotation, and privacy considerations. Learn how to secure authentication tokens.',
  keywords: [
    'token security',
    'token privacy',
    'token best practices',
    'jwt security',
    'api key security',
    'token storage',
    'token rotation',
    'token vulnerabilities',
    'secure tokens',
    'token dos and donts'
  ],
};

export default function TokenSecurityPrivacyBestPractices() {
  return <TokenSecurityPrivacyBestPracticesClient />;
}

