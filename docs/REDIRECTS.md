# HTTP → HTTPS and WWW redirects

## Current behavior (2-hop chain for http://www)

| Request | What happens | Hops |
|--------|----------------|-----|
| `http://unblockdevs.com/` | Vercel edge: **308** → `https://unblockdevs.com/` | 1 ✅ |
| `https://www.unblockdevs.com/` | App middleware: **301** → `https://unblockdevs.com/` | 1 ✅ |
| `http://www.unblockdevs.com/` | Vercel edge: **308** → `https://www...` → App: **301** → `https://unblockdevs.com/` | 2 ⚠️ |

The **308** is applied by Vercel’s infrastructure **before** the request reaches the app. The app then does **301** www → apex. Result: **redirect chain of 2**.

## Fix: Single-hop redirect (Vercel Dashboard only)

To get **one** redirect from `http://www.unblockdevs.com` (and `https://www`) to `https://unblockdevs.com`:

1. **Vercel Dashboard** → your project → **Settings** → **Domains**.
2. **Primary domain:** Ensure **unblockdevs.com** (apex, no www) is the one domain that “serves” the site.
3. **www:** Add **www.unblockdevs.com** and choose **“Redirect to unblockdevs.com”** (redirect to apex), **not** “Add” as a separate domain.
4. Save. Vercel will then redirect all requests to **www** (both http and https) to **https://unblockdevs.com** at the edge. For `http://www`, the edge may respond with a single **301** to `https://unblockdevs.com/` (no 308 → 301 chain).

**Important:** Use **only** Vercel Domain Redirect for www → apex. Do **not** also add a separate “force HTTPS” or www rule in app code that could create a loop. This repo’s middleware still handles any request that reaches the app as `http` or `www` with one 301 to canonical URL; once Domain Redirect is set, www traffic is usually handled at the edge and never hits the app.

## What this repo does

- **Middleware** (`middleware.ts`): If a request reaches the app with `http` or `www`, it responds with **one 301** to `https://<apex><path><query>`. The app cannot remove the first 308 that Vercel applies to `http`; that must be configured at the host (see above).
