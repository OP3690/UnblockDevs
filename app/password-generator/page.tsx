import type { Metadata } from 'next';
import ToolPageShell from '@/components/tools/ToolPageShell';
import ToolSEOContent, {
  SEOSection, SEOProse, HowItWorks, UseCases, FAQ, RelatedTools,
} from '@/components/tools/ToolSEOContent';
import PasswordGeneratorClient from './client';

const canonicalUrl = 'https://unblockdevs.com/password-generator';

export const metadata: Metadata = {
  title: 'Password Generator — Secure Random Passwords & Passphrases Online | UnblockDevs',
  description:
    'Generate cryptographically secure passwords, passphrases, and API keys. Entropy meter, strength calculator, breach check, bulk export. 100% in your browser — no password is ever stored or sent.',
  keywords: [
    'password generator',
    'strong password generator',
    'random password generator',
    'passphrase generator',
    'secure password generator',
    'password strength checker',
    'entropy calculator',
    'api key generator',
    'secret key generator',
    'password generator online',
    'random password online',
    'bulk password generator',
  ],
  openGraph: {
    title: 'Password Generator — Secure Random Passwords & Passphrases | UnblockDevs',
    description: 'Cryptographically secure passwords and passphrases. Entropy, strength meter, breach check. 100% browser-based.',
    type: 'website',
    url: canonicalUrl,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs Password Generator' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Password Generator — Secure Random Passwords | UnblockDevs',
    description: 'Generate strong passwords and passphrases. Entropy, strength meter, breach check. 100% browser-based.',
  },
  alternates: { canonical: canonicalUrl },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Password Generator',
  url: canonicalUrl,
  description: 'Generate cryptographically secure passwords, passphrases, and API keys. Entropy meter, strength calculator, breach check. 100% client-side.',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  featureList: [
    'Cryptographically secure random passwords',
    'Passphrase generator (BIP39-style word lists)',
    'Pattern-based password generation',
    'Entropy and crack-time calculator',
    'Have I Been Pwned breach check (k-anonymity)',
    'Bulk generate up to 20 passwords',
    'JWT / API / OAuth secret key generator',
    '100% client-side — nothing stored or sent',
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '1450',
    bestRating: '5',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How long should a password be?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'At minimum 12 characters for general accounts; 16+ for sensitive accounts like email, banking, and admin panels. Each extra character exponentially increases brute-force difficulty. The entropy meter in the tool shows exact crack-time estimates at 1 billion guesses per second.',
      },
    },
    {
      '@type': 'Question',
      name: 'What makes a password strong?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A strong password has high entropy: it is long, uses a large character set (uppercase, lowercase, numbers, symbols), and is not predictable. Avoid dictionary words, names, dates, and patterns like "Password1!". The strength meter shows entropy in bits — aim for 80+ bits for sensitive accounts.',
      },
    },
    {
      '@type': 'Question',
      name: 'Passphrase vs password — which is better?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Both can be equally strong. A 4-word passphrase like "correct-horse-battery-staple" has ~44 bits of entropy per word (from a large wordlist), making it very strong and far easier to remember or type than a random 16-character string. Use passphrases for master passwords you must memorise; use random passwords for everything stored in a password manager.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is it safe to use an online password generator?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, when it runs entirely in your browser. This tool uses the Web Crypto API (window.crypto.getRandomValues) which is a cryptographically secure random number generator built into every modern browser. No password is sent to any server — you can verify this by disconnecting from the internet before generating.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I generate API keys or JWT secrets here?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. The "Secret key generator" section produces hex, base64url, and other encodings suitable for JWT signing secrets, API keys, OAuth secrets, and AES encryption keys. All keys are generated client-side; copy them directly into your environment variables and never commit them to version control.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the Have I Been Pwned check?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The breach check uses the k-anonymity model from the HaveIBeenPwned API. Your password is hashed with SHA-1 and only the first 5 characters of the hash are sent to the API. The API returns all matching hashes — your client checks whether your full hash appears. Your actual password is never transmitted.',
      },
    },
  ],
};

const seoContent = (
  <ToolSEOContent>
    <SEOSection id="what" heading="What Is a Password Generator?">
      <SEOProse>
        A <strong>password generator</strong> creates random, high-entropy strings or word sequences that
        are hard for attackers to guess or brute-force. Unlike a password you invent yourself, a
        generated password has no predictable patterns — no birthdays, no keyboard walks, no dictionary
        words — which means it resists every common attack method from dictionary attacks to credential
        stuffing.
      </SEOProse>
      <SEOProse>
        This generator uses the Web Crypto API's <strong>getRandomValues()</strong> — the same
        cryptographically secure source used by browsers for TLS — so every character is drawn from a
        true random pool, not a weak pseudo-random function.
      </SEOProse>
    </SEOSection>

    <SEOSection id="how" eyebrow="How it works" heading="Generate a Secure Password in Seconds">
      <HowItWorks steps={[
        { n: '01', title: 'Choose mode', desc: 'Pick Random (character-based), Passphrase (word-based), or Pattern for custom formats.' },
        { n: '02', title: 'Configure options', desc: 'Set length, character sets, word count, separators, or define your own pattern.' },
        { n: '03', title: 'Generate & check strength', desc: 'See entropy in bits and an estimated crack time at 1B guesses/second instantly.' },
        { n: '04', title: 'Copy or export', desc: 'Copy to clipboard (auto-clears in 30s) or export a bulk list as JSON, CSV, or TXT.' },
      ]} />
    </SEOSection>

    <SEOSection id="uses" eyebrow="Use cases" heading="When Developers Use a Password Generator">
      <UseCases cases={[
        { icon: '🔐', title: 'Account Passwords', desc: 'Generate strong unique passwords for every service — store them in your password manager.' },
        { icon: '🔑', title: 'API Keys & Tokens', desc: 'Create cryptographically random API keys and bearer tokens for your applications.' },
        { icon: '🌱', title: 'Seed Phrases & Secrets', desc: 'Generate passphrase-style seed values for internal tooling or mnemonic backups.' },
        { icon: '🗄️', title: 'Database Passwords', desc: 'Set high-entropy passwords for Postgres, MySQL, and Redis instances in production.' },
        { icon: '📶', title: 'Wi-Fi & Router Passwords', desc: 'Replace default router credentials with strong random passwords.' },
        { icon: '🧪', title: 'Test Data', desc: 'Bulk-generate realistic password fixtures for load testing or security audits.' },
      ]} />
    </SEOSection>

    <SEOSection id="faq" eyebrow="FAQ" heading="Frequently Asked Questions">
      <FAQ items={[
        { q: 'How long should a password be?', a: 'At minimum 12 characters for general accounts; 16+ for sensitive accounts like email, banking, and admin panels. Each extra character exponentially increases brute-force difficulty. The entropy meter shows exact crack-time estimates at 1 billion guesses per second.' },
        { q: 'What makes a password strong?', a: 'High entropy: long length, a large character set (uppercase, lowercase, numbers, symbols), and no predictable patterns. Avoid dictionary words, names, dates, and keyboard walks. Aim for 80+ bits of entropy for sensitive accounts.' },
        { q: 'Passphrase vs password — which is better?', a: 'Both can be equally strong. A 4-word passphrase has ~44 bits per word from a large wordlist, making it very strong and far easier to remember than a random 16-character string. Use passphrases for master passwords you must memorise; use random passwords for everything stored in a password manager.' },
        { q: 'Is it safe to use an online password generator?', a: 'Yes, when it runs entirely in your browser. This tool uses window.crypto.getRandomValues() — the cryptographically secure RNG built into every modern browser. No password is sent to any server.' },
        { q: 'Can I generate API keys or JWT secrets here?', a: 'Yes. The secret key generator section produces hex, base64url, and other encodings suitable for JWT signing, API keys, OAuth secrets, and AES keys. All keys are generated client-side.' },
        { q: 'What is the Have I Been Pwned breach check?', a: "It uses the k-anonymity model from the HaveIBeenPwned API. Only the first 5 characters of your password's SHA-1 hash are sent to the API. Your actual password is never transmitted." },
      ]} />
    </SEOSection>

    <SEOSection id="related" eyebrow="Related tools" heading="Tools You Might Also Need">
      <RelatedTools tools={[
        { href: '/hash-generator', label: 'Hash Generator', desc: 'bcrypt, Argon2, SHA-256 for storing passwords securely', icon: '#️⃣' },
        { href: '/uuid-generator', label: 'UUID Generator', desc: 'Generate cryptographically random UUIDs for tokens and IDs', icon: '🔑' },
        { href: '/base64-encoder', label: 'Base64 Encoder', desc: 'Encode secrets to Base64 for headers and config files', icon: '🔤' },
        { href: '/token-comparator', label: 'Token Comparator', desc: 'Compare two tokens or hashes with constant-time visual diff', icon: '🔍' },
      ]} />
    </SEOSection>
  </ToolSEOContent>
);

export default function PasswordGeneratorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ToolPageShell
        title="Password Generator"
        subtitle="Cryptographically secure passwords, passphrases and API keys. Nothing ever leaves your browser."
        icon="🔐"
        features={['No signup', 'Free forever', 'Crypto-secure RNG']}
        toolName="password_generator"
        embedTool
        tool={<PasswordGeneratorClient />}
        belowCard={seoContent}
      />
    </>
  );
}
