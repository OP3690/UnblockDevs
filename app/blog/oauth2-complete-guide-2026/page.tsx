import type { Metadata } from 'next';
import OAuth2CompleteGuideClient from './client';

export const metadata: Metadata = {
  title: 'OAuth 2.0 Complete Guide 2026: Authorization Code, PKCE, Client Credentials Explained | UnblockDevs',
  description: 'Master OAuth 2.0 in 2026: what it is, all 4 grant types, full Authorization Code + PKCE flow with Node.js code, client credentials for APIs, token refresh, and how OAuth differs from JWT and API keys.',
  keywords: [
    'oauth 2.0 explained',
    'oauth 2.0 tutorial 2026',
    'oauth vs jwt',
    'authorization code flow pkce',
    'oauth2 nodejs',
    'oauth2 grant types',
    'client credentials oauth',
    'oauth2 access token refresh token',
    'sign in with google oauth',
    'oauth2 pkce example',
    'oauth2 vs api key',
    'oauth2 security 2026',
    'openid connect oauth',
    'oauth2 flow diagram',
    'delegated authorization oauth',
  ],
  openGraph: {
    title: 'OAuth 2.0 Complete Guide 2026: Every Grant Type Explained with Code',
    description: 'Authorization Code + PKCE, client credentials, token refresh — every OAuth 2.0 flow with Node.js implementation, security rules, and a clear decision chart.',
    type: 'article',
    publishedTime: '2026-05-15T16:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/oauth2-complete-guide-2026',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs — OAuth 2.0 Complete Guide 2026' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OAuth 2.0 Complete Guide 2026',
    description: 'All grant types, full PKCE flow, Node.js code, OAuth vs JWT vs API Keys — everything in one guide.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/oauth2-complete-guide-2026' },
};

export default function OAuth2CompleteGuidePage() {
  return <OAuth2CompleteGuideClient />;
}
