import type { Metadata } from 'next';
import BlogPostClient from './client';

export const metadata: Metadata = {
  title: "Will AI Take Over the World? Movies vs Reality | UnblockDevs",
  description: "Will AI take over the world? Hollywood myths vs real AI capabilities, what AI actually can't do, and expert opinions. Honest guide with comparison table.",
  keywords: [
    "will AI take over the world",
    "AI movies vs reality",
    "Hollywood AI myths",
    "real AI capabilities",
    "what AI can't do",
    "AI expert opinions",
    "AI takeover",
    "AI future reality",
    "AI limitations",
    "AI myths",
  ],
  openGraph: {
    title: "Will AI Take Over the World? Movies vs Reality",
    description: "Hollywood myths vs real AI capabilities, what AI can't do, and expert opinions.",
    type: "article",
  },
  alternates: {
    canonical: "https://unblockdevs.com/blog/will-ai-take-over-world-movies-vs-reality",
  },
};

export default function WillAITakeOverWorldBlog() {
  return <BlogPostClient />;
}
