import type { Metadata } from 'next';
import TokenTechnologiesHistoryEvolutionClient from './client';

export const metadata: Metadata = {
  title: 'Token Technologies: History & Evolution of Authentication Tokens | UnblockDevs',
  description: 'Complete history and evolution of token technologies: from session cookies to JWT, OAuth, API keys, and modern token standards. Learn about different token technologies and their development over time.',
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
};

export default function TokenTechnologiesHistoryEvolution() {
  return <TokenTechnologiesHistoryEvolutionClient />;
}

