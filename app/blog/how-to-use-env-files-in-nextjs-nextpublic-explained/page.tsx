import type { Metadata } from 'next';
import HowToUseEnvFilesInNextjsClient from './client';

export const metadata: Metadata = {
  title: 'How to Use .env Files in Next.js (NEXT_PUBLIC_ Explained) | UnblockDevs',
  description: 'Complete guide to .env files in Next.js — NEXT_PUBLIC_ prefix, .env.local, .env.production, server vs client env vars, TypeScript types.',
  keywords: [
    'next.js env variables',
    'NEXT_PUBLIC_ undefined',
    '.env.local next.js',
    'next.js environment variables client',
    'nextjs process.env client side',
    'next.js env files guide',
    'NEXT_PUBLIC prefix explained',
    'nextjs server vs client env vars',
    'next.js environment variables typescript',
    'nextjs env file hierarchy',
    'process.env nextjs client component',
    'NEXT_PUBLIC_ vs server variables',
    'next.js .env.development .env.production',
    'nextjs environment variables not working',
    'next.js env variables undefined fix',
  ],
  openGraph: {
    title: 'How to Use .env Files in Next.js (NEXT_PUBLIC_ and Server Variables Explained)',
    description: 'Complete guide to .env files in Next.js — NEXT_PUBLIC_ prefix, .env.local, server vs client env vars.',
    type: 'article',
    url: 'https://unblockdevs.com/blog/how-to-use-env-files-in-nextjs-nextpublic-explained',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Use .env Files in Next.js (NEXT_PUBLIC_ Explained)',
    description: 'Complete guide to .env files in Next.js — NEXT_PUBLIC_ prefix, .env.local, server vs client env vars.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/how-to-use-env-files-in-nextjs-nextpublic-explained' },
};

export default function HowToUseEnvFilesInNextjsPage() {
  return <HowToUseEnvFilesInNextjsClient />;
}
