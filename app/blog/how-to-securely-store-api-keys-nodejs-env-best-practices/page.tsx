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
    'nodejs secret management',
    'env variables api key best practice',
    'dotenv api keys',
    'api key security nodejs',
    'secret management nodejs',
    'api key gitignore',
    'nodejs environment variables secrets',
    'secure api keys production',
  ],
  openGraph: {
    title: 'How to Securely Store API Keys in Node.js (2026) | UnblockDevs',
    description: 'Stop hardcoding API keys. Learn the secure way to store secrets in Node.js using .env files, environment variables, secret managers, and what never to do.',
    type: 'article',
    url: 'https://unblockdevs.com/blog/how-to-securely-store-api-keys-nodejs-env-best-practices',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Securely Store API Keys in Node.js (2026) | UnblockDevs',
    description: 'Stop hardcoding API keys. Learn the secure way to store secrets in Node.js using .env files, environment variables, secret managers, and what never to do.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/how-to-securely-store-api-keys-nodejs-env-best-practices' },
};

export default function HowToSecurelyStoreApiKeysNodejsPage() {
  return <HowToSecurelyStoreApiKeysNodejsClient />;
}
