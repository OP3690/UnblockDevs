'use client';

import ToolPageShell from '@/components/tools/ToolPageShell';
import type { BreadcrumbItem } from '@/components/Breadcrumb';
import dynamic from 'next/dynamic';

const SmartJsonDiff = dynamic(() => import('@/components/tools/SmartJsonDiff'), {
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
  { label: 'JSON Comparator' },
];

export default function JsonComparatorClient() {
  return (
    <ToolPageShell
      breadcrumbItems={JSON_BREADCRUMB}
      title="JSON Comparator — Compare Two JSON Objects, Diff API Responses & Semantic Changes"
      subtitle="Semantic diff: normalizes UUIDs, timestamps, JWTs, hashes so only real logic changes appear. 100% client-side."
      toolName="json_comparator"
      tool={<SmartJsonDiff />}
    />
  );
}
