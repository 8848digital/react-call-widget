import { default as React } from 'react';
import { ExotelCallResponse } from '../types/call';
interface CallReceivedModalHeaderProps {
    callData: ExotelCallResponse | null;
}
/**
 * Header content for the call-received modal.
 * Shows the recording icon and a status badge.
 */
export declare function CallReceivedModalHeader({ callData }: CallReceivedModalHeaderProps): import("react/jsx-runtime").JSX.Element;
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
declare const CallReceivedModal: React.FC<CallReceivedModalProps>;
export default CallReceivedModal;
