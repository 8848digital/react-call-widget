import { useState, useCallback, useEffect } from "react";
import type { IncomingCallResponse, CallSocketAdapter, CallSocketPayload } from "../types/call";
import { TERMINAL_CALL_STATUSES } from "../types/call";

/**
 * Listens for incoming call events from the socket.
 *
 * Supports two modes:
 *  - Structured `socketAdapter` (preferred): event-driven callbacks.
 *  - Raw `socketPayload` pass-through (fallback): host app pushes payload on every render.
 *
 * @param socketAdapter  - Structured adapter from the host app.
 * @param socketPayload  - Raw socket payload pass-through.
 * @param onIncomingCall - Optional callback fired when an incoming call arrives.
 */
export function useIncomingCall(
  socketAdapter?: CallSocketAdapter,
  socketPayload?: CallSocketPayload,
  onIncomingCall?: (callData: IncomingCallResponse) => void
) {
  const [incomingCall, setIncomingCall] = useState<IncomingCallResponse | null>(null);

  /** Process a socket payload and trigger callbacks if it's an incoming call. */
  const processPayload = useCallback(
    (payload: CallSocketPayload) => {
      if (payload.event !== "exotel_call" || !payload.message) return;
      const callData = payload.message as IncomingCallResponse;

      if (callData.Direction !== "incoming") return;

      setIncomingCall(callData);
      onIncomingCall?.(callData);
    },
    [onIncomingCall]
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

  const displayStatus = incomingCall?.DialCallStatus || incomingCall?.Status || null;
  const isTerminalStatus =
    displayStatus != null && TERMINAL_CALL_STATUSES.has(displayStatus as string);

  const clearIncomingCall = useCallback(() => setIncomingCall(null), []);

  return { incomingCall, isTerminalStatus, displayStatus, clearIncomingCall };
}

export default useIncomingCall;
