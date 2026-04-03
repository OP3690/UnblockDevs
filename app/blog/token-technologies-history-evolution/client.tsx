'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  FAQAccordion, KeyPointsGrid,
  StatGrid, SectionHeader, QuickFact, TimelineViz, AlertBox, CodeBlock,
} from '@/components/blog/BlogVisuals';

export default function TokenTechnologiesHistoryEvolutionClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>Token Technologies — History and Evolution: From Physical Tokens to AI Tokens</h1>
      <p className="lead">
        The word "token" appears in wildly different contexts: bank RSA tokens, OAuth access tokens,
        JWT tokens, blockchain tokens, and now AI language model tokens. Each evolved from different
        problems but shares the same fundamental idea — a unit of identity, access, or value
        that can be issued, verified, and exchanged. This guide traces the complete history
        of token technologies, explains how each type works, and clarifies the differences
        between authentication tokens, authorization tokens, blockchain tokens, and AI tokens.
      </p>

      <StatGrid stats={[
        { value: '1960s', label: 'software security tokens first introduced', color: 'blue' },
        { value: 'JWT', label: 'JSON Web Tokens — most widely used web auth standard', color: 'green' },
        { value: 'AI tokens', label: 'text chunks for LLM context window pricing', color: 'purple' },
        { value: 'OAuth 2.0', label: 'modern delegated authorization using tokens', color: 'amber' },
      ]} />

      <SectionHeader number={1} title="The Token Evolution Timeline" />
      <TimelineViz events={[
        { year: '1960s', title: 'Physical Hardware Tokens', description: 'Early two-factor authentication using physical devices that generate one-time codes. IBM and government systems used these for secure facility and system access. The principle: something you know (password) + something you have (token).' },
        { year: '1993', title: 'RSA SecurID and HMAC-OTP', description: 'RSA Security introduces SecurID tokens — small keyfobs that display a new 6-digit code every 60 seconds. Counter-based one-time passwords (HOTP) become the standard for enterprise authentication. Time-based OTP (TOTP) follows, forming the basis of modern authenticator apps like Google Authenticator.' },
        { year: '2000s', title: 'Session Tokens and Web Cookies', description: 'Web applications use opaque session tokens stored in cookies. The server maintains session state mapped to the token ID. Every request carries the session cookie; the server looks up the session. Stateful — requires server-side storage.' },
        { year: '2006', title: 'OAuth 1.0 — Delegated Authorization', description: 'First standardized delegated authorization protocol. Allows third-party apps to access user data without sharing passwords. Introduces access tokens, request tokens, and the concept of token scopes — granular permissions attached to tokens.' },
        { year: '2012', title: 'OAuth 2.0 and JWT Standardization', description: 'OAuth 2.0 simplifies the authorization framework significantly. JSON Web Tokens (JWT/RFC 7519) emerge as the standard for stateless authentication — all claims are encoded in the token itself, signed by the server. No server session lookup needed for verification.' },
        { year: '2009', title: 'Bitcoin — Cryptocurrency Tokens', description: 'Bitcoin introduces the concept of digital tokens with cryptographic ownership — a token representing value on a distributed ledger. No central authority required. Later, Ethereum (2015) enables programmable tokens via smart contracts — the ERC-20 standard for fungible tokens and ERC-721 for non-fungible tokens (NFTs).' },
        { year: '2017', title: 'API Keys and Scoped Access Tokens', description: 'API keys become universal for developer access to SaaS platforms. The industry settles on short-lived tokens with scope limitations as the security best practice. Personal Access Tokens (PATs) on GitHub, scoped API keys in Stripe, and service account tokens in Google Cloud formalize this pattern.' },
        { year: '2020+', title: 'AI/LLM Tokens — Text Processing Units', description: 'Large language models use "tokens" as atomic units of text processing and pricing. Tokenization splits text into sub-word pieces — "unbelievable" becomes 3–4 tokens. Context windows, pricing, and rate limits are all measured in tokens. ~750 words ≈ 1000 tokens for most LLM models.' },
      ]} />

      <SectionHeader number={2} title="Types of Tokens in Modern Computing" />
      <KeyPointsGrid items={[
        { title: 'Authentication Tokens (JWT)', description: 'JSON Web Tokens encode identity claims in a signed structure: Header.Payload.Signature. Stateless — servers verify the signature without a database lookup. Standard for REST APIs, microservices, and SPAs. Claims include: user ID, email, roles, expiry (exp), issued-at (iat).' },
        { title: 'OAuth 2.0 Access Tokens', description: 'Grant delegated access to resources without exposing user credentials. Short-lived (15 minutes to 1 hour). Paired with long-lived refresh tokens for renewal. Scope-limited — "read:email" not "full account access." Bearer tokens are the most common format.' },
        { title: 'Refresh Tokens', description: 'Long-lived tokens (days to weeks) used exclusively to obtain new access tokens when the short-lived access token expires. Never sent to resource servers — only to the authorization server. Stored securely (HttpOnly cookies or encrypted storage). Can be revoked to force re-authentication.' },
        { title: 'API Keys', description: 'Long-lived credentials for developer API access. Simpler than OAuth but higher risk if exposed. Should be environment-specific, rotated regularly, and stored in environment variables (never in code). Rate-limited and scoped to specific operations in modern implementations.' },
        { title: 'CSRF Tokens', description: 'One-time tokens embedded in HTML forms to prevent cross-site request forgery attacks. Server generates a unique token per session, includes it in every form, and verifies it on submission. Stateful — server must track the token. Standard web security practice for any state-changing form action.' },
        { title: 'Blockchain Tokens', description: 'Digital assets on blockchain networks representing ownership, utility, or governance rights. Fungible tokens (ERC-20) are interchangeable — like currency. Non-fungible tokens (ERC-721, NFTs) are unique — like ownership certificates. Smart contracts define token rules without requiring a central authority.' },
        { title: 'AI/LLM Tokens', description: 'Sub-word text fragments used by language models for processing. Tokenization uses algorithms like Byte Pair Encoding (BPE) or SentencePiece. Context windows (4K, 32K, 128K, 1M tokens) define how much text a model can process at once. API pricing is per token (input + output separately).' },
        { title: 'TOTP/HOTP One-Time Tokens', description: 'Time-based (TOTP) or counter-based (HOTP) one-time passwords used for two-factor authentication. TOTP changes every 30 seconds based on the current time. Used by Google Authenticator, Authy, and hardware security keys. Standardized in RFC 6238 (TOTP) and RFC 4226 (HOTP).' },
      ]} />

      <SectionHeader number={3} title="JWT Anatomy and Structure" />
      <QuickFact color="blue" label="JWT structure">
        A JWT consists of three Base64url-encoded parts separated by dots: HEADER.PAYLOAD.SIGNATURE.
        The header specifies the algorithm (HS256, RS256, ES256).
        The payload contains claims (user ID, expiry, roles, email).
        The signature verifies that the token hasn't been tampered with.
        JWTs are signed but NOT encrypted by default — the payload is readable to anyone with the token.
        Decode any JWT at jwt.io.
      </QuickFact>
      <CodeBlock lang="javascript" title="JWT creation and verification (Node.js)">
{`// Creating a JWT (server-side)
const jwt = require('jsonwebtoken');

const payload = {
  sub: 'user_123',        // subject (user ID)
  email: 'alice@example.com',
  roles: ['user', 'admin'],
  iat: Math.floor(Date.now() / 1000),       // issued at (Unix timestamp)
  exp: Math.floor(Date.now() / 1000) + 3600, // expires in 1 hour
};

const token = jwt.sign(payload, process.env.JWT_SECRET, { algorithm: 'HS256' });
// Returns: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyXzEyMyJ9.signature

// Verifying a JWT (server-side, on each protected request)
try {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  console.log(decoded.sub);    // 'user_123'
  console.log(decoded.roles);  // ['user', 'admin']
} catch (err) {
  if (err.name === 'TokenExpiredError') {
    // Token is expired — require re-login or use refresh token
  } else if (err.name === 'JsonWebTokenError') {
    // Token is invalid/tampered — reject request
  }
}`}
      </CodeBlock>

      <SectionHeader number={4} title="Token Security Best Practices" />
      <KeyPointsGrid items={[
        { title: 'Short expiry for access tokens', description: 'Access tokens should expire in 15–60 minutes. This limits the damage if a token is intercepted. Use refresh tokens for maintaining sessions across token expiry. Never issue access tokens valid for days or weeks.' },
        { title: 'Store tokens securely', description: 'In browsers: store access tokens in memory (JS variable) for best security. If persistence is needed, use HttpOnly cookies (immune to XSS) or sessionStorage (cleared on tab close). Never store tokens in localStorage without XSS protection — malicious scripts can read it.' },
        { title: 'Use HTTPS always', description: 'Tokens transmitted over HTTP can be intercepted. All token-carrying requests must use HTTPS. Implement HSTS (HTTP Strict Transport Security) to prevent protocol downgrade attacks.' },
        { title: 'Implement token revocation', description: 'JWT statelessness makes revocation hard — once issued, a valid JWT cannot be invalidated until expiry. Solutions: use short expiry, maintain a token denylist in Redis, or use opaque tokens that can be revoked instantly. For high-security applications, short-lived JWTs + revocable refresh tokens is the standard pattern.' },
        { title: 'Scope tokens appropriately', description: 'Issue tokens with the minimum permissions needed for the operation. A token for reading user profile shouldn\'t also have permission to modify it or delete the account. Scope separation reduces the blast radius of a compromised token.' },
      ]} />

      <AlertBox type="warning" title="JWT is signed, not encrypted">
        The payload of a standard JWT (using HS256, RS256) is only Base64-encoded, not encrypted.
        Anyone who has the token can decode and read the payload — including any sensitive data you put in claims.
        Never put passwords, credit card numbers, or other secrets in JWT payload.
        For encrypted JWTs, use JWE (JSON Web Encryption) with an encryption algorithm.
      </AlertBox>

      <FAQAccordion items={[
        {
          question: 'What is the difference between a token and a session?',
          answer: 'Session: the server stores user state in a database or memory and gives the client an opaque session ID. Stateful — the server must look up session data on every request. Scales poorly across multiple servers without shared storage. Easy to invalidate immediately. Token (JWT): all state is encoded in the token itself. Stateless — the server just verifies the signature without a database lookup. Scales well across distributed systems. Hard to invalidate before expiry.',
        },
        {
          question: 'What are AI tokens and why do they matter for pricing?',
          answer: 'LLMs process text as tokens — sub-word pieces rather than whole words. The tokenizer splits "unbelievable" into something like ["un", "believ", "able"] (roughly 3 tokens). OpenAI, Anthropic, and Google charge per token for both input (your prompt) and output (the model\'s response). A 10-page document is typically 3,000–5,000 tokens. A 128K context window means the model can "see" roughly 100,000 words at once. Understanding token counts helps estimate API costs and stay within context limits.',
        },
        {
          question: 'Should I use JWT or session cookies for web authentication?',
          answer: 'For traditional server-rendered web apps: session cookies (HttpOnly, SameSite=Strict) are simpler, more secure by default against XSS and CSRF, and easier to invalidate immediately. For REST APIs with mobile or SPA clients: JWT works well for stateless, multi-service architectures. For mobile apps: JWT stored in secure device storage (Keychain on iOS, Keystore on Android). The key question: do you need statelessness or cross-domain authentication? If not, sessions are often the safer and simpler choice.',
        },
        {
          question: 'What is the difference between an access token and a refresh token?',
          answer: 'Access tokens are short-lived (15–60 minutes) and sent with every API request to prove identity. If intercepted, they expire quickly. Refresh tokens are long-lived (days to weeks) and stored securely — only sent to the authorization server to get a new access token when the old one expires. Refresh tokens can be revoked (unlike stateless JWTs), giving you a way to force re-authentication. This two-token pattern balances security (short-lived access) with user experience (don\'t force login every hour).',
        },
        {
          question: 'How do blockchain tokens differ from authentication tokens?',
          answer: 'Authentication tokens (JWT, session) prove identity and grant access to a system. Blockchain tokens are digital assets on a distributed ledger — they represent ownership, currency value, voting rights, or utility within a protocol. Blockchain tokens use cryptographic keys (private key signing) rather than server-side secrets for verification. They\'re "owned" by whoever holds the corresponding private key, with no central authority. Authentication tokens expire; blockchain tokens persist until transferred or burned.',
        },
        {
          question: 'What is token introspection in OAuth 2.0?',
          answer: 'Token introspection (RFC 7662) allows a resource server to query an authorization server to validate an opaque access token and retrieve its metadata (scopes, expiry, user info). Unlike JWT verification (which is done locally by checking the signature), opaque token validation requires a network call to the authorization server. Introspection is slower but allows immediate revocation — if a token is revoked, the introspection endpoint returns active: false immediately.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
