import type { Metadata } from 'next';
import TokenComparatorLandingClient from './client';

export const metadata: Metadata = {
  title: 'Free Token Comparator – Compare JWT, API Keys & Tokens | UnblockDevs',
  description: 'UnblockDevs Token Comparator: Compare JWT tokens, API keys, and authentication tokens character by character. Free online token comparator with visual diff highlighting. No signup, 100% private, works in your browser.',
  keywords: [
    'unblock devs token',
    'unblockdevs token',
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
  openGraph: {
    title: 'UnblockDevs Token Comparator – Compare JWT, API Keys & Tokens',
    description: 'UnblockDevs Token Comparator: Compare JWT tokens, API keys, and authentication tokens character by character. Free online token comparator with visual diff highlighting.',
    type: 'website',
    url: 'https://unblockdevs.com/token-comparator',
  },
  alternates: {
    canonical: 'https://unblockdevs.com/token-comparator',
  },
};

export default function TokenComparatorLanding() {
  return <TokenComparatorLandingClient />;
}

