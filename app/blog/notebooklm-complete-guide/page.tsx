import type { Metadata } from 'next';
import NotebooklmCompleteGuideClient from './client';

export const metadata: Metadata = {
  title: 'NotebookLM Complete Guide | UnblockDevs',
  description: 'NotebookLM guide: what it is, how to use, tips. Google\'s AI notebook for research and writing.',
  keywords: [
    'notebooklm',
    'notebooklm guide',
    'google notebooklm',
    'ai notebook',
    'notebooklm tutorial',
    'how to use notebooklm',
    'notebooklm best practices',
    'ai research tool'
  ],
  alternates: { canonical: 'https://unblockdevs.com/blog/notebooklm-complete-guide' },

};

export default function NotebooklmCompleteGuide() {
  return <NotebooklmCompleteGuideClient />;
}

