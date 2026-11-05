import type { ExotelCallResponse, FrappeMethodResponse, MakeCallLink } from "../types/call";

// ─── Default Fetch-based API Client ──────────────────────────────────────────

/**
 * Creates a minimal fetch-based HTTP client.
 * Mirrors the same pattern used by react-activity-timeline-widget.
 */
export const createDefaultCallApiClient = (baseURL: string = "/", token?: string) => {
  const defaultHeaders: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) {
    defaultHeaders["Authorization"] = `token ${token}`;
  }

  const apiFetch = async <T>(endpoint: string, options: RequestInit = {}): Promise<T> => {
    const headers: Record<string, string> = { ...defaultHeaders };

    if (options.headers) {
      const existing = new Headers(options.headers);
      Object.assign(headers, Object.fromEntries(existing.entries()));
    }

    const url = endpoint.startsWith("http") ? endpoint : `${baseURL.replace(/\/$/, "")}${endpoint}`;
    const response = await fetch(url, { ...options, headers });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json() as Promise<T>;
  };

  return {
    get: <T>(endpoint: string) => apiFetch<T>(endpoint, { method: "GET" }),
    post: <T>(endpoint: string, body?: unknown) =>
      apiFetch<T>(endpoint, {
        method: "POST",
        body: body !== undefined ? JSON.stringify(body) : undefined,
      }),
  };
};

// ─── Call API Methods ─────────────────────────────────────────────────────────

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
export const callApi = (client: ReturnType<typeof createDefaultCallApiClient>) => ({
  /**
   * Initiate an outgoing call via Exotel.
   * Endpoint: /api/method/crm_integration.crm_exotel.api.handler.make_a_call
   */
  makeCall: async (
    toNumber: string,
    links?: MakeCallLink[]
  ): Promise<FrappeMethodResponse<ExotelCallResponse>> => {
    const params = new URLSearchParams();
    params.set("to_number", toNumber);
    if (links?.length) {
      params.set("links", JSON.stringify(links));
    }
    const url = `/api/method/crm_integration.crm_exotel.api.handler.make_a_call?${params.toString()}`;
    return client.get<FrappeMethodResponse<ExotelCallResponse>>(url);
  },
});
