import type { Metadata } from 'next';
import JsonStringifyVsJsonParseDifferenceClient from './client';

export const metadata: Metadata = {
  title: 'JSON.stringify() undefined Behavior & vs JSON.parse() | UnblockDevs',
  description: 'How JSON.stringify() handles undefined: omits object properties, converts array undefined to null, returns undefined at top level. JSON.parse() differences with examples.',
  keywords: [
    'json stringify vs json parse',
    'json parse online',
    'json serialize online',
    'json stringify js',
    'json parser online',
    'json stringify example',
    'json parse vs stringify',
    'json.stringify undefined properties removed',
    'json.stringify undefined properties omitted',
    'json.stringify omits properties with undefined values',
    'json.stringify omits undefined properties',
    'json.stringify array undefined becomes null',
    'json.stringify undefined in array becomes null',
    'json.stringify undefined in array becomes null mdn',
    'json.stringify(undefined) returns undefined',
    'json.stringify behavior with undefined',
    'json.stringify behavior with undefined values',
    'json.stringify omit undefined properties',
    'json.stringify undefined',
    'json stringify undefined value',
    'json keys must be strings rfc 8259',
    'json.stringify null vs undefined'
  ],
  openGraph: {
    title: 'JSON.stringify() undefined Behavior & vs JSON.parse() | UnblockDevs',
    description: 'How JSON.stringify() handles undefined properties (omits them), undefined in arrays (becomes null), and when it returns undefined. Complete guide.',
    type: 'article',
    url: 'https://unblockdevs.com/blog/json-stringify-vs-json-parse-difference',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JSON.stringify() undefined Behavior | UnblockDevs',
    description: 'JSON.stringify() omits undefined properties, converts array undefined to null. Full behavior guide.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/json-stringify-vs-json-parse-difference' },
};

export default function JsonStringifyVsJsonParseDifference() {
  return <JsonStringifyVsJsonParseDifferenceClient />;
}

