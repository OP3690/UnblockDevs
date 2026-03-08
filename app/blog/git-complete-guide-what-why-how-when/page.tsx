import type { Metadata } from 'next';
import GitCompleteGuideClient from './client';

export const metadata: Metadata = {
  title: 'Git Complete Guide: What, Why, How & When | UnblockDevs',
  description: 'Git version control: what it is, why use it, how it works. Fundamentals, workflow, branching, collaboration. Best practices.',
  keywords: [
    'git guide',
    'git tutorial',
    'what is git',
    'why use git',
    'how git works',
    'when to use git',
    'git version control',
    'git best practices',
    'git workflow',
    'git branching',
    'git collaboration',
    'git fundamentals',
    'git for beginners',
    'git explained',
    'version control system',
    'git commands',
    'git repository',
    'git commit',
    'git branch',
    'git merge',
    'git remote',
    'git clone',
    'git push',
    'git pull',
    'git status',
    'git add',
    'git diff',
    'git log',
    'git stash',
    'git rebase',
    'git workflow best practices',
    'git collaboration workflow',
    'git branching strategy',
    'git commit best practices',
    'git repository management'
  ],
  openGraph: {
    title: 'Git Complete Guide: What, Why, How & When | UnblockDevs',
    description: 'Git version control: what it is, why use it, how it works. Fundamentals, workflow, branching, collaboration. Best practices.',
    type: 'article',
    url: 'https://unblockdevs.com/blog/git-complete-guide-what-why-how-when',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/git-complete-guide-what-why-how-when' },
};

export default function GitCompleteGuide() {
  return <GitCompleteGuideClient />;
}

