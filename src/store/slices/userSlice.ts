// @file:userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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

const initialState: UserState = {};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserData(state: UserState, action: PayloadAction<any>) {
            state.userData = action.payload;
            if (!state.userSessionData) {
                state.userSessionData = { authData: action.payload };
            }
        },
        setUserSessionData(state: UserState, action: PayloadAction<any>) {
            state.userSessionData = action.payload;
        },
        setKeycloakSessionData(state: UserState, action: PayloadAction<any>) {
            state.keycloakSessionData = action.payload;
        },
        clearUserData(state: UserState) {
            state.userSessionData = undefined;
            state.userData = undefined;
            state.keycloakSessionData = undefined;
            state.userSessionId = undefined;
        },
        setUserSessionId(state: UserState, action: PayloadAction<string>) {
            state.userSessionId = action.payload;
        },
    },
});

export const {
    setUserData,
    setUserSessionData,
    setKeycloakSessionData,
    clearUserData,
    setUserSessionId,
} = userSlice.actions;

export default userSlice.reducer;
