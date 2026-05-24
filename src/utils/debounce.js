/**
 * debounce.js
 * -------------------------
 * Delays a function until the user stops triggering it (e.g. typing).
 *
 * WHY: AI API calls are expensive. Debouncing search/input avoids
 * sending a request on every keystroke.
 *
 * @param {Function} fn - Function to debounce
 * @param {number} waitMs - Quiet period in milliseconds
 * @returns {Function} Debounced function with .cancel()
 */

export function debounce(fn, waitMs = 300) {
  let timeoutId = null;

  const debounced = (...args) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      timeoutId = null;
      fn(...args);
    }, waitMs);
  };

  debounced.cancel = () => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = null;
  };

  return debounced;
}

export default debounce;
