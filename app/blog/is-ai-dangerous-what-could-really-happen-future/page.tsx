import type { Metadata } from 'next';
import BlogPostClient from './client';

export const metadata: Metadata = {
  title: "Is AI Dangerous? What Could Really Happen in the Future | UnblockDevs",
  description: "Is AI dangerous? AI risks (misinformation, deepfakes), AI myths vs reality, regulation and control, and should we be worried? Honest guide with examples.",
  keywords: [
    "is AI dangerous",
    "AI risks",
    "AI misinformation",
    "deepfakes AI",
    "AI myths vs reality",
    "AI regulation",
    "AI safety",
    "should we fear AI",
    "AI future risks",
    "AI control",
    "AI ethics",
    "AI dangers",
  ],
  openGraph: {
    title: "Is AI Dangerous? What Could Really Happen in the Future",
    description: "AI risks (misinformation, deepfakes), myths vs reality, regulation, and should we be worried?",
    type: "article",    url: 'https://unblockdevs.com/blog/is-ai-dangerous-what-could-really-happen-future',
    images: [{ url: 'https://unblockdevs.com/api/og?title=Is%20AI%20Dangerous%3F%20What%20Could%20Really%20Happen%20in%20the%20Future&emoji=%F0%9F%A4%96&desc=AI%20risks%20%28misinformation%2C%20deepfakes%29%2C%20myths%20vs%20reality%2C%20regulation%2C%20and%20should', width: 1200, height: 630, alt: 'Is AI Dangerous? What Could Really Happen in the Future — UnblockDevs Blog' }],

  },
  alternates: {
    canonical: "https://unblockdevs.com/blog/is-ai-dangerous-what-could-really-happen-future",
  },
};

export default function IsAIDangerousBlog() {
  return <BlogPostClient />;
}
