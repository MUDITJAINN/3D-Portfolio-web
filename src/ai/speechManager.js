/**
 * speechManager.js
 * -------------------------
 * Browser speech synthesis for assistant messages (optional).
 *
 * WHY: Voice feedback is nice for onboarding but must be opt-in
 * (featureFlags.speechEnabled) for accessibility and quiet environments.
 */

import { featureFlags } from "../config/featureFlags";

let speaking = false;

export function speak(text) {
  if (!featureFlags.speechEnabled || typeof window === "undefined") return;
  if (!window.speechSynthesis) return;

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 1;
  utterance.pitch = 1;
  speaking = true;
  utterance.onend = () => {
    speaking = false;
  };
  window.speechSynthesis.speak(utterance);
}

export function stopSpeaking() {
  if (typeof window !== "undefined" && window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
  speaking = false;
}

export function isSpeaking() {
  return speaking;
}
