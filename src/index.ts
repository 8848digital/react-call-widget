// ─── Components ───────────────────────────────────────────────────────────────
export { default as CallConfirmationModal } from "./components/CallConfirmationModal";
export { default as CallWidgetTrigger } from "./components/CallWidgetTrigger";
export { default as CallReceivedModal } from "./components/CallReceivedModal";
export { CallReceivedModalHeader } from "./components/CallReceivedModal";
export { default as IncomingCallModal } from "./components/IncomingCallModal";
export { IncomingCallModalHeader } from "./components/IncomingCallModal";

// ─── Context ──────────────────────────────────────────────────────────────────
export { CallWidgetProvider, useCallWidgetConfig } from "./context/CallWidgetContext";

// ─── Hooks ────────────────────────────────────────────────────────────────────
export { useCallWidgetLogic } from "./hooks/useCallWidgetLogic";
export type { UseCallWidgetLogicReturn } from "./hooks/useCallWidgetLogic";
export { useCallStatus } from "./hooks/useCallStatus";
export { useIncomingCall } from "./hooks/useIncomingCall";
export { useDefaultCallAdapter } from "./hooks/useDefaultCallAdapter";
export type { DefaultCallAdapterParams, DefaultCallAdapterResult } from "./hooks/useDefaultCallAdapter";

// ─── API ──────────────────────────────────────────────────────────────────────
export { createDefaultCallApiClient, callApi } from "./api/call";

// ─── Types ────────────────────────────────────────────────────────────────────
export * from "./types/call";

// ─── Utils ────────────────────────────────────────────────────────────────────
export { getBadgeColor, formatPhoneNumber, formatCallDuration } from "./utils/callUtils";

// ─── Styles ───────────────────────────────────────────────────────────────────
import "./styles/call-widget.css";
import "./styles/call-received-modal.css";
import "./styles/incoming-call-modal.css";
