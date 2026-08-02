import type { Metadata } from 'next';
import HowToSecurelyStoreApiKeysNodejsClient from './client';

export const metadata: Metadata = {
  title: 'How to Securely Store API Keys in Node.js (2026) | UnblockDevs',
  description: 'Stop hardcoding API keys. Learn the secure way to store secrets in Node.js using .env files, environment variables, secret managers, and what never to do.',
  keywords: [
    'store api keys nodejs securely',
    'api keys env variables',
    'never hardcode api keys',
    'process.env api keys',
    'nextjs api key security',
    'NEXT_PUBLIC api key danger',
    'api key leaked github',
    'dotenv api keys',
    'env variables api key best practice',
    'api key gitignore',
    'api key security nodejs',
    'how to store api keys safely nodejs',
    'nodejs secret management best practices',
    'what not to do with api keys',
  ],
  openGraph: {
    title: 'How to Securely Store API Keys in Node.js (2026): Best Practices Guide',
    description: 'Hardcoding API keys is how credentials get leaked on GitHub. This guide covers .env files, process.env patterns, NEXT_PUBLIC pitfalls, secret managers, and what you must never do.',
    type: 'article',
    publishedTime: '2026-03-10T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/how-to-securely-store-api-keys-nodejs-env-best-practices',
    images: [{ url: 'https://unblockdevs.com/api/og?title=How%20to%20Securely%20Store%20API%20Keys%20in%20Node.js%20%282026%29&emoji=%E2%9A%A1&desc=Stop%20hardcoding%20API%20keys', width: 1200, height: 630, alt: 'How to Securely Store API Keys in Node.js (2026) — UnblockDevs Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Securely Store API Keys in Node.js (2026)',
    description: 'Stop hardcoding API keys. Learn .env files, process.env, secret managers, and NEXT_PUBLIC pitfalls to keep your Node.js secrets safe.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/how-to-securely-store-api-keys-nodejs-env-best-practices' },
};

export default function HowToSecurelyStoreApiKeysNodejsPage() {
  return <HowToSecurelyStoreApiKeysNodejsClient />;
}
