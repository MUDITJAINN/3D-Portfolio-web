/**
 * animationHelpers.js
 * -------------------------
 * Small math helpers shared by tour highlights and future robot movement.
 *
 * WHY: Easing and clamping belong in utils, not inside React components,
 * so the same curves work in JS and Three.js animation loops.
 */

/** Clamp value between min and max. */
export function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

/** Linear interpolation between a and b by t (0–1). */
export function lerp(a, b, t) {
  return a + (b - a) * clamp(t, 0, 1);
}

/** Smooth step easing (0 at 0, 1 at 1). */
export function easeInOutCubic(t) {
  const x = clamp(t, 0, 1);
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

/** Scroll window to a section element smoothly. */
export function scrollToElement(element, behavior = "smooth") {
  if (!element) return;
  element.scrollIntoView({ behavior, block: "start" });
}
