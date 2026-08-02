import type { Metadata } from 'next';
import Mysql25MostUsedQueriesClient from './client';

export const metadata: Metadata = {
  title: 'MySQL 25 Most Used Queries with Examples | UnblockDevs',
  description: 'The 25 most used MySQL queries explained: SELECT, INSERT, UPDATE, DELETE, JOIN, WHERE, and GROUP BY with syntax, practical examples, and best practices.',
  keywords: [
    'mysql most used queries',
    'mysql queries guide',
    'mysql select query',
    'mysql join queries',
    'mysql insert update delete',
    'mysql query examples',
    'mysql WHERE GROUP BY',
    'mysql database queries',
    'mysql query best practices',
    'most common mysql queries',
    'mysql queries for beginners',
    'mysql SELECT JOIN guide',
  ],
  openGraph: {
    title: "MySQL's 25 Most Used Queries — SELECT, INSERT, JOIN, GROUP BY & More",
    description: 'The 25 MySQL queries every developer uses: SELECT, INSERT, UPDATE, DELETE, JOIN, WHERE, GROUP BY, subqueries, and more — each with syntax, real examples, and best practices.',
    type: 'article',
    publishedTime: '2025-01-30T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/mysql-25-most-used-queries',
    images: [{ url: 'https://unblockdevs.com/api/og?title=MySQL%2025%20Most%20Used%20Queries%3A%20Complete%20Guide%20with%20Examples&emoji=%F0%9F%97%84%EF%B8%8F&desc=MySQL%2025%20most%20used%20queries%3A%20SELECT%2C%20INSERT%2C%20UPDATE%2C%20DELETE%2C%20JOIN%2C%20WHERE%2C%20GROUP', width: 1200, height: 630, alt: 'MySQL 25 Most Used Queries: Complete Guide with Examples — UnblockDevs Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MySQL 25 Most Used Queries with Examples',
    description: 'The 25 most used MySQL queries explained with syntax and real examples: SELECT, INSERT, UPDATE, DELETE, JOIN, WHERE, GROUP BY, and subqueries.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/mysql-25-most-used-queries' },
};

export default function Mysql25MostUsedQueries() {
  return <Mysql25MostUsedQueriesClient />;
}

