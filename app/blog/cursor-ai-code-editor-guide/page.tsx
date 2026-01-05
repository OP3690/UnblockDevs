import type { Metadata } from 'next';
import CursorAiCodeEditorGuideClient from './client';

export const metadata: Metadata = {
  title: 'Cursor AI Code Editor: Complete Guide & Best Practices | UnblockDevs',
  description: 'Complete guide to Cursor AI code editor: how to use it, what it does, when to use it, and best practices. Learn Cursor shortcuts, features, and prompt techniques for maximum productivity.',
  keywords: [
    'cursor ai',
    'cursor code editor',
    'cursor ai tutorial',
    'how to use cursor',
    'cursor vs vs code',
    'ai code editor',
    'cursor best practices'
  ],
};

export default function CursorAiCodeEditorGuide() {
  return <CursorAiCodeEditorGuideClient />;
}

