import type { Metadata } from 'next';
import BlogPostClient from './client';

export const metadata: Metadata = {
  title: "How AI Works: A Simple Explanation for Beginners (With Real Examples) | UnblockDevs",
  description: "Learn how AI works in simple terms. Understand what AI is, machine learning vs deep learning, how models are trained, and real-world examples: chatbots, recommendations, image recognition. Beginner-friendly guide with flow and examples.",
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
    type: "article",
  },
  alternates: {
    canonical: "https://unblockdevs.com/blog/how-ai-works-simple-explanation-for-beginners",
  },
};

export default function HowAIWorksBlog() {
  return <BlogPostClient />;
}
