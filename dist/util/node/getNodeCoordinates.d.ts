/**
 * Calculates the page-relative coordinates for a DOM element.
 *
 * This function converts viewport-relative coordinates (from `getBoundingClientRect`)
 * to page-relative coordinates by adding the current scroll offsets. This is essential
 * for accurate positioning when the page is scrolled.
 *
 * @param {HTMLElement} element - The DOM element for which to calculate coordinates.
 * @param {Object} windowSize - A screen size object containing scroll information.
 *                              It is expected to have `scrollInfo.scrollTop` and `scrollInfo.scrollLeft`.
 *
 * @returns {Object} An object containing page-relative coordinate information:
 *   - top: The page-relative top position (viewport top + vertical scroll).
 *   - left: The page-relative left position (viewport left + horizontal scroll).
 *   - width: The width of the element (unchanged from the viewport measurement).
 *   - height: The height of the element (unchanged from the viewport measurement).
 *   - actualPos: The original `DOMRect` for reference.
 *
 * @example
 * const element = document.querySelector('.my-element');
 * const screenSize = getScreenSize();
 * const coords = getNodeCoordinates(element, screenSize);
 * console.log(coords.top); // Absolute position from the top of the page.
 */
export declare const getNodeCoordinates: (element: any, windowSize: any) => any;
//# sourceMappingURL=getNodeCoordinates.d.ts.map