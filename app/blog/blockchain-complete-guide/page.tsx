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
  alternates: { canonical: 'https://unblockdevs.com/blog/blockchain-complete-guide' },

};

export default function BlockchainCompleteGuide() {
  return <BlockchainCompleteGuideClient />;
}

