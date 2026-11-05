import { ExotelCallResponse, MakeCallLink } from '../types/call';
import { useIncomingCall } from './useIncomingCall';
export interface UseCallWidgetLogicReturn {
    callData: ExotelCallResponse | null;
    callSid: string | null;
    isCallPending: boolean;
    isTerminalStatus: boolean;
    isCallConfirmationOpen: boolean;
    isCallReceivedModalOpen: boolean;
    incomingCallData: ReturnType<typeof useIncomingCall>["incomingCall"];
    isIncomingCallTerminalStatus: boolean;
    isIncomingCallModalOpen: boolean;
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
export declare function useCallWidgetLogic(): UseCallWidgetLogicReturn;
