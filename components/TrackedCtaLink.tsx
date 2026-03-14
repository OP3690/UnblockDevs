'use client';

import Link from 'next/link';
import { trackCtaClick } from '@/lib/analytics';

type TrackedCtaLinkProps = {
  href: string;
  toolName: string;
  ctaLabel?: string;
  className?: string;
  children: React.ReactNode;
};

/**
 * Link that fires a CTA click event for analytics. Use for "Use the tool →" and other tool page CTAs.
 */
export default function TrackedCtaLink({
  href,
  toolName,
  ctaLabel = 'use_the_tool',
  className,
  children,
}: TrackedCtaLinkProps) {
  return (
    <Link
      href={href}
      className={className}
      onClick={() => trackCtaClick(toolName, ctaLabel)}
    >
      {children}
    </Link>
  );
}
