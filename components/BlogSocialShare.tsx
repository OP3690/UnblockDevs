'use client';

import { useState, useEffect } from 'react';
import { Check, Share2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

// Real SVG Icons
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className={className}>
    <path fill="#25D366" d="M16 2C8.3 2 2 8.3 2 16c0 2.8.8 5.4 2.3 7.7L2 30l6.5-2.1C10.7 29.3 13.3 30 16 30c7.7 0 14-6.3 14-14S23.7 2 16 2z"/>
    <path fill="#fff" d="M12.5 9.5c-.3-.6-.6-.6-.9-.6h-.7c-.3 0-.7.1-1 .4-.3.3-1.3 1.3-1.3 3.2s1.4 3.7 1.6 3.9c.2.3 2.7 4.3 6.6 5.9 3.2 1.3 3.9 1 4.6.9.7-.1 2.3-.9 2.6-1.8.3-.9.3-1.6.2-1.8-.1-.2-.3-.3-.7-.5l-2.3-1.1c-.3-.1-.6-.2-.8.2-.2.3-.9 1.1-1.1 1.3-.2.2-.4.3-.8.1-.4-.2-1.6-.6-3.1-1.9-1.1-1-1.9-2.3-2.1-2.7-.2-.4 0-.6.2-.8.2-.2.4-.4.6-.6.2-.2.3-.4.4-.6.1-.2 0-.4-.1-.6l-.9-2.3z"/>
  </svg>
);

const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className}>
    <path fill="#0A66C2" d="M22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0z"/>
    <path fill="#fff" d="M3.56 9h3.56v12H3.56zM5.34 3.5c1.14 0 2.06.93 2.06 2.07 0 1.14-.92 2.06-2.06 2.06A2.06 2.06 0 013.28 5.57c0-1.14.92-2.07 2.06-2.07zM10.69 9h3.41v1.64h.05c.47-.9 1.63-1.85 3.35-1.85 3.58 0 4.24 2.36 4.24 5.43V21h-3.56v-6.08c0-1.45-.03-3.32-2.02-3.32-2.02 0-2.33 1.58-2.33 3.21V21h-3.56z"/>
  </svg>
);

const XIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className}>
    <path fill="currentColor" d="M18.3 2H21l-6.6 7.6L22 22h-6.2l-4.8-6.1L5.4 22H2.7l7-8.1L2 2h6.3l4.3 5.5L18.3 2z"/>
  </svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className}>
    <path fill="#1877F2" d="M24 12c0-6.6-5.4-12-12-12S0 5.4 0 12c0 6 4.4 10.9 10.1 11.8v-8.3H7.1V12h3V9.4c0-3 1.8-4.7 4.6-4.7 1.3 0 2.6.2 2.6.2v2.9h-1.5c-1.5 0-2 .9-2 1.9V12h3.4l-.5 3.5h-2.9v8.3C19.6 22.9 24 18 24 12z"/>
  </svg>
);

const RedditIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className}>
    <path fill="#FF4500" d="M24 12c0 6.6-5.4 12-12 12S0 18.6 0 12 5.4 0 12 0s12 5.4 12 12z"/>
    <circle cx="8.5" cy="12" r="1.5" fill="#fff"/>
    <circle cx="15.5" cy="12" r="1.5" fill="#fff"/>
    <path fill="#fff" d="M7 14c1.5 1.5 8.5 1.5 10 0"/>
  </svg>
);

const TelegramIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className}>
    <path fill="#229ED9" d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0z"/>
    <path fill="#fff" d="M17.4 7.2L6.9 11.5c-.7.3-.7.7-.1.9l2.7.8 1 3.1c.1.4.3.4.6.2l1.6-1.2 2.7 2c.5.3.8.2.9-.4l1.8-8.5c.1-.6-.2-.8-.7-.6z"/>
  </svg>
);

const CopyLinkIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className}>
    <path fill="currentColor" d="M10 13a5 5 0 007.07 0l2.83-2.83a5 5 0 00-7.07-7.07L11 4.93"/>
    <path fill="currentColor" d="M14 11a5 5 0 00-7.07 0L4.1 13.83a5 5 0 007.07 7.07L13 19.07"/>
  </svg>
);

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
                className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-[#25D366] text-white rounded-lg hover:bg-[#20BA5A] transition-all hover:scale-105 text-sm font-medium shadow-sm"
                aria-label="Share on WhatsApp"
              >
                <WhatsAppIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">WhatsApp</span>
              </button>
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all hover:scale-105 text-sm font-medium shadow-sm"
                aria-label="Copy link"
              >
                {copied ? <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" /> : <CopyLinkIcon className="w-4 h-4 sm:w-5 sm:h-5" />}
                <span className="hidden sm:inline">{copied ? 'Copied!' : 'Copy'}</span>
              </button>
              {/* Desktop: LinkedIn, X */}
              <button
                onClick={shareToLinkedIn}
                className="hidden md:flex items-center gap-2 px-4 py-2 bg-[#0077B5] text-white rounded-lg hover:bg-[#006399] transition-all hover:scale-105 text-sm font-medium shadow-sm"
                aria-label="Share on LinkedIn"
              >
                <LinkedInIcon className="w-4 h-4" />
                <span>LinkedIn</span>
              </button>
              <button
                onClick={shareToX}
                className="hidden md:flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-all hover:scale-105 text-sm font-medium shadow-sm"
                aria-label="Share on X (Twitter)"
              >
                <XIcon className="w-4 h-4" />
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
          className="flex flex-col items-center gap-2 p-4 bg-[#25D366] text-white rounded-lg hover:bg-[#20BA5A] transition-all hover:scale-110 shadow-md"
          aria-label="Share on WhatsApp"
        >
          <WhatsAppIcon className="w-6 h-6" />
          <span className="text-xs font-medium">WhatsApp</span>
        </button>
        <button
          onClick={copyToClipboard}
          className="flex flex-col items-center gap-2 p-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all hover:scale-110 shadow-md"
          aria-label="Copy link"
        >
          {copied ? <Check className="w-6 h-6 text-green-600" /> : <CopyLinkIcon className="w-6 h-6" />}
          <span className="text-xs font-medium">{copied ? 'Copied!' : 'Copy Link'}</span>
        </button>
        <button
          onClick={shareToLinkedIn}
          className="flex flex-col items-center gap-2 p-4 bg-[#0077B5] text-white rounded-lg hover:bg-[#006399] transition-all hover:scale-110 shadow-md"
          aria-label="Share on LinkedIn"
        >
          <LinkedInIcon className="w-6 h-6" />
          <span className="text-xs font-medium">LinkedIn</span>
        </button>
        <button
          onClick={shareToX}
          className="flex flex-col items-center gap-2 p-4 bg-black text-white rounded-lg hover:bg-gray-800 transition-all hover:scale-110 shadow-md"
          aria-label="Share on X (Twitter)"
        >
          <XIcon className="w-6 h-6" />
          <span className="text-xs font-medium">X</span>
        </button>
        <button
          onClick={shareToFacebook}
          className="flex flex-col items-center gap-2 p-4 bg-[#1877F2] text-white rounded-lg hover:bg-[#166FE5] transition-all hover:scale-110 shadow-md"
          aria-label="Share on Facebook"
        >
          <FacebookIcon className="w-6 h-6" />
          <span className="text-xs font-medium">Facebook</span>
        </button>
        <button
          onClick={shareToReddit}
          className="flex flex-col items-center gap-2 p-4 bg-[#FF4500] text-white rounded-lg hover:bg-[#E03D00] transition-all hover:scale-110 shadow-md"
          aria-label="Share on Reddit"
        >
          <RedditIcon className="w-6 h-6" />
          <span className="text-xs font-medium">Reddit</span>
        </button>
        <button
          onClick={shareToTelegram}
          className="flex flex-col items-center gap-2 p-4 bg-[#0088CC] text-white rounded-lg hover:bg-[#0077B5] transition-all hover:scale-110 shadow-md"
          aria-label="Share on Telegram"
        >
          <TelegramIcon className="w-6 h-6" />
          <span className="text-xs font-medium">Telegram</span>
        </button>
      </div>
    </div>
  );
}
