/**
 * ChatBubble.jsx
 * -------------------------
 * Single message bubble in the assistant panel.
 *
 * WHY: Small presentational component — easy to style user vs assistant.
 */

import React, { memo } from "react";
import styled from "styled-components";

const Bubble = styled.div`
  align-self: ${({ $isUser }) => ($isUser ? "flex-end" : "flex-start")};
  max-width: 90%;
  padding: 10px 14px;
  border-radius: 14px;
  font-size: 14px;
  line-height: 1.45;
  background: ${({ $isUser, theme }) =>
    $isUser ? theme.primary + "33" : theme.card_light};
  color: ${({ theme }) => theme.text_primary};
  border: 1px solid
    ${({ $isUser, theme }) => ($isUser ? theme.primary : "transparent")};
`;

function ChatBubble({ text, isUser = false }) {
  return <Bubble $isUser={isUser}>{text}</Bubble>;
}

export default memo(ChatBubble);
