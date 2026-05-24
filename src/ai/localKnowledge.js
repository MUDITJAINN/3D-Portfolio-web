/**
 * localKnowledge.js
 * -------------------------
 * Scripted answers about this portfolio — no network required.
 *
 * WHY: Default assistant behavior should work offline and cost $0.
 * Grok is only for questions that don't match these patterns.
 */

import { Bio } from "../data/constants";

/** Tour step messages keyed by section id (matches Navbar hash links). */
export const sectionScripts = {
  About: `Hi! I'm your guide. This is ${Bio.name}'s introduction — roles, bio, and social links.`,
  Skills: "Here you'll find frontend, backend, and other skills with icons.",
  Experience: "Work history and roles are listed on a vertical timeline.",
  Projects: "Featured projects with links to code and live demos.",
  Education: "Degrees and certifications.",
  Contact: "Reach out via the form — powered by EmailJS.",
};

/** Keyword → canned reply for free-form chat (simple matching). */
export const keywordReplies = [
  {
    keywords: ["github", "code", "repo"],
    reply: `GitHub profile: ${Bio.github}`,
  },
  {
    keywords: ["linkedin", "social"],
    reply: `LinkedIn: ${Bio.linkedin}`,
  },
  {
    keywords: ["resume", "cv"],
    reply: `Resume: ${Bio.resume}`,
  },
  {
    keywords: ["hello", "hi", "hey"],
    reply: "Hello! Ask about skills, projects, or say 'start tour' to explore.",
  },
  {
    keywords: ["tour", "guide", "help"],
    reply: "Click **Start tour** below, or type which section you want (e.g. Projects).",
  },
];

/**
 * Try to answer from local knowledge only.
 * @returns {string|null} Reply text or null if no match
 */
export function findLocalReply(userText) {
  const text = userText.toLowerCase().trim();
  if (!text) return null;

  for (const { keywords, reply } of keywordReplies) {
    if (keywords.some((k) => text.includes(k))) return reply;
  }

  for (const [sectionId, script] of Object.entries(sectionScripts)) {
    if (text.includes(sectionId.toLowerCase())) return script;
  }

  return null;
}
