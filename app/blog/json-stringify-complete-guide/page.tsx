import type { Metadata } from 'next';
import JsonStringifyCompleteGuideClient from './client';

export const metadata: Metadata = {
  title: 'JSON.stringify() Complete Guide: Examples, Syntax & Best Practices | UnblockDevs',
  description: 'Complete guide to JSON.stringify() in JavaScript. Learn syntax, examples, replacer function, space parameter, and common use cases. Includes interactive examples and best practices.',
  keywords: [
    'json stringify',
    'json stringify javascript',
    'json stringify examples',
    'json stringify tutorial',
    'javascript json stringify',
    'json stringify pretty',
    'json stringify array',
    'json stringify online',
    'json stringify online without newlines',
    'json stringify without newlines',
    'json stringify js',
    'json stringify example'
  ],
};

export default function JsonStringifyCompleteGuide() {
  return <JsonStringifyCompleteGuideClient />;
}

