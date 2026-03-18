/**
 * @file Manages browser storage functionalities, adapting to different browser environments.
c *
 * Supports:
 * - Chrome/Edge/Chromium (chrome.storage API)
 * - Firefox (browser.storage API)
 * - Safari (browser.storage API)
 * - Opera (chrome.storage API)
 * - Brave (chrome.storage API)
 * - Service Workers (all browsers)
 * - Standalone Web Apps (localStorage)
 */
/**
 * A utility class for handling storage operations in different browser environments.
 * It abstracts the underlying storage mechanism, allowing for seamless interaction
 * with either the browser's `localStorage` or a browser extension's `chrome.storage.local`.
 */
export declare class StorageUtil {
    /**
     * A static flag indicating whether the UDA browser plugin is enabled.
     * This flag can be set externally to control the storage behavior.
     */
    static UDABrowserPlugin: boolean;
    /**
     * Adds data to the appropriate storage mechanism (extension storage or local storage).
     *
     * @param data The data to be added.
     * @param key The key under which to store the data.
     * @param convertToString If `true`, the data will be JSON.stringified before storing. Defaults to `true`.
     * @returns A Promise that resolves when the data is successfully added to the storage.
     */
    static add(data: any, key: string, convertToString?: boolean): Promise<void>;
    /**
     * Retrieves data from the appropriate storage mechanism.
     *
     * @param key The key associated with the data to be retrieved.
     * @param parseAsJson If `true`, the retrieved data will be JSON.parsed. Defaults to `true`.
     * @returns A Promise that resolves with the retrieved data, or `null` if the key is not found.
     */
    static get(key: string, parseAsJson?: boolean): Promise<any>;
    /**
     * Removes data from the appropriate storage mechanism.
     *
     * @param key The key associated with the data to be removed.
     * @returns A Promise that resolves when the data is successfully removed from the storage.
     */
    static remove(key: string): Promise<void>;
    /**
     * Clears all data from the appropriate storage mechanism.
     *
     * @returns A Promise that resolves when the storage is successfully cleared.
     */
    static clear(): Promise<void>;
    /**
     * Sets data to storage. Checks for browser extension context first, then falls back to localStorage.
     * For browser extensions, this uses async storage (fire-and-forget).
     * For web context, this uses synchronous localStorage.
     *
     * @param data The data to be stored.
     * @param key The key under which to store the data.
     * @param isRaw If `true`, the data is stored as-is; otherwise, it's JSON.stringified.
     */
    static setToStore: (data: any, key: string, isRaw: boolean) => void;
    /**
     * Retrieves data from storage. This is a synchronous method that only works with localStorage.
     * For browser extension/service worker contexts, use the async `get()` method instead.
     *
     * @param key The key associated with the data to be retrieved.
     * @param isRaw If `true`, the data is returned as a raw string; otherwise, it's JSON.parsed.
     * @returns The retrieved data, or `undefined` if the key is not found or in service worker context.
     */
    static getFromStore: (key: string, isRaw: boolean) => any;
}
/**
 * Compatibility export for UDAStorageService
 * This provides backward compatibility with the extension layer
 * Maps to StorageUtil methods
 */
export declare const UDAStorageService: {
    /**
     * Adds data to the storage.
     * @param data - The data to be added.
     * @param key - The key to store the data under.
     * @returns A Promise that resolves when the data is added to the storage.
     */
    add: (data: any, key: string) => Promise<void>;
    /**
     * Sets data to the storage (alias for add).
     * @param key - The key to store the data under.
     * @param data - The data to be added.
     * @returns A Promise that resolves when the data is added to the storage.
     */
    set: (key: string, data: any) => Promise<void>;
    /**
     * Retrieves data from the storage.
     * @param key - The key associated with the data to be retrieved.
     * @returns A Promise that resolves with the retrieved data.
     */
    get: (key: string) => Promise<any>;
    /**
     * Removes data from the storage.
     * @param key - The key associated with the data to be removed.
     * @returns A Promise that resolves when the data is successfully removed from the storage.
     */
    remove: (key: string) => Promise<void>;
    /**
     * Clears all data from the storage.
     * @returns A Promise that resolves when the storage is successfully cleared.
     */
    clear: () => Promise<void>;
};
//# sourceMappingURL=storage.d.ts.map