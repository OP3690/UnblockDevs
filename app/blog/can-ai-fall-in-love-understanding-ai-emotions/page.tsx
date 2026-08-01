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
    type: "article",    url: 'https://unblockdevs.com/blog/can-ai-fall-in-love-understanding-ai-emotions',
    images: [{ url: 'https://unblockdevs.com/api/og?title=Can%20AI%20Fall%20in%20Love%3F%20Understanding%20AI%20Emotions&emoji=%F0%9F%A4%96&desc=Can%20AI%20feel%20emotions', width: 1200, height: 630, alt: 'Can AI Fall in Love? Understanding AI Emotions — UnblockDevs Blog' }],

  },
  twitter: {
    card: 'summary_large_image',
    title: 'Can AI Fall in Love? Understanding AI Emotions',
    description: 'Can AI feel emotions? Emotional AI, sentiment analysis, AI companions, and ethical concerns.',
  },
  alternates: {
    canonical: "https://unblockdevs.com/blog/can-ai-fall-in-love-understanding-ai-emotions",
  },
  robots: { index: false, follow: false },
};

export default function CanAIFallInLoveBlog() {
  return <BlogPostClient />;
}
