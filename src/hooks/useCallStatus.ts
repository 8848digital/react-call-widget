import { useState, useCallback, useEffect } from "react";
import type { ExotelCallResponse, CallSocketAdapter, CallSocketPayload } from "../types/call";
import { TERMINAL_CALL_STATUSES } from "../types/call";

/**
 * Listens for outgoing call status updates from the socket.
 *
 * Supports two modes:
 *  - Structured `socketAdapter` (preferred): event-driven callbacks.
 *  - Raw `socketPayload` pass-through (fallback): host app pushes payload on every render.
 *
 * @param callSid   - Only apply updates that match this CallSid. Pass null to accept any.
 * @param socketAdapter  - Structured adapter from the host app.
 * @param socketPayload  - Raw socket payload pass-through.
 * @param onStatusUpdate - Optional callback fired on every status change.
 */
export function useCallStatus(
  callSid: string | null,
  socketAdapter?: CallSocketAdapter,
  socketPayload?: CallSocketPayload,
  onStatusUpdate?: (data: ExotelCallResponse) => void
) {
  const [callStatus, setCallStatus] = useState<ExotelCallResponse | null>(null);

  /** Process a socket payload and update state if relevant. */
  const processPayload = useCallback(
    (payload: CallSocketPayload) => {
      if (payload.event !== "exotel_call" || !payload.message) return;
      const update = payload.message as ExotelCallResponse;

      // Ignore if a specific callSid is required and this update is for a different call
      if (callSid && update.CallSid && update.CallSid !== callSid) return;

      setCallStatus(update);
      onStatusUpdate?.(update);
    },
    [callSid, onStatusUpdate]
  );

  // Case A: structured socket adapter
  useEffect(() => {
    if (!socketAdapter?.onCallEvent) return;
    const handler = (payload: CallSocketPayload) => processPayload(payload);
    socketAdapter.onCallEvent(handler);
    return () => socketAdapter.offCallEvent(handler);
  }, [socketAdapter, processPayload]);

  // Case B: raw pass-through payload
  useEffect(() => {
    if (!socketPayload || socketAdapter?.onCallEvent) return;
    processPayload(socketPayload);
  }, [socketPayload, socketAdapter, processPayload]);

  const isTerminalStatus =
    callStatus?.Status != null && TERMINAL_CALL_STATUSES.has(callStatus.Status);

  return { callStatus, isTerminalStatus };
}

export default useCallStatus;
