/**
 * usePerformance Hook
 * -------------------------
 * Pauses Three.js-friendly animations when the browser tab is hidden.
 *
 * WHY: requestAnimationFrame still fires in background tabs on some
 * browsers, wasting GPU/battery. We set a global flag that useFrame reads.
 *
 * USAGE: Call once near the app root (App.js).
 *   usePerformance();
 */

import { useEffect } from "react";
import { featureFlags } from "../config/featureFlags";
import { setAnimationsPaused } from "../three/performance";

export function usePerformance() {
  useEffect(() => {
    if (!featureFlags.pauseAnimationsWhenHidden) return;

    const onVisibility = () => {
      const hidden = document.visibilityState === "hidden";
      setAnimationsPaused(hidden);
    };

    document.addEventListener("visibilitychange", onVisibility);
    onVisibility();

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      setAnimationsPaused(false);
    };
  }, []);
}

export default usePerformance;
