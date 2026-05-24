/**
 * lighting.js
 * -------------------------
 * Reusable Three.js lights for future robot / scene canvases.
 *
 * WHY: Light setup duplicated across files is hard to tune. One module
 * keeps shadows and colors consistent (Phase 2 robot scene).
 *
 * USAGE (inside R3F Canvas):
 *   import SceneLights from '../three/lighting';
 *   <SceneLights />
 */

import React from "react";

export function SceneLights() {
  return (
    <>
      {/* Ambient fills shadows — cheap, good baseline */}
      <ambientLight intensity={0.4} />
      {/* Key light — main direction, slight warm tint */}
      <directionalLight position={[5, 8, 5]} intensity={1.2} castShadow />
      {/* Fill from opposite side — reduces harsh contrast */}
      <pointLight position={[-4, 2, -2]} intensity={0.5} color="#a78bfa" />
    </>
  );
}

export default SceneLights;
