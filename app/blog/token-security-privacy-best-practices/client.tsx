'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CompareTable, ErrorFix, VerticalSteps,
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
            desc: 'Before you ever type a real secret. If you accidentally committed a key — rotate it immediately, then remove it from history with git filter-branch or BFG Repo Cleaner.',
          },
          {
            title: 'Rotate leaked keys immediately',
            desc: 'If a key appears in git history, in logs, or anywhere public — assume it\'s compromised. Rotate in your provider\'s dashboard before doing anything else.',
          },
          {
            title: 'Use least-privilege API keys',
            desc: 'Create keys with only the permissions they need. Read-only keys for read-only operations. Scoped to specific resources if possible.',
          },
          {
            title: 'Set up secret scanning',
            desc: 'GitHub has built-in secret scanning that alerts you when a key is pushed. Enable it under Settings → Security → Secret scanning on all repos.',
          },
          {
            title: 'Use a secrets manager in production',
            desc: 'AWS Secrets Manager, GCP Secret Manager, HashiCorp Vault — don\'t use .env files on production servers. These tools provide audit logs, automatic rotation, and fine-grained access control.',
          },
        ]}
      />

      <SectionHeader number={4} title="Refresh Token Rotation" />
      <p>
        Short-lived access tokens + long-lived refresh tokens is the standard pattern. Rotation ensures
        that if a refresh token is stolen, using the old one immediately invalidates the new one.
      </p>

      <KeyPointsGrid
        columns={2}
        items={[
          {
            title: 'How rotation works',
            description: 'When a client uses a refresh token, the server issues a new access token AND a new refresh token, then invalidates the old refresh token. Each refresh is a one-time use.',
          },
          {
            title: 'Reuse detection',
            description: 'If a refresh token is presented that was already rotated, it means it was stolen and reused. Immediately revoke the entire token family and log out the user.',
          },
          {
            title: 'Token families',
            description: 'Group related tokens in a "family." If any member of the family is replayed, revoke all tokens in that family — logging out all sessions for that user.',
          },
          {
            title: 'Silent refresh',
            description: 'Implement a background refresh mechanism so the access token is silently renewed before expiry. Users stay logged in without interruption while maintaining security.',
          },
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

      <SectionHeader number={6} title="Session Security vs JWT — Choosing the Right Approach" />
      <p>
        Sessions and JWTs are not the same thing. Understanding their differences helps you pick the right
        authentication strategy for your application architecture.
      </p>

      <CompareTable
        leftLabel="Server-Side Sessions"
        rightLabel="JWT Tokens"
        rows={[
          { label: 'State storage', left: 'Server stores session data (DB/Redis)', right: 'Client stores token; server is stateless' },
          { label: 'Revocation', left: 'Instant — delete from session store', right: 'Requires blocklist or short expiry' },
          { label: 'Scalability', left: 'Requires shared session store across servers', right: 'Stateless — works across any server' },
          { label: 'Microservices', left: 'All services need session store access', right: 'Each service validates token independently' },
          { label: 'Payload size', left: 'Tiny cookie (just a session ID)', right: 'Larger — all claims embedded in token' },
          { label: 'Best fit', left: 'Monolith apps, when instant revocation needed', right: 'Distributed systems, APIs, microservices' },
        ]}
      />

      <SectionHeader number={7} title="OAuth 2.0 Token Security" />
      <p>
        Many applications use OAuth 2.0 for third-party authentication (Sign in with Google, GitHub, etc.).
        OAuth tokens have their own security considerations beyond standard JWTs.
      </p>

      <CodeBlock language="javascript" filename="OAuth State Parameter (CSRF Prevention)">
{`// When initiating OAuth flow, generate a random state
const state = crypto.randomBytes(32).toString('hex');

// Store in session/cookie
req.session.oauthState = state;

// Add to authorization URL
const authUrl = \`https://accounts.google.com/o/oauth2/v2/auth?
  client_id=\${CLIENT_ID}
  &redirect_uri=\${REDIRECT_URI}
  &response_type=code
  &scope=openid+email+profile
  &state=\${state}\`;  // ← critical anti-CSRF parameter

// On callback — ALWAYS verify state matches
app.get('/auth/callback', (req, res) => {
  if (req.query.state !== req.session.oauthState) {
    return res.status(403).json({ error: 'State mismatch — potential CSRF attack' });
  }
  // Proceed with code exchange...
});`}
      </CodeBlock>

      <AlertBox type="warning" title="Never skip the OAuth state parameter">
        Omitting the state parameter in OAuth flows makes your application vulnerable to CSRF attacks
        where an attacker can link their account to a victim's session. Always generate a random state,
        store it server-side, and verify it matches on the callback before exchanging the code.
      </AlertBox>

      <SectionHeader number={8} title="Security Headers That Protect Tokens" />

      <CodeBlock language="javascript" filename="Essential Security Headers (Express.js + Helmet)">
{`import helmet from 'helmet';

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],     // No inline scripts — protects against XSS
      styleSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "https://api.yourservice.com"],
      frameSrc: ["'none'"],      // No iframes
      objectSrc: ["'none'"],
    },
  },
  hsts: {
    maxAge: 31536000,           // 1 year
    includeSubDomains: true,
    preload: true,              // HTTPS only — tokens never sent over HTTP
  },
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
}));

// Additional CORS configuration
app.use(cors({
  origin: ['https://yourapp.com'],   // Whitelist only your domain
  credentials: true,                 // Allow cookies
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));`}
      </CodeBlock>

      <QuickFact color="red" label="Most common token leak vectors">
        Browser developer tools (localStorage inspection), accidentally committed .env files,
        server logs that print request headers (including Authorization bearer tokens),
        insecure HTTP connections, and third-party JavaScript with access to the page DOM.
        Strong CSP headers and HttpOnly cookies mitigate most of these attack surfaces.
      </QuickFact>

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
          {
            question: 'What is token binding and should I implement it?',
            answer: 'Token binding cryptographically ties a token to a specific TLS connection, preventing token theft even if intercepted. It\'s a strong security feature but requires browser and server support. For most applications, short-lived tokens with HttpOnly cookies + HTTPS provide sufficient protection without the complexity of token binding.',
          },
          {
            question: 'How do I handle token expiry gracefully in the frontend?',
            answer: 'Implement an interceptor (Axios interceptors, fetch middleware) that catches 401 responses. When a 401 is received, automatically attempt a token refresh using your refresh token. If refresh succeeds, replay the original request. If refresh fails (token expired or revoked), redirect the user to the login page. This creates seamless sessions without interrupting the user.',
          },
          {
            question: 'Should I use opaque tokens or JWTs for public APIs?',
            answer: 'For public APIs where clients are third-party apps (OAuth), opaque tokens (random strings stored server-side) are often better. They allow instant revocation, have no payload to decode, and leak no information. JWTs work well for internal APIs where services trust each other and statelessness is valuable. Many modern APIs use both: opaque tokens for external clients, JWTs for internal service-to-service calls.',
          },
        ]}
      />
    </BlogLayoutWithSidebarAds>
  );
}
