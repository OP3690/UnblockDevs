'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CompareTable, ErrorFix, VerticalSteps,
  CodeBlock, FAQAccordion, KeyPointsGrid, StatGrid, SectionHeader,
  QuickFact,
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
          { value: '2008', label: 'Bitcoin whitepaper published by Satoshi Nakamoto', color: 'amber' },
          { value: 'SHA-256', label: 'cryptographic hash function at Bitcoin\'s core', color: 'blue' },
          { value: '~10 min', label: 'Bitcoin block time (average)', color: 'green' },
          { value: '51%', label: 'hash power needed for a successful attack', color: 'red' },
        ]}
      />

      <SectionHeader number={1} title="What Is a Blockchain?" />
      <p>
        A blockchain is a <strong>linked list of records (blocks)</strong> where each block contains a
        cryptographic hash of the previous block. This creates a chain where changing any historical record
        would invalidate every block that follows — making tampering computationally infeasible.
      </p>

      <QuickFact color="blue" label="Core concept">
        The "block" in blockchain is just a batch of transactions. The "chain" is the hash pointer linking
        each block to the one before it. Together they create an append-only, tamper-evident ledger.
      </QuickFact>

      <KeyPointsGrid items={[
        { title: 'Decentralized', description: 'No single server or company controls the data. Thousands of nodes worldwide each hold a complete copy of the ledger. To change history, you\'d need to control a majority of nodes.' },
        { title: 'Immutable', description: 'Once a block is added, its content is effectively permanent. Changing it would require recalculating every subsequent block\'s hash — computationally prohibitive on major chains.' },
        { title: 'Transparent', description: 'On public blockchains, every transaction is visible to anyone. This creates accountability and allows independent verification without trusting any authority.' },
        { title: 'Trustless', description: 'Participants don\'t need to trust each other or a central party. The mathematical rules of the protocol enforce honest behavior through economic incentives and cryptographic proofs.' },
        { title: 'Append-only', description: 'Data is never deleted or updated — only new records are added. This enables complete audit trails and makes fraud immediately detectable.' },
        { title: 'Permissionless or Permissioned', description: 'Public blockchains (Bitcoin, Ethereum) allow anyone to participate. Permissioned blockchains (Hyperledger, Corda) restrict participation to known, approved entities.' },
      ]} />

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

      <CodeBlock language="javascript" filename="hash-demo.js">
{`const crypto = require('crypto');

// Hash function demonstration
function sha256(data) {
  return crypto.createHash('sha256').update(data).digest('hex');
}

// Same input → same hash (deterministic)
console.log(sha256('Hello blockchain'));
// → 'd3fbb8d87de659c89978f3b5c6e06b9b45b5b1f7bace4e5b3d6f8e3b9e9c3a8'

// Tiny change → completely different hash (avalanche effect)
console.log(sha256('Hello blockchain!'));
// → '7f9c2ba4e88f827d616045507605853ed73b8093f6efbc88eb1a6eacfa66ef26'

// Block structure
const block = {
  index: 3,
  timestamp: Date.now(),
  transactions: [
    { from: 'Alice', to: 'Bob', amount: 1.5 },
    { from: 'Charlie', to: 'Diana', amount: 0.5 },
  ],
  previousHash: '000abc123def456...',
  nonce: 0,
};

// Block hash includes everything — change anything and hash changes
block.hash = sha256(JSON.stringify(block));

console.log('Block hash:', block.hash);`}
      </CodeBlock>

      <SectionHeader number={3} title="How a Transaction Gets Added" />
      <VerticalSteps
        steps={[
          { title: 'User signs the transaction with their private key', desc: 'The transaction (sender, recipient, amount) is hashed and signed with ECDSA. This proves the sender authorized the transfer without revealing their private key.' },
          { title: 'Transaction broadcast to the peer-to-peer network', desc: 'The signed transaction is sent to nearby nodes, which relay it further. Within seconds, it reaches most nodes worldwide. It enters the "mempool" (memory pool) awaiting inclusion in a block.' },
          { title: 'Nodes validate: valid signature + sufficient balance', desc: 'Each node independently checks: Is the digital signature valid? Does the sender have enough funds (based on the ledger history)? Nodes reject invalid transactions.' },
          { title: 'Miners/validators compete to include the transaction in a block', desc: 'In Proof of Work: miners race to find a hash below the target difficulty. In Proof of Stake: validators are randomly selected weighted by their stake. The winner packages pending transactions into a new block.' },
          { title: 'Winner adds block and earns the block reward', desc: 'The winning miner/validator adds their block to the chain and broadcasts it. They earn the block reward (newly created cryptocurrency) plus transaction fees from all included transactions.' },
          { title: 'Other nodes verify and extend the chain', desc: 'Nodes receive the new block, independently verify every transaction and the hash, then add it to their copy of the chain. After several more blocks are added on top (confirmations), the transaction is considered effectively irreversible.' },
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
          { label: 'Used by', left: 'Bitcoin, Litecoin, Dogecoin', right: 'Ethereum (since 2022), Cardano, Solana' },
          { label: 'How it works', left: 'Miners compete to solve a math puzzle (hashing)', right: 'Validators lock up (stake) crypto as collateral' },
          { label: 'Energy usage', left: 'Very high (ASIC farms, ~100 TWh/year for Bitcoin)', right: '~99.95% less than PoW (Ethereum uses ~0.01 TWh)' },
          { label: 'Attack cost', left: 'Must own 51% of hash power (billions in hardware)', right: 'Must own 51% of staked tokens' },
          { label: 'Block time', left: '~10 min (Bitcoin)', right: '~12 sec (Ethereum)' },
          { label: 'Security model', left: 'Work is expensive and slow to redo', right: 'Misbehavior destroys stake (slashing penalty)' },
          { label: 'Decentralization risk', left: 'ASIC manufacturing centralization', right: 'Wealth concentration (rich get richer)' },
          { label: 'TPS (transactions/sec)', left: '~7 (Bitcoin)', right: '~15-30 (Ethereum L1), thousands on L2s' },
        ]}
      />

      <CompareTable
        leftLabel="Proof of Authority (PoA)"
        rightLabel="Delegated Proof of Stake (DPoS)"
        rows={[
          { label: 'Used by', left: 'Private chains, Polygon Edge, Hyperledger', right: 'EOS, Tron, BitShares' },
          { label: 'Validators', left: 'Pre-approved, known identities', right: 'Token holders vote for a fixed set of delegates' },
          { label: 'Decentralization', left: 'Low — trust is in approved authorities', right: 'Medium — delegates can be voted out' },
          { label: 'Speed', left: 'Very fast (no mining), 1,000s of TPS', right: 'Very fast, low latency' },
          { label: 'Use case', left: 'Enterprise, consortium networks', right: 'High-throughput consumer applications' },
          { label: 'Security model', left: 'Reputation of approved validators', right: 'Economic stake + community voting' },
        ]}
      />

      <SectionHeader number={5} title="Smart Contracts" />
      <p>
        A smart contract is <strong>code stored on the blockchain</strong> that automatically executes when
        conditions are met. It's like a vending machine: you put money in, the machine dispenses without
        needing a human to process the transaction.
      </p>

      <CodeBlock language="solidity" filename="SimpleStorage.sol">
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

      <CodeBlock language="solidity" filename="SimpleToken.sol">
{`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Minimal ERC-20 token implementation
contract SimpleToken {
    string public name = "MyToken";
    string public symbol = "MTK";
    uint8 public decimals = 18;
    uint256 public totalSupply;

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    event Transfer(address indexed from, address indexed to, uint256 value);

    constructor(uint256 _initialSupply) {
        totalSupply = _initialSupply * 10 ** uint256(decimals);
        balanceOf[msg.sender] = totalSupply;
    }

    function transfer(address _to, uint256 _value) public returns (bool) {
        require(balanceOf[msg.sender] >= _value, "Insufficient balance");
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }
}`}
      </CodeBlock>

      <AlertBox type="warning" title="Smart contracts are immutable once deployed">
        Once deployed to the Ethereum mainnet, a smart contract cannot be changed. Bugs become permanent.
        This is why auditing and testing are critical — and why millions have been lost to smart contract exploits.
        Use proxy patterns and timelocks for upgradability in production contracts.
      </AlertBox>

      <SectionHeader number={6} title="Blockchain vs Traditional Database" />

      <CompareTable
        leftLabel="Traditional Database"
        rightLabel="Blockchain"
        rows={[
          { label: 'Control', left: 'Centralized (one entity)', right: 'Decentralized (consensus)' },
          { label: 'Trust model', left: 'Trust the database operator', right: 'Trust the math/code' },
          { label: 'Mutability', left: 'Any row can be updated/deleted', right: 'Append-only (no deletes)' },
          { label: 'Speed', left: 'Thousands of tx/sec easily', right: '7 (Bitcoin) to 65,000 (Solana) tx/sec' },
          { label: 'Privacy', left: 'Private by default', right: 'Public by default (permissioned variants exist)' },
          { label: 'Cost per write', left: 'Near-zero', right: 'Gas fees (can be $0.001 to $50+)' },
          { label: 'GDPR compliance', left: 'Straightforward — delete records', right: 'Very hard — immutability conflicts with right to erasure' },
          { label: 'Best for', left: 'Speed, privacy, complex queries', right: 'Multi-party trust without intermediary' },
        ]}
      />

      <SectionHeader number={7} title="When to Actually Use Blockchain" />

      <KeyPointsGrid
        columns={2}
        items={[
          {
            title: 'Good use case: Multi-party settlement',
            description: 'When multiple organizations need to share a ledger but none wants the other to control it. Supply chain (Walmart, Maersk), trade finance, and cross-border payments are real examples where blockchain adds genuine value.',
          },
          {
            title: 'Bad use case: Internal company database',
            description: 'If your organization controls both the data and the consumers of the data, a traditional database is faster, cheaper, and easier to maintain. Don\'t add blockchain complexity without a trust problem to solve.',
          },
          {
            title: 'Good use case: Digital ownership verification',
            description: 'NFTs and on-chain certificates create verifiable, transferable proof of ownership that doesn\'t depend on any company staying in business. Concert tickets, academic credentials, and game items are legitimate applications.',
          },
          {
            title: 'Bad use case: Anything needing fast writes or queries',
            description: 'If you need sub-millisecond write latency, complex SQL queries, or the ability to update/delete records, blockchain is the wrong tool. PostgreSQL handles this in a fraction of the cost and complexity.',
          },
        ]}
      />

      <QuickFact color="green" label="The simple test">
        Ask: "Do multiple parties who don't trust each other need to agree on shared data without a
        central authority?" If yes, blockchain might help. If no — use a database.
      </QuickFact>

      <SectionHeader number={8} title="Key Blockchain Events Timeline" />
      <KeyPointsGrid items={[
        { title: '2008 — Bitcoin Whitepaper', description: 'Satoshi Nakamoto publishes "A Peer-to-Peer Electronic Cash System." A 9-page document that launched an entire industry.' },
        { title: '2009 — Genesis Block', description: 'First Bitcoin block mined on January 3, 2009. The coinbase message reads "The Times 03/Jan/2009 Chancellor on brink of second bailout for banks."' },
        { title: '2015 — Ethereum Launch', description: 'Vitalik Buterin launches Ethereum — blockchain programmable with smart contracts in Solidity. Introduces the concept of a "world computer."' },
        { title: '2017 — ICO Boom and Crash', description: 'Thousands of tokens launched via Initial Coin Offerings. Ethereum price hits $1,400. Most ICO projects failed or were outright scams. SEC begins enforcement.' },
        { title: '2020 — DeFi Summer', description: 'Billions locked in decentralized lending (Aave, Compound), trading (Uniswap), and yield farming. DeFi Total Value Locked grows from $1B to $15B in months.' },
        { title: '2021 — NFT Peak', description: 'NFTs hit mainstream. Beeple\'s digital art sells for $69M at Christie\'s. Bored Apes and CryptoPunks sell for millions. Ethereum daily fees exceed $50M.' },
        { title: '2022 — Ethereum Merge', description: 'Ethereum transitions from Proof of Work to Proof of Stake in September 2022. Energy consumption drops 99.95%. No service interruption during the transition.' },
        { title: '2024 — Bitcoin ETF Approved', description: 'US SEC approves spot Bitcoin ETFs from BlackRock, Fidelity, and others. Institutional capital flows in. Bitcoin reaches new all-time highs above $73,000.' },
      ]} />

      <SectionHeader number={9} title="Interacting with Blockchain as a Developer" />
      <CodeBlock language="javascript" filename="ethers-quickstart.js">
{`import { ethers } from 'ethers';

// Connect to Ethereum via a public RPC provider
const provider = new ethers.JsonRpcProvider(
  'https://mainnet.infura.io/v3/YOUR_PROJECT_ID'
);

// Read the latest block
const block = await provider.getBlock('latest');
console.log('Block number:', block.number);
console.log('Block hash:', block.hash);
console.log('Transactions:', block.transactions.length);

// Check an account balance
const balance = await provider.getBalance('0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045');
console.log('Balance (ETH):', ethers.formatEther(balance));

// Send a transaction (requires a wallet/signer)
const wallet = new ethers.Wallet('YOUR_PRIVATE_KEY', provider);

const tx = await wallet.sendTransaction({
  to: '0xRecipientAddress',
  value: ethers.parseEther('0.01'), // 0.01 ETH
});

console.log('Transaction hash:', tx.hash);
await tx.wait(); // Wait for confirmation
console.log('Confirmed!');`}
      </CodeBlock>

      <ErrorFix
        title="Common Solidity mistakes"
        bad={`// Reentrancy vulnerability (millions lost to this)
function withdraw(uint256 amount) public {
  require(balances[msg.sender] >= amount);
  // BUG: External call BEFORE balance update
  (bool success,) = msg.sender.call{value: amount}("");
  require(success);
  balances[msg.sender] -= amount; // Too late!
}`}
        good={`// Safe: Checks-Effects-Interactions pattern
function withdraw(uint256 amount) public {
  require(balances[msg.sender] >= amount);
  // 1. Update state BEFORE external call
  balances[msg.sender] -= amount;
  // 2. Then make external call
  (bool success,) = msg.sender.call{value: amount}("");
  require(success);
}`}
        badLabel="Reentrancy vulnerable"
        goodLabel="Checks-Effects-Interactions"
      />

      <FAQAccordion
        items={[
          {
            question: 'Is blockchain the same as Bitcoin?',
            answer: 'No. Bitcoin is one cryptocurrency that uses blockchain technology. Blockchain is the underlying data structure/protocol. There are thousands of blockchains — Ethereum, Solana, Cardano, Polygon, etc. Bitcoin is to blockchain what Gmail is to email.',
          },
          {
            question: 'Can blockchain data be hacked or deleted?',
            answer: 'Historical data cannot be altered without redoing all the computational work for every block after it — which is economically infeasible on major chains. However, your wallet can be compromised if someone gets your private key. The protocol is secure; humans are the weak link. Smart contracts can also have exploitable bugs.',
          },
          {
            question: 'What is a "gas fee"?',
            answer: 'On Ethereum, every transaction and smart contract execution requires computation from validators. Gas is the unit of computation, and you pay a fee in ETH. More complex operations = more gas = higher fee. This prevents spam and compensates validators. Gas fees fluctuate with network demand — they can be $0.50 during quiet periods or $50+ during peak congestion.',
          },
          {
            question: 'What is a 51% attack?',
            answer: 'If one entity controls more than 50% of a blockchain\'s mining/staking power, they can rewrite recent history and double-spend coins. This is theoretically possible on small chains but economically prohibitive on Bitcoin (would require billions in ASIC hardware) or Ethereum (would require buying 51% of all staked ETH).',
          },
          {
            question: 'Should I learn Solidity as a developer?',
            answer: 'If you\'re interested in Web3/DeFi development, yes — Solidity is the primary language for Ethereum smart contracts. The market for audited smart contract developers is large and pays well. Otherwise, blockchain as a backend is used via APIs (Infura, Alchemy, QuickNode) without needing Solidity — you query the chain using ethers.js or web3.py.',
          },
          {
            question: 'What is the difference between Layer 1 and Layer 2 blockchains?',
            answer: 'Layer 1 (L1) is the base blockchain — Bitcoin, Ethereum, Solana. Layer 2 (L2) solutions are built on top of L1 to improve speed and reduce costs. Examples: Ethereum L2s include Arbitrum, Optimism, Base, and Polygon. They bundle many transactions off-chain and settle a compressed proof on Ethereum, inheriting its security at a fraction of the cost. L2 transaction fees can be 10-100x cheaper than L1.',
          },
          {
            question: 'What is DeFi and how does it work?',
            answer: 'DeFi (Decentralized Finance) is financial services built on smart contracts — lending, borrowing, trading, and earning yield without banks or brokers. Protocols like Uniswap (decentralized exchange), Aave (lending), and Compound (yield) run autonomously via smart contracts. Users keep custody of their funds; the code enforces the rules. Risk comes from smart contract bugs, oracle manipulation, and token volatility.',
          },
          {
            question: 'How do NFTs actually prove ownership?',
            answer: 'An NFT (Non-Fungible Token) is a unique token on a blockchain with a token ID that points to metadata (usually a URL containing the image or file). The blockchain records who owns each token ID. Ownership is verified by controlling the private key of the owning address. However, the NFT itself is usually just a pointer — the actual file is typically stored off-chain on IPFS or a web server, not on the blockchain.',
          },
        ]}
      />
    </BlogLayoutWithSidebarAds>
  );
}
