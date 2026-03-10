import type { Metadata } from 'next';
import HowToChangeWhatsappPrivacySettingsClient from './client';

export const metadata: Metadata = {
  title: 'WhatsApp Privacy Settings for Max Security 2026 | UnblockDevs',
  description: 'WhatsApp privacy for max security. Protect profile, last seen, status, messages. Android, iPhone, web. 2026.',
  keywords: [
    'whatsapp privacy settings',
    'whatsapp security settings',
    'how to change whatsapp privacy settings',
    'whatsapp maximum security',
    'whatsapp privacy guide',
    'whatsapp security guide',
    'whatsapp privacy configuration',
    'whatsapp security configuration',
    'whatsapp privacy settings 2026',
    'whatsapp security best practices',
    'whatsapp privacy protection',
    'whatsapp security tips',
    'whatsapp privacy settings guide',
    'whatsapp security settings guide',
    'whatsapp privacy maximum security'
  ],
  openGraph: {
    title: 'How to Change WhatsApp Privacy Settings for Maximum Security: Complete Guide 2026',
    description: 'WhatsApp privacy for max security. Protect profile and messages.',
    type: 'article',
    publishedTime: '2026-01-25T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/how-to-change-whatsapp-privacy-settings-maximum-security',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],

  },
  alternates: { canonical: 'https://unblockdevs.com/blog/how-to-change-whatsapp-privacy-settings-maximum-security' },
  robots: { index: false, follow: false },
};

export default function HowToChangeWhatsappPrivacySettingsGuide() {
  return <HowToChangeWhatsappPrivacySettingsClient />;
}
