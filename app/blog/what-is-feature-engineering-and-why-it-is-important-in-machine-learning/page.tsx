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
    'feature engineering examples',
    'feature engineering techniques',
    'ml feature engineering',
    'data preprocessing machine learning'
  ],
  openGraph: {
    title: 'Feature Engineering in Machine Learning | UnblockDevs',
    description: 'Learn what feature engineering is in machine learning. Understand feature selection, transformation, and why it\'s crucial for model performance.',
    type: 'article',
    url: 'https://unblockdevs.com/blog/what-is-feature-engineering-and-why-it-is-important-in-machine-learning',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],

  },
  alternates: {
    canonical: 'https://unblockdevs.com/blog/what-is-feature-engineering-and-why-it-is-important-in-machine-learning',
  },
};

export default function BlogPost() {
  return <BlogPostClient />;
}
