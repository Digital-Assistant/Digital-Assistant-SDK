/**
 * Matches the action of a recorded node to a live DOM element and performs the corresponding action.
 * This function handles various element types and their specific interactions during playback,
 * such as displaying tooltips, clicking, or focusing elements. It determines the correct action
 * based on the node's tag, type, and CSS classes.
 *
 * @param node The live DOM element that matches the recorded node. This is the element on the current page to interact with.
 * @param selectedNode The recorded node object from the stored navigation sequence, containing its original data and metadata.
 * @param toolTipVisibleTIme The time (in seconds) for which the instructional tooltip should be visible before proceeding. Defaults to 1 second.
 */
export declare const matchAction: (node: any, selectedNode: any, selectedRecordingDetails: any) => void;
//# sourceMappingURL=matchAction.d.ts.map