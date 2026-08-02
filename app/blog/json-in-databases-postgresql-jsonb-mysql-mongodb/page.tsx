import type { Metadata } from 'next';
import JsonInDatabasesClient from './client';

export const metadata: Metadata = {
  title: 'JSON in PostgreSQL JSONB, MySQL & MongoDB Guide | UnblockDevs',
  description: 'Compare JSON storage in PostgreSQL JSONB, MySQL JSON columns, and MongoDB. Learn querying, indexing, and when to use JSON columns vs normalized tables.',
  keywords: [
    'postgresql jsonb guide',
    'json in database',
    'postgresql jsonb vs json',
    'mysql json column',
    'mongodb json documents',
    'jsonb indexing postgresql',
    'store json in database',
    'postgresql jsonb query',
    'jsonb gin index',
    'mongodb vs postgresql json',
    'json database design',
    'when to use JSON columns vs tables',
    'postgresql jsonb operators',
  ],
  openGraph: {
    title: 'JSON in Databases 2026: PostgreSQL JSONB vs MySQL JSON vs MongoDB',
    description: 'When to use JSON columns, how to query and index JSONB, MySQL JSON operators, MongoDB document model — with SQL examples and a clear decision framework.',
    type: 'article',
    publishedTime: '2026-05-15T17:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/json-in-databases-postgresql-jsonb-mysql-mongodb',
    images: [{ url: 'https://unblockdevs.com/api/og?title=JSON%20in%20Databases%202026%3A%20PostgreSQL%20JSONB%20vs%20MySQL%20JSON%20vs%20MongoDB&emoji=%7B%7D&desc=When%20to%20use%20JSON%20columns%2C%20how%20to%20query%20and%20index%20JSONB%2C%20MySQL%20JSON%20operators%2C', width: 1200, height: 630, alt: 'JSON in Databases 2026: PostgreSQL JSONB vs MySQL JSON vs MongoDB — UnblockDevs Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JSON in PostgreSQL JSONB, MySQL & MongoDB Guide',
    description: 'JSONB queries, GIN indexing, MySQL JSON operators, MongoDB aggregation pipelines — everything about JSON storage in SQL and NoSQL databases.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/json-in-databases-postgresql-jsonb-mysql-mongodb' },
};

export default function JsonInDatabasesPage() {
  return <JsonInDatabasesClient />;
}
