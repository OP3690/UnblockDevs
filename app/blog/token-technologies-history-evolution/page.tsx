import type { Metadata } from 'next';
import TokenTechnologiesHistoryEvolutionClient from './client';

export const metadata: Metadata = {
  title: 'Token Technologies: History & Evolution | UnblockDevs',
  description: 'Token technologies: from session cookies to JWT, OAuth, API keys. History and evolution of auth tokens.',
  keywords: [
    'token history',
    'token evolution',
    'jwt history',
    'oauth history',
    'authentication token history',
    'token technologies',
    'token standards',
    'bearer token history',
    'api key history',
    'token development'
  ],
  openGraph: {
    title: 'Token Technologies: History & Evolution',
    description: 'Token technologies: from session cookies to JWT, OAuth, API keys. History and evolution of auth tokens.',
    type: 'article',
    publishedTime: '2025-01-30T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/token-technologies-history-evolution',
    images: [{ url: 'https://unblockdevs.com/api/og?title=Token%20Technologies%3A%20History%20%26%20Evolution&emoji=%F0%9F%93%9D&desc=Token%20technologies%3A%20from%20session%20cookies%20to%20JWT%2C%20OAuth%2C%20API%20keys.%20History%20and%20ev', width: 1200, height: 630, alt: 'Token Technologies: History & Evolution — UnblockDevs Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Token Technologies: History & Evolution',
    description: 'Token technologies: from session cookies to JWT, OAuth, API keys. History and evolution of auth tokens.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/token-technologies-history-evolution' },

};

export default function TokenTechnologiesHistoryEvolution() {
  return <TokenTechnologiesHistoryEvolutionClient />;
}

