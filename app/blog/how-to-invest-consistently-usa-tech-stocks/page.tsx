import type { Metadata } from 'next';
import ConsistentTechInvestingClient from './client';

export const metadata: Metadata = {
  title: 'How to Invest Consistently in USA Tech Stocks: Complete Strategy Guide 2026 | UnblockDevs',
  description: 'Complete guide to consistent investing in USA tech stocks: dollar-cost averaging, long-term strategy, portfolio allocation, best practices, automation, tax strategies, and how to build wealth through systematic tech stock investing.',
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
  alternates: { canonical: 'https://unblockdevs.com/blog/how-to-invest-consistently-usa-tech-stocks' },
};

export default function ConsistentTechInvesting() {
  return <ConsistentTechInvestingClient />;
}

