import type { Metadata } from 'next';
import JwtCompleteGuideClient from './client';

export const metadata: Metadata = {
  title: 'JWT Complete Guide 2026: JSON Web Tokens Explained | UnblockDevs',
  description: 'Master JWT in 2026: anatomy, sign and verify in Node.js, refresh token rotation, HS256 vs RS256, React auto-refresh hook, and 5 security traps to avoid.',
  keywords: [
    'what is jwt',
    'json web token tutorial 2026',
    'jwt authentication javascript',
    'jwt decode',
    'jwt vs session cookies',
    'jwt nodejs',
    'jwt react',
    'jwt refresh token rotation',
    'jwt security traps',
    'bearer token jwt',
    'hs256 vs rs256',
    'how jwt authentication works',
    'jwt sign verify nodejs guide',
  ],
  openGraph: {
    title: 'JWT Complete Guide 2026: JSON Web Tokens from Scratch',
    description: 'JWT anatomy, the full authentication flow, Node.js sign/verify code, a React auto-refresh hook, RS256 vs HS256, refresh token rotation, and 5 security traps to avoid — all in one guide.',
    type: 'article',
    publishedTime: '2026-05-15T13:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/jwt-json-web-tokens-complete-guide-2026',
    images: [{ url: 'https://unblockdevs.com/api/og?title=JWT%20Complete%20Guide%202026%3A%20JSON%20Web%20Tokens%20from%20Scratch&emoji=%7B%7D&desc=JWT%20anatomy%2C%20full%20auth%20flow%2C%20Node', width: 1200, height: 630, alt: 'JWT Complete Guide 2026: JSON Web Tokens from Scratch — UnblockDevs Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JWT Complete Guide 2026: JSON Web Tokens Explained',
    description: 'Anatomy, auth flow, Node.js code, React hook, RS256 vs HS256, refresh token rotation, and 5 JWT security traps to avoid — all in one guide.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/jwt-json-web-tokens-complete-guide-2026' },
};

export default function JwtCompleteGuidePage() {
  return <JwtCompleteGuideClient />;
}
