import type { Metadata } from 'next';
import BlogPostClient from './client';

export const metadata: Metadata = {
  title: "Can AI Replace Human Jobs? The Truth No One Tells You | UnblockDevs",
  description: "Can AI replace human jobs? Jobs AI is replacing vs jobs AI cannot replace, future-proof skills, and what students should learn in 2026. Honest guide with examples and flow.",
  keywords: [
    "can AI replace human jobs",
    "AI replacing jobs",
    "jobs AI cannot replace",
    "future proof skills 2026",
    "what to learn in 2026",
    "AI and employment",
    "automation jobs",
    "AI job displacement",
    "skills for AI era",
    "students 2026",
    "AI vs human jobs",
    "jobs safe from AI",
  ],
  openGraph: {
    title: "Can AI Replace Human Jobs? The Truth No One Tells You",
    description: "Jobs AI is replacing vs cannot replace, future-proof skills, and what students should learn in 2026.",
    type: "article",
  },
  alternates: {
    canonical: "https://unblockdevs.com/blog/can-ai-replace-human-jobs-truth",
  },
};

export default function CanAIReplaceJobsBlog() {
  return <BlogPostClient />;
}
