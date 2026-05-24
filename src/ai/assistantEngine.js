/**
 * assistantEngine.js
 * -------------------------
 * Orchestrates assistant replies: local first, Grok only when needed.
 *
 * WHY: UI components should not decide routing logic. This module is the
 * single entry point for "user asked something → get a reply".
 *
 * PIPELINE:
 *   1. findLocalReply (instant, free)
 *   2. askGrok (optional, cached, rate-limited)
 *   3. fallback message
 */

import { findLocalReply } from "./localKnowledge";
import { askGrok } from "./aiClient";
import { speak } from "./speechManager";
import { featureFlags } from "../config/featureFlags";

const FALLBACK =
  "I can help with skills, projects, experience, or a guided tour. Try 'start tour' or name a section.";

/**
 * Resolve a user message to assistant text.
 * @param {string} userText
 * @param {Array<{role: string, content: string}>} history
 * @returns {Promise<{ text: string, source: 'local'|'ai'|'fallback' }>}
 */
export async function getAssistantReply(userText, history = []) {
  const local = findLocalReply(userText);
  if (local) {
    if (featureFlags.speechEnabled) speak(local);
    return { text: local, source: "local" };
  }

  if (featureFlags.aiEnabled) {
    const aiText = await askGrok(userText, history);
    if (aiText) {
      if (featureFlags.speechEnabled) speak(aiText);
      return { text: aiText, source: "ai" };
    }
  }

  if (featureFlags.speechEnabled) speak(FALLBACK);
  return { text: FALLBACK, source: "fallback" };
}

export default getAssistantReply;
