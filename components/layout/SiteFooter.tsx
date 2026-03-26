import Link from 'next/link';

/**
 * Global footer — clean, dark design.
 */
export default function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-zinc-800/60 bg-zinc-950 text-zinc-400">
      <div className="mx-auto max-w-[1100px] px-6 py-14 sm:py-16">
        {/* Top grid */}
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
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
              Developer tools
            </p>
            <ul className="flex flex-col gap-2.5 text-[13px]">
              {[
                { href: '/json-beautifier', label: 'JSON Beautifier' },
                { href: '/jwt-decoder', label: 'JWT Decoder' },
                { href: '/cors-tester', label: 'CORS Tester' },
                { href: '/hash-generator', label: 'Hash Generator' },
                { href: '/base64-encoder', label: 'Base64 Encoder' },
                { href: '/sql-formatter', label: 'SQL Formatter' },
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
            <Link href="/privacy-policy" className="text-zinc-500 hover:text-zinc-300">
              Privacy
            </Link>
            <Link href="/terms" className="text-zinc-500 hover:text-zinc-300">
              Terms
            </Link>
            <Link href="/about" className="text-zinc-500 hover:text-zinc-300">
              About
            </Link>
            <Link href="/disclaimer" className="text-zinc-500 hover:text-zinc-300">
              Disclaimer
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
