import type { Metadata } from 'next';
import HowToHideOnlineStatusOnWhatsappClient from './client';

export const metadata: Metadata = {
  title: 'Hide Online Status on WhatsApp 2026 | UnblockDevs',
  description: 'Hide online status on WhatsApp. Appear offline, disable last seen. Android, iPhone, desktop. 2026.',
  keywords: [
    'hide online status whatsapp',
    'how to hide online status on whatsapp',
    'whatsapp hide online status',
    'appear offline whatsapp',
    'disable online status whatsapp',
    'whatsapp privacy settings',
    'hide last seen whatsapp',
    'whatsapp online status privacy',
    'how to appear offline on whatsapp',
    'whatsapp hide online',
    'disable online whatsapp',
    'whatsapp privacy online status',
    'hide whatsapp online status 2026',
    'whatsapp appear offline',
    'whatsapp online status settings'
  ],
  openGraph: {
    title: 'How to Hide Online Status on WhatsApp: Complete Guide 2026',
    description: 'Hide online status on WhatsApp. Appear offline, control privacy.',
    type: 'article',
    publishedTime: '2026-01-25T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/how-to-hide-online-status-on-whatsapp',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],

  },
  alternates: { canonical: 'https://unblockdevs.com/blog/how-to-hide-online-status-on-whatsapp' },
  robots: { index: false, follow: false },
};

export default function HowToHideOnlineStatusOnWhatsappGuide() {
  return <HowToHideOnlineStatusOnWhatsappClient />;
}
