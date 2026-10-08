import { configureStore } from '@reduxjs/toolkit';
import storageMiddleware from './middleware/storageMiddleware'; // Import the new middleware

// Import reducers
import {
    validationReducer,
    userReducer,
    recordingReducer,
    flowReducer,
    editableStepFormReducer,
    notificationReducer,
} from './slices';

// Create the store
export const store = configureStore({
    reducer: {
        validation: validationReducer,
        user: userReducer,
        recording: recordingReducer,
        flow: flowReducer,
        editableStepForm: editableStepFormReducer,
        notification: notificationReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(storageMiddleware),
});

// Infer the state type from the store itself
export type RootState = {
    validation: ReturnType<typeof validationReducer>;
    user: ReturnType<typeof userReducer>;
    recording: ReturnType<typeof recordingReducer>;
    flow: ReturnType<typeof flowReducer>;
    editableStepForm: ReturnType<typeof editableStepFormReducer>;
    notification: ReturnType<typeof notificationReducer>;
};
export type AppStore = typeof store;

export type AppDispatch = typeof store.dispatch;

// Export actions from all slices
export * from './slices';
