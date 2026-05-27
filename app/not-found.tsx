import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 — Page Not Found | UnblockDevs',
  description: 'The page you were looking for doesn\'t exist. Find free developer tools for JSON, cURL, JWT, SQL, and more.',
  robots: { index: false, follow: true },
};

const QUICK_TOOLS = [
  { href: '/json-formatter', emoji: '{}', label: 'JSON Formatter' },
  { href: '/curl-converter', emoji: '⚡', label: 'cURL Converter' },
  { href: '/jwt-decoder', emoji: '🔐', label: 'JWT Decoder' },
  { href: '/json-validator', emoji: '✅', label: 'JSON Validator' },
  { href: '/sql-formatter', emoji: '🗄️', label: 'SQL Formatter' },
  { href: '/base64-encoder', emoji: '🔢', label: 'Base64 Encoder' },
  { href: '/cors-tester', emoji: '🔒', label: 'CORS Tester' },
  { href: '/regex-tester', emoji: '.*', label: 'Regex Tester' },
];

export default function NotFound() {
  return (
    <main
      id="main-content"
      className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-16 text-center"
    >
      {/* Big 404 */}
      <p className="select-none text-[7rem] font-black leading-none tracking-tighter text-zinc-100 sm:text-[10rem]" aria-hidden>
        404
      </p>

      {/* Heading */}
      <h1 className="-mt-4 text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
        Page not found
      </h1>
      <p className="mt-3 max-w-sm text-[14px] leading-relaxed text-zinc-500">
        The URL you typed doesn&apos;t exist — it may have moved or been removed.
        Try one of the tools below, or{' '}
        <Link href="/" className="text-emerald-600 underline underline-offset-2 hover:text-emerald-700">
          go home
        </Link>
        .
      </p>

      {/* Quick tool grid */}
      <div className="mt-10 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        {QUICK_TOOLS.map((t) => (
          <Link
            key={t.href}
            href={t.href}
            className="flex flex-col items-center gap-1.5 rounded-xl border border-zinc-200 bg-white px-4 py-3.5 text-sm font-medium text-zinc-700 shadow-sm transition-all hover:-translate-y-0.5 hover:border-emerald-300 hover:text-emerald-700 hover:shadow-md"
          >
            <span className="text-2xl leading-none" aria-hidden>{t.emoji}</span>
            {t.label}
          </Link>
        ))}
      </div>

      {/* Browse all tools */}
      <Link
        href="/tools/json"
        className="mt-8 inline-flex items-center gap-2 rounded-full border border-emerald-300 bg-emerald-50 px-5 py-2.5 text-[13px] font-semibold text-emerald-700 transition-colors hover:bg-emerald-100"
      >
        Browse all 50+ tools →
      </Link>
    </main>
  );
}
