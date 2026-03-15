import { store } from '../../index';
import { setIsRecording } from '../../slices/recordingSlice';
import { setUserData } from '../../slices/userSlice';
import { StorageUtil } from '../../../util/storage';

jest.mock('../../../util/storage', () => ({
    StorageUtil: {
        setToStore: jest.fn(),
        getFromStore: jest.fn(),
    },
}));

describe('storageMiddleware', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        // Clear any calls made during store initialization
        (StorageUtil.setToStore as jest.Mock).mockClear();
        store.dispatch({ type: 'recording/resetRecordingState' });
        (StorageUtil.setToStore as jest.Mock).mockClear();
    });

    it('should save recording state when a recording/ action is dispatched', () => {
        store.dispatch(setIsRecording(true));
        expect(StorageUtil.setToStore).toHaveBeenCalled();
        const [savedState, key] = (StorageUtil.setToStore as jest.Mock).mock.calls[0];
        expect(key).toBe('UDAActiveRecordingDataRedux');
        expect(savedState).toMatchObject({ isRecording: true });
    });

    it('should NOT save recording state for non-recording actions', () => {
        store.dispatch(setUserData({ id: 'user-1' }));
        expect(StorageUtil.setToStore).not.toHaveBeenCalled();
    });

    it('should still update state after middleware runs', () => {
        store.dispatch(setIsRecording(true));
        expect(store.getState().recording.isRecording).toBe(true);
    });

    it('should log error and not throw if StorageUtil.setToStore throws', () => {
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        (StorageUtil.setToStore as jest.Mock).mockImplementationOnce(() => { throw new Error('storage fail'); });
        expect(() => store.dispatch(setIsRecording(false))).not.toThrow();
        expect(consoleSpy).toHaveBeenCalled();
        consoleSpy.mockRestore();
    });
});
