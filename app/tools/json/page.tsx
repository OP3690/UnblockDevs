import type { Metadata } from 'next';
import Link from 'next/link';
import { FileCode, FileJson, CheckCircle, Table, Wrench, GitCompare, Layers, Code } from 'lucide-react';

export const metadata: Metadata = {
  title: 'JSON Tools Hub | Viewer, Formatter, Parser, Validator & More | UnblockDevs',
  description: 'Free JSON viewer online, JSON formatter online, JSON parser online, JSON validator, JSON to Excel/CSV/Table tools. One hub for all JSON tools—no signup.',
  openGraph: {
    title: 'JSON Tools Hub | Viewer, Formatter, Parser, Validator | UnblockDevs',
    description: 'Free JSON viewer, formatter, parser, validator, and JSON to CSV/Excel/Table tools. No signup, in-browser.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://unblockdevs.com/tools/json',
  },
};

const jsonTools = [
  {
    href: '/',
    title: 'JSON viewer online',
    description: 'View and explore JSON in a tree. Paste JSON, convert to Excel/CSV/Table. Primary JSON Viewer Tools experience.',
    icon: FileJson,
    anchor: 'JSON viewer online',
  },
  {
    href: '/json-beautifier',
    title: 'JSON formatter online',
    description: 'Format, beautify, and prettify JSON. JSON formatter online with syntax highlighting and validation.',
    icon: Code,
    anchor: 'JSON formatter online',
  },
  {
    href: '/',
    title: 'JSON parser online',
    description: 'Parse JSON and convert to table, CSV, or Excel. Validate and view structure in-browser.',
    icon: FileCode,
    anchor: 'JSON parser online',
  },
  {
    href: '/',
    title: 'JSON to Excel / CSV / Table',
    description: 'Convert JSON to Excel, JSON to CSV, or JSON to Table. Export and analyze JSON data instantly.',
    icon: Table,
    anchor: 'JSON to CSV/Excel/Table tools',
  },
  {
    href: '/json-fixer-online',
    title: 'JSON fixer & validator',
    description: 'Fix malformed JSON and validate syntax. JSON validator online—repair errors and get valid JSON.',
    icon: CheckCircle,
    anchor: 'JSON validator',
  },
  {
    href: '/json-beautifier',
    title: 'JSON beautifier',
    description: 'Beautify and minify JSON. JSON beautifier online with indentation and formatting options.',
    icon: Code,
    anchor: 'JSON beautifier',
  },
  {
    href: '/json-schema-generation',
    title: 'JSON schema generator',
    description: 'Generate JSON schema from JSON data. Validate JSON against schema. Schema generator from JSON.',
    icon: Layers,
    anchor: 'JSON schema generator',
  },
  {
    href: '/json-comparator',
    title: 'JSON comparator',
    description: 'Compare two JSON objects or files. Diff JSON and see changes. JSON compare tool online.',
    icon: GitCompare,
    anchor: 'JSON comparator',
  },
  {
    href: '/json-builder',
    title: 'JSON builder',
    description: 'Build JSON visually. Create and edit JSON structure with a visual JSON editor.',
    icon: Wrench,
    anchor: 'JSON builder',
  },
];

export default function JsonToolsHubPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-600 mb-8" aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1">
            <li><Link href="/" className="hover:text-blue-600">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link href="/tools/json" className="hover:text-blue-600 font-medium text-gray-900">Tools</Link></li>
            <li aria-hidden="true">/</li>
            <li className="font-medium text-gray-900">JSON</li>
          </ol>
        </nav>

        <header className="mb-10 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            JSON Viewer Tools, Formatter, Parser & More
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl">
            Free <strong>JSON viewer online</strong>, <strong>JSON formatter online</strong>, <strong>JSON parser online</strong>, 
            <strong> JSON validator</strong>, and <strong>JSON to CSV/Excel/Table</strong> tools. No signup, private, in-browser.
          </p>
        </header>

        <section className="space-y-4">
          <h2 className="sr-only">JSON tools list</h2>
          {jsonTools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link
                key={tool.href + tool.title}
                href={tool.href}
                className="block bg-white rounded-xl p-5 sm:p-6 border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-100 flex-shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {tool.anchor}
                    </h3>
                    <p className="text-gray-600 text-sm mt-1">{tool.description}</p>
                  </div>
                  <span className="text-blue-600 text-sm font-medium flex-shrink-0 group-hover:underline">
                    Open →
                  </span>
                </div>
              </Link>
            );
          })}
        </section>

        <p className="mt-10 text-center text-gray-500 text-sm">
          <Link href="/" className="text-blue-600 hover:underline">← Back to UnblockDevs home</Link>
        </p>
      </div>
    </div>
  );
}
