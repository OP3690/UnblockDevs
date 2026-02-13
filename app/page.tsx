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
        <div className="text-center max-w-md px-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-700 font-medium mb-2">Try UnblockDevs JSON Tools now</p>
          <p className="text-gray-600 text-sm">Fast, private, and in your browser. Open JSON Viewer or JSON Formatter to get started instantly.</p>
        </div>
      </div>
    );
  }

  return <HomeClient />;
}
