import React from "react";
import "../styles/call-widget.css";

interface CallConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message?: string;
}

/**
 * Simple confirmation dialog shown before initiating an outgoing call.
 * Matches the host app's CallConfirmationModal behaviour.
 */
const CallConfirmationModal: React.FC<CallConfirmationModalProps> = ({
  open,
  onClose,
  onConfirm,
  message = "Are you sure you want to initiate this call?",
}) => {
  if (!open) return null;

  return (
    <div className="cw-modal-overlay" onClick={onClose}>
      <div className="cw-modal-container cw-confirmation-container" onClick={(e) => e.stopPropagation()}>
        <div className="cw-modal-header">
          <div className="cw-modal-title">Confirm Call</div>
          <button className="cw-modal-close" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>
        <div className="cw-modal-body cw-confirmation-body">
          <p className="cw-confirmation-message">{message}</p>
          <div className="cw-confirmation-actions">
            <button className="cw-btn cw-btn-secondary" onClick={onClose}>
              No
            </button>
            <button className="cw-btn cw-btn-primary" onClick={onConfirm}>
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallConfirmationModal;
