# Fix Redirect to /lander Issue

## Problem
The site is redirecting to `https://unblockdevs.com/lander` which doesn't exist in the codebase.

## Solution

The redirect to `/lander` is likely configured in **Vercel's Dashboard**, not in the codebase.

### Steps to Fix:

1. **Go to Vercel Dashboard**
   - Navigate to: https://vercel.com/omprakash-utahas-projects/unblockdevs/settings/redirects

2. **Check Redirects Section**
   - Look for any redirect rules that point to `/lander`
   - Common patterns that might cause this:
     - `/*` → `/lander`
     - `/` → `/lander`
     - Any catch-all redirects

3. **Remove or Update the Redirect**
   - Delete any redirect rules pointing to `/lander`
   - Or update them to point to the correct destination (e.g., `/` for homepage)

4. **Alternative: Check if it's a Rewrite**
   - Sometimes rewrites can cause this behavior
   - Check the "Rewrites" section in Vercel settings

### Current Codebase Configuration

The codebase only has:
- **Middleware**: www → non-www redirect (preserves UTM parameters)
- **No other redirects** configured in code

### If Redirect is Needed in Code

If you want to manage redirects in code, you can add them to `next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      // Add your redirects here if needed
      // Example: { source: '/old-path', destination: '/new-path', permanent: true }
    ]
  },
}
```

But first, **remove the redirect from Vercel Dashboard** to fix the immediate issue.

