import type { Metadata } from 'next';
import BlogPostClient from './client';

export const metadata: Metadata = {
  title: 'How to Share Code with AI Safely — Step-by-Step Secure AI Coding Workflow | UnblockDevs',
  description:
    'Complete guide to sharing code with ChatGPT, Claude, Copilot, and Gemini without exposing secrets, API keys, or proprietary logic. Step-by-step workflow using code masking, AI templates, and safe restore.',
  keywords: [
    'how to share code with ai safely',
    'safe ai coding workflow',
    'mask code before chatgpt',
    'secure code review chatgpt',
    'hide api keys from ai coding assistant',
    'share code without exposing secrets',
    'ai code review best practices',
    'chatgpt safe code sharing',
    'mask variables before sending to ai',
    'how to use copilot chat safely',
    'developer ai security workflow',
    'code masking tool',
    'chatgpt coding without leaking secrets',
    'ai code assistant privacy',
    'secure developer ai workflow 2025',
  ],
  openGraph: {
    title: 'How to Share Code with AI Safely — Secure AI Coding Workflow | UnblockDevs',
    description: 'Step-by-step: mask secrets, use AI prompt templates, restore original names. Get full AI help without exposing a single credential or proprietary identifier.',
    type: 'article',
    publishedTime: '2026-04-13T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/how-to-share-code-with-ai-safely',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Share Code with AI Safely — Step-by-Step Secure Workflow',
    description: 'Mask → AI → Restore. Full guide to getting AI coding help without leaking a single secret.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/how-to-share-code-with-ai-safely' },
};

export default function HowToShareCodeWithAiSafelyPage() {
  return <BlogPostClient />;
}
