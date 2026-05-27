import type { Metadata } from 'next';
import InstagramPasswordResetClient from './client';

export const metadata: Metadata = {
  title: 'Instagram Password Reset Email Guide | UnblockDevs',
  description: 'Instagram password reset emails: what they are, how to reset, why they matter. Step-by-step guide.',
  keywords: [
    'Instagram password reset email',
    'Instagram password reset',
    'reset Instagram password',
    'Instagram forgot password',
    'Instagram account recovery',
    'Instagram security',
    'Instagram password change',
    'Instagram email reset',
    'Instagram account security',
    'Instagram password help',
    'Instagram login issues',
    'Instagram account locked',
    'Instagram password recovery',
    'Instagram security email',
    'Instagram account access'
  ],
  openGraph: {
    title: 'Instagram Password Reset Email: Complete Guide - What, When, How & Why',
    description: 'Instagram password reset: what, when, how. Step-by-step guide.',
    type: 'article',
    publishedTime: '2024-01-25T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/instagram-password-reset-email-guide',
    images: [{ url: 'https://unblockdevs.com/api/og?title=Instagram%20Password%20Reset%20Email%3A%20Complete%20Guide%20-%20What%2C%20When%2C%20How%20%26%20Why&emoji=%F0%9F%A4%96&desc=Instagram%20password%20reset%3A%20what%2C%20when%2C%20how', width: 1200, height: 630, alt: 'Instagram Password Reset Email: Complete Guide - What, When, How & Why — UnblockDevs Blog' }],

  },
  alternates: { canonical: 'https://unblockdevs.com/blog/instagram-password-reset-email-guide' },
  robots: { index: false, follow: false },
};

export default function InstagramPasswordResetGuide() {
  return <InstagramPasswordResetClient />;
}
