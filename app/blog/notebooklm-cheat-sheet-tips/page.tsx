import type { Metadata } from 'next';
import NotebooklmCheatSheetTipsClient from './client';

export const metadata: Metadata = {
  title: 'NotebookLM Cheat Sheet: Tips, Tricks & Quick Reference | UnblockDevs',
  description: 'NotebookLM cheat sheet: tips, shortcuts, best practices. Quick reference for power users.',
  keywords: [
    'notebooklm cheat sheet',
    'notebooklm tips',
    'notebooklm tricks',
    'notebooklm shortcuts',
    'notebooklm quick reference',
    'notebooklm best practices',
    'notebooklm guide'
  ],
  alternates: { canonical: 'https://unblockdevs.com/blog/notebooklm-cheat-sheet-tips' },

};

export default function NotebooklmCheatSheetTips() {
  return <NotebooklmCheatSheetTipsClient />;
}

