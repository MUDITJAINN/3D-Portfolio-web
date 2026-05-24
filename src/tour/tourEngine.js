/**
 * tourEngine.js
 * -------------------------
 * Imperative tour actions: scroll to step, advance, sync messages.
 *
 * WHY: Hooks and components call these functions instead of duplicating
 * scroll + store updates. Keeps tour rules in one testable module.
 */

import { scrollToElement } from "../utils/animationHelpers";
import { getTourSection, getTourLength } from "./tourConfig";
import { useTourStore } from "../store/tourStore";
import { useRobotStore } from "../store/robotStore";
import { sectionScripts } from "../ai/localKnowledge";

/**
 * Scroll to a tour step and update global state.
 * @param {number} stepIndex
 */
export function goToTourStep(stepIndex) {
  const section = getTourSection(stepIndex);
  if (!section) return;

  const el = document.getElementById(section.id);
  scrollToElement(el);

  const message =
    sectionScripts[section.id] || section.message;

  useTourStore.getState().setStep(stepIndex);
  useTourStore.getState().setLastMessage(message);
  useRobotStore.getState().setTargetSection(section.id);
  useRobotStore.getState().setMood("talking");
}

export function startTour() {
  useTourStore.getState().startTour();
  goToTourStep(0);
}

export function endTour() {
  useTourStore.getState().endTour();
  useRobotStore.getState().reset();
}

export function nextTourStep() {
  const { currentStep } = useTourStore.getState();
  const next = currentStep + 1;
  if (next >= getTourLength()) {
    endTour();
    return;
  }
  goToTourStep(next);
}

export function prevTourStep() {
  const { currentStep } = useTourStore.getState();
  goToTourStep(Math.max(0, currentStep - 1));
}
