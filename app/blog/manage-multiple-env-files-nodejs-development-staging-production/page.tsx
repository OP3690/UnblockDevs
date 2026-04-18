import type { Metadata } from 'next';
import ManageMultipleEnvFilesClient from './client';

export const metadata: Metadata = {
  title: 'How to Manage Multiple .env Files for Dev, Staging & Production in Node.js | UnblockDevs',
  description: 'Master .env.development, .env.staging, .env.production, and .env.local — how to switch environments and keep secrets safe across your entire pipeline.',
  keywords: [
    'multiple env files nodejs',
    '.env.development .env.production nodejs',
    'dotenv-flow',
    'environment specific env files',
    '.env.local vs .env nextjs',
    'manage env files dev staging prod',
    'node_env dotenv',
    'env files gitignore',
    'dotenv nodejs environments',
    'next.js env file loading order',
    'nodejs staging environment',
    'env file best practices',
    'dotenv config path',
    'environment variables nodejs',
    'github actions env secrets'
  ],
  openGraph: {
    title: 'How to Manage Multiple .env Files for Dev, Staging & Production in Node.js | UnblockDevs',
    description: 'Master .env.development, .env.staging, .env.production, and .env.local — how to switch environments and keep secrets safe.',
    type: 'article',
    url: 'https://unblockdevs.com/blog/manage-multiple-env-files-nodejs-development-staging-production',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Manage Multiple .env Files for Dev, Staging & Production in Node.js | UnblockDevs',
    description: 'Master .env.development, .env.staging, .env.production, and .env.local — how to switch environments and keep secrets safe.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/manage-multiple-env-files-nodejs-development-staging-production' },
};

export default function ManageMultipleEnvFilesPage() {
  return <ManageMultipleEnvFilesClient />;
}
