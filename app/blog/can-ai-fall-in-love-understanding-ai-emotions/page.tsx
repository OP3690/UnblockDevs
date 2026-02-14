import type { Metadata } from 'next';
import BlogPostClient from './client';

export const metadata: Metadata = {
  title: "Can AI Fall in Love? Understanding AI Emotions | UnblockDevs",
  description: "Can AI feel emotions? Emotional AI and sentiment analysis, AI companions, and ethical concerns. Honest guide with flow and examples.",
  keywords: [
    "can AI fall in love",
    "can AI feel emotions",
    "AI emotions",
    "emotional AI",
    "sentiment analysis AI",
    "AI companions",
    "AI love",
    "AI ethics emotions",
    "understanding AI emotions",
    "AI emotional intelligence",
  ],
  openGraph: {
    title: "Can AI Fall in Love? Understanding AI Emotions",
    description: "Can AI feel emotions? Emotional AI, sentiment analysis, AI companions, and ethical concerns.",
    type: "article",
  },
  alternates: {
    canonical: "https://unblockdevs.com/blog/can-ai-fall-in-love-understanding-ai-emotions",
  },
};

export default function CanAIFallInLoveBlog() {
  return <BlogPostClient />;
}
