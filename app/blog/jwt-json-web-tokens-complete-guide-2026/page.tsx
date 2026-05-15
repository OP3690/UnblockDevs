import type { Metadata } from 'next';
import JwtCompleteGuideClient from './client';

export const metadata: Metadata = {
  title: 'JWT (JSON Web Tokens) Complete Guide 2026: Authentication Explained from Scratch | UnblockDevs',
  description: 'Master JSON Web Tokens in 2026: JWT anatomy, sign & verify in Node.js, refresh token rotation, HS256 vs RS256, React auto-refresh hook, and the 5 JWT security traps that get apps compromised.',
  keywords: [
    'what is jwt',
    'json web token tutorial 2026',
    'jwt authentication javascript',
    'jwt decode',
    'jwt vs session cookies',
    'jwt nodejs',
    'jwt react',
    'jwt refresh token',
    'jwt security',
    'bearer token jwt',
    'hs256 vs rs256',
    'jwt claims explained',
    'jwt expiration',
    'stateless authentication 2026',
    'jwt sign verify node',
  ],
  openGraph: {
    title: 'JWT Complete Guide 2026: JSON Web Tokens from Scratch',
    description: 'JWT anatomy, full auth flow, Node.js sign/verify, React auto-refresh hook, RS256 vs HS256, refresh token rotation — everything in one guide.',
    type: 'article',
    publishedTime: '2026-05-15T13:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/jwt-json-web-tokens-complete-guide-2026',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs — JWT Complete Guide 2026' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JWT Complete Guide 2026: Auth from Scratch',
    description: 'Anatomy, auth flow, Node.js code, React hook, RS256 vs HS256, refresh token rotation — all in one guide.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/jwt-json-web-tokens-complete-guide-2026' },
};

export default function JwtCompleteGuidePage() {
  return <JwtCompleteGuideClient />;
}
