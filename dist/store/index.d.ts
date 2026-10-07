import { validationReducer, userReducer, recordingReducer, flowReducer, editableStepFormReducer, notificationReducer } from './slices';
export declare const store: import("@reduxjs/toolkit/dist/configureStore").ToolkitStore<{
    validation: import("./slices").ValidationState;
    user: import("./slices").UserState;
    recording: import("./slices").RecordingState;
    flow: import("./slices").FlowState;
    editableStepForm: import("./slices").EditableStepFormState;
    notification: import("./slices").NotificationState;
}, import("redux").AnyAction, import("@reduxjs/toolkit").MiddlewareArray<[import("@reduxjs/toolkit").ThunkMiddleware<{
    validation: import("./slices").ValidationState;
    user: import("./slices").UserState;
    recording: import("./slices").RecordingState;
    flow: import("./slices").FlowState;
    editableStepForm: import("./slices").EditableStepFormState;
    notification: import("./slices").NotificationState;
}, import("redux").AnyAction, undefined>, import("redux").Middleware<{}, RootState, import("redux").Dispatch<import("redux").AnyAction>>]>>;
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
export * from './slices';
//# sourceMappingURL=index.d.ts.map