'use client';

import { useState } from 'react';
import { Mail, Check, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface NewsletterSignupProps {
  className?: string;
  variant?: 'default' | 'compact' | 'inline';
}

export default function NewsletterSignup({ className = '', variant = 'default' }: NewsletterSignupProps) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

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
      <div className={`bg-blue-50 border border-blue-200 rounded-lg p-4 ${className}`}>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            disabled={loading || subscribed}
            required
          />
          <button
            type="submit"
            disabled={loading || subscribed}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium disabled:opacity-50 flex items-center gap-2"
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

  if (variant === 'inline') {
    return (
      <div className={`${className}`}>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            disabled={loading || subscribed}
            required
          />
          <button
            type="submit"
            disabled={loading || subscribed}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium disabled:opacity-50 flex items-center gap-2"
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
    <div className={`bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 ${className}`}>
      <div className="flex items-start gap-4">
        <div className="bg-blue-600 p-3 rounded-lg">
          <Mail className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900 mb-1">Stay Updated</h3>
          <p className="text-sm text-gray-600 mb-4">
            Get the latest tool updates, new features, and developer tips delivered to your inbox.
          </p>
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading || subscribed}
              required
            />
            <button
              type="submit"
              disabled={loading || subscribed}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 flex items-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Subscribing...</span>
                </>
              ) : subscribed ? (
                <>
                  <Check className="w-5 h-5" />
                  <span>Subscribed!</span>
                </>
              ) : (
                'Subscribe'
              )}
            </button>
          </form>
          <p className="text-xs text-gray-500 mt-2">
            No spam. Unsubscribe anytime. We respect your privacy.
          </p>
        </div>
      </div>
    </div>
  );
}

