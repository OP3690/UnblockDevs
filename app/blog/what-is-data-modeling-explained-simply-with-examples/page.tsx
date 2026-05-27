import type { Metadata } from 'next';
import BlogPostClient from './client';

export const metadata: Metadata = {
  title: 'What Is Data Modeling? Explained Simply with Examples (Complete Guide)',
  description: 'What data modeling is. Conceptual, logical, physical models. ER diagrams, best practices. Beginner-friendly.',
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
    title: 'What Is Data Modeling? Explained Simply with Examples (Complete Guide)',
    description: 'Learn what data modeling is with simple examples. Understand conceptual, logical, and physical data models.',
    type: 'article',
    url: 'https://unblockdevs.com/blog/what-is-data-modeling-explained-simply-with-examples',
    images: [{ url: 'https://unblockdevs.com/api/og?title=What%20Is%20Data%20Modeling%3F%20Explained%20Simply%20with%20Examples%20%28Complete%20Guide%29&emoji=%F0%9F%A4%96&desc=Learn%20what%20data%20modeling%20is%20with%20simple%20examples', width: 1200, height: 630, alt: 'What Is Data Modeling? Explained Simply with Examples (Complete Guide) — UnblockDevs Blog' }],

  },
  alternates: {
    canonical: 'https://unblockdevs.com/blog/what-is-data-modeling-explained-simply-with-examples',
  },
};

export default function BlogPost() {
  return <BlogPostClient />;
}
