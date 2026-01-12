import type { Metadata } from 'next';
import LogExplorerClient from './client';

export const metadata: Metadata = {
  title: 'Free Log Explorer Online - Analyze & Explore Logs Instantly | UnblockDevs',
  description: 'Explore and analyze log files instantly. Free online log explorer tool to parse, filter, search, and analyze structured and unstructured logs. No signup required.',
  keywords: [
    'log explorer',
    'log analyzer',
    'log parser',
    'analyze logs online',
    'log file explorer',
    'structured log analysis',
    'log viewer',
    'log search tool'
  ],
  openGraph: {
    title: 'Free Log Explorer Online - Analyze & Explore Logs Instantly',
    description: 'Explore and analyze log files instantly. Free online log explorer tool.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://unblockdevs.com/log-explorer',
  },
};

export default function LogExplorerPage() {
  return <LogExplorerClient />;
}
