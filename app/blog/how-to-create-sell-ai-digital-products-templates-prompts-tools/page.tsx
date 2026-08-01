import type { Metadata } from 'next';
import BlogPostClient from './client';

export const metadata: Metadata = {
  title: "Create and Sell AI Digital Products | UnblockDevs",
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
    title: "Create and Sell AI Digital Products | UnblockDevs",
    description: "Prompt packs, AI ebooks, Notion templates with AI, micro SaaS. Step-by-step.",
    type: "article",    url: 'https://unblockdevs.com/blog/how-to-create-sell-ai-digital-products-templates-prompts-tools',
    images: [{ url: 'https://unblockdevs.com/api/og?title=Create%20and%20Sell%20AI%20Digital%20Products&emoji=%F0%9F%A4%96&desc=Prompt%20packs%2C%20AI%20ebooks%2C%20Notion%20templates%20with%20AI%2C%20micro%20SaaS', width: 1200, height: 630, alt: 'Create and Sell AI Digital Products — UnblockDevs Blog' }],

  },
  twitter: {
    card: 'summary_large_image',
    title: 'Create and Sell AI Digital Products | UnblockDevs',
    description: 'Prompt packs, AI ebooks, Notion templates with AI, micro SaaS. Step-by-step.',
  },
  alternates: {
    canonical: "https://unblockdevs.com/blog/how-to-create-sell-ai-digital-products-templates-prompts-tools",
  },
};

export default function CreateSellAIDigitalProductsBlog() {
  return <BlogPostClient />;
}
