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
    'cursor best practices',
    'cursor ai code editor official documentation',
    'cursor ai editor documentation',
    'cursor code editor documentation',
    'cursor ai features',
    'cursor ai official docs',
    'cursor ide',
    'cursor ai composer',
    'cursor ai shortcuts',
    'cursor ai guide',
    'cursor ai setup',
    'cursor ai tab completion',
    'cursor ai chat'
  ],
  openGraph: {
    title: 'Cursor AI Code Editor: Complete Guide & Best Practices | UnblockDevs',
    description: 'Complete guide to Cursor AI code editor: how to use it, what it does, when to use it, and best practices. Learn Cursor shortcuts, features, and prompt techniques for maximum productivity.',
    type: 'article',
    url: 'https://unblockdevs.com/blog/cursor-ai-code-editor-guide',
    images: [{ url: 'https://unblockdevs.com/api/og?title=Cursor%20AI%20Code%20Editor%3A%20Complete%20Guide%20%26%20Best%20Practices&emoji=%F0%9F%A4%96&desc=Complete%20guide%20to%20Cursor%20AI%20code%20editor%3A%20how%20to%20use%20it%2C%20what%20it%20does%2C%20when%20to', width: 1200, height: 630, alt: 'Cursor AI Code Editor: Complete Guide & Best Practices — UnblockDevs Blog' }],
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/cursor-ai-code-editor-guide' },
};

export default function CursorAiCodeEditorGuide() {
  return <CursorAiCodeEditorGuideClient />;
}

