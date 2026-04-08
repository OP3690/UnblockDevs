import type { Metadata } from 'next';
import BlogPostClient from './client';

export const metadata: Metadata = {
  title: 'What Is a Data Pipeline? Explained for Beginners (Complete Guide)',
  description: 'What a data pipeline is. ETL, data flow, how pipelines work. Beginner-friendly with examples.',
  keywords: [
    'data pipeline',
    'what is data pipeline',
    'data pipeline explained',
    'etl pipeline',
    'data processing pipeline',
    'data pipeline architecture',
    'data pipeline tutorial',
    'data engineering pipeline',
    'data pipeline example',
    'data flow pipeline',
    'data pipeline design',
    'data pipeline best practices',
    'data pipeline analytics definition',
    'analytics data pipeline',
    'data pipeline definition analytics'
  ],
  openGraph: {
    title: 'What Is a Data Pipeline? Explained for Beginners (Complete Guide)',
    description: 'Learn what a data pipeline is with simple examples. Understand ETL, data processing, and how data pipelines work.',
    type: 'article',
    url: 'https://unblockdevs.com/blog/what-is-a-data-pipeline-explained-for-beginners',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],

  },
  alternates: {
    canonical: 'https://unblockdevs.com/blog/what-is-a-data-pipeline-explained-for-beginners',
  },
};

export default function BlogPost() {
  return <BlogPostClient />;
}
