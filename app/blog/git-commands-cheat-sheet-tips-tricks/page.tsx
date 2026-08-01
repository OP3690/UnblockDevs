import type { Metadata } from 'next';
import GitCommandsCheatSheetClient from './client';

export const metadata: Metadata = {
  title: 'Git Commands Cheat Sheet | UnblockDevs',
  description: 'Git commands cheat sheet: useful commands, tips, tricks. Essential Git for daily dev and productivity.',
  keywords: [
    'git commands',
    'git cheat sheet',
    'git commands list',
    'git tips and tricks',
    'git shortcuts',
    'git commands reference',
    'most useful git commands',
    'git commands for beginners',
    'git advanced commands',
    'git productivity',
    'git workflow commands',
    'git branch commands',
    'git commit commands',
    'git merge commands',
    'git rebase commands',
    'git stash commands',
    'git log commands',
    'git diff commands',
    'git remote commands',
    'git push commands',
    'git pull commands',
    'git reset commands',
    'git revert commands',
    'git cherry-pick',
    'git aliases',
    'git hooks',
    'git troubleshooting',
    'git best practices commands',
    'git daily commands',
    'git essential commands'
  ],
  openGraph: {
    title: 'Git Commands Cheat Sheet: Most Useful Commands, Tips & Tricks | UnblockDevs',
    description: 'Git commands cheat sheet: useful commands, tips, tricks. Essential Git for daily dev and productivity.',
    type: 'article',
    publishedTime: '2026-02-01T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/git-commands-cheat-sheet-tips-tricks',
    images: [{ url: 'https://unblockdevs.com/api/og?title=Git%20Commands%20Cheat%20Sheet%3A%20Most%20Useful%20Commands%2C%20Tips%20%26%20Tricks&emoji=%F0%9F%93%96&desc=Git%20commands%20cheat%20sheet%3A%20useful%20commands%2C%20tips%2C%20tricks', width: 1200, height: 630, alt: 'Git Commands Cheat Sheet: Most Useful Commands, Tips & Tricks — UnblockDevs Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Git Commands Cheat Sheet: Most Useful Commands, Tips & Tricks | UnblockDevs',
    description: 'Git commands cheat sheet: useful commands, tips, tricks. Essential Git for daily dev and productivity.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/git-commands-cheat-sheet-tips-tricks' },
};

export default function GitCommandsCheatSheet() {
  return <GitCommandsCheatSheetClient />;
}

