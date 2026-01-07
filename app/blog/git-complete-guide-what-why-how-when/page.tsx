import type { Metadata } from 'next';
import GitCompleteGuideClient from './client';

export const metadata: Metadata = {
  title: 'Git Complete Guide: What, Why, How & When with Best Practices | UnblockDevs',
  description: 'Complete guide to Git version control: what is Git, why use it, how it works, when to use it, and best practices. Learn Git fundamentals, workflow, branching strategies, and collaboration techniques for developers.',
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
};

export default function GitCompleteGuide() {
  return <GitCompleteGuideClient />;
}

