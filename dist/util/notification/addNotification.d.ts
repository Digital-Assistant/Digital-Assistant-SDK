/**
 * Displays a notification with a given title, description, status, and placement.
 * This implementation updates the Redux store to support reactive UI notifications
 * and falls back to sweetalert2 for immediate feedback.
 *
 * @param title The title of the notification.
 * @param description The main content of the notification.
 * @param status The type of notification (e.g., 'info', 'success', 'warning', 'error').
 * @param placement The position where the notification should appear on the screen.
 */
export declare const addNotification: (title?: string, description?: string, status?: 'info' | 'success' | 'warning' | 'error', placement?: string) => void;
//# sourceMappingURL=addNotification.d.ts.map