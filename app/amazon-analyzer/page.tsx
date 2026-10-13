import type { Metadata } from 'next';
import AmazonAnalyzerClient from './client';

const BASE_URL = 'https://unblockdevs.com';
const PAGE_PATH = '/amazon-analyzer';

export const metadata: Metadata = {
  title: 'Amazon Order Analyzer — See Your Total Spending & Shopping History',
  description:
    "Upload your Amazon order history CSV to see your total spend, top categories, and shopping patterns over the years. 100% private — runs entirely in your browser.",
  keywords: [
    'amazon order analyzer',
    'amazon spending tracker',
    'amazon order history',
    'how much did i spend on amazon',
    'amazon data export',
    'amazon order statistics',
    'amazon purchase history analyzer',
    'amazon spending calculator',
    'amazon data analysis',
    'private amazon order tool',
    'amazon total spend',
    'amazon india order history',
  ],
  alternates: { canonical: `${BASE_URL}${PAGE_PATH}` },
  openGraph: {
    title: 'Amazon Order Analyzer — See Your Total Spending & Shopping History',
    description:
      'Upload your Amazon order history CSV to discover your total spend, top categories, and how your shopping habits have changed. 100% private, browser-only.',
    url: `${BASE_URL}${PAGE_PATH}`,
    siteName: 'UnblockDevs',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Amazon Order Analyzer — How Much Have You Really Spent?',
    description:
      'Find your exact Amazon spending, top categories, and order patterns from your own order history CSV. Private, instant.',
  },
};

export default function AmazonAnalyzerPage() {
  return <AmazonAnalyzerClient />;
}
