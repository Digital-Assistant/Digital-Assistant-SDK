/**
 * @jest-environment node
 */
// Simulates the extension's background service worker: no `window`, the SDK
// config lives on globalThis.
import MockAdapter from 'axios-mock-adapter';
import { ApiClient } from '../apiClient';
import { AppConfig } from '../../config/AppConfig';
import { CustomConfig } from '../../config/CustomConfig';
import {
    resolveKeycloakUrl,
    resolveLlmUrl,
    resolveTokenUrl,
} from '../../config/environment';

describe('ApiClient without window (background worker)', () => {
    const originalEnv = process.env;

    beforeEach(() => {
        process.env = {
            ...originalEnv,
            baseProdURL: 'https://prod.example.com/api',
            baseTestURL: 'https://test.example.com/api',
            tokenTestUrl: 'https://token.test.example.com/',
            llmTestUrl: 'https://llm.test.example.com/',
            keycloakTestUrl: 'https://auth.test.example.com/',
        };
        (globalThis as any).UDAGlobalConfig = CustomConfig;
    });

    afterEach(() => {
        process.env = originalEnv;
        delete (globalThis as any).UDAGlobalConfig;
    });

    it('has no window', () => {
        expect(typeof window).toBe('undefined');
    });

    it('resolves the environment, URLs and realm header from globalThis', async () => {
        const client = new ApiClient();
        const adapter = new MockAdapter(client.getAxiosInstance());
        adapter
            .onAny()
            .reply((cfg: any) => [
                200,
                { baseURL: cfg.baseURL, realm: cfg.headers['UDAN-Realm'] },
            ]);

        expect((await client.get('/user/getsessionkey')).data.baseURL).toBe(
            'https://prod.example.com/api',
        );

        AppConfig({ environment: 'TEST', realm: 'customer-realm' } as any);

        const response = await client.get('/user/getsessionkey');
        expect(response.data).toEqual({
            baseURL: 'https://test.example.com/api',
            realm: 'customer-realm',
        });
        expect(resolveTokenUrl()).toBe('https://token.test.example.com/');
        expect(resolveLlmUrl()).toBe('https://llm.test.example.com/');
        expect(resolveKeycloakUrl()).toBe('https://auth.test.example.com/');
    });
});
