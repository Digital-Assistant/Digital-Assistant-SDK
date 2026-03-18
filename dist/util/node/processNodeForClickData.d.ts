/**
 * Processes a DOM node to generate a serializable JSON object for click data recording.
 * This function clones the provided node to avoid modifying the original DOM and then
 * converts the clone into a JSON representation.
 *
 * Note: Uses dynamic import to avoid loading domjson in service worker contexts.
 *
 * @param node The DOM node to process.
 * @returns A promise that resolves to the JSON object representation of the node.
 */
export declare const processNodeForClickData: (node: any) => Promise<any>;
//# sourceMappingURL=processNodeForClickData.d.ts.map