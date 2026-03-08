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

export default function PasswordGeneratorPage() {
  return (
    <>
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
    </>
  );
}
