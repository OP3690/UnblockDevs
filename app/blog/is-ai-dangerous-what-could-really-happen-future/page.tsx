import type { Metadata } from 'next';
import BlogPostClient from './client';

export const metadata: Metadata = {
  title: "Is AI Dangerous? What Could Really Happen in the Future | UnblockDevs",
  description: "Is AI dangerous? AI risks (misinformation, deepfakes), AI myths vs reality, regulation and control, and should we be worried? Honest guide with examples.",
  keywords: [
    "is AI dangerous",
    "AI risks",
    "AI misinformation",
    "deepfakes AI",
    "AI myths vs reality",
    "AI regulation",
    "AI safety",
    "should we fear AI",
    "AI future risks",
    "AI control",
    "AI ethics",
    "AI dangers",
  ],
  openGraph: {
    title: "Is AI Dangerous? What Could Really Happen in the Future",
    description: "AI risks (misinformation, deepfakes), myths vs reality, regulation, and should we be worried?",
    type: "article",
  },
  alternates: {
    canonical: "https://unblockdevs.com/blog/is-ai-dangerous-what-could-really-happen-future",
  },
};

export default function IsAIDangerousBlog() {
  return <BlogPostClient />;
}
