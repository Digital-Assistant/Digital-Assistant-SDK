/**
 * Maps the selected element's system tag to a specific action during playback.
 * This function determines whether to display a tooltip, invoke a click, or focus on an element
 * based on the type of the recorded interactive element.
 *
 * @param node The live HTML element corresponding to the recorded node.
 * @param recordedNode The raw recorded node object.
 * @param navigationCookieData The navigation cookie data, if available.
 * @param recordedNodeData The parsed recorded node data, including metadata about the selected element.
 * @param timeToInvoke The delay (in milliseconds) before invoking the next node or action.
 * @returns `true` if an action was performed, `false` otherwise.
 */
export declare const mapSelectedElementAction: (node: any, recordedNode: any, navigationCookieData: any, recordedNodeData: any, timeToInvoke: any) => boolean;
//# sourceMappingURL=mapSelectedElementAction.d.ts.map