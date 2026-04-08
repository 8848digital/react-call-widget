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
