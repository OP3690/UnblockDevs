import type { Metadata } from 'next';
import CursorAiCodeEditorGuideClient from './client';

export const metadata: Metadata = {
  title: 'Cursor AI Code Editor: Complete Guide & Tips | UnblockDevs',
  description: 'Cursor AI code editor complete guide: shortcuts, features, prompts, and best practices. Learn how to use Cursor effectively to code faster with AI assistance.',
  keywords: [
    'cursor ai',
    'cursor code editor',
    'cursor ai tutorial',
    'how to use cursor',
    'cursor vs vs code',
    'ai code editor',
    'cursor best practices',
    'cursor ai features',
    'cursor ai shortcuts',
    'cursor ai guide',
    'cursor ai setup',
    'cursor ai composer',
    'cursor ai tab completion'
  ],
  openGraph: {
    title: 'Cursor AI Code Editor: Complete Guide with Shortcuts, Features & Best Practices',
    description: 'Everything you need to know about Cursor AI — shortcuts, features, prompt techniques, and how it compares to VS Code. A complete guide to coding faster with AI-powered assistance.',
    type: 'article',
    publishedTime: '2025-01-28T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/cursor-ai-code-editor-guide',
    images: [{ url: 'https://unblockdevs.com/api/og?title=Cursor%20AI%20Code%20Editor%3A%20Complete%20Guide%20%26%20Best%20Practices&emoji=%F0%9F%A4%96&desc=Complete%20guide%20to%20Cursor%20AI%20code%20editor%3A%20how%20to%20use%20it%2C%20what%20it%20does%2C%20when%20to', width: 1200, height: 630, alt: 'Cursor AI Code Editor: Complete Guide & Best Practices — UnblockDevs Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cursor AI Code Editor: Complete Guide & Tips',
    description: 'Cursor AI complete guide: shortcuts, features, best practices, and prompts for maximum productivity. Learn how to code faster with Cursor AI.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/cursor-ai-code-editor-guide' },
};

export default function CursorAiCodeEditorGuide() {
  return <CursorAiCodeEditorGuideClient />;
}

