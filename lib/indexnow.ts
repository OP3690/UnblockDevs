/**
 * IndexNow utility for notifying search engines about URL changes
 * This helps with instant indexing of new or updated content
 */

const INDEXNOW_ENDPOINTS = [
  'https://api.indexnow.org/IndexNow',
  'https://www.bing.com/indexnow',
  'https://yandex.com/indexnow',
];

// Generate a random key for IndexNow (should be stored securely)
// In production, use a consistent key and store it in environment variables
export function generateIndexNowKey(): string {
  // Generate a 32-character hex string
  return Array.from(crypto.getRandomValues(new Uint8Array(16)))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

/**
 * Notify search engines about URL changes using IndexNow protocol
 * @param urls Array of URLs that have been added, updated, or deleted
 * @param host The hostname (e.g., 'unblockdevs.com')
 * @param key The IndexNow API key (should be stored in .env)
 */
export async function notifyIndexNow(
  urls: string[],
  host: string = 'unblockdevs.com',
  key?: string
): Promise<void> {
  if (!key) {
    // In production, get from environment variable
    console.warn('IndexNow key not provided. Skipping notification.');
    return;
  }

  const keyLocation = `https://${host}/${key}.txt`;

  const payload = {
    host,
    key,
    keyLocation,
    urlList: urls.map((url) => (url.startsWith('http') ? url : `https://${host}${url}`)),
  };

  // Notify all IndexNow endpoints
  const promises = INDEXNOW_ENDPOINTS.map((endpoint) =>
    fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    }).catch((error) => {
      console.error(`IndexNow notification failed for ${endpoint}:`, error);
    })
  );

  await Promise.allSettled(promises);
  console.log(`IndexNow notifications sent for ${urls.length} URL(s)`);
}

/**
 * Create the IndexNow key file content
 * This file should be placed at the root of your site: /{key}.txt
 */
export function createIndexNowKeyFile(key: string): string {
  return key;
}

