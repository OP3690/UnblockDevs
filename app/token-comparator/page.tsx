import type { Metadata } from 'next';
import { ToolPageFooterBand } from '@/components/tools/ToolPageShell';
import ToolSEOContent, {
  SEOSection,
  SEOProse,
  C,
  HowItWorks,
  UseCases,
  FAQ,
  RelatedTools,
} from '@/components/tools/ToolSEOContent';
import TokenComparatorLandingClient from './client';

const canonicalUrl = 'https://unblockdevs.com/token-comparator';

export const metadata: Metadata = {
  title:
    'JWT Debugger & Token Comparator — Decode, Compare, Security Audit & Expiry Check Online Free | UnblockDevs',
  description:
    'Decode and debug JWT tokens, compare authentication tokens character-by-character, run security audits, check expiration, and analyze entropy. Free, 100% browser-based, nothing sent to servers.',
  keywords: [
    'jwt debugger online',
    'token comparator online',
    'jwt decoder online',
    'compare jwt tokens',
    'jwt security analyzer',
    'decode jwt token online',
    'jwt expiration checker',
    'api key comparator',
    'authentication token debugger',
    'jwt token analyzer free',
    'jwt security audit tool',
    'jwt vulnerability scanner',
    'jwt none algorithm detector',
    'compare two jwt tokens',
    'jwt token diff tool',
    'check jwt expiry online',
    'jwt token expired checker',
    'token entropy checker',
    'api key entropy analyzer',
    'token mismatch between environments',
    'how to decode a jwt token online',
    'how to compare two jwt tokens',
    'how to check if a jwt token is expired',
    'what is the none algorithm jwt vulnerability',
    'JWT Debugger',
    'Token Comparator',
    'compare jwt',
    'compare jwt token',
    'jwt token compare',
  ],
  openGraph: {
    title: 'JWT Debugger & Token Comparator — Decode, Compare, Security Audit & Expiry Check | UnblockDevs',
    description:
      'Decode JWT, compare tokens, security audit, expiration check, entropy analysis. Free, 100% browser-based. Nothing sent to servers.',
    type: 'website',
    url: canonicalUrl,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JWT Debugger & Token Comparator — Decode, Compare & Security Audit | UnblockDevs',
    description: 'JWT decode, compare tokens, security audit, expiry check. 100% in your browser.',
  },
  alternates: { canonical: canonicalUrl },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'JWT Debugger & Token Comparator — Decode, Compare, Security Audit & Expiry Check',
  description:
    'Decode and debug JWT tokens, compare authentication tokens character-by-character, run security audits, check expiration, and analyze entropy. Smart detection for JWT, API key, UUID, Base64. 100% browser-based. Nothing sent to servers.',
  url: canonicalUrl,
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  featureList: [
    'Smart token detection (JWT, API key, UUID, Base64)',
    'Character-by-character visual diff for two tokens',
    'JWT security audit (e.g. none algorithm, weak secrets)',
    'Token lifetime and expiration check',
    'Entropy analysis for token strength',
    '100% client-side — nothing sent to any server',
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    ratingCount: '1050',
    bestRating: '5',
  },
};

const faqSchema = {
  '@context': 'https://schema.org' as const,
  '@type': 'FAQPage' as const,
  mainEntity: [
    {
      '@type': 'Question' as const,
      name: 'How do I decode a JWT token online?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Paste your JWT into Token Comparator at unblockdevs.com/token-comparator. It auto-detects the JWT, decodes the header, payload, and all claims including expiration — 100% in your browser, nothing sent to servers.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'How do I check if a JWT token is expired?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Paste your JWT into Token Comparator. It reads the exp claim and shows the exact expiration datetime, whether the token is currently valid, and how long ago it expired or how much lifetime remains.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'What is the JWT none algorithm vulnerability?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: "The none algorithm vulnerability allows an attacker to remove the JWT signature so the server accepts any payload without verification. Token Comparator's security audit detects this and other JWT security misconfigurations automatically.",
      },
    },
    {
      '@type': 'Question' as const,
      name: 'How do I compare two JWT tokens?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Paste your first token in Token 1 and your second token in Token 2 at unblockdevs.com/token-comparator. Click Compare for an instant character-by-character visual diff with match percentage and mismatch highlighting.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'What is a token comparator?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'A token comparator compares two tokens (JWT, API keys, auth tokens, etc.) character by character, highlights mismatches visually, and shows match statistics—all in your browser.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'Is my token data stored or logged?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'No. Token Comparator is 100% client-side. Your tokens never leave your device and are not stored, logged, or sent to any server.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'What types of tokens can I compare?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'You can compare JWTs, API keys, OAuth tokens, session tokens, hashes, checksums, and other text-based tokens.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'How does the token comparison work?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'The tool compares character by character with green for matches and red for mismatches, plus totals and match percentage—all processed instantly in your browser.',
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Compare Two JWT Tokens',
  description: 'Use the Token Comparator to decode and diff two JWT tokens side by side, inspect claims, and identify differences.',
  totalTime: 'PT2M',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Paste two JWT tokens', text: 'Paste the first JWT into the left panel and the second JWT into the right panel.' },
    { '@type': 'HowToStep', position: 2, name: 'Compare headers and payloads', text: 'The tool decodes both tokens and shows a side-by-side diff of every claim in the header and payload.' },
    { '@type': 'HowToStep', position: 3, name: 'Identify changed claims', text: 'Changed values are highlighted — useful for spotting token version diffs or debugging auth issues.' },
    { '@type': 'HowToStep', position: 4, name: 'Check expiry differences', text: 'The tool also shows the time difference between exp and iat values in both tokens.' },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://unblockdevs.com' },
    { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://unblockdevs.com/tools/json' },
    { '@type': 'ListItem', position: 3, name: 'JWT Debugger & Token Comparator', item: canonicalUrl },
  ],
};

export default function TokenComparatorLanding() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <TokenComparatorLandingClient />

      <ToolSEOContent>
        {/* What */}
        <SEOSection id="what" heading="What Is a Token Comparator?">
          <SEOProse>
            A <strong>token comparator</strong> lets you paste two tokens — JWTs, API keys, OAuth
            tokens, webhook secrets, or any text-based credential — side by side and see exactly where
            they differ. Every character is compared individually and highlighted: green for matches,
            red for mismatches. This makes it effortless to spot a single wrong character in a 500-character
            JWT or detect which environment has a different signing secret.
          </SEOProse>
          <div className="mt-4">
            <SEOProse>
              Beyond the character diff, the JWT Debugger &amp; Token Comparator auto-detects the token
              type (JWT, API key, UUID, Base64) and unlocks the right analysis: JWT tokens get full
              header/payload decode, claim inspection (<C>exp</C>, <C>iat</C>, <C>iss</C>), expiry
              check, entropy analysis, and a security audit. Everything runs 100% in your browser —
              your tokens never leave your device.
            </SEOProse>
          </div>
        </SEOSection>

        {/* How it works */}
        <SEOSection id="how" eyebrow="How it works" heading="Compare Tokens in Seconds">
          <HowItWorks
            steps={[
              {
                n: '01',
                title: 'Paste Token A & B',
                desc: 'Enter your first token in the left field and your second token in the right field. The tool auto-detects the type of each.',
              },
              {
                n: '02',
                title: 'See the Character Diff',
                desc: 'Click Compare for an instant character-by-character visual diff with match percentage and mismatch count.',
              },
              {
                n: '03',
                title: 'Check JWT Claims & Expiry',
                desc: 'For JWTs, inspect the decoded header and payload, check expiration datetime, and see remaining or elapsed lifetime.',
              },
              {
                n: '04',
                title: 'Run Security Audit',
                desc: 'Detect alg:none, weak or missing secrets, absent exp/nbf claims, iss mismatches, and long-lived tokens in one click.',
              },
            ]}
          />
        </SEOSection>

        {/* Use cases */}
        <SEOSection id="uses" eyebrow="Use cases" heading="When Developers Compare Tokens">
          <UseCases
            cases={[
              {
                icon: '🐛',
                title: 'Debug Auth Failures Between Envs',
                desc: 'Paste the working dev token and the failing production token to pinpoint the exact claim or character that differs.',
              },
              {
                icon: '🛡️',
                title: 'Detect JWT Tampering',
                desc: 'Compare an original JWT with a suspicious one to spot header or payload modifications that could indicate a tampering attempt.',
              },
              {
                icon: '🔑',
                title: 'Compare API Key Permissions',
                desc: 'Verify that two API keys are identical across environments — or find the one character that was miscopied.',
              },
              {
                icon: '🪝',
                title: 'Verify Webhook Secrets Match',
                desc: 'Confirm the webhook secret configured on the provider matches the one stored in your environment variables.',
              },
              {
                icon: '🔄',
                title: 'Token Rotation Testing',
                desc: 'After rotating a signing key, compare old and new tokens to verify the new ones have the expected claims and structure.',
              },
              {
                icon: '📋',
                title: 'Diff Bearer vs API Key',
                desc: 'Compare a Bearer JWT against an opaque API key to understand format differences and choose the right auth scheme for your API.',
              },
            ]}
          />
        </SEOSection>

        {/* Security vulnerabilities table */}
        <SEOSection id="security" heading="JWT Security Vulnerabilities to Check">
          <SEOProse>
            The built-in security audit flags the most dangerous JWT misconfigurations before they
            reach production. Run any JWT through the tool to get an instant security report.
          </SEOProse>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[520px] border-collapse text-[13.5px]">
              <thead>
                <tr className="border-b border-zinc-200 text-left">
                  <th className="pb-3 pr-4 font-semibold text-zinc-700">Vulnerability</th>
                  <th className="pb-3 pr-4 font-semibold text-zinc-700">What it means</th>
                  <th className="pb-3 font-semibold text-zinc-700">Risk</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {[
                  [
                    'alg: none',
                    'Algorithm set to "none" — signature is stripped and any payload is accepted',
                    'Critical',
                  ],
                  [
                    'Weak secret',
                    'Short or common signing secret that can be brute-forced offline',
                    'High',
                  ],
                  [
                    'Missing exp / nbf',
                    'Token has no expiration or "not before" claim — valid forever',
                    'High',
                  ],
                  [
                    'iss mismatch',
                    'Issuer claim does not match the expected value for your service',
                    'Medium',
                  ],
                  [
                    'Long-lived token',
                    'exp is set far in the future — large window for replay attacks',
                    'Medium',
                  ],
                ].map(([vuln, meaning, risk]) => (
                  <tr key={vuln}>
                    <td className="py-3 pr-4 font-mono font-semibold text-zinc-900">{vuln}</td>
                    <td className="py-3 pr-4 text-zinc-600">{meaning}</td>
                    <td className="py-3 text-zinc-500">{risk}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SEOSection>

        {/* FAQ */}
        <SEOSection id="faq" eyebrow="FAQ" heading="Frequently Asked Questions">
          <FAQ
            items={[
              {
                q: 'How do I decode a JWT token?',
                a: 'Paste your JWT into the tool. It auto-detects the JWT format, decodes the header and payload via Base64URL, and displays all claims in readable JSON — entirely in your browser, nothing sent to any server.',
              },
              {
                q: 'How do I check if a JWT token is expired?',
                a: (
                  <>
                    Paste your JWT. The tool reads the <C>exp</C> claim (a Unix timestamp) and shows
                    the exact expiration datetime, whether the token is currently valid, and how much
                    lifetime remains or how long ago it expired.
                  </>
                ),
              },
              {
                q: 'What is the JWT "none" algorithm vulnerability?',
                a: (
                  <>
                    The <C>alg:none</C> attack lets a malicious actor remove the JWT signature so a
                    vulnerable server accepts any payload without verification. The security audit in
                    Token Comparator detects this automatically alongside other misconfigurations.
                  </>
                ),
              },
              {
                q: 'How do I compare tokens across environments?',
                a: 'Paste your dev token in Token 1 and your staging or production token in Token 2. Click Compare for an instant character-by-character visual diff showing exactly where they differ — useful for debugging environment mismatch issues.',
              },
              {
                q: 'What is token entropy and why does it matter?',
                a: 'Entropy measures how random and unpredictable a token is. Low entropy means the token could be guessed or brute-forced offline. Token Comparator analyzes entropy and flags tokens that may be cryptographically weak.',
              },
              {
                q: 'Are my tokens stored or sent to a server?',
                a: 'No. Token Comparator is 100% client-side. All decoding, comparison, and analysis happens in your browser. Your tokens never leave your device and are not stored or logged anywhere.',
              },
            ]}
          />
        </SEOSection>

        {/* Related tools */}
        <SEOSection id="related" eyebrow="Related tools" heading="Tools You Might Also Need">
          <RelatedTools
            tools={[
              {
                href: '/jwt-decoder',
                label: 'JWT Decoder',
                desc: 'Decode JWT tokens, verify HMAC signatures, and inspect claims in detail',
                icon: '🔓',
              },
              {
                href: '/hash-generator',
                label: 'Hash Generator',
                desc: 'Generate HMAC-SHA256 and other hashes for API signing and verification',
                icon: '#️⃣',
              },
              {
                href: '/base64-encoder',
                label: 'Base64 Encoder',
                desc: 'Encode or decode Base64 and Base64URL strings — decode JWT parts manually',
                icon: '🔤',
              },
              {
                href: '/uuid-generator',
                label: 'UUID Generator',
                desc: 'Generate cryptographically random UUIDs for use as token IDs or secrets',
                icon: '🎲',
              },
            ]}
          />
        </SEOSection>
      </ToolSEOContent>

      <ToolPageFooterBand toolName="token_comparator" />
    </>
  );
}
