import type { Metadata } from 'next';
import BlogPostClient from './client';

export const metadata: Metadata = {
  title: "How AI Creates Art, Music, and Videos in Seconds | UnblockDevs",
  description: "How does AI create art, music, and videos? Generative AI basics, how AI learns patterns, ethical concerns, and the future of creativity. Simple explanation with flow.",
  keywords: [
    "how AI creates art",
    "AI art generator",
    "AI music generator",
    "AI video generator",
    "generative AI basics",
    "how AI learns patterns",
    "AI creativity",
    "AI art ethical concerns",
    "future of AI creativity",
    "generative AI explained",
  ],
  openGraph: {
    title: "How AI Creates Art, Music, and Videos in Seconds",
    description: "Generative AI basics, how AI learns patterns, ethical concerns, and the future of creativity.",
    type: "article",
  },
  alternates: {
    canonical: "https://unblockdevs.com/blog/how-ai-creates-art-music-videos-seconds",
  },
};

export default function HowAICreatesArtMusicVideosBlog() {
  return <BlogPostClient />;
}
