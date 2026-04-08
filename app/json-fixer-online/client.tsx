'use client';

import ToolPageShell from '@/components/tools/ToolPageShell';
import type { BreadcrumbItem } from '@/components/Breadcrumb';
import dynamic from 'next/dynamic';

const JsonFixer = dynamic(() => import('@/components/tools/JsonFixer'), {
  loading: () => (
    <div className="flex items-center justify-center py-12">
      <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-emerald-700" />
    </div>
  ),
});

const JSON_BREADCRUMB: BreadcrumbItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Tools', href: '/tools/json' },
  { label: 'JSON', href: '/tools/json' },
  { label: 'JSON fixer' },
];

export default function JsonFixerOnlineClient() {
  return (
    <ToolPageShell
      showFooterBand={false}
      breadcrumbItems={JSON_BREADCRUMB}
      title="Advanced JSON Fixer & Recovery Engine"
      subtitle="Paste → Instant fix. Repair malformed JSON, recover truncated payloads, extract from logs, fix AI/API output — 100% client-side. Fix trailing commas, missing quotes, broken arrays, AI-generated JSON."
      toolName="json_fixer"
      tool={<JsonFixer />}
    />
  );
}
