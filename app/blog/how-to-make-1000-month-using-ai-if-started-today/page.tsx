import type { Metadata } from 'next';
import BlogPostClient from './client';

export const metadata: Metadata = {
  title: "Make $1,000/Month Using AI | UnblockDevs",
  description: "Step-by-step plan to make $1,000/month with AI: pick niche, use AI to produce X, monetize through Y, plus timeline breakdown. Realistic plan with flow.",
  keywords: [
    "make $1000 month AI",
    "make 1000 month with AI",
    "AI income 1000",
    "AI side income plan",
    "AI monetization plan",
    "how to make money AI step by step",
    "AI niche monetization",
    "AI income timeline",
  ],
  openGraph: {
    title: "How I Would Make $1,000/Month Using AI (If I Started Today)",
    description: "Pick niche, use AI to produce X, monetize through Y, timeline breakdown. Realistic plan.",
    type: "article",    url: 'https://unblockdevs.com/blog/how-to-make-1000-month-using-ai-if-started-today',
    images: [{ url: 'https://unblockdevs.com/api/og?title=How%20I%20Would%20Make%20%241%2C000/Month%20Using%20AI%20%28If%20I%20Started%20Today%29&emoji=%F0%9F%A4%96&desc=Pick%20niche%2C%20use%20AI%20to%20produce%20X%2C%20monetize%20through%20Y%2C%20timeline%20breakdown', width: 1200, height: 630, alt: 'How I Would Make $1,000/Month Using AI (If I Started Today) — UnblockDevs Blog' }],

  },
  twitter: {
    card: 'summary_large_image',
    title: 'How I Would Make $1,000/Month Using AI (If I Started Today)',
    description: 'Pick niche, use AI to produce X, monetize through Y, timeline breakdown. Realistic plan.',
  },
  alternates: {
    canonical: "https://unblockdevs.com/blog/how-to-make-1000-month-using-ai-if-started-today",
  },
  robots: { index: false, follow: false },
};

export default function HowToMake1000MonthAIBlog() {
  return <BlogPostClient />;
}
