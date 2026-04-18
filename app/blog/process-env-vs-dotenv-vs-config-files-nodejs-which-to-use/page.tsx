import type { Metadata } from 'next';
import ProcessEnvVsDotenvVsConfigFilesNodejsClient from './client';

export const metadata: Metadata = {
  title: 'process.env vs dotenv vs config files in Node.js — Which to Use? | UnblockDevs',
  description: 'Compare process.env, dotenv, dotenv-flow, node-config, and convict for managing configuration in Node.js. Understand the tradeoffs and pick the right tool for your project.',
  keywords: [
    'process.env vs dotenv',
    'node-config vs dotenv',
    'convict nodejs',
    'nodejs config management',
    'dotenv vs config package',
    'environment variables vs config files nodejs',
    'nodejs configuration best practices',
    'dotenv alternatives',
    'dotenv-flow nodejs',
    'node-config npm package',
    'convict npm package',
    'nodejs environment configuration',
    'process.env nodejs',
    'configuration management nodejs',
    'dotenv vs process.env',
  ],
  openGraph: {
    title: 'process.env vs dotenv vs config files in Node.js — Which to Use? | UnblockDevs',
    description: 'Compare process.env, dotenv, dotenv-flow, node-config, and convict for managing configuration in Node.js. Understand tradeoffs and pick the right tool.',
    type: 'article',
    url: 'https://unblockdevs.com/blog/process-env-vs-dotenv-vs-config-files-nodejs-which-to-use',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'process.env vs dotenv vs config files in Node.js — Which to Use? | UnblockDevs',
    description: 'Compare process.env, dotenv, dotenv-flow, node-config, and convict for Node.js configuration management.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/process-env-vs-dotenv-vs-config-files-nodejs-which-to-use' },
};

export default function ProcessEnvVsDotenvVsConfigFilesNodejsPage() {
  return <ProcessEnvVsDotenvVsConfigFilesNodejsClient />;
}
