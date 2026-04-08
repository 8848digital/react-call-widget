import { useMemo } from "react";
import type {
  CallWidgetApiAdapter,
  CallWidgetConfig,
  CallSocketAdapter,
  CallSocketPayload,
  MakeCallLink,
} from "../types/call";
import { createDefaultCallApiClient, callApi } from "../api/call";

interface CallWidgetResolutionParams {
  // Direct inject (highest priority)
  apiAdapter?: CallWidgetApiAdapter;
  config?: CallWidgetConfig;
  socketAdapter?: CallSocketAdapter;

  // Pass-through props (internal mode)
  baseURL?: string;
  token?: string;
  phone?: string | null;
  links?: MakeCallLink[];
  socketPayload?: CallSocketPayload;
  socketConnected?: boolean;

  // Feedback callbacks
  showNotification?: (title: string, message: string) => void;
  showWarning?: (title: string, message: string) => void;
  showError?: (title: string, message: string) => void;
}

/**
 * Resolves potential "Internal Mode" props into a full adapter/config or uses 
 * explicitly passed overrides. Matches patterns from WhatsApp/Email packages.
 */
export function useCallWidgetResolution({
  apiAdapter: externalApiAdapter,
  config: externalConfig,
  socketAdapter,
  baseURL,
  token,
  phone,
  links = [],
  socketPayload,
  socketConnected,
  showNotification,
  showWarning,
  showError,
}: CallWidgetResolutionParams) {
  // 1. Final Adapter: either external or internal client
  const apiAdapter = useMemo(() => {
    if (externalApiAdapter) return externalApiAdapter;
    if (baseURL) {
      const client = createDefaultCallApiClient(baseURL, token);
      const api = callApi(client);
      return {
        ...api,
        showNotification,
        showWarning,
        showError,
      } as CallWidgetApiAdapter;
    }
    return undefined;
  }, [externalApiAdapter, baseURL, token, showNotification, showWarning, showError]);

  // 2. Final Config
  const config = useMemo((): CallWidgetConfig => {
    if (externalConfig) return externalConfig;
    return {
      defaultPhone: phone || "",
      links: links,
    };
  }, [externalConfig, phone, links]);

  // 3. Socket: we pass through socketConnected flag if provided
  const finalSocketAdapter = useMemo(() => {
    if (socketAdapter) return socketAdapter;
    return undefined;
  }, [socketAdapter]);

  return { 
    apiAdapter, 
    config, 
    finalSocketAdapter,
    socketPayload: (socketConnected !== false) ? socketPayload : undefined 
  };
}
