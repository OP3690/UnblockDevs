import type { Metadata } from 'next';
import BlogPostClient from './client';

export const metadata: Metadata = {
  title: "Machine Learning vs Deep Learning vs AI: What's the Difference? | UnblockDevs",
  description: "Understand the difference between AI, machine learning, and deep learning. Simple definitions, visual comparison table, when to use each, and real-world use cases. Complete guide with examples.",
  keywords: [
    "machine learning vs deep learning",
    "AI vs machine learning",
    "difference between AI and machine learning",
    "machine learning vs deep learning vs AI",
    "what is artificial intelligence",
    "what is machine learning",
    "what is deep learning",
    "when to use machine learning",
    "when to use deep learning",
    "AI ML DL difference",
    "machine learning use cases",
    "deep learning use cases",
    "AI explained",
  ],
  openGraph: {
    title: "Machine Learning vs Deep Learning vs AI: What's the Difference?",
    description: "Simple definitions, comparison table, when to use each, and real-world use cases for AI, ML, and DL.",
    type: "article",
  },
  alternates: {
    canonical: "https://unblockdevs.com/blog/machine-learning-vs-deep-learning-vs-ai-difference",
  },
};

export default function MLvsDLvsAIBlog() {
  return <BlogPostClient />;
}
