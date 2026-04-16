import type { Metadata } from 'next';
import { ToolPageFooterBand } from '@/components/tools/ToolPageShell';
import ToolSEOContent, {
  SEOSection, SEOProse, C, HowItWorks, UseCases, FAQ, RelatedTools, RelatedBlogPosts,
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
    'password security audit',
    'check password strength',
    'password strength meter',
    'test password security',
    'password checker online',
    'password analyzer',
    'password weakness detector',
    'password security score',
    'have i been pwned passwords',
    'breached password check',
    'compromised password check',
    'dictionary attack check',
    'brute force time calculator',
    'password crack time',
    'how long to crack password',
    'password pattern detection',
    'common password list',
    'rockyou password',
    'password scoring',
    'zxcvbn password strength',
    'estimate password crack time',
    'offline attack check',
    'online attack check',
    'password audit tool free',
    'password security test',
    'weak password detector',
    'password best practices',
    'owasp password guide',
    'check if password is leaked',
    'data breach password check',
    'bulk password audit',
    'password strength indicator',
    'password feedback',
    'credential stuffing prevention',
    'password audit no signup',
    'password strength checker free',
    'check password strength online',
    'password security audit tool',
    'password checker no upload',
    'password entropy calculator',
    'password strength tester',
    'hibp password checker',
    'have i been pwned password',
    'breached password checker',
    'password crack time estimator',
    'password complexity checker',
    'weak password detector',
    'password policy checker',
    'password audit browser',
    'bulk password checker',
    'password breach checker online',
    'check leaked password',
    'password security score',
    'password safety checker',
    'password reuse checker',
    'password exposure checker',
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
    {
      '@type': 'Question',
      name: 'What is a password security audit?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A password security audit analyzes a password for strength, entropy, detectable patterns, and breach status. It goes beyond a simple strength bar to give specific feedback: crack time estimate, pattern warnings (keyboard walks, leet speak, years), and recommendations to improve the password.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I check if my password has been leaked?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use the Have I Been Pwned (HIBP) check. This tool sends only the first 5 characters of your password SHA-1 hash to the HIBP API (k-anonymity model). The API returns hashes matching that prefix; your browser checks if your full hash is in the list. Your actual password is never transmitted.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is Have I Been Pwned?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Have I Been Pwned (HIBP) is a free service by security researcher Troy Hunt that lets you check if a password or email address has appeared in known data breaches. The password database contains billions of passwords from real breaches. Using k-anonymity, you can check your password without sending it to the service.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is password crack time calculated?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Crack time is calculated from entropy: the number of possible combinations is 2^(entropy bits). At 1 billion guesses per second (a realistic GPU offline attack rate), crack time = 2^bits / 1,000,000,000 seconds. A 72-bit password has ~4.7 quintillion combinations — trillions of years to crack at this rate.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is a dictionary attack?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A dictionary attack uses a list of common words, names, and known passwords (like the rockyou.txt wordlist with 14 million entries) to guess a password. If your password or a variation of it appears in such a list, it can be cracked in seconds even if it looks complex.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is credential stuffing?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Credential stuffing is an attack where stolen username/password pairs from one breach are automatically tried against other websites. If you reuse passwords across sites, a breach of one service puts all your accounts at risk. Using unique passwords for every account (stored in a password manager) prevents credential stuffing.',
      },
    },
    {
      '@type': 'Question',
      name: 'What makes a password weak?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Weak passwords include common words or names, short length (under 10 characters), keyboard walks like "qwerty" or "123456", leet speak substitutions like "p@ssw0rd", year patterns like "2023!", and passwords that have appeared in data breaches. Any of these dramatically reduce effective entropy.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is it safe to type my real password here?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. All analysis runs entirely in your browser using JavaScript. No password or hash is sent to any server. You can disconnect from the internet before using the tool and verify by checking DevTools Network tab — no requests are made while you type.',
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Audit a Password for Security Online',
  description: 'Step-by-step guide to checking password strength, entropy, and vulnerability patterns in your browser.',
  totalTime: 'PT1M',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Type your password', text: 'Paste or type a password into the checker. All processing is local — nothing leaves your device.' },
    { '@type': 'HowToStep', position: 2, name: 'See entropy & score', text: 'Instantly view entropy in bits, strength label (Very Weak to Extreme), and estimated crack time at 1B guesses/second.' },
    { '@type': 'HowToStep', position: 3, name: 'Review pattern warnings', text: 'The tool flags keyboard walks, leet speak, and year patterns that reduce real-world security.' },
    { '@type': 'HowToStep', position: 4, name: 'Follow improvement suggestions', text: 'Get specific, actionable tips to increase entropy and remove detectable patterns from your password.' },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://unblockdevs.com' },
    { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://unblockdevs.com/tools/json' },
    { '@type': 'ListItem', position: 3, name: 'Password Strength Checker & Audit', item: canonicalUrl },
  ],
};

export default function PasswordAuditPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
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
            {
              q: 'What is a password security audit?',
              a: 'A password security audit analyzes strength, entropy, detectable patterns, and breach status. It provides specific feedback: crack time estimate, pattern warnings (keyboard walks, leet speak, years), and improvement recommendations.',
            },
            {
              q: 'How do I check if my password has been leaked?',
              a: 'Use the HIBP check. This tool sends only the first 5 characters of your password SHA-1 hash to the HIBP API. The API returns matching hashes; your browser checks if your full hash is in the list. Your actual password is never transmitted.',
            },
            {
              q: 'What is Have I Been Pwned?',
              a: 'HIBP is a free service by Troy Hunt that lets you check if a password or email appeared in known data breaches. The password database contains billions of passwords from real breaches, checked via k-anonymity.',
            },
            {
              q: 'How is password crack time calculated?',
              a: 'Crack time = 2^(entropy bits) / 1,000,000,000 seconds at 1 billion guesses per second (a realistic GPU offline attack rate). A 72-bit password has ~4.7 quintillion combinations — trillions of years to crack.',
            },
            {
              q: 'What is a dictionary attack?',
              a: 'A dictionary attack uses a list of common words and known passwords (like the 14-million-entry rockyou.txt wordlist) to guess a password. If your password or a variation appears in such lists, it can be cracked in seconds.',
            },
            {
              q: 'What is credential stuffing?',
              a: 'Credential stuffing is an attack where stolen username/password pairs from one breach are tried against other sites. Using unique passwords for every account (stored in a password manager) prevents credential stuffing.',
            },
            {
              q: 'What makes a password weak?',
              a: 'Weak passwords include common words, short length (under 10 characters), keyboard walks like "qwerty", leet substitutions like "p@ssw0rd", year patterns, and passwords that appear in data breaches.',
            },
            {
              q: 'Is it safe to type my real password here?',
              a: 'Yes. All analysis runs in your browser. No password or hash is sent to any server. Check DevTools Network tab while typing to confirm no requests are made.',
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

        <SEOSection id="guides" eyebrow="Learn more" heading="Developer Guides">
          <RelatedBlogPosts posts={[
            { href: '/blog/top-10-json-errors-waste-developer-time', label: 'Security in APIs Guide' },
            { href: '/blog/json-best-practices-production-guide', label: 'Password Policy Best Practices' },
            { href: '/blog/why-json-breaks-in-real-world-apis', label: 'Auth Token Security' },
            { href: '/blog/fix-json-errors-complete-guide', label: 'Securing API Credentials' },
          ]} />
        </SEOSection>
      </ToolSEOContent>

      <ToolPageFooterBand toolName="password_audit" />
    </>
  );
}
