import React from "react";
import {
  Phone as PhPhone,
  PhoneSlash as PhPhoneSlash,
  PhoneIncoming as PhPhoneIncoming,
  Microphone as PhMicrophone,
  MicrophoneSlash as PhMicrophoneSlash,
  SpeakerHigh as PhSpeakerHigh,
  SpeakerX as PhSpeakerX,
  NotePencilIcon,
  CalendarIcon,
  Record as PhRecordIcon,
  XIcon,
} from "@phosphor-icons/react";

export interface IconProps {
  size?: number | string;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone";
}

export const Phone = (props: IconProps) => <PhPhone {...props} />;
export const PhoneSlash = (props: IconProps) => <PhPhoneSlash {...props} />;
export const PhoneIncoming = (props: IconProps) => <PhPhoneIncoming {...props} />;
export const Microphone = (props: IconProps) => <PhMicrophone {...props} />;
export const MicrophoneSlash = (props: IconProps) => <PhMicrophoneSlash {...props} />;
export const SpeakerHigh = (props: IconProps) => <PhSpeakerHigh {...props} />;
export const SpeakerX = (props: IconProps) => <PhSpeakerX {...props} />;
export const NotePencil = (props: IconProps) => <NotePencilIcon {...props} />;
export const Calendar = (props: IconProps) => <CalendarIcon {...props} />;
/** Recording indicator icon (filled circle). */
export const Recording = (props: IconProps) => <PhRecordIcon weight="fill" {...props} />;
export const X = (props: IconProps) => <XIcon {...props} />;
