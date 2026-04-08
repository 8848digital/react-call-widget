import { ExotelCallResponse, FrappeMethodResponse, MakeCallLink } from '../types/call';
/**
 * Creates a minimal fetch-based HTTP client.
 * Mirrors the same pattern used by react-activity-timeline-widget.
 */
export declare const createDefaultCallApiClient: (baseURL?: string, token?: string) => {
    get: <T>(endpoint: string) => Promise<T>;
    post: <T>(endpoint: string, body?: unknown) => Promise<T>;
};
/**
 * Factory that returns all call-related API methods bound to a client instance.
 *
 * @example
 * ```ts
 * const client = createDefaultCallApiClient("https://your-erp.com", token);
 * const api = callApi(client);
 * const result = await api.makeCall("+919876543210");
 * ```
 */
export declare const callApi: (client: ReturnType<typeof createDefaultCallApiClient>) => {
    /**
     * Initiate an outgoing call via Exotel.
     * Endpoint: /api/method/crm_integration.crm_exotel.api.handler.make_a_call
     */
    makeCall: (toNumber: string, links?: MakeCallLink[]) => Promise<FrappeMethodResponse<ExotelCallResponse>>;
};
