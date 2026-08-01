import type { Metadata } from 'next';
import Mysql25MostUsedQueriesClient from './client';

export const metadata: Metadata = {
  title: 'MySQL 25 Most Used Queries: Complete Guide with Examples | UnblockDevs',
  description: 'MySQL 25 most used queries: SELECT, INSERT, UPDATE, DELETE, JOIN, WHERE, GROUP BY. Syntax, examples, best practices.',
  keywords: [
    'unblock devs mysql',
    'unblockdevs mysql',
    'mysql queries',
    'mysql most used queries',
    'mysql select query',
    'mysql join queries',
    'mysql insert update delete',
    'mysql query examples',
    'mysql sql queries',
    'mysql database queries',
    'mysql query guide'
  ],
  openGraph: {
    title: 'MySQL 25 Most Used Queries: Complete Guide with Examples | UnblockDevs',
    description: 'MySQL 25 most used queries: SELECT, INSERT, UPDATE, DELETE, JOIN, WHERE, GROUP BY. Syntax, examples, best practices.',
    type: 'article',
    publishedTime: '2025-01-30T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/mysql-25-most-used-queries',
    images: [{ url: 'https://unblockdevs.com/api/og?title=MySQL%2025%20Most%20Used%20Queries%3A%20Complete%20Guide%20with%20Examples&emoji=%F0%9F%97%84%EF%B8%8F&desc=MySQL%2025%20most%20used%20queries%3A%20SELECT%2C%20INSERT%2C%20UPDATE%2C%20DELETE%2C%20JOIN%2C%20WHERE%2C%20GROUP', width: 1200, height: 630, alt: 'MySQL 25 Most Used Queries: Complete Guide with Examples — UnblockDevs Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MySQL 25 Most Used Queries: Complete Guide with Examples | UnblockDevs',
    description: 'MySQL 25 most used queries: SELECT, INSERT, UPDATE, DELETE, JOIN, WHERE, GROUP BY. Syntax, examples, best practices.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/mysql-25-most-used-queries' },
};

export default function Mysql25MostUsedQueries() {
  return <Mysql25MostUsedQueriesClient />;
}

