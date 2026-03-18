import { UDASessionData } from "../../models/UDASessionData";
/**
 * Store keycloak authentication data in session
 * Platform-agnostic - works in both browser extensions and standalone apps
 *
 * This function handles keycloak authentication by:
 * 1. Getting a session key from the backend
 * 2. Storing the authentication data
 * 3. Binding the authenticated account
 *
 * @param sessionData - The UDA session data object
 * @param data - Keycloak authentication data
 * @returns Promise<void>
 */
export declare const keyCloakStore: (sessionData: UDASessionData, data: any) => Promise<void>;
//# sourceMappingURL=KeycloakStore.d.ts.map