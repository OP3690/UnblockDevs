import type { Metadata } from 'next';
import ValidateEnvironmentVariablesNodejsZodClient from './client';

export const metadata: Metadata = {
  title: 'How to Validate Environment Variables in Node.js with Zod | UnblockDevs',
  description: 'Stop silent crashes from missing env vars. Use Zod to validate process.env at startup — TypeScript types, defaults, clear error messages.',
  keywords: [
    'validate environment variables nodejs',
    'zod env validation',
    't3-env nextjs',
    'process.env validation typescript',
    'env variables missing crash',
    'zod process.env',
    'env validation at startup nodejs',
    'environment variables typescript types',
    'nodejs crash early env vars',
    'zod schema environment variables',
    '@t3-oss/env-nextjs',
    'nodejs missing env var error',
    'process.env undefined validation',
    'zod coerce number env',
    'validate dotenv variables nodejs',
  ],
  openGraph: {
    title: 'How to Validate Environment Variables in Node.js with Zod (Crash Early, Not Later)',
    description: 'Use Zod to validate process.env at startup with TypeScript types, defaults, and clear errors.',
    type: 'article',
    url: 'https://unblockdevs.com/blog/validate-environment-variables-nodejs-zod',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Validate Environment Variables in Node.js with Zod',
    description: 'Use Zod to validate process.env at startup with TypeScript types and clear errors.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/validate-environment-variables-nodejs-zod' },
};

export default function ValidateEnvironmentVariablesNodejsZodPage() {
  return <ValidateEnvironmentVariablesNodejsZodClient />;
}
