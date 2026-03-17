import type { Metadata } from 'next';
import BlogPostClient from './client';

export const metadata: Metadata = {
  title: "Will AI Take Over the World? Movies vs Reality | UnblockDevs",
  description: "Will AI take over the world? Hollywood myths vs real AI capabilities, what AI actually can't do, and expert opinions. Honest guide with comparison and examples.",
  keywords: [
    "will AI take over the world",
    "AI takeover",
    "Hollywood AI myths",
    "real AI capabilities",
    "what AI can't do",
    "AI expert opinions",
    "AI vs movies",
    "AI reality vs fiction",
    "AI limitations",
    "AI future",
  ],
  openGraph: {
    title: "Will AI Take Over the World? Movies vs Reality",
    description: "Hollywood myths vs real AI capabilities, what AI can't do, and expert opinions.",
    type: "article",    url: 'https://unblockdevs.com/blog/will-ai-take-over-the-world-movies-vs-reality',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],

  },
  alternates: {
    canonical: "https://unblockdevs.com/blog/will-ai-take-over-the-world-movies-vs-reality",
  },
  robots: { index: false, follow: false },
};

export default function WillAITakeOverWorldBlog() {
  return <BlogPostClient />;
}
