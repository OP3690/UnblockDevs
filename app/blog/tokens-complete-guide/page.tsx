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
  openGraph: {
    title: 'Tokens Guide: What, How, When to Use',
    description: 'Tokens: what they are, how they work, when to use',
    type: 'article',
    url: 'https://unblockdevs.com/blog/tokens-complete-guide',
    images: [{ url: 'https://unblockdevs.com/api/og?title=Tokens%20Guide%3A%20What%2C%20How%2C%20When%20to%20Use&emoji=%F0%9F%94%90&desc=Tokens%3A%20what%20they%20are%2C%20how%20they%20work%2C%20when%20to%20use', width: 1200, height: 630, alt: 'Tokens Guide: What, How, When to Use — UnblockDevs Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tokens Guide: What, How, When to Use',
    description: 'Tokens: what they are, how they work, when to use',
    images: ['https://unblockdevs.com/api/og?title=Tokens%20Guide%3A%20What%2C%20How%2C%20When%20to%20Use&emoji=%F0%9F%94%90&desc=Tokens%3A%20what%20they%20are%2C%20how%20they%20work%2C%20when%20to%20use'],
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/tokens-complete-guide' },

};

export default function TokensCompleteGuide() {
  return <TokensCompleteGuideClient />;
}

