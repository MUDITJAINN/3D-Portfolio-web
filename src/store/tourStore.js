/**
 * tourStore.js
 * -------------------------
 * Global state for the guided website tour (Zustand).
 *
 * WHY: Tour state is used by AssistantUI, TourControls, sectionDetector,
 * and (later) the 3D robot. A small store avoids prop-drilling through App.
 *
 * DATA FLOW:
 *   tourEngine / sectionDetector → setCurrentSection / setStep
 *   React components → useTourStore() selectors → re-render only what changed
 */

import { create } from "zustand";

const initialState = {
  /** Whether the guided tour is running. */
  isActive: false,
  /** Index into tourConfig.sections (0 = first stop). */
  currentStep: 0,
  /** Section id currently in view (from IntersectionObserver). */
  activeSectionId: null,
  /** Assistant message shown for the current step. */
  lastMessage: null,
};

export const useTourStore = create((set, get) => ({
  ...initialState,

  startTour: () =>
    set({ isActive: true, currentStep: 0, lastMessage: null }),

  endTour: () =>
    set({ ...initialState }),

  setStep: (step) => set({ currentStep: step }),

  nextStep: (maxStep) => {
    const next = get().currentStep + 1;
    if (next >= maxStep) {
      set({ isActive: false, currentStep: 0 });
      return false;
    }
    set({ currentStep: next });
    return true;
  },

  prevStep: () => {
    const prev = Math.max(0, get().currentStep - 1);
    set({ currentStep: prev });
  },

  setActiveSectionId: (id) => set({ activeSectionId: id }),

  setLastMessage: (message) => set({ lastMessage: message }),
}));

export default useTourStore;
