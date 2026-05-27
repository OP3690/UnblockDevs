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
    type: "article",    url: 'https://unblockdevs.com/blog/can-ai-replace-human-jobs-truth',
    images: [{ url: 'https://unblockdevs.com/api/og?title=Can%20AI%20Replace%20Human%20Jobs%3F%20The%20Truth%20No%20One%20Tells%20You&emoji=%F0%9F%A4%96&desc=Jobs%20AI%20is%20replacing%20vs%20cannot%20replace%2C%20future-proof%20skills%2C%20and%20what%20students', width: 1200, height: 630, alt: 'Can AI Replace Human Jobs? The Truth No One Tells You — UnblockDevs Blog' }],

  },
  alternates: {
    canonical: "https://unblockdevs.com/blog/can-ai-replace-human-jobs-truth",
  },
};

export default function CanAIReplaceJobsBlog() {
  return <BlogPostClient />;
}
