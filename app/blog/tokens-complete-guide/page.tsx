import type { Metadata } from 'next';
import TokensCompleteGuideClient from './client';

export const metadata: Metadata = {
  title: 'Tokens Complete Guide: What, How, Why & When to Use Tokens | UnblockDevs',
  description: 'Complete guide to tokens: what are tokens, how they work, why they\'re used, and when to use them. Learn about JWT tokens, API keys, authentication tokens, and access tokens with examples.',
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
};

export default function TokensCompleteGuide() {
  return <TokensCompleteGuideClient />;
}

