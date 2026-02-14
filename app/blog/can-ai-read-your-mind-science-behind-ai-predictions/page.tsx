import type { Metadata } from 'next';
import BlogPostClient from './client';

export const metadata: Metadata = {
  title: "Can AI Read Your Mind? The Science Behind AI Predictions | UnblockDevs",
  description: "Can AI read your mind? Pattern recognition, data analysis, behavioral prediction, and why it feels magical but isn't. Science-based explanation with flow and examples.",
  keywords: [
    "can AI read your mind",
    "AI predictions science",
    "pattern recognition AI",
    "data analysis AI",
    "behavioral prediction",
    "why AI feels magical",
    "AI mind reading",
    "how AI predicts",
    "AI prediction explained",
    "AI pattern recognition",
  ],
  openGraph: {
    title: "Can AI Read Your Mind? The Science Behind AI Predictions",
    description: "Pattern recognition, data analysis, behavioral prediction, and why it feels magical but isn't.",
    type: "article",
  },
  alternates: {
    canonical: "https://unblockdevs.com/blog/can-ai-read-your-mind-science-behind-ai-predictions",
  },
};

export default function CanAIReadYourMindBlog() {
  return <BlogPostClient />;
}
