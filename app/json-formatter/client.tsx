'use client';

import JsonBeautifier from '@/components/JsonBeautifier';
import ToolPageShell from '@/components/tools/ToolPageShell';
import type { BreadcrumbItem } from '@/components/Breadcrumb';

const BREADCRUMB: BreadcrumbItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Tools', href: '/tools/json' },
  { label: 'JSON', href: '/tools/json' },
  { label: 'JSON Formatter Online' },
];

export default function JsonFormatterClient() {
  return (
    <ToolPageShell
      showFooterBand={false}
      breadcrumbItems={BREADCRUMB}
      title="JSON Formatter Online"
      subtitle="Paste minified or messy JSON and get clean, indented output instantly — 2-space, 4-space, or tab indent. 100% in your browser."
      toolName="json_formatter"
      tool={<JsonBeautifier />}
    />
  );
}
