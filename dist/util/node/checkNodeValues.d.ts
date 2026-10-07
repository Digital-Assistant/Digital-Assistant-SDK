/**
 * Checks if a DOM node matches a given value using several strategies.
 * This function is used to determine if a node is relevant based on a specific check type or value.
 *
 * The matching strategies are as follows:
 * - It checks against the `specialNodes` configuration for the given `checkType`.
 * - Otherwise, it attempts to match the `checkType` value directly against:
 *   1. The `value` property of `<input>`, `<select>`, or `<textarea>` elements.
 *   2. The `data-qa` attribute of the element.
 *   3. The `textContent` of the element.
 *
 * @param node The DOM node to check.
 * @param checkType The value or check type to match against the node.
 * @returns `true` if the node matches the value according to any of the strategies, `false` otherwise.
 */
export declare const checkNodeValues: (node: any, checkType: string) => boolean;
//# sourceMappingURL=checkNodeValues.d.ts.map