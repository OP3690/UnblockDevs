import type { Metadata } from 'next';
import GitCommandsCheatSheetClient from './client';

export const metadata: Metadata = {
  title: 'Git Commands Cheat Sheet: Most Useful Commands, Tips & Tricks | UnblockDevs',
  description: 'Complete Git commands cheat sheet with most useful commands, tips, tricks, and shortcuts. Learn essential Git commands for daily development, advanced techniques, and productivity hacks for Git workflows.',
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
};

export default function GitCommandsCheatSheet() {
  return <GitCommandsCheatSheetClient />;
}

