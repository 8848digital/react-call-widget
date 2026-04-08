import { IncomingCallResponse, CallSocketAdapter, CallSocketPayload } from '../types/call';
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
export declare function useIncomingCall(socketAdapter?: CallSocketAdapter, socketPayload?: CallSocketPayload, onIncomingCall?: (callData: IncomingCallResponse) => void): {
    incomingCall: IncomingCallResponse | null;
    isTerminalStatus: boolean;
    displayStatus: string | null;
    clearIncomingCall: () => void;
};
export default useIncomingCall;
