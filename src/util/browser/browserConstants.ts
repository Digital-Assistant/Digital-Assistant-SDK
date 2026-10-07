/**
 * @file This file contains constants and functions related to browser detection and plugin state.
 *
 * Supports all major browsers:
 * - Chrome, Edge, Chromium (chrome API)
 * - Firefox (browser API)
 * - Safari (browser API)
 * - Opera, Brave (chrome API)
 */
import { CONFIG } from '../../config';

// Detection and the plugin flag live in util/storage/detect (single source of truth).
export {
    updateBrowserPlugin,
    getUDABrowserPlugin,
    getEnablePlugin,
    getBrowserVar,
    getBrowser,
} from '../storage/detect';

/**
 * The session name for UDA.
 */
let UDASessionName = CONFIG.USER_AUTH_DATA_KEY;

/**
 * The ID of the active tab.
 */
let activeTabId: number = -1;

/**
 * Updates the `UDASessionName` constant.
 * @param sessionName - The new session name.
 */
export const updateSessionName = (sessionName: string) => {
    UDASessionName = CONFIG.USER_AUTH_DATA_KEY + '-' + sessionName;
};

/**
 * Updates the `activeTabId` constant.
 * @param tabId - The new tab ID.
 */
export const updateActiveTabId = (tabId: any) => {
    activeTabId = tabId;
};

export const getUDASessionName = () => UDASessionName;
export const getActiveTabId = () => activeTabId;
