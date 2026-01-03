# UTM Parameter Tracking Guide

## Best Practices for Direct Traffic Growth

### ✅ DO: Tag External Links
Always add UTM parameters to external links shared on:
- Social media (Twitter, LinkedIn, Facebook, Reddit)
- Email campaigns
- External websites/blogs
- Paid advertisements
- Partner sites

### ❌ DON'T: Tag Internal Links
Never add UTM parameters to internal links (links within unblockdevs.com). This inflates Direct traffic incorrectly.

## UTM Parameter Structure

### Required Parameters:
- `utm_source` - Where the traffic comes from (e.g., `twitter`, `linkedin`, `email`)
- `utm_medium` - Marketing medium (e.g., `social`, `email`, `cpc`, `organic`)
- `utm_campaign` - Campaign name (e.g., `json-fixer-launch`, `blog-post-promotion`)

### Optional Parameters:
- `utm_term` - Keywords for paid search
- `utm_content` - Differentiate similar content/links

## Examples

### Social Media Links:
```
https://unblockdevs.com?utm_source=twitter&utm_medium=social&utm_campaign=json-tools
https://unblockdevs.com?utm_source=linkedin&utm_medium=social&utm_campaign=developer-tools
https://unblockdevs.com?utm_source=reddit&utm_medium=social&utm_campaign=webdev-subreddit
```

### Email Campaigns:
```
https://unblockdevs.com?utm_source=newsletter&utm_medium=email&utm_campaign=weekly-update
```

### Blog Posts (External Sites):
```
https://unblockdevs.com?utm_source=medium&utm_medium=referral&utm_campaign=guest-post
```

## Implementation Notes

1. **Middleware Preserves UTM Parameters**: Our middleware automatically preserves all query parameters (including UTM) during www to non-www redirects.

2. **HTTPS Configuration**: All redirects maintain query parameters, ensuring UTM data isn't lost.

3. **GA4 Tracking**: Google Analytics 4 automatically tracks UTM parameters when present in URLs.

## Impact on Direct Traffic

- **Correct UTM tagging** reduces misattributed Direct traffic by 20-30%
- **Preserving UTM parameters** during redirects prevents 10-20% Direct traffic drop
- **Never tag internal links** ensures accurate Direct traffic measurement

## Monitoring

Check GA4 reports:
- **Acquisition > Traffic acquisition** - See UTM-tagged traffic sources
- **Acquisition > User acquisition** - Monitor Direct vs. tagged traffic
- **Engagement > Events** - Track conversions by UTM campaign

