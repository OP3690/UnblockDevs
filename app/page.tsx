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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center max-w-lg px-4">
          <h1 className="text-xl font-bold text-gray-900 mb-2">JSON Viewer Tools – Free Online JSON Formatter, Parser & Viewer</h1>
          <p className="text-gray-700 text-sm mb-4">Explore fast, secure JSON Viewer, JSON Formatter, and JSON Parser — all in your browser. No signup required.</p>
          <p className="text-gray-600 text-sm mb-6">Start here: paste your JSON to view, format, validate, or convert to CSV/Excel.</p>
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto mb-3"></div>
          <p className="text-gray-500 text-sm">Loading… If this takes long, try refreshing or checking your connection. You can still access tools from the navigation once loaded.</p>
        </div>
      </div>
    );
  }

  return <HomeClient />;
}
