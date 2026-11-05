import { default as React } from 'react';
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
declare const Button: React.FC<ButtonProps>;
export default Button;
