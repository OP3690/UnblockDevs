'use client';

import Link from 'next/link';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

/**
 * Simple breadcrumb navigation for SEO and UX (Home > Tools > JSON > [Tool]).
 * Use semantic nav and aria-label for accessibility.
 */
export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="mb-4 text-sm text-zinc-600" aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1" itemScope itemType="https://schema.org/BreadcrumbList">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1" itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
            {i > 0 && <span aria-hidden="true" className="text-zinc-400">/</span>}
            {item.href ? (
              <Link
                href={item.href}
                className="relative z-[1] touch-manipulation text-emerald-800 hover:text-emerald-950 hover:underline"
                itemProp="item"
              >
                <span itemProp="name">{item.label}</span>
              </Link>
            ) : (
              <span className="font-medium text-zinc-900" itemProp="name">{item.label}</span>
            )}
            <meta itemProp="position" content={String(i + 1)} />
          </li>
        ))}
      </ol>
    </nav>
  );
}
