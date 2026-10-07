/**
 * Storage helper for Redux slices
 * Provides synchronous-like interface for state persistence
 * Works in both service workers and regular contexts
 */
/**
 * Load state from storage (sync for web, async for service workers)
 * @param key Storage key
 * @param defaultValue Default value if not found
 */
export declare function loadFromStorage<T>(key: string, defaultValue: T): T;
/**
 * Save state to storage (async-safe)
 * @param key Storage key
 * @param state State to save
 */
export declare function saveToStorage<T>(key: string, state: T): void;
/**
 * Remove state from storage
 * @param key Storage key
 */
export declare function removeFromStorage(key: string): void;
//# sourceMappingURL=storageHelper.d.ts.map