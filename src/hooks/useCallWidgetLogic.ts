import { useState, useCallback } from "react";
import type {
  ExotelCallResponse,
  MakeCallLink,
  CallSocketAdapter,
  CallSocketPayload,
} from "../types/call";
import { useCallWidgetConfig } from "../context/CallWidgetContext";
import { useCallStatus } from "./useCallStatus";
import { useIncomingCall } from "./useIncomingCall";

export interface UseCallWidgetLogicReturn {
  // ── Outgoing call state ──
  callData: ExotelCallResponse | null;
  callSid: string | null;
  isCallPending: boolean;
  isTerminalStatus: boolean;
  isCallConfirmationOpen: boolean;
  isCallReceivedModalOpen: boolean;
  // ── Incoming call state ──
  incomingCallData: ReturnType<typeof useIncomingCall>["incomingCall"];
  isIncomingCallTerminalStatus: boolean;
  isIncomingCallModalOpen: boolean;
  // ── Actions ──
  handleCallClick: () => void;
  handleConfirmCall: (toNumber?: string, links?: MakeCallLink[]) => Promise<void>;
  handleCancelCall: () => void;
  handleEndCall: () => void;
  handleAcceptCall: () => void;
  handleDeclineCall: () => void;
  handleEndIncomingCall: () => void;
}

/**
 * Core logic hook for the Call Widget.
 * Orchestrates outgoing call initiation, socket-based status updates,
 * and incoming call handling. All state and modal open/close logic lives here.
 */
export function useCallWidgetLogic(): UseCallWidgetLogicReturn {
  const { apiAdapter, config, socketAdapter, socketPayload } = useCallWidgetConfig();

  // ── Outgoing call state ──────────────────────────────────────────────────────
  const [callData, setCallData] = useState<ExotelCallResponse | null>(null);
  const [callSid, setCallSid] = useState<string | null>(null);
  const [isCallPending, setIsCallPending] = useState(false);
  const [isCallConfirmationOpen, setIsCallConfirmationOpen] = useState(false);
  const [isCallReceivedModalOpen, setIsCallReceivedModalOpen] = useState(false);

  // ── Incoming call state ──────────────────────────────────────────────────────
  const [isIncomingCallModalOpen, setIsIncomingCallModalOpen] = useState(false);

  // ── Socket: outgoing call status ─────────────────────────────────────────────
  const { callStatus, isTerminalStatus } = useCallStatus(
    callSid,
    socketAdapter as CallSocketAdapter | undefined,
    socketPayload as CallSocketPayload | undefined,
    (update) => {
      setCallData(update);
    }
  );

  // ── Socket: incoming call ─────────────────────────────────────────────────────
  const { incomingCall: incomingCallData, isTerminalStatus: isIncomingCallTerminalStatus, clearIncomingCall } = useIncomingCall(
    socketAdapter as CallSocketAdapter | undefined,
    socketPayload as CallSocketPayload | undefined,
    () => {
      setIsIncomingCallModalOpen(true);
    }
  );

  // ── Handlers: outgoing flow ───────────────────────────────────────────────────

  /** Step 1: user clicks the call button → show confirmation dialog. */
  const handleCallClick = useCallback(() => {
    setIsCallConfirmationOpen(true);
  }, []);

  /** Step 2: user confirms → initiate call via API adapter. */
  const handleConfirmCall = useCallback(
    async (toNumber?: string, links?: MakeCallLink[]) => {
      const phone = toNumber || config.defaultPhone;
      if (!phone) {
        apiAdapter.showWarning?.("No Number", "No phone number provided.");
        return;
      }

      setIsCallConfirmationOpen(false);
      setIsCallPending(true);

      try {
        const response = await apiAdapter.makeCall(phone, links ?? config.links);
        const callInfo = response.message;
        setCallData(callInfo);
        setCallSid(callInfo.CallSid || callInfo.Sid || null);
        setIsCallReceivedModalOpen(true);
        apiAdapter.showNotification?.("Call", "Call initiated successfully.");
      } catch (err) {
        console.error("Failed to initiate call:", err);
        apiAdapter.showError?.("Call Failed", "Could not initiate the call. Please try again.");
      } finally {
        setIsCallPending(false);
      }
    },
    [apiAdapter, config]
  );

  /** Cancel confirmation dialog without calling. */
  const handleCancelCall = useCallback(() => {
    setIsCallConfirmationOpen(false);
  }, []);

  /** End / close the outgoing call modal. */
  const handleEndCall = useCallback(() => {
    setIsCallReceivedModalOpen(false);
    setCallData(null);
    setCallSid(null);
  }, []);

  // ── Handlers: incoming flow ───────────────────────────────────────────────────

  const handleAcceptCall = useCallback(() => {
    // Host app handles the actual accept logic; widget just reflects state.
  }, []);

  const handleDeclineCall = useCallback(() => {
    setIsIncomingCallModalOpen(false);
    clearIncomingCall();
  }, [clearIncomingCall]);

  const handleEndIncomingCall = useCallback(() => {
    setIsIncomingCallModalOpen(false);
    clearIncomingCall();
  }, [clearIncomingCall]);

  return {
    // Outgoing
    callData: callStatus ?? callData,
    callSid,
    isCallPending,
    isTerminalStatus,
    isCallConfirmationOpen,
    isCallReceivedModalOpen,
    // Incoming
    incomingCallData,
    isIncomingCallTerminalStatus,
    isIncomingCallModalOpen,
    // Actions
    handleCallClick,
    handleConfirmCall,
    handleCancelCall,
    handleEndCall,
    handleAcceptCall,
    handleDeclineCall,
    handleEndIncomingCall,
  };
}
