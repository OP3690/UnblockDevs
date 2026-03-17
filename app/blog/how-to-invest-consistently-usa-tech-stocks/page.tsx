import type { Metadata } from 'next';
import ConsistentTechInvestingClient from './client';

export const metadata: Metadata = {
  title: 'Invest Consistently in USA Tech Stocks 2026 | UnblockDevs',
  description: 'Consistent investing in USA tech stocks: DCA, long-term strategy, allocation, automation, tax strategies. Build wealth systematically.',
  keywords: [
    'how to invest consistently in tech stocks',
    'consistent tech stock investing',
    'dollar cost averaging tech stocks',
    'systematic tech investing',
    'long term tech stock strategy',
    'usa tech stock investing',
    'tech stock investment strategy',
    'automated tech investing',
    'tech stock portfolio building',
    'consistent investing strategy',
    'tech stock dollar cost averaging',
    'monthly tech stock investing',
    'tech stock accumulation strategy',
    'build tech stock portfolio',
    'tech investing best practices',
    'tech stock investment plan',
    'systematic investment plan tech',
    'tech stock savings strategy'
  ],
  openGraph: {
    title: 'Invest Consistently in USA Tech Stocks 2026 | UnblockDevs',
    description: 'Consistent investing in USA tech stocks: DCA, long-term strategy, allocation, automation, tax strategies. Build wealth systematically.',
    type: 'article',
    url: 'https://unblockdevs.com/blog/how-to-invest-consistently-usa-tech-stocks',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/how-to-invest-consistently-usa-tech-stocks' },
  robots: { index: false, follow: false },
};

export default function ConsistentTechInvesting() {
  return <ConsistentTechInvestingClient />;
}

