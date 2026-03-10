import type { Metadata } from 'next';
import HomeClient from './page-client';

export const metadata: Metadata = {
  alternates: { canonical: 'https://unblockdevs.com/' },
};

// Fazier badge: show for 30 days so crawler can verify; remove after 2025-04-01
const FAZIER_BADGE_END = new Date('2025-04-01T23:59:59Z');
const SHOW_FAZIER_BADGE = new Date() < FAZIER_BADGE_END;

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
      {/* Fazier badge in initial HTML so their crawler can detect it (homepage requirement) */}
      {SHOW_FAZIER_BADGE && (
        <div className="flex justify-center mt-3">
          <a
            href="https://fazier.com/launches/unblockdevs.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
          >
            <img
              src="https://fazier.com/api/v1//public/badges/launch_badges.svg?badge_type=featured&theme=light"
              width={250}
              height={50}
              alt="Featured on Fazier"
            />
          </a>
        </div>
      )}
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
