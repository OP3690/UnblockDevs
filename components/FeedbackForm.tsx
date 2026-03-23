'use client';

import { useState } from 'react';
import { MessageSquare, Send, Loader2, Check, Sparkles } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface FeedbackFormProps {
  toolName?: string;
  className?: string;
  variant?: 'default' | 'compact' | 'embedded';
}

export default function FeedbackForm({ toolName, className = '', variant = 'default' }: FeedbackFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    type: 'feedback' as 'feedback' | 'bug' | 'feature'
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.message.trim()) {
      toast.error('Please enter your feedback');
      return;
    }

    setLoading(true);
    
    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          toolName: toolName || 'General',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit feedback');
      }
      
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '', type: 'feedback' });
      toast.success('Thank you for your feedback!');
      
      setTimeout(() => {
        setSubmitted(false);
        setIsOpen(false);
      }, 2000);
    } catch (error: any) {
      toast.error(error.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (variant === 'compact') {
    if (!isOpen) {
      return (
        <button
          onClick={() => setIsOpen(true)}
          className={`flex items-center gap-2 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 ${className}`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Feedback</span>
        </button>
      );
    }

    return (
      <div className={`rounded-lg border border-zinc-200 bg-white p-4 shadow-lg ${className}`}>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label htmlFor="feedback-type-compact" className="sr-only">
              Feedback type
            </label>
            <select
              id="feedback-type-compact"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
              aria-label="Feedback type"
            >
              <option value="feedback">General Feedback</option>
              <option value="bug">Report a Bug</option>
              <option value="feature">Feature Request</option>
            </select>
          </div>
          <textarea
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder="Your feedback..."
            rows={3}
            className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
            required
          />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="flex-1 rounded-lg border border-zinc-300 px-4 py-2 text-sm transition-colors hover:bg-zinc-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || submitted}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : submitted ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Sent!</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    );
  }

  const headerBlock = (
    <div className="mb-5 flex items-start gap-4">
      <div className="shrink-0 rounded-lg bg-emerald-700 p-3 shadow-sm ring-1 ring-emerald-600/20">
        <MessageSquare className="h-6 w-6 text-white" aria-hidden />
      </div>
      <div className="min-w-0 flex-1 pt-0.5">
        <h3 className="text-lg font-bold tracking-tight text-zinc-900">
          {toolName ? `Feedback for ${toolName}` : 'Share Your Feedback'}
        </h3>
        <p className="mt-1 text-sm leading-relaxed text-zinc-600">
          Tell us what&apos;s working, what&apos;s broken, or what you wish we built next — it directly shapes our roadmap.
        </p>
      </div>
    </div>
  );

  const formFieldsOnly = (
    <>
      <div>
        <label htmlFor="feedback-type" className="mb-1 block text-sm font-medium text-zinc-700">
          Type
        </label>
        <select
          id="feedback-type"
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
          className="w-full rounded-lg border border-zinc-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600"
          aria-label="Feedback type"
        >
          <option value="feedback">General Feedback</option>
          <option value="bug">Report a Bug</option>
          <option value="feature">Feature Request</option>
        </select>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Your name (optional)"
          className="rounded-lg border border-zinc-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600"
        />
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="Your email (optional)"
          className="rounded-lg border border-zinc-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600"
        />
      </div>

      <textarea
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        placeholder="Your feedback, bug report, or feature request..."
        rows={4}
        className="w-full rounded-lg border border-zinc-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600"
        required
      />
    </>
  );

  const submitButton = (
    <button
      type="submit"
      disabled={loading || submitted}
      className="flex w-full shrink-0 items-center justify-center gap-2 rounded-lg bg-zinc-900 px-6 py-3 font-medium text-white transition-colors hover:bg-zinc-800 disabled:opacity-50"
    >
      {loading ? (
        <>
          <Loader2 className="h-5 w-5 animate-spin" />
          <span>Sending...</span>
        </>
      ) : submitted ? (
        <>
          <Check className="h-5 w-5" />
          <span>Thank you!</span>
        </>
      ) : (
        <>
          <Send className="h-5 w-5" aria-hidden />
          <span>Send Feedback</span>
        </>
      )}
    </button>
  );

  const formBlock = (
    <form onSubmit={handleSubmit} className="space-y-4">
      {formFieldsOnly}
      {submitButton}
    </form>
  );

  const encourageShell = (splitCardAlign: boolean) => (
    <div
      className={`rounded-xl border border-emerald-200/80 bg-gradient-to-br from-emerald-50/90 to-zinc-50/80 p-4 text-center sm:text-left ${
        splitCardAlign ? 'lg:min-h-[20rem] lg:flex lg:flex-col' : ''
      }`}
    >
      <div className="mb-2 inline-flex items-center gap-2 text-emerald-800">
        <Sparkles className="h-4 w-4 shrink-0" aria-hidden />
        <span className="text-xs font-semibold uppercase tracking-wide">You make the difference</span>
      </div>
      <p className="text-sm font-medium leading-snug text-zinc-900">
        Good feedback is gold — a rough edge you hit today could be smoother for everyone tomorrow.
      </p>
      <ul className="mt-3 space-y-1.5 text-left text-xs leading-relaxed text-zinc-600">
        <li className="flex gap-2">
          <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" aria-hidden />
          <span>Feature ideas often jump the queue when lots of you ask.</span>
        </li>
        <li className="flex gap-2">
          <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" aria-hidden />
          <span>Bug reports with steps get fixed faster — paste URLs or examples if you can.</span>
        </li>
        <li className="flex gap-2">
          <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" aria-hidden />
          <span>Name and email are optional; we won&apos;t use them for anything except replying if needed.</span>
        </li>
      </ul>
    </div>
  );

  const encouragePanel = encourageShell(false);

  /* Split-card: flex-1 form body + shared footer min-height so Send Feedback & Subscribe align across columns. */
  const footerBlock = (
    <div className="mt-auto shrink-0 border-t border-zinc-200 pt-5">{encourageShell(true)}</div>
  );

  if (variant === 'embedded') {
    return (
      <div className={`flex h-full min-h-0 flex-col ${className}`}>
        {headerBlock}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-0 lg:min-h-0 lg:flex-1"
        >
          <div className="space-y-4 lg:min-h-0 lg:flex-1">{formFieldsOnly}</div>
          <div className="shrink-0 pt-4">{submitButton}</div>
        </form>
        {footerBlock}
      </div>
    );
  }

  return (
    <div className={`flex min-h-0 flex-col rounded-xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8 ${className}`}>
      {headerBlock}
      {formBlock}
      <div className="mt-6 border-t border-zinc-200 pt-6">{encouragePanel}</div>
    </div>
  );
}

