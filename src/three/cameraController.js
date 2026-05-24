/**
 * cameraController.js
 * -------------------------
 * Helpers for camera behavior during tours (Phase 2).
 *
 * WHY: When the robot moves to a section, the camera may need to frame
 * the robot without hard-coding positions inside RobotController.
 */

import { lerp } from "../utils/animationHelpers";

/**
 * Smoothly interpolate camera position toward target (call each frame).
 * @param {THREE.Vector3} current
 * @param {[number, number, number]} target
 * @param {number} t - 0–1 blend factor per frame (e.g. 0.05)
 */
export function lerpCameraPosition(current, target, t = 0.05) {
  current.x = lerp(current.x, target[0], t);
  current.y = lerp(current.y, target[1], t);
  current.z = lerp(current.z, target[2], t);
  return current;
}

/** Placeholder targets per section for future robot camera. */
export const sectionCameraOffsets = {
  About: [0, 1.5, 4],
  Skills: [0.5, 1.5, 4],
  Experience: [-0.5, 1.5, 4],
  Projects: [0, 1.2, 4.5],
  Education: [0, 1.5, 4],
  Contact: [0, 1.5, 3.5],
};

export default { lerpCameraPosition, sectionCameraOffsets };
