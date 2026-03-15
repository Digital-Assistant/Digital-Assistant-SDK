const localStorageMock = (() => {
    let store: Record<string, string> = {};
    return {
        getItem: jest.fn((key: string) => store[key] ?? null),
        setItem: jest.fn((key: string, value: string) => { store[key] = value; }),
        removeItem: jest.fn((key: string) => { delete store[key]; }),
        clear: jest.fn(() => { store = {}; }),
    };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

let reducer: any;
let actions: any;

const getFreshModule = () => {
    jest.resetModules();
    localStorageMock.clear();
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
    const mod = require('../editableStepFormSlice');
    reducer = mod.default;
    actions = mod;
    return reducer;
};

describe('editableStepFormSlice', () => {
    beforeEach(() => getFreshModule());

    const defaultState = {
        formFields: { stepEditValue: '', tooltip: '', slowPlaybackTime: '', customMetadata: {} },
        errors: { stepProfanityError: false, stepInputError: false, tooltipError: false, slowPlaybackTimeError: false },
        uiState: { disableTooltipSubmitBtn: true, isMounted: true },
        editingWorkflow: { isEditing: false, originalStepData: null, draftChanges: null, validationRequired: false, validationCompleted: false, validationInProgress: false },
        currentEditingIndex: null,
        isUpdateMode: false,
        recordingId: null,
    };

    it('should return the initial state', () => {
        expect(reducer(undefined, { type: '' })).toEqual(defaultState);
    });

    it('should handle initializeFormForStep', () => {
        const item = { objectdata: JSON.stringify({ meta: { displayText: 'My Step', tooltipInfo: 'tip', slowPlaybackTime: 500 } }), clickednodename: 'fallback' };
        const state = reducer(undefined, actions.initializeFormForStep({ item, index: 1, isUpdateMode: true, recordingId: 10 }));
        expect(state.formFields.stepEditValue).toBe('My Step');
        expect(state.formFields.tooltip).toBe('tip');
        expect(state.formFields.slowPlaybackTime).toBe('500');
        expect(state.currentEditingIndex).toBe(1);
        expect(state.isUpdateMode).toBe(true);
        expect(state.recordingId).toBe(10);
    });

    it('should fall back to clickednodename when meta.displayText is absent', () => {
        const item = { objectdata: JSON.stringify({}), clickednodename: 'Fallback Name' };
        const state = reducer(undefined, actions.initializeFormForStep({ item, index: 0, isUpdateMode: false }));
        expect(state.formFields.stepEditValue).toBe('Fallback Name');
    });

    it('should handle startStepEditing', () => {
        const stepData = { objectdata: JSON.stringify({ meta: { displayText: 'Edit Me' } }), clickednodename: 'Edit Me' };
        const state = reducer(undefined, actions.startStepEditing({ index: 3, stepData, recordingId: 55 }));
        expect(state.currentEditingIndex).toBe(3);
        expect(state.isUpdateMode).toBe(true);
        expect(state.recordingId).toBe(55);
        expect(state.editingWorkflow.isEditing).toBe(true);
    });

    it('should handle updateDraftChanges', () => {
        const state = reducer(undefined, actions.updateDraftChanges({ clickednodename: 'Draft' }));
        expect(state.editingWorkflow.draftChanges).toEqual({ clickednodename: 'Draft' });
        expect(state.editingWorkflow.validationRequired).toBe(true);
        expect(state.editingWorkflow.validationCompleted).toBe(false);
    });

    it('should handle startValidation', () => {
        const state = reducer(undefined, actions.startValidation());
        expect(state.editingWorkflow.validationRequired).toBe(true);
        expect(state.editingWorkflow.validationInProgress).toBe(true);
        expect(state.editingWorkflow.validationCompleted).toBe(false);
    });

    it('should handle markValidationCompleted', () => {
        const state = reducer(undefined, actions.markValidationCompleted());
        expect(state.editingWorkflow.validationCompleted).toBe(true);
        expect(state.editingWorkflow.validationInProgress).toBe(false);
        expect(state.editingWorkflow.validationRequired).toBe(false);
    });

    it('should handle cancelStepEditing', () => {
        const started = reducer(undefined, actions.startStepEditing({ index: 1, stepData: {}, recordingId: 1 }));
        const state = reducer(started, actions.cancelStepEditing());
        expect(state.isUpdateMode).toBe(false);
        expect(state.currentEditingIndex).toBeNull();
        expect(state.editingWorkflow.isEditing).toBe(false);
    });

    it('should handle resetForm', () => {
        const started = reducer(undefined, actions.startStepEditing({ index: 1, stepData: {}, recordingId: 1 }));
        const state = reducer(started, actions.resetForm());
        expect(state).toEqual(defaultState);
    });

    it('should handle updateStepName', () => {
        const state = reducer(undefined, actions.updateStepName('New Name'));
        expect(state.formFields.stepEditValue).toBe('New Name');
    });

    it('should handle updateTooltip', () => {
        const state = reducer(undefined, actions.updateTooltip('My tooltip'));
        expect(state.formFields.tooltip).toBe('My tooltip');
    });

    it('should handle updateSlowPlaybackTime', () => {
        const state = reducer(undefined, actions.updateSlowPlaybackTime('1000'));
        expect(state.formFields.slowPlaybackTime).toBe('1000');
    });

    it('should handle updateCustomMetadata', () => {
        const state = reducer(undefined, actions.updateCustomMetadata({ key: 'inputType', value: 'text' }));
        expect(state.formFields.customMetadata.inputType).toBe('text');
    });

    it('should handle clearCustomMetadata', () => {
        let state = reducer(undefined, actions.updateCustomMetadata({ key: 'inputType', value: 'text' }));
        state = reducer(state, actions.clearCustomMetadata('inputType'));
        expect(state.formFields.customMetadata.inputType).toBeUndefined();
    });

    it('should handle setStepProfanityError', () => {
        const state = reducer(undefined, actions.setStepProfanityError(true));
        expect(state.errors.stepProfanityError).toBe(true);
    });

    it('should handle setStepInputError', () => {
        const state = reducer(undefined, actions.setStepInputError(true));
        expect(state.errors.stepInputError).toBe(true);
    });

    it('should handle setTooltipError', () => {
        const state = reducer(undefined, actions.setTooltipError(true));
        expect(state.errors.tooltipError).toBe(true);
    });

    it('should handle setSlowPlaybackTimeError', () => {
        const state = reducer(undefined, actions.setSlowPlaybackTimeError(true));
        expect(state.errors.slowPlaybackTimeError).toBe(true);
    });

    it('should handle setDisableTooltipSubmit', () => {
        const state = reducer(undefined, actions.setDisableTooltipSubmit(false));
        expect(state.uiState.disableTooltipSubmitBtn).toBe(false);
    });

    it('should handle setMountedState', () => {
        const state = reducer(undefined, actions.setMountedState(false));
        expect(state.uiState.isMounted).toBe(false);
    });

    it('should handle setAllErrors', () => {
        const state = reducer(undefined, actions.setAllErrors({ stepProfanityError: true, tooltipError: true }));
        expect(state.errors.stepProfanityError).toBe(true);
        expect(state.errors.tooltipError).toBe(true);
        expect(state.errors.stepInputError).toBe(false);
    });
});
