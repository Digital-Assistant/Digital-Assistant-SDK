/**
 * Interface for AuthManager configuration
 */
export interface AuthManagerConfig {
    url?: string;
    realm: string;
    clientId: string;
}
/**
 * AuthManager Service
 *
 * Centralizes authentication logic using Keycloak.
 * Manages Keycloak initialization, login, logout, and token refresh.
 * Syncs authentication state with the Redux store.
 */
export declare class AuthManager {
    private static instance;
    private keycloak;
    private authenticated;
    private constructor();
    /**
     * Get the singleton instance of AuthManager
     */
    static getInstance(): AuthManager;
    /**
     * Initialize Keycloak
     * @param config Optional configuration override. Defaults to CustomConfig values.
     */
    init(config?: AuthManagerConfig): Promise<boolean>;
    /**
     * Sync Keycloak state with Redux store
     */
    private syncState;
    /**
     * Redirect to Keycloak login page
     */
    login(options?: Keycloak.KeycloakLoginOptions): Promise<void>;
    /**
     * Logout from Keycloak and clear all session storage.
     */
    logout(options?: Keycloak.KeycloakLogoutOptions): Promise<void>;
    /**
     * Manually update the token
     * @param minValidity If the token expires within this many seconds, refresh it.
     */
    updateToken(minValidity?: number): Promise<boolean>;
    /**
     * Get the current access token
     */
    getToken(): string | undefined;
    /**
     * Get user profile
     */
    getUserProfile(): Promise<Keycloak.KeycloakProfile | undefined>;
    /**
     * Check if user is authenticated
     */
    isAuthenticated(): boolean;
    /**
     * Get complete session data
     */
    getSessionData(): any;
}
export declare const authManager: AuthManager;
//# sourceMappingURL=AuthManager.d.ts.map