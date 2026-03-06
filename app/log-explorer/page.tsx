import type { Metadata } from 'next';
import LogExplorerClient from './client';

export const metadata: Metadata = {
  title: 'Log Explorer — Analyze Logs in Browser | UnblockDevs',
  description: 'Analyze, search, and visualize logs in the browser. JSON, Kubernetes, CloudWatch. Timeline, errors, JWT detection. 100% client-side.',
  keywords: [
    'log analyzer',
    'json log viewer',
    'log parser online',
    'debug log viewer',
    'analyze logs online',
    'cloudwatch log parser',
    'kubernetes log viewer',
    'log explorer',
    'structured log analysis',
  ],
  openGraph: {
    title: 'Log Explorer — Analyze Logs in Browser | UnblockDevs',
    description: 'Analyze, search, and visualize logs 100% client-side. Timeline, filters, error analyzer, JWT detection.',
    type: 'website',
    url: 'https://unblockdevs.com/log-explorer',
  },
  alternates: {
    canonical: 'https://unblockdevs.com/log-explorer',
  },
};

export default function LogExplorerPage() {
  return <LogExplorerClient />;
}
