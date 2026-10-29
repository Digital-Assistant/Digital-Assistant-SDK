/**
 * Unit tests for UDABindAccount module
 */

import { UDABindAccount } from '../UDABindAccount';
import { UDASendSessionData } from '../UDASendSessionData';
import { ENDPOINT } from '../../../config';
import { StorageUtil } from '../../storage';
import { getUDASessionName } from '../../browser';
import { UDASessionData } from '../../../models/UDASessionData';
import { apiClient } from '../../../services';

// Mock dependencies
jest.mock('../UDASendSessionData');
jest.mock('../../storage', () => ({
    StorageUtil: {
        add: jest.fn(),
    },
}));
jest.mock('../../browser', () => ({
    getUDASessionName: jest.fn(() => 'uda-session'),
}));
jest.mock('../../../services', () => ({
    apiClient: {
        post: jest.fn(),
    },
}));

describe('UDABindAccount', () => {
    let mockUserAuthData: any;
    let mockUDASessionData: UDASessionData;

    beforeEach(() => {
        jest.clearAllMocks();

        // Mock global config
        (window as any).UDAGlobalConfig = {
            realm: 'test-realm',
            clientId: 'test-client-id',
            clientSecret: 'test-client-secret',
        };

        // Mock process.env
        (process as any).env = {
            tokenProdUrl: 'https://token.example.com',
        };

        mockUserAuthData = {
            id: 'user-auth-id-123',
        };

        mockUDASessionData = {
            sessionKey: 'session-key-456',
            authData: {
                id: 'auth-id-789',
                email: 'user@example.com',
                token: '',
            },
            authenticationSource: 'test-source',
        } as UDASessionData;
    });

    it.each(['realm', 'clientId'])(
        'should reject without calling the token service when %s is missing',
        async (key) => {
            (window as any).UDAGlobalConfig[key] = '';

            await expect(
                UDABindAccount(mockUserAuthData, mockUDASessionData, false),
            ).rejects.toThrow(`UDA is not configured: ${key}`);
            expect(apiClient.post).not.toHaveBeenCalled();
        },
    );

    it('should leave clientSecret out of the body when it is not configured', async () => {
        (window as any).UDAGlobalConfig.clientSecret = '';
        (apiClient.post as jest.Mock)
            .mockResolvedValueOnce({ data: { token: 'new-token' } })
            .mockResolvedValueOnce({ data: { success: true } });

        await UDABindAccount(mockUserAuthData, mockUDASessionData, false);

        const body = (apiClient.post as jest.Mock).mock.calls[0][1];
        expect(body).toEqual({
            uid: 'auth-id-789',
            email: 'user@example.com',
            realm: 'test-realm',
            clientId: 'test-client-id',
        });
        expect('clientSecret' in body).toBe(false);
    });

    it('should still send clientSecret when it is configured (deprecated)', async () => {
        const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
        (apiClient.post as jest.Mock).mockResolvedValue({ data: {} });

        await UDABindAccount(mockUserAuthData, mockUDASessionData, false);

        expect(
            (apiClient.post as jest.Mock).mock.calls[0][1].clientSecret,
        ).toBe('test-client-secret');
        warn.mockRestore();
    });

    it('should request a token with correct payload', async () => {
        (apiClient.post as jest.Mock)
            .mockResolvedValueOnce({ data: { token: 'new-token' } })
            .mockResolvedValueOnce({ data: { success: true } });

        await UDABindAccount(mockUserAuthData, mockUDASessionData, false);

        expect(apiClient.post).toHaveBeenCalledWith(
            'https://token.example.com' + ENDPOINT.tokenUrl,
            {
                uid: 'auth-id-789',
                email: 'user@example.com',
                realm: 'test-realm',
                clientId: 'test-client-id',
                clientSecret: 'test-client-secret',
            },
        );
    });

    it('should update UDASessionData with the received token', async () => {
        (apiClient.post as jest.Mock)
            .mockResolvedValueOnce({ data: { token: 'received-token' } })
            .mockResolvedValueOnce({ data: { success: true } });

        await UDABindAccount(mockUserAuthData, mockUDASessionData, false);

        expect(mockUDASessionData.authData.token).toBe('received-token');
    });

    it('should call CheckUserSession with correct user session data', async () => {
        (apiClient.post as jest.Mock)
            .mockResolvedValueOnce({ data: { token: 'token' } })
            .mockResolvedValueOnce({ data: { success: true } });

        await UDABindAccount(mockUserAuthData, mockUDASessionData, false);

        expect(apiClient.post).toHaveBeenCalledWith(ENDPOINT.CheckUserSession, {
            userauthid: 'user-auth-id-123',
            usersessionid: 'session-key-456',
        });
    });

    it('should store session data and send it when CheckUserSession succeeds', async () => {
        (apiClient.post as jest.Mock)
            .mockResolvedValueOnce({ data: { token: 'token' } })
            .mockResolvedValueOnce({ data: { success: true } });

        await UDABindAccount(mockUserAuthData, mockUDASessionData, false);

        expect(StorageUtil.add).toHaveBeenCalledWith(
            mockUDASessionData,
            'uda-session',
        );
        expect(UDASendSessionData).toHaveBeenCalledWith(
            mockUDASessionData,
            'UDAAuthenticatedUserSessionData',
        );
    });

    it('should not proceed if token request returns no token', async () => {
        (apiClient.post as jest.Mock).mockResolvedValueOnce({ data: {} });

        await UDABindAccount(mockUserAuthData, mockUDASessionData, false);

        expect(apiClient.post).toHaveBeenCalledTimes(1);
        expect(StorageUtil.add).not.toHaveBeenCalled();
        expect(UDASendSessionData).not.toHaveBeenCalled();
    });

    it('should not proceed if token request returns null', async () => {
        (apiClient.post as jest.Mock).mockResolvedValueOnce({ data: null });

        await UDABindAccount(mockUserAuthData, mockUDASessionData, false);

        expect(apiClient.post).toHaveBeenCalledTimes(1);
        expect(StorageUtil.add).not.toHaveBeenCalled();
    });

    it('should not store data if CheckUserSession fails', async () => {
        (apiClient.post as jest.Mock)
            .mockResolvedValueOnce({ data: { token: 'token' } })
            .mockResolvedValueOnce({ data: null });

        await UDABindAccount(mockUserAuthData, mockUDASessionData, false);

        expect(StorageUtil.add).not.toHaveBeenCalled();
        expect(UDASendSessionData).not.toHaveBeenCalled();
    });

    it('should use getUDASessionName for storage key', async () => {
        (apiClient.post as jest.Mock)
            .mockResolvedValueOnce({ data: { token: 'token' } })
            .mockResolvedValueOnce({ data: { success: true } });
        (getUDASessionName as jest.Mock).mockReturnValue('custom-session-name');

        await UDABindAccount(mockUserAuthData, mockUDASessionData, false);

        expect(StorageUtil.add).toHaveBeenCalledWith(
            mockUDASessionData,
            'custom-session-name',
        );
    });

    it('should use the TEST token URL when the environment is TEST', async () => {
        (process as any).env = {
            tokenProdUrl: 'https://token.example.com',
            tokenTestUrl: 'https://token-test.example.com',
        };
        (window as any).UDAGlobalConfig.environment = 'TEST';
        (apiClient.post as jest.Mock)
            .mockResolvedValueOnce({ data: { token: 'token' } })
            .mockResolvedValueOnce({ data: { success: true } });

        await UDABindAccount(mockUserAuthData, mockUDASessionData, false);

        expect(apiClient.post).toHaveBeenNthCalledWith(
            1,
            'https://token-test.example.com' + ENDPOINT.tokenUrl,
            expect.any(Object),
        );
    });

    it('should prefer an explicit tokenUrl from the page config', async () => {
        (window as any).UDAGlobalConfig.tokenUrl =
            'https://page-token.example.com';
        (apiClient.post as jest.Mock)
            .mockResolvedValueOnce({ data: { token: 'token' } })
            .mockResolvedValueOnce({ data: { success: true } });

        await UDABindAccount(mockUserAuthData, mockUDASessionData, false);

        expect(apiClient.post).toHaveBeenNthCalledWith(
            1,
            'https://page-token.example.com' + ENDPOINT.tokenUrl,
            expect.any(Object),
        );
    });

    it('should handle API errors gracefully', async () => {
        (apiClient.post as jest.Mock).mockRejectedValue(new Error('API Error'));

        await expect(
            UDABindAccount(mockUserAuthData, mockUDASessionData, false),
        ).rejects.toThrow('API Error');
    });
});
