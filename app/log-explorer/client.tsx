'use client';

import ToolPageShell from '@/components/tools/ToolPageShell';
import dynamic from 'next/dynamic';

const LogExplorer = dynamic(() => import('@/components/tools/LogExplorer'), {
  loading: () => (
    <div className="flex items-center justify-center py-12">
      <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-emerald-700" />
    </div>
  ),
});

export default function LogExplorerClient() {
  return (
    <ToolPageShell
      showFooterBand={false}
      title="Log Explorer — Parse, Filter & Analyze Log Files, JSON Logs & Structured Logs Online Free"
      subtitle="Analyze, search, decode, and visualize JSON, Node, Kubernetes, and CloudWatch logs. 100% client-side."
      toolName="log_explorer"
      tool={<LogExplorer />}
    />
  );
}
