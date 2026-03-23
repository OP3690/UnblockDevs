'use client';

import { useState, useCallback, useEffect, useMemo, Suspense, type ReactNode } from 'react';
import dynamic from 'next/dynamic';
import { Download, Undo2, Redo2, FileSpreadsheet, Code2, GitCompare, FileCode, FileSearch, BarChart3, Server, Database, Settings, FileText, Wrench, TrendingUp, Mail, Scissors, Key, Clock, Network, AlertTriangle, Copy, ChevronDown, ChevronUp, Play, Lock } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { PersonalizationManager, ToolTab } from '@/lib/personalization';
import HomePrivacyFirstSections from '@/components/home/HomePrivacyFirstSections';
import { trackToolUsed, trackCopy, trackCtaClick } from '@/lib/analytics';
import JsonBeautifier from '@/components/JsonBeautifier';
// Below-fold / non-critical: lazy load to reduce initial JS (mobile LCP)
const JsonInput = dynamic(() => import('@/components/JsonInput'), {
  ssr: false,
  loading: () => <div className="w-full rounded-lg bg-gray-50 border border-gray-200 animate-pulse" style={{ minHeight: '200px' }} aria-hidden />,
});
/* Feedback + newsletter: static import avoids stale HMR chunks showing old UI (blue buttons / Get in Touch layout) */
import NewsletterSignup from '@/components/NewsletterSignup';
import FeedbackForm from '@/components/FeedbackForm';
import FeedbackNewsletterSplit from '@/components/home/FeedbackNewsletterSplit';
const toolLoading = () => (
  <div className="w-full bg-gray-50 border border-gray-200 rounded-lg animate-pulse" style={{ height: '300px' }} aria-hidden />
);

/* JsonBeautifier: static import avoids broken webpack async chunks (factory undefined) with next/dynamic + dev/HMR */
const JsonFixer = dynamic(() => import('@/components/tools/JsonFixer'), { ssr: false, loading: toolLoading });

// Lazy load tool components for better performance
const ApiComparator = dynamic(() => import('@/components/tools/ApiComparator'), {
  loading: () => <div className="flex items-center justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-700"></div></div>,
});
const JsonComparator = dynamic(() => import('@/components/tools/JsonComparator'), {
  loading: () => <div className="flex items-center justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-700"></div></div>,
});
const SchemaGenerator = dynamic(() => import('@/components/tools/SchemaGenerator'), {
  loading: () => <div className="flex items-center justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-700"></div></div>,
});
const LogExplorer = dynamic(() => import('@/components/tools/LogExplorer'), {
  loading: () => <div className="flex items-center justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-700"></div></div>,
});
const PayloadAnalyzer = dynamic(() => import('@/components/tools/PayloadAnalyzer'), {
  loading: () => <div className="flex items-center justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-700"></div></div>,
});
const CurlConverter = dynamic(() => import('@/components/tools/CurlConverter'), {
  loading: () => <div className="flex items-center justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-700"></div></div>,
});
const MockApiGenerator = dynamic(() => import('@/components/tools/MockApiGenerator'), {
  loading: () => <div className="flex items-center justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-700"></div></div>,
});
const TestDataGenerator = dynamic(() => import('@/components/tools/TestDataGenerator'), {
  loading: () => <div className="flex items-center justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-700"></div></div>,
});
const ConfigComparator = dynamic(() => import('@/components/tools/ConfigComparator'), {
  loading: () => <div className="flex items-center justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-700"></div></div>,
});
const SqlFormatter = dynamic(() => import('@/components/tools/SqlFormatter'), {
  loading: () => <div className="flex items-center justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-700"></div></div>,
});
const DataInsights = dynamic(() => import('@/components/tools/DataInsights'), {
  loading: () => <div className="flex items-center justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-700"></div></div>,
});
const PromptChunker = dynamic(() => import('@/components/tools/PromptChunker'), {
  loading: () => <div className="flex items-center justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-700"></div></div>,
});
const TokenComparator = dynamic(() => import('@/components/tools/TokenComparator'), {
  loading: () => <div className="flex items-center justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-700"></div></div>,
});
const TimezoneTranslator = dynamic(() => import('@/components/tools/TimezoneTranslator'), {
  loading: () => <div className="flex items-center justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-700"></div></div>,
});
const HarToCurl = dynamic(() => import('@/components/tools/HarToCurl'), {
  loading: () => <div className="flex items-center justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-700"></div></div>,
});
const SectionManager = dynamic(() => import('@/components/SectionManager'), {
  loading: () => <div className="min-h-[120px] rounded-lg bg-gray-50 animate-pulse" aria-hidden />,
});
const DataTable = dynamic(() => import('@/components/DataTable'), {
  loading: () => <div className="min-h-[200px] rounded-lg bg-gray-50 animate-pulse" aria-hidden />,
});
import {
  jsonToRows,
  extractColumns,
  FlattenedRow,
  Column,
} from '@/lib/jsonParser';
import { exportToExcel } from '@/lib/excelExporter';
import { exportToCSV } from '@/lib/csvExporter';
import { HistoryManager } from '@/lib/history';

interface Section {
  id: string;
  name: string;
  columnIds: string[];
}

// Mapping of tool tabs to their dedicated page URLs
const toolPageUrls: Record<Exclude<ToolTab, 'converter'>, string> = {
  beautifier: '/json-beautifier',
  fixer: '/json-fixer-online',
  comparator: '/api-comparator',
  jsoncompare: '/json-comparator',
  schema: '/json-schema-generation',
  logs: '/log-explorer',
  payload: '/payload-analyzer',
  curl: '/curl-converter',
  mock: '/mock-api-generator',
  testdata: '/test-data-generator',
  config: '/config-comparator',
  sql: '/sql-formatter',
  builder: '/log-unpacker',
  promptchunk: '/prompt-chunker',
  schemamasker: '/ai-schema-masker',
  jsonpromptshield: '/json-prompt-shield',
  codemasker: '/code-prompt-shield',
  regextester: '/regex-tester',
  tokencompare: '/token-comparator',
  timezone: '/timezone-translator',
  hartocurl: '/har-to-curl',
  curlfailure: '/curl-failure-root-cause-engine',
};

const POPULAR_BLOG_LINKS: { href: string; label: string }[] = [
  { href: '/blog/chatgpt-real-life-usage-guide', label: 'ChatGPT Usage' },
  { href: '/blog/ai-prompt-engineering-guide', label: 'AI Prompt Engineering' },
  { href: '/blog/blockchain-complete-guide', label: 'Blockchain' },
  { href: '/blog/mysql-10-most-used-functions', label: 'MySQL Functions' },
  { href: '/blog/token-security-privacy-best-practices', label: 'Token Security' },
  { href: '/blog/5g-6g-complete-guide', label: '5G & 6G' },
  { href: '/blog/tokens-complete-guide', label: 'Tokens Guide' },
  { href: '/blog/token-technologies-history-evolution', label: 'Token History' },
  { href: '/blog/agentic-ai-complete-guide', label: 'Agentic AI' },
  { href: '/blog/apache-kafka-complete-guide', label: 'Apache Kafka' },
  { href: '/blog/confidential-computing-complete-guide', label: 'Confidential Computing' },
  { href: '/blog/cursor-ai-code-editor-guide', label: 'Cursor AI' },
  { href: '/blog/ai-productivity-tools-complete-guide', label: 'AI Productivity' },
  { href: '/blog/digital-twins-complete-guide', label: 'Digital Twins' },
  { href: '/blog/apache-kafka-cheat-sheet', label: 'Kafka Cheat Sheet' },
  { href: '/blog/why-my-api-returns-200-ok-but-data-is-empty', label: 'API Returns 200 but Empty' },
  { href: '/blog/how-to-change-whatsapp-privacy-settings-maximum-security', label: 'WhatsApp Privacy' },
  { href: '/blog/json-format-standards-complete-guide', label: 'JSON Format Standards' },
  { href: '/blog/fix-python-keyerror-explained-examples', label: 'Python KeyError' },
  { href: '/blog/digital-provenance-complete-guide', label: 'Digital Provenance' },
  { href: '/blog/notebooklm-cheat-sheet-tips', label: 'NotebookLM Cheat Sheet' },
  { href: '/blog/how-to-know-if-someone-blocked-you-on-instagram', label: 'Instagram Blocked' },
  { href: '/blog/ces-2026-fire-tv-stick-4k-max-project-ava', label: 'Fire TV Stick 4K Max' },
  { href: '/blog/prefix-sum-technique-explained-simply', label: 'Prefix Sum' },
  { href: '/blog/how-to-fix-broken-json-without-understanding', label: 'Fix Broken JSON' },
  { href: '/blog/ai-native-platforms-complete-guide', label: 'AI-Native Platforms' },
  { href: '/blog/hipaa-compliant-ai-development', label: 'HIPAA-Compliant AI' },
  { href: '/blog/high-impact-tech-stocks-investment-guide', label: 'Tech Stocks' },
  { href: '/blog/must-learn-tech-skills-2030', label: 'Tech Skills 2030' },
  { href: '/blog/instagram-password-reset-email-guide', label: 'Instagram Password Reset' },
  { href: '/blog/how-to-change-instagram-phone-number-email-2026', label: 'Instagram Phone/Email' },
  { href: '/blog/top-10-json-errors-waste-developer-time', label: 'Top 10 JSON Errors' },
  { href: '/blog/what-is-hashmap-hashtable-explained-simply-with-examples', label: 'HashMap/HashTable' },
  { href: '/blog/invalid-json-vs-valid-json-examples', label: 'Invalid vs Valid JSON' },
  { href: '/blog/how-to-read-error-messages-properly-as-beginner-programmer', label: 'Read Error Messages' },
  { href: '/blog/how-to-change-phone-number-telegram-without-notifying', label: 'Telegram Phone Change' },
  { href: '/blog/what-is-linked-list-singly-vs-doubly-explained-simply', label: 'Linked List' },
  { href: '/blog/how-to-hide-online-status-on-whatsapp', label: 'WhatsApp Hide Status' },
  { href: '/blog/fix-error-listen-eaddrinuse-nodejs-port-already-in-use', label: 'EADDRINUSE Node.js' },
  { href: '/blog/how-to-parse-nested-json-java', label: 'Parse Nested JSON Java' },
  { href: '/blog/css-explained-guide', label: 'CSS Explained' },
  { href: '/blog/how-to-fix-cors-policy-error-javascript', label: 'CORS Policy Error' },
  { href: '/blog/binary-search-explained-like-youre-5-with-code-example', label: 'Binary Search' },
  { href: '/blog/json-stringify-vs-json-parse-difference', label: 'stringify vs parse' },
  { href: '/blog/notebooklm-complete-guide', label: 'NotebookLM Guide' },
  { href: '/blog/how-to-cancel-amazon-prime-membership-instantly', label: 'Cancel Amazon Prime' },
  { href: '/blog/json-api-design-patterns', label: 'JSON API Design' },
  { href: '/blog/how-to-see-deleted-instagram-messages-without-third-party-apps', label: 'See Deleted Instagram' },
  { href: '/blog/json-best-practices-production-guide', label: 'JSON Best Practices' },
  { href: '/blog/how-to-fix-nullpointerexception-java-beginner-friendly', label: 'NullPointerException Java' },
  { href: '/blog/fix-cannot-read-properties-of-undefined-reading-length-javascript', label: 'Undefined length JS' },
  { href: '/blog/how-to-see-instagram-story-without-being-seen', label: 'Instagram Story Unseen' },
  { href: '/blog/physical-ai-systems-complete-guide', label: 'Physical AI Systems' },
  { href: '/blog/physical-ai-autonomous-vehicles-complete-guide', label: 'Physical AI Vehicles' },
  { href: '/blog/physical-ai-complete-guide', label: 'Physical AI' },
  { href: '/blog/nintendo-switch-online-gamecube-games', label: 'Switch GameCube' },
  { href: '/blog/what-is-two-pointer-technique-explained-for-beginners', label: 'Two Pointer' },
  { href: '/blog/curl-vs-python-requests-comparison', label: 'cURL vs Requests' },
  { href: '/blog/best-free-developer-tools-2026', label: 'Free Dev Tools 2026' },
  { href: '/blog/what-is-sliding-window-technique-explained-with-simple-examples', label: 'Sliding Window' },
  { href: '/blog/stringified-json-hell-unescape-decode-jwt-epoch-sanitize-logs', label: 'Stringified JSON Logs' },
  { href: '/blog/how-to-decode-stringified-nested-json-logs-without-5-tools', label: 'Decode Stringified JSON' },
  { href: '/blog/ultimate-guide-fixing-escaped-json-jwt-epoch-stack-traces-logs', label: 'Escaped JSON JWTs' },
  { href: '/blog/greedy-algorithm-explained-with-simple-examples', label: 'Greedy Algorithm' },
  { href: '/blog/how-to-change-email-address-google-account-safely', label: 'Change Google Email' },
  { href: '/blog/complete-guide-json-viewer-parser-beautifier', label: 'JSON Viewer Guide' },
  { href: '/blog/how-to-cancel-spotify-premium-and-get-refund', label: 'Cancel Spotify' },
  { href: '/blog/what-is-stack-vs-queue-explained-with-real-life-examples', label: 'Stack vs Queue' },
  { href: '/blog/why-async-await-is-not-working-javascript-common-mistakes', label: 'async/await Not Working' },
  { href: '/blog/merge-sort-explained-step-by-step-why-preferred-in-interviews', label: 'Merge Sort' },
  { href: '/blog/advanced-html5-apis-guide', label: 'HTML5 APIs' },
  { href: '/blog/ai-supercomputing-platforms-complete-guide', label: 'AI Supercomputing' },
  { href: '/blog/domain-specific-language-models-complete-guide', label: 'Domain Language Models' },
  { href: '/blog/mysql-comma-separated-id-list-guide', label: 'MySQL IN List' },
  { href: '/blog/fix-hydration-failed-error-nextjs-server-vs-client-mismatch', label: 'Hydration Failed Next.js' },
  { href: '/blog/what-is-time-complexity-explained-with-simple-examples', label: 'Time Complexity' },
  { href: '/blog/how-to-read-whatsapp-messages-without-blue-ticks', label: 'WhatsApp No Blue Ticks' },
  { href: '/blog/xbox-game-pass-games-complete-guide', label: 'Xbox Game Pass' },
  { href: '/blog/how-to-fix-module-not-found-error-nodejs', label: 'Module Not Found Node' },
  { href: '/blog/what-is-bfs-vs-dfs-differences-explained-with-examples', label: 'BFS vs DFS' },
  { href: '/blog/fix-maximum-call-stack-size-exceeded-javascript', label: 'Stack Size Exceeded' },
  { href: '/blog/fix-cannot-read-property-map-of-undefined-javascript', label: 'map of Undefined' },
  { href: '/blog/how-to-change-whatsapp-number-without-losing-chats', label: 'WhatsApp Number Change' },
  { href: '/blog/html-interview-questions', label: 'HTML Interview' },
  { href: '/blog/how-to-cancel-netflix-subscription-without-losing-watch-history', label: 'Cancel Netflix' },
  { href: '/blog/seo-optimized-html-markup', label: 'SEO HTML Markup' },
  { href: '/blog/fix-access-control-allow-origin-missing-header-error', label: 'CORS Missing Header' },
  { href: '/blog/fix-unexpected-token-less-than-in-json-api-returns-html', label: 'Unexpected token < JSON' },
  { href: '/blog/what-is-recursion-explained-with-simple-real-life-examples', label: 'Recursion' },
  { href: '/blog/fix-uncaught-in-promise-error-javascript-explained', label: 'Uncaught in Promise' },
  { href: '/blog/how-to-change-apple-id-phone-number-without-losing-data', label: 'Apple ID Phone' },
  { href: '/blog/how-to-get-curl-from-chrome', label: 'cURL from Chrome' },
  { href: '/blog/most-useful-tech-skills-2026', label: 'Tech Skills 2026' },
];

const INITIAL_BLOG_LINKS = 20;

function HomeClient({ hero }: { hero: ReactNode }) {
  const [activeTab, setActiveTab] = useState<ToolTab>('beautifier');
  const [rows, setRows] = useState<FlattenedRow[]>([]);
  const [columns, setColumns] = useState<Column[]>([]);
  const [sections, setSections] = useState<Section[]>([]);
  const [removedColumns, setRemovedColumns] = useState<Set<string>>(new Set());
  const [historyManager] = useState(() => new HistoryManager(10));
  const [mounted, setMounted] = useState<boolean>(false);
  const [samplePanelOpen, setSamplePanelOpen] = useState<boolean>(true);
  const [showAllBlogLinks, setShowAllBlogLinks] = useState<boolean>(false);

  // Sample JSON for engagement: live demo snippet and interactive panel
  const SAMPLE_JSON_FORMATTED = `{
  "name": "Live demo",
  "items": [1, 2, 3],
  "nested": {
    "key": "value"
  }
}`;

  const copySampleJson = useCallback(() => {
    navigator.clipboard.writeText(SAMPLE_JSON_FORMATTED).then(() => {
      trackCopy('home');
      toast.success('Copied to clipboard');
    }).catch(() => toast.error('Copy failed'));
  }, []);
  const downloadSampleJson = useCallback(() => {
    trackCtaClick('home', 'download_sample');
    const blob = new Blob([SAMPLE_JSON_FORMATTED], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'sample.json';
    a.click();
    URL.revokeObjectURL(a.href);
    toast.success('Downloaded sample.json');
  }, []);

  // Handle tab change — no promotional toasts; scroll to in-page tool when switching to Beautifier
  const handleTabChange = useCallback((tab: ToolTab) => {
    if (tab !== activeTab) {
      setActiveTab(tab);
      trackToolUsed('home', { tab });
      if (tab === 'beautifier' && typeof document !== 'undefined') {
        requestAnimationFrame(() => {
          document.getElementById('active-tool')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
      }
    } else {
      setActiveTab(tab);
    }
  }, [activeTab]);


  // Mark as mounted and set client-only state (avoids hydration mismatch with SSR)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    setMounted(true);
    const urlParams = new URLSearchParams(window.location.search);
      const tabParam = urlParams.get('tab');
      if (tabParam === 'converter') {
      window.location.replace('/json-to-excel');
      return;
    }
      if (tabParam && ['beautifier', 'fixer', 'comparator', 'jsoncompare', 'schema', 'logs', 'payload', 'curl', 'mock', 'testdata', 'config', 'sql', 'builder', 'promptchunk', 'schemamasker', 'jsonpromptshield', 'tokencompare', 'timezone', 'hartocurl', 'curlfailure'].includes(tabParam)) {
      setActiveTab(tabParam as ToolTab);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  // AdSense: do NOT push() here. Each AdUnit pushes only when its container has non-zero width,
  // which avoids "Invalid responsive width from Matched Content slot: 0" and layout shifts.

  // Stats widget removed (was showing Active Users / Total Visits with broken data). Re-add when /api/stats is reliable.
  // Optional: keep a lightweight heartbeat for future analytics if desired.
  useEffect(() => {
    if (!mounted) return;
    const heartbeatInterval = setInterval(() => {
      fetch('/api/stats', { method: 'POST', credentials: 'include' }).catch(() => {});
    }, 30000);
    return () => clearInterval(heartbeatInterval);
  }, [mounted]);

  const saveToHistory = useCallback(() => {
    historyManager.push({
      rows: JSON.parse(JSON.stringify(rows)),
      columns: JSON.parse(JSON.stringify(columns)),
      sections: JSON.parse(JSON.stringify(sections)),
    });
  }, [rows, columns, sections, historyManager]);

  // Memoize visible columns to prevent unnecessary recalculations
  const visibleColumns = useMemo(() => 
    columns.filter((col) => !removedColumns.has(col.id)),
    [columns, removedColumns]
  );

  // Memoize filtered sections to prevent unnecessary recalculations
  const filteredSections = useMemo(() => 
    sections.map((section) => ({
      ...section,
      columnIds: section.columnIds.filter((id) => !removedColumns.has(id)),
    })),
    [sections, removedColumns]
  );

  const handleJsonSubmit = (data: any) => {
    try {
      const flattenedRows = jsonToRows(data);
      const extractedColumns = extractColumns(flattenedRows);
      
      setRows(flattenedRows);
      setColumns(extractedColumns);
      setSections([]);
      setRemovedColumns(new Set());
      historyManager.clear();
      historyManager.push({
        rows: flattenedRows,
        columns: extractedColumns,
        sections: [],
      });
      toast.success('JSON parsed successfully!');
    } catch (error: any) {
      toast.error(`Failed to parse JSON: ${error.message}`);
    }
  };

  const handleSectionsChange = (newSections: Section[]) => {
    setSections(newSections);
    saveToHistory();
  };

  const handleColumnMove = (columnId: string, fromSectionId: string | null, toSectionId: string | null) => {
    const newSections = [...sections];
    
    if (fromSectionId) {
      const fromSection = newSections.find(s => s.id === fromSectionId);
      if (fromSection) {
        fromSection.columnIds = fromSection.columnIds.filter(id => id !== columnId);
      }
    }
    
    if (toSectionId) {
      const toSection = newSections.find(s => s.id === toSectionId);
      if (toSection) {
        toSection.columnIds.push(columnId);
      }
    } else {
      // Moving to unassigned - no action needed as columns are automatically unassigned
    }
    
    setSections(newSections);
    saveToHistory();
  };

  const handleCellEdit = (rowIndex: number, columnId: string, newValue: any) => {
    const newRows = [...rows];
    newRows[rowIndex] = { ...newRows[rowIndex], [columnId]: newValue };
    setRows(newRows);
    saveToHistory();
  };

  const handleColumnRename = (columnId: string, newName: string) => {
    const newColumns = columns.map(col => 
      col.id === columnId ? { ...col, name: newName } : col
    );
    setColumns(newColumns);
    saveToHistory();
    toast.success('Column renamed successfully');
  };

  const handleRowDelete = (rowIndex: number) => {
    const newRows = rows.filter((_, index) => index !== rowIndex);
    setRows(newRows);
    saveToHistory();
    toast.success('Row deleted successfully');
  };

  const handleUndo = () => {
    const state = historyManager.undo();
    if (state) {
      setRows(state.rows);
      setColumns(state.columns);
      setSections(state.sections);
      toast.success('Undone');
    } else {
      toast.error('Nothing to undo');
    }
  };

  const handleRedo = () => {
    const state = historyManager.redo();
    if (state) {
      setRows(state.rows);
      setColumns(state.columns);
      setSections(state.sections);
      toast.success('Redone');
    } else {
      toast.error('Nothing to redo');
    }
  };

  const handleRemoveColumn = (columnId: string) => {
    setRemovedColumns((prev) => {
      const newSet = new Set(prev);
      newSet.add(columnId);
      return newSet;
    });
    saveToHistory();
    toast.success('Column removed from table and export');
  };

  const handleRemoveAllUnassigned = (unassignedColumnIds: string[]) => {
    if (unassignedColumnIds.length === 0) {
      toast.error('No unassigned columns to remove (all columns are in sections)');
      return;
    }

    const safeToRemove = unassignedColumnIds.filter(id => !removedColumns.has(id));

    if (safeToRemove.length === 0) {
      toast.error('No unassigned columns to remove (all columns are in sections)');
      return;
    }

    if (typeof window !== 'undefined' && window.confirm(`Are you sure you want to remove ${safeToRemove.length} unassigned column(s) from the table and export?`)) {
      setRemovedColumns((prev) => {
        const newSet = new Set(prev);
        safeToRemove.forEach(id => newSet.add(id));
        return newSet;
      });
      saveToHistory();
      toast.success(`${safeToRemove.length} unassigned column(s) removed from table and export`);
    }
  };

  const handleRestoreColumn = (columnId: string) => {
    setRemovedColumns((prev) => {
      const newSet = new Set(prev);
      newSet.delete(columnId);
      return newSet;
    });
    saveToHistory();
    toast.success('Column restored to table and export');
  };

  // No flex-1 on root — avoids stretching the page shell when the flex parent is taller than content
  return (
    <div className="relative flex w-full min-w-0 flex-col" style={{ contain: 'layout' }}>
      {/* Skip to main content — fixed position so it never causes layout shift (CLS) */}
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[9999] px-4 py-3 bg-white text-gray-900 font-semibold rounded-lg shadow-lg ring-2 ring-emerald-600 ring-offset-2 opacity-0 pointer-events-none focus:opacity-100 focus:pointer-events-auto"
      >
        Skip to main content
      </a>
      {hero}

      <HomePrivacyFirstSections
        toolPageUrls={toolPageUrls}
        onBeautifierClick={() => handleTabChange('beautifier')}
      />

      {/* Ad strip — mobile-friendly heights for 320x50 / 300x250; collapsed when Beautifier active */}
      <div key={activeTab} className={`ud-content py-0 border-b border-zinc-200/80 bg-white/60 ${activeTab === 'beautifier' ? 'min-h-0 overflow-hidden' : ''}`}>
        <div id="ezoic-pub-ad-placeholder-101" role="region" aria-label="Advertisement" className={activeTab === 'beautifier' ? 'min-h-0 h-0 overflow-hidden' : 'min-h-[50px] sm:min-h-[50px] w-full flex items-center justify-center'} style={activeTab !== 'beautifier' ? { contain: 'layout' } : undefined} />
        <div id="ezoic-pub-ad-placeholder-111" role="region" aria-label="Advertisement" className={activeTab === 'beautifier' ? 'min-h-0 h-0 overflow-hidden' : 'min-h-[250px] sm:min-h-[90px] w-full flex items-center justify-center'} style={activeTab !== 'beautifier' ? { contain: 'layout' } : undefined} />
      </div>

      {/* Main Content - min-height to reduce CLS; no opacity animation to avoid CLS from paint */}
      {/* No flex-1 here — flex-1 made <main> eat all remaining viewport height and left a huge white gap above the feedback band */}
      <main id="main-content" className={`w-full min-h-[320px] overflow-x-hidden ${activeTab === 'beautifier' ? 'pt-6 sm:pt-8 pb-4 sm:pb-6' : 'py-6 sm:py-10 lg:py-12'}`}>
        <div className="ud-content">
        {activeTab === 'beautifier' && (
          <div className="w-full scroll-mt-28 sm:scroll-mt-32" id="active-tool">
            <div className="ud-card-redesign overflow-hidden shadow-md">
              <div className="h-1 w-full bg-gradient-to-r from-emerald-600 to-emerald-500" aria-hidden />
              <div className="p-6 sm:p-10 lg:p-12">
                <div className="mb-8 sm:mb-10 pb-6 sm:pb-8 border-b border-zinc-100">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-900">Live on this page</span>
                    <span className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-600">100% client-side</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-semibold text-zinc-900 tracking-tight">JSON Beautifier</h2>
                  <p className="mt-2 text-sm sm:text-base text-zinc-600 max-w-2xl leading-relaxed">
                    Paste or type JSON — format, minify, and explore the tree. Everything stays in your browser.
                  </p>
                </div>
                <JsonBeautifier />
              </div>
            </div>
          </div>
        )}
        {activeTab === 'converter' && (
          rows.length === 0 ? (
            <div className="max-w-4xl mx-auto space-y-8 sm:space-y-10">
              {/* Hero: title + input */}
              <header className="pt-2 sm:pt-4">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2" style={{ letterSpacing: '-0.02em' }}>Use AI Safely — Schema Masking, JSON Masking &amp; Log Unpacker</h2>
                <p className="text-gray-600 text-sm sm:text-base mb-6 max-w-2xl leading-relaxed">Mask JSON and SQL before sending to AI. Fix stringified JSON, unpack logs, decode JWTs. Format, parse, validate — 100% in-browser, no signup.</p>
                <div id="json-input-section" className="scroll-mt-6">
                  <JsonInput onJsonSubmit={handleJsonSubmit} />
                </div>
              </header>

              {/* Overview + Key Features */}
              <section className="space-y-4" aria-labelledby="overview-heading">
                <div className="text-center">
<h2 id="overview-heading" className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">Overview</h2>
                <p className="text-gray-600 text-sm max-w-xl mx-auto">AI Schema Masking, JSON masking, Log Unpacker, formatter & parser — use AI without exposing your data. No signup.</p>
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3 list-none" aria-label="Key features">
                  <li className="bg-white rounded-xl border border-gray-200 p-4 text-center shadow-sm hover:shadow transition-shadow flex flex-col min-h-[5.5rem]">
                    <h3 className="text-sm font-semibold text-gray-900 mb-1">JSON Viewer Online</h3>
                    <p className="text-gray-600 text-xs leading-relaxed mt-auto">View and navigate JSON with a tree view.</p>
                  </li>
                  <li className="bg-white rounded-xl border border-gray-200 p-4 text-center shadow-sm hover:shadow transition-shadow flex flex-col min-h-[5.5rem]">
                    <h3 className="text-sm font-semibold text-gray-900 mb-1">Formatter & Beautifier</h3>
                    <p className="text-gray-600 text-xs leading-relaxed mt-auto">Format and prettify JSON.</p>
                  </li>
                  <li className="bg-white rounded-xl border border-gray-200 p-4 text-center shadow-sm hover:shadow transition-shadow flex flex-col min-h-[5.5rem]">
                    <h3 className="text-sm font-semibold text-gray-900 mb-1">Parser & Validator</h3>
                    <p className="text-gray-600 text-xs leading-relaxed mt-auto">Parse, validate, fix malformed JSON.</p>
                  </li>
                </ul>
              </section>

              {/* How it works — E-E-A-T / trust */}
              <section className="rounded-2xl border border-emerald-200 bg-emerald-50/80 p-5 sm:p-6 shadow-sm ring-1 ring-emerald-100/50" aria-labelledby="how-it-works-heading">
                <h2 id="how-it-works-heading" className="text-sm font-semibold text-emerald-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-emerald-600" aria-hidden /> How it works
                </h2>
                <p className="text-gray-700 text-sm leading-relaxed mb-3">
                  All tools run <strong>entirely in your browser</strong>. Your JSON, SQL, and logs never leave your device — nothing is sent to our servers or stored. Paste your data, mask or format it, then copy the result. Use the output safely with ChatGPT or any AI without exposing real schemas or PII.
                </p>
                <p className="text-gray-600 text-xs leading-relaxed">
                  Masking is deterministic and reversible: you can restore original names after getting AI responses. No signup, no account, no tracking.
                </p>
              </section>

              {/* Example JSON */}
              <section className="w-full" aria-label="Example JSON">
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setSamplePanelOpen((o) => !o)}
                    className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200 text-left font-semibold text-gray-900 hover:bg-gray-100 transition-colors"
                  >
                    <span>Example JSON — try it live</span>
                    {samplePanelOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                  {samplePanelOpen && (
                    <div className="p-4 space-y-3">
                      <pre className="text-sm text-gray-800 bg-gray-50 p-3 rounded-lg overflow-x-auto border border-gray-100 font-mono whitespace-pre-wrap break-words">
                        {SAMPLE_JSON_FORMATTED}
                      </pre>
                      <div className="flex flex-wrap justify-center gap-2">
                        <button
                          type="button"
                          onClick={copySampleJson}
                          className="inline-flex items-center gap-2 px-3 py-2 bg-zinc-900 text-white text-sm font-medium rounded-lg hover:bg-zinc-800 transition-colors"
                        >
                          <Copy className="w-4 h-4" />
                          Copy
                        </button>
                        <button
                          type="button"
                          onClick={downloadSampleJson}
                          className="inline-flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <Download className="w-4 h-4" />
                          Download
                        </button>
                        <a
                          href="#json-input-section"
                          className="inline-flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-800 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
                        >
                          Use in viewer
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </section>

              {/* Try more tools */}
              <section className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 text-center shadow-sm">
                <h2 className="text-lg font-semibold text-gray-900 mb-1">Try more tools</h2>
                <p className="text-gray-600 text-sm mb-4 max-w-lg mx-auto">Edit, validate, convert JSON. No signup.</p>
                <div className="flex flex-wrap justify-center gap-2">
                  <Link href="#json-input-section" className="inline-flex items-center gap-1.5 px-3 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors">
                    <Play className="w-3.5 h-3.5" />
                    JSON Viewer
                  </Link>
                  <Link href="/json-beautifier" className="inline-flex items-center gap-1.5 px-3 py-2 border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
                    <Code2 className="w-3.5 h-3.5" />
                    Formatter
                  </Link>
                  <Link href="/json-fixer-online" className="inline-flex items-center gap-1.5 px-3 py-2 border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
                    <Wrench className="w-3.5 h-3.5" />
                    Validator
                  </Link>
                  <Link href="/json-schema-generation" className="inline-flex items-center gap-1.5 px-3 py-2 border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
                    <FileCode className="w-3.5 h-3.5" />
                    Schema
                  </Link>
                  <Link href="/json-comparator" className="inline-flex items-center gap-1.5 px-3 py-2 border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
                    <GitCompare className="w-3.5 h-3.5" />
                    Compare
                  </Link>
                </div>
                <div className="mt-5 pt-5 border-t border-gray-100 text-center">
                  <p className="text-xs font-medium text-gray-600 uppercase tracking-wider mb-2">Mini-tour</p>
                  <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside inline-block text-left">
                    <li>Paste your JSON above (or use the example panel)</li>
                    <li>View, format, validate, or convert to CSV/Excel</li>
                    <li>Download or copy—no signup required</li>
                  </ol>
                </div>
              </section>

              {/* Footer CTA + links */}
              <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 text-center shadow-sm">
                <h2 className="text-sm font-semibold text-gray-900 mb-1">Free JSON Tools for Developers</h2>
                <p className="text-gray-600 text-xs mb-4 max-w-md mx-auto">Paste JSON to view, format, validate, or convert. No signup—data stays private.</p>
                <div className="flex flex-wrap items-center justify-center gap-2 mb-5">
                  <a href="#json-input-section" className="inline-flex items-center gap-1.5 px-3 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors">
                    Open JSON Viewer
                  </a>
                  <Link href="/json-beautifier" className="inline-flex items-center gap-1.5 px-3 py-2 border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
                    Try Formatter
                  </Link>
                </div>
                <nav className="pt-5 border-t border-gray-200" aria-label="JSON tools navigation">
                  <p className="text-xs font-medium text-gray-600 uppercase tracking-wider mb-2">Related tools</p>
                  <ul className="flex flex-wrap justify-center gap-x-3 gap-y-1.5 text-sm">
                  <li><Link href="/tools/json" className="text-emerald-800 hover:text-emerald-950 hover:underline font-medium">All JSON tools</Link></li>
                  <li><Link href="/#json-input-section" className="text-emerald-800 hover:text-emerald-950 hover:underline">JSON viewer online</Link></li>
                  <li><Link href="/json-beautifier" className="text-emerald-800 hover:text-emerald-950 hover:underline">JSON formatter online</Link></li>
                  <li><Link href="/#json-input-section" className="text-emerald-800 hover:text-emerald-950 hover:underline">JSON parser online</Link></li>
                  <li><Link href="/#json-input-section" className="text-emerald-800 hover:text-emerald-950 hover:underline">JSON to CSV/Excel/Table</Link></li>
                  <li><Link href="/json-fixer-online" className="text-emerald-800 hover:text-emerald-950 hover:underline">JSON validator</Link></li>
                  <li><Link href="/json-beautifier" className="text-emerald-800 hover:text-emerald-950 hover:underline">JSON beautifier</Link></li>
                  <li><Link href="/json-schema-generation" className="text-emerald-800 hover:text-emerald-950 hover:underline">JSON schema generator</Link></li>
                  <li><Link href="/json-comparator" className="text-emerald-800 hover:text-emerald-950 hover:underline">JSON comparator</Link></li>
                  <li><Link href="/sql-in-generator" className="text-emerald-800 hover:text-emerald-950 hover:underline">SQL IN generator</Link></li>
                  </ul>
                </nav>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-6 sm:mb-8">
                <button
                  onClick={() => {
                    setRows([]);
                    setColumns([]);
                    setSections([]);
                    historyManager.clear();
                  }}
                  className="px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-white rounded-lg transition-all duration-200 border border-gray-200 hover:border-gray-300 hover:shadow-sm"
                >
                  ← Load New JSON
                </button>
              </div>

              <div className="space-y-6 sm:space-y-8">
              <SectionManager
                sections={sections}
                columns={columns}
                removedColumns={removedColumns}
                onSectionsChange={handleSectionsChange}
                onColumnMove={handleColumnMove}
                onRemoveColumn={handleRemoveColumn}
                onRemoveAllUnassigned={handleRemoveAllUnassigned}
                onRestoreColumn={handleRestoreColumn}
              />

              <DataTable
                rows={rows}
                columns={visibleColumns}
                sections={filteredSections}
                removedColumns={removedColumns}
                onCellEdit={handleCellEdit}
                onColumnRename={handleColumnRename}
                onRowDelete={handleRowDelete}
              />
              </div>
            </>
          )
        )}
        </div>
      </main>

      {/* Mid-page ad — Beautifier tab only */}
      {activeTab === 'beautifier' && (
        <div className="ud-content border-t border-zinc-200/80 py-2 sm:py-2">
          <div
            id="ezoic-pub-ad-placeholder-102"
            role="region"
            aria-label="Advertisement"
            className="flex min-h-0 w-full items-center justify-center sm:min-h-[50px]"
            style={{ contain: 'layout' }}
          />
        </div>
      )}

      <FeedbackNewsletterSplit layout={activeTab === 'beautifier' ? 'split' : 'feedback-only'} />

      {/* Ezoic Ad Placement - Before Footer (103) - mobile leaderboard / desktop banner */}
      <div id="ezoic-pub-ad-placeholder-103" role="region" aria-label="Advertisement" className="min-h-[50px] sm:min-h-[90px] w-full" style={{ contain: 'layout' }} />

      {/* Home-only SEO link hub (global dark footer is in AppShell) */}
      <section className="border-t border-zinc-200 bg-white py-8 sm:py-12">
        <div className="ud-content container-padding">
          {/* Main Footer Content */}
          <div className="text-center space-y-3">
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700 px-1">
                <strong className="text-gray-900">UnblockDevs</strong> — Free Online Developer Tools Suite
              </p>
              <p className="text-xs text-gray-500 leading-relaxed mt-1 px-1">
                JSON Viewer, Formatter, Parser, Beautifier, Fixer, JSON to Excel/CSV, API testing, schema generation, SQL formatting, log analysis, and more. All tools are free and run in your browser.
              </p>
              <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 sm:gap-4 mt-3 text-xs text-gray-600 [&_a]:py-2 [&_a]:min-h-[44px] [&_a]:inline-flex [&_a]:items-center [&_a]:touch-manipulation">
                <Link href="/json-formatter" className="text-emerald-800 hover:text-emerald-950 hover:underline">✓ JSON Formatter</Link>
                <Link href="/json-validator" className="text-emerald-800 hover:text-emerald-950 hover:underline">✓ JSON Validator</Link>
                <Link href="/json-beautifier" className="text-emerald-800 hover:text-emerald-950 hover:underline">✓ JSON Beautifier</Link>
                <Link href="/json-fixer-online" className="text-emerald-800 hover:text-emerald-950 hover:underline">✓ JSON Fixer</Link>
                <Link href="/fix-json-parse-error-javascript" className="text-emerald-800 hover:text-emerald-950 hover:underline">✓ Fix JSON.parse() Guide</Link>
                <Link href="/how-to-fix-broken-json-online" className="text-emerald-800 hover:text-emerald-950 hover:underline">✓ Fix Broken JSON Online</Link>
                <Link href="/json-schema-generation" className="text-emerald-800 hover:text-emerald-950 hover:underline">✓ JSON Schema Generator</Link>
                <Link href="/json-to-excel" className="text-emerald-800 hover:text-emerald-950 hover:underline">✓ JSON to Excel</Link>
                <Link href="/" className="text-emerald-800 hover:text-emerald-950 hover:underline">✓ JSON Comparator</Link>
                <Link href="/" className="text-emerald-800 hover:text-emerald-950 hover:underline">✓ API Comparator</Link>
                <Link href="/har-to-curl" className="text-emerald-800 hover:text-emerald-950 hover:underline">✓ HAR to cURL</Link>
                <Link href="/curl-to-requests" className="text-emerald-800 hover:text-emerald-950 hover:underline">✓ cURL to Code</Link>
                <Link href="/curl-to-python" className="text-emerald-800 hover:text-emerald-950 hover:underline">✓ cURL to Python (converter)</Link>
                <Link href="/curl-to-python-requests" className="text-emerald-800 hover:text-emerald-950 hover:underline">✓ cURL to Python Requests</Link>
                <Link href="/convert-curl-to-http-request" className="text-emerald-800 hover:text-emerald-950 hover:underline">✓ cURL to HTTP</Link>
                <Link href="/json-stringify-online" className="text-emerald-800 hover:text-emerald-950 hover:underline">✓ JSON.stringify()</Link>
                <Link href="/token-comparator" className="text-emerald-800 hover:text-emerald-950 hover:underline">✓ Token Comparator</Link>
                <Link href="/jwt-decoder" className="text-emerald-800 hover:text-emerald-950 hover:underline">✓ JWT Decoder</Link>
                <Link href="/base64-encoder" className="text-emerald-800 hover:text-emerald-950 hover:underline">✓ Base64 Encoder</Link>
                <Link href="/password-generator" className="text-emerald-800 hover:text-emerald-950 hover:underline">✓ Password Generator</Link>
                <Link href="/uuid-generator" className="text-emerald-800 hover:text-emerald-950 hover:underline">✓ UUID Generator</Link>
                <Link href="/cors-tester" className="text-emerald-800 hover:text-emerald-950 hover:underline">✓ CORS Tester</Link>
                <Link href="/truth-table-generator" className="text-emerald-800 hover:text-emerald-950 hover:underline">✓ Truth Table Generator</Link>
                <Link href="/hash-generator" className="text-emerald-800 hover:text-emerald-950 hover:underline">✓ Hash Generator</Link>
                <Link href="/url-encoder" className="text-emerald-800 hover:text-emerald-950 hover:underline">✓ URL Encoder</Link>
                <Link href="/prompt-chunker" className="text-emerald-800 hover:text-emerald-950 hover:underline">✓ Prompt Chunker</Link>
                <Link href="/" className="text-emerald-800 hover:text-emerald-950 hover:underline">✓ Log Explorer</Link>
                <Link href="/" className="text-emerald-800 hover:text-emerald-950 hover:underline">✓ Payload Analyzer</Link>
                <Link href="/" className="text-emerald-800 hover:text-emerald-950 hover:underline">✓ Mock API Generator</Link>
                <Link href="/" className="text-emerald-800 hover:text-emerald-950 hover:underline">✓ SQL Formatter</Link>
                <Link href="/" className="text-emerald-800 hover:text-emerald-950 hover:underline">✓ JSON Builder</Link>
              </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500 mb-2 text-center">Learn more about JSON:</p>
                <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs [&_a]:py-2 [&_a]:inline-flex [&_a]:items-center [&_a]:touch-manipulation">
                  <a
                    href="https://www.json.org/json-en.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-800 hover:text-emerald-950 hover:underline flex items-center gap-1 transition-colors"
                  >
                    <span>📘</span>
                    <span>JSON.org</span>
                  </a>
                  <a
                    href="https://en.wikipedia.org/wiki/JSON"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-800 hover:text-emerald-950 hover:underline flex items-center gap-1 transition-colors"
                  >
                    <span>📚</span>
                    <span>JSON on Wikipedia</span>
                  </a>
                </div>
              </div>
              <div className="mt-4">
                <Link
                  href="/blog"
                  className="inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-3 sm:py-2 text-sm font-medium rounded-lg transition-colors touch-manipulation active:scale-[0.98] text-emerald-800 hover:text-emerald-950 hover:bg-emerald-50 focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
                >
                  <FileText className="w-4 h-4 text-emerald-800" aria-hidden />
                  <span>Developer&apos;s Study Materials 📚</span>
                </Link>
              </div>
            </div>
            
            {/* Popular Blog Posts — show 20 initially to reduce DOM/INP, expand on click */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-900 mb-4 text-center">Popular Developer Guides</h3>
              <div className="flex flex-wrap justify-center gap-x-3 gap-y-2 text-xs [&_a]:py-2 [&_a]:inline-flex [&_a]:items-center [&_a]:touch-manipulation">
                {(showAllBlogLinks ? POPULAR_BLOG_LINKS : POPULAR_BLOG_LINKS.slice(0, INITIAL_BLOG_LINKS)).map(({ href, label }) => (
                  <Link key={href} href={href} className="text-emerald-800 hover:text-emerald-950 hover:underline">{label}</Link>
                ))}
              </div>
              {!showAllBlogLinks && POPULAR_BLOG_LINKS.length > INITIAL_BLOG_LINKS && (
                <div className="text-center mt-3">
                  <button
                    type="button"
                    onClick={() => setShowAllBlogLinks(true)}
                    className="text-emerald-800 hover:text-emerald-950 text-sm font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2 rounded px-2 py-1"
                  >
                    Show all {POPULAR_BLOG_LINKS.length} guides →
                  </button>
                </div>
              )}
            </div>
            
            {/* Footer Links */}
            <div className="pt-4 border-t border-gray-200">
              <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600 mb-3">
                <Link
                  href="/about"
                  className="hover:text-emerald-900 hover:underline transition-colors"
                >
                  About Us
                </Link>
                <span className="text-gray-300">•</span>
                <Link
                  href="/badges"
                  className="hover:text-emerald-900 hover:underline transition-colors"
                >
                  Badges
                </Link>
                <span className="text-gray-300">•</span>
                <Link
                  href="/contact"
                  className="hover:text-emerald-900 hover:underline transition-colors"
                >
                  Contact
                </Link>
                <span className="text-gray-300">•</span>
                <Link
                  href="/blog"
                  className="hover:text-emerald-900 hover:underline transition-colors"
                >
                  Blog
                </Link>
                <span className="text-gray-300">•</span>
                <Link
                  href="/privacy-policy"
                  className="hover:text-emerald-900 hover:underline transition-colors"
                >
                  Privacy Policy
                </Link>
                <span className="text-gray-300">•</span>
                <Link
                  href="/terms"
                  className="hover:text-emerald-900 hover:underline transition-colors"
                >
                  Terms & Conditions
                </Link>
                <span className="text-gray-300">•</span>
                <Link
                  href="/disclaimer"
                  className="hover:text-emerald-900 hover:underline transition-colors"
                >
                  Disclaimer
                </Link>
              </div>
              <p className="text-sm text-gray-600">
                🚀 Built for developers who ship—by developers who get it. No gatekeeping, no compromise.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomeClient;

