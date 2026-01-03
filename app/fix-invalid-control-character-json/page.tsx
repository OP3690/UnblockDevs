import type { Metadata } from 'next';
import FixInvalidControlCharacterClient from './client';

export const metadata: Metadata = {
  title: 'Fix "Invalid control character" JSON Error - Complete Guide | UnblockDevs',
  description: 'Learn how to fix "Invalid control character" JSON error. Common causes: unescaped newlines, tabs, control characters. Free JSON Fixer tool to fix instantly.',
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

