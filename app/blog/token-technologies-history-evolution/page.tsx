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
  alternates: { canonical: 'https://unblockdevs.com/blog/token-technologies-history-evolution' },

};

export default function TokenTechnologiesHistoryEvolution() {
  return <TokenTechnologiesHistoryEvolutionClient />;
}

