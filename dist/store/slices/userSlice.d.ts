import { PayloadAction } from '@reduxjs/toolkit';
interface AuthData {
    id?: string;
    token?: string;
    email?: string;
    refreshToken?: string;
}
export interface UserState {
    userSessionData?: {
        authData?: AuthData;
        sessionKey?: string;
    };
    userData?: AuthData;
    keycloakSessionData?: AuthData;
    userSessionId?: string;
}
export declare const userSlice: import("@reduxjs/toolkit").Slice<UserState, {
    setUserData(state: import("immer/dist/internal").WritableDraft<UserState>, action: PayloadAction<any>): void;
    setUserSessionData(state: import("immer/dist/internal").WritableDraft<UserState>, action: PayloadAction<any>): void;
    setKeycloakSessionData(state: import("immer/dist/internal").WritableDraft<UserState>, action: PayloadAction<any>): void;
    clearUserData(state: import("immer/dist/internal").WritableDraft<UserState>): void;
    setUserSessionId(state: import("immer/dist/internal").WritableDraft<UserState>, action: PayloadAction<string>): void;
}, "user">;
export declare const setUserData: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "user/setUserData">, setUserSessionData: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "user/setUserSessionData">, setKeycloakSessionData: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "user/setKeycloakSessionData">, clearUserData: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"user/clearUserData">, setUserSessionId: import("@reduxjs/toolkit").ActionCreatorWithPayload<string, "user/setUserSessionId">;
declare const _default: import("redux").Reducer<UserState, import("redux").AnyAction>;
export default _default;
//# sourceMappingURL=userSlice.d.ts.map