import type { Metadata } from 'next';
import Link from 'next/link';
import PasswordAuditClient from './client';

export const metadata: Metadata = {
  title: 'Password Audit & Policy Generator — Strength Checker, Entropy, NIST 2024 | UnblockDevs',
  description:
    'Password strength checker and password policy generator. Check entropy, crack time, keyboard walks, leet speak, year patterns. Build policies with live regex and export code in JS, Python, Go, Java, PHP. 100% in your browser.',
  keywords: [
    'password strength checker',
    'how secure is my password',
    'password entropy calculator',
    'password policy generator',
    'how long to crack password',
    'nist password guidelines',
    'password audit',
    'password policy regex',
  ],
  openGraph: {
    title: 'Password Audit & Policy Generator — UnblockDevs',
    description: 'Check password strength, entropy, crack time. Build password policies with regex and export code. NIST 2024–aligned. 100% browser-based.',
    type: 'website',
    url: 'https://unblockdevs.com/password-audit',
  },
  alternates: {
    canonical: 'https://unblockdevs.com/password-audit',
  },
};

const faqSchema = {
  '@context': 'https://schema.org' as const,
  '@type': 'FAQPage' as const,
  mainEntity: [
    {
      '@type': 'Question' as const,
      name: 'Is it safe to paste my password into the password strength checker?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Yes. All checking runs in your browser. Nothing is sent to any server; no password is stored. The tool uses math (Shannon entropy, character set size, crack time formula) entirely on your device.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'What is password entropy?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Entropy (in bits) measures how unpredictable a password is. Higher entropy means more possible combinations and longer time to crack. The tool estimates entropy from the character set used and length.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'What are NIST 2024 password guidelines?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'NIST SP 800-63B recommends longer passphrases or passwords with complexity, avoiding predictable patterns (keyboard walks, dictionary words, years). The policy generator helps you enforce minimum length, character types, and optional rules.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'Can I export the password policy as code?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Yes. In Developer mode you build a policy (min/max length, required character types, allowed symbols). The tool generates a regex and exports validation code in JavaScript, Python, Go, Java, and PHP.',
      },
    },
  ],
};

export default function PasswordAuditPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div id="tool">
        <PasswordAuditClient />
      </div>
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-gray-200" aria-labelledby="audit-heading">
        <h1 id="audit-heading" className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
          Password Audit &amp; Policy Generator
        </h1>
        <p className="text-gray-700 text-base leading-relaxed mb-3">
          Two modes. <strong>Personal:</strong> paste a password to get entropy score, crack time estimate, pattern detection (keyboard walks, leet speak, years), and improvement suggestions. <strong>Developer:</strong> build a password policy with live regex and code export in JavaScript, Python, Go, Java, and PHP. All math runs in your browser; nothing is sent to any server.
        </p>
        <Link href="/password-generator" className="inline-block text-sm font-semibold text-primary-600 hover:text-primary-700">
          Generate strong passwords →
        </Link>
      </article>
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-gray-200" aria-labelledby="faq-heading">
        <h2 id="faq-heading" className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
        <dl className="space-y-4">
          <div>
            <dt className="font-semibold text-gray-900">Is it safe to paste my password into the strength checker?</dt>
            <dd className="text-gray-700 mt-1 pl-4 border-l-2 border-gray-200">Yes. All checking runs in your browser. Nothing is sent to any server; no password is stored.</dd>
          </div>
          <div>
            <dt className="font-semibold text-gray-900">What is password entropy?</dt>
            <dd className="text-gray-700 mt-1 pl-4 border-l-2 border-gray-200">Entropy (in bits) measures how unpredictable a password is. Higher entropy means longer time to crack. The tool estimates it from character set and length.</dd>
          </div>
          <div>
            <dt className="font-semibold text-gray-900">What are NIST 2024 password guidelines?</dt>
            <dd className="text-gray-700 mt-1 pl-4 border-l-2 border-gray-200">NIST recommends longer passphrases or complexity, and avoiding predictable patterns. The policy generator helps you enforce min length, character types, and optional rules.</dd>
          </div>
          <div>
            <dt className="font-semibold text-gray-900">Can I export the password policy as code?</dt>
            <dd className="text-gray-700 mt-1 pl-4 border-l-2 border-gray-200">Yes. In Developer mode you get a live regex and can export validation code in JavaScript, Python, Go, Java, and PHP.</dd>
          </div>
        </dl>
      </section>
    </>
  );
}
