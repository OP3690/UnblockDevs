import type { Metadata } from 'next';
import JsonInDatabasesClient from './client';

export const metadata: Metadata = {
  title: 'JSON in Databases 2026: PostgreSQL JSONB vs MySQL JSON vs MongoDB Complete Guide | UnblockDevs',
  description: 'Store, query, and index JSON in PostgreSQL JSONB, MySQL JSON columns, and MongoDB. When to use JSON columns vs normalized tables, GIN indexing, aggregation pipelines, and a full decision framework.',
  keywords: [
    'postgresql jsonb guide',
    'json in database 2026',
    'postgresql jsonb vs json',
    'mysql json column',
    'mongodb json documents',
    'jsonb indexing postgresql',
    'json column sql',
    'store json in database',
    'postgresql jsonb query',
    'nosql vs sql json',
    'jsonb gin index',
    'semi-structured data database',
    'mongodb vs postgresql json',
    'json database design',
    'dynamic json schema database',
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
    title: 'JSON in Databases 2026: PostgreSQL JSONB vs MySQL vs MongoDB',
    description: 'JSONB queries, GIN indexing, MySQL JSON operators, MongoDB aggregation — everything about JSON storage in databases.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/json-in-databases-postgresql-jsonb-mysql-mongodb' },
};

export default function JsonInDatabasesPage() {
  return <JsonInDatabasesClient />;
}
