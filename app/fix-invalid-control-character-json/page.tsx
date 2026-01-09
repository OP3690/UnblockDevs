import type { Metadata } from 'next';
import FixInvalidControlCharacterClient from './client';

export const metadata: Metadata = {
  title: 'Free Guide: Fix "Invalid Control Character" JSON Error | UnblockDevs',
  description: 'Fix "Invalid control character" JSON error instantly. Free guide with examples and JSON fixer tool. No signup required, works in your browser.',
  keywords: [
    'fix invalid control character json',
    'invalid control character json error',
    'json control character error',
    'fix json newline error',
    'json escape characters',
    'invalid control character fix'
  ],
};

export default function FixInvalidControlCharacter() {
  return <FixInvalidControlCharacterClient />;
}

