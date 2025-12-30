# Domain Setup Guide for unblockdevs.com

## Step 1: Add Domain in Vercel

1. **Go to Vercel Dashboard:**
   - Visit https://vercel.com/dashboard
   - Select your **UnblockDevs** project

2. **Add Custom Domain:**
   - Click on **Settings** tab
   - Click on **Domains** in the left sidebar
   - Click **Add Domain** button
   - Enter: `unblockdevs.com`
   - Click **Add**

3. **Add WWW Subdomain (Optional but Recommended):**
   - Also add: `www.unblockdevs.com`
   - This allows users to access your site with or without www

4. **Vercel will show you DNS records to configure:**
   - Note down the DNS records shown (usually A record or CNAME)

## Step 2: Configure DNS in GoDaddy

### Option A: Using CNAME (Recommended - Easier)

1. **Log in to GoDaddy:**
   - Go to https://www.godaddy.com
   - Sign in to your account
   - Go to **My Products** → **Domains**
   - Click on **DNS** next to `unblockdevs.com`

2. **Add CNAME Record for www:**
   - Click **Add** button
   - Select **CNAME** from dropdown
   - **Name/Host:** `www`
   - **Value/Points to:** `cname.vercel-dns.com` (or the CNAME value Vercel provides)
   - **TTL:** 600 (or default)
   - Click **Save**

3. **Add A Record for Root Domain (@):**
   - Click **Add** button
   - Select **A** from dropdown
   - **Name/Host:** `@` (or leave blank for root domain)
   - **Value/Points to:** `76.76.21.21` (Vercel's IP - check Vercel dashboard for current IP)
   - **TTL:** 600 (or default)
   - Click **Save**

   **OR** if Vercel provides a specific A record IP, use that instead.

### Option B: Using Vercel's Nameservers (Alternative - More Control)

1. **Get Vercel Nameservers:**
   - In Vercel dashboard → Settings → Domains
   - Look for nameserver information

2. **Update Nameservers in GoDaddy:**
   - In GoDaddy DNS settings, find **Nameservers** section
   - Click **Change**
   - Select **Custom**
   - Enter Vercel's nameservers (usually something like):
     - `ns1.vercel-dns.com`
     - `ns2.vercel-dns.com`
   - Click **Save**

## Step 3: Verify Domain in Vercel

1. **Wait for DNS Propagation:**
   - DNS changes can take 24-48 hours, but usually work within a few hours
   - You can check DNS propagation at: https://www.whatsmydns.net

2. **Check Domain Status in Vercel:**
   - Go back to Vercel → Settings → Domains
   - You should see the domain status change from "Pending" to "Valid"
   - Vercel will automatically issue SSL certificate (HTTPS)

## Step 4: Test Your Domain

1. **Wait for DNS to propagate** (usually 1-24 hours)
2. **Test the domain:**
   - Visit: `https://unblockdevs.com`
   - Visit: `https://www.unblockdevs.com`
   - Both should work and redirect to HTTPS

## Step 5: Update Google Search Console (After DNS is Live)

1. **Go to Google Search Console:**
   - Visit https://search.google.com/search-console
   - Add property: `https://unblockdevs.com`
   - Verify ownership (use HTML file or DNS record method)
   - Submit sitemap: `https://unblockdevs.com/sitemap.xml`

## Troubleshooting

### Domain Not Working?
- **Check DNS Propagation:** Use https://www.whatsmydns.net
- **Verify DNS Records:** Make sure they match what Vercel shows
- **Check Vercel Dashboard:** Look for any error messages
- **Wait Longer:** DNS can take up to 48 hours to fully propagate

### SSL Certificate Issues?
- Vercel automatically issues SSL certificates
- Wait 5-10 minutes after domain is verified
- If issues persist, contact Vercel support

### Common DNS Record Values:
- **A Record (@):** Points to Vercel's IP (check Vercel dashboard)
- **CNAME (www):** Points to `cname.vercel-dns.com` or Vercel's provided CNAME

## Current Configuration

Your code is already configured with:
- ✅ Domain: `unblockdevs.com` in all metadata
- ✅ Sitemap: `https://unblockdevs.com/sitemap.xml`
- ✅ Robots.txt: `https://unblockdevs.com/sitemap.xml`
- ✅ All SEO metadata uses `unblockdevs.com`

Once DNS is configured, your site will be live at `https://unblockdevs.com`!


