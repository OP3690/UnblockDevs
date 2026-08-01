import type { Metadata } from 'next';
import BlogPostClient from './client';

export const metadata: Metadata = {
  title: "How Students Can Make Money Using AI in 2026 | UnblockDevs",
  description: "How students can make money with AI in 2026: AI assignment help, AI freelancing, selling AI notes, YouTube shorts with AI, building small AI tools. Step-by-step with flow and examples.",
  keywords: [
    "students make money AI 2026",
    "AI assignment help",
    "AI freelancing students",
    "selling notes AI",
    "YouTube shorts AI",
    "building AI tools students",
    "student side hustle AI",
    "make money as student AI",
  ],
  openGraph: {
    title: "How Students Can Make Money Using AI in 2026",
    description: "AI assignment help, freelancing, selling notes, YouTube shorts, small AI tools. Step-by-step.",
    type: "article",    url: 'https://unblockdevs.com/blog/how-students-can-make-money-using-ai-2026',
    images: [{ url: 'https://unblockdevs.com/api/og?title=How%20Students%20Can%20Make%20Money%20Using%20AI%20in%202026&emoji=%F0%9F%A4%96&desc=AI%20assignment%20help%2C%20freelancing%2C%20selling%20notes%2C%20YouTube%20shorts%2C%20small%20AI%20tools', width: 1200, height: 630, alt: 'How Students Can Make Money Using AI in 2026 — UnblockDevs Blog' }],

  },
  twitter: {
    card: 'summary_large_image',
    title: 'How Students Can Make Money Using AI in 2026',
    description: 'AI assignment help, freelancing, selling notes, YouTube shorts, small AI tools. Step-by-step.',
  },
  alternates: {
    canonical: "https://unblockdevs.com/blog/how-students-can-make-money-using-ai-2026",
  },
  robots: { index: false, follow: false },
};

export default function HowStudentsMakeMoneyAIBlog() {
  return <BlogPostClient />;
}
