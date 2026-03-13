import type { Metadata } from 'next';
import Link from 'next/link';
import TruthTableGeneratorClient from './client';

const canonicalUrl = 'https://unblockdevs.com/truth-table-generator';

export const metadata: Metadata = {
  title:
    'Truth Table Generator — Boolean Expression Solver, Karnaugh Map, Minterms, SOP/POS, Code Export Online Free | UnblockDevs',
  description:
    'Generate truth tables from any boolean expression. Includes Karnaugh map, minterms, maxterms, SOP/POS canonical forms, and code export in JavaScript, Python, Java, and Go. Up to 8 variables. Free, 100% browser-based.',
  keywords: [
    'truth table generator',
    'truth table generator online',
    'truth table generator free',
    'boolean truth table generator',
    'karnaugh map generator',
    'k-map generator online',
    'boolean expression simplifier',
    'boolean expression solver online',
    'sop pos boolean',
    'minterm maxterm calculator',
    'logic gate truth table',
    'digital logic truth table generator',
    'de morgan truth table',
    'truth table to code generator',
    'boolean expression to javascript',
    'how to generate a truth table',
    'how to simplify boolean expressions',
    'what is a karnaugh map',
    'what is the difference between SOP and POS',
  ],
  openGraph: {
    title:
      'Truth Table Generator — Boolean Expression Solver, Karnaugh Map, Minterms, SOP/POS, Code Export Online Free | UnblockDevs',
    description:
      'Generate truth tables from any boolean expression. Karnaugh map, minterms, maxterms, SOP/POS, code export in JS, Python, Java, Go. Up to 8 variables. Free, browser-based.',
    type: 'website',
    url: canonicalUrl,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Truth Table Generator — Boolean Solver, K-Map, SOP/POS, Code Export Free | UnblockDevs',
    description:
      'Truth tables from any boolean expression. Karnaugh map, minterms, maxterms, SOP/POS. Export code in JavaScript, Python, Java, Go. Up to 8 variables. 100% browser-based.',
  },
  alternates: { canonical: canonicalUrl },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Truth Table Generator — Boolean Expression Solver, Karnaugh Map, Minterms, SOP/POS, Code Export',
  description:
    'Parse any boolean expression and generate the full truth table, Karnaugh map, minterms, maxterms, and SOP/POS canonical forms. Export working code in JavaScript, Python, Java, and Go. Up to 8 variables. Free, 100% browser-based.',
  url: canonicalUrl,
  applicationCategory: 'EducationalApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  featureList: [
    'Parse any boolean expression — AND, OR, NOT, XOR, NAND, NOR, implication, biconditional',
    'Full truth table for up to 8 variables (256 rows)',
    'Karnaugh map (K-Map) generation for simplification',
    'Minterms, maxterms, SOP and POS canonical forms',
    'Code export in JavaScript, Python, Java, and Go',
    '100% browser-based — no data sent to servers',
  ],
};

const faqSchema = {
  '@context': 'https://schema.org' as const,
  '@type': 'FAQPage' as const,
  mainEntity: [
    {
      '@type': 'Question' as const,
      name: 'How do I generate a truth table online?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Type your boolean expression using the operator buttons at unblockdevs.com/truth-table-generator — AND (∧), OR (∨), NOT (¬), XOR (⊕), NAND, NOR — then click Generate. The tool produces the complete truth table plus Karnaugh map, minterms, maxterms, and SOP/POS canonical forms.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'What is the difference between SOP and POS boolean forms?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'SOP (Sum of Products) expresses a boolean function as an OR of AND terms — one term for each row where the output is 1 (minterms). POS (Product of Sums) expresses it as an AND of OR terms — one term for each row where output is 0 (maxterms). Both are complete canonical representations of the same function.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'What is a Karnaugh map?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'A Karnaugh map (K-Map) is a visual method for simplifying boolean expressions. It arranges truth table rows in a grid where adjacent cells differ by one variable, allowing redundant terms to be identified and eliminated visually. This tool generates K-Maps automatically for up to 8 variables.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'What are minterms and maxterms?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'A minterm is a product (AND) term for each row where the output equals 1. A maxterm is a sum (OR) term for each row where the output equals 0. Together they form the SOP and POS canonical forms that completely describe any boolean function.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'How many variables can this truth table generator handle?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Up to 8 variables, producing truth tables with up to 256 rows. Most classroom problems use 2–4 variables (4–16 rows). The tool handles everything from simple 2-variable expressions to complex 8-variable digital logic circuits.',
      },
    },
  ],
};

export default function TruthTableGeneratorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4" aria-labelledby="tt-heading">
        <h1 id="tt-heading" className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
          Truth Table Generator — Boolean Expression Solver, Karnaugh Map, Minterms, SOP/POS, Code Export Online Free
        </h1>
        <p className="text-gray-700 text-base leading-relaxed mb-3">
          Parse any boolean expression and generate the full truth table, Karnaugh map, minterms, maxterms, and SOP/POS forms. Export working code in JavaScript, Python, Java, and Go. Up to 8 variables. Runs entirely in your browser.
        </p>
        <Link href="#tool" className="inline-block text-sm font-semibold text-primary-600 hover:text-primary-700">
          Use the tool →
        </Link>
      </article>
      <div id="tool">
        <TruthTableGeneratorClient />
      </div>
    </>
  );
}
