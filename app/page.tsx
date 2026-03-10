import type { Metadata } from 'next';
import HomeClient from './page-client';

export const metadata: Metadata = {
  alternates: { canonical: 'https://unblockdevs.com/' },
};

// Server-rendered LCP block so the main heading is in the first byte response (avoids 2.5s+ element render delay on mobile)
function ServerLCPShell() {
  return (
    <div
      id="server-lcp"
      className="border-t border-gray-200 bg-gradient-to-b from-gray-50/90 to-gray-50/70 px-3 sm:px-6 lg:px-8 py-3 sm:py-4"
      style={{ minHeight: '100px' }}
    >
      <h1 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-0 mt-0 leading-tight">
        Use AI Safely — JSON Masking &amp; Log Unpacker
      </h1>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <ServerLCPShell />
      <HomeClient />
    </>
  );
}
