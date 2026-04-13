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
      showFooterBand={false}
      title="SQL IN Clause Generator"
      subtitle="Paste any list of IDs, emails, or UUIDs → get a SQL IN clause instantly. Numeric, string, parameterized, range compression. MySQL, PostgreSQL, SQL Server, Oracle, SQLite."
      toolName="sql_formatter"
      tool={<SqlFormatter />}
    />
  );
}
