import type { Metadata } from 'next';
import SocialMediaMentalHealthClient from './client';

export const metadata: Metadata = {
  title: 'How Social Media Affects Your Brain and Mental Health (2026) | UnblockDevs',
  description: 'Research-backed look at how social media affects mental health — anxiety, depression, dopamine, and the brain changes happening every time you scroll.',
  keywords: [
    'impact of social media on mental health',
    'how social media affects the brain',
    'social media anxiety depression',
    'social media mental health effects',
    'social media and mental health 2026',
    'does social media cause depression',
    'social media and anxiety',
    'social media brain effects',
    'mental health social media research',
    'social media dopamine mental health',
    'social media and teen mental health',
    'social media harmful effects',
    'social media addiction mental health',
    'social media and self esteem',
    'social media FOMO mental health',
    'how social media affects teenagers',
    'social media and loneliness',
    'screen time mental health',
    'social media prefrontal cortex',
    'social media and depression statistics',
  ],
  openGraph: {
    title: 'How Social Media Affects Your Brain and Mental Health — What Research Reveals (2026)',
    description: 'From dopamine hijacking to anxiety and depression — research-backed breakdown of what social media does to your brain and mental health.',
    type: 'article',
    publishedTime: '2026-10-10T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/social-media-mental-health-impact',
    images: [{ url: 'https://unblockdevs.com/api/og?title=How%20Social%20Media%20Affects%20Your%20Brain%20%26%20Mental%20Health&emoji=%F0%9F%A7%A0&desc=Research-backed%20breakdown%20of%20what%20scrolling%20does%20to%20your%20mind', width: 1200, height: 630, alt: 'How Social Media Affects Your Brain and Mental Health — UnblockDevs Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How Social Media Affects Your Brain and Mental Health (2026)',
    description: 'From dopamine hijacking to anxiety and depression — what research says about social media and your mental health.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/social-media-mental-health-impact' },
  robots: { index: true, follow: true },
};

export default function SocialMediaMentalHealthPage() {
  return <SocialMediaMentalHealthClient />;
}
