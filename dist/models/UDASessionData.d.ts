import { AuthData } from "./AuthData";
import { CSPData } from "./CSPData";
export declare class UDASessionData {
    sessionKey: string | null;
    authenticated: boolean;
    authenticationSource: string | null;
    authData: AuthData;
    csp: CSPData;
    constructor(sessionKey?: string | null, authenticated?: boolean, authenticationSource?: string | null, authData?: AuthData, csp?: CSPData);
}
//# sourceMappingURL=UDASessionData.d.ts.map