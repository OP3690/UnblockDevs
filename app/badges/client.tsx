'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Copy, Check, Code, BadgeCheck } from 'lucide-react';
import toast from 'react-hot-toast';

const BADGES = [
  {
    id: 'default',
    name: 'Default',
    preview: (
      <a
        href="https://unblockdevs.com"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 no-underline shadow-sm"
      >
        <BadgeCheck className="w-4 h-4" aria-hidden />
        Powered by UnblockDevs
      </a>
    ),
    html: `<a href="https://unblockdevs.com" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;gap:6px;padding:6px 12px;border-radius:8px;font-size:14px;font-weight:500;color:#fff;background:linear-gradient(to right,#2563eb,#4f46e5);text-decoration:none;box-shadow:0 1px 2px rgba(0,0,0,0.05);">Powered by UnblockDevs</a>`,
    markdown: '[![Powered by UnblockDevs](https://unblockdevs.com/icon.png)](https://unblockdevs.com)',
  },
  {
    id: 'minimal',
    name: 'Minimal',
    preview: (
      <a
        href="https://unblockdevs.com"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 hover:text-gray-800 no-underline border border-gray-200"
      >
        Powered by UnblockDevs
      </a>
    ),
    html: `<a href="https://unblockdevs.com" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;padding:4px 10px;border-radius:4px;font-size:12px;font-weight:500;color:#4b5563;background:#f3f4f6;text-decoration:none;border:1px solid #e5e7eb;">Powered by UnblockDevs</a>`,
    markdown: '[Powered by UnblockDevs](https://unblockdevs.com)',
  },
  {
    id: 'dark',
    name: 'Dark',
    preview: (
      <a
        href="https://unblockdevs.com"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-white bg-gray-800 hover:bg-gray-900 no-underline"
      >
        <BadgeCheck className="w-4 h-4" aria-hidden />
        Powered by UnblockDevs
      </a>
    ),
    html: `<a href="https://unblockdevs.com" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;gap:6px;padding:6px 12px;border-radius:8px;font-size:14px;font-weight:500;color:#fff;background:#1f2937;text-decoration:none;">Powered by UnblockDevs</a>`,
    markdown: '[![Powered by UnblockDevs](https://unblockdevs.com/icon.png)](https://unblockdevs.com)',
  },
];

function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success(`${label} copied`);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium bg-gray-100 hover:bg-gray-200 text-gray-700"
    >
      {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
      {copied ? 'Copied' : 'Copy'}
    </button>
  );
}

export default function BadgesClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-primary-700 bg-primary-50 border-2 border-primary-200 hover:bg-primary-100 hover:border-primary-300 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Tools
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Code className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Developer Tool Badges</h1>
              <p className="text-sm text-gray-500 mt-0.5">Embed a &quot;Powered by UnblockDevs&quot; badge on your site</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p className="text-gray-600 mb-8">
          Show your users where a tool comes from. Copy the HTML or Markdown below and paste it into your README, docs, or footer.
        </p>

        <div className="space-y-8">
          {BADGES.map((badge) => (
            <section
              key={badge.id}
              className="bg-white rounded-xl shadow-lg border border-gray-200 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">{badge.name}</h2>
                <div className="p-2 bg-gray-50 rounded-lg border border-gray-200">
                  {badge.preview}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">HTML</p>
                  <pre className="p-4 bg-gray-900 text-gray-100 rounded-lg text-xs overflow-x-auto">
                    <code>{badge.html}</code>
                  </pre>
                  <div className="mt-2">
                    <CopyButton text={badge.html} label="HTML" />
                  </div>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Markdown (e.g. README)</p>
                  <pre className="p-4 bg-gray-900 text-gray-100 rounded-lg text-xs overflow-x-auto">
                    <code>{badge.markdown}</code>
                  </pre>
                  <div className="mt-2">
                    <CopyButton text={badge.markdown} label="Markdown" />
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>

        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-xl">
          <p className="text-sm text-blue-900">
            <strong>Tip:</strong> The badge links to unblockdevs.com. Use <code className="bg-blue-100 px-1 rounded">target="_blank" rel="noopener noreferrer"</code> so it opens in a new tab. No tracking—just a simple link.
          </p>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/about"
            className="text-blue-600 hover:text-blue-700 font-medium text-sm"
          >
            Learn more about UnblockDevs →
          </Link>
        </div>
      </main>
    </div>
  );
}
