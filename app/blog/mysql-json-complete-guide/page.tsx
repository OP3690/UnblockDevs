import type { Metadata } from 'next';
import MysqlJsonCompleteGuideClient from './client';

export const metadata: Metadata = {
  title: 'JSON in MySQL: Complete Guide | UnblockDevs',
  description: 'JSON in MySQL: data types, extract from columns, nested queries, 10 examples. Tips for efficient JSON.',
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
    'mysql json best practices',
    'mysql json_extract boolean true comparison',
    'mysql json_extract boolean value',
    'mysql json_extract true false',
    'mysql json column query boolean'
  ],
  alternates: { canonical: 'https://unblockdevs.com/blog/mysql-json-complete-guide' },

};

export default function MysqlJsonCompleteGuide() {
  return <MysqlJsonCompleteGuideClient />;
}

