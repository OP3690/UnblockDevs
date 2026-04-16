import type { Metadata } from 'next';
import { ToolPageFooterBand } from '@/components/tools/ToolPageShell';
import ToolSEOContent, {
  SEOSection, SEOProse, C, HowItWorks, UseCases, FAQ, RelatedTools, RelatedBlogPosts,
} from '@/components/tools/ToolSEOContent';
import JWTDecoderClient from './client';

const canonicalUrl = 'https://unblockdevs.com/jwt-decoder';

export const metadata: Metadata = {
  title: 'JWT Decoder — Decode JWT Tokens, Verify Signatures, Check Expiry & Security Audit Online Free | UnblockDevs',
  description:
    'Decode JWT tokens, view header and payload claims, verify HMAC signatures, check expiration, and run security analysis — 100% in your browser. Token never sent to any server. Free, no signup.',
  keywords: [
    'jwt decoder online', 'decode jwt token', 'jwt token decoder', 'decode jwt online',
    'jwt decoder free', 'jwt signature verification online', 'verify jwt signature',
    'jwt hmac verifier', 'jwt security analyzer', 'jwt vulnerability checker',
    'jwt none algorithm vulnerability', 'jwt expiry checker', 'check jwt expiration',
    'what is jwt token', 'how does jwt work', 'is jwt.io safe to use',
    'how to check if jwt token is expired', 'debug jwt authentication',
    'aws cognito jwt decoder', 'auth0 jwt decoder', 'firebase jwt decoder',
    'compare jwt', 'compare jwt token', 'jwt token compare',
    // extended keyword cluster
    'jwt decode free', 'jwt token viewer', 'jwt payload decoder', 'jwt header decoder',
    'jwt online tool', 'jwt decode without secret', 'jwt verify signature online',
    'jwt debugger', 'jwt inspector', 'jwt decode bearer token',
    'jwt decode authorization header', 'jwt rs256 decode', 'jwt hs256 verify', 'jwt hs512',
    'jwt token structure', 'jwt iss sub aud exp claims', 'jwt nbf claim', 'jwt iat claim',
    'jwt decode react', 'jwt decode node js', 'jwt decode python', 'decode jwt python',
    'jsonwebtoken decode', 'jwt-decode npm', 'jwt parse online', 'jwt validator free',
    'jwt refresh token', 'jwt access token', 'jwt vs session', 'jwt security audit',
    'jwt algorithm check', 'jwt none algorithm attack', 'jwt secret weak',
    'jwt expired error fix', 'jwt invalid signature fix', 'jwt malformed error',
    'jwt token expired fix', 'jwt token invalid', 'decode jwt without verification',
    'jwt payload base64url', 'jwt decode cli', 'jwt bearer token format',
    'jwt authorization header decode', 'jwt structure explained', 'jwt claims reference',
    'jwt rfc 7519', 'jwt okta decoder',
  ],
  openGraph: {
    title: 'JWT Decoder — Decode, Verify, Check Expiry & Security Audit Online Free | UnblockDevs',
    description: 'Decode JWT tokens, verify signatures, check expiration, run security analysis. 100% in your browser. Token never sent to any server.',
    type: 'website',
    url: canonicalUrl,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs JWT Decoder' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JWT Decoder — Decode, Verify & Security Audit Online Free | UnblockDevs',
    description: 'Decode JWT, verify HMAC, check expiry. 100% client-side. Token never leaves your device.',
  },
  alternates: { canonical: canonicalUrl },
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'JWT Decoder — Decode, Verify Signatures, Check Expiry & Security Audit',
  url: canonicalUrl,
  description: 'Decode JWT tokens, view header and payload claims, verify HMAC signatures, check expiration, and run security analysis. 100% in your browser. Token never sent to any server.',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  featureList: [
    'Decode JWT header, payload, and signature',
    'Verify HMAC signatures (HS256, HS384, HS512)',
    'Security analysis — none algorithm, weak secrets, missing claims',
    'Token lifetime and expiration check',
    'Provider detection (Auth0, Cognito, Firebase, Okta)',
    '100% browser-based — no server, token never leaves device',
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '2400',
    bestRating: '5',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'How do I decode a JWT token?', acceptedAnswer: { '@type': 'Answer', text: 'Paste your JWT into the decoder. It instantly splits the header, payload, and signature, Base64URL-decodes each part, and displays all claims in readable JSON — 100% in your browser, nothing sent to any server.' } },
    { '@type': 'Question', name: 'Is it safe to paste JWT tokens into online decoders?', acceptedAnswer: { '@type': 'Answer', text: 'Only if the tool is 100% client-side. This JWT Decoder processes everything in your browser — no network request is made and your token never leaves your device. Safe for production tokens and sensitive credentials.' } },
    { '@type': 'Question', name: 'How do I check if a JWT token is expired?', acceptedAnswer: { '@type': 'Answer', text: 'Paste your JWT. The decoder reads the exp claim and shows the exact expiration datetime, whether the token is currently valid, and how much lifetime remains or how long ago it expired.' } },
    { '@type': 'Question', name: 'What is the JWT none algorithm vulnerability?', acceptedAnswer: { '@type': 'Answer', text: 'The alg:none attack strips the JWT signature so vulnerable servers accept any payload without verification. This JWT Decoder\'s built-in security analysis detects this vulnerability automatically.' } },
    { '@type': 'Question', name: 'What is a JWT token?', acceptedAnswer: { '@type': 'Answer', text: 'A JWT (JSON Web Token) is an open standard (RFC 7519) for securely transmitting information as a compact URL-safe string. It has three Base64URL-encoded parts — header, payload, and signature — separated by dots.' } },
    { '@type': 'Question', name: 'How do I decode a JWT without a secret?', acceptedAnswer: { '@type': 'Answer', text: 'The header and payload are just Base64URL-encoded JSON — no secret is needed to decode them. Only signature verification requires the secret or public key. Paste the JWT and read the claims freely.' } },
    { '@type': 'Question', name: 'What is the difference between HS256 and RS256?', acceptedAnswer: { '@type': 'Answer', text: 'HS256 uses a shared HMAC secret (symmetric) — both signer and verifier use the same key. RS256 uses an RSA key pair (asymmetric) — the server signs with a private key and clients verify with a public key. RS256 is safer for distributed systems.' } },
    { '@type': 'Question', name: 'What claims are in a JWT payload?', acceptedAnswer: { '@type': 'Answer', text: 'Standard claims include: iss (issuer), sub (subject/user ID), aud (audience), exp (expiration), nbf (not before), iat (issued at), and jti (JWT ID). Applications can also include custom claims like roles, email, or permissions.' } },
    { '@type': 'Question', name: 'How do I verify a JWT signature online?', acceptedAnswer: { '@type': 'Answer', text: 'Enter your HMAC secret in the Verify tab. The decoder runs HMAC-SHA256/384/512 locally in your browser and confirms whether the signature matches — no server involved.' } },
    { '@type': 'Question', name: 'What does a JWT malformed error mean?', acceptedAnswer: { '@type': 'Answer', text: 'A "malformed" JWT error means the token does not have the expected three dot-separated parts, or a part is not valid Base64URL. Common causes: truncated token, extra whitespace, or URL encoding that changed + to space.' } },
    { '@type': 'Question', name: 'How do I decode a JWT in JavaScript?', acceptedAnswer: { '@type': 'Answer', text: 'Use the jwt-decode library: import jwtDecode from "jwt-decode"; const payload = jwtDecode(token). Or manually: JSON.parse(atob(token.split(".")[1].replace(/-/g,"+").replace(/_/g,"/"))).' } },
    { '@type': 'Question', name: 'How do I decode a JWT in Python?', acceptedAnswer: { '@type': 'Answer', text: 'Use PyJWT: import jwt; payload = jwt.decode(token, options={"verify_signature": False}). Or manually: import base64, json; json.loads(base64.b64decode(token.split(".")[1] + "==")).' } },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Decode a JWT Token Online',
  description: 'Step-by-step guide to decoding and verifying JWT tokens.',
  totalTime: 'PT1M',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Paste your JWT token', text: 'Paste your JWT (JSON Web Token) into the input field. The tool auto-detects the header, payload, and signature.' },
    { '@type': 'HowToStep', position: 2, name: 'View decoded claims', text: 'The Header and Payload tabs show all claims in readable JSON format, including exp (expiry), iat (issued at), and custom claims.' },
    { '@type': 'HowToStep', position: 3, name: 'Check expiry and security', text: 'The Security Audit tab flags vulnerabilities like the "none" algorithm attack, weak secrets, and expired tokens.' },
    { '@type': 'HowToStep', position: 4, name: 'Verify HMAC signature (optional)', text: 'To verify an HS256/HS384/HS512 token, enter your secret in the Verify tab and click Verify Signature.' },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://unblockdevs.com' },
    { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://unblockdevs.com/tools/json' },
    { '@type': 'ListItem', position: 3, name: 'JWT Decoder', item: canonicalUrl },
  ],
};

export default function JWTDecoderPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <JWTDecoderClient />

      <ToolSEOContent>
        {/* What */}
        <SEOSection id="what" heading="What Is a JWT Token?">
          <SEOProse>
            A <strong>JWT (JSON Web Token)</strong> is an open standard (RFC 7519) for securely transmitting
            information between parties as a compact, URL-safe string. A JWT has three Base64URL-encoded
            parts separated by dots:
          </SEOProse>
          <div className="my-4 rounded-lg bg-zinc-100 px-4 py-3 font-mono text-[13px] text-zinc-700">
            eyJhbGciOiJIUzI1NiJ9.<span className="text-emerald-700">eyJzdWIiOiJ1c2VyXzEyMyJ9</span>.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
          </div>
          <SEOProse>
            The three parts are: <strong>Header</strong> (algorithm + token type), <strong>Payload</strong>{' '}
            (claims — user data, expiry, roles), and <strong>Signature</strong> (verifies the token
            has not been tampered with). Decoding the header and payload is just Base64URL — no secret
            needed. Verifying the signature requires the secret or public key.
          </SEOProse>
        </SEOSection>

        {/* How it works */}
        <SEOSection id="how" eyebrow="How it works" heading="Decode and Inspect JWTs in Seconds">
          <HowItWorks steps={[
            { n: '01', title: 'Paste your JWT', desc: 'Paste a full JWT, a URL with ?token=... param, or a Bearer header. The tool strips prefixes automatically.' },
            { n: '02', title: 'Inspect claims', desc: 'View header algorithm, all payload claims, and human-readable expiry and issued-at timestamps.' },
            { n: '03', title: 'Verify signature', desc: 'Enter your HMAC secret (HS256/384/512) to verify the signature — entirely in your browser.' },
            { n: '04', title: 'Run security audit', desc: 'Detect the alg:none vulnerability, short secrets, missing exp/nbf claims, and other common JWT security issues.' },
          ]} />
        </SEOSection>

        {/* Use cases */}
        <SEOSection id="uses" eyebrow="Use cases" heading="When Developers Use a JWT Decoder">
          <UseCases cases={[
            { icon: '🐛', title: 'Debug Auth Failures', desc: 'Decode the token from a failed API request to check if exp is in the past, sub is correct, or required claims are missing.' },
            { icon: '⏱️', title: 'Check Token Expiry', desc: 'Instantly see the exact exp datetime and how much time remains — no code needed.' },
            { icon: '✅', title: 'Verify HMAC Signatures', desc: 'Test that your signing secret is correct by verifying HS256/HS384/HS512 signatures locally.' },
            { icon: '🛡️', title: 'Security Audit', desc: 'Detect the alg:none attack, weak or default secrets, missing nbf/iat claims, and other JWT vulnerabilities.' },
            { icon: '🔍', title: 'Inspect Provider Tokens', desc: 'Decode Auth0, Cognito, Firebase, or Okta tokens to see the claims and issuer without leaving your browser.' },
            { icon: '📋', title: 'Extract Claims for Testing', desc: 'Pull user IDs, roles, and custom claims out of tokens when writing integration tests or mocking auth.' },
          ]} />
        </SEOSection>

        {/* JWT claims reference */}
        <SEOSection id="claims" heading="JWT Standard Claims Reference">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[480px] border-collapse text-[13.5px]">
              <thead>
                <tr className="border-b border-zinc-200 text-left">
                  <th className="pb-3 pr-4 font-semibold text-zinc-700">Claim</th>
                  <th className="pb-3 pr-4 font-semibold text-zinc-700">Full name</th>
                  <th className="pb-3 font-semibold text-zinc-700">Meaning</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {[
                  ['iss', 'Issuer', 'Who created and signed the token (e.g. https://accounts.google.com)'],
                  ['sub', 'Subject', 'Who the token refers to — typically a user ID'],
                  ['aud', 'Audience', 'Who the token is intended for — your API or app'],
                  ['exp', 'Expiration', 'Unix timestamp after which the token is invalid'],
                  ['nbf', 'Not Before', 'Unix timestamp before which the token must not be accepted'],
                  ['iat', 'Issued At', 'Unix timestamp when the token was issued'],
                  ['jti', 'JWT ID', 'Unique identifier — used to prevent token replay'],
                ].map(([claim, name, meaning]) => (
                  <tr key={claim}>
                    <td className="py-3 pr-4 font-mono font-semibold text-zinc-900">{claim}</td>
                    <td className="py-3 pr-4 text-zinc-600">{name}</td>
                    <td className="py-3 text-zinc-500">{meaning}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SEOSection>

        {/* Privacy section */}
        <SEOSection id="privacy" heading="Is jwt.io Safe? Why Client-Side Matters">
          <SEOProse>
            jwt.io is widely used but sends tokens to their servers for processing. For tokens containing
            user IDs, emails, roles, or session data that can be a privacy concern — especially in
            regulated environments or when debugging production issues. This JWT Decoder runs{' '}
            <strong>100% in your browser</strong>: no network request is made, no data is logged.
            Decoding is just Base64URL — it requires no server. Your token never leaves your device.
          </SEOProse>
        </SEOSection>

        {/* FAQ */}
        <SEOSection id="faq" eyebrow="FAQ" heading="Frequently Asked Questions">
          <FAQ items={[
            {
              q: 'How do I decode a JWT token?',
              a: 'Paste your JWT above. It splits on the two dots, Base64URL-decodes the header and payload, and shows all claims in readable JSON — entirely in your browser, nothing sent to any server.',
            },
            {
              q: 'Is it safe to paste JWT tokens into online decoders?',
              a: 'Only if the tool is 100% client-side. This decoder processes everything locally — no network request is made, your token never leaves your device. Safe for production tokens and sensitive credentials.',
            },
            {
              q: 'How do I check if a JWT token is expired?',
              a: <>Paste your JWT. The decoder reads the <C>exp</C> claim (a Unix timestamp) and shows the exact expiration datetime, whether the token is currently valid, and remaining or elapsed lifetime in human-readable format.</>,
            },
            {
              q: 'How do I verify a JWT signature?',
              a: <>Enter your HMAC secret in the verification field. The decoder runs <C>HMAC-SHA256/384/512</C> locally in your browser and confirms whether the token signature matches — no server involved.</>,
            },
            {
              q: 'What is the JWT "none" algorithm vulnerability?',
              a: <>The <C>alg:none</C> attack allows an attacker to set the algorithm to "none" and strip the signature, potentially bypassing verification on vulnerable servers. This decoder's security audit flags this automatically alongside other issues like missing <C>exp</C> or default weak secrets.</>,
            },
            {
              q: 'What does a JWT token look like?',
              a: <>A JWT has three Base64URL-encoded parts separated by dots. The first starts with <C>eyJ</C> (the encoded <C>{'{"'}</C>), making most JWTs recognizable by that prefix. The third part is the cryptographic signature and cannot be decoded without the secret.</>,
            },
            {
              q: 'What is a JWT token?',
              a: 'A JWT (JSON Web Token) is an open standard (RFC 7519) for securely transmitting information as a compact URL-safe string. It has three Base64URL-encoded parts — header, payload, and signature — separated by dots.',
            },
            {
              q: 'How do I decode a JWT without a secret?',
              a: 'The header and payload are just Base64URL-encoded JSON — no secret is needed to decode them. Only signature verification requires the secret or public key. Paste the JWT and read the claims freely.',
            },
            {
              q: 'What is the difference between HS256 and RS256?',
              a: 'HS256 uses a shared HMAC secret (symmetric) — both signer and verifier use the same key. RS256 uses an RSA key pair (asymmetric) — the server signs with a private key and clients verify with a public key. RS256 is safer for distributed systems.',
            },
            {
              q: 'What claims are in a JWT payload?',
              a: <>Standard claims: <C>iss</C> (issuer), <C>sub</C> (subject/user ID), <C>aud</C> (audience), <C>exp</C> (expiration), <C>nbf</C> (not before), <C>iat</C> (issued at), <C>jti</C> (JWT ID). Apps also add custom claims like roles, email, or permissions.</>,
            },
            {
              q: 'What does a JWT malformed error mean?',
              a: 'A "malformed" JWT error means the token does not have the expected three dot-separated parts, or a part is not valid Base64URL. Common causes: truncated token, extra whitespace, or URL-encoding that changed + to a space.',
            },
            {
              q: 'How do I decode a JWT in JavaScript?',
              a: <>Use <C>jwt-decode</C>: <C>jwtDecode(token)</C>. Or manually: <C>JSON.parse(atob(token.split(&quot;.&quot;)[1].replace(/-/g,&quot;+&quot;).replace(/_/g,&quot;/&quot;)))</C>.</>,
            },
          ]} />
        </SEOSection>

        {/* Related tools */}
        <SEOSection id="related" eyebrow="Related tools" heading="Tools You Might Also Need">
          <RelatedTools tools={[
            { href: '/token-comparator', label: 'Token Comparator', desc: 'Compare two JWTs character-by-character with visual diff', icon: '🔍' },
            { href: '/base64-encoder', label: 'Base64 Encoder', desc: 'Manually decode JWT parts (header/payload) with Base64URL', icon: '🔤' },
            { href: '/code-prompt-shield', label: 'Code Prompt Shield', desc: 'Mask tokens and secrets before sharing code with AI', icon: '🔐' },
            { href: '/hash-generator', label: 'Hash Generator', desc: 'Generate HMAC-SHA256 signatures for API signing', icon: '#️⃣' },
          ]} />
        </SEOSection>

        <SEOSection id="guides" eyebrow="Learn more" heading="Developer Guides">
          <RelatedBlogPosts posts={[
            { href: '/blog/token-security-privacy-best-practices', label: 'Token Security Best Practices' },
            { href: '/blog/tokens-complete-guide', label: 'JWT Tokens Complete Guide' },
            { href: '/blog/stringified-json-hell-unescape-decode-jwt-epoch-sanitize-logs', label: 'Decode JWT in Logs' },
          ]} />
        </SEOSection>
      </ToolSEOContent>

      <ToolPageFooterBand toolName="jwt_decoder" />
    </>
  );
}
