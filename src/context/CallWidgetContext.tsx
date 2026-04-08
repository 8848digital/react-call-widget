import React, { createContext, useContext } from "react";
import type {
  CallWidgetApiAdapter,
  CallWidgetConfig,
  CallSocketAdapter,
  CallSocketPayload,
} from "../types/call";

// ─── Context Shape ─────────────────────────────────────────────────────────────

interface CallWidgetContextProps {
  apiAdapter: CallWidgetApiAdapter;
  config: CallWidgetConfig;
  /** Structured socket adapter (preferred mode). */
  socketAdapter?: CallSocketAdapter;
  /** Raw socket payload pass-through (fallback mode). */
  socketPayload?: CallSocketPayload;
}

const CallWidgetContext = createContext<CallWidgetContextProps | undefined>(undefined);

// ─── Provider ─────────────────────────────────────────────────────────────────

export const CallWidgetProvider = ({
  apiAdapter,
  config,
  socketAdapter,
  socketPayload,
  children,
}: CallWidgetContextProps & { children: React.ReactNode }) => {
  return (
    <CallWidgetContext.Provider value={{ apiAdapter, config, socketAdapter, socketPayload }}>
      {children}
    </CallWidgetContext.Provider>
  );
};

// ─── Consumer Hook ────────────────────────────────────────────────────────────

export const useCallWidgetConfig = (): CallWidgetContextProps => {
  const ctx = useContext(CallWidgetContext);
  if (!ctx) throw new Error("useCallWidgetConfig must be used within a <CallWidgetProvider>");
  return ctx;
};
