/**
 * Recursively removes properties from a node data object that may cause circular references
 * or are otherwise undesirable for serialization. This is particularly useful for cleaning up
 * JSON objects representing DOM nodes before they are stringified.
 *
 * @param nodeData The node data object to clean.
 * @returns The cleaned node data object.
 */
export declare const removeCircularReference: (nodeData: any) => any;
//# sourceMappingURL=removeCircularReference.d.ts.map