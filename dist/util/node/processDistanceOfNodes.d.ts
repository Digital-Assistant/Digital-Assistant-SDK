/**
 * Node Distance Processing Utility Module
 *
 * This module provides functionality for finding the closest matching node from a set
 * of candidate nodes based on coordinate proximity and node information similarity.
 * It implements an optimized algorithm that prioritizes exact coordinate matches
 * before falling back to distance-based calculations for optimal performance.
 *
 * The algorithm uses a two-phase approach:
 * 1. Fast path: Check for exact coordinate matches (x or y axis alignment).
 * 2. Fallback: Calculate actual distances and find the minimum.
 */
/**
 * Processes a collection of matching nodes to find the one closest to a selected reference node.
 *
 * This function implements an intelligent node selection algorithm that finds the best matching
 * node from a collection of candidates based on spatial proximity. It uses coordinate-based
 * matching with a fallback to distance calculations for optimal performance and accuracy.
 *
 * Algorithm Overview:
 * 1. Validates input parameters and node structure.
 * 2. Iterates through matching nodes to find the closest match.
 * 3. Prioritizes exact coordinate matches (same x or y position) for instant selection.
 * 4. Falls back to distance calculations when no exact matches are found.
 * 5. Returns the node with the minimum calculated distance.
 *
 * @param {Array} matchingNodes - An array of candidate DOM nodes to evaluate for proximity.
 *                                Each node should be a valid HTMLElement with positioning data.
 * @param {Object} selectedNode - A reference node object containing positioning and metadata.
 *                                Expected structure: { nodeInfo: Object, offset: {x, y} }.
 *
 * @returns {HTMLElement|false} Returns the closest matching node from the candidates array,
 *                              or `false` if validation fails or no suitable match is found.
 *
 * @example
 * const candidates = [node1, node2, node3];
 * const reference = { nodeInfo: {...}, offset: {x: 100, y: 200} };
 * const closest = processDistanceOfNodes(candidates, reference);
 * if (closest) {
 *   console.log('Found closest node:', closest);
 * }
 */
export declare const processDistanceOfNodes: (matchingNodes: any, selectedNode: any) => any;
//# sourceMappingURL=processDistanceOfNodes.d.ts.map