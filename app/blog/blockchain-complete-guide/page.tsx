import type { Metadata } from 'next';
import BlockchainCompleteGuideClient from './client';

export const metadata: Metadata = {
  title: 'Blockchain Technology: Complete Guide to Distributed Ledgers | UnblockDevs',
  description: 'Comprehensive guide to Blockchain: how it works, smart contracts, consensus mechanisms, use cases, and future of distributed ledger technology. Learn about DeFi, NFTs, and Web3.',
  keywords: [
    'blockchain technology',
    'distributed ledger',
    'smart contracts',
    'cryptocurrency',
    'defi',
    'nft',
    'web3'
  ],
};

export default function BlockchainCompleteGuide() {
  return <BlockchainCompleteGuideClient />;
}

