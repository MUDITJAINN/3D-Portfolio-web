/**
 * RobotMovement.js
 * -------------------------
 * Position logic for moving the robot between sections (Phase 2).
 *
 * WHY: Movement uses Three.js vectors and easing — not React state.
 * RobotController will call updateRobotPosition each frame in useFrame.
 */

import { lerp, easeInOutCubic } from "../utils/animationHelpers";

/** World-space anchors per section id (placeholder until GLB is placed). */
export const sectionAnchors = {
  About: { x: -2, y: 0, z: 0 },
  Skills: { x: -1, y: 0, z: 0 },
  Experience: { x: 0, y: 0, z: 0 },
  Projects: { x: 1, y: 0, z: 0 },
  Education: { x: 2, y: 0, z: 0 },
  Contact: { x: 3, y: 0, z: 0 },
};

/**
 * Move current position toward target anchor.
 * @param {{ x, y, z }} current
 * @param {string} targetSectionId
 * @param {number} progress 0–1 per frame blend
 */
export function updateRobotPosition(current, targetSectionId, progress = 0.08) {
  const target = sectionAnchors[targetSectionId] || sectionAnchors.About;
  const t = easeInOutCubic(progress);
  return {
    x: lerp(current.x, target.x, t),
    y: lerp(current.y, target.y, t),
    z: lerp(current.z, target.z, t),
  };
}

export default { sectionAnchors, updateRobotPosition };
