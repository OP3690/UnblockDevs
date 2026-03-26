'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  FAQAccordion, KeyPointsGrid,
  StatGrid, SectionHeader, QuickFact, TimelineViz,
} from '@/components/blog/BlogVisuals';

export default function TokenTechnologiesHistoryEvolutionClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>Token Technologies — History and Evolution: From Physical Tokens to AI Tokens</h1>
      <p className="lead">
        The word "token" appears in wildly different contexts: bank RSA tokens, OAuth access tokens,
        JWT tokens, blockchain tokens, and now AI language model tokens. Each evolved from different
        problems but shares the same fundamental idea — a unit of identity, access, or value
        that can be issued, verified, and exchanged.
      </p>

      <StatGrid stats={[
        { value: '1960s', label: 'software security tokens first introduced', color: 'blue' },
        { value: 'JWT', label: 'JSON Web Tokens — most used web auth standard', color: 'green' },
        { value: 'AI tokens', label: 'text chunks for LLM context window pricing', color: 'purple' },
        { value: 'OAuth 2.0', label: 'modern delegated authorization using tokens', color: 'amber' },
      ]} />

      <SectionHeader number={1} title="The Token Evolution Timeline" />
      <TimelineViz events={[
        { year: '1960s', title: 'Physical Hardware Tokens', description: 'Early two-factor authentication using physical devices that generate one-time codes. IBM and government systems used these for secure access.' },
        { year: '1993', title: 'HMAC-based OTP (HOTP)', description: 'RSA Security introduces SecurID tokens. Counter-based one-time passwords become standard for enterprise authentication.' },
        { year: '2000s', title: 'Session Tokens & Cookies', description: 'Web applications use opaque session tokens stored in cookies. Server maintains session state mapped to token. Stateful authentication.' },
        { year: '2006', title: 'OAuth 1.0', description: 'First standardized delegated authorization protocol. Allows apps to access user data without passwords. Uses access tokens and refresh tokens.' },
        { year: '2012', title: 'OAuth 2.0 & JWT', description: 'OAuth 2.0 simplifies authorization. JSON Web Tokens (JWT) enable stateless authentication — all claims encoded in the token itself, no server session needed.' },
        { year: '2009', title: 'Bitcoin & Blockchain Tokens', description: 'Bitcoin introduces cryptocurrency. Later, Ethereum (2015) enables programmable tokens via smart contracts — ERC-20 tokens, NFTs.' },
        { year: '2017', title: 'API Keys & Modern Auth', description: 'API keys become universal for developer access to services. Short-lived tokens with scope limitations become security best practice.' },
        { year: '2020+', title: 'AI/LLM Tokens', description: 'Language models use "tokens" as atomic units of text processing. Pricing, context windows, and rate limits all measured in tokens. ~4 characters per token.' },
      ]} />

      <SectionHeader number={2} title="Types of Tokens in Modern Computing" />
      <KeyPointsGrid columns={2} items={[
        { title: 'Authentication Tokens (JWT)', description: 'Encode identity claims in a signed JSON structure. Header.Payload.Signature format. Stateless — server verifies signature without database lookup. Standard for APIs and microservices.' },
        { title: 'OAuth Access Tokens', description: 'Grant delegated access to resources. Short-lived (15min-1hr). Come with refresh tokens for renewal. Scope-limited — "read email" not "full account access".' },
        { title: 'API Keys', description: 'Long-lived credentials for developer API access. Simpler than OAuth but higher risk if exposed. Should be rotated regularly. Use separate keys per environment.' },
        { title: 'CSRF Tokens', description: 'One-time tokens embedded in forms to prevent cross-site request forgery. Server generates, includes in HTML form, verifies on submission. Standard web security practice.' },
        { title: 'Blockchain Tokens', description: 'Digital assets on blockchain networks. Fungible (ERC-20, like ETH) or non-fungible (ERC-721, like NFTs). Represent ownership, utility rights, or governance votes.' },
        { title: 'AI/LLM Tokens', description: 'Sub-word text fragments used by language models. "unbelievable" = 3 tokens. Context window limits and pricing measured in tokens. ~750 words = 1000 tokens.' },
      ]} />

      <SectionHeader number={3} title="JWT Anatomy" />
      <QuickFact>
        A JWT consists of three Base64url-encoded parts separated by dots:
        HEADER.PAYLOAD.SIGNATURE. The header specifies algorithm (HS256, RS256).
        The payload contains claims (user id, expiry, roles). The signature verifies integrity.
        Decode any JWT at jwt.io — they're not encrypted by default, just signed.
      </QuickFact>

      <FAQAccordion items={[
        {
          question: 'What is the difference between a token and a session?',
          answer: 'Session: server stores user state, gives client an opaque ID. Stateful — server must look up session on every request. Token (JWT): all state encoded in the token itself. Stateless — server just verifies signature. Sessions are simpler to invalidate immediately; JWTs are better for distributed systems.',
        },
        {
          question: 'What are AI tokens and why do they matter for pricing?',
          answer: 'LLMs process text as tokens — sub-word pieces rather than whole words. Tokenization splits "unbelievable" into ["un", "believ", "able"]. OpenAI, Anthropic, and Google charge per token (input + output). A 10-page document is ~3000-5000 tokens. Understanding token counts helps estimate and control AI API costs.',
        },
        {
          question: 'Should I use JWT or session cookies for web auth?',
          answer: 'For traditional web apps: session cookies are simpler, more secure by default (httpOnly, sameSite), and easier to invalidate. For APIs and SPAs: JWT is better for stateless, multi-service architectures. For mobile apps: JWT stored in secure storage. Use sessions unless you specifically need statelessness or cross-domain auth.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
