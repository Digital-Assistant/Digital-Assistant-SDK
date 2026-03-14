import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';

export interface Notification {
    id: string;
    title: string;
    description: string;
    status: 'info' | 'success' | 'warning' | 'error';
    timestamp: number;
}

export interface NotificationState {
    notifications: Notification[];
}

const initialState: NotificationState = {
    notifications: [],
};

export const notificationSlice: Slice<NotificationState> = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        addNotificationAction: (state, action: PayloadAction<Omit<Notification, 'id' | 'timestamp'>>) => {
            const newNotification: Notification = {
                ...action.payload,
                id: Math.random().toString(36).substring(2, 9),
                timestamp: Date.now(),
            };
            state.notifications.push(newNotification);
        },
        clearNotifications: (state) => {
            state.notifications = [];
        },
    },
});

export const { addNotificationAction, clearNotifications } = notificationSlice.actions;
export default notificationSlice.reducer;
