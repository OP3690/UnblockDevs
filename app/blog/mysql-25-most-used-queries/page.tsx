import type { Metadata } from 'next';
import Mysql25MostUsedQueriesClient from './client';

export const metadata: Metadata = {
  title: 'MySQL 25 Most Used Queries: Complete Guide with Examples | UnblockDevs',
  description: 'Complete guide to MySQL 25 most used queries: SELECT, INSERT, UPDATE, DELETE, JOIN, WHERE, GROUP BY, ORDER BY, and more. Learn syntax, examples, and best practices for each query type.',
  keywords: [
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
};

export default function Mysql25MostUsedQueries() {
  return <Mysql25MostUsedQueriesClient />;
}

