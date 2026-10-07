/**
 * StepEditingWorkflow
 * Orchestrates the workflow for editing steps including:
 * - initializing editing state
 * - managing draft changes
 * - validating changes
 * - saving/committing changes
 */
import { ServiceResult } from './StepEditingService';
/**
 * Initiate editing for a specific step
 */
export declare const initiateStepEditing: (dispatch: Function, index: number, stepData: any, recordingId: number) => void;
/**
 * Update step draft data (temporary storage)
 */
export declare const updateStepDraft: (dispatch: Function, changes: any) => void;
/**
 * Validate the current step draft
 */
export declare const validateStepForSave: (dispatch: Function, getState: Function) => Promise<ServiceResult>;
/**
 * Commit validated changes to the server/persistent storage
 */
export declare const commitValidatedChanges: (dispatch: Function, getState: Function, recordData: any[]) => Promise<ServiceResult>;
/**
 * Cancel editing and revert changes
 */
export declare const cancelAndRevertChanges: (dispatch: Function) => void;
//# sourceMappingURL=StepEditingWorkflow.d.ts.map