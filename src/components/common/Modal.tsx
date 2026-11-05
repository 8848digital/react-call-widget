import React, { useEffect } from "react";
import { X } from "./Icons";
import "../../styles/call-widget.css";

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
const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  header,
  children,
  width = "400px",
  closable = true,
  className = "",
  dismissableMask = true,
  modal = true,
  draggable = false,
  position = "center",
}) => {
  const [coords, setCoords] = React.useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      if (modal) {
        document.body.style.overflow = "hidden";
      }
    } else {
      document.body.style.overflow = "unset";
      setCoords({ x: 0, y: 0 }); // Reset position when closed
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open, modal]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!draggable) return;
    setIsDragging(true);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      setCoords((prev) => ({
        x: prev.x + e.movementX,
        y: prev.y + e.movementY,
      }));
    };
    const handleMouseUp = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  if (!open) return null;

  const isFixed = position !== "center";

  return (
    <div
      className={`cw-modal-overlay ${isFixed ? "cw-fixed" : ""} cw-pos-${position} ${className}`}
      onClick={(dismissableMask && closable) ? onClose : undefined}
    >
      <div
        ref={containerRef}
        className="cw-modal-container"
        style={{ 
          maxWidth: width,
          transform: `translate(${coords.x}px, ${coords.y}px)`,
          cursor: isDragging ? "grabbing" : "auto"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div 
          className="cw-modal-header" 
          onMouseDown={handleMouseDown}
          style={{ cursor: draggable ? "grab" : "default" }}
        >
          <div className="cw-modal-title">{header}</div>
          {closable && (
            <button className="cw-modal-close" onClick={onClose} aria-label="Close">
              <X size={18} />
            </button>
          )}
        </div>
        <div className="cw-modal-body">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
