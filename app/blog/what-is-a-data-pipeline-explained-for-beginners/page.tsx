import type { Metadata } from 'next';
import BlogPostClient from './client';

export const metadata: Metadata = {
  title: 'What Is a Data Pipeline? Explained for Beginners (Complete Guide)',
  description: 'Learn what a data pipeline is with simple examples. Understand ETL, data processing, data flow, and how data pipelines work in real-world applications. Beginner-friendly guide with visualizations.',
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
    'data pipeline best practices'
  ],
  openGraph: {
    title: 'What Is a Data Pipeline? Explained for Beginners (Complete Guide)',
    description: 'Learn what a data pipeline is with simple examples. Understand ETL, data processing, and how data pipelines work.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://unblockdevs.com/blog/what-is-a-data-pipeline-explained-for-beginners',
  },
};

export default function BlogPost() {
  return <BlogPostClient />;
}
