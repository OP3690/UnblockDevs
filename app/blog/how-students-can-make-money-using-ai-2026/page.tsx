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
    type: "article",
  },
  alternates: {
    canonical: "https://unblockdevs.com/blog/how-students-can-make-money-using-ai-2026",
  },
};

export default function HowStudentsMakeMoneyAIBlog() {
  return <BlogPostClient />;
}
