'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CodeBlock, FAQAccordion, KeyPointsGrid,
  StatGrid, SectionHeader, QuickFact, CompareTable, VerticalSteps, FlowDiagram, ToolCTA,
} from '@/components/blog/BlogVisuals';

export default function JwtCompleteGuideClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>JWT (JSON Web Tokens) Complete Guide 2026: Authentication Explained from Scratch</h1>
      <p className="lead">
        Every modern application needs authentication. JWT is the most widely-deployed stateless auth
        standard in 2026 &mdash; powering APIs at Google, Stripe, GitHub, and millions of services worldwide.
        Yet most developers copy-paste JWT code without understanding how it works, when to use it,
        or the security traps that get real apps compromised. This guide covers everything: the exact
        anatomy of a token, the full sign &rarr; store &rarr; verify &rarr; refresh flow, production-ready
        Node.js code, a React auto-refresh hook, algorithm selection (HS256 vs RS256 vs ES256), and the
        five JWT security mistakes you must avoid in production.
      </p>

      <StatGrid stats={[
        { value: '73%', label: 'of public APIs use JWT as their primary authentication mechanism in 2026', color: 'blue' },
        { value: '3',   label: 'parts in every JWT — header · payload · signature — separated by dots', color: 'violet' },
        { value: '15m', label: 'recommended access token lifetime — anything longer is a security risk', color: 'amber' },
        { value: '0',   label: 'database lookups required to verify a JWT — purely cryptographic', color: 'green' },
      ]} />

      <SectionHeader number={1} title="Definition: What Is a JSON Web Token?" />

      <QuickFact color="blue" label="JWT = a compact, self-contained, cryptographically signed proof of identity">
        A JSON Web Token is a URL-safe string that encodes a set of &ldquo;claims&rdquo; &mdash; facts
        about a user or system &mdash; and signs them so they cannot be modified without detection.
        The signature is mathematical proof: alter even one character in the payload and the entire
        signature becomes invalid. No database lookup required on the verifying server &mdash; just
        a cryptographic computation that takes microseconds.
      </QuickFact>

      <p>
        Every JWT is three Base64URL-encoded strings joined by dots (<code>header.payload.signature</code>).
        Paste any JWT into <strong>jwt.io</strong> and it instantly separates into three sections.
        Important: Base64URL encoding is <em>not</em> encryption &mdash; the payload is readable by
        anyone holding the token.
      </p>

      <CodeBlock language="text" filename="JWT anatomy — a real token decoded into its three parts">
{`// A JWT (access token, shortened for readability)
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
  .eyJzdWIiOiJ1c2VyXzEyMyIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcxNjAwMDAwMCwiZXhwIjoxNzE2MDAwOTAwfQ
  .SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

// ── PART 1: Header ────────────────────────────────────────────────────────
{
  "alg": "HS256",    // Signing algorithm — HMAC-SHA256
  "typ": "JWT"       // Token type
}

// ── PART 2: Payload (Claims) ──────────────────────────────────────────────
{
  "sub": "user_123",         // Subject — who this token represents
  "role": "admin",           // Custom claim — your business data
  "plan": "pro",             // Custom claim — subscription tier
  "iat": 1716000000,         // Issued At — Unix seconds
  "exp": 1716000900,         // Expires At — exactly 15 minutes later
  "iss": "api.myapp.com"    // Issuer — who created this token
}

// ── PART 3: Signature ─────────────────────────────────────────────────────
// HMACSHA256(
//   base64url(header) + "." + base64url(payload),
//   SECRET_KEY
// )
// If header or payload changes by even 1 bit → signature mismatch → rejected`}
      </CodeBlock>

      <AlertBox type="warning" title="JWTs are encoded, not encrypted — never put secrets in the payload">
        The header and payload are Base64URL-encoded, which any developer can decode in two seconds.
        Only store non-sensitive identifiers: user ID, role, subscription plan, and standard claims.
        Never store passwords, API keys, credit card data, or private PII. The signature proves the
        data has not been tampered with &mdash; it does not hide the data from the token holder.
      </AlertBox>

      <SectionHeader number={2} title="When to Use JWT — and When Not To" />

      <p>
        JWT is a tool, not a universal solution. Choosing the wrong auth mechanism causes both
        security problems and unnecessary complexity. Here is a clear decision guide.
      </p>

      <KeyPointsGrid columns={2} items={[
        {
          title: '✅ Stateless microservices',
          description: 'Each service can verify identity independently using only the public key (RS256) or shared secret (HS256) — no round-trip to a central auth server per request. This is the core value of JWT: zero shared session state between services at runtime.',
        },
        {
          title: '✅ Mobile and single-page apps',
          description: 'SPAs and native mobile apps do not have a server-side session store. JWT in memory (SPA) or platform secure storage (mobile Keychain / Android Keystore) is the natural fit. The Authorization header crosses domains cleanly — no cookie scoping issues.',
        },
        {
          title: '✅ Cross-domain and third-party APIs',
          description: 'Cookies are domain-scoped and require careful SameSite configuration. JWT in the Authorization header works uniformly across all domains, CDNs, and third-party integrations — no CORS cookie preflight complications.',
        },
        {
          title: '❌ When you need instant session revocation',
          description: 'You cannot revoke a JWT before it expires without a blocklist database — which reintroduces statefulness. Banking apps, medical records, or any session that must be killed the moment a user reports a stolen device: use server-side sessions where you can delete the session row immediately.',
        },
        {
          title: '❌ Server-rendered apps with native session support',
          description: 'Rails, Django, Laravel, and Next.js server components already have excellent HttpOnly cookie sessions. Adding JWT to a server-rendered app adds complexity with no benefit. Use the platform session mechanism and save JWT for API layers.',
        },
        {
          title: '❌ Storing sensitive data in the token',
          description: 'If the content of the token must be kept secret from the client, you need JWE (JSON Web Encryption) — a different, more complex standard. Plain JWT is not the tool for carrying private data. Use it only for data the client is allowed to see.',
        },
      ]} />

      <SectionHeader number={3} title="How JWT Authentication Works — The Complete Flow" />

      <FlowDiagram title="JWT Auth Flow — from Login to Every Protected API Request" steps={[
        { label: 'POST /auth/login',            desc: 'Client sends credentials. Server verifies bcrypt/argon2 hash. Wrong password → 401 immediately.', color: 'blue' },
        { label: 'Server signs two tokens',      desc: 'On success: access token (15 min, HS256/RS256) + refresh token (7 days, different secret, includes jti claim).', color: 'violet' },
        { label: 'Tokens delivered to client',   desc: 'Access token: JSON response body. Refresh token: HttpOnly + Secure + SameSite=Strict cookie — JS cannot read it.', color: 'green' },
        { label: 'Client stores access token',   desc: 'In-memory only: React state, a closure, or a ref. NEVER localStorage. NEVER sessionStorage.', color: 'amber' },
        { label: 'Every API request',            desc: 'Authorization: Bearer <access_token>. Server verifies signature — pure math, zero DB lookup, sub-millisecond.', color: 'blue' },
        { label: 'Access token expires → 401',   desc: 'Client detects TOKEN_EXPIRED code. Calls POST /auth/refresh. Browser auto-sends HttpOnly cookie.', color: 'violet' },
        { label: 'New access token issued',      desc: 'Server validates refresh token + checks revocation list (Redis). Issues new access token. Client retries original request.', color: 'green' },
        { label: 'Logout',                       desc: 'Server deletes refresh token from store. Client clears in-memory access token. Old access token valid max 15 min — acceptable trade-off.', color: 'amber' },
      ]} />

      <SectionHeader number={4} title="How to Implement JWT in Node.js — Production Code" />

      <CodeBlock language="javascript" filename="jwt-auth.js — sign, verify middleware, refresh handler">
{`import jwt from 'jsonwebtoken';
import { randomBytes } from 'crypto';

const ACCESS_SECRET  = process.env.JWT_ACCESS_SECRET;   // 256-bit random string
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;  // DIFFERENT secret from access

// ── Sign — called on successful login ─────────────────────────────────────
function signTokens(userId, role) {
  const accessToken = jwt.sign(
    { sub: userId, role, type: 'access' },
    ACCESS_SECRET,
    { expiresIn: '15m', issuer: 'api.myapp.com' }
  );

  const refreshToken = jwt.sign(
    {
      sub: userId,
      type: 'refresh',
      jti: randomBytes(16).toString('hex'), // unique ID for revocation
    },
    REFRESH_SECRET,
    { expiresIn: '7d', issuer: 'api.myapp.com' }
  );

  return { accessToken, refreshToken };
}

// ── Middleware — runs on every protected route ─────────────────────────────
function requireAuth(req, res, next) {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing token', code: 'NO_TOKEN' });
  }

  try {
    const payload = jwt.verify(header.slice(7), ACCESS_SECRET, {
      issuer: 'api.myapp.com',
      // jwt.verify throws automatically on: expired, bad signature, wrong issuer
    });

    if (payload.type !== 'access') {
      return res.status(401).json({ error: 'Wrong token type', code: 'WRONG_TYPE' });
    }

    req.user = { id: payload.sub, role: payload.role };
    next();
  } catch (err) {
    const code = err.name === 'TokenExpiredError' ? 'TOKEN_EXPIRED' : 'INVALID_TOKEN';
    return res.status(401).json({ error: err.message, code });
  }
}

// ── Refresh endpoint — POST /auth/refresh ─────────────────────────────────
async function refreshHandler(req, res) {
  const refreshToken = req.cookies.refreshToken; // HttpOnly cookie, auto-sent
  if (!refreshToken) return res.status(401).json({ error: 'No refresh token' });

  try {
    const payload = jwt.verify(refreshToken, REFRESH_SECRET, {
      issuer: 'api.myapp.com',
    });

    // Check revocation (Redis) — catches stolen refresh tokens that were already used
    const isRevoked = await redis.get(\`revoked:\${payload.jti}\`);
    if (isRevoked) {
      return res.status(401).json({ error: 'Refresh token revoked', code: 'REVOKED' });
    }

    // Rotate: invalidate old refresh token, issue new one (refresh token rotation)
    await redis.set(\`revoked:\${payload.jti}\`, '1', 'EX', 7 * 86400);

    const { accessToken, refreshToken: newRefreshToken } = signTokens(
      payload.sub,
      await getUserRole(payload.sub)
    );

    // Set new refresh token cookie
    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ accessToken });
  } catch {
    res.status(401).json({ error: 'Invalid refresh token', code: 'INVALID_REFRESH' });
  }
}`}
      </CodeBlock>

      <CodeBlock language="typescript" filename="useAuthFetch.ts — React hook with automatic silent token refresh">
{`import { useCallback, useRef } from 'react';

// Drop-in replacement for fetch() — handles token injection and auto-refresh
export function useAuthFetch() {
  const tokenRef = useRef<string | null>(null);

  const authFetch = useCallback(async (url: string, init: RequestInit = {}) => {
    const headers = new Headers(init.headers);

    if (tokenRef.current) {
      headers.set('Authorization', \`Bearer \${tokenRef.current}\`);
    }

    let res = await fetch(url, { ...init, headers });

    // On token expiry — silently refresh and retry once
    if (res.status === 401) {
      const body = await res.clone().json().catch(() => ({}));

      if (body.code === 'TOKEN_EXPIRED') {
        const refreshRes = await fetch('/api/auth/refresh', {
          method: 'POST',
          credentials: 'include', // sends the HttpOnly refresh cookie automatically
        });

        if (refreshRes.ok) {
          const { accessToken } = await refreshRes.json();
          tokenRef.current = accessToken;
          headers.set('Authorization', \`Bearer \${accessToken}\`);
          res = await fetch(url, { ...init, headers }); // retry original request
        }
      }
    }

    return res;
  }, []);

  return {
    authFetch,
    setToken:   (token: string) => { tokenRef.current = token; },
    clearToken: ()              => { tokenRef.current = null;  },
  };
}

// Usage in a component:
// const { authFetch, setToken } = useAuthFetch();
// setToken(accessTokenFromLogin);
// const data = await authFetch('/api/profile').then(r => r.json());`}
      </CodeBlock>

      <SectionHeader number={5} title="Why JWT — Algorithm Choice and the Security Model" />

      <p>
        The algorithm you choose determines your entire security model for token verification.
        Getting this wrong in a multi-service architecture means a single compromised service can
        forge tokens for every other service.
      </p>

      <CompareTable
        headers={['Factor', 'HS256 (HMAC-SHA256)', 'RS256 (RSA-SHA256)', 'ES256 (ECDSA-P256)']}
        rows={[
          ['Key type',         'Symmetric — one shared secret',          'Asymmetric — private signs, public verifies',   'Asymmetric — elliptic curve key pair'],
          ['Key distribution', 'Every verifier shares the secret — risky', 'Public key safe to distribute freely',          'Public key safe to distribute freely'],
          ['Performance',      'Fastest — single HMAC hash',             'Slowest — RSA math is expensive',               'Fast — elliptic curve is efficient'],
          ['Token size',       'Smallest signature',                     'Largest (2048-bit RSA signature)',               'Small (comparable to HS256)'],
          ['Compromise impact','One leaked secret = all tokens invalid',  'Only private key matters — public key is safe', 'Only private key matters — public key is safe'],
          ['Best for',         'Single server / trusted monolith',       'Microservices, third-party API consumers',       'Mobile, IoT, high-throughput modern APIs'],
          ['2026 verdict',     'OK for simple apps',                     'Standard for distributed systems',              'Preferred for new architectures'],
        ]}
      />

      <AlertBox type="tip" title="5 JWT security rules that stop 95% of attacks">
        1. <strong>Short access token TTL (15 minutes max)</strong> — bounds the damage window of any stolen token.{' '}
        2. <strong>Access token in memory only</strong> — never localStorage, never sessionStorage. XSS exposes both.{' '}
        3. <strong>HttpOnly cookie for refresh token</strong> — the browser sends it automatically; JavaScript cannot read it.{' '}
        4. <strong>Rotate refresh tokens on every use</strong> — detect stolen tokens when the legitimate user next refreshes.{' '}
        5. <strong>Validate the alg header</strong> — explicitly reject tokens where alg is &ldquo;none&rdquo;; this is a documented attack.
      </AlertBox>

      <SectionHeader number={6} title="JWT vs Session Cookies vs OAuth 2.0 — Decision Chart" />

      <CompareTable
        headers={['Feature', 'JWT Stateless', 'Session Cookies', 'OAuth 2.0']}
        rows={[
          ['Server storage',     'None — zero runtime state',          'Session store (Redis / DB)',              'Auth server stores tokens'],
          ['Instant revocation', '❌ Needs a blocklist (Redis)',        '✅ Delete one row — immediate',           '✅ Revoke at auth server'],
          ['Cross-domain APIs',  '✅ Authorization header works anywhere', '❌ Cookie domain scoping complications', '✅ Designed for cross-domain'],
          ['Mobile apps',        '✅ No cookie jar — Authorization header', '⚠️ Possible but awkward',             '✅ Standard OAuth PKCE flow'],
          ['Microservices',      '✅ Each service verifies independently', '❌ Needs sticky sessions or shared Redis', '✅ Centralized at auth server'],
          ['Third-party login',  '❌ Not its purpose',                  '❌ Not its purpose',                     '✅ Purpose-built for this'],
          ['Best use case',      'Stateless APIs, SPAs, mobile apps',  'Server-rendered apps, admin dashboards', '"Sign in with Google" / B2B SSO'],
        ]}
      />

      <ToolCTA
        href="/json-error-explainer"
        title="Debugging a JWT Payload or JSON Auth Response?"
        description="Paste any malformed JWT payload, JSON auth error response, or API JSON — our AI Error Explainer identifies every syntax issue with plain-English explanations and one-click auto-fix."
        buttonText="Open JSON Error Explainer →"
        color="violet"
      />

      <FAQAccordion items={[
        {
          question: 'Can I store JWT in localStorage?',
          answer: 'Technically yes, practically no. Any JavaScript on your page — including third-party analytics, chat widgets, or A/B testing scripts — can read localStorage. A single XSS vulnerability exposes every user\'s token permanently. The correct pattern: access token in JavaScript memory (a React ref or closure), refresh token in an HttpOnly cookie set by the server. JavaScript cannot read HttpOnly cookies at all — not even your own code.',
        },
        {
          question: 'How do I log a user out if I cannot revoke a JWT?',
          answer: 'For the access token: clear it from memory client-side. It becomes technically valid until expiry (max 15 minutes) but the user has no way to send it without your app. For the refresh token: call a logout endpoint that deletes or revokes the refresh token server-side. Optionally, add the access token\'s JTI to a Redis blocklist that expires at the same time as the token — this gives true instant revocation for the remaining TTL window without permanent database overhead.',
        },
        {
          question: 'What JWT claims should I always include?',
          answer: 'Required: sub (subject — user ID), iat (issued at — Unix seconds), exp (expires at — Unix seconds). Recommended: iss (issuer — your API domain, helps reject tokens from other sources), jti (JWT ID — a UUID, enables token-level revocation). Custom: role, plan, or any non-sensitive data you need on every request. Keep payloads under 500 bytes — the token is sent with every request and contributes to network overhead at scale.',
        },
        {
          question: 'What is refresh token rotation and why does it matter?',
          answer: 'Rotation means: every time a refresh token is used, the server issues a brand new refresh token and immediately invalidates the old one. This creates a theft detection mechanism. If an attacker steals your refresh token and uses it, and then the legitimate user tries to refresh, the server detects an already-used token and revokes the entire session. Without rotation, a stolen refresh token is valid for its full 7-day lifetime with no indication anything went wrong.',
        },
        {
          question: 'When should I use RS256 instead of HS256?',
          answer: 'Use RS256 (or ES256) whenever more than one service verifies tokens. With HS256, every verifying service must share the same secret — if any service is compromised, every token ever signed is at risk. With RS256, only the auth server holds the private key. Other services use the public key (distributable via /.well-known/jwks.json) to verify. ES256 gives the same security model with smaller keys and faster math — it is the preferred choice for new systems in 2026.',
        },
        {
          question: 'What happens when exp is in the past — does jwt.verify handle it automatically?',
          answer: 'Yes. jwt.verify() from the jsonwebtoken library (Node.js) automatically checks the exp claim and throws a TokenExpiredError if the current time is past the expiry timestamp. You do not have to check exp manually. You do need to catch the error and respond with 401 and a machine-readable code (like TOKEN_EXPIRED) so your client can trigger the silent refresh flow. Never ignore the error — always handle TokenExpiredError specifically to enable seamless token refresh.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
