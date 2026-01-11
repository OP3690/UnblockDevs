'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import type { Metadata } from 'next';

// Export metadata for SEO - canonical URL always points to base URL (ignores query params)
export const metadata: Metadata = {
  alternates: {
    canonical: 'https://unblockdevs.com',
  },
};

const HomeClient = dynamic(() => import('./page-client'), {
  ssr: false,
});

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading UnblockDevs...</p>
        </div>
      </div>
    );
  }

  return <HomeClient />;
}
