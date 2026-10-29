/**
 * Host-provided access token.
 *
 * An embedding host (the browser extension's background worker) can run its own
 * sign-in and hand the resulting token to the SDK. The request interceptor in
 * `apiClient` uses it before any token held in the Redux store. The host renews
 * the token either by calling `setAuthToken` again before `expiresAt`, or by
 * registering a renewer with `setAuthTokenRenewer`.
 *
 * Module state (not the Redux store): the token is never persisted by the SDK.
 */

export interface HostAuthToken {
    token: string;
    /** Expiry as epoch milliseconds. Omit only if the host clears the token itself. */
    expiresAt?: number;
    authsource?: string;
    /** Keycloak subject of the signed-in user. */
    sub?: string;
}

export type HostAuthTokenRenewer = () => Promise<
    HostAuthToken | null | undefined
>;

/** A token this close to `expiresAt` (ms) counts as expired, so a renewal happens first. */
export const HOST_TOKEN_EXPIRY_SKEW_MS = 10_000;

let current: HostAuthToken | null = null;
let renewer: HostAuthTokenRenewer | null = null;
let renewing: Promise<void> | null = null;
let warnedExpired = false;

const isExpired = (value: HostAuthToken): boolean =>
    typeof value.expiresAt === 'number' &&
    value.expiresAt - HOST_TOKEN_EXPIRY_SKEW_MS <= Date.now();

export const setAuthToken = (value: HostAuthToken): void => {
    if (
        !value ||
        typeof value.token !== 'string' ||
        value.token.trim() === ''
    ) {
        throw new TypeError('setAuthToken: a non-empty token is required');
    }
    if (value.expiresAt !== undefined && !Number.isFinite(value.expiresAt)) {
        throw new TypeError(
            'setAuthToken: expiresAt must be epoch milliseconds',
        );
    }
    current = { ...value, token: value.token.trim() };
    warnedExpired = false;
};

/** Forgets the token and the renewer. */
export const clearAuthToken = (): void => {
    current = null;
    renewer = null;
    renewing = null;
    warnedExpired = false;
};

/**
 * Registers a function the SDK calls when a request finds the token expired (or
 * about to). It returns the new token, or null/undefined if the host is signed out.
 */
export const setAuthTokenRenewer = (
    fn: HostAuthTokenRenewer | null | undefined,
): void => {
    renewer = fn ?? null;
};

/** The stored token as given, expired or not; null if none. */
export const getAuthToken = (): HostAuthToken | null =>
    current ? { ...current } : null;

/**
 * The bearer to send: the host token if it is valid, renewing it first when it
 * is expired and a renewer is registered. Null when there is no usable token, so
 * the caller falls back to the tokens in the store.
 */
export const resolveHostBearer = async (): Promise<string | null> => {
    if (!current) return null;
    if (isExpired(current) && renewer) {
        if (!renewing) {
            const run = renewer;
            renewing = (async () => {
                try {
                    const next = await run();
                    if (next) {
                        setAuthToken(next);
                    } else {
                        current = null;
                    }
                } catch (error) {
                    console.error(
                        'UDA: host token renewal failed',
                        (error as Error)?.message,
                    );
                } finally {
                    renewing = null;
                }
            })();
        }
        await renewing;
    }
    if (!current) return null;
    if (isExpired(current)) {
        if (!warnedExpired) {
            warnedExpired = true;
            console.warn(
                'UDA: the host token is expired and was not renewed; it is not sent.',
            );
        }
        return null;
    }
    return current.token;
};
