'use client';

import { useState, useEffect } from 'react';
import { MessageCircle, Linkedin, Twitter, Facebook, Send, Copy, Check, Share2 } from 'lucide-react';

// Custom Reddit Icon SVG
const RedditIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
  </svg>
);

// Custom Telegram Icon SVG
const TelegramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.197l-1.84 8.678c-.135.604-.48.752-.978.465l-2.707-1.995-1.307 1.257c-.15.15-.277.277-.568.277l.202-2.87 5.023-4.54c.22-.196-.048-.305-.342-.11l-6.203 3.907-2.67-.838c-.58-.182-.595-.58.135-.88l10.44-4.02c.483-.18.906.112.75.78z"/>
  </svg>
);
import { toast } from 'react-hot-toast';

interface BlogSocialShareProps {
  title: string;
  url?: string;
  description?: string;
  variant?: 'floating' | 'full';
}

export default function BlogSocialShare({ title, url, description, variant = 'full' }: BlogSocialShareProps) {
  const [copied, setCopied] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const shareUrl = typeof window !== 'undefined' ? (url || window.location.href) : url || '';
  const shareText = description || title;

  // Show floating bar after scrolling
  useEffect(() => {
    if (variant === 'floating') {
      const handleScroll = () => {
        setIsVisible(window.scrollY > 200);
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    } else {
      setIsVisible(true);
    }
  }, [variant]);

  const shareToWhatsApp = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${title} ${shareUrl}`)}`;
    window.open(whatsappUrl, '_blank');
  };

  const shareToLinkedIn = () => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
    window.open(linkedInUrl, '_blank', 'width=550,height=420');
  };

  const shareToX = () => {
    const xUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`;
    window.open(xUrl, '_blank', 'width=550,height=420');
  };

  const shareToFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(facebookUrl, '_blank', 'width=550,height=420');
  };

  const shareToReddit = () => {
    const redditUrl = `https://reddit.com/submit?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(title)}`;
    window.open(redditUrl, '_blank', 'width=550,height=420');
  };

  const shareToTelegram = () => {
    const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`;
    window.open(telegramUrl, '_blank');
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success('Link copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy link');
    }
  };

  // Floating bar variant (top) - LinkedIn, WhatsApp, X
  if (variant === 'floating') {
    return (
      <div
        className={`fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-lg transition-all duration-300 ${
          isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">Share:</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Mobile-first: WhatsApp + Copy Link first */}
              <button
                onClick={shareToWhatsApp}
                className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-[#25D366] text-white rounded-lg hover:bg-[#20BA5A] transition-colors text-sm font-medium shadow-sm"
                aria-label="Share on WhatsApp"
              >
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">WhatsApp</span>
              </button>
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium shadow-sm"
                aria-label="Copy link"
              >
                {copied ? <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" /> : <Copy className="w-4 h-4 sm:w-5 sm:h-5" />}
                <span className="hidden sm:inline">{copied ? 'Copied!' : 'Copy'}</span>
              </button>
              {/* Desktop: LinkedIn, X */}
              <button
                onClick={shareToLinkedIn}
                className="hidden md:flex items-center gap-2 px-4 py-2 bg-[#0077B5] text-white rounded-lg hover:bg-[#006399] transition-colors text-sm font-medium shadow-sm"
                aria-label="Share on LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn</span>
              </button>
              <button
                onClick={shareToX}
                className="hidden md:flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium shadow-sm"
                aria-label="Share on X (Twitter)"
              >
                <Twitter className="w-4 h-4" />
                <span>X</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Full variant (end of article) - All 7 options
  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6 sm:p-8 border border-gray-200 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Share2 className="w-5 h-5 text-gray-700" />
        <h3 className="text-lg font-bold text-gray-900">Share this article</h3>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
        {/* Mobile-first: WhatsApp + Copy Link first */}
        <button
          onClick={shareToWhatsApp}
          className="flex flex-col items-center gap-2 p-4 bg-[#25D366] text-white rounded-lg hover:bg-[#20BA5A] transition-all hover:scale-105 shadow-md"
          aria-label="Share on WhatsApp"
        >
          <MessageCircle className="w-6 h-6" />
          <span className="text-xs font-medium">WhatsApp</span>
        </button>
        <button
          onClick={copyToClipboard}
          className="flex flex-col items-center gap-2 p-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all hover:scale-105 shadow-md"
          aria-label="Copy link"
        >
          {copied ? <Check className="w-6 h-6 text-green-600" /> : <Copy className="w-6 h-6" />}
          <span className="text-xs font-medium">{copied ? 'Copied!' : 'Copy Link'}</span>
        </button>
        <button
          onClick={shareToLinkedIn}
          className="flex flex-col items-center gap-2 p-4 bg-[#0077B5] text-white rounded-lg hover:bg-[#006399] transition-all hover:scale-105 shadow-md"
          aria-label="Share on LinkedIn"
        >
          <Linkedin className="w-6 h-6" />
          <span className="text-xs font-medium">LinkedIn</span>
        </button>
        <button
          onClick={shareToX}
          className="flex flex-col items-center gap-2 p-4 bg-black text-white rounded-lg hover:bg-gray-800 transition-all hover:scale-105 shadow-md"
          aria-label="Share on X (Twitter)"
        >
          <Twitter className="w-6 h-6" />
          <span className="text-xs font-medium">X</span>
        </button>
        <button
          onClick={shareToFacebook}
          className="flex flex-col items-center gap-2 p-4 bg-[#1877F2] text-white rounded-lg hover:bg-[#166FE5] transition-all hover:scale-105 shadow-md"
          aria-label="Share on Facebook"
        >
          <Facebook className="w-6 h-6" />
          <span className="text-xs font-medium">Facebook</span>
        </button>
        <button
          onClick={shareToReddit}
          className="flex flex-col items-center gap-2 p-4 bg-[#FF4500] text-white rounded-lg hover:bg-[#E03D00] transition-all hover:scale-105 shadow-md"
          aria-label="Share on Reddit"
        >
          <RedditIcon className="w-6 h-6" />
          <span className="text-xs font-medium">Reddit</span>
        </button>
        <button
          onClick={shareToTelegram}
          className="flex flex-col items-center gap-2 p-4 bg-[#0088CC] text-white rounded-lg hover:bg-[#0077B5] transition-all hover:scale-105 shadow-md"
          aria-label="Share on Telegram"
        >
          <TelegramIcon className="w-6 h-6" />
          <span className="text-xs font-medium">Telegram</span>
        </button>
      </div>
    </div>
  );
}
