/**
 * Core RecordService
 *
 * Framework-agnostic HTTP methods related to recording flows. This module contains
 * only network/parameter shaping logic and must not access window/document or DOM.
 */
export declare const recordClicks: (request?: any) => Promise<any>;
export declare const updateRecordClicks: (request?: any) => Promise<any>;
/**
 * Re-index a sequence by id.
 */
export declare const updateSequnceIndex: (id: number) => Promise<any>;
/**
 * Record a sequence of user interactions.
 * Adds usersessionid automatically from the current user where available.
 */
export declare const recordSequence: (request: any) => Promise<any>;
/**
 * Record a user click event (framework-agnostic).
 * Note: callers should provide clickedname in the request when needed.
 */
export declare const userClick: (request: any) => Promise<any>;
/**
 * Delete a recording sequence.
 */
export declare const deleteRecording: (request: any) => Promise<any>;
/**
 * Update an existing recording sequence.
 */
export declare const updateRecording: (request: any) => Promise<any>;
export declare const fetchStatuses: (request?: {
    category: string;
}) => Promise<any>;
/**
 * Profanity check helper (passes text to configured endpoint).
 * Consumers must provide any required headers at gateway; here we only POST the body.
 * If profanity key gating is required, it should be handled by the backend or caller.
 */
export declare const profanityCheck: (request: any) => Promise<any>;
/**
 * Prepare record sequence payload by pulling recorded nodes from storage.
 * Accepts optional overrides via request: { domain?, userclicknodesSet? }
 */
export declare const prepareRecordSequencePayload: (request: any) => Promise<any>;
/**
 * Posts a recorded sequence of user interactions to the backend.
 * @param request - An object containing the data required to record the sequence of user interactions.
 * @returns A promise that resolves when the sequence of user interactions has been posted.
 * @throws Error - If no request object is provided.
 */
export declare const postRecordSequenceData: (request: any) => Promise<any>;
/**
 * Updates a previously recorded sequence of user interactions.
 * @param request - An object containing the data required to update the sequence of user interactions.
 * @returns A promise that resolves when the sequence of user interactions has been updated.
 * @throws Error - If no request object is provided.
 */
export declare const updateRecordSequenceData: (request: any) => Promise<any>;
export type RecordService = {
    recordClicks: typeof recordClicks;
    updateRecordClicks: typeof updateRecordClicks;
    updateSequnceIndex: typeof updateSequnceIndex;
    recordSequence: typeof recordSequence;
    postRecordSequenceData: typeof postRecordSequenceData;
    updateRecordSequenceData: typeof updateRecordSequenceData;
    userClick: typeof userClick;
    deleteRecording: typeof deleteRecording;
    updateRecording: typeof updateRecording;
    fetchStatuses: typeof fetchStatuses;
    profanityCheck: typeof profanityCheck;
    prepareRecordSequencePayload: typeof prepareRecordSequencePayload;
    startRecording: typeof startRecording;
    cancelRecording: typeof cancelRecording;
    finalSaveSequence: typeof finalSaveSequence;
};
/**
 * Orchestrates the final save of a sequence.
 *
 * This includes saving any "dirty" clicks (those without an id) first,
 * then updating the sequence payload and posting it.
 *
 * @param request - The sequence metadata (name, domain, labels, permissions, etc.)
 * @param recordData - The array of recorded click nodes (potentially unsaved)
 * @param onProgress - Optional callback for progress updates (percent: 0-100)
 * @returns Object containing the sequence response and updated recordData
 */
export declare const finalSaveSequence: (request: any, recordData: any[], onProgress?: ((percent: number) => void) | undefined) => Promise<{
    response: any;
    updatedRecordData: any[];
}>;
/**
 * Activates recording mode.
 *
 * - Sets the global `window.isRecording` and `CONFIG.isRecording` flags so
 *   every SDK utility that checks recording state behaves correctly.
 * - Persists the flag to SessionStorage via StorageUtil so it survives
 *   panel re-renders.
 * - Calls `addBodyEvents()` to attach click listeners to all DOM elements,
 *   which is what causes user interactions to be captured.
 */
export declare const startRecording: () => Promise<void>;
/**
 * Cancels / stops recording mode.
 *
 * - Clears global flags.
 * - Removes recorded nodes from storage.
 * - Clears the selected nodes list.
 */
export declare const cancelRecording: () => void;
//# sourceMappingURL=RecordService.d.ts.map