import type { Metadata } from 'next';
import HowJsonFixersWorkClient from './client';

export const metadata: Metadata = {
  title: 'How to Fix Invalid JSON From AI – How JSON Fixers Work Internally | UnblockDevs',
  description: 'How to fix invalid JSON from AI: learn how JSON fixers work internally—tokenization, error recovery, trailing comma and missing quote fixes. Resolve broken AI-generated JSON instantly.',
  keywords: [
    'how to fix invalid json from ai',
    'fix invalid json',
    'how json fixers work',
    'json fixer algorithm',
    'json error recovery',
    'resolve json errors',
    'json tokenization',
  ],
};

export default function HowJsonFixersWork() {
  return <HowJsonFixersWorkClient />;
}

