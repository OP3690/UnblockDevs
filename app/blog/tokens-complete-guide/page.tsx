import type { Metadata } from 'next';
import TokensCompleteGuideClient from './client';

export const metadata: Metadata = {
  title: 'Tokens Guide: What, How, When to Use | UnblockDevs',
  description: 'Tokens: what they are, how they work, when to use. JWT, API keys, auth tokens. With examples.',
  keywords: [
    'what are tokens',
    'how tokens work',
    'authentication tokens',
    'jwt tokens',
    'api tokens',
    'access tokens',
    'token authentication',
    'token explained',
    'when to use tokens',
    'why use tokens'
  ],
  alternates: { canonical: 'https://unblockdevs.com/blog/tokens-complete-guide' },

};

export default function TokensCompleteGuide() {
  return <TokensCompleteGuideClient />;
}

