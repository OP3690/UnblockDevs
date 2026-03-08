import type { Metadata } from 'next';
import HTMLInterviewQuestionsClient from './client';

export const metadata: Metadata = {
  title: 'HTML Interview Questions – Top 50 | UnblockDevs',
  description: 'Prepare for HTML interviews with 50+ commonly asked HTML interview questions and detailed answers. Covering HTML5, semantic HTML, forms, accessibility, and more.',
  keywords: [
    'HTML interview questions',
    'HTML5 interview',
    'HTML questions',
    'web development interview',
    'HTML interview prep',
    'frontend interview',
    'HTML quiz',
    'HTML exam questions',
    'HTML technical interview'
  ],
  openGraph: {
    title: 'HTML Interview Questions: Top 50 Questions & Answers',
    description: 'Prepare for HTML interviews with 50+ commonly asked questions and detailed answers.',
    type: 'article',
    publishedTime: '2024-01-26T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/html-interview-questions',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],

  },  alternates: { canonical: 'https://unblockdevs.com/blog/html-interview-questions' },

};

export default function HTMLInterviewQuestionsGuide() {
  return <HTMLInterviewQuestionsClient />;
}

