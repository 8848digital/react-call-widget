/**
 * Returns background and text color for a given call status badge.
 * Mirrors the app's getBadgeColor utility.
 */
export declare function getBadgeColor(status: string): {
    bgColor: string;
    textColor: string;
};
/**
 * Formats a raw phone number string for display.
 * e.g. "9769983654" → "9769983654" (no space in user image)
 */
export declare function formatPhoneNumber(phone?: string | null): string;
/**
 * Formats a duration in seconds to mm:ss string.
 * e.g. 125 → "02:05"
 */
export declare function formatCallDuration(seconds: number): string;
