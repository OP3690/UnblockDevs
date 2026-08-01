import type { Metadata } from 'next';
import Mysql10MostUsedFunctionsClient from './client';

export const metadata: Metadata = {
  title: 'MySQL 10 Most Used Functions Guide | UnblockDevs',
  description: 'MySQL 10 most used functions: COUNT, SUM, AVG, MAX, MIN, CONCAT, SUBSTRING, DATE_FORMAT, IF, CASE. Syntax & examples.',
  keywords: [
    'unblock devs mysql',
    'unblockdevs mysql',
    'mysql functions',
    'mysql most used functions',
    'mysql count function',
    'mysql sum function',
    'mysql date functions',
    'mysql string functions',
    'mysql aggregate functions',
    'mysql functions guide',
    'mysql examples'
  ],
  openGraph: {
    title: 'MySQL 10 Most Used Functions Guide',
    description: 'MySQL 10 most used functions: COUNT, SUM, AVG, MAX, MIN, CONCAT, SUBSTRING, DATE_FORMAT, IF, CASE. Syntax & examples.',
    type: 'article',
    publishedTime: '2025-01-30T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/mysql-10-most-used-functions',
    images: [{ url: 'https://unblockdevs.com/api/og?title=MySQL%2010%20Most%20Used%20Functions%20Guide&emoji=%F0%9F%93%9D&desc=MySQL%2010%20most%20used%20functions%3A%20COUNT%2C%20SUM%2C%20AVG%2C%20MAX%2C%20MIN%2C%20CONCAT%2C%20SUBSTRING%2C%20DATE', width: 1200, height: 630, alt: 'MySQL 10 Most Used Functions Guide — UnblockDevs Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MySQL 10 Most Used Functions Guide',
    description: 'MySQL 10 most used functions: COUNT, SUM, AVG, MAX, MIN, CONCAT, SUBSTRING, DATE_FORMAT, IF, CASE. Syntax & examples.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/mysql-10-most-used-functions' },

};

export default function Mysql10MostUsedFunctions() {
  return <Mysql10MostUsedFunctionsClient />;
}

