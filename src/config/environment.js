/**
 * environment.js
 * -------------------------
 * Central place for reading environment variables.
 *
 * WHY: Create React App only exposes variables prefixed with REACT_APP_.
 * Scattering process.env across the app makes keys hard to find and test.
 *
 * HOW: Import `env` anywhere you need API keys or feature toggles.
 */

/**
 * Ensures OpenAI-compatible URL ends with /chat/completions.
 * Groq users often set REACT_APP_GROK_API_URL=https://api.groq.com/openai/v1
 */
function normalizeChatCompletionsUrl(url) {
  const trimmed = (url || "").replace(/\/+$/, "");
  if (!trimmed) return "https://api.x.ai/v1/chat/completions";
  if (trimmed.endsWith("/chat/completions")) return trimmed;
  return `${trimmed}/chat/completions`;
}

const env = {
  /** API key (xAI Grok or Groq — both use REACT_APP_GROK_API_KEY in .env). */
  grokApiKey: process.env.REACT_APP_GROK_API_KEY || "",

  /** Full chat completions endpoint (auto-fixes Groq base URL). */
  grokApiUrl: normalizeChatCompletionsUrl(
    process.env.REACT_APP_GROK_API_URL
  ),

  /** Model id — Groq: llama-3.3-70b-versatile | xAI: grok-2-latest */
  grokModel:
    process.env.REACT_APP_GROK_MODEL || "grok-2-latest",

  /** Max AI requests per minute (client-side rate limit). */
  aiRateLimitPerMinute: Number(
    process.env.REACT_APP_AI_RATE_LIMIT || 5
  ),

  /**
   * Google Analytics 4 measurement ID (format: G-XXXXXXXXXX).
   * Set REACT_APP_GA_ID in .env — then restart npm start.
   */
  gaMeasurementId:
    process.env.REACT_APP_GA_ID ||
    process.env.REACT_APP_GA_MEASUREMENT_ID ||
    "G-M8KTSFJJ5R",

  /** True when running `npm run build` (production bundle). */
  isProduction: process.env.NODE_ENV === "production",
};

export default env;
