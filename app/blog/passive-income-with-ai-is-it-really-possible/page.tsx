import type { Metadata } from 'next';
import BlogPostClient from './client';

export const metadata: Metadata = {
  title: "Passive Income with AI: Is It Really Possible? | UnblockDevs",
  description: "Passive income with AI: AI blog automation, AI YouTube automation, AI print-on-demand, AI affiliate marketing, and the truth about automation myths. Honest guide with flow and examples.",
  keywords: [
    "passive income AI",
    "AI blog automation",
    "AI YouTube automation",
    "AI print on demand",
    "AI affiliate marketing",
    "AI automation myths",
    "passive income automation",
  ],
  openGraph: {
    title: "Passive Income with AI: Is It Really Possible?",
    description: "AI blog automation, YouTube automation, print-on-demand, affiliate marketing, and the truth about automation myths.",
    type: "article",
  },
  alternates: {
    canonical: "https://unblockdevs.com/blog/passive-income-with-ai-is-it-really-possible",
  },
};

export default function PassiveIncomeAIBlog() {
  return <BlogPostClient />;
}
