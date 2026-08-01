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
    type: "article",    url: 'https://unblockdevs.com/blog/will-ai-take-over-world-movies-vs-reality',
    images: [{ url: 'https://unblockdevs.com/api/og?title=Will%20AI%20Take%20Over%20the%20World%3F%20Movies%20vs%20Reality&emoji=%F0%9F%A4%96&desc=Hollywood%20myths%20vs%20real%20AI%20capabilities%2C%20what%20AI%20can', width: 1200, height: 630, alt: 'Will AI Take Over the World? Movies vs Reality — UnblockDevs Blog' }],

  },
  twitter: {
    card: 'summary_large_image',
    title: 'Will AI Take Over the World? Movies vs Reality',
    description: 'Hollywood myths vs real AI capabilities, what AI can',
  },
  alternates: {
    canonical: "https://unblockdevs.com/blog/will-ai-take-over-world-movies-vs-reality",
  },
};

export default function WillAITakeOverWorldBlog() {
  return <BlogPostClient />;
}
