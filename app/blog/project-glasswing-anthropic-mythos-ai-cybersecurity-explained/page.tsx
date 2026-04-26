import type { Metadata } from 'next';
import ProjectGlasswingClient from './client';

export const metadata: Metadata = {
  title: 'Project Glasswing Explained: How Anthropic Is Using Mythos AI to Secure Critical Infrastructure (2026)',
  description:
    'Complete guide to Project Glasswing — Anthropic\'s $100M initiative using Claude Mythos to find and fix zero-day vulnerabilities in critical software. Partners, use cases, findings, and what it means for cybersecurity.',
  keywords: [
    'project glasswing anthropic',
    'what is project glasswing',
    'anthropic glasswing cybersecurity',
    'claude mythos project glasswing',
    'project glasswing partners',
    'mythos ai critical infrastructure security',
    'anthropic zero day vulnerability finder',
    'project glasswing microsoft apple google',
    'glasswing initiative cybersecurity',
    'anthropic 100 million cybersecurity',
    'mythos ai cybersecurity use cases',
    'ai powered vulnerability detection',
    'claude mythos firefox zero day',
    'project glasswing invite only access',
    'anthropic ai security initiative 2026',
  ],
  openGraph: {
    title: 'Project Glasswing: Anthropic\'s $100M Cybersecurity Initiative Explained (2026)',
    description:
      'What is Project Glasswing? How Claude Mythos AI is finding zero-days in Firefox and critical infrastructure — partners, use cases, and findings.',
    type: 'article',
    url: 'https://unblockdevs.com/blog/project-glasswing-anthropic-mythos-ai-cybersecurity-explained',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Project Glasswing Explained' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Project Glasswing: Anthropic\'s $100M AI Cybersecurity Initiative',
    description:
      'Mythos AI + Project Glasswing: 12 tech giants, $100M in credits, and thousands of zero-days found. Full guide.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://unblockdevs.com/blog/project-glasswing-anthropic-mythos-ai-cybersecurity-explained',
  },
};

export default function ProjectGlasswingPage() {
  return <ProjectGlasswingClient />;
}
