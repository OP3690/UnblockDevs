'use client';

import ToolPageShell from '@/components/tools/ToolPageShell';
import type { BreadcrumbItem } from '@/components/Breadcrumb';
import dynamic from 'next/dynamic';

const SchemaGenerator = dynamic(() => import('@/components/tools/SchemaGenerator'), {
  loading: () => (
    <div className="flex items-center justify-center py-12">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
    </div>
  ),
});

const JSON_SCHEMA_BREADCRUMB: BreadcrumbItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Tools', href: '/tools/json' },
  { label: 'JSON', href: '/tools/json' },
  { label: 'JSON Schema Generator' },
];

export default function JsonSchemaGenerationClient() {
  return (
    <ToolPageShell
      showFooterBand={false}
      breadcrumbItems={JSON_SCHEMA_BREADCRUMB}
      title="JSON Schema Generator — Auto-Generate from Sample JSON"
      subtitle="Paste any JSON and instantly generate a Draft 7 or OpenAPI schema. Built-in validator included. 100% client-side."
      toolName="json_schema_generation"
      tool={<SchemaGenerator />}
    />
  );
}
