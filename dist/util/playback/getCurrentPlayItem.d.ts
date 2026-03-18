/**
 * Retrieves the current playable item from the stored recording sequence.
 * It iterates through the `userclicknodesSet` in the stored recording and returns the first node
 * that has not yet been marked as "completed".
 *
 * @returns An object containing:
 *   - `index`: The index of the current playable node in the `userclicknodesSet` array.
 *   - `node`: The current playable node object itself.
 *   - `additionalParams`: Any additional parameters associated with the recording.
 *   Returns an object with `index: 0` and `node: null` if no uncompleted node is found.
 */
export declare const getCurrentPlayItem: () => any;
//# sourceMappingURL=getCurrentPlayItem.d.ts.map