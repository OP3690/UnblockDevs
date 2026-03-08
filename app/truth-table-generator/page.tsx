import type { Metadata } from 'next';
import Link from 'next/link';
import TruthTableGeneratorClient from './client';

export const metadata: Metadata = {
  title: 'Truth Table Generator — Boolean Logic, K-Map, SOP/POS | UnblockDevs',
  description:
    'Generate truth tables from boolean expressions. AND, OR, NOT, XOR, NAND, NOR, →, ↔. Karnaugh maps, minterms, maxterms, SOP/POS. Export code. 100% in your browser.',
  keywords: [
    'truth table generator',
    'boolean logic',
    'karnaugh map',
    'minterm maxterm',
    'SOP POS',
  ],
  openGraph: {
    title: 'Truth Table Generator — UnblockDevs',
    description: 'Boolean expression to truth table, K-map, SOP/POS. 100% browser-based.',
    type: 'website',
    url: 'https://unblockdevs.com/truth-table-generator',
  },
  alternates: {
    canonical: 'https://unblockdevs.com/truth-table-generator',
  },
};

export default function TruthTableGeneratorPage() {
  return (
    <>
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4" aria-labelledby="tt-heading">
        <h1 id="tt-heading" className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
          Truth Table Generator
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
