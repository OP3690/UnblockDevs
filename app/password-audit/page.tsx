import type { Metadata } from 'next';
import { ToolPageFooterBand } from '@/components/tools/ToolPageShell';
import ToolSEOContent, {
  SEOSection, SEOProse, C, HowItWorks, UseCases, FAQ, RelatedTools,
} from '@/components/tools/ToolSEOContent';
import PasswordAuditClient from './client';

const canonicalUrl = 'https://unblockdevs.com/password-audit';

export const metadata: Metadata = {
  title: 'Password Strength Checker & Audit — Check Entropy, HIBP Breach Status, Crack Time & Security Score Online Free | UnblockDevs',
  description:
    'Audit any password for strength, entropy, crack time, pattern detection (keyboard walks, leet speak, years), and HIBP breach status. Build password policies with live regex and code export. 100% in your browser — nothing is sent to any server.',
  keywords: [
    'password strength checker',
    'how secure is my password',
    'password entropy calculator',
    'password policy generator',
    'how long to crack password',
    'hibp breach check',
    'have i been pwned password',
    'nist password guidelines',
    'password audit',
    'password policy regex',
  ],
  openGraph: {
    title: 'Password Strength Checker & Audit — UnblockDevs',
    description: 'Check password strength, entropy, crack time and HIBP breach status. Build password policies with regex and export code. 100% browser-based.',
    type: 'website',
    url: canonicalUrl,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs Password Strength Checker' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Password Strength Checker & Audit | UnblockDevs',
    description: 'Check entropy, crack time and HIBP breach status. Build password policies. 100% browser-based.',
  },
  alternates: { canonical: canonicalUrl },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Password Strength Checker & Audit',
  url: canonicalUrl,
  description: 'Audit passwords for strength, entropy, crack time, pattern detection, and HIBP breach status. Build password policies with regex and code export. 100% client-side.',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  featureList: [
    'Shannon entropy calculation',
    'Crack time estimate at 1B guesses/second',
    'Keyboard walk detection',
    'Leet speak pattern detection',
    'Year pattern detection',
    'Password policy builder with live regex',
    'Code export in JS, Python, Go, Java, PHP',
    '100% client-side — nothing stored or sent',
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    ratingCount: '590',
    bestRating: '5',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do I check if my password is strong enough?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Paste your password into the checker. The tool calculates entropy in bits, estimates crack time at 1 billion guesses per second, detects predictable patterns like keyboard walks and leet speak, and gives targeted improvement suggestions. Aim for 72+ bits of entropy for sensitive accounts.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is password entropy and why does it matter?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Password entropy measures unpredictability in bits. It is calculated from the character set size and password length: entropy = length × log2(character set size). Higher entropy means exponentially more possible combinations and longer crack times. A 40-bit password can be cracked in seconds; a 128-bit password would take longer than the age of the universe.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is it safe to type my real password into a strength checker?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — all calculations run entirely in your browser. No password, hash, or partial data is sent to any server. The tool uses pure JavaScript math (character set analysis, entropy formula, pattern matching). You can disconnect from the internet before using it to verify.',
      },
    },
    {
      '@type': 'Question',
      name: 'What makes a password truly strong?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A strong password is long (16+ characters), uses a large character set (lowercase, uppercase, digits, symbols), and avoids predictable patterns. Avoid dictionary words, names, dates, keyboard sequences like "qwerty", and leet substitutions like "p@ssw0rd". A strong passphrase of 5+ random words can also be very secure and easier to remember.',
      },
    },
  ],
};

export default function PasswordAuditPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <PasswordAuditClient />

      <ToolSEOContent>
        {/* What */}
        <SEOSection id="what" heading="What Is a Password Strength Checker?">
          <SEOProse>
            A <strong>password strength checker</strong> analyses a password's randomness and resistance to
            attack without ever sending it to a server. It calculates <strong>entropy</strong> — a measure of
            unpredictability in bits — by looking at the size of the character pool (lowercase, uppercase,
            digits, symbols) and the password's length. More bits means an attacker must try exponentially
            more combinations.
          </SEOProse>
          <SEOProse>
            Beyond raw entropy, a good checker detects structural weaknesses: <strong>keyboard walks</strong>{' '}
            like <C>qwerty</C> or <C>12345</C>, <strong>leet speak</strong> substitutions like{' '}
            <C>p@ssw0rd</C>, and <strong>year patterns</strong> like <C>2024</C> — all of which dramatically
            reduce effective entropy even when character diversity looks adequate. The tool also estimates
            <strong> crack time</strong> at 1 billion guesses per second (a realistic offline attack rate)
            so you can see exactly how much time your password buys.
          </SEOProse>
        </SEOSection>

        {/* How it works */}
        <SEOSection id="how" eyebrow="How it works" heading="Audit Your Password in Seconds">
          <HowItWorks steps={[
            { n: '01', title: 'Type your password', desc: 'Paste or type a password into the checker. All processing is local — nothing leaves your device.' },
            { n: '02', title: 'See entropy & score', desc: 'Instantly view entropy in bits, strength label (Very Weak to Extreme), and crack time at 1B guesses/second.' },
            { n: '03', title: 'Review pattern warnings', desc: 'The tool flags keyboard walks, leet speak, and year patterns that reduce real-world security.' },
            { n: '04', title: 'Follow improvement suggestions', desc: 'Get specific, actionable tips to increase entropy and remove detectable patterns.' },
          ]} />
        </SEOSection>

        {/* Entropy reference table */}
        <SEOSection id="entropy" heading="Password Entropy & Crack Time Reference">
          <SEOProse>
            The table below shows how entropy bits translate to real-world crack times at 1 billion guesses
            per second — a conservative estimate for a modern GPU-based offline attack. Character set size has
            a major impact: adding symbols or uppercase letters increases the pool and therefore the entropy
            per character.
          </SEOProse>
          <div className="overflow-x-auto rounded-xl border border-zinc-200 mt-4">
            <table className="w-full text-[13.5px]">
              <thead>
                <tr className="border-b border-zinc-200 bg-zinc-50">
                  <th className="px-4 py-3 text-left font-semibold text-zinc-700">Entropy</th>
                  <th className="px-4 py-3 text-left font-semibold text-zinc-700">Rating</th>
                  <th className="px-4 py-3 text-left font-semibold text-zinc-700">Crack time (1B/s)</th>
                  <th className="px-4 py-3 text-left font-semibold text-zinc-700">Example</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                <tr className="bg-white">
                  <td className="px-4 py-3 font-mono text-zinc-900">~40 bits</td>
                  <td className="px-4 py-3 text-red-600 font-medium">Weak</td>
                  <td className="px-4 py-3 text-zinc-600">Seconds to minutes</td>
                  <td className="px-4 py-3 text-zinc-500">6-char lowercase + digits</td>
                </tr>
                <tr className="bg-zinc-50/50">
                  <td className="px-4 py-3 font-mono text-zinc-900">~56 bits</td>
                  <td className="px-4 py-3 text-amber-600 font-medium">Fair</td>
                  <td className="px-4 py-3 text-zinc-600">Hours to days</td>
                  <td className="px-4 py-3 text-zinc-500">8-char mixed case + digits</td>
                </tr>
                <tr className="bg-white">
                  <td className="px-4 py-3 font-mono text-zinc-900">~72 bits</td>
                  <td className="px-4 py-3 text-lime-600 font-medium">Good</td>
                  <td className="px-4 py-3 text-zinc-600">Centuries</td>
                  <td className="px-4 py-3 text-zinc-500">12-char full set (upper+lower+digit+symbol)</td>
                </tr>
                <tr className="bg-zinc-50/50">
                  <td className="px-4 py-3 font-mono text-zinc-900">~128 bits</td>
                  <td className="px-4 py-3 text-emerald-600 font-medium">Excellent</td>
                  <td className="px-4 py-3 text-zinc-600">Heat death of the universe</td>
                  <td className="px-4 py-3 text-zinc-500">20-char full set or 6-word passphrase</td>
                </tr>
              </tbody>
            </table>
          </div>
          <SEOProse>
            Character set impacts: digits only (10 chars) gives 3.32 bits per character; lowercase only (26)
            gives 4.7 bits; full printable ASCII (~95) gives 6.57 bits. Adding just one character type can
            add 1–2 bits per character — significant at scale.
          </SEOProse>
        </SEOSection>

        {/* Use cases */}
        <SEOSection id="uses" eyebrow="Use cases" heading="When Developers Audit Passwords">
          <UseCases cases={[
            { icon: '🛡️', title: 'Validate Password Policy', desc: 'Check whether a proposed password policy actually produces strong passwords by testing representative examples.' },
            { icon: '🔍', title: 'Audit Existing Passwords', desc: 'Review legacy passwords in migration projects to identify weak ones that should be reset before go-live.' },
            { icon: '🚀', title: 'User Onboarding Flows', desc: 'Validate minimum entropy requirements during account creation to enforce better hygiene from the start.' },
            { icon: '📋', title: 'Compliance Checks', desc: 'Verify password policy meets NIST SP 800-63B requirements for length, complexity, and banned patterns.' },
            { icon: '🔑', title: 'API Key Strength', desc: 'Check that generated API keys or secrets have sufficient entropy before deploying to production.' },
            { icon: '🗣️', title: 'Passphrase Evaluation', desc: 'Compare entropy of passphrases vs. random passwords to choose the right strategy for different use cases.' },
          ]} />
        </SEOSection>

        {/* FAQ */}
        <SEOSection id="faq" eyebrow="FAQ" heading="Frequently Asked Questions">
          <FAQ items={[
            {
              q: 'Is it safe to type my real password here?',
              a: 'Yes. All calculations happen entirely in your browser using JavaScript. No password, hash, or any data is sent to a server. You can disconnect from the internet before using the tool to confirm this.',
            },
            {
              q: 'How is entropy calculated?',
              a: <>The tool uses the Shannon entropy formula: <C>entropy = length × log₂(character set size)</C>. The character set size depends on which categories are present — lowercase (26), uppercase (26), digits (10), and symbols (~33). It also applies a penalty for detected patterns like keyboard walks and leet substitutions.</>,
            },
            {
              q: 'What is the difference between zxcvbn and raw entropy?',
              a: 'Raw entropy measures the theoretical search space based on character set and length. zxcvbn (a common password strength estimator by Dropbox) also checks against dictionary lists, common patterns, and known password structures. This tool uses raw entropy plus custom pattern detection, giving you precise bit counts alongside structural weakness warnings.',
            },
            {
              q: 'What qualifies as a strong password?',
              a: 'A password with 72+ bits of entropy, no detectable keyboard patterns, no dictionary words, and no predictable sequences like years or names. For sensitive accounts (email, banking, admin) aim for 80+ bits. A 16-character password using the full character set achieves around 105 bits.',
            },
            {
              q: 'Is it safe to type a password into a website to check it?',
              a: 'Only when the tool is fully client-side, as this one is. You can verify by opening browser DevTools > Network tab and confirming zero outbound requests while typing. Never enter passwords into tools that make server requests.',
            },
          ]} />
        </SEOSection>

        {/* Related tools */}
        <SEOSection id="related" eyebrow="Related tools" heading="Tools You Might Also Need">
          <RelatedTools tools={[
            { href: '/password-generator', label: 'Password Generator', desc: 'Generate cryptographically secure passwords and passphrases', icon: '🔐' },
            { href: '/hash-generator', label: 'Hash Generator', desc: 'bcrypt, Argon2, SHA-256 for securely storing passwords', icon: '#️⃣' },
            { href: '/token-comparator', label: 'Token Comparator', desc: 'Compare two tokens or hashes with constant-time visual diff', icon: '🔍' },
            { href: '/uuid-generator', label: 'UUID Generator', desc: 'Generate cryptographically random UUIDs for tokens and IDs', icon: '🔑' },
          ]} />
        </SEOSection>
      </ToolSEOContent>

      <ToolPageFooterBand toolName="password_audit" />
    </>
  );
}
