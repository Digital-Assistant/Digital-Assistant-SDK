/**
 * Finds the descriptive labels associated with an input element.
 * This function uses two main strategies to find labels:
 * 1. It looks for `<label>` elements that have a `for` attribute matching the `id` or `name` of the input element.
 * 2. It traverses up the DOM tree from the input element to find a parent `<label>` element.
 *
 * @param element The input element for which to find labels.
 * @returns The text of the found label, trimmed of whitespace. If multiple labels are found, their text is concatenated.
 */
export declare const getLabelsForInputElement: (element: any) => any;
//# sourceMappingURL=getLabelsForInputElement.d.ts.map