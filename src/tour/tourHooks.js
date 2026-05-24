/**
 * tourHooks.js
 * -------------------------
 * Re-exports tour-related hooks for a single import path.
 *
 * WHY: Consumers can `import { useTour } from '../tour/tourHooks'`
 * without knowing whether logic lives in /hooks or /tour.
 */

export { useTour } from "../hooks/useTour";

export default { useTour };
