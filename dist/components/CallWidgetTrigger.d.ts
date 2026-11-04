import { default as React } from 'react';
import { CallWidgetApiAdapter, CallWidgetConfig, CallSocketAdapter, CallSocketPayload, MakeCallLink } from '../types/call';
interface CallWidgetTriggerProps {
    apiAdapter?: CallWidgetApiAdapter;
    config?: CallWidgetConfig;
    socketAdapter?: CallSocketAdapter;
    baseURL?: string;
    token?: string;
    phone?: string | null;
    links?: MakeCallLink[];
    /** Raw socket.io message payload from host app (e.g. { event: "exotel_call", message: { ... } }) */
    socketPayload?: CallSocketPayload;
    /** Manual override for socket connection status (useful in pass-through mode) */
    socketConnected?: boolean;
    contactName?: string | null;
    /**
     * Called when the Call button is clicked, before the built-in flow starts.
     * Resolve `true` to continue with the built-in flow (confirmation modal, then `makeCall`).
     * Resolve `false` when the host app has handled the click itself (for example, with its own form).
     * While it is pending, the button shows its pending state and ignores clicks.
     */
    onBeforeCall?: () => boolean | Promise<boolean>;
    onEdit?: () => void;
    onScheduleReminder?: () => void;
    onMute?: () => void;
    onToggleSpeaker?: () => void;
    buttonLabel?: string;
    icon?: React.ReactNode;
    btnClassName?: string;
    variant?: "default" | "plain";
    showNotification?: (title: string, message: string) => void;
    showWarning?: (title: string, message: string) => void;
    showError?: (title: string, message: string) => void;
}
/**
 * All-in-One Component: Button + Internal State/Modal management.
 * Consistently handles both internal "Internal Mode" pass-through props or
 * explicit context overrides.
 */
export declare const CallWidgetTrigger: React.FC<CallWidgetTriggerProps>;
export default CallWidgetTrigger;
