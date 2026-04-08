'use client';

import ToolPageShell from '@/components/tools/ToolPageShell';
import dynamic from 'next/dynamic';

const TestDataGenerator = dynamic(() => import('@/components/tools/TestDataGenerator'), {
  loading: () => (
    <div className="flex items-center justify-center py-12">
      <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-emerald-700" />
    </div>
  ),
});

export default function TestDataGeneratorClient() {
  return (
    <ToolPageShell
      showFooterBand={false}
      title="Test Data Generator — Generate Fake User, Invoice, Banking & API Log Test Data from JSON Schema Online Free"
      subtitle="Create realistic test data for development, testing, and demos — 11 templates or custom JSON Schema, up to 50 records, 100% browser-based"
      toolName="test_data_generator"
      tool={<TestDataGenerator />}
    />
  );
}
