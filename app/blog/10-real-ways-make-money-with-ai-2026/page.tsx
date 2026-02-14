import type { Metadata } from 'next';
import BlogPostClient from './client';

export const metadata: Metadata = {
  title: "10 Real Ways to Make Money with AI in 2026 (Beginner to Advanced) | UnblockDevs",
  description: "10 real ways to make money with AI in 2026: AI content creation, automation services, selling AI prompts, YouTube automation, AI freelancing, building AI SaaS. Beginner to advanced with flow and examples.",
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
  },
  alternates: {
    canonical: "https://unblockdevs.com/blog/10-real-ways-make-money-with-ai-2026",
  },
};

export default function TenWaysMakeMoneyAIBlog() {
  return <BlogPostClient />;
}
