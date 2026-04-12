'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, FlowDiagram, CompareTable, ErrorFix, VerticalSteps,
  CodeBlock, FAQAccordion, KeyPointsGrid, StatGrid, SectionHeader,
  QuickFact, TimelineViz, ArchDiagram,
} from '@/components/blog/BlogVisuals';

export default function GitCommandsCheatSheetClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>Git Commands Cheat Sheet: Most Useful Commands, Tips & Tricks (2026)</h1>
      <p className="lead">
        This is the only Git reference you need bookmarked. From the six commands you type every single day
        to advanced cherry-pick, bisect, and interactive-rebase workflows — everything is here, explained
        clearly, with copy-ready snippets and real-world tips from professional engineering teams.
      </p>

      <StatGrid stats={[
        { value: '60+', label: 'Commands documented', color: 'blue' },
        { value: '8', label: 'Command categories', color: 'purple' },
        { value: '15+', label: 'Pro tips and tricks', color: 'green' },
        { value: '4', label: 'Troubleshooting recipes', color: 'amber' },
      ]} />

      <SectionHeader number={1} title="The 6 Commands You Type Every Single Day" />

      <QuickFact>These six commands cover 90% of daily Git usage. Master these before anything else.</QuickFact>

      <CodeBlock language="bash" filename="daily-workflow.sh">
{`git status                    # What's changed? What's staged?
git add .                     # Stage all changes
git add <file>                # Stage a specific file
git commit -m "feat: add login form"   # Save staged changes
git push origin main          # Upload commits to GitHub/GitLab
git pull origin main          # Download + merge remote changes`}
      </CodeBlock>

      <AlertBox type="tip" title="Commit message convention">
        Use the Conventional Commits format: <code>feat:</code>, <code>fix:</code>, <code>chore:</code>,
        <code>docs:</code>. This unlocks automated changelogs and semantic versioning tools.
      </AlertBox>

      <SectionHeader number={2} title="Repository Setup Commands" />

      <CodeBlock language="bash" filename="repo-setup.sh">
{`# Start a brand-new repository
git init

# Copy an existing repository (full history included)
git clone https://github.com/user/repo.git

# Clone into a specific folder name
git clone https://github.com/user/repo.git my-folder

# Add a remote to an existing local repo
git remote add origin https://github.com/user/repo.git

# List all configured remotes
git remote -v

# Change remote URL (e.g., from HTTPS to SSH)
git remote set-url origin git@github.com:user/repo.git`}
      </CodeBlock>

      <SectionHeader number={3} title="Branching — Create, Switch, Merge, Delete" />

      <CodeBlock language="bash" filename="branching.sh">
{`# List all local branches (* = current)
git branch

# List all branches including remote-tracking ones
git branch -a

# Create a new branch (does NOT switch to it)
git branch feature/login

# Create AND switch in one command (modern syntax)
git switch -c feature/login

# Older syntax — still works everywhere
git checkout -b feature/login

# Switch to an existing branch
git switch main
git checkout main

# Rename current branch
git branch -m new-name

# Delete a branch (only if it has been merged)
git branch -d feature/login

# Force-delete (even unmerged — be careful!)
git branch -D feature/login

# Merge a branch into current branch
git merge feature/login

# Merge without fast-forward (always creates merge commit)
git merge --no-ff feature/login

# Abort an in-progress merge
git merge --abort`}
      </CodeBlock>

      <ArchDiagram
        boxes={[
          { label: 'main branch', color: 'blue' },
          { label: 'git switch -c feature/x', color: 'amber' },
          { label: 'develop on feature/x', color: 'amber' },
          { label: 'git merge feature/x → main', color: 'green' },
        ]}
        arrows={['→', '→', '→']}
      />

      <SectionHeader number={4} title="Viewing History and Diffs" />

      <CodeBlock language="bash" filename="history-diffs.sh">
{`# Full commit history
git log

# Compact: one line per commit
git log --oneline

# Graphical branch tree (best everyday view)
git log --all --graph --oneline

# Show changes introduced by a commit
git show <commit-hash>

# Show only files changed in a commit
git show --name-only <commit-hash>

# Diff: working directory vs staging area (unstaged changes)
git diff

# Diff: staging area vs last commit (what will be committed)
git diff --staged

# Diff: all changes since last commit
git diff HEAD

# Diff: two branches
git diff main..feature/login

# Diff: specific file only
git diff HEAD -- src/app.ts

# Who last changed each line of a file?
git blame src/app.ts`}
      </CodeBlock>

      <CodeBlock language="bash" filename="pretty-log-alias.sh">
{`# Add this once to ~/.gitconfig for a beautiful log view
git config --global alias.lg \
  "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit --all"

# Then use:
git lg`}
      </CodeBlock>

      <SectionHeader number={5} title="Undoing Changes — The Safe Way" />

      <AlertBox type="warning" title="Rule of thumb">
        Never use <code>git reset --hard</code> or <code>git push --force</code> on commits that teammates
        have already pulled. Use <code>git revert</code> to create a safe undo commit instead.
      </AlertBox>

      <ErrorFix
        badLabel="Dangerous — destroys committed history others may have"
        bad={`# Rewrites history on shared branch — NEVER do this
git reset --hard HEAD~3
git push --force origin main`}
        goodLabel="Safe — creates a new undo commit, history preserved"
        good={`# Reverts a specific pushed commit safely
git revert <commit-hash>
git push origin main`}
      />

      <CodeBlock language="bash" filename="undo-commands.sh">
{`# Discard changes in working directory (can't undo!)
git restore <file>

# Unstage a file (keep changes in working dir)
git restore --staged <file>

# Undo last commit — keep changes staged
git reset --soft HEAD~1

# Undo last commit — keep changes unstaged
git reset --mixed HEAD~1  # (default)

# Undo last commit — DISCARD all changes (irreversible!)
git reset --hard HEAD~1

# Create a safe undo commit for a pushed commit
git revert <commit-hash>

# Amend the last commit message (before pushing)
git commit --amend -m "corrected message"

# Amend last commit with staged changes (same message)
git add <file>
git commit --amend --no-edit

# Remove untracked files and directories (dry-run first!)
git clean -n    # preview
git clean -fd   # actually delete`}
      </CodeBlock>

      <SectionHeader number={6} title="Stashing — Save Work in Progress" />

      <p>
        Use <code>git stash</code> whenever you need to switch context quickly — to fix an urgent bug on
        another branch — without committing half-finished work.
      </p>

      <CodeBlock language="bash" filename="stash-commands.sh">
{`# Save tracked changes
git stash

# Save with a descriptive message
git stash save "WIP: half-done login form"

# Include untracked files
git stash -u

# Include untracked AND ignored files
git stash -a

# List all stashes
git stash list

# Apply and remove the most recent stash
git stash pop

# Apply a specific stash (keep it in the list)
git stash apply stash@{2}

# Delete a specific stash
git stash drop stash@{0}

# Delete ALL stashes
git stash clear

# Create a branch from a stash (great if the stash conflicts)
git stash branch feature/from-stash stash@{0}`}
      </CodeBlock>

      <SectionHeader number={7} title="Remote Operations — push, pull, fetch" />

      <CompareTable
        leftLabel="git fetch"
        rightLabel="git pull"
        rows={[
          { label: 'What it does', left: 'Downloads remote changes into remote-tracking branches', right: 'Downloads AND merges into your current branch' },
          { label: 'Modifies working dir?', left: 'No — safe to inspect first', right: 'Yes — merges immediately' },
          { label: 'When to use', left: 'When you want to review changes before merging', right: 'When you want to update immediately' },
          { label: 'Equivalent to', left: 'git fetch only', right: 'git fetch + git merge' },
        ]}
      />

      <CodeBlock language="bash" filename="remote-ops.sh">
{`# Fetch from all remotes
git fetch --all

# Pull with rebase instead of merge (cleaner history)
git pull --rebase origin main

# Push and set upstream tracking (first push)
git push -u origin feature/login

# Push a new branch to remote
git push origin feature/login

# Delete a remote branch
git push origin --delete feature/login

# Show detailed remote info
git remote show origin

# Prune stale remote-tracking branches
git remote prune origin

# Force push (rewrites remote history — danger!)
# Only safe on personal feature branches no one else has pulled
git push --force-with-lease origin feature/cleanup`}
      </CodeBlock>

      <AlertBox type="warning" title="Use --force-with-lease, not --force">
        <code>--force-with-lease</code> refuses to overwrite the remote if someone else pushed since your
        last fetch — a much safer alternative to bare <code>--force</code>.
      </AlertBox>

      <SectionHeader number={8} title="Advanced Commands" />

      <CodeBlock language="bash" filename="advanced-git.sh">
{`# ── Rebase ─────────────────────────────────────────────────────────
# Replay commits from feature onto main (linear history)
git rebase main

# Interactive rebase: edit, reorder, squash last 4 commits
git rebase -i HEAD~4
# In editor: pick / reword / edit / squash / fixup / drop

# Continue after resolving rebase conflict
git rebase --continue

# Abort an in-progress rebase
git rebase --abort


# ── Cherry-pick ────────────────────────────────────────────────────
# Copy a specific commit to current branch
git cherry-pick <commit-hash>

# Cherry-pick a range of commits
git cherry-pick A^..B


# ── Bisect (find the commit that introduced a bug) ──────────────────
git bisect start
git bisect bad              # current state is broken
git bisect good v2.1.0      # this tag/commit was working
# Git checks out middle commit — test it, then:
git bisect good             # or git bisect bad
# Repeat until bisect isolates the bad commit
git bisect reset            # return to original HEAD


# ── Reflog (your safety net) ────────────────────────────────────────
# See all HEAD movements (90-day window)
git reflog

# Recover a "lost" commit or deleted branch
git checkout -b recovered <hash-from-reflog>


# ── Worktrees (check out multiple branches simultaneously) ──────────
git worktree add ../hotfix-branch hotfix/critical-bug
git worktree list
git worktree remove ../hotfix-branch`}
      </CodeBlock>

      <SectionHeader number={9} title="Tips and Tricks" />

      <CodeBlock language="ini" filename="~/.gitconfig aliases section">
{`[alias]
  # Shortcuts
  st = status
  co = checkout
  br = branch
  ci = commit

  # One-liner for stage-and-commit
  ac = !git add -A && git commit

  # Undo last commit, keep changes unstaged
  undo = reset HEAD~1 --mixed

  # Amend last commit with new staged changes
  amend = commit --amend --no-edit

  # Quick save (useful during pairing sessions)
  save = !git add -A && git commit -m 'SAVEPOINT'

  # Pretty graph log
  lg = log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit --all

  # Delete all branches already merged into main
  bclean = !git branch --merged main | grep -v 'main' | xargs git branch -d`}
      </CodeBlock>

      <CodeBlock language="bash" filename="partial-staging.sh">
{`# Stage PARTS of a file (interactive hunk selection)
git add -p src/app.ts

# In the hunk prompt:
# y = stage this hunk
# n = skip
# s = split into smaller hunks
# e = manually edit the hunk`}
      </CodeBlock>

      <CodeBlock language="bash" filename="find-bug-via-bisect.sh">
{`# Binary-search for the commit that broke the tests
git bisect start
git bisect bad                     # HEAD is broken
git bisect good abc1234            # this commit was fine
git bisect run npm test            # automate the search!
git bisect reset`}
      </CodeBlock>

      <SectionHeader number={10} title="Troubleshooting Recipes" />

      <VerticalSteps steps={[
        {
          title: 'Committed to the wrong branch',
          description: 'Copy the commit to the right branch, then remove it from the wrong one.',
          code: `git log --oneline -3         # note the hash\ngit switch correct-branch\ngit cherry-pick <hash>\ngit switch wrong-branch\ngit reset --hard HEAD~1`,
        },
        {
          title: 'Resolve a merge conflict',
          description: 'Edit conflicted files, remove the markers, stage, and commit.',
          code: `git status                  # see conflicted files\n# Edit files — remove <<<<<<< ======= >>>>>>>\ngit add <resolved-file>\ngit commit                  # or git merge --abort to give up`,
        },
        {
          title: 'Undo a commit already pushed to shared branch',
          description: 'Use revert — it creates a new commit that reverses the changes without rewriting history.',
          code: `git revert <commit-hash>    # creates new "undo" commit\ngit push origin main`,
        },
        {
          title: 'Recover a deleted branch',
          description: 'Reflog keeps a 90-day record of every HEAD movement.',
          code: `git reflog                  # find the last commit on deleted branch\ngit checkout -b recovered-branch <hash>`,
        },
        {
          title: 'Remove a large file accidentally committed',
          description: 'Use git-filter-repo (preferred modern tool) to rewrite history.',
          code: `pip install git-filter-repo\ngit filter-repo --path bigfile.zip --invert-paths\ngit push --force-with-lease`,
        },
      ]} />

      <SectionHeader number={11} title="Git Workflow Comparison" />

      <CompareTable
        leftLabel="Feature Branch Workflow"
        rightLabel="Trunk-Based Development"
        rows={[
          { label: 'Branch lifetime', left: 'Days to weeks per feature', right: 'Hours — short-lived branches' },
          { label: 'Merge strategy', left: 'PR merge into main', right: 'Direct push or very short PRs' },
          { label: 'History style', left: 'Multiple parallel branches', right: 'Nearly linear' },
          { label: 'Best for', left: 'Teams with formal review processes', right: 'Continuous delivery / CI-heavy teams' },
          { label: 'Conflict risk', left: 'Higher (long-lived branches drift)', right: 'Lower (frequent integration)' },
        ]}
      />

      <SectionHeader number={12} title="Quick Reference Card" />

      <KeyPointsGrid columns={3} items={[
        {
          title: 'Daily commands',
          description: 'git status · git add · git commit · git push · git pull · git log --oneline',
        },
        {
          title: 'Branching',
          description: 'git switch -c · git merge · git branch -d · git rebase',
        },
        {
          title: 'Undoing',
          description: 'git restore · git reset --soft · git revert · git reflog',
        },
        {
          title: 'Stashing',
          description: 'git stash · git stash pop · git stash list · git stash -u',
        },
        {
          title: 'Remote',
          description: 'git fetch · git pull --rebase · git push -u · git remote prune',
        },
        {
          title: 'Advanced',
          description: 'git cherry-pick · git bisect · git rebase -i · git worktree',
        },
      ]} />

      <SectionHeader number={13} title="Frequently Asked Questions" />

      <FAQAccordion items={[
        {
          question: 'What are the most essential Git commands for beginners?',
          answer: 'Start with six: git clone (get a repo), git status (see what changed), git add (stage changes), git commit (save snapshot), git push (upload to GitHub), git pull (download updates). These cover 90% of daily Git usage. Once comfortable, add git branch, git switch, and git merge.',
        },
        {
          question: 'How do I undo a Git commit?',
          answer: 'Three options depending on the situation: (1) git reset --soft HEAD~1 — removes the commit but keeps all changes staged, ready to recommit; (2) git reset --mixed HEAD~1 — removes the commit and unstages changes, but keeps files; (3) git reset --hard HEAD~1 — removes the commit AND all changes permanently. If the commit is already pushed to a shared branch, use git revert <hash> instead to create a new undo commit safely.',
        },
        {
          question: 'What is the difference between git pull and git fetch?',
          answer: 'git fetch downloads commits and branch updates from the remote into remote-tracking branches (like origin/main) but does NOT touch your working files or current branch. git pull is equivalent to git fetch followed immediately by git merge (or rebase with --rebase). Use fetch when you want to inspect remote changes before integrating, and pull when you want to update immediately.',
        },
        {
          question: 'What is git stash and when should I use it?',
          answer: 'git stash is a temporary clipboard for uncommitted changes. Use it when you need to switch branches quickly (to fix an urgent bug, for example) but are not ready to commit your current work. Run git stash to save, switch branches, do your work, switch back, then git stash pop to restore everything. Use git stash -u to also stash untracked files.',
        },
        {
          question: 'What is the difference between git merge and git rebase?',
          answer: 'git merge joins two branch histories and creates a merge commit — the full history of both branches is preserved. git rebase replays your commits on top of another branch, rewriting their hashes to produce a linear history. Use merge for shared/public branches (it never rewrites history). Use rebase to clean up local feature branches before opening a PR, making the history easier to read and review.',
        },
        {
          question: 'How do I resolve merge conflicts in Git?',
          answer: 'When a conflict occurs: (1) Run git status to see the conflicted files. (2) Open each file and look for conflict markers: <<<<<<< (your changes), ======= (divider), >>>>>>> (their changes). (3) Edit the file to the desired final state and remove all three markers. (4) Run git add <file> to mark it resolved. (5) Run git commit to complete the merge. At any point, git merge --abort cancels and returns to the pre-merge state.',
        },
        {
          question: 'How do I find which commit introduced a bug?',
          answer: 'Use git bisect for binary search: run git bisect start, then git bisect bad (current broken state) and git bisect good <hash> (a known-good commit). Git checks out a commit halfway between. Test it, then mark it good or bad. Repeat 5–10 times and Git identifies the exact offending commit. You can fully automate this with git bisect run <test-script>.',
        },
        {
          question: 'How do I create and use Git aliases?',
          answer: 'Run git config --global alias.<shortcut> "<command>" — for example, git config --global alias.st status creates git st. For multi-command aliases, prefix with !: git config --global alias.ac "!git add -A && git commit". All aliases are stored in ~/.gitconfig under the [alias] section, which you can edit directly.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
