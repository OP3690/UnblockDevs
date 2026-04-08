'use client';

import ToolPageShell from '@/components/tools/ToolPageShell';
import dynamic from 'next/dynamic';

const TimezoneTranslator = dynamic(() => import('@/components/tools/TimezoneTranslator'), {
  loading: () => (
    <div className="flex items-center justify-center py-12">
      <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-emerald-700" />
    </div>
  ),
});

export default function TimezoneTranslatorClient() {
  return (
    <ToolPageShell
      showFooterBand={false}
      title="Timezone Translator — Convert Time Between Timezones"
      subtitle="Translate times between UTC, EST, PST, IST and 500+ IANA timezones. DST-aware, 100% browser-based."
      toolName="timezone_translator"
      tool={<TimezoneTranslator />}
    />
  );
}
