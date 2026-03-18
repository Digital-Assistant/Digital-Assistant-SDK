/**
 * Recursively compares two nodes (a candidate node and a recorded node) to determine if they match.
 * The comparison is based on a scoring system that checks properties, attributes, and structure.
 *
 * @param compareNode The candidate node from the current DOM, as a JSON object.
 * @param recordedNode The node from the recording, as a JSON object.
 * @param isPersonalNode A boolean indicating if the comparison should use rules for "personal" nodes.
 * @param match An object that accumulates the matching score and other metadata during the comparison.
 * @returns An object containing the results of the comparison, including the total properties checked (`count`),
 *          the number of matched properties (`matched`), a list of unmatched properties (`unmatched`),
 *          and flags for special conditions like `innerTextFlag`.
 */
export declare const compareNodes: (compareNode: any, recordedNode: any, isPersonalNode?: boolean, match?: any) => any;
//# sourceMappingURL=compareNodes.d.ts.map