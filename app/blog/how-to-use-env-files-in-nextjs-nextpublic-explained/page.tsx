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
    images: [{ url: 'https://unblockdevs.com/api/og?title=How%20to%20Use%20.env%20Files%20in%20Next.js%20%28NEXT_PUBLIC_%20and%20Server%20Variables%20Explained%29&emoji=%F0%9F%A4%96&desc=Complete%20guide%20to', width: 1200, height: 630, alt: 'How to Use .env Files in Next.js (NEXT_PUBLIC_ and Server Variables Explained) — UnblockDevs Blog' }],
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
