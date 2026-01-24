import type { Metadata } from 'next';
import Mysql10MostUsedFunctionsClient from './client';

export const metadata: Metadata = {
  title: 'MySQL 10 Most Used Functions: Complete Guide with Examples | UnblockDevs',
  description: 'UnblockDevs MySQL Guide: Complete guide to MySQL 10 most used functions: COUNT, SUM, AVG, MAX, MIN, CONCAT, SUBSTRING, DATE_FORMAT, IF, and CASE. Learn syntax, examples, and best practices for each function.',
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
};

export default function Mysql10MostUsedFunctions() {
  return <Mysql10MostUsedFunctionsClient />;
}

