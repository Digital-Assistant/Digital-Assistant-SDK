/**
 * Fetches the top-level domain of the current window's host.
 * If `window.UDAGlobalConfig.enableForAllDomains` is true, it uses `parse-domain`
 * to extract the top-level domain; otherwise, it returns the full host.
 *
 * Note: This function only works in browser contexts with window.location.
 * Returns null in service worker or Node.js contexts.
 *
 * @returns The top-level domain, the full host, or null if not in browser context.
 */
export declare const fetchDomain: () => string | null;
//# sourceMappingURL=fetchDomain.d.ts.map