import { default as React } from 'react';
interface ModalProps {
    open: boolean;
    onClose: () => void;
    header?: React.ReactNode | string;
    children: React.ReactNode;
    width?: string;
    closable?: boolean;
    className?: string;
    dismissableMask?: boolean;
    modal?: boolean;
    draggable?: boolean;
    position?: string;
}
/**
 * Internal lightweight modal overlay used by call widget components.
 * Supports the same props used by the host app's Modal.
 */
declare const Modal: React.FC<ModalProps>;
export default Modal;
