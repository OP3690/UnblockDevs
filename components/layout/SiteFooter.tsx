import Link from 'next/link';

/**
 * Global footer — clean, dark design. Width matches SiteHeader.
 */
export default function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-zinc-800/60 bg-zinc-950 text-zinc-400">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        {/* Top grid */}
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-6">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <div className="mb-4 flex items-center gap-2 text-white">
              <span className="flex h-[26px] w-[26px] items-center justify-center rounded bg-white font-mono text-[11px] font-bold text-zinc-900">
                U
              </span>
              <span className="text-[15px] font-semibold">UnblockDevs</span>
            </div>
            <p className="mb-5 max-w-[220px] text-[13px] leading-relaxed text-zinc-500">
              Free, privacy-first developer tools. Everything runs in your browser — no account, no data
              collection.
            </p>
            <div className="flex flex-wrap gap-1.5">
              {['Next.js', 'TypeScript', '100% Client-side'].map((b) => (
                <span
                  key={b}
                  className="rounded border border-zinc-800 bg-zinc-900 px-2 py-0.5 font-mono text-[10px] text-zinc-500"
                >
                  {b}
                </span>
              ))}
            </div>
          </div>

          {/* JSON tools */}
          <div>
            <p className="mb-4 text-[12px] font-semibold uppercase tracking-widest text-zinc-400">
              JSON tools
            </p>
            <ul className="flex flex-col gap-2.5 text-[13px]">
              {[
                { href: '/json-beautifier', label: 'JSON Beautifier' },
                { href: '/json-fixer-online', label: 'JSON Fixer' },
                { href: '/json-validator', label: 'JSON Validator' },
                { href: '/json-comparator', label: 'JSON Comparator' },
                { href: '/json-formatter', label: 'JSON Formatter' },
                { href: '/json-stringify-online', label: 'JSON Stringify' },
                { href: '/json-schema-generation', label: 'Schema Generator' },
                { href: '/json-to-excel', label: 'JSON to Excel' },
                { href: '/json-escape-characters', label: 'JSON Escape Chars' },
                { href: '/how-to-fix-broken-json-online', label: 'Fix Broken JSON' },
                { href: '/fix-unexpected-token-in-json', label: 'Fix Unexpected Token' },
                { href: '/fix-unexpected-end-of-json-input', label: 'Fix Unexpected End' },
                { href: '/fix-expected-comma-or-brace-json', label: 'Fix Expected Comma' },
                { href: '/fix-invalid-control-character-json', label: 'Fix Control Char' },
                { href: '/fix-unexpected-token-less-than-json', label: 'Fix Token < in JSON' },
                { href: '/python-json-decode-error', label: 'Python JSON DecodeError' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-zinc-500 transition-colors hover:text-zinc-200">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* AI safety */}
          <div>
            <p className="mb-4 text-[12px] font-semibold uppercase tracking-widest text-zinc-400">
              AI safety
            </p>
            <ul className="flex flex-col gap-2.5 text-[13px]">
              {[
                { href: '/ai-schema-masker', label: 'AI Schema Masker' },
                { href: '/json-prompt-shield', label: 'JSON Prompt Shield' },
                { href: '/code-prompt-shield', label: 'Code Prompt Shield' },
                { href: '/log-unpacker', label: 'Log Unpacker' },
                { href: '/prompt-chunker', label: 'Prompt Chunker' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-zinc-500 transition-colors hover:text-zinc-200">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Dev tools */}
          <div>
            <p className="mb-4 text-[12px] font-semibold uppercase tracking-widest text-zinc-400">
              Dev utilities
            </p>
            <ul className="flex flex-col gap-2.5 text-[13px]">
              {[
                { href: '/jwt-decoder', label: 'JWT Decoder' },
                { href: '/base64-encoder', label: 'Base64 Encoder' },
                { href: '/hash-generator', label: 'Hash Generator' },
                { href: '/url-encoder', label: 'URL Encoder' },
                { href: '/uuid-generator', label: 'UUID Generator' },
                { href: '/cors-tester', label: 'CORS Tester' },
                { href: '/sql-formatter', label: 'SQL Formatter' },
                { href: '/regex-tester', label: 'Regex Tester' },
                { href: '/password-generator', label: 'Password Generator' },
                { href: '/har-to-curl', label: 'HAR to cURL' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-zinc-500 transition-colors hover:text-zinc-200">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More tools */}
          <div>
            <p className="mb-4 text-[12px] font-semibold uppercase tracking-widest text-zinc-400">
              More tools
            </p>
            <ul className="flex flex-col gap-2.5 text-[13px]">
              {[
                { href: '/cron-expression', label: 'Cron Expression Builder' },
                { href: '/markdown-preview', label: 'Markdown Preview' },
                { href: '/svg-to-image', label: 'SVG to Image' },
                { href: '/pdf-to-excel-word', label: 'PDF to Excel/Word' },
                { href: '/data-insights', label: 'Data Insights' },
                { href: '/password-audit', label: 'Password Audit' },
                { href: '/truth-table-generator', label: 'Truth Table' },
                { href: '/speed-test', label: 'Speed Test' },
                { href: '/timezone-translator', label: 'Timezone Translator' },
                { href: '/curl-converter', label: 'cURL Converter' },
                { href: '/curl-failure-root-cause-engine', label: 'cURL Failure Analyzer' },
                { href: '/curl-post-json-example', label: 'cURL POST JSON Examples' },
                { href: '/convert-curl-to-http-request', label: 'cURL to HTTP Request' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-zinc-500 transition-colors hover:text-zinc-200">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Error fix guides */}
          <div>
            <p className="mb-4 text-[12px] font-semibold uppercase tracking-widest text-zinc-400">
              Error fixes
            </p>
            <ul className="flex flex-col gap-2.5 text-[13px]">
              {[
                { href: '/python-keyerror-fix', label: 'Fix Python KeyError' },
                { href: '/react-state-not-updating', label: 'React State Not Updating' },
                { href: '/cannot-read-property-undefined', label: "Fix Cannot Read Property" },
                { href: '/sql-syntax-error-fix', label: 'Fix SQL Syntax Error' },
                { href: '/http-403-error-fix', label: 'Fix HTTP 403 Error' },
                { href: '/useeffect-not-working', label: 'useEffect Not Working' },
                { href: '/fetch-api-not-working', label: 'Fetch API Not Working' },
                { href: '/nodejs-port-already-in-use', label: 'Fix Port Already in Use' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-zinc-500 transition-colors hover:text-zinc-200">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="mb-4 text-[12px] font-semibold uppercase tracking-widest text-zinc-400">
              Company
            </p>
            <ul className="flex flex-col gap-2.5 text-[13px]">
              {[
                { href: '/blog', label: 'Blog' },
                { href: '/about', label: 'About' },
                { href: '/privacy-policy', label: 'Privacy Policy' },
                { href: '/contact', label: 'Contact' },
                { href: '/terms', label: 'Terms' },
                { href: '/disclaimer', label: 'Disclaimer' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-zinc-500 transition-colors hover:text-zinc-200">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col gap-3 border-t border-zinc-800/60 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[12px] text-zinc-600">
            © {new Date().getFullYear()} UnblockDevs. All tools are free and open to everyone.
          </p>
          <div className="flex flex-wrap gap-5 text-[12px]">
            <Link href="/privacy-policy" className="text-zinc-500 hover:text-zinc-300">Privacy</Link>
            <Link href="/terms" className="text-zinc-500 hover:text-zinc-300">Terms</Link>
            <Link href="/about" className="text-zinc-500 hover:text-zinc-300">About</Link>
            <Link href="/disclaimer" className="text-zinc-500 hover:text-zinc-300">Disclaimer</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
