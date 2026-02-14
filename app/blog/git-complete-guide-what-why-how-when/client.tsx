'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Calendar, Clock, ArrowLeft, Copy, Check, GitBranch, GitCommit, GitMerge, GitPullRequest, GitBranchIcon, Code, Users, Shield, Zap, CheckCircle2, AlertCircle, Info } from 'lucide-react';
import toast from 'react-hot-toast';
import FAQSchema from '@/components/FAQSchema';
import BlogSocialShare from '@/components/BlogSocialShare';

export default function GitCompleteGuideClient() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopied(null), 2000);
  };

  const faqData = [
    {
      question: 'What is Git?',
      answer: 'Git is a distributed version control system (DVCS) designed to track changes in source code during software development. Created by Linus Torvalds in 2005, Git allows multiple developers to work on the same project simultaneously, track changes, revert to previous versions, and collaborate efficiently without overwriting each other\'s work.'
    },
    {
      question: 'Why should I use Git?',
      answer: 'Git provides version control, collaboration, backup, branching for parallel development, history tracking, and the ability to revert changes. It\'s essential for team collaboration, code review, maintaining project history, and managing releases. Git is the industry standard used by millions of developers worldwide.'
    },
    {
      question: 'How does Git work?',
      answer: 'Git works by creating snapshots (commits) of your project at different points in time. Each commit contains a complete copy of all files, along with metadata like author, timestamp, and commit message. Git stores these snapshots efficiently using compression and delta encoding. Developers can create branches to work on features independently, then merge changes back together.'
    },
    {
      question: 'When should I use Git?',
      answer: 'Use Git for any project where you want to track changes, collaborate with others, maintain history, or manage releases. It\'s essential for software development, but also useful for documentation, configuration files, design assets, and any files that change over time. Start using Git from day one of any project.'
    },
    {
      question: 'What is the difference between Git and GitHub?',
      answer: 'Git is the version control software that runs on your local machine. GitHub is a cloud-based hosting service that provides a web interface for Git repositories, collaboration tools, issue tracking, pull requests, and code review. You can use Git without GitHub, but GitHub makes collaboration much easier.'
    },
    {
      question: 'What are Git best practices?',
      answer: 'Best practices include: commit often with meaningful messages, use branches for features, keep commits focused and atomic, write clear commit messages, review changes before committing, use .gitignore for unnecessary files, never commit sensitive data, and regularly pull/push to stay synchronized with the team.'
    },
    {
      question: 'How do I learn Git?',
      answer: 'Start with basic commands (clone, add, commit, push, pull), practice on a test repository, learn branching and merging, understand the three states (working directory, staging area, repository), practice collaboration workflows, and gradually learn advanced features like rebase, stash, and cherry-pick. Practice is key to mastering Git.'
    },
    {
      question: 'What is a Git commit?',
      answer: 'A Git commit is a snapshot of your project at a specific point in time. It includes all changes you\'ve staged, along with metadata like author, timestamp, and a commit message. Commits create a history of your project and allow you to revert to previous states if needed.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <article className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-primary-700 bg-primary-50 border-2 border-primary-200 hover:bg-primary-100 hover:border-primary-300 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Developer's Study Materials</span>
          </Link>
          
          <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              February 1, 2026
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              25 min read
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Git Complete Guide: What, Why, How & When with Best Practices
          </h1>
          
          <p className="text-xl text-gray-600 leading-relaxed">
            Master Git version control from the ground up. Learn what Git is, why it's essential for developers, 
            how it works under the hood, when to use it, and industry best practices for effective collaboration and code management.
          </p>
        </div>

        {/* Table of Contents */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-3">Table of Contents</h2>
          <ul className="space-y-2 text-sm">
            <li><a href="#what-is-git" className="text-blue-600 hover:underline">What is Git?</a></li>
            <li><a href="#why-use-git" className="text-blue-600 hover:underline">Why Use Git?</a></li>
            <li><a href="#how-git-works" className="text-blue-600 hover:underline">How Git Works</a></li>
            <li><a href="#when-to-use-git" className="text-blue-600 hover:underline">When to Use Git</a></li>
            <li><a href="#git-fundamentals" className="text-blue-600 hover:underline">Git Fundamentals</a></li>
            <li><a href="#best-practices" className="text-blue-600 hover:underline">Best Practices</a></li>
            <li><a href="#workflow" className="text-blue-600 hover:underline">Git Workflow</a></li>
            <li><a href="#collaboration" className="text-blue-600 hover:underline">Collaboration Strategies</a></li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="prose prose-lg max-w-none">
          
          {/* What is Git */}
          <section id="what-is-git" className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <GitBranch className="w-8 h-8 text-blue-600" />
              What is Git?
            </h2>
            
            <p className="text-gray-700 mb-4 leading-relaxed">
              <strong>Git</strong> is a distributed version control system (DVCS) designed to handle everything from small 
              to very large projects with speed and efficiency. Created by Linus Torvalds in 2005 for Linux kernel development, 
              Git has become the de facto standard for version control in software development.
            </p>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg mb-6 border border-blue-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Key Characteristics of Git</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Distributed:</strong> Every developer has a complete copy of the repository, including full history</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Fast:</strong> Most operations are performed locally, making Git extremely fast</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Branching & Merging:</strong> Lightweight branching allows for easy parallel development</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Data Integrity:</strong> Uses SHA-1 hashing to ensure data integrity and prevent corruption</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Open Source:</strong> Free and open-source software under GPL-2.0 license</span>
                </li>
              </ul>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Git vs. Other Version Control Systems</h3>
            
            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse bg-white rounded-lg shadow-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Feature</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Git</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">SVN</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Mercurial</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">Architecture</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700 font-semibold">Distributed</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">Centralized</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">Distributed</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">Speed</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700 font-semibold">Very Fast</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">Slower</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">Fast</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">Branching</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700 font-semibold">Lightweight</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">Heavy</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">Lightweight</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">Offline Work</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700 font-semibold">Yes</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">Limited</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">Yes</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">Market Share</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700 font-semibold">Dominant</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">Declining</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">Small</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Why Use Git */}
          <section id="why-use-git" className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Zap className="w-8 h-8 text-yellow-600" />
              Why Use Git?
            </h2>

            <p className="text-gray-700 mb-6 leading-relaxed">
              Git solves critical problems in software development that every developer faces. Here's why Git has become 
              the industry standard:
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Shield className="w-6 h-6 text-green-600" />
                  Version Control & History
                </h3>
                <p className="text-gray-700 mb-3">
                  Track every change to your codebase with complete history. Know who changed what, when, and why. 
                  Revert to any previous version instantly if something breaks.
                </p>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Complete change history</li>
                  <li>• Blame tracking (who wrote what)</li>
                  <li>• Easy rollback to previous versions</li>
                  <li>• Compare versions side-by-side</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Users className="w-6 h-6 text-blue-600" />
                  Team Collaboration
                </h3>
                <p className="text-gray-700 mb-3">
                  Multiple developers can work on the same project simultaneously without conflicts. Git merges changes 
                  intelligently and highlights conflicts when they occur.
                </p>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Parallel development</li>
                  <li>• Conflict resolution</li>
                  <li>• Code review workflows</li>
                  <li>• Pull request integration</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <GitBranch className="w-6 h-6 text-purple-600" />
                  Branching & Experimentation
                </h3>
                <p className="text-gray-700 mb-3">
                  Create branches to experiment with new features without affecting the main codebase. Merge when ready, 
                  or delete if the experiment fails.
                </p>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Feature branches</li>
                  <li>• Safe experimentation</li>
                  <li>• Easy branch switching</li>
                  <li>• Parallel feature development</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Code className="w-6 h-6 text-indigo-600" />
                  Backup & Recovery
                </h3>
                <p className="text-gray-700 mb-3">
                  Every clone is a full backup. If your computer crashes, you can recover everything from any team member's 
                  repository or remote server.
                </p>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Distributed backups</li>
                  <li>• Remote repository sync</li>
                  <li>• Data integrity checks</li>
                  <li>• Disaster recovery</li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border border-green-200 mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Real-World Benefits</h3>
              <div className="space-y-3 text-gray-700">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong>Industry Standard:</strong> 90%+ of software projects use Git. Learning Git is essential for any developer career.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong>Open Source Contribution:</strong> Contribute to open source projects on GitHub, GitLab, and other platforms.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong>CI/CD Integration:</strong> Git integrates seamlessly with continuous integration and deployment pipelines.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong>Code Review:</strong> Enable pull requests and code reviews for better code quality and knowledge sharing.
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* How Git Works */}
          <section id="how-git-works" className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Code className="w-8 h-8 text-indigo-600" />
              How Git Works
            </h2>

            <p className="text-gray-700 mb-6 leading-relaxed">
              Understanding how Git works internally helps you use it more effectively. Git's architecture is based on 
              snapshots, not differences.
            </p>

            <div className="bg-white border-2 border-gray-200 rounded-lg p-6 mb-6 shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">The Three States of Git</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Working Directory</h4>
                    <p className="text-gray-700 text-sm">
                      Your actual project files on disk. When you edit files, you're modifying the working directory. 
                      Files here are either <strong>tracked</strong> (known to Git) or <strong>untracked</strong> (new files).
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-yellow-600 font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Staging Area (Index)</h4>
                    <p className="text-gray-700 text-sm">
                      A preview of your next commit. Use <code className="bg-gray-100 px-1 rounded">git add</code> to 
                      stage changes. The staging area lets you craft commits precisely, selecting which changes to include.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Repository (.git directory)</h4>
                    <p className="text-gray-700 text-sm">
                      The Git database storing all commits, branches, tags, and metadata. When you commit, Git creates a 
                      snapshot and stores it in the repository. This is your project's complete history.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Git's Data Model</h3>
            
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg border border-purple-200 mb-6">
              <p className="text-gray-700 mb-4">
                Git stores data as a series of snapshots. Each commit is a complete snapshot of your project at that moment, 
                but Git is smart about storage:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Snapshots, not Diffs:</strong> Unlike other VCS, Git stores full snapshots, making operations fast</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Compression:</strong> Unchanged files are stored as links to previous snapshots, saving space</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span><strong>SHA-1 Hashing:</strong> Every object gets a unique 40-character hash based on its content</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Content-Addressable:</strong> Files are stored by their hash, ensuring data integrity</span>
                </li>
              </ul>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">Basic Git Workflow</h3>
            
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">1</div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Modify Files</h4>
                    <p className="text-gray-700 text-sm mb-2">Edit files in your working directory</p>
                    <code className="block bg-gray-100 p-2 rounded text-sm"># Files are now modified</code>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-yellow-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">2</div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Stage Changes</h4>
                    <p className="text-gray-700 text-sm mb-2">Add files to staging area</p>
                    <div className="flex items-center gap-2">
                      <code className="flex-1 bg-gray-100 p-2 rounded text-sm">git add file.txt</code>
                      <button
                        onClick={() => copyToClipboard('git add file.txt', 'git-add')}
                        className="p-2 bg-gray-200 hover:bg-gray-300 rounded transition-colors"
                      >
                        {copied === 'git-add' ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">3</div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Commit</h4>
                    <p className="text-gray-700 text-sm mb-2">Create a snapshot in repository</p>
                    <div className="flex items-center gap-2">
                      <code className="flex-1 bg-gray-100 p-2 rounded text-sm">git commit -m "Add new feature"</code>
                      <button
                        onClick={() => copyToClipboard('git commit -m "Add new feature"', 'git-commit')}
                        className="p-2 bg-gray-200 hover:bg-gray-300 rounded transition-colors"
                      >
                        {copied === 'git-commit' ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">4</div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Push</h4>
                    <p className="text-gray-700 text-sm mb-2">Upload commits to remote repository</p>
                    <div className="flex items-center gap-2">
                      <code className="flex-1 bg-gray-100 p-2 rounded text-sm">git push origin main</code>
                      <button
                        onClick={() => copyToClipboard('git push origin main', 'git-push')}
                        className="p-2 bg-gray-200 hover:bg-gray-300 rounded transition-colors"
                      >
                        {copied === 'git-push' ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* When to Use Git */}
          <section id="when-to-use-git" className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Clock className="w-8 h-8 text-orange-600" />
              When to Use Git?
            </h2>

            <p className="text-gray-700 mb-6 leading-relaxed">
              Git is useful in many scenarios beyond just software development. Here's when you should use Git:
            </p>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg border-l-4 border-blue-500 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Software Development Projects</h3>
                <p className="text-gray-700 mb-3">
                  <strong>Always use Git</strong> for any software project, regardless of size. Even solo projects benefit from 
                  version history, branching, and the ability to experiment safely.
                </p>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Web applications (React, Vue, Angular, etc.)</li>
                  <li>• Mobile apps (iOS, Android)</li>
                  <li>• Backend services and APIs</li>
                  <li>• Desktop applications</li>
                  <li>• Scripts and automation tools</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg border-l-4 border-green-500 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Documentation Projects</h3>
                <p className="text-gray-700 mb-3">
                  Track changes to documentation, wikis, and technical writing. Collaborate on documentation with 
                  pull requests and reviews.
                </p>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Technical documentation</li>
                  <li>• API documentation</li>
                  <li>• User manuals</li>
                  <li>• Blog posts and articles</li>
                  <li>• Markdown-based wikis</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg border-l-4 border-purple-500 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Configuration & Infrastructure</h3>
                <p className="text-gray-700 mb-3">
                  Version control for configuration files, infrastructure as code, and deployment scripts. Track changes 
                  to server configs and infrastructure.
                </p>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Infrastructure as Code (Terraform, Ansible)</li>
                  <li>• Docker configurations</li>
                  <li>• CI/CD pipeline configs</li>
                  <li>• Environment configurations</li>
                  <li>• Kubernetes manifests</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg border-l-4 border-yellow-500 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Design & Creative Assets</h3>
                <p className="text-gray-700 mb-3">
                  While Git isn't ideal for binary files, it can track design assets, especially when using tools like 
                  Git LFS (Large File Storage).
                </p>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Design system files</li>
                  <li>• SVG graphics</li>
                  <li>• Font files (with Git LFS)</li>
                  <li>• Design specifications</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-yellow-600" />
                When NOT to Use Git
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Very large binary files (use Git LFS or external storage)</li>
                <li>• Generated files that can be recreated (add to .gitignore)</li>
                <li>• Sensitive data like passwords, API keys (use environment variables)</li>
                <li>• Temporary files and caches</li>
                <li>• Dependencies that can be installed (use package managers)</li>
              </ul>
            </div>
          </section>

          {/* Git Fundamentals */}
          <section id="git-fundamentals" className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Git Fundamentals</h2>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <GitBranch className="w-6 h-6 text-blue-600" />
                  Repository
                </h3>
                <p className="text-gray-700 text-sm mb-3">
                  A repository (repo) is a directory containing your project files and the entire Git history. 
                  Initialize with <code className="bg-gray-100 px-1 rounded">git init</code> or clone an existing one.
                </p>
                <div className="bg-gray-50 p-3 rounded text-xs">
                  <code>git init</code> - Create new repository<br />
                  <code>git clone &lt;url&gt;</code> - Copy existing repository
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <GitCommit className="w-6 h-6 text-green-600" />
                  Commit
                </h3>
                <p className="text-gray-700 text-sm mb-3">
                  A commit is a snapshot of your project at a point in time. Each commit has a unique hash, 
                  author, timestamp, and message describing the changes.
                </p>
                <div className="bg-gray-50 p-3 rounded text-xs">
                  <code>git commit -m "message"</code> - Create commit<br />
                  <code>git log</code> - View commit history
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <GitBranchIcon className="w-6 h-6 text-purple-600" />
                  Branch
                </h3>
                <p className="text-gray-700 text-sm mb-3">
                  A branch is a parallel line of development. The default branch is usually <code className="bg-gray-100 px-1 rounded">main</code> 
                  or <code className="bg-gray-100 px-1 rounded">master</code>. Create branches for features, fixes, or experiments.
                </p>
                <div className="bg-gray-50 p-3 rounded text-xs">
                  <code>git branch feature</code> - Create branch<br />
                  <code>git checkout feature</code> - Switch branch
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <GitMerge className="w-6 h-6 text-orange-600" />
                  Merge
                </h3>
                <p className="text-gray-700 text-sm mb-3">
                  Merging combines changes from one branch into another. Git automatically merges when possible, 
                  or asks you to resolve conflicts manually.
                </p>
                <div className="bg-gray-50 p-3 rounded text-xs">
                  <code>git merge feature</code> - Merge branch<br />
                  <code>git merge --abort</code> - Cancel merge
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <GitPullRequest className="w-6 h-6 text-indigo-600" />
                  Remote
                </h3>
                <p className="text-gray-700 text-sm mb-3">
                  A remote is a version of your repository hosted elsewhere (GitHub, GitLab, etc.). 
                  Push your commits to share, pull to get updates.
                </p>
                <div className="bg-gray-50 p-3 rounded text-xs">
                  <code>git remote add origin &lt;url&gt;</code> - Add remote<br />
                  <code>git push origin main</code> - Upload commits
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Shield className="w-6 h-6 text-red-600" />
                  .gitignore
                </h3>
                <p className="text-gray-700 text-sm mb-3">
                  A <code className="bg-gray-100 px-1 rounded">.gitignore</code> file tells Git which files to ignore. 
                  Essential for excluding dependencies, build artifacts, and sensitive data.
                </p>
                <div className="bg-gray-50 p-3 rounded text-xs">
                  <code>node_modules/</code> - Ignore folder<br />
                  <code>*.log</code> - Ignore file pattern
                </div>
              </div>
            </div>
          </section>

          {/* Best Practices */}
          <section id="best-practices" className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Git Best Practices</h2>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Commit Often, Commit Small</h3>
                <p className="text-gray-700 mb-3">
                  Make frequent, small commits rather than large, infrequent ones. Each commit should represent 
                  a logical, complete change.
                </p>
                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
                  <p className="text-sm font-semibold text-gray-900 mb-2">✅ Good:</p>
                  <code className="block bg-white p-2 rounded text-sm mb-2">git commit -m "Add user authentication"</code>
                  <code className="block bg-white p-2 rounded text-sm">git commit -m "Fix login validation bug"</code>
                </div>
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg mt-3">
                  <p className="text-sm font-semibold text-gray-900 mb-2">❌ Bad:</p>
                  <code className="block bg-white p-2 rounded text-sm">git commit -m "Updated stuff"</code>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Write Meaningful Commit Messages</h3>
                <p className="text-gray-700 mb-3">
                  Commit messages should clearly describe what changed and why. Follow the conventional commit format.
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-xs text-gray-600 mb-2">Format: <code>&lt;type&gt;: &lt;subject&gt;</code></p>
                  <div className="space-y-1 text-sm">
                    <code className="block">feat: Add user registration form</code>
                    <code className="block">fix: Resolve memory leak in data processor</code>
                    <code className="block">docs: Update API documentation</code>
                    <code className="block">refactor: Simplify authentication logic</code>
                    <code className="block">test: Add unit tests for payment module</code>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Use Branches for Features</h3>
                <p className="text-gray-700 mb-3">
                  Create a new branch for each feature, bug fix, or experiment. Keep the main branch stable and production-ready.
                </p>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm font-semibold text-gray-900 mb-2">Branch Naming Conventions:</p>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li><code>feature/user-authentication</code> - New features</li>
                    <li><code>fix/login-bug</code> - Bug fixes</li>
                    <li><code>hotfix/security-patch</code> - Urgent fixes</li>
                    <li><code>refactor/auth-module</code> - Code refactoring</li>
                    <li><code>docs/api-update</code> - Documentation</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">4. Review Before Committing</h3>
                <p className="text-gray-700 mb-3">
                  Always review your changes with <code className="bg-gray-100 px-1 rounded">git status</code> and 
                  <code className="bg-gray-100 px-1 rounded">git diff</code> before committing. Make sure you're committing 
                  the right files.
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <code className="block text-sm mb-2">git status</code>
                  <code className="block text-sm mb-2">git diff</code>
                  <code className="block text-sm">git diff --staged</code>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">5. Keep Commits Atomic</h3>
                <p className="text-gray-700 mb-3">
                  Each commit should represent one logical change. If you need to undo a change, atomic commits make it easy.
                </p>
                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
                  <p className="text-sm font-semibold text-gray-900 mb-2">✅ Atomic Commit:</p>
                  <p className="text-sm text-gray-700">One commit = one feature, one bug fix, or one refactoring</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">6. Never Commit Sensitive Data</h3>
                <p className="text-gray-700 mb-3">
                  Never commit passwords, API keys, tokens, or other sensitive information. Use environment variables 
                  and add sensitive files to <code className="bg-gray-100 px-1 rounded">.gitignore</code>.
                </p>
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
                  <p className="text-sm font-semibold text-gray-900 mb-2">❌ Never Commit:</p>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• Passwords and secrets</li>
                    <li>• API keys and tokens</li>
                    <li>• Private keys (.pem, .key files)</li>
                    <li>• Environment files with secrets (.env)</li>
                    <li>• Database credentials</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">7. Use .gitignore Properly</h3>
                <p className="text-gray-700 mb-3">
                  Create a comprehensive <code className="bg-gray-100 px-1 rounded">.gitignore</code> file to exclude 
                  unnecessary files from version control.
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-xs text-gray-600 mb-2">Example .gitignore for Node.js:</p>
                  <pre className="text-xs bg-white p-3 rounded border overflow-x-auto">
{`node_modules/
.env
.env.local
dist/
build/
*.log
.DS_Store
coverage/
.idea/
.vscode/`}
                  </pre>
                  <button
                    onClick={() => copyToClipboard(`node_modules/\n.env\n.env.local\ndist/\nbuild/\n*.log\n.DS_Store\ncoverage/\n.idea/\n.vscode/`, 'gitignore')}
                    className="mt-2 px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors"
                  >
                    {copied === 'gitignore' ? '✓ Copied' : 'Copy .gitignore'}
                  </button>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">8. Pull Before Push</h3>
                <p className="text-gray-700 mb-3">
                  Always pull the latest changes before pushing your commits. This prevents conflicts and keeps your 
                  local repository in sync.
                </p>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <code className="block text-sm mb-2">git pull origin main</code>
                  <code className="block text-sm">git push origin main</code>
                </div>
              </div>
            </div>
          </section>

          {/* Workflow */}
          <section id="workflow" className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Git Workflow</h2>

            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-lg border border-indigo-200 mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Feature Branch Workflow</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">1</div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Create Feature Branch</h4>
                    <code className="block bg-white p-2 rounded text-sm">git checkout -b feature/new-feature</code>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">2</div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Make Changes & Commit</h4>
                    <code className="block bg-white p-2 rounded text-sm mb-1">git add .</code>
                    <code className="block bg-white p-2 rounded text-sm">git commit -m "feat: Add new feature"</code>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-yellow-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">3</div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Push to Remote</h4>
                    <code className="block bg-white p-2 rounded text-sm">git push origin feature/new-feature</code>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">4</div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Create Pull Request</h4>
                    <p className="text-sm text-gray-700">Open a pull request on GitHub/GitLab for code review</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">5</div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Merge to Main</h4>
                    <code className="block bg-white p-2 rounded text-sm">git checkout main</code>
                    <code className="block bg-white p-2 rounded text-sm">git merge feature/new-feature</code>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Collaboration */}
          <section id="collaboration" className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Collaboration Strategies</h2>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Git Flow</h3>
                <p className="text-gray-700 mb-3">
                  A branching model with main branches (<code className="bg-gray-100 px-1 rounded">main</code>, 
                  <code className="bg-gray-100 px-1 rounded">develop</code>) and supporting branches 
                  (<code className="bg-gray-100 px-1 rounded">feature</code>, <code className="bg-gray-100 px-1 rounded">release</code>, 
                  <code className="bg-gray-100 px-1 rounded">hotfix</code>).
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm font-semibold text-gray-900 mb-2">Branch Types:</p>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li><strong>main:</strong> Production-ready code</li>
                    <li><strong>develop:</strong> Integration branch for features</li>
                    <li><strong>feature/*:</strong> New features</li>
                    <li><strong>release/*:</strong> Preparing for release</li>
                    <li><strong>hotfix/*:</strong> Urgent production fixes</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">GitHub Flow</h3>
                <p className="text-gray-700 mb-3">
                  A simpler workflow: create feature branches from <code className="bg-gray-100 px-1 rounded">main</code>, 
                  work on features, create pull requests, and merge back to <code className="bg-gray-100 px-1 rounded">main</code>.
                </p>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-700">
                    Perfect for continuous deployment and smaller teams. Simpler than Git Flow but equally effective.
                  </p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Trunk-Based Development</h3>
                <p className="text-gray-700 mb-3">
                  Developers work on short-lived feature branches (1-2 days) and merge frequently to main. 
                  Requires strong testing and CI/CD.
                </p>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-700">
                    Best for teams with mature CI/CD pipelines and comprehensive test coverage.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Conclusion */}
          <section className="mb-12">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8 rounded-lg shadow-lg">
              <h2 className="text-3xl font-bold mb-4">Conclusion</h2>
              <p className="text-lg leading-relaxed mb-4">
                Git is an essential tool for every developer. Understanding what Git is, why it's important, how it works, 
                and when to use it will make you a more effective developer and better collaborator.
              </p>
              <p className="text-lg leading-relaxed">
                Start using Git today, even for small projects. The habits you build now will serve you throughout your career. 
                Practice the best practices, experiment with workflows, and don't be afraid to make mistakes—Git makes it 
                easy to recover from them.
              </p>
            </div>
          </section>
        </div>

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

