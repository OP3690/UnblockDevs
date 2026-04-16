import type { Metadata } from 'next';
import DotenvNotLoadingClient from './client';

export const metadata: Metadata = {
  title: 'dotenv Not Loading Variables? 7 Fixes That Work | UnblockDevs',
  description: 'Fix dotenv not loading .env variables in Node.js. Covers file location, require order, .env.local vs .env, and TypeScript path issues.',
  keywords: [
    'dotenv not loading',
    'dotenv not working',
    'dotenv not loading env variables',
    'dotenv config not working',
    'dotenv undefined variables',
    'require dotenv config',
    'dotenv path option',
    'dotenv not working typescript',
    'dotenv esm module',
    'env file not found',
    'dotenv override option',
    'dotenv debug option',
    'process env undefined after dotenv',
    'dotenv variables not available',
    '.env not loading nodejs',
    'dotenv silent fail',
    'dotenv config path',
    'dotenv not reading file',
    'dotenv import config',
    'env variables undefined node',
    'dotenv esm import',
    'docker env dotenv override',
  ],
  openGraph: {
    title: 'dotenv Not Loading Variables? 7 Fixes That Work | UnblockDevs',
    description: 'Fix dotenv not loading .env variables in Node.js. Covers file location, require order, .env.local vs .env, and TypeScript path issues.',
    type: 'website',
    url: 'https://unblockdevs.com/dotenv-not-loading',
    siteName: 'UnblockDevs',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Fix dotenv Not Loading' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'dotenv Not Loading Variables? 7 Fixes That Work | UnblockDevs',
    description: 'Fix dotenv not loading .env variables in Node.js.',
  },
  alternates: { canonical: 'https://unblockdevs.com/dotenv-not-loading' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Fix dotenv Not Loading .env Variables',
  url: 'https://unblockdevs.com/dotenv-not-loading',
  description: 'Complete guide to diagnosing and fixing dotenv not loading .env variables in Node.js, TypeScript, and ES module projects.',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '756',
    bestRating: '5',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Why is dotenv not loading my .env file?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The most common causes are: require("dotenv").config() is not the first line of your entry file, the .env file is not in the project root directory, or there is a typo in the variable name. Run with dotenv debug mode: require("dotenv").config({ debug: true }) to see exactly what dotenv is doing.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I use dotenv with ES modules (import/export)?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'With ES modules, use "import dotenv/config" as your first import, or use "import { config } from dotenv" then call config(). Alternatively, start Node.js with the --require flag: node --require dotenv/config server.js',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I use dotenv with TypeScript?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Install dotenv with: npm install dotenv. In your TypeScript entry file, add import "dotenv/config" as the very first line. If you use ts-node, you can also use: node -r dotenv/config -r ts-node/register src/index.ts',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between .env and .env.local?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'In Next.js: .env is the base file committed to git, .env.local overrides it and is gitignored, .env.development and .env.production are environment-specific. .env.local has higher priority than .env. For plain Node.js with dotenv, only .env is used by default — you must specify other files with the path option.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why does dotenv work locally but not in Docker or CI?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'In Docker and CI systems, environment variables are usually injected directly by the system — and by default dotenv will not override existing system variables. Use dotenv.config({ override: true }) to force dotenv to overwrite system-provided variables with your .env file values.',
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Fix dotenv Not Loading .env Variables',
  description: 'Diagnose and fix dotenv silently failing to load environment variables.',
  totalTime: 'PT5M',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Move require("dotenv").config() to line 1',
      text: 'The dotenv config call must be the very first line of your entry file, before any other imports. In ES modules, use import "dotenv/config" as the first import.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Confirm .env is in the project root',
      text: 'The .env file must be in the directory from which you run node — typically the project root alongside package.json. If it is elsewhere, use the path option.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Enable debug mode to diagnose silently',
      text: 'Run require("dotenv").config({ debug: true }) to have dotenv print exactly which file it is trying to open and whether it succeeded.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Set override: true in Docker/CI environments',
      text: 'In CI or Docker, system environment variables take precedence. Use dotenv.config({ override: true }) to force your .env values.',
    },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://unblockdevs.com' },
    { '@type': 'ListItem', position: 2, name: 'Guides', item: 'https://unblockdevs.com' },
    { '@type': 'ListItem', position: 3, name: 'Fix dotenv Not Loading', item: 'https://unblockdevs.com/dotenv-not-loading' },
  ],
};

export default function DotenvNotLoadingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <DotenvNotLoadingClient />
    </>
  );
}
