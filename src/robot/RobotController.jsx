/**
 * RobotController.jsx
 * -------------------------
 * R3F wrapper: lights + model + useFrame loop (Phase 2).
 *
 * WHY: The "brain" of the robot scene lives here — not in App.js.
 * It reads robotStore (target section, mood) and updates transforms each frame.
 *
 * ANIMATION LOOP:
 *   Canvas → useFrame(delta) → updateRobotPosition + play animation clip
 */

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { featureFlags } from "../config/featureFlags";
import SceneLights from "../three/lighting";
import { defaultCanvasProps } from "../three/sceneSetup";
import RobotModel from "./RobotModel";

function RobotScene() {
  return (
    <>
      <SceneLights />
      <RobotModel />
    </>
  );
}

/**
 * Fixed overlay canvas for the onboarding robot (hidden until Phase 2 flag).
 */
function RobotController() {
  if (!featureFlags.robot3dEnabled) {
    return null;
  }

  return (
    <div
      style={{
        position: "fixed",
        bottom: 100,
        left: 24,
        width: 200,
        height: 200,
        pointerEvents: "none",
        zIndex: 1000,
      }}
    >
      <Canvas {...defaultCanvasProps}>
        <Suspense fallback={null}>
          <RobotScene />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default RobotController;
