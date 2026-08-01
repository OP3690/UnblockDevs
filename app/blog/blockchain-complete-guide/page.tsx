import type { Metadata } from 'next';
import BlockchainCompleteGuideClient from './client';

export const metadata: Metadata = {
  title: 'Blockchain: Complete Guide | UnblockDevs',
  description: 'Blockchain: how it works, smart contracts, consensus, use cases. DeFi, NFTs, Web3. Distributed ledgers.',
  keywords: [
    'blockchain technology',
    'distributed ledger',
    'smart contracts',
    'cryptocurrency',
    'defi',
    'nft',
    'web3'
  ],
  openGraph: {
    title: 'Blockchain: Complete Guide',
    description: 'Blockchain: how it works, smart contracts, consensus, use cases. DeFi, NFTs, Web3. Distributed ledgers.',
    type: 'article',
    publishedTime: '2025-01-25T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/blockchain-complete-guide',
    images: [{ url: 'https://unblockdevs.com/api/og?title=Blockchain%3A%20Complete%20Guide&emoji=%F0%9F%93%9D&desc=Blockchain%3A%20how%20it%20works%2C%20smart%20contracts%2C%20consensus%2C%20use%20cases.%20DeFi%2C%20NFTs%2C%20Web', width: 1200, height: 630, alt: 'Blockchain: Complete Guide — UnblockDevs Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blockchain: Complete Guide',
    description: 'Blockchain: how it works, smart contracts, consensus, use cases. DeFi, NFTs, Web3. Distributed ledgers.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/blockchain-complete-guide' },

};

export default function BlockchainCompleteGuide() {
  return <BlockchainCompleteGuideClient />;
}

