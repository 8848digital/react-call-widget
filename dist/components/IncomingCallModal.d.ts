import { default as React } from 'react';
import { IncomingCallResponse } from '../types/call';
interface IncomingCallModalHeaderProps {
    callData: IncomingCallResponse | null;
}
/**
 * Header content for the incoming call modal.
 * Shows the recording icon and the current call/dial status badge.
 */
export declare function IncomingCallModalHeader({ callData }: IncomingCallModalHeaderProps): import("react/jsx-runtime").JSX.Element;
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
declare const IncomingCallModal: React.FC<IncomingCallModalProps>;
export default IncomingCallModal;
