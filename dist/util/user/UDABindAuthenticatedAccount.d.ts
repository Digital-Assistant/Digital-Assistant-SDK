import { UDASessionData } from "../../models/UDASessionData";
/**
 * Binds the authenticated account with UDASessionData.
 * @param {any} sessionData - The UDA session data.
 * @param {boolean} [renewToken=false] - Flag indicating whether to renew the token.
 * @returns {Promise<void>} A Promise that resolves when the binding is complete.
 */
export declare const UDABindAuthenticatedAccount: (sessionData: UDASessionData, renewToken?: boolean) => Promise<void>;
//# sourceMappingURL=UDABindAuthenticatedAccount.d.ts.map