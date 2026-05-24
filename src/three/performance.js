/**
 * performance.js
 * -------------------------
 * Shared performance helpers for React Three Fiber canvases.
 *
 * WHY: Multiple canvases (stars, earth, future robot) should share the
 * same rules: pause when tab hidden, cap DPR on mobile.
 *
 * THREE.JS LOOP:
 *   R3F runs requestAnimationFrame → useFrame callbacks each frame.
 *   When animationsPaused is true, useFrame should return early (no rotation).
 */

import { getSuggestedDpr } from "../utils/deviceDetect";

/** Module-level flag updated by usePerformance hook in App. */
let animationsPaused = false;

export function setAnimationsPaused(paused) {
  animationsPaused = paused;
}

export function areAnimationsPaused() {
  return animationsPaused;
}

/** Use inside useFrame: skip expensive updates when paused. */
export function shouldRunAnimation() {
  return !animationsPaused;
}

export function getCanvasDpr() {
  return getSuggestedDpr();
}
