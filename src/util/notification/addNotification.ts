import Swal from 'sweetalert2';
import { store } from '../../store';
import { addNotificationAction } from '../../store/slices/notificationSlice';

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
export const addNotification = (title = '', description = '', status: 'info' | 'success' | 'warning' | 'error' = 'info', placement = 'top-end') => {
    // Dispatch to Redux store for reactive UI
    try {
        store.dispatch(addNotificationAction({
            title,
            description,
            status
        }));
    } catch (e) {
        console.error("Failed to dispatch notification to store", e);
    }

    // Keep SweetAlert2 as a secondary/legacy mechanism or for non-react contexts
    // Use document.body as target to avoid accessibility/DOM issues with Shadow DOM in SweetAlert2
    const target = document.body;

    const Toast = Swal.mixin({
        toast: true,
        position: placement as any,
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        target: target,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
        }
    });

    Toast.fire({
        icon: status as any,
        title: title,
        html: description,
    });
};
