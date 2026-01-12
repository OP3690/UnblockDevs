import type { Metadata } from 'next';
import ContactClient from './client';

export const metadata: Metadata = {
  title: 'Contact Us | UnblockDevs - Get in Touch',
  description: 'Contact UnblockDevs team for support, feedback, feature requests, or partnerships. We\'re here to help improve your developer experience.',
  keywords: [
    'contact unblockdevs',
    'developer tools support',
    'feedback',
    'feature request',
    'partnership',
    'support'
  ],
  openGraph: {
    title: 'Contact Us | UnblockDevs',
    description: 'Get in touch with UnblockDevs team for support, feedback, or partnerships.',
    type: 'website',
  },
};

export default function Contact() {
  return <ContactClient />;
}
