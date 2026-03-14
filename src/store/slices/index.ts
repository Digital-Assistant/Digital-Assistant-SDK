export { default as editingReducer, editingSlice } from './editingSlice';
export { default as validationReducer, validationSlice } from './validationSlice';
export { default as userReducer, userSlice } from './userSlice';
export { default as recordingReducer, recordingSlice } from './recordingSlice';
export { default as flowReducer, flowSlice } from './flowSlice';
export { default as editableStepFormReducer, editableStepFormSlice } from './editableStepFormSlice';
export { default as notificationReducer, notificationSlice } from './notificationSlice';

// Export action creators from recording slice
export {
    setIsRecording,
    setIsPlaying,
    setManualPlay,
    setPlayDelay,
    setRecSequenceData,
    addRecSequenceData,
    setSelectedRecordingDetails,
    setShowRecord,
    setShowLoader,
    resetRecordingState
} from './recordingSlice';

// Export action creators from editableStepForm slice
export {
    initializeFormForStep,
    resetForm,
    startStepEditing,
    updateDraftChanges,
    startValidation,
    markValidationCompleted,
    cancelStepEditing,
    updateStepName,
    updateTooltip,
    updateSlowPlaybackTime,
    updateCustomMetadata,
    clearCustomMetadata,
    setStepProfanityError,
    setStepInputError,
    setTooltipError,
    setSlowPlaybackTimeError,
    setDisableTooltipSubmit,
    setMountedState,
    setAllErrors,
} from './editableStepFormSlice';

export { addNotificationAction, clearNotifications } from './notificationSlice';

export type { EditingStepState } from './editingSlice';
export type { ValidationState } from './validationSlice';
export type { UserState } from './userSlice';
export { setUserData, clearUserData } from './userSlice';
export type { RecordingState } from './recordingSlice';
export type { FlowState } from './flowSlice';
export type { EditableStepFormState, FormFields, FormErrors, UIState } from './editableStepFormSlice';
export type { NotificationState, Notification } from './notificationSlice';