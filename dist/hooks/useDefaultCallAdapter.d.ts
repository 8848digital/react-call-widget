import { CallWidgetApiAdapter, CallWidgetConfig, MakeCallLink } from '../types/call';
export interface DefaultCallAdapterParams {
    /** API base URL (e.g. "https://your-erp.com") */
    baseURL?: string;
    /** Auth token for API requests */
    token?: string;
    /** Default phone number to populate in the dialer */
    defaultPhone?: string;
    /** Links to associate with calls (e.g. CRM Task) */
    links?: MakeCallLink[];
    /** Notification helpers */
    showNotification?: (title: string, message: string) => void;
    showWarning?: (title: string, message: string) => void;
    showError?: (title: string, message: string) => void;
}
export interface DefaultCallAdapterResult {
    apiAdapter: CallWidgetApiAdapter;
    config: CallWidgetConfig;
}
/**
 * Creates the default Frappe-compatible adapter and config.
 * Use this hook in the host app to get the `apiAdapter` and `config`
 * to pass to `<CallWidgetProvider>`.
 *
 * @example
 * ```tsx
 * const { apiAdapter, config } = useDefaultCallAdapter({
 *   baseURL: API_BASE_URL,
 *   token: authToken,
 *   defaultPhone: contact.mobile_no,
 *   links: [{ link_doctype: "CRM Task", link_name: taskName }],
 * });
 *
 * <CallWidgetProvider apiAdapter={apiAdapter} config={config}>
 *   <CallConfirmationModal ... />
 * </CallWidgetProvider>
 * ```
 */
export declare function useDefaultCallAdapter({ baseURL, token, defaultPhone, links, showNotification, showWarning, showError, }: DefaultCallAdapterParams): DefaultCallAdapterResult;
