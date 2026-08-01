import type { Metadata } from 'next';
import HowToFixNullpointerexceptionClient from './client';

export const metadata: Metadata = {
  title: 'Fix NullPointerException in Java 2026 | UnblockDevs',
  description: 'Fix NullPointerException in Java. Causes, prevention, code examples. Beginner-friendly. 2026.',
  keywords: [
    'nullpointerexception java',
    'fix nullpointerexception',
    'java nullpointerexception',
    'how to fix nullpointerexception',
    'nullpointerexception fix',
    'java npe',
    'nullpointerexception solution',
    'java null pointer exception',
    'prevent nullpointerexception',
    'java null check',
    'nullpointerexception handling',
    'java null safety',
    'fix npe java',
    'nullpointerexception examples',
    'java nullpointerexception tutorial'
  ],
  openGraph: {
    title: 'How to Fix "NullPointerException" in Java (Beginner-Friendly): Complete Guide 2026',
    description: 'Fix NullPointerException in Java. Causes, solutions, examples.',
    type: 'article',
    publishedTime: '2026-01-25T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/how-to-fix-nullpointerexception-java-beginner-friendly',
    images: [{ url: 'https://unblockdevs.com/api/og?title=How%20to%20Fix&emoji=%F0%9F%94%A7&desc=Fix%20NullPointerException%20in%20Java', width: 1200, height: 630, alt: 'How to Fix — UnblockDevs Blog' }],

  },  twitter: {
    card: 'summary_large_image',
    title: 'How to Fix ',
    description: 'Fix NullPointerException in Java. Causes, solutions, examples.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/how-to-fix-nullpointerexception-java-beginner-friendly' },

};

export default function HowToFixNullpointerexceptionGuide() {
  return <HowToFixNullpointerexceptionClient />;
}
