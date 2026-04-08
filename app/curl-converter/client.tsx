'use client';

import ToolPageShell from '@/components/tools/ToolPageShell';
import dynamic from 'next/dynamic';

const CurlConverter = dynamic(() => import('@/components/tools/CurlConverter'), {
  loading: () => (
    <div className="flex items-center justify-center py-12">
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
