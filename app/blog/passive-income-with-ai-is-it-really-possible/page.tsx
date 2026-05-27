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
    type: "article",    url: 'https://unblockdevs.com/blog/passive-income-with-ai-is-it-really-possible',
    images: [{ url: 'https://unblockdevs.com/api/og?title=Passive%20Income%20with%20AI%3A%20Is%20It%20Really%20Possible%3F&emoji=%F0%9F%A4%96&desc=AI%20blog%20automation%2C%20YouTube%20automation%2C%20print-on-demand%2C%20affiliate%20marketing%2C', width: 1200, height: 630, alt: 'Passive Income with AI: Is It Really Possible? — UnblockDevs Blog' }],

  },
  alternates: {
    canonical: "https://unblockdevs.com/blog/passive-income-with-ai-is-it-really-possible",
  },
  robots: { index: false, follow: false },
};

export default function PassiveIncomeAIBlog() {
  return <BlogPostClient />;
}
