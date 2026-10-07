/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * @file Single source of truth for browser / extension / service-worker detection.
 *
 * Consumed by `StorageUtil`, `storageHelper` and `util/browser/browserConstants`.
 * Must not import from `config` or any storage module to avoid import cycles.
 */
import { detect } from 'detect-browser';

/** Browsers on which the extension storage APIs may be available. */
const EXTENSION_BROWSERS = [
    'chrome',
    'edge',
    'edge-chromium',
    'edge-ios',
    'firefox',
    'safari',
    'opera',
    'brave',
    'chromium-webview',
];

/**
 * Resolves the extension API namespace that exposes `storage`.
 * Priority: `browserAPI` global > `browser` (Firefox/Safari) > `chrome` (Chromium family).
 * Reads from `globalThis` so it works in pages, content scripts and service workers.
 */
export function getBrowserAPI(): any {
    const root: any = globalThis;
    if (root.browserAPI?.storage) return root.browserAPI;
    if (root.browser?.storage) return root.browser;
    if (root.chrome?.storage) return root.chrome;
    return null;
}

/** True when running without a `window` (e.g. an extension service worker). */
export function isServiceWorker(): boolean {
    return typeof window === 'undefined' && typeof self !== 'undefined';
}

/** True when the detected browser name is one that can host an extension. */
export function isExtensionBrowser(name?: string | null): boolean {
    const browserName = name?.toLowerCase();
    return (
        !!browserName &&
        EXTENSION_BROWSERS.some((known) => browserName.includes(known))
    );
}

const detectedBrowser: any = detect();
let enablePlugin = false;
let browserVar: any;

if (detectedBrowser?.name) {
    if (isExtensionBrowser(detectedBrowser.name)) {
        enablePlugin = true;
        browserVar = getBrowserAPI() || detectedBrowser;
    } else {
        browserVar = detectedBrowser;
    }
} else {
    browserVar = getBrowserAPI();
    if (browserVar) {
        enablePlugin = true;
    }
}

/** Single flag shared by `StorageUtil.UDABrowserPlugin` and `updateBrowserPlugin`. */
let UDABrowserPlugin = false;

export const updateBrowserPlugin = (plugin: boolean) => {
    UDABrowserPlugin = plugin;
};
export const getUDABrowserPlugin = () => UDABrowserPlugin;
export const getEnablePlugin = () => enablePlugin;
export const getBrowserVar = () => browserVar;
export const getBrowser = () => detectedBrowser;
