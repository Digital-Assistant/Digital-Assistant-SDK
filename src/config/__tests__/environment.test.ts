import {
    getBuildDefaults,
    getRuntimeConfig,
    getMissingAuthConfig,
    hasClientSecret,
    isKeycloakSsoEnabled,
    REQUIRED_AUTH_KEYS,
    warnClientSecretDeprecated,
    resolveApiBaseUrl,
    resolveEnvironment,
    resolveKeycloakUrl,
    resolveLlmUrl,
    resolveRuntimeEnvironment,
    resolveTokenUrl,
} from '../environment';
import { AppConfig } from '../AppConfig';
import { CustomConfig } from '../CustomConfig';
import { CONFIG } from '../constants';

const BUILD_ENV = {
    baseProdURL: 'https://prod.example.com/api',
    baseTestURL: 'https://test.example.com/api',
    tokenProdUrl: 'https://token.prod.example.com/',
    tokenTestUrl: 'https://token.test.example.com/',
    llmProdUrl: 'https://llm.prod.example.com/',
    llmTestUrl: 'https://llm.test.example.com/',
    keycloakProdUrl: 'https://auth.prod.example.com/',
    keycloakTestUrl: 'https://auth.test.example.com/',
};

describe('runtime environment resolver', () => {
    const originalEnv = process.env;
    const originalGlobalConfig = (globalThis as any).UDAGlobalConfig;
    const pristine = { ...CustomConfig };
    let warnSpy: jest.SpyInstance;

    beforeEach(() => {
        process.env = { ...originalEnv, ...BUILD_ENV };
        Object.assign(CustomConfig, pristine);
        (globalThis as any).UDAGlobalConfig = CustomConfig;
        warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    });

    afterEach(() => {
        process.env = originalEnv;
        Object.assign(CustomConfig, pristine);
        (globalThis as any).UDAGlobalConfig = originalGlobalConfig;
        warnSpy.mockRestore();
    });

    it('defaults to PROD and the PROD URLs', () => {
        expect(CustomConfig.environment).toBe('PROD');
        expect(resolveRuntimeEnvironment()).toEqual({
            environment: 'PROD',
            apiBaseUrl: BUILD_ENV.baseProdURL,
            tokenUrl: BUILD_ENV.tokenProdUrl,
            llmUrl: BUILD_ENV.llmProdUrl,
            keycloakUrl: BUILD_ENV.keycloakProdUrl,
        });
    });

    it('defaults to PROD when environment is unset', () => {
        (globalThis as any).UDAGlobalConfig = {};
        expect(resolveEnvironment()).toBe('PROD');
        expect(resolveApiBaseUrl()).toBe(BUILD_ENV.baseProdURL);
        expect(warnSpy).not.toHaveBeenCalled();
    });

    it('token, LLM and Keycloak URLs follow the environment', () => {
        AppConfig({ environment: 'TEST' } as any);

        expect(resolveApiBaseUrl()).toBe(BUILD_ENV.baseTestURL);
        expect(resolveTokenUrl()).toBe(BUILD_ENV.tokenTestUrl);
        expect(resolveLlmUrl()).toBe(BUILD_ENV.llmTestUrl);
        expect(resolveKeycloakUrl()).toBe(BUILD_ENV.keycloakTestUrl);

        AppConfig({ environment: 'PROD' } as any);
        expect(resolveTokenUrl()).toBe(BUILD_ENV.tokenProdUrl);
        expect(resolveLlmUrl()).toBe(BUILD_ENV.llmProdUrl);
        expect(resolveKeycloakUrl()).toBe(BUILD_ENV.keycloakProdUrl);
    });

    it('accepts a lower-case environment', () => {
        AppConfig({ environment: 'test' } as any);
        expect(resolveEnvironment()).toBe('TEST');
        expect(warnSpy).not.toHaveBeenCalled();
    });

    it('explicit page URLs beat the environment', () => {
        AppConfig({
            environment: 'TEST',
            apiBaseUrl: 'https://custom.example.com/api',
            tokenUrl: 'https://custom-token.example.com/',
            llmUrl: 'https://custom-llm.example.com/',
            keycloakUrl: 'https://custom-auth.example.com/',
        } as any);

        expect(resolveRuntimeEnvironment()).toEqual({
            environment: 'TEST',
            apiBaseUrl: 'https://custom.example.com/api',
            tokenUrl: 'https://custom-token.example.com/',
            llmUrl: 'https://custom-llm.example.com/',
            keycloakUrl: 'https://custom-auth.example.com/',
        });
    });

    it('an empty page URL falls back to the build default', () => {
        AppConfig({ environment: 'TEST', apiBaseUrl: '' } as any);
        expect(resolveApiBaseUrl()).toBe(BUILD_ENV.baseTestURL);
    });

    it('an unknown environment warns and falls back to PROD', () => {
        AppConfig({ environment: 'STAGING' } as any);

        expect(resolveEnvironment()).toBe('PROD');
        expect(resolveApiBaseUrl()).toBe(BUILD_ENV.baseProdURL);
        expect(warnSpy).toHaveBeenCalledWith(
            expect.stringContaining('Unknown environment "STAGING"'),
        );
    });

    it('a wrong type warns and leaves the value unchanged', () => {
        AppConfig({ environment: 'TEST' } as any);
        AppConfig({ environment: 1, apiBaseUrl: 42 } as any);

        expect(warnSpy).toHaveBeenCalledWith(
            expect.stringContaining('Type mismatch for property "environment"'),
        );
        expect(warnSpy).toHaveBeenCalledWith(
            expect.stringContaining('Type mismatch for property "apiBaseUrl"'),
        );
        expect(CustomConfig.environment).toBe('TEST');
        expect(CustomConfig.apiBaseUrl).toBe('');
        expect(resolveApiBaseUrl()).toBe(BUILD_ENV.baseTestURL);
    });

    it('reads the config from globalThis at call time', () => {
        const replacement = { environment: 'TEST' };
        (globalThis as any).UDAGlobalConfig = replacement;

        expect(getRuntimeConfig()).toBe(replacement);
        expect(resolveApiBaseUrl()).toBe(BUILD_ENV.baseTestURL);
    });

    it('falls back to CustomConfig when no global config exists', () => {
        delete (globalThis as any).UDAGlobalConfig;
        CustomConfig.environment = 'TEST';

        expect(getRuntimeConfig()).toBe(CustomConfig);
        expect(resolveApiBaseUrl()).toBe(BUILD_ENV.baseTestURL);
    });

    it('returns empty strings when the build has no URL defaults', () => {
        process.env = { ...originalEnv };
        for (const key of Object.keys(BUILD_ENV)) delete process.env[key];

        expect(getBuildDefaults()).toEqual({
            PROD: { apiBaseUrl: '', tokenUrl: '', llmUrl: '', keycloakUrl: '' },
            TEST: { apiBaseUrl: '', tokenUrl: '', llmUrl: '', keycloakUrl: '' },
        });
    });

    it('does not default clientSecret from the build', () => {
        expect(CustomConfig.clientSecret).toBe('');
    });

    describe('legacy CONFIG aliases', () => {
        it('CONFIG.current and CONFIG.Environment report the resolved environment', () => {
            expect(CONFIG.current).toBe('PROD');
            AppConfig({ environment: 'TEST' } as any);
            expect(CONFIG.current).toBe('TEST');
            expect(CONFIG.Environment).toBe('TEST');
        });

        it('setting CONFIG.Environment switches the page config', () => {
            CONFIG.Environment = 'test';
            expect(CustomConfig.environment).toBe('TEST');
            expect(CONFIG.UDA_API_URL).toBe(BUILD_ENV.baseTestURL);
            expect(CONFIG.UDA_DOMAIN).toBe('https://test.example.com');
        });

        it('CONFIG.UDA_API_URL follows the environment', () => {
            expect(CONFIG.UDA_API_URL).toBe(BUILD_ENV.baseProdURL);
            expect(CONFIG.UDA_DOMAIN).toBe('https://prod.example.com');
        });
    });
});

describe('auth configuration', () => {
    it('requires only realm and clientId', () => {
        expect([...REQUIRED_AUTH_KEYS]).toEqual(['realm', 'clientId']);
        expect(getMissingAuthConfig({})).toEqual(['realm', 'clientId']);
        expect(getMissingAuthConfig({ realm: 'r', clientId: 'c' })).toEqual([]);
    });

    it('treats a blank clientSecret as not configured', () => {
        expect(hasClientSecret({ clientSecret: '  ' })).toBe(false);
        expect(hasClientSecret({})).toBe(false);
        expect(hasClientSecret({ clientSecret: 's' })).toBe(true);
    });

    it('warns about the deprecated clientSecret only once', () => {
        const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
        warnClientSecretDeprecated();
        warnClientSecretDeprecated();
        const hits = warn.mock.calls.filter((call) =>
            String(call[0]).includes('clientSecret is deprecated'),
        );
        expect(hits).toHaveLength(1);
        warn.mockRestore();
    });

    it('enables check-sso only on opt-in with a Keycloak URL', () => {
        const url = 'https://auth.example.com/';
        expect(isKeycloakSsoEnabled({ keycloakUrl: url })).toBe(false);
        expect(
            isKeycloakSsoEnabled({ enableKeycloakSso: true, keycloakUrl: url }),
        ).toBe(true);
    });
});
