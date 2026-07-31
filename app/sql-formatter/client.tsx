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
      title="SQL Formatter & IN Clause Generator"
      subtitle="Format and beautify SQL queries online — or paste any list of IDs to get a SQL IN clause instantly. MySQL, PostgreSQL, SQL Server, Oracle, SQLite."
      toolName="sql_formatter"
      tool={<SqlFormatter />}
    />
  );
}
