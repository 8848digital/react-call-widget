import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  icon?: React.ReactNode;
  className?: string;
  color?: string;
}

/**
 * Minimal internal button component used by call modals.
 * Mirrors the API of the host app's Button so the modals look identical.
 */
const Button: React.FC<ButtonProps> = ({
  label,
  icon,
  onClick,
  type = "button",
  disabled = false,
  className = "",
  color,
  style,
  ...props
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`cw-btn ${className}`}
      style={{ ...style, ...(color ? { backgroundColor: color } : {}) }}
      {...props}
    >
      {icon && <span className="cw-btn-icon">{icon}</span>}
      {label && <span className="cw-btn-label">{label}</span>}
    </button>
  );
};

export default Button;
