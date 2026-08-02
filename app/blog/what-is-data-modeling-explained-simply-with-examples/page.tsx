import type { Metadata } from 'next';
import BlogPostClient from './client';

export const metadata: Metadata = {
  title: 'What Is Data Modeling? Simply Explained | UnblockDevs',
  description: 'Understand data modeling: conceptual, logical, and physical models explained with ER diagram examples. Best practices for beginners. Complete guide.',
  keywords: [
    'data modeling',
    'what is data modeling',
    'data model',
    'data modeling explained',
    'conceptual data model',
    'logical data model',
    'physical data model',
    'entity relationship diagram',
    'data modeling examples',
    'database design',
    'data modeling tutorial',
    'data modeling best practices'
  ],
  openGraph: {
    title: 'What Is Data Modeling? Simply Explained with Examples | UnblockDevs',
    description: 'Understand data modeling: conceptual, logical, and physical models with ER diagram examples. Best practices for database design beginners. Complete guide.',
    type: 'article',
    publishedTime: '2026-02-08T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/what-is-data-modeling-explained-simply-with-examples',
    images: [{ url: 'https://unblockdevs.com/api/og?title=What%20Is%20Data%20Modeling%3F%20Explained%20Simply%20with%20Examples%20%28Complete%20Guide%29&emoji=%F0%9F%A4%96&desc=Learn%20what%20data%20modeling%20is%20with%20simple%20examples', width: 1200, height: 630, alt: 'What Is Data Modeling? Explained Simply with Examples (Complete Guide) — UnblockDevs Blog' }],

  },
  twitter: {
    card: 'summary_large_image',
    title: 'What Is Data Modeling? Simply Explained with Examples | UnblockDevs',
    description: 'Understand data modeling: conceptual, logical, and physical models with ER diagram examples. Best practices for database design beginners. Complete guide.',
  },
  alternates: {
    canonical: 'https://unblockdevs.com/blog/what-is-data-modeling-explained-simply-with-examples',
  },
};

export default function BlogPost() {
  return <BlogPostClient />;
}
