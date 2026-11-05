import { ExotelCallResponse, CallSocketAdapter, CallSocketPayload } from '../types/call';
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
export declare function useCallStatus(callSid: string | null, socketAdapter?: CallSocketAdapter, socketPayload?: CallSocketPayload, onStatusUpdate?: (data: ExotelCallResponse) => void): {
    callStatus: ExotelCallResponse | null;
    isTerminalStatus: boolean;
};
export default useCallStatus;
