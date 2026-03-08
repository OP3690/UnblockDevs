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
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],

  },
  alternates: {
    canonical: "https://unblockdevs.com/blog/how-ai-works-simple-explanation-for-beginners",
  },
};

export default function HowAIWorksBlog() {
  return <BlogPostClient />;
}
