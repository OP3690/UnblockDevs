'use client';

import ToolPageShell from '@/components/tools/ToolPageShell';
import dynamic from 'next/dynamic';

const PayloadAnalyzer = dynamic(() => import('@/components/tools/PayloadAnalyzer'), {
  loading: () => (
    <div className="flex items-center justify-center py-12">
      <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-emerald-700" />
    </div>
  ),
});

export default function PayloadAnalyzerClient() {
  return (
    <ToolPageShell
      showFooterBand={false}
      title="Payload Analyzer - Analyze API Payloads Instantly"
      subtitle="Inspect, analyze, and optimize API request and response payloads"
      toolName="payload_analyzer"
      tool={<PayloadAnalyzer />}
    />
  );
}
