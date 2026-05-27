import type { Metadata } from 'next';
import BlogPostClient from './client';

export const metadata: Metadata = {
  title: "How AI Works: Simple Explanation for Beginners | UnblockDevs",
  description: "How AI works in simple terms. ML vs deep learning, how models are trained. Examples: chatbots, recommendations. Beginner-friendly.",
  keywords: [
    "how AI works",
    "what is artificial intelligence",
    "AI explained for beginners",
    "machine learning vs deep learning",
    "how AI models are trained",
    "AI real world examples",
    "chatbots how they work",
    "recommendation systems AI",
    "image recognition AI",
    "artificial intelligence simple explanation",
    "AI basics",
    "learn AI",
    "AI for beginners",
    "machine learning explained",
    "deep learning explained",
  ],
  openGraph: {
    title: "How AI Works: A Simple Explanation for Beginners (With Real Examples)",
    description: "Learn how AI works in simple terms. Machine learning vs deep learning, how models are trained, and real-world examples.",
    type: "article",    url: 'https://unblockdevs.com/blog/how-ai-works-simple-explanation-for-beginners',
    images: [{ url: 'https://unblockdevs.com/api/og?title=How%20AI%20Works%3A%20A%20Simple%20Explanation%20for%20Beginners%20%28With%20Real%20Examples%29&emoji=%F0%9F%A4%96&desc=Learn%20how%20AI%20works%20in%20simple%20terms', width: 1200, height: 630, alt: 'How AI Works: A Simple Explanation for Beginners (With Real Examples) — UnblockDevs Blog' }],

  },
  alternates: {
    canonical: "https://unblockdevs.com/blog/how-ai-works-simple-explanation-for-beginners",
  },
};

export default function HowAIWorksBlog() {
  return <BlogPostClient />;
}
