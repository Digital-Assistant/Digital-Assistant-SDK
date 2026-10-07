/**
 * Retrieves the currently selected recording details from storage.
 *
 * @returns A promise that resolves to the selected recording object.
 */
export declare const getSelectedRecordFromStore: () => Promise<any>;
/**
 * Updates the status of a specific node in the selected recording to "completed" and saves it back to storage.
 *
 * @param index The index of the node within the `userclicknodesSet` array to update.
 */
export declare const updateRecordToStore: (index: any) => Promise<void>;
/**
 * Plays the next clicked node from the sequence detail after a short delay.
 * It first removes any active tooltips and then triggers a 'ContinuePlay' event.
 */
export declare const playNextNode: () => void;
/**
 * Matches a recorded DOM node with a live DOM element on the page and then invokes the corresponding action.
 * This function handles various matching strategies, including exact offset matches, distance-based matching,
 * and a fallback to an older search logic. It also incorporates delays for slow playback.
 *
 * @param recordedNode The recorded node object containing its data and metadata.
 * @returns A promise that resolves to `true` if a match is found and action is invoked, `false` otherwise.
 */
export declare const matchNode: (recordedNode: any) => Promise<boolean>;
//# sourceMappingURL=invokeNode.d.ts.map