import type { Metadata } from 'next';
import BlogPostClient from './client';

export const metadata: Metadata = {
  title: "How AI Creates Art, Music, and Videos in Seconds | UnblockDevs",
  description: "How does AI create art, music, and videos? Generative AI basics, how AI learns patterns, ethical concerns, and the future of creativity. Simple explanation with flow and examples.",
  keywords: [
    "how AI creates art",
    "AI art generator",
    "AI music generator",
    "AI video generator",
    "generative AI basics",
    "how AI learns patterns",
    "AI creativity",
    "AI art ethics",
    "future of creativity AI",
    "AI generated art",
  ],
  openGraph: {
    title: "How AI Creates Art, Music, and Videos in Seconds",
    description: "Generative AI basics, how AI learns patterns, ethical concerns, and the future of creativity.",
    type: "article",    url: 'https://unblockdevs.com/blog/how-ai-creates-art-music-videos-in-seconds',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],

  },
  alternates: {
    canonical: "https://unblockdevs.com/blog/how-ai-creates-art-music-videos-in-seconds",
  },
  robots: { index: false, follow: false },
};

export default function HowAICreatesArtMusicVideosBlog() {
  return <BlogPostClient />;
}
