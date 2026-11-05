import { default as React } from 'react';
import { CallWidgetApiAdapter, CallWidgetConfig, CallSocketAdapter, CallSocketPayload } from '../types/call';
interface CallWidgetContextProps {
    apiAdapter: CallWidgetApiAdapter;
    config: CallWidgetConfig;
    /** Structured socket adapter (preferred mode). */
    socketAdapter?: CallSocketAdapter;
    /** Raw socket payload pass-through (fallback mode). */
    socketPayload?: CallSocketPayload;
}
export declare const CallWidgetProvider: ({ apiAdapter, config, socketAdapter, socketPayload, children, }: CallWidgetContextProps & {
    children: React.ReactNode;
}) => import("react/jsx-runtime").JSX.Element;
export declare const useCallWidgetConfig: () => CallWidgetContextProps;
export {};
