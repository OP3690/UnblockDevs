'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, FlowDiagram, CompareTable, ErrorFix, VerticalSteps,
  CodeBlock, FAQAccordion, KeyPointsGrid, StatGrid, SectionHeader,
  QuickFact, TimelineViz,
} from '@/components/blog/BlogVisuals';

export default function GitCompleteGuideClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>Git Complete Guide — What, Why, How, and When to Use Every Command</h1>
      <p className="lead">
        Git is the version control system used by virtually every software team on earth. This guide covers
        everything from the mental model to advanced workflows: commits, branches, merging, rebasing, undoing
        mistakes, and real team collaboration patterns.
      </p>

      <StatGrid
        stats={[
          { value: '94%', label: 'of developers use Git', color: 'orange' },
          { value: '2005', label: 'created by Linus Torvalds', color: 'blue' },
          { value: '3 trees', label: 'working dir, index, HEAD', color: 'purple' },
          { value: '>30', label: 'commands in this guide', color: 'green' },
        ]}
      />

      <SectionHeader number={1} title="The Mental Model: 3 Trees" />
      <p>
        Git manages three "trees" (collections of files). Understanding these makes every command make sense:
      </p>

      <KeyPointsGrid
        columns={3}
        items={[
          {
            title: 'Working Directory',
            description: 'The actual files on your disk. Where you edit code. Changes here are "unstaged".',
          },
          {
            title: 'Staging Area (Index)',
            description: 'A snapshot of changes you\'ve marked to include in the next commit. `git add` moves files here.',
          },
          {
            title: 'Repository (HEAD)',
            description: 'The permanent history of commits. `git commit` moves staged changes here permanently.',
          },
        ]}
      />

      <FlowDiagram
        steps={[
          { label: 'Edit files (working dir)', color: 'zinc' },
          { label: 'git add (stage changes)', color: 'amber' },
          { label: 'git commit (save to history)', color: 'green' },
          { label: 'git push (share to remote)', color: 'blue' },
        ]}
      />

      <SectionHeader number={2} title="Essential Daily Commands" />

      <CodeBlock language="bash" filename="Setup">
{`# Configure your identity (once per machine)
git config --global user.name "Your Name"
git config --global user.email "you@example.com"

# Initialize a new repo
git init

# Clone an existing repo
git clone https://github.com/user/repo.git`}
      </CodeBlock>

      <CodeBlock language="bash" filename="Daily Workflow">
{`# Check what's changed
git status

# See the actual diff (unstaged changes)
git diff

# Stage specific files
git add file.js
git add .          # stage everything (use carefully)
git add -p         # interactively stage hunks (recommended!)

# Commit with message
git commit -m "feat: add user authentication"

# Stage + commit in one step (tracked files only)
git commit -am "fix: correct null check"

# View commit history
git log --oneline --graph --all`}
      </CodeBlock>

      <SectionHeader number={3} title="Branching and Merging" />
      <p>
        Branches are cheap in Git — they're just a pointer to a commit. Create a branch for every feature,
        bug fix, or experiment.
      </p>

      <CodeBlock language="bash" filename="Branch Commands">
{`# List all branches
git branch -a

# Create and switch to new branch
git checkout -b feature/user-auth
# Modern equivalent:
git switch -c feature/user-auth

# Switch branches
git checkout main
git switch main

# Merge a branch into current branch
git merge feature/user-auth

# Delete a merged branch
git branch -d feature/user-auth

# Force delete (unmerged branch)
git branch -D feature/user-auth`}
      </CodeBlock>

      <SectionHeader number={4} title="Rebase vs Merge" />
      <p>
        Both integrate changes from one branch into another. The difference is how they rewrite history.
      </p>

      <CompareTable
        leftLabel="git merge"
        rightLabel="git rebase"
        rows={[
          { label: 'History', left: 'Preserves all branch history + adds merge commit', right: 'Rewrites commits onto target branch — linear history' },
          { label: 'Safety', left: 'Safe to use on shared/remote branches', right: 'Never rebase shared branches (rewrites history)' },
          { label: 'Readability', left: 'Shows when branches diverged and merged', right: 'Cleaner, linear log' },
          { label: 'Conflict handling', left: 'Resolve once during merge', right: 'May need to resolve per commit' },
          { label: 'Use when', left: 'Merging feature into main', right: 'Updating feature branch with main changes' },
        ]}
      />

      <CodeBlock language="bash" filename="Rebase Workflow">
{`# On your feature branch, update it with latest main:
git checkout feature/my-feature
git rebase main  # replays your commits on top of main

# If conflicts: fix them, then:
git add .
git rebase --continue

# Abort if needed:
git rebase --abort

# Interactive rebase — squash, edit, reorder commits:
git rebase -i HEAD~3  # edit last 3 commits`}
      </CodeBlock>

      <SectionHeader number={5} title="Undoing Mistakes" />
      <p>
        This is where Git's power really shows. Almost nothing is truly lost — but you need the right command.
      </p>

      <VerticalSteps
        steps={[
          {
            title: 'Undo unstaged changes',
            description: 'Discard changes in working directory (not yet staged).',
            code: 'git restore file.js\ngit checkout -- file.js  # older syntax',
          },
          {
            title: 'Undo staged changes (keep edits)',
            description: 'Move changes back from staging area to working directory.',
            code: 'git restore --staged file.js\ngit reset HEAD file.js  # older syntax',
          },
          {
            title: 'Amend the last commit',
            description: 'Fix the message or add a forgotten file. Only for commits not yet pushed.',
            code: 'git commit --amend -m "corrected message"\ngit commit --amend --no-edit  # same message, add staged changes',
          },
          {
            title: 'Revert a commit (safe for shared branches)',
            description: 'Creates a new commit that undoes a previous one. Preserves history.',
            code: 'git revert abc1234  # creates an "undo" commit',
          },
          {
            title: 'Reset to a previous commit',
            description: 'Use with caution on shared branches — rewrites history.',
            code: 'git reset --soft HEAD~1   # undo commit, keep staged\ngit reset --hard HEAD~1   # undo commit + discard changes',
          },
        ]}
      />

      <AlertBox type="warning" title="Never force push to main/master">
        <code>git push --force</code> on a shared branch rewrites remote history and breaks everyone else's
        local repos. Use <code>git push --force-with-lease</code> on feature branches only, and never on main.
      </AlertBox>

      <SectionHeader number={6} title="Working with Remotes" />

      <CodeBlock language="bash" filename="Remote Commands">
{`# List remotes
git remote -v

# Add a remote
git remote add origin https://github.com/user/repo.git

# Fetch + merge remote changes
git pull origin main

# Fetch without merging (then inspect)
git fetch origin
git diff main origin/main

# Push changes
git push origin feature/my-feature

# Push and set upstream (first push of new branch)
git push -u origin feature/my-feature`}
      </CodeBlock>

      <SectionHeader number={7} title="Stashing" />
      <p>
        Need to switch branches but have unfinished work? Stash saves your changes temporarily.
      </p>

      <CodeBlock language="bash" filename="Stash Commands">
{`# Stash current changes
git stash
git stash push -m "WIP: half-done auth refactor"

# List stashes
git stash list

# Apply last stash (keeps stash)
git stash apply

# Apply + remove from stash list
git stash pop

# Apply specific stash
git stash apply stash@{2}

# Drop a stash
git stash drop stash@{0}

# Clear all stashes
git stash clear`}
      </CodeBlock>

      <SectionHeader number={8} title="Commit Message Best Practices" />

      <ErrorFix
        bad={`# Vague, useless messages
git commit -m "fix"
git commit -m "changes"
git commit -m "asdf"
git commit -m "WIP"`}
        good={`# Conventional Commits format: type(scope): description
git commit -m "feat(auth): add JWT refresh token rotation"
git commit -m "fix(api): handle null response from user service"
git commit -m "refactor(db): extract query builder to separate module"
git commit -m "docs(readme): add local development setup guide"
git commit -m "test(auth): add unit tests for token expiry edge cases"`}
        badLabel="Useless commit history"
        goodLabel="Conventional Commits"
      />

      <SectionHeader number={9} title="Git Flow — A Team Branching Strategy" />

      <KeyPointsGrid
        columns={2}
        items={[
          {
            title: 'main (or master)',
            description: 'Always deployable. Only production-tested code. Never commit directly here.',
          },
          {
            title: 'develop',
            description: 'Integration branch. Features merge here first for testing before going to main.',
          },
          {
            title: 'feature/name',
            description: 'Branch from develop. One feature per branch. Merge back to develop when done.',
          },
          {
            title: 'hotfix/name',
            description: 'Emergency fix. Branch from main, merge back to both main AND develop.',
          },
        ]}
      />

      <FAQAccordion
        items={[
          {
            question: 'What is the difference between git pull and git fetch?',
            answer: '`git fetch` downloads changes from the remote but doesn\'t apply them to your working branch. `git pull` = git fetch + git merge (or rebase if configured). Use fetch + inspect + merge for more control in team settings.',
          },
          {
            question: 'How do I undo a git push?',
            answer: 'If the branch is not shared: `git push --force-with-lease` after resetting locally. If it\'s a shared branch: use `git revert` to create an undo commit and push that. Never force-push shared branches.',
          },
          {
            question: 'What does detached HEAD state mean?',
            answer: 'HEAD normally points to a branch, which points to a commit. In detached HEAD, HEAD points directly to a commit — not a branch. Any commits you make won\'t belong to a branch and can be lost. Fix with: `git checkout -b new-branch` to save your work.',
          },
          {
            question: 'Should I merge or rebase to keep my feature branch up to date with main?',
            answer: 'Rebase is generally preferred: `git rebase main` from your feature branch gives you a linear history and easier conflict resolution. But never rebase branches that others have already pulled from.',
          },
          {
            question: 'How do I find the commit that introduced a bug?',
            answer: '`git bisect` — it\'s a binary search through your commit history. Run `git bisect start`, mark a good commit and a bad commit, then test each midpoint. Git automatically narrows it down in O(log n) steps.',
          },
        ]}
      />
    </BlogLayoutWithSidebarAds>
  );
}
