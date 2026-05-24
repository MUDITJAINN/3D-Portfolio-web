/**
 * RobotAnimations.js
 * -------------------------
 * Maps mood / tour events to animation clip names (Phase 2).
 *
 * WHY: Animation names from GLB files should not be hard-coded inside
 * RobotModel. This table is easy to update when the asset changes.
 */

export const MOOD_ANIMATIONS = {
  idle: "Idle",
  walking: "Walk",
  talking: "Talk",
  waving: "Wave",
};

export function getClipNameForMood(mood) {
  return MOOD_ANIMATIONS[mood] || MOOD_ANIMATIONS.idle;
}

export default { MOOD_ANIMATIONS, getClipNameForMood };
