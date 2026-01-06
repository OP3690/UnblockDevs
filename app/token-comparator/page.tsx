import type { Metadata } from 'next';
import TokenComparatorLandingClient from './client';

export const metadata: Metadata = {
  title: 'Token Comparator Online - Compare JWT, API Keys & Tokens | UnblockDevs',
  description: 'Free online token comparator to compare JWT tokens, API keys, and authentication tokens character by character. Beautiful mismatch highlighting, 100% client-side, no data stored. Perfect for debugging and verification.',
  keywords: [
    'token comparator',
    'jwt token comparator',
    'compare tokens',
    'api key comparator',
    'token diff',
    'compare jwt tokens',
    'authentication token comparator',
    'token verification',
    'token comparison tool',
    'compare api keys'
  ],
};

export default function TokenComparatorLanding() {
  return <TokenComparatorLandingClient />;
}

