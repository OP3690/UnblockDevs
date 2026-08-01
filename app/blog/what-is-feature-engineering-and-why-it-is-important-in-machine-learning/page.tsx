import type { Metadata } from 'next';
import BlogPostClient from './client';

export const metadata: Metadata = {
  title: 'Feature Engineering in Machine Learning | UnblockDevs',
  description: 'What feature engineering is in ML. Feature selection, transformation, creation. Why it matters for model performance.',
  keywords: [
    'feature engineering',
    'what is feature engineering',
    'feature engineering machine learning',
    'feature selection',
    'feature transformation',
    'feature creation',
    'machine learning features',
    'feature engineering importance',
    'feature engineering importance in machine learning',
    'feature engineering definition in machine learning',
    'feature engineering examples',
    'feature engineering techniques',
    'ml feature engineering',
    'data preprocessing machine learning',
    'why is feature engineering important',
    'feature engineering in ml'
  ],
  openGraph: {
    title: 'Feature Engineering in Machine Learning | UnblockDevs',
    description: 'Learn what feature engineering is in machine learning. Understand feature selection, transformation, and why it\'s crucial for model performance.',
    type: 'article',
    publishedTime: '2026-02-07T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/what-is-feature-engineering-and-why-it-is-important-in-machine-learning',
    images: [{ url: 'https://unblockdevs.com/api/og?title=Feature%20Engineering%20in%20Machine%20Learning&emoji=%F0%9F%9B%A0%EF%B8%8F&desc=Learn%20what%20feature%20engineering%20is%20in%20machine%20learning', width: 1200, height: 630, alt: 'Feature Engineering in Machine Learning — UnblockDevs Blog' }],

  },
  twitter: {
    card: 'summary_large_image',
    title: 'Feature Engineering in Machine Learning | UnblockDevs',
    description: "Learn what feature engineering is in machine learning. Understand feature selection, transformation, and why it's crucial for model performance.",
  },
  alternates: {
    canonical: 'https://unblockdevs.com/blog/what-is-feature-engineering-and-why-it-is-important-in-machine-learning',
  },
};

export default function BlogPost() {
  return <BlogPostClient />;
}
