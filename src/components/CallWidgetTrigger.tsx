import React, { useState } from "react";
import { Phone as IconPhone } from "./common/Icons";
import Button from "./common/Button";
import Modal from "./common/Modal";
import CallConfirmationModal from "./CallConfirmationModal";
import CallReceivedModal, { CallReceivedModalHeader } from "./CallReceivedModal";
import IncomingCallModal, { IncomingCallModalHeader } from "./IncomingCallModal";
import { CallWidgetProvider } from "../context/CallWidgetContext";
import { useCallWidgetLogic } from "../hooks/useCallWidgetLogic";
import { useCallWidgetResolution } from "../hooks/useCallWidgetResolution";
import type { 
  CallWidgetApiAdapter, 
  CallWidgetConfig, 
  CallSocketAdapter, 
  CallSocketPayload, 
  MakeCallLink 
} from "../types/call";

interface CallWidgetTriggerProps {
  // --- Adapter Mode (Inject your own logic) ---
  apiAdapter?: CallWidgetApiAdapter;
  config?: CallWidgetConfig;
  socketAdapter?: CallSocketAdapter;

  // --- Internal Mode (Simple pass-through) ---
  baseURL?: string;
  token?: string;
  phone?: string | null;
  links?: MakeCallLink[];
  /** Raw socket.io message payload from host app (e.g. { event: "exotel_call", message: { ... } }) */
  socketPayload?: CallSocketPayload;
  /** Manual override for socket connection status (useful in pass-through mode) */
  socketConnected?: boolean;

  // --- Meta Props ---
  contactName?: string | null;

  // --- External UI Callbacks ---
  /**
   * Called when the Call button is clicked, before the built-in flow starts.
   * Resolve `true` to continue with the built-in flow (confirmation modal, then `makeCall`).
   * Resolve `false` when the host app has handled the click itself (for example, with its own form).
   * While it is pending, the button shows its pending state and ignores clicks.
   */
  onBeforeCall?: () => boolean | Promise<boolean>;
  onEdit?: () => void;
  onScheduleReminder?: () => void;
  onMute?: () => void;
  onToggleSpeaker?: () => void;

  // --- UI Props ---
  buttonLabel?: string;
  icon?: React.ReactNode;
  btnClassName?: string;
  variant?: "default" | "plain";

  // --- Notification Sync ---
  showNotification?: (title: string, message: string) => void;
  showWarning?: (title: string, message: string) => void;
  showError?: (title: string, message: string) => void;
}

/**
 * Inner logic for the CallWidgetTrigger that uses context and state hooks.
 */
const CallWidgetInner: React.FC<Pick<CallWidgetTriggerProps, "contactName" | "onBeforeCall" | "onEdit" | "onScheduleReminder" | "onMute" | "onToggleSpeaker" | "buttonLabel" | "icon" | "btnClassName" | "variant">> = ({
  contactName,
  onBeforeCall,
  onEdit,
  onScheduleReminder,
  onMute,
  onToggleSpeaker,
  buttonLabel = "Call",
  icon,
  btnClassName = "",
  variant = "default",
}) => {
  const {
    callData,
    isCallPending,
    isTerminalStatus: isCallTerminalStatus,
    isCallConfirmationOpen,
    isCallReceivedModalOpen,
    incomingCallData,
    isIncomingCallTerminalStatus,
    isIncomingCallModalOpen,
    handleCallClick,
    handleConfirmCall,
    handleCancelCall,
    handleEndCall,
    handleAcceptCall,
    handleDeclineCall,
    handleEndIncomingCall,
  } = useCallWidgetLogic();

  const [isCheckingCall, setIsCheckingCall] = useState(false);
  const isBusy = isCallPending || isCheckingCall;

  const toggleCall = async () => {
    if (isBusy) return;
    if (!onBeforeCall) {
      handleCallClick();
      return;
    }

    setIsCheckingCall(true);
    try {
      if (await onBeforeCall()) handleCallClick();
    } catch (err) {
      console.error("onBeforeCall failed:", err);
    } finally {
      setIsCheckingCall(false);
    }
  };

  const finalIcon = icon || <IconPhone size={20} color="#175353" />;

  return (
    <>
      {variant === "plain" ? (
        <button
          className={`${btnClassName}`}
          onClick={toggleCall}
          disabled={isBusy}
          type="button"
          title={buttonLabel}
        >
          {isBusy ? "..." : finalIcon}
        </button>
      ) : (
        <div 
          className={`contact-button ${btnClassName} ${isBusy ? "cw-pending" : ""}`} 
          onClick={!isBusy ? toggleCall : undefined}
          title={buttonLabel}
        >
          <div className="contact-icon-wrapper">
            {finalIcon}
          </div>
          <span>
            {isCallPending ? "Calling..." : buttonLabel}
          </span>
        </div>
      )}

      {/* --- Outgoing Call Flow Modals --- */}
      <CallConfirmationModal
        open={isCallConfirmationOpen}
        onClose={handleCancelCall}
        onConfirm={() => handleConfirmCall()}
      />

      <Modal
        open={isCallReceivedModalOpen}
        onClose={handleEndCall}
        header={<CallReceivedModalHeader callData={callData} />}
        width="400px"
        closable={isCallTerminalStatus}
        dismissableMask={false}
        className="cw-modal-received-wrapper cw-no-header-border"
        modal={false}
        draggable={true}
        position="bottom-left"
      >
        <CallReceivedModal
          contactName={contactName}
          callData={callData}
          onEndCall={handleEndCall}
          onEdit={onEdit}
          onScheduleReminder={onScheduleReminder}
          onMute={onMute}
          onToggleSpeaker={onToggleSpeaker}
        />
      </Modal>

      {/* --- Incoming Call Flow Modals --- */}
      <Modal
        open={isIncomingCallModalOpen}
        onClose={handleEndIncomingCall}
        header={<IncomingCallModalHeader callData={incomingCallData} />}
        width="400px"
        closable={isIncomingCallTerminalStatus}
        dismissableMask={false}
        className="cw-modal-incoming-wrapper cw-no-header-border"
        modal={false}
        draggable={true}
        position="bottom-right"
      >
        <IncomingCallModal
          contactName={contactName}
          callData={incomingCallData}
          onAccept={handleAcceptCall}
          onDecline={handleDeclineCall}
          onEndCall={handleEndIncomingCall}
        />
      </Modal>
    </>
  );
};

/**
 * All-in-One Component: Button + Internal State/Modal management.
 * Consistently handles both internal "Internal Mode" pass-through props or 
 * explicit context overrides.
 */
export const CallWidgetTrigger: React.FC<CallWidgetTriggerProps> = (props) => {
  const {
    apiAdapter,
    config,
    finalSocketAdapter,
    socketPayload,
  } = useCallWidgetResolution({
    apiAdapter: props.apiAdapter,
    config: props.config,
    socketAdapter: props.socketAdapter,
    baseURL: props.baseURL,
    token: props.token,
    phone: props.phone,
    links: props.links,
    socketPayload: props.socketPayload,
    socketConnected: props.socketConnected,
    showNotification: props.showNotification,
    showWarning: props.showWarning,
    showError: props.showError,
  });

  if (!apiAdapter) return null;

  return (
    <CallWidgetProvider
      apiAdapter={apiAdapter}
      config={config}
      socketAdapter={finalSocketAdapter}
      socketPayload={socketPayload}
    >
      <CallWidgetInner 
        contactName={props.contactName}
        onBeforeCall={props.onBeforeCall}
        onEdit={props.onEdit}
        onScheduleReminder={props.onScheduleReminder}
        onMute={props.onMute}
        onToggleSpeaker={props.onToggleSpeaker}
        buttonLabel={props.buttonLabel}
        icon={props.icon}
        btnClassName={props.btnClassName}
        variant={props.variant}
      />
    </CallWidgetProvider>
  );
};

export default CallWidgetTrigger;
