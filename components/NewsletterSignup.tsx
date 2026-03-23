'use client';

import { useState, useEffect } from 'react';
import { Mail, Check, Loader2, Inbox } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface NewsletterSignupProps {
  className?: string;
  variant?: 'default' | 'compact' | 'inline' | 'embedded';
}

export default function NewsletterSignup({ className = '', variant = 'default' }: NewsletterSignupProps) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  /** Embedded only: paint trust card after mount so SSR + first client pass match (avoids HMR/stale-chunk hydration mismatches). */
  const [trustCardReady, setTrustCardReady] = useState(false);
  useEffect(() => {
    setTrustCardReady(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }

    setLoading(true);
    
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to subscribe');
      }

      setSubscribed(true);
      setEmail('');
      
      if (data.alreadySubscribed) {
        toast.success('You are already subscribed!');
      } else if (data.resubscribed) {
        toast.success('Successfully resubscribed!');
      } else {
        toast.success('Successfully subscribed!');
      }
      
      // Reset after 3 seconds
      setTimeout(() => setSubscribed(false), 3000);
    } catch (error: any) {
      toast.error(error.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (variant === 'compact') {
    return (
      <div className={`rounded-lg border border-zinc-200 bg-zinc-50 p-4 ${className}`}>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            className="flex-1 rounded-lg border border-zinc-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
            disabled={loading || subscribed}
            required
          />
          <button
            type="submit"
            disabled={loading || subscribed}
            className="flex items-center gap-2 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : subscribed ? (
              <Check className="w-4 h-4" />
            ) : (
              'Subscribe'
            )}
          </button>
        </form>
      </div>
    );
  }

  if (variant === 'embedded') {
    const perks = [
      'Product updates & new tools',
      'JSON, API & developer tips',
      'Unsubscribe anytime — no hassle',
    ];

    /* Split card: form rhythm mirrors FeedbackForm (labeled row → two-up row → textarea → full-width CTA → shared-style footer). */
    return (
      <div className={`flex h-full min-h-0 flex-col ${className}`}>
        <div className="mb-5 flex items-start gap-4">
          <div className="shrink-0 rounded-lg bg-emerald-700 p-3 shadow-sm ring-1 ring-emerald-600/20">
            <Mail className="h-6 w-6 text-white" aria-hidden />
          </div>
          <div className="min-w-0 flex-1 pt-0.5">
            <h3 className="text-lg font-bold tracking-tight text-zinc-900">Stay Updated</h3>
            <p className="mt-1 text-sm leading-relaxed text-zinc-600">
              Get the latest tool updates, new features, and developer tips delivered to your inbox.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-0 lg:min-h-0 lg:flex-1">
          <div className="space-y-4 lg:min-h-0 lg:flex-1">
            <div>
              <label htmlFor="home-newsletter-email" className="mb-1 block text-sm font-medium text-zinc-700">
                Email address
              </label>
              <input
                id="home-newsletter-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                aria-label="Email address"
                className="w-full rounded-lg border border-zinc-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                disabled={loading || subscribed}
                required
              />
            </div>

            {trustCardReady ? (
              <div
                className="rounded-xl border border-zinc-200/90 bg-white p-4 shadow-sm ring-1 ring-zinc-900/[0.03]"
                role="region"
                aria-label="What we send in our newsletter"
              >
                <div className="flex items-center gap-2 border-b border-zinc-100 pb-2.5">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-800">
                    <Inbox className="h-4 w-4" aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold leading-tight text-zinc-900">What we send</p>
                    <p className="mt-0.5 text-[11px] leading-snug text-zinc-500">Low volume, high signal</p>
                  </div>
                </div>
                <ul className="mt-3 space-y-2 text-xs leading-relaxed text-zinc-600">
                  <li className="flex gap-2">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" aria-hidden />
                    <span>Only when there&apos;s something useful — new tools, tips, or changelog-style updates.</span>
                  </li>
                  <li className="flex gap-2">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" aria-hidden />
                    <span>No filler digests or sales blasts.</span>
                  </li>
                </ul>
              </div>
            ) : (
              <div
                className="min-h-[132px] rounded-xl border border-zinc-200/90 bg-zinc-50/80 shadow-sm ring-1 ring-zinc-900/[0.03] animate-pulse"
                aria-hidden
              />
            )}
          </div>

          <div className="shrink-0 pt-4">
            <button
              type="submit"
              disabled={loading || subscribed}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-zinc-900 px-6 py-3 font-medium text-white transition-colors hover:bg-zinc-800 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Subscribing…</span>
                </>
              ) : subscribed ? (
                <>
                  <Check className="h-5 w-5" />
                  <span>Thank you!</span>
                </>
              ) : (
                <>
                  <Mail className="h-5 w-5" aria-hidden />
                  <span>Subscribe</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* One footer card: same emerald treatment as feedback encourage panel + contact */}
        <div className="mt-auto shrink-0 border-t border-zinc-200 pt-5">
          <div className="rounded-xl border border-emerald-200/80 bg-gradient-to-br from-emerald-50/90 to-zinc-50/80 p-4 text-center sm:text-left lg:min-h-[20rem] lg:flex lg:flex-col">
            <div className="mb-2 inline-flex items-center gap-2 text-emerald-800">
              <Check className="h-4 w-4 shrink-0" aria-hidden />
              <span className="text-xs font-semibold uppercase tracking-wide">What you&apos;ll get</span>
            </div>
            <ul className="mt-3 space-y-1.5 text-left text-sm leading-relaxed text-zinc-700">
              {perks.map((line) => (
                <li key={line} className="flex gap-2">
                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" aria-hidden />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 border-t border-emerald-200/60 pt-4 lg:mt-auto">
              <h4 className="text-sm font-semibold text-zinc-900">Get in touch</h4>
              <p className="mt-1 text-xs leading-relaxed text-zinc-600">
                Feature ideas, bugs, or a quick thanks — we read every message.
              </p>
              <div className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-white/90 px-3 py-2 text-sm text-emerald-800 ring-1 ring-zinc-200/80 sm:w-auto sm:justify-start">
                <Mail className="h-4 w-4 shrink-0" aria-hidden />
                <a href="mailto:support@unblockdevs.com" className="font-semibold hover:text-emerald-950 hover:underline">
                  support@unblockdevs.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'inline') {
    return (
      <div className={`${className}`}>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 rounded-lg border border-zinc-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
            disabled={loading || subscribed}
            required
          />
          <button
            type="submit"
            disabled={loading || subscribed}
            className="flex items-center gap-2 rounded-lg bg-zinc-900 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Subscribing...</span>
              </>
            ) : subscribed ? (
              <>
                <Check className="w-4 h-4" />
                <span>Subscribed!</span>
              </>
            ) : (
              'Subscribe'
            )}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className={`flex min-h-0 flex-col rounded-xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8 ${className}`}>
      <div className="mb-5 flex items-start gap-4">
        <div className="shrink-0 rounded-lg bg-emerald-700 p-3 shadow-sm ring-1 ring-emerald-600/20">
          <Mail className="h-6 w-6 text-white" aria-hidden />
        </div>
        <div className="min-w-0 flex-1 pt-0.5">
          <h3 className="text-lg font-bold tracking-tight text-zinc-900">Stay Updated</h3>
          <p className="mt-1 text-sm leading-relaxed text-zinc-600">
            Get the latest tool updates, new features, and developer tips delivered to your inbox.
          </p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row sm:gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address"
          className="min-h-[44px] w-full min-w-0 flex-1 rounded-lg border border-zinc-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-600 sm:min-w-[12rem]"
          disabled={loading || subscribed}
          required
        />
        <button
          type="submit"
          disabled={loading || subscribed}
          className="inline-flex min-h-[44px] w-full shrink-0 items-center justify-center gap-2 rounded-lg bg-zinc-900 px-6 py-2.5 font-medium text-white transition-colors hover:bg-zinc-800 disabled:opacity-50 sm:w-auto"
        >
          {loading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Subscribing…</span>
            </>
          ) : subscribed ? (
            <>
              <Check className="h-5 w-5" />
              <span>Subscribed!</span>
            </>
          ) : (
            'Subscribe'
          )}
        </button>
      </form>
      <p className="mt-3 text-xs text-zinc-500">
        Occasional useful updates only. Unsubscribe in one click — we never sell your email.
      </p>
    </div>
  );
}

