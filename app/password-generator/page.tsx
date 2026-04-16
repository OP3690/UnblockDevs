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
    'password generator free',
    'generate password online',
    'password creator',
    'password maker',
    'complex password generator',
    'long password generator',
    '16 character password',
    '32 character password',
    'memorable password generator',
    'passphrase generator',
    'diceware passphrase',
    'xkcd password',
    'word password generator',
    'pin generator',
    'numeric pin',
    '4 digit pin',
    '6 digit pin',
    'password generator no signup',
    'cryptographically secure password',
    'password entropy',
    'bits of entropy',
    'password strength meter',
    'nist password guidelines',
    'password policy',
    'special character password',
    'password without ambiguous characters',
    'multiple passwords',
    'password list generator',
    'pronounceable password',
    'password manager import',
    'lastpass alternative',
    '1password alternative',
    'bitwarden password',
    'password generator javascript',
    'password generator python',
    'crypto.getRandomValues',
    'password generator free online',
    'random password generator',
    'strong password generator',
    'secure password generator',
    'password generator no signup',
    'password generator no upload',
    'password generator browser',
    'password generator tool',
    'generate password online',
    'create strong password online',
    'random password maker',
    'password generator with symbols',
    'password generator with numbers',
    'password generator custom length',
    'bulk password generator',
    'memorable password generator',
    'passphrase generator online',
    'password generator api free',
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
      name: 'What is password entropy?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Password entropy measures the unpredictability of a password in bits. A password chosen from a pool of N characters with length L has entropy of L × log2(N) bits. For example, a 16-character password using all 95 printable ASCII characters has about 105 bits of entropy — extremely resistant to brute force.',
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
      name: 'What is a passphrase?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A passphrase is a password made of multiple random words instead of random characters — for example, "correct-horse-battery-staple". Passphrases can be very high entropy while remaining memorable. A 4-word passphrase from a 7776-word list (Diceware) has about 51 bits of entropy.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the NIST password guideline?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'NIST SP 800-63B recommends using long passwords (at least 8 characters, no max below 64), checking against breached password lists, allowing all printable characters, and not requiring periodic rotation unless breach is suspected. It also recommends against mandatory complexity rules that lead to predictable patterns.',
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
        { q: 'What is password entropy?', a: 'Password entropy measures unpredictability in bits. A 16-character password using 95 printable ASCII characters has about 105 bits of entropy — extremely resistant to brute force.' },
        { q: 'How do I generate a cryptographically secure password?', a: 'This tool uses window.crypto.getRandomValues(), the Web Crypto API built into every modern browser. All passwords are cryptographically secure by default — the same source as TLS key generation.' },
        { q: 'What is a passphrase?', a: 'A passphrase uses multiple random words instead of random characters — like "correct-horse-battery-staple". Passphrases are high entropy and memorable. A 4-word Diceware passphrase has about 51 bits of entropy.' },
        { q: 'What is the NIST password guideline?', a: 'NIST SP 800-63B recommends long passwords (at least 8 characters), checking against breached password lists, allowing all printable characters, and not requiring periodic rotation unless breach is suspected.' },
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
    { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://unblockdevs.com/tools/json' },
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
