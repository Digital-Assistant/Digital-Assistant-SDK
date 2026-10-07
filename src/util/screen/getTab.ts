import { getActiveTabId, getBrowserVar, getUDABrowserPlugin } from '../browser';
import { UDAConsoleLogger } from '../error';

/**
 * Retrieves the currently active tab from the browser.
 * This function first attempts to query for the active tab in the current window.
 * If that fails, it tries to retrieve the tab using a stored active tab ID.
 *
 * @returns {Promise<Object|boolean>} A promise that resolves to the active tab object if found, otherwise `false`.
 */
export const getTab = async () => {
    const queryOptions = { active: true, currentWindow: true };
    const browserVar = getBrowserVar();
    const activeTabId = getActiveTabId();
    const UDABrowserPlugin = getUDABrowserPlugin(); // Although not directly used here, it's part of the browser context.

    let tab = null;

    try {
        // Attempt to query for the active tab in the current window.
        tab = (await browserVar.tabs.query(queryOptions))[0];
        if (tab) {
            return tab;
        }
    } catch (error) {
        console.error('Error querying active tab:', error);
        // Fall through to try activeTabId if query fails
    }

    // If no tab is found by query, try to retrieve it using the active tab ID.
    if (activeTabId !== -1) {
        try {
            tab = await browserVar.tabs.get(activeTabId);
            if (tab) {
                return tab;
            } else {
                UDAConsoleLogger.info('No active tab identified.', 2);
                return false;
            }
        } catch (error) {
            console.error('Error getting tab by ID:', error);
            UDAConsoleLogger.info('No active tab identified.', 2);
            return false;
        }
    }
    // If all attempts fail, return false.
    else {
        return false;
    }
};
