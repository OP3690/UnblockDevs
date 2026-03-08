import type { Metadata } from 'next';
import BlogPostClient from './client';

export const metadata: Metadata = {
  title: "10 Ways to Make Money with AI in 2026 | UnblockDevs",
  description: "10 ways to make money with AI in 2026: content, automation, prompts, YouTube, freelancing, AI SaaS. Beginner to advanced.",
  keywords: [
    "make money with AI 2026",
    "AI content creation money",
    "AI automation services",
    "selling AI prompts",
    "AI YouTube automation",
    "AI freelancing",
    "AI SaaS tools",
    "AI side hustle",
    "AI income 2026",
    "how to make money with AI",
  ],
  openGraph: {
    title: "10 Real Ways to Make Money with AI in 2026 (Beginner to Advanced)",
    description: "AI content creation, automation, prompts, YouTube, freelancing, SaaS. Beginner to advanced.",
    type: "article",
    url: "https://unblockdevs.com/blog/10-real-ways-make-money-with-ai-2026",
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  alternates: {
    canonical: "https://unblockdevs.com/blog/10-real-ways-make-money-with-ai-2026",
  },
};

export default function TenWaysMakeMoneyAIBlog() {
  return <BlogPostClient />;
}
