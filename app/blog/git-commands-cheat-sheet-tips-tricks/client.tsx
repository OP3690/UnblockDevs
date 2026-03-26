'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CodeBlock, FAQAccordion, KeyPointsGrid,
  StatGrid, SectionHeader, QuickFact,
} from '@/components/blog/BlogVisuals';

export default function GitCommandsCheatSheetTipsTricksClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>Git Commands Cheat Sheet — Every Command You Actually Use</h1>
      <p className="lead">
        Git has hundreds of commands but most developers use fewer than 20 daily.
        This cheat sheet covers the most important Git commands with practical examples,
        tips for complex scenarios, and tricks that save hours of frustration.
      </p>

      <StatGrid stats={[
        { value: '20+', label: 'essential commands covered', color: 'blue' },
        { value: 'git reflog', label: 'the "undo everything" safety net', color: 'green' },
        { value: 'git stash', label: 'save work without committing', color: 'purple' },
        { value: 'git bisect', label: 'find the commit that broke everything', color: 'amber' },
      ]} />

      <SectionHeader number={1} title="Essential Daily Commands" />
      <CodeBlock language="bash" filename="Daily Git workflow">
{`# Status and inspection
git status                    # What's changed?
git diff                      # See unstaged changes
git diff --staged             # See staged changes (about to commit)
git log --oneline -20         # Recent commits (compact)
git log --oneline --graph     # Branch visualization

# Staging and committing
git add file.txt              # Stage specific file
git add -p                    # Interactively stage hunks (best practice!)
git commit -m "feat: add login"
git commit --amend            # Edit last commit message (unpushed only)

# Branches
git branch                    # List local branches
git branch -a                 # List all branches (including remote)
git checkout -b feature/login # Create and switch to new branch
git switch main               # Switch branch (modern syntax)
git merge feature/login       # Merge branch into current

# Remote
git fetch origin              # Download changes (don't merge)
git pull origin main          # Fetch + merge
git push origin feature/login # Push branch to remote
git push -u origin feature/login  # Push and set upstream`}
      </CodeBlock>

      <SectionHeader number={2} title="Undoing Mistakes" />
      <CodeBlock language="bash" filename="Git undo operations">
{`# Undo unstaged changes (destructive — loses changes)
git restore file.txt          # Discard changes to one file
git restore .                 # Discard ALL unstaged changes

# Unstage a file (keep changes)
git restore --staged file.txt
git reset HEAD file.txt       # Older syntax

# Undo last commit (keep changes staged)
git reset --soft HEAD~1

# Undo last commit (keep changes unstaged)
git reset HEAD~1

# Undo last commit and DISCARD changes (destructive!)
git reset --hard HEAD~1

# Revert a commit (safe — creates new commit that undoes it)
git revert abc1234            # Undo specific commit safely (use on shared branches!)

# THE SAFETY NET — see ALL recent HEAD movements
git reflog                    # Lists every state HEAD was in
git reset --hard HEAD@{2}     # Go back to 2 moves ago (undo an undo!)`}
      </CodeBlock>

      <SectionHeader number={3} title="Stashing — Save Work Temporarily" />
      <CodeBlock language="bash" filename="git stash commands">
{`git stash                     # Save uncommitted changes
git stash push -m "WIP: login form"  # Save with a label
git stash list                # See all stashes
git stash pop                 # Apply most recent stash + delete it
git stash apply stash@{1}     # Apply specific stash (keep stash)
git stash drop stash@{1}      # Delete a stash
git stash clear               # Delete ALL stashes

# Stash only specific files
git stash push -m "only styles" src/styles.css

# Create a branch from a stash
git stash branch feature/from-stash stash@{0}`}
      </CodeBlock>

      <SectionHeader number={4} title="Advanced Tips and Tricks" />
      <CodeBlock language="bash" filename="Power user Git tricks">
{`# Find the commit that introduced a bug (binary search through history)
git bisect start
git bisect bad                # Current commit is broken
git bisect good v1.0.0        # This tag/commit was working
# Git checks out middle commit — test it, then:
git bisect good               # or: git bisect bad
# Repeat until Git finds the exact breaking commit
git bisect reset              # Done

# Cherry-pick a single commit from another branch
git cherry-pick abc1234

# Interactive rebase — clean up commits before merge
git rebase -i HEAD~5          # Rewrite last 5 commits
# squash: combine commits  |  fixup: squash without message  |  reword: edit message

# Search through commit history
git log --grep="login"        # Commits mentioning "login"
git log -S "functionName"     # Commits that added/removed text

# Show what changed in a commit
git show abc1234
git show abc1234 --stat       # File summary only

# Useful aliases to add to ~/.gitconfig
git config --global alias.lg "log --oneline --graph --all"
git config --global alias.st "status -sb"
git config --global alias.undo "reset HEAD~1"`}
      </CodeBlock>

      <SectionHeader number={5} title="Branch and Merge Strategies" />
      <KeyPointsGrid columns={2} items={[
        { title: 'git merge (default)', description: 'Creates a merge commit. Preserves full branch history. Best for: feature branches merged to main, team collaboration where history matters.' },
        { title: 'git rebase', description: 'Replays your commits on top of target branch. Creates linear history. Best for: keeping feature branches up to date with main, cleaning up before PR.' },
        { title: 'git merge --squash', description: 'Combines all branch commits into one staged change. Best for: squashing messy WIP commits before merging a feature.' },
        { title: 'git rebase -i (interactive)', description: 'Rewrite history: squash, reorder, edit, delete commits. Best for: cleaning up local commits before sharing. Never use on shared/pushed commits.' },
      ]} />

      <AlertBox type="warning" title="Golden rules of Git rewriting">
        Never rebase or amend commits that have been pushed to a shared branch. Others have based
        work on those commits. Rewriting shared history forces force-push and breaks everyone's
        local repos. Only rewrite commits that exist only on your local machine.
      </AlertBox>

      <FAQAccordion items={[
        {
          question: 'What is the difference between git fetch and git pull?',
          answer: 'git fetch downloads remote changes but does NOT update your local branches. git pull = git fetch + git merge. Use git fetch when you want to see what changed remotely before deciding to merge. Use git pull when you\'re ready to update your local branch. Best practice: git fetch first, then git log origin/main..HEAD to review differences, then git merge.',
        },
        {
          question: 'How do I undo a git push?',
          answer: 'If no one else has pulled your push: git reset --hard HEAD~1 then git push --force-with-lease (safer than --force). If others have already pulled: don\'t force push. Instead use git revert to create a new commit that undoes the change. Force pushing shared history is dangerous and ruins others\' local repos.',
        },
        {
          question: 'What is git reflog and when do I use it?',
          answer: 'reflog is your safety net for all Git disasters. It records every position HEAD has been in for the last 90 days. Even after git reset --hard, your "lost" commits are still in the reflog. Run git reflog, find the commit hash you want, and git reset --hard <hash> to recover it.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
