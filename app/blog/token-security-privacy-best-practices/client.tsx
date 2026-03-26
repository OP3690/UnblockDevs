'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, FlowDiagram, CompareTable, ErrorFix, VerticalSteps,
  CodeBlock, FAQAccordion, KeyPointsGrid, StatGrid, SectionHeader,
  QuickFact,
} from '@/components/blog/BlogVisuals';

export default function TokenSecurityPrivacyBestPracticesClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>Token Security & Privacy Best Practices — JWT, API Keys, Sessions</h1>
      <p className="lead">
        Tokens are the keys to your kingdom. A leaked JWT, exposed API key, or misconfigured session cookie
        can give attackers full access to user accounts or backend systems. This guide covers the concrete
        security practices every developer should follow — with code examples and common mistakes to avoid.
      </p>

      <StatGrid
        stats={[
          { value: '#1', label: 'cause of data breaches: stolen credentials', color: 'red' },
          { value: '84%', label: 'of breaches involve human element', color: 'amber' },
          { value: '15 min', label: 'to implement all practices here', color: 'green' },
          { value: '$4.45M', label: 'average data breach cost (2023)', color: 'blue' },
        ]}
      />

      <SectionHeader number={1} title="JWT Security: What Most Developers Get Wrong" />
      <p>
        JWTs are not encrypted by default — they're base64-encoded and signed. Anyone can decode the payload.
        The signature only proves the token hasn't been tampered with.
      </p>

      <AlertBox type="warning" title="JWT payloads are publicly readable">
        <code>atob(token.split('.')[1])</code> reveals the full payload in any browser console.
        Never put sensitive data (passwords, SSNs, PII) in a JWT payload.
      </AlertBox>

      <ErrorFix
        bad={`// Never store sensitive data in JWT payload
const token = jwt.sign({
  userId: 123,
  email: 'user@example.com',
  password: 'hashed_password',   // ← NEVER
  ssn: '123-45-6789',            // ← NEVER
  creditCard: '4111111111111111', // ← NEVER
}, secret);`}
        good={`// Only store non-sensitive identifiers in JWT
const token = jwt.sign({
  sub: '123',       // user ID (not sensitive)
  role: 'user',     // permission level
  iat: Date.now(),  // issued at
}, secret, { expiresIn: '15m' });  // SHORT expiry!`}
        badLabel="Sensitive data in JWT"
        goodLabel="Safe JWT payload"
      />

      <KeyPointsGrid
        columns={2}
        items={[
          {
            title: 'Short expiry times',
            description: 'Access tokens: 15 minutes. Refresh tokens: 7-30 days. Short-lived tokens limit the damage window if stolen.',
          },
          {
            title: 'Use strong secrets',
            description: 'JWT secret must be at least 256 bits (32 bytes) of random data. Use: openssl rand -hex 32',
          },
          {
            title: 'Verify algorithm',
            description: 'Always specify the expected algorithm when verifying: jwt.verify(token, secret, { algorithms: ["HS256"] }). Prevents the "alg: none" attack.',
          },
          {
            title: 'Use RS256 for distributed systems',
            description: 'HS256 requires all services to share the secret. RS256 uses a key pair — only the auth server holds the private key; others verify with the public key.',
          },
        ]}
      />

      <SectionHeader number={2} title="Where to Store Tokens" />
      <p>
        Where you store tokens in the browser determines your attack surface. Both options have trade-offs.
      </p>

      <CompareTable
        leftLabel="localStorage / sessionStorage"
        rightLabel="HttpOnly Cookie"
        rows={[
          { label: 'XSS vulnerable?', left: '✅ Yes — any JS can read it', right: '❌ No — JS cannot access HttpOnly cookies' },
          { label: 'CSRF vulnerable?', left: '❌ No — must be sent manually', right: '✅ Yes — auto-sent with requests' },
          { label: 'Easy to implement?', left: '✅ Yes', right: '⚠️ Requires CSRF protection' },
          { label: 'Recommended for?', left: 'Low-risk tokens, short sessions', right: 'Auth tokens, sensitive sessions' },
          { label: 'Defense needed', left: 'Strong CSP, sanitize all user input', right: 'SameSite=Strict or CSRF tokens' },
        ]}
      />

      <AlertBox type="tip" title="Recommended: HttpOnly + SameSite=Strict cookie">
        For authentication tokens, use HttpOnly cookies with SameSite=Strict (or Lax for cross-site flows).
        This protects against XSS token theft — the most common attack vector.
      </AlertBox>

      <CodeBlock language="javascript" filename="Setting a secure auth cookie (Node.js)">
{`res.cookie('accessToken', token, {
  httpOnly: true,       // JS cannot access
  secure: true,         // HTTPS only
  sameSite: 'strict',   // No cross-site sending
  maxAge: 15 * 60 * 1000, // 15 minutes
  path: '/',
});`}
      </CodeBlock>

      <SectionHeader number={3} title="API Key Security" />

      <ErrorFix
        bad={`// Never hardcode API keys in source code
const stripe = new Stripe('sk_live_abc123...real_key');

// Never commit them to Git
// .env file with real key committed to repo = disaster`}
        good={`// Always use environment variables
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// .env file (NEVER commit this)
// STRIPE_SECRET_KEY=sk_live_...

// .env.example (safe to commit — shows structure)
// STRIPE_SECRET_KEY=your_stripe_secret_key_here`}
        badLabel="Hardcoded key"
        goodLabel="Environment variable"
      />

      <VerticalSteps
        steps={[
          {
            title: 'Add .env to .gitignore immediately',
            description: 'Before you ever type a real secret. If you accidentally committed a key — rotate it immediately, then remove it from history.',
            code: 'echo ".env" >> .gitignore',
          },
          {
            title: 'Rotate leaked keys immediately',
            description: 'If a key appears in git history, in logs, or anywhere public — assume it\'s compromised. Rotate in your provider\'s dashboard before doing anything else.',
          },
          {
            title: 'Use least-privilege API keys',
            description: 'Create keys with only the permissions they need. Read-only keys for read-only operations. Scoped to specific resources if possible.',
          },
          {
            title: 'Set up secret scanning',
            description: 'GitHub has built-in secret scanning that alerts you when a key is pushed. Enable it on all repos.',
            code: 'Settings → Security → Secret scanning → Enable',
          },
          {
            title: 'Use a secrets manager in production',
            description: 'AWS Secrets Manager, GCP Secret Manager, HashiCorp Vault — don\'t use .env files on production servers.',
          },
        ]}
      />

      <SectionHeader number={4} title="Refresh Token Rotation" />
      <p>
        Short-lived access tokens + long-lived refresh tokens is the standard pattern. Rotation ensures
        that if a refresh token is stolen, using the old one immediately invalidates the new one.
      </p>

      <FlowDiagram
        steps={[
          { label: 'Access token expires (15 min)', color: 'amber' },
          { label: 'Client sends refresh token', color: 'blue' },
          { label: 'Server validates refresh token', color: 'amber' },
          { label: 'Issue new access token + new refresh token', color: 'green' },
          { label: 'Invalidate old refresh token (rotation)', color: 'green' },
        ]}
      />

      <CodeBlock language="javascript" filename="Refresh Token Rotation (Node.js)">
{`app.post('/auth/refresh', async (req, res) => {
  const { refreshToken } = req.cookies;

  // Verify refresh token
  const payload = jwt.verify(refreshToken, REFRESH_SECRET);

  // Check it exists in DB (not revoked)
  const stored = await db.refreshTokens.findOne({ token: refreshToken, userId: payload.sub });
  if (!stored) return res.status(401).json({ error: 'Invalid refresh token' });

  // Rotate: delete old, create new
  await db.refreshTokens.delete({ token: refreshToken });
  const newRefreshToken = crypto.randomBytes(32).toString('hex');
  await db.refreshTokens.create({ token: newRefreshToken, userId: payload.sub });

  // Issue new access token
  const accessToken = jwt.sign({ sub: payload.sub }, ACCESS_SECRET, { expiresIn: '15m' });

  res.cookie('refreshToken', newRefreshToken, { httpOnly: true, secure: true });
  res.json({ accessToken });
});`}
      </CodeBlock>

      <SectionHeader number={5} title="Token Revocation" />
      <p>
        JWTs are stateless — once issued, they're valid until they expire. To revoke them before expiry
        (logout, password change, account compromise), you need a revocation strategy.
      </p>

      <CompareTable
        leftLabel="Short expiry (15 min)"
        rightLabel="Blocklist/Denylist"
        rows={[
          { label: 'Complexity', left: 'Simple — no server state', right: 'Requires DB lookup per request' },
          { label: 'Revocation speed', left: 'Up to 15 min before token expires', right: 'Immediate' },
          { label: 'Scalability', left: 'Stateless — scales perfectly', right: 'DB lookup on every authenticated request' },
          { label: 'Best for', left: 'Most apps — good enough', right: 'High-security apps, immediate logout requirements' },
        ]}
      />

      <FAQAccordion
        items={[
          {
            question: 'Is it safe to store JWTs in localStorage?',
            answer: 'It\'s risky if your app has any XSS vulnerability — malicious scripts can read localStorage. HttpOnly cookies are safer for auth tokens. That said, many apps use localStorage successfully by maintaining a strong Content Security Policy and sanitizing all user input.',
          },
          {
            question: 'What is the "alg: none" attack?',
            answer: 'Some JWT libraries used to accept tokens with "alg": "none" in the header, bypassing signature verification entirely. An attacker could forge any payload. Always specify the expected algorithm when verifying: { algorithms: ["HS256"] }.',
          },
          {
            question: 'What happens when my JWT secret leaks?',
            answer: 'Immediately rotate the secret. All existing JWTs signed with the old secret become invalid — users will need to log in again. This is actually the desired behavior during a breach. Store your JWT secret in a secrets manager, not in .env files on servers.',
          },
          {
            question: 'Should I use JWT or sessions?',
            answer: 'Sessions (server-side storage + cookie with session ID) are simpler, easier to revoke, and well-understood. JWTs are useful when you need stateless auth across multiple services or microservices. For a single monolith — sessions are often better. For distributed APIs — JWTs shine.',
          },
          {
            question: 'How do I detect if someone else is using my token?',
            answer: 'Implement refresh token rotation with family tracking. If a refresh token that was already rotated is used again, it means an attacker stole it. Revoke the entire token family for that user (force all sessions to log out) and alert the user.',
          },
        ]}
      />
    </BlogLayoutWithSidebarAds>
  );
}
