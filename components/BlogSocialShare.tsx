'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

// Clean, Symmetric SVG Icons
const ShareIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="18" cy="5" r="3"/>
    <circle cx="6" cy="12" r="3"/>
    <circle cx="18" cy="19" r="3"/>
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
  </svg>
);

const CheckIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className}>
    <circle cx="12" cy="12" r="10" fill="#25D366"/>
    <circle cx="9" cy="10" r="1" fill="#fff"/>
    <circle cx="15" cy="10" r="1" fill="#fff"/>
    <path d="M8 14c1 1.5 4 1.5 8 0" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
  </svg>
);

const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className}>
    <rect width="24" height="24" rx="4" fill="#0A66C2"/>
    <circle cx="7.5" cy="7.5" r="1.5" fill="#fff"/>
    <rect x="6" y="10" width="3" height="8" fill="#fff"/>
    <path fill="#fff" d="M11.5 10c-1.5 0-2.5 1-2.5 2.5v5.5h3v-5.5c0-1.5-1-2.5-2.5-2.5h-1v-3h1z"/>
    <rect x="13.5" y="10" width="3" height="8" fill="#fff"/>
  </svg>
);

const XIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className}>
    <path fill="currentColor" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className}>
    <circle cx="12" cy="12" r="10" fill="#1877F2"/>
    <path fill="#fff" d="M13 8h2v-2h-2c-1.5 0-2.5 1-2.5 2.5v1h-2v2h2v5h2.5v-5h2l.5-2h-2.5v-1c0-.3.2-.5.5-.5z"/>
  </svg>
);

const RedditIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className}>
    <circle cx="12" cy="12" r="10" fill="#FF4500"/>
    <circle cx="9" cy="11" r="1.5" fill="#fff"/>
    <circle cx="15" cy="11" r="1.5" fill="#fff"/>
    <path d="M8 14c1.5 1.5 8 1.5 8 0" stroke="#fff" strokeWidth="2" strokeLinecap="round" fill="none"/>
  </svg>
);

const TelegramIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className}>
    <circle cx="12" cy="12" r="10" fill="#229ED9"/>
    <path fill="#fff" d="M17.5 7.5l-9 3.5 2 2 5-3 3 2.5-1 1-4-2.5-2.5 2-1 5.5-2.5-1z"/>
  </svg>
);

const CopyLinkIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
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
              <ShareIcon className="w-4 h-4" />
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
                {copied ? <CheckIcon className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" /> : <CopyLinkIcon className="w-4 h-4 sm:w-5 sm:h-5" />}
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
        <ShareIcon className="w-5 h-5 text-gray-700" />
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
          {copied ? <CheckIcon className="w-6 h-6 text-green-600" /> : <CopyLinkIcon className="w-6 h-6" />}
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
