import type { Metadata } from 'next';
import ToolPageShell from '@/components/tools/ToolPageShell';
import ToolSEOContent, {
  SEOSection, SEOProse, HowItWorks, UseCases, FAQ, RelatedTools,
} from '@/components/tools/ToolSEOContent';
import PasswordGeneratorClient from './client';

const canonicalUrl = 'https://unblockdevs.com/password-generator';

export const metadata: Metadata = {
  title: 'Free Password Generator — Secure Random Passwords | UnblockDevs',
  description:
    'Generate cryptographically secure passwords and passphrases with entropy meter and breach check. API key generator included. 100% browser-based — nothing stored or sent.',
  keywords: [
    'password generator',
    'strong password generator',
    'random password generator',
    'secure password generator',
    'passphrase generator',
    'password strength checker',
    'api key generator',
    'cryptographically secure password',
    'how to generate a strong password',
    'password entropy calculator',
    'bulk password generator',
    'password generator free online',
  ],
  openGraph: {
    title: 'Free Password Generator — Secure Random Passwords, Passphrases & API Keys | UnblockDevs',
    description: 'Generate cryptographically secure passwords, passphrases, and API keys. Entropy meter, strength checker, breach check included. 100% browser-based — nothing stored or sent anywhere.',
    type: 'website',
    url: canonicalUrl,
    images: [{ url: 'https://unblockdevs.com/api/og?title=Password%20Generator&emoji=%F0%9F%94%92&desc=Generate%20cryptographically%20secure%20random%20passwords%20online', width: 1200, height: 630, alt: 'Password Generator — UnblockDevs' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Password Generator — Secure Random Passwords & Passphrases',
    description: 'Generate strong passwords and passphrases with entropy meter and breach check. API key generator included. 100% browser-based, nothing sent.',
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
  dateModified: '2026-05-27',
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
  ],};

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
    {
      '@type': 'Question',
      name: 'What makes a password strong?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A strong password has high entropy: long length, uses uppercase, lowercase, numbers, and symbols, and contains no predictable patterns or dictionary words. Aim for at least 16 characters for sensitive accounts. The entropy meter in the tool shows exact bit strength and estimated crack time.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I generate a cryptographically secure password in JavaScript?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use the Web Crypto API: call window.crypto.getRandomValues(new Uint8Array(32)) to get 32 cryptographically random bytes, then encode them as hex or base64. This is the same source this tool uses. Avoid Math.random() for passwords — it is not cryptographically secure. In Node.js, use crypto.randomBytes(32).toString("hex") from the built-in crypto module.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I generate a cryptographically secure password?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'This tool uses window.crypto.getRandomValues(), the Web Crypto API built into every modern browser, which provides cryptographically secure random bytes. This is the same source used for TLS key generation. All passwords generated here are cryptographically secure by default.',
      },
    },
    {
      '@type': 'Question',
      name: 'What makes a password hash different from encryption?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Hashing is a one-way function — you cannot recover the original password from the hash. Encryption is reversible with a key. When storing passwords in a database, always hash (using bcrypt or Argon2) never encrypt — if your encryption key is compromised, all passwords are exposed. If your hash database is stolen, attackers still cannot reverse the hashes without brute force.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why does my company force password rotation every 90 days — is that actually more secure?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. NIST SP 800-63B explicitly recommends against mandatory periodic password rotation because it leads to predictable patterns — users just increment a number at the end. The current NIST guidance is: use long, unique passwords, check against breach lists, and only require rotation when a breach is confirmed. Forced 90-day resets often make security worse, not better.',
      },
    },
    {
      '@type': 'Question',
      name: 'How many characters should a password be?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Minimum 12 characters for general accounts; 16+ for sensitive accounts like email, banking, and admin dashboards. For master passwords of password managers, use a 6+ word passphrase. Each additional character exponentially increases the difficulty of brute-force attacks.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I generate passwords in bulk?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use the Bulk Generate option to create up to 20 passwords at once with the same settings. Export them as JSON, CSV, or TXT for import into password managers, test fixtures, or provisioning scripts. All passwords are generated client-side with cryptographically secure randomness.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is my generated password stored?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Generated passwords exist only in your browser\'s memory and are never stored, logged, or sent anywhere. The tab auto-clears the clipboard after 30 seconds when you copy a password. Once you navigate away, the generated password is gone.',
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
        { q: 'What makes a password strong?', a: 'High entropy: long length, using uppercase, lowercase, numbers, and symbols, with no predictable patterns or dictionary words. Aim for at least 16 characters for sensitive accounts.' },
        { q: 'How do I generate a cryptographically secure password in JavaScript?', a: 'Use window.crypto.getRandomValues(new Uint8Array(32)) and encode the result as hex or base64. This is the same source this tool uses. Never use Math.random() for passwords — it is not cryptographically secure. In Node.js, use crypto.randomBytes(32).toString("hex") from the built-in crypto module.' },
        { q: 'How do I generate a cryptographically secure password?', a: 'This tool uses window.crypto.getRandomValues(), the Web Crypto API built into every modern browser. All passwords are cryptographically secure by default — the same source as TLS key generation.' },
        { q: 'What makes a password hash different from encryption?', a: 'Hashing is one-way — you cannot recover the original password from the hash. Encryption is reversible with a key. Always hash passwords (with bcrypt or Argon2) rather than encrypting them. If your hash database is stolen, attackers cannot reverse the hashes without brute force — but a compromised encryption key exposes all passwords at once.' },
        { q: 'Why does my company force password rotation every 90 days — is that actually more secure?', a: 'No. NIST SP 800-63B explicitly recommends against mandatory periodic rotation because it leads to predictable patterns — users just increment a number at the end. Current NIST guidance: use long unique passwords, check against breach lists, and only require rotation when a breach is confirmed.' },
        { q: 'How many characters should a password be?', a: 'Minimum 12 characters for general accounts; 16+ for sensitive accounts. For master passwords, use a 6+ word passphrase. Each additional character exponentially increases brute-force difficulty.' },
        { q: 'How do I generate passwords in bulk?', a: 'Use the Bulk Generate option to create up to 20 passwords at once. Export as JSON, CSV, or TXT for import into password managers, test fixtures, or provisioning scripts.' },
        { q: 'Is my generated password stored?', a: 'No. Generated passwords exist only in your browser memory and are never stored, logged, or sent anywhere. The clipboard is auto-cleared after 30 seconds when you copy a password.' },
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

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Generate a Secure Password Online',
  description: 'Step-by-step guide to generating strong, random passwords.',
  totalTime: 'PT1M',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Set your password length', text: 'Use the slider or input field to choose a password length. 16+ characters is recommended for high-security accounts.' },
    { '@type': 'HowToStep', position: 2, name: 'Choose character sets', text: 'Toggle uppercase letters, lowercase letters, numbers, and symbols. Enabling all character sets makes passwords harder to crack.' },
    { '@type': 'HowToStep', position: 3, name: 'Click Generate', text: 'Click Generate to create a cryptographically secure random password. Click again to get a new one at any time.' },
    { '@type': 'HowToStep', position: 4, name: 'Copy and store safely', text: 'Click Copy to copy the password. Store it in a password manager — never in plain text files or spreadsheets.' },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://unblockdevs.com' },
    { '@type': 'ListItem', position: 2, name: 'Developer Tools', item: 'https://unblockdevs.com' },
    { '@type': 'ListItem', position: 3, name: 'Password Generator', item: canonicalUrl },
  ],
};

export default function PasswordGeneratorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
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
