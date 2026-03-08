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
    url: 'https://unblockdevs.com/blog/mysql-25-most-used-queries',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/mysql-25-most-used-queries' },
};

export default function Mysql25MostUsedQueries() {
  return <Mysql25MostUsedQueriesClient />;
}

