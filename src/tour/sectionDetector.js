/**
 * sectionDetector.js
 * -------------------------
 * Uses IntersectionObserver to know which portfolio section is on screen.
 *
 * WHY: The tour and robot need "where is the user?" without listening to
 * every scroll event. Observers are efficient and browser-native.
 *
 * COMMUNICATION:
 *   observeSections(callback) → callback(sectionId) → tourStore.setActiveSectionId
 */

import { tourSections } from "./tourConfig";

/**
 * Start watching section elements. Call returned function to disconnect.
 * @param {(sectionId: string|null) => void} onSectionChange
 * @returns {() => void} cleanup
 */
export function observeSections(onSectionChange) {
  if (typeof window === "undefined" || !window.IntersectionObserver) {
    return () => {};
  }

  const elements = tourSections
    .map(({ id }) => document.getElementById(id))
    .filter(Boolean);

  if (!elements.length) return () => {};

  const visible = new Map();

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const id = entry.target.id;
        visible.set(id, entry.isIntersecting ? entry.intersectionRatio : 0);
      });

      let bestId = null;
      let bestRatio = 0;
      visible.forEach((ratio, id) => {
        if (ratio > bestRatio) {
          bestRatio = ratio;
          bestId = id;
        }
      });

      onSectionChange(bestId);
    },
    { root: null, rootMargin: "-20% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
  );

  elements.forEach((el) => observer.observe(el));

  return () => observer.disconnect();
}

export default observeSections;
