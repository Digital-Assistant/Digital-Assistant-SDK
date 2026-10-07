import { PayloadAction } from '@reduxjs/toolkit';
/**
 * TypeScript Interfaces for EditableStepForm State
 */
export interface FormFields {
    stepEditValue: string;
    tooltip: string;
    slowPlaybackTime: string;
    customMetadata: Record<string, any>;
}
export interface FormErrors {
    stepProfanityError: boolean;
    stepInputError: boolean;
    tooltipError: boolean;
    slowPlaybackTimeError: boolean;
}
export interface UIState {
    disableTooltipSubmitBtn: boolean;
    isMounted: boolean;
}
export interface EditingWorkflowState {
    isEditing: boolean;
    originalStepData: any | null;
    draftChanges: any | null;
    validationRequired: boolean;
    validationCompleted: boolean;
    validationInProgress: boolean;
}
export interface EditableStepFormState {
    formFields: FormFields;
    errors: FormErrors;
    uiState: UIState;
    editingWorkflow: EditingWorkflowState;
    currentEditingIndex: number | null;
    isUpdateMode: boolean;
    recordingId: number | null;
}
/**
 * Payload types for actions
 */
interface InitializeFormPayload {
    item: any;
    index: number;
    isUpdateMode: boolean;
    recordingId?: number;
}
interface UpdateCustomMetadataPayload {
    key: string;
    value: any;
}
interface StartStepEditingPayload {
    index: number;
    stepData: any;
    recordingId: number;
}
/**
 * EditableStepForm Slice
 */
export declare const editableStepFormSlice: import("@reduxjs/toolkit").Slice<EditableStepFormState, {
    /**
     * Initialize form with item data
     */
    initializeFormForStep: (state: import("immer/dist/internal").WritableDraft<EditableStepFormState>, action: PayloadAction<InitializeFormPayload>) => EditableStepFormState;
    /**
     * Start editing a step (explicit action for update mode)
     */
    startStepEditing: (state: import("immer/dist/internal").WritableDraft<EditableStepFormState>, action: PayloadAction<StartStepEditingPayload>) => void;
    /**
     * Update draft changes (temporary storage)
     */
    updateDraftChanges: (state: import("immer/dist/internal").WritableDraft<EditableStepFormState>, action: PayloadAction<any>) => void;
    /**
     * Start validation control
     */
    startValidation: (state: import("immer/dist/internal").WritableDraft<EditableStepFormState>, action: PayloadAction<number | void>) => void;
    /**
     * Mark validation as completed
     */
    markValidationCompleted: (state: import("immer/dist/internal").WritableDraft<EditableStepFormState>) => void;
    /**
     * Cancel editing - revert to original state
     */
    cancelStepEditing: (state: import("immer/dist/internal").WritableDraft<EditableStepFormState>) => void;
    /**
     * Reset form to initial state
     */
    resetForm: (state: import("immer/dist/internal").WritableDraft<EditableStepFormState>) => EditableStepFormState;
    /**
     * Update step name
     */
    updateStepName: (state: import("immer/dist/internal").WritableDraft<EditableStepFormState>, action: PayloadAction<string>) => void;
    /**
     * Update tooltip
     */
    updateTooltip: (state: import("immer/dist/internal").WritableDraft<EditableStepFormState>, action: PayloadAction<string>) => void;
    /**
     * Update slow playback time
     */
    updateSlowPlaybackTime: (state: import("immer/dist/internal").WritableDraft<EditableStepFormState>, action: PayloadAction<string>) => void;
    /**
     * Update custom metadata
     */
    updateCustomMetadata: (state: import("immer/dist/internal").WritableDraft<EditableStepFormState>, action: PayloadAction<UpdateCustomMetadataPayload>) => void;
    /**
     * Clear custom metadata field
     */
    clearCustomMetadata: (state: import("immer/dist/internal").WritableDraft<EditableStepFormState>, action: PayloadAction<string>) => void;
    /**
     * Set step profanity error
     */
    setStepProfanityError: (state: import("immer/dist/internal").WritableDraft<EditableStepFormState>, action: PayloadAction<boolean>) => void;
    /**
     * Set step input error
     */
    setStepInputError: (state: import("immer/dist/internal").WritableDraft<EditableStepFormState>, action: PayloadAction<boolean>) => void;
    /**
     * Set tooltip error
     */
    setTooltipError: (state: import("immer/dist/internal").WritableDraft<EditableStepFormState>, action: PayloadAction<boolean>) => void;
    /**
     * Set slow playback time error
     */
    setSlowPlaybackTimeError: (state: import("immer/dist/internal").WritableDraft<EditableStepFormState>, action: PayloadAction<boolean>) => void;
    /**
     * Set disable tooltip submit button
     */
    setDisableTooltipSubmit: (state: import("immer/dist/internal").WritableDraft<EditableStepFormState>, action: PayloadAction<boolean>) => void;
    /**
     * Set mounted state
     */
    setMountedState: (state: import("immer/dist/internal").WritableDraft<EditableStepFormState>, action: PayloadAction<boolean>) => void;
    /**
     * Update all errors at once
     */
    setAllErrors: (state: import("immer/dist/internal").WritableDraft<EditableStepFormState>, action: PayloadAction<Partial<FormErrors>>) => void;
}, "editableStepForm">;
export declare const initializeFormForStep: import("@reduxjs/toolkit").ActionCreatorWithPayload<InitializeFormPayload, "editableStepForm/initializeFormForStep">, resetForm: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"editableStepForm/resetForm">, startStepEditing: import("@reduxjs/toolkit").ActionCreatorWithPayload<StartStepEditingPayload, "editableStepForm/startStepEditing">, updateDraftChanges: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "editableStepForm/updateDraftChanges">, startValidation: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"editableStepForm/startValidation">, markValidationCompleted: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"editableStepForm/markValidationCompleted">, cancelStepEditing: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"editableStepForm/cancelStepEditing">, updateStepName: import("@reduxjs/toolkit").ActionCreatorWithPayload<string, "editableStepForm/updateStepName">, updateTooltip: import("@reduxjs/toolkit").ActionCreatorWithPayload<string, "editableStepForm/updateTooltip">, updateSlowPlaybackTime: import("@reduxjs/toolkit").ActionCreatorWithPayload<string, "editableStepForm/updateSlowPlaybackTime">, updateCustomMetadata: import("@reduxjs/toolkit").ActionCreatorWithPayload<UpdateCustomMetadataPayload, "editableStepForm/updateCustomMetadata">, clearCustomMetadata: import("@reduxjs/toolkit").ActionCreatorWithPayload<string, "editableStepForm/clearCustomMetadata">, setStepProfanityError: import("@reduxjs/toolkit").ActionCreatorWithPayload<boolean, "editableStepForm/setStepProfanityError">, setStepInputError: import("@reduxjs/toolkit").ActionCreatorWithPayload<boolean, "editableStepForm/setStepInputError">, setTooltipError: import("@reduxjs/toolkit").ActionCreatorWithPayload<boolean, "editableStepForm/setTooltipError">, setSlowPlaybackTimeError: import("@reduxjs/toolkit").ActionCreatorWithPayload<boolean, "editableStepForm/setSlowPlaybackTimeError">, setDisableTooltipSubmit: import("@reduxjs/toolkit").ActionCreatorWithPayload<boolean, "editableStepForm/setDisableTooltipSubmit">, setMountedState: import("@reduxjs/toolkit").ActionCreatorWithPayload<boolean, "editableStepForm/setMountedState">, setAllErrors: import("@reduxjs/toolkit").ActionCreatorWithPayload<Partial<FormErrors>, "editableStepForm/setAllErrors">;
declare const _default: import("redux").Reducer<EditableStepFormState, import("redux").AnyAction>;
export default _default;
//# sourceMappingURL=editableStepFormSlice.d.ts.map