/**
 * useRobot Hook
 * -------------------------
 * Read/update robot state from React (UI layer only).
 *
 * WHY: Three.js robot logic lives in /robot; UI only needs mood/target.
 * Phase 2: RobotController will subscribe to the same Zustand store.
 */

import { useRobotStore } from "../store/robotStore";

export function useRobot() {
  const targetSectionId = useRobotStore((s) => s.targetSectionId);
  const mood = useRobotStore((s) => s.mood);
  const isModelReady = useRobotStore((s) => s.isModelReady);

  return {
    targetSectionId,
    mood,
    isModelReady,
  };
}

export default useRobot;
