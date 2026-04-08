'use client';

import ToolPageShell from '@/components/tools/ToolPageShell';
import type { BreadcrumbItem } from '@/components/Breadcrumb';
import TokenComparator from '@/components/tools/TokenComparator';

const breadcrumbItems: BreadcrumbItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Tools', href: '/tools/json' },
  { label: 'Token Comparator' },
];

export default function TokenComparatorLandingClient() {
  return (
    <ToolPageShell
      showFooterBand={false}
      breadcrumbItems={breadcrumbItems}
      title="JWT Debugger & Token Comparator"
      subtitle="Decode, compare character-by-character, verify signatures, check expiry & security audit. 100% client-side."
      toolName="token_comparator"
      icon="🔑"
      tool={<TokenComparator />}
      backHref="/tools/json"
      backLabel="All tools"
    />
  );
}
