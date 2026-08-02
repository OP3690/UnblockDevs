import type { Metadata } from 'next';
import BlogPostClient from './client';

export const metadata: Metadata = {
  title: "Machine Learning vs Deep Learning vs AI Explained | UnblockDevs",
  description: "Understand the differences between AI, machine learning, and deep learning with clear definitions, a comparison table, and real-world use cases for each.",
  keywords: [
    "machine learning vs deep learning",
    "AI vs machine learning",
    "difference between AI and machine learning",
    "machine learning vs deep learning vs AI",
    "what is artificial intelligence",
    "what is machine learning",
    "what is deep learning",
    "when to use machine learning vs deep learning",
    "AI ML DL difference",
    "machine learning use cases",
    "deep learning use cases",
    "AI explained simply",
    "machine learning deep learning AI comparison",
  ],
  openGraph: {
    title: "Machine Learning vs Deep Learning vs AI: What's the Real Difference?",
    description: "AI, machine learning, and deep learning are not the same thing. This guide explains each with simple definitions, a visual comparison table, when to use which, and real-world use cases.",
    type: "article",    url: 'https://unblockdevs.com/blog/machine-learning-vs-deep-learning-vs-ai-difference',
    images: [{ url: 'https://unblockdevs.com/api/og?title=Machine%20Learning%20vs%20Deep%20Learning%20vs%20AI%3A%20What&emoji=%F0%9F%A4%96&desc=Simple%20definitions%2C%20comparison%20table%2C%20when%20to%20use%20each%2C%20and%20real-world%20use', width: 1200, height: 630, alt: 'Machine Learning vs Deep Learning vs AI: What — UnblockDevs Blog' }],

  },
  twitter: {
    card: 'summary_large_image',
    title: 'Machine Learning vs Deep Learning vs AI Explained',
    description: 'Simple definitions, a comparison table, when to use each approach, and real-world use cases for AI, machine learning, and deep learning.',
  },
  alternates: {
    canonical: "https://unblockdevs.com/blog/machine-learning-vs-deep-learning-vs-ai-difference",
  },
};

export default function MLvsDLvsAIBlog() {
  return <BlogPostClient />;
}
