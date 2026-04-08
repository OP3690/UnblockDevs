import type { Metadata } from 'next';
import NotebooklmCheatSheetTipsClient from './client';

export const metadata: Metadata = {
  title: 'NotebookLM Cheat Sheet: Tips, Study Guide & Effective Usage | UnblockDevs',
  description: 'NotebookLM cheat sheet: tips, shortcuts, study guide features, generate checklists, best practices. Complete quick reference for power users.',
  keywords: [
    'notebooklm cheat sheet',
    'notebooklm tips',
    'notebooklm tricks',
    'notebooklm shortcuts',
    'notebooklm quick reference',
    'notebooklm best practices',
    'notebooklm guide',
    'notebooklm study guide features',
    'notebooklm effective usage guide',
    'notebooklm generate checklists',
    'notebooklm features',
    'notebooklm prompts',
    'google notebooklm cheat sheet',
    'notebooklm how to use effectively',
    'notebooklm audio overview',
    'notebooklm notebook guide'
  ],
  openGraph: {
    title: 'NotebookLM Cheat Sheet: Tips, Study Guide & Effective Usage | UnblockDevs',
    description: 'NotebookLM cheat sheet: tips, shortcuts, study guide features, generate checklists. Complete quick reference.',
    type: 'article',
    url: 'https://unblockdevs.com/blog/notebooklm-cheat-sheet-tips',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NotebookLM Cheat Sheet | UnblockDevs',
    description: 'Tips, study guide features, checklists, and quick reference for NotebookLM power users.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/notebooklm-cheat-sheet-tips' },
};

export default function NotebooklmCheatSheetTips() {
  return <NotebooklmCheatSheetTipsClient />;
}

