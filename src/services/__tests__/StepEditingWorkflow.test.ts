import {
    initiateStepEditing,
    updateStepDraft,
    validateStepForSave,
    commitValidatedChanges,
    cancelAndRevertChanges,
} from '../StepEditingWorkflow';
import { validateStepNameWithProfanity, saveStepChanges } from '../StepEditingService';

jest.mock('../StepEditingService');

describe('StepEditingWorkflow', () => {
    let dispatch: jest.Mock;

    beforeEach(() => {
        dispatch = jest.fn();
        jest.clearAllMocks();
    });

    describe('initiateStepEditing', () => {
        it('should dispatch startStepEditing with correct payload', () => {
            const stepData = { objectdata: JSON.stringify({ meta: {} }), clickednodename: 'Step 1' };
            initiateStepEditing(dispatch, 2, stepData, 99);
            expect(dispatch).toHaveBeenCalledTimes(1);
            const action = dispatch.mock.calls[0][0];
            expect(action.payload).toEqual({ index: 2, stepData, recordingId: 99 });
        });
    });

    describe('updateStepDraft', () => {
        it('should dispatch updateDraftChanges with the given changes', () => {
            const changes = { clickednodename: 'Updated' };
            updateStepDraft(dispatch, changes);
            expect(dispatch).toHaveBeenCalledTimes(1);
            const action = dispatch.mock.calls[0][0];
            expect(action.payload).toEqual(changes);
        });
    });

    describe('validateStepForSave', () => {
        it('should return error when form state is not found', async () => {
            const getState = () => ({});
            const result = await validateStepForSave(dispatch, getState);
            expect(result.success).toBe(false);
            expect(result.error).toBe('Form state not found');
        });

        it('should return error when step name validation fails', async () => {
            (validateStepNameWithProfanity as jest.Mock).mockResolvedValue({ success: false, error: 'Too short' });
            const getState = () => ({
                editableStepForm: { formFields: { stepEditValue: 'a' }, isUpdateMode: true },
            });
            const result = await validateStepForSave(dispatch, getState);
            expect(result.success).toBe(false);
            expect(result.error).toBe('Too short');
            expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: expect.stringContaining('setAllErrors') }));
        });

        it('should return success when validation passes', async () => {
            (validateStepNameWithProfanity as jest.Mock).mockResolvedValue({ success: true });
            const getState = () => ({
                editableStepForm: { formFields: { stepEditValue: 'Valid Name' }, isUpdateMode: false },
            });
            const result = await validateStepForSave(dispatch, getState);
            expect(result.success).toBe(true);
        });
    });

    describe('commitValidatedChanges', () => {
        it('should return error when form state is not found', async () => {
            const getState = () => ({});
            const result = await commitValidatedChanges(dispatch, getState, []);
            expect(result.success).toBe(false);
            expect(result.error).toBe('Form state not found');
        });

        it('should return error when validation is not completed', async () => {
            const getState = () => ({
                editableStepForm: {
                    formFields: { stepEditValue: 'Name' },
                    currentEditingIndex: 0,
                    isUpdateMode: false,
                    recordingId: null,
                    editingWorkflow: { validationCompleted: false },
                },
            });
            const result = await commitValidatedChanges(dispatch, getState, []);
            expect(result.success).toBe(false);
            expect(result.error).toBe('Validation not completed');
        });

        it('should call saveStepChanges and return its result when validation is completed', async () => {
            const recordData = [{ objectdata: JSON.stringify({ meta: {} }), clickednodename: 'old' }];
            (saveStepChanges as jest.Mock).mockResolvedValue({ success: true, data: recordData });
            const getState = () => ({
                editableStepForm: {
                    formFields: { stepEditValue: 'New Name' },
                    currentEditingIndex: 0,
                    isUpdateMode: false,
                    recordingId: null,
                    editingWorkflow: { validationCompleted: true },
                },
            });
            const result = await commitValidatedChanges(dispatch, getState, recordData);
            expect(saveStepChanges).toHaveBeenCalled();
            expect(result.success).toBe(true);
        });
    });

    describe('cancelAndRevertChanges', () => {
        it('should dispatch cancelStepEditing', () => {
            cancelAndRevertChanges(dispatch);
            expect(dispatch).toHaveBeenCalledTimes(1);
            const action = dispatch.mock.calls[0][0];
            expect(action.type).toContain('cancelStepEditing');
        });
    });
});
