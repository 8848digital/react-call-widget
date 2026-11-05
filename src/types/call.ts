// ─── Exotel Call Response ─────────────────────────────────────────────────────

/**
 * Response returned by the make_a_call API and live status updates via socket.
 */
export interface ExotelCallResponse {
  Sid: string;
  ParentCallSid: string | null;
  DateCreated: string;
  DateUpdated: string;
  AccountSid: string;
  To: string;
  From: string;
  PhoneNumberSid: string;
  Status: "in-progress" | "completed" | "failed" | "busy" | "no-answer" | "canceled" | "incomplete";
  StartTime: string;
  EndTime: string | null;
  Duration: number | null;
  Price: number | null;
  Direction: string;
  AnsweredBy: string | null;
  ForwardedFrom: string | null;
  CallerName: string | null;
  Uri: string;
  RecordingUrl: string | null;
  CallSid: string;
}

// ─── Incoming Call Response ───────────────────────────────────────────────────

/**
 * Socket payload received when an incoming call arrives via `exotel_call` event.
 */
export interface IncomingCallResponse {
  AgentEmail?: string;
  CallFrom?: string;
  CallSid: string;
  CallTo?: string;
  Created?: string;
  CurrentTime?: string;
  DialWhomNumber?: string;
  Direction: string;
  EventType?: string;
  From?: string;
  Status?: string;
  To?: string;
  DialCallStatus?: "no-answer" | "incomplete" | "completed" | "busy" | "failed";
  DialCallDuration?: string;
  StartTime?: string;
  EndTime?: string;
  RecordingUrl?: string;
  [key: string]: unknown;
}

// ─── Shared API Wrappers ──────────────────────────────────────────────────────

/** Generic Frappe method response envelope. */
export interface FrappeMethodResponse<T> {
  message: T;
}

/** Link to associate with a call (e.g. CRM Task). */
export type MakeCallLink = {
  link_doctype: string;
  link_name: string;
} | Record<string, unknown>;

// ─── Socket ───────────────────────────────────────────────────────────────────

/**
 * Raw socket event payload forwarded from the host application.
 * The widget supports two modes:
 *  - Structured `SocketAdapter` (preferred, event-driven)
 *  - Raw `socketPayload` pass-through (fallback)
 */
export type CallSocketPayload = {
  event: string;
  message?: ExotelCallResponse | IncomingCallResponse | Record<string, unknown>;
  [key: string]: unknown;
} | Record<string, unknown>;

/**
 * Structured socket adapter that the host app provides.
 * The host owns the actual socket connection; this adapter is the bridge.
 */
export interface CallSocketAdapter {
  isConnected: boolean;
  /** Register a callback for `exotel_call` events. */
  onCallEvent: (cb: (payload: CallSocketPayload) => void) => void;
  /** Unregister a callback. */
  offCallEvent: (cb: (payload: CallSocketPayload) => void) => void;
}

// ─── API Adapter ──────────────────────────────────────────────────────────────

/** Adapter the host app injects to wire real API calls. */
export interface CallWidgetApiAdapter {
  /** Initiate an outgoing call. */
  makeCall: (toNumber: string, links?: MakeCallLink[]) => Promise<FrappeMethodResponse<ExotelCallResponse>>;
  /** Optional: Toast/notification helpers */
  showNotification?: (title: string, message: string) => void;
  showWarning?: (title: string, message: string) => void;
  showError?: (title: string, message: string) => void;
}

// ─── Widget Config ────────────────────────────────────────────────────────────

/** Configuration passed to the CallWidgetProvider. */
export interface CallWidgetConfig {
  /** Phone number to call by default. */
  defaultPhone?: string;
  /** Links to associate with the call (e.g. CRM Task). */
  links?: MakeCallLink[];
  /** Optional: API base URL (used by the default adapter). */
  apiBaseUrl?: string;
}

// ─── Call Status ──────────────────────────────────────────────────────────────

export type OutgoingCallStatus = ExotelCallResponse["Status"];
export type IncomingCallStatus = IncomingCallResponse["DialCallStatus"] | IncomingCallResponse["Status"];

/** Set of call statuses considered "terminal" (call has ended). */
export const TERMINAL_CALL_STATUSES = new Set([
  "completed",
  "failed",
  "busy",
  "no-answer",
  "canceled",
  "incomplete",
]);
