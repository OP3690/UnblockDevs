'use client';

import JsonBeautifier from '@/components/JsonBeautifier';
import ToolPageShell from '@/components/tools/ToolPageShell';
import type { BreadcrumbItem } from '@/components/Breadcrumb';

const JSON_BREADCRUMB: BreadcrumbItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Tools', href: '/tools/json' },
  { label: 'JSON', href: '/tools/json' },
  { label: 'JSON formatter online' },
];

export default function JsonBeautifierClient() {
  return (
    <ToolPageShell
      showFooterBand={false}
      breadcrumbItems={JSON_BREADCRUMB}
      title="Developer JSON Workbench"
      subtitle="Format, validate, fix, explore paths, generate TypeScript & SQL — all in one"
      toolName="json_beautifier"
      tool={<JsonBeautifier />}
    />
  );
}
