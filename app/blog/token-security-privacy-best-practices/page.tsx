import type { Metadata } from 'next';
import TokenSecurityPrivacyBestPracticesClient from './client';

export const metadata: Metadata = {
  title: 'Token Security & Privacy: Best Practices, Dos & Don\'ts | UnblockDevs',
  description: 'Token security & privacy: best practices, vulnerabilities, secure storage, rotation. Secure auth tokens.',
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
  alternates: { canonical: 'https://unblockdevs.com/blog/token-security-privacy-best-practices' },

};

export default function TokenSecurityPrivacyBestPractices() {
  return <TokenSecurityPrivacyBestPracticesClient />;
}

