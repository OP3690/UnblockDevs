'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CodeBlock, FAQAccordion, KeyPointsGrid,
  StatGrid, SectionHeader, QuickFact, CompareTable, VerticalSteps, FlowDiagram, ToolCTA,
} from '@/components/blog/BlogVisuals';

export default function OAuth2CompleteGuideClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>OAuth 2.0 Complete Guide 2026: Authorization Code, PKCE &amp; Client Credentials Explained</h1>
      <p className="lead">
        OAuth 2.0 is the foundation of every &ldquo;Sign in with Google&rdquo; button, every GitHub integration,
        and every enterprise SSO you have ever used. Yet it is also one of the most misunderstood protocols
        in web development &mdash; confused with authentication, conflated with JWT, and implemented incorrectly
        in ways that create serious security vulnerabilities. This guide covers exactly what OAuth 2.0 is,
        how each grant type works and when to use it, a complete Authorization Code + PKCE implementation
        in Node.js, the client credentials flow for machine-to-machine APIs, token refresh patterns, and
        how OAuth relates to JWT and OpenID Connect.
      </p>

      <StatGrid stats={[
        { value: '4',    label: 'OAuth 2.0 grant types — Authorization Code, Client Credentials, Device Code, Refresh', color: 'blue' },
        { value: '84%',  label: 'of enterprise apps use OAuth 2.0 as their federated identity standard in 2026', color: 'green' },
        { value: 'PKCE', label: 'is now mandatory for all public clients — Authorization Code without PKCE is deprecated', color: 'amber' },
        { value: '0',    label: 'passwords shared with third-party apps when OAuth is implemented correctly', color: 'violet' },
      ]} />

      <SectionHeader number={1} title="Definition: What Is OAuth 2.0?" />

      <QuickFact color="blue" label="OAuth 2.0 = a delegated authorization framework — not authentication">
        OAuth 2.0 is a framework (RFC 6749) that lets a <em>user</em> grant a <em>third-party application</em>
        limited access to their resources on another service &mdash; without sharing their password.
        When you click &ldquo;Continue with GitHub&rdquo; and your app reads your repos, that is OAuth 2.0.
        Critically: OAuth 2.0 is about <strong>authorization</strong> (what you can access), not
        <strong>authentication</strong> (who you are). OpenID Connect (OIDC) is the authentication layer
        built on top of OAuth 2.0 &mdash; the two work together.
      </QuickFact>

      <p>
        Four parties are involved in every OAuth 2.0 flow: the <strong>resource owner</strong> (the user),
        the <strong>client</strong> (your app), the <strong>authorization server</strong> (Google, GitHub,
        your IdP), and the <strong>resource server</strong> (the API being accessed). OAuth defines how
        these four parties exchange credentials safely &mdash; the user authorizes, the authorization server
        issues tokens, and the client uses tokens to access resources &mdash; all without the client ever
        seeing the user&apos;s password.
      </p>

      <SectionHeader number={2} title="When to Use OAuth 2.0" />

      <KeyPointsGrid columns={2} items={[
        {
          title: '✅ Third-party login ("Sign in with Google")',
          description: 'When users should log into your app using an identity they already have — Google, GitHub, Microsoft, Apple. OAuth + OIDC handles the full flow: authorization, token exchange, and user profile retrieval. Your app never handles passwords.',
        },
        {
          title: '✅ Accessing user data on another service',
          description: 'Your app needs to read a user\'s GitHub repos, post to their Twitter, or read their Google Calendar. OAuth lets the user grant specific scopes of access without giving your app their full account credentials.',
        },
        {
          title: '✅ Enterprise SSO and federated identity',
          description: 'Large organizations use a central identity provider (Okta, Azure AD, Auth0). OAuth + OIDC lets your app delegate authentication to that IdP. Users get one set of credentials across all enterprise tools.',
        },
        {
          title: '✅ Service-to-service API access (Client Credentials)',
          description: 'Your backend microservice needs to call another protected API — no user involved. The Client Credentials grant handles machine-to-machine authorization: service authenticates with client_id + client_secret, gets an access token, calls the API.',
        },
        {
          title: '❌ When you own both the client and the resource server',
          description: 'If your app and your API are the same organization, OAuth adds complexity without benefit. Use JWT directly, API keys, or session cookies. OAuth is designed for cross-organization authorization boundaries.',
        },
        {
          title: '❌ Simple API key authentication',
          description: 'For developer-facing APIs where each developer gets a static API key, OAuth is overkill. API keys are simpler to implement, easier to rotate, and sufficient for many use cases. Use OAuth when you need delegated, scoped, time-limited access.',
        },
      ]} />

      <SectionHeader number={3} title="OAuth 2.0 vs JWT vs API Keys — Decision Chart" />

      <CompareTable
        headers={['Factor', 'OAuth 2.0', 'JWT (direct)', 'API Keys']}
        rows={[
          ['What it is',        'Authorization framework',          'Token format',                          'Simple credential string'],
          ['Purpose',           'Delegated access across org boundaries', 'Stateless auth within your system', 'Machine-to-machine identification'],
          ['User involvement',  'User grants consent',              'User authenticates directly',           'No user — developer gets key'],
          ['Token format',      'Often JWT (access_token)',         'Always JWT',                            'Opaque string'],
          ['Scopes/permissions','Fine-grained OAuth scopes',        'Claims in payload',                     'All-or-nothing (or key-per-scope)'],
          ['Revocation',        '✅ Revoke at auth server',         '❌ Needs blocklist',                    '✅ Delete key from database'],
          ['Complexity',        'High — multiple parties/flows',   'Medium — sign/verify',                  'Low — just a lookup'],
          ['Best for',          '"Login with Google", federated SSO', 'Your own auth system, microservices', 'Developer APIs, webhooks, automation'],
        ]}
      />

      <AlertBox type="tip" title="OAuth 2.0 access tokens are usually JWT — but they don&apos;t have to be">
        When Google or GitHub issues an OAuth access token, it is often (but not always) a JWT internally.
        As an OAuth <em>client</em>, you treat the access token as an opaque string &mdash; you send it in the
        Authorization header and let the resource server validate it. Only the authorization server and
        resource server care about the token format. Your app just stores and forwards it.
      </AlertBox>

      <SectionHeader number={4} title="How OAuth 2.0 Works — The Authorization Code + PKCE Flow" />

      <p>
        Authorization Code with PKCE (Proof Key for Code Exchange, RFC 7636) is the correct grant type
        for any application where the client secret cannot be kept truly secret &mdash; which means
        all single-page apps, mobile apps, and desktop apps. As of 2026, PKCE is required for all
        public clients per OAuth 2.0 Security Best Practices (RFC 9700).
      </p>

      <FlowDiagram title="Authorization Code + PKCE Flow — Step by Step" steps={[
        { label: 'Generate PKCE pair',        desc: 'App generates: code_verifier (32 random bytes, base64url) and code_challenge = SHA-256(code_verifier) base64url. Store code_verifier in memory.', color: 'blue' },
        { label: 'Redirect to auth server',   desc: 'User clicks "Login with Google". App redirects to: /authorize?client_id=&response_type=code&code_challenge=<hash>&code_challenge_method=S256&scope=openid+email&state=<random>', color: 'violet' },
        { label: 'User authenticates',        desc: 'User logs in at Google\'s own login page. Your app never sees their password. User approves requested scopes.', color: 'green' },
        { label: 'Auth code returned',        desc: 'Authorization server redirects back to your redirect_uri with: ?code=<auth_code>&state=<verify_state_matches>', color: 'blue' },
        { label: 'Exchange code for tokens',  desc: 'POST to /token with: code, client_id, redirect_uri, code_verifier. Server verifies SHA-256(code_verifier) == code_challenge from step 1.', color: 'violet' },
        { label: 'Tokens received',           desc: 'Response: { access_token, refresh_token, id_token (OIDC), expires_in, token_type: "Bearer", scope }', color: 'green' },
        { label: 'Call protected API',        desc: 'Authorization: Bearer <access_token> on every API request. Token expires in 1 hour typically.', color: 'blue' },
        { label: 'Silent refresh',            desc: 'When access token expires, use refresh_token to get a new one silently. User sees no interruption.', color: 'amber' },
      ]} />

      <CodeBlock language="javascript" filename="oauth-pkce.js — complete Authorization Code + PKCE implementation">
{`import crypto from 'crypto';

// ── Step 1: Generate PKCE values ───────────────────────────────────────────
function generatePKCE() {
  const codeVerifier  = crypto.randomBytes(32).toString('base64url');
  const codeChallenge = crypto
    .createHash('sha256')
    .update(codeVerifier)
    .digest('base64url');
  return { codeVerifier, codeChallenge };
}

// ── Step 2: Build authorization URL ───────────────────────────────────────
function buildAuthUrl(codeChallenge, state) {
  const params = new URLSearchParams({
    response_type:          'code',
    client_id:              process.env.OAUTH_CLIENT_ID,
    redirect_uri:           'https://myapp.com/auth/callback',
    scope:                  'openid profile email',
    state,                  // CSRF protection — verify on callback
    code_challenge:         codeChallenge,
    code_challenge_method:  'S256',
  });
  return 'https://accounts.google.com/o/oauth2/auth?' + params.toString();
}

// ── Login handler — redirects user to authorization server ─────────────────
app.get('/auth/login', (req, res) => {
  const { codeVerifier, codeChallenge } = generatePKCE();
  const state = crypto.randomBytes(16).toString('hex');

  // Store both in session — needed on callback
  req.session.codeVerifier = codeVerifier;
  req.session.oauthState   = state;

  res.redirect(buildAuthUrl(codeChallenge, state));
});

// ── Callback handler — exchanges auth code for tokens ─────────────────────
app.get('/auth/callback', async (req, res) => {
  const { code, state, error } = req.query;

  if (error) return res.status(400).json({ error });

  // Verify CSRF state
  if (state !== req.session.oauthState) {
    return res.status(400).json({ error: 'State mismatch — possible CSRF attack' });
  }

  // Exchange authorization code for tokens
  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method:  'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body:    new URLSearchParams({
      grant_type:    'authorization_code',
      client_id:     process.env.OAUTH_CLIENT_ID,
      client_secret: process.env.OAUTH_CLIENT_SECRET,
      redirect_uri:  'https://myapp.com/auth/callback',
      code,
      code_verifier: req.session.codeVerifier, // must match the challenge from step 1
    }).toString(),
  });

  if (!tokenRes.ok) {
    const err = await tokenRes.json();
    return res.status(400).json({ error: 'Token exchange failed', details: err });
  }

  const tokens = await tokenRes.json();
  // tokens: { access_token, refresh_token, id_token, expires_in, scope }

  // Store refresh token securely (HttpOnly cookie or encrypted DB column)
  req.session.refreshToken = tokens.refresh_token;
  req.session.accessToken  = tokens.access_token;

  // Fetch user profile with access token
  const profile = await fetch('https://openidconnect.googleapis.com/v1/userinfo', {
    headers: { Authorization: 'Bearer ' + tokens.access_token },
  }).then(r => r.json());

  // profile: { sub, email, name, picture, email_verified }
  await upsertUser({ googleId: profile.sub, email: profile.email, name: profile.name });

  res.redirect('/dashboard');
});`}
      </CodeBlock>

      <SectionHeader number={5} title="How — Client Credentials Grant (Machine-to-Machine)" />

      <p>
        The Client Credentials grant is for server-to-server communication &mdash; no user is involved.
        Your backend service authenticates directly with the authorization server using its own
        credentials (<code>client_id</code> + <code>client_secret</code>) and receives an access token
        scoped to the service&apos;s own permissions.
      </p>

      <CodeBlock language="javascript" filename="client-credentials.js — service-to-service OAuth token">
{`// ── Get a service access token ─────────────────────────────────────────────
// Cache this token in memory — reuse until expiry, then fetch a new one
let cachedToken = null;
let tokenExpiry  = 0;

async function getServiceToken() {
  if (cachedToken && Date.now() < tokenExpiry - 60_000) {
    return cachedToken; // return cached token with 60s buffer
  }

  const res = await fetch('https://auth.myplatform.com/oauth/token', {
    method:  'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body:    new URLSearchParams({
      grant_type:    'client_credentials',
      client_id:     process.env.SERVICE_CLIENT_ID,
      client_secret: process.env.SERVICE_CLIENT_SECRET,
      scope:         'read:orders write:fulfillment', // only what this service needs
    }).toString(),
  });

  if (!res.ok) throw new Error('Failed to get service token: ' + res.status);

  const data = await res.json();
  // { access_token, token_type: "Bearer", expires_in: 3600, scope }

  cachedToken = data.access_token;
  tokenExpiry  = Date.now() + data.expires_in * 1000;

  return cachedToken;
}

// ── Use the token to call a protected internal API ─────────────────────────
async function fetchOrder(orderId) {
  const token = await getServiceToken();

  const res = await fetch('https://orders-api.internal/orders/' + orderId, {
    headers: {
      Authorization:  'Bearer ' + token,
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) throw new Error('Order API error: ' + res.status);
  return res.json();
}

// No refresh_token with client credentials — just request a new access token when it expires`}
      </CodeBlock>

      <SectionHeader number={6} title="How — Silent Token Refresh with Refresh Tokens" />

      <CodeBlock language="javascript" filename="token-refresh.js — transparent access token renewal">
{`// ── Refresh access token silently ──────────────────────────────────────────
async function refreshAccessToken(refreshToken) {
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method:  'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body:    new URLSearchParams({
      grant_type:    'refresh_token',
      client_id:     process.env.OAUTH_CLIENT_ID,
      client_secret: process.env.OAUTH_CLIENT_SECRET,
      refresh_token: refreshToken,
    }).toString(),
  });

  if (!res.ok) {
    // Refresh token expired or revoked — user must re-authenticate
    throw new Error('REFRESH_FAILED');
  }

  const data = await res.json();
  // { access_token, expires_in, scope, token_type }
  // Note: Google does NOT return a new refresh_token here — keep the original
  // Some providers DO rotate refresh tokens — always check the response

  return { accessToken: data.access_token, expiresIn: data.expires_in };
}

// ── Wrapper that auto-refreshes on 401 ────────────────────────────────────
async function oauthFetch(url, options, session) {
  let res = await fetch(url, {
    ...options,
    headers: { ...options.headers, Authorization: 'Bearer ' + session.accessToken },
  });

  if (res.status === 401) {
    try {
      const { accessToken } = await refreshAccessToken(session.refreshToken);
      session.accessToken = accessToken;
      // Retry with new token
      res = await fetch(url, {
        ...options,
        headers: { ...options.headers, Authorization: 'Bearer ' + session.accessToken },
      });
    } catch {
      // Refresh failed — session expired, redirect to login
      throw new Error('SESSION_EXPIRED');
    }
  }

  return res;
}`}
      </CodeBlock>

      <SectionHeader number={7} title="Why OAuth 2.0 — The Security Model" />

      <VerticalSteps steps={[
        {
          title: 'Users never share passwords with third-party apps',
          desc: 'The core security property of OAuth: the user authenticates directly with the authorization server (Google\'s own login page). Your app only receives a time-limited, scoped access token. If your app is compromised, the attacker gets the token — not the user\'s Google password.',
        },
        {
          title: 'Scopes limit what a token can do',
          desc: 'OAuth tokens are granted specific scopes: read:profile, write:calendar, read:email. A token with read:profile cannot modify calendar data. Users can see and revoke specific scope grants. Principle of least privilege is built into the protocol.',
        },
        {
          title: 'Access tokens expire — refresh tokens provide continuity',
          desc: 'Short-lived access tokens (1 hour typical) limit the damage window of a stolen token. Long-lived refresh tokens are stored securely server-side. When access expires, the client transparently gets a new one — the user sees no interruption.',
        },
        {
          title: 'PKCE prevents authorization code interception',
          desc: 'Without PKCE, an attacker who intercepts the authorization code (via a malicious redirect URI or browser history) can exchange it for tokens. PKCE binds the auth code to the initial request via a cryptographic challenge that only the originating client can answer.',
        },
        {
          title: 'State parameter prevents CSRF attacks',
          desc: 'The state parameter is a random nonce generated before the redirect and verified on callback. Without it, an attacker can trick a user into completing an OAuth flow that connects the attacker\'s account to the victim\'s session. Always generate, store, and verify state.',
        },
      ]} />

      <AlertBox type="warning" title="5 OAuth 2.0 implementation mistakes that create vulnerabilities">
        1. <strong>No state parameter</strong> — enables CSRF attacks that hijack OAuth flows.
        2. <strong>No PKCE for public clients</strong> — authorization code interception becomes trivially exploitable.
        3. <strong>Overly broad scopes</strong> — request only what you need; users distrust broad scope requests.
        4. <strong>client_secret in frontend code</strong> — public clients have no secrets; use PKCE instead.
        5. <strong>Not validating redirect_uri</strong> — authorization servers must strictly match registered URIs; open redirectors let attackers steal codes.
      </AlertBox>

      <ToolCTA
        href="/json-error-explainer"
        title="Debugging an OAuth Token Response or API JSON Error?"
        description="OAuth token endpoint responses, userinfo payloads, and resource server errors all return JSON. Paste any malformed response into our AI Error Explainer for instant diagnosis."
        buttonText="Debug OAuth JSON →"
        color="violet"
      />

      <FAQAccordion items={[
        {
          question: 'What is the difference between OAuth 2.0 and OpenID Connect (OIDC)?',
          answer: 'OAuth 2.0 is an authorization protocol — it answers "what can this app access?" It tells you nothing about who the user is. OpenID Connect (OIDC) is an identity layer built on top of OAuth 2.0 — it adds the id_token (a signed JWT containing user identity claims like sub, email, name) and the /userinfo endpoint. When you use "Sign in with Google," the authorization server issues both an OAuth access_token (for API access) and an OIDC id_token (to identify the user). Use the id_token to learn who the user is; use the access_token to call their APIs.',
        },
        {
          question: 'Why is the Implicit grant deprecated?',
          answer: 'The Implicit grant was designed for SPAs before PKCE existed — it returned the access token directly in the URL fragment after authorization, avoiding the server-side token exchange. URL fragments appear in browser history, server logs, and referrer headers, making token theft trivially easy. PKCE solves the same problem (no client secret needed) without the token-in-URL vulnerability. OAuth 2.0 Security Best Practices (RFC 9700, 2023) explicitly recommends against the Implicit grant. Use Authorization Code + PKCE for all public clients.',
        },
        {
          question: 'Should I use OAuth 2.0 or just JWT for my own API?',
          answer: 'If your app and your API are in the same organization, you do not need OAuth 2.0. Use JWT directly: your auth server signs a JWT on login, your API verifies it. OAuth 2.0 is designed for cross-organization authorization — when users need to grant your app access to their data on a different service, or when you are building an identity provider that other apps will integrate. Adding OAuth 2.0 to a monolith or even microservices in the same organization usually adds complexity without benefit.',
        },
        {
          question: 'How do I securely store OAuth refresh tokens?',
          answer: 'For web apps with a server-side component: store refresh tokens in the database (encrypted at rest) linked to the user session, never in browser storage. Serve the access token to the frontend via a short-lived session cookie or in-memory only. For fully client-side SPAs: store the refresh token in an HttpOnly cookie set by a BFF (Backend for Frontend) proxy. Never store refresh tokens in localStorage or sessionStorage — any XSS vulnerability can steal them. Treat refresh tokens like passwords.',
        },
        {
          question: 'What is the Device Authorization Grant and when do I use it?',
          answer: 'The Device Authorization Grant (RFC 8628) is for devices that cannot open a browser or have limited input — Smart TVs, game consoles, CLI tools, IoT devices. The device displays a short code and a URL (e.g., "Go to example.com/activate and enter: ABCD-1234"). The user completes auth on their phone or computer. The device polls the token endpoint until the user completes the flow. GitHub CLI and many streaming device apps use this pattern.',
        },
        {
          question: 'What scopes should I request, and can I request more later?',
          answer: 'Request only the scopes you need right now — the principle of least privilege. Users distrust apps that request broad permissions upfront ("Why does a to-do app need access to all my contacts?"). You can request additional scopes incrementally: when the user tries to use a feature that needs more permissions, trigger a new OAuth flow with just the additional scope. This is called "incremental authorization" and leads to much higher user consent rates. Google, GitHub, and most major identity providers support incremental scope requests.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
