import type { Metadata } from 'next';
import Link from 'next/link';
import PasswordGeneratorClient from './client';

export const metadata: Metadata = {
  title: 'Password Generator — Secure, Random & Passphrase | UnblockDevs',
  description:
    'Generate cryptographically secure passwords and passphrases. Entropy calculator, strength meter, breach check, secret keys. 100% in your browser — nothing is stored or sent.',
  keywords: [
    'password generator',
    'random password',
    'passphrase generator',
    'secure password',
    'password strength',
    'entropy calculator',
  ],
  openGraph: {
    title: 'Password Generator — UnblockDevs',
    description: 'Secure password and passphrase generator. Entropy, strength meter, breach check. 100% browser-based.',
    type: 'website',
    url: 'https://unblockdevs.com/password-generator',
  },
  alternates: {
    canonical: 'https://unblockdevs.com/password-generator',
  },
};

const faqSchema = {
  '@context': 'https://schema.org' as const,
  '@type': 'FAQPage' as const,
  mainEntity: [
    {
      '@type': 'Question' as const,
      name: 'Is this password generator safe to use?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Yes. Passwords are generated in your browser using the Web Crypto API (cryptographically secure randomness). Nothing is sent to any server; no passwords are stored. Optional breach check uses k-anonymity so your full password is never transmitted.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'What is a passphrase and when should I use it?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'A passphrase is a sequence of random words (e.g. correct-horse-battery-staple). It is easier to type and remember than a long random string while still offering strong entropy. Use passphrases when you need to remember the secret; use random passwords when a password manager will store it.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'What does entropy mean for passwords?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Entropy (in bits) measures how unpredictable a password is. Higher entropy means more possible combinations and harder to crack. The tool shows entropy and an estimated crack time so you can see how strong your password is.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'Can I generate API keys or secret keys?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Yes. The generator can create hex, base64, or other secret keys (e.g. for API keys or tokens). All generation is client-side; copy and store keys securely. Never commit them to version control.',
      },
    },
  ],
};

export default function PasswordGeneratorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4" aria-labelledby="pw-gen-heading">
        <h1 id="pw-gen-heading" className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
          Password Generator
        </h1>
        <p className="text-gray-700 text-base leading-relaxed mb-3">
          Create cryptographically secure passwords and memorable passphrases. Choose length, character sets, and see entropy and crack-time estimates. All generation runs in your browser; no password is ever stored or sent.
        </p>
        <Link href="#tool" className="inline-block text-sm font-semibold text-primary-600 hover:text-primary-700">
          Use the tool →
        </Link>
      </article>
      <div id="tool">
        <PasswordGeneratorClient />
      </div>
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-gray-200" aria-labelledby="faq-heading">
        <h2 id="faq-heading" className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
        <dl className="space-y-4">
          <div>
            <dt className="font-semibold text-gray-900">Is this password generator safe to use?</dt>
            <dd className="text-gray-700 mt-1 pl-4 border-l-2 border-gray-200">Passwords are generated in your browser using the Web Crypto API (cryptographically secure randomness). Nothing is sent to any server; no passwords are stored. Optional breach check uses k-anonymity so your full password is never transmitted.</dd>
          </div>
          <div>
            <dt className="font-semibold text-gray-900">What is a passphrase and when should I use it?</dt>
            <dd className="text-gray-700 mt-1 pl-4 border-l-2 border-gray-200">A passphrase is a sequence of random words (e.g. correct-horse-battery-staple). It is easier to type and remember than a long random string while still offering strong entropy. Use passphrases when you need to remember the secret; use random passwords when a password manager will store it.</dd>
          </div>
          <div>
            <dt className="font-semibold text-gray-900">What does entropy mean for passwords?</dt>
            <dd className="text-gray-700 mt-1 pl-4 border-l-2 border-gray-200">Entropy (in bits) measures how unpredictable a password is. Higher entropy means more possible combinations and harder to crack. The tool shows entropy and an estimated crack time so you can see how strong your password is.</dd>
          </div>
          <div>
            <dt className="font-semibold text-gray-900">Can I generate API keys or secret keys?</dt>
            <dd className="text-gray-700 mt-1 pl-4 border-l-2 border-gray-200">Yes. The generator can create hex, base64, or other secret keys (e.g. for API keys or tokens). All generation is client-side; copy and store keys securely. Never commit them to version control.</dd>
          </div>
        </dl>
      </section>
    </>
  );
}
