/**
 * useTour Hook
 * -------------------------
 * React-facing API for guided tour state and actions.
 *
 * WHY: Components import one hook instead of tourStore + tourEngine + detector.
 * Business logic stays in tourEngine; this hook wires lifecycle (observer).
 */

import { useEffect, useCallback } from "react";
import { useTourStore } from "../store/tourStore";
import { observeSections } from "../tour/sectionDetector";
import {
  startTour,
  endTour,
  nextTourStep,
  prevTourStep,
} from "../tour/tourEngine";
import { getTourLength, getTourSection } from "../tour/tourConfig";

export function useTour() {
  const isActive = useTourStore((s) => s.isActive);
  const currentStep = useTourStore((s) => s.currentStep);
  const activeSectionId = useTourStore((s) => s.activeSectionId);
  const lastMessage = useTourStore((s) => s.lastMessage);
  const setActiveSectionId = useTourStore((s) => s.setActiveSectionId);

  useEffect(() => {
    const cleanup = observeSections(setActiveSectionId);
    return cleanup;
  }, [setActiveSectionId]);

  const currentSection = getTourSection(currentStep);
  const totalSteps = getTourLength();

  const start = useCallback(() => startTour(), []);
  const end = useCallback(() => endTour(), []);
  const next = useCallback(() => nextTourStep(), []);
  const prev = useCallback(() => prevTourStep(), []);

  return {
    isActive,
    currentStep,
    currentSection,
    totalSteps,
    activeSectionId,
    lastMessage,
    start,
    end,
    next,
    prev,
  };
}

export default useTour;
