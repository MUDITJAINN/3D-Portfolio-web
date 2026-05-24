/**
 * aiClient.js
 * -------------------------
 * Optional Grok API client with in-memory cache and rate limiting.
 *
 * WHY: AI is expensive and slow. We only call this when localKnowledge
 * returns null AND REACT_APP_GROK_API_KEY is set.
 *
 * FLOW:
 *   assistantEngine → askGrok() → cache check → rate limit → fetch
 */

import env from "../config/environment";
import { featureFlags } from "../config/featureFlags";
import { buildChatMessages } from "./prompts";

/** @type {Map<string, { reply: string, at: number }>} */
const responseCache = new Map();

/** Timestamps of recent requests for client-side rate limiting. */
const requestTimestamps = [];

const CACHE_TTL_MS = 1000 * 60 * 30; // 30 minutes

function cacheKey(question) {
  return question.trim().toLowerCase();
}

function isRateLimited() {
  const now = Date.now();
  const windowMs = 60 * 1000;
  while (requestTimestamps.length && requestTimestamps[0] < now - windowMs) {
    requestTimestamps.shift();
  }
  return requestTimestamps.length >= env.aiRateLimitPerMinute;
}

function rememberRequest() {
  requestTimestamps.push(Date.now());
}

/**
 * Ask Grok (xAI) chat completions API.
 * @returns {Promise<string|null>} Assistant text or null on failure / disabled
 */
export async function askGrok(userQuestion, conversationHistory = []) {
  if (!featureFlags.aiEnabled || !env.grokApiKey) return null;

  const key = cacheKey(userQuestion);
  const cached = responseCache.get(key);
  if (cached && Date.now() - cached.at < CACHE_TTL_MS) {
    return cached.reply;
  }

  if (isRateLimited()) {
    return "I'm getting too many questions at once. Please wait a minute and try again.";
  }

  rememberRequest();

  try {
    const response = await fetch(env.grokApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${env.grokApiKey}`,
      },
      body: JSON.stringify({
        model: env.grokModel,
        messages: buildChatMessages(userQuestion, conversationHistory),
        max_tokens: 256,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errBody = await response.text().catch(() => "");
      console.warn("[aiClient] API error", response.status, errBody);
      if (response.status === 401) {
        return "AI key was rejected. Check REACT_APP_GROK_API_KEY in .env and restart npm start.";
      }
      return `AI request failed (${response.status}). Check the browser console for details.`;
    }

    const data = await response.json();
    const reply =
      data?.choices?.[0]?.message?.content?.trim() ||
      "I couldn't generate an answer right now.";

    responseCache.set(key, { reply, at: Date.now() });
    return reply;
  } catch (err) {
    console.warn("[aiClient] Network error", err);
    return null;
  }
}

export function clearAiCache() {
  responseCache.clear();
}

export default askGrok;
