# React Call Widget 📞

## 🚀 Key Features

- **Decoupled Architecture**: Logic is separated from UI for maximum flexibility.
- **Easy Integration**: Built-in support for making calls via `CallWidgetTrigger` with minimal setup.
- **Live Status Updates**: Integrated support for real-time call tracking via Socket.io.
- **Incoming Call Support**: Handles incoming calls with a built-in notification modal and "Accept/Decline" flows.
- **Call Resolution**: Automatic detection of terminal call statuses (completed, failed, busy, etc.).
- **Frappe-Compatible**: Optimized for Frappe/Exotel backends with simple props (`baseURL`, `token`).
- **Notification Slots**: Connect to your application's toast/alert system easily.

## 🛠️ Installation

```bash
# If using Git installation
npm install https://github.com/8848digital/react-call-widget.git
```

## 📋 Usage

### 1. Standard Usage (Direct API Integration)

The easiest way to integrate. The package handles all API calls internally using the provided `baseURL` and `token`.

```tsx
import { CallWidgetTrigger } from "react-call-widget";
import "react-call-widget/styles.css";

const MyComponent = () => {
  return (
    <CallWidgetTrigger
      buttonLabel="Call"
      baseURL="https://your-api.com"
      token="your-auth-token"
      phone="1234567890" // Recipient
      contactName="John Doe" // Display Name
      links={[
        { link_doctype: "CRM Task", link_name: "TASK-001" }
      ]}
      // Connect to your app's toast system
      showNotification={(title, msg) => toast.success(msg)}
      showError={(title, msg) => toast.error(msg)}
    />
  );
};
```

### 2. Manual Socket Integration

If your application already manages a socket connection, you can pass the raw payload directly to the widget for real-time updates.

```tsx
import { CallWidgetTrigger } from "react-call-widget";

const MyComponent = ({ lastSocketMessage, isConnected }) => {
  return (
    <CallWidgetTrigger
      baseURL="..."
      token="..."
      phone="1234567890"
      socketPayload={lastSocketMessage}
      socketConnected={isConnected}
    />
  );
};
```

## 🛠 Props & Configuration

### `CallWidgetTrigger` Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `buttonLabel` | `string` | `"Call"` | Trigger button text. |
| `variant` | `"default" \| "plain"` | `"default"` | Use "plain" for a minimalist button without the wrapper box. |
| `baseURL` | `string` | Optional | API Base URL. |
| `token` | `string` | Optional | Auth token for API calls. |
| `phone` | `string` | Optional | Recipient phone number. |
| `contactName` | `string` | Optional | Recipient display name. |
| `links` | `MakeCallLink[]` | `[]` | Records to associate the call with. |
| `socketPayload` | `CallSocketPayload` | Optional | Raw socket event from host app. |
| `socketConnected` | `boolean` | Optional | Manual override for socket status. |
| `onBeforeCall` | `() => boolean \| Promise<boolean>` | Optional | Runs when the Call button is clicked. Resolve `true` to open the built-in confirmation and call flow, or `false` when the host app handled the click (for example, with its own call log form). The button shows its pending state until it resolves. |
| `onEdit` | `() => void` | Optional | Callback when user clicks 'Edit Notes' after a call. |
| `onScheduleReminder` | `() => void` | Optional | Callback when user clicks 'Schedule Reminder'. |

## 🧩 Adapter Implementation (Advanced)

For advanced use cases where you want complete control over API interactions—such as using **React Query** for caching or custom **Socket.io** event handling—you can implement custom adapters.

```typescript
"use client";

import React, { useMemo } from "react";
import { useSocket } from "@/hooks/useSocket";
import { useNotification } from "@/components/common/NotificationProvider";
import { 
  CallWidgetTrigger, 
  type CallWidgetApiAdapter, 
  type CallSocketAdapter 
} from "react-call-widget";

export const MyCallIntegration = ({ phone, contactName }) => {
  const { showSuccess, showError } = useNotification();
  
  // 1. API Adapter: Wire up your own backend calls
  const apiAdapter: CallWidgetApiAdapter = useMemo(() => ({
    makeCall: async (toNumber, links) => {
      const res = await myBackend.post("/api/method/make_call", { phone: toNumber, links });
      return { message: res.data.message }; // Must return { message: ExotelCallResponse }
    },
    showNotification: (t, m) => showSuccess(m),
    showError: (t, m) => showError(m),
  }), []);

  // 2. Socket Adapter: Bridge your existing socket connection
  const socketListeners = React.useRef(new Set());
  const handleSocket = (data) => {
    if (data.event === "exotel_call") {
      socketListeners.current.forEach(cb => cb(data));
    }
  };
  
  const { isConnected } = useSocket(handleSocket);

  const socketAdapter: CallSocketAdapter = useMemo(() => ({
    isConnected,
    onCallEvent: (cb) => socketListeners.current.add(cb),
    offCallEvent: (cb) => socketListeners.current.delete(cb),
  }), [isConnected]);

  return (
    <CallWidgetTrigger 
      apiAdapter={apiAdapter}
      socketAdapter={socketAdapter}
      phone={phone}
      contactName={contactName}
    />
  );
};
```

## 🎨 Styling

Import the styles in your main entry point (App.tsx or layout.tsx):

```javascript
import "react-call-widget/styles.css";
```

## 📦 Building for Production

```bash
cd packages/react-call-widget
npm run build
```

## 📄 License

MIT
