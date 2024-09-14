/**
 * @author Yureswar Ravuri
 */

import {getFromStore} from "../util";
import {CONFIG} from "../config";

/**
 * For getting user id from the storage
 */
/**
 * Gets the user's unique identifier from the application's storage.
 * @returns {Promise<string|null>} The user's ID, or null if it could not be retrieved.
 * @throws {Error} If an error occurs while retrieving the user's ID.
 */
export const getUserId = async (): Promise<string | null> => {
  try {
    const userSessionData = await getFromStore(CONFIG.USER_AUTH_DATA_KEY, false);

    if (!userSessionData) {
      console.warn('User session data not found in storage.');
      return null;
    }

    if (!userSessionData.authData) {
      console.warn('Auth data not found in user session data.');
      return null;
    }

    if (!userSessionData.authData.id) {
      console.warn('User ID not found in auth data.');
      return null;
    }

    return userSessionData.authData.id;
  } catch (error) {
    console.error('Error retrieving user ID:', error);
    throw new Error('Failed to retrieve user ID.');
  }
};


/**
 * For getting session id from the storage
 */
export const getSessionKey = async () => {
  let userSessionData = await getFromStore(CONFIG.USER_AUTH_DATA_KEY, false);
  if(userSessionData && userSessionData.sessionKey){
    return userSessionData.sessionKey;
  } else {
    return null;
  }
}
