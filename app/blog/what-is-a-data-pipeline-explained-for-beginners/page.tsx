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
    images: [{ url: 'https://unblockdevs.com/api/og?title=What%20Is%20a%20Data%20Pipeline%3F%20Explained%20for%20Beginners%20%28Complete%20Guide%29&emoji=%F0%9F%A4%96&desc=Learn%20what%20a%20data%20pipeline%20is%20with%20simple%20examples', width: 1200, height: 630, alt: 'What Is a Data Pipeline? Explained for Beginners (Complete Guide) — UnblockDevs Blog' }],

  },
  alternates: {
    canonical: 'https://unblockdevs.com/blog/what-is-a-data-pipeline-explained-for-beginners',
  },
};

export default function BlogPost() {
  return <BlogPostClient />;
}
