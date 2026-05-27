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
  openGraph: {
    title: 'Token Security & Privacy: Best Practices',
    description: 'Token security best practices: vulnerabilities, secure storage, rotation',
    type: 'article',
    url: 'https://unblockdevs.com/blog/token-security-privacy-best-practices',
    images: [{ url: 'https://unblockdevs.com/api/og?title=Token%20Security%20%26%20Privacy%3A%20Best%20Practices&emoji=%F0%9F%94%90&desc=Token%20security%20best%20practices%3A%20vulnerabilities%2C%20secure%20storage%2C%20rotation', width: 1200, height: 630, alt: 'Token Security & Privacy: Best Practices — UnblockDevs Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Token Security & Privacy: Best Practices',
    description: 'Token security best practices: vulnerabilities, secure storage, rotation',
    images: ['https://unblockdevs.com/api/og?title=Token%20Security%20%26%20Privacy%3A%20Best%20Practices&emoji=%F0%9F%94%90&desc=Token%20security%20best%20practices%3A%20vulnerabilities%2C%20secure%20storage%2C%20rotation'],
  },
alternates: { canonical: 'https://unblockdevs.com/blog/token-security-privacy-best-practices' },

};

export default function TokenSecurityPrivacyBestPractices() {
  return <TokenSecurityPrivacyBestPracticesClient />;
}

