import { recordUserClickData, userClick } from '../trackingService';
import { apiClient } from '../apiClient';
import { getUserId } from '../userService';

jest.mock('../apiClient', () => ({
    apiClient: { put: jest.fn() },
}));

jest.mock('../userService', () => ({
    getUserId: jest.fn(),
    getSessionKey: jest.fn(),
    getUserSessionId: jest.fn(),
}));

describe('trackingService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('recordUserClickData', () => {
        it('should call apiClient.put with correct payload and return data', async () => {
            (getUserId as jest.Mock).mockResolvedValue('user-123');
            (apiClient.put as jest.Mock).mockResolvedValue({ data: { success: true } });

            const result = await recordUserClickData('sequencerecord', 'Submit', 42);

            expect(apiClient.put).toHaveBeenCalledWith(
                expect.stringContaining('userclick'),
                expect.objectContaining({
                    usersessionid: 'user-123',
                    clickedname: 'Submit',
                    clicktype: 'sequencerecord',
                    recordid: 42,
                })
            );
            expect(result).toEqual({ success: true });
        });

        it('should use default parameter values', async () => {
            (getUserId as jest.Mock).mockResolvedValue(null);
            (apiClient.put as jest.Mock).mockResolvedValue({ data: {} });

            await recordUserClickData();

            expect(apiClient.put).toHaveBeenCalledWith(
                expect.any(String),
                expect.objectContaining({
                    clicktype: 'sequencerecord',
                    clickedname: '',
                    recordid: 0,
                })
            );
        });

        it('should log error and rethrow when apiClient.put fails', async () => {
            (getUserId as jest.Mock).mockResolvedValue('user-1');
            (apiClient.put as jest.Mock).mockRejectedValue(new Error('network error'));
            const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

            await expect(recordUserClickData()).rejects.toThrow('network error');
            expect(consoleSpy).toHaveBeenCalled();
            consoleSpy.mockRestore();
        });
    });

    describe('userClick', () => {
        it('should call apiClient.put with the given payload and return data', async () => {
            const payload = { usersessionid: 'abc', clicktype: 'test' };
            (apiClient.put as jest.Mock).mockResolvedValue({ data: { ok: true } });

            const result = await userClick(payload);

            expect(apiClient.put).toHaveBeenCalledWith(expect.stringContaining('userclick'), payload);
            expect(result).toEqual({ ok: true });
        });

        it('should log error and rethrow when apiClient.put fails', async () => {
            (apiClient.put as jest.Mock).mockRejectedValue(new Error('fail'));
            const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

            await expect(userClick({})).rejects.toThrow('fail');
            expect(consoleSpy).toHaveBeenCalled();
            consoleSpy.mockRestore();
        });
    });
});
