'use client';

import ToolPageShell from '@/components/tools/ToolPageShell';
import dynamic from 'next/dynamic';

const CurlConverter = dynamic(() => import('@/components/tools/CurlConverter'), {
  // min-h-[520px] matches the tool's approximate height so the layout doesn't
  // shift when the chunk loads and the spinner swaps to the real component (CLS fix).
  loading: () => (
    <div className="flex min-h-[520px] items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-emerald-700" />
    </div>
  ),
});

export default function CurlConverterClient() {
  return (
    <ToolPageShell
      showFooterBand={false}
      title="cURL Converter – Convert cURL to Production-Ready Code"
      subtitle="JavaScript (Fetch/Axios), Python (Requests/HTTPX), Go, Java, PHP, C#, Rust. Export to Postman & OpenAPI. 100% local."
      toolName="curl_converter"
      tool={<CurlConverter />}
    />
  );
}
