/**
 * Retrieves a descriptive label for a clicked input-like element.
 * This function handles different types of elements (e.g., select, input, textarea, img)
 * and uses various strategies to find the most appropriate label.
 *
 * @param node The HTML element that was clicked.
 * @param fromDocument A boolean flag, its purpose is not fully clear from the context.
 * @param selectchange A boolean flag indicating if the event was a change event on a select element.
 * @returns A string containing the determined label, or `null` if no node is provided.
 */
export declare const getClickedInputLabels: (node: HTMLElement, fromDocument?: boolean, selectchange?: boolean) => any;
//# sourceMappingURL=getClickedInputLabels.d.ts.map