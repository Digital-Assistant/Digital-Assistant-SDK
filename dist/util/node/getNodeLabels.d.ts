/**
 * Recursively traverses the DOM to find descriptive labels for a given node.
 * This function is used to identify a node by its associated text, which can be in various places
 * like placeholders, attributes, or nearby text nodes.
 *
 * @param node The starting DOM node for which to find labels.
 * @param inputlabels An array to accumulate the found labels.
 * @param iterationno The current iteration number to prevent infinite recursion.
 * @param iterate A boolean to control whether to traverse up to the parent node.
 * @param getchildlabels A boolean to control whether to get labels from child nodes.
 * @param fromclick A boolean indicating if the function was called from a click event.
 * @param iteratelimit The maximum number of iterations to prevent infinite loops.
 * @param ignorenode A node to be ignored during traversal.
 * @returns An array of objects, where each object contains the `text` of a found label and a `match` flag.
 */
export declare const getNodeLabels: (node: any, inputlabels: any, iterationno: any, iterate?: boolean, getchildlabels?: boolean, fromclick?: boolean, iteratelimit?: number, ignorenode?: any) => any;
//# sourceMappingURL=getNodeLabels.d.ts.map