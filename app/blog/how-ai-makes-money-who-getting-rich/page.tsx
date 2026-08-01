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
    images: [{ url: 'https://unblockdevs.com/api/og?title=How%20AI%20Makes%20Money%20%28And%20Who%20Is%20Getting%20Rich%20From%20It%3F%29&emoji=%F0%9F%A4%96&desc=AI%20startups%2C%20AI%20SaaS%2C%20big%20tech%20profits%2C%20and%20how%20individuals%20can%20monetize%20AI', width: 1200, height: 630, alt: 'How AI Makes Money (And Who Is Getting Rich From It?) — UnblockDevs Blog' }],

  },
  twitter: {
    card: 'summary_large_image',
    title: 'How AI Makes Money (And Who Is Getting Rich From It?)',
    description: 'AI startups, AI SaaS, big tech profits, and how individuals can monetize AI.',
  },
  alternates: {
    canonical: "https://unblockdevs.com/blog/how-ai-makes-money-who-getting-rich",
  },
  robots: { index: false, follow: false },
};

export default function HowAIMakesMoneyBlog() {
  return <BlogPostClient />;
}
