/**
 * Retrieve the current user id from the application store.
 *
 * The function checks multiple locations in this order:
 * 1. `user.userSessionData.authData` (parsed)
 * 2. `user.userSessionData.authData.id` (raw)
 * 3. `user.userData.id`
 * 4. `user.keycloakSessionData.id`
 *
 * Returns `null` when no valid id is found or on error.
 *
 * @returns resolved user id or `null`
 */
export declare const getUserId: () => Promise<string | null>;
/**
 * Retrieve a session key or token from the application store.
 *
 * The function checks multiple locations in this order:
 * 1. `user.userSessionData.authData.token` (parsed)
 * 2. `user.userSessionData.sessionKey`
 * 3. `user.userSessionId`
 * 4. falls back to `getUserId()` if none found
 *
 * @returns session token/key or `null`
 */
export declare const getSessionKey: () => Promise<string | null>;
/**
 * Retrieve the user session id from the application store.
 *
 * Checks:
 * 1. `user.userSessionId`
 * 2. falls back to `getUserId()` if not present
 *
 * @returns session id or `null`
 */
export declare const getUserSessionId: () => Promise<string | null>;
export declare class UserService {
    /**
     * Retrieves the current user ID from the application store.
     * @returns A promise that resolves to the user ID string or null if not found.
     */
    getUserId(): Promise<string | null>;
    /**
     * Retrieves a session key or token from the application store.
     * @returns A promise that resolves to the session key string or null if not found.
     */
    getSessionKey(): Promise<string | null>;
    /**
     * Retrieves the user session ID from the application store.
     * @returns A promise that resolves to the user session ID string or null if not found.
     */
    getUserSessionId(): Promise<string | null>;
}
//# sourceMappingURL=userService.d.ts.map