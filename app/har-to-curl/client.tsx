'use client';

import HarToCurl from '@/components/tools/HarToCurl';
import ToolPageShell from '@/components/tools/ToolPageShell';
import { Network } from 'lucide-react';

export default function HarToCurlClient() {
  return (
    <ToolPageShell
      showFooterBand={false}
      title="HAR to cURL Converter"
      subtitle="Convert network HAR files into reproducible API requests: cURL, Python, Go, Java, PHP, Ruby. Clean headers, mask secrets, timeline, batch script, AI debug prompt. 100% client-side."
      toolName="har_to_curl"
      tool={<HarToCurl />}
      badges={
        <div className="flex items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-700">
          <Network className="h-5 w-5 shrink-0 text-emerald-600" aria-hidden />
          <span>Browser HAR → terminal-ready cURL</span>
        </div>
      }
    />
  );
}
