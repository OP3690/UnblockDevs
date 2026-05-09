import { blogPosts, NOINDEX_BLOG_SLUGS } from '@/lib/blog-posts-data';

const SITE_URL = 'https://unblockdevs.com';
const FEED_TITLE = 'UnblockDevs Blog — Developer Tools & Guides';
const FEED_DESCRIPTION =
  'Practical guides covering JSON formatting, API debugging, Node.js, Python, cURL, AI-safe developer workflows, and more. All tools are free and browser-based.';

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  // Only indexable posts, sorted newest first
  const posts = blogPosts
    .filter((p) => !NOINDEX_BLOG_SLUGS.has(p.slug))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 50); // RSS feeds typically limit to 50 most recent

  const lastBuildDate = posts[0]?.date
    ? new Date(posts[0].date).toUTCString()
    : new Date().toUTCString();

  const items = posts
    .map(
      (post) => `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${SITE_URL}/blog/${post.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/blog/${post.slug}</guid>
      <description>${escapeXml(post.excerpt)}</description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <category>${escapeXml(post.category)}</category>
      <author>hello@unblockdevs.com (UnblockDevs)</author>
      <dc:creator>UnblockDevs</dc:creator>
    </item>`
    )
    .join('');

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(FEED_TITLE)}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(FEED_DESCRIPTION)}</description>
    <language>en-US</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <managingEditor>hello@unblockdevs.com (UnblockDevs)</managingEditor>
    <webMaster>hello@unblockdevs.com (UnblockDevs)</webMaster>
    <ttl>1440</ttl>
    <image>
      <url>${SITE_URL}/icon.png</url>
      <title>${escapeXml(FEED_TITLE)}</title>
      <link>${SITE_URL}</link>
      <width>512</width>
      <height>512</height>
    </image>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;

  return new Response(feed, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
