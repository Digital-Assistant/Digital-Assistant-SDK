/**
 * Calculates the distance between two nodes, normalizing their positions
 * based on their respective document sizes to ensure consistency across
 * different screen resolutions and document layouts.
 *
 * @param {object} node1 - The first node object, expected to have `nodePagePosition` and `screenSize.page` properties.
 * @param {object} node2 - The second node object, expected to have `nodePagePosition` and `screenSize.page` properties.
 * @returns {number} The calculated Euclidean distance between the two nodes.
 */
export declare const getDistance: (node1: any, node2: any) => number;
//# sourceMappingURL=getDistance.d.ts.map