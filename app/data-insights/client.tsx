'use client';

import ToolPageShell from '@/components/tools/ToolPageShell';
import dynamic from 'next/dynamic';

const DataInsights = dynamic(() => import('@/components/tools/DataInsights'), {
  loading: () => (
    <div className="flex items-center justify-center py-12">
      <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-emerald-700" />
    </div>
  ),
});

export default function DataInsightsClient() {
  return (
    <ToolPageShell
      title="Data Insights - Analyze JSON Data Instantly"
      subtitle="Get insights, statistics, and patterns from your JSON data"
      toolName="data_insights"
      tool={<DataInsights />}
    />
  );
}
