import { CallWidgetApiAdapter, CallWidgetConfig, CallSocketAdapter, CallSocketPayload, MakeCallLink } from '../types/call';
interface CallWidgetResolutionParams {
    apiAdapter?: CallWidgetApiAdapter;
    config?: CallWidgetConfig;
    socketAdapter?: CallSocketAdapter;
    baseURL?: string;
    token?: string;
    phone?: string | null;
    links?: MakeCallLink[];
    socketPayload?: CallSocketPayload;
    socketConnected?: boolean;
    showNotification?: (title: string, message: string) => void;
    showWarning?: (title: string, message: string) => void;
    showError?: (title: string, message: string) => void;
}
/**
 * Resolves potential "Internal Mode" props into a full adapter/config or uses
 * explicitly passed overrides. Matches patterns from WhatsApp/Email packages.
 */
export declare function useCallWidgetResolution({ apiAdapter: externalApiAdapter, config: externalConfig, socketAdapter, baseURL, token, phone, links, socketPayload, socketConnected, showNotification, showWarning, showError, }: CallWidgetResolutionParams): {
    apiAdapter: CallWidgetApiAdapter | undefined;
    config: CallWidgetConfig;
    finalSocketAdapter: CallSocketAdapter | undefined;
    socketPayload: Record<string, unknown> | undefined;
};
export {};
