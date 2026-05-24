/**
 * tourConfig.js
 * -------------------------
 * Declarative list of tour stops (order, DOM id, copy).
 *
 * WHY: Changing tour order or copy should not require editing React
 * components. Navbar already uses #About, #Skills, etc. — we reuse those ids.
 */

export const tourSections = [
  {
    id: "About",
    title: "About",
    message:
      "Welcome! This section introduces Mudit — roles, bio, and profile.",
  },
  {
    id: "Skills",
    title: "Skills",
    message: "Technologies grouped by Frontend, Backend, and more.",
  },
  {
    id: "Experience",
    title: "Experience",
    message: "Professional experience on an interactive timeline.",
  },
  {
    id: "Projects",
    title: "Projects",
    message: "Highlighted projects with descriptions and links.",
  },
  {
    id: "Education",
    title: "Education",
    message: "Academic background and certifications.",
  },
  {
    id: "Contact",
    title: "Contact",
    message: "Send a message through the contact form.",
  },
];

export function getTourSection(stepIndex) {
  return tourSections[stepIndex] ?? null;
}

export function getTourLength() {
  return tourSections.length;
}

export default tourSections;
