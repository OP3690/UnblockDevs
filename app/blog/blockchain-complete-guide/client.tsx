'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, FlowDiagram, CompareTable, ErrorFix, VerticalSteps,
  CodeBlock, FAQAccordion, KeyPointsGrid, StatGrid, SectionHeader,
  QuickFact, TimelineViz, ArchDiagram,
} from '@/components/blog/BlogVisuals';

export default function BlockchainCompleteGuideClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>Blockchain Complete Guide — How It Works, Why It Matters, When to Use It</h1>
      <p className="lead">
        Blockchain is one of the most misunderstood technologies in computing. Stripped of the hype, it's a
        specific data structure with unique trust properties. This guide explains exactly how it works —
        from cryptographic hashing to consensus mechanisms — and when it's actually the right tool.
      </p>

      <StatGrid
        stats={[
          { value: '2008', label: 'Bitcoin whitepaper published', color: 'amber' },
          { value: 'SHA-256', label: 'hashing at Bitcoin\'s core', color: 'blue' },
          { value: '~10 min', label: 'Bitcoin block time', color: 'green' },
          { value: '51%', label: 'attack threshold', color: 'red' },
        ]}
      />

      <SectionHeader number={1} title="What Is a Blockchain?" />
      <p>
        A blockchain is a <strong>linked list of records (blocks)</strong> where each block contains a
        cryptographic hash of the previous block. This creates a chain where changing any historical record
        would invalidate every block that follows — making tampering computationally infeasible.
      </p>

      <QuickFact>
        The "block" in blockchain is just a batch of transactions. The "chain" is the hash pointer linking
        each block to the one before it. Together they create an append-only, tamper-evident ledger.
      </QuickFact>

      <ArchDiagram
        boxes={[
          { label: 'Block #1\nGenesis\nHash: 000abc', color: 'blue' },
          { label: 'Block #2\n3 txns\nPrev: 000abc\nHash: 111def', color: 'blue' },
          { label: 'Block #3\n5 txns\nPrev: 111def\nHash: 222ghi', color: 'blue' },
          { label: 'Block #4\n2 txns\nPrev: 222ghi\nHash: 333jkl', color: 'green' },
        ]}
        arrows={['→', '→', '→']}
      />

      <SectionHeader number={2} title="The Cryptographic Foundation" />
      <p>
        Two cryptographic primitives make blockchain work: <strong>hash functions</strong> and
        <strong>digital signatures</strong>.
      </p>

      <KeyPointsGrid
        columns={2}
        items={[
          {
            title: 'Hash Functions (SHA-256)',
            description: 'Any input → fixed-length output. Same input always gives same output. One-way: can\'t reverse a hash back to the input. Tiny input change → completely different hash.',
          },
          {
            title: 'Digital Signatures (ECDSA)',
            description: 'Your private key signs a transaction. Anyone with your public key can verify the signature. Impossible to forge without the private key. This proves you authorized a transaction.',
          },
          {
            title: 'Merkle Trees',
            description: 'Transactions in a block are hashed pairwise into a tree. The root hash summarizes all transactions. Lets you verify a single transaction belongs to a block without downloading all transactions.',
          },
          {
            title: 'Public/Private Key Pairs',
            description: 'Your blockchain "address" is derived from your public key. Your wallet is your private key. Losing your private key = losing access permanently. No password reset.',
          },
        ]}
      />

      <SectionHeader number={3} title="How a Transaction Gets Added" />
      <FlowDiagram
        steps={[
          { label: '1. User signs transaction with private key', color: 'blue' },
          { label: '2. Broadcast to peer-to-peer network', color: 'blue' },
          { label: '3. Nodes validate: signature + balance', color: 'amber' },
          { label: '4. Miners/validators compete to add block', color: 'orange' },
          { label: '5. Winner adds block + earns reward', color: 'green' },
          { label: '6. Other nodes verify + accept chain', color: 'green' },
        ]}
      />

      <SectionHeader number={4} title="Consensus Mechanisms" />
      <p>
        The fundamental problem: in a decentralized network with no central authority, how do thousands of
        nodes agree on the "true" version of history? Different blockchains solve this differently.
      </p>

      <CompareTable
        leftLabel="Proof of Work (PoW)"
        rightLabel="Proof of Stake (PoS)"
        rows={[
          { label: 'Used by', left: 'Bitcoin, Litecoin', right: 'Ethereum (since 2022), Cardano, Solana' },
          { label: 'How it works', left: 'Miners compete to solve a math puzzle (hashing)', right: 'Validators lock up (stake) crypto as collateral' },
          { label: 'Energy usage', left: 'Very high (ASIC farms)', right: '~99.95% less than PoW' },
          { label: 'Attack cost', left: 'Must own 51% of hash power', right: 'Must own 51% of staked tokens' },
          { label: 'Block time', left: '~10 min (Bitcoin)', right: '~12 sec (Ethereum)' },
          { label: 'Security model', left: 'Work is expensive to redo', right: 'Misbehavior destroys stake (slashing)' },
        ]}
      />

      <SectionHeader number={5} title="Smart Contracts" />
      <p>
        A smart contract is <strong>code stored on the blockchain</strong> that automatically executes when
        conditions are met. It's like a vending machine: you put money in, the machine dispenses without
        needing a human to process the transaction.
      </p>

      <CodeBlock language="solidity" filename="Simple Smart Contract (Solidity / Ethereum)">
{`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleStorage {
    uint256 private storedValue;
    address public owner;

    constructor() {
        owner = msg.sender;  // whoever deploys = owner
    }

    // Only owner can set value
    function setValue(uint256 _value) public {
        require(msg.sender == owner, "Not the owner");
        storedValue = _value;
    }

    // Anyone can read
    function getValue() public view returns (uint256) {
        return storedValue;
    }
}`}
      </CodeBlock>

      <AlertBox type="warning" title="Smart contracts are immutable once deployed">
        Once deployed to the Ethereum mainnet, a smart contract cannot be changed. Bugs become permanent.
        This is why auditing and testing are critical — and why millions have been lost to smart contract exploits.
      </AlertBox>

      <SectionHeader number={6} title="Blockchain vs Traditional Database" />

      <CompareTable
        leftLabel="Traditional Database"
        rightLabel="Blockchain"
        rows={[
          { label: 'Control', left: 'Centralized (one entity)', right: 'Decentralized (consensus)' },
          { label: 'Trust model', left: 'Trust the database operator', right: 'Trust the math/code' },
          { label: 'Mutability', left: 'Any row can be updated/deleted', right: 'Append-only (no deletes)' },
          { label: 'Speed', left: 'Thousands of tx/sec', right: '7 (Bitcoin) to 65,000 (Solana) tx/sec' },
          { label: 'Privacy', left: 'Private by default', right: 'Public by default (permissioned variants exist)' },
          { label: 'Cost per write', left: 'Near-zero', right: 'Gas fees (can be $0.001 to $50+)' },
          { label: 'Best for', left: 'Speed, privacy, complex queries', right: 'Multi-party trust without intermediary' },
        ]}
      />

      <SectionHeader number={7} title="When to Actually Use Blockchain" />

      <KeyPointsGrid
        columns={2}
        items={[
          {
            title: '✅ Good use cases',
            description: 'Multi-party settlement without a trusted intermediary. Transparent supply chain tracking. Digital ownership (NFTs, certificates). Cross-border payments without banks.',
          },
          {
            title: '❌ Bad use cases',
            description: 'Internal company databases. Anything that needs fast writes. Applications requiring privacy (public blockchain ≠ private). When you trust a central party already.',
          },
          {
            title: '✅ DeFi (Decentralized Finance)',
            description: 'Lending, borrowing, trading without banks. Smart contracts enforce rules — no one can change them mid-game. Anyone globally can participate.',
          },
          {
            title: '❌ The "just use PostgreSQL" test',
            description: 'If removing the decentralized requirement makes the system simpler — use a regular database. Most "blockchain solutions" fail this test.',
          },
        ]}
      />

      <SectionHeader number={8} title="Key Blockchain History" />
      <TimelineViz
        events={[
          { year: '2008', title: 'Bitcoin Whitepaper', description: 'Satoshi Nakamoto publishes "A Peer-to-Peer Electronic Cash System"', color: 'amber' },
          { year: '2009', title: 'Genesis Block', description: 'First Bitcoin block mined. First transaction sent.', color: 'amber' },
          { year: '2015', title: 'Ethereum Launch', description: 'Vitalik Buterin launches Ethereum — blockchain with smart contracts.', color: 'blue' },
          { year: '2017', title: 'ICO Boom', description: 'Thousands of tokens launched. Most failed. Regulatory scrutiny began.', color: 'red' },
          { year: '2020', title: 'DeFi Summer', description: 'Billions locked in decentralized lending and trading protocols.', color: 'green' },
          { year: '2021', title: 'NFT Peak', description: 'NFTs hit mainstream. Bored Apes, CryptoPunks sell for millions.', color: 'purple' },
          { year: '2022', title: 'Ethereum Merge', description: 'Ethereum switches from PoW to PoS. Energy use drops 99.95%.', color: 'blue' },
          { year: '2024', title: 'Bitcoin ETF Approved', description: 'US SEC approves spot Bitcoin ETFs. Institutional adoption increases.', color: 'green' },
        ]}
      />

      <FAQAccordion
        items={[
          {
            question: 'Is blockchain the same as Bitcoin?',
            answer: 'No. Bitcoin is one cryptocurrency that uses blockchain technology. Blockchain is the underlying data structure/protocol. There are thousands of blockchains — Ethereum, Solana, Cardano, Polygon, etc.',
          },
          {
            question: 'Can blockchain data be hacked or deleted?',
            answer: 'Historical data cannot be altered without redoing all the computational work for every block after it — which is economically infeasible on major chains. However, your wallet can be compromised if someone gets your private key. The protocol is secure; humans are the weak link.',
          },
          {
            question: 'What is a "gas fee"?',
            answer: 'On Ethereum, every transaction and smart contract execution requires computation from validators. Gas is the unit of computation, and you pay a fee in ETH. More complex operations = more gas = higher fee. This prevents spam and compensates validators.',
          },
          {
            question: 'What is a 51% attack?',
            answer: 'If one entity controls more than 50% of a blockchain\'s mining/staking power, they can rewrite recent history and double-spend coins. This is theoretically possible on small chains but economically prohibitive on Bitcoin or Ethereum.',
          },
          {
            question: 'Should I learn Solidity as a developer?',
            answer: 'If you\'re interested in Web3/DeFi development, yes — Solidity is the primary language for Ethereum smart contracts. The market for smart contract developers is large but competitive. Otherwise, blockchain as a backend is used via APIs (Infura, Alchemy) without needing Solidity.',
          },
        ]}
      />
    </BlogLayoutWithSidebarAds>
  );
}
