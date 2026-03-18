import { Slice } from '@reduxjs/toolkit';
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
export declare const notificationSlice: Slice<NotificationState>;
export declare const addNotificationAction: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, `${string}/${string}`> | import("@reduxjs/toolkit").ActionCreatorWithoutPayload<`${string}/${string}`>, clearNotifications: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, `${string}/${string}`> | import("@reduxjs/toolkit").ActionCreatorWithoutPayload<`${string}/${string}`>;
declare const _default: import("redux").Reducer<NotificationState, import("redux").AnyAction>;
export default _default;
//# sourceMappingURL=notificationSlice.d.ts.map