import type { Metadata } from 'next';
import NotebooklmCompleteGuideClient from './client';

export const metadata: Metadata = {
  title: 'NotebookLM Complete Guide: How to Use Google\'s AI Notebook | UnblockDevs',
  description: 'Complete guide to NotebookLM: what it is, how to use it, best practices, tips, and tricks. Learn how to leverage Google\'s AI-powered notebook for research, writing, and knowledge management.',
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
};

export default function NotebooklmCompleteGuide() {
  return <NotebooklmCompleteGuideClient />;
}

