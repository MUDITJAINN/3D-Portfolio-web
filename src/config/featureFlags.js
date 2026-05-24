/**
 * featureFlags.js
 * -------------------------
 * Turn features on/off without deleting code.
 *
 * WHY: Phase 1 ships the assistant shell and tour logic before the 3D robot.
 * Flags let you develop safely and deploy partial features to Netlify.
 *
 * Set REACT_APP_ASSISTANT_ENABLED=false in .env to hide the assistant UI.
 */

import env from "./environment";

export const featureFlags = {
  /** Guided tour + chat panel (local responses by default). */
  assistantEnabled: process.env.REACT_APP_ASSISTANT_ENABLED !== "false",

  /** Call Grok API only when user asks a custom question and key exists. */
  aiEnabled: Boolean(env.grokApiKey),

  /** 3D robot model — Phase 2 (placeholder only in Phase 1). */
  robot3dEnabled: process.env.REACT_APP_ROBOT_3D === "true",

  /** Speech synthesis for assistant messages. */
  speechEnabled: process.env.REACT_APP_SPEECH === "true",

  /** Pause Three.js animations when browser tab is hidden. */
  pauseAnimationsWhenHidden:
    process.env.REACT_APP_PAUSE_WHEN_HIDDEN !== "false",
};

export default featureFlags;
