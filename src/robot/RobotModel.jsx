/**
 * RobotModel.jsx
 * -------------------------
 * Loads and displays the robot GLB (Phase 2).
 *
 * WHY: Model loading (useGLTF) stays isolated from controller logic.
 * Phase 1: placeholder mesh so the module structure is ready.
 *
 * THREE.JS: useGLTF parses compressed .glb; Suspense in parent waits for load.
 */

import React from "react";
import { featureFlags } from "../config/featureFlags";

function PlaceholderRobot() {
  return (
    <mesh position={[0, 0.5, 0]}>
      <boxGeometry args={[0.4, 0.8, 0.3]} />
      <meshStandardMaterial color="#854CE6" wireframe />
    </mesh>
  );
}

function RobotModel() {
  if (!featureFlags.robot3dEnabled) {
    return null;
  }

  // Phase 2: const { scene } = useGLTF('/robot/robot.glb');
  return <PlaceholderRobot />;
}

export default RobotModel;
