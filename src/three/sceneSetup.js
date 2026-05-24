/**
 * sceneSetup.js
 * -------------------------
 * Default Canvas props shared by 3D scenes (robot, earth, etc.).
 *
 * WHY: Camera FOV, DPR, and gl options affect performance. Central config
 * prevents each canvas from using different (heavier) settings.
 */

import { getCanvasDpr } from "./performance";

export const defaultCanvasProps = {
  shadows: true,
  dpr: getCanvasDpr(),
  gl: { antialias: true, alpha: true, powerPreference: "high-performance" },
  camera: {
    fov: 45,
    near: 0.1,
    far: 200,
    position: [0, 1.5, 4],
  },
};

export default defaultCanvasProps;
