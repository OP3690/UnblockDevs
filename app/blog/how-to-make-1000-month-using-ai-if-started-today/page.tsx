import type { Metadata } from 'next';
import BlogPostClient from './client';

export const metadata: Metadata = {
  title: "How I Would Make $1,000/Month Using AI (If I Started Today) | UnblockDevs",
  description: "Step-by-step plan to make $1,000/month with AI: pick niche, use AI to produce X, monetize through Y, plus timeline breakdown. Realistic plan with flow.",
  keywords: [
    "make $1000 month AI",
    "make 1000 month with AI",
    "AI income 1000",
    "AI side income plan",
    "AI monetization plan",
    "how to make money AI step by step",
    "AI niche monetization",
    "AI income timeline",
  ],
  openGraph: {
    title: "How I Would Make $1,000/Month Using AI (If I Started Today)",
    description: "Pick niche, use AI to produce X, monetize through Y, timeline breakdown. Realistic plan.",
    type: "article",
  },
  alternates: {
    canonical: "https://unblockdevs.com/blog/how-to-make-1000-month-using-ai-if-started-today",
  },
};

export default function HowToMake1000MonthAIBlog() {
  return <BlogPostClient />;
}
