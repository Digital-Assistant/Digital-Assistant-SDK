import { CONFIG } from '../config/constants';
import { CustomConfig } from '../config/CustomConfig';
import { clearAuthToken, setAuthToken } from '../services/hostAuthToken';
import { DigitalAssistantConfiguration, DigitalAssistantCore } from '../index';

const mockInit = jest.fn().mockResolvedValue(false);

jest.mock('../services/AuthManager', () => ({
    ...jest.requireActual('../services/AuthManager'),
    authManager: { init: (...args: unknown[]) => mockInit(...args) },
}));

const flushImports = () => new Promise((resolve) => setTimeout(resolve, 20));

describe('DigitalAssistantCore keycloak check-sso', () => {
    const pristine = { ...CustomConfig };

    beforeEach(() => {
        mockInit.mockClear();
        Object.assign(CustomConfig, pristine, {
            keycloakUrl: 'https://auth.example.com/',
        });
        (globalThis as any).UDAGlobalConfig = CustomConfig;
        clearAuthToken();
    });

    afterAll(() => {
        Object.assign(CustomConfig, pristine);
    });

    const construct = async () => {
        new DigitalAssistantCore(new DigitalAssistantConfiguration(CONFIG));
        await flushImports();
    };

    it('does not run check-sso by default', async () => {
        await construct();
        expect(mockInit).not.toHaveBeenCalled();
    });

    it('runs check-sso when enableKeycloakSso is on and a Keycloak URL is set', async () => {
        CustomConfig.enableKeycloakSso = true;
        await construct();
        expect(mockInit).toHaveBeenCalledTimes(1);
    });

    it('does not run check-sso when enableKeycloakSso is on but no Keycloak URL resolves', async () => {
        CustomConfig.enableKeycloakSso = true;
        CustomConfig.keycloakUrl = '';
        await construct();
        expect(mockInit).not.toHaveBeenCalled();
    });

    it('does not run check-sso when the host provided a token', async () => {
        CustomConfig.enableKeycloakSso = true;
        setAuthToken({ token: 'host-token' });
        await construct();
        expect(mockInit).not.toHaveBeenCalled();
    });
});
