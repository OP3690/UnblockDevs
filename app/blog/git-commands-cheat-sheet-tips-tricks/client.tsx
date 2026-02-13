'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Calendar, Clock, ArrowLeft, Copy, Check, GitBranch, GitCommit, GitMerge, GitPullRequest, Zap, Search, AlertTriangle, Info, Terminal, BookOpen, Lightbulb } from 'lucide-react';
import toast from 'react-hot-toast';
import FAQSchema from '@/components/FAQSchema';
import BlogSocialShare from '@/components/BlogSocialShare';

export default function GitCommandsCheatSheetClient() {
  const [copied, setCopied] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopied(null), 2000);
  };

  const faqData = [
    {
      question: 'What are the most essential Git commands?',
      answer: 'The most essential Git commands are: git clone (get a repository), git add (stage changes), git commit (save changes), git push (upload to remote), git pull (download from remote), git status (check status), git branch (manage branches), and git log (view history). These cover 90% of daily Git usage.'
    },
    {
      question: 'How do I undo a Git commit?',
      answer: 'To undo the last commit but keep changes: git reset --soft HEAD~1. To undo and discard changes: git reset --hard HEAD~1. To undo a commit that\'s already pushed: git revert HEAD (creates a new commit that undoes the changes). Never use reset on commits that are already pushed to shared branches.'
    },
    {
      question: 'What is the difference between git pull and git fetch?',
      answer: 'git fetch downloads changes from remote but doesn\'t merge them into your working directory. git pull is equivalent to git fetch followed by git merge. Use git fetch when you want to see what changed before merging, and git pull when you want to immediately update your branch.'
    },
    {
      question: 'How do I create a Git alias?',
      answer: 'Create Git aliases using: git config --global alias.st status (creates "st" as alias for "status"). You can also edit ~/.gitconfig directly. Popular aliases include: git config --global alias.co checkout, git config --global alias.br branch, git config --global alias.ci commit.'
    },
    {
      question: 'What is git stash and when should I use it?',
      answer: 'git stash temporarily saves uncommitted changes so you can switch branches or pull updates. Use git stash to save changes, git stash pop to restore them, and git stash list to see all stashes. Perfect for when you need to switch branches but aren\'t ready to commit.'
    },
    {
      question: 'How do I resolve merge conflicts?',
      answer: 'When conflicts occur: 1) Open conflicted files and look for conflict markers (<<<<<<, ======, >>>>>>), 2) Edit files to resolve conflicts, 3) Stage resolved files with git add, 4) Complete merge with git commit. Use git merge --abort to cancel the merge if needed.'
    },
    {
      question: 'What is the difference between git merge and git rebase?',
      answer: 'git merge creates a merge commit combining two branches, preserving the complete history. git rebase replays commits from one branch onto another, creating a linear history. Use merge for shared branches and rebase for cleaning up local commits before pushing.'
    },
    {
      question: 'How do I see what changed in a commit?',
      answer: 'Use git show <commit-hash> to see changes in a specific commit, git diff to see unstaged changes, git diff --staged to see staged changes, and git log -p to see commit history with diffs. git diff HEAD shows all changes since last commit.'
    }
  ];

  const essentialCommands = [
    {
      category: 'Repository Setup',
      commands: [
        { cmd: 'git init', desc: 'Initialize a new Git repository', tip: 'Creates a .git directory in current folder' },
        { cmd: 'git clone <url>', desc: 'Clone a remote repository', tip: 'Downloads entire repository with history' },
        { cmd: 'git remote add origin <url>', desc: 'Add remote repository', tip: 'Links local repo to remote (GitHub, GitLab)' },
        { cmd: 'git remote -v', desc: 'List remote repositories', tip: 'Shows all configured remotes' },
      ]
    },
    {
      category: 'Basic Workflow',
      commands: [
        { cmd: 'git status', desc: 'Check repository status', tip: 'Shows modified, staged, and untracked files' },
        { cmd: 'git add <file>', desc: 'Stage a file for commit', tip: 'Add specific file to staging area' },
        { cmd: 'git add .', desc: 'Stage all changes', tip: 'Stages all modified and new files' },
        { cmd: 'git commit -m "message"', desc: 'Create a commit', tip: 'Saves staged changes with a message' },
        { cmd: 'git push origin <branch>', desc: 'Upload commits to remote', tip: 'Pushes local commits to remote branch' },
        { cmd: 'git pull origin <branch>', desc: 'Download and merge changes', tip: 'Fetches and merges remote changes' },
      ]
    },
    {
      category: 'Branching',
      commands: [
        { cmd: 'git branch', desc: 'List all branches', tip: 'Shows local branches (* = current branch)' },
        { cmd: 'git branch <name>', desc: 'Create a new branch', tip: 'Creates branch but doesn\'t switch to it' },
        { cmd: 'git checkout <branch>', desc: 'Switch to a branch', tip: 'Changes working directory to specified branch' },
        { cmd: 'git checkout -b <name>', desc: 'Create and switch to branch', tip: 'Combines branch creation and checkout' },
        { cmd: 'git branch -d <branch>', desc: 'Delete a branch', tip: 'Deletes branch (only if merged)' },
        { cmd: 'git branch -D <branch>', desc: 'Force delete branch', tip: 'Deletes branch even if not merged' },
        { cmd: 'git merge <branch>', desc: 'Merge branch into current', tip: 'Combines changes from another branch' },
      ]
    },
    {
      category: 'Viewing History',
      commands: [
        { cmd: 'git log', desc: 'View commit history', tip: 'Shows commits in reverse chronological order' },
        { cmd: 'git log --oneline', desc: 'Compact commit history', tip: 'One line per commit' },
        { cmd: 'git log --graph', desc: 'Visual branch history', tip: 'Shows branch structure graphically' },
        { cmd: 'git log --all --graph --oneline', desc: 'Complete visual history', tip: 'Best view of all branches' },
        { cmd: 'git show <commit>', desc: 'Show commit details', tip: 'Displays commit message and changes' },
        { cmd: 'git diff', desc: 'Show unstaged changes', tip: 'Compares working directory with staging area' },
        { cmd: 'git diff --staged', desc: 'Show staged changes', tip: 'Compares staging area with last commit' },
        { cmd: 'git diff HEAD', desc: 'Show all changes', tip: 'All changes since last commit' },
      ]
    },
    {
      category: 'Undoing Changes',
      commands: [
        { cmd: 'git restore <file>', desc: 'Discard file changes', tip: 'Reverts file to last committed state' },
        { cmd: 'git restore --staged <file>', desc: 'Unstage a file', tip: 'Removes file from staging area' },
        { cmd: 'git reset --soft HEAD~1', desc: 'Undo last commit (keep changes)', tip: 'Removes commit, keeps changes staged' },
        { cmd: 'git reset --hard HEAD~1', desc: 'Undo last commit (discard changes)', tip: 'Removes commit and all changes' },
        { cmd: 'git revert <commit>', desc: 'Create undo commit', tip: 'Safe way to undo pushed commits' },
        { cmd: 'git clean -fd', desc: 'Remove untracked files', tip: 'Deletes untracked files and directories' },
      ]
    },
    {
      category: 'Stashing',
      commands: [
        { cmd: 'git stash', desc: 'Save changes temporarily', tip: 'Stashes uncommitted changes' },
        { cmd: 'git stash save "message"', desc: 'Stash with message', tip: 'Adds description to stash' },
        { cmd: 'git stash list', desc: 'List all stashes', tip: 'Shows all saved stashes' },
        { cmd: 'git stash pop', desc: 'Apply and remove stash', tip: 'Restores most recent stash' },
        { cmd: 'git stash apply', desc: 'Apply stash (keep it)', tip: 'Restores stash but keeps it in list' },
        { cmd: 'git stash drop', desc: 'Delete a stash', tip: 'Removes stash from list' },
        { cmd: 'git stash clear', desc: 'Delete all stashes', tip: 'Removes all saved stashes' },
      ]
    },
    {
      category: 'Remote Operations',
      commands: [
        { cmd: 'git fetch', desc: 'Download changes (no merge)', tip: 'Updates remote tracking branches' },
        { cmd: 'git fetch origin', desc: 'Fetch from specific remote', tip: 'Downloads from origin remote' },
        { cmd: 'git pull --rebase', desc: 'Pull with rebase', tip: 'Rebases local commits on top of remote' },
        { cmd: 'git push -u origin <branch>', desc: 'Push and set upstream', tip: 'Sets tracking branch for future pulls' },
        { cmd: 'git push --force', desc: 'Force push (dangerous)', tip: 'Overwrites remote (use with caution!)' },
        { cmd: 'git remote show origin', desc: 'Show remote details', tip: 'Displays remote repository information' },
      ]
    },
    {
      category: 'Advanced',
      commands: [
        { cmd: 'git rebase <branch>', desc: 'Rebase current branch', tip: 'Replays commits on top of another branch' },
        { cmd: 'git rebase -i HEAD~3', desc: 'Interactive rebase', tip: 'Edit, reorder, or squash commits' },
        { cmd: 'git cherry-pick <commit>', desc: 'Apply specific commit', tip: 'Copies commit from another branch' },
        { cmd: 'git reflog', desc: 'View reference log', tip: 'Shows all HEAD movements (recovery tool)' },
        { cmd: 'git bisect', desc: 'Binary search for bugs', tip: 'Finds commit that introduced a bug' },
        { cmd: 'git blame <file>', desc: 'Show file line authors', tip: 'Shows who last modified each line' },
      ]
    }
  ];

  const tipsAndTricks = [
    {
      title: 'Useful Git Aliases',
      content: `Create shortcuts for common commands:
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.unstage 'reset HEAD --'
git config --global alias.last 'log -1 HEAD'
git config --global alias.visual '!gitk'`,
      category: 'Productivity'
    },
    {
      title: 'Pretty Git Log',
      content: `Create a beautiful, compact log view:
git config --global alias.lg "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit --all"

Then use: git lg`,
      category: 'Productivity'
    },
    {
      title: 'Quick Commit All',
      content: `Stage and commit all changes in one command:
git add -A && git commit -m "message"

Or create an alias:
git config --global alias.ac '!git add -A && git commit'`,
      category: 'Productivity'
    },
    {
      title: 'Find Lost Commits',
      content: `If you accidentally deleted a branch or reset, use reflog to find it:
git reflog
git checkout <commit-hash>

Reflog keeps history of all HEAD movements for 90 days.`,
      category: 'Recovery'
    },
    {
      title: 'Amend Last Commit',
      content: `Add changes to the last commit:
git add <file>
git commit --amend --no-edit

Or change the commit message:
git commit --amend -m "New message"`,
      category: 'Workflow'
    },
    {
      title: 'Stash with Untracked Files',
      content: `By default, stash only saves tracked files. Include untracked:
git stash -u

Or include ignored files too:
git stash -a`,
      category: 'Stashing'
    },
    {
      title: 'View Changes in Last Commit',
      content: `See what changed in the most recent commit:
git show HEAD

Or just the files:
git show --name-only HEAD

Or with stats:
git show --stat HEAD`,
      category: 'Viewing'
    },
    {
      title: 'Find When a Bug Was Introduced',
      content: `Use git bisect to find the problematic commit:
git bisect start
git bisect bad          # Current commit is bad
git bisect good <hash>   # This commit was good
# Git checks out middle commit
# Test and mark as good or bad
git bisect good/bad
# Repeat until found
git bisect reset`,
      category: 'Debugging'
    },
    {
      title: 'Clean Up Merged Branches',
      content: `Delete all branches that have been merged:
git branch --merged | grep -v "\\*\\|main\\|master" | xargs -n 1 git branch -d

Or for remote branches:
git branch -r --merged | grep -v "main\\|master" | sed 's/origin\\///' | xargs -n 1 git push origin --delete`,
      category: 'Maintenance'
    },
    {
      title: 'Interactive Rebase to Clean History',
      content: `Squash multiple commits into one:
git rebase -i HEAD~3

In the editor, change 'pick' to 'squash' for commits you want to combine.

Or reword commit messages:
Change 'pick' to 'reword' for commits to edit.`,
      category: 'History'
    },
    {
      title: 'See What Changed Between Branches',
      content: `Compare two branches:
git diff branch1..branch2

Or see commits in one but not the other:
git log branch1..branch2

Or see files that differ:
git diff --name-only branch1..branch2`,
      category: 'Comparison'
    },
    {
      title: 'Partial File Staging',
      content: `Stage only parts of a file:
git add -p <file>

Git will show each change and ask:
y - stage this hunk
n - don't stage this hunk
s - split into smaller hunks
e - manually edit the hunk`,
      category: 'Staging'
    },
    {
      title: 'Create Empty Commit',
      content: `Sometimes you need an empty commit (e.g., to trigger CI):
git commit --allow-empty -m "Trigger CI build"

Useful for CI/CD pipelines that trigger on commits.`,
      category: 'CI/CD'
    },
    {
      title: 'Find Large Files in History',
      content: `Find files taking up space in your repository:
git rev-list --objects --all | git cat-file --batch-check='%(objecttype) %(objectname) %(objectsize) %(rest)' | awk '/^blob/ {print substr($0,6)}' | sort --numeric-sort --key=2 | tail -10

This shows the 10 largest files in your Git history.`,
      category: 'Optimization'
    },
    {
      title: 'Quick Branch from Remote',
      content: `Create a local branch tracking a remote branch:
git checkout -b local-branch origin/remote-branch

Or if branch names match:
git checkout remote-branch

Git automatically sets up tracking.`,
      category: 'Branching'
    }
  ];

  const filteredCommands = essentialCommands.map(category => ({
    ...category,
    commands: category.commands.filter(cmd => 
      cmd.cmd.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cmd.desc.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.commands.length > 0);

  const filteredTips = tipsAndTricks.filter(tip =>
    tip.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tip.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tip.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <article className="max-w-5xl mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Developer Study Materials</span>
          </Link>
          
          <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              February 1, 2026
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              20 min read
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Git Commands Cheat Sheet: Most Useful Commands, Tips & Tricks
          </h1>
          
          <p className="text-xl text-gray-600 leading-relaxed">
            Master Git with this comprehensive cheat sheet. Learn the most useful Git commands, productivity tips, 
            advanced tricks, and shortcuts that will make you a Git power user. Perfect reference for daily development.
          </p>
        </div>

        {/* Search */}
        <div className="mb-8 bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search commands, tips, or categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Table of Contents */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-3">Quick Navigation</h2>
          <ul className="space-y-2 text-sm">
            <li><a href="#essential-commands" className="text-blue-600 hover:underline">Essential Commands</a></li>
            <li><a href="#tips-tricks" className="text-blue-600 hover:underline">Tips & Tricks</a></li>
            <li><a href="#productivity" className="text-blue-600 hover:underline">Productivity Hacks</a></li>
            <li><a href="#troubleshooting" className="text-blue-600 hover:underline">Troubleshooting</a></li>
          </ul>
        </div>

        {/* Essential Commands */}
        <section id="essential-commands" className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Terminal className="w-8 h-8 text-blue-600" />
            Essential Git Commands
          </h2>

          <div className="space-y-8">
            {filteredCommands.map((category, catIndex) => (
              <div key={catIndex} className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4">
                  <h3 className="text-xl font-bold">{category.category}</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {category.commands.map((command, cmdIndex) => (
                      <div key={cmdIndex} className="border-b border-gray-100 last:border-b-0 pb-4 last:pb-0">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <code className="bg-gray-100 px-3 py-1.5 rounded text-sm font-mono text-gray-900">
                                {command.cmd}
                              </code>
                              <button
                                onClick={() => copyToClipboard(command.cmd, `cmd-${catIndex}-${cmdIndex}`)}
                                className="p-1.5 bg-gray-200 hover:bg-gray-300 rounded transition-colors"
                                title="Copy command"
                              >
                                {copied === `cmd-${catIndex}-${cmdIndex}` ? (
                                  <Check className="w-4 h-4 text-green-600" />
                                ) : (
                                  <Copy className="w-4 h-4" />
                                )}
                              </button>
                            </div>
                            <p className="text-gray-700 text-sm mt-2">{command.desc}</p>
                          </div>
                        </div>
                        <div className="mt-2 flex items-start gap-2">
                          <Info className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                          <p className="text-xs text-gray-600 italic">{command.tip}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tips & Tricks */}
        <section id="tips-tricks" className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Lightbulb className="w-8 h-8 text-yellow-600" />
            Tips & Tricks
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {filteredTips.map((tip, index) => (
              <div key={index} className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">{tip.title}</h3>
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                    {tip.category}
                  </span>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 mb-3">
                  <pre className="text-xs text-gray-800 whitespace-pre-wrap font-mono overflow-x-auto">
                    {tip.content}
                  </pre>
                </div>
                <button
                  onClick={() => copyToClipboard(tip.content, `tip-${index}`)}
                  className="w-full px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  {copied === `tip-${index}` ? (
                    <>
                      <Check className="w-4 h-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy Commands
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Productivity Section */}
        <section id="productivity" className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Zap className="w-8 h-8 text-yellow-600" />
            Productivity Hacks
          </h2>

          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-8 rounded-lg border border-yellow-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Create Your Custom Git Aliases</h3>
            <p className="text-gray-700 mb-6">
              Speed up your workflow with custom aliases. Add these to your <code className="bg-white px-2 py-1 rounded">~/.gitconfig</code>:
            </p>
            
            <div className="bg-white rounded-lg p-6 border border-gray-200 mb-4">
              <pre className="text-sm text-gray-800 overflow-x-auto">
{`[alias]
  # Shortcuts
  st = status
  co = checkout
  br = branch
  ci = commit
  
  # Useful combinations
  unstage = reset HEAD --
  last = log -1 HEAD
  visual = !gitk
  lg = log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit --all
  
  # Workflow helpers
  ac = !git add -A && git commit
  save = !git add -A && git commit -m 'SAVEPOINT'
  undo = reset HEAD~1 --mixed
  amend = commit --amend --no-edit
  
  # Branch management
  bclean = "!f() { git branch --merged \${1-master} | grep -v " \${1-master}$" | xargs git branch -d; }; f"
  bdone = "!f() { git checkout \${1-master} && git up && git bclean \${1-master}; }; f"`}
              </pre>
              <button
                onClick={() => copyToClipboard(`[alias]\n  st = status\n  co = checkout\n  br = branch\n  ci = commit\n  unstage = reset HEAD --\n  last = log -1 HEAD\n  visual = !gitk\n  lg = log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit --all\n  ac = !git add -A && git commit\n  save = !git add -A && git commit -m 'SAVEPOINT'\n  undo = reset HEAD~1 --mixed\n  amend = commit --amend --no-edit`, 'aliases')}
                className="mt-4 px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
              >
                {copied === 'aliases' ? '✓ Copied' : 'Copy Aliases'}
              </button>
            </div>
          </div>
        </section>

        {/* Troubleshooting */}
        <section id="troubleshooting" className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <AlertTriangle className="w-8 h-8 text-red-600" />
            Common Issues & Solutions
          </h2>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border-l-4 border-red-500 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Accidentally Committed to Wrong Branch</h3>
              <div className="space-y-2 text-sm text-gray-700 mb-4">
                <p><strong>Solution:</strong></p>
                <div className="bg-gray-50 p-3 rounded">
                  <code className="block mb-2"># Save the commit</code>
                  <code className="block mb-2">git log --oneline -1  # Note the commit hash</code>
                  <code className="block mb-2"># Switch to correct branch</code>
                  <code className="block mb-2">git checkout correct-branch</code>
                  <code className="block mb-2"># Cherry-pick the commit</code>
                  <code className="block">git cherry-pick &lt;commit-hash&gt;</code>
                </div>
                <p className="mt-2">Then reset the wrong branch: <code className="bg-gray-100 px-1 rounded">git checkout wrong-branch && git reset --hard HEAD~1</code></p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border-l-4 border-yellow-500 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Merge Conflict Resolution</h3>
              <div className="space-y-2 text-sm text-gray-700 mb-4">
                <p><strong>Steps:</strong></p>
                <ol className="list-decimal list-inside space-y-1 ml-4">
                  <li>Identify conflicted files: <code className="bg-gray-100 px-1 rounded">git status</code></li>
                  <li>Open files and resolve conflicts (look for <code className="bg-gray-100 px-1 rounded">&lt;&lt;&lt;&lt;&lt;&lt;&lt;</code> markers)</li>
                  <li>Stage resolved files: <code className="bg-gray-100 px-1 rounded">git add &lt;file&gt;</code></li>
                  <li>Complete merge: <code className="bg-gray-100 px-1 rounded">git commit</code></li>
                </ol>
                <p className="mt-2">To abort: <code className="bg-gray-100 px-1 rounded">git merge --abort</code></p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border-l-4 border-blue-500 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Undo a Pushed Commit</h3>
              <div className="space-y-2 text-sm text-gray-700 mb-4">
                <p><strong>Safe method (creates new commit):</strong></p>
                <div className="bg-gray-50 p-3 rounded">
                  <code className="block">git revert &lt;commit-hash&gt;</code>
                </div>
                <p className="mt-2"><strong>Warning:</strong> Never use <code className="bg-gray-100 px-1 rounded">git reset</code> on commits that others have pulled!</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border-l-4 border-green-500 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Recover Deleted Branch</h3>
              <div className="space-y-2 text-sm text-gray-700 mb-4">
                <p><strong>Use reflog to find the commit:</strong></p>
                <div className="bg-gray-50 p-3 rounded">
                  <code className="block mb-2">git reflog</code>
                  <code className="block mb-2"># Find the commit hash before deletion</code>
                  <code className="block">git checkout -b recovered-branch &lt;commit-hash&gt;</code>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Reference Card */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold mb-6">Quick Reference Card</h2>
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div>
                <h3 className="font-bold mb-3 text-lg">Daily Commands</h3>
                <ul className="space-y-1 font-mono">
                  <li>git status</li>
                  <li>git add .</li>
                  <li>git commit -m "msg"</li>
                  <li>git push</li>
                  <li>git pull</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-3 text-lg">Branching</h3>
                <ul className="space-y-1 font-mono">
                  <li>git branch</li>
                  <li>git checkout -b name</li>
                  <li>git merge branch</li>
                  <li>git branch -d name</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-3 text-lg">Viewing</h3>
                <ul className="space-y-1 font-mono">
                  <li>git log --oneline</li>
                  <li>git diff</li>
                  <li>git show HEAD</li>
                  <li>git blame file</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mt-12 bg-white rounded-lg shadow-lg p-8 border border-gray-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqData.map((faq, index) => (
              <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Schema */}
        <FAQSchema faqs={faqData} />

        {/* Related Tools */}
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 border border-blue-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Explore Our Developer Tools</h2>
          <p className="text-gray-700 mb-6">
            While you're here, check out our powerful developer tools for JSON processing, API testing, and more.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <Link
              href="/?tab=fixer"
              className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-gray-900 mb-1">JSON Fixer</h3>
              <p className="text-sm text-gray-600">Fix broken JSON instantly with our intelligent JSON repair tool</p>
            </Link>
            <Link
              href="/?tab=curl"
              className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-gray-900 mb-1">cURL Converter</h3>
              <p className="text-sm text-gray-600">Convert cURL commands to code in multiple programming languages</p>
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}

