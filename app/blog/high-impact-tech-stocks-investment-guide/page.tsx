import type { Metadata } from 'next';
import HighImpactTechStocksClient from './client';

export const metadata: Metadata = {
  title: 'High Impact Tech Stocks: Complete Investment Guide 2026 | UnblockDevs',
  description: 'High impact tech stocks 2026: what they are, how to identify, top picks, strategies, risks. AI, semiconductor, cloud, emerging tech.',
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
  robots: { index: false, follow: false },
  alternates: { canonical: 'https://unblockdevs.com/blog/high-impact-tech-stocks-investment-guide' },

};

export default function HighImpactTechStocks() {
  return <HighImpactTechStocksClient />;
}

