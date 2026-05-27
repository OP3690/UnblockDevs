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
  openGraph: {
    title: 'High Impact Tech Stocks: Complete Investment Guide 2026',
    description: 'High impact tech stocks 2026: what they are, how to identify, top picks,',
    type: 'article',
    url: 'https://unblockdevs.com/blog/high-impact-tech-stocks-investment-guide',
    images: [{ url: 'https://unblockdevs.com/api/og?title=High%20Impact%20Tech%20Stocks%3A%20Complete%20Investment%20Guide%202026&emoji=%F0%9F%93%96&desc=High%20impact%20tech%20stocks%202026%3A%20what%20they%20are%2C%20how%20to%20identify%2C%20top%20picks%2C', width: 1200, height: 630, alt: 'High Impact Tech Stocks: Complete Investment Guide 2026 — UnblockDevs Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'High Impact Tech Stocks: Complete Investment Guide 2026',
    description: 'High impact tech stocks 2026: what they are, how to identify, top picks,',
    images: ['https://unblockdevs.com/api/og?title=High%20Impact%20Tech%20Stocks%3A%20Complete%20Investment%20Guide%202026&emoji=%F0%9F%93%96&desc=High%20impact%20tech%20stocks%202026%3A%20what%20they%20are%2C%20how%20to%20identify%2C%20top%20picks%2C'],
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/high-impact-tech-stocks-investment-guide' },

};

export default function HighImpactTechStocks() {
  return <HighImpactTechStocksClient />;
}

