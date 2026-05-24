/**
 * robotStore.js
 * -------------------------
 * State for the 3D onboarding robot (Phase 2 will animate the model).
 *
 * WHY: Robot position, mood, and animation name are not UI concerns.
 * The store lets RobotController (Three.js) and AssistantUI stay decoupled.
 *
 * COMMUNICATION:
 *   tourEngine → setTargetSection → RobotMovement reads target in useFrame
 *   assistantEngine → setMood('talking') → RobotAnimations picks clip
 */

import { create } from "zustand";

export const useRobotStore = create((set) => ({
  /** Section id the robot should move toward. */
  targetSectionId: null,

  /** idle | walking | talking | waving */
  mood: "idle",

  /** Whether GLB assets finished loading. */
  isModelReady: false,

  setTargetSection: (sectionId) => set({ targetSectionId: sectionId }),

  setMood: (mood) => set({ mood }),

  setModelReady: (ready) => set({ isModelReady: ready }),

  reset: () =>
    set({
      targetSectionId: null,
      mood: "idle",
      isModelReady: false,
    }),
}));

export default useRobotStore;
