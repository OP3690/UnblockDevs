/**
 * GA4 event helpers. Use these so GA4 gets multiple events per session
 * and can compute session duration (needs ≥2 events).
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(
  action: string,
  params?: Record<string, unknown>
): void {
  if (typeof window === 'undefined') return;
  if (typeof window.gtag !== 'function') return;
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
