import type { Metadata } from 'next';
import BlogPostClient from './client';

export const metadata: Metadata = {
  title: 'What Is a Data Pipeline? Explained for Beginners | UnblockDevs',
  description: 'Learn what a data pipeline is with simple examples. Understand ETL, data ingestion, transformation, and how data flows from source to destination in modern architectures.',
  keywords: [
    'what is data pipeline',
    'data pipeline explained',
    'etl pipeline',
    'data processing pipeline',
    'data pipeline architecture',
    'data pipeline tutorial',
    'data engineering pipeline',
    'data pipeline example',
    'data flow pipeline',
    'data pipeline for beginners',
    'how does a data pipeline work',
    'data pipeline definition',
    'etl vs data pipeline'
  ],
  openGraph: {
    title: "What Is a Data Pipeline? Beginner's Guide with Examples",
    description: 'Data pipelines power every modern data-driven product. Learn what they are, how ETL works, how data flows from source to destination, and what a beginner needs to know to get started.',
    type: 'article',
    publishedTime: '2026-02-07T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/what-is-a-data-pipeline-explained-for-beginners',
    images: [{ url: 'https://unblockdevs.com/api/og?title=What%20Is%20a%20Data%20Pipeline%3F%20Explained%20for%20Beginners%20%28Complete%20Guide%29&emoji=%F0%9F%A4%96&desc=Learn%20what%20a%20data%20pipeline%20is%20with%20simple%20examples', width: 1200, height: 630, alt: 'What Is a Data Pipeline? Explained for Beginners (Complete Guide) — UnblockDevs Blog' }],

  },
  twitter: {
    card: 'summary_large_image',
    title: 'What Is a Data Pipeline? Explained for Beginners',
    description: 'Learn what a data pipeline is, how ETL works, and how data flows from source to destination — explained with simple, real-world examples.',
  },
  alternates: {
    canonical: 'https://unblockdevs.com/blog/what-is-a-data-pipeline-explained-for-beginners',
  },
};

export default function BlogPost() {
  return <BlogPostClient />;
}
