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
    images: [{ url: 'https://unblockdevs.com/api/og?title=What%20If%20AI%20Disappeared%20Tomorrow%3F&emoji=%F0%9F%A4%96&desc=AI%20in%20search%2C%20social%20media%2C%20banking%2C%20maps%20%26%20ride%20apps', width: 1200, height: 630, alt: 'What If AI Disappeared Tomorrow? — UnblockDevs Blog' }],

  },
  alternates: {
    canonical: "https://unblockdevs.com/blog/what-if-ai-disappeared-tomorrow-how-much-life-would-stop",
  },
  robots: { index: false, follow: false },
};

export default function WhatIfAIDisappearedBlog() {
  return <BlogPostClient />;
}
