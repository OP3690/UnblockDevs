import type { Metadata } from 'next';
import DopamineSocialMediaClient from './client';

export const metadata: Metadata = {
  title: 'Dopamine and Social Media Addiction: How Your Brain Gets Hooked | UnblockDevs',
  description: 'The neuroscience of why social media is so addictive — dopamine, variable reward, and how platforms deliberately engineer the scroll. Plus how to reset.',
  keywords: [
    'dopamine social media addiction',
    'how social media triggers dopamine',
    'why social media is addictive neuroscience',
    'dopamine hit instagram scrolling',
    'social media dopamine loop',
    'dopamine and scrolling',
    'why is social media so addictive',
    'social media addiction brain',
    'variable reward social media',
    'dopamine reset social media',
    'social media engineered addiction',
    'instagram dopamine',
    'tiktok dopamine addiction',
    'social media slot machine psychology',
    'Sean Parker facebook dopamine',
    'how to stop social media addiction',
    'dopamine detox social media',
    'notification dopamine',
    'social media compulsive checking',
    'phone addiction dopamine science',
  ],
  openGraph: {
    title: 'Dopamine and Social Media: How Your Brain Gets Hooked on Every Scroll',
    description: 'Why social media is more addictive than a slot machine — and what that does to your brain over time. Plus practical steps to reset.',
    type: 'article',
    publishedTime: '2026-10-10T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/dopamine-and-social-media-addiction',
    images: [{ url: 'https://unblockdevs.com/api/og?title=Dopamine%20%26%20Social%20Media%3A%20How%20Your%20Brain%20Gets%20Hooked&emoji=%F0%9F%8E%B0&desc=The%20neuroscience%20of%20why%20scrolling%20feels%20impossible%20to%20stop', width: 1200, height: 630, alt: 'Dopamine and Social Media Addiction — UnblockDevs Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dopamine and Social Media: How Your Brain Gets Hooked on Every Scroll',
    description: 'Variable reward, engineered notifications, and the slot machine in your pocket — why social media hijacks your dopamine system.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/dopamine-and-social-media-addiction' },
  robots: { index: true, follow: true },
};

export default function DopamineSocialMediaPage() {
  return <DopamineSocialMediaClient />;
}
