// ─────────────────────────────────────────────
//  Utilities
// ─────────────────────────────────────────────

/**
 * Format an ISO timestamp into a short human-readable string.
 * Example: "Jan 5, 02:30 PM"
 * @param {string} iso
 * @returns {string}
 */
export function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    month:  "short",
    day:    "numeric",
    hour:   "2-digit",
    minute: "2-digit",
  });
}

/**
 * Build a log entry for the API request logger.
 * @param {string} method
 * @param {string} endpoint
 * @param {number} status
 * @returns {{ method, endpoint, status, time }}
 */
export function makeLogEntry(method, endpoint, status) {
  return { method, endpoint, status, time: new Date().toLocaleTimeString() };
}

/**
 * Cycle through an array by index.
 * @param {any[]} arr
 * @param {number} i
 */
export function cycle(arr, i) {
  return arr[i % arr.length];
}
