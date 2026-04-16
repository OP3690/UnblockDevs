'use client';

import ToolPageShell from '@/components/tools/ToolPageShell';
import dynamic from 'next/dynamic';

const SqlInClauseGenerator = dynamic(() => import('@/components/tools/SqlInClauseGenerator'), {
  loading: () => (
    <div className="flex items-center justify-center py-12">
      <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600" />
    </div>
  ),
});

export default function SqlInClauseGeneratorClient() {
  return (
    <ToolPageShell
      showFooterBand={false}
      title="SQL IN Clause Generator"
      subtitle="Paste any list of IDs, emails, or UUIDs → get a SQL IN clause instantly. Auto-detect comma, space, tab, pipe, newline, JSON array — any separator. MySQL, PostgreSQL, SQL Server, Oracle, SQLite."
      toolName="sql_in_clause_generator"
      tool={<SqlInClauseGenerator />}
    />
  );
}
