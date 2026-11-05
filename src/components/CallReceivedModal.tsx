import React, { useEffect, useMemo } from "react";
import { NotePencil, Calendar, Recording } from "./common/Icons";
import Button from "./common/Button";
import type { ExotelCallResponse } from "../types/call";
import { getBadgeColor, formatPhoneNumber } from "../utils/callUtils";
import "../styles/call-received-modal.css";

// ─── Header ───────────────────────────────────────────────────────────────────

interface CallReceivedModalHeaderProps {
  callData: ExotelCallResponse | null;
}

/**
 * Header content for the call-received modal.
 * Shows the recording icon and a status badge.
 */
export function CallReceivedModalHeader({ callData }: CallReceivedModalHeaderProps) {
  return (
    <div className="call-received-header">
      <Recording size={25} color="#FF7575" />
      {callData?.Status && (
        <div
          className="call-status-badge"
          style={{
            backgroundColor: getBadgeColor(callData.Status).bgColor,
            color: getBadgeColor(callData.Status).textColor,
          }}
        >
          {callData.Status}
        </div>
      )}
    </div>
  );
}

// ─── Body ─────────────────────────────────────────────────────────────────────

const CALL_ACTION_ICON_COLOR = "#175353";

interface CallReceivedModalProps {
  /** Display name of the contact being called. */
  contactName?: string | null;
  /** Live call data from API / socket. */
  callData: ExotelCallResponse | null;
  /** Called when the user dismisses the modal or auto-close fires. */
  onEndCall: () => void;
  /** Opens the notes editor. */
  onEdit?: () => void;
  /** Opens the schedule/reminder drawer. */
  onScheduleReminder?: () => void;
  /** Optional: Mute the call. */
  onMute?: () => void;
  /** Optional: Toggle speaker. */
  onToggleSpeaker?: () => void;
}

/**
 * Modal body shown during/after an outgoing call.
 * - Displays contact name, call-to number, and status badge.
 * - Auto-closes 10 seconds after reaching a terminal status.
 * - Action buttons: add note, schedule reminder.
 */
const CallReceivedModal: React.FC<CallReceivedModalProps> = ({
  contactName,
  callData,
  onEndCall,
  onEdit,
  onScheduleReminder,
}) => {
  const isTerminalStatus = useMemo(() => {
    const s = callData?.Status;
    return (
      s === "failed" ||
      s === "incomplete" ||
      s === "no-answer" ||
      s === "busy" ||
      s === "canceled" ||
      s === "completed"
    );
  }, [callData?.Status]);

  // Auto-close 10 s after terminal status
  useEffect(() => {
    if (!isTerminalStatus || !callData?.Status) return;
    const timer = setTimeout(onEndCall, 10_000);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callData?.Status]);

  return (
    <div className="call-received-modal">
      <div className="call-received-content">
        {contactName && <div className="caller-name">{contactName}</div>}

        {callData?.Status === "in-progress" && (
          <div className="calling-indicator">
            <span className="calling-text">Calling...</span>
          </div>
        )}

        {callData && (
          <div className="call-details">
            <div className="call-phone-info">
              <span className="call-label">To:</span>
              <span className="call-phone">{formatPhoneNumber(callData.To)}</span>
            </div>
          </div>
        )}
      </div>

      <div className="call-controls">
        {onEdit && (
          <Button
            icon={
              <span className="cursor-pointer">
                <NotePencil size={24} color={CALL_ACTION_ICON_COLOR} />
              </span>
            }
            onClick={onEdit}
            type="button"
            className="call-control-button"
          />
        )}
        {onScheduleReminder && (
          <Button
            icon={
              <span className="cursor-pointer">
                <Calendar size={24} color={CALL_ACTION_ICON_COLOR} />
              </span>
            }
            onClick={onScheduleReminder}
            type="button"
            className="call-control-button"
          />
        )}
      </div>
    </div>
  );
};

export default CallReceivedModal;
