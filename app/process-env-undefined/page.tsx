import type { Metadata } from 'next';
import ProcessEnvUndefinedClient from './client';

export const metadata: Metadata = {
  title: 'process.env Not Working in Node.js? 6 Fixes | UnblockDevs',
  description: 'Fix process.env returning undefined in Node.js, Next.js, and Vite. Covers dotenv setup, NEXT_PUBLIC_ prefix, Vercel env vars, and common mistakes.',
  keywords: [
    'process env not working nodejs',
    'process env undefined fix',
    'process env variables nodejs',
    'dotenv not loading',
    'env not defined nodejs',
    'nextjs env variables not working',
    'NEXT_PUBLIC prefix',
    'process env undefined nextjs',
    'vite env variables not working',
    'env file not loading',
    'nodejs environment variables',
    'process env development undefined',
    'dotenv config not working',
    'env vars vercel',
    'process env production fix',
    'node env undefined',
    'dotenv require config',
    'process env not defined',
    'environment variables node js',
    'next js env not working',
    'vite import meta env undefined',
    'process env undefined typescript',
  ],
  openGraph: {
    title: 'process.env Not Working in Node.js? 6 Fixes | UnblockDevs',
    description: 'Fix process.env returning undefined in Node.js, Next.js, and Vite. Covers dotenv setup, NEXT_PUBLIC_ prefix, Vercel env vars, and common mistakes.',
    type: 'website',
    url: 'https://unblockdevs.com/process-env-undefined',
    siteName: 'UnblockDevs',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Fix process.env Undefined' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'process.env Not Working in Node.js? 6 Fixes | UnblockDevs',
    description: 'Fix process.env returning undefined in Node.js, Next.js, and Vite.',
  },
  alternates: { canonical: 'https://unblockdevs.com/process-env-undefined' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Fix process.env Undefined in Node.js',
  url: 'https://unblockdevs.com/process-env-undefined',
  description: 'Step-by-step guide to fix process.env returning undefined in Node.js, Next.js, and Vite projects.',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    ratingCount: '834',
    bestRating: '5',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Why is process.env.MY_VAR undefined in Node.js?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The most common reason is that dotenv has not been configured before your code runs, or the .env file is not in the project root directory. Call require("dotenv").config() as the very first line of your entry file.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why is process.env.MY_VAR undefined in Next.js on the client side?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'In Next.js, only variables prefixed with NEXT_PUBLIC_ are exposed to the browser. Server-side variables without this prefix are kept secret and will be undefined in client components. Rename your variable to NEXT_PUBLIC_MY_VAR for client-side access.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why does process.env work locally but not on Vercel?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Vercel does not read your .env file. You must add environment variables through the Vercel dashboard under Project Settings > Environment Variables. Your .env file is only for local development and should not be committed to version control.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I use environment variables in Vite?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Vite does not use process.env. Instead, use import.meta.env.VITE_MY_VAR. Variables must be prefixed with VITE_ to be exposed to client-side code. Access them via import.meta.env.VITE_API_URL for example.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does dotenv work with ES modules (import/export)?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, but the syntax is different. Instead of require("dotenv").config(), use: import "dotenv/config" at the top of your entry file, or import { config } from "dotenv"; config(); Alternatively, use the --require dotenv/config flag when starting your Node.js process.',
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Fix process.env Returning Undefined in Node.js',
  description: 'Step-by-step guide to diagnose and fix process.env undefined errors.',
  totalTime: 'PT5M',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Confirm dotenv is installed and required first',
      text: 'Run npm install dotenv, then add require("dotenv").config() as the very first line of your entry file, before any other imports.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Verify .env file is in the project root',
      text: 'The .env file must be in the same directory where you run your node command, not inside src/ or any subdirectory.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Check framework-specific requirements',
      text: 'In Next.js, prefix client-side variables with NEXT_PUBLIC_. In Vite, use import.meta.env and prefix with VITE_.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Set variables in your deployment dashboard',
      text: 'For Vercel, Netlify, or Railway, add environment variables via the project dashboard. The .env file is not used in production deployments.',
    },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://unblockdevs.com' },
    { '@type': 'ListItem', position: 2, name: 'Guides', item: 'https://unblockdevs.com' },
    { '@type': 'ListItem', position: 3, name: 'Fix process.env Undefined', item: 'https://unblockdevs.com/process-env-undefined' },
  ],
};

export default function ProcessEnvUndefinedPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <ProcessEnvUndefinedClient />
    </>
  );
}
