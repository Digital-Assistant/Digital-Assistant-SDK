import { CustomConfig } from './CustomConfig';

export type SdkEnvironment = 'TEST' | 'PROD';

export const SDK_ENVIRONMENTS: readonly SdkEnvironment[] = ['TEST', 'PROD'];

export const DEFAULT_ENVIRONMENT: SdkEnvironment = 'PROD';

export type RuntimeUrlKey =
    | 'apiBaseUrl'
    | 'tokenUrl'
    | 'llmUrl'
    | 'keycloakUrl';

export type RuntimeUrls = Record<RuntimeUrlKey, string>;

export type RuntimeConfig = Record<string, unknown>;

export interface ResolvedEnvironment extends RuntimeUrls {
    environment: SdkEnvironment;
}

/**
 * Build-time URL defaults per environment. The `process.env.*` members must stay
 * literal so dotenv-webpack can inline them; they are read on every call so tests
 * can change them.
 */
export const getBuildDefaults = (): Record<SdkEnvironment, RuntimeUrls> => ({
    PROD: {
        apiBaseUrl: process.env.baseProdURL || '',
        tokenUrl: process.env.tokenProdUrl || '',
        llmUrl: process.env.llmProdUrl || '',
        keycloakUrl: process.env.keycloakProdUrl || '',
    },
    TEST: {
        apiBaseUrl: process.env.baseTestURL || '',
        tokenUrl: process.env.tokenTestUrl || '',
        llmUrl: process.env.llmTestUrl || '',
        keycloakUrl: process.env.keycloakTestUrl || '',
    },
});

/**
 * The live page configuration. `globalThis` (not `window`) so the extension's
 * background service worker, which has no `window`, sees the same object.
 */
export const getRuntimeConfig = (): RuntimeConfig => {
    const globalConfig = (globalThis as { UDAGlobalConfig?: unknown })
        .UDAGlobalConfig;
    return globalConfig && typeof globalConfig === 'object'
        ? (globalConfig as RuntimeConfig)
        : (CustomConfig as unknown as RuntimeConfig);
};

const warnedEnvironments = new Set<string>();

export const resolveEnvironment = (
    config: RuntimeConfig = getRuntimeConfig(),
): SdkEnvironment => {
    const raw = config?.environment;
    if (raw === undefined || raw === null || raw === '') {
        return DEFAULT_ENVIRONMENT;
    }
    const normalized = String(raw).trim().toUpperCase();
    if ((SDK_ENVIRONMENTS as readonly string[]).includes(normalized)) {
        return normalized as SdkEnvironment;
    }
    if (!warnedEnvironments.has(String(raw))) {
        warnedEnvironments.add(String(raw));
        console.warn(
            `Unknown environment "${String(raw)}". Expected one of ${SDK_ENVIRONMENTS.join(', ')}. Falling back to ${DEFAULT_ENVIRONMENT}.`,
        );
    }
    return DEFAULT_ENVIRONMENT;
};

/**
 * An explicit page key wins; otherwise the build default for the environment.
 */
export const resolveUrl = (
    key: RuntimeUrlKey,
    config: RuntimeConfig = getRuntimeConfig(),
): string => {
    const explicit = config?.[key];
    if (typeof explicit === 'string' && explicit.trim() !== '') {
        return explicit.trim();
    }
    return getBuildDefaults()[resolveEnvironment(config)][key];
};

export const resolveApiBaseUrl = (config?: RuntimeConfig): string =>
    resolveUrl('apiBaseUrl', config);

export const resolveTokenUrl = (config?: RuntimeConfig): string =>
    resolveUrl('tokenUrl', config);

export const resolveLlmUrl = (config?: RuntimeConfig): string =>
    resolveUrl('llmUrl', config);

export const resolveKeycloakUrl = (config?: RuntimeConfig): string =>
    resolveUrl('keycloakUrl', config);

export const resolveRuntimeEnvironment = (
    config: RuntimeConfig = getRuntimeConfig(),
): ResolvedEnvironment => ({
    environment: resolveEnvironment(config),
    apiBaseUrl: resolveApiBaseUrl(config),
    tokenUrl: resolveTokenUrl(config),
    llmUrl: resolveLlmUrl(config),
    keycloakUrl: resolveKeycloakUrl(config),
});

/**
 * Authentication settings every call needs. There is no default realm, client id or
 * client secret: the page (customer script) or the extension must set them.
 */
export const REQUIRED_AUTH_KEYS = [
    'realm',
    'clientId',
    'clientSecret',
] as const;

export class UDAConfigurationError extends Error {
    readonly missing: string[];
    constructor(missing: string[]) {
        super(
            `UDA is not configured: ${missing.join(', ')} required (no default is used).`,
        );
        this.name = 'UDAConfigurationError';
        this.missing = missing;
    }
}

export const getMissingAuthConfig = (
    config: RuntimeConfig = getRuntimeConfig(),
): string[] =>
    REQUIRED_AUTH_KEYS.filter((key) => {
        const value = config?.[key];
        return typeof value !== 'string' || value.trim() === '';
    });

/** Throws UDAConfigurationError when realm, clientId or clientSecret is missing or empty. */
export const assertAuthConfig = (
    config: RuntimeConfig = getRuntimeConfig(),
): void => {
    const missing = getMissingAuthConfig(config);
    if (missing.length > 0) {
        throw new UDAConfigurationError(missing);
    }
};
