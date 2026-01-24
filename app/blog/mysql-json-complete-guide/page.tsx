import type { Metadata } from 'next';
import MysqlJsonCompleteGuideClient from './client';

export const metadata: Metadata = {
  title: 'Working with JSON in MySQL: Complete Guide to Extract & Manipulate Data | UnblockDevs',
  description: 'UnblockDevs MySQL Guide: Complete guide to working with JSON in MySQL: JSON data types, structure, extracting data from JSON columns, nested JSON queries, 10 practical examples, and tips & tricks for efficient JSON manipulation.',
  keywords: [
    'unblock devs mysql',
    'unblockdevs mysql',
    'mysql json',
    'mysql json extract',
    'mysql json functions',
    'mysql nested json',
    'mysql json query',
    'mysql json data type',
    'mysql json manipulation',
    'mysql json examples',
    'mysql json best practices'
  ],
};

export default function MysqlJsonCompleteGuide() {
  return <MysqlJsonCompleteGuideClient />;
}

