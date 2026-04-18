import type { Metadata } from 'next';
import ProcessEnvUndefinedDockerClient from './client';

export const metadata: Metadata = {
  title: 'Why process.env Variables Are Undefined in Docker (And How to Fix It) | UnblockDevs',
  description: 'Your Node.js app works locally but process.env is undefined in Docker. Here\'s exactly why and 4 ways to fix it — ARG vs ENV, docker-compose, secrets.',
  keywords: [
    'process.env undefined docker',
    'docker environment variables nodejs',
    'dockerfile ENV ARG difference',
    'docker-compose env_file',
    'pass env vars docker container',
    'node.js docker environment variables fix',
    'docker secrets nodejs',
    'docker run env-file',
    'dockerfile ENV directive',
    'docker-compose environment section',
    'ARG vs ENV dockerfile',
    'docker nodejs app env vars',
    'env file docker container',
    'docker build args secrets'
  ],
  openGraph: {
    title: 'Why process.env Variables Are Undefined in Docker (And How to Fix It) | UnblockDevs',
    description: 'Your Node.js app works locally but process.env is undefined in Docker. Here\'s exactly why and 4 ways to fix it.',
    type: 'article',
    url: 'https://unblockdevs.com/blog/process-env-undefined-docker-nodejs-fix',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Why process.env Variables Are Undefined in Docker (And How to Fix It) | UnblockDevs',
    description: 'Your Node.js app works locally but process.env is undefined in Docker. Here\'s exactly why and 4 ways to fix it.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/process-env-undefined-docker-nodejs-fix' },
};

export default function ProcessEnvUndefinedDockerPage() {
  return <ProcessEnvUndefinedDockerClient />;
}
