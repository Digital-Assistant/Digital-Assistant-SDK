//adding the sessionKey to the authid
import { UDASendSessionData } from './UDASendSessionData';
import { ENDPOINT } from '../../config';
import { StorageUtil } from '../storage';
import { getUDASessionName } from '../browser';
import { UDASessionData } from '../../models/UDASessionData';
import { apiClient } from '../../services';

/**
 * Binds the user account with UDASessionData.
 * @param {Object} userAuthData - User authentication data.
 * @param {Object} UDASessionData - UDA session data.
 * @param {boolean} renewToken - Flag indicating whether to renew the token.
 * @returns {Promise<void>} Promise that resolves when the binding is complete.
 */
export const UDABindAccount = async (
    userAuthData: any,
    UDASessionData: UDASessionData,
    renewToken: any,
) => {
    const globalConfig = (globalThis as any).UDAGlobalConfig || {};
    const payLoad = {
        uid: UDASessionData.authData.id,
        email: UDASessionData.authData.email,
        realm: globalConfig.realm,
        clientId: globalConfig.clientId,
        clientSecret: globalConfig.clientSecret,
    };
    const authTokenResponse: any = await apiClient.post(
        process.env.tokenUrl + ENDPOINT.tokenUrl,
        payLoad,
    );
    if (authTokenResponse && authTokenResponse?.data?.token) {
        UDASessionData.authData.token = authTokenResponse.data.token;
        const userSessionData: any = {
            userauthid: userAuthData.id,
            usersessionid: UDASessionData.sessionKey,
        };
        const response = await apiClient.post(
            ENDPOINT.CheckUserSession,
            userSessionData,
        );
        if (response && response.data) {
            await StorageUtil.add(UDASessionData, getUDASessionName());
            await UDASendSessionData(
                UDASessionData,
                'UDAAuthenticatedUserSessionData',
            );
        }
    }
};
