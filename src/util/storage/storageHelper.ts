/**
 * Storage helper for Redux slices
 * Provides synchronous-like interface for state persistence
 * Works in both service workers and regular contexts
 */

import { StorageUtil } from './StorageUtil';
import { getBrowserAPI, isServiceWorker } from './detect';

/**
 * Load state from storage (sync for web, async for service workers)
 * @param key Storage key
 * @param defaultValue Default value if not found
 */
export function loadFromStorage<T>(key: string, defaultValue: T): T {
    try {
        // Service worker context - use extension storage (must handle async carefully)
        if (isServiceWorker()) {
            const browserAPI = getBrowserAPI();
            if (browserAPI?.storage) {
                // For initial load in service worker, we return default
                // and load asynchronously in the background
                loadAsync(key, defaultValue).catch((err) => {
                    console.error(`Error loading ${key} from storage:`, err);
                });
                return defaultValue;
            }
        }

        // Regular web context - use localStorage
        // Access via window.localStorage to avoid warnings in service workers
        if (typeof window !== 'undefined' && window.localStorage) {
            const serializedState = window.localStorage.getItem(key);
            if (serializedState === null) {
                return defaultValue;
            }
            return JSON.parse(serializedState);
        }

        return defaultValue;
    } catch (err) {
        console.error(`Error loading ${key} from storage:`, err);
        return defaultValue;
    }
}

/**
 * Async load for service workers
 */
async function loadAsync<T>(key: string, defaultValue: T): Promise<T> {
    try {
        const result = await StorageUtil.get(key, true);
        return result !== null ? result : defaultValue;
    } catch (err) {
        console.error(`Error loading ${key} async:`, err);
        return defaultValue;
    }
}

/**
 * Save state to storage (async-safe)
 * @param key Storage key
 * @param state State to save
 */
export function saveToStorage<T>(key: string, state: T): void {
    try {
        const serializedState = JSON.stringify(state);

        // Service worker context - use extension storage
        if (isServiceWorker()) {
            const browserAPI = getBrowserAPI();
            if (browserAPI?.storage) {
                // Save asynchronously (fire and forget)
                const storageData: Record<string, string> = {};
                storageData[key] = serializedState;
                browserAPI.storage.local
                    .set(storageData)
                    .catch((err: Error) => {
                        console.error(`Error saving ${key} to storage:`, err);
                    });
                return;
            }
        }

        // Regular web context - use localStorage
        // Access via window.localStorage to avoid warnings in service workers
        if (typeof window !== 'undefined' && window.localStorage) {
            window.localStorage.setItem(key, serializedState);
            return;
        }

        // Fallback - use StorageUtil async (fire and forget)
        StorageUtil.add(state, key, false).catch((err) => {
            console.error(`Error saving ${key} to storage:`, err);
        });
    } catch (err) {
        console.error(`Error saving ${key} to storage:`, err);
    }
}

/**
 * Remove state from storage
 * @param key Storage key
 */
export function removeFromStorage(key: string): void {
    try {
        // Service worker context
        if (isServiceWorker()) {
            const browserAPI = getBrowserAPI();
            if (browserAPI?.storage) {
                browserAPI.storage.local.remove([key]).catch((err: Error) => {
                    console.error(`Error removing ${key} from storage:`, err);
                });
                return;
            }
        }

        // Regular web context
        // Access via window.localStorage to avoid warnings in service workers
        if (typeof window !== 'undefined' && window.localStorage) {
            window.localStorage.removeItem(key);
            return;
        }

        // Fallback
        StorageUtil.remove(key).catch((err) => {
            console.error(`Error removing ${key} from storage:`, err);
        });
    } catch (err) {
        console.error(`Error removing ${key} from storage:`, err);
    }
}
