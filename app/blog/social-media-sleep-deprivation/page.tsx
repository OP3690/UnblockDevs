import type { Metadata } from 'next';
import SocialMediaSleepDeprivationClient from './client';

export const metadata: Metadata = {
  title: 'Doomscrolling Before Bed: How Social Media Is Destroying Your Sleep | UnblockDevs',
  description: 'Research-backed breakdown of how doomscrolling before bed disrupts sleep — blue light, cortisol spikes, dopamine loops — and exactly how to fix it.',
  keywords: [
    'social media sleep deprivation',
    'doomscrolling before bed effects',
    'phone before bed sleep',
    'blue light melatonin social media',
    'how social media affects sleep',
    'doomscrolling effects',
    'social media insomnia',
    'screen time before bed',
    'phone in bed sleep quality',
    'blue light sleep hormone',
    'cortisol sleep social media',
    'dopamine loop sleep',
    'social media and poor sleep',
    'phone bedroom sleep deprivation',
    'how to stop doomscrolling at night',
    'sleep deprivation health effects',
    'melatonin suppression phone',
    'sleep hygiene social media',
    'social media and chronic sleep deprivation',
    'instagram sleep deprivation',
  ],
  openGraph: {
    title: 'Doomscrolling Before Bed: How Social Media Is Destroying Your Sleep (And Your Health)',
    description: 'Blue light, cortisol spikes, and dopamine loops — the three ways social media steals your sleep and exactly what to do about it.',
    type: 'article',
    publishedTime: '2026-10-10T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/social-media-sleep-deprivation',
    images: [
      {
        url: 'https://unblockdevs.com/api/og?title=Doomscrolling%20Before%20Bed%3A%20How%20Social%20Media%20Destroys%20Your%20Sleep&emoji=%F0%9F%8C%99&desc=Blue%20light%2C%20cortisol%2C%20and%20dopamine%20loops%20stealing%20your%20sleep',
        width: 1200,
        height: 630,
        alt: 'Doomscrolling Before Bed: How Social Media Is Destroying Your Sleep — UnblockDevs Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Doomscrolling Before Bed: How Social Media Is Destroying Your Sleep',
    description: 'Blue light, cortisol spikes, and dopamine loops — the three mechanisms your phone uses to steal your sleep every night.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/social-media-sleep-deprivation' },
  robots: { index: true, follow: true },
};

export default function SocialMediaSleepDeprivationPage() {
  return <SocialMediaSleepDeprivationClient />;
}
