# Module reference (learning guide)

Short “textbook” entries for each file. Read top-to-bottom to follow a user action through the system.

---

## `config/environment.js`

Reads `REACT_APP_*` variables in one object so the rest of the app never touches `process.env` directly.

## `config/featureFlags.js`

Boolean switches (assistant on/off, AI on/off, robot 3D). Lets you ship partial features safely.

---

## `utils/debounce.js`

Delays rapid function calls. Used when you add typeahead or resize handlers that should not fire on every event.

## `utils/deviceDetect.js`

Mobile / reduced-motion detection for lighter 3D settings.

## `utils/animationHelpers.js`

`lerp`, `easeInOutCubic`, `scrollToElement` — shared by tour scrolling and future robot motion.

---

## `store/tourStore.js`

Zustand store: `isActive`, `currentStep`, `activeSectionId`, `lastMessage`. Any module can `useTourStore.getState()` without React.

## `store/robotStore.js`

Target section + mood for the 3D robot (Phase 2).

---

## `ai/localKnowledge.js`

Canned answers and per-section tour scripts. **Default path — no network.**

## `ai/prompts.js`

System prompt for Grok when local knowledge does not match.

## `ai/aiClient.js`

Optional HTTP client: cache + rate limit + `askGrok()`.

## `ai/speechManager.js`

Optional `speechSynthesis` wrapper.

## `ai/assistantEngine.js`

**Single entry**: `getAssistantReply()` → local → AI → fallback.

---

## `tour/tourConfig.js`

Ordered list of sections (`id` matches `#About`, `#Skills`, … in the DOM).

## `tour/sectionDetector.js`

`IntersectionObserver` → updates which section is most visible.

## `tour/tourEngine.js`

`startTour`, `nextTourStep`, `goToTourStep` — scroll + update stores.

## `tour/tourHooks.js`

Re-exports `useTour` for convenient imports.

---

## `three/performance.js`

Global “pause animations” flag + DPR helper for canvases.

## `three/lighting.js`

Reusable `<SceneLights />` for robot canvas.

## `three/sceneSetup.js`

Default `Canvas` props (camera, dpr, gl).

## `three/cameraController.js`

Camera lerp helpers for Phase 2.

---

## `hooks/useTour.js`

Subscribes to tour store + starts section observer + exposes `start/next/prev`.

## `hooks/usePerformance.js`

Listens to `visibilitychange` → `setAnimationsPaused`.

## `hooks/useRobot.js`

Reads robot store from React components.

---

## `components/AssistantUI.jsx`

Floating chat + tour controls. Calls `assistantEngine` and `useTour`.

## `components/ChatBubble.jsx`

One message line (memoized).

## `components/TourControls.jsx`

Start / Back / Next / Skip buttons.

## `components/SectionHighlight.jsx`

Adds `data-tour-active` outline to current section.

---

## `robot/*` (Phase 2)

- `RobotModel.jsx` — GLB mesh
- `RobotAnimations.js` — clip names per mood
- `RobotMovement.js` — positions per section
- `RobotController.jsx` — R3F canvas + `useFrame`

---

## Existing portfolio files (unchanged in Phase 1)

- `components/sections/*` — page content; section `id`s power the tour.
- `components/canvas/Stars.jsx` — background; now respects performance pause.
- `components/canvas/Earth.jsx` — project globe (can adopt `performance.js` in Phase 2).
