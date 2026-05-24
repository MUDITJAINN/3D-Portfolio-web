/**
 * prompts.js
 * -------------------------
 * System prompts sent to Grok when local knowledge cannot answer.
 *
 * WHY: Keeping prompts in one file makes tone consistent and easy to edit
 * without touching API or UI code.
 */

import { Bio } from "../data/constants";

export const SYSTEM_PROMPT = `You are a friendly onboarding assistant on ${Bio.name}'s portfolio website.
Keep answers short (2-4 sentences). Only discuss this developer's portfolio, skills, projects, and contact.
If asked unrelated questions, politely redirect to the portfolio topics.
Do not invent employers or projects not on the site.`;

/**
 * Build messages array for chat completion APIs.
 */
export function buildChatMessages(userQuestion, conversationHistory = []) {
  return [
    { role: "system", content: SYSTEM_PROMPT },
    ...conversationHistory.slice(-6),
    { role: "user", content: userQuestion },
  ];
}
