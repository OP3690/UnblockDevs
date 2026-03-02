import type { Metadata } from 'next';
import LogUnpackerClient from './client';

export const metadata: Metadata = {
  title: 'Log Unpacker & Sanitizer - Unescape JSON, Decode JWT, Scrub Paths | UnblockDevs',
  description:
    'Client-side log unpacker: recursively unescape nested JSON, decode JWTs, detect epoch timestamps, scrub local paths. No server, no tracking. Safe for AI paste.',
  keywords: [
    'log unpacker',
    'json unescape',
    'jwt decoder',
    'epoch timestamp',
    'path scrubber',
    'log sanitizer',
    'client-side',
    'privacy',
  ],
  openGraph: {
    title: 'Log Unpacker & Sanitizer - Decode & Sanitize Logs',
    description: 'Unpack nested JSON, decode JWTs, scrub paths. 100% client-side, no data sent.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://unblockdevs.com/log-unpacker',
  },
};

export default function LogUnpackerPage() {
  return <LogUnpackerClient />;
}
