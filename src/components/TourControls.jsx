/**
 * TourControls.jsx
 * -------------------------
 * Previous / Next / End buttons for the guided tour.
 *
 * WHY: Tour navigation is separate from chat input — clearer UX and reuse.
 */

import React, { memo } from "react";
import styled from "styled-components";

const Row = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 8px;
`;

const Btn = styled.button`
  flex: 1;
  min-width: 70px;
  padding: 8px 12px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.primary};
  background: ${({ $primary, theme }) =>
    $primary ? theme.primary : "transparent"};
  color: ${({ $primary, theme }) =>
    $primary ? theme.text_primary : theme.primary};
  font-size: 13px;
  cursor: pointer;
  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

function TourControls({
  isActive,
  currentStep,
  totalSteps,
  onStart,
  onPrev,
  onNext,
  onEnd,
}) {
  if (!isActive) {
    return (
      <Row>
        <Btn type="button" $primary onClick={onStart}>
          Start tour
        </Btn>
      </Row>
    );
  }

  return (
    <Row>
      <Btn type="button" onClick={onPrev} disabled={currentStep <= 0}>
        Back
      </Btn>
      <Btn type="button" $primary onClick={onNext}>
        {currentStep >= totalSteps - 1 ? "Finish" : "Next"}
      </Btn>
      <Btn type="button" onClick={onEnd}>
        Skip
      </Btn>
    </Row>
  );
}

export default memo(TourControls);
