import { default as React } from 'react';
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
declare const CallConfirmationModal: React.FC<CallConfirmationModalProps>;
export default CallConfirmationModal;
