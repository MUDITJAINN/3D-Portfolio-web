/**
 * deviceDetect.js
 * -------------------------
 * Lightweight device capability checks (no external library).
 *
 * WHY: Mobile GPUs struggle with heavy 3D. The robot and effects can
 * reduce quality or disable features on low-end devices.
 */

/** True on phones/tablets based on viewport and touch support. */
export function isMobileDevice() {
  if (typeof window === "undefined") return false;
  const narrow = window.matchMedia("(max-width: 768px)").matches;
  const touch =
    "ontouchstart" in window || navigator.maxTouchPoints > 0;
  return narrow && touch;
}

/** Prefer reduced motion for accessibility (OS setting). */
export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Suggested pixel ratio cap for Three.js renderer on mobile. */
export function getSuggestedDpr() {
  if (isMobileDevice()) return [1, 1.5];
  return [1, 2];
}
