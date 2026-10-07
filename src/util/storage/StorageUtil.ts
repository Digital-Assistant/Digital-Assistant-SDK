/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * @file Manages browser storage functionalities, adapting to different browser environments.
 *
 * Supports extension storage (Chrome/Edge/Firefox/Safari/Opera/Brave, service workers)
 * and falls back to localStorage for standalone web apps. Environment detection
 * lives in `./detect`.
 */
import {
    getBrowserAPI,
    getBrowserVar,
    getEnablePlugin,
    getUDABrowserPlugin,
    isServiceWorker,
    updateBrowserPlugin,
} from './detect';

/**
 * A utility class for handling storage operations in different browser environments.
 * It abstracts the underlying storage mechanism, allowing for seamless interaction
 * with either the browser's `localStorage` or a browser extension's `chrome.storage.local`.
 */
export class StorageUtil {
    /**
     * A static flag indicating whether the UDA browser plugin is enabled.
     * This flag can be set externally to control the storage behavior.
     */
    public static get UDABrowserPlugin(): boolean {
        return getUDABrowserPlugin();
    }

    public static set UDABrowserPlugin(value: boolean) {
        updateBrowserPlugin(value);
    }

    /**
     * Resolves the extension storage area to use, or `null` when localStorage applies.
     * Plugin mode (flag set + extension-capable browser) takes precedence over service-worker mode.
     */
    private static getExtensionStorage(): any {
        const browserVar = getBrowserVar();
        if (this.UDABrowserPlugin && getEnablePlugin() && browserVar?.storage) {
            return browserVar.storage;
        }
        if (isServiceWorker()) {
            return getBrowserAPI()?.storage ?? null;
        }
        return null;
    }

    /**
     * Adds data to the appropriate storage mechanism (extension storage or local storage).
     *
     * @param data The data to be added.
     * @param key The key under which to store the data.
     * @param convertToString If `true`, the data will be JSON.stringified before storing. Defaults to `true`.
     * @returns A Promise that resolves when the data is successfully added to the storage.
     */
    public static async add(
        data: any,
        key: string,
        convertToString: boolean = true,
    ): Promise<void> {
        const value = convertToString ? JSON.stringify(data) : data;
        const extensionStorage = this.getExtensionStorage();

        if (extensionStorage) {
            return extensionStorage.local.set({ [key]: value });
        }
        if (typeof window !== 'undefined' && window.localStorage) {
            return window.localStorage.setItem(key, value);
        }
    }

    /**
     * Retrieves data from the appropriate storage mechanism.
     *
     * @param key The key of the data to retrieve.
     * @param parseAsJson If `true`, the retrieved data is JSON.parsed. Defaults to `true`.
     * @returns A Promise resolving to the stored value, or `null` when absent.
     */
    public static async get(
        key: string,
        parseAsJson: boolean = true,
    ): Promise<any> {
        const extensionStorage = this.getExtensionStorage();
        let item: any = null;

        if (extensionStorage) {
            const result = await extensionStorage.local.get([key]);
            item = result[key];
        } else if (typeof window !== 'undefined' && window.localStorage) {
            item = window.localStorage.getItem(key);
        }

        if (!item) {
            return null;
        }
        return parseAsJson ? JSON.parse(item) : item;
    }

    /**
     * Removes data from the appropriate storage mechanism.
     *
     * @param key The key of the data to remove.
     */
    public static async remove(key: string): Promise<void> {
        const extensionStorage = this.getExtensionStorage();

        if (extensionStorage) {
            return extensionStorage.local.remove([key]);
        }
        if (typeof window !== 'undefined' && window.localStorage) {
            return window.localStorage.removeItem(key);
        }
    }

    /**
     * Clears all data from the appropriate storage mechanism.
     */
    public static async clear(): Promise<void> {
        const extensionStorage = this.getExtensionStorage();

        if (extensionStorage) {
            return extensionStorage.local.clear();
        }
        if (typeof window !== 'undefined' && window.localStorage) {
            return window.localStorage.clear();
        }
    }

    /**
     * Synchronously stores data. Extension storage writes are fire-and-forget
     * (errors are logged); otherwise localStorage is used.
     *
     * @param data The data to store.
     * @param key The storage key.
     * @param isRaw If `true`, `data` is stored as-is without JSON.stringify.
     */
    public static setToStore = (data: any, key: string, isRaw: boolean) => {
        const serializedData = !isRaw ? JSON.stringify(data) : data;
        const extensionStorage = StorageUtil.getExtensionStorage();

        if (extensionStorage) {
            extensionStorage.local
                .set({ [key]: serializedData })
                .catch((err: Error) => {
                    console.error(
                        `Error saving ${key} to extension storage:`,
                        err,
                    );
                });
        } else if (typeof window !== 'undefined' && window.localStorage) {
            window.localStorage.setItem(key, serializedData);
        } else {
            console.warn('Storage not available. Use async methods instead.');
        }
    };

    /**
     * Synchronously reads data. Extension storage is async-only, so in that
     * case a warning is logged and `undefined` is returned.
     *
     * @param key The storage key.
     * @param isRaw If `true`, the raw string is returned without JSON.parse.
     */
    public static getFromStore = (key: string, isRaw: boolean) => {
        if (StorageUtil.getExtensionStorage()) {
            console.warn(
                `getFromStore() is synchronous and cannot access extension storage. Use async get() method instead for key: ${key}`,
            );
            return undefined;
        }

        if (typeof window !== 'undefined' && window.localStorage) {
            const data = window.localStorage.getItem(key);
            if (data) return !isRaw ? JSON.parse(data) : data;
        } else {
            console.warn(
                'Storage not available. Use async get() method instead.',
            );
            return undefined;
        }
    };
}

/**
 * Compatibility export for UDAStorageService
 * This provides backward compatibility with the extension layer
 * Maps to StorageUtil methods
 */
export const UDAStorageService = {
    /**
     * Adds data to the storage.
     * @param data - The data to be added.
     * @param key - The key to store the data under.
     * @returns A Promise that resolves when the data is added to the storage.
     */
    add: async (data: any, key: string): Promise<void> => {
        return StorageUtil.add(data, key, false);
    },

    /**
     * Sets data to the storage (alias for add).
     * @param key - The key to store the data under.
     * @param data - The data to be added.
     * @returns A Promise that resolves when the data is added to the storage.
     */
    set: async (key: string, data: any): Promise<void> => {
        return StorageUtil.add(data, key, false);
    },

    /**
     * Retrieves data from the storage.
     * @param key - The key associated with the data to be retrieved.
     * @returns A Promise that resolves with the retrieved data.
     */
    get: async (key: string): Promise<any> => {
        return StorageUtil.get(key, false);
    },

    /**
     * Removes data from the storage.
     * @param key - The key associated with the data to be removed.
     * @returns A Promise that resolves when the data is successfully removed from the storage.
     */
    remove: async (key: string): Promise<void> => {
        return StorageUtil.remove(key);
    },

    /**
     * Clears all data from the storage.
     * @returns A Promise that resolves when the storage is successfully cleared.
     */
    clear: async (): Promise<void> => {
        return StorageUtil.clear();
    },
};
