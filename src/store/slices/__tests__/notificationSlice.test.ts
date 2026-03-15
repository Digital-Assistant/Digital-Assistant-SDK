import reducer, {
    addNotificationAction,
    clearNotifications,
    NotificationState,
} from '../notificationSlice';

describe('notificationSlice', () => {
    const initialState: NotificationState = { notifications: [] };

    it('should return the initial state', () => {
        expect(reducer(undefined, { type: '' })).toEqual(initialState);
    });

    describe('addNotificationAction', () => {
        it('should add a notification with generated id and timestamp', () => {
            const state = reducer(initialState, addNotificationAction({
                title: 'Test',
                description: 'A message',
                status: 'success',
            }));
            expect(state.notifications).toHaveLength(1);
            expect(state.notifications[0].title).toBe('Test');
            expect(state.notifications[0].description).toBe('A message');
            expect(state.notifications[0].status).toBe('success');
            expect(typeof state.notifications[0].id).toBe('string');
            expect(typeof state.notifications[0].timestamp).toBe('number');
        });

        it('should append multiple notifications', () => {
            let state = reducer(initialState, addNotificationAction({ title: 'First', description: '', status: 'info' }));
            state = reducer(state, addNotificationAction({ title: 'Second', description: '', status: 'error' }));
            expect(state.notifications).toHaveLength(2);
            expect(state.notifications[0].title).toBe('First');
            expect(state.notifications[1].title).toBe('Second');
        });

        it('should generate unique ids for each notification', () => {
            let state = reducer(initialState, addNotificationAction({ title: 'A', description: '', status: 'info' }));
            state = reducer(state, addNotificationAction({ title: 'B', description: '', status: 'info' }));
            expect(state.notifications[0].id).not.toBe(state.notifications[1].id);
        });
    });

    describe('clearNotifications', () => {
        it('should clear all notifications', () => {
            let state = reducer(initialState, addNotificationAction({ title: 'X', description: '', status: 'warning' }));
            state = reducer(state, clearNotifications(undefined as any));
            expect(state.notifications).toHaveLength(0);
        });

        it('should handle clearing an already empty list', () => {
            const state = reducer(initialState, clearNotifications(undefined as any));
            expect(state.notifications).toHaveLength(0);
        });
    });
});
