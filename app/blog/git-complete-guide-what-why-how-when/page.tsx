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
    publishedTime: '2026-02-01T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/git-complete-guide-what-why-how-when',
    images: [{ url: 'https://unblockdevs.com/api/og?title=Git%20Complete%20Guide%3A%20What%2C%20Why%2C%20How%20%26%20When&emoji=%F0%9F%93%96&desc=Git%20version%20control%3A%20what%20it%20is%2C%20why%20use%20it%2C%20how%20it%20works', width: 1200, height: 630, alt: 'Git Complete Guide: What, Why, How & When — UnblockDevs Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Git Complete Guide: What, Why, How & When | UnblockDevs',
    description: 'Git version control: what it is, why use it, how it works. Fundamentals, workflow, branching, collaboration. Best practices.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/git-complete-guide-what-why-how-when' },
};

export default function GitCompleteGuide() {
  return <GitCompleteGuideClient />;
}

