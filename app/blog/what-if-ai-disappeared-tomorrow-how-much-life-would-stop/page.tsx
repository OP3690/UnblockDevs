import type { Metadata } from 'next';
import BlogPostClient from './client';

export const metadata: Metadata = {
  title: "What If AI Disappeared Tomorrow? | UnblockDevs",
  description: "What if AI disappeared? AI in Google search, social media feeds, banking & payments, maps & ride apps. How much of your life would stop? Honest guide with flow and examples.",
  keywords: [
    "what if AI disappeared",
    "AI in daily life",
    "AI in Google search",
    "AI in social media",
    "AI in banking",
    "AI in maps",
    "AI in ride apps",
    "how much life depends on AI",
    "AI dependency",
    "life without AI",
  ],
  openGraph: {
    title: "What If AI Disappeared Tomorrow? | UnblockDevs",
    description: "AI in search, social media, banking, maps & ride apps. How much would stop without AI?",
    type: "article",    url: 'https://unblockdevs.com/blog/what-if-ai-disappeared-tomorrow-how-much-life-would-stop',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],

  },
  alternates: {
    canonical: "https://unblockdevs.com/blog/what-if-ai-disappeared-tomorrow-how-much-life-would-stop",
  },
};

export default function WhatIfAIDisappearedBlog() {
  return <BlogPostClient />;
}
