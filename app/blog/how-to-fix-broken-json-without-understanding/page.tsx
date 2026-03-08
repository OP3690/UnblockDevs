import type { Metadata } from 'next';
import HowToFixBrokenJsonWithoutUnderstandingClient from './client';

export const metadata: Metadata = {
  title: 'Fix Broken JSON Without Understanding It | UnblockDevs',
  description: 'Fix broken JSON without coding. Step-by-step for non-devs, students. Free JSON Fixer tool.',
  keywords: [
    'fix broken json without coding',
    'fix json for beginners',
    'repair json no coding',
    'fix json simple guide',
    'json fixer for non developers',
    'fix json without understanding',
    'simple json fixer'
  ],
  alternates: { canonical: 'https://unblockdevs.com/blog/how-to-fix-broken-json-without-understanding' },

};

export default function HowToFixBrokenJsonWithoutUnderstanding() {
  return <HowToFixBrokenJsonWithoutUnderstandingClient />;
}

