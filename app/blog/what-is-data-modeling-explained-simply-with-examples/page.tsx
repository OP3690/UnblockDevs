import type { Metadata } from 'next';
import BlogPostClient from './client';

export const metadata: Metadata = {
  title: 'What Is Data Modeling? Explained Simply with Examples (Complete Guide)',
  description: 'Learn what data modeling is with simple examples. Understand conceptual, logical, and physical data models, entity-relationship diagrams, and data modeling best practices. Beginner-friendly guide.',
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
  },
  alternates: {
    canonical: 'https://unblockdevs.com/blog/what-is-data-modeling-explained-simply-with-examples',
  },
};

export default function BlogPost() {
  return <BlogPostClient />;
}
