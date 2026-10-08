import {
    getBrowserAPI,
    isServiceWorker,
    isExtensionBrowser,
    updateBrowserPlugin,
    getUDABrowserPlugin,
} from '../detect';

describe('detect', () => {
    const root: any = globalThis;

    afterEach(() => {
        delete root.browserAPI;
        delete root.browser;
        delete root.chrome;
    });

    describe('getBrowserAPI', () => {
        it('returns null when no extension API exposes storage', () => {
            expect(getBrowserAPI()).toBeNull();
        });

        it('ignores namespaces without a storage property', () => {
            root.chrome = {};
            expect(getBrowserAPI()).toBeNull();
        });

        it('returns chrome when only chrome.storage exists', () => {
            root.chrome = { storage: {} };
            expect(getBrowserAPI()).toBe(root.chrome);
        });

        it('prefers browser over chrome', () => {
            root.chrome = { storage: {} };
            root.browser = { storage: {} };
            expect(getBrowserAPI()).toBe(root.browser);
        });

        it('prefers the browserAPI global over browser and chrome', () => {
            root.chrome = { storage: {} };
            root.browser = { storage: {} };
            root.browserAPI = { storage: {} };
            expect(getBrowserAPI()).toBe(root.browserAPI);
        });
    });

    describe('isServiceWorker', () => {
        it('is false when a window exists (jsdom)', () => {
            expect(isServiceWorker()).toBe(false);
        });
    });

    describe('isExtensionBrowser', () => {
        it.each(['Chrome', 'firefox', 'edge-chromium', 'Brave', 'safari'])(
            'accepts %s',
            (name) => {
                expect(isExtensionBrowser(name)).toBe(true);
            },
        );

        it.each(['ie', 'bot', '', null, undefined])('rejects %p', (name) => {
            expect(isExtensionBrowser(name as any)).toBe(false);
        });
    });

    describe('plugin flag', () => {
        it('round-trips through update/get', () => {
            updateBrowserPlugin(true);
            expect(getUDABrowserPlugin()).toBe(true);
            updateBrowserPlugin(false);
            expect(getUDABrowserPlugin()).toBe(false);
        });
    });
});
