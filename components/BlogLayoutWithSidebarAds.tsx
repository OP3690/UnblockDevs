'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Link2, Check } from 'lucide-react';
import AdUnit from '@/components/AdUnit';
import AutoBlogArticleSchema from '@/components/AutoBlogArticleSchema';
import AutoRelatedBlogPosts from '@/components/AutoRelatedBlogPosts';

function ShareBar() {
  const [url, setUrl] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  const encodedUrl = encodeURIComponent(url);
  const title = encodeURIComponent(typeof document !== 'undefined' ? document.title : '');

  function copyLink() {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-zinc-100 pt-6 px-4 sm:px-6 lg:px-8">
      <span className="text-[12px] font-semibold uppercase tracking-wide text-zinc-400">Share</span>

      {/* WhatsApp */}
      <a
        href={`https://wa.me/?text=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on WhatsApp"
        className="inline-flex items-center gap-1.5 rounded-lg bg-[#25D366] px-3 py-1.5 text-[12.5px] font-semibold text-white transition-opacity hover:opacity-80"
      >
        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        WhatsApp
      </a>

      {/* X / Twitter */}
      <a
        href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${title}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on X"
        className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-900 px-3 py-1.5 text-[12.5px] font-semibold text-white transition-opacity hover:opacity-80"
      >
        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.91-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
        X
      </a>

      {/* LinkedIn */}
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on LinkedIn"
        className="inline-flex items-center gap-1.5 rounded-lg bg-[#0A66C2] px-3 py-1.5 text-[12.5px] font-semibold text-white transition-opacity hover:opacity-80"
      >
        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
        LinkedIn
      </a>

      {/* Copy link */}
      <button
        onClick={copyLink}
        aria-label="Copy link"
        className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-[12.5px] font-medium text-zinc-600 shadow-sm transition-colors hover:border-zinc-300 hover:bg-zinc-50"
      >
        {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Link2 className="h-3.5 w-3.5" />}
        {copied ? 'Copied!' : 'Copy link'}
      </button>
    </div>
  );
}

/** AdSense slot IDs (Ads → By ad unit). Env vars override for different environments. */
const SLOT_INARTICLE =
  typeof process.env.NEXT_PUBLIC_ADSENSE_SLOT_BLOG_INARTICLE === 'string' && process.env.NEXT_PUBLIC_ADSENSE_SLOT_BLOG_INARTICLE
    ? process.env.NEXT_PUBLIC_ADSENSE_SLOT_BLOG_INARTICLE
    : '6611398233';
const SLOT_FOOTER =
  typeof process.env.NEXT_PUBLIC_ADSENSE_SLOT_BLOG_FOOTER === 'string' && process.env.NEXT_PUBLIC_ADSENSE_SLOT_BLOG_FOOTER
    ? process.env.NEXT_PUBLIC_ADSENSE_SLOT_BLOG_FOOTER
    : '4987800735';
interface BlogLayoutWithSidebarAdsProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

/**
 * Shared article layout for every blog post.
 * Content-first: article renders before any ads.
 * Sticky sidebar ad on xl+ screens.
 */
export default function BlogLayoutWithSidebarAds({ children }: BlogLayoutWithSidebarAdsProps) {
  return (
    <div className="w-full py-6 sm:py-10">
      <AutoBlogArticleSchema />

      {/* Nav buttons */}
      <div className="mb-6 flex flex-wrap items-center gap-2 px-4 sm:px-6 lg:px-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-900 px-3 py-1.5 text-[12.5px] font-semibold text-white shadow-sm transition-colors hover:bg-zinc-700"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Blog
        </Link>
        <Link
          href="/tools/json"
          className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-[12.5px] font-medium text-zinc-600 shadow-sm transition-colors hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-900"
        >
          All Tools
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Article body — content first, no ads blocking */}
      <div className="blog-article-body px-4 sm:px-6 lg:px-8">
        {children}
      </div>

      {/* Share bar */}
      <ShareBar />

      {/* In-article ad — after content */}
      <div
        role="region"
        aria-label="Advertisement"
        className="mt-10 overflow-hidden rounded-xl px-4 sm:px-6 lg:px-8"
      >
        <AdUnit slot={SLOT_INARTICLE} format="fluid" layout="in-article" className="rounded-xl overflow-hidden" />
      </div>

      {/* Related posts */}
      <div className="mt-12 px-4 sm:px-6 lg:px-8">
        <AutoRelatedBlogPosts />
      </div>

      {/* Footer ad */}
      <div
        role="region"
        aria-label="Advertisement"
        className="mt-10 overflow-hidden rounded-xl bg-zinc-50 px-4 sm:px-6 lg:px-8"
      >
        <AdUnit slot={SLOT_FOOTER} format="autorelaxed" className="rounded-xl overflow-hidden" />
      </div>
    </div>
  );
}
