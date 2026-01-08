import type { Metadata } from 'next';
import HighImpactTechStocksClient from './client';

export const metadata: Metadata = {
  title: 'High Impact Tech Stocks: Complete Investment Guide 2026 | UnblockDevs',
  description: 'Complete guide to high impact tech stocks: what are high impact tech stocks, why invest, how to identify them, top tech stocks 2026, investment strategies, risks, and best practices. Learn about AI, semiconductor, cloud, and emerging tech stocks.',
  keywords: [
    'high impact tech stocks',
    'tech stocks 2026',
    'best tech stocks',
    'ai stocks',
    'semiconductor stocks',
    'cloud computing stocks',
    'tech stock investment',
    'growth tech stocks',
    'emerging tech stocks',
    'tech stock picks',
    'nvidia stock',
    'microsoft stock',
    'apple stock',
    'amazon stock',
    'google stock',
    'meta stock',
    'tesla stock',
    'tech stock analysis',
    'tech stock portfolio',
    'tech stock strategy'
  ],
};

export default function HighImpactTechStocks() {
  return <HighImpactTechStocksClient />;
}

