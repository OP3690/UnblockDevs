'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CodeBlock, FAQAccordion, KeyPointsGrid, ErrorFix,
  StatGrid, SectionHeader, QuickFact, CompareTable, VerticalSteps,
} from '@/components/blog/BlogVisuals';

export default function GitCommandsCheatSheetTipsTricksClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>Git Commands Cheat Sheet — Every Command You Actually Use</h1>
      <p className="lead">
        Git has hundreds of commands but most developers use fewer than 20 daily.
        This cheat sheet covers the most important Git commands with practical examples,
        tips for complex scenarios, tricks for undoing mistakes without losing work, and workflows
        for branches, stashing, rebasing, and finding bugs in history. Whether you're a daily Git user
        or learning the advanced commands, this guide covers everything from status and commits to
        bisect, cherry-pick, and worktrees.
      </p>

      <StatGrid stats={[
        { value: '30+', label: 'essential commands covered with examples', color: 'blue' },
        { value: 'git reflog', label: 'the "undo everything" safety net — never lose work', color: 'green' },
        { value: 'git stash', label: 'save work without committing for context switching', color: 'purple' },
        { value: 'git bisect', label: 'binary search through history to find breaking commit', color: 'amber' },
      ]} />

      <SectionHeader number={1} title="Essential Daily Commands" />
      <CodeBlock lang="bash" title="Daily Git workflow — status, staging, committing, branches">
{`# ─── Status and Inspection ───────────────────────────────────────────────────
git status                    # What's changed? (modified, staged, untracked)
git status -s                 # Short format: M=modified, A=added, ?=untracked
git diff                      # See unstaged changes (what's not yet staged)
git diff --staged             # See staged changes (what will be in next commit)
git diff main..feature        # Diff between two branches
git log --oneline -20         # Recent commits (compact, one line each)
git log --oneline --graph --all  # ASCII branch visualization
git log --follow -p file.txt  # Full history + diffs for a specific file

# ─── Staging and Committing ──────────────────────────────────────────────────
git add file.txt              # Stage specific file
git add src/                  # Stage all files in a directory
git add -p                    # Interactively stage hunks (RECOMMENDED — review each change)
git commit -m "feat: add login"
git commit --amend            # Edit last commit message (unpushed only!)
git commit --amend --no-edit  # Add staged changes to last commit without editing message

# ─── Branches ────────────────────────────────────────────────────────────────
git branch                    # List local branches
git branch -a                 # List all branches (including remote tracking)
git branch -v                 # Branches with last commit message
git checkout -b feature/login # Create and switch to new branch
git switch main               # Switch branch (modern syntax, Git 2.23+)
git switch -c feature/login   # Create and switch (modern syntax)
git branch -d feature/done    # Delete merged branch
git branch -D feature/wip     # Force delete (even if unmerged)
git merge feature/login       # Merge branch into current
git merge --no-ff feature/x   # Merge with a merge commit (even if fast-forward possible)

# ─── Remote ──────────────────────────────────────────────────────────────────
git fetch origin              # Download changes (don't merge — safe preview)
git fetch --all               # Fetch all remotes
git pull origin main          # Fetch + merge (shortcut)
git pull --rebase             # Fetch + rebase instead of merge (linear history)
git push origin feature/login # Push branch to remote
git push -u origin feature/login  # Push and set upstream (then just git push)`}
      </CodeBlock>

      <SectionHeader number={2} title="Undoing Mistakes — Safe and Destructive Options" />
      <AlertBox type="warning" title="Know which undo operations are destructive">
        Some Git undo commands lose work permanently. Always check: has this commit been pushed?
        Is the file you're restoring not saved anywhere else? Use git reflog as your safety net before
        any destructive operation.
      </AlertBox>
      <CodeBlock lang="bash" title="Git undo operations — from safe to destructive">
{`# ─── Unstage (safe — keeps changes) ─────────────────────────────────────────
git restore --staged file.txt   # Unstage file, keep working tree changes
git reset HEAD file.txt         # Same (older syntax)

# ─── Discard working tree changes (DESTRUCTIVE — loses changes) ──────────────
git restore file.txt            # Discard changes to one file
git restore .                   # Discard ALL unstaged changes in repo

# ─── Undo commits ────────────────────────────────────────────────────────────
git reset --soft HEAD~1         # Undo last commit, keep changes STAGED
git reset HEAD~1                # Undo last commit, keep changes UNSTAGED
git reset --hard HEAD~1         # Undo last commit, DISCARD changes (destructive!)
git reset --hard HEAD~3         # Undo last 3 commits and discard all changes

# ─── Safe revert (creates new commit) ───────────────────────────────────────
git revert abc1234              # Create new commit undoing specific commit
# Use revert on shared/pushed branches — never reset shared history!

# ─── The Ultimate Safety Net ─────────────────────────────────────────────────
git reflog                      # See every position HEAD has been in (last 90 days)
git reflog --all                # Include all refs (branches, stashes)
git reset --hard HEAD@{2}       # Go back to 2 reflog entries ago (undo an undo!)
git checkout HEAD@{5} -- file.txt  # Recover a specific file from 5 moves ago`}
      </CodeBlock>

      <SectionHeader number={3} title="Stashing — Save Work Without Committing" />
      <CodeBlock lang="bash" title="git stash — complete reference">
{`git stash                         # Save all uncommitted changes (tracked files)
git stash -u                      # Include untracked files too
git stash push -m "WIP: login form"  # Save with a descriptive label
git stash list                    # See all stashes with indices
# stash@{0}: On feature/login: WIP: login form
# stash@{1}: WIP on main: quick experiment

git stash pop                     # Apply most recent stash AND delete it
git stash apply stash@{1}         # Apply specific stash (keeps stash in list)
git stash drop stash@{1}          # Delete a specific stash
git stash clear                   # Delete ALL stashes (irreversible!)

# Advanced stash operations
git stash push -m "only styles" src/styles.css   # Stash only specific file
git stash show -p stash@{0}       # Show diff of what's in a stash
git stash branch feature/from-stash stash@{0}    # Create branch from stash

# Partial stash (interactive — like git add -p)
git stash push -p                 # Choose which hunks to stash`}
      </CodeBlock>

      <SectionHeader number={4} title="Advanced Tips and Power User Tricks" />
      <CodeBlock lang="bash" title="Power user Git commands">
{`# ─── Finding Bugs with Bisect ────────────────────────────────────────────────
git bisect start
git bisect bad                    # Current commit is broken
git bisect good v1.0.0            # This tag was working
# Git checks out the middle commit — test it manually, then:
git bisect good                   # or: git bisect bad
# Repeat until Git finds the exact breaking commit (takes log2(N) steps)
git bisect reset                  # Return to HEAD when done

# Automated bisect with a test script:
git bisect run npm test           # Runs test, uses exit code (0=good, 1=bad)

# ─── Cherry-Pick ─────────────────────────────────────────────────────────────
git cherry-pick abc1234           # Apply a specific commit to current branch
git cherry-pick abc1234..def5678  # Apply a range of commits
git cherry-pick -n abc1234        # Stage changes without committing (--no-commit)

# ─── Interactive Rebase ──────────────────────────────────────────────────────
git rebase -i HEAD~5              # Rewrite last 5 commits interactively
# Commands in editor:
# pick   = keep commit as-is
# reword = edit commit message
# squash = merge into previous commit (keep message)
# fixup  = merge into previous commit (discard message)
# drop   = delete commit entirely
# exec   = run shell command between commits

# ─── Searching History ───────────────────────────────────────────────────────
git log --grep="login"            # Commits whose message mentions "login"
git log -S "functionName"         # Commits that added/removed "functionName" in code
git log -G "regex.*pattern"       # Commits where code matches regex
git log --author="Alice"          # Commits by specific author
git log --since="2 weeks ago"     # Commits within timeframe
git show abc1234                  # Show full diff of a specific commit
git show abc1234 --stat           # Show only file summary of a commit
git blame file.txt                # Who last changed each line and when
git blame -L 10,25 file.txt       # Blame for lines 10-25 only

# ─── Useful Aliases ──────────────────────────────────────────────────────────
git config --global alias.lg "log --oneline --graph --all"
git config --global alias.st "status -sb"
git config --global alias.undo "reset HEAD~1"
git config --global alias.save "stash push -m"
git config --global alias.aliases "config --get-regexp alias"`}
      </CodeBlock>

      <SectionHeader number={5} title="Branch and Merge Strategies" />
      <CompareTable
        leftLabel="Strategy"
        rightLabel="When to Use"
        rows={[
          { label: 'git merge (default)', left: 'Creates a merge commit preserving full branch history', right: 'Feature branches merged to main, team collaboration where history is important' },
          { label: 'git merge --ff-only', left: 'Only merges if fast-forward possible (linear history)', right: 'Small updates where merge commits would add noise' },
          { label: 'git rebase onto main', left: 'Replays your commits on top of target branch', right: 'Keeping feature branches up-to-date with main before PR' },
          { label: 'git merge --squash', left: 'Combines all branch commits into one staged change', right: 'Squashing messy WIP commits before merging' },
          { label: 'git rebase -i (interactive)', left: 'Rewrite history: squash, reorder, edit, delete commits', right: 'Cleaning up local commits before sharing a PR' },
        ]}
      />
      <AlertBox type="warning" title="Golden rule: never rewrite shared history">
        Never rebase, amend, or reset --hard on commits that have been pushed to a shared branch.
        Others have based work on those commits. Force-pushing shared history breaks all collaborators' local repos.
        Only rewrite commits that exist solely on your local machine.
      </AlertBox>

      <SectionHeader number={6} title="Git Config and Global Setup" />
      <CodeBlock lang="bash" title="Essential ~/.gitconfig settings">
{`# Set identity (required)
git config --global user.name "Your Name"
git config --global user.email "you@example.com"

# Set default editor (for commit messages, rebase)
git config --global core.editor "code --wait"   # VS Code
git config --global core.editor "vim"            # Vim

# Set default branch name for new repos
git config --global init.defaultBranch main

# Faster rebasing and better diff output
git config --global pull.rebase true            # pull --rebase by default
git config --global rebase.autoSquash true      # auto-apply fixup commits
git config --global diff.colorMoved zebra       # color moved code blocks differently

# Store credentials (macOS keychain)
git config --global credential.helper osxkeychain

# View all config
git config --list --show-origin`}
      </CodeBlock>

      <SectionHeader number={7} title="Resolving Merge Conflicts" />
      <VerticalSteps steps={[
        { title: 'Start the merge or rebase', desc: 'git merge feature-branch or git pull. Git stops and reports conflicts: "CONFLICT (content): Merge conflict in src/app.ts"' },
        { title: 'Open conflicting files', desc: 'Conflict markers: <<<<<<< HEAD is your version, ======= separates versions, >>>>>>> feature-branch is theirs. Edit to keep the right code — delete all markers.' },
        { title: 'Stage resolved files', desc: 'git add src/app.ts for each resolved file. Never git add -A blindly — only add files you\'ve actually resolved.' },
        { title: 'Continue or commit', desc: 'For merge: git commit (message auto-generated). For rebase: git rebase --continue. To abort entirely: git merge --abort or git rebase --abort.' },
        { title: 'Use a merge tool (optional)', desc: 'git mergetool opens a 3-way diff editor. VS Code: set git config --global merge.tool vscode and git config --global mergetool.vscode.cmd "code --wait $MERGED"' },
      ]} />

      <FAQAccordion items={[
        {
          question: 'What is the difference between git fetch and git pull?',
          answer: 'git fetch downloads remote changes but does NOT update your local branches — it only updates the remote tracking refs (like origin/main). git pull = git fetch + git merge (or rebase). Best practice: git fetch first, review with git log origin/main..HEAD to see what changed, then git merge when you\'re ready. This avoids surprise conflicts during a pull.',
        },
        {
          question: 'How do I undo a git push?',
          answer: 'If no one else has pulled: git reset --hard HEAD~1 then git push --force-with-lease (safer than --force — fails if someone else pushed since you). If others have already pulled: don\'t force push. Instead use git revert abc1234 to create a new commit that undoes the change — this preserves history and doesn\'t break other developers\' repos.',
        },
        {
          question: 'What is git reflog and when do I use it?',
          answer: 'git reflog records every position HEAD has been in for the last 90 days — including commits that were "lost" by a reset --hard. It\'s your ultimate undo safety net. After any disaster: run git reflog, find the hash you want to recover, then git reset --hard <hash>. Even if you did git reset --hard and lost commits, they\'re still in the reflog.',
        },
        {
          question: 'What is the difference between git rebase and git merge?',
          answer: 'Merge creates a merge commit that preserves the full branch history — good for team repos where you want to see exactly when branches diverged and merged. Rebase replays your commits on top of the target branch, creating a linear history — cleaner but rewrites commit hashes. Rule: merge for main branch integration (shared history), rebase for keeping your feature branch up-to-date with main (local clean-up).',
        },
        {
          question: 'How do I see what changed between two commits or branches?',
          answer: 'git diff branch1..branch2 shows all changes between branches. git diff abc1234..def5678 shows changes between specific commits. git log branch1..branch2 shows commits in branch2 not in branch1. git diff --stat shows a file summary instead of full diffs. git show abc1234 shows the full diff and metadata for one commit.',
        },
        {
          question: 'How do I remove a file from Git history entirely (sensitive data)?',
          answer: 'Never commit secrets to git — even deleted secrets remain in history. To purge: use git filter-repo (preferred, faster): git filter-repo --path secrets.txt --invert-paths. Or BFG Repo-Cleaner. After purging: git push --force-with-lease and have all collaborators re-clone. Also rotate the exposed secrets immediately — assume they were already seen.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
