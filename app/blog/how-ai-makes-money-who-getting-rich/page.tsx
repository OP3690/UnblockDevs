import type { Metadata } from 'next';
import BlogPostClient from './client';

export const metadata: Metadata = {
  title: "How AI Makes Money (And Who Is Getting Rich From It?) | UnblockDevs",
  description: "How does AI make money? AI startups, AI SaaS products, big tech profits, and how individuals can monetize AI. Honest guide with flow and examples.",
  keywords: [
    "how AI makes money",
    "who is getting rich from AI",
    "AI startups",
    "AI SaaS products",
    "big tech AI profits",
    "how to monetize AI",
    "AI business model",
    "AI revenue",
    "AI economy",
    "make money with AI",
  ],
  openGraph: {
    title: "How AI Makes Money (And Who Is Getting Rich From It?)",
    description: "AI startups, AI SaaS, big tech profits, and how individuals can monetize AI.",
    type: "article",    url: 'https://unblockdevs.com/blog/how-ai-makes-money-who-getting-rich',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],

  },
  alternates: {
    canonical: "https://unblockdevs.com/blog/how-ai-makes-money-who-getting-rich",
  },
};

export default function HowAIMakesMoneyBlog() {
  return <BlogPostClient />;
}
