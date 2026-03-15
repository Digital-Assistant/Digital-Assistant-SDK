import { loadFromStorage, saveToStorage, removeFromStorage } from '../storageHelper';

const localStorageMock = (() => {
    let store: Record<string, string> = {};
    return {
        getItem: jest.fn((key: string) => store[key] ?? null),
        setItem: jest.fn((key: string, value: string) => { store[key] = value; }),
        removeItem: jest.fn((key: string) => { delete store[key]; }),
        clear: jest.fn(() => { store = {}; }),
    };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('storageHelper', () => {
    beforeEach(() => {
        localStorageMock.clear();
        jest.clearAllMocks();
    });

    describe('loadFromStorage', () => {
        it('should return defaultValue when key does not exist', () => {
            const result = loadFromStorage('missing-key', { foo: 'bar' });
            expect(result).toEqual({ foo: 'bar' });
        });

        it('should return parsed value when key exists', () => {
            localStorageMock.setItem('myKey', JSON.stringify({ count: 42 }));
            const result = loadFromStorage('myKey', { count: 0 });
            expect(result).toEqual({ count: 42 });
        });

        it('should return defaultValue and log error on JSON parse failure', () => {
            const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
            localStorageMock.getItem.mockReturnValueOnce('invalid-json{{{');
            const result = loadFromStorage('badKey', 'default');
            expect(result).toBe('default');
            expect(consoleSpy).toHaveBeenCalled();
            consoleSpy.mockRestore();
        });

        it('should return defaultValue and log error when localStorage throws', () => {
            const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
            localStorageMock.getItem.mockImplementationOnce(() => { throw new Error('storage error'); });
            const result = loadFromStorage('errorKey', 99);
            expect(result).toBe(99);
            expect(consoleSpy).toHaveBeenCalled();
            consoleSpy.mockRestore();
        });
    });

    describe('saveToStorage', () => {
        it('should save serialized value to localStorage', () => {
            saveToStorage('testKey', { value: 'hello' });
            expect(localStorageMock.setItem).toHaveBeenCalledWith('testKey', JSON.stringify({ value: 'hello' }));
        });

        it('should log error when localStorage.setItem throws', () => {
            const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
            localStorageMock.setItem.mockImplementationOnce(() => { throw new Error('write error'); });
            saveToStorage('failKey', { x: 1 });
            expect(consoleSpy).toHaveBeenCalled();
            consoleSpy.mockRestore();
        });
    });

    describe('removeFromStorage', () => {
        it('should remove key from localStorage', () => {
            localStorageMock.setItem('removeMe', 'value');
            removeFromStorage('removeMe');
            expect(localStorageMock.removeItem).toHaveBeenCalledWith('removeMe');
        });

        it('should log error when localStorage.removeItem throws', () => {
            const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
            localStorageMock.removeItem.mockImplementationOnce(() => { throw new Error('remove error'); });
            removeFromStorage('failKey');
            expect(consoleSpy).toHaveBeenCalled();
            consoleSpy.mockRestore();
        });
    });
});
