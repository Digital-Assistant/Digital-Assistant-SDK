import { apiClient } from './apiClient';
import { ENDPOINT } from '../config/endpoints';
import { getSessionKey, getUserId } from './userService';
import { processUrlArgs } from '../util/urlProcessing';
import { StorageUtil } from '../util/storage';
import { CONFIG } from '../config/constants';
import { addBodyEvents } from '../util/recording/addBodyEvents';
import { fetchDomain } from '../util/fetchDomain';

/**
 * Core RecordService
 *
 * Framework-agnostic HTTP methods related to recording flows. This module contains
 * only network/parameter shaping logic and must not access window/document or DOM.
 */

/**
 * Record a set of clicks or other user interactions.
 */
export const recordClicks = async (request: any = {}): Promise<any> => {
  const sessionId = await getSessionKey();
  const payload = { ...request, sessionid: sessionId };
  const response = await apiClient.post(ENDPOINT.Record, payload);
  return response.data;
};

/**
 * Update previously recorded clicks.
 */
export const updateRecordClicks = async (request: any = {}): Promise<any> => {
  const response = await apiClient.post(ENDPOINT.UpdateRecord, request);
  return response.data;
};

/**
 * Re-index a sequence by id.
 */
export const updateSequnceIndex = async (id: number): Promise<any> => {
  const url = ENDPOINT.updateSequenceIndex + String(id);
  const response = await apiClient.post(url);
  return response.data;
};

/**
 * Record a sequence of user interactions.
 * Adds usersessionid automatically from the current user where available.
 */
export const recordSequence = async (request: any): Promise<any> => {
  if (!request) throw new Error('Request object is required');
  const usersessionid = await getUserId();
  if (!usersessionid) throw new Error('User session ID could not be retrieved');
  const payload = { ...request, usersessionid };
  const response = await apiClient.post(ENDPOINT.RecordSequence, payload);
  return response.data;
};

/**
 * Record a user click event (framework-agnostic).
 * Note: callers should provide clickedname in the request when needed.
 */
export const userClick = async (request: any): Promise<any> => {
  if (!request) throw new Error('Request object is required');
  const usersessionid = await getUserId();
  const payload = { ...request, usersessionid };
  const response = await apiClient.put(ENDPOINT.UserClick, payload);
  return response.data;
};

/**
 * Delete a recording sequence.
 */
export const deleteRecording = async (request: any): Promise<any> => {
  if (!request) throw new Error('Request object is required');
  const usersessionid = await getUserId();
  const payload = { ...request, usersessionid };
  const response = await apiClient.post(ENDPOINT.DeleteSequence, payload);
  return response.data;
};

/**
 * Update an existing recording sequence.
 */
export const updateRecording = async (request: any): Promise<any> => {
  if (!request) throw new Error('Request object is required');
  const usersessionid = await getUserId();
  const payload = { ...request, usersessionid };
  const response = await apiClient.post(ENDPOINT.updateRecordSequence, payload);
  return response.data;
};

/**
 * Fetch status options (category-based).
 */
export const fetchStatuses = async (request: { category: string } = { category: 'sequenceList' }): Promise<any> => {
  if (!request?.category) throw new Error('Category is required');
  const url = processUrlArgs(ENDPOINT.statuses, request);
  const response = await apiClient.get(url);
  return response.data;
};


/**
 * Profanity check helper (passes text to configured endpoint).
 * Consumers must provide any required headers at gateway; here we only POST the body.
 * If profanity key gating is required, it should be handled by the backend or caller.
 */
export const profanityCheck = async (request: any): Promise<any> => {
  if (!request) throw new Error('Request object is required');

  const headers: Record<string, string> = {
    'Content-Type': 'text/plain'
  };

  // If subscription key is available in config, append it as Ocp-Apim-Subscription-Key
  if (CONFIG.profanity?.config?.key1) {
    headers['Ocp-Apim-Subscription-Key'] = CONFIG.profanity.config.key1;
  }

  const response = await apiClient.post(ENDPOINT.ProfanityCheck, request, {
    headers: headers
  });
  return response.data;
};

/**
 * Prepare record sequence payload by pulling recorded nodes from storage.
 * Accepts optional overrides via request: { domain?, userclicknodesSet? }
 */
export const prepareRecordSequencePayload = async (request: any): Promise<any> => {
  if (!request) throw new Error('Request object is required');

  // Prefer provided userclicknodesSet, else read from storage
  const userclicknodesSet = request.userclicknodesSet ?? (await StorageUtil.get(CONFIG.RECORDING_SEQUENCE)) ?? [];
  const ids: string[] = (userclicknodesSet || []).map((item: any) => String(item.id)).filter(Boolean);

  // Determine domain: prefer explicit request.domain, else fetchDomain() result
  let domain = request.domain;
  if (!domain) {
    domain = fetchDomain() || '';
  }

  return {
    ...request,
    domain: domain || '',
    isIgnored: 0,
    isValid: 1,
    userclicknodelist: ids.join(','),
    userclicknodesSet,
  };
};

/**
 * Posts a recorded sequence of user interactions to the backend.
 * @param request - An object containing the data required to record the sequence of user interactions.
 * @returns A promise that resolves when the sequence of user interactions has been posted.
 * @throws Error - If no request object is provided.
 */
export const postRecordSequenceData = async (request: any): Promise<any> => {
  if (!request) throw new Error('Request object is required');
  const payload = await prepareRecordSequencePayload(request);
  return recordSequence(payload);
};

/**
 * Updates a previously recorded sequence of user interactions.
 * @param request - An object containing the data required to update the sequence of user interactions.
 * @returns A promise that resolves when the sequence of user interactions has been updated.
 * @throws Error - If no request object is provided.
 */
export const updateRecordSequenceData = async (request: any): Promise<any> => {
  if (!request) throw new Error('Request object is required');
  const payload = await prepareRecordSequencePayload(request);
  // UI previously called recordSequence for updates as well
  return recordSequence(payload);
};

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
export const finalSaveSequence = async (
  request: any,
  recordData: any[],
  onProgress?: (percent: number) => void
): Promise<{ response: any; updatedRecordData: any[] }> => {
  if (!request) throw new Error('Request object is required');
  const totalSteps = recordData.length + 1; // +1 for the final sequence record
  let savedSteps = 0;

  const updateProgress = () => {
    if (onProgress) {
      onProgress(Math.ceil((savedSteps / totalSteps) * 100));
    }
  };

  // 1. Save all unsaved clicks sequentially
  const updatedRecordData = [...recordData];
  for (let i = 0; i < updatedRecordData.length; i++) {
    const clickData = updatedRecordData[i];
    if (clickData?.id) {
      savedSteps++;
      updateProgress();
      continue;
    }

    try {
      const resp = await recordClicks(clickData);
      if (resp?.id) {
        updatedRecordData[i] = resp;
        savedSteps++;
        updateProgress();
      } else {
        throw new Error(`Failed to record click at index ${i}`);
      }
    } catch (error) {
      console.error('SDK: Error saving individual click', error);
      throw error;
    }
  }

  // 2. Update storage with fully saved click data so it persists
  await StorageUtil.add(updatedRecordData, CONFIG.RECORDING_SEQUENCE, false);

  // 3. Prepare the sequence payload using the updated nodes
  const payload = await prepareRecordSequencePayload({
    ...request,
    userclicknodesSet: updatedRecordData
  });

  // 4. Final sequence save
  try {
    const response = await recordSequence(payload);
    savedSteps++;
    updateProgress();
    return { response, updatedRecordData };
  } catch (error) {
    console.error('SDK: Error saving final sequence', error);
    throw error;
  }
};

// ─── Recording Lifecycle ────────────────────────────────────────────────────

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
export const startRecording = async (): Promise<void> => {
  // Set global flags (checked by SDK utilities)
  if (typeof window !== 'undefined') {
    (window as any).isRecording = true;
    if (window.udanSelectedNodes === undefined) {
      (window as any).udanSelectedNodes = [];
    }
  }
  CONFIG.isRecording = true;

  // Persist to storage so state survives re-renders
  StorageUtil.setToStore(true, CONFIG.RECORDING_SWITCH_KEY, true);

  // Attach click listeners to all DOM elements
  await addBodyEvents();
};

/**
 * Cancels / stops recording mode.
 *
 * - Clears global flags.
 * - Removes recorded nodes from storage.
 * - Clears the selected nodes list.
 */
export const cancelRecording = (): void => {
  // Clear global flags
  if (typeof window !== 'undefined') {
    (window as any).isRecording = false;
    if ((window as any).udanSelectedNodes) {
      (window as any).udanSelectedNodes = [];
    }
  }
  CONFIG.isRecording = false;

  // Clear storage
  StorageUtil.setToStore(false, CONFIG.RECORDING_SWITCH_KEY, true);
  StorageUtil.setToStore([], CONFIG.RECORDING_SEQUENCE, false);
  StorageUtil.setToStore('off', CONFIG.RECORDING_MANUAL_PLAY, true);
};

