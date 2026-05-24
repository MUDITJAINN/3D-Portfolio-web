/**
 * SectionHighlight.jsx
 * -------------------------
 * Subtle outline on the active tour section (via data attribute + CSS).
 *
 * WHY: Visual feedback during tours without wrapping every section in
 * new components. Injects a global style when tour is active.
 */

import React, { useEffect } from "react";
import { createGlobalStyle } from "styled-components";

const HighlightStyles = createGlobalStyle`
  [data-tour-active="true"] {
    outline: 2px solid ${({ theme }) => theme.primary};
    outline-offset: 4px;
    transition: outline 0.3s ease;
  }
`;

function SectionHighlight({ activeSectionId, isTourActive }) {
  useEffect(() => {
    document
      .querySelectorAll("[data-tour-section]")
      .forEach((el) => el.removeAttribute("data-tour-active"));

    if (!isTourActive || !activeSectionId) return;

    const target = document.getElementById(activeSectionId);
    if (target) {
      target.setAttribute("data-tour-active", "true");
      target.setAttribute("data-tour-section", "true");
    }

    return () => {
      document
        .querySelectorAll("[data-tour-active]")
        .forEach((el) => el.removeAttribute("data-tour-active"));
    };
  }, [activeSectionId, isTourActive]);

  if (!isTourActive) return null;
  return <HighlightStyles />;
}

export default SectionHighlight;
