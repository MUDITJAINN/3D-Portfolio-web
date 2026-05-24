/**
 * AssistantUI.jsx
 * -------------------------
 * Floating panel: chat + tour controls for the onboarding assistant.
 *
 * WHY: This is the only UI entry for /ai and /tour modules. It does not
 * contain business rules — it calls assistantEngine and useTour.
 *
 * STATE FLOW:
 *   User types → getAssistantReply → messages state → ChatBubble list
 *   Start tour → tourEngine → tourStore → SectionHighlight + message
 */

import React, { useState, useCallback, memo } from "react";
import styled from "styled-components";
import { featureFlags } from "../config/featureFlags";
import env from "../config/environment";
import { getAssistantReply } from "../ai/assistantEngine";
import useTour from "../hooks/useTour";
import ChatBubble from "./ChatBubble";
import TourControls from "./TourControls";
import SectionHighlight from "./SectionHighlight";

const Fab = styled.button`
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 1001;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: none;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.text_primary};
  font-size: 24px;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.35);
`;

const Panel = styled.div`
  position: fixed;
  bottom: 92px;
  right: 24px;
  z-index: 1001;
  width: min(360px, calc(100vw - 48px));
  max-height: 420px;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.primary}55;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
`;

const Header = styled.div`
  padding: 12px 16px;
  font-weight: 600;
  font-size: 15px;
  border-bottom: 1px solid ${({ theme }) => theme.text_secondary}33;
  color: ${({ theme }) => theme.text_primary};
`;

const Messages = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-height: 120px;
`;

const InputRow = styled.form`
  display: flex;
  gap: 8px;
  padding: 12px;
  border-top: 1px solid ${({ theme }) => theme.text_secondary}33;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.text_secondary}44;
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text_primary};
  font-size: 14px;
`;

const SendBtn = styled.button`
  padding: 10px 14px;
  border-radius: 10px;
  border: none;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.text_primary};
  cursor: pointer;
  &:disabled {
    opacity: 0.5;
  }
`;

const Hint = styled.p`
  font-size: 11px;
  color: ${({ theme }) => theme.text_secondary};
  padding: 0 12px 8px;
  margin: 0;
`;

const INITIAL_MESSAGES = [
  {
    text: "Hi! I can guide you through this portfolio. Try 'start tour' or ask about projects.",
    isUser: false,
  },
];

/**
 * Status line under tour controls.
 * Production: short public copy only. Development: setup hints for you.
 */
function getAssistantStatusHint() {
  if (env.isProduction) {
    return featureFlags.aiEnabled ? null : "AI is offline. You can still use the tour and quick answers.";
  }
  if (featureFlags.aiEnabled) {
    return `Dev: AI on (${env.grokModel}). Local answers first; unique questions use the API.`;
  }
  return "Dev: AI off — set REACT_APP_GROK_API_KEY in .env and restart npm start.";
}

function AssistantUI() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const tour = useTour();
  const statusHint = getAssistantStatusHint();

  const sendMessage = useCallback(async (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    setMessages((m) => [...m, { text: trimmed, isUser: true }]);
    setInput("");
    setLoading(true);

    if (/start\s*tour/i.test(trimmed)) {
      tour.start();
      setMessages((m) => [
        ...m,
        {
          text: tour.lastMessage || "Tour started! Use Next to continue.",
          isUser: false,
        },
      ]);
      setLoading(false);
      return;
    }

    const history = messages.slice(-8).map((msg) => ({
      role: msg.isUser ? "user" : "assistant",
      content: msg.text,
    }));

    const { text: reply } = await getAssistantReply(trimmed, history);
    setMessages((m) => [...m, { text: reply, isUser: false }]);
    setLoading(false);
  }, [messages, tour]);

  const onSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  if (!featureFlags.assistantEnabled) return null;

  return (
    <>
      <SectionHighlight
        activeSectionId={tour.activeSectionId || tour.currentSection?.id}
        isTourActive={tour.isActive}
      />

      {open && (
        <Panel>
          <Header>Portfolio guide</Header>
          <Messages>
            {messages.map((msg, i) => (
              <ChatBubble key={i} text={msg.text} isUser={msg.isUser} />
            ))}
            {tour.lastMessage && tour.isActive && (
              <ChatBubble text={tour.lastMessage} isUser={false} />
            )}
          </Messages>
          <TourControls
            isActive={tour.isActive}
            currentStep={tour.currentStep}
            totalSteps={tour.totalSteps}
            onStart={tour.start}
            onPrev={tour.prev}
            onNext={tour.next}
            onEnd={tour.end}
          />
          {statusHint && <Hint>{statusHint}</Hint>}
          <InputRow onSubmit={onSubmit}>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about skills, projects…"
              disabled={loading}
            />
            <SendBtn type="submit" disabled={loading || !input.trim()}>
              Send
            </SendBtn>
          </InputRow>
        </Panel>
      )}

      <Fab
        type="button"
        aria-label={open ? "Close assistant" : "Open assistant"}
        onClick={() => setOpen(!open)}
      >
        {open ? "×" : "?"}
      </Fab>
    </>
  );
}

export default memo(AssistantUI);
