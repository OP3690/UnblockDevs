import type { Metadata } from 'next';
import NotebooklmCheatSheetTipsClient from './client';

export const metadata: Metadata = {
  title: 'NotebookLM Cheat Sheet: Tips, Tricks & Quick Reference | UnblockDevs',
  description: 'Complete NotebookLM cheat sheet with tips, tricks, shortcuts, and best practices. Quick reference guide for power users of Google\'s AI notebook tool.',
  keywords: [
    'notebooklm cheat sheet',
    'notebooklm tips',
    'notebooklm tricks',
    'notebooklm shortcuts',
    'notebooklm quick reference',
    'notebooklm best practices',
    'notebooklm guide'
  ],
};

export default function NotebooklmCheatSheetTips() {
  return <NotebooklmCheatSheetTipsClient />;
}

