# React Call Widget 📞

A drop-in React call widget for CRMs built on **Frappe + Exotel**. It renders a Call button, confirms the call, places it through your backend, and shows live call status and incoming calls from your app's socket events.

- **npm:** [`react-call-widget`](https://www.npmjs.com/package/react-call-widget) (latest: **1.1.0**)
- **Maintainer:** 8848 Digital
- **License:** MIT

---

## Contents

- [Features](#-features)
- [Requirements](#-requirements)
- [Installation](#-installation)
- [Quick start](#-quick-start)
- [How it works](#-how-it-works)
- [Integration modes](#-integration-modes)
  - [1. Internal mode (baseURL + token)](#1-internal-mode-baseurl--token)
  - [2. Raw socket pass-through](#2-raw-socket-pass-through)
  - [3. Custom adapters](#3-custom-adapters)
  - [4. Provider + hooks (build your own UI)](#4-provider--hooks-build-your-own-ui)
- [Intercepting the click: `onBeforeCall`](#-intercepting-the-click-onbeforecall)
- [`CallWidgetTrigger` props](#-callwidgettrigger-props)
- [Backend contract](#-backend-contract)
- [Socket contract](#-socket-contract)
- [API reference](#-api-reference)
- [Styling](#-styling)
- [Known limitations](#-known-limitations)
- [Development](#-development)
- [Releasing](#-releasing)
- [Changelog](#-changelog)

---

## ✨ Features

- **One-component integration.** `<CallWidgetTrigger />` renders the button, the confirmation dialog, the live call modal and the incoming-call modal.
- **Outgoing calls through Exotel.** The widget calls the Frappe method `crm_integration.crm_exotel.api.handler.make_a_call` and links the call to CRM records (`links`).
- **Live status.** Status updates from `exotel_call` socket events drive a coloured status badge. The modal closes itself 10 seconds after the call reaches a final status.
- **Incoming calls.** `exotel_call` events with `Direction: "incoming"` open an incoming-call modal showing the caller's number.
- **Host hook before calling.** `onBeforeCall` lets the host decide at click time whether to run the built-in flow or handle the click itself (since 1.1.0).
- **Bring your own plumbing.** Use the built-in fetch client, or inject your own API adapter, socket adapter and toast functions.
- **Headless option.** All hooks and modal components are exported, so you can build your own UI on the same state machine.
- **TypeScript.** Full type declarations ship with the package.

---

## 📋 Requirements

| Dependency | Version |
| ---------- | ------- |
| `react` / `react-dom` | 19.x (see [Known limitations](#-known-limitations) for React 18) |
| `@phosphor-icons/react` | 2.1.x (installed automatically as a dependency) |
| Backend | Frappe with the `crm_integration` app's Exotel handler, or your own endpoint through a custom `apiAdapter` |
| Realtime | Any socket client that delivers `exotel_call` events (e.g. Frappe's socket.io) |

---

## 🛠️ Installation

```bash
npm install react-call-widget
```

Installing straight from GitHub also works (the built `dist/` is committed):

```bash
npm install github:8848digital/react-call-widget
```

---

## 🚀 Quick start

```tsx
"use client"; // Next.js App Router: render it from a client component

import { CallWidgetTrigger } from "react-call-widget";

export function ContactCallButton({ contact, taskName, socketPayload, isConnected, token }) {
  return (
    <CallWidgetTrigger
      baseURL={process.env.NEXT_PUBLIC_API_BASE_URL}
      token={token}
      phone={contact.mobile_no}
      contactName={contact.full_name}
      links={[{ link_doctype: "CRM Task", link_name: taskName }]}
      socketPayload={socketPayload}
      socketConnected={isConnected}
      showNotification={(title, msg) => toast.success(msg)}
      showWarning={(title, msg) => toast.warning(msg)}
      showError={(title, msg) => toast.error(msg)}
    />
  );
}
```

That is all that is needed: the styles are injected automatically when the package is imported.

> `CallWidgetTrigger` renders **nothing** unless it can build an API adapter: pass either `baseURL` or `apiAdapter`.

---

## 🔄 How it works

### Outgoing call

```
Call button clicked
   │
   ├─ onBeforeCall?()  ── resolves false ──▶ stop (host handled it)
   │        │ resolves true (or prop not given)
   ▼        ▼
Confirmation dialog ("Are you sure you want to initiate this call?")
   │  Yes
   ▼
apiAdapter.makeCall(phone, links)        button shows "Calling..." / "..."
   │  success → showNotification("Call", "Call initiated successfully.")
   │  failure → showError("Call Failed", ...)
   ▼
Call status modal (bottom-left, draggable)
   │  exotel_call socket events with the same CallSid update the badge
   ▼
Final status (completed / failed / busy / no-answer / canceled / incomplete)
   │  close button appears; modal auto-closes after 10 s
   ▼
Done
```

While the modal is open, two optional action buttons can be shown: **Add note** (`onEdit`) and **Schedule reminder** (`onScheduleReminder`).

### Incoming call

```
exotel_call socket event with Direction: "incoming"
   ▼
Incoming call modal (bottom-right, draggable)
   │  shows "Incoming call", From number, Agent email, status badge
   │  later events update DialCallStatus / Status
   ▼
Final status → close button appears; modal auto-closes after 10 s
```

### Call statuses

| Status | Badge | Final? |
| ------ | ----- | ------ |
| `in-progress` | blue | no |
| `calling` | green | no |
| `completed` | light blue | yes |
| `failed`, `busy`, `no-answer`, `canceled` | red | yes |
| `incomplete` | grey | yes |
| anything else | neutral grey | no |

---

## 🧩 Integration modes

### 1. Internal mode (baseURL + token)

The simplest setup. The widget builds a fetch client from `baseURL` and `token` and calls the Frappe endpoint itself (see [Backend contract](#-backend-contract)).

```tsx
<CallWidgetTrigger
  baseURL="https://crm.example.com"
  token="api_key:api_secret"
  phone="9876543210"
  contactName="John Doe"
  links={[{ link_doctype: "CRM Lead", link_name: "CRM-LEAD-0001" }]}
/>
```

The token is sent as `Authorization: token <token>`, which is Frappe's API-key format.

### 2. Raw socket pass-through

If your app already owns the socket connection, pass the **latest received message** as `socketPayload`. The widget reads `payload.event === "exotel_call"` and `payload.message`.

```tsx
const [socketPayload, setSocketPayload] = useState();
const { isConnected } = useSocket(setSocketPayload, { onlyEvents: ["exotel_call"] });

<CallWidgetTrigger
  baseURL={API_BASE_URL}
  token={token}
  phone={phone}
  socketPayload={socketPayload}        // { event: "exotel_call", message: { ... } }
  socketConnected={isConnected}        // false → payloads are ignored
/>
```

Pass a **new object** for every event. The widget only sees the value it receives on each render (see [Known limitations](#-known-limitations)).

### 3. Custom adapters

Use adapters when you want full control: your own HTTP client, React Query, a different endpoint, or an event-based socket bridge.

```tsx
import {
  CallWidgetTrigger,
  type CallWidgetApiAdapter,
  type CallSocketAdapter,
  type CallSocketPayload,
} from "react-call-widget";

export function MyCallIntegration({ phone, contactName }) {
  const { showSuccess, showError } = useNotification();

  // 1. API adapter: how a call is placed
  const apiAdapter: CallWidgetApiAdapter = useMemo(() => ({
    makeCall: async (toNumber, links) => {
      const res = await myBackend.post("/api/method/make_call", { phone: toNumber, links });
      return { message: res.data.message }; // must resolve to { message: ExotelCallResponse }
    },
    showNotification: (_title, msg) => showSuccess(msg),
    showError: (_title, msg) => showError(msg),
  }), [showSuccess, showError]);

  // 2. Socket adapter: forward exotel_call events to the widget
  const listeners = useRef(new Set<(p: CallSocketPayload) => void>());
  const { isConnected } = useSocket((data) => {
    if (data.event === "exotel_call") listeners.current.forEach((cb) => cb(data));
  });

  const socketAdapter: CallSocketAdapter = useMemo(() => ({
    isConnected,
    onCallEvent: (cb) => listeners.current.add(cb),
    offCallEvent: (cb) => listeners.current.delete(cb),
  }), [isConnected]);

  return (
    <CallWidgetTrigger
      apiAdapter={apiAdapter}
      socketAdapter={socketAdapter}
      phone={phone}
      contactName={contactName}
    />
  );
}
```

Rules for adapters:

- `onCallEvent` / `offCallEvent` must add and remove **the same function reference**. The Set pattern above does this. Don't wrap `cb` in a new function inside `onCallEvent`, or `offCallEvent` can't remove it.
- Each payload passed to `cb` must have the shape `{ event: "exotel_call", message: {...} }`.
- When `socketAdapter` is given, `socketPayload` is ignored.
- Passing `config` (`{ defaultPhone, links }`) overrides the `phone` and `links` props.

### 4. Provider + hooks (build your own UI)

To keep the logic but render your own button and modals, wrap your UI in `CallWidgetProvider` and use `useCallWidgetLogic`. `useDefaultCallAdapter` builds the same Frappe adapter that internal mode uses.

```tsx
import {
  CallWidgetProvider,
  useDefaultCallAdapter,
  useCallWidgetLogic,
  CallConfirmationModal,
  CallReceivedModal,
  CallReceivedModalHeader,
} from "react-call-widget";

function CallFeature({ phone, taskName, token, socketPayload }) {
  const { apiAdapter, config } = useDefaultCallAdapter({
    baseURL: API_BASE_URL,
    token,
    defaultPhone: phone,
    links: [{ link_doctype: "CRM Task", link_name: taskName }],
  });

  return (
    <CallWidgetProvider apiAdapter={apiAdapter} config={config} socketPayload={socketPayload}>
      <MyCallUI />
    </CallWidgetProvider>
  );
}

function MyCallUI() {
  const {
    callData, isCallPending, isTerminalStatus,
    isCallConfirmationOpen, isCallReceivedModalOpen,
    handleCallClick, handleConfirmCall, handleCancelCall, handleEndCall,
  } = useCallWidgetLogic();

  return (
    <>
      <button onClick={handleCallClick} disabled={isCallPending}>Call</button>

      <CallConfirmationModal
        open={isCallConfirmationOpen}
        onClose={handleCancelCall}
        onConfirm={() => handleConfirmCall()}
      />

      {isCallReceivedModalOpen && (
        <MyDialog onClose={isTerminalStatus ? handleEndCall : undefined}>
          <CallReceivedModalHeader callData={callData} />
          <CallReceivedModal callData={callData} onEndCall={handleEndCall} />
        </MyDialog>
      )}
    </>
  );
}
```

`useCallWidgetLogic` (and `useCallWidgetConfig`) throw if they are used outside a `CallWidgetProvider`.

---

## 🪝 Intercepting the click: `onBeforeCall`

*Since 1.1.0.* `onBeforeCall` runs when the Call button is clicked, **before** the confirmation dialog.

| Result | What the widget does |
| ------ | -------------------- |
| resolves `true` | continues with the built-in flow (confirmation → `makeCall`) |
| resolves `false` | does nothing more; the host handled the click |
| throws / rejects | logs `onBeforeCall failed:` to the console and starts no call |
| still pending | the button shows its pending state (`cw-pending` / `...`) and ignores clicks |

If the prop isn't given, behaviour is the same as 1.0.0.

Example: when the Exotel integration is disabled, open the CRM's own "Log call" form instead:

```tsx
<CallWidgetTrigger
  baseURL={API_BASE_URL}
  token={token}
  phone={phone}
  onBeforeCall={async () => {
    const { exotelEnabled } = await getTelephonySettings();
    if (exotelEnabled) return true;  // use the built-in Exotel flow
    openLogCallForm({ phone });      // agent dials from their own phone
    return false;
  }}
/>
```

Return a real boolean. Any falsy value (including `undefined`) stops the built-in flow.

---

## ⚙️ `CallWidgetTrigger` props

### Adapter mode

| Prop | Type | Description |
| ---- | ---- | ----------- |
| `apiAdapter` | `CallWidgetApiAdapter` | Your own call implementation. Takes priority over `baseURL` / `token`. |
| `config` | `CallWidgetConfig` | `{ defaultPhone?, links?, apiBaseUrl? }`. Takes priority over `phone` / `links`. |
| `socketAdapter` | `CallSocketAdapter` | Event-based socket bridge. Takes priority over `socketPayload`. |

### Internal mode

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `baseURL` | `string` | – | API base URL. Required unless `apiAdapter` is given. |
| `token` | `string` | – | Sent as `Authorization: token <token>`. |
| `phone` | `string \| null` | `""` | Number to call. If empty, clicking **Yes** shows the warning "No phone number provided." |
| `links` | `MakeCallLink[]` | `[]` | Records to link the call to, e.g. `{ link_doctype: "CRM Task", link_name: "TASK-001" }`. |
| `socketPayload` | `CallSocketPayload` | – | Latest raw socket message from the host app. |
| `socketConnected` | `boolean` | – | When `false`, `socketPayload` is ignored. |

### Content and callbacks

| Prop | Type | Description |
| ---- | ---- | ----------- |
| `contactName` | `string \| null` | Name shown in the call modals. |
| `onBeforeCall` | `() => boolean \| Promise<boolean>` | See [`onBeforeCall`](#-intercepting-the-click-onbeforecall). |
| `onEdit` | `() => void` | Shows an **Add note** button in the call modal. |
| `onScheduleReminder` | `() => void` | Shows a **Schedule reminder** button in the call modal. |
| `onMute` | `() => void` | Reserved; not rendered yet. |
| `onToggleSpeaker` | `() => void` | Reserved; not rendered yet. |
| `showNotification` | `(title, message) => void` | Success toast (internal mode). |
| `showWarning` | `(title, message) => void` | Warning toast (internal mode). |
| `showError` | `(title, message) => void` | Error toast (internal mode). |

In adapter mode, put the toast functions on the `apiAdapter` instead.

### Button appearance

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `buttonLabel` | `string` | `"Call"` | Label text, also used as the button's `title`. |
| `icon` | `ReactNode` | phone icon | Replaces the default phone icon. |
| `btnClassName` | `string` | `""` | Extra class names for the button. |
| `variant` | `"default" \| "plain"` | `"default"` | `default`: a `div.contact-button` with icon and label (label becomes "Calling..." while the call is being placed). `plain`: a bare `<button>` with only the icon (shows "..." while busy). |

---

## 🔌 Backend contract

Built-in client (internal mode and `useDefaultCallAdapter`):

```
GET {baseURL}/api/method/crm_integration.crm_exotel.api.handler.make_a_call
    ?to_number=<phone>
    &links=<JSON-encoded MakeCallLink[]>        (only if links are given)

Headers:
    Content-Type: application/json
    Authorization: token <token>                (only if token is given)
```

Expected response (Frappe envelope around the Exotel call):

```json
{
  "message": {
    "Sid": "b6cfaf5fe5...",
    "CallSid": "b6cfaf5fe5...",
    "Status": "in-progress",
    "To": "09876543210",
    "From": "08012345678",
    "Direction": "outbound-api",
    "...": "other ExotelCallResponse fields"
  }
}
```

The widget tracks the call by `message.CallSid`, falling back to `message.Sid`. A non-2xx response is treated as a failed call.

---

## 📡 Socket contract

All updates arrive as one event name, `exotel_call`, as `{ event: "exotel_call", message: {...} }`.

**Outgoing status update** (matched to the current call by `CallSid`):

```json
{ "event": "exotel_call", "message": { "CallSid": "b6cfaf5fe5...", "Status": "completed", "To": "09876543210" } }
```

**Incoming call** (`Direction` must be exactly `"incoming"`):

```json
{
  "event": "exotel_call",
  "message": {
    "CallSid": "a1b2c3...",
    "Direction": "incoming",
    "CallFrom": "09876543210",
    "AgentEmail": "agent@example.com",
    "DialCallStatus": "completed"
  }
}
```

For incoming calls the status shown is `DialCallStatus`, then `Status`, then `in-progress`. The number shown is `CallFrom`, falling back to `From`.

Final statuses (`TERMINAL_CALL_STATUSES`): `completed`, `failed`, `busy`, `no-answer`, `canceled`, `incomplete`.

---

## 📚 API reference

### Components

| Export | Props | Purpose |
| ------ | ----- | ------- |
| `CallWidgetTrigger` | see above | All-in-one button + modals. |
| `CallConfirmationModal` | `open`, `onClose`, `onConfirm`, `message?` | "Confirm Call" Yes/No dialog. |
| `CallReceivedModal` | `callData`, `onEndCall`, `contactName?`, `onEdit?`, `onScheduleReminder?` | Body of the outgoing-call modal; auto-closes 10 s after a final status. |
| `CallReceivedModalHeader` | `callData` | Recording icon + status badge. |
| `IncomingCallModal` | `callData`, `onAccept`, `onEndCall`, `contactName?`, `onDecline?` | Body of the incoming-call modal; auto-closes 10 s after a final status. |
| `IncomingCallModalHeader` | `callData` | Recording icon + status badge. |
| `CallWidgetProvider` | `apiAdapter`, `config`, `socketAdapter?`, `socketPayload?`, `children` | Context for the hooks. |

### Hooks

| Hook | Signature | Returns |
| ---- | --------- | ------- |
| `useCallWidgetLogic` | `()` (inside the provider) | `callData`, `callSid`, `isCallPending`, `isTerminalStatus`, `isCallConfirmationOpen`, `isCallReceivedModalOpen`, `incomingCallData`, `isIncomingCallTerminalStatus`, `isIncomingCallModalOpen`, and the handlers `handleCallClick`, `handleConfirmCall(toNumber?, links?)`, `handleCancelCall`, `handleEndCall`, `handleAcceptCall`, `handleDeclineCall`, `handleEndIncomingCall` |
| `useCallStatus` | `(callSid, socketAdapter?, socketPayload?, onStatusUpdate?)` | `{ callStatus, isTerminalStatus }` |
| `useIncomingCall` | `(socketAdapter?, socketPayload?, onIncomingCall?)` | `{ incomingCall, isTerminalStatus, displayStatus, clearIncomingCall }` |
| `useDefaultCallAdapter` | `({ baseURL?, token?, defaultPhone?, links?, showNotification?, showWarning?, showError? })` | `{ apiAdapter, config }` |
| `useCallWidgetConfig` | `()` (inside the provider) | `{ apiAdapter, config, socketAdapter?, socketPayload? }` |

`handleConfirmCall(toNumber?, links?)` calls `toNumber`, or `config.defaultPhone` if none is given, and links `links`, or `config.links`.

### API client

```ts
import { createDefaultCallApiClient, callApi } from "react-call-widget";

const client = createDefaultCallApiClient("https://crm.example.com", token); // { get, post }
const api = callApi(client);
const { message } = await api.makeCall("9876543210", [{ link_doctype: "CRM Task", link_name: "TASK-001" }]);
```

### Utilities

| Function | Example |
| -------- | ------- |
| `getBadgeColor(status)` | `getBadgeColor("busy")` → `{ bgColor: "#ffebee", textColor: "#c62828" }` |
| `formatPhoneNumber(phone)` | `formatPhoneNumber("+91 98765-43210")` → `"+919876543210"` |
| `formatCallDuration(seconds)` | `formatCallDuration(125)` → `"02:05"` |

### Types

`ExotelCallResponse`, `IncomingCallResponse`, `FrappeMethodResponse<T>`, `MakeCallLink`, `CallSocketPayload`, `CallSocketAdapter`, `CallWidgetApiAdapter`, `CallWidgetConfig`, `OutgoingCallStatus`, `IncomingCallStatus`, `UseCallWidgetLogicReturn`, `DefaultCallAdapterParams`, `DefaultCallAdapterResult`, and the constant `TERMINAL_CALL_STATUSES`.

---

## 🎨 Styling

The CSS is **injected automatically** when you import the package. It is also exported separately if your setup needs an explicit import:

```ts
import "react-call-widget/styles.css";
```

Overridable classes (all plain CSS, no CSS-in-JS):

| Area | Classes |
| ---- | ------- |
| Modal shell | `.cw-modal-overlay`, `.cw-modal-container`, `.cw-modal-header`, `.cw-modal-title`, `.cw-modal-close`, `.cw-modal-body`, `.cw-pos-bottom-left`, `.cw-pos-bottom-right` |
| Confirmation | `.cw-confirmation-container`, `.cw-confirmation-message`, `.cw-confirmation-actions`, `.cw-btn`, `.cw-btn-primary`, `.cw-btn-secondary` |
| Outgoing call | `.call-received-modal`, `.call-received-header`, `.call-status-badge`, `.caller-name`, `.calling-indicator`, `.call-details`, `.call-phone`, `.call-controls`, `.call-control-button` |
| Incoming call | `.incoming-call-modal`, `.incoming-call-header`, `.incoming-call-text`, `.incoming-call-controls`, `.incoming-call-button` |
| Trigger button | `.contact-button`, `.contact-icon-wrapper`, `.cw-pending` |

The default trigger (`.contact-button`) has no package styles, so it picks up your app's own `.contact-button` styles; use `btnClassName` to add more. Modals sit at `z-index: 1000`/`1001`. The call modals don't block the rest of the page.

---

## ⚠️ Known limitations

These describe how 1.1.0 behaves today, so you can plan around them:

- **React 18:** the peer range lists React 18, but the bundle includes React 19's JSX runtime. Use React 19.
- **Closing the call modals:** the close button only appears once a final status arrives over the socket. If the socket drops mid-call, the modal stays open until the page reloads.
- **Incoming calls:** the Accept button is a placeholder (it does nothing yet), and no Decline button is rendered. The name shown is the `contactName` prop of the trigger that received the event, not a lookup of the caller. Every mounted `CallWidgetTrigger` listens for incoming calls.
- **Raw `socketPayload` mode:** the widget only sees the latest value per render, so events that arrive in the same tick can be missed. Prefer a `socketAdapter` when events are frequent.
- **Status between calls:** the last status of a finished call can show briefly when the next call starts, until its first status event arrives.
- **Outgoing request:** the built-in client places the call with a `GET` request and puts the number in the query string. Use a custom `apiAdapter` if your backend expects `POST`.
- **No duplicate-call guard:** the Call button stays clickable while a call modal is open.

---

## 🧑‍💻 Development

```bash
git clone https://github.com/8848digital/react-call-widget.git
cd react-call-widget
npm install          # also runs the build (prepare script)
npm run build        # tsc (type check + .d.ts) then vite library build into dist/
```

Project layout:

```
src/
  api/call.ts                 fetch client + makeCall
  components/                 CallWidgetTrigger, modals, common Button/Modal/Icons
  context/CallWidgetContext   CallWidgetProvider / useCallWidgetConfig
  hooks/                      useCallWidgetLogic, useCallStatus, useIncomingCall,
                              useCallWidgetResolution, useDefaultCallAdapter
  styles/                     plain CSS, bundled into dist/index.css
  types/call.ts               public types
  utils/callUtils.ts          badge colours, phone/duration formatting
dist/                         build output (committed, published to npm)
```

`dist/` is committed so Git installs work. Always rebuild and commit `dist/` together with source changes.

---

## 🚢 Releasing

1. Bump `version` in `package.json` (semver: new optional props → minor).
2. `npm run build` and commit `src/` + `dist/`.
3. Open a PR, review and merge.
4. `npm publish` from the merged commit. The account uses 2FA, so approve the publish in the browser when npm asks.
5. Tag the release: `git tag vX.Y.Z <commit> && git push origin vX.Y.Z`.

---

## 📝 Changelog

### 1.1.0
- Added the `onBeforeCall` prop on `CallWidgetTrigger`, so the host can handle the Call click itself (e.g. its own call log form when Exotel is disabled). The button shows its pending state while the callback runs.

### 1.0.0
- First standalone release: `CallWidgetTrigger`, outgoing calls through Exotel, live status and incoming calls from `exotel_call` socket events, adapters, hooks and type declarations.

---

## 📄 License

MIT © 8848 Digital
