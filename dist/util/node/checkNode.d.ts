/**
 * Checks if a given node data object represents a "highlight" node.
 * A highlight node is identified by a specific `systemTag` in its metadata.
 *
 * @param nodeData The node data object to check. This object is expected to have a `meta.selectedElement.systemTag` property.
 * @returns `true` if the node is a highlight node, `undefined` otherwise.
 *          It returns `undefined` instead of `false` to indicate that the check might not have been conclusive
 *          if an error occurred or the property was not found.
 */
export declare const isHighlightNode: (nodeData: any) => true | undefined;
//# sourceMappingURL=checkNode.d.ts.map