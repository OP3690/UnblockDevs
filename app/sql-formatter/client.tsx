'use client';

import ToolPageShell from '@/components/tools/ToolPageShell';
import dynamic from 'next/dynamic';

const SqlFormatter = dynamic(() => import('@/components/tools/SqlFormatter'), {
  loading: () => (
    <div className="flex items-center justify-center py-12">
      <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-emerald-700" />
    </div>
  ),
});

export default function SqlFormatterClient() {
  return (
    <ToolPageShell
      title="SQL Formatter"
      subtitle="Paste → Instant fix. Format messy SQL query — clean SQL queries instantly. MySQL, PostgreSQL, Oracle, Trino & more"
      toolName="sql_formatter"
      tool={<SqlFormatter />}
    />
  );
}
