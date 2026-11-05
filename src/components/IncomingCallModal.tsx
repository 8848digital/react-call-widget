import React, { useMemo, useEffect } from "react";
import { Phone, Recording } from "./common/Icons";
import Button from "./common/Button";
import type { IncomingCallResponse } from "../types/call";
import { getBadgeColor, formatPhoneNumber } from "../utils/callUtils";
import "../styles/incoming-call-modal.css";

// ─── Header ───────────────────────────────────────────────────────────────────

interface IncomingCallModalHeaderProps {
  callData: IncomingCallResponse | null;
}

/**
 * Header content for the incoming call modal.
 * Shows the recording icon and the current call/dial status badge.
 */
export function IncomingCallModalHeader({ callData }: IncomingCallModalHeaderProps) {
  const displayStatus = useMemo(() => {
    if (!callData) return null;
    return callData.DialCallStatus || callData.Status || "in-progress";
  }, [callData]);

  return (
    <div className="incoming-call-header">
      <Recording size={25} color="#FF7575" />
      {displayStatus && (
        <div
          className="call-status-badge"
          style={{
            backgroundColor: getBadgeColor(displayStatus).bgColor,
            color: getBadgeColor(displayStatus).textColor,
          }}
        >
          {displayStatus}
        </div>
      )}
    </div>
  );
}

// ─── Body ─────────────────────────────────────────────────────────────────────

interface IncomingCallModalProps {
  /** Display name of the incoming caller (looked-up from CRM). */
  contactName?: string | null;
  /** Live incoming call data from socket. */
  callData: IncomingCallResponse | null;
  /** Called when user taps the green Accept button. */
  onAccept: () => void;
  /**
   * Called when user taps the Decline button.
   * Kept in interface for API compatibility; host app can wire its own logic.
   */
  onDecline?: () => void;
  /** Called when the modal is dismissed after a terminal status. */
  onEndCall: () => void;
}

/**
 * Modal body shown when an incoming call is detected.
 * - Displays caller info (from number, agent email).
 * - Shows Accept button while call is active.
 * - Hides controls once a terminal status is reached.
 */
const IncomingCallModal: React.FC<IncomingCallModalProps> = ({
  contactName,
  callData,
  onAccept,
  onEndCall,
}) => {
  const displayStatus = useMemo(() => {
    if (!callData) return null;
    return callData.DialCallStatus || callData.Status || "in-progress";
  }, [callData]);

  const isTerminalStatus = useMemo(() => {
    return (
      displayStatus === "no-answer" ||
      displayStatus === "incomplete" ||
      displayStatus === "completed" ||
      displayStatus === "busy" ||
      displayStatus === "failed" ||
      displayStatus === "canceled"
    );
  }, [displayStatus]);

  // Auto-close 10 s after terminal status
  useEffect(() => {
    if (!isTerminalStatus || !displayStatus) return;
    const timer = setTimeout(onEndCall, 10_000);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayStatus]);

  return (
    <div className="incoming-call-modal">
      <div className="incoming-call-content">
        {contactName && <div className="caller-name">{contactName}</div>}
        <div className="incoming-call-text">Incoming call</div>

        {callData && (
          <div className="call-details">
            {(callData.CallFrom || callData.From) && (
              <div className="call-phone-info">
                <span className="call-label">From:</span>
                <span className="call-phone">
                  {formatPhoneNumber(callData.CallFrom || callData.From)}
                </span>
              </div>
            )}
            {callData.AgentEmail && (
              <div className="call-phone-info">
                <span className="call-label">Agent:</span>
                <span className="call-phone">{callData.AgentEmail}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {!isTerminalStatus && (
        <div className="incoming-call-controls">
          <Button
            icon={
              <span className="cursor-pointer">
                <Phone size={24} color="#ffffff" />
              </span>
            }
            onClick={onAccept}
            type="button"
            className="incoming-call-button"
            style={{ backgroundColor: "#10b981" }}
          />
        </div>
      )}
    </div>
  );
};

export default IncomingCallModal;
