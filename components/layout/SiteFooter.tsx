import Link from 'next/link';

/**
 * Global dark footer — privacy-first redesign (matches static mockup).
 */
export default function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-zinc-800 bg-zinc-950 text-zinc-400">
      <div className="mx-auto max-w-[1100px] px-6 py-12 sm:py-14">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-3 flex items-center gap-2 text-white">
              <span className="flex h-[26px] w-[26px] items-center justify-center rounded bg-white font-mono text-[11px] font-bold text-zinc-900">
                U
              </span>
              <span className="text-[15px] font-semibold">UnblockDevs</span>
            </div>
            <p className="mb-4 max-w-[240px] text-[13px] leading-relaxed text-zinc-500">
              Free, privacy-first developer tools. Everything runs in your browser. No account, no data collection on your
              payloads.
            </p>
            <div className="flex flex-wrap gap-1.5">
              {['Next.js', 'TypeScript', '100% Client-side'].map((b) => (
                <span
                  key={b}
                  className="rounded border border-zinc-700 bg-zinc-900 px-2 py-0.5 font-mono text-[10px] text-zinc-500"
                >
                  {b}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-3 text-[13px] font-semibold text-white">AI safety</p>
            <ul className="flex flex-col gap-2 text-[13px]">
              <li>
                <Link href="/ai-schema-masker" className="text-zinc-500 transition-colors hover:text-zinc-200">
                  AI Schema Masker
                </Link>
              </li>
              <li>
                <Link href="/json-prompt-shield" className="text-zinc-500 transition-colors hover:text-zinc-200">
                  JSON Prompt Shield
                </Link>
              </li>
              <li>
                <Link href="/code-prompt-shield" className="text-zinc-500 transition-colors hover:text-zinc-200">
                  Code Prompt Shield
                </Link>
              </li>
              <li>
                <Link href="/log-unpacker" className="text-zinc-500 transition-colors hover:text-zinc-200">
                  Log Unpacker
                </Link>
              </li>
              <li>
                <Link href="/prompt-chunker" className="text-zinc-500 transition-colors hover:text-zinc-200">
                  Prompt Chunker
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="mb-3 text-[13px] font-semibold text-white">Developer tools</p>
            <ul className="flex flex-col gap-2 text-[13px]">
              <li>
                <Link href="/json-beautifier" className="text-zinc-500 transition-colors hover:text-zinc-200">
                  JSON Beautifier
                </Link>
              </li>
              <li>
                <Link href="/jwt-decoder" className="text-zinc-500 transition-colors hover:text-zinc-200">
                  JWT Decoder
                </Link>
              </li>
              <li>
                <Link href="/cors-tester" className="text-zinc-500 transition-colors hover:text-zinc-200">
                  CORS Tester
                </Link>
              </li>
              <li>
                <Link href="/regex-tester" className="text-zinc-500 transition-colors hover:text-zinc-200">
                  Regex Tester
                </Link>
              </li>
              <li>
                <Link href="/hash-generator" className="text-zinc-500 transition-colors hover:text-zinc-200">
                  Hash Generator
                </Link>
              </li>
              <li>
                <Link href="/base64-encoder" className="text-zinc-500 transition-colors hover:text-zinc-200">
                  Base64 Encoder
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="mb-3 text-[13px] font-semibold text-white">Company</p>
            <ul className="flex flex-col gap-2 text-[13px]">
              <li>
                <Link href="/blog" className="text-zinc-500 transition-colors hover:text-zinc-200">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-zinc-500 transition-colors hover:text-zinc-200">
                  About
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-zinc-500 transition-colors hover:text-zinc-200">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-zinc-500 transition-colors hover:text-zinc-200">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/speed-test" className="text-zinc-500 transition-colors hover:text-zinc-200">
                  Speed Test
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-zinc-500 transition-colors hover:text-zinc-200">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-zinc-800 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-zinc-600">© {new Date().getFullYear()} UnblockDevs. All tools are free.</p>
          <div className="flex flex-wrap gap-5 text-xs">
            <Link href="/privacy-policy" className="text-zinc-500 hover:text-zinc-300">
              Privacy
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
