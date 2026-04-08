import type { Metadata } from 'next';
import WhyProcessEnvIsUndefinedNodejsAndHowToFixItClient from './client';

export const metadata: Metadata = {
  title: 'Why process.env Is Undefined in Node.js – Fix | UnblockDevs',
  description: 'Why process.env is undefined in Node.js and how to fix. dotenv, .env, troubleshooting.',
  keywords: [
    'process.env undefined nodejs',
    'fix process.env undefined',
    'nodejs environment variables',
    'process.env not working',
    'dotenv undefined',
    'env variables nodejs',
    'process.env undefined fix',
    'nodejs env variables',
    'environment variables undefined',
    'fix env variables nodejs',
    'process.env access',
    'nodejs dotenv',
    'env file nodejs',
    'process.env configuration',
    'nodejs environment variables setup',
    'node.js process.env undefined when environment variable not set',
    'node.js process.env values are strings or undefined',
    'node.js process.env values are strings or undefined documentation',
    'typescript process.env type string | undefined node.js',
    'typescript process.env string undefined type',
    'process.env returns undefined typescript',
    'node process env string or undefined'
  ],
  openGraph: {
    title: 'Why process.env Is Undefined in Node.js – Fix | UnblockDevs',
    description: 'Why process.env undefined in Node.js. dotenv, .env, fix and troubleshoot.',
    type: 'article',
    url: 'https://unblockdevs.com/blog/why-process-env-is-undefined-nodejs-and-how-to-fix-it',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],

  },
  twitter: {
    card: 'summary_large_image',
    title: 'Why process.env Is Undefined in Node.js – Fix | UnblockDevs',
    description: 'Why process.env undefined in Node.js. dotenv, .env, fix and troubleshoot.',
  },  alternates: { canonical: 'https://unblockdevs.com/blog/why-process-env-is-undefined-nodejs-and-how-to-fix-it' },

};

export default function WhyProcessEnvIsUndefinedNodejsAndHowToFixItPage() {
  return <WhyProcessEnvIsUndefinedNodejsAndHowToFixItClient />;
}
