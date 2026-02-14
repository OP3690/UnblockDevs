import type { Metadata } from 'next';
import BlogPostClient from './client';

export const metadata: Metadata = {
  title: "How to Create and Sell AI Digital Products (Templates, Prompts & Tools) | UnblockDevs",
  description: "Create and sell AI digital products: prompt packs, AI-generated ebooks, Notion templates with AI workflows, micro SaaS ideas. Step-by-step with flow and examples.",
  keywords: [
    "sell AI digital products",
    "selling prompt packs",
    "AI generated ebooks",
    "Notion templates AI",
    "micro SaaS AI",
    "AI templates prompts tools",
  ],
  openGraph: {
    title: "How to Create and Sell AI Digital Products (Templates, Prompts & Tools)",
    description: "Prompt packs, AI ebooks, Notion templates with AI, micro SaaS. Step-by-step.",
    type: "article",
  },
  alternates: {
    canonical: "https://unblockdevs.com/blog/how-to-create-sell-ai-digital-products-templates-prompts-tools",
  },
};

export default function CreateSellAIDigitalProductsBlog() {
  return <BlogPostClient />;
}
