import type { Metadata } from 'next';
import BlogPostClient from './client';

export const metadata: Metadata = {
  title: 'What Is Feature Engineering and Why It Is Important in Machine Learning (Complete Guide)',
  description: 'Learn what feature engineering is in machine learning. Understand feature selection, feature transformation, feature creation, and why it\'s crucial for model performance. Complete guide with examples.',
  keywords: [
    'feature engineering',
    'what is feature engineering',
    'feature engineering machine learning',
    'feature selection',
    'feature transformation',
    'feature creation',
    'machine learning features',
    'feature engineering importance',
    'feature engineering examples',
    'feature engineering techniques',
    'ml feature engineering',
    'data preprocessing machine learning'
  ],
  openGraph: {
    title: 'What Is Feature Engineering and Why It Is Important in Machine Learning (Complete Guide)',
    description: 'Learn what feature engineering is in machine learning. Understand feature selection, transformation, and why it\'s crucial for model performance.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://unblockdevs.com/blog/what-is-feature-engineering-and-why-it-is-important-in-machine-learning',
  },
};

export default function BlogPost() {
  return <BlogPostClient />;
}
