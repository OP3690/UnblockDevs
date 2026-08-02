import type { Metadata } from 'next';
import Mysql10MostUsedFunctionsClient from './client';

export const metadata: Metadata = {
  title: 'MySQL 10 Most Used Functions with Examples | UnblockDevs',
  description: 'Master the 10 most used MySQL functions: COUNT, SUM, AVG, MAX, MIN, CONCAT, SUBSTRING, DATE_FORMAT, IF, and CASE — with syntax and practical examples.',
  keywords: [
    'mysql most used functions',
    'mysql functions guide',
    'mysql count function',
    'mysql sum function',
    'mysql aggregate functions',
    'mysql string functions',
    'mysql date functions',
    'mysql IF CASE functions',
    'mysql functions examples',
    'most common mysql functions',
    'mysql CONCAT SUBSTRING guide',
    'mysql DATE_FORMAT function',
  ],
  openGraph: {
    title: "MySQL's 10 Most Used Functions — COUNT, SUM, CONCAT, DATE_FORMAT & More",
    description: 'Learn the 10 MySQL functions every developer reaches for: COUNT, SUM, AVG, MAX, MIN, CONCAT, SUBSTRING, DATE_FORMAT, IF, and CASE. Each one covered with syntax, examples, and practical use cases.',
    type: 'article',
    publishedTime: '2025-01-30T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/mysql-10-most-used-functions',
    images: [{ url: 'https://unblockdevs.com/api/og?title=MySQL%2010%20Most%20Used%20Functions%20Guide&emoji=%F0%9F%93%9D&desc=MySQL%2010%20most%20used%20functions%3A%20COUNT%2C%20SUM%2C%20AVG%2C%20MAX%2C%20MIN%2C%20CONCAT%2C%20SUBSTRING%2C%20DATE', width: 1200, height: 630, alt: 'MySQL 10 Most Used Functions Guide — UnblockDevs Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MySQL 10 Most Used Functions with Examples',
    description: "Master MySQL's 10 most used functions: COUNT, SUM, AVG, CONCAT, DATE_FORMAT, IF, CASE — with syntax and practical examples for each.",
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/mysql-10-most-used-functions' },

};

export default function Mysql10MostUsedFunctions() {
  return <Mysql10MostUsedFunctionsClient />;
}

