import type { Metadata } from 'next';
import InstagramPasswordResetClient from './client';

export const metadata: Metadata = {
  title: 'Instagram Password Reset Email: Complete Guide - What, When, How & Why | UnblockDevs',
  description: 'Complete guide to Instagram password reset emails. Learn what they are, when to use them, how to reset your password, and why they\'re important for account security. Step-by-step instructions included.',
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
    description: 'Complete guide to Instagram password reset emails. Learn what they are, when to use them, how to reset your password, and why they\'re important.',
    type: 'article',
    publishedTime: '2024-01-25T00:00:00Z',
    authors: ['UnblockDevs'],
  },
};

export default function InstagramPasswordResetGuide() {
  return <InstagramPasswordResetClient />;
}
