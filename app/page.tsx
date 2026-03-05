'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50" role="status" aria-live="polite" aria-label="Page loading">
        {/* Reserve space to reduce CLS when client mounts — similar structure to real page */}
        <div className="min-h-screen flex flex-col">
          <div className="h-14 sm:h-16 flex-shrink-0" aria-hidden />
          <div className="flex-1 flex items-center justify-center px-4 py-8">
            <div className="text-center max-w-lg w-full">
              <h1 className="text-xl font-bold text-gray-900 mb-2">Use AI Safely — Schema Masking, JSON Masking & Log Unpacker</h1>
              <p className="text-gray-700 text-sm mb-4">Mask JSON and SQL before sending to AI. Fix stringified JSON, unpack logs, decode JWTs — all in your browser. No signup.</p>
              <p className="text-gray-600 text-sm mb-4">Paste JSON to mask, format, validate, or use our Log Unpacker to unescape and sanitize logs in seconds.</p>
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto mb-3" aria-hidden="true"></div>
              <p className="text-gray-500 text-sm mb-4">Please wait while UnblockDevs is loading...</p>
              <a href="/#main-content" className="text-blue-600 hover:underline font-medium text-sm">Explore AI Schema Masking, JSON Tools & Log Unpacker</a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <HomeClient />;
}
