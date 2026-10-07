/**
 * Validates whether a node object contains valid screen size information.
 *
 * This utility function performs comprehensive validation of screen size data
 * to ensure the node contains properly structured dimension information with
 * valid positive width and height values for the page viewport.
 *
 * @param {any} node - The node object to validate for screen size information.
 *                     Expected to contain a nested `screenSize.page` structure
 *                     with `width` and `height` properties.
 *
 * @returns {boolean} Returns `true` if the node contains valid screen size data
 *                    with positive width and height values, `false` otherwise.
 *
 * @example
 * // Valid screen size data
 * const validNode = {
 *   screenSize: {
 *     page: { width: 1920, height: 1080 }
 *   }
 * };
 * hasValidScreenInfo(validNode); // returns true
 *
 * @example
 * // Invalid screen size data
 * const invalidNode = {
 *   screenSize: {
 *     page: { width: 0, height: -100 }
 *   }
 * };
 * hasValidScreenInfo(invalidNode); // returns false
 */
export declare const hasValidScreenInfo: (node: any) => boolean;
//# sourceMappingURL=hasValidScreenInfo.d.ts.map