/**
 * Legacy logic for searching for a recorded DOM element among a list of candidate elements.
 * This function attempts to find the best match for a `recordedNode` within `compareElements`.
 *
 * Note: Uses dynamic import to avoid loading domjson in service worker contexts.
 * Changed to async to support dynamic imports.
 *
 * @param recordedNode The node object from a recording, containing metadata and object data.
 * @param compareElements An array of candidate elements to compare against the recorded node.
 * @returns A promise that resolves to the DOM element that is considered the best match, or `null` if no suitable match is found.
 */
export declare const searchNodes: (recordedNode: any, compareElements: any) => Promise<any>;
//# sourceMappingURL=searchNodes.d.ts.map