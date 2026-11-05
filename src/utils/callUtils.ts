/**
 * Returns background and text color for a given call status badge.
 * Mirrors the app's getBadgeColor utility.
 */
export function getBadgeColor(status: string): { bgColor: string; textColor: string } {
  const s = status?.toLowerCase();
  switch (s) {
    case "in-progress":
      return { bgColor: "#2196F3", textColor: "#ffffff" };
    case "calling":
      return { bgColor: "#4CAF50", textColor: "#ffffff" };
    case "completed":
      return { bgColor: "#e3f2fd", textColor: "#1565c0" };
    case "failed":
    case "busy":
    case "no-answer":
    case "canceled":
    case "cancelled":
      return { bgColor: "#ffebee", textColor: "#c62828" };
    case "incomplete":
      return { bgColor: "#fafafa", textColor: "#616161" };
    default:
      return { bgColor: "#f5f5f5", textColor: "#424242" };
  }
}

/**
 * Formats a raw phone number string for display.
 * e.g. "9769983654" → "9769983654" (no space in user image)
 */
export function formatPhoneNumber(phone?: string | null): string {
  if (!phone) return "";
  // In the image, the number is simple.
  return phone.replace(/[^\d+]/g, "");
}

/**
 * Formats a duration in seconds to mm:ss string.
 * e.g. 125 → "02:05"
 */
export function formatCallDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}
