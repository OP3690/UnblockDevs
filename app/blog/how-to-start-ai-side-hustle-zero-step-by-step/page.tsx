import type { Metadata } from 'next';
import BlogPostClient from './client';

export const metadata: Metadata = {
  title: "Start an AI Side Hustle with $0 | UnblockDevs",
  description: "Start an AI side hustle with zero budget: free AI tools, how to find clients, how to price services, and realistic income expectations. Step-by-step guide with flow.",
  keywords: [
    "AI side hustle $0",
    "start AI side hustle",
    "free AI tools",
    "how to find AI clients",
    "how to price AI services",
    "AI side hustle income",
    "AI freelancing no budget",
    "AI side hustle step by step",
    "make money AI free tools",
  ],
  openGraph: {
    title: "How to Start an AI Side Hustle with $0 (Step-by-Step Guide)",
    description: "Free AI tools, how to find clients, how to price services, realistic income. Step-by-step.",
    type: "article",    url: 'https://unblockdevs.com/blog/how-to-start-ai-side-hustle-zero-step-by-step',
    images: [{ url: 'https://unblockdevs.com/api/og?title=How%20to%20Start%20an%20AI%20Side%20Hustle%20with%20%240%20%28Step-by-Step%20Guide%29&emoji=%F0%9F%A4%96&desc=Free%20AI%20tools%2C%20how%20to%20find%20clients%2C%20how%20to%20price%20services%2C%20realistic%20income', width: 1200, height: 630, alt: 'How to Start an AI Side Hustle with $0 (Step-by-Step Guide) — UnblockDevs Blog' }],

  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Start an AI Side Hustle with $0 (Step-by-Step Guide)',
    description: 'Free AI tools, how to find clients, how to price services, realistic income. Step-by-step.',
  },
  alternates: {
    canonical: "https://unblockdevs.com/blog/how-to-start-ai-side-hustle-zero-step-by-step",
  },
};

export default function HowToStartAISideHustleZeroBlog() {
  return <BlogPostClient />;
}
