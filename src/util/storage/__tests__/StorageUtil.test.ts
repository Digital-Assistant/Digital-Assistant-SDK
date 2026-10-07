import { StorageUtil } from '../StorageUtil';

describe('StorageUtil', () => {
    beforeEach(async () => {
        await StorageUtil.clear();
    });

    it('should be defined', () => {
        expect(StorageUtil).toBeDefined();
    });

    it('should set and get an item', async () => {
        await StorageUtil.add('testValue', 'testKey', false); // Pass false for convertToString
        expect(await StorageUtil.get('testKey', false)).toBe('testValue');
    });

    it('should return null for a non-existent item', async () => {
        expect(await StorageUtil.get('nonExistentKey')).toBeNull();
    });

    it('should remove an item', async () => {
        await StorageUtil.add('testValue', 'testKey', false); // Pass false for convertToString
        await StorageUtil.remove('testKey');
        expect(await StorageUtil.get('testKey')).toBeNull();
    });

    it('should clear all items', async () => {
        await StorageUtil.add('testValue1', 'testKey1', false); // Pass false for convertToString
        await StorageUtil.add('testValue2', 'testKey2', false); // Pass false for convertToString
        await StorageUtil.clear();
        expect(await StorageUtil.get('testKey1')).toBeNull();
        expect(await StorageUtil.get('testKey2')).toBeNull();
    });

    it('should handle setting and getting complex objects', async () => {
        const testObject = { a: 1, b: { c: 'test' } };
        await StorageUtil.add(testObject, 'complexKey');
        const retrievedObject = await StorageUtil.get('complexKey');
        expect(retrievedObject).toEqual(testObject);
    });
});

describe('StorageUtil extension storage routing', () => {
    const root: any = globalThis;
    let local: any;

    beforeEach(() => {
        local = {
            set: jest.fn().mockResolvedValue(undefined),
            get: jest.fn().mockResolvedValue({}),
            remove: jest.fn().mockResolvedValue(undefined),
            clear: jest.fn().mockResolvedValue(undefined),
        };
        root.chrome = { storage: { local } };
    });

    afterEach(() => {
        delete root.chrome;
        StorageUtil.UDABrowserPlugin = false;
    });

    it('shares the plugin flag with updateBrowserPlugin', () => {
        const { updateBrowserPlugin, getUDABrowserPlugin } =
            jest.requireActual('../detect');
        StorageUtil.UDABrowserPlugin = true;
        expect(getUDABrowserPlugin()).toBe(true);
        updateBrowserPlugin(false);
        expect(StorageUtil.UDABrowserPlugin).toBe(false);
    });

    it('uses localStorage when the plugin flag is off and not a service worker', async () => {
        await StorageUtil.add('v', 'k', false);
        expect(local.set).not.toHaveBeenCalled();
        expect(window.localStorage.getItem('k')).toBe('v');
        await StorageUtil.clear();
    });

    it('getFromStore returns parsed localStorage data', () => {
        StorageUtil.setToStore({ a: 1 }, 'sync', false);
        expect(StorageUtil.getFromStore('sync', false)).toEqual({ a: 1 });
        expect(StorageUtil.getFromStore('sync', true)).toBe('{"a":1}');
        window.localStorage.clear();
    });
});
