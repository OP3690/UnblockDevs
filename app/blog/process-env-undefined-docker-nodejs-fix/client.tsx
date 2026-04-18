'use client';

import Link from 'next/link';
import { ArrowLeft, Code, AlertTriangle, Settings, CheckCircle, HelpCircle, Clock, Globe, Zap, Key, FileText, Server, Shield, AlertCircle } from 'lucide-react';
import FAQSchema from '@/components/FAQSchema';
import BlogSocialShare from '@/components/BlogSocialShare';
import NewsletterSignup from '@/components/NewsletterSignup';
import FeedbackForm from '@/components/FeedbackForm';
import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';

export default function ProcessEnvUndefinedDockerClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-cyan-50 to-blue-50">
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/blog" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-primary-700 bg-primary-50 border-2 border-primary-200 hover:bg-primary-100 hover:border-primary-300 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Developer&apos;s Study Materials
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg">
              <Server className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Why process.env Variables Are Undefined in Docker (And How to Fix It)</h1>
              <p className="text-sm text-gray-500 mt-1">ARG vs ENV, docker-compose, --env-file, and Docker Secrets explained (2026)</p>
            </div>
          </div>
        </div>
      </header>

      {/* Floating Social Share Bar */}
      <BlogSocialShare
        title="Why process.env Variables Are Undefined in Docker (And How to Fix It)"
        description="Your Node.js app works locally but process.env is undefined in Docker. Here's exactly why and 4 ways to fix it."
        variant="floating"
      />

      <BlogLayoutWithSidebarAds>
        <FAQSchema
          faqs={[
            {
              question: 'Why is process.env undefined in Docker?',
              answer: 'Docker containers run in completely isolated environments. Your local .env file is not automatically copied or mounted into the container. Unless you explicitly pass environment variables using Dockerfile ENV directives, the docker run --env-file flag, docker-compose environment section, or docker run -e flags, process.env will return undefined for any variables your app expects.',
            },
            {
              question: 'How do I pass environment variables to a Docker container?',
              answer: 'There are 4 main methods: (1) Dockerfile ENV directive for build-time defaults, (2) docker run --env-file .env to pass a local .env file at runtime, (3) docker-compose.yml environment section or env_file key for orchestrated deployments, (4) Docker Secrets for sensitive production data. For development, --env-file or docker-compose env_file is the most convenient approach.',
            },
            {
              question: 'What is the difference between ARG and ENV in Dockerfile?',
              answer: 'ARG defines a build-time variable available only during docker build — it is NOT available to the running container via process.env. ENV defines a runtime variable that IS available to the container as an environment variable and persists in the image. Use ARG for build-time customisation (base image version, build flags). Use ENV for runtime config that process.env should see. A common mistake is using ARG when ENV is needed.',
            },
            {
              question: 'How do I use .env file with Docker Compose?',
              answer: 'Two approaches: (1) Use the env_file key: env_file: [.env] — Docker Compose reads the file and injects each variable as an environment variable. (2) Use the environment key with variable substitution: environment: - DATABASE_URL=${DATABASE_URL} — this reads from the shell environment where you run docker-compose up. You can also set a custom env file for variable substitution with --env-file flag when running docker compose.',
            },
            {
              question: 'Should I COPY .env file into Docker image?',
              answer: 'No — never COPY .env into your Docker image. The .env file containing secrets becomes baked into an image layer that is permanent and visible via docker history. Anyone with pull access to the image can extract the secrets. Instead, pass environment variables at runtime using --env-file, docker-compose env_file, or your platform\'s secret management. If you must include a .env for build purposes, use a multi-stage build and leave the secret file in the first stage only.',
            },
          ]}
        />

        <article className="bg-white rounded-xl shadow-lg p-8 md:p-12">

          {/* Definition Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <HelpCircle className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Definition: Why Docker Does Not See Your .env File</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              A Docker container is a completely isolated process with its own filesystem, network namespace, and environment. When Docker starts a container from an image, it does <strong>not</strong> inherit the host machine&apos;s environment variables, and it does <strong>not</strong> automatically read any <code className="bg-gray-100 px-1 rounded">.env</code> files from your project directory.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Your local Node.js app reads <code className="bg-gray-100 px-1 rounded">.env</code> because you use dotenv and the file exists on your host machine&apos;s disk. Inside Docker, that file does not exist unless you explicitly copy it in or mount it. Even if you do copy it, dotenv still needs to load it — and even then, putting secrets in a Docker image is a serious security mistake.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              The correct Docker approach is to <strong>inject environment variables at runtime</strong> using Docker&apos;s built-in mechanisms — <code className="bg-gray-100 px-1 rounded">ENV</code> in the Dockerfile for defaults, <code className="bg-gray-100 px-1 rounded">--env-file</code> or <code className="bg-gray-100 px-1 rounded">-e</code> flags for <code className="bg-gray-100 px-1 rounded">docker run</code>, or the <code className="bg-gray-100 px-1 rounded">environment</code> / <code className="bg-gray-100 px-1 rounded">env_file</code> keys in <code className="bg-gray-100 px-1 rounded">docker-compose.yml</code>. This way, your app receives <code className="bg-gray-100 px-1 rounded">process.env.DATABASE_URL</code> without any .env file inside the container at all.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
              <p className="text-blue-800 text-sm">
                <strong>Key Point:</strong> Docker containers are isolated. Your .env file does not exist inside the container. You must explicitly inject environment variables using Docker&apos;s runtime mechanisms — never by copying the .env file into the image.
              </p>
            </div>
          </section>

          {/* What Section: ARG vs ENV */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <Globe className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">What: Docker ARG vs ENV — Build-time vs Runtime</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-6">
              Understanding the difference between <code className="bg-gray-100 px-1 rounded">ARG</code> and <code className="bg-gray-100 px-1 rounded">ENV</code> is the single most important concept for fixing <code className="bg-gray-100 px-1 rounded">process.env</code> issues in Docker.
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-900 text-white">
                    <th className="text-left p-3 rounded-tl-lg">Feature</th>
                    <th className="text-left p-3 bg-blue-700">ARG (build-time)</th>
                    <th className="text-left p-3 bg-green-700 rounded-tr-lg">ENV (runtime)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <td className="p-3 font-medium">Available during docker build</td>
                    <td className="p-3 text-green-700">Yes</td>
                    <td className="p-3 text-green-700">Yes (after ENV instruction)</td>
                  </tr>
                  <tr className="bg-white border-b border-gray-200">
                    <td className="p-3 font-medium">Available in running container</td>
                    <td className="p-3 text-red-700">No — not in process.env</td>
                    <td className="p-3 text-green-700">Yes — in process.env</td>
                  </tr>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <td className="p-3 font-medium">Syntax in Dockerfile</td>
                    <td className="p-3"><code>ARG MY_VAR=default</code></td>
                    <td className="p-3"><code>ENV MY_VAR=value</code></td>
                  </tr>
                  <tr className="bg-white border-b border-gray-200">
                    <td className="p-3 font-medium">Passed at build time</td>
                    <td className="p-3"><code>--build-arg MY_VAR=val</code></td>
                    <td className="p-3">N/A (set in Dockerfile or at runtime)</td>
                  </tr>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <td className="p-3 font-medium">Overridable at runtime</td>
                    <td className="p-3 text-red-700">No</td>
                    <td className="p-3 text-green-700">Yes — with -e or --env-file</td>
                  </tr>
                  <tr className="bg-white border-b border-gray-200">
                    <td className="p-3 font-medium">Visible in docker history</td>
                    <td className="p-3 text-yellow-700">Yes (if used in RUN commands)</td>
                    <td className="p-3 text-red-700">Yes — avoid for secrets</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="p-3 font-medium">Best use case</td>
                    <td className="p-3">Base image version, build flags</td>
                    <td className="p-3">Runtime defaults (PORT, LOG_LEVEL)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-6">
              <pre className="text-sm"><code>{`# Common MISTAKE — using ARG when you need ENV
FROM node:20-alpine

ARG DATABASE_URL          # ← This is available during build only
RUN echo $DATABASE_URL    # ← Works here, during build
# But process.env.DATABASE_URL will be UNDEFINED in the running container!

COPY . .
RUN npm ci
CMD ["node", "server.js"]`}</code></pre>
            </div>

            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-6">
              <pre className="text-sm"><code>{`# Correct — using ENV for runtime variables
FROM node:20-alpine

# ENV is available in process.env inside the running container
ENV PORT=3000
ENV LOG_LEVEL=info
# Do NOT hardcode secrets here — inject them at runtime instead

WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .

EXPOSE 3000
CMD ["node", "server.js"]`}</code></pre>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Settings className="w-4 h-4 text-blue-600" />
                  Valid ARG use case
                </h4>
                <p className="text-gray-700 text-sm">Selecting the Node.js version: <code className="bg-gray-100 px-1 rounded">ARG NODE_VERSION=20</code>, then <code className="bg-gray-100 px-1 rounded">FROM node:{'{'}NODE_VERSION{'}'}-alpine</code>. Or a build-time flag: <code className="bg-gray-100 px-1 rounded">ARG BUILD_ENV=production</code> to control which npm scripts run during build.</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-green-600" />
                  Valid ENV use case
                </h4>
                <p className="text-gray-700 text-sm">Runtime defaults that are safe to bake into the image: <code className="bg-gray-100 px-1 rounded">ENV PORT=3000 NODE_ENV=production LOG_LEVEL=info</code>. These appear in process.env and can be overridden when running the container without rebuilding.</p>
              </div>
            </div>

            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg">
              <p className="text-amber-800 text-sm">
                <strong>ARG + ENV combo:</strong> You can combine both to allow a build-time argument to set an ENV value: <code>ARG DB_URL</code> then <code>ENV DATABASE_URL=$DB_URL</code>. This passes the value from build time into runtime — but be aware it gets baked into the image layer and is visible in docker history. Only use this for non-secret values.
              </p>
            </div>
          </section>

          {/* When Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">When: Situations That Cause process.env to Be Undefined in Docker</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              This problem appears in four distinct situations. Knowing which one you&apos;re hitting determines the correct fix:
            </p>

            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg border border-red-200">
                <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Missing ENV in Dockerfile</h3>
                  <p className="text-gray-700 text-sm">Your app expects <code className="bg-gray-100 px-1 rounded">process.env.PORT</code> but neither the Dockerfile has an <code className="bg-gray-100 px-1 rounded">ENV PORT=3000</code> directive nor is the value passed at runtime. The container starts with an empty environment for that variable.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-lg border border-orange-200">
                <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Using ARG where ENV is needed</h3>
                  <p className="text-gray-700 text-sm">You declare <code className="bg-gray-100 px-1 rounded">ARG DATABASE_URL</code> in the Dockerfile and pass <code className="bg-gray-100 px-1 rounded">--build-arg DATABASE_URL=...</code> at build time. The build succeeds but at runtime, <code className="bg-gray-100 px-1 rounded">process.env.DATABASE_URL</code> is undefined because ARG variables do not persist into the running container.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Not using --env-file when running docker run</h3>
                  <p className="text-gray-700 text-sm">You run <code className="bg-gray-100 px-1 rounded">docker run myapp</code> without the <code className="bg-gray-100 px-1 rounded">--env-file .env</code> flag. Your local .env file exists on disk but the container does not know about it — it was never mounted or referenced.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg border border-purple-200">
                <AlertCircle className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">docker-compose.yml missing environment config</h3>
                  <p className="text-gray-700 text-sm">You have a <code className="bg-gray-100 px-1 rounded">docker-compose.yml</code> but forgot to add the <code className="bg-gray-100 px-1 rounded">environment:</code> section or the <code className="bg-gray-100 px-1 rounded">env_file:</code> key. Compose will not automatically pass your shell environment or host .env file to the service unless explicitly configured.</p>
                </div>
              </div>
            </div>

            <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-lg">
              <p className="text-orange-800 text-sm">
                <strong>Quick diagnosis:</strong> Run <code className="bg-gray-100 px-1 rounded">docker exec &lt;container_id&gt; printenv</code> while your container is running. If your variable is not in the output, it was never injected. Compare against <code className="bg-gray-100 px-1 rounded">printenv</code> on your host machine to see what the container is missing.
              </p>
            </div>
          </section>

          {/* How To Section — 4 methods */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Code className="w-6 h-6 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">How To Fix It: 4 Methods</h2>
            </div>

            {/* Method 1: Dockerfile ENV */}
            <div className="mb-10">
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                Dockerfile ENV Directive (Non-secret defaults)
              </h3>
              <p className="text-gray-700 mb-4">
                Use the <code className="bg-gray-100 px-1 rounded">ENV</code> instruction in your Dockerfile to set default runtime values. These are baked into the image and appear in <code className="bg-gray-100 px-1 rounded">process.env</code> automatically. Good for non-sensitive config like port numbers, log levels, and feature flags.
              </p>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
                <pre className="text-sm"><code>{`# Dockerfile
FROM node:20-alpine

WORKDIR /app

# Set safe non-secret defaults with ENV
ENV PORT=3000 \
    NODE_ENV=production \
    LOG_LEVEL=info \
    CACHE_TTL=3600

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .

EXPOSE 3000

# Healthcheck using the PORT env var
HEALTHCHECK --interval=30s --timeout=5s \
  CMD wget -qO- http://localhost:\${PORT}/health || exit 1

CMD ["node", "server.js"]`}</code></pre>
              </div>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
                <pre className="text-sm"><code>{`# Your Node.js server — process.env.PORT is available
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000; // Gets 3000 from the ENV directive
const NODE_ENV = process.env.NODE_ENV; // Gets 'production' from ENV

app.get('/health', (req, res) => {
  res.json({ status: 'ok', env: NODE_ENV, port: PORT });
});

app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT} in \${NODE_ENV} mode\`);
});`}</code></pre>
              </div>
              <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg mb-4">
                <p className="text-amber-800 text-sm">
                  <strong>Override at runtime:</strong> ENV values in the Dockerfile are defaults. You can always override them when running the container with <code className="bg-gray-100 px-1 rounded">-e PORT=8080</code> or <code className="bg-gray-100 px-1 rounded">--env-file .env</code> without rebuilding the image.
                </p>
              </div>
            </div>

            {/* Method 2: docker run --env-file */}
            <div className="mb-10">
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span className="flex-shrink-0 w-8 h-8 bg-cyan-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                docker run --env-file (Development workflow)
              </h3>
              <p className="text-gray-700 mb-4">
                Pass your local <code className="bg-gray-100 px-1 rounded">.env</code> file directly to <code className="bg-gray-100 px-1 rounded">docker run</code> using the <code className="bg-gray-100 px-1 rounded">--env-file</code> flag. Docker reads each <code className="bg-gray-100 px-1 rounded">KEY=VALUE</code> line and injects them as environment variables. The file itself is never copied into the image — it is read on the host at runtime.
              </p>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
                <pre className="text-sm"><code>{`# Your local .env file (stays on host, never in image)
DATABASE_URL=postgresql://user:secret@localhost/mydb
REDIS_URL=redis://localhost:6379
STRIPE_SECRET_KEY=sk-test-YOUR_KEY
JWT_SECRET=my-super-secret-key
API_BASE_URL=http://localhost:8080`}</code></pre>
              </div>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
                <pre className="text-sm"><code>{`# Build the image (no secrets baked in)
docker build -t myapp .

# Run with env file — Docker reads .env from current directory
docker run --env-file .env -p 3000:3000 myapp

# Or pass specific env file paths
docker run --env-file ./config/.env.staging -p 3000:3000 myapp

# Mix: env file + individual overrides
docker run \
  --env-file .env \
  -e NODE_ENV=production \
  -e LOG_LEVEL=debug \
  -p 3000:3000 \
  myapp

# Verify variables are set inside the running container
docker exec <container_id> printenv DATABASE_URL`}</code></pre>
              </div>
              <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg mb-4">
                <p className="text-green-800 text-sm">
                  <strong>How Docker reads --env-file:</strong> Docker parses the file line by line, ignoring blank lines and lines starting with <code>#</code>. It does NOT expand shell variables or run subshells — so <code>DATABASE_URL=$(cat secret)</code> will not work. Values are taken literally.
                </p>
              </div>
            </div>

            {/* Method 3: docker-compose */}
            <div className="mb-10">
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                docker-compose.yml environment / env_file (Recommended for multi-service)
              </h3>
              <p className="text-gray-700 mb-4">
                Docker Compose offers two complementary approaches for environment variables. Use them together for the most flexible setup:
              </p>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
                <pre className="text-sm"><code>{`# docker-compose.yml
version: '3.9'

services:
  app:
    build: .
    ports:
      - "3000:3000"

    # Method A: env_file — reads the file and injects all variables
    env_file:
      - .env                    # loads base variables
      - .env.development        # loads dev overrides (if exists)

    # Method B: environment — explicit key=value or variable substitution
    environment:
      - NODE_ENV=development

      # Variable substitution: reads from host shell environment
      - DATABASE_URL=${DATABASE_URL}

      # Or set literal values directly
      - REDIS_URL=redis://redis:6379
      - LOG_LEVEL=debug

    depends_on:
      - db
      - redis

  db:
    image: postgres:16-alpine
    environment:
      - POSTGRES_DB=myapp_dev
      - POSTGRES_USER=myuser
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}  # from host env or .env
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    command: redis-server --requirepass ${REDIS_PASSWORD}

volumes:
  postgres_data:`}</code></pre>
              </div>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
                <pre className="text-sm"><code>{`# .env (in the same directory as docker-compose.yml)
# Docker Compose automatically reads this file for variable substitution
# in the compose file itself (the ${VAR} syntax above)

POSTGRES_PASSWORD=dev-password-local
REDIS_PASSWORD=redis-local-secret
DATABASE_URL=postgresql://myuser:dev-password-local@db/myapp_dev

# Note: Docker Compose reads .env for ${VAR} substitution in the YAML.
# For actual container env vars, use env_file: or environment: in the service.`}</code></pre>
              </div>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
                <pre className="text-sm"><code>{`# Run and check that env vars are injected correctly
docker compose up

# Verify in a running container
docker compose exec app printenv | grep DATABASE_URL

# Use a custom env file for variable substitution
docker compose --env-file .env.staging up

# Override a single variable for a one-off run
DATABASE_URL=postgresql://localhost/test docker compose up`}</code></pre>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg mb-4">
                <p className="text-blue-800 text-sm">
                  <strong>env_file vs environment precedence:</strong> When both are used on the same service, <code>environment:</code> values take precedence over <code>env_file:</code> values for any overlapping keys. Use <code>env_file</code> for the bulk of your config and <code>environment</code> for explicit overrides.
                </p>
              </div>
            </div>

            {/* Method 4: Docker Secrets */}
            <div className="mb-10">
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span className="flex-shrink-0 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                Docker Secrets (Production — sensitive data)
              </h3>
              <p className="text-gray-700 mb-4">
                Docker Secrets is the production-grade solution for sensitive values in Docker Swarm or Kubernetes. Secrets are mounted as files in <code className="bg-gray-100 px-1 rounded">/run/secrets/</code> inside the container — they are never exposed as environment variables directly, preventing accidental logging or process inspection leaks.
              </p>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
                <pre className="text-sm"><code>{`# Create a Docker secret (Docker Swarm)
echo "postgresql://user:prod-password@db.internal/prod" | \
  docker secret create database_url -

echo "sk_live_your_real_stripe_key" | \
  docker secret create stripe_secret_key -

# List secrets (values are never shown)
docker secret ls`}</code></pre>
              </div>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
                <pre className="text-sm"><code>{`# docker-compose.yml with secrets (Docker Swarm mode)
version: '3.9'

services:
  app:
    image: myapp:latest
    secrets:
      - database_url
      - stripe_secret_key
    environment:
      - NODE_ENV=production
      - PORT=3000
      # Do NOT put sensitive values here in production

secrets:
  database_url:
    external: true    # Secret was created with 'docker secret create'
  stripe_secret_key:
    external: true`}</code></pre>
              </div>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
                <pre className="text-sm"><code>{`// Node.js app — read secrets from files (not process.env)
const fs = require('fs');
const path = require('path');

function readSecret(secretName) {
  try {
    // Docker mounts secrets at /run/secrets/<secret_name>
    return fs.readFileSync(
      path.join('/run/secrets', secretName),
      'utf8'
    ).trim();
  } catch (err) {
    // Fallback to process.env for local dev (where secrets aren't mounted)
    return process.env[secretName.toUpperCase().replace(/-/g, '_')];
  }
}

const DATABASE_URL = readSecret('database_url');
const STRIPE_SECRET = readSecret('stripe_secret_key');

// Now use DATABASE_URL and STRIPE_SECRET as normal strings`}</code></pre>
              </div>
              <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded-r-lg mb-4">
                <p className="text-purple-800 text-sm">
                  <strong>Cloud alternatives to Docker Secrets:</strong> On Kubernetes use <code>kubectl create secret</code>. On AWS use AWS Secrets Manager or Parameter Store. On Google Cloud use Secret Manager. On Azure use Key Vault. These all mount secrets as files or inject them as environment variables with proper access control and audit logging.
                </p>
              </div>
            </div>

            <div className="mt-6 bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded-r-lg">
              <p className="text-indigo-800 text-sm">
                <strong>Which method to use?</strong> Local development → docker-compose with env_file pointing to your .env. CI/CD → inject via your pipeline&apos;s secret management (GitHub Secrets, GitLab CI variables). Staging → docker-compose environment with platform secrets. Production → platform secret manager or Docker Secrets.
              </p>
            </div>
          </section>

          {/* Common Mistakes Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-yellow-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Common Mistakes to Avoid</h2>
            </div>

            <div className="space-y-4 mb-6">
              <div className="p-5 bg-red-50 rounded-lg border border-red-200">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  Mistake 1: COPY .env into the Docker image
                </h3>
                <div className="bg-gray-900 text-gray-100 p-3 rounded-lg overflow-x-auto mb-3">
                  <pre className="text-sm"><code>{`# BAD — Never do this
FROM node:20-alpine
WORKDIR /app
COPY . .          # This copies .env into the image!
# OR
COPY .env .       # Explicitly worse — definitely don't do this
RUN npm ci
CMD ["node", "server.js"]`}</code></pre>
                </div>
                <p className="text-gray-700 text-sm mb-2">Why this is dangerous: the .env file with all your secrets becomes part of the image layer permanently. Anyone who can pull the image can run <code className="bg-gray-100 px-1 rounded">docker history myapp</code> or extract the layer to read the file. Even if you delete it in a later RUN command, it remains in the previous layer.</p>
                <div className="bg-gray-900 text-gray-100 p-3 rounded-lg overflow-x-auto">
                  <pre className="text-sm"><code>{`# GOOD — add .env to .dockerignore and pass vars at runtime
# .dockerignore
.env
.env.local
.env.*.local
.git
node_modules
*.log

# Dockerfile — no COPY .env
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .          # .dockerignore prevents .env from being copied
CMD ["node", "server.js"]

# Run with variables injected at runtime
docker run --env-file .env -p 3000:3000 myapp`}</code></pre>
                </div>
              </div>

              <div className="p-5 bg-orange-50 rounded-lg border border-orange-200">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-orange-600" />
                  Mistake 2: Using ARG instead of ENV for runtime variables
                </h3>
                <div className="bg-gray-900 text-gray-100 p-3 rounded-lg overflow-x-auto mb-3">
                  <pre className="text-sm"><code>{`# BAD
ARG DATABASE_URL
# process.env.DATABASE_URL === undefined in the running container

# GOOD — convert ARG to ENV if needed for runtime
ARG DATABASE_URL_BUILD
ENV DATABASE_URL=$DATABASE_URL_BUILD
# But this bakes the value into the layer — only for non-secrets`}</code></pre>
                </div>
              </div>

              <div className="p-5 bg-yellow-50 rounded-lg border border-yellow-200">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-yellow-600" />
                  Mistake 3: Forgetting required vars in docker-compose
                </h3>
                <div className="bg-gray-900 text-gray-100 p-3 rounded-lg overflow-x-auto mb-3">
                  <pre className="text-sm"><code>{`# BAD docker-compose.yml — no environment config at all
services:
  app:
    build: .
    ports:
      - "3000:3000"
    # Missing: env_file or environment — app will have empty process.env!

# GOOD
services:
  app:
    build: .
    ports:
      - "3000:3000"
    env_file:
      - .env`}</code></pre>
                </div>
              </div>

              <div className="p-5 bg-purple-50 rounded-lg border border-purple-200">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Key className="w-5 h-5 text-purple-600" />
                  Mistake 4: Hardcoding secrets as ENV in Dockerfile
                </h3>
                <div className="bg-gray-900 text-gray-100 p-3 rounded-lg overflow-x-auto mb-3">
                  <pre className="text-sm"><code>{`# BAD — secrets are visible in docker history and any image layer inspection
ENV DATABASE_URL=postgresql://user:realpassword@prod.db.internal/prod
ENV STRIPE_SECRET_KEY=sk_live_actual_key_here

# GOOD — ENV only for safe defaults, inject secrets at runtime
ENV PORT=3000
ENV NODE_ENV=production
# DATABASE_URL and STRIPE_SECRET_KEY injected via --env-file at runtime`}</code></pre>
                </div>
              </div>
            </div>
          </section>

          {/* Why Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-100 rounded-lg">
                <Shield className="w-6 h-6 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Why: The Security Case for Runtime Injection</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              The core principle behind all four methods is the same: <strong>never bake secrets into Docker images</strong>. Here is why this matters in practice:
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="p-5 bg-red-50 rounded-lg border border-red-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  Image layers are permanent
                </h3>
                <p className="text-gray-700 text-sm">Docker images are built from immutable layers. If you COPY .env or set <code className="bg-gray-100 px-1 rounded">ENV SECRET=value</code> in a layer, that data exists permanently in the image — even if you delete or overwrite it in a later layer. The previous layer is still in the image filesystem and can be extracted.</p>
              </div>
              <div className="p-5 bg-orange-50 rounded-lg border border-orange-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-orange-600" />
                  docker history exposes ENV values
                </h3>
                <p className="text-gray-700 text-sm">Run <code className="bg-gray-100 px-1 rounded">docker history --no-trunc myimage</code> and every ENV instruction you set is visible in plain text — including database passwords and API keys. Anyone with read access to the image (or the registry) can extract them this way.</p>
              </div>
              <div className="p-5 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-blue-600" />
                  Registry exposure
                </h3>
                <p className="text-gray-700 text-sm">If you push an image to Docker Hub, ECR, GCR, or any registry — even a private one — you are trusting that registry&apos;s access controls with every secret baked into the image. A registry misconfiguration, a stolen token, or an insider threat exposes everything. Runtime injection limits the blast radius.</p>
              </div>
              <div className="p-5 bg-green-50 rounded-lg border border-green-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  Runtime injection is the secure model
                </h3>
                <p className="text-gray-700 text-sm">When secrets are injected at runtime via --env-file, docker-compose, or a secret manager, the image itself is clean and can be pushed publicly if needed. Secrets are controlled by the deployment environment and can be rotated without rebuilding the image. This is the twelve-factor app model.</p>
              </div>
            </div>

            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
              <pre className="text-sm"><code>{`# Demonstrate the risk — inspect a naive image
docker build -t naive-app-with-secrets .
docker history --no-trunc naive-app-with-secrets

# Output reveals secrets:
# IMAGE          CREATED        CREATED BY                                      SIZE
# sha256:abc123  2 minutes ago  ENV DATABASE_URL=postgresql://user:REALPASS@...  0B
# sha256:def456  2 minutes ago  ENV STRIPE_KEY=sk_live_actual_key               0B
#
# Anyone who can pull this image can see your production credentials.

# Correct approach: clean image, secrets at runtime
docker build -t secure-app .
docker history --no-trunc secure-app
# Only shows: ENV PORT=3000 NODE_ENV=production — no secrets`}</code></pre>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
              <p className="text-red-800 text-sm">
                <strong>The rule:</strong> Docker images should be immutable, portable artefacts that contain only your application code and its dependencies. Configuration and secrets are injected by the deployment environment at runtime. This is the foundation of secure container operations.
              </p>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Why is process.env undefined in Docker?</h3>
                <p className="text-gray-700 leading-relaxed">Docker containers run in completely isolated environments. Your local .env file is not automatically copied or mounted into the container. Unless you explicitly pass environment variables using Dockerfile <code className="bg-gray-100 px-1 rounded">ENV</code> directives, the <code className="bg-gray-100 px-1 rounded">docker run --env-file</code> flag, <code className="bg-gray-100 px-1 rounded">docker-compose</code> environment section, or <code className="bg-gray-100 px-1 rounded">docker run -e</code> flags, <code className="bg-gray-100 px-1 rounded">process.env</code> will return undefined for any variables your app expects.</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">How do I pass environment variables to a Docker container?</h3>
                <p className="text-gray-700 leading-relaxed">Four main methods: (1) Dockerfile <code className="bg-gray-100 px-1 rounded">ENV PORT=3000</code> for non-secret defaults baked into the image; (2) <code className="bg-gray-100 px-1 rounded">docker run --env-file .env myapp</code> to pass all variables from a local file at runtime; (3) docker-compose.yml <code className="bg-gray-100 px-1 rounded">env_file:</code> or <code className="bg-gray-100 px-1 rounded">environment:</code> for orchestrated deployments; (4) Docker Secrets for production sensitive data mounted as files. Use --env-file or docker-compose for development, platform secrets for production.</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">What is the difference between ARG and ENV in Dockerfile?</h3>
                <p className="text-gray-700 leading-relaxed">ARG defines a build-time variable available only during <code className="bg-gray-100 px-1 rounded">docker build</code> — it is NOT available to the running container via <code className="bg-gray-100 px-1 rounded">process.env</code>. ENV defines a runtime variable that IS available to the container and persists in the image. Use ARG for build-time customisation (base image version, compile flags). Use ENV for runtime config that <code className="bg-gray-100 px-1 rounded">process.env</code> should see. The most common bug is declaring <code className="bg-gray-100 px-1 rounded">ARG DATABASE_URL</code> and wondering why the running app can&apos;t see it.</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">How do I use .env file with Docker Compose?</h3>
                <p className="text-gray-700 leading-relaxed">Two approaches work together. First, the <code className="bg-gray-100 px-1 rounded">env_file:</code> key injects every variable from the file directly into the container: <code className="bg-gray-100 px-1 rounded">env_file: [.env]</code>. Second, the <code className="bg-gray-100 px-1 rounded">environment:</code> key with <code className="bg-gray-100 px-1 rounded">${'{'}VAR{'}'}</code> syntax reads from your shell or a .env file in the same directory as docker-compose.yml (Docker Compose reads this file automatically for variable substitution). Combine both: use env_file for bulk config, use environment for explicit overrides.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Should I COPY .env file into Docker image?</h3>
                <p className="text-gray-700 leading-relaxed">No — never COPY .env into your Docker image. The .env file containing secrets becomes baked into an image layer permanently, visible via <code className="bg-gray-100 px-1 rounded">docker history</code> and extractable by anyone with image access. Even deleting it in a later RUN layer does not help — the previous layer still contains it. Instead, add <code className="bg-gray-100 px-1 rounded">.env</code> to <code className="bg-gray-100 px-1 rounded">.dockerignore</code> and inject secrets at runtime using --env-file, docker-compose, or your cloud platform&apos;s secret manager.</p>
              </div>
            </div>
          </section>

          {/* Related links */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Related guides &amp; tools</h2>
            <p className="text-gray-700 mb-4">More developer guides and free tools:</p>
            <div className="flex flex-wrap gap-3 text-sm">
              <Link href="/blog" className="text-primary-600 hover:underline font-medium">Developer&apos;s Study Materials</Link>
              <Link href="/blog/manage-multiple-env-files-nodejs-development-staging-production" className="text-primary-600 hover:underline">Manage Multiple .env Files in Node.js</Link>
              <Link href="/blog/why-process-env-is-undefined-nodejs-and-how-to-fix-it" className="text-primary-600 hover:underline">process.env undefined in Node.js</Link>
              <Link href="/blog/fix-error-listen-eaddrinuse-nodejs-port-already-in-use" className="text-primary-600 hover:underline">Fix EADDRINUSE port error</Link>
              <Link href="/blog/fix-hydration-failed-error-nextjs-server-vs-client-mismatch" className="text-primary-600 hover:underline">Fix Next.js Hydration Failed error</Link>
              <Link href="/json-beautifier" className="text-primary-600 hover:underline">JSON Beautifier</Link>
              <Link href="/config-comparator" className="text-primary-600 hover:underline">Config Comparator</Link>
            </div>
          </section>
        </article>

        {/* Social Share Section */}
        <section className="mt-12">
          <BlogSocialShare
            title="Why process.env Variables Are Undefined in Docker (And How to Fix It)"
            description="Your Node.js app works locally but process.env is undefined in Docker. Here's exactly why and 4 ways to fix it."
            variant="full"
          />
        </section>

        {/* Newsletter Signup */}
        <section className="mt-12">
          <NewsletterSignup />
        </section>

        {/* Feedback Form */}
        <section className="mt-12">
          <FeedbackForm toolName="process.env Undefined in Docker Guide" />
        </section>
      </BlogLayoutWithSidebarAds>
    </div>
  );
}
