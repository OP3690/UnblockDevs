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
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],

  },
  alternates: {
    canonical: "https://unblockdevs.com/blog/how-to-start-ai-side-hustle-zero-step-by-step",
  },
};

export default function HowToStartAISideHustleZeroBlog() {
  return <BlogPostClient />;
}
