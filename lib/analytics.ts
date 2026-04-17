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
