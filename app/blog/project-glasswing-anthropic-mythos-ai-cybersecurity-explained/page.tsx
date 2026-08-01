import type { Metadata } from 'next';
import Link from 'next/link';
import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';

export const metadata: Metadata = {
  title: 'Project Glasswing — Anthropic Mythos AI Cybersecurity (2026) | UnblockDevs',
  description:
    'Complete guide to Project Glasswing — Anthropic\'s $100M initiative using Claude Mythos to find and fix zero-day vulnerabilities in critical software. Partners, use cases, findings, and what it means for cybersecurity.',
  keywords: [
    'project glasswing anthropic',
    'what is project glasswing',
    'anthropic glasswing cybersecurity',
    'claude mythos project glasswing',
    'project glasswing partners',
    'mythos ai critical infrastructure security',
    'anthropic zero day vulnerability finder',
    'project glasswing microsoft apple google',
    'glasswing initiative cybersecurity',
    'anthropic 100 million cybersecurity',
    'mythos ai cybersecurity use cases',
    'ai powered vulnerability detection',
    'claude mythos firefox zero day',
    'project glasswing invite only access',
    'anthropic ai security initiative 2026',
  ],
  openGraph: {
    title: 'Project Glasswing: Anthropic\'s $100M Cybersecurity Initiative Explained (2026)',
    description:
      'What is Project Glasswing? How Claude Mythos AI is finding zero-days in Firefox and critical infrastructure — partners, use cases, and findings.',
    type: 'article',
    publishedTime: '2026-04-23T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/project-glasswing-anthropic-mythos-ai-cybersecurity-explained',
    images: [{ url: 'https://unblockdevs.com/api/og?title=Project%20Glasswing%3A%20Anthropic%5C&emoji=%F0%9F%94%92&desc=What%20is%20Project%20Glasswing', width: 1200, height: 630, alt: 'Project Glasswing: Anthropic\ — UnblockDevs Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Project Glasswing: Anthropic\'s $100M AI Cybersecurity Initiative',
    description:
      'Mythos AI + Project Glasswing: 12 tech giants, $100M in credits, and thousands of zero-days found. Full guide.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://unblockdevs.com/blog/project-glasswing-anthropic-mythos-ai-cybersecurity-explained',
  },
};

export default function ProjectGlasswingPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
          <Link href="/blog" className="mb-5 inline-flex items-center gap-1.5 text-[13px] font-medium text-zinc-400 transition-colors hover:text-zinc-900">
            ← Blog
          </Link>
          <h1 className="text-2xl font-bold leading-snug text-zinc-900 sm:text-3xl">
            Project Glasswing — Anthropic Mythos AI Cybersecurity (2026)
          </h1>
          <p className="mt-1.5 text-[14px] text-zinc-500">10 min read · AI &amp; Security</p>
        </div>
      </header>
      <BlogLayoutWithSidebarAds>
        <article>
          <p className="mt-6 text-[15px] leading-relaxed text-zinc-700">
            Project Glasswing is Anthropic&apos;s $100 million cybersecurity initiative that uses Claude Mythos — Anthropic&apos;s most capable AI model — to find and fix zero-day vulnerabilities in critical software infrastructure. In its first seven weeks of operation, Glasswing found over 2,000 zero-day vulnerabilities across Firefox, critical infrastructure software, and partner codebases. Access is invite-only and locked behind a dedicated API endpoint.
          </p>
          <h2 className="mt-8 text-xl font-bold text-zinc-900">What Is Project Glasswing?</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-zinc-700">
            Glasswing is a structured collaboration between Anthropic and major technology companies — including Microsoft, Apple, Google, and 9 others — to use Claude Mythos for automated vulnerability discovery. Anthropic provides $100M in model credits distributed across partners. Each partner runs Mythos against their own codebases in a sandboxed environment, with findings reported through a coordinated disclosure process.
          </p>
          <h2 className="mt-8 text-xl font-bold text-zinc-900">How Claude Mythos Finds Vulnerabilities</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-zinc-700">
            Mythos operates as an autonomous agent: it reads source code, traces execution paths, generates exploit proofs-of-concept, and proposes patches — all without human guidance per vulnerability. Unlike traditional static analysis tools, Mythos can reason about multi-step exploit chains that span multiple files and functions, catching vulnerabilities that rule-based scanners consistently miss.
          </p>
          <h2 className="mt-8 text-xl font-bold text-zinc-900">Results and Scale</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-zinc-700">
            The Firefox zero-day discovered by Glasswing in April 2026 was a memory corruption vulnerability in the JavaScript engine that allowed remote code execution. It had been present in the codebase for over three years. Mythos identified it in under 40 minutes — a task that previously required months of manual security research. The vulnerability was patched within 72 hours of discovery.
          </p>
          <h2 className="mt-8 text-xl font-bold text-zinc-900">What It Means for Developers</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-zinc-700">
            Project Glasswing is the clearest signal yet that frontier AI is moving from code assistant to autonomous security agent. For most development teams, the practical implication is: security vulnerabilities that took months to find manually will be found in minutes by AI — meaning the window between a bug entering the codebase and being exploited is collapsing. Defense-in-depth and schema masking for AI-assisted development are more important than ever.
          </p>
        </article>
      </BlogLayoutWithSidebarAds>
    </div>
  );
}
