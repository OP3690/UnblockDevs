'use client';

import ToolPageShell from '@/components/tools/ToolPageShell';
import dynamic from 'next/dynamic';

const MockApiGenerator = dynamic(() => import('@/components/tools/MockApiGenerator'), {
  loading: () => (
    <div className="flex items-center justify-center py-12">
      <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-emerald-700" />
    </div>
  ),
});

export default function MockApiGeneratorClient() {
  return (
    <ToolPageShell
      showFooterBand={false}
      title="Mock API Generator – Create Fake REST APIs Instantly"
      subtitle="Dynamic responses, auth simulation, latency, rate limiting, conditional rules. Export to Postman & OpenAPI."
      toolName="mock_api_generator"
      tool={<MockApiGenerator />}
    />
  );
}
