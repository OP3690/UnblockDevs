/**
 * GA4 event helpers. Use these so GA4 gets multiple events per session
 * and can compute session duration (needs ≥2 events).
 * User properties (e.g. last_active) are set on engagement for "Active users" segmentation.
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/** Set a GA4 user property for segmentation (e.g. Active users by last_active). */
export function setUserProperty(
  key: string,
  value: string | number | boolean
): void {
  if (typeof window === 'undefined') return;
  if (typeof window.gtag !== 'function') return;
  window.gtag('set', 'user_properties', { [key]: value });
}

/** Mark user as active (sets last_active user property). Call on engagement so GA4 can segment Active users. */
function setActiveUserTimestamp(): void {
  setUserProperty('last_active', new Date().toISOString());
}

export function trackEvent(
  action: string,
  params?: Record<string, unknown>
): void {
  if (typeof window === 'undefined') return;
  if (typeof window.gtag !== 'function') return;
  setActiveUserTimestamp();
  window.gtag('event', action, {
    ...params,
    timestamp: Date.now(),
  });
}

export function trackToolUsed(toolName: string, metadata?: Record<string, unknown>): void {
  trackEvent('tool_used', {
    tool_name: toolName,
    ...metadata,
  });
}

export function trackToolCompleted(toolName: string, metadata?: Record<string, unknown>): void {
  trackEvent('tool_completed', {
    tool_name: toolName,
    ...metadata,
  });
}

export function trackCopy(toolName: string): void {
  trackEvent('result_copied', { tool_name: toolName });
}

/**
 * Track CTA (call-to-action) clicks on tool pages: "Use the tool", "Run test", "Generate", etc.
 */
export function trackCtaClick(
  toolName: string,
  ctaLabel: string,
  metadata?: Record<string, unknown>
): void {
  trackEvent('cta_click', {
    tool_name: toolName,
    cta_label: ctaLabel,
    ...metadata,
  });
}

export function trackError(toolName: string, errorType: string): void {
  trackEvent('tool_error', {
    tool_name: toolName,
    error_type: errorType,
  });
}

/**
 * Track when the site tab becomes visible (user switched back to the tab).
 * Uses Page Visibility API; only fires on hidden → visible transition, not on initial load.
 */
export function trackTabVisible(metadata?: Record<string, unknown>): void {
  trackEvent('tab_visible', {
    ...metadata,
  });
}

// ── Search events ─────────────────────────────────────────────────────────────

/** Fired when the global search popup is opened. `source` identifies the trigger. */
export function trackSearchOpened(
  source: 'header_button' | 'homepage_search' | 'hub_search' | 'keyboard_shortcut' | 'slash_key'
): void {
  trackEvent('search_opened', { source });
}

/** Fired (debounced) when the user types a query in the search popup. */
export function trackSearchQuery(query: string, result_count: number): void {
  trackEvent('search_query', { query: query.toLowerCase().trim(), result_count });
}

/** Fired when the user clicks/selects a result from the search popup. */
export function trackSearchResultClick(
  tool_name: string,
  position: number,
  query: string
): void {
  trackEvent('search_result_click', {
    tool_name,
    position,
    query: query.toLowerCase().trim(),
  });
}

/** Fired when the search popup is dismissed without selecting a result. */
export function trackSearchClosed(query: string, result_count: number): void {
  if (!query.trim()) return; // skip empty-state dismissals (not useful signal)
  trackEvent('search_closed', {
    query: query.toLowerCase().trim(),
    result_count,
    selected: false,
  });
}

// ── Blog events ───────────────────────────────────────────────────────────────

/** Fired when a user lands on a blog article page. */
export function trackBlogRead(slug: string, title?: string): void {
  trackEvent('blog_article_read', { blog_slug: slug, blog_title: title });
}

/** Fired at scroll depth milestones (25 / 50 / 75 / 100). */
export function trackBlogScroll(slug: string, depth_pct: 25 | 50 | 75 | 100): void {
  trackEvent('blog_scroll_depth', { blog_slug: slug, depth_pct });
}

// ── Homepage / navigation events ──────────────────────────────────────────────

/** Fired when a hero CTA button is clicked (e.g. "Browse all 60+ tools"). */
export function trackHeroCta(label: string): void {
  trackEvent('hero_cta_click', { cta_label: label });
}

/** Fired when a quick-link chip in the hero is clicked. */
export function trackHeroQuickLink(tool_name: string): void {
  trackEvent('hero_quick_link_click', { tool_name });
}

/** Fired when user selects a category filter tab on the homepage. */
export function trackCategoryFilter(category: string): void {
  trackEvent('category_filter_click', { category });
}

/** Fired when a tool card on the homepage grid is clicked. */
export function trackHomeToolClick(tool_name: string, category: string): void {
  trackEvent('home_tool_click', { tool_name, category });
}

// ── Tool page events ──────────────────────────────────────────────────────────

/** Fired when the share/copy-link button on a tool page is used. */
export function trackToolShare(tool_name: string, method: 'native_share' | 'clipboard'): void {
  trackEvent('tool_share', { tool_name, method });
}

/** Fired when a related tool chip (quick-switch or strip) is clicked. */
export function trackRelatedToolClick(from_tool: string, to_tool: string): void {
  trackEvent('related_tool_click', { from_tool, to_tool });
}
