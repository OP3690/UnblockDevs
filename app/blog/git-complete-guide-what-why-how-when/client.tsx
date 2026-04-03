'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CompareTable, ErrorFix, VerticalSteps,
  CodeBlock, FAQAccordion, KeyPointsGrid, StatGrid, SectionHeader,
  QuickFact,
} from '@/components/blog/BlogVisuals';

export default function GitCompleteGuideClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>Git Complete Guide — What, Why, How, and When to Use Every Command</h1>
      <p className="lead">
        Git is the version control system used by virtually every software team on earth. This guide covers
        everything from the mental model to advanced workflows: commits, branches, merging, rebasing, undoing
        mistakes, stashing, tagging, and real team collaboration patterns with over 30 commands explained
        in context.
      </p>

      <StatGrid
        stats={[
          { value: '94%', label: 'of developers use Git', color: 'orange' },
          { value: '2005', label: 'created by Linus Torvalds', color: 'blue' },
          { value: '3', label: 'trees: working dir, index, HEAD', color: 'purple' },
          { value: '30+', label: 'commands covered in this guide', color: 'green' },
        ]}
      />

      <SectionHeader number={1} title="The Mental Model: 3 Trees" />
      <p>
        Git manages three "trees" (collections of files). Understanding these makes every command make sense
        immediately instead of feeling like memorized incantations:
      </p>

      <KeyPointsGrid
        columns={3}
        items={[
          {
            title: 'Working Directory',
            description: 'The actual files on your disk. Where you edit code every day. Changes here are "unstaged" and not yet tracked by Git.',
          },
          {
            title: 'Staging Area (Index)',
            description: 'A snapshot of changes you have marked to include in the next commit. The `git add` command moves files here. Think of it as the draft commit.',
          },
          {
            title: 'Repository (HEAD)',
            description: 'The permanent history of commits. The `git commit` command moves staged changes here permanently. This is the timeline of your project.',
          },
        ]}
      />

      <VerticalSteps steps={[
        { title: 'Edit files in working directory', desc: 'You write code, make changes, create or delete files. These exist only on your disk — Git knows about them but does not track them until you stage them.' },
        { title: 'Stage changes with git add', desc: 'Choose which changes to include in your next commit. You can stage one file, multiple files, or specific lines within a file using git add -p.' },
        { title: 'Commit staged changes', desc: 'Run git commit to permanently save the staged snapshot to the repository history with a message explaining what and why.' },
        { title: 'Push to remote', desc: 'Run git push to share your commits with teammates via a remote repository (GitHub, GitLab, Bitbucket, or self-hosted).' },
      ]} />

      <SectionHeader number={2} title="Essential Daily Commands" />

      <CodeBlock language="bash" filename="git-setup.sh">
{`# Configure your identity (once per machine — appears in every commit)
git config --global user.name "Your Name"
git config --global user.email "you@example.com"

# Set default branch name to main (modern convention)
git config --global init.defaultBranch main

# Set preferred editor for commit messages
git config --global core.editor "code --wait"  # VS Code
git config --global core.editor "vim"           # Vim

# Initialize a new repo in current directory
git init

# Clone an existing repo (downloads entire history)
git clone https://github.com/user/repo.git

# Clone into a specific folder name
git clone https://github.com/user/repo.git my-folder`}
      </CodeBlock>

      <CodeBlock language="bash" filename="git-daily-workflow.sh">
{`# Check what's changed (always run this before staging)
git status

# See the actual diff — what changed in tracked files (unstaged)
git diff

# See diff of staged changes (what will go into next commit)
git diff --staged

# Stage specific files
git add file.js
git add src/components/Button.tsx

# Stage everything in current directory (use carefully)
git add .

# Interactively stage specific hunks (HIGHLY recommended!)
# Lets you review each change before staging it
git add -p

# Commit with message on command line
git commit -m "feat: add user authentication"

# Stage all tracked files AND commit in one step
# (does NOT stage new untracked files)
git commit -am "fix: correct null check in user service"

# View commit history
git log

# Compact one-line view (most useful)
git log --oneline

# With branch graph visualization
git log --oneline --graph --all

# See what files changed in each commit
git log --stat`}
      </CodeBlock>

      <SectionHeader number={3} title="Branching and Merging" />
      <p>
        Branches are cheap in Git — they are just a pointer (a file with a commit hash) to a single commit.
        Creating a branch costs almost nothing. Create a branch for every feature, bug fix, experiment, or
        anything you might want to discard later.
      </p>

      <CodeBlock language="bash" filename="git-branches.sh">
{`# List all local branches (* marks current branch)
git branch

# List all branches including remote-tracking branches
git branch -a

# Create a new branch (stays on current branch)
git branch feature/user-auth

# Create AND switch to new branch (most common workflow)
git checkout -b feature/user-auth

# Modern equivalent (Git 2.23+)
git switch -c feature/user-auth

# Switch to an existing branch
git checkout main
git switch main    # modern equivalent

# Rename current branch
git branch -m new-name

# Delete a merged branch (safe — fails if unmerged)
git branch -d feature/user-auth

# Force delete (even if unmerged — permanent data loss risk!)
git branch -D feature/user-auth

# Merge a branch into current branch
git checkout main
git merge feature/user-auth

# Merge with no fast-forward (always create a merge commit)
git merge --no-ff feature/user-auth

# See which branches are merged into current branch
git branch --merged

# See which branches are NOT yet merged
git branch --no-merged`}
      </CodeBlock>

      <SectionHeader number={4} title="Rebase vs Merge" />
      <p>
        Both integrate changes from one branch into another. The difference is how they rewrite history —
        and this matters deeply for collaboration with a team.
      </p>

      <CompareTable
        leftLabel="git merge"
        rightLabel="git rebase"
        rows={[
          { label: 'History', left: 'Preserves all branch history + adds a merge commit', right: 'Rewrites commits onto target branch — linear history' },
          { label: 'Safety for shared branches', left: 'Safe on any branch including shared remote branches', right: 'Never rebase shared branches — rewrites history for others' },
          { label: 'Log readability', left: 'Shows when branches diverged and merged (more accurate)', right: 'Cleaner, linear log (looks like no branching happened)' },
          { label: 'Conflict handling', left: 'Resolve conflicts once during merge', right: 'May need to resolve conflicts for each replayed commit' },
          { label: 'Best used when', left: 'Merging completed feature into main branch', right: 'Updating your local feature branch with latest main changes' },
          { label: 'Commit count', left: 'Adds one merge commit to the log', right: 'No extra commits — rewrites existing ones' },
        ]}
      />

      <CodeBlock language="bash" filename="git-rebase.sh">
{`# On your feature branch, update it with latest main:
git checkout feature/my-feature
git rebase main   # replays your commits on top of latest main

# If conflicts arise during rebase:
# 1. Fix the conflict in the file
git add conflicted-file.js
git rebase --continue

# Abort the entire rebase (restore to pre-rebase state)
git rebase --abort

# Interactive rebase — squash, edit, reorder, drop commits:
git rebase -i HEAD~3   # edit the last 3 commits interactively
# In the editor: pick / squash / reword / edit / drop

# Squash all feature branch commits into one before merging:
# From main:
git merge --squash feature/my-feature
git commit -m "feat: complete user authentication feature"`}
      </CodeBlock>

      <SectionHeader number={5} title="Undoing Mistakes" />
      <p>
        This is where Git's real power shows. Almost nothing is truly lost in Git — every commit is
        preserved in the reflog for at least 30 days. But you need the right command for each scenario:
      </p>

      <VerticalSteps steps={[
        { title: 'Undo unstaged changes (restore from HEAD)', desc: 'Discard changes in working directory that have not been staged yet. This is irreversible for unsaved changes.' },
        { title: 'Undo staged changes (keep the edits)', desc: 'Move changes back from staging area to working directory. Your edits are preserved, just unstaged.' },
        { title: 'Amend the last commit', desc: 'Fix the commit message or add a forgotten file to the last commit. Only use this for commits that have NOT been pushed to a shared remote.' },
        { title: 'Revert a commit (safe for shared branches)', desc: 'Creates a new commit that undoes the changes from a previous commit. Preserves the full history — the safest undo for shared branches.' },
        { title: 'Reset to a previous commit', desc: 'Moves HEAD back to a past commit. Three modes: soft (keep staged), mixed (keep working dir), hard (discard everything). Dangerous on shared branches.' },
      ]} />

      <CodeBlock language="bash" filename="git-undo.sh">
{`# Discard unstaged changes in a specific file
git restore file.js
git checkout -- file.js   # older syntax (same effect)

# Discard ALL unstaged changes (irreversible!)
git restore .

# Unstage a file (move from staging back to working dir)
git restore --staged file.js
git reset HEAD file.js   # older syntax

# Unstage everything
git restore --staged .

# Amend the last commit message
git commit --amend -m "corrected commit message"

# Add forgotten file to last commit (same message)
git add forgotten-file.js
git commit --amend --no-edit

# Revert a specific commit (creates an undo commit)
git revert abc1234

# Reset to 1 commit back — keep changes staged
git reset --soft HEAD~1

# Reset to 1 commit back — keep changes in working dir (default)
git reset HEAD~1
git reset --mixed HEAD~1

# Reset to 1 commit back — DISCARD all changes (DANGEROUS!)
git reset --hard HEAD~1

# Recover deleted commits via reflog (within ~30 days)
git reflog                         # find lost commit hash
git checkout -b recovery abc1234   # create branch at lost commit`}
      </CodeBlock>

      <AlertBox type="warning" title="Never force push to main or master">
        `git push --force` on a shared branch rewrites remote history and breaks everyone else's
        local repositories. If you need to force push on your own feature branch,
        use `git push --force-with-lease` instead — it fails if someone else pushed since you last pulled.
      </AlertBox>

      <SectionHeader number={6} title="Working with Remotes" />

      <CodeBlock language="bash" filename="git-remotes.sh">
{`# List remotes with their URLs
git remote -v

# Add a remote (origin is the conventional default name)
git remote add origin https://github.com/user/repo.git

# Change a remote URL (e.g. after renaming a repo)
git remote set-url origin https://github.com/user/new-name.git

# Fetch changes from remote WITHOUT merging
git fetch origin

# Compare your local main with remote after fetching
git diff main origin/main

# Pull = fetch + merge (most common)
git pull origin main

# Pull with rebase instead of merge (linear history)
git pull --rebase origin main

# Push your branch to remote
git push origin feature/my-feature

# Push and set upstream tracking (first push of a new branch)
git push -u origin feature/my-feature
# After -u is set, you can just run: git push

# Delete a remote branch
git push origin --delete feature/old-branch`}
      </CodeBlock>

      <SectionHeader number={7} title="Stashing" />
      <p>
        Need to switch branches but have unfinished work you are not ready to commit? Stash saves your
        changes temporarily in a stack so you can switch contexts and come back later.
      </p>

      <CodeBlock language="bash" filename="git-stash.sh">
{`# Stash current changes (tracked files only)
git stash

# Stash with a descriptive message
git stash push -m "WIP: half-done auth refactor"

# Stash including untracked new files
git stash push -u -m "WIP: new feature including new files"

# List all stashes
git stash list
# → stash@{0}: WIP: half-done auth refactor
# → stash@{1}: WIP on main: abc1234 prev commit

# Apply the most recent stash (keeps it in stash list)
git stash apply

# Apply AND remove from stash list
git stash pop

# Apply a specific stash by index
git stash apply stash@{2}

# Show what a stash contains
git stash show stash@{0}
git stash show -p stash@{0}   # with full diff

# Drop a specific stash
git stash drop stash@{0}

# Drop all stashes
git stash clear`}
      </CodeBlock>

      <SectionHeader number={8} title="Tagging Releases" />
      <CodeBlock language="bash" filename="git-tags.sh">
{`# List all tags
git tag

# Create a lightweight tag (just a pointer to a commit)
git tag v1.0.0

# Create an annotated tag (recommended — stores metadata)
git tag -a v1.0.0 -m "Release version 1.0.0 — initial stable release"

# Tag a specific past commit
git tag -a v1.0.0 abc1234 -m "Release 1.0.0"

# Push a specific tag to remote
git push origin v1.0.0

# Push all tags to remote
git push origin --tags

# Delete a local tag
git tag -d v1.0.0

# Delete a remote tag
git push origin --delete v1.0.0

# Checkout the code at a specific tag (detached HEAD)
git checkout v1.0.0`}
      </CodeBlock>

      <SectionHeader number={9} title="Commit Message Best Practices" />

      <ErrorFix
        bad={`# Vague, useless commit messages
git commit -m "fix"
git commit -m "changes"
git commit -m "asdf"
git commit -m "WIP"
git commit -m "stuff"
git commit -m "final version"
git commit -m "final version 2"`}
        good={`# Conventional Commits format: type(scope): description
# Types: feat, fix, refactor, docs, test, chore, perf, style

git commit -m "feat(auth): add JWT refresh token rotation"
git commit -m "fix(api): handle null response from user service"
git commit -m "refactor(db): extract query builder to separate module"
git commit -m "docs(readme): add local development setup guide"
git commit -m "test(auth): add unit tests for token expiry edge cases"
git commit -m "perf(images): add lazy loading to product gallery"
git commit -m "chore(deps): upgrade Next.js 13 to 14"`}
        badLabel="Useless commit history"
        goodLabel="Conventional Commits format"
      />

      <QuickFact color="purple" label="Why Conventional Commits?">
        Conventional Commits format enables automated changelog generation, semantic versioning
        (auto-bump major/minor/patch based on commit type), and searchable history. Tools like
        semantic-release and release-please parse your commit messages to automate the entire
        release workflow.
      </QuickFact>

      <SectionHeader number={10} title="Git Flow — Team Branching Strategy" />

      <KeyPointsGrid
        columns={2}
        items={[
          {
            title: 'main (or master)',
            description: 'Always deployable to production. Only production-tested code lives here. Never commit directly to main — always merge via pull request after review.',
          },
          {
            title: 'develop',
            description: 'Integration branch for the next release. Features are merged here first for integration testing before going to main. Some teams skip this and merge directly to main.',
          },
          {
            title: 'feature/name',
            description: 'Branch from develop (or main). One feature per branch. Named descriptively: feature/user-auth, feature/payment-gateway. Merge back when complete and reviewed.',
          },
          {
            title: 'hotfix/name',
            description: 'Emergency production fix. Branch from main directly, fix the bug, then merge back to both main AND develop. Deploy immediately from main after merging.',
          },
          {
            title: 'release/1.2.0',
            description: 'Created from develop when preparing a release. Only bug fixes go in here. Merged to both main (tag the release) and develop when finished.',
          },
          {
            title: 'Trunk-based development (simpler alternative)',
            description: 'Skip the develop branch entirely. All features merge directly to main behind feature flags. Faster and simpler for small-to-medium teams with good CI/CD.',
          },
        ]}
      />

      <SectionHeader number={11} title="Advanced Commands Worth Knowing" />

      <CompareTable
        leftLabel="Command"
        rightLabel="When to Use It"
        rows={[
          { label: 'git cherry-pick abc1234', left: 'Apply a specific commit from another branch to current branch', right: 'Backporting a fix to an older release branch' },
          { label: 'git bisect start', left: 'Binary search through commits to find when a bug was introduced', right: 'You know it worked 3 months ago but not when it broke' },
          { label: 'git blame file.js', left: 'Show who last modified each line of a file and in which commit', right: 'Understanding why a line was written before changing it' },
          { label: 'git shortlog -sn', left: 'Summarize commit count per author', right: 'Team activity overview or contribution stats' },
          { label: 'git clean -fd', left: 'Remove all untracked files and directories', right: 'Clean build artifacts or generated files not in .gitignore' },
          { label: 'git worktree add', left: 'Check out multiple branches simultaneously in separate directories', right: 'Work on a hotfix while keeping feature branch open' },
        ]}
      />

      <FAQAccordion
        items={[
          {
            question: 'What is the difference between git pull and git fetch?',
            answer: '`git fetch` downloads changes from the remote but does not apply them to your working branch — it updates remote-tracking branches like origin/main. `git pull` equals git fetch plus git merge (or rebase if configured). Use fetch then inspect then merge for more control in team settings where you want to see what changed before integrating.',
          },
          {
            question: 'How do I undo a git push to a shared branch?',
            answer: 'If the branch is not shared with others: reset locally then `git push --force-with-lease`. If it is a shared branch that teammates have pulled: use `git revert <commit>` to create an undo commit and push that. Never force-push shared branches — it rewrites history that others already have locally.',
          },
          {
            question: 'What does detached HEAD state mean?',
            answer: 'HEAD normally points to a branch name, which points to a commit. In detached HEAD state, HEAD points directly to a commit hash — not a branch. Any commits you make in this state are orphaned and will be garbage-collected eventually. Fix it immediately: run `git checkout -b new-branch-name` to save your work onto a real branch.',
          },
          {
            question: 'Should I merge or rebase to keep my feature branch up to date with main?',
            answer: 'Rebase is generally preferred for keeping feature branches current: `git rebase main` from your feature branch gives you a linear history and cleaner diff when your PR is reviewed. But never rebase after other team members have pulled from your feature branch — they will have conflicts that are very hard to resolve.',
          },
          {
            question: 'How do I find the commit that introduced a bug?',
            answer: '`git bisect` — it is a binary search through your commit history. Run `git bisect start`, then `git bisect bad` (current state is broken) and `git bisect good <commit-hash>` (known good state). Git checks out the midpoint automatically. Test it, mark it good or bad, repeat. Git narrows it down in O(log n) steps.',
          },
          {
            question: 'What is the .gitignore file and what should I put in it?',
            answer: '.gitignore lists patterns of files and directories Git should not track. Typical contents: node_modules/, .env and .env.local (secrets), build output directories (dist/, .next/, target/), IDE files (.vscode/ settings, .idea/), OS files (.DS_Store, Thumbs.db), and log files (*.log). Use gitignore.io to generate a starter for your stack.',
          },
          {
            question: 'When should I use git stash vs creating a WIP commit?',
            answer: 'Stash for short interruptions (under an hour) — switching contexts quickly and coming back soon. WIP commit for longer interruptions or when you want to push the work-in-progress to a remote for backup. A WIP commit is safer because stashes can be accidentally dropped. Squash the WIP commit with `git rebase -i` before merging.',
          },
        ]}
      />
    </BlogLayoutWithSidebarAds>
  );
}
